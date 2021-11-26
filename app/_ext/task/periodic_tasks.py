from app._ext.task import sync
from srte import celery_app


@celery_app.on_after_configure.connect
def test(sender, **kwargs):
    sender.add_periodic_task(10, sync.s(), name="sync")
