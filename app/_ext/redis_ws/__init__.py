"""
redis+websocket广播功能

pip install websockets
pip install redisz


# config文件中请添加以下配置项
# redis相关配置, 按需配置
REDIS_URL = None    # redis地址，单节点/哨兵(不支持集群模式)
# REDIS_URL = '10.124.206.62:7001'    # 单节点模式
# REDIS_URL = 'sentinel://10.124.206.61:27001;10.124.206.62:27001;10.124.206.63:27001' #哨兵模式
REDIS_KWARGS = None # redis参数，例如哨兵模式下所使用的database等

# websocket配置, 按需配置
WEBSOCKET_HOST = None  # 如果为None, host=0.0.0.0
WEBSOCKET_PORT = 3667  # websocket端口号
REDIS_WEBSOCKET_DEFAULT_CHANNEL = "ws:channel"  # redis websocket订阅的默认channel
REDIS_WEBSOCKET_MESSAGE_TIMEOUT = 1  # redis websocket消息等待时间
"""
import asyncio
import signal

import redis
import redisz
import websockets
from flaskz import log
from flaskz.log import flaskz_logger

ws_server_config = {}  # 进程


def start_msg_server(app_config):
    """ 初始化 WebSocket 进程 """
    global ws_server_config
    log.init_log(app_config)
    ws_server_config.update({
        'REDIS_URL': app_config.get('REDIS_URL'),
        'REDIS_KWARGS': app_config.get('REDIS_KWARGS') or {},
        'WEBSOCKET_HOST': app_config.get('WEBSOCKET_HOST'),
        'WEBSOCKET_PORT': app_config.get('WEBSOCKET_PORT'),
        'REDIS_WEBSOCKET_DEFAULT_CHANNEL': app_config.get('REDIS_WEBSOCKET_DEFAULT_CHANNEL'),
        'REDIS_WEBSOCKET_MESSAGE_TIMEOUT': app_config.get('REDIS_WEBSOCKET_MESSAGE_TIMEOUT'),
    })

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, lambda: asyncio.create_task(shutdown(loop)))

    try:
        loop.run_until_complete(websocket_server())
    except OSError as err:
        flaskz_logger.error(f'--- start websocket service error: {err} ---')
    finally:
        loop.run_until_complete(asyncio.sleep(0.1))
        loop.close()


async def shutdown(loop):
    """ 关闭事件循环 """
    flaskz_logger.info("--- close websocket service ---")
    tasks = [t for t in asyncio.all_tasks(loop) if t is not asyncio.current_task()]
    [task.cancel() for task in tasks]
    await asyncio.gather(*tasks, return_exceptions=True)
    loop.stop()


async def websocket_server():
    """ 启动 WebSocket 服务 """
    host = ws_server_config['WEBSOCKET_HOST']
    port = ws_server_config['WEBSOCKET_PORT']
    flaskz_logger.info(f'--- start websocket service: {host}:{port} ---')
    async with websockets.serve(websocket_handler, host, port):
        await asyncio.Future()  # 保持 WebSocket 服务器运行


async def websocket_handler(websocket):
    """
    websocket连接处理函数, 当有ws连接时自动回调

    不使用redis
    async def process(websocket):
        await websocket.send('123')

    async def hello(websocket, path):
        # async def say():
        #     while True:
        #         await asyncio.sleep(2)
        #         # await websocket.send('hello')
        #         await process(websocket)
        #         # print(f">>> hello")
        #
        # task = asyncio.create_task(say())
        async for message in websocket:
            await websocket.send('message')

        # await task
    """
    new_ver = hasattr(websocket, 'request')
    if new_ver:
        if websocket.close_code is not None:
            return
        request = websocket.request
        path = request.path
    else:
        if websocket.closed:
            return
        path = websocket.path

    ws_redis = redisz.Redisz(ws_server_config.get('REDIS_URL'), asyncio=True, **ws_server_config.get('REDIS_KWARGS'))
    ws_channel = ws_redis.get_pubsub()  # AttributeError: 'asyncio.RedisCluster' object has no attribute 'pubsub'
    channel = path.replace('/', '')  # ws://127.0.0.1:3667/a-channel 指定channel
    timeout = ws_server_config.get('REDIS_WEBSOCKET_MESSAGE_TIMEOUT', 1)
    if not channel:  # 如果不指定channel，订阅默认channel
        channel = ws_server_config.get('REDIS_WEBSOCKET_DEFAULT_CHANNEL')
    channel = channel.split(',')

    flaskz_logger.debug('redis websocket channel=' + str(channel) + ' connect')
    await ws_channel.subscribe(*channel)  # 每个ws连接监听的channel可以不一样
    try:
        while True:
            if new_ver:
                if websocket.close_code is not None:
                    return
            else:
                if websocket.closed:
                    break
            redis_message = await ws_channel.get_message(ignore_subscribe_messages=True, timeout=timeout)
            if redis_message:
                redis_message = redis_message.get('data')
                if type(redis_message) is bytes:
                    redis_message = redis_message.decode('utf-8')
                await websocket.send(redis_message)
    except websockets.WebSocketException as e:
        flaskz_logger.debug('redis-ws websocket exception= ' + str(e))
    except redis.exceptions.ConnectionError as e:  # @2023-09-01 添加redis哨兵模式的逻辑处理
        flaskz_logger.debug('redis-ws redis connection error= ' + str(e))
        await ws_channel.unsubscribe(channel)
        await websocket_handler(websocket)  # reconnect redis
    finally:
        await ws_channel.unsubscribe(channel)
        flaskz_logger.debug('redis websocket channel=' + str(channel) + ' clear resource')
