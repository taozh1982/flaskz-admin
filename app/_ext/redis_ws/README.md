## 关于

websockets+redis实现的消息广播功能

1. websockets单独使用
2. redis主要用于消息中转，主要用于不持有websocket连接对象的场景，例如通过APScheduler或Celery等任务调度中发送消息

## 使用

1. 安装`websockets`和`redis`包
   ```shell
   pip install websockets
   pip install redisz
   ```
   
2. 添加相关配置
   ```python
   REDIS_URL = None  # redis地址，单节点/哨兵
   # REDIS_URL = '10.124.206.62:7001'    # 单节点模式
   # REDIS_URL = 'sentinel://10.124.206.61:27001;10.124.206.62:27001;10.124.206.63:27001' #哨兵模式
   REDIS_KWARGS = None  # redis参数，例如哨兵模式下所使用的database等
   
   WEBSOCKET_HOST = None  # 如果为None, host=0.0.0.0
   WEBSOCKET_PORT = 3667  # websocket服务端口号
   REDIS_WEBSOCKET_DEFAULT_CHANNEL = "ws:channel"  # redis websocket订阅的默认channel
   REDIS_WEBSOCKET_MESSAGE_TIMEOUT = 1  # redis websocket消息等待时间
   ```

3. 调用`init_websocket`方法初始化
   ```python
   from ._ext.redis_ws import init_websocket
   init_websocket(app)
   ```

4. 客户端
   ```javascript
   var ws = new WebSocket(url);
   /**
   * url示例:
   * - ws://127.0.0.1:3667  //默认channel(ws:channel)
   * - ws://127.0.0.1:3667/abc  //指定channel(abc)
   */
   ws.onopen = function () {
      console.log("open websocket:" + url)
   }
   // 接收到服务器消息后的回调函数
   ws.onmessage = function (evt) {
      console.log("recv msg: " + evt.data)
   };
   // 连接关闭后的回调函数
   ws.onclose = function () {
      console.log("close websocket:" + url)
   };
   ```

## websockets vs SocketIO

1. 服务端: SocketIO要单独启动服务，而websockets可以作为主服务进程的一个守护进程运行
2. 客户端: SocketIO要使用socket.io.js，而websockets可以直接使用原生WebSocket对象

## 注意

1. 仅支持Redis单节点和哨兵部署模式，不支持Redis集群`'redis.asyncio.RedisCluster' object has no attribute 'pubsub'`
