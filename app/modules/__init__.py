"""
Custom modules, include model and logic

业务模型类目录，请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html
template为实例，需删除
"""
# app/modules/__init__.py
from flaskz import res_status_codes
from flaskz.models import ModelBase
from flaskz.utils import filter_list

from ..utils import get_current_user_id, is_admin_user

# 避免IDE自动删除未引用导入
if ModelBase:
    pass


class AutoModelMixin:
    """系统自动维护列，auto_columns中的列不受请求参数影响，系统自动维护"""
    auto_columns = ['id', 'created_at', 'updated_at']


class UserBaseModelMixin:
    """
    基于用户的数据访问控制功能扩展
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

    # @declared_attr
    # def user_id(cls):
    #     """
    #     统一添加user_id列，加了以后，继承UserBaseModelMixin的模型类会自动添加user_id列
    #     """
    #     return Column(Integer, ForeignKey('sys_users.id'), nullable=False)

    @classmethod
    def get_user_fk_field(cls):
        """
        返回业务模型类中的用户外键, 重写以自定外键
        :return:
        """
        return 'user_id'

    @classmethod
    def get_add_data(cls, data):
        """自动向添加数据添加当前用户相关外键值"""
        return super().get_add_data(cls._append_user_fk_value(data))

    @classmethod
    def get_update_data(cls, data):
        """自动删除/重置编辑数据的用户相关外键值"""
        user_fk_field = cls.get_user_fk_field()
        if user_fk_field:
            # After the data is modified by other users, whether to modify user_id, 1 or 2
            data.pop(user_fk_field, None)  # 1. not modify user_id
            # cls._append_user_fk_value(data)    # 2. modify user_id
        return super().get_update_data(data)

    @classmethod
    def query_all(cls):
        """过滤当前用户的数据列表"""
        user_fk_field = cls.get_user_fk_field()
        per_user = False
        if user_fk_field and not is_admin_user():
            per_user = True

        if per_user:
            current_user_id = get_current_user_id()
            if current_user_id is None:  # not logged in
                return True, []

        success, result = super().query_all()
        if success is True and per_user:
            return success, filter_list(result, lambda item: str(getattr(item, user_fk_field, None)) == current_user_id)
        return success, result

    @classmethod
    def query_pss(cls, pss_option):
        """条件查询添加当前用户过滤"""
        user_fk_field = cls.get_user_fk_field()
        per_user = False
        if user_fk_field and not is_admin_user():
            per_user = True

        if per_user:
            current_user_id = get_current_user_id()
            if current_user_id is None:  # not logged in
                return True, {'count': 0, 'data': []}
            else:
                filter_ands = pss_option.get('filter_ands', [])
                filter_ands.append(user_fk_field + "='" + str(current_user_id) + "'")
                pss_option['filter_ands'] = filter_ands
        return super().query_pss(pss_option)

    @classmethod
    def _append_user_fk_value(cls, data):
        user_id_field = cls.get_user_fk_field()
        if user_id_field:
            data[user_id_field] = get_current_user_id()
        return data


class PKConvertModelMixin:
    """
    主键值和其他键值的自动转换
    Convert other value to primary key value.

    class Device(ModelBase, PKConvertModelMixin, ModelMixin):
        @classmethod
        def get_key_field(cls):
            return 'device'
    """

    @classmethod
    def get_update_data(cls, data):
        pk_value = cls.query_pk_value(data)
        if pk_value is None:
            return res_status_codes.db_data_not_found
        data[cls.get_primary_field()] = pk_value
        return data

    @classmethod
    def get_delete_data(cls, pk_value):
        pk_value = cls.query_pk_value(pk_value)
        if pk_value is None:
            return res_status_codes.db_data_not_found
        return pk_value

    @classmethod
    def query_pk_value(cls, data, key_field=None):
        """根据其他键值查询主键值"""
        is_dict_data = type(data) is dict
        pk_field = cls.get_primary_field()
        key_field = key_field or cls.get_key_field()
        key_value = data
        if is_dict_data:
            pk_value = data.get(pk_field)  # if pk value in data, just return
            if pk_value is not None:
                return pk_value
            key_value = data.get(key_field)
        if key_value is not None:
            ins = cls.query_by({key_field: key_value}, return_first=True)
            if ins:
                return getattr(ins, pk_field, None)

    @classmethod
    def get_key_field(cls):
        """
        rewrite to return key field(unique)

        example:
            'device' / 'interface'
        """
        return 'name'
