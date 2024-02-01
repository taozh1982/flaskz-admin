var Login = {
    init: function () {
        this.form = z.form.Form(".content");
        this.initController();
        console.log('abc');
    },
    initController: function () {
        z.dom.event.onclick("#loginBtn", this._login, this);
        z.dom.event.on("#usernameInput", "keydown.Enter", function () {
            z.dom.focus("#pwdInput")
        });
        z.dom.event.on("#pwdInput", "keydown.Enter", this._login, this);
        this._initLocaleController();
    },
    _initLocaleController: function () {
        if (!z.dom.query("#localeSelect")) {
            return;
        }
        z.dom.event.onchange("#localeSelect", this._updateLocale, this);

        var locale = z.bom.getLocalStorage("locale") || pro.DomI18n.getBomLang();
        if (locale.toLowerCase().indexOf("zh") >= 0) {
            locale = "zh";
        } else {
            locale = "en";
        }
        z.dom.setValue("#localeSelect", locale);
        this._updateLocale();
    },
    _updateLocale: function () {
        var locale = z.dom.getValue("#localeSelect")
        z.bom.setLocalStorage("locale", locale);
        pro.DomI18n.initI18n({locale: locale});
        this.form.update();
        this.form.getValidator().reset();
    },
    _login: function () {
        var value = this.form.getValue();
        if (value == null) {
            return
        }
        pro.AjaxCRUD.ajax({
            url: AjaxUrl.sys_auth.login,
            data: value,
            tips: z.i18n.t('LOGIN_ACTION_LOGIN'),
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