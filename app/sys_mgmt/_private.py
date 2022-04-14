from flask import request, make_response
from flaskz.log import flaskz_logger
from flaskz.utils import clear_app_cache, get_app_config, get_app_path

from . import sys_mgmt_bp


@sys_mgmt_bp.route('/_/clear_cache/', methods=['GET'])
def _sys_clear_cache():
    """
    Clear the cached data.
    Internal use.
    :return:
    """
    clear_app_cache()
    flaskz_logger.debug('clear data cache')
    return 'clear_cache'


@sys_mgmt_bp.route('/_/sys_log/', methods=['GET'])
def _sys_sys_log():
    """
    Query the application log.
     Internal use.
    /_sys_log
    /_sys_log/date=2019-10-18
    :return:
    """
    date = request.args.get('date', '').strip()
    file_path = get_app_config('FLASKZ_LOGGER_FILEPATH')
    file_name = get_app_config('FLASKZ_LOGGER_FILENAME')
    flaskz_logger.debug('query app log:' + str(file_name))
    if file_path and file_name:
        file_name = get_app_path(file_path, file_name)

        if date != '':
            file_name += '.' + date
        try:
            with open(file_name, 'r', encoding='utf-8') as file:
                data = file.read()
            res = make_response(data)
            res.headers['Content-Type'] = 'text/plain; charset=utf-8'
            return res
        except Exception as e:
            return 'sys log not found'
    return 'sys log not found'
