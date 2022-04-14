import unittest
from datetime import datetime

from flaskz.utils import get_pss

from app import create_app
from app.modules.template import TemplateModel


class ModelCase(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app('test')
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self) -> None:
        self.app_context.pop()

    def test_add(self):
        result, instance = TemplateModel.add({
            'name': 'test_' + str(datetime.now()),
            'age': 20,
            'email': 'test@test.com'
        })
        self.assertTrue(result)
        self.assertIsInstance(instance, TemplateModel)

        TemplateModel.delete(instance.id)

    def test_delete(self):
        result, instance = TemplateModel.add({
            'name': 'test_' + str(datetime.now()),
            'age': 20,
            'email': 'test@test.com'
        })
        TemplateModel.delete(instance.id)
        instance = TemplateModel.query_by_pk(instance.id)
        self.assertIsNone(instance)

    def test_update(self):
        result, instance = TemplateModel.add({
            'name': 'test_' + str(datetime.now()),
            'age': 20,
            'email': 'test@test.com'
        })
        json = instance.to_dict()
        json['age'] = 30
        TemplateModel.update(json)
        instance = TemplateModel.query_by_pk(instance.id)
        self.assertEqual(instance.age, 30)
        TemplateModel.delete(instance.id)

    def test_query_all(self):
        count = len(TemplateModel.query_all()[1])
        ids = []
        prefix = 'test_' + str(datetime.now()) + "_"
        for i in range(2):
            result, instance = TemplateModel.add({
                'name': prefix + str(i),
                'age': 20,
                'email': 'test@test.com'
            })
            ids.append(instance.id)
        self.assertEqual(len(TemplateModel.query_all()[1]), count + 2)
        for id_ in ids:
            TemplateModel.delete(id_)

    def test_query_pss(self):
        ids = []
        prefix = 'test_' + str(datetime.now()) + "_"
        count = 22
        for i in range(count):
            result, instance = TemplateModel.add({
                'name': prefix + str(i),
                'age': 20,
                'email': 'test@test.com'
            })
            ids.append(instance.id)
        result, pss = TemplateModel.query_pss(get_pss(TemplateModel, {
            "search": {
                "like": prefix,
            },
            "sort": {
                "field": "name",
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
            TemplateModel.delete(id_)


if __name__ == '__main__':
    unittest.main()
