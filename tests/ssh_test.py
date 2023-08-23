from flaskz.ext.ssh import ssh_session
from paramiko.ssh_exception import AuthenticationException

if __name__ == '__main__':
    servers = [
        {  # C9300
            'host': '10.75.37.165',
            'username': 'admin',
            'password': 'Cisco123',
            'secondary_password': 'Cisco123',
            'recv_endswith': ['# ', '$ ', ': ', '? ', '#', '>'],
            # 'commands': ['enable', 'show udp | in ( 514 )']
            # 'commands': ['enable', 'show run']
            'commands': ['enable', {'command': ' ', 'clean': False}]
        },
        # {  # C9300
        #     'host': '10.75.37.165',
        #     'username': 'admin',
        #     'password': 'Cisco123',
        #     # 'secondary_password': 'Cisco123',
        #     'recv_endswith': ['# ', '$ ', ': ', '? ', '#'],
        #     'commands': ['enable', 'Cisco123', {'command': 'show run', 'wait': False}]
        #     # 'commands': ['show run']
        # },
        # {  # Centos
        #     'host': '10.124.4.21',
        #     'username': 'admin1',
        #     'password': 'Cisco@123',
        #     'commands': ['show int eth3/1']
        # },
        # {  # Centos
        #     'host': '10.124.5.222',
        #     'username': 'root',
        #     'password': 'cisco123',
        #     'commands': ['ls -l', 'cd ../opt', '\cp a.txt b.txt']
        # },
        # {  # Ubuntu
        #     'host': '10.124.5.198',
        #     'username': 'root',
        #     'password': 'Cisco@123',
        #     'commands': ['ls -l']
        # },
        # {  # Ubuntu, test input password
        #     'host': '10.124.5.216',
        #     'username': 'cisco',
        #     'password': 'cisco123',
        #     'secondary_password': 'cisco123',
        #     'commands': ['sudo ls -l']
        # },
        # {  # NX-OS
        #     'host': '10.124.11.134',
        #     'username': 'admin',
        #     'password': 'Cisco@123',
        #     'commands': ['show version', 'show running-config']
        # },
        # {  # NX-OS
        #     'host': '10.66.94.62',
        #     'username': 'admin',
        #     'password': 'cisco!123',
        #     'commands': ['show version', 'show running-config']
        # }
    ]
    for item in servers:
        print((item.get('host') + ' : ' + str(item.get('commands'))).center(100, '*'))
        try:

            with ssh_session(item.get('host'), item.get('username'), item.get('password'), timeout=10, recv_endswith=item.get('recv_endswith'),
                             secondary_password=item.get('secondary_password')) as ssh:
                print(ssh.run_command_list(item.get('commands'), True))
        except AuthenticationException as e:
            print("Authentication failed")
        except Exception as e:
            # print(e)
            raise e
            # ssh.run_command('cd /var/run/redis/sonic-db/')
            # ssh.sftp_get_dir('/var/log', '/Users/taozh/Work/Codes/PY/flaskz-admin/tests/log')
    print('\n', 'end'.center(100, '-'))
