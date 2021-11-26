"""
业务模型类目录，请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html
template为实例，需删除
"""


# custom modules, include model and logic
class AutoModelMixin:
    auto_columns = ['id', 'created_user', 'created_at', 'updated_at']
