import unittest
from datetime import datetime

from flaskz.utils import get_pss

from app import create_app
from app.modules.example import SimpleModel


class ModelCase(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app('test')
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self) -> None:
        self.app_context.pop()

    def test_add(self):
        result, instance = SimpleModel.add({
            'field_string': 'test_' + str(datetime.now()),
            'field_integer': 20,
            'field_text': 'test@test.com'
        })
        self.assertTrue(result)
        self.assertIsInstance(instance, SimpleModel)

        SimpleModel.delete(instance.id)

    def test_delete(self):
        result, instance = SimpleModel.add({
            'field_string': 'test_' + str(datetime.now()),
            'field_integer': 20,
            'field_text': 'test@test.com'
        })
        SimpleModel.delete(instance.id)
        instance = SimpleModel.query_by_pk(instance.id)
        self.assertIsNone(instance)

    def test_update(self):
        result, instance = SimpleModel.add({
            'field_string': 'test_' + str(datetime.now()),
            'field_integer': 20,
            'field_text': 'test@test.com'
        })
        json = instance.to_dict()
        json['field_integer'] = 30
        SimpleModel.update(json)
        instance = SimpleModel.query_by_pk(instance.id)
        self.assertEqual(instance.age, 30)
        SimpleModel.delete(instance.id)

    def test_query_all(self):
        count = len(SimpleModel.query_all()[1])
        ids = []
        prefix = 'test_' + str(datetime.now()) + "_"
        for i in range(2):
            result, instance = SimpleModel.add({
                'field_string': prefix + str(i),
                'field_integer': 20,
                'field_text': 'test@test.com'
            })
            ids.append(instance.id)
        self.assertEqual(len(SimpleModel.query_all()[1]), count + 2)
        for id_ in ids:
            SimpleModel.delete(id_)

    def test_query_pss(self):
        ids = []
        prefix = 'test_' + str(datetime.now()) + "_"
        count = 22
        for i in range(count):
            result, instance = SimpleModel.add({
                'field_string': prefix + str(i),
                'field_integer': 20,
                'field_text': 'test@test.com'
            })
            ids.append(instance.id)
        result, pss = SimpleModel.query_pss(get_pss(SimpleModel, {
            "search": {
                "like": prefix,
            },
            "sort": {
                "field": "field_string",
                "order": "asc"
            },
            "page": {
                "offset": 0,
                "size": 20
            }
        }))
        self.assertEqual(pss.get('count'), count)
        self.assertEqual(len(pss.get('data')), 20)

        for id_ in ids:
            SimpleModel.delete(id_)


if __name__ == '__main__':
    unittest.main()
