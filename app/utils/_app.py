from flask import current_app

__all__ = ['get_app_license', 'get_current_user_id', 'is_admin_user']

from flask_login import current_user


def get_app_license():
    """
    Return the current license
    -Return False, if the license feature is not enabled
    -Return None, if there is no eligible license(enabled but not eligible)
    """

    if current_app and hasattr(current_app, 'license_manager'):
        return current_app.license_manager.get_license()
    return False  # license not enabled


def get_current_user_id():
    """
    Get the id of the current user
    Return None，If the user is anonymous or not logged in
    """
    if current_user:
        try:
            return current_user.get_id()
        except Exception:
            pass
    return None


def is_admin_user():
    """
    Check if the current user is admin, Admin user can view all data
    :return:
    """
    if current_user and getattr(current_user, 'username', None) == 'admin':
        return True
    return False
