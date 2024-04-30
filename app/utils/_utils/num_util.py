def round_number(number, precision=3):
    """
    四舍五入
    - >=1或<=-1的数字，不做处理直接round
    - -1到1之间的小数，如果有足够的小数位，则直接round，否则返回第一个非零数字所在位数的round
    """
    # 转换为字符串以便检查每一位
    if 1 > number > -1:
        num_str = f"{number:.30f}"  # 保证有足够的小数位数进行处理

        # 找到小数点的位置
        point_index = num_str.find('.')

        # 从小数点后第一个非零数字开始计算精度
        non_zero_index = point_index + 1  # 初始化为小数点后第一位
        while non_zero_index < len(num_str) and num_str[non_zero_index] == '0':
            non_zero_index += 1

        # 计算需要保留的小数位数，确保至少保留三位或更多，直到第一个非零数字
        precision = max(precision, non_zero_index - point_index)

    # 对数字进行四舍五入
    rounded_number = round(number, precision)
    return rounded_number


def parse_float(value, default=0, split_sep=None):
    """
    返回float，一般用于带单位值的数字解析
    :param value:
    :param default:
    :param split_sep:
    :return:
    """
    success, result = _parse_float(value)
    if success is False and (type(split_sep) is str and type(value) is str):
        value = value.strip()
        split_values = value.split(split_sep)
        split_values_len = len(split_values)
        if split_values_len > 0:
            success, result = _parse_float(split_values[0])
            if success is False and split_values_len > 1:
                success, result = _parse_float(split_values[-1])
    if success is True:
        return result
    return default


def _parse_float(value):
    try:
        return True, float(value)
    except (ValueError, TypeError) as e:
        return False, e
