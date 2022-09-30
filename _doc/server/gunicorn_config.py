# gunicorn config file
import multiprocessing
import os

_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '_gunicorn'))  # 创建_gunicorn文件夹用于存放日志等文件
_VAR = os.path.join(_ROOT, 'var')
# _ETC = os.path.join(_ROOT, 'etc')

# ------------------------------------log------------------------------------
# loglevel = ''     # The granularity of Error log outputs.
# :debug/info/warning/error/critical
loglevel = 'info'

# accesslog = '-'   # The Access log file to write to.
# :--access-logfile FILE    # os.path.join(_VAR, 'log/wsgi-access.log')
# :None
# :'-'   # log to stdout
accesslog = os.path.join(_VAR, 'gunicorn_log', 'wsgi-access.log')

# errorlog = '-'   # The Error log file to write to.
# :--error-logfile FILE, --log-file FILE    # os.path.join(_VAR, 'log/wsgi-error.log')
# :'-'   # log to stderr.
errorlog = os.path.join(_VAR, 'gunicorn_log', 'wsgi-error.log')

# pidfile = '' # The filename to use for the PID file. If not set, no PID file will be written.
# pidfile = os.path.join(_VAR, 'gunicorn_log', 'wsgi-pid.log')

# capture_output = False     # Redirect stdout/stderr to specified file in errorlog.
# :--capture-output
# :False

# ------------------------------------service------------------------------------
# The socket to bind test:app application on. default='127.0.0.1:8000'
bind = '0.0.0.0:666'

# The number of worker processes for handling requests.
# default=1
# 1+ 2*$(CPU_NUM_CORES) (Generally)
workers = multiprocessing.cpu_count() * 2 + 1

# The type of workers to use.
# -sync
# -eventlet - Requires eventlet >= 0.24.1 (or install it via pip install gunicorn[eventlet])
# -gevent - Requires gevent >= 1.4 (or install it via pip install gunicorn[gevent])
# -tornado - Requires tornado >= 0.2 (or install it via pip install gunicorn[tornado])
# -gthread - Python 2 requires the futures package to be installed (or install it via pip install gunicorn[gthread])
# worker_class = 'gevent'

# Workers silent for more than this many seconds are killed and restarted.
# :-t INT, --timeout INT
# :30(Generally)
# timeout = 30  # 30s

# Daemonize the process.
# :-D, --daemon(command)
# :False(default)
daemon = True

# keepalive = 2  # 2s
# The number of seconds(1-5) to wait for requests on a Keep-Alive connection.
# :--keep-alive INT
# :2 (Generally)

# backlog = 2048    # The maximum number of pending connections.
# :--backlog INT
# :2048

# ------------------------------------app------------------------------------
# A WSGI application path in pattern
wsgi_app = 'admin_app:app'
# ------------------------------------command------------------------------------
# 1> Modify the 'gunicorn_config.py' file (_ROOT/log/bind)
# 2> copy the 'gunicorn_config.py' file to the root directory of the application(where admin_app.py is located)
# 3> gunicorn -c gunicorn_config.py admin_app:app
# 4> ps -ef | grep gunicorn
