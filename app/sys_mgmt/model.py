from datetime import datetime

from flask_login import current_user, UserMixin
from flaskz import res_status_codes
from flaskz.log import flaskz_logger
from flaskz.models import ModelBase, ModelMixin, BaseModelMixin
from flaskz.rest import get_rest_log_msg
from flaskz.utils import find_list, get_app_cache, set_app_cache, get_ins_mapping
from sqlalchemy import Column, Integer, String, Table, ForeignKey, DateTime, Boolean, Text, desc
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from ..modules import AutoModelMixin

# 模块&动作关联
# #module#      #action#
# user          add
# user          update
# user          config_email
sys_module_actions = Table('sys_module_actions', ModelBase.metadata,
                           Column('module', String(100), ForeignKey('sys_modules.module', ondelete='CASCADE', onupdate='CASCADE')),
                           Column('action', String(100), ForeignKey('sys_actions.action', ondelete='CASCADE', onupdate='CASCADE')))


class SysAction(ModelBase, ModelMixin):
    """
    系统所有操作列表

    action: 操作, 用于权限控制和角色管理模块 ex)add/update/edit/config
    label: 操作名称,用于角色管理模块 ex)Config Email
    """
    __tablename__ = 'sys_actions'

    action = Column(String(100), primary_key=True, unique=True, index=True)  # add/delete
    label = Column(String(100), nullable=False)  # Add/Delete
    description = Column(String(255))


class SysModule(ModelBase, ModelMixin):
    """
    系统模块列表，模块不一定是菜单，有path属性的模块才会是菜单(SysRole.get_menus)

    name: 模块名字, 用于角色管理模块和系统菜单导航 ex)角色管理
    parent_id: 父模块id
    module: 模块, 用于权限控制和角色管理模块 ex)roles
    path: 路径, 用于前端页面导航和页面返回 ex)roles
    category: 模块分类, 用于平台多业务管理  ex)VPN
    actions: 模块操作列表
    """
    __tablename__ = 'sys_modules'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    parent_id = Column(Integer)
    module = Column(String(100), unique=True)  # 用于api和权限控制, path可能为空, 但是module不能为空(例如:只通过api调用的模块)
    path = Column(String(100), unique=True)  # 用于页面导航(前端hash & main/page.py)
    category = Column(String(100))  # 用于模块分类, 多系统整合
    description = Column(String(255))

    actions = relationship('SysAction', secondary=sys_module_actions, lazy='joined')  # 模块操作列表, 不同的模块有不同的操作列表


class SysRoleModule(ModelBase, ModelMixin):
    """
    角色对应的模块和操作列表
    一个角色对应多条记录

    role_id: 角色ID
    module_id: 模块ID
    action: 操作权限
    """
    __tablename__ = 'sys_role_modules'

    id = Column(Integer, primary_key=True, autoincrement=True)
    role_id = Column(Integer, ForeignKey('sys_roles.id', ondelete='CASCADE'), nullable=False)
    module_id = Column(Integer, ForeignKey('sys_modules.id', ondelete='CASCADE'), nullable=False)
    action = Column(String(100), ForeignKey('sys_actions.action', ondelete='CASCADE'))


class SysRole(ModelBase, ModelMixin, AutoModelMixin):
    """
    角色列表

    name: 角色名称
    default: 是否是默认角色(常用于第三方用户校验)
    modules: 模块+操作权限列表
    """
    __tablename__ = 'sys_roles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    default = Column(Boolean, default=False)
    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)

    modules = relationship('SysRoleModule', cascade='all,delete-orphan')

    def check_permission(self, module, action):
        """
        权限检查
        :param module: 要检查的模块名称
        :param action: 要检查的操作
        :return:
        """
        checked_module_id = SysRole._find_module_id(module)
        if checked_module_id:
            for role_module_ins in self.modules:
                if SysRole._check_module_action_permission(role_module_ins, checked_module_id, action) is True:
                    return True
        return False

    @staticmethod
    def _find_module_id(module_name):
        """返回module名对应的module对象"""
        module_json_list = get_app_cached_modules()
        for item in module_json_list:
            if item.get('module') == module_name:
                return item.get('id')
        return None

    @staticmethod
    def _check_module_permission(menu_json_item, module):
        """检查是否是指定的模块"""
        return menu_json_item.get('module') == module

    @staticmethod
    def _check_module_action_permission(role_module_ins, module_id, action):
        """检查是否包含指定的操作权限"""
        if role_module_ins.module_id != module_id:
            return False

        if action is not None:
            if action == 'add' or action == 'update' or action == 'delete':  # 简化操作，只检查是否有编辑权限，根据需求设置
                action = 'update'
            return role_module_ins.action == action
        return True

    def get_menus(self):
        """
        返回角色的菜单列表(包括父菜单)
        :return:
        """
        all_modules = SysModule.query_all()
        if all_modules[0] is False:
            return all_modules
        all_modules = all_modules[1]
        module_ins_map = get_ins_mapping(all_modules, 'id')

        menus = []
        added_map = {}
        for item in self.modules:
            SysRole._add_menu_item(item.module_id, module_ins_map, menus, added_map)
        menus.sort(key=lambda i: i.id)

        return menus

    @staticmethod
    def _add_menu_item(module_id, module_map, menus, added, is_parent=False):
        if module_id is None:
            return
        module_ins = module_map.get(module_id)
        if module_ins:
            if is_parent is not True and module_ins.path is None:  # @2023-03-10 add to filter menus without path
                return
            if module_id not in added:
                menus.append(module_ins)
                added[module_id] = module_ins
            SysRole._add_menu_item(module_ins.parent_id, module_map, menus, added, True)

    @staticmethod
    def to_client_json(role_model_json):
        modules = []
        for item in role_model_json.get('modules', []):
            module_id = item.get('module_id')
            action = item.get('action')
            _item = find_list(modules, lambda _i: _i.get('module_id') == module_id)
            if _item is None:
                _item = {
                    'module_id': module_id,
                    'actions': []
                }
                modules.append(_item)
            if action is not None:
                _item.get('actions').append(action)

        role_model_json['modules'] = modules
        return role_model_json

    @staticmethod
    def to_server_json(role_client_json):
        model_json = {}
        model_json.update(role_client_json)
        modules = []
        for item in role_client_json.get('modules', []):
            actions = item.get('actions')
            if not actions:
                actions = [None]

            for action in actions:
                modules.append({
                    'module_id': item.get('module_id'),
                    'action': action
                })
        model_json['modules'] = modules
        return model_json


class SysUser(ModelBase, ModelMixin, UserMixin, AutoModelMixin):
    """
    用户列表

    type: 账号类型, local-本地账号, ldap-LDAP账号, aaa-3A认证账号
    username: 账号, 不可重复
    password_: hash以后的密码, 如果不是本地校验的话, 可能为空
    status: 账号状态, 停用或启用
    role_id: 角色ID, 为了简化操作, 使用的是单角色模式
    last_login_at: 上次登录时间(for 管理员)
    """
    __tablename__ = 'sys_users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String(100), nullable=False, default='local')  # local/ldap/aaa
    username = Column(String(100), unique=True, nullable=False)  # account
    password_ = Column('password', String(255))  # hash password
    status = Column(String(100), default='enable')  # disable/enable
    email = Column(String(100), nullable=False)
    name = Column(String(100))  # full name
    phone = Column(String(100))
    role_id = Column(Integer, ForeignKey('sys_roles.id'), nullable=False)
    last_login_at = Column(DateTime())
    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)

    role = relationship('SysRole', uselist=False)
    option = relationship('SysUserOption', cascade='all,delete-orphan', uselist=False, lazy='joined')

    @hybrid_property
    def password(self):
        return self.password_

    @password.setter
    def password(self, pwd):
        if self.type == 'local' or self.type is None:
            self.password_ = generate_password_hash(pwd)
        else:
            self.password_ = None

    @staticmethod
    def verify_password(username, password):
        """
        verify username and password

        重载以实现外部登录 & 自动添加账号功能

        :param username:
        :param password:
        :return:
        """
        try:
            user = SysUser.query_by({'username': username.strip()}, return_first=True)
            if not user:
                return False, res_status_codes.account_not_found
            if user.status != 'enable':
                return False, res_status_codes.account_disabled
            if check_password_hash(user.password_, password) is True:  # 移除password.strip()
                return True, user
            else:
                return False, res_status_codes.account_verify_err
        except Exception as e:
            flaskz_logger.exception(e)
            return False, res_status_codes.db_query_err

    @classmethod
    def to_dict_field_filter(cls, field):
        """过滤属性"""
        return field not in ['password'] and super().to_dict_field_filter(field)

    @classmethod
    def check_delete_data(cls, pk_value):
        if current_user and (current_user.id == int(pk_value)):  # 不能删除当前用户
            return res_status_codes.db_data_in_use
        return super().check_delete_data(pk_value)

    @classmethod
    def check_update_data(cls, data):
        if data.get('status') == 'disable' and (current_user and current_user.id == int(data.get('id'))):  # 不能禁用当前用户
            return res_status_codes.db_data_in_use
        return super().check_update_data(data)

    # @classmethod
    # def filter_attrs_by_columns(cls, data):
    #     attrs = super().filter_attrs_by_columns(data)
    #     if data.get('_update_updated_at') is not False:
    #         attrs['updated_at'] = datetime.now()
    #     return attrs

    def can(self, module, action):  # 权限检查
        return self.role.check_permission(module, action)


class SysUserOption(ModelBase, BaseModelMixin):
    """用户选项(内部使用)"""
    __tablename__ = 'sys_user_options'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('sys_users.id', ondelete='CASCADE'), nullable=False)
    previous_login_at = Column(DateTime())  # 上次登录时间
    last_login_at = Column(DateTime())  # 最后登录时间
    login_times = Column(Integer, default=0)  # 登录次数
    preferences = Column(Text)  # 偏好设置(replace)

    @classmethod
    def update(cls, option):
        try:
            ins = SysUserOption.query_by({'user_id': option.get('user_id')}, True)
            if ins:
                option['id'] = ins.id
                SysUserOption.update_db(option)
            else:
                ins = SysUserOption.add_db(option)
                flaskz_logger.info(get_rest_log_msg('Update User options', option, True, None))
                return True, ins
        except Exception as e:
            flaskz_logger.exception(e)
        return False, res_status_codes.db_update_err

    @classmethod
    def update_login(cls, user_id, last_login_at=None):
        ins = SysUserOption.query_by({'user_id': user_id}, True)
        previous_login_at = None
        if ins:
            previous_login_at = ins.last_login_at
            login_times = ins.login_times + 1
        else:
            login_times = 1
        return cls.update({
            'user_id': user_id,
            'last_login_at': last_login_at or datetime.now(),
            'previous_login_at': previous_login_at,
            'login_times': login_times
        })


class SysActionLog(ModelBase, ModelMixin):
    """
    操作日志

    username: 操作人员账号
    user_name: 操作人员姓名
    user_ip: 操作IP
    module: 模块名
    action: 操作名
    req_data: 请求数据
    res_data: 结果数据
    result: 操作结果, 成功/失败
    like_columns: 模糊查询列
    """
    __tablename__ = 'sys_action_logs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100))  # 如果不登录，账号为空
    user_name = Column(String(100))  #
    user_ip = Column(String(100))  #

    module = Column(String(100))  # The name of the module, ex Role Mgmt/User Mgmt
    action = Column(String(100))  # add/remove/update

    req_data = Column(Text())  # request data
    res_data = Column(Text())  # response data
    result = Column(String(100))  # success/fail

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


def get_app_cached_modules():
    """
    返回系统模块列表，为了提高效率，对系统模块进行了缓存
    :return:
    """
    modules = get_app_cache('sys_modules')
    if modules is None:
        modules = []
        all_modules = SysModule.query_all()
        if all_modules[0] is True:
            all_modules = all_modules[1]
            for item in all_modules:
                modules.append(item.to_dict())
        set_app_cache('sys_modules', modules, expire_minutes=60)
    return modules
