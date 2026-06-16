import os
import smtplib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from jinja2 import Template


def send_email(smtp_server, account, to_addr, subject, template_file, data, cc_addr=None, bcc_addr=None, attachment_file=None):
    """
    Example:
        success, result = send_email(
            {'host': 'your_smtp_server', 'port': '465'},  # SMTP server
            {'user': 'your_email', 'password': 'your_password', 'name': 'your_name'},  # Account
            ['to_email1', 'to_email2'],  # Recipient(s)
            'For Test-Z',  # Subject
            './email_tpl.html',  # render template path
            {  # render data
                'summary': 'hello',
                'alarms': [{'name': 'aaa', 'value': 33}, {'name': 'bbb', 'value': 73}]
            },
            cc_addr=['cc_email1', 'cc_email2'],  # Cc Recipients(s)
            bcc_addr=['bcc_email1', 'bcc_email2'],  # Bcc Recipients(s)
            attachment_file=['./device.xlsx', './site.xlsx']  # # attachment file(s) path
        )

    """
    addrs = _get_addrs(to_addr, cc_addr, bcc_addr)
    server = None
    try:
        msg = _create_msg(account, addrs, subject, template_file, data, attachment_file)
        if type(smtp_server) is not dict:
            smtp_server = {
                'host': smtp_server
            }
        server = smtplib.SMTP_SSL(**smtp_server)
        server.login(account.get('user'), account.get('password'))
        result = server.sendmail(account.get('user'), addrs.get('list'), msg.as_string())
        return True, result
    except Exception as e:
        return False, str(e)
    finally:
        if server:
            try:
                server.quit()
            except Exception:
                pass


def _get_addrs(to_addr, cc_addr=None, bcc_addr=None):
    to_addr_list = []
    cc_addr_list = []
    bcc_addr_list = []
    if type(to_addr) is not list:
        to_addr_list = [to_addr]
    if cc_addr:
        if type(cc_addr) is not list:
            cc_addr_list = [cc_addr]
        else:
            cc_addr_list = cc_addr
    if bcc_addr:
        if type(bcc_addr) is not list:
            bcc_addr_list = [bcc_addr]
        else:
            bcc_addr_list = bcc_addr

    all_list = to_addr_list + cc_addr_list + bcc_addr_list
    all_list = [item for item in all_list if item]
    all_list = list(set(all_list))

    return {
        'to': ', '.join(to_addr_list),
        'cc': ', '.join(cc_addr_list),
        'bcc': ', '.join(bcc_addr_list),
        'list': all_list
    }


def _create_msg(smtp_auth, addrs, subject, template_file, data, attachment_file):
    name = smtp_auth.get('name')
    user = smtp_auth.get('user')
    if name:
        msg_from = name + ' <' + user + '>'
    else:
        msg_from = user

    with open(template_file, 'r', encoding='utf-8') as file:
        html_template = file.read()
    data = data or {}
    html_content = Template(html_template).render(**data)
    attachment_files = []
    if attachment_file:
        if type(attachment_file) is not list:
            attachment_file = [attachment_file]
        for attach_file in attachment_file:
            if attach_file:
                with open(attach_file, 'rb') as attachment:
                    _attach_file = MIMEApplication(attachment.read(), Name=os.path.basename(attach_file))
                    _attach_file['Content-Disposition'] = f'attachment; filename="{os.path.basename(attach_file)}"'
                    attachment_files.append(_attach_file)

    msg = MIMEMultipart()
    msg['From'] = msg_from
    msg['Subject'] = subject
    msg['To'] = addrs.get('to')
    if addrs.get('cc'):
        msg['Cc'] = addrs.get('cc')
    msg.attach(MIMEText(html_content, 'html'))
    if attachment_files:
        for item in attachment_files:
            msg.attach(item)

    return msg
