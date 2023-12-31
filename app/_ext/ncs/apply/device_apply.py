"""Apply示例"""
from flaskz.log import flaskz_logger

from .. import NCSApply, ncs_request, ncs_urls


class AuthGroupNCSApply(NCSApply):
    @classmethod
    def to_ncs_data(cls, value, op_type):
        if op_type == 'delete':
            return value
        return {
            'tailf-ncs:group': [{
                'name': value.get('name'),
                'default-map': {
                    'remote-name': value.get('username'),
                    'remote-password': value.get('password'),
                    # 'remote-secondary-password': value.get('enable_password')
                }
            }]
        }

    @classmethod
    def get_url(cls, value):
        return ncs_urls.auth_group


class DeviceNCSApply(NCSApply):
    @classmethod
    def add(cls, value, preview=False):  # @2013-05-09 添加fetch功能
        add_result = super().add(value, preview)
        if add_result[0] is True:
            fetch_result = DeviceNCSApply.fetch(value.get('name'))  # fetch after add
            if fetch_result[0] is False:
                flaskz_logger.error(fetch_result[1])
        return add_result

    @classmethod
    def to_ncs_data(cls, value, op_type):
        if op_type == 'delete' or op_type is None:
            return value

        ned = value.get('ned', {})
        auth_name = value.get('auth').get('name')
        ned_type = ned.get('type')
        ned_oper_name = ned.get('oper_name')
        ned_id = ned_oper_name or ned.get('name')
        device_type = {
            ned_type: {
                'ned-id': ned_id,
            }
        }
        if ned_type != 'netconf':
            device_type[ned_type]['protocol'] = value.get('protocol')

        response = {
            'name': value.get('name'),
            'address': value.get('ip_address'),
            'port': value.get('port'),
            'authgroup': auth_name,
            'device-type': device_type,
            'state': {
                'admin-state': 'unlocked'
            }
        }

        if ned_oper_name:
            response['live-status-protocol'] = [{
                'name': '',
                'authgroup': auth_name,
                'device-type': device_type
            }
            ]
        return {
            'tailf-ncs:device': [response]
        }

    @classmethod
    def sync(cls, name, fetch=False):
        if fetch is True:
            result = DeviceNCSApply.fetch(name)
            if result[0] is False:
                return result
        return ncs_request(cls._get_url('sync'), url_params={'name': name})

    @classmethod
    def fetch(cls, name):
        return ncs_request(cls._get_url('fetch'), url_params={'name': name})

    @classmethod
    def get_url(cls, value):
        return ncs_urls.device
