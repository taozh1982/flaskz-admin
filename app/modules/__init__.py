"""
Custom modules, include model and logic

业务模型类目录，请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html
template为实例，需删除
"""
# app/modules/__init__.py
from flaskz.models import ModelBase
from flaskz.utils import filter_list

from ..utils import get_current_user_id, is_admin_user

# 避免IDE自动删除未引用导入
if ModelBase:
    pass


class AutoModelMixin:
    """
    Set up auto-generated columns
    """
    auto_columns = ['id', 'created_at', 'updated_at']


class UserBaseModelMixin:
    """
    User-based data access control
    Users can only access their own data

        class Customer(ModelBase, UserBaseModelMixin, ModelMixin, AutoModelMixin): # Put UserBaseModelMixin before ModelMixin to enable
            __tablename__ = 'lic_customers'

            id = Column(Integer, primary_key=True, autoincrement=True)
            name = Column(String(255), nullable=False)  # customer name，ex)Cisco
            description = Column(String(255))
            user_id = Column(Integer, ForeignKey('sys_users.id'), nullable=False)  # User ID for customer created

            created_at = Column(DateTime(), default=datetime.now)
            updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
    """

    @classmethod
    def get_user_id_field(cls):
        """
        Get the user id field
        Rewrite to return the specified user id field
        :return:
        """
        return 'user_id'

    @classmethod
    def get_add_data(cls, data):
        return super().get_add_data(cls._append_user_id(data))

    @classmethod
    def get_update_data(cls, data):
        user_id_field = cls.get_user_id_field()
        if user_id_field:
            # After the data is modified by other users, whether to modify user_id, 1 or 2
            data.pop(user_id_field, None)  # 1. not modify user_id
            # cls._append_user_id(data)    # 2. modify user_id
        return super().get_update_data(data)

    @classmethod
    def query_all(cls):
        user_id_field = cls.get_user_id_field()
        per_user = False
        if user_id_field and not is_admin_user():
            per_user = True

        if per_user:
            current_user_id = get_current_user_id()
            if current_user_id is None:  # not logged in
                return True, []

        success, result = super().query_all()
        if success is True and per_user:
            return success, filter_list(result, lambda item: str(getattr(item, user_id_field)) == current_user_id)
        return success, result

    @classmethod
    def query_pss(cls, pss_option):
        user_id_field = cls.get_user_id_field()
        per_user = False
        if user_id_field and not is_admin_user():
            per_user = True

        if per_user:
            current_user_id = get_current_user_id()
            if current_user_id is None:  # not logged in
                return True, {'count': 0, 'data': []}
            else:
                filter_ands = pss_option.get('filter_ands', [])
                filter_ands.append(user_id_field + "='" + str(current_user_id) + "'")
                pss_option['filter_ands'] = filter_ands
        return super().query_pss(pss_option)

    @classmethod
    def _append_user_id(cls, data):
        user_id_field = cls.get_user_id_field()
        if user_id_field:
            data[user_id_field] = get_current_user_id()
        return data
