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


class RegexConverter(PathConverter):  # Select BaseConverter or PathConverter as required
    def __init__(self, url_map, regex):
        super(RegexConverter, self).__init__(url_map)
        self.regex = regex


def init_app(app):
    """
    1.refresh session
    2.add regex route rule
    3.config static folder
    4.disable cache control
    """

    @app.before_request
    def before_request():
        # refresh session life time and update client cookie(Flask's sessions are client-side sessions)
        # if use session to store user information, please set it before every request.
        # 默认情况下, Flask的session是临时的,也就是会在用户关闭浏览器时自动过期
        # 通过将 session.permanent 属性设置为 True，可以使会话变为持久性会话，即使用户关闭浏览器后也能保留会话信息。
        if '_user_id' in session:
            session.permanent = True

    # add regex route rule
    # @api_bp.route('/<regex(".*"):path>', methods=HTTP_METHODS)
    # def remote(path):
    #     return forward_request(base_url + path) # forward request
    app.url_map.converters['regex'] = RegexConverter

    # config static
    static_folder = get_app_config('APP_PAGE_STATIC_FOLDER')
    if static_folder:
        static_folder = get_app_path(static_folder)
    main_bp.static_folder = static_folder or '../app_page'
    main_bp.static_url_path = get_app_config('APP_PAGE_STATIC_STATIC_URL_PATH') or '/'
    page.page_mapping.update(get_app_config('APP_PAGE_MAPPING') or {})

    # disable cache
    try:  # unittest--> AssertionError: The setup method 'after_request' can no longer be called on the blueprint 'main'
        @main_bp.after_request
        def disable_header_cache_control(response):
            """
            Disable browser cache to fix 'Failed to load response data error'(Chrome)
            """
            response.headers['Cache-Control'] = 'no-cache, no-store'
            return response
    except Exception:
        pass


def init_app_security(app):
    @app.after_request
    def _init_security(response):
        headers = response.headers
        headers["X-Frame-Options"] = 'SAMEORIGIN'
        # headers['Content-Security-Policy'] = "default-src 'self'"
        headers['Content-Security-Policy'] = "default-src 'self';" \
                                             " script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self';frame-ancestors 'self';"
        headers['Permissions-Policy'] = 'geolocation=(), camera=()'

        content_type = response.content_type
        if 'charset=' not in content_type:
            response.content_type = content_type + '; charset=utf-8'
        return response


def allowed_file(file):
    """上传文件检查"""
    if type(file) is str:
        filename = file
    else:
        filename = file.filename
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in (get_app_config('APP_UPLOAD_FILE_ALLOWED_EXTENSIONS') or set())


def is_static_file_request(req=None):
    if req is None:
        req = request
    path = req.path
    static_file_extensions = (
        '.html', '.htm',  # HTML
        '.css',  # CSS
        '.js',  # JavaScript
        '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',  # 图像
        '.mp4', '.webm', '.ogv',  # 视频
        '.mp3', '.wav', '.ogg',  # 音频
        '.woff', '.woff2', '.ttf', '.otf',  # 字体
        '.json', '.xml', '.yaml', '.md', '.ico', '.map'  # 其他
    )
    if path.endswith(static_file_extensions):
        return True
    return False


from . import errors
from . import page
