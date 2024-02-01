## 关于

NCS扩展，用于将NCS操作从数据模型中解耦

## 使用

- `apply`用于NCS下发，通过创建继承自`NCSApply`的子类和重写方法实现对不同网络服务的NCS操作
    - 重写`get_url/get_url_params`方法指定请求url及查询参数
    - 重写`to_ncs_data`方法返回调用NCS API的payload
    - 除了支持单个NCS业务的操作，还支持通过`yang-patch`对多个业务的批量下发
        - 重写`get_patch_value_key`方法返回yang path value的key ex)srte:sr-policy
        - 重写`get_patch_target`方法返回yang path的target
- `ncs_urls.py`中指定NCS请求的URL列表
- `model`用于数据模型类的扩展，`ModelNCSMixin`重写了`before_add/before_update/before_delete`方法为业务模型增加NCS逻辑，可以通过创建继承自ModelNCSMixin的子类和重写方法实现对不同网络服务的NCS操作
    - 重写`get_ncs_apply`方法指定对应的apply(解耦)
    - 重写`get_ncs_data`方法返回供apply使用的数据，

### apply.to_ncs_data和model.get_ncs_data的区别

两者都用于返回参数，但是用途不太一样

- **apply.to_ncs_data返回的是调用NCS的payload**，一般不建议在其中再进行数据查询等操作
- **model.get_ncs_data返回的是供apply使用的数据**，包含apply所需的全部参数，可能需要在现有数据基础上附加一些NCS用到的信息，例如)添加设备时，需要附加driver和授权相关的信息

### 配置参数

```python
NCS_ENABLE = True  # 是否启用NCS
NCS_URI = None  # NCS服务URI
NCS_USERNAME = None  # NCS服务账号
NCS_PASSWORD = None  # NCS服务密码
```

## 示例

1. 数据模型类

   ```python
   class Device(ModelBase, ModelNCSMixin, ModelMixin):  # 继承ModelNCSMixin以添加NCS调用功能
       """设备"""
       __tablename__ = 'devices'
   
       id = Column(Integer, primary_key=True, autoincrement=True)
       name = Column(String(32), unique=True, nullable=False)   # 管理名称
       hostname = Column(String(32))    # 主机名
       vendor_id = Column(Integer, ForeignKey("device_vendors.id")) # 厂商
       model_id = Column(Integer, ForeignKey("device_models.id"))   # 设备型号
       ip_address = Column(String(32))  # 地址
       protocol = Column(String(32))    # 管理协议(ssh/telnet)
       port = Column(Integer)   # 管理端口
       auth_id = Column(Integer, ForeignKey("device_auths.id")) # 授权
   
       @classmethod
       def get_ncs_data(cls, json_data, op_type):       # 返回apply需要的全部参数
           auth = DeviceAuth.query_by_pk(json_data.get('auth_id'))
           if auth is None:
               return None
           dev_model = DeviceModel.query_by_pk(json_data.get("model_id"))
           if dev_model is None:
               return None
           json_data['auth'] = {'id': auth.id, 'name': auth.name}
           json_data['driver'] = {'type': dev_model.driver.type, 'name': dev_model.driver.name,
                               'oper_name': dev_model.driver.oper_name}
           return json_data
   
       @classmethod
       def get_ncs_apply(cls):      # 指定对应的NCSApply
           return DeviceNCSApply
   ```

2. NCS下发类

    ```python
    class DeviceNCSApply(NCSApply):  # 用于NCS调用
    
        @classmethod
        def to_ncs_data(cls, value, op_type):  # 返回调用NCS的payload，value包含payload所需的全部参数
            if op_type == 'delete' or op_type is None:
                return value
    
            driver = value.get('driver', {})
            auth_name = value.get('auth').get('name')
            driver_type = driver.get('type')
            driver_oper_name = driver.get('oper_name')
            driver_id = driver_oper_name or driver.get('name')
            device_type = {
                driver_type: {
                    'ned-id': driver_id,
                }
            }
            if driver_type != 'netconf':
                device_type[driver_type]['protocol'] = value.get('protocol')
    
            response = {
                'name': value.get('name'),
                'address': value.get('ip_address'),
                'port': value.get('port'),
                'authgroup': auth_name,
                'device-type': device_type,
                'state': {
                    'admin-state': 'unlocked'
                }
            }
    
            if driver_oper_name:
                response['live-status-protocol'] = [{
                    'name': '',
                    'authgroup': auth_name,
                    'device-type': device_type
                }
                ]
            return {
                'tailf-ncs:device': [response]
            }
    
        @classmethod
        def get_url(cls, value):  # 指定NCS URL
            return ncs_urls.device
    ```