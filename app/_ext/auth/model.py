from datetime import datetime

from flaskz.models import ModelBase, BaseModelMixin
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean


# class SysOption(ModelBase, BaseModelMixin):
#     """系统选项"""
#     __tablename__ = 'sys_options'
#
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     option = Column(String(100), unique=True, nullable=False)  # 配置选项, ex)auth_mode
#     value = Column(Text())  # 配置选项值, ex)tacacs+/local
#
#     description = Column(String(255))
#     created_at = Column(DateTime(), default=datetime.now)
#     updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)


class SysAuthMode(ModelBase, BaseModelMixin):
    """系统授权列表"""
    __tablename__ = 'sys_auth_modes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    mode = Column(String(100), nullable=False)  # tacacs+/radius/ldap/local
    # [{host: "10.75.44.73", port: 49, secret: "cisco123", authen_type: "pap"}]
    # [{host: "10.75.44.73", secret: "cisco123", auth_method: "pap", auth_port: 1812, accounting_port: 1813}]
    config = Column(Text())
    default = Column(Boolean, default=False)

    description = Column(String(255))
    created_at = Column(DateTime(), default=datetime.now)
    updated_at = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
