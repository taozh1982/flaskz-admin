from flask import request, make_response, current_app
from flaskz.log import flaskz_logger
from flaskz.utils import clear_app_cache, get_app_path, get_app_config

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
    flaskz_logger.debug('Query sys-log: ' + str(file_name) + '?date=' + date)
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
            return 'sys-log not found'
    return 'sys-log not found'


@sys_mgmt_bp.route('/_/url_map/', methods=['GET'])
def _sys_url_map():
    """
    Get the url map of the current app

    #methods#                      #rule#                                             #endpoint#
    [OPTIONS,POST]                 /api/v1.0/template/                                api.model_rest_template_add
    """
    rules = list(current_app.url_map.iter_rules())
    rules.sort(key=lambda item: item.rule)
    routes = ['{:30s} {:50s} {}'.format('#methods#', '#rule#', '#endpoint#')]
    for rule in rules:
        methods = '[' + ','.join(sorted(rule.methods)) + ']'
        line = '{:30s} {:50s} {}'.format(methods, rule.rule, rule.endpoint)
        routes.append(line)
    resp = current_app.make_response('\n'.join(routes))
    resp.mimetype = "text/plain"
    return resp
