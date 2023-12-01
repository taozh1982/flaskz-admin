"""
1.Session/Cookie
2.JWT/JWS Bear Token
3.Basic Auth
"""
from flask_login import current_user
from flaskz.auth import TimedJSONWebSignatureSerializer as Serializer
from flaskz.utils import get_app_config
from itsdangerous.exc import SignatureExpired
from werkzeug.exceptions import abort


# ------------------------------load user------------------------------
def load_user_by_id(user_id):
    """Session/Cookie"""
    return SysUser.query_by_pk(user_id)


def load_user_by_request(request):
    return _load_user_by_token(request) or _load_user_by_basic_auth(request)


def _load_user_by_token(request):
    """Token"""
    token = request.headers.get(get_app_config('APP_TOKEN_AUTHORIZATION'))
    if token:
        if token.startswith('Bearer '):  # @2023-09-28添加对以"Bearer "开头token的处理
            token = token[7:]
        # token = token.replace('Bearer ', '', 1)
        result = verify_token(token)
        if result is not False:
            token_type = result.get('type')
            if token_type == 'refresh':
                return None
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


# ------------------------------jwt token------------------------------
def verify_token(token, secrete_key=None):
    if token is None:
        return False
    secrete_key = secrete_key if secrete_key is not None else get_app_config('SECRET_KEY')
    s = Serializer(secrete_key)
    try:
        token_payload = s.loads(token)
    except SignatureExpired:  # expired
        return False
    except (Exception,):
        return False
    return token_payload


def verify_refresh_token(token, secrete_key=None):
    result = verify_token(token, secrete_key)
    if type(result) is dict and result.get('type') == 'refresh':
        return result
    return False


def generate_token(obj, include_refresh_token=True):
    obj = obj.copy()
    obj['type'] = 'access'
    result = {'token': _generate_token(obj, expires_in=get_app_config('APP_TOKEN_EXPIRES_IN'))}

    refresh_expires_in = get_app_config('APP_REFRESH_TOKEN_EXPIRES_IN')
    if type(refresh_expires_in) is int and refresh_expires_in > 0:
        refresh_obj = None
        if type(include_refresh_token) is dict:
            refresh_obj = include_refresh_token
        elif include_refresh_token is True:
            if 'id' in obj:
                refresh_obj = {'id': obj.get('id')}
            else:
                refresh_obj = obj
            refresh_obj['type'] = 'refresh'
        if refresh_obj:
            result['refresh_token'] = _generate_token(refresh_obj, expires_in=refresh_expires_in)

    return result


def _generate_token(obj, expires_in, secrete_key=None):
    secrete_key = secrete_key if secrete_key is not None else get_app_config('SECRET_KEY')
    # expires_in = expires_in if expires_in is not None else app_config.get('APP_TOKEN_EXPIRES_IN')
    s = Serializer(secrete_key, expires_in=expires_in)
    return s.dumps(obj).decode('utf-8')


# ------------------------------check------------------------------
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
