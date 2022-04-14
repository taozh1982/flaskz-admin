import json

from flask import request, abort
from flask_login import login_user, logout_user, current_user
from flaskz.log import flaskz_logger, get_log_data
from flaskz.models import model_to_dict, query_multiple_model
from flaskz.rest import get_rest_log_msg, rest_login_required, init_model_rest_blueprint, rest_permission_required
from flaskz.utils import create_response, get_wrap_str

from . import sys_mgmt_bp, log_operation
from .auth import generate_token
from .model import User, Role, Menu, RoleMenu, OPLog


# -------------------------------------------auth-------------------------------------------
@sys_mgmt_bp.route('/auth/login/', methods=['POST'])
def sys_auth_login():
    """
    User login.
    :return:
    """
    request_json = request.json
    result = User.verify_password(request_json.get('username'), request_json.get('password'))
    success = result[0]
    res_data = None
    if success is False:
        res_data = model_to_dict(result[1])
    else:
        login_user(result[1], remember=request_json.get('remember_me') == True)

    flaskz_logger.info(get_rest_log_msg('User login', {'username': request_json.get('username'), 'remember_me': request_json.get('remember_me')}, success, res_data))
    return create_response(success, res_data)


@sys_mgmt_bp.route('/auth/logout/', methods=['GET'])
def sys_auth_logout():
    """
    User logout.
    :return:
    """
    logout_user()
    flaskz_logger.info(get_rest_log_msg('User logout', None, True, None))
    return create_response(True, None)


@sys_mgmt_bp.route('/auth/token/', methods=['POST'])
def sys_auth_get_token():
    """
    User get login token.
    :return:
    """
    request_json = request.json
    result = User.verify_password(request_json.get('username'), request_json.get('password'))
    success = result[0]
    if success is False:
        res_data = model_to_dict(result[1])
    else:
        res_data = {'token': generate_token({'id': result[1].get_id()})}

    flaskz_logger.info(get_rest_log_msg('User get login token', {'username': request_json.get('username')}, success, res_data))
    return create_response(success, res_data)


@sys_mgmt_bp.route('/auth/account/', methods=['GET', 'POST'])
@rest_login_required()
def sys_auth_account_query():
    """
    Query the account profile and menus.
    :return:
    """
    if current_user.is_anonymous:
        return abort(401, response='forbidden')
        # return create_response(False, app_status_codes.uri_unauthorized)

    role = current_user.role
    if not role:
        return abort(401, response='forbidden')
        # return create_response(False, app_status_codes.uri_unauthorized)

    menus = model_to_dict(role.get_menus())
    menu_map = {}
    for item in menus:
        item['op_permissions'] = []
        menu_map[item.get('id')] = item

    for item in role.menus:
        menu_item = menu_map.get(item.menu_id)
        if item.permission and menu_item:
            menu_item.get('op_permissions').append(item.permission)

    profile = current_user.to_dict()
    del profile['role_id']
    res_data = {
        'profile': profile,
        'menus': menus
    }

    flaskz_logger.debug(get_rest_log_msg('Query the account profile and menus', None, True, res_data))
    return create_response(True, res_data)


@sys_mgmt_bp.route('/auth/account/', methods=['PUT', 'PATCH'])
@rest_login_required()
def sys_auth_account_update():
    """
    Update the user profile
    :return:
    """
    request_json = request.json
    req_log_data = json.dumps(request_json)

    if 'role_id' in request_json:
        del request_json['role_id']
    result = User.update(request_json)
    res_data = model_to_dict(result[1])
    if result[0] is True:
        del res_data['role_id']

    res_log_data = get_log_data(res_data)
    log_operation('user', 'update', result[0], req_log_data, res_log_data)
    flaskz_logger.info(get_rest_log_msg('Update the user profile', req_log_data, result[0], res_log_data))

    return create_response(result[0], res_data)


# -------------------------------------------user-------------------------------------------
# @sys_mgmt_bp.route('/user/', methods=['GET'])
# @rest_permission_required('user')
# def sys_user_query():
#     """
#     Query user list and simple role list.
#     :return:
#     """
#     result = query_multiple_model(Role, User)
#     if result[0] is False:
#         success = False
#         res_data = model_to_dict(result[1])
#     else:
#         success = True
#         res_data = {
#             'roles': model_to_dict(result[0], fields=['id', 'name']),
#             'users': model_to_dict(result[1])
#         }
#
#     flaskz_logger.info(get_rest_log_msg('Query user', None, success, res_data))
#     return create_response(success, res_data)


init_model_rest_blueprint(User, sys_mgmt_bp, '/user', 'user', multiple_option={
    'users': User,
    'roles': {
        'model_cls': Role,
        'option': {
            'includes': ['id', 'name']
        }
    }
})


# -------------------------------------------role-------------------------------------------
@sys_mgmt_bp.route('/role/', methods=['POST'])
@rest_permission_required('role', 'add')
def sys_role_add():
    """
    Add a user role.
    :return:
    """
    request_json = request.json
    req_log_data = json.dumps(request_json)

    result = Role.add(Role.to_server_json(request_json))
    res_data = model_to_dict(result[1], {'cascade': 1})
    if result[0] is True:
        res_data = Role.to_client_json(res_data)

    res_log_data = get_log_data(res_data)
    log_operation('role', 'add', result[0], req_log_data, res_log_data)
    flaskz_logger.info(get_rest_log_msg('Add role', req_log_data, result[0], res_log_data))

    return create_response(result[0], res_data)


@sys_mgmt_bp.route('/role/', methods=['PUT', 'PATCH'])
@rest_permission_required('role', 'update')
def sys_role_update():
    """
    Update the specified role.
    :return:
    """
    request_json = request.json
    req_log_data = json.dumps(request_json)

    result = Role.update(Role.to_server_json(request_json))
    res_data = model_to_dict(result[1], {'cascade': 1})
    if result[0] is True:
        res_data = Role.to_client_json(res_data)

    res_log_data = get_log_data(res_data)
    log_operation('role', 'update', result[0], req_log_data, res_log_data)
    flaskz_logger.info(get_rest_log_msg('Update role', req_log_data, result[0], res_log_data))

    return create_response(result[0], res_data)


@sys_mgmt_bp.route('/role/', methods=['GET'])
@rest_permission_required('role')
def sys_role_query():
    """
    Query the role list and the full menu list with operation permissions
    :return:
    """
    result = query_multiple_model(Menu, Role, RoleMenu)
    if result[0] is False:
        success = False
        res_data = model_to_dict(result[1])
    else:
        success = True
        roles = model_to_dict(result[1], {'cascade': 1})
        for role in roles:
            Role.to_client_json(role)

        res_data = {
            'menus': model_to_dict(result[0], {'cascade': 1}),
            'roles': roles,
        }
    flaskz_logger.debug(get_rest_log_msg('Query role', None, success, res_data))
    return create_response(success, res_data)


init_model_rest_blueprint(Role, sys_mgmt_bp, '/role', 'role', routers=['delete'])


# -------------------------------------------op_log-------------------------------------------

@sys_mgmt_bp.route('/op_log/menu/', methods=['GET'])
@rest_permission_required('op_log')
def sys_role_menu_query():
    """
    Query the simple menu list in operation log module.
    :return:
    """
    result = Menu.query_all()

    res_data = model_to_dict(result[1], {'includes': ['id', 'parent_id', 'name']})

    flaskz_logger.debug(get_rest_log_msg('Query op-log menus', None, result[0], res_data))
    return create_response(result[0], res_data)


init_model_rest_blueprint(OPLog, sys_mgmt_bp, '/op_log', 'op_log', routers=['query_pss'])


# -------------------------------------------monitor-------------------------------------------
@sys_mgmt_bp.route('/page_monitor/', methods=['POST'])
def sys_page_monitor():
    """
    Page Monitor.
    :return:
    """
    flaskz_logger.warning(get_wrap_str('--Page Monitor', '--Data:', request.json))
    return create_response(True, {})
