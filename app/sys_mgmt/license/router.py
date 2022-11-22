from flask import request
from flaskz.log import flaskz_logger, get_log_data
from flaskz.models import model_to_dict
from flaskz.rest import get_rest_log_msg, rest_permission_required
from flaskz.utils import create_response, get_app_path

from . import License
from .util import parse_license
from ..router import sys_mgmt_bp, log_operation
from ...main import allowed_file
from ...sys_init import status_codes
from ...utils import get_app_license


# -------------------------------------------license-------------------------------------------
@sys_mgmt_bp.route('/license/', methods=['POST'])
@rest_permission_required('license')
def sys_license_upload():
    file = request.files.get('file')
    license_txt = ''
    if file is None or file.filename == '':
        success = False
        res_data = 'License file not exist'
    else:
        if allowed_file(file):
            license_txt = file.stream.read().decode("utf-8")
            with open(get_app_path("_license/public.key"), "r") as f:
                public_key = f.read()
            license_result = parse_license(public_key, license_txt)
            if license_result is False:
                success, res_data = False, status_codes.license_parse_error
            else:
                success, res_data = License.add({
                    'license': license_txt,
                    'user': license_result.get('User'),
                    'type': license_result.get('Type'),
                    'start_date': license_result.get('StartDate'),
                    'end_date': license_result.get('EndDate'),
                })
                res_data = model_to_dict(res_data)
        else:
            success, res_data = False, status_codes.file_format_not_allowed
    log_operation('license', 'add', success, license_txt, get_log_data(res_data))
    return create_response(success, res_data)


@sys_mgmt_bp.route('/license/', methods=['GET'])
@rest_permission_required('license')
def license_query():
    """
    Query the role list and the full menu list with operation permissions
    :return:
    """
    result = License.query_all()
    success = result[0]
    res_data = model_to_dict(result[1])

    current_license = get_app_license()
    for data in res_data:
        signature = data.pop('Signature')
        if current_license and signature == current_license.get('Signature'):
            data['in_use'] = True

    flaskz_logger.debug(get_rest_log_msg('Query license', None, success, res_data))
    return create_response(success, res_data)
