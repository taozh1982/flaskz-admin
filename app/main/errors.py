from flask import request
from flaskz import res_status_codes
from flaskz.log import flaskz_logger
from flaskz.rest import get_rest_log_msg
from flaskz.utils import get_status_msg, is_ajax, create_response

from . import main_bp


# payload error
@main_bp.app_errorhandler(400)
def uri_unauthorized(e):  # Bad Request
    return _return_error(res_status_codes.bad_request, 400)


# need login
@main_bp.app_errorhandler(401)
def uri_unauthorized(e):  # Unauthorized, need login
    return _return_error(res_status_codes.uri_unauthorized, 401)


# need permission
@main_bp.app_errorhandler(403)
def uri_forbidden(e):  # Forbidden, need permission
    return _return_error(res_status_codes.uri_forbidden, 403)


@main_bp.app_errorhandler(404)
def uri_not_found(e):
    return _return_error(res_status_codes.uri_not_found, 404)


@main_bp.app_errorhandler(405)
def method_not_allowed(e):  # HTTP method is not supported
    return _return_error(res_status_codes.method_not_allowed, 405)


@main_bp.app_errorhandler(500)
def internal_server_error(e):
    return _return_error(res_status_codes.internal_server_error, 500)


def _return_error(app_code, http_code):
    app_msg = str(get_status_msg(app_code))
    flaskz_logger.error(get_rest_log_msg(request.url + ' request ' + app_msg, None, False, app_code))

    if is_ajax() or (request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html):
        return create_response(False, app_code)
    # return (app_code, http_code)
    return get_status_msg(app_msg)  # view
