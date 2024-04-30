"""
CREATE DATABASE `flaskz-admin`
CHARACTER SET utf8
COLLATE utf8_general_ci;
"""
from flaskz.models import db_session

from app.sys_mgmt.model import SysAction, SysModule, SysRole, SysUser
from .init_data import *


def init_db_data():
    admin_role_modules = sys_roles[0].get('modules')
    for item in sys_modules:
        if item.get('module'):
            admin_role_modules.append({'module_id': item.get('id'), 'action': 'update'})

    with db_session() as session:
        session.query(SysUser).delete()
        session.query(SysRole).delete()
        session.query(SysModule).delete()
        session.query(SysAction).delete()

    for item in sys_actions:
        SysAction.add(item)

    for item in sys_modules:
        result = SysModule.add(item)
        if item.get('module') and result[0] is True:
            result[1].actions.append(SysAction.query_by_pk("update"))

    for item in sys_roles:
        SysRole.add(item)

    for item in sys_users:
        SysUser.add(item)


def recover_admin(user_name='admin', role_name='admin'):
    """
    Add a admin role and use
    :return:
    """
    admin_role = {'name': role_name, 'modules': []}
    admin_role_modules = admin_role.get('modules')
    for item in sys_modules:
        if item.get('module'):
            admin_role_modules.append({'module_id': item.get('id'), 'action': 'update'})

    result = SysRole.add(admin_role)
    if result[0]:
        role = result[1]
        result = SysUser.add({'username': user_name, 'password': 'admin', 'role_id': role.id, 'email': user_name + '@focus-ui.com'})
    print(result)
