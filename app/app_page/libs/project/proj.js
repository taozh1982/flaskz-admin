//中文文字
z.setDefault({
    WIDGET_MESSAGEBOX_CONFIRM_TEXT: "确认",
    WIDGET_MESSAGEBOX_CANCEL_TEXT: "取消",

    PRO_GRID_OPERATE_UPDATE_LABEL: "编辑",
    PRO_GRID_OPERATE_DELETE_LABEL: "删除",

    PRO_GRID_RESULT_SUCCESS_LABEL: "成功",
    PRO_GRID_RESULT_FAIL_LABEL: "失败",

    PRO_AJAX_QUERY_TIPS: "查询",
    PRO_AJAX_ADD_TIPS: "添加",
    PRO_AJAX_CREATE_TIPS: "创建",
    PRO_AJAX_READ_TIPS: "读取",
    PRO_AJAX_UPDATE_TIPS: "编辑",
    PRO_AJAX_DELETE_TIPS: "删除",

    PRO_AJAX_UPLOAD_TIPS: "上传",

    PRO_AJAX_TIMEOUT_TIPS: "超时",
    PRO_AJAX_FORBIDDEN_TIPS: "禁止访问",
    PRO_AJAX_EXCEPTION_TIPS: "请求异常",
    PRO_AJAX_CLIENT_ERROR_TIPS: "请求错误",
    PRO_AJAX_SERVER_ERROR_TIPS: "服务器错误",
    PRO_AJAX_SUCCESS_TIPS: "成功",
    PRO_AJAX_FAIL_TIPS: "失败",

    PRO_MESSAGE_TIPS: "提示",
    PRO_MESSAGE_DELETE_CONFIRM: "确认删除?",

    PRO_MODAL_UPDATE_TITLE: "编辑",
    PRO_MODAL_ADD_TITLE: "添加",
    PRO_MODAL_VIEW_TITLE: "查看",

    PRO_MODAL_CONFIRM_TEXT: "确认",
    PRO_MODAL_CANCEL_TEXT: "取消"
});

//项目定制化
z.setDefault({
    FORM_VALIDATE_ERROR_CLASS: "is-invalid",
    FORM_VALIDATE_MESSAGE_CLASS: "invalid-feedback",

    PRO_GRID_OPERATE_UPDATE_LABEL: "<i class='fa fa-edit'></i>编辑",
    PRO_GRID_OPERATE_UPDATE_CLASS: "btn btn-link text-primary",
    PRO_GRID_OPERATE_DELETE_LABEL: "<i class='fa fa-trash-o'></i>删除",
    PRO_GRID_OPERATE_DELETE_CLASS: "btn btn-link text-danger",

    PRO_AJAX_NOTIFY_OPTIONS: {position: "bottom_right"},

    PRO_MESSAGE_DELETE_CONFIRM: "<i class='fa fa-warning text-warning'></i> 确认删除?",

    PRO_MODAL_UPDATE_TITLE: "<i class='fa fa-edit'></i> 编辑",
    PRO_MODAL_ADD_TITLE: "<i class='fa fa-plus-square'></i> 添加",
    PRO_MODAL_VIEW_TITLE: "<i class='fa fa-file-text-o'></i> 查看",

    PRO_CRUDTABLEPAGE_MODAL_OPTIONS: {open_animation: "z-animation-fadeInLeft", close_animation: "z-animation-fadeOutRight"},
    PRO_CRUDTABLEPAGE_NESTED_MODAL_OPTIONS: {open_animation: "z-animation-fadeInUp", close_animation: "z-animation-fadeOutDown"}
});

/**
 * ajax请求url
 */
var AjaxUrl = {
    for_test: {
        query: "/api/v1.0/template/",
        add: "/api/v1.0/template/",
        delete: "/api/v1.0/template/[id]",
        update: "/api/v1.0/template/"
    },

    sys_role: {
        query: "/sys_mgmt/role/",
        add: "/sys_mgmt/role/",
        delete: "/sys_mgmt/role/[id]",
        update: "/sys_mgmt/role/"
    },
    sys_user: {
        query: "/sys_mgmt/user/query_multiple/",
        add: "/sys_mgmt/user/",
        delete: "/sys_mgmt/user/[id]",
        update: "/sys_mgmt/user/"
    },
    sys_op_log: {
        query: {url: "/sys_mgmt/op_log/query_pss/", method: "POST"},
        menu: "/sys_mgmt/op_log/menu/"
    },
    sys_auth: {
        login: {url: "/sys_mgmt/auth/login/", method: "POST"},
        // login: {url: "/sys_mgmt/auth/token/", method: "POST"},
        logout: {url: "/sys_mgmt/auth/logout/", method: "GET"},

        query: "/sys_mgmt/auth/account/",
        update: "/sys_mgmt/auth/account/"
    }
};


/**
 * ajax数据缓存
 */
var AjaxCache = {
    op_log_menu: {
        _key: "flasky_ajax_cache_op_log_menu",
        query: function (callback, context) {
            var key = AjaxCache.op_log_menu._key;
            var data = z.bom.getLocalStorage(key);
            if (data) {
                callback.apply(context, [data]);
                return;
            }
            pro.AjaxCRUD.query({
                url: AjaxUrl.sys_op_log.menu,
                success_notify: false,
                success: function (result) {
                    var menus = result.data;
                    menus.forEach(function (item) {
                        if (item.module) {
                            item.value = item.module;
                        }
                    });
                    var levelMenus = pro.DataUtil.parseLevelData(menus);
                    menus.forEach(function (item) {
                        delete item.id;
                        delete item.parent_id;
                    });
                    callback.apply(context, [levelMenus]);
                    z.bom.setLocalStorage(key, levelMenus, 2880);
                }
            });
        }
    },
    clear: function () {
        z.bom.clearSessionStorage();
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
});

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




