import json
import os
from datetime import datetime

from flaskz.ext.cypher import RSACipher, AESCipher
# -------------------------------------------e-------------------------------------------
from flaskz.log import flaskz_logger


def get_datetime(date):
    """Parse date string to datetime.datetime"""
    return datetime.strptime(date, "%Y/%m/%d")


def license_cmp(i1, i2):
    """
    1.先通过StartData进行排序，找到最新的StartData
    2.如果StartData相等，再通过EndDate进行排序，找到最长的EndDate
    """
    start_date1 = get_datetime(i1.get('StartDate'))
    start_date2 = get_datetime(i2.get('StartDate'))
    if start_date1 < start_date2:
        return -1
    if start_date1 > start_date2:
        return 1

    end_date1 = datetime.strptime(i1.get('EndDate'), "%Y/%m/%d")
    end_date2 = datetime.strptime(i2.get('EndDate'), "%Y/%m/%d")
    if end_date1 < end_date2:
        return -1
    if end_date1 > end_date2:
        return 1

    return 0


def add_date_seg(date_segs, start_date, end_date):
    """用于ExpireDays"""
    for seg in date_segs:
        seg_start = seg.get('start')
        seg_end = seg.get('end')
        if (seg_start <= start_date <= seg_end) or (seg_start <= end_date <= seg_end):
            start = min(seg_start, start_date)
            end = max(seg_end, end_date)
            seg['start'] = start
            seg['end'] = end
            return

    date_segs.append({
        'start': start_date,
        'end': end_date
    })


# -------------------------------------------parse-------------------------------------------
def gen_license(private_key, public_dict, private_dict=None):
    """
    生成license，包含public和private两种信息
    包含public信息 + 加密字符串(包含public信息签名和private信息)
    修改明文信息/加密字符串，都会校验失败，变成无效license


    User=Cisco
    Type=EVALUATION
    StartDate=2021/9/9
    EndDate=2022/9/9
    Modules=all,srte,telemetry,firewall,f5
    Device=20
    Signature=CA0a5v8nbxkrY...

    :param private_key:
    :param public_dict:
    :param private_dict:
    :return:
    """
    sign_txt = _gen_kv_text(public_dict)
    return sign_txt + '\n\nSignature=' + gen_ciphertext(private_key, public_dict, private_dict)


def gen_ciphertext(private_key, public_dict, private_dict=None):
    """
    生成加密字符串
    包括签名签名长度+签名+隐藏信息
    :param private_key:
    :param public_dict:
    :param private_dict:
    :return:
    """
    public_kv_text = _gen_kv_text(public_dict, True)
    public_signature = RSACipher.sign(public_kv_text, private_key)
    public_signature_len = len(public_signature)

    private_cipher_text = ''
    if private_dict and len(private_dict) > 0:
        aes_key_index = public_signature_len % 6
        aes_key = public_signature[aes_key_index:aes_key_index + 16]
        private_cipher_text = AESCipher.encrypt(json.dumps(private_dict), aes_key)

    ciphertext = _to_hex(public_signature_len)[::-1]
    ciphertext += public_signature
    ciphertext += private_cipher_text

    return ciphertext


def parse_license(public_key, license_txt):
    """
    验证签名 & 解析license内容，如果成功返回license信息
    :param public_key:
    :param license_txt:
    :return:
    """
    try:
        kv_map = _parse_kv_text(license_txt)
        ciphertext = kv_map.pop('Signature')
        cipher_obj = parse_ciphertext(ciphertext)

        sign_txt = _gen_kv_text(kv_map, True)
        if RSACipher.verify(sign_txt, cipher_obj.get('signature'), public_key):
            private = cipher_obj.get('private', {})
            if type(private) is dict:
                kv_map.update(private)
            kv_map['Signature'] = ciphertext
            return kv_map
            # return {
            #     'public': kv_map,
            #     'private': cipher_obj.get('private')
            # }
    except Exception as e:
        flaskz_logger.exception(e)
    return False


def parse_ciphertext(ciphertext):
    """
    解析秘文，返回签名和private信息
    :param ciphertext:
    :return:
    """
    public_signature_len = int(ciphertext[0:3][::-1], 16)
    public_signature = ciphertext[3:3 + public_signature_len]
    private_cipher_text = ciphertext[3 + public_signature_len:]
    private_dict = None
    if private_cipher_text:
        aes_key_index = public_signature_len % 6
        aes_key = public_signature[aes_key_index:aes_key_index + 16]
        private_dict = json.loads(AESCipher.decrypt(private_cipher_text, aes_key))
    return {
        'signature': public_signature,
        'private': private_dict
    }


def _gen_kv_text(kv_dict, sort=False):
    """
    将字典转换成k=v字符串
    {
        'User': 'Cisco',
        'Type': 'EVALUATION'
    }
    --->
    User=Cisco
    Type=EVALUATION

    :param kv_dict:
    :param sort:
    :return:
    """
    lines = []
    for k, v in kv_dict.items():
        lines.append(str(k) + '=' + str(v))
    if sort is True:
        lines.sort()
    return '\n'.join(lines)


def _parse_kv_text(kv_txt):
    """
    将k=v字符串转换成字典
    User=Cisco
    Type=EVALUATION
    --->
    {
    'User': 'Cisco',
    'Type': 'EVALUATION'
    }
    :param kv_txt:
    :return:
    """
    lines = kv_txt.split('\n')
    last_key = None
    kv_dict = {}
    for line in lines:
        line = line.strip()
        key = None
        if line.find('=') > 0:
            eq_index = line.index('=')
            key = line[0:eq_index]
            value = line[eq_index + 1:]
        else:
            value = line
        if key:
            last_key = key
            kv_dict[key] = value
        elif last_key:
            kv_dict[last_key] = kv_dict[last_key] + value
    return kv_dict


def _to_hex(int_value, hex_len=3):
    """
    把数字转换成指定位数的16进制
       1 --> 001
      10 --> 00a
     100 --> 064
    1000 --> 3e8
    :param int_value:
    :param hex_len:
    :return:
    """
    return '{0:0{1}X}'.format(int_value, hex_len)


if __name__ == '__main__':
    # 生成rsa公钥私钥
    # rsa_private_key, rsa_public_key = RSACipher.generate_key()
    # with open('private.key', 'w') as f:
    #     f.write(rsa_private_key)
    # with open('public.key', 'w') as f:
    #     f.write(rsa_public_key)

    # 生成license
    if os.path.isfile("private.key"):
        with open("private.key", "r") as f:
            rsa_private_key = f.read()

        license_text = gen_license(rsa_private_key, {
            'User': 'Flaskz-Admin',
            'Type': 'EVALUATION',  # RUNTIME
            'StartDate': '2022/01/01',
            'EndDate': '2023/12/31',
            'Modules': '*'
        })
        print(license_text)
        with open('license.dat', 'w') as f:
            f.write(license_text)

    # # 校验license文件
    # if os.path.isfile("license.dat") and os.path.isfile("public.key"):
    #     with open("license.dat", "r") as f:
    #         license_data = f.read()
    #     with open("public.key", "r") as f:
    #         public_key = f.read()
    # print(parse_license(public_key, license_data))
