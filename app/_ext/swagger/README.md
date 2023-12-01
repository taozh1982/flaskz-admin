## 关于

API Swagger文档

## 使用

1. 安装`flasgger`
   ```shell
   pip install flasgger
   ```

2. 添加相关配置(可省略)
   ```python
   SWAGGER_TEMPLATE = {
       'info': {
           'title': 'Flaskz Admin API',  # API标题(body)
           'description': 'API for Flaskz Admin',  # 描述
           'version': '1.0'  # 版本
       },
       'securityDefinitions': {
           'Authorization': {
               'type': 'apiKey',  # 授权类型 type/apiKey(token)
           }
       }
   }
   ```

3. 编写API文档
    - API编写请参考[flasgger文档](https://github.com/flasgger/flasgger)
    - API列表请参考[url_map](http://127.0.0.1:666/sys-mgmt/_/url_map/)
    - [example示例](./modules/ex_simples.py)


4. 调用`init_swagger`方法初始化
   ```python
    from ._ext.swagger import init_swagger
    init_swagger(app)
   ```

5. 按需定制UI
    - 外链JS&CSS
    - 修改flasgger的源文件
