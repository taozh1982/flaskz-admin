"""
环境配置
可以通过设置APP_CONFIG环境变量，切换到不同的环境
"""
import configparser
import os
from datetime import timedelta


def update_config_from_file():
    """
    读取config.ini配置文件，ini配置优先级>config.py
    """
    if not os.path.isfile('./config.ini'):
        return
    cp = configparser.ConfigParser()
    cp.read('config.ini', encoding='utf-8')

    def _update_from_file(section, config_cls):
        opts = None
        if section == 'DEFAULT':
            opts = cp.defaults()
        elif section in cp:
            opts = cp.options(section)
        if not opts:
            return
        for opt in opts:
            setattr(config_cls, opt.upper(), cp.get(section, opt))

    for item in [('DEFAULT', Config), ('DEVELOPMENT', DevelopmentConfig), ('TEST', TestConfig), ('PRODUCTION', ProductionConfig), ('UNITTEST', UnittestConfig)]:
        _update_from_file(item[0], item[1])


class Config:
    # ------------------------------Flask配置参数------------------------------
    # 请参考 -https://flask.palletsprojects.com/en/2.3.x/config/#builtin-configuration-values
    # 用于安全签署会话cookie的密钥，并可用于扩展应用程序的任何其他安全相关需求。它应该是一个长随机字符串
    SECRET_KEY = 'hard to guess string'
    # Flask参数，提供页面服务时，浏览器上文件的缓存时间，如果是None，则浏览器不会缓存页面文件，datetime.timedelta/秒数
    SEND_FILE_MAX_AGE_DEFAULT = timedelta(hours=16)
    # Flask参数，采用session实现用户登录管理时，session的过期时间，datetime.timedelta/秒数
    PERMANENT_SESSION_LIFETIME = timedelta(hours=16)
    # Flask-Login参数，选中保持登录/记住我时，cookie的过期时间，datetime.timedelta/秒数
    REMEMBER_COOKIE_DURATION = timedelta(days=30)

    # ------------------------------APP参数------------------------------
    # 采用token管理用户登录时，token的名字，用于从header中获取对应的token值
    APP_TOKEN_AUTHORIZATION = 'Authorization'
    # 采用token管理用户登录时，token的过期时间
    APP_TOKEN_EXPIRES_IN = int(timedelta(hours=16).total_seconds())
    # 采用token管理用户登录时，refresh token的过期时间，如果<0则不生成refresh token
    APP_REFRESH_TOKEN_EXPIRES_IN = int(timedelta(days=7).total_seconds())
    # 静态文件目录(前端页面)
    APP_PAGE_STATIC_FOLDER = './app/app_page/'
    APP_PAGE_STATIC_STATIC_URL_PATH = '/'
    APP_PAGE_MAPPING = {  # route:页面映射
        # Ext
        'ext-nav': './modules/ext/nav/nav.html',
        'ext-websocket': './modules/ext/websocket/websocket.html',
        'ext-page-monitor': './modules/ext/page_monitor/page_monitor.html',
        # Example
        'ex-simples': './modules/example/simples/simples.html',
        'ex-departments': './modules/example/departments/departments.html',
        'ex-employees': './modules/example/employees/employees.html',
    }
    # 上传文件目录
    # APP_UPLOAD_FOLDER = 'uploads'
    # 允许的上传文件格式列表
    APP_UPLOAD_FILE_ALLOWED_EXTENSIONS = {'txt', 'dat', 'xlsx', 'xls', 'csv', 'xml', 'json', 'yaml'}

    # ------------------------------License参数------------------------------
    # License公钥目录
    APP_LICENSE_PUBLIC_KEY_FILEPATH = './_license/public.key'
    # License菜单path(如果启用列license功能&没有上传license，只返回license菜单)
    APP_LICENSE_MENU_PATH = 'licenses'
    # License加载间隔(s)
    APP_LICENSE_LOAD_INTERVAL = 600
    # 操作系统时间允许向后改变的最大值(s)，如果不是大于0的整数，则禁用时间检测
    APP_LICENSE_OS_TIME_BACKWARD_LIMIT = 3600

    # ------------------------------数据库配置参数------------------------------
    # 请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_model_init.html
    FLASKZ_DATABASE_URI = None
    FLASKZ_DATABASE_ECHO = False  # 如果为True，会打印sql语句，只适用于开发环境
    FLASKZ_DATABASE_POOL_RECYCLE = int(timedelta(hours=2).total_seconds())  # recycle connections seconds
    FLASKZ_DATABASE_POOL_PRE_PING = True  # engine.pool_pre_ping- DB操作之前先测试连接，如果不可用会重连(HA/数据库重启)
    # engine自定义属性 ex){'pool_timeout': 20, 'pool_size': 20, "poolclass": QueuePool, 'max_overflow': 20}
    FLASKZ_DATABASE_ENGINE_KWARGS = None
    # session自定义属性 'reusable_in_flask_g':False-->禁用session缓存，'expire_on_commit':False-->session提交以后，对象不会被"过期"
    FLASKZ_DATABASE_SESSION_KWARGS = {'expire_on_commit': False}

    FLASKZ_DATABASE_DEBUG = True  # 如果为True，会记录一个请求过程中的DB操作，并打印>slow_time和?times的操作，只适用于开发环境
    FLASKZ_DATABASE_DEBUG_SLOW_TIME = -1
    FLASKZ_DATABASE_DEBUG_ACCESS_TIMES = -1

    # ------------------------------系统日志配置参数------------------------------
    # 请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_api.html
    FLASKZ_LOGGER_FILENAME = None  # 日志文件名
    FLASKZ_LOGGER_FILEPATH = '_syslog'  # 日志文件目录
    FLASKZ_LOGGER_LEVEL = 'INFO'  # 'DEBUG'/'INFO'/'WARNING'/'WARN'/'ERROR'/'FATAL'/'CRITICAL'
    FLASKZ_LOGGER_FORMAT = '%(asctime)s %(filename)16s[line:%(lineno)-3d] %(levelname)8s: \n%(message)s\n'
    FLASKZ_LOGGER_WHEN = 'midnight'  # 每天midnight，将当日志文件按日期重命名保存，并生成一个新的日志文件
    FLASKZ_LOGGER_BACKUP_COUNT = 90
    FLASKZ_LOGGER_DISABLED = False
    FLASKZ_WZ_LOGGER_DISABLED = True

    # ------------------------------HTTP请求响应参数------------------------------
    # 请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_utils.html#toc-res
    FLASKZ_RES_SUCCESS_STATUS = "success"
    FLASKZ_RES_FAIL_STATUS = "fail"

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    """开发环境配置"""
    SEND_FILE_MAX_AGE_DEFAULT = 0
    FLASKZ_DATABASE_URI = os.environ.get('FLASKZ_DEV_DATABASE_URI') or 'sqlite:///./_sqlite/flaskz-admin.db?check_same_thread=False'


class TestConfig(Config):
    """测试环境配置"""
    SEND_FILE_MAX_AGE_DEFAULT = 0  # no cache
    FLASKZ_LOGGER_FILENAME = 'syslog.txt'
    FLASKZ_DATABASE_URI = os.environ.get('FLASKZ_TEST_DATABASE_URI') or 'mysql+pymysql://root:Cisco123@10.124.4.69:3306/flaskz-admin'
    FLASKZ_DATABASE_ENGINE_KWARGS = {'isolation_level': 'READ COMMITTED'}  # for mysql


class ProductionConfig(Config):
    """
    产品/上线环境配置
    如果不想将一些信息暴露在代码中，可以通过*环境变量*的方式进行设置
    """
    SECRET_KEY = os.environ.get('APP_SECRET_KEY') or 'hard to guess string'
    FLASKZ_LOGGER_FILENAME = 'syslog.txt'
    FLASKZ_DATABASE_URI = os.environ.get('FLASKZ_PRO_DATABASE_URI') or 'mysql+pymysql://{username}:{password}@{url}:{port}/{db}'
    FLASKZ_DATABASE_ENGINE_KWARGS = {'isolation_level': 'READ COMMITTED'}  # for mysql


class UnittestConfig(Config):
    """单元测试环境配置"""
    FLASKZ_LOGGER_FILEPATH = '../../_syslog'  # 日志文件目录
    FLASKZ_LOGGER_FILENAME = 'unittest_syslog.txt'
    FLASKZ_DATABASE_URI = os.environ.get('FLASKZ_UNITTEST_DATABASE_URI') or 'sqlite:///../../_sqlite/flaskz-admin-unittest.db?check_same_thread=False'


update_config_from_file()

config = {
    'development': DevelopmentConfig,
    'unittest': UnittestConfig,
    'test': TestConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig  # 默认环境配置, 也可通过环境变量设置, ex) export APP_CONFIG=production
}
