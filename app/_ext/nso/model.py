from flaskz import res_status_codes

from .apply import NSOApply


def query_device_name(device_id) -> str:
    """根据id查询设备对象"""
    pass


def is_nso_applied(json_data):
    """返回nso是否已经下发"""
    return json_data.get('$_nso_applied') is True


def set_nso_applied(json_data):
    """有些NSO操作会通过yang patch进行批量下发，设置标识位以标识已经下发"""
    json_data['$_nso_applied'] = True


class ModelNSOMixin:
    """
    数据模型类NSO扩展，继承使用

    操作DB之前，先调用NSO
    -NSO操作成功，操作数据库
    -NSO操作失败，直接返回到客户端
    """

    # -------------------------------------------重载以添加nso操作-------------------------------------------
    # 如果Model中要重载这个方法，需要调用super().before_*以应用nso操作
    @classmethod
    def before_add(cls, json_data, preview=False):
        return cls.nso_add(json_data, preview)

    @classmethod
    def before_update(cls, json_data, preview=False):
        return cls.nso_update(json_data, preview)

    @classmethod
    def before_delete(cls, pk_value, preview=False):
        return cls.nso_delete(pk_value, preview)

    # -------------------------------------------nso apply-------------------------------------------
    @classmethod
    def nso_add(cls, json_data, preview=False):
        """调用nso apply进行新增业务下发"""
        if is_nso_applied(json_data):
            return True
        nso_apply = cls.get_nso_apply()
        if nso_apply:
            nso_data = cls.get_nso_data(json_data, 'add')
            if nso_data is None:
                return 'nso_request_params_err', '下发配置参数错误'  # 替换成status_codes中的常量
            result = nso_apply.add(nso_data, preview)
            if preview is True:
                return result
            if result[0] is False:
                return result[1]
        return True

    @classmethod
    def nso_update(cls, json_data, preview=False):
        """调用nso apply进行业务更新"""
        if is_nso_applied(json_data):
            return True
        nso_apply = cls.get_nso_apply()
        if nso_apply:
            nso_data = cls.get_nso_data(json_data, 'update')
            if nso_data is None:
                return 'nso_request_params_err', '下发配置参数错误'  # 替换成status_codes中的常量
            result = nso_apply.update(nso_data, preview)
            if preview is True:
                return result
            if result[0] is False:
                return result[1]
        return True

    @classmethod
    def nso_delete(cls, pk_value, preview=False):
        """
        调用nso apply进行业务删除
        一般NSO删除都是通过name进行操作
        :param preview:
        :param pk_value:
        :return:
        """
        nso_apply = cls.get_nso_apply()
        if nso_apply:
            delete_data = cls.get_nso_delete_data(pk_value)
            if delete_data is None:
                return res_status_codes.db_data_not_found
            result = nso_apply.delete(delete_data, preview)
            if preview is True:
                return result
            if result[0] is False:
                return result[1]
        return True

    # -------------------------------------------rewrite-------------------------------------------
    @classmethod
    def get_nso_apply(cls) -> NSOApply:
        """
        *必须重载*

        返回对应的nso apply
        :return:
        """
        pass

    @classmethod
    def get_nso_data(cls, json_data, op_type):
        """
        将json数据转化为nso数据，要添加附加信息，ex)ned/authgroup
        :param json_data:
        :param op_type:
        :return:
        """
        device_name = json_data.get('device_name')
        if not device_name:
            device_id = json_data.get('device_id')
            if device_id:
                json_data['device_name'] = query_device_name(device_id)
        return json_data

    @classmethod
    def get_nso_delete_data(cls, pk_value):
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
