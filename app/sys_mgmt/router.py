import json

from flask import request, abort
from flask_login import login_user, logout_user, current_user
from flaskz.log import flaskz_logger, get_log_data
from flaskz.models import model_to_dict, query_all_models
from flaskz.rest import get_rest_log_msg, rest_login_required, rest_permission_required, register_model_route, register_model_query_pss_route, register_model_query_route, \
    register_model_delete_route
from flaskz.utils import create_response, get_wrap_str, find_list, get_dict_mapping, get_app_config

from . import sys_mgmt_bp, log_operation
from .auth import generate_token
from .model import SysUser, SysRole, SysModule, SysRoleModule, SysActionLog, SysUserOption
from ..utils import get_app_license


# -------------------------------------------auth-------------------------------------------
@sys_mgmt_bp.route('/auth/login/', methods=['POST'])
def sys_auth_login():
    """用户登录Session/Cookie"""
    request_json = request.json
    success, result = SysUser.verify_password(request_json.get('username'), request_json.get('password'))
    res_data = None
    if success is False:
        res_data = model_to_dict(result)
    else:
        login_user(result, remember=request_json.get('remember_me') is True)
        SysUserOption.update_login(result.id)
        # SysUser.update_db({'id': result.id, 'last_login_at': datetime.now(), '_update_updated_at': False})
    log_operation('users', 'login', success, request_json.get('username'), None)
    flaskz_logger.info(get_rest_log_msg('User login', {'username': request_json.get('username'), 'remember_me': request_json.get('remember_me')}, success, res_data))
    return create_response(success, res_data)


@sys_mgmt_bp.route('/auth/logout/', methods=['GET'])
def sys_auth_logout():
    """用户登出Session/Cookie"""
    logout_user()
    flaskz_logger.info(get_rest_log_msg('User logout', None, True, None))
    return create_response(True, None)


@sys_mgmt_bp.route('/auth/token/', methods=['POST'])
def sys_auth_get_token():
    """获取Token"""
    request_json = request.json
    success, result = SysUser.verify_password(request_json.get('username'), request_json.get('password'))
    if success is False:
        res_data = model_to_dict(result)
    else:
        res_data = {'token': generate_token({'id': result.get_id()})}
        SysUserOption.update_login(result.id)
        # SysUser.update({'id': result.id, 'last_login_at': datetime.now(), '_update_updated_at': False})

    log_operation('users', 'login', success, request_json.get('username'), None)
    flaskz_logger.info(get_rest_log_msg('User get login token', {'username': request_json.get('username')}, success, res_data))
    return create_response(success, res_data)


@sys_mgmt_bp.route('/auth/account/', methods=['GET', 'POST'])
@rest_login_required()
def sys_auth_account_query():
    """
    获取账户信息
    profile+menus+license
    """
    if not current_user or current_user.is_anonymous:
        return abort(401, response='forbidden')
        # return create_response(False, app_status_codes.uri_unauthorized)

    role = current_user.role
    if not role:
        return abort(401, response='forbidden')
        # return create_response(False, app_status_codes.uri_unauthorized)

    role_menus = model_to_dict(role.get_menus())
    menu_map = {}
    for item in role_menus:
        item['actions'] = []
        menu_map[item.get('id')] = item

    for item in role.modules:
        menu_item = menu_map.get(item.module_id)
        if item.action and menu_item:
            menu_item.get('actions').append(item.action)

    profile = current_user.to_dict({'cascade': 1})
    profile.pop('role_id')
    profile.pop('role')
    res_data = {
        'profile': profile,
        'menus': role_menus
    }
    current_license = get_app_license()
    if current_license:
        res_data['license'] = {
            'User': current_license.get('User'),
            'Type': current_license.get('Type'),
            'StartDate': current_license.get('StartDate'),
            'EndDate': current_license.get('EndDate'),
            'ExpireDays': current_license.get('ExpireDays', 0)
        }
    else:
        if current_license is False:
            res_data['license'] = False
        else:
            no_license_menus = []
            license_menu_path = get_app_config('APP_LICENSE_MENU_PATH') or 'licenses'
            license_menu = find_list(role_menus, lambda menu: menu.get('path') == license_menu_path)
            if license_menu:
                menu_id_map = get_dict_mapping(role_menus)
                parent_id = license_menu.get('parent_id')
                while parent_id:
                    parent_menu = menu_id_map.get(parent_id)
                    parent_id = None
                    if parent_menu:
                        no_license_menus.append(parent_menu)
                        parent_id = parent_menu.get('parent_id')
                no_license_menus.append(license_menu)
            res_data['menus'] = no_license_menus

    flaskz_logger.debug(get_rest_log_msg('Query the account profile and menus', None, True, res_data))
    return create_response(True, res_data)


@sys_mgmt_bp.route('/auth/account/', methods=['PUT', 'PATCH'])
@rest_login_required()
def sys_auth_account_update():
    """更新账号信息(非管理员)"""
    request_json = request.json
    req_log_data = json.dumps(request_json)

    if 'role_id' in request_json:
        del request_json['role_id']
    result = SysUser.update(request_json)
    res_data = model_to_dict(result[1])
    if result[0] is True:
        del res_data['role_id']

    res_log_data = get_log_data(res_data)
    log_operation('users', 'update', result[0], req_log_data, res_log_data)
    flaskz_logger.info(get_rest_log_msg('Update the user profile', req_log_data, result[0], res_log_data))

    return create_response(result[0], res_data)


# -------------------------------------------user-------------------------------------------
register_model_route(sys_mgmt_bp, SysUser, 'users', 'users', multi_models={
    'users': {
        'model_cls': SysUser,
        'option': {
            'cascade': 1,
            'exclude': ['role']
        }
    },
    'roles': {
        'model_cls': SysRole,
        'option': {
            'include': ['id', 'name']
        }
    }
})

# -------------------------------------------role-------------------------------------------
register_model_delete_route(sys_mgmt_bp, SysRole, 'roles', 'roles')  # 删除角色


@sys_mgmt_bp.route('/roles/', methods=['POST'])
@rest_permission_required('roles', 'add')
def sys_role_add():
    """添加角色"""
    request_json = request.json
    req_log_data = json.dumps(request_json)

    result = SysRole.add(SysRole.to_server_json(request_json))
    res_data = model_to_dict(result[1], {'cascade': 1})
    if result[0] is True:
        res_data = SysRole.to_client_json(res_data)

    res_log_data = get_log_data(res_data)
    log_operation('roles', 'add', result[0], req_log_data, res_log_data)
    flaskz_logger.info(get_rest_log_msg('Add role', req_log_data, result[0], res_log_data))

    return create_response(result[0], res_data)


@sys_mgmt_bp.route('/roles/', methods=['PUT', 'PATCH'])
@rest_permission_required('roles', 'update')
def sys_role_update():
    """更新角色"""
    request_json = request.json
    req_log_data = json.dumps(request_json)

    result = SysRole.update(SysRole.to_server_json(request_json))
    res_data = model_to_dict(result[1], {'cascade': 1})
    if result[0] is True:
        res_data = SysRole.to_client_json(res_data)

    res_log_data = get_log_data(res_data)
    log_operation('roles', 'update', result[0], req_log_data, res_log_data)
    flaskz_logger.info(get_rest_log_msg('Update role', req_log_data, result[0], res_log_data))

    return create_response(result[0], res_data)


@sys_mgmt_bp.route('/roles/', methods=['GET'])
@rest_permission_required('roles')
def sys_role_query():
    """
    查询角色列表
    返回: 角色列表+系统模块列表
    """
    result = query_all_models(SysModule, SysRole, SysRoleModule)
    if result[0] is False:
        success = False
        res_data = model_to_dict(result[1])
    else:
        success = True
        roles = model_to_dict(result[1], {'cascade': 1})
        for role in roles:
            SysRole.to_client_json(role)

        res_data = {
            'modules': model_to_dict(result[0], {'cascade': 1}),
            'roles': roles,
        }
    flaskz_logger.debug(get_rest_log_msg('Query role', None, success, res_data))
    return create_response(success, res_data)


# -------------------------------------------action logs-------------------------------------------
register_model_query_route(sys_mgmt_bp, SysModule, 'modules', to_json_option={'include': ['id', 'parent_id', 'name']})
register_model_query_pss_route(sys_mgmt_bp, SysActionLog, 'action-logs', 'action-logs')


# -------------------------------------------monitor-------------------------------------------
@sys_mgmt_bp.route('/page_monitor/', methods=['POST'])
def sys_page_monitor():
    """
    Page Monitor.
    :return:
    """
    flaskz_logger.warning(get_wrap_str('--Page Monitor', '--Data:', request.json))
    return create_response(True, {})


# todo 如果不启用License功能，请移除以下代码
# for alembic
from .license import router as license_router

if license_router:
    pass
