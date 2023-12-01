"""
http://127.0.0.1:666/apidocs/

SWAGGER_SPECS_ROUTE = 'apidocs'  								# API路由地址
SWAGGER_TITLE = 'Flaskz Admin API'							# 页面标题(head)
SWAGGER_TEMPLATE = {
    'info': {
        'title': 'Flaskz Admin API',  # API标题(body)
        'description': 'API for Flaskz Admin',  # 描述
        'version': '1.0'  # 版本
    },
    'securityDefinitions': {
        'Authorization': {
            'type': 'apiKey',  # 授权类型 type/apiKey
        }
    }
}

"""


from flasgger import Swagger
from flaskz.utils import get_app_config, merge_dict

from .modules import api_docs

SWAGGER_TEMPLATE = {
    # 'swagger': '2.0',
    'info': {
        'title': 'Swagger API',
        # 'description': 'API for Flaskz Admin',
        # 'contact': {
        #     'email': 'taozh@cisco.com;taozh1982@gmail.com',
        #     'url': 'https://github.com/taozh1982/flaskz-admin',
        # },
        # 'version': '1.0'
    },
    'schemes': ['http', 'https'],
    'securityDefinitions': {
        'Authorization': {
            # 'type': 'apiKey',
            'type': 'basic',
            'name': 'Authorization',
            'in': 'header'
        }
    }
}


def init_swagger(app):
    _update_func_doc(app)
    template = merge_dict(SWAGGER_TEMPLATE, get_app_config('SWAGGER_TEMPLATE', {}))

    Swagger(app,
            config={
                'title': get_app_config('SWAGGER_TITLE', 'Swagger API'),
                'uiversion': 3,
                'hide_top_bar': True,
                'specs_route': '/' + get_app_config('SWAGGER_SPECS_ROUTE', 'apidocs').strip().strip('/') + '/',
                # 'head_text':'<script src="a.js"></script>'
            },
            template=template, merge=True)


def _update_func_doc(app):
    for item in app.view_functions:
        try:
            if item != 'main.static':
                app.view_functions[item].__doc__ = ''
        except Exception:
            pass
    for item in api_docs:
        if item in app.view_functions:
            app.view_functions[item].__doc__ = api_docs[item]
