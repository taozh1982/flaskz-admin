"""系统初始化"""
from flask import Flask

from . import status_codes

app_config = {}


def init_app(app):
    is_app = isinstance(app, Flask)
    global app_config
    if is_app:
        app_config = app.config
    else:
        app_config = app
    # status_codes.init_app(app) # 中文message


def get_app_config(item=None):
    if item is None:
        return app_config
    return app_config.get(item)
