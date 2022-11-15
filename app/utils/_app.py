from flask import current_app

__all__ = ['get_app_license']


def get_app_license():
    """
    返回当前license
    -如果没有启用license功能，返回False
    -如果没有符合条件的license，返回None
    """
    if hasattr(current_app, 'license_manager'):
        return current_app.license_manager.get_license()
    return False  # license not enabled
