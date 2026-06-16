import errno
import ipaddress
import random
import re
import select
import socket
import struct
import time

ICMP_ECHO_REQUEST = 8
ICMP_CODE = 0


def is_valid_ipv4(ip_addr):
    # 正则表达式验证 IPv4 地址
    ipv4_pattern = r'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
    return bool(re.match(ipv4_pattern, ip_addr))


def is_ip_in_range(ip, subnet):
    """ 判断IP是否在某个网段内 """
    network = ipaddress.IPv4Network(subnet)
    return ipaddress.IPv4Address(ip) in network


def ping(host, timeout=1, retries=1, port=None, sequence=1):
    if type(port) is str and port.isdigit():
        port = int(port)
    if type(port) is int:
        result = tcp_ping(host, port, timeout, retries)
        result['method'] = 'tcp'
    else:
        result = icmp_ping(host, timeout, retries, sequence)
        result['method'] = 'icmp'
    return result


def icmp_ping(host, timeout=1, retries=1, sequence=1):
    """
    发送 ICMP Echo Request
    返回字典: {"success": bool, "ttl": int or None, "rtt": float or None, "error": str or None}
    """
    for i in range(retries):
        last_retry = (i == retries - 1)
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP) as sock:
                sock.settimeout(timeout)
                packet_id = _generate_packet_id()
                packet = _create_icmp_packet(packet_id, sequence, 56)
                time_sent = time.time()
                sock.sendto(packet, (host, 0))
                # while packet: # 报文较小，不太可能部分发送
                #     sent = sock.sendto(packet, (host, 1))
                #     packet = packet[sent:]
                success, result = _receive_icmp_packet(sock, packet_id, time_sent, timeout)
                if success:  # 成功
                    icmp_type, addr, ttl, rtt = result
                    if icmp_type == 0:
                        return {"success": True, "ttl": ttl, "rtt": rtt, "error": None}
                if last_retry:  # 不重试
                    return {"success": False, "ttl": None, "rtt": None, "error": result}
        except Exception as e:
            if last_retry:
                return {"success": False, "ttl": None, "rtt": None, "error": str(e)}
    return {"success": False, "ttl": None, "rtt": None, "error": None}


def tcp_ping(host, port=80, timeout=1, retries=1, mode='port'):
    """
    TCP Ping
    返回字典:
        {"success": bool, "rtt": float or None, "ttl": int or None, "error": str or None}
    """
    if type(port) is str and port.isdigit():
        port = int(port)
    if type(port) is not int:
        return {"success": False, "ttl": None, "rtt": None, "error": 'invalid_port'}

    for i in range(retries):
        last_retry = (i == retries - 1)
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(timeout)
                time_sent = time.time()
                result = sock.connect_ex((host, port))
                rtt = round((time.time() - time_sent) * 1000, 3)
                if result == 0:
                    return {"success": True, "ttl": None, "rtt": rtt, "error": None}

                if result == errno.ECONNREFUSED and mode == 'host':  # 目标主机可达，但目标端口上没有服务或被主动拒绝
                    return {"success": True, "ttl": None, "rtt": rtt, "error": 'port_refused'}
                if last_retry:  # 不重试
                    err = errno.errorcode.get(result) or result
                    # if result == errno.ETIMEDOUT:
                    #     err = 'timeout'
                    # else:
                    return {"success": False, "ttl": None, "rtt": None, "error": err}
        except Exception as e:
            if last_retry:
                return {"success": False, "ttl": None, "rtt": None, "error": str(e)}

    return {"success": False, "ttl": None, "rtt": None, "error": None}


def icmp_traceroute(host, max_hops=64, timeout=1, probes=3):
    """
    TTL 从 1 → max_hops
    每个 TTL 发送一个 ICMP Echo Request
    路由器返回：
        ICMP Time Exceeded (type=11) → 中间跳
        ICMP Echo Reply (type=0) → 到达目标
    RTT = 回包时间 − 发送时间
    到达目标后停止
    """
    try:
        dest_ip = socket.gethostbyname(host)
    except Exception as e:
        return False, str(e)

    results = []
    for ttl in range(1, max_hops + 1):
        hop_result = {"ttl": ttl, "probes": []}
        hop_probes = []
        reached_dest = False
        for probe in range(probes):
            probe_result = {"ip": None, "hostname": None, "rtt": None, "status": 'timeout', "error": None}
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP) as sock:
                    sock.settimeout(timeout)
                    sock.setsockopt(socket.IPPROTO_IP, socket.IP_TTL, ttl)
                    packet_id = _generate_packet_id(ttl + probe)
                    packet = _create_icmp_packet(packet_id, sequence=probe)
                    time_sent = time.time()
                    sock.sendto(packet, (dest_ip, 1))
                    success, result = _receive_icmp_packet(sock=sock, packet_id=packet_id, time_sent=time_sent, timeout=timeout)
                    if success:
                        icmp_type, ip, recv_ttl, rtt = result
                        hostname = _reverse_dns(ip)
                        probe_result['ip'] = ip
                        probe_result['hostname'] = hostname
                        probe_result['rtt'] = rtt
                        if icmp_type == 11:
                            probe_result['status'] = 'time_exceeded'
                        elif icmp_type == 0:
                            probe_result['status'] = 'echo_reply'
                            reached_dest = True

            except Exception as e:
                probe_result['status'] = 'error'
                probe_result['error'] = str(e)
            hop_probes.append(probe_result)
        hop_result['probes'] = hop_probes
        results.append(hop_result)
        if reached_dest:
            break
    return True, results


def tcp_traceroute(host, port=80, max_hops=64, timeout=1, probes=3):
    """
    TCP Traceroute（无 retry）

    每个 TTL：
        - 发送 TCP SYN
        - ICMP Time Exceeded → 中间跳
        - TCP RST / SYN-ACK → 到达目标
    """
    try:
        dest_ip = socket.gethostbyname(host)
    except Exception as e:
        return False, str(e)

    if type(port) is str and port.isdigit():
        port = int(port)

    results = []
    for ttl in range(1, max_hops + 1):
        hop_result = {"ttl": ttl, "probes": []}
        hop_probes = []
        reached_dest = False
        for probe in range(probes):
            probe_result = {"ip": None, "hostname": None, "rtt": None, "status": 'timeout', "error": None}
            try:
                # 接收 ICMP（Time Exceeded）
                with (socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP) as recv_sock,
                      socket.socket(socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP) as send_sock):
                    recv_sock.settimeout(timeout)
                    send_sock.settimeout(timeout)
                    send_sock.setsockopt(socket.IPPROTO_IP, socket.IP_TTL, ttl)
                    time_sent = time.time()
                    result = send_sock.connect_ex((dest_ip, port))
                    rtt = round((time.time() - time_sent) * 1000, 3)
                    # 1 TCP 层直接响应 → 到达目标
                    if result in (0, errno.ECONNREFUSED):
                        probe_result['ip'] = dest_ip
                        probe_result['hostname'] = _reverse_dns(dest_ip)
                        probe_result['rtt'] = rtt
                        probe_result['status'] = 'tcp_reply'
                        reached_dest = True
                    # 2 等 ICMP Time Exceeded
                    ready = select.select([recv_sock], [], [], timeout)
                    if ready[0]:
                        packet, addr = recv_sock.recvfrom(1024)
                        ip = addr[0]
                        hostname = _reverse_dns(ip)
                        probe_result['ip'] = ip
                        probe_result['hostname'] = hostname
                        probe_result['rtt'] = rtt
                        probe_result['status'] = 'time_exceeded'
            except Exception as e:
                probe_result['status'] = 'error'
                probe_result['error'] = str(e)
            hop_probes.append(probe_result)
        hop_result['probes'] = hop_probes
        results.append(hop_result)
        if reached_dest:
            break
    return True, results


def format_traceroute(traceroute_data):
    """
    将 traceroute JSON 数据格式化为字符串列表

    参数:
        traceroute_data: list[dict]，每个 dict 包含 "ttl" 和 "probes" 列表
    返回:
        list[str] 格式化后的每跳字符串
    """
    # print(json.dumps(traceroute_data, indent=4))
    formatted_lines = []
    for hop in traceroute_data or []:
        formatted_lines.append(_format_hop(hop))
    return '\n'.join(formatted_lines)


def _format_hop(hop, ttl_width=2):
    """
    格式化单个 traceroute hop
    返回: list[str]
    """
    ttl = hop.get('ttl') or ''
    probes = hop.get('probes') or []

    ip_dict = {}  # ip -> {'hostname':..., 'rtts':[]}
    probe_order = []  # [(ip or None, '*')]
    all_fail = True

    # 收集 probe 信息
    for probe in probes:
        ip = probe.get('ip')
        hostname = probe.get('hostname') or ip
        status = probe.get('status')
        rtt = probe.get('rtt')

        if status in ('timeout', 'error') or ip is None:
            probe_order.append((None, '*'))
        else:
            all_fail = False
            probe_order.append((ip, None))
            if ip not in ip_dict:
                ip_dict[ip] = {'hostname': hostname, 'rtts': []}
            ip_dict.get(ip)['rtts'].append(f'{rtt:.3f} ms')

    # 整跳失败
    if all_fail:
        return '\n'.join([f'{str(ttl).rjust(ttl_width)}  ' + '  '.join(['*'] * len(probes))])

    lines = []
    current_line = []
    first_line = True
    last_ip = None

    for ip, rtt_str in probe_order:
        if ip is None:
            current_line.append(rtt_str)
            continue
        data = ip_dict.pop(ip, None)
        if not data:
            continue
        hostname = data.get('hostname')
        rtts = '/'.join(data.get('rtts') or [])
        entry = f'{hostname} ({ip})  {rtts}'

        # 不同 IP，需要先落盘上一行
        if last_ip is not None and last_ip != ip:
            if first_line:
                lines.append(f'{str(ttl).rjust(ttl_width)}  ' + '  '.join(current_line))
                first_line = False
            else:
                lines.append(' ' * ttl_width + '  ' + '  '.join(current_line))
            current_line = []
        current_line.append(entry)
        last_ip = ip
    # 输出最后一行
    if current_line:
        if first_line:
            lines.append(f'{str(ttl).rjust(ttl_width)}  ' + '  '.join(current_line))
        else:
            lines.append(' ' * ttl_width + '  ' + '  '.join(current_line))
    return '\n'.join(lines)


def _create_icmp_packet(packet_id, sequence=1, payload_len=56):
    """
    构造 ICMP Echo 请求数据包
    默认总长度 8(header) + payload_len = 64 bytes
    """
    header = struct.pack('bbHHh', ICMP_ECHO_REQUEST, ICMP_CODE, 0, packet_id, sequence)
    data = payload_len * b'Q'
    chksum = _icmp_checksum(header + data)
    header = struct.pack('bbHHh', ICMP_ECHO_REQUEST, ICMP_CODE, socket.htons(chksum), packet_id, sequence)
    return header + data


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


def _receive_icmp_packet(sock, packet_id, time_sent, timeout):
    """
    接收返回包，获取 TTL + RTT（ICMP / UDP / TCP）

    参数：
        sock        : 已创建的 RAW socket
        packet_id   : ICMP 包的 ID
        time_sent   : 发送时间戳
        timeout     : 超时时间（秒）
    返回：
        (status: bool, (ttl: int, rtt_ms: float)) 或 (False, 'timeout/error')
    """
    try:
        end_time = time.time() + timeout
        while True:
            time_left = end_time - time.time()
            if time_left <= 0:
                return False, 'timeout'  # 超时未收到

            ready = select.select([sock], [], [], time_left)
            if not ready[0]:
                return False, 'timeout'  # 超时未收到

            time_received = time.time()
            rec_packet, addr = sock.recvfrom(1024)

            rtt = round((time_received - time_sent) * 1000, 3)  # 毫秒
            ip_header = rec_packet[:20]
            ttl = ip_header[8]  # IP头部第9字节是 TTL

            # ICMP header 在 IP 头之后20字节
            if len(rec_packet) < 28:
                continue
            icmp_header = rec_packet[20:28]
            icmp_type, code, checksum_val, p_id, sequence = struct.unpack('bbHHh', icmp_header)

            if icmp_type == 0 and p_id == packet_id:  # icmp_type == 0 → Echo Reply  判断是否是我们发出的包
                return True, (icmp_type, addr[0], ttl, rtt)
            if icmp_type == 11:  # CMP Time Exceeded
                return True, (icmp_type, addr[0], ttl, rtt)

            # # 判断是否是我们发出的包
            # if p_id != packet_id:
            #     continue  # 不是本次包，继续循环
            #
            # return True, (ttl, rtt)

        return False, 'timeout'  # 超时未收到
    except Exception as e:
        return False, str(e)


def _generate_packet_id(obj=None):
    """
    返回 16 位整数作为 ICMP Identifier
    """
    if obj is None:
        obj = object()
    return int((id(obj) * random.random()) % 65535)


def _reverse_dns(ip):
    try:
        hostname, _, _ = socket.gethostbyaddr(ip)
        return hostname
    except Exception:
        return None


if __name__ == "__main__":
    pass
    _host = '127.0.0.2'
    # print(ping(_host))
    # print(ping(_host, port=80))

    # print(format_traceroute(icmp_traceroute(_host, probes=6)[1]))
    print()
    print(format_traceroute(tcp_traceroute(_host, 80)[1]))
    # print(check_port('cisco.com', 443))
