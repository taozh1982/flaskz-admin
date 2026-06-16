import re

from app.sys_mgmt.model import SysOption
from app.utils import config_util


def get_system_option(key, kv_sep=None):
    option = SysOption.query_option(key)
    kv_map = {}
    kv_sep = (kv_sep or '').strip()  # 一般指定=号
    if type(option) is str:
        option = option.strip()
        if kv_sep:
            for line in option.splitlines():
                # 使用正则提取类型和厂商
                line = line.strip()
                if (not line
                        or line.startswith('#')
                        or kv_sep not in line):
                    continue
                k, v = line.split('=', 1)
                kv_map[k.strip()] = re.sub(r"\s+", "", v)
    if kv_sep:  # 只要有kv分隔符，返回字典
        return kv_map
    return option


def get_system_server_option(key, port=None):
    server = config_util.parse_server_config(get_system_option(key))
    if server and 'port' not in server and type(port) is int:
        server['port'] = port
    return server
