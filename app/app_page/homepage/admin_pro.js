var FontIconMap = {
    100: "<i class='fa fa-server'></i>",
    200: "<i class='fa fa-ioxhost'></i>",
    300: "<i class='fa fa-cubes'></i>",
    900: "<i class='fa fa-user'></i>",
    default_root_folder: "<i class='fa fa-file-text-o'></i>",
    default_folder: "",
    default_leaf: ""
};
//server跳转 > client映射
var URLMap = {
    /*user: "./modules/sys_mgmt/user/user.html",
    role: "./modules/sys_mgmt/role/role.html",
    op_log: "./modules/sys_mgmt/op_log/op_log.html"*/
};
z.util.mergeObject(Admin, {
    getMenuIcon: function (item) {
        var icon = FontIconMap[item.id];
        if (icon) {
            return icon
        }
        if (item.parent_id == null) {
            return FontIconMap.default_root_folder;
        }
        if (item.children && item.children.length > 0) {
            return FontIconMap.default_folder;
        }
        return FontIconMap.default_leaf
    },
    getURL: function (url) {
        return URLMap[url] || url;
    },
    _init: function () {
        this.initProfileController();
        pro.AjaxCRUD.query({
            url: AjaxUrl.sys_auth.query,
            tips: "加载账户信息",
            success_notify: false,
            success: function (result) {
                this._initAccountMenus(result.data.menus);
                this.initAccountProfile(result.data.profile);

            },
            context: this
        })
    },
    initAccountProfile: function (profile) {
        this._account_profile = profile;
        z.dom.setValue("#usernameLabel", profile.name || profile.username);
    },
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
            var font_icon = _this.getMenuIcon(item);
            if (font_icon) {
                item.font_icon = font_icon;
            }
            var path = item.path;
            if (path) {
                item.url = _this.getURL(path);
            }
        });

        this._initMenuItems(rootMenus);
        z.bom.clearSessionStorage();

        var path_ops = {};
        menus.forEach(function (item) {
            var path = item.path;
            if (path != null) {
                path_ops[path] = item.op_permissions;
            }
        });
        z.bom.setSessionStorage("module_permissions", path_ops);
    }
});
z.util.mergeObject(Admin, {
    initProfileController: function () {
        this.profileForm = z.form.Form("#modalDiv");

        z.dom.event.onclick("#logoutA", this.handleLogout, this);
        z.dom.event.onclick("#profileA", this.showProfileModal, this);

        z.dom.event.onclick("#modalOkBtn", function () {
            var value = this.profileForm.getValue();
            if (value == null) {
                return;
            }
            pro.AjaxCRUD.update({
                url: AjaxUrl.sys_auth.update,
                data: value,
                success: function (result) {
                    this.initAccountProfile(result.data);
                    z.widget.modal("#modalDiv", false);
                },
                context: this
            });
        }, this)
    },
    handleLogout: function () {
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
        this.profileForm.setValue(this._account_profile);
        z.widget.modal("#modalDiv");
    }
});