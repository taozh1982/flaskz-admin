## 关于

websockets+redis实现的消息广播功能

1. websockets可单独使用
2. redis主要用于消息中转，主要用于没有socket对象的场景，例如通过APScheduler或Celery等进行任务调度并发送消息

## 使用

1. 安装`websockets`和`redis`包
   ```shell
   pip install websockets
   pip install redis # 按需
   ```
   
2. 添加相关配置
   ```python
   # redis相关配置, 按需配置
   REDIS_URL = None
   # websocket配置, 按需配置
   WEBSOCKET_HOST = None  # 如果为None, host=0.0.0.0
   WEBSOCKET_PORT = 3667  # websocket端口号
   REDIS_WEBSOCKET_DEFAULT_CHANNEL = "ws:channel"  # redis websocket订阅的默认channel
   REDIS_WEBSOCKET_MESSAGE_TIMEOUT = 1  # redis websocket消息等待时间
   ```
3. 调用`init_websocket`方法初始化
   ```python
   from . import redis_ws
   redis_ws.init_websocket(app) # 初始化
   ```

## websockets vs SocketIO

1. 服务端: SocketIO要单独启动服务，而websockets可以作为主服务进程的一个守护进程运行
2. 客户端: SocketIO要使用socket.io.js，而websockets可以直接使用原生WebSocket对象
