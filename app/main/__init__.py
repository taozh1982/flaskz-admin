"""
#1 API请求异常处理
#2 页面静态文件&url映射，可以通过其他程序实现页面服务功能，例如nginx
"""
# static page route

from flask import Blueprint

from werkzeug.routing import BaseConverter

# static folder

main_bp = Blueprint('main', __name__, static_folder='../app_page', static_url_path='/')

from . import errors
from . import page


def init_app(app):
    # add regex route rule
    """
    #forward request
    @api_bp.route('/<regex(".*"):path>', methods=HTTP_METHODS)
    def remote(path):
        return forward_request(base_url + path)
    """

    class RegexConverter(BaseConverter):
        def __init__(self, url_map, regex):
            super(RegexConverter, self).__init__(url_map)
            self.regex = regex

    app.url_map.converters['regex'] = RegexConverter
