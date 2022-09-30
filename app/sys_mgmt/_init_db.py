from flaskz.models import db_session

from app.sys_mgmt.model import OPPermission, Menu, Role, User

# Permission List
_sys_op_permissions = [
    {'permission': 'add', 'label': 'Add', },
    {'permission': 'update', 'label': 'Update', },
    {'permission': 'delete', 'label': 'Delete', }]

# Menu List
_sys_menus = [
    {'id': 1000, 'name': 'Menu1'},
    {'id': 1010, 'parent_id': 1000, 'name': 'Template', 'path': 'template'},
    {'id': 1020, 'parent_id': 1000, 'name': 'Menu1-2', 'path': 'menu12'},
    {'id': 1030, 'parent_id': 1000, 'name': 'Menu1-3', 'path': 'menu13'},
    {'id': 2000, 'name': 'Examples'},
    {'id': 2010, 'parent_id': 2000, 'name': 'Screen', 'path': 'ex-screen'},
    {'id': 2020, 'parent_id': 2000, 'name': 'Websocket', 'path': 'ex-websocket'},
    {'id': 9000, 'name': 'System'},
    {'id': 9010, 'parent_id': 9000, 'name': 'User', 'path': 'user'},
    {'id': 9020, 'parent_id': 9000, 'name': 'Role', 'path': 'role'},
    {'id': 9030, 'parent_id': 9000, 'name': 'License', 'path': 'license'},
    {'id': 9040, 'parent_id': 9000, 'name': 'OP Log', 'path': 'op_log'}
]

# Admin Role
_sys_roles = [
    {'id': 1, 'name': 'Administrator', 'menus': []}]

# 管理员帐户
_sys_users = [
    {'id': 1, 'username': 'admin', 'password': 'admin', 'role_id': 1, 'name': 'administrator', 'email': 'admin@focus-ui.com', }]


def init_db_data():
    admin_role_menus = _sys_roles[0].get('menus')
    for item in _sys_menus:
        if item.get('path'):
            admin_role_menus.append({'menu_id': item.get('id'), 'permission': 'update'})

    with db_session() as session:
        session.query(User).delete()
        session.query(Role).delete()
        session.query(Menu).delete()
        session.query(OPPermission).delete()

    for item in _sys_op_permissions:
        OPPermission.add(item)

    for item in _sys_menus:
        result = Menu.add(item)
        if item.get('path') and result[0] is True:
            result[1].op_permissions.append(OPPermission.query_by_pk("update"))

    for item in _sys_roles:
        Role.add(item)

    for item in _sys_users:
        User.add(item)


def recover_admin(user_name='admin', role_name='admin'):
    """
    Add a admin role and use
    :return:
    """
    admin_role = {'name': role_name, 'menus': []}
    admin_role_menus = admin_role.get('menus')
    for item in _sys_menus:
        if item.get('path'):
            admin_role_menus.append({'menu_id': item.get('id'), 'permission': 'update'})

    result = Role.add(admin_role)
    if result[0]:
        role = result[1]
        result = User.add({'username': user_name, 'password': 'admin', 'role_id': role.id, 'email': user_name + '@focus-ui.com'})
    print(result)
