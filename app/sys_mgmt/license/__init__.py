import functools
import os
from datetime import datetime, timedelta

from flask import request
from flaskz.log import flaskz_logger
from flaskz.models import ModelBase, ModelMixin
from flaskz.utils import get_app_path
from sqlalchemy import Column, Integer, Text, String, DateTime

from app.sys_init import status_codes
from . import util
from ...main.errors import return_error


class SysLicense(ModelBase, ModelMixin):
    """License database model"""
    __tablename__ = 'sys_licenses'

    id = Column(Integer, primary_key=True, autoincrement=True)
    license = Column(Text(), nullable=False)
    license_hash = Column(String(255), nullable=False, unique=True)  # Text column cannot be unique in MySQL，MySQL error: key specification without a key length

    user = Column(String(255))
    type = Column(String(32))
    start_date = Column(String(255))
    end_date = Column(String(255))

    created_user = Column(String(32))
    description = Column(Text())
    created_at = Column(DateTime(), default=datetime.now)

    def to_dict(*args, **kwargs):
        result = super(SysLicense, args[0]).to_dict(**kwargs)
        licenses = result.get("license").split("Signature=")
        if len(licenses) > 1:
            result['license'] = licenses[0]
            result['Signature'] = licenses[1]
        return result


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
        if public_key is None:
            public_key_file = get_app_path(app.config.get('APP_LICENSE_PUBLIC_KEY_FILEPATH'))
            if os.path.isfile(public_key_file):
                with open(public_key_file, "r") as f:  # public key
                    public_key = f.read()
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
                        start_date = util.get_datetime(item.get("StartDate"))
                        end_date = util.get_datetime(item.get("EndDate"))
                        end_date += timedelta(days=1)
                        util.add_date_seg(date_segs, start_date, end_date)
                        if start_date <= today <= end_date:
                            in_list.append(item)
                    except Exception as e:
                        flaskz_logger.exception(e)

                if len(in_list) > 0:
                    in_list.sort(key=functools.cmp_to_key(util.license_cmp))
                    license_item = in_list[-1]
                    start_date = util.get_datetime(license_item.get("StartDate"))
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


def load_license():
    """license加载函数"""
    license_result = SysLicense.query_all()
    license_list = []
    if license_result[0] is True:
        for item in license_result[1]:
            license_list.append(item.license)
    return license_list


def request_check_by_license(current_license, req):
    """
    请求license校验
    """
    path = req.path
    # 页面静态资源不拦截
    if path == '/' or path.startswith('/libs') or path.endswith(('.js', '.css', '.html', '.png', '.svg', '.jpg', '.ico')):
        return
    if 'api' in path:
        # 根据具体项目进行定制
        if current_license is None:
            return return_error(status_codes.license_not_found, 555)
        # modules = license.get('Modules', "")
        # if 'template' in path:
        #     if "template" not in modules:
        #         return return_error(('no_license', 'No License, Please contact Cisco'), 555)


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
