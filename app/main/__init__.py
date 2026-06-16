"""
1. session refresh
2. 正则表达式路由
3. API请求异常处理
4. 页面静态文件&url映射(可以通过其他程序实现页面服务功能，例如nginx)
"""
# static page route

from flask import Blueprint, session, request
from flaskz.utils import get_app_config, get_app_path
from werkzeug.routing import PathConverter

# static folder
main_bp = Blueprint('main', __name__, static_folder='../app_page', static_url_path='/')

from ._main import *
