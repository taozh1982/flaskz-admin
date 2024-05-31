"""
系统初始化数据
"""
# Action List
sys_actions = [
    {'action': 'add', 'label': 'Add'},
    {'action': 'update', 'label': 'Update'},
    {'action': 'delete', 'label': 'Delete'}]

# Module List(for test)
sys_modules = [
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
    {'id': 90400, 'parent_id': 90000, 'name': 'Options', 'module': 'sys-options', 'path': 'sys-options'},
    {'id': 90500, 'parent_id': 90000, 'name': 'Action Logs', 'module': 'action-logs', 'path': 'action-logs'}
]

# Admin Role
sys_roles = [
    {'id': 1, 'name': 'Administrator', 'modules': []}]

# Admin User
sys_users = [
    {'id': 1, 'username': 'admin', 'password': 'admin', 'role_name': 'Administrator', 'name': 'administrator', 'email': 'admin@focus-ui.com'}]
