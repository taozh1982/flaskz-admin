var refreshMenuByPath = function (paths) {
    var admin = window.top.Admin;
    if (admin) {
        admin.refreshMenu(paths)
    }
};
if (z.bom.browser === "Safari") {
    z.ready(function () {
        var fk_safari_style = z.dom.create("<style type='text/css'>.fk-safari {cursor: auto}</style>")
        document.head.appendChild(fk_safari_style);
        z.util.callLater(function () {
            document.head.removeChild(fk_safari_style);
        }, 10)
    })
}

z.setDefault({
    "AJAX_BEFORE_SEND": function (httpRequest) {
        httpRequest.setRequestHeader("Authorization", z.bom.getLocalStorage("auth-token"));
    },
    "AJAX_COMPLETE": function (httpRequest) {
        var status = httpRequest.status;
        if (status === 200) {
            var responseType = httpRequest.responseType;
            if (responseType === "" || responseType === "text") {
                try {
                    var result = JSON.parse(httpRequest.responseText);
                    if (result.status !== z.getDefault("PRO_AJAX_SUCCESS_STATE") && result.status_code === 'uri_unauthorized') {
                        var hash = z.bom.getLocationHash()
                        if (hash) {
                            z.bom.setSessionStorage('selected_menu', hash);
                        }
                        var pathname = window.location.pathname;
                        if (pathname === "/" || pathname === "/index" || pathname === "index") {
                            window.top.location.href = "/login";
                        } else {
                            z.widget.alert(z.i18n("LOGIN_REQUIRED"), z.i18n("PRO_MESSAGE_TIPS"), function (result) {//callback
                                z.widget.notify(false);
                                if (window.top.Admin && window.top.Admin.showLoginModal) {
                                    window.top.Admin.showLoginModal();
                                } else {
                                    window.top.location.href = "/login";
                                }
                            });
                        }
                    }
                } catch (err) {
                }
            }
        }
    }
});

/*
if (pro) {
    var _createGrid = pro.template.CRUDTablePage._createGrid;
    pro.template.CRUDTablePage._createGrid = function () {
        var grid = _createGrid.apply(pro.template.CRUDTablePage, arguments);
        var pagination = this.gridPagination;
        if (pagination) {
            pagination.set("total_template", "<%start%>-<%end%> | <%total%>  跳转至<input id='jumpInput' class='sizes' style='width:2.6em'>页");
            var _updateTotalInfo = pagination._updateTotalInfo
            pagination._updateTotalInfo = function () {
                _updateTotalInfo.apply(pagination, arguments);
                var jumpInput = z.dom.query("#jumpInput", pagination.getRoot());
                if (jumpInput && jumpInput._inited !== true) {
                    jumpInput._inited = true;
                    z.dom.event.onchange(jumpInput, function () {
                        var pageConfig = pagination.getPageConfig();
                        var index = Math.min(Math.max(1, jumpInput.value | 0), pageConfig.number);
                        pagination.set("page_index", index);
                        jumpInput.value = "";
                    });
                }
            }
        }
        return grid;
    }
}
*/


/*
z.ajax.setup({
    beforeSend: function (httpRequest) {
        httpRequest.setRequestHeader("Authorization", z.bom.getLocalStorage("auth-token"));
    },
    complete: function (httpRequest) {
        var status = httpRequest.status;
        if (status === 200) {
            var responseType = httpRequest.responseType;
            if (responseType === "" || responseType === "text") {
                var result = JSON.parse(httpRequest.responseText);
                if (result.status !== z.getDefault("PRO_AJAX_SUCCESS_STATE") && result.status_code === 'uri_unauthorized') {
                    var pathname = window.location.pathname;
                    if (pathname === "/" || pathname === "/index" || pathname === "index") {
                        window.top.location.href = "/login";
                    } else {
                        z.widget.alert("请先登录!!", "提示", function (result) {//callback
                            window.top.location.href = "/login";
                        });
                    }
                }
            }
        }
    }
});*/

if (window.I18ns) {//all in one
    var _locales = I18ns._locales || [];
    var locales_map = {};
    _locales.forEach(function (item) {
        locales_map[item] = [];
    })
    z.util.eachObject(I18ns, function (key, values) {
        if (key !== "_locales") {
            values.forEach(function (item, index) {
                if (index < _locales.length) {
                    locales_map[_locales[index]][key] = item
                }
            })
        }
    });
    z.i18n.init(locales_map);
}
//multiple files
if (window.I18n_EN) {
    z.i18n.init({en: I18n_EN});
}
if (window.I18n_ZH) {
    z.i18n.init({zh: I18n_ZH});
}

pro.AjaxCRUD.getResponseMessage = function (result) {
    var msg;
    var status_code = result.status_code;
    if (status_code) {
        var i18n_key = "AJAX_STATUS_" + status_code.replace(/-/g, '_').toUpperCase();
        msg = z.i18n(i18n_key);
    }
    return msg || result.message;
};
// z.i18n.setLocale(pro.DomI18n.getBomLocale() || pro.DomI18n.getBomLang() || "zh");
z.i18n.setLocale(_getSysLocale());
z.ready(function () {
    pro.DomI18n.initI18n();
    if (pro.template.CRUDTablePage && pro.template.CRUDTablePage.form) {
        pro.template.CRUDTablePage.form.update();
    }
});

