from flask import current_app

__all__ = ['get_app_license', 'get_current_user_id', 'is_admin_user']

from flask_login import current_user


def get_app_license():
    """
    返回当前license
    -如果没有启用license功能，返回False
    -如果没有符合条件的license，返回None
    """
    if hasattr(current_app, 'license_manager'):
        return current_app.license_manager.get_license()
    return False  # license not enabled


def get_current_user_id():
    """
    返回当前请求的用户id
    """
    if current_user:
        return current_user.id


def is_admin_user():
    """
    Check if the current user is admin, Admin user can view all data
    :return:
    """
    user = current_user
    if user and user.username == 'admin':
        return True
    return False
