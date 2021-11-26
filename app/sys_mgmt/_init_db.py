from flaskz.models import db_session

from app.sys_mgmt.model import OPPermission, Menu, Role, User

# 权限列表
_sys_op_permissions = [
    {'permission': 'add', 'label': '添加', },
    {'permission': 'update', 'label': '修改', },
    {'permission': 'delete', 'label': '删除', }]

# 菜单列表
_sys_menus = [
    {'id': 100, 'name': '菜单1'},
    {'id': 101, 'parent_id': 100, 'name': '模板', 'path': 'template'},
    {'id': 102, 'parent_id': 100, 'name': '菜单1-2', 'path': 'menu12'},
    {'id': 103, 'parent_id': 100, 'name': '菜单1_3', 'path': 'menu13'},
    {'id': 200, 'name': '菜单2'},
    {'id': 201, 'parent_id': 200, 'name': '菜单2_1', 'path': 'menu21'},
    {'id': 202, 'parent_id': 200, 'name': '菜单2_2', 'path': 'menu22'},
    {'id': 900, 'name': '系统管理'},
    {'id': 901, 'parent_id': 900, 'name': '用户列表', 'path': 'user'},
    {'id': 902, 'parent_id': 900, 'name': '角色管理', 'path': 'role'},
    {'id': 903, 'parent_id': 900, 'name': '操作日志', 'path': 'op_log'}]

# 管理员角色
_sys_roles = [
    {'id': 1, 'name': 'Manager', 'menus': []}]

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
