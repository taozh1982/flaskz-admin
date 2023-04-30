"""
命令行工具
"""

import click
from flask.cli import AppGroup


# > export FLASK_APP=admin_app.py   # mac/linux
# > set FLASK_APP=admin_app.py      # windows

# > flask admin db help
# > flask admin db upgrade      # update database tables
# > flask admin db init         # init database data
# > flask admin db radmin       # add admin user and role

def init_cli(app):
    init_test_cli(app)
    init_admin_cli(app)


def init_test_cli(app):
    @app.cli.command()
    def test():
        import unittest
        tests = unittest.TestLoader().discover('tests', pattern="*test*")
        print(tests)
        unittest.TextTestRunner(verbosity=2).run(tests)


def init_admin_cli(app):
    admin_cli = AppGroup('admin')
    app.cli.add_command(admin_cli)

    @admin_cli.command('db')
    @click.argument('db_operate_type')
    def db_cli(db_operate_type):
        _db_operate(db_operate_type)


# flask admin db ?
def _db_operate(db_operate_type):
    if db_operate_type == 'help' or db_operate_type == 'hp':
        return _db_operate_help()

    if db_operate_type not in ['upgrade', 'init', 'radmin']:
        click.echo('Error: no such option: ' + db_operate_type)
        return
    count = 0
    while True:
        pwd = input('Please enter admin password: ')
        # now = datetime.now()
        # if str(now.day + now.hour + now.minute) == pwd:
        #     break
        if 'taozh' == pwd:
            break
        count += 1
        if count > 2:
            return

    click.echo(('db:' + db_operate_type).center(60, '-'))
    if db_operate_type == 'upgrade':
        return _db_upgrade()
    if db_operate_type == 'init':
        return _db_init()
    if db_operate_type == 'radmin':
        return _db_recover_admin()


def _db_operate_help():
    click.echo('upgrade'.ljust(12, ' ') + '--Upgrade database tables')
    click.echo('init'.ljust(12, ' ') + '--Initialize database data')
    click.echo('radmin'.ljust(12, ' ') + '--Recover database admin data')


def _db_upgrade():
    from alembic.command import upgrade
    from alembic.config import Config
    alembic_cfg = Config('./alembic.ini')
    upgrade(alembic_cfg, 'head')


def _db_init():
    from app.sys_mgmt import init_db_data
    init_db_data()


def _db_recover_admin():
    user_name = input('Please enter admin user name: ')
    role_name = input('Please enter admin role name: ')
    if user_name and role_name:
        from app.sys_mgmt import recover_admin
        recover_admin(user_name, role_name)
