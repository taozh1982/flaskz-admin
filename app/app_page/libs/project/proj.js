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


var I18n_EN = {
    /***************************************pro***************************************/
    PRO_GRID_OPERATE_UPDATE_LABEL: "<i class='fa fa-edit'></i> Edit",
    PRO_GRID_OPERATE_DELETE_LABEL: "<i class='fa fa-trash-o'></i> Delete",
    PRO_MESSAGE_DELETE_CONFIRM: "<i class='fa fa-warning color-warning'></i> Confirm Delete?",
    PRO_MODAL_UPDATE_TITLE: "<i class='fa fa-edit'></i> Edit",
    PRO_MODAL_ADD_TITLE: "<i class='fa fa-plus-square'></i> Add",
    PRO_MODAL_VIEW_TITLE: "<i class='fa fa-file-text-o'></i> View",

    /***************************************common***************************************/
    COMMON_ACTION: "Action",
    COMMON_ACTION_ADD: "Add",
    COMMON_ACTION_DELETE: "Delete",
    COMMON_ACTION_UPDATE: "Edit",
    COMMON_ACTION_SEARCH: "Query",
    COMMON_ACTION_FILTER: "Filter",
    COMMON_ACTION_OK: "OK",
    COMMON_ACTION_CANCEL: "Cancel",
    COMMON_ACTION_RETURN: "Return",
    COMMON_ACTION_CLOSE: "Close",
    COMMON_ACTION_SAVE: "Save",
    COMMON_ACTION_REFRESH: "Refresh",
    COMMON_ACTION_UPLOAD: "Upload",
    COMMON_ACTION_LOGIN: "Login",

    COMMON_NAME: "Name",
    COMMON_PASSWORD: "Password",
    COMMON_DESCRIPTION: "Description",
    COMMON_TYPE: "Type",
    COMMON_STATUS: "Status",
    COMMON_CREATED_AT: "Created At",
    COMMON_UPDATED_AT: "Updated At",
    COMMON_SUCCESS: "Success",
    COMMON_FAIL: "Fail",
    COMMON_ALL: "All",

    /***************************************framework***************************************/
    //login
    LOGIN_USERNAME: "Username",
    LOGIN_PASSWORD: "Password",
    LOGIN_LOCALE: "Language",
    LOGIN_ACTION_LOGIN: "Login",
    LOGIN_REMEMBER_ME: "Remember me",
    LOGIN_USERNAME_REQUIRED: "Please enter username",
    LOGIN_PASSWORD_REQUIRED: "Please enter password",
    LOGIN_REQUIRED: "Please login",
    //homepage
    SYSTEM_TITLE: "Flaskz Admin",
    HOMEPAGE_REFRESH_CURRENT: "Refresh current page",
    HOMEPAGE_ACCOUNT_EDIT: "Profile",
    HOMEPAGE_API_DOC: "API Doc",
    HOMEPAGE_ABOUT: "About",
    HOMEPAGE_LOGOUT: "Logout",
    HOMEPAGE_QUERY_ACCOUNT: "Load account",
    //menu
    MODULE_SYSTEM: "System",
    MODULE_USERS: "Users",
    MODULE_ROLES: "Roles",
    MODULE_Licenses: "Licenses",
    MODULE_ACTION_LOGS: "Action Logs",

    /***************************************modules***************************************/
    //Sys Users
    SYS_USER_TITLE: "Users",
    SYS_USER_USERNAME: "Username",
    SYS_USER_ROLE: "Role",
    SYS_USER_NAME: "Name",
    SYS_USER_PHONE: "Phone",
    SYS_USER_LAST_LOGIN_AT: "Last Login At",
    SYS_USER_LOGIN_TIMES: "Login Times",
    SYS_USER_ENABLE: "Enable",
    SYS_USER_DISABLE: "Disabled",
    SYS_USER_ENABLE_CONFIRM: "Confirm to enable",
    SYS_USER_DISABLE_CONFIRM: "Confirm to disable",
    SYS_USER_SHOW_PASSWORD: "Show",
    //Sys Roles
    SYS_ROLE_TITLE: "Roles",
    SYS_ROLE_NAME: "Name",
    SYS_ROLE_MODULES: "Modules",
    SYS_ROLE_MODULES_REQUIRED: "Please select modules",
    SYS_ROLE_MODULE: "Modules<small class='color-secondary'>(* mean no menu)</small>",
    SYS_ROLE_MODULE_ACTIONS: "Actions",
    //Sys/Licenses
    SYS_LICENSES_TITLE: "Licenses",
    SYS_LICENSES_USER: "User",
    SYS_LICENSES_TYPE: "Type",
    SYS_LICENSES_TYPE_EVALUATION: "EVALUATION",
    SYS_LICENSES_TYPE_RUNTIME: "RUNTIME",
    SYS_LICENSES_START_END_DATE: "Start Date - End Date",
    SYS_LICENSES_UPLOAD_AT: "Upload At",
    SYS_LICENSES_FILE: "License File",
    SYS_LICENSES_FILE_REQUIRED: "Please select the license file",
    SYS_LICENSES_UPLOAD_SUCCESS_MSG: "Upload successful",

    //Sys/Action Logs
    SYS_ACTION_LOGS_TITLE: "Action Logs",
    SYS_ACTION_LOGS_MODULE: "Module",
    SYS_ACTION_LOGS_USER: "User",
    SYS_ACTION_LOGS_IP: "IP Address",
    SYS_ACTION_LOGS_ACTION_RESULT: "Action Result",
    SYS_ACTION_LOGS_REQ_RESULT: "Req Data",
    SYS_ACTION_LOGS_RES_RESULT: "Res Data",
    SYS_ACTION_LOGS_AT: "Time",
    SYS_ACTION_LOGS_PREVIOUS_24_HOURS: "Last 24 hours",
    SYS_ACTION_LOGS_PREVIOUS_7_DAYS: "Last 7 days",
    SYS_ACTION_LOGS_PREVIOUS_30_DAYS: "Last 30 days"
}

var I18n_ZH = {
    /***************************************pro***************************************/
    PRO_GRID_OPERATE_UPDATE_LABEL: "<i class='fa fa-edit'></i> 编辑",
    PRO_GRID_OPERATE_DELETE_LABEL: "<i class='fa fa-trash-o'></i> 删除",
    PRO_MESSAGE_DELETE_CONFIRM: "<i class='fa fa-warning color-warning'></i> 确认删除?",
    PRO_MODAL_UPDATE_TITLE: "<i class='fa fa-edit'></i> 编辑",
    PRO_MODAL_ADD_TITLE: "<i class='fa fa-plus-square'></i> 添加",
    PRO_MODAL_VIEW_TITLE: "<i class='fa fa-file-text-o'></i> 查看",

    /***************************************通用***************************************/
    COMMON_ACTION: "操作",
    COMMON_ACTION_ADD: "添加",
    COMMON_ACTION_DELETE: "删除",
    COMMON_ACTION_UPDATE: "编辑",
    COMMON_ACTION_SEARCH: "查询",
    COMMON_ACTION_FILTER: "过滤",
    COMMON_ACTION_OK: "确认",
    COMMON_ACTION_CANCEL: "取消",
    COMMON_ACTION_RETURN: "返回",
    COMMON_ACTION_CLOSE: "关闭",
    COMMON_ACTION_SAVE: "保存",
    COMMON_ACTION_REFRESH: "刷新",
    COMMON_ACTION_UPLOAD: "上传",
    COMMON_ACTION_LOGIN: "登录",

    COMMON_NAME: "名称",
    COMMON_PASSWORD: "密码",
    COMMON_DESCRIPTION: "备注",
    COMMON_TYPE: "类型",
    COMMON_STATUS: "状态",
    COMMON_CREATED_AT: "创建时间",
    COMMON_UPDATED_AT: "编辑时间",
    COMMON_SUCCESS: "成功",
    COMMON_FAIL: "失败",
    COMMON_ALL: "全部",

    /***************************************框架***************************************/
    //登录
    LOGIN_USERNAME: "账号",
    LOGIN_PASSWORD: "密码",
    LOGIN_LOCALE: "语言",
    LOGIN_ACTION_LOGIN: "登录",
    LOGIN_REMEMBER_ME: "保持登录",
    LOGIN_USERNAME_REQUIRED: "请输入账号",
    LOGIN_PASSWORD_REQUIRED: "请输入密码",
    LOGIN_REQUIRED: "请先登录!!",
    //首页
    SYSTEM_TITLE: "Flaskz 管理系统",
    HOMEPAGE_REFRESH_CURRENT: "刷新当前页面",
    HOMEPAGE_ACCOUNT_EDIT: "账号编辑",
    HOMEPAGE_API_DOC: "API文档",
    HOMEPAGE_ABOUT: "关于",
    HOMEPAGE_LOGOUT: "退出",
    HOMEPAGE_QUERY_ACCOUNT: "加载账户信息",
    //菜单/模块
    MODULE_SYSTEM: "系统管理",
    MODULE_USERS: "用户列表",
    MODULE_ROLES: "角色列表",
    MODULE_Licenses: "Licenses",
    MODULE_ACTION_LOGS: "操作日志",

    /***************************************模块***************************************/
    //系统管理/用户列表
    SYS_USER_TITLE: "用户列表",
    SYS_USER_USERNAME: "用户名",
    SYS_USER_ROLE: "角色",
    SYS_USER_NAME: "姓名",
    SYS_USER_PHONE: "电话",
    SYS_USER_LAST_LOGIN_AT: "最后登录时间",
    SYS_USER_LOGIN_TIMES: "登录次数",
    SYS_USER_ENABLE: "启用",
    SYS_USER_DISABLE: "停用",
    SYS_USER_ENABLE_CONFIRM: "确认启用",
    SYS_USER_DISABLE_CONFIRM: "确认停用",
    SYS_USER_SHOW_PASSWORD: "显示",
    //系统管理/角色列表
    SYS_ROLE_TITLE: "角色列表",
    SYS_ROLE_NAME: "角色名称",
    SYS_ROLE_MODULES: "权限列表",
    SYS_ROLE_MODULES_REQUIRED: "请选择功能模块",
    SYS_ROLE_MODULE: "模块<small class='color-secondary'>(*表示没有菜单)</small>",
    SYS_ROLE_MODULE_ACTIONS: "操作权限",
    //系统管理/Licenses
    SYS_LICENSES_TITLE: "系统授权",
    SYS_LICENSES_USER: "用户",
    SYS_LICENSES_TYPE: "类型",
    SYS_LICENSES_TYPE_EVALUATION: "评估版",
    SYS_LICENSES_TYPE_RUNTIME: "运行版",
    SYS_LICENSES_START_END_DATE: "起止时间",
    SYS_LICENSES_UPLOAD_AT: "上传时间",
    SYS_LICENSES_FILE: "License文件",
    SYS_LICENSES_FILE_REQUIRED: "请选择License文件",
    SYS_LICENSES_UPLOAD_SUCCESS_MSG: "License上传成功",
    //系统管理/操作日志
    SYS_ACTION_LOGS_TITLE: "操作日志",
    SYS_ACTION_LOGS_MODULE: "模块",
    SYS_ACTION_LOGS_USER: "用户",
    SYS_ACTION_LOGS_IP: "IP地址",
    SYS_ACTION_LOGS_ACTION_RESULT: "操作结果",
    SYS_ACTION_LOGS_REQ_RESULT: "请求数据",
    SYS_ACTION_LOGS_RES_RESULT: "结果数据",
    SYS_ACTION_LOGS_AT: "时间",
    SYS_ACTION_LOGS_PREVIOUS_24_HOURS: "最近24小时",
    SYS_ACTION_LOGS_PREVIOUS_7_DAYS: "最近7天",
    SYS_ACTION_LOGS_PREVIOUS_30_DAYS: "最近30天"
}

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

/**
 * ajax请求url
 */
var AjaxUrl = {
    ex_simples: {
        query: "/api/v1.0/ex-simples/",
        add: "/api/v1.0/ex-simples/",
        delete: "/api/v1.0/ex-simples/[id]",
        update: "/api/v1.0/ex-simples/"
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
        bulk_delete: {url: "/api/v1.0/ex-employees/bulk-delete/", method: "POST"},
        update: "/api/v1.0/ex-employees/"
    },

    sys_role: {
        query: "/sys-mgmt/roles/",
        add: "/sys-mgmt/roles/",
        delete: "/sys-mgmt/roles/[id]",
        update: "/sys-mgmt/roles/"
    },
    sys_user: {
        query: "/sys-mgmt/users/multi/",
        add: "/sys-mgmt/users/",
        delete: "/sys-mgmt/users/[id]",
        update: "/sys-mgmt/users/"
    },
    sys_license: {
        query: "/sys-mgmt/licenses/",
        add: {url: "/sys-mgmt/licenses/", method: "POST"}
    },
    sys_action_log: {
        query: {url: "/sys-mgmt/action-logs/pss/", method: "POST"},
        modules: "/sys-mgmt/modules/"
    },
    sys_auth: {
        // login: {url: "/sys-mgmt/auth/login/", method: "POST"},
        login: {url: "/sys-mgmt/auth/token/", method: "POST"},
        logout: {url: "/sys-mgmt/auth/logout/", method: "GET"},

        query: "/sys-mgmt/auth/account/",
        update: "/sys-mgmt/auth/account/"
    }
};


var refreshMenuByPath = function (paths) {
    var admin = window.top.Admin;
    if (admin) {
        admin.refreshMenu(paths)
    }
};

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
                                window.top.location.href = "/login";
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




