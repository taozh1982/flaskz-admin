"""
工具集合,按需取用
为了方便维护和替换, 尽量不要修改_utils文件夹中的py
"""

from flaskz import res_status_codes


def clean_dict(data):
    keys = list(data.keys())
    for key in keys:
        v = data.get(key)
        if v is None or (type(v) is str and v.strip() == ''):
            data.pop(key)
    return data


def get_es_req_result(response):
    error = None
    try:
        response_json = response.json()
        if type(response_json) is dict:
            error = response_json.get('errors') or response_json.get('error')
    except Exception as e:
        return False, str(e)

    if error:
        if type(error) is dict and str(error.get('type')) == 'index_not_found_exception':
            return False, res_status_codes.db_data_not_found
        else:
            return False, res_status_codes.es_connect_err

    status_code = response.status_code
    if 200 <= status_code < 300:
        if response_json:
            return True, response_json
    return False, res_status_codes.es_connect_err


from . import es_util
from . import network_util
from . import num_util
from . import xl_util
from . import config_util
from . import text_util
from . import datetime_util

es_util.get_request_result = get_es_req_result
