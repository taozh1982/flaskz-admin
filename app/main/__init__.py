"""
#1 API请求异常处理
#2 页面静态文件&url映射，可以通过其他程序实现页面服务功能，例如nginx
"""
# static page route

from flask import Blueprint
from flaskz.utils import get_app_config, get_app_path

from werkzeug.routing import PathConverter

# static folder

APP_UPLOAD_FILE_ALLOWED_EXTENSIONS = {}

main_bp = Blueprint('main', __name__, static_folder='../app_page', static_url_path='/')


@main_bp.after_request
def disable_header_cache_control(response):
    """
    Disable browser cache to fix 'Failed to load response data error'(Chrome)
    """
    response.headers['Cache-Control'] = 'no-cache, no-store'
    return response


def init_app(app):
    # add regex route rule
    """
    #forward request
    @api_bp.route('/<regex(".*"):path>', methods=HTTP_METHODS)
    def remote(path):
        return forward_request(base_url + path)
    """

    class RegexConverter(PathConverter):  # Select BaseConverter or PathConverter as required
        def __init__(self, url_map, regex):
            super(RegexConverter, self).__init__(url_map)
            self.regex = regex

    app.url_map.converters['regex'] = RegexConverter

    static_folder = get_app_config('APP_PAGE_STATIC_FOLDER')
    if static_folder:
        static_folder = get_app_path(static_folder)
    main_bp.static_folder = static_folder or '../app_page'
    main_bp.static_url_path = get_app_config('APP_PAGE_STATIC_STATIC_URL_PATH') or '/'

    global APP_UPLOAD_FILE_ALLOWED_EXTENSIONS
    APP_UPLOAD_FILE_ALLOWED_EXTENSIONS = get_app_config('APP_UPLOAD_FILE_ALLOWED_EXTENSIONS') or set()


def allowed_file(file):
    if type(file) is str:
        filename = file
    else:
        filename = file.filename
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in APP_UPLOAD_FILE_ALLOWED_EXTENSIONS


from . import errors
from . import page
