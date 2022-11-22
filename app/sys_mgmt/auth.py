# 1>session
# 2>cookie
# 3>header token

from flask import current_app
from flask_login import current_user
from flaskz.auth import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.exceptions import abort

from ..sys_init import get_app_config


def load_user_by_id(user_id):
    return User.query_by_pk(user_id)


def load_user_by_token(request):
    token = request.headers.get(get_app_config('APP_TOKEN_AUTHORIZATION'))
    result = verify_token(token)
    if result is not False:
        return User.query_by_pk(result.get('id'))
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
        data = s.loads(token)
    except:
        return False
    return data


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


def permission_check(module, op_permission=None):
    if module is not False:  # False to disable permission check
        if _check_login() is False:
            return abort(401, response='unauthorized')
        if _check_permission(module, op_permission) is False:
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
    if current_user.is_anonymous:
        return False
    return True


def _check_permission(module, permission):
    # if current_user.is_anonymous:
    #     return False
    if module == "*" or module is None:
        return True
    if hasattr(current_user, 'can'):
        return current_user.can(module, permission)
    return False


from ..sys_mgmt.model import User
