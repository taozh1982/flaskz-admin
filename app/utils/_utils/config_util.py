import re


def parse_server_config(server_str):
    """
    解析服务器配置字符串，返回字典
    可适配的格式如下:
        - aaa:bbb@1.1.1.1
        - aaa:bbb@1.1.1.1:3306
        - aaa:bbb@a.com
        - aaa:bbb@a.com:3306
        - 1.1.1.1
        - 1.1.1.1:22
        - ('1.1.1.1',22)
    """
    config = None

    if type(server_str) is str:
        # if '@' in server_str:
        #     with_auth = True
        # server_config_str = "root:Cisco123@10.124.4.98:3306"  # 或者试试 "root:Cisco123@10.124.4.98"
        server_str = server_str.strip()
        if server_str:
            if '@' in server_str:
                # 密码可能包含!、@、#、$、%等
                with_user_pattern = r"(?P<username>[\w]+):(?P<password>[\w%40!#\$&\(\)\*\+\,-\.\/:;=\?@\[\]\^_`{\|}~]+)@(?P<address>[\w\.\-]+)(?::(?P<port>\d+))?"
                match = re.match(with_user_pattern, server_str)
                if match:
                    config = {
                        "hostname": match.group("address"),
                        "username": match.group("username"),
                        "password": match.group("password"),
                        "port": match.group("port")
                    }
            else:
                pattern1 = r"(?P<address>[\w\.\-]+)(?::(?P<port>\d+))?"  # 10.124.4.98:3306, 10.124.4.98
                pattern2 = r"\('(?P<address>[\w\.\-]+)',\s*(?P<port>\d+)\)"  # ('10.124.4.98', 22)
                match = re.match(pattern1, server_str) or re.match(pattern2, server_str)
                if match:
                    config = {
                        "hostname": match.group("address"),
                        "port": match.group("port"),
                    }

    if config is not None:
        if config.get("port") is None:
            config.pop('port', None)

        if 'port' in config:
            config['port'] = int(config['port'])

    return config


def parse_type_rules(text, default_field='name'):
    text = text or ''
    type_rules = []

    rule_re = re.compile(r'(?:\[(\w+)\])?(.+)')
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue

        rule_type, expr = line.split("=", 1)
        rule_type = rule_type.strip()

        compiled_patterns = []

        for part in _split_rule_patterns(expr):
            part = part.strip()
            if not part:
                continue

            m = rule_re.fullmatch(part)
            if not m:
                continue

            field, pattern = m.groups()
            field = (field or default_field or '').lower()
            pattern = pattern.lower()

            compiled_patterns.append({
                "field": field,
                "pattern": _compile_type_pattern(pattern),
                "rule": part
            })

        type_rules.append({
            "type": rule_type,
            "patterns": compiled_patterns,
        })

    return type_rules


def _split_rule_patterns(s):
    parts = re.split(r'(?<!\\),', s)   # 只按“未转义的逗号”分割
    return [p.replace(r'\,', ',').strip() for p in parts]

def _compile_type_pattern(pattern: str) -> re.Pattern:
    """
    规则编译：
    - /regex/  → 原生正则
    - 其它     → * 通配符
    """
    # 正则模式：/ ... /
    if pattern.startswith("/") and pattern.endswith("/"):
        regex = pattern[1:-1]
        return re.compile(regex, re.IGNORECASE)

    # 通配符模式
    regex = "^" + re.escape(pattern).replace(r"\*", ".*") + "$"
    return re.compile(regex, re.IGNORECASE)


def classify_type(inventory_item, type_rules):
    for rule in type_rules:
        for p in rule["patterns"]:
            value = (inventory_item.get(p["field"]) or "").strip().lower()
            if value and p["pattern"].match(value):
                return rule["type"]

    return None


if __name__ == '__main__':
    print(parse_server_config('root:Cisco@0123@10.124.4.98:3306'))
    print(parse_server_config("aaa:bbb@1.1.1.1:3306"))
    print(parse_server_config("1.1.1.1"))
    print(parse_server_config("('1.1.1.1',22)"))

    INVENTORY_RULES = """
chassis = chassis, *-chassis
fan = fan *, *fan module*
power_supply = *power supply*, [description]*chassis power supply*
linecard = linecard*
module = module *, *uplink module*, *frulink module*, [description]supervisor module*, [description]services module*, [description]fabric card module, [description]*expansion module*
sfp = [description]*sfp*, [description]*basesx*, [description]*base-sr*, [pid]*sfp*
switch = switch system, * stack, switch *
rack = rack *
    """
    _rules = parse_type_rules(INVENTORY_RULES)

    samples = [
        {"name": "Fan 1"},
        {"name": "Switch 1 - Power Supply 2"},
        {"name": "CISCO3945-CHASSIS"},
        {"name": "Switch 1 - Uplink Module"},
        {"name": "Linecard(slot 1)"},
        {"name": "SFP-10G-SR", "description": "10GBASE-SR SFP", "pid": "SFP-10G-SR"},
        {"name": "Rack 1"},
    ]

    for item in samples:
        print(f"{item.get('name')!r} -> {classify_type(item, _rules)}")
