"""
redis+websocket广播功能
pip install websockets

websockets vs SocketIO
服务端: SocketIO要单独启动服务，而websockets可以作为主服务进程的一个守护进程运行
客户端: SocketIO要使用socket.io.js，而websockets可以直接用原生的WebSocket对象
如果是通过APScheduler或Celery进行任务调度的话，因为没有socket对象，可以考虑通过redis等进行中转


#请添加以下配置项
REDIS_URL = None# redis相关配置, 按需配置
# websocket配置, 按需配置
WEBSOCKET_HOST = None  # 如果为None, host=0.0.0.0
WEBSOCKET_PORT = 3667  # websocket端口号
REDIS_WEBSOCKET_DEFAULT_CHANNEL = "ws:channel"  # redis websocket订阅的默认channel
REDIS_WEBSOCKET_MESSAGE_TIMEOUT = 1  # redis websocket消息等待时间
"""
import asyncio
import multiprocessing

import websockets
from flaskz import log
from flaskz.log import flaskz_logger
from flaskz.utils import get_app_config
from redis import asyncio as redis_aio

ws_conn: redis_aio.Redis
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
    global ws_conn
    log.init_log(app_config)
    ws_config.update({
        'REDIS_URL': app_config.get('REDIS_URL'),
        'WEBSOCKET_HOST': app_config.get('WEBSOCKET_HOST'),
        'WEBSOCKET_PORT': app_config.get('WEBSOCKET_PORT'),
        'REDIS_WEBSOCKET_DEFAULT_CHANNEL': app_config.get('REDIS_WEBSOCKET_DEFAULT_CHANNEL'),
        'REDIS_WEBSOCKET_MESSAGE_TIMEOUT': app_config.get('REDIS_WEBSOCKET_MESSAGE_TIMEOUT'),
    })
    flaskz_logger.info('connect websocket redis:{}'.format(ws_config.get('REDIS_URL')))
    ws_conn = redis_aio.from_url(ws_config.get('REDIS_URL'))
    try:
        asyncio.run(websocket_server(ws_config.get('WEBSOCKET_HOST'), ws_config.get('WEBSOCKET_PORT')))
    except OSError:  # OSError: [Errno 48] error while attempting to bind on address ('0.0.0.0', 3667): address already in use
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

    ws_channel = ws_conn.pubsub()
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
    except websockets.WebSocketException:
        flaskz_logger.debug('redis websocket channel=' + str(channel) + ' connection closed')
    finally:
        await ws_channel.unsubscribe(channel)
        flaskz_logger.debug('redis websocket channel=' + str(channel) + ' clear resource')
