from flask import Flask, session
from flaskz import log, models

from config import config
from . import sys_mgmt, main, api, sys_init
from .sys_mgmt import auth


def create_app(config_name):
    app = Flask(__name__)

    # 配置
    config_name = config_name.lower()
    app_config = config[config_name]
    app.config.from_object(app_config)
    app_config.init_app(app)
    sys_init.init_app(app)  # 系统初始化，中文message等

    # CORS(app) # 跨域支持, 按需使用 pip install cors

    # 初始化
    log.init_log(app)
    log.flaskz_logger.info('-- start application with %s config --' % config_name)
    models.init_model(app)

    _init_login(app)
    _init_model_rest(app)
    # _init_license(app)
    # _init_redis_ws(app)

    # 注册api
    main.init_app(app)
    app.register_blueprint(main.main_bp, url_prefix='/')
    app.register_blueprint(api.api_bp, url_prefix='/api/v1.0')
    app.register_blueprint(sys_mgmt.sys_mgmt_bp, url_prefix='/sys_mgmt')

    @app.before_request
    def before_request():
        # refresh session life time and update client cookie,
        # if use session to store user information, please set it before every request.
        session.permanent = True

    return app


def _init_login(app):
    """初始化login模块，按需使用"""
    from flask_login import LoginManager
    login_manager = LoginManager()
    login_manager.user_loader(auth.load_user_by_id)
    login_manager.request_loader(auth.load_user_by_token)
    login_manager.init_app(app)


def _init_model_rest(app):
    """初始化model rest模块，按需使用"""
    from flaskz.rest import ModelRestManager
    model_rest_manager = ModelRestManager()
    model_rest_manager.login_check(auth.login_check)
    model_rest_manager.permission_check(auth.permission_check)
    model_rest_manager.logging(sys_mgmt.log_operation)
    model_rest_manager.init_app(app)


def _init_license(app):
    """
    初始化license模块，按需使用
    pip install pycryptodome
    """
    # from flaskz.utils import get_app_path
    # from .sys_mgmt import license
    # from .sys_mgmt.license import router  # enable api
    # license_manager = license.LicenseManager()
    # license_manager.load_license(license.load_license)
    # license_manager.request_check(license.request_check_by_license)
    # with open(get_app_path("_license/public.key"), "r") as f:
    #     public_key = f.read()
    #     license_manager.init_app(app, public_key)
    pass


def _init_redis_ws(app):
    """
    初始化redis+websocket广播消息模块, 按需使用
    pip install redis
    pip install websockets
    """
    # from . import redis_ws
    # redis_ws.init_websocket(app)
    pass
