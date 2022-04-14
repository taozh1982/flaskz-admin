# map the path to the static html files
from flask import redirect

from . import main_bp

page_mapping = {
    'error_404': './error/404.html',
    'login': './login.html',
    'index': './index.html',

    'role': './modules/sys_mgmt/role/role.html',
    'user': './modules/sys_mgmt/user/user.html',
    'op_log': './modules/sys_mgmt/op_log/op_log.html',

    'template': './modules/template/template/template.html',

    'ex-screen': './modules/example/screen/screen.html',
    'ex-websocket': './modules/example/websocket/websocket.html',
    # 'op_log': './modules/sys/op_log/op_log.html?module=lop_op',
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
