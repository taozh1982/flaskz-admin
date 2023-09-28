"""
pip install tacacs_plus

1.authenticate  -校验账号/密码
2.author  -获取角色

"""
import inspect
import json
import socket

from flaskz.log import flaskz_logger
from tacacs_plus import flags
from tacacs_plus.client import TACACSClient

from ...sys_init import status_codes

TACACS_CLIENT_PARAMS: list = None


def auth_by_tacacs(username, password, tacacs_server):
    """
    -----------------本地授权-----------------
    配置错误:(False,aaa_tacacs_config_err,True)
    访问异常:(False, aaa_tacacs_auth_fail,True)
    -----------------校验失败-----------------
    角色配置错误:(False, aaa_local_role_not_found,False)
    授权失败:(False, aaa_tacacs_auth_fail,False)
     -----------------校验成功-----------------
    授权成功:(True, user,False)
    """
    if type(tacacs_server) is str:
        try:
            tacacs_server = json.loads(tacacs_server)
            if type(tacacs_server) is dict:  # 单个server
                tacacs_server = [tacacs_server]
        except Exception:
            pass

    if type(tacacs_server) is not list or len(tacacs_server) == 0:  # 配置错误 -->local
        return False, status_codes.auth_tacacs_config_err, True

    err_count = 0
    for server in tacacs_server:
        try:
            success, result = tacacs_auth(username, password, server)  # success:成功失败, result:role
            if success is False or type(result) is not str:
                # 1.authenticate失败/TACACS+用户认证失败
                # 2.authorize失败/获取TACACS+授权失败
                continue

            return *update_auth_user(username, result, 'tacacs+'), False
        except Exception as e:
            flaskz_logger.exception(e)
            err_count += 1
    if err_count == len(tacacs_server):  # 服务器都认证异常, -->local
        return False, status_codes.auth_tacacs_auth_fail, True
    return False, status_codes.auth_tacacs_auth_fail, False


def tacacs_auth(username, password, server):
    """
    tacacs_auth('boc_admin', 'Admin@123', {
        'host': '10.75.44.73',
        'port': 49,
        'secret': 'cisco123',
        'author_args': 'service=*',
        'author_role_pattern': 'cisco-av-pair=shell:roles=',
    })
    username/password
        -boc_admin/Admin@123
        -boc_oper/Admin@123

    连接失败: raise e
    认证失败: (False, False)
    授权失败: (True, False)
    授权成功: (True, role/None)
    """
    tacacs_client = _create_tacacs_client(server)
    authen_type = _get_authen_type(server.get('authen_type', 'ascii'))
    author_args = server.get('author_args')  # 'service=*'
    author_role_pattern = server.get('author_role_pattern')  # 如果为None，返回所有结果字符串，ex)'cisco-av-pair=shell:roles='

    try:
        authen = tacacs_client.authenticate(username, password, authen_type=authen_type)  # 认证-->检查账号/密码
        if authen.valid is not True:  # authenticate fail
            return False, False  # authenticate_fail

        if type(author_args) is str:
            author_args = [author_args.encode()]  # ex) [b"service=cisco-av-pair*"]

        author = tacacs_client.authorize(username, authen_type=authen_type, arguments=author_args)  # 授权-->角色-->local角色
        if author.valid is not True:
            return True, False  # authorize_fail
        return True, _get_author_role(author.arguments, author_role_pattern)
    except Exception as e:
        raise e


def _create_tacacs_client(server):
    """创建TACACS Client"""
    global TACACS_CLIENT_PARAMS
    if TACACS_CLIENT_PARAMS is None:
        TACACS_CLIENT_PARAMS = inspect.signature(TACACSClient).parameters
    cli_param = {'port': 49, 'timeout': 1, 'family': socket.AF_INET, 'host': server.get('server')}
    for param in server:
        if param in TACACS_CLIENT_PARAMS:
            cli_param[param] = server.get(param)

    return TACACSClient(**cli_param)


def _get_author_role(author_arguments, author_role_pattern=None):
    """返回角色"""
    if len(author_arguments) == 0:
        return None
    role_result = author_arguments[0].decode()
    if author_role_pattern is None:
        return role_result
    if author_role_pattern in role_result:
        return role_result[role_result.index(author_role_pattern) + len(author_role_pattern):]
    return None


def _get_authen_type(authen_type):
    """返回authen_type"""
    if type(authen_type) is not str:
        return authen_type
    return flags.TAC_PLUS_AUTHEN_TYPES.get(authen_type.lower())


from . import update_auth_user

if __name__ == "__main__":
    tacacs_auth('boc_admin', 'Admin@123', {
        'host': '10.75.44.73',
        'port': 49,
        'secret': 'cisco123',
        'author_args': 'service=*',
        'author_role_pattern': 'cisco-av-pair=shell:roles=',
    })
