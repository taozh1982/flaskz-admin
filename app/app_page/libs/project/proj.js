//项目定制化
z.setDefault({
    FORM_VALIDATE_ERROR_CLASS: "is-invalid",
    FORM_VALIDATE_MESSAGE_CLASS: "invalid-feedback",

    PRO_GRID_OPERATE_UPDATE_CLASS: "btn btn-link color-primary",
    PRO_GRID_OPERATE_DELETE_CLASS: "btn btn-link color-danger",

    // PRO_AJAX_NOTIFY_OPTIONS: {position: "bottom_right"},

    PRO_CRUDTABLEPAGE_MODAL_OPTIONS: {open_animation: "z-animation-fadeInLeft", close_animation: "z-animation-fadeOutRight"},
    PRO_CRUDTABLEPAGE_NESTED_MODAL_OPTIONS: {open_animation: "z-animation-fadeInUp", close_animation: "z-animation-fadeOutDown"},

    DATE_LOCAL_TIMEZONE_OFFSET: null
});


var I18ns = {
    "_locales": ["en", "zh"],
    /***************************************pro***************************************/
    PRO_GRID_OPERATE_UPDATE_LABEL: ["<i class='fa fa-edit'></i> Edit", "<i class='fa fa-edit'></i> 编辑"],
    PRO_GRID_OPERATE_DELETE_LABEL: ["<i class='fa fa-trash-o'></i> Delete", "<i class='fa fa-trash-o'></i> 删除"],
    PRO_MESSAGE_DELETE_CONFIRM: ["<i class='fa fa-warning color-warning'></i> Confirm Delete?", "<i class='fa fa-warning color-warning'></i> 确认删除?"],
    PRO_MODAL_UPDATE_TITLE: ["<i class='fa fa-edit'></i> Edit", "<i class='fa fa-edit'></i> 编辑"],
    PRO_MODAL_ADD_TITLE: ["<i class='fa fa-plus-square'></i> Add", "<i class='fa fa-plus-square'></i> 添加"],
    PRO_MODAL_VIEW_TITLE: ["<i class='fa fa-file-text-o'></i> View", "<i class='fa fa-file-text-o'></i> 查看"],

    /***************************************common***************************************/
    COMMON_ACTION: ["Action", "操作"],
    COMMON_ACTION_ADD: ["Add", "添加"],
    COMMON_ACTION_DELETE: ["Delete", "删除"],
    COMMON_ACTION_UPDATE: ["Edit", "编辑"],
    COMMON_ACTION_SEARCH: ["Query", "查询"],
    COMMON_ACTION_FILTER: ["Filter", "过滤"],
    COMMON_ACTION_SELECT: ["Select", "选择"],
    COMMON_ACTION_SAVE: ["Save", "保存"],
    COMMON_ACTION_REFRESH: ["Refresh", "刷新"],
    COMMON_ACTION_RESET: ["Reset", "重置"],
    COMMON_ACTION_UPLOAD: ["Upload", "上传"],
    COMMON_ACTION_EXPORT: ["Export", "导出"],
    COMMON_ACTION_LOGIN: ["Login", "登录"],
    COMMON_ACTION_CLOSE: ["Close", "关闭"],

    COMMON_ACTION_OK: ["OK", "确认"],
    COMMON_ACTION_CANCEL: ["Cancel", "取消"],
    COMMON_ACTION_RETURN: ["Return", "返回"],

    COMMON_RESULT: ["Result", "结果"],
    COMMON_SUCCESS: ["Success", "成功"],
    COMMON_FAIL: ["Fail", "失败"],
    COMMON_EXCEPTION: ["Exception", "异常"],
    COMMON_ERROR: ["Error", "错误"],

    COMMON_NAME: ["Name", "名称"],
    COMMON_PASSWORD: ["Password", "密码"],
    COMMON_DESCRIPTION: ["Description", "备注"],
    COMMON_TYPE: ["Type", "类型"],
    COMMON_STATUS: ["Status", "状态"],
    COMMON_TIME: ["Time", "时间"],
    COMMON_CREATED_AT: ["Created Time", "创建时间"],
    COMMON_UPDATED_AT: ["Updated Time", "更新时间"],
    COMMON_EDITED_AT: ["Edited Time", "编辑时间"],

    COMMON_ALL: ["All", "全部"],
    COMMON_NO_DATA: ["No data", "数据为空"],
    COMMON_DEFAULT: ["Default", "默认"],

    COMMON_WEEK_DAYS: [
        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]],
    COMMON_MONTHS: [
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]],

    /***************************************framework***************************************/
    //login
    LOGIN_USERNAME: ["Username", "账号"],
    LOGIN_PASSWORD: ["Password", "密码"],
    LOGIN_LOCALE: ["Language", "语言"],
    LOGIN_ACTION_LOGIN: ["Login", "登录"],
    LOGIN_REMEMBER_ME: ["Remember me", "保持登录"],
    LOGIN_USERNAME_REQUIRED: ["Please enter username", "请输入账号"],
    LOGIN_PASSWORD_REQUIRED: ["Please enter password", "请输入密码"],
    LOGIN_REQUIRED: ["Please login", "请先登录!!"],
    //homepage
    SYSTEM_TITLE: ["Flaskz Admin", "Flaskz 管理系统"],
    HOMEPAGE_REFRESH_CURRENT: ["Refresh current page", "刷新当前页面"],
    HOMEPAGE_ACCOUNT_EDIT: ["Profile", "账号编辑"],
    HOMEPAGE_API_DOC: ["API Doc", "API文档"],
    HOMEPAGE_ABOUT: ["About", "关于"],
    HOMEPAGE_LOGOUT: ["Logout", "退出"],
    HOMEPAGE_QUERY_ACCOUNT: ["Load account", "加载账户信息"]
}

z.util.mergeObject(I18ns, {
    //Sys Users
    SYS_USERS_TITLE: ["Users", "用户列表"],
    SYS_USERS_USERNAME: ["Username", "用户名"],
    SYS_USERS_ROLE: ["Role", "角色"],
    SYS_USERS_NAME: ["Name", "姓名"],
    SYS_USERS_PHONE: ["Phone", "电话"],
    SYS_USERS_LAST_LOGIN_AT: ["Last Login Time", "上次登录时间"],
    SYS_USERS_LOGIN_TIMES: ["Login Times", "登录次数"],
    SYS_USERS_ENABLE: ["Enable", "启用"],
    SYS_USERS_DISABLE: ["Disabled", "停用"],
    SYS_USERS_ENABLED: ["Enabled", "已启用"],
    SYS_USERS_DISABLED: ["Disabled", "已停用"],
    SYS_USERS_ENABLE_CONFIRM: ["<i class='fa fa-warning color-warning'></i> Confirm to enable?", "<i class='fa fa-warning color-warning'></i> 确认启用?"],
    SYS_USERS_DISABLE_CONFIRM: ["<i class='fa fa-warning color-warning'></i> Confirm to disable?", "<i class='fa fa-warning color-warning'></i> 确认停用?"],
    SYS_USERS_SHOW_PASSWORD: ["Show", "显示"],
    SYS_USERS_CONFIRM_PASSWORD: ["Confirm Password", "确认密码"],
    AJAX_STATUS_LAST_ADMIN_USER_NOT_ALLOWED: ["The user is the last that can manage roles", "当前是最后一个有角色管理权限的用户"],

    //Sys Roles
    SYS_ROLES_TITLE: ["Roles", "角色列表"],
    SYS_ROLES_NAME: ["Name", "角色名称"],
    SYS_ROLES_MODULES: ["Modules", "权限列表"],
    SYS_ROLES_MODULES_REQUIRED: ["Please select modules", "请选择功能模块"],
    SYS_ROLES_MODULE: ["Modules<small class='color-secondary'>(* mean no menu)</small>", "模块<small class='color-secondary'>(*表示没有菜单)</small>"],
    SYS_ROLES_MODULE_ACTIONS: ["Actions", "操作权限"],
    AJAX_STATUS_LAST_ADMIN_ROLE_NOT_ALLOWED: ["The role is the last that can manage roles", "当前是最后一个有角色管理权限的角色"],

    //Sys/Licenses
    SYS_LICENSES_TITLE: ["Licenses", "系统授权"],
    SYS_LICENSES_USER: ["User", "用户"],
    SYS_LICENSES_TYPE: ["Type", "类型"],
    SYS_LICENSES_TYPE_EVALUATION: ["EVALUATION", "评估版"],
    SYS_LICENSES_TYPE_RUNTIME: ["RUNTIME", "运行版"],
    SYS_LICENSES_START_END_DATE: ["Start Date - End Date", "起止时间"],
    SYS_LICENSES_UPLOADED_AT: ["Uploaded Time", "上传时间"],
    SYS_LICENSES_FILE: ["License File", "License文件"],
    SYS_LICENSES_FILE_REQUIRED: ["Please select the license file", "请选择License文件"],
    SYS_LICENSES_UPLOAD_SUCCESS_MSG: ["Upload successful", "License上传成功"],

    //Sys/Action Logs
    SYS_ACTION_LOGS_TITLE: ["Action Logs", "操作日志"],
    SYS_ACTION_LOGS_MODULE: ["Module", "模块"],
    SYS_ACTION_LOGS_USER: ["User", "用户"],
    SYS_ACTION_LOGS_IP: ["IP Address", "IP地址"],
    SYS_ACTION_LOGS_ACTION_RESULT: ["Action Result", "操作结果"],
    SYS_ACTION_LOGS_REQ_RESULT: ["Req Data", "请求数据"],
    SYS_ACTION_LOGS_RES_RESULT: ["Res Data", "结果数据"],
    SYS_ACTION_LOGS_AT: ["Time", "时间"],
    SYS_ACTION_LOGS_PREVIOUS_24_HOURS: ["Last 24 hours", "最近24小时"],
    SYS_ACTION_LOGS_PREVIOUS_7_DAYS: ["Last 7 days", "最近7天"],
    SYS_ACTION_LOGS_PREVIOUS_30_DAYS: ["Last 30 days", "最近30天"],

    //Sys/Options
    SYS_OPTIONS_TITLE: ["Options", "系统选项"],
    SYS_OPTIONS_CATEGORY: ["Category", "分类"],
    SYS_OPTIONS_LABEL: ["Label", "标签"],
    SYS_OPTIONS_KEY: ["Option", "选项"],
    SYS_OPTIONS_VALUE: ["Value", "值"]
});

z.util.mergeObject(I18ns, {
    //menu
    MODULE_SYSTEM: ["<i class='fa fa-gears'></i>System", "<i class='fa fa-gears'></i>系统管理"],
    MODULE_USERS: ["Users", "用户列表"],
    MODULE_ROLES: ["Roles", "角色列表"],
    MODULE_LICENSES: ["Licenses", "系统授权"],
    MODULE_ACTION_LOGS: ["Action Logs", "操作日志"],
    MODULE_OPTIONS: ["Options", "系统选项"]
});

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


/**
 * ajax请求url
 */
var AjaxUrl = {
    sys_roles: {
        query: "/sys-mgmt/roles/",
        add: "/sys-mgmt/roles/",
        delete: "/sys-mgmt/roles/[id]",
        update: "/sys-mgmt/roles/"
    },
    sys_users: {
        query: "/sys-mgmt/users/multi/",
        add: "/sys-mgmt/users/",
        delete: "/sys-mgmt/users/[id]",
        update: "/sys-mgmt/users/"
    },
    sys_licenses: {
        query: "/sys-mgmt/licenses/",
        add: {url: "/sys-mgmt/licenses/", method: "POST"}
    },
    sys_action_logs: {
        query: {url: "/sys-mgmt/action-logs/pss/", method: "POST"},
        modules: "/sys-mgmt/modules/"
    },
    sys_options: {
        query: "/sys-mgmt/sys-options/",
        update: "/sys-mgmt/sys-options/"
    },
    sys_auth: {
        // login: {url: "/sys-mgmt/auth/login/", method: "POST"},
        login: {url: "/sys-mgmt/auth/token/", method: "POST"},
        logout: {url: "/sys-mgmt/auth/logout/", method: "GET"},

        query: "/sys-mgmt/auth/account/",
        update: "/sys-mgmt/auth/account/"
    }
};
z.util.mergeObject(AjaxUrl, {
    ex_simples: {
        query: "/api/v1.0/ex-simples/",
        add: "/api/v1.0/ex-simples/",
        delete: "/api/v1.0/ex-simples/[id]",
        update: "/api/v1.0/ex-simples/",
        download: "/api/v1.0/ex-simples/download/"
    },
    ex_departments: {
        query: "/api/v1.0/ex-departments/",
        add: "/api/v1.0/ex-departments/",
        delete: "/api/v1.0/ex-departments/[id]",
        update: "/api/v1.0/ex-departments/"
    },
    ex_employees: {
        query: {url: "/api/v1.0/ex-employees/pss/", method: "POST"},
        add: "/api/v1.0/ex-employees/",
        delete: "/api/v1.0/ex-employees/[id]",
        bulk_delete: {url: "/api/v1.0/ex-employees/bulk/", method: "DELETE"},
        update: "/api/v1.0/ex-employees/"
    }
})

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
                            z.widget.alert(z.i18n.t("LOGIN_REQUIRED"), z.i18n.t("PRO_MESSAGE_TIPS"), function (result) {//callback
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




