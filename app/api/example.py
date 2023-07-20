# example
import json

from flask import request
from flaskz import res_status_codes
from flaskz.log import flaskz_logger
from flaskz.models import parse_pss
from flaskz.rest import register_model_route, rest_permission_required, get_rest_log_msg, log_operation, rest_login_required
from flaskz.utils import get_request_json, create_response

from ..api import api_bp
from ..modules.example import DepartmentModel, EmployeeModel, SimpleModel

# 注册数据模型路由: http://zhangyiheng.com/blog/articles/py_flaskz_api.html#toc-model-route
# API接口规范: http://zhangyiheng.com/blog/articles/dev_spec.html#toc-api
register_model_route(api_bp, SimpleModel, 'ex-simples', 'ex-simples')

register_model_route(api_bp, DepartmentModel, 'ex-departments', 'ex-departments')
register_model_route(api_bp, EmployeeModel, 'ex-employees', 'ex-employees',
                     to_json_option={  # 返回json选项
                         'cascade': 1,  # 返回Employee + 1层级联数据
                         'department': {  # 对于级联的department对象，输出json中只包含id和name属性
                             'include': ['id', 'name']
                         }
                     },
                     multi_models={
                         'employees': EmployeeModel,  # 模型类
                         'departments': {  # 模型类 + 选项
                             'model': DepartmentModel,
                             'option': {
                                 'include': ['id', 'name']
                             }
                         }
                     })


# -------------------------------------------ext-------------------------------------------
@api_bp.route('/ex-employees/count/', methods=['GET', 'POST'])
@rest_permission_required('ex-employees')
def employees_count():
    """查询数据总数(全部/条件)"""
    request_json = get_request_json({})
    success = True
    try:
        result = EmployeeModel.count(parse_pss(EmployeeModel, request_json))
        flaskz_logger.debug(get_rest_log_msg('Query Employees count', None, True, result))
    except Exception as e:
        flaskz_logger.exception(e)
        success, result = False, res_status_codes.db_query_err

    return create_response(success, result)


@api_bp.route('/ex-employees/clear/', methods=['DELETE'])
@rest_permission_required('ex-employees', 'update')
def employees_clear():
    """清除全部数据"""
    success = True
    try:
        result = EmployeeModel.clear_db()
        log_operation('ex-employees', 'delete', True, None, result)  # 操作日志
        flaskz_logger.debug(get_rest_log_msg('Clear TemplateModel', None, True, result))  # 系统日志
    except Exception as e:
        flaskz_logger.exception(e)
        success, result = False, res_status_codes.db_delete_err

    return create_response(success, result)


# -------------------------------------------bulk-------------------------------------------
@api_bp.route('/ex-employees/bulk-add/', methods=['POST'])
@rest_permission_required('ex-employees', 'update')
def employees_bulk_add():
    """批量添加数据"""
    request_json = request.json
    req_log_data = json.dumps(request_json)
    success, result = True, None
    try:
        EmployeeModel.bulk_add(request_json)
    except Exception as e:
        flaskz_logger.exception(e)
        success, result = False, res_status_codes.db_add_err

    log_operation('ex-employees', 'add', success, req_log_data, None)
    flaskz_logger.info(get_rest_log_msg('Bulk Add EmployeeModel data', req_log_data, success, None))

    return create_response(success, result)


@api_bp.route('/ex-employees/bulk-delete/', methods=['POST'])
@rest_permission_required('ex-employees', 'update')
def employees_bulk_delete():
    """批量删除数据"""
    request_json = request.json
    req_log_data = json.dumps(request_json)
    success, result = True, None
    try:
        EmployeeModel.bulk_delete(request_json)
    except Exception as e:
        flaskz_logger.exception(e)
        success, result = False, res_status_codes.db_delete_err

    log_operation('ex-employees', 'delete', req_log_data, None, None)
    flaskz_logger.info(get_rest_log_msg('Bulk Delete EmployeeModel data', req_log_data, success, None))

    return create_response(success, result)


@api_bp.route('/ex-employees/bulk-update/', methods=['POST'])
@rest_permission_required('ex-employees', 'update')
def employees_bulk_update():
    """批量更新数据"""
    request_json = request.json
    req_log_data = json.dumps(request_json)
    success, result = True, None
    try:
        EmployeeModel.bulk_update(request_json)
    except Exception as e:
        flaskz_logger.exception(e)
        success, result = False, res_status_codes.db_update_err

    log_operation('ex-employees', 'update', success, req_log_data, None)
    flaskz_logger.info(get_rest_log_msg('Bulk Update EmployeeModel data', req_log_data, success, None))

    return create_response(success, result)


# -------------------------------------------permission-------------------------------------------
# http://zhangyiheng.com/blog/articles/py_flaskz_api.html#toc-mgmt

@api_bp.route('/ex-employees/public', methods=['GET'])
def employees_public():
    """public API"""
    return create_response(True, 'public')


@api_bp.route('/ex-employees/login-required', methods=['GET'])
@rest_login_required()
def employees_login_required():
    """login required API"""
    return create_response(True, 'login_required')


@api_bp.route('/ex-employees/module-required', methods=['GET'])
@rest_permission_required('ex-employees')
def employees_module_required():
    """module permission required API"""
    return create_response(True, 'module required')


@api_bp.route('/ex-employees/module-action-required', methods=['GET'])
@rest_permission_required('ex-employees', 'update')
def employees_module_action_required():
    """module+action permission required"""
    return create_response(True, 'module+action required')
