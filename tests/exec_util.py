import re


def exec_not_allowed(operation):
    def _not_allowed(*args, **kwargs):
        raise Exception(operation + " operation not allowed")

    return _not_allowed


exec_global_variables = {
    # include
    're': re,
    # exclude
    'open': exec_not_allowed('open'),
    'quit': exec_not_allowed('quit'),
    'exit': exec_not_allowed('exit'),
    'eval': exec_not_allowed('eval'),
    'exec': exec_not_allowed('exec'),
}


def execute_func(func_code, args=None, kwargs=None, func_name='execute', import_allowed=False):
    """
    Example:
        func_in_string =
\"""
def execute(*args,**kwargs):
    return "Hello, "+args[0]+"! "+ str(kwargs.get('a'))
\"""
        result = execute_func(func_in_string, ("world",), {'a': 1, 'b': 2})


    :param func_name:
    :param func_code:
    :param args:
    :param kwargs:
    :param import_allowed: 是否允许import
    :return:
    """
    # 禁止import
    if import_allowed is not True and re.search(r'(\s)*import\s', func_code):
        raise ValueError('import are not allowed')

    # 移除多余indent
    lines = func_code.split('\n')
    indent = 0
    for line in lines:
        txt = line.strip()
        if txt != '' and not txt.startswith(('#', '"""')):  # 非空行
            indent = len(line) - len(line.lstrip())
            break
    if indent > 0:
        lines = [line[indent:] if line.strip() else line for line in lines]
        func_code = '\n'.join(lines)

    # 添加返回值
    func_code += '\nexec_result = ' + func_name + '(*args,**kwargs)'

    # 封装参数&执行代码
    variables = {
        'args': args or (),
        'kwargs': kwargs or {},
    }
    try:
        exec(func_code, exec_global_variables, variables)
    except Exception as e:
        print('Execute exception: ', e)
    return variables.get('exec_result')


if __name__ == '__main__':
    func_in_string = """
    def execute(*args,**kwargs):
        return "Hello, "+args[0]+"! "+ str(kwargs.get('a'))
    """
    print(execute_func(func_in_string, ("world",), {'a': 1, 'b': 2}))

    print('end')
