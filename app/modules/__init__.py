"""
业务模型类目录，请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html
template为实例，需删除
"""
# app/modules/__init__.py
from flaskz.models import ModelBase
# 避免IDE自动删除未引用导入
if ModelBase:
    pass

# custom modules, include model and logic
class AutoModelMixin:
    auto_columns = ['id', 'created_user', 'created_at', 'updated_at']
