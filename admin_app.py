"""
Email: taozh@cisco.com / taozh1982@gmail.com

使用
-[数据库初始化&常用函数] http://zhangyiheng.com/blog/articles/py_flaskz_model_init.html
-[数据模型扩展类] http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html
-[API封装、访问权限控制和系统日志] http://zhangyiheng.com/blog/articles/py_flaskz_api.html
-[常用函数] http://zhangyiheng.com/blog/articles/py_flaskz_utils.html
-[基于Flaskz的管理系统开发模板] http://zhangyiheng.com/blog/articles/py_flaskz_admin.html
-[使用手册] http://zhangyiheng.com/blog/articles/py_flaskz_manual.html
"""
import os

from app import create_app
from cli import init_cli

# 获取应用配置&创建应用
app = create_app(os.getenv('APP_CONFIG', 'default'))

# 初始化命令行

init_cli(app)
# shell工具
# from shell import init_shell
# init_shell(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=666, debug=True, threaded=False)

__version__ = '1.6'
