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

    SysAction.bulk_add(sys_actions)

    for item in sys_modules:
        result = SysModule.add(item)
        if item.get('module') and result[0] is True:
            result[1].actions.append(SysAction.query_by_pk("update"))

    admin_role = None
    for index, item in enumerate(sys_roles):
        success, role = SysRole.add(item)
        if index == 0:
            admin_role = role

    for item in sys_users:
        item['role_id'] = admin_role.id
        SysUser.add(item)

    print(f'init db data ok')


def recover_admin(user_name='admin', role_name='Administrator'):
    """
    reset admin role and user
    :return:
    """
    modules = []
    for item in sys_modules:
        if item.get('module'):
            modules.append({'module_id': item.get('id'), 'action': 'update'})

    db_role = SysRole.query_by({'name': role_name}, True)
    if db_role:
        success, admin_role = SysRole.update({'id': db_role.id, 'modules': modules})
    else:
        success, admin_role = SysRole.add({'name': role_name, 'modules': modules})
    if success:
        print(f'recover {role_name} role ok')
    else:
        print(f'recover {role_name} role error: {admin_role}')

    if success:
        db_user = SysUser.query_by({'username': user_name}, True)
        if db_user:
            success, admin_user = SysUser.update({'id': db_user.id, 'password': 'admin', 'role_id': admin_role.id})
        else:
            success, admin_user = SysUser.add({'username': user_name, 'password': 'admin', 'role_id': admin_role.id})

        if success:
            print(f'recover {user_name} user ok')
        else:
            print(f'recover {user_name} user error: {admin_user}')
