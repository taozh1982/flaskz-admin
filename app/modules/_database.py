"""
根据数据库类型设置模型属性
"""
from flaskz.utils import get_app_config
from sqlalchemy import cast, func, BigInteger


def update_model_by_db():
    if (get_app_config('FLASKZ_DATABASE_URI') or '').strip().lower().startswith('mysql+pymysql://'):
        _update_mysql_data_model()


def _update_mysql_data_model():
    pass


def _add_mysql_ip_col_cast(columns):
    for column in columns:
        column.info.update({'cast_type': lambda col: cast(func.INET_ATON(col), BigInteger)})
