"""
默认提供的基于角色的用户权限管理模块(RBAC)，
可以根据需要改写/替换
请参考 -http://zhangyiheng.com/blog/articles/py_flaskz_api.html#toc-mgmt
"""

import json

from flask import Blueprint
from flask_login import current_user

sys_mgmt_bp = Blueprint('sys_mgmt', __name__)


def log_operation(module, action, result, req_data=None, res_data=None, description=None, log_data=None):
    """
    Add operation logs to the database.
    :param module: The module of the operation.
    :param action: The action of the operation, add/delete/update.
    :param result: The result of the operation, success/fail.
    :param req_data: The request data of the operation.
    :param res_data: The result data of the operation.
    :param description: The description of the operation.
    :param log_data: The custom log data
    :return:
    """
    if result is True:
        result = "success"
    elif result is False:
        result = "fail"

    if req_data is not None and not is_str(req_data):
        req_data = json.dumps(req_data)

    if res_data is not None and not is_str(res_data):
        res_data = json.dumps(res_data)

    props = _get_user_info()
    props.update({
        'module': _get_module_name(module),
        'action': action,
        'req_data': req_data,
        'res_data': res_data,
        'result': result,
        'description': description,
    })
    if 'username' not in props and action == 'login':  # login
        props['username'] = req_data

    if type(log_data) is dict:
        props.update(log_data)

    model.SysActionLog.add(props)


def _get_user_info():
    if not current_user or current_user.is_anonymous:
        return {
            'user_ip': get_remote_addr() or '127.0.0.1'
        }
    return {
        'username': getattr(current_user, 'username', None),
        'user_name': getattr(current_user, 'name', None),
        'user_ip': get_remote_addr() or '127.0.0.1'
    }


def _get_module_name(module):
    if module is None or module is False:
        return None
    module_name_mapping = get_app_cache('sys_module_name_mapping')
    if module_name_mapping is None:
        module_name_mapping = {}
        menu_list = model.SysModule.query_all()
        if menu_list[0] is True:
            for item in menu_list[1]:
                path = item.path
                if path:
                    module_name_mapping[path] = item.name
            set_app_cache('sys_module_name_mapping', module_name_mapping)

    return module_name_mapping.get(module) or module


from flaskz.utils import get_remote_addr, get_app_cache, set_app_cache, is_str

# from . import errors
from . import _private
from . import router
from . import model
from ._init_db import init_db_data
from ._init_db import recover_admin
