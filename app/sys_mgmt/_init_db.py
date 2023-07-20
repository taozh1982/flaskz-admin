"""
CREATE DATABASE `flaskz-admin`
CHARACTER SET utf8
COLLATE utf8_general_ci;
"""
from flaskz.models import db_session

from app.sys_mgmt.model import SysAction, SysModule, SysRole, SysUser

# Action List
_sys_actions = [
    {'action': 'add', 'label': 'Add'},
    {'action': 'update', 'label': 'Update'},
    {'action': 'delete', 'label': 'Delete'}]

# Module List
_sys_modules = [
    {'id': 10000, 'name': 'Examples'},
    {'id': 10100, 'parent_id': 10000, 'name': 'EX-Simples', 'module': 'ex-simples', 'path': 'ex-simples'},
    {'id': 10200, 'parent_id': 10000, 'name': 'EX-Departments', 'module': 'ex-departments', 'path': 'ex-departments'},
    {'id': 10300, 'parent_id': 10000, 'name': 'EX-Employees', 'module': 'ex-employees', 'path': 'ex-employees'},

    {'id': 20000, 'name': 'Ext'},
    {'id': 20100, 'parent_id': 20000, 'name': 'Ext-Nav', 'module': 'ext-nav', 'path': 'ext-nav'},
    {'id': 20200, 'parent_id': 20000, 'name': 'Ext-Websocket', 'module': 'ext-websocket', 'path': 'ext-websocket'},
    {'id': 20300, 'parent_id': 20000, 'name': 'Ext-Not Found', 'module': 'ext-not-found', 'path': 'ext-not-found'},
    {'id': 20400, 'parent_id': 20000, 'name': 'Ext-No Menu', 'module': 'ext-no-menu'},

    {'id': 90000, 'name': 'System'},
    {'id': 90100, 'parent_id': 90000, 'name': 'Users', 'module': 'users', 'path': 'users'},
    {'id': 90200, 'parent_id': 90000, 'name': 'Roles', 'module': 'roles', 'path': 'roles'},
    {'id': 90300, 'parent_id': 90000, 'name': 'Licenses', 'module': 'licenses', 'path': 'licenses'},
    {'id': 90400, 'parent_id': 90000, 'name': 'Action Logs', 'module': 'action-logs', 'path': 'action-logs'}
]

# Admin Role
_sys_roles = [
    {'id': 1, 'name': 'Administrator', 'modules': []}]

# Admin User
_sys_users = [
    {'id': 1, 'username': 'admin', 'password': 'admin', 'role_id': 1, 'name': 'administrator', 'email': 'admin@focus-ui.com'}]


def init_db_data():
    admin_role_modules = _sys_roles[0].get('modules')
    for item in _sys_modules:
        if item.get('module'):
            admin_role_modules.append({'module_id': item.get('id'), 'action': 'update'})

    with db_session() as session:
        session.query(SysUser).delete()
        session.query(SysRole).delete()
        session.query(SysModule).delete()
        session.query(SysAction).delete()

    for item in _sys_actions:
        SysAction.add(item)

    for item in _sys_modules:
        result = SysModule.add(item)
        if item.get('module') and result[0] is True:
            result[1].actions.append(SysAction.query_by_pk("update"))

    for item in _sys_roles:
        SysRole.add(item)

    for item in _sys_users:
        SysUser.add(item)


def recover_admin(user_name='admin', role_name='admin'):
    """
    Add a admin role and use
    :return:
    """
    admin_role = {'name': role_name, 'modules': []}
    admin_role_modules = admin_role.get('modules')
    for item in _sys_modules:
        if item.get('module'):
            admin_role_modules.append({'module_id': item.get('id'), 'action': 'update'})

    result = SysRole.add(admin_role)
    if result[0]:
        role = result[1]
        result = SysUser.add({'username': user_name, 'password': 'admin', 'role_id': role.id, 'email': user_name + '@focus-ui.com'})
    print(result)
