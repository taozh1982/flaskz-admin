from flaskz import res_status_codes


def init_app(app):
    # response status for client use
    # if value is tuple, the second value will be returned as the error message

    # database
    res_status_codes.db_add_err = 'db_add_err', '数据添加异常'
    res_status_codes.db_delete_err = 'db_delete_err', '数据删除异常'
    res_status_codes.db_update_err = 'db_update_err', '数据更新异常'
    res_status_codes.db_query_err = 'db_query_err', '数据查询异常'

    res_status_codes.db_data_not_found = 'db_data_not_found', '数据不存在'
    res_status_codes.db_data_already_exist = 'db_data_already_exist', '数据已存在'
    res_status_codes.db_data_in_use = 'db_data_in_use', '数据使用中'

    # remote request
    res_status_codes.api_request_err = "api_req_err", '远端API请求异常'

    # error
    res_status_codes.uri_unauthorized = 'uri_unauthorized', '未登录'  # 401 Unauthorized, need login
    res_status_codes.uri_forbidden = 'uri_forbidden', '无访问权限'  # 403 Forbidden, need permission
    res_status_codes.uri_not_found = 'uri_not_found', '找不到请求资源'  # 404 Not Found
    res_status_codes.method_not_allowed = 'method_not_allowed', '资源不支持请求方法'  # 405 HTTP method is not supported
    res_status_codes.internal_server_error = 'internal_server_error', '服务器异常'  # 500
    res_status_codes.bad_request = 'bad_request', '客户端请求错误'  # 400 Bad Request, payload error

    # account
    res_status_codes.account_not_found = 'account_not_found', '账号不存在'
    res_status_codes.account_disabled = 'account_disabled', "账号被禁用"
    res_status_codes.account_verify_err = 'account_verify_err', '密码错误'


file_format_not_allowed = 'file_format_not_allowed', '非法文件格式'
license_parse_error = 'license_parse_error', 'License解析错误'
license_not_found = 'license_not_found', '系统未授权'
license_public_key_not_found = 'license_public_key_not_found', '未发现授权公钥'
