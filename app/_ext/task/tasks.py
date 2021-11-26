from flaskz.utils import api_request

from flasky import celery_app


@celery_app.task
def add(a, b):
    return a + b


@celery_app.task
def sync():
    flask_config = celery_app.conf.flask_config

    celery_sync_telemetry_url = flask_config.get('CELERY_SYNC_TELEMETRY_URL')
    telemetry_result = None
    if celery_sync_telemetry_url:
        telemetry_result = api_request(celery_sync_telemetry_url, log=False)

    celery_sync_bmp_url = flask_config.get('CELERY_SYNC_BMP_URL')
    bmp_result = None
    if celery_sync_bmp_url:
        bmp_result = api_request(celery_sync_bmp_url, log=False)

    celery_sync_xtc_url = flask_config.get('CELERY_SYNC_XTC_URL')
    xtc_result = None
    if celery_sync_xtc_url:
        xtc_result = api_request(celery_sync_xtc_url, log=False)

    return {
        'telemetry': telemetry_result,
        'bmp': bmp_result,
        'xtc': xtc_result,
    }
