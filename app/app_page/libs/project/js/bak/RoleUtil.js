/**
 * 角色相关操作
 */
var RoleUtil = {
    init: function (module) {
        module = module || RoleUtil.getPageModule();
        window.RoleOps = (z.bom.getSessionStorage("module_permissions") || {})[module] || [];
    },
    isEditColumnVisible: function (op) {
        op = op || "update";
        return (window.RoleOps || []).indexOf(op) > -1;
    },
    isUpdateColumnVisible: function (op) {
        op = op || "update";
        return (window.RoleOps || []).indexOf(op) > -1;
    },
    hasOPPermission: function (op_permission) {
        return (window.RoleOps || []).indexOf(op_permission) > -1;
    },
    updateRoleElements: function () {
        var roleOps = window.RoleOps || [];
        z.dom.queryAll("[role_ops]").forEach(function (ele) {
            var ops = ele.getAttribute("role_ops");
            if (roleOps.indexOf(ops) < 0) {
                z.dom.remove(ele);
            } else {
                ele.removeAttribute("role_ops")
            }
        });
    },
    getPageModule: function () {
        var page_module = z.bom.getURLQuery("module") || z.util.findArray(window.location.pathname.split("/").reverse(), function (item) {
            return item !== ""
        }) || "";
        page_module = page_module.split(".")[0];
        return page_module;
    }
};
/*var page_module = z.bom.getURLQuery("module") || z.util.findArray(window.location.pathname.split("/").reverse(), function (item) {
    return item !== ""
}) || "";
page_module = page_module.split(".")[0];*/
RoleUtil.init();
z.ready(function () {
    RoleUtil.updateRoleElements();
});