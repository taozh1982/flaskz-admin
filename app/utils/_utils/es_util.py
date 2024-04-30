import json

from flaskz.log import flaskz_logger
from flaskz.utils import api_request

from . import json_dumps


def es_query(es_url, es_index, payload, hits_source=True):
    """
    查询ES数据
    1. 默认最大size是10000
        - 修改index.max_result_window参数
        - 使用scroll_query

    """
    query_url = f'{es_url}/{es_index}/_search'
    result = api_request(query_url, 'POST', json=payload)
    if type(result) is tuple:
        success, result = result
    else:
        success, result = True, result
        if isinstance(result, str):
            result = json.loads(result)
            if hits_source is True:
                result = _get_result(result, hits_source)
    flaskz_logger.debug(f'ES query:\n -url={query_url}\n -payload={payload}\n -success={success}')
    return success, result


def es_scroll_query(es_url, es_index, payload, onprogress, size=600, hits_source=True):
    """
    scroll数据查询
    onprogress回调函数用于接收查询到的数据，回调参数为(True/False, hits/True/None)元组
        -如果查询成功，参数为(True,hits)
        -如果查询完成，参数为(True,True)
        -如果查询失败，参数为(False,None/api_result)

    .. Example::
        es.scroll_query(get_app_config('HW_FT_ES_URL'), get_app_config('HW_FT_ES_INDEX'), {
        "sort": {"collection_starttime": "desc"},
        "query": {
            "bool": {
                "must": [
                    {"match": {"device.keyword": kwargs.get('device')}},
                    {"range": {"collection_starttime": {"gte": kwargs.get('start'), "lt": kwargs.get('end')}}}
                ]
            }
        }
    }, lambda result: agg_task.append_raw_data(result))
    """
    query_url = es_url + '/' + es_index
    payload.setdefault('size', size)
    flaskz_logger.debug(f'ES scroll query start:\n-url={query_url}\n -payload={payload}')

    scroll = '2m'  # scroll存在的时间
    result = api_request(query_url + '/_search?scroll=' + scroll, 'POST', json=payload)
    if type(result) is tuple:
        flaskz_logger.debug(f'ES scroll data query failed:\n-result={result[1]}')
        onprogress((False, result[1]))  # False==查询失败
        return

    result = json.loads(result)
    scroll_id = result.get('_scroll_id')
    # hits = result.get('hits', {}).get('hits', [])
    hits = _get_result(result, hits_source)
    count = scroll_size = len(hits)
    es_scroll_url = es_url + '/_search/scroll'  # 不合并es_url+es_index

    while scroll_size > 0:  # 循环查询
        onprogress((True, hits))  # 查询成功
        if scroll_size < size:
            break
        result = api_request(es_scroll_url, 'GET', json={
            "scroll": scroll,
            "scroll_id": scroll_id
        })
        if type(result) is tuple:
            flaskz_logger.debug(f'ES scroll data query failed:\n-result={result[1]}')
            onprogress((False, None))  # False==查询失败
            return
        result = json.loads(result)
        scroll_id = result.get('_scroll_id')
        # hits = result.get('hits', {}).get('hits', [])
        hits = _get_result(result, hits_source)
        scroll_size = len(hits)
        count += scroll_size

    api_request(es_url + '/_search/scroll', 'DELETE', json={  # 删除scroll_id
        "scroll_id": [scroll_id]
    })

    flaskz_logger.debug(f'ES data query completed:\n-url={query_url}\n -count={count}')
    onprogress((True, True))  # True==操作完成


def es_bulk_save(es_url, es_index, bulk_data, bulk_max_size=600):
    """批量保存数据到指定的index"""
    bulk_url = es_url + '/' + es_index + '/_bulk'
    return _bulk_save(bulk_url, 'PUT', 'index', bulk_data, bulk_max_size)


def es_ds_bulk_save(es_url, es_index, bulk_data, bulk_max_size=600, ds_pipeline='add-timestamp'):
    """
    批量保存数据到指定的data stream
    返回(保存成功数,保存失败数)

    .. Example::
        success_size, fail_size = es.ds_bulk_save(get_app_config('SW_INTERFACE_RATE_ES_URL'),
                                                    get_app_config('SW_INTERFACE_RATE_ES_INDEX'),
                                                    data,
                                                    ds_pipeline=get_app_config('SW_INTERFACE_RATE_ES_DS_PIPELINE'))

    """
    bulk_url = es_url + '/' + es_index + '/_bulk?refresh'
    if ds_pipeline:
        bulk_url += '&pipeline=' + ds_pipeline
    return _bulk_save(bulk_url, 'POST', 'create', bulk_data, bulk_max_size)


def _bulk_save(bulk_url, bulk_method, action, bulk_data, bulk_max_size):
    count = len(bulk_data)
    if count == 0:
        return 0, 0
    d, m = divmod(count, bulk_max_size)
    if m > 0:
        d += 1

    fail_count = 0
    for i in range(d):
        save_list = bulk_data[i * bulk_max_size: (i + 1) * bulk_max_size]
        save_data = ''
        for items in save_list:
            save_data += '{"' + action + '":{}}\n' + json_dumps(items) + '\n'
        result = api_request(bulk_url, bulk_method, data=save_data, headers={'content-type': 'application/json'})
        if type(result) is tuple or json.loads(result).get('errors') is True:
            fail_count += len(save_list)

    success_count = count - fail_count
    flaskz_logger.debug(f'ES save data:\n-total={count}\n-success={success_count}\n-fail={fail_count}')
    return success_count, fail_count  # 成功数量,失败数量


def _get_result(result, source=True):
    hits = result.get('hits', {}).get('hits', [])
    if source is False:
        return hits
    sources = []
    for hit in hits:
        sources.append(hit.get('_source', {}))
    return sources
