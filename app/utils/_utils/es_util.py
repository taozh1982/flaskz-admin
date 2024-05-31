from flaskz.log import flaskz_logger
from flaskz.utils import request, json_dumps


def query(es_url, es_index, payload, hits_source=True):
    """
    查询ES数据
    1. 默认最大size是10000
        - 修改index.max_result_window参数
        - 使用scroll_query


    .. Example::
        es_util.query(es_url,es_index,payload=..) # ES请求URL=[post]http://es_url/es_index/_search
        payload = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "device_name.keyword": "device-a"
                            }
                        }
                    ]
                }
            },
            "size": 10000,
            "sort": [
                {
                    "date": {
                        "order": "asc"
                    }
                }
            ]
        }
    """
    query_url = f'{es_url}/{es_index}/_search'
    success, result = _request_es(query_url, 'POST', json=payload)
    if success and hits_source is True:
        result = _get_query_result(result, hits_source)
    flaskz_logger.debug(f'ES query:\n -url={query_url}\n -payload={payload}\n -success={success}')

    return success, result


def scroll_query(es_url, es_index, payload, onprogress, size=600, hits_source=True, scroll='2m'):
    """
    scroll数据查询
    onprogress回调函数用于接收查询到的数据，回调参数为(True/False, hits/True/None)元组
        -如果查询成功，参数为(True,hits)
        -如果查询完成，参数为(True,True)
        -如果查询失败，参数为(False,None/api_result)

    .. Example::
        es_util.scroll_query(es_url,es_index,payload={
        "sort": {"collection_at": "desc"},
        "query": {
            "bool": {
                "must": [
                    {"match": {"device.keyword": 'device1'}},
                    {"range": {"collection_at": {"gte": "2024-05-09", "lt": "2024-05-16"}}}
                ]
            }
        }
    }, lambda result: agg_task.append_raw_data(result))
    """
    query_url = es_url + '/' + es_index
    payload.setdefault('size', size)
    flaskz_logger.debug(f'ES scroll query start:\n-url={query_url}\n -payload={payload}')

    # scroll = '2m'  # scroll存在的时间
    success, result = _request_es(query_url + '/_search?scroll=' + scroll, 'POST', json=payload)
    if success is False:
        flaskz_logger.debug(f'ES scroll data query failed:\n-result={result[1]}')
        onprogress((False, result))  # False==查询失败
        return

    scroll_id = result.get('_scroll_id')
    # hits = result.get('hits', {}).get('hits', [])
    hits = _get_query_result(result, hits_source)
    count = scroll_size = len(hits)
    es_scroll_url = es_url + '/_search/scroll'  # 不合并es_url+es_index

    while scroll_size > 0:  # 循环查询
        onprogress((True, hits))  # 查询成功
        if scroll_size < size:
            break
        success, result = _request_es(es_scroll_url, 'GET', json={
            "scroll": scroll,
            "scroll_id": scroll_id
        })
        if success is False:
            flaskz_logger.debug(f'ES scroll data query failed:\n-result={result}')
            onprogress((False, result))  # False==查询失败
            return
        scroll_id = result.get('_scroll_id')
        # hits = result.get('hits', {}).get('hits', [])
        hits = _get_query_result(result, hits_source)
        scroll_size = len(hits)
        count += scroll_size

    _request_es(es_url + '/_search/scroll', 'DELETE', json={  # 删除scroll_id
        "scroll_id": [scroll_id]
    })

    flaskz_logger.debug(f'ES data query completed:\n-url={query_url}\n -count={count}')
    onprogress((True, True))  # True==操作完成


def delete_by_query(es_url, es_index, payload):
    """
    查询&删除ES数据

     .. Example::
        es_util.delete_by_query(es_url,es_index,payload=..) # ES请求URL = [post]http://{{es_url}}/device/_delete_by_query
        payload = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "device_name.keyword": "device1"
                            }
                        },
                        {
                            "date": "2024-05-15"
                        }
                    ]
                }
            }
        }
    """
    query_url = f'{es_url}/{es_index}/_delete_by_query'
    success, result = _request_es(query_url, 'POST', json=payload)
    if success:
        result = result.get('total')
    flaskz_logger.debug(f'ES delete by query:\n -url={query_url}\n -payload={payload}\n -success={success}')

    return success, result


def gen_query_payload(query_bool=None, size=None, sort=None):
    """
    生成查询payload
    如果query_bool是list，默认为must子句列表

    结果示例
    {
      "query": {                          // 根层：定义查询的入口
        "bool": {                         // 布尔查询层：组合多个查询条件
          "must": [                       // must子句：必须满足的条件
            { "match": {                  // 查询类型层：match查询
                "field1": "value1"        // 条件层：具体的查询条件
              }
            },
            { "range": {                  // 查询类型层：range查询
                "field2": {               // 条件层：具体的查询条件
                  "gte": 10,              // 条件：大于等于10
                  "lte": 20               // 条件：小于等于20
                }
              }
            }
          ],
          "should": [                     // should子句：可选满足的条件
            { "term": {                   // 查询类型层：term查询
                "field3": "value3"        // 条件层：具体的查询条件
              }
            }
          ],
          "must_not": [                   // must_not子句：必须不满足的条件
            { "term": {                   // 查询类型层：term查询
                "field4": "value4"        // 条件层：具体的查询条件
              }
            }
          ],
          "filter": [                     // filter子句：用于过滤的条件
            { "exists": {                 // 查询类型层：exists查询
                "field": "field5"         // 条件层：具体的查询条件
              }
            }
          ]
        }
      },
      "sort": [                           // 添加排序参数
        { "price": "asc" },               // 按价格升序排序
        { "rating": "desc" }              // 按评分降序排序
      ],
      "size": 10                          // 设置返回结果的数量
    }
    """
    payload = {}
    if type(size) is int:
        payload['size'] = size

    if type(sort) is dict:
        sort = [sort]
    if type(sort) is list and len(sort) > 0:
        payload['size'] = sort

    if type(query_bool) is list:  # 默认是must
        query_bool = {
            "must": query_bool
        }
    if type(query_bool) is dict:
        payload['query'] = {
            "bool": query_bool
        }

    return payload


def bulk_save(es_url, es_index, bulk_data, bulk_max_size=600):
    """
    批量保存数据到指定的index


    .. Example::
        success_size, fail_size = es_util.bulk_save(es_url, es_index, data_list)

    :param es_url: ES地址
    :param es_index: ES索引
    :param bulk_data: 批量保存的数据列表
    :param bulk_max_size: 每次批量保存的最大数据条数
    :return:
    """
    bulk_url = es_url + '/' + es_index + '/_bulk'
    return _bulk_save(bulk_url, 'PUT', 'index', bulk_data, bulk_max_size)


def ds_bulk_save(es_url, es_index, bulk_data, bulk_max_size=600, ds_pipeline='add-timestamp'):
    """
    批量保存数据到指定的data stream
    返回(保存成功数,保存失败数)

    .. Example::
        success_size, fail_size = es_util.ds_bulk_save(es_url, es_index, data_list, ds_pipeline='add-timestamp')


    :param es_url: ES地址
    :param es_index: ES索引
    :param bulk_data: 批量保存的数据列表
    :param bulk_max_size: 每次批量保存的最大数据条数
    :param ds_pipeline: data stream 的 pipeline
    :return:
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
        success, result = _request_es(bulk_url, bulk_method, data=save_data, headers={'content-type': 'application/json'})
        if success is False:
            fail_count += len(save_list)

    success_count = count - fail_count
    flaskz_logger.debug(f'ES save data:\n-total={count}\n-success={success_count}\n-fail={fail_count}')
    return success_count, fail_count  # 成功数量,失败数量


def _request_es(*args, **kwargs):
    kwargs.pop('raw_response', None)
    success, response = request(*args, **kwargs, raw_response=True)
    if success is False:
        return success, response

    status_code = response.status_code
    if 200 <= status_code < 300:
        try:
            response_json = response.json()
            errors = response_json.get('errors')
            if errors:
                return False, errors
            return True, response_json
        except Exception as e:
            return False, str(e)
    return False, status_code


def _get_query_result(result, source=True):
    hits = result.get('hits', {}).get('hits', [])
    if source is False:
        return hits
    sources = []
    for hit in hits:
        sources.append(hit.get('_source', {}))
    return sources
