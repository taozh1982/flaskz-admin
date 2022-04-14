from datetime import datetime

from flask_login import current_user, UserMixin
from flaskz import res_status_codes
from flaskz.models import ModelBase, ModelMixin, create_instance, db_session
from sqlalchemy import Column, Integer, String, Table, ForeignKey, DateTime, Boolean, Text, desc
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from ..modules import AutoModelMixin

# Menu operation permission
sys_menu_op_permissions = Table('sys_menu_op_permissions', ModelBase.metadata,
                                Column('menu_id', Integer, ForeignKey('sys_menus.id', ondelete='CASCADE')),
                                Column('permission', String(32), ForeignKey('sys_op_permissions.permission', ondelete='CASCADE')))


class OPPermission(ModelBase, ModelMixin):
    """
    operation permission list
    """
    __tablename__ = 'sys_op_permissions'

    permission = Column(String(32), primary_key=True, unique=True, index=True)
    label = Column(String(32), nullable=False)
    description = Column(String(255))


class Menu(ModelBase, ModelMixin):
    """
    menu list
    """
    __tablename__ = 'sys_menus'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    parent_id = Column(Integer)
    path = Column(String(255))
    description = Column(String(255))

    op_permissions = relationship('OPPermission', secondary=sys_menu_op_permissions, lazy='joined')

    # menu_ops = relationship("MenuOPS", primaryjoin='Menu.id == MenuOPS.menu_id', cascade="all")

    @classmethod
    def add_to_db(cls, json_data):
        try:
            instance = create_instance(cls, json_data, create_relationship=False)
            with db_session() as session:
                session.add(instance)
                op_permissions = json_data.get('op_permissions', [])
                for op_permission in op_permissions:
                    instance.op_permissions.append(OPPermission.query_by_pk(op_permission.get('permission')))
        except Exception as e:
            flaskz_logger.exception(e)
            raise
        return instance


class RoleMenu(ModelBase, ModelMixin):
    __tablename__ = 'sys_role_menus'

    id = Column(Integer, primary_key=True, autoincrement=True)
    role_id = Column(Integer, ForeignKey('sys_roles.id', ondelete='CASCADE'), nullable=False)
    menu_id = Column(Integer, ForeignKey('sys_menus.id', ondelete='CASCADE'), nullable=False)
    permission = Column(String(32), ForeignKey('sys_op_permissions.permission', ondelete='CASCADE'))


class Role(ModelBase, ModelMixin, AutoModelMixin):
    __tablename__ = 'sys_roles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(32), unique=True, nullable=False)
    default = Column(Boolean, default=False)

    description = Column(String(255))
    created_user = Column(String(32))
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)

    menus = relationship('RoleMenu', cascade='all,delete-orphan')

    def has_menu_permission(self, module, op_permission):
        menu_json_list = _get_app_cache_menus()
        module_menu = find_list(menu_json_list, lambda menu_json_item: Role._check_menu_permission(menu_json_item, module))
        if module_menu:
            menu_id = module_menu.get('id')
            return find_list(self.menus, lambda item: Role._check_menu_op_permission(item, menu_id, op_permission)) is not None
        return False

    @staticmethod
    def _check_menu_permission(menu_json_item, module):
        return menu_json_item.get('path') == module

    @staticmethod
    def _check_menu_op_permission(role_menu_item, menu_id, op_permission):
        if role_menu_item.menu_id != menu_id:
            return False

        if op_permission is not None:
            if op_permission == 'add' or op_permission == 'update' or op_permission == 'delete':
                op_permission = 'update'
            return role_menu_item.permission == op_permission
        return True

    def get_menus(self):
        """
        Get the menu list of the role, include parent menu
        :return:
        """
        all_menus = Menu.query_all()
        if all_menus[0] is False:
            return all_menus
        all_menus = all_menus[1]

        menu_map = {}
        for item in all_menus:
            menu_map[item.id] = item

        menus = []
        added = {}
        for item in self.menus:
            Role._add_menu_item(item.menu_id, menu_map, menus, added)
        menus.sort(key=lambda i: i.id)

        return menus

    @staticmethod
    def _add_menu_item(menu_id, menu_map, menus, added):
        if menu_id is None:
            return
        menu_obj = menu_map.get(menu_id)
        if menu_obj:
            if menu_id not in added:
                menus.append(menu_obj)
                added[menu_id] = menu_obj
            Role._add_menu_item(menu_obj.parent_id, menu_map, menus, added)

    @staticmethod
    def to_client_json(role_model_json):
        json_menus = []
        for item in role_model_json.get('menus', []):
            menu_id = item.get('menu_id')
            permission = item.get('permission')
            _item = find_list(json_menus, lambda _i: _i.get('menu_id') == menu_id)
            if _item is None:
                _item = {
                    'menu_id': menu_id,
                    'op_permissions': []
                }
                json_menus.append(_item)
            if permission is not None:
                _item.get('op_permissions').append(permission)

        role_model_json['menus'] = json_menus
        return role_model_json

    @staticmethod
    def to_server_json(role_client_json):
        model_json = {}
        model_json.update(role_client_json)
        model_json_menus = []
        for item in role_client_json.get('menus', []):
            op_permissions = item.get('op_permissions')
            if not op_permissions:
                op_permissions = [None]

            for permission in op_permissions:
                model_json_menus.append({
                    'menu_id': item.get('menu_id'),
                    'permission': permission
                })
        model_json['menus'] = model_json_menus
        return model_json


class User(ModelBase, ModelMixin, UserMixin, AutoModelMixin):
    __tablename__ = 'sys_users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String(32), nullable=False, default='local')  # local/ldap/aaa
    username = Column(String(32), unique=True, nullable=False)  # account
    password_ = Column('password', String(128), nullable=False)  # hash password
    status = Column(String(32), default='enable')  # disable/enable
    email = Column(String(32), nullable=False)
    name = Column(String(32))  # full name
    phone = Column(String(32))

    role_id = Column(Integer, ForeignKey('sys_roles.id'), nullable=False)

    role = relationship('Role')

    last_login_at = Column(DateTime())

    description = Column(String(255))
    created_user = Column(String(32))  #
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)

    @hybrid_property
    def password(self):
        return self.password_

    @password.setter
    def password(self, pwd):
        self.password_ = generate_password_hash(pwd)

    @staticmethod
    def verify_password(username, password):
        """
        verify username and password

        :param username:
        :param password:
        :return:
        """
        try:
            items = User.query_by({'username': username.strip()})
            if len(items) == 0:
                return False, res_status_codes.account_not_found
            item = items[0]
            if item.status != 'enable':
                return False, res_status_codes.account_disabled
            if check_password_hash(item.password_, password.strip()) is True:
                return True, item
            else:
                return False, res_status_codes.account_verify_err
        except Exception as e:
            flaskz_logger.exception(e)
            return False, res_status_codes.db_query_err

    @classmethod
    def to_dict_field_filter(cls, field):
        return field not in ['password', 'last_login_at'] and super().to_dict_field_filter(field)

    @classmethod
    def check_delete_data(cls, pk_value):
        if current_user.id == int(pk_value):  # disable delete self
            return res_status_codes.db_data_in_use
        return super().check_delete_data(pk_value)

    def can(self, module, op_permission):  # permission check
        return self.role.has_menu_permission(module, op_permission)


class OPLog(ModelBase, ModelMixin):
    __tablename__ = 'sys_op_logs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(32), nullable=False)  #
    user_name = Column(String(32))  #
    user_ip = Column(String(32))  #

    module = Column(String(32))  # The name of the module, ex Role Mgmt/User Mgmt
    action = Column(String(32))  # add/remove/update

    req_data = Column(Text())  #
    res_data = Column(Text())  #
    result = Column(String(32))  # success/fail

    description = Column(Text())  #

    created_at = Column(DateTime(), default=datetime.now)  #

    like_columns = ['module', 'description']

    @classmethod
    def check_add_data(cls, json_data):
        """not check"""
        return True

    @classmethod
    def get_query_default_order(cls):
        """
        Return the default query order.
        :return:
        """
        return desc(cls.created_at)


def _get_app_cache_menus():
    """
    To improve performance, save the menu data(json) in the app cache.
    Only used in Role.has_menu_permission
    :return:
    """
    menus = get_app_cache('sys_menus')
    if menus is None:
        menus = []
        mode_menus = Menu.query_all()
        if mode_menus[0] is True:
            mode_menus = mode_menus[1]
            for menu in mode_menus:
                menus.append(menu.to_dict())
        # for menu in mode_menus:
        #     menus.append(menu.to_dict())
        set_app_cache('sys_menus', menus, expire_minutes=60)
    return menus


from flaskz.log import flaskz_logger
from flaskz.utils import find_list, get_app_cache, set_app_cache
