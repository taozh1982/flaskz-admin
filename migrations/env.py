import os
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config
from sqlalchemy import pool

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.


config = context.config
# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

sys.path.append(os.getcwd())

# migrations/venv.py
from app.modules import ModelBase  # 从app.modules导入ModelBase，而不是从flaskz.models导入

target_metadata = ModelBase.metadata

# for 'autogenerate' support
# from app.modules import template    # 导入模型类

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


IGNORE_TABLES = list(filter(None, config.get_main_option('ignore_tables', '').split(',')))  # 不需要alembic维护的table列表，一般用于多数据库操作


# https://alembic.sqlalchemy.org/en/latest/api/runtime.html#alembic.runtime.environment.EnvironmentContext.configure.params.include_object
def include_object(object, name, type_, reflected, compare_to):
    """
    Should you include this table or not?
    """
    # 通过info:{'skip_autogenerate': False}跳过对table/column的维护
    if type_ == 'table' and (name in IGNORE_TABLES or object.info.get("skip_autogenerate", False)):
        return False

    elif type_ == "column" and object.info.get("skip_autogenerate", False):
        return False

    return True


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        render_as_batch=True,
        compare_type=True  # 开启列类型变化检测
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata,
            include_object=include_object,
            render_as_batch=True,
            compare_type=True  # 开启列类型变化检测
        )

        with context.begin_transaction():
            context.run_migrations()


# 导入模型类所在目录中的模型类
import importlib


def import_models(directory, module):
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isdir(item_path):
            import_models(item_path, module + '.' + item)
        elif os.path.isfile(item_path):
            if not item.startswith('_') and item.endswith('.py'):
                importlib.import_module(module + '.' + item[0:-3])


MODEL_CLS_DIRS = list(filter(None, config.get_main_option('model_cls_dirs', '').split(',')))  # 模型类所在目录列表

for cls_dir in MODEL_CLS_DIRS:
    if cls_dir:
        import_models(os.path.join(os.getcwd(), cls_dir), '.'.join(cls_dir.split('/')))

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
