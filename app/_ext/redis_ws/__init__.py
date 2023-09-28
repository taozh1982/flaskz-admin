"""
redis+websocket广播功能
pip install websockets

websockets vs SocketIO
服务端: SocketIO要单独启动服务，而websockets可以作为主服务进程的一个守护进程运行
客户端: SocketIO要使用socket.io.js，而websockets可以直接用原生的WebSocket对象
如果是通过APScheduler或Celery进行任务调度的话，因为没有socket对象，可以考虑通过redis等进行中转

仅支持redis单节点和哨兵模式，不支持集群模式
# 单节点
ws_redis = redis.asyncio.from_url(ws_config.get('REDIS_URL'))

# 哨兵模式
sentinel = redis.asyncio.Sentinel([("10.124.206.61", 27001), ("10.124.206.62", 27001), ("10.124.206.63", 27001)])
ws_redis = sentinel.master_for("mymaster")


#config.py请添加以下配置项
# redis相关配置, 按需配置
REDIS_URL = None
# 'redis://127.0.0.1:6379'
# [("10.124.206.61", 27001), ("10.124.206.62", 27001), ("10.124.206.63", 27001)]    # 哨兵列表
# {sentinels: [("10.124.206.61", 27001), ("10.124.206.62", 27001), ("10.124.206.63", 27001)]}    # 哨兵模式
# websocket配置, 按需配置
WEBSOCKET_HOST = None  # 如果为None, host=0.0.0.0
WEBSOCKET_PORT = 3667  # websocket端口号
REDIS_WEBSOCKET_DEFAULT_CHANNEL = "ws:channel"  # redis websocket订阅的默认channel
REDIS_WEBSOCKET_MESSAGE_TIMEOUT = 1  # redis websocket消息等待时间


"""
import asyncio
import multiprocessing

import redis
import websockets
from flaskz import log
from flaskz.log import flaskz_logger
from flaskz.utils import get_app_config

ws_config = {}


def init_websocket(app):
    """
    初始化redis websocket
    """
    multiprocessing.Process(target=run_process_server, args=(get_app_config(),), daemon=True).start()


def run_process_server(app_config):
    """
    初始化websocket进程
    """
    global ws_config
    log.init_log(app_config)
    ws_config.update({
        'REDIS_URL': app_config.get('REDIS_URL'),
        'WEBSOCKET_HOST': app_config.get('WEBSOCKET_HOST'),
        'WEBSOCKET_PORT': app_config.get('WEBSOCKET_PORT'),
        'REDIS_WEBSOCKET_DEFAULT_CHANNEL': app_config.get('REDIS_WEBSOCKET_DEFAULT_CHANNEL'),
        'REDIS_WEBSOCKET_MESSAGE_TIMEOUT': app_config.get('REDIS_WEBSOCKET_MESSAGE_TIMEOUT'),
    })
    flaskz_logger.info('connect websocket redis:{}'.format(ws_config.get('REDIS_URL')))
    try:
        asyncio.run(websocket_server(ws_config.get('WEBSOCKET_HOST'), ws_config.get('WEBSOCKET_PORT')))
    except OSError:  # OSError: [Errno 48] error while attempting to bind on address ('0.0.0.0', 3667): address already in use
        pass
    except KeyboardInterrupt:  # stop service
        pass


async def websocket_server(host, port):
    """
    启动websocket服务.
    """
    if host is None:
        host = '0.0.0.0'
    flaskz_logger.info('start redis websocket service {}:{}'.format(host, port))
    async with websockets.serve(websocket_handler, host, port):
        await asyncio.Future()


async def websocket_handler(websocket, path):
    """
    websocket回掉函数, 当有client连接时自动调用

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
    # global ws_config

    if websocket.closed:
        return
    ws_redis = _create_redis(ws_config.get('REDIS_URL'))
    ws_channel = ws_redis.pubsub()
    channel = path.replace('/', '')  # ws://127.0.0.1:3667/a-channel 指定channel
    timeout = ws_config.get('REDIS_WEBSOCKET_MESSAGE_TIMEOUT', 1)
    if not channel:  # 如果不指定channel，订阅默认channel
        channel = ws_config.get('REDIS_WEBSOCKET_DEFAULT_CHANNEL')
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
                await websocket.send(redis_message.decode('utf-8'))
    except websockets.WebSocketException as e:
        flaskz_logger.debug('redis-ws websocket exception= ' + str(e))
    except redis.exceptions.ConnectionError as e:  # @2023-09-01 添加redis哨兵模式的逻辑处理
        flaskz_logger.debug('redis-ws redis connection error= ' + str(e))
        await ws_channel.unsubscribe(channel)
        await websocket_handler(websocket, path)  # reconnect redis
    finally:
        await ws_channel.unsubscribe(channel)
        flaskz_logger.debug('redis websocket channel=' + str(channel) + ' clear resource')


def _create_redis(redis_url):
    default_kwargs = {
        'decode_responses': True,
        'socket_connect_timeout': 2,
        'socket_timeout': 1
    }
    url_type = type(redis_url)
    if url_type is list:  # 哨兵模式
        sentinel = redis.asyncio.Sentinel(redis_url)  # [("10.124.206.61", 27001), ("10.124.206.62", 27001), ("10.124.206.63", 27001)]
        return sentinel.master_for("mymaster", **default_kwargs)
    # 单节点
    if url_type is dict:
        if redis_url.pop('mode', None) == "sentinel":
            service_name = redis_url.pop('service_name', 'mymaster')
            sentinel = redis.asyncio.Sentinel(**redis_url)  # {sentinels: [("10.124.206.61", 27001), ("10.124.206.62", 27001), ("10.124.206.63", 27001)]}
            return sentinel.master_for(service_name)
        else:
            redis.asyncio.from_url(**redis_url)
    return redis.asyncio.from_url(redis_url, **default_kwargs)
