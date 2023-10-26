## 关于

第三方授权认证

除了系统默认的基于RBAC的用户授权认证，系统还可以结合第三方的授权认证一起使用

## 使用

1. 安装`tacacs_plus`
   ```shell
   pip install tacacs_plus
   ```
2. 添加数据库表模型`SysAuthMode`
3. `app/sys_init/status_codes.py`添加以下状态代码
   ```python
   auth_mode_not_allowed = 'auth_mode_not_allowed', '认证模式不支持'
   auth_local_role_not_found = 'aaa_local_role_not_found', '获取系统角色失败'
   auth_tacacs_config_err = 'aaa_tacacs_config_err', 'TACACS配置错误'
   auth_tacacs_auth_fail = 'aaa_tacacs_auth_fail', 'TACACS认证失败'
   ```
4. 替换登录API `[POST] http://{{server}}/sys-mgmt/auth/aaa/`

## 授权过程

1. authenticate: 验证账号/密码
2. authorize: 获取角色
3. 创建/更新本地账号(tacacs)