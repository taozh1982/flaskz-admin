# reference template
from flaskz.rest import init_model_rest_blueprint

from ..api import api_bp
from ..modules.template import TemplateModel

init_model_rest_blueprint(TemplateModel, api_bp, '/template', 'template')
