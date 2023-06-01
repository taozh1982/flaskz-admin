# reference template
from datetime import datetime

from flaskz.models import ModelBase, ModelMixin
from sqlalchemy import Column, Integer, String, DateTime

from . import AutoModelMixin


class TemplateModel(ModelBase, ModelMixin, AutoModelMixin):
    __tablename__ = 'templates'  # 数据库表名
    # __table_args__ = (
    #     # this can be db.PrimaryKeyConstraint if you want it to be a primary key
    #     UniqueConstraint('new_name', name="new_name"),    # 如果将某一列的unique由False改为True，需要手动指定table_args
    #     'info': {'skip_autogenerate': True}   #设置alembic跳过对表的维护
    # )

    id = Column(Integer, primary_key=True, autoincrement=True)  # primary key，必须要有主键
    name = Column(String(32), unique=True, nullable=False)  # 唯一 & 不能为空
    age = Column(Integer)
    email = Column(String(255), nullable=False)
    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now, info={'auto': True})
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)  # update时自动更新updated_at列
    # system_default = Column('default', Boolean, default=False, info={'field': 'system_default'})  #模型列和数据库列不一致，属性名=system_default，数据库列名="default"，注意设置info:field
    like_columns = ['name', description]  # field/Column -模糊查询列
    auto_columns = ['id', updated_at]  # field/Column -自动维护列(不受参数影响)，也可以通过info={'auto': True}指定
    # user_id = Column(Integer, ForeignKey('sys_users.id',name='user_id')) # 外键
