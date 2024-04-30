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
        msg = z.i18n.t(i18n_key);
    }
    return msg || result.message;
};
z.i18n.setLocale(pro.DomI18n.getBomLocale() || pro.DomI18n.getBomLang() || "zh");
z.ready(function () {
    pro.DomI18n.initI18n();
    if (pro.template.CRUDTablePage && pro.template.CRUDTablePage.form) {
        pro.template.CRUDTablePage.form.update();
    }
});
