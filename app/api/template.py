# reference template
from flaskz.rest import register_model_route, rest_login_required, rest_permission_required
from flaskz.utils import create_response

from ..api import api_bp
from ..modules.template import TemplateModel

# 生成Model的增删改查API
register_model_route(api_bp, TemplateModel, 'templates', 'templates')


# -------------------------------------------Permission Example-------------------------------------------
@api_bp.route('/templates/open', methods=['GET'])
def templates_open():
    """无访问控制"""
    return create_response(True, '无访问控制')


@api_bp.route('/templates/login-required', methods=['GET'])
@rest_login_required()
def templates_login_required():
    """需登录访问"""
    return create_response(True, '登录访问')


@api_bp.route('/templates/module-required', methods=['GET'])
@rest_permission_required('templates')
def templates_module_required():
    """需模块访问权限"""
    return create_response(True, '模块权限')


@api_bp.route('/templates/module-action-required', methods=['GET'])
@rest_permission_required('templates', 'update')
def templates_module_action_required():
    """需模块+操作权限"""
    return create_response(True, '模块+操作权限')
