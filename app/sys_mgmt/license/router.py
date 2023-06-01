import hashlib
import os

from flask import request
from flaskz import res_status_codes
from flaskz.log import flaskz_logger, get_log_data
from flaskz.models import model_to_dict
from flaskz.rest import get_rest_log_msg, rest_permission_required
from flaskz.utils import create_response, get_app_config

from . import SysLicense
from .util import parse_license
from ..router import sys_mgmt_bp, log_operation
from ...main import allowed_file
from ...sys_init import status_codes
from ...utils import get_app_license


# -------------------------------------------license-------------------------------------------
@sys_mgmt_bp.route('/licenses/', methods=['POST'])
@rest_permission_required('licenses')
def sys_license_upload():
    """上传license"""
    license_txt = None
    public_key_file = get_app_config('APP_LICENSE_PUBLIC_KEY_FILEPATH')
    if not os.path.isfile(public_key_file):
        success, res_data = False, status_codes.license_public_key_not_found
    else:
        file = request.files.get('file')
        if file is None or file.filename == '':
            success, res_data = False, res_status_codes.bad_request  # 'file not find'
        else:
            if allowed_file(file):
                license_txt = file.stream.read().decode("utf-8")
                with open(public_key_file, "r") as f:
                    public_key = f.read()
                license_result = parse_license(public_key, license_txt)
                if license_result is False:
                    success, res_data = False, status_codes.license_parse_error
                else:
                    success, res_data = SysLicense.add({
                        'license': license_txt,
                        'license_hash': hashlib.sha256(license_txt.encode('utf-8')).hexdigest(),
                        'user': license_result.get('User'),
                        'type': license_result.get('Type'),
                        'start_date': license_result.get('StartDate'),
                        'end_date': license_result.get('EndDate'),
                    })
                    res_data = model_to_dict(res_data)
            else:
                success, res_data = False, status_codes.file_format_not_allowed
    log_operation('licenses', 'add', success, license_txt, get_log_data(res_data))
    flaskz_logger.info(get_rest_log_msg('Upload license', license_txt, success, res_data))
    return create_response(success, res_data)


@sys_mgmt_bp.route('/licenses/', methods=['GET'])
@rest_permission_required('licenses')
def sys_license_query():
    """查询license列表"""
    result = SysLicense.query_all()
    success = result[0]
    res_data = model_to_dict(result[1])

    current_license = get_app_license()
    for data in res_data:
        signature = data.pop('Signature')
        if current_license and signature == current_license.get('Signature'):
            data['in_use'] = True

    flaskz_logger.debug(get_rest_log_msg('Query license', None, success, res_data))
    return create_response(success, res_data)
