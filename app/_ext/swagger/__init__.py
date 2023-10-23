from flasgger import Swagger, swag_from
from .swagger_doc import api_docs


def init_swagger(app):
    for item in app.view_functions:
        try:
            if item != "main.static":
                app.view_functions[item].__doc__ = ''
        except Exception:
            pass

    template = {
        "swagger": "2.0",
        "info": {
            "title": "EXAMPLE API",
            "description": "EXAMPLE API for Swagger",
            "contact": {
                "responsibleOrganization": "Cisco",
            },
            "version": "1.0.0"
        },
        "schemes": [
            "https",
            "http"
        ],
        "securityDefinitions": {
            "Authorization": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header"
            }
        }
    }

    swagger_config = Swagger.DEFAULT_CONFIG
    swagger_config['title'] = 'EXAMPLE API Document'  # 配置大标题

    swagger = Swagger(app, template=template, config=swagger_config)

    for item in api_docs:
        if item in app.view_functions:
            app.view_functions[item].__doc__ = api_docs[item]
