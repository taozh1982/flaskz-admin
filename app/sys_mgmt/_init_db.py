from flaskz.models import db_session

from app.sys_mgmt.model import SysAction, SysModule, SysRole, SysUser

# Action List
_sys_actions = [
    {'action': 'add', 'label': 'Add'},
    {'action': 'update', 'label': 'Update'},
    {'action': 'delete', 'label': 'Delete'}]

# Module List
_sys_modules = [
    {'id': 1000, 'name': 'Menu1'},
    {'id': 1010, 'parent_id': 1000, 'name': 'Templates', 'module': 'templates', 'path': 'templates'},
    {'id': 1020, 'parent_id': 1000, 'name': 'Menu1-2', 'module': 'menu12', 'path': 'menu12'},
    {'id': 1030, 'parent_id': 1000, 'name': 'Menu1-3', 'module': 'menu13', 'path': 'menu13'},
    {'id': 2000, 'name': 'Examples'},
    {'id': 2010, 'parent_id': 2000, 'name': 'Screen', 'module': 'ex-screen', 'path': 'ex-screen'},
    {'id': 2020, 'parent_id': 2000, 'name': 'Websocket', 'module': 'ex-websocket', 'path': 'ex-websocket'},
    {'id': 2030, 'parent_id': 2000, 'name': 'No-Menu', 'module': 'no-menu'},
    {'id': 9000, 'name': 'System'},
    {'id': 9010, 'parent_id': 9000, 'name': 'Users', 'module': 'users', 'path': 'users'},
    {'id': 9020, 'parent_id': 9000, 'name': 'Roles', 'module': 'roles', 'path': 'roles'},
    {'id': 9030, 'parent_id': 9000, 'name': 'Licenses', 'module': 'licenses', 'path': 'licenses'},
    {'id': 9040, 'parent_id': 9000, 'name': 'Action Logs', 'module': 'action-logs', 'path': 'action-logs'}
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
