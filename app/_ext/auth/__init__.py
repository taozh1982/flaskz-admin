"""
Auth扩展

1. 安装依赖pkg
- TACACS+: pip install tacacs_plus

2. 添加数据库表SysAuthMode

3. app/sys_init/status_codes.py添加以下状态代码
auth_mode_not_allowed = 'auth_mode_not_allowed', '认证模式不支持'
auth_local_role_not_found = 'aaa_local_role_not_found', '获取系统角色失败'
auth_tacacs_config_err = 'aaa_tacacs_config_err', 'TACACS配置错误'
auth_tacacs_auth_fail = 'aaa_tacacs_auth_fail', 'TACACS认证失败'

4. 替换登录API [POST] http://{{server}}/sys-mgmt/auth/aaa/

"""
from flask import request
from flask_login import login_user
from flaskz import res_status_codes
from flaskz.log import flaskz_logger
from flaskz.models import model_to_dict
from flaskz.rest import log_operation, get_rest_log_msg
from flaskz.utils import create_response

from .model import SysAuthMode
from ...sys_init import status_codes
from ...sys_mgmt import sys_mgmt_bp
from ...sys_mgmt.model import SysRole, SysUser, SysUserOption


@sys_mgmt_bp.route('/auth/aaa/', methods=['POST'])
def sys_aaa_auth():
    request_json = request.json

    username, password, remember_me = request_json.get('username'), request_json.get('password'), request_json.get('remember_me')
    auth_mode_ins = SysAuthMode.query_by({'default': True}, True)

    auth_mode = None
    if auth_mode_ins:
        auth_mode = auth_mode_ins.mode or 'local'
    auth_mode = auth_mode or 'local'

    if auth_mode == 'tacacs+':
        success, result, to_local = auth_by_tacacs(username, password, auth_mode_ins.config)
        if to_local is True:  # -->本地校验
            auth_user = SysUser.query_by({'username': username}, True)
            if auth_user is None or auth_user.type != 'local':  # 本地账号不存在 / 本地账号不是local类型
                result = res_status_codes.account_not_found
            else:  # 本地账号是local类型
                success, result = SysUser.verify_password(username, password)
    elif auth_mode == 'local':  # 本地校验
        success, result = SysUser.verify_password(username, password)
    else:  # 不支持
        success, result = False, status_codes.auth_mode_not_allowed

    res_data = None
    if success is False:
        res_data = model_to_dict(result)
    else:
        login_user(result, remember=remember_me is True)
        SysUserOption.update_login(result.id)

    log_operation('users', 'login', success, username, None)
    flaskz_logger.info(get_rest_log_msg('User login ' + auth_mode, {'username': username, 'remember_me': remember_me}, success, res_data))
    return create_response(success, res_data)


def update_auth_user(username, role, user_type):
    """创建/更新用户信息"""
    role = SysRole.query_by({'name': role}, True)
    if not role:
        return False, status_codes.auth_local_role_not_found  # 没有对应的角色
    else:
        user = SysUser.query_by({'username': username}, True)
        if not user:  # 没有用户-->添加
            user = SysUser.add_db({'type': user_type, 'username': username, 'role_id': role.id})
        else:  # 已有用户-->更新role
            if user.type != user_type:  # 已有非tacacs用户
                return False, res_status_codes.db_data_already_exist
            if user.role_id != role.id:
                SysUser.update_db({'id': user.id, 'role_id': role.id})
        return True, user  # 成功，返回用户


from .tacacs import auth_by_tacacs
