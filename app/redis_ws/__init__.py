"""
redis+websocket广播功能
pip install websockets
"""
import asyncio
import multiprocessing

import websockets
from flask import Flask
from flaskz import log
from flaskz.log import flaskz_logger
from redis import asyncio as aioredis
from redis.asyncio import Redis

ws_conn: Redis
ws_config = {}


def init_websocket(app):
    """
    初始化redis websocket
    """
    if isinstance(app, Flask):
        app_config = app.config
    else:
        app_config = app
    multiprocessing.Process(target=run_process_server, args=(app_config,), daemon=True).start()


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
    ws_conn = aioredis.from_url(ws_config.get('REDIS_URL'))
    asyncio.run(websocket_server(ws_config.get('WEBSOCKET_HOST'), ws_config.get('WEBSOCKET_PORT')))


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
