import functools
from datetime import datetime, timedelta

from flask import request
from flaskz.log import flaskz_logger

# from app.sys_mgmt.license import util # for __main__ test
from . import util


def _get_date(date):
    return datetime.strptime(date, "%Y/%m/%d")


def _license_cmp(i1, i2):
    """
    1.先通过StartData进行排序，找到最新的StartData
    2.如果StartData相等，再通过EndDate进行排序，找到最长的EndDate
    """
    start_date1 = _get_date(i1.get('StartDate'))
    start_date2 = _get_date(i2.get('StartDate'))
    if start_date1 < start_date2:
        return -1
    if start_date1 > start_date2:
        return 1

    end_date1 = datetime.strptime(i1.get('EndDate'), "%Y/%m/%d")
    end_date2 = datetime.strptime(i2.get('EndDate'), "%Y/%m/%d")
    if end_date1 < end_date2:
        return -1
    if end_date1 > end_date2:
        return 1

    return 0


def _add_date_seg(date_segs, start_date, end_date):
    for seg in date_segs:
        seg_start = seg.get('start')
        seg_end = seg.get('end')
        if (seg_start <= start_date <= seg_end) or (seg_start <= end_date <= seg_end):
            start = min(seg_start, start_date)
            end = max(seg_end, end_date)
            seg['start'] = start
            seg['end'] = end
            return

    date_segs.append({
        'start': start_date,
        'end': end_date
    })


class LicenseManager:

    def __init__(self):
        self._request_check = None
        self._load_license = None
        self._public_key = None
        self._parse_license = util.parse_license
        self._current_license = None
        self._last_load_time = None
        self._load_interval = 600  # seconds

    def set_public_key(self, public_key):
        """设置public key"""
        self._public_key = public_key

    def init_app(self, app, public_key=None):
        self._public_key = public_key
        app.license_manager = self

        @app.before_request
        def before_request():
            if self._request_check:
                return self._request_check(self.get_license(), request)

    def load_license(self, load_license):
        """加载license"""
        self._load_license = load_license
        return self._load_license

    def parse_license(self, parse_license):
        """解析license"""
        self._parse_license = parse_license
        return self._parse_license

    def _load(self):
        """
        加载并解析license
        如果有多个符合时间限制的license，优先选择StartDate最新的license
        要计算当前license的extend license
        """
        license_item = None
        if self._load_license and self._parse_license and self._public_key:
            license_txt = self._load_license()
            if type(license_txt) is list:
                license_txt_list = license_txt
            else:
                license_txt_list = [license_txt]

            license_list = []
            for item in license_txt_list:
                if type(item) is str:
                    value = self._parse_license(self._public_key, item)
                    if type(value) is dict:
                        license_list.append(value)

            date_segs = []  # 用于存储license的时间段，用于ExpireDays
            if len(license_list) > 0:
                in_list = []
                today = datetime.today()
                for item in license_list:
                    try:
                        start_date = _get_date(item.get("StartDate"))
                        end_date = _get_date(item.get("EndDate"))
                        end_date += timedelta(days=1)
                        _add_date_seg(date_segs, start_date, end_date)
                        if start_date <= today <= end_date:
                            in_list.append(item)
                    except Exception as e:
                        flaskz_logger.exception(e)

                if len(in_list) > 0:
                    in_list.sort(key=functools.cmp_to_key(_license_cmp))
                    license_item = in_list[-1]
                    start_date = _get_date(license_item.get("StartDate"))
                    for seg in date_segs:
                        if seg.get('start') <= start_date <= seg.get('end'):
                            license_item['ExtDate'] = seg.get('end').strftime('%Y/%m/%d')
                            license_item['ExpireDays'] = (seg.get('end') - datetime.today()).days

        return license_item

    def get_license(self, field=None, reload=False):
        """
        获取license
        为了提高效率，默认10分钟重新加载一次license
        """
        now = datetime.now().timestamp()
        if reload is True or \
                self._current_license is None or \
                self._last_load_time is None or now - self._last_load_time > self._load_interval:
            self._current_license = self._load()
            self._last_load_time = now

        if self._current_license:
            if field is not None:
                return self._current_license.get(field)

        return self._current_license

    def request_check(self, _request_check):
        self._request_check = _request_check
        return self._request_check


if __name__ == '__main__':
    with open("public.key", "r") as f:
        public_key = f.read()


    def load_license():
        with open("license.dat", "r") as f:
            return f.read()


    license_manager = LicenseManager()
    license_manager.set_public_key(public_key)
    license_manager.load_license(load_license)
    print(license_manager.get_license())
