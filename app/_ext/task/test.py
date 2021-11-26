from app._ext.task import  sync

sync.delay()


# @api_bp.route('/test/task', methods=['GET', 'POST'])
# def test_task():
#     from app.task.tasks import sync
#     from srte import celery_app
#     task = sync.apply_async(countdown=10)
#      #通过数据库id或标志位进行取消操作
#     # aa.revoke()
#     # celery_app.control.revoke(task.task_id)
#
#     return "abc"
