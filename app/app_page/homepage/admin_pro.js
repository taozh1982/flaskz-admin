var FontIconMapping = {
    100: "<i class='fa fa-server'></i>",
    200: "<i class='fa fa-ioxhost'></i>",
    300: "<i class='fa fa-cubes'></i>",
    900: "<i class='fa fa-user'></i>",
    default_root_folder: "<i class='fa fa-file-text-o'></i>",
    default_folder: "",
    default_leaf: ""
};
//url mapping
var URLMapping = {
    /*user: "./modules/sys_mgmt/user/user.html",
    role: "./modules/sys_mgmt/role/role.html",
    op_log: "./modules/sys_mgmt/op_log/op_log.html"*/
};
z.util.mergeObject(Admin, {
    initCustom: function () {
        this.initProfileController();
    },
    initModel: function () {
        pro.AjaxCRUD.query({
            url: AjaxUrl.sys_auth.query,
            tips: "Load account info",
            success_notify: false,
            success: function (result) {
                this._initAccountMenus(result.data.menus);
                this._initAccountProfile(result.data.profile);
            },
            context: this
        })
    },
    _initAccountProfile: function (profile) {
        this._account_profile = profile;
        this.initAccountProfile(profile);
    }
});
z.util.mergeObject(Admin, {
    initProfileController: function () {
        this.profileForm = z.form.Form("#modalDiv");
        z.dom.event.onclick("#modalOkBtn", function () {
            var value = this.profileForm.getValue();
            if (value == null) {
                return;
            }
            pro.AjaxCRUD.update({
                url: AjaxUrl.sys_auth.update,
                data: value,
                success: function (result) {
                    this._initAccountProfile(result.data);
                    z.widget.modal("#modalDiv", false);
                },
                context: this
            });
        }, this)
    },
    handleSignOut: function () {
        if (AjaxUrl.sys_auth.logout) {
            pro.AjaxCRUD.ajax({
                url: AjaxUrl.sys_auth.logout,
                tips: "退出登录",
                success_notify: false,
                complete: function () {
                    window.location.href = "/login";
                }
            });
        } else {
            window.location.href = "/login";
        }
        z.bom.removeLocalStorage("auth-token");
        z.bom.clearSessionStorage();
    },
    showProfileModal: function () {
        z.widget.popover.close();
        this.profileForm.setValue(this._account_profile);
        z.widget.modal("#modalDiv");
    }
});
z.util.mergeObject(Admin, {
    _initAccountMenus: function (menus) {
        var _this = this;
        var map = {};
        var rootMenus = [];
        menus.forEach(function (item) {
            map[item.id] = item;
            item.children = [];
            if (item.parent_id == null) {
                rootMenus.push(item);
            }
        });
        menus.forEach(function (item) {
            var parent_id = item.parent_id;
            if (parent_id != null) {
                var parent_item = map[parent_id];
                if (parent_item) {
                    parent_item.children.push(item)
                }
            }
        });
        menus.forEach(function (item) {
            var font_icon = _this._getMenuIcon(item);
            if (font_icon) {
                item.font_icon = font_icon;
            }
            var path = item.path;
            if (path) {
                item.url = _this._getURL(path);
            }
        });

        this.initMenuItems(rootMenus);
        z.bom.clearSessionStorage();

        var path_ops = {};
        menus.forEach(function (item) {
            var path = item.path;
            if (path != null) {
                path_ops[path] = item.op_permissions;
            }
        });
        z.bom.setSessionStorage("module_permissions", path_ops);
    },
    _getMenuIcon: function (item) {
        var icon = FontIconMapping[item.id];
        if (icon) {
            return icon
        }
        if (item.parent_id == null) {
            return FontIconMapping.default_root_folder;
        }
        if (item.children && item.children.length > 0) {
            return FontIconMapping.default_folder;
        }
        return FontIconMapping.default_leaf
    },
    _getURL: function (path) {
        return URLMapping[path] || path;
    }
});