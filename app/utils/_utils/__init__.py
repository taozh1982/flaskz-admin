"""
工具集合,按需取用
为了方便维护和替换, 尽量不要修改_utils文件夹中的py
"""
import json
from datetime import datetime, date, time
from decimal import Decimal


def json_dumps(value):
    return json.dumps(value, default=_json_serializer)


def _json_serializer(obj):
    if isinstance(obj, (datetime, date, time, Decimal, bytes, bytearray)):
        return str(obj)
    elif hasattr(obj, '__dict__'):
        return obj.__dict__
    else:
        raise TypeError(f"Object of type '{obj.__class__.__name__}' is not JSON serializable")


from . import es_util
from . import network_util
from . import num_util
