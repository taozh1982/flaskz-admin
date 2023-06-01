# 1>session
# 2>cookie
# 3>header token

from flask import current_app
from flask_login import current_user
from flaskz.auth import TimedJSONWebSignatureSerializer as Serializer
from flaskz.utils import get_app_config
from itsdangerous.exc import SignatureExpired
from werkzeug.exceptions import abort


def load_user_by_id(user_id):
    """Session/Cookie"""
    return SysUser.query_by_pk(user_id)


def load_user_by_request(request):
    return _load_user_by_token(request) or _load_user_by_basic_auth(request)


def _load_user_by_token(request):
    """Token"""
    token = request.headers.get(get_app_config('APP_TOKEN_AUTHORIZATION'))
    if token:
        result = verify_token(token)
        if result is not False:
            return SysUser.query_by_pk(result.get('id'))
    return None


def _load_user_by_basic_auth(request):  # @2023-05-09 添加Basic Auth认证
    """Basic Auth"""
    basic_auth = request.authorization
    if basic_auth:
        username = getattr(basic_auth, 'username', None)
        password = getattr(basic_auth, 'password', None)
        if username and password:
            verify_result = SysUser.verify_password(username, password)
            if verify_result[0] is True:
                return verify_result[1]
    return None


def generate_token(content, secrete_key=None, expires_in=None):
    app_config = current_app.config
    secrete_key = secrete_key if secrete_key is not None else app_config.get('SECRET_KEY')
    expires_in = expires_in if expires_in is not None else app_config.get('APP_TOKEN_EXPIRES_IN')
    s = Serializer(secrete_key, expires_in=expires_in)
    return s.dumps(content).decode('utf-8')


def verify_token(token, secrete_key=None):
    if token is None:
        return False
    app_config = current_app.config
    secrete_key = secrete_key if secrete_key is not None else app_config.get('SECRET_KEY')
    s = Serializer(secrete_key)
    try:
        token_payload = s.loads(token)
    except SignatureExpired:  # expired
        return False
    except (Exception,):
        return False
    return token_payload


# def login_required():
#     def decorate(func):
#         @wraps(func)
#         def wrapper(*args, **kwargs):
#             if _check_login() is False:
#                 return abort(401, response='forbidden')
#             return func(*args, **kwargs)
#
#         return wrapper
#
#     return decorate


def login_check():
    if _check_login() is False:
        return abort(401, response='unauthorized')
    return True


def permission_check(module, action=None):
    if module is not False:  # False to disable permission check
        if _check_login() is False:
            return abort(401, response='unauthorized')
        if _check_permission(module, action) is False:
            return abort(403, response='forbidden')
    return True


# def permission_required(module, op_permission=None):
#     def decorate(func):
#         @wraps(func)
#         def wrapper(*args, **kwargs):
#             if _check_login() is False:
#                 return abort(401, response='forbidden')
#             if _check_permission(module, op_permission) is False:
#                 return abort(403, response='unauthorized')
#             return func(*args, **kwargs)
#
#         return wrapper
#
#     return decorate


def _check_login():
    if not current_user or current_user.is_anonymous:
        return False
    return True


def _check_permission(module, action):
    # if current_user.is_anonymous:
    #     return False
    if module == "*" or module is None:
        return True
    if current_user and hasattr(current_user, 'can'):
        return current_user.can(module, action)
    return False


from ..sys_mgmt.model import SysUser
