import inspect
import unittest

from flaskz.ext.ssh import ssh_run_command, ssh_run_command_list, ssh_session
from paramiko.ssh_exception import AuthenticationException, SSHException

from tests.unit import print_test

cisco_nxos_connect_kwargs = {'hostname': '10.124.206.26', 'username': 'admin', 'password': 'Admin@123'}
cisco_ios_xe_connect_kwargs = {'hostname': '10.75.37.165', 'username': 'admin', 'password': 'Cisco123', 'secondary_password': 'Cisco123',
                               'recv_endswith': ['# ', '$ ', ': ', '? ', '#', '>'], 'recv_start_delay': 0.15}
cisco_ios_xr_connect_kwargs = {'hostname': '10.124.205.77', 'username': 'cisco', 'password': '1qaz@WSX',
                               'recv_endswith': ['# ', '$ ', ': ', '? ', '#', '--']}
linux_connect_kwargs = {'hostname': '10.124.5.155', 'username': 'cisco', 'password': 'Cisco@123', 'secondary_password': 'Cisco@123'}


class SSHCase(unittest.TestCase):
    # ----------------------------------func----------------------------------
    def test_cisco_nxos_ssh_run_command(self):
        """
        测试ssh_run_command@cisco-nxos
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        success, result = ssh_run_command(cisco_nxos_connect_kwargs, 'show version')
        self.assertTrue(success)
        self.assertIn("Cisco", result)

        success, result = ssh_run_command(cisco_nxos_connect_kwargs, 'show abc')
        self.assertTrue(success)
        self.assertTrue(self._is_command_invalid(result))

        success, result = ssh_run_command(cisco_nxos_connect_kwargs, ['terminal length 0', 'show version', 'show clock', 'exit'])
        self.assertTrue(success)
        self.assertIsInstance(result, list)

        success, result = ssh_run_command(cisco_nxos_connect_kwargs, ['show version', 'show clock'], {'last_result': True})
        self.assertTrue(success)
        self.assertIsInstance(result, str)

    def test_cisco_nxos_ssh_run_command_list(self):
        """
        测试ssh_run_command_list@cisco-nxos
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        success, result = ssh_run_command_list(cisco_nxos_connect_kwargs, ['show version', 'show clock'])
        self.assertTrue(success)
        self.assertIsInstance(result, list)

        success, result = ssh_run_command_list(cisco_nxos_connect_kwargs, ['show version', 'show clock'], {'last_result': True})
        self.assertTrue(success)
        self.assertIsInstance(result, str)

    def _test_cisco_ios_xe_ssh_run_command(self):
        """
        测试enable二次登录
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        # 1.enable  2.show
        success, result = ssh_run_command(cisco_ios_xe_connect_kwargs, 'show version')
        self.assertTrue(success)
        self.assertTrue(self._is_command_invalid(result))

        success, result = ssh_run_command_list(cisco_ios_xe_connect_kwargs, ['enable', 'show version'], {'last_result': True})
        self.assertTrue(success)
        self.assertIn("Cisco", result)

        cisco_ios_xe_connect_kwargs_pre = dict(cisco_ios_xe_connect_kwargs)
        cisco_ios_xe_connect_kwargs_pre['pre_commands'] = 'enable'
        success, result = ssh_run_command(cisco_ios_xe_connect_kwargs_pre, 'show version')
        self.assertTrue(success)
        self.assertIn("Cisco", result)

        # password as command
        pwd_as_command_hot = dict(cisco_ios_xe_connect_kwargs)
        secondary_password = pwd_as_command_hot.pop('secondary_password', None)
        with ssh_session(**pwd_as_command_hot) as ssh:
            result = ssh.run_command_list(['enable', secondary_password, 'show version'], last_result=True)
            self.assertIn("Cisco", result)

    def test_cisco_ios_xr_ssh_run_command(self):
        """
        测试terminal length 0 @ ios xr
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        success, result = ssh_run_command(cisco_ios_xr_connect_kwargs, 'show running-config')
        self.assertTrue(success)
        self.assertTrue('more' in (result.splitlines()[-1]).lower())

        success, result = ssh_run_command_list(cisco_ios_xr_connect_kwargs, ['terminal length 0','show running-config'],{'last_result':True})
        self.assertTrue(success)
        self.assertTrue(result.endswith('end'))

        cisco_ios_xr_connect_kwargs_pre = dict(cisco_ios_xr_connect_kwargs)
        cisco_ios_xr_connect_kwargs_pre['pre_commands'] = 'terminal length 0'
        success, result = ssh_run_command(cisco_ios_xr_connect_kwargs_pre, 'show running-config')
        self.assertTrue(success)
        self.assertTrue(result.endswith('end'))

    def test_linux_ssh_run_command(self):
        """
        测试sudo二次登录
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        # 1.enable  2.show
        success, result = ssh_run_command(linux_connect_kwargs, 'sudo ls -l')
        self.assertTrue(success)
        self.assertIn("total", result)
        # self.assertTrue(self._is_command_invalid(result))

    # ----------------------------------ssh_session----------------------------------
    def test_cisco_nxos_ssh_session(self):
        """
        测试with ssh_session
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        with ssh_session(**cisco_nxos_connect_kwargs) as ssh:
            result = ssh.run_command('show version')
            self.assertIn("Cisco", result)
            result = ssh.run_command_list(['show version', 'show clock'])
            self.assertIsInstance(result, list)
            result = ssh.run_command_list(['show version', 'show clock'], last_result=True)
            self.assertIsInstance(result, str)

    # ----------------------------------error----------------------------------
    def test_error(self):
        """
        测试登录&命令异常
        """
        print_test(inspect.currentframe().f_code.co_name, self)
        # command err
        success, result = ssh_run_command(cisco_nxos_connect_kwargs, 'show abc')
        self.assertTrue(success)
        self.assertTrue(self._is_command_invalid(result))
        # password err
        pwd_err_host = dict(cisco_nxos_connect_kwargs)
        pwd_err_host['password'] = 'abc'
        success, result = ssh_run_command(pwd_err_host, 'show version')
        self.assertFalse(success)
        self.assertIn("fail", result)

        with self.assertRaises(AuthenticationException):
            with ssh_session(**pwd_err_host) as ssh:
                ssh.run_command('show version')

        # timeout
        timeout_host = dict(cisco_nxos_connect_kwargs)
        timeout_host['hostname'] = '1.1.1.1'
        timeout_host['timeout'] = 2
        success, result = ssh_run_command(timeout_host, 'show version')
        self.assertFalse(success)
        self.assertIn("timed out", result)

        with self.assertRaises(SSHException):
            with ssh_session(**timeout_host) as ssh:
                ssh.run_command('show version')

    def _is_command_invalid(self, result):
        return any(sub in result for sub in ['Invalid command', "'^' marker.", 'ERROR:'])


if __name__ == '__main__':
    unittest.main()
