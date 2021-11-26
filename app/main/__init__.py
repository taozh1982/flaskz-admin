"""
#1 API请求异常处理
#2 页面静态文件&url映射，可以通过其他程序实现页面服务功能，例如nginx
"""
# static page route

from flask import Blueprint

# static folder
main_bp = Blueprint('main', __name__, static_folder='../app_page', static_url_path='/')

from . import errors
from . import page
