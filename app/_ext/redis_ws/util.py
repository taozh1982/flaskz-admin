import redisz
from flaskz.utils import get_app_config


def publish_message(message, channel=None):
    """向channel发送消息"""
    ws_redis = redisz.Redisz(get_app_config('REDIS_URL'), **(get_app_config('REDIS_KWARGS') or {}))
    if not channel:  # 如果不指定channel，订阅默认channel
        channel = get_app_config('REDIS_WEBSOCKET_DEFAULT_CHANNEL')
    ws_redis.publish(channel, message)
