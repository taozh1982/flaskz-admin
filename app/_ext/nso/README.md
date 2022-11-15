## NSO 扩展

将NSO操作从数据模型中解耦

### 使用

- `apply`用于NSO下发，通过创建继承自`NSOApply`的子类和重写方法实现对不同网络服务的NSO操作
    - 重写`get_url/get_url_params`方法指定请求url及查询参数
    - 重写`to_nso_data`方法返回调用NSO API的payload
    - 除了支持单个NSO业务的操作，还支持通过`yang-patch`对多个业务的批量下发
        - 重写`get_patch_value_key`方法返回yang path value的key ex)srte:sr-policy
        - 重写`get_patch_target`方法返回yang path的target
- `apply_urls.py`中指定NSO请求的URL列表
- `model`用于数据模型类的扩展，`ModelNSOMixin`重写了`before_add/before_update/before_delete`方法为业务模型增加NSO逻辑，可以通过创建继承自ModelNSOMixin的子类和重写方法实现对不同网络服务的NSO操作
    - 重写`get_nso_apply`方法指定对应的apply(解耦)
    - 重写`get_nso_data`方法返回供apply使用的数据，

###### apply.to_nso_data和model.get_nso_data的区别

两者都用于返回参数，但是用途不太一样

- **apply.to_nso_data返回的是调用NSO的payload**，一般不建议在其中再进行数据查询等操作
- **model.get_nso_data返回的是供apply使用的数据**，包含apply所需的全部参数，可能需要在现有数据基础上附加一些NSO用到的信息，例如)添加设备时，需要附加ned和授权组相关的信息
