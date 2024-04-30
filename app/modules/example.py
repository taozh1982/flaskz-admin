from datetime import datetime

from flaskz.models import ModelBase, ModelMixin
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, CheckConstraint, Float, Text
from sqlalchemy.orm import relationship

from . import AutoModelMixin


# 数据模型扩展类: http://zhangyiheng.com/blog/articles/py_flaskz_model_mixin.html
# 命名规范: http://zhangyiheng.com/blog/articles/dev_spec.html#toc-name
class SimpleModel(ModelBase, ModelMixin):
    __tablename__ = 'ex_simples'  # db table name

    id = Column(Integer, primary_key=True, autoincrement=True)  # int(11)
    field_string = Column(String(32), unique=True, nullable=False)  # varchar(32)
    field_integer = Column(Integer, default=0)  # int(11)
    field_float = Column(Float)  # float
    field_boolean = Column(Boolean)  # tinyint(1)
    field_text = Column(Text)  # text
    field_datetime = Column(DateTime())  # datetime

    @classmethod
    def get_add_data(cls, data):
        return super().get_add_data(cls.update_datetime(data))

    @classmethod
    def get_update_data(cls, data):
        return super().get_update_data(cls.update_datetime(data))

    @classmethod
    def update_datetime(cls, data):  # SQLite DateTime type only accepts Python datetime and date objects as input
        field_datetime = data.get('field_datetime')
        if field_datetime and type(field_datetime) is str:
            data['field_datetime'] = datetime.strptime(field_datetime, "%Y-%m-%dT%H:%M")
        return data


class DepartmentModel(ModelBase, ModelMixin, AutoModelMixin):
    __tablename__ = 'ex_departments'  # 数据库表名,

    id = Column(Integer, primary_key=True, autoincrement=True)  # 每个table必须要有主键
    name = Column(String(32), nullable=False)  # 不能为空
    parent_id = Column(Integer, ForeignKey('ex_departments.id', ondelete='SET NULL'))  # 上级部门

    system_default = Column('default', Boolean, default=False, info={'field': 'system_default'})  # 模型列和数据库列不一致, 属性名=system_default, 数据库列名="default", 注意设置info:field

    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now)  # 自动生成
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)  # 自动生成&自动更新
    like_columns = ['name', description]  # field/Column -模糊查询列


class EmployeeModel(ModelBase, ModelMixin):
    __tablename__ = 'ex_employees'
    __table_args__ = (  # table参数
        #     UniqueConstraint('new_name', name="new_name"),    # 如果将某一列的unique由False修改改为True, 需要手动指定(创建不需要)
        #     'info': {'skip_autogenerate': True}   # 设置alembic跳过对表的维护, 参考migrations/evt.py
        CheckConstraint('age > 0', name='age_positive'),  # 条件约束(DB)
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(32), nullable=False)
    age = Column(Integer)
    email = Column(String(255), unique=True, nullable=False)  # 唯一 & 不能为空
    department_id = Column(Integer, ForeignKey('ex_departments.id'), nullable=False)

    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now, info={'auto': True})  # 通过info.auto设置为系统自动维护列
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)  # update时自动更新updated_at列

    department = relationship('DepartmentModel', backref='employees', lazy='subquery')  # 关系
    like_columns = ['name', description]  # field/Column -模糊查询列
    auto_columns = ['id', updated_at]  # field/Column -自动维护列(不受参数影响), 也可以通过info={'auto': True}指定
