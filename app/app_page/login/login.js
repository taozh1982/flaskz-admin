var Login = {
    init: function () {
        this.form = z.form.Form(".content");
        this.initController();
    },
    initController: function () {
        z.dom.event.onclick("#loginBtn", this._login, this);
        z.dom.event.on("#usernameInput", "keydown.Enter", function () {
            z.dom.focus("#pwdInput")
        });
        z.dom.event.on("#pwdInput", "keydown.Enter", this._login, this);
    },
    _login: function () {
        var value = this.form.getValue();
        if (value == null) {
            return
        }
        pro.AjaxCRUD.ajax({
            url: AjaxUrl.sys_auth.login,
            data: value,
            tips: "登录",
            success_notify: false,
            fail_notify: false,
            error: function (result) {
                z.dom.setValue("#errDiv", result.message || "");
                z.dom.focus("#usernameInput");
            },
            success: function (result) {
                if (result.data) {
                    var data = result.data;
                    var token;
                    if (z.util.isString(data)) {
                        token = data;
                    } else if (z.util.isObject(data)) {
                        token = data.token;
                    }
                    if (token) {
                        z.bom.setLocalStorage("auth-token", token);
                    }
                }
                window.location.href = "/index";
            }
        })
    }
};
z.ready(function () {
    Login.init()
});