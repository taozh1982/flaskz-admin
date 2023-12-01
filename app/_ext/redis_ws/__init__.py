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
import multiprocessing

import redis
import redisz
import websockets
from flaskz import log
from flaskz.log import flaskz_logger
from flaskz.utils import get_app_config

ws_server_config = {}  # 进程


def init_websocket(app):
    """
    初始化redis websocket
    """
    multiprocessing.Process(target=run_process_server, args=(get_app_config(),), daemon=True).start()


def run_process_server(app_config):
    """
    初始化websocket进程
    """
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
    try:
        asyncio.run(websocket_server(ws_server_config.get('WEBSOCKET_HOST'), ws_server_config.get('WEBSOCKET_PORT')))
    except OSError as err:  # OSError: [Errno 48] error while attempting to bind on address ('0.0.0.0', 3667): address already in use
        flaskz_logger.error('--- start websocket service error: {}---'.format(err))
        pass
    except KeyboardInterrupt:  # stop service
        pass


async def websocket_server(host, port):
    """
    启动websocket服务.
    """
    if host is None:
        host = '0.0.0.0'
    flaskz_logger.info('--- start websocket service: {}:{}---'.format(host, port))
    async with websockets.serve(websocket_handler, host, port):
        await asyncio.Future()


async def websocket_handler(websocket, path):
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
    if websocket.closed:
        return
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
        await websocket_handler(websocket, path)  # reconnect redis
    finally:
        await ws_channel.unsubscribe(channel)
        flaskz_logger.debug('redis websocket channel=' + str(channel) + ' clear resource')
