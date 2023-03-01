# reference template
from datetime import datetime

from flaskz.models import ModelBase, ModelMixin
from sqlalchemy import Column, Integer, String, DateTime

from . import AutoModelMixin


class TemplateModel(ModelBase, ModelMixin, AutoModelMixin):
    __tablename__ = 'templates'  # database table name
    # __table_args__ = (
    #     # this can be db.PrimaryKeyConstraint if you want it to be a primary key
    #     UniqueConstraint('new_name', name="new_name"), # for new unique column
    # )

    id = Column(Integer, primary_key=True, autoincrement=True)  # primary key
    name = Column(String(32), unique=True, nullable=False)
    age = Column(Integer)
    email = Column(String(255), nullable=False)
    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now, info={'auto': True})
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
    # system_default = Column('default', Boolean, default=False, info={'field': 'system_default'})
    like_columns = ['name', description]
    auto_columns = ['id', updated_at]
    # user_id = Column(Integer, ForeignKey('sys_users.id',name='user_id'))
