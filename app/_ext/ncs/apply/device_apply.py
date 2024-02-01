"""Apply示例"""
from flaskz.log import flaskz_logger

from .. import NCSApply, ncs_request, ncs_urls


class DeviceAuthNCSApply(NCSApply):
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
        return ncs_urls.device_auth


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

        driver = value.get('driver', {})
        auth_name = value.get('auth').get('name')
        driver_type = driver.get('type')
        driver_oper_name = driver.get('oper_name')
        driver_id = driver_oper_name or driver.get('name')
        device_type = {
            driver_type: {
                'ned-id': driver_id,
            }
        }
        if driver_type != 'netconf':
            device_type[driver_type]['protocol'] = value.get('protocol')

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

        if driver_oper_name:
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
