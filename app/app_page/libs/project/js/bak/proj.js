/**
 * 项目定制化
 */
z.util.mergeObject(z.Defaults, {
    FORM_VALIDATE_ERROR_CLASS: "is-invalid",
    FORM_VALIDATE_MESSAGE_CLASS: "invalid-feedback",

    PRO_GRID_OPERATE_CLASS: "btn btn-link",
    PRO_GRID_OPERATE_UPDATE_LABEL: "<i class='fa fa-edit'></i>编辑",
    PRO_GRID_OPERATE_UPDATE_CLASS: "btn btn-link text-primary",
    PRO_GRID_OPERATE_DELETE_LABEL: "<i class='fa fa-trash-o'></i>删除",
    PRO_GRID_OPERATE_DELETE_CLASS: "btn btn-link text-danger",

    PRO_AJAX_QUERY_METHOD: "GET",
    PRO_AJAX_QUERY_TIPS: "查询",
    PRO_AJAX_ADD_METHOD: "POST",
    PRO_AJAX_ADD_TIPS: "添加",
    PRO_AJAX_DELETE_METHOD: "DELETE",
    PRO_AJAX_DELETE_TIPS: "删除",
    PRO_AJAX_UPDATE_METHOD: "PUT",
    PRO_AJAX_UPDATE_TIPS: "编辑",
    PRO_AJAX_UPLOAD_TIPS: "上传",
    PRO_AJAX_NOTIFY_OPTIONS: {position: "bottom_right"},

    PRO_AJAX_TIMEOUT_TIPS: "超时",
    PRO_AJAX_FORBIDDEN_TIPS: "禁止访问",
    PRO_AJAX_EXCEPTION_TIPS: "请求错误",
    PRO_AJAX_SERVER_ERROR_TIPS: "服务器错误",
    PRO_AJAX_SUCCESS_TIPS: "成功",
    PRO_AJAX_FAIL_TIPS: "失败",
    PRO_AJAX_SUCCESS_STATE: "success",

    PRO_MESSAGE_TIPS: "提示",
    PRO_MESSAGE_DELETE_CONFIRM: "<i class='fa fa-warning text-warning'></i> 确认删除?",

    PRO_MODAL_UPDATE_TITLE: "<i class='fa fa-edit'></i> 编辑",
    PRO_MODAL_ADD_TITLE: "<i class='fa fa-plus-square'></i> 添加",
    PRO_MODAL_VIEW_TITLE: "<i class='fa fa-file-text-o'></i> 查看",

    PRO_MODAL_CONFIRM_TEXT: "确认",
    PRO_MODAL_CANCEL_TEXT: "取消",
    PRO_MODAL_CONFIRM_CLASS: "btn btn-primary",
    PRO_MODAL_CANCEL_CLASS: "btn btn-outline-secondary",

    PRO_CRUDTABLEPAGE_MODAL_OPTIONS: {open_animation: "z-animation-fadeInLeft", close_animation: "z-animation-fadeOutRight"},
    PRO_CRUDTABLEPAGE_NESTED_MODAL_OPTIONS: {open_animation: "z-animation-fadeInUp", close_animation: "z-animation-fadeOutDown"}
});
var refreshMenuByPath = function (paths) {
    if (!z.util.isArray(paths)) {
        paths = [paths]
    }
    if (window.top.Admin) {
        var arr = [];
        paths.forEach(function (path) {
            arr.push({url: path})
        });
        window.top.Admin.refreshMenu(arr)
    }
};
z.ajax.setup({
    beforeSend: function (httpRequest) {
        httpRequest.setRequestHeader("Authorization", z.bom.getLocalStorage("auth-token"));
    },
    complete: function (httpRequest) {
        var status = httpRequest.status;
        if (status === 200) {
            var result = JSON.parse(httpRequest.responseText);
            if (result.status !== z.Defaults.PRO_AJAX_SUCCESS_STATE && result.status_code === 'uri_forbidden') {
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
});