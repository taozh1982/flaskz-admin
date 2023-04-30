"""
map the path to the static html files.
it is recommended to use nginx as the static file server.
"""
from flask import redirect

from . import main_bp

page_mapping = {
    'error_404': './error/404.html',
    'login': './login.html',
    'index': './index.html',

    'roles': './modules/sys_mgmt/roles/role.html',
    'users': './modules/sys_mgmt/users/user.html',
    'action-logs': './modules/sys_mgmt/action_logs/action_log.html',
    'licenses': './modules/sys_mgmt/licenses/license.html',

    'templates': './modules/example/templates/template.html',

    'ex-screen': './modules/example/screen/screen.html',
    'ex-websocket': './modules/example/websocket/websocket.html',
    # 'op-log': './modules/sys/op_log/op_log.html?module=lop-op',  # set module
}


@main_bp.route('/favicon.ico')
def favicon():
    return main_bp.send_static_file('./favicon.ico')


@main_bp.route('/', defaults={'page': 'index'})
@main_bp.route('/<page>', methods=['GET'])
def show_page(page):
    _page = page_mapping.get(page)
    if _page:
        if page == 'index' or page == 'login':
            return main_bp.send_static_file(_page)
        return redirect(_page)

    if page.endswith(".html"):
        return main_bp.send_static_file(page)

    return main_bp.send_static_file(page_mapping.get('error_404'))
