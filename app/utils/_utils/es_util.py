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
                                "device_name.keyword": "device1"
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
        result = get_result_hits(result, hits_source)
    flaskz_logger.debug(f'ES query:\n -url={query_url}\n -payload={payload}\n -success={success}')
    return success, result


def mquery(es_url, payloads, hits_source=True):
    query_url = f'{es_url}/_msearch'
    body = ''
    for payload in payloads:
        body += json_dumps(payload.get('index')) + '\n'
        body += json_dumps(payload.get('query')) + '\n'
    success, result = _request_es(query_url, 'POST', data=body, headers={"Content-Type": "application/json"})
    if success and hits_source is True:
        responses = result.get('responses') or []
        result = []
        for response in responses:
            result.append(get_result_hits(response, hits_source))
    flaskz_logger.debug(f'ES mquery:\n -url={query_url}\n -payload={payloads}\n -success={success}')
    return success, result


def delete_by_query(es_url, es_index, payload):
    """
    查询&删除ES数据

     .. Example::
        es_util.delete_by_query(es_url,es_index,payload=..) # ES请求URL=[post]http://{{es_url}}/device/_delete_by_query
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
    hits = get_result_hits(result, hits_source)
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
        hits = get_result_hits(result, hits_source)
        scroll_size = len(hits)
        count += scroll_size
    # 删除scroll_id
    _request_es(es_url + '/_search/scroll', 'DELETE', json={"scroll_id": [scroll_id]})

    flaskz_logger.debug(f'ES data query completed:\n-url={query_url}\n -count={count}')
    onprogress((True, True))  # True==操作完成


def bulk_save(es_url, es_index, bulk_data, bulk_max_size=600):
    """
    批量保存数据到指定的index


    .. Example::
        success_size, fail_size = es_util.bulk_save(es_url, es_index, data_list, ds_pipeline='add-timestamp')

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
    raw_response = kwargs.pop('raw_response', None)
    success, response = request(*args, **kwargs, raw_response=True)
    if success is False or raw_response is True:
        return success, response

    return get_request_result(response)


def get_request_result(response):
    """
    重写以自定义返回结果

    def get_es_req_result(response):
        try:
            response_json = response.json()
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


    es_util.get_request_result = get_es_req_result


    """
    response_json, error = None, None
    try:
        response_json = response.json()
        error = response_json.get('errors') or response_json.get('error')
    except Exception:
        pass

    status_code = response.status_code
    if 200 <= status_code < 300:
        if response_json:
            if error:
                return False, error
            return True, response_json
    return False, error


def get_result_hits(result, source=True):
    hits = result.get('hits', {}).get('hits', [])
    if source is False:
        return hits
    sources = []
    for hit in hits:
        sources.append(hit.get('_source', {}))
    return sources


def gen_payload(request_payload, date_range_key=None, like_fields=None, like_sep=None):
    """
    根据请求payload返回ES查询所需payload
    :param request_payload:
    :param date_range_key:
    :param like_fields:
    :param like_sep:
    :return:
    """
    page = request_payload.get('page', {})
    search = request_payload.get('search', {})
    sort = request_payload.get('sort', {})

    payload = {
        'size': 10000,
        # 'track_total_hits': True,
    }
    if sort:
        if type(sort) is list:
            payload['sort'] = sort
        else:
            payload['sort'] = [{sort.get('field'): sort.get('order')}]
    if page:
        payload['size'] = page.get('size')
        payload['from'] = page.get('skip', 0)

    if search:
        must = []
        must_not = []
        for key in search:
            value = search.get(key)
            if value is not None and key not in ['like', 'notlike', 'time_range']:
                must.append({
                    'term': {
                        key: value
                    }
                })
        time_range = search.get('time_range')
        if time_range and date_range_key:
            date_range = {}
            if 'start_time' in time_range:
                date_range['gte'] = time_range['start_time']
            if 'end_time' in time_range:
                date_range['lte'] = time_range['end_time']
            if date_range:
                date_range_format = time_range.get('format')
                if date_range_format:
                    date_range['format'] = date_range_format
                must.append({
                    "range": {
                        date_range_key: date_range
                    }
                })
        like = search.get('like')
        like_should_list = _get_like_should_palyload(like, like_fields, like_sep)
        if like_should_list:
            must.append({"bool": {"should": like_should_list}})

        notlike = search.get('notlike')
        nolike_should_list = _get_like_should_palyload(notlike, like_fields, like_sep)
        if nolike_should_list:
            must_not.append({"bool": {"should": nolike_should_list}})

        bool_body = {}
        if must:
            bool_body['must'] = must
        if must_not:
            bool_body['must_not'] = must_not
        if bool_body:
            payload['query'] = {'bool': bool_body}

    return payload


def _get_like_should_palyload(like, like_fields, like_sep):
    if not like or not like_fields:
        return []

    if like_sep and type(like_sep) is str:
        like_list = like.split(like_sep)
    else:
        like_list = [like]
    should = []
    for like_item in like_list:
        like_item = like_item.strip(' ')
        if like_item:
            for field in like_fields:
                should.append({
                    "match_phrase": {
                        field: like_item
                    }
                })
    return should


def query_all_indices(es_url):
    """
    查询索引列表
    """
    url = f"{es_url}/_cat/indices?format=json"
    success, result = _request_es(url, 'GET')
    if success:
        indices = []
        for item in result:
            if not item.get('index').startswith('.'):
                indices.append(item)
        return success, indices
    return success, result


def query_all_data_streams(es_url):
    """
    查询data stream列表
    """
    url = f"{es_url}/_data_stream/_all"
    success, result = _request_es(url, 'GET')
    if success:
        result = result.get('data_streams')
    return success, result


def delete_index(es_url, index):
    """
    删除索引
    """
    url = f"{es_url}/{index}"
    success, result = _request_es(url, 'DELETE')
    flaskz_logger.debug(f'ES delete index:\n -index={index}\n \n -success={success}')
    return success, success


def delete_data_stream(es_url, data_stream):
    """
    删除data stream
    """
    url = f"{es_url}/_data_stream/{data_stream}"
    success, result = _request_es(url, 'DELETE')
    flaskz_logger.debug(f'ES delete data_stream:\n -data_stream={data_stream}\n \n -success={success}')
    return success, success
