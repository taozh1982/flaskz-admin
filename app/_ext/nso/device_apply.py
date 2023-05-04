"""Apply示例"""
from .apply import NSOApply, nso_urls, nso_request


class AuthGroupNSOApply(NSOApply):
    @classmethod
    def to_nso_data(cls, value, op_type):
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
        return nso_urls.auth_group


class DeviceNSOApply(NSOApply):
    @classmethod
    def to_nso_data(cls, value, op_type):
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
            result = nso_request(cls._get_url('fetch'), url_params={'name': name})
            if result[0] is False:
                return result
        return nso_request(cls._get_url('sync'), url_params={'name': name})

    @classmethod
    def get_url(cls, value):
        return nso_urls.device