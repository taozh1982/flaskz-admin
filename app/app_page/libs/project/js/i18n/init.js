z.i18n.init({
    en: I18n_EN,
    zh: I18n_ZH
});
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