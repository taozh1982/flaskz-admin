from flaskz import res_status_codes

from . import NCSApply


def query_device_name(device_id) -> str:
    """根据id查询设备对象"""
    pass


def is_ncs_applied(json_data):
    """返回ncs是否已经下发"""
    return json_data.get('$_ncs_applied') is True


def set_ncs_applied(json_data):
    """有些NCS操作会通过yang patch进行批量下发，设置标识位以标识已经下发"""
    json_data['$_ncs_applied'] = True


class ModelNCSMixin:
    """
    数据模型类NCS扩展，继承使用

    操作DB之前，先调用NCS
    -NCS操作成功，操作数据库
    -NCS操作失败，直接返回到客户端
    """

    # -------------------------------------------重载以添加ncs操作-------------------------------------------
    # 如果Model中要重载这个方法，需要调用super().before_*以应用ncs操作
    @classmethod
    def before_add(cls, json_data, preview=False):
        return cls.ncs_add(json_data, preview)

    @classmethod
    def before_update(cls, json_data, preview=False):
        """可以重载before_update/ncs_update方法，以决定是否下发"""
        return cls.ncs_update(json_data, preview)

    @classmethod
    def before_delete(cls, pk_value, preview=False):
        return cls.ncs_delete(pk_value, preview)

    # -------------------------------------------ncs apply-------------------------------------------
    @classmethod
    def ncs_add(cls, json_data, preview=False):
        """调用ncs apply进行新增业务下发"""
        if is_ncs_applied(json_data):
            return True
        ncs_apply = cls.get_ncs_apply()
        if ncs_apply:
            ncs_data = cls.get_ncs_data(json_data, 'add')
            if ncs_data is None:
                return 'ncs_request_params_err', '下发配置参数错误'  # 替换成status_codes中的常量
            result = ncs_apply.add(ncs_data, preview)
            if preview is True:
                return result
            if result[0] is False:
                return result[1]
        return True

    @classmethod
    def ncs_update(cls, json_data, preview=False):
        """调用ncs apply进行业务更新"""
        if is_ncs_applied(json_data):
            return True
        ncs_apply = cls.get_ncs_apply()
        if ncs_apply:
            ncs_data = cls.get_ncs_data(json_data, 'update')
            if ncs_data is None:
                return 'ncs_request_params_err', '下发配置参数错误'  # 替换成status_codes中的常量
            result = ncs_apply.update(ncs_data, preview)
            if preview is True:
                return result
            if result[0] is False:
                return result[1]
        return True

    @classmethod
    def ncs_delete(cls, pk_value, preview=False):
        """
        调用ncs apply进行业务删除
        一般NCS删除都是通过name进行操作
        :param preview:
        :param pk_value:
        :return:
        """
        ncs_apply = cls.get_ncs_apply()
        if ncs_apply:
            delete_data = cls.get_ncs_delete_data(pk_value)
            if delete_data is None:
                return res_status_codes.db_data_not_found
            result = ncs_apply.delete(delete_data, preview)
            if preview is True:
                return result
            if result[0] is False:
                return result[1]
        return True

    # -------------------------------------------rewrite-------------------------------------------
    @classmethod
    def get_ncs_apply(cls) -> NCSApply:
        """
        *必须重载*

        返回对应的ncs apply
        :return:
        """
        pass

    @classmethod
    def get_ncs_data(cls, json_data, action):
        """
        将json数据转化为ncs数据，要添加附加信息，ex)ned/authgroup
        :param json_data:
        :param action:
        :return:
        """
        device_name = json_data.get('device_name')
        if not device_name:
            device_id = json_data.get('device_id')
            if device_id:
                json_data['device_name'] = query_device_name(device_id)
        return json_data

    @classmethod
    def get_ncs_delete_data(cls, pk_value):
        """根据pk_value返回要删除的对象"""
        ins = cls.query_by_pk(pk_value)
        if ins is None:
            return None
        data = {
            'id': pk_value
        }
        if hasattr(ins, 'name'):
            data['name'] = ins.name
        if hasattr(ins, 'device_id'):
            data['device_name'] = query_device_name(ins.device_id)
        return data
