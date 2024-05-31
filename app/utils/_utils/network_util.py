"""
ping需要管理员权限
"""
import random
import select
import socket
import struct
import time


def ping(host, timeout=1, retries=1):
    """
    发送ICMP Echo请求并接收回复

    - False,error: 失败，socket异常
    - False,'timeout': 失败, host不通
    - True,(ttl,delay): 成功,(ttl,delay)
    """
    for i in range(retries):
        last_retry = (i == retries - 1)
        try:
            icmp = socket.getprotobyname("icmp")
            with socket.socket(socket.AF_INET, socket.SOCK_RAW, icmp) as sock:
                packet_id = int((id(timeout) * random.random()) % 65535)
                packet = _icmp_create_packet(packet_id)
                while packet:
                    sent = sock.sendto(packet, (host, 1))
                    packet = packet[sent:]

                result = _icmp_receive_ping(sock, packet_id, time.time(), timeout)
                if result is None:
                    if last_retry:
                        return False, 'timeout'
                    else:
                        continue
                return True, result
        except Exception as e:
            if last_retry:
                return False, str(e)


def check_port(host, port, timeout=1, retries=1):
    """
    检查主机端口是否开放
    -True: 端口开放
    -False: 端口关闭
    -其他: 失败原因
    """
    for i in range(retries):
        last_retry = (i == retries - 1)
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(timeout)
                result = sock.connect_ex((host, port))
                if result == 0:
                    return True  # 端口开放
                elif last_retry:
                    return False  # 端口关闭
        except Exception as e:
            if last_retry:
                return str(e)


def _icmp_checksum(source_string):
    """
    IETF RFC 1071中定义的校验和算法
    """
    _sum = 0
    max_count = (len(source_string) / 2) * 2
    count = 0
    while count < max_count:
        val = source_string[count + 1] * 256 + source_string[count]
        _sum = _sum + val
        _sum = _sum & 0xffffffff
        count = count + 2
    if max_count < len(source_string):
        _sum = _sum + source_string[len(source_string) - 1]
        _sum = _sum & 0xffffffff

    _sum = (_sum >> 16) + (_sum & 0xffff)
    _sum = _sum + (_sum >> 16)
    answer = ~_sum
    answer = answer & 0xffff
    answer = answer >> 8 | (answer << 8 & 0xff00)
    return answer


def _icmp_create_packet(packet_id):
    """
    构造ICMP Echo请求数据包 64bytes(8+56)
    """
    header = struct.pack('bbHHh', 8, 0, 0, packet_id, 1)
    data = 56 * b'Q'
    my_checksum = _icmp_checksum(header + data)
    header = struct.pack('bbHHh', 8, 0, socket.htons(my_checksum), packet_id, 1)
    return header + data


def _icmp_receive_ping(sock, packet_id, time_sent, timeout):
    """
    接收ICMP Echo回复
    返回值为毫秒
    """
    while True:
        ready = select.select([sock], [], [], timeout)
        if ready[0] == []:  # 超时
            return

        time_received = time.time()
        rec_packet, addr = sock.recvfrom(1024)
        icmp_header = rec_packet[20:28]
        type, code, checksum, p_id, sequence = struct.unpack('bbHHh', icmp_header)

        if p_id == packet_id:
            ttl = struct.unpack("B", rec_packet[8:9])[0]
            delay = round((time_received - time_sent) * 1000, 3)
            return ttl, delay


if __name__ == "__main__":
    pass
    print(ping('cisco.com', 3))
    print(check_port('cisco.com', 443))
