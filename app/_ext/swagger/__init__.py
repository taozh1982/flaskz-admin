"""
http://127.0.0.1:666/apidocs/
"""
from flasgger import Swagger

from .modules import api_docs

SWAGGER_TEMPLATE = {
    "swagger": "2.0",
    "info": {
        "title": "Flaskz Admin API",
        "description": "API for Flaskz Admin",
        "contact": {
            "email": "taozh@cisco.com;taozh1982@gmail.com",
            "url": "https://github.com/taozh1982/flaskz-admin",
        },
        "version": "1.6"
    },
    "schemes": ["http", "https"],
    "securityDefinitions": {
        "Authorization": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}


def init_swagger(app):
    _update_func_doc(app)

    Swagger(app,
            config={
                'title': 'Flaskz Admin API',
                'uiversion': 3,
                'hide_top_bar': True,
                'specs_route': "/apidocs/",
                # 'head_text':'<script src="a.js"></script>'
            },
            template=SWAGGER_TEMPLATE, merge=True)


def _update_func_doc(app):
    for item in app.view_functions:
        try:
            if item != "main.static":
                app.view_functions[item].__doc__ = ''
        except Exception:
            pass
    for item in api_docs:
        if item in app.view_functions:
            app.view_functions[item].__doc__ = api_docs[item]
