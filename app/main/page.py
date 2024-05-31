"""
map the path to the static html files.
it is recommended to use nginx as the static file wsgi.
"""
from flask import redirect
from flaskz.log import flaskz_logger
from flaskz.rest import get_rest_log_msg

from . import main_bp

page_mapping = {
    # Admin
    'login': './login.html',
    'index': './index.html',
    'error_404': './error/404.html',

    # System
    'roles': './modules/sys_mgmt/roles/role.html',
    'users': './modules/sys_mgmt/users/user.html',
    'licenses': './modules/sys_mgmt/licenses/license.html',
    'action-logs': './modules/sys_mgmt/action_logs/action_log.html',
    'sys-options': './modules/sys_mgmt/options/option.html',

    # 'op-log': './modules/sys/op_log/op_log.html?module=lop-op',  # set module
}


@main_bp.route('/favicon.ico')
def favicon():
    return main_bp.send_static_file('./favicon.ico')


@main_bp.route('/', defaults={'page': 'index'})
@main_bp.route('/<page>', methods=['GET'])
def show_page(page):
    flaskz_logger.debug(get_rest_log_msg('Access page', page, True, None))
    _page = page_mapping.get(page)
    if _page:
        if page == 'index' or page == 'login':
            return main_bp.send_static_file(_page)
        return redirect(_page)

    if page.endswith('.html'):
        return main_bp.send_static_file(page)

    return main_bp.send_static_file(page_mapping.get('error_404')), 404
