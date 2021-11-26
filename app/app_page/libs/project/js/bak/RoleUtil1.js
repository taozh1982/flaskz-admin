/**
 * 角色相关操作
 */
var RoleUtil = {
    init: function (module) {
        window.RoleOps = (z.bom.getSessionStorage("module_permissions") || {})[module] || [];
    },
    isEditColumnVisible: function (op) {
        op = op || "update";
        return (window.RoleOps || []).indexOf(op) > -1;
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
    }
};
var locationPath = z.bom.getURLQuery("module") || z.util.findArray(window.location.pathname.split("/").reverse(), function (item) {
    return item !== ""
}) || "";
locationPath = locationPath.split(".")[0];
// if (locationPath) {
RoleUtil.init(locationPath);
z.ready(function () {
    RoleUtil.updateRoleElements();
});
// }
