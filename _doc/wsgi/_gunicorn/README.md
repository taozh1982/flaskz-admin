## 使用

1. 拷贝`_gunicorn`目录到项目主目录(admin_app.py所在目录)
2. 修改`_gunicorn/gunicorn_config.py`中的相关参数
    - `wsgi_app`: WSGI应用程序路径，格式为`MODULE_NAME:VARIABLE_NAME`，示例)`wsgi_app = 'admin_app:app'`
    - `bind`: 绑定的地址和端口号(用于访问)，格式是`[ADDRESS]:[PORT]`，默认是`127.0.0.1:8000`，示例)`bind = '0.0.0.0:666'`
    - `workers`: 工作进程数，默认是`1`，一般根据CPU核数设置, 示例)`workers = multiprocessing.cpu_count()* 2 + 1`
    - `worker_class`: 工作模式，比如 `sync`, `gevent`, `eventlet`, `gthread` 等，默认是 `sync`，如果有高并发要求，建议设置成`gevent`或`eventlet`
    - `daemon`: 是否以守护进程模式运行gunicorn，默认是`False`，如果通过`supervisor`管理服务，设置为`False`
    - `loglevel`: 日志级别，选项包括 `debug`, `info`, `warning`, `error`, `critical`，默认是`info`
    - `timeout`: 设置工作进程在被重启之前可以挂起的秒数，默认是`30` 秒
    - `reload`: 开启代码重载，如果应用代码有变动，gunicorn 会自动重启工作进程，这主要用于开发环境
3. 启动gunicorn: `gunicorn -c _gunicorn/gunicorn_config.py`
4. 查看gunicorn: `ps -ef | grep gunicorn`
