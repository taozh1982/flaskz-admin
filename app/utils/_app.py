from flask import current_app

__all__ = ['get_app_license']


def get_app_license():
    if hasattr(current_app, 'license_manager'):
        return current_app.license_manager.get_license()
