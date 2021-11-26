"""
celery任务调度

#1 config.py -添加celery相关配置
APP_CELERY_BROKER_URL = 'redis://10.124.5.199:6379/8'
APP_CELERY_RESULT_BACKEND = 'redis://10.124.5.199:6379/9'

#2 app.py -创建celery应用
from app.task import create_celery_app
celery_app = create_celery_app(app)

# 3扩展任务&周期性任务
"""

from celery import Celery


def create_celery_app(flask_app):
    celery_app = Celery(
        __name__,
        include=[
            'app.task.tasks',
            'app.task.periodic_tasks']
    )

    flask_config = flask_app.config
    celery_app.config_from_object({
        'broker_url': flask_config.get('APP_CELERY_BROKER_URL'),
        'result_backend': flask_config.get('APP_CELERY_RESULT_BACKEND'),
        'flask_config': flask_config
    })
    return celery_app
