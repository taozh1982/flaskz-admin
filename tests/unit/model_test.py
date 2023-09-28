"""
Flask >= 2.3版本，需要修改main/__init__.py: @main_bp.after_request --> @app.after_request
"""
import unittest

from app.modules.example import SimpleModel, DepartmentModel


class ModelMixinCase(unittest.TestCase):

    # ----------------------------------model----------------------------------
    def test_cls_method(self):
        """
        模型类方法测试
        """
        print('test_model_method'.center(100, '-'))
        self.assertEqual(SimpleModel.get_class_name(), 'SimpleModel')
        self.assertEqual(len(SimpleModel.get_columns()), 7)
        self.assertListEqual(SimpleModel.get_columns_fields(), ['id', 'field_string', 'field_integer', 'field_float', 'field_boolean', 'field_text', 'field_datetime'])
        self.assertEqual(SimpleModel.get_column_field(SimpleModel.field_string), 'field_string')
        self.assertEqual(DepartmentModel.get_column_field(DepartmentModel.system_default), 'system_default')  # * not default
        self.assertEqual(SimpleModel.get_column_by_field('field_string'), SimpleModel.field_string)
        self.assertEqual(SimpleModel.get_primary_column(), SimpleModel.id)
        self.assertEqual(SimpleModel.get_primary_key(), 'id')
        self.assertEqual(SimpleModel.get_primary_field(), 'id')
        self.assertListEqual(SimpleModel.get_unique_columns(), [SimpleModel.field_string])


if __name__ == '__main__':
    unittest.main()
