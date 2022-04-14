from flaskz import models

from app import sys_mgmt


def init_shell(app):
    @app.shell_context_processor
    def make_shell_context():
        return dict(app=app, sysmgmt=sys_mgmt, models=models)