"""
Flask >= 2.3版本，需要修改main/__init__.py: @main_bp.after_request --> @app.after_request
"""
import inspect
import unittest
from datetime import datetime

from flaskz import res_status_codes
from flaskz.models import parse_pss
from sqlalchemy.exc import IntegrityError, InvalidRequestError

from app import create_app
from app.modules.example import SimpleModel
from tests.unit import print_test


class ModelMixinCRUDCase(unittest.TestCase):
    """数据CRUD操作测试"""

    def setUp(self) -> None:
        self.app = create_app('unittest')
        self.app_context = self.app.app_context()  # 测试flask.g session缓存
        self.app_context.push()

    def tearDown(self) -> None:
        SimpleModel.clear_db()
        self.app_context.pop()
        pass

    # ----------------------------------add----------------------------------
    def test_add(self):
        """
        添加数据测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        # 1. add成功 --> True, instance
        field_string = 'test_' + str(datetime.now())
        result, instance = SimpleModel.add({
            'field_string': field_string,
            'field_integer': 20,
            'field_text': 'test@test.com'
        })
        self.assertIs(result, True)
        self.assertIsInstance(instance, SimpleModel)
        # 2. add失败 --> False, res_status_codes.db_data_already_exist
        result, instance = SimpleModel.add({
            'field_string': field_string,
            'field_integer': 20,
            'field_text': 'test@test.com'
        })
        self.assertIs(result, False)
        self.assertTupleEqual(instance, res_status_codes.db_data_already_exist)

    def test_check_add(self):
        """
        添加数据检查测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()
        # 1. 检查成功 --> True
        check_ok = SimpleModel.check_add_data({'field_string': 'abc'})
        self.assertIs(check_ok, True)
        # 2. 已存在检查 --> res_status_codes.db_data_already_exist
        check_already_exist = SimpleModel.check_add_data({'field_string': instance.field_string})
        self.assertTupleEqual(check_already_exist, res_status_codes.db_data_already_exist)
        # 3. None数据检查 --> res_status_codes.bad_request
        check_bad_request = SimpleModel.check_add_data(None)
        self.assertTupleEqual(check_bad_request, res_status_codes.bad_request)
        # 4.非dict数据检查 --> 直接放回
        check_raw = SimpleModel.check_add_data('abc')
        self.assertEqual(check_raw, 'abc')

    def test_bulk_add(self):
        """
        批量添加数据测试
        原子操作，不会有部分成功/部分失败的情况
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        # 1. 添加成功
        items = []
        for i in range(100):
            items.append({
                'field_string': 'test_' + str(i) + "_" + str(datetime.now()),
                'field_integer': 20,
                'field_text': 'test@test.com'
            })
        SimpleModel.bulk_add(items)
        self.assertEqual(SimpleModel.count(), 100)
        # 2. 添加失败 --> IntegrityError
        with self.assertRaises(IntegrityError):
            SimpleModel.bulk_add(items)

    # ----------------------------------delete----------------------------------
    def test_delete(self):
        """
        删除数据测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()

        # 1. 删除成功 --> True, instance
        result, del_instance = SimpleModel.delete(instance.id)
        self.assertIs(result, True)
        self.assertEqual(instance.id, del_instance.id)
        # 2. 删除失败 --> True, res_status_codes.db_data_not_found
        result, del_instance = SimpleModel.delete(instance.id)
        self.assertIs(result, False)
        self.assertTupleEqual(del_instance, res_status_codes.db_data_not_found)
        # 3. 删除成功检查
        instance = SimpleModel.query_by_pk(instance.id)
        self.assertIsNone(instance)

    def test_bulk_delete(self):
        """
        批量删除数据测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        self._bulk_add_test_ins(10)
        # 1. 删除成功 --> count
        items = SimpleModel.query_all()[1]
        ids = []
        for item in items:
            ids.append(item.id)
        count = SimpleModel.bulk_delete(ids)
        self.assertEqual(count, 10)
        # 2. 删除失败 --> 0
        count = SimpleModel.bulk_delete(ids)
        self.assertEqual(count, 0)

    def test_check_delete(self):
        """
        删除数据检查测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()
        # 1. 检查成功 --> True
        check_ok = SimpleModel.check_delete_data(instance.id)
        self.assertIs(check_ok, True)
        # 2. 数据不存在检查(id=None) --> res_status_codes.db_data_not_found
        check_not_found = SimpleModel.check_delete_data(None)
        self.assertTupleEqual(check_not_found, res_status_codes.db_data_not_found)
        # 3. 数据不存在检查 --> res_status_codes.db_data_not_found
        check_not_found = SimpleModel.check_delete_data(instance.id + 100)
        self.assertTupleEqual(check_not_found, res_status_codes.db_data_not_found)

    # ----------------------------------update----------------------------------
    def test_update(self):
        """
        更新数据测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()
        # 1. 更新成功 --> True,instance
        ins_dict = instance.to_dict()
        ins_dict['field_integer'] = 30
        update_result, update_ins = SimpleModel.update(ins_dict)
        self.assertIs(update_result, True)
        self.assertEqual(update_ins.id, instance.id)
        # 2. 查询校验
        instance = SimpleModel.query_by_pk(instance.id)
        self.assertEqual(instance.field_integer, 30)
        # 3. 更新失败 --> False, res_status_codes.db_data_not_found
        ins_dict.pop('id', None)
        update_result, update_ins = SimpleModel.update(ins_dict)
        self.assertIs(update_result, False)
        self.assertTupleEqual(update_ins, res_status_codes.db_data_not_found)

    def test_check_update(self):
        """
        更新数据检查测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()
        result, instance1 = self._add_test_ins()
        # 1. 数据检查成功 --> True
        check_ok = SimpleModel.check_update_data({'id': instance.id, 'field_string': 'abc'})
        self.assertIs(check_ok, True)
        # 2. 数据检查失败 --> res_status_codes.db_data_not_found
        check_not_found = SimpleModel.check_update_data({'field_string': 'abc'})
        self.assertTupleEqual(check_not_found, res_status_codes.db_data_not_found)
        # 3. 数据检查失败 --> res_status_codes.db_data_not_found
        check_not_found = SimpleModel.check_update_data({'id': instance.id + 100, 'field_string': 'abc'})
        self.assertTupleEqual(check_not_found, res_status_codes.db_data_not_found)
        # 4. 数据检查失败 --> res_status_codes.db_data_already_exist
        check_already_exist = SimpleModel.check_update_data({'id': instance.id, 'field_string': instance1.field_string})
        self.assertTupleEqual(check_already_exist, res_status_codes.db_data_already_exist)
        # 5. 数据检查失败 --> res_status_codes.bad_request
        check_bad_request = SimpleModel.check_update_data(None)
        self.assertTupleEqual(check_bad_request, res_status_codes.bad_request)
        # 6.非dict数据检查 --> 直接放回
        check_raw = SimpleModel.check_update_data('abc')
        self.assertEqual(check_raw, 'abc')

    def test_bulk_update(self):
        """
        批量更新数据测试
        原子操作不会有部分成功，部分失败的情况
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        self._bulk_add_test_ins(10)
        # 1. 更新成功
        items = SimpleModel.query_all()[1]
        update_items = []
        for item in items:
            update_items.append({
                'id': item.id,
                'field_integer': 30
            })
        SimpleModel.bulk_update(update_items)
        # 2. 查询校验
        query_ins_list = SimpleModel.query_by({'field_integer': 30})
        self.assertEqual(len(query_ins_list), 10)
        # 3. 更新失败
        update_items[-1].pop('id', None)
        update_items[-2]['field_integer'] = 60
        with self.assertRaises(InvalidRequestError):
            SimpleModel.bulk_update(update_items)

    # ----------------------------------query----------------------------------
    def test_query_all(self):
        """
        全量查询测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        self._bulk_add_test_ins(100)
        self.assertEqual(len(SimpleModel.query_all()[1]), 100)

    def test_query_by(self):
        """
        条件查询测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins({'field_integer': 30})
        # 1. 返回一个数据
        query_ins = SimpleModel.query_by({'field_integer': 30}, True)
        self.assertEqual(query_ins.id, instance.id)
        # 2. 返回None
        query_ins = SimpleModel.query_by({'field_integer': 60}, True)
        self.assertIsNone(query_ins)

        self._add_test_ins({'field_integer': 30})
        # 3. 返回符合条件的数据列表
        query_ins_list = SimpleModel.query_by({'field_integer': 30})
        self.assertEqual(len(query_ins_list), 2)
        # 4. 返回[]
        query_ins_list = SimpleModel.query_by({'field_integer': 60})
        self.assertListEqual(query_ins_list, [])

    def test_query_by_pk(self):
        """
        pk查询测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()
        # 1. 查询成功
        query_ins = SimpleModel.query_by_pk(instance.id)
        self.assertEqual(query_ins.field_string, instance.field_string)
        # 2. 查询失败
        query_ins = SimpleModel.query_by_pk(instance.id + 100)
        self.assertIsNone(query_ins)

    def test_query_by_unique_key(self):
        """
        unique查询测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        result, instance = self._add_test_ins()
        ins = SimpleModel.query_by_unique_key({'field_string': instance.field_string})
        # 1. 查询成功
        self.assertEqual(ins.field_string, instance.field_string)
        # 2. 查询失败
        ins = SimpleModel.query_by_unique_key({'field_string': 'abc'})
        self.assertIsNone(ins)

    def test_query_pss(self):
        """
        分页+排序+查询测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        self._bulk_add_test_ins(100)
        # 1. 分页+排序+查询
        result, pss_result = SimpleModel.query_pss(parse_pss(SimpleModel, {
            "search": {
                "like": 'test_',
                'field_integer': 20
            },
            "sort": {
                "field": "field_string",
                "order": "asc"
            },
            "page": {
                "offset": 0,
                "size": 10
            }
        }))
        self.assertIs(result, True)
        self.assertIsInstance(pss_result, dict)
        # 2. 查询结果总数
        self.assertEqual(pss_result.get('count'), 100)
        # 3. 当前查询结果数据个数
        self.assertEqual(len(pss_result.get('data')), 10)

    def test_count(self):
        """
        count查询测试
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        self._bulk_add_test_ins(10)
        self._bulk_add_test_ins(10, 30)
        # 1. 全量count
        count = SimpleModel.count()
        self.assertEqual(count, 20)
        # 2. 条件count
        count = SimpleModel.count(parse_pss(SimpleModel, {
            "search": {
                "like": 'test_',
                'field_integer': 30
            }
        }))
        self.assertEqual(count, 10)

    # ----------------------------------for test----------------------------------
    def _add_test_ins(self, attrs=None):
        """
        添加测试对象
        """
        data = {
            'field_string': 'test_' + str(datetime.now()),
            'field_integer': 20,
            'field_text': 'test@test.com'
        }
        if attrs:
            data.update(attrs)
        return SimpleModel.add(data)

    def _bulk_add_test_ins(self, count=100, field_integer=20, field_text='test@test.com'):
        """批量添加测试对象"""
        items = []
        for i in range(count):
            items.append({
                'field_string': 'test_' + str(i) + "_" + str(datetime.now()),
                'field_integer': field_integer,
                'field_text': field_text
            })

        SimpleModel.bulk_add(items)
        return items


if __name__ == '__main__':
    unittest.main()
