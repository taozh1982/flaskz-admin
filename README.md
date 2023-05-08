## 关于

Flaskz-admin是基于 [Flaskz](https://pypi.org/project/flaskz/) 的管理系统开发模板，提供了基础的代码框架和文件目录， 可用于快速搭建系统开发框架和进行业务模块的开发

## 使用

1. [☞数据库初始化&常用函数](http://zhangyiheng.com/blog/articles/py_flaskz_model_init.html)
2. [☞数据模型扩展类](http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html)
3. [☞API封装、访问权限控制和系统日志](http://zhangyiheng.com/blog/articles/py_flaskz_api.html)
4. [☞常用函数](http://zhangyiheng.com/blog/articles/py_flaskz_utils.html)
5. [☞基于Flaskz的管理系统开发模板 Flaskz-admin (Hello World*)](http://zhangyiheng.com/blog/articles/py_flaskz_admin.html)
6. [☞使用手册](http://zhangyiheng.com/blog/articles/py_flaskz_manual.html)
7. [☞开发规范](http://zhangyiheng.com/blog/articles/dev_spec.html)

## 快速入门

1. 修改系统配置参数[config.py](./config.py)
    - `FLASKZ_DATABASE_URI` - 数据库地址(默认为`./_sqlite/flaskz-admin.db`)
2. 修改alembic配置参数[alembic.ini](./alembic.ini)
    - `sqlalchemy.url` - 数据库地址(默认为`./_sqlite/flaskz-admin.db`)
3. 安装[requirements](requirements.txt)依赖 - `pip install -r requirements.txt`
4. [cli](./cli.py)初始化数据库(`_sqlite/flaskz-admin.db`已经完成初始化)
    1. 设置cli环境变量
        - `export FLASK_APP=admin_app.py` # Mac/Linux
        - `set FLASK_APP=admin_app.py`    # Windows
    2. 初始化[数据库表](./migrations/versions/0.1_init_sys_mgmt.py) - `flask admin db upgrade`   # password:taozh
    3. 初始化[数据库数据](./app/sys_mgmt/_init_db.py) -`flask admin db init`  # password:taozh
5. 启动[应用](./admin_app.py)
    1. 设置Flask环境变量 - `export FLASK_APP=admin_app.py`
    2. 启动Flask应用 - `flask run --host=0.0.0.0 --port=666`
6. 访问
    - 地址: [http://127.0.0.1:666](http://127.0.0.1:666)
    - 账号/密码: admin/admin

## 文件&目录

- _doc: 系统文档
    - flaskz-admin.postman_collection.json: API Postman文件
- _sqlite: sqlite数据库文件目录(按需使用)
- _syslog: 系统日志存放目录
- **app**: 主应用目录
    - _ext: 扩展功能目录(按需使用)
        - nso: NSO功能扩展
        - redis_ws: Redis+Websocket功能扩展
    - **api**: API目录，存放应用所有api封装
    - app_page: 前端页面静态文件目录(基于focus-ui)，也可通过nginx等代理软件实现文件服务功能(按需使用)
    - **main**: 页面服务和应用异常处理目录
        - errors.py: 应用异常处理
        - page.py: 页面服务
    - **modules**: 系统模块/数据模型类封装目录
    - sys_init: 应用初始化目录
        - status_codes.py: 系统状态码&国际化
    - sys_mgmt: 默认提供的基于角色的权限控制功能目录(按需使用)
        - license: license功能目录
        - _init_db.py: 系统数据初始化(模块+角色+权限)
        - auth.py: 系统校验(登录+权限检查)
        - _private.py: 内部/私有功能(查看系统日志/查看系统路由)
    - utils: 系统工具类目录
    - **__init.py**: 应用创建和初始化
- **migrations**: alembic数据库迁移目录，用于存放数据库迁移文件，按需使用
    - versions: 数据库迁移版本目录
- **alembic.ini**: alembic配置文件
- test: 单元测试目录
- **admin_app.py**: 应用程序主入口
- cli.py: 命令行工具，可用于数据初始化等`flask admin db help`
- **config.py**: 系统配置(for 开发)
- config.ini: 系统配置文件(for 运维)，可省略，config.ini中属性的优先级>config.py中定义的属性
- **requirements.txt**: 依赖lib列表`pip install -r requirements.txt`

## 版本

- **1.5** `2023/05/01`
    - [C] 重构系统RBAC权限管理模块(sys_mgmt)
    - [C] 重构系统管理API(参考开发规范)