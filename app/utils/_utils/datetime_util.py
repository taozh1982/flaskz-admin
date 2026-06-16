from datetime import datetime

from . import num_util


def strptime(strftime, fmt='%Y-%m-%d %H:%M:%S'):
    """
    将指定格式的时间字符串解析为 datetime 对象。

    参数:
    strftime (str): 时间字符串，按照指定格式进行解析。
    fmt (str): 时间字符串的格式，默认为 '%Y-%m-%d %H:%M:%S'。

    返回:
    datetime: 解析后的 datetime 对象。

    示例:
    >>> strptime('2023-08-13 12:30:45')
    datetime.datetime(2023, 8, 13, 12, 30, 45)
    """
    return datetime.strptime(strftime, fmt)


def strptime_timestamp(timestamp):
    """
    将timestamp解析为 datetime 对象。

    示例:
    >>> strptime('2023-08-13 12:30:45')
    datetime.datetime(2023, 8, 13, 12, 30, 45)
    """
    timestamp = num_util.parse_int(timestamp, None)
    if timestamp is not None:
        timestamp = timestamp / 1000  # 毫秒-->秒
        return datetime.fromtimestamp(timestamp)

    return None


def strftime_now_date(fmt='%Y-%m-%d'):
    """
    获取当前日期并按照指定格式返回。

    参数:
    fmt (str): 输出日期的格式，默认为 '%Y-%m-%d'。

    返回:
    str: 当前日期的字符串，格式化后的日期。

    示例:
    >>> strftime_now_date()
    '2023-08-13'
    """
    return datetime.now().strftime(fmt)


def strftime_date(dt, fmt='%Y-%m-%d'):
    """
    将指定的 datetime 对象格式化为日期字符串。

    参数:
    dt (datetime): 要格式化的 datetime 对象。
    fmt (str): 输出日期的格式，默认为 '%Y-%m-%d'。

    返回:
    str: 格式化后的日期字符串。

    示例:
    >>> strftime_date(datetime(2023, 8, 13, 12, 30, 45))
    '2023-08-13'
    """
    return dt.strftime(fmt)


def strftime_timestamp(timestamp, fmt='%Y-%m-%d %H:%M:%S'):
    """
    将 Unix 时间戳（毫秒）转换为指定格式的日期时间字符串。

    参数:
    timestamp (int): 时间戳（单位为毫秒）。
    fmt (str): 输出日期时间的格式，默认为 '%Y-%m-%d %H:%M:%S'。

    返回:
    str: 格式化后的日期时间字符串，如果无法解析时间戳则返回 None。

    示例:
    >>> strftime_timestamp(1678873200000)
    '2023-03-15 12:00:00'
    """
    timestamp = num_util.parse_int(timestamp, None)
    if timestamp is not None:
        timestamp = timestamp / 1000  # 毫秒-->秒
        dt = datetime.fromtimestamp(timestamp)
        return dt.strftime(fmt)
    return None


def strftime_now_datetime(fmt='%Y-%m-%d %H:%M:%S'):
    """
    获取当前日期和时间，并按照指定格式返回。

    参数:
    fmt (str): 输出日期时间的格式，默认为 '%Y-%m-%d %H:%M:%S'。

    返回:
    str: 当前日期和时间的字符串，格式化后的日期时间。

    示例:
    >>> strftime_now_datetime()
    '2023-08-13 12:30:45'
    """
    return datetime.now().strftime(fmt)


def strftime_datetime(dt, fmt='%Y-%m-%d %H:%M:%S'):
    """
    将指定的 datetime 对象格式化为日期时间字符串。

    参数:
    dt (datetime): 要格式化的 datetime 对象。
    fmt (str): 输出日期时间的格式，默认为 '%Y-%m-%d %H:%M:%S'。

    返回:
    str: 格式化后的日期时间字符串。

    示例:
    >>> strftime_datetime(datetime(2023, 8, 13, 12, 30, 45))
    '2023-08-13 12:30:45'
    """
    return dt.strftime(fmt)


def strftime_now_datetime_ts(fmt='%Y-%m-%d %H:%M:%S.%f'):
    """
    获取当前日期和时间（带微秒）并按照指定格式返回。

    参数:
    fmt (str): 输出日期时间的格式，默认为 '%Y-%m-%d %H:%M:%S.%f'。

    返回:
    str: 当前日期时间（带微秒）的字符串，格式化后的日期时间。

    示例:
    >>> strftime_now_datetime_ts()
    '2023-08-13 12:30:45.123'
    """
    return datetime.now().strftime(fmt)[:-3]


def strftime_datetime_ts(dt, fmt='%Y-%m-%d %H:%M:%S.%f'):
    """
    将指定的 datetime 对象格式化为日期时间字符串（带微秒）。

    参数:
    dt (datetime): 要格式化的 datetime 对象。
    fmt (str): 输出日期时间的格式，默认为 '%Y-%m-%d %H:%M:%S.%f'。

    返回:
    str: 格式化后的日期时间字符串（带微秒）。

    示例:
    >>> strftime_datetime_ts(datetime(2023, 8, 13, 12, 30, 45, 123456))
    '2023-08-13 12:30:45.123'
    """
    return dt.strftime(fmt)[:-3]


if __name__ == "__main__":
    print(strptime('2023-08-13 12:30:45'))  # 2024-07-05
    print(strftime_now_date())  # 2024-07-05
    print(strftime_now_datetime())  # 2024-07-05 10:18:27
    print(strftime_now_datetime_ts())  # 2024-07-05 10:18:27.389
