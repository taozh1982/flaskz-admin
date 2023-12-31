import urllib.parse
import uuid


def gen_yang_patch_data(patch_data):
    """
    生成yang patch的payload
    :return:
    {
        "ietf-yang-patch:yang-patch": {
            "patch-id": "patch-b6a86436-af9f-4392-ae55-ff62ff71545a",
            "edit": []
        }
    }
    """
    if type(patch_data) is list:
        edit_list = patch_data
    else:
        edit_list = [patch_data]
    return {
        "ietf-yang-patch:yang-patch": {
            "patch-id": "patch-" + str(uuid.uuid4()),
            "edit": edit_list}}


def add_dryrun_query(url):
    """url添加dryrun查询参数"""
    url_parts = urllib.parse.urlparse(url)
    query = dict(urllib.parse.parse_qsl(url_parts.query))
    query.update({'dryrun': 'native'})
    return url_parts._replace(query=urllib.parse.urlencode(query)).geturl()


def get_path_operation(op_type):
    """返回yang patch操作的运算符"""
    return {
        'add': 'create',
        'update': 'replace',
        'delete': 'delete',
        'set': 'create',
        'unset': 'create'
    }.get(op_type)
