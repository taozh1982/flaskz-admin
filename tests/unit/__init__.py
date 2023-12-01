# 测试用例存放路径
import unittest

case_path = '.'


# 获取所有测试用例
def get_all_cases():
    discover = unittest.defaultTestLoader.discover(case_path, pattern="*_test.py")
    suite = unittest.TestSuite()
    suite.addTest(discover)
    return suite


def print_test(method, test_ins):
    class_name = test_ins.__class__.__name__
    print((class_name + '.' + method).center(100, '-'))


if __name__ == '__main__':
    # 运行测试用例
    runner = unittest.TextTestRunner()
    runner.run(get_all_cases())
