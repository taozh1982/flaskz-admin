# gunicorn config file
import multiprocessing
import os

# _GUNICORN_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '_gunicorn'))
_LOG_PATH = os.path.join(os.path.join(os.path.dirname(__file__), 'logs'))
# _ETC = os.path.join(_ROOT, 'etc')
if not os.path.exists(_LOG_PATH):
    os.makedirs(_LOG_PATH)
# ------------------------------------log------------------------------------
# loglevel = ''     # The granularity of Error log outputs.
# :debug/info/warning/error/critical
# loglevel = 'info'

# accesslog = '-'   # The Access log file to write to.
# :--access-logfile FILE    # os.path.join(_VAR, 'log/wsgi-access.log')
# :None
# :'-'   # log to stdout
accesslog = os.path.join(_LOG_PATH, 'gunicorn-access.log')

# errorlog = '-'   # The Error log file to write to.
# :--error-logfile FILE, --log-file FILE    # os.path.join(_VAR, 'log/wsgi-error.log')
# :'-'   # log to stderr.
errorlog = os.path.join(_LOG_PATH, 'gunicorn-error.log')

# pidfile = '' # The filename to use for the PID file. If not set, no PID file will be written.
pidfile = os.path.join(_LOG_PATH, 'gunicorn-pid.log')

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
# if supervisor control, set daemon = False
# daemon = True

# keepalive = 2  # 2s
# The number of seconds(1-5) to wait for requests on a Keep-Alive connection.
# :--keep-alive INT
# :2 (Generally)

# The maximum number of simultaneous clients
# Default: 1000, affects the `gthread`, `eventlet` and `gevent` worker types.
# worker_connections = 1000

# backlog = 2048    # The maximum number of pending connections.
# :--backlog INT
# :2048

# ------------------------------------app------------------------------------
# A WSGI application path in pattern
wsgi_app = 'admin_app:app'
