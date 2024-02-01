import json
from concurrent import futures
from datetime import datetime

from flaskz.utils import api_request

# logging.basicConfig(level=logging.DEBUG)

token_api_kwargs = {
    'url': {
        'url': 'http://127.0.0.1:666/sys-mgmt/auth/token/',
        'method': 'POST'
    },
    'json': {
        'username': 'admin',
        'password': 'admin',
    }
}
test_api_kwargs = {
    'url': 'http://127.0.0.1:666/sys-mgmt/auth/account/',
    'method': 'GET',
    'timeout': 300,
    'http_kwargs': {
        'pool_connections': 100,
        'pool_maxsize': 2000
    },
    'json': {}
}


def _api_req(**req_kwargs):
    headers = {
        'Authorization': req_kwargs.pop('token', None)
    }
    headers.update(req_kwargs.get('headers', {}))
    req_kwargs['headers'] = headers
    res = api_request(**req_kwargs)
    # print(type(res))


def test(max_workers=100):
    if token_api_kwargs:
        token = json.loads(api_request(**token_api_kwargs)).get('data').get('token')
        test_api_kwargs['token'] = token
    start = datetime.now()
    with futures.ThreadPoolExecutor(max_workers=min(2000, max_workers)) as executor:
        for i in range(max_workers):
            executor.submit(_api_req, **dict(test_api_kwargs))
    print('Time:', (datetime.now() - start).total_seconds())


if __name__ == '__main__':
    test(2000)
