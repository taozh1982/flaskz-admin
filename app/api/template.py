# reference template
from flaskz.rest import register_model_route

from ..api import api_bp
from ..modules.template import TemplateModel

register_model_route(api_bp, TemplateModel, 'templates', 'templates')
