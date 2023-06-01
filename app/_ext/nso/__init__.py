# for nso
import json
import re
import uuid

from flaskz.log import flaskz_logger, get_log_data
from flaskz.rest import get_rest_log_msg
from flaskz.utils import api_request, get_app_cache, set_app_cache, str_replace
from requests.auth import HTTPBasicAuth

from . import nso_urls
from . import util as nso_util
from .apply.device_apply import DeviceNSOApply

NSOReqHeaders = {
    'headers': {
        'Content-Type': 'application/yang-data+json',
        'Accept': 'application/yang-data+json'
    }
}
NSOPatchReqHeaders = {
    'headers': {
        'Content-Type': 'application/yang-patch+json',
        'Accept': 'application/yang-data+json'
    }
}

NSOReqConfig = {}

# NSO返回结果字段列表
nso_result_output_list = []


def init_app(app):
    """初始化NSO Apply"""
    config = app.config
    enable = config.get('NSO_ENABLE')
    NSOReqConfig['enable'] = enable
    if enable is True:
        NSOReqConfig['base_url'] = config.get('NSO_URI')
        NSOReqConfig['auth'] = HTTPBasicAuth(config.get('NSO_USERNAME'), config.get('NSO_PASSWORD'))


def nso_request(url, **kwargs):
    if NSOReqConfig.get('enable') is not True:
        return True, 'success'
    kws = {}
    kws.update(NSOReqHeaders)
    kws.update(NSOReqConfig)
    kws.update(kwargs)

    # url_params = kws.get('url_params', None) # for flaskz=1.5/1.5.2
    # if type(url_params) is dict:
    #     if type(url) is dict:
    #         url['url'] = url.get('url', '').format(**url_params)
    #     else:
    #         url = url.format(**url_params)
    # kws.pop('url_params', None)

    res = api_request(url, raw_response=True, verify=False, **kws)
    if type(res) == tuple:
        flaskz_logger.error(res.text)
        return False, res[0]

    status_code = res.status_code
    if status_code // 100 == 2:
        try:
            if res.text != '':
                res_result = json.loads(res.text)
                for item in nso_result_output_list:
                    if item in res_result:
                        item_result = res_result.get(item)
                        if item_result.get('result') == 'fail':
                            flaskz_logger.error(res.text)
                            return False, "nso_request_err",  # status_codes.nso_request_err
        except Exception:
            pass
        return True, res.text
    else:
        flaskz_logger.error(res.text)
        error_msg = ''
        if res.text != '':
            pattern = re.compile(r'"error-message":\s"((?:.|\s)+?)"')  # 提取异常信息
            matches = pattern.findall(res.text)
            for i, match in enumerate(matches):
                error_msg += str_replace(match, {'NED': 'Config', 'NSO': 'Config'}) + '\r\n\r\n'
        if error_msg:
            return False, error_msg  # 如果是status_codes.nso_request_err元组，需处理-->(status_codes.nso_request_err[0], error_msg)
        else:
            return False, 'nso_request_err'  # status_codes.nso_request_err


def sync_device(device_name):
    """
    todo
    """
    return DeviceNSOApply.sync(device_name)
    # return True,


class NSOApply:
    """NSO交互操作，继承使用"""

    @classmethod
    def add(cls, value, preview=False):
        return cls.nso_apply(value, "add", preview)

    @classmethod
    def update(cls, value, preview=False):
        return cls.nso_apply(value, "update", preview)

    @classmethod
    def delete(cls, value, preview=False):
        return cls.nso_apply(value, "delete", preview)

    # -------------------------------------------apply-------------------------------------------
    @classmethod
    def nso_apply(cls, value, op_type, preview=False):
        """调用NSO"""
        _value = json.loads(json.dumps(value))  # 避免对value的修改
        cls._sync_device(_value, op_type, preview)
        if op_type != 'delete' and cls.get_patch_target(_value, op_type):
            return cls._nso_patch_apply(_value, op_type, preview)
        _json = cls.to_nso_data(_value, op_type)
        result = nso_request(cls._get_url(op_type, _value, preview), json=_json, url_params=cls.get_url_params(_value, op_type))
        flaskz_logger.info(get_rest_log_msg('NSO {} {} data'.format(op_type, cls.__name__), json.dumps(_json), result[0], get_log_data(result[1])))
        return result

    @classmethod
    def _get_url(cls, op_type, value=None, preview=False):
        url_dict = {}
        url_dict.update(cls.get_url(value).get(op_type))
        url = url_dict.get('url')
        if preview is True:
            url_dict['url'] = nso_util.add_dryrun_query(url)
        return url_dict

    # -------------------------------------------yang patch-------------------------------------------
    @classmethod
    def _nso_patch_apply(cls, value, op_type, preview=False):
        json_ = nso_util.gen_yang_patch_data(cls.to_nso_patch_data(value, op_type))  # cls._to_nso_patch_data(_value, op_type)
        result = nso_request(cls._get_patch_url(op_type, value, preview), json=json_, url_params=cls.get_url_params(value, op_type), **NSOPatchReqHeaders)
        flaskz_logger.info(get_rest_log_msg('NSO Patch {} {} data'.format(op_type, cls.__name__), json.dumps(json_), result[0], get_log_data(result[1])))
        return result

    @classmethod
    def to_nso_patch_data(cls, value, op_type):
        """
        返回yang patch的data

        :return:
        {
            "edit-id": "edit-1646500738072821_0",
            "operation": "create",
            "target": "/srte:sr-lists/sr-policy",
            "value": value
        }
        """
        return {
            'edit-id': cls.__name__ + '-' + str(uuid.uuid4()),
            'operation': nso_util.get_path_operation(op_type),
            'target': cls.get_patch_target(value, op_type),
            'value': cls.get_patch_value(value, op_type)
        }

    @classmethod
    def get_patch_value(cls, value, op_type):
        """"""
        key = cls.get_patch_value_key(value, op_type)
        nso_data = cls.to_nso_data(value, op_type)
        return {
            key: list(nso_data.values())[0]
        }

    @classmethod
    def _get_patch_url(cls, value, op_type, preview):
        """获取yang patch操作的url"""
        patch_url = {}
        patch_url.update(nso_urls.yang_path)
        url = patch_url.get('url')
        if preview is True:
            url = nso_util.add_dryrun_query(url)
        patch_url['url'] = url
        return patch_url

    # -------------------------------------------sync device-------------------------------------------
    @classmethod
    def _sync_device(cls, value, op_type, preview=False):
        """同步设备，为了提高效率，同一台设备10分钟内只同步一次"""
        if preview is not True:
            sync_devices = cls.get_nso_sync_devices(value, op_type) or []
            for device_name in sync_devices:
                cache_key = device_name + '_sync_cached'
                if get_app_cache(cache_key) is None:
                    sync_result = sync_device(device_name)
                    if sync_result[0] is False:
                        flaskz_logger.info(get_rest_log_msg('NSO sync device', device_name, False, get_log_data(sync_result[1])))
                        return sync_result
                    else:
                        set_app_cache(cache_key, True, 10)

    @classmethod
    def get_nso_sync_devices(cls, value, op_type):
        """
        返回需要sync的设备列表
        默认只返回单台设备
        如果业务有多台设备，需要重载以返回相关的设备列表
        """
        device_name = value.get('device_name')
        if device_name:
            return [device_name]
        return []

    # -------------------------------------------rewrite-------------------------------------------
    @classmethod
    def get_url(cls, value) -> dict:
        """
        *如果是普通下发，必须重载*

        返回url，value不同可能返回的url不同
        """
        pass

    @classmethod
    def get_url_params(cls, value, op_type):
        """
        *如果是普通下发，根据需要进行重载*
        返回URL的query params对象，根据url情况进行重载
        """
        url_params = {}

        for item in ['name', 'device_name']:
            if item in value:
                url_params[item] = value.get(item)

        url_params.update(value.get('url_params', {}))
        return url_params

    @classmethod
    def to_nso_data(cls, value, op_type) -> dict:
        """
        *必须重载，普通下发和yang patch下发都会用到*

        value已经通过NSOModelMixin.get_nso_data进行了封装，将前端的json_data添加了nso需要的属性
        NSO参数组装，在NSOModel.to_nso_data中实现
        NSO参数获取，在NSOModelMixin.get_nso_data/get_nso_delete_data实现

        :param value:
        :param op_type:
        :return:
        """
        pass

    @classmethod
    def get_patch_value_key(cls, value, op_type) -> str:
        """
        *如果是yang patch下发，必须重载*
        返回 yang path value的key ex)srte:sr-policy
        """
        pass

    @classmethod
    def get_patch_target(cls, value, op_type) -> str:
        """
        *如果是yang patch下发，必须重载*
        返回 yang path的target，如果使用patch进行批量下发，需要重载以返回target
         ex)/srte:sr-policies/sr-policy"""
        pass
