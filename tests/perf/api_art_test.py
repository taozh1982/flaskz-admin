"""
ART = Average Response Time = 平均响应时间
"""
import json
from datetime import datetime
from functools import wraps

from flaskz.utils import api_request
from requests.auth import HTTPBasicAuth


def art_logging_fun(action, before_func=None):
    """ART时间Decorator"""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if before_func:
                before_result = before_func()
                if type(before_result) is dict:
                    kwargs.update(before_result)
            print(action + ' ART Test Start')
            count = args[0] if len(args) > 0 else 100
            start_time = datetime.now().timestamp()
            func(*args, **kwargs)
            print(action + ' ART = ' + str(round((datetime.now().timestamp() - start_time) * 1000 / count)) + "ms\n")

        return wrapper

    return decorator


def _add_update_ins():
    """添加用于update的instance"""
    result = api_request('http://127.0.0.1:666/api/v1.0/ex-simples/', method="POST", json={
        "field_string": "Item-perf-update",
        "field_integer": 0,
        "field_float": 1.0,
        "field_boolean": True,
        "field_text": "for test",
    }, auth=HTTPBasicAuth('admin', 'admin'))
    return json.loads(result).get('data')


def _query_last_ins():
    """查询最后一个instance"""
    result = api_request('http://127.0.0.1:666/api/v1.0/ex-simples/pss/', method="POST", json={
        "sort": {
            "field": "id",
            "order": "desc"
        },
        "page": {
            "offset": 0,
            "size": 1
        }
    }, auth=HTTPBasicAuth('admin', 'admin'))
    result = json.loads(result)
    last_ins = result.get('data', {}).get('data', [])[0] or {}
    return {
        'id': last_ins.get('id') or 0
    }
    # return json.loads(result).get('data')


@art_logging_fun('Add')
def add_art_test(count=100):
    """ART = 140ms"""
    for i in range(count):
        api_request('http://127.0.0.1:666/api/v1.0/ex-simples/', method="POST", json={
            "field_string": "Item-perf-" + str(i),
            "field_integer": i,
            "field_float": 1.0,
            "field_boolean": i % 2 == 0,
            "field_text": "for test",
        }, auth=HTTPBasicAuth('admin', 'admin'))


@art_logging_fun('Update', _add_update_ins)
def update_art_test(count=100, **kwargs):
    """ART = 140ms"""
    for i in range(count):
        api_request('http://127.0.0.1:666/api/v1.0/ex-simples/', method="PATCH", json={
            'id': kwargs.get('id'),
            "field_integer": i,
            "field_float": 1.0,
            "field_boolean": i % 2 == 0,
            "field_text": "for test",
        }, auth=HTTPBasicAuth('admin', 'admin'))


@art_logging_fun('Delete', _query_last_ins)
def delete_art_test(count=100, **kwargs):
    """ART = 140ms"""
    last_id = kwargs.get('id') or 0
    for i in range(count):
        del_id = last_id - i
        if del_id < 1:
            break
        api_request('http://127.0.0.1:666/api/v1.0/ex-simples/' + str(del_id) + '/', method="DELETE", json={
            'id': kwargs.get('id'),
            "field_integer": i,
            "field_float": 1.0,
            "field_boolean": i % 2 == 0,
            "field_text": "for test",
        }, auth=HTTPBasicAuth('admin', 'admin'))


@art_logging_fun('Query All')
def query_all_art_test(count=100):
    """ART = 140ms"""
    for i in range(count):
        api_request('http://127.0.0.1:666/api/v1.0/ex-simples/', method="GET", auth=HTTPBasicAuth('admin', 'admin'))


if __name__ == '__main__':
    pass
    add_art_test()
    query_all_art_test()
    delete_art_test()
    update_art_test()
