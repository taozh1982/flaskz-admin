"""系统初始化"""

from . import status_codes

app_config = {}


def init_app(app):
    """系统初始化"""
    status_codes.init_app(app)  # 中文message
    pass
