import os

from flask import Flask, session
from flask_login import LoginManager
from flaskz import log, models
from flaskz.rest import ModelRestManager

from config import config
from . import sys_mgmt
from .api import api_bp as api_blueprint
from .main import main_bp as main_blueprint
from .sys_mgmt import sys_mgmt_bp as sys_mgmt_blueprint, auth

login_manager = LoginManager()
login_manager.user_loader(auth.load_user_by_id)
login_manager.request_loader(auth.load_user_by_token)

model_rest_manager = ModelRestManager()
model_rest_manager.login_check(auth.login_check)
model_rest_manager.permission_check(auth.permission_check)
model_rest_manager.logging(sys_mgmt.log_operation)


def create_app(config_name):
    app = Flask(__name__)

    # 配置
    config_name = config_name.lower()
    app_config = config[config_name]
    app.config.from_object(app_config)
    app_config.init_app(app)

    # 初始化
    log.init_log(app)
    log.flaskz_logger.info('-- start application with %s config --' % config_name)
    login_manager.init_app(app)
    models.init_model(app)
    model_rest_manager.init_app(app)

    # 注册api
    app.register_blueprint(main_blueprint, url_prefix='/')
    app.register_blueprint(api_blueprint, url_prefix='/api/v1.0')
    app.register_blueprint(sys_mgmt_blueprint, url_prefix='/sys_mgmt')

    @app.before_request
    def before_request():
        # refresh session life time and update client cookie,
        # if use session to store user information, please set it before every request.
        session.permanent = True
        # 资源相关不过滤js/css/html
        # 登录不过滤
        # api请求过滤，跳转到license页面进行上传操作
        # print(request)

    return app
