"""
https://github.com/flasgger/flasgger
"""
from .ex_simples import api_docs as ex_simples_api_docs
from .sys_mgmt import api_docs as sys_mgmt_api_docs

api_docs = {}
api_docs.update(ex_simples_api_docs)
api_docs.update(sys_mgmt_api_docs)