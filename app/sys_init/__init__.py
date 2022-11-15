"""系统初始化"""
from flask import Flask

from . import status_codes

app_config = {}


def init_app(app):
    """系统初始化"""
    is_app = isinstance(app, Flask)
    global app_config
    if is_app:
        app_config = app.config
    else:
        app_config = app
    # status_codes.init_app(app) # 中文message


def get_app_config(key=None):
    """
    返回当前app的config信息
    还让flaskz.utils.get_app_config的区别是: 没有使用current_app，没有请求上下文时也可以使用
    """
    if key is None:
        return app_config
    return app_config.get(key)
