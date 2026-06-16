import base64
import difflib
import hashlib
import re
import zlib


def compress_text(txt, decompressible=True):
    """
    压缩文本。

    :param txt: 原始字符串
    :param decompressible: True 表示可还原压缩（zlib+base64），
                     False 表示不可还原哈希摘要（md5+base64）
    :return: 压缩后的字符串（base64编码）
    """
    if txt.strip() == '':
        return txt
    if decompressible is False:
        digest = hashlib.md5(txt.encode('utf-8')).digest()
        return base64.urlsafe_b64encode(digest).decode('utf-8').rstrip('=')
    compressed = zlib.compress(txt.encode('utf-8'))
    return base64.urlsafe_b64encode(compressed).decode('utf-8').rstrip('=')


def decompress_text(compressed_txt):
    """
    解压文本（仅适用于可还原压缩模式）。

    :param compressed_txt: 压缩后的字符串
    :return: 解压后的原始字符串
    """
    if compressed_txt.strip() == '':
        return compressed_txt
    padding = '=' * ((4 - len(compressed_txt) % 4) % 4)
    compressed_bytes = base64.urlsafe_b64decode(compressed_txt + padding)
    return zlib.decompress(compressed_bytes).decode('utf-8')


def diff_text(text1, text2, diff_rules, include=True, only_check=False, strip='both'):
    compiled_rules = []
    for r in diff_rules:
        if isinstance(r, str):
            if not r.strip():  # 跳过空白行
                continue
            compiled_rules.append(re.compile(r))
        else:
            compiled_rules.append(r)
    if compiled_rules:
        text1_lines = _filter_diff_lines(text1.splitlines(), compiled_rules, include, strip)
        text2_lines = _filter_diff_lines(text2.splitlines(), compiled_rules, include, strip)
    else:
        text1_lines = text1.splitlines()
        text2_lines = text2.splitlines()
    diff_result = difflib.unified_diff(
        text1_lines, text2_lines,
        fromfile="text1", tofile="text2",
        lineterm="")

    diff_lines, add_count, remove_count = [], 0, 0
    for line in diff_result:
        if line.startswith('+') and not line.startswith('+++'):
            if only_check is True:
                return True
            add_count += 1
        elif line.startswith('-') and not line.startswith('---'):
            if only_check is True:
                return True
            remove_count += 1
        diff_lines.append(line)
    if only_check is True:
        return False
    return add_count + remove_count > 0, "\n".join(diff_lines), {"add": add_count, "remove": remove_count, "total": add_count + remove_count}


def _filter_diff_lines(lines, rules, include, strip='both'):
    """根据规则过滤行"""
    if rules:
        lines = [
            line
            for line in lines
            if line.strip() and (
                any(r.search(line) for r in rules) if include
                else not any(r.search(line) for r in rules)
            )
        ]
    if strip == 'right':
        return [line.rstrip(' ') for line in lines if line.strip()]
    elif strip == 'left':
        return [line.lstrip(' ') for line in lines if line.strip()]
    return [line.strip(' ') for line in lines if line.strip()]


if __name__ == '__main__':
    # 文本压缩测试
    text = "[21][VSAN24_GDPC_20121115][HW-139-128-48-119-DME-11],[22][VSAN24_GDPC_20121115][HW-139-128-48-119-DME-11]"
    compressed1 = compress_text(text, decompressible=True)
    print("可还原压缩:", compressed1)
    print("还原文本:", decompress_text(compressed1))

    compressed2 = compress_text(text, decompressible=False)
    print("不可还原压缩:", compressed2)
    try:
        decompress_text(compressed2)
    except Exception as e:
        print("错误:", e)

    # 文本比较测试
    test_rules = ['ntp clock-period', 'ntp server', '^! Last configuration change', '^Building configuration']
    old = """!
    version 15.2
    ntp server 10.1.1.1

    ntp clock-period 1234567
    interface Gig0/1
     ip address 10.0.0.1 255.255.255.0
    !
    """

    new = """!
    version 15.2
    ntp server 10.1.1.2
    ntp clock-period 9876543
    interface Gig0/1
     ip address 10.0.0.2 255.255.255.0
    !
    """
    changed, diff_txt, count = diff_text(old, new, test_rules, False)
    print(diff_txt)
    print(count)
    print('-----------')
    changed, diff_txt, count = diff_text(old, new, test_rules, True)
    print(diff_txt)
    print(count)
