import logging
from datetime import datetime

import redisz
from flaskz.utils import get_app_config


class RedisHandler(logging.Handler):
    def __init__(self):
        logging.Handler.__init__(self)
        self._redis_ins = None

    def emit(self, record):
        try:
            if not self._redis_ins:
                self._init_redis()
            current_date = datetime.now()
            log_list_name = self._log_list_name + '.' + current_date.strftime('%Y-%m-%d')
            log_entry = self.format(record)
            self._redis_ins.list_push(log_list_name, log_entry)
        except Exception:
            self.handleError(record)

    def _init_redis(self):
        self._redis_ins = redisz.Redisz(get_app_config('FLASKZ_LOGGER_REDIS_URL') or get_app_config('REDIS_URL'))
        self._log_list_name = get_app_config('FLASKZ_LOGGER_REDIS_LIST') or 'syslog'
        self.setFormatter(logging.Formatter(get_app_config('FLASKZ_LOGGER_FORMAT')))
