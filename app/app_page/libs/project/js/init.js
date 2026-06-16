//项目定制化
z.setDefault({
    FORM_VALIDATE_ERROR_CLASS: "is-invalid",
    FORM_VALIDATE_MESSAGE_CLASS: "invalid-feedback",

    PRO_GRID_OPERATE_UPDATE_CLASS: "btn btn-link color-primary",
    PRO_GRID_OPERATE_DELETE_CLASS: "btn btn-link color-danger",

    // PRO_AJAX_NOTIFY_OPTIONS: {position: "bottom_right"},

    PRO_CRUDTABLEPAGE_MODAL_OPTIONS: {
        open_animation: "z-animation-fadeInLeft", close_animation: "z-animation-fadeOutRight"
    },
    PRO_CRUDTABLEPAGE_NESTED_MODAL_OPTIONS: {
        open_animation: "z-animation-fadeInUp", close_animation: "z-animation-fadeOutDown"
    },

    DATE_LOCAL_TIMEZONE_OFFSET: null
});

z.form.Validator.registerRule("account", function (element, param) {
    return /^[a-zA-Z0-9_\-.]{3,}$/.test(z.dom.getValue(element));
}, {
    zh: "至少包含3个字符，且只能包含字母、数字、下划线、中划线和点",
    en: "At least 3 characters and only letters, numbers, underscores, and periods are allowed"
});

var _getSysLocale = function () {
    var locale = (z.bom.getLocalStorage("locale") || pro.DomI18n.getBomLocale() || pro.DomI18n.getBomLang() || "").toLowerCase();
    var langMap = {
        "zh-hk": "zh-Hant",
        "zh-tw": "zh-Hant",
        "zh-cn": "zh",

        // 已经设置了locale的情况
        "zh-hant": "zh-Hant",
        "zh": "zh"
    }
    return langMap[locale] || "en";
}