var FontIconMapping = {
    10000: "<i class='fa fa-server'></i>",
    // 10000: "<i class='fa fa-cubes'></i>",
    20000: "<i class='fa fa-ioxhost'></i>",
    90000: "<i class='fa fa-gears'></i>",
    default_root_folder: "<i class='fa fa-file-text-o'></i>",
    default_folder: "",
    default_leaf: ""
};
//url mapping
var URLMapping = {
    /*users: "./modules/sys_mgmt/users/user.html",
    roles: "./modules/sys_mgmt/roles/role.html",
    op_log: "./modules/sys_mgmt/op_log/op_log.html"*/
};
z.util.mergeObject(Admin, {
    initCustom: function () {
        this.initPreferenceController();
        this.updateLocaleLabel(z.bom.getLocalStorage("locale"));
    },
    initModel: function () {
        pro.AjaxCRUD.query({
            url: AjaxUrl.sys_auth.query,
            tips: z.i18n.t("HOMEPAGE_QUERY_ACCOUNT"),
            success_notify: false,
            success: function (result) {
                this._initAccountProfile(result.data.profile);
                this._initAccountMenus(result.data.menus);
                this._initLicense(result.data.license);
            },
            context: this
        })
    },
    _initLicense: function (license) {
        this._license = license;
        if (!z.type.isObject(license)) {
            z.dom.remove("#licenseA");
        }
        var cls = null;
        var info = "";
        if (license) {
            var ExpireDays = license.ExpireDays;
            if (license.Type === "EVALUATION") {
                cls = "bg-color-warning";
                info += "Evaluation version for " + license.User;
            }
            if (ExpireDays < 30) {
                if (info) {
                    info += "<br><i class='fa fa-warning'></i> "
                }
                info += "License expires in " + ExpireDays + " days";
                if (ExpireDays < 10) {
                    cls = "bg-color-danger"
                } else {
                    cls = "bg-color-warning"
                }
            }
        } else if (license !== false) {
            cls = "bg-color-danger"
            // info = "系统未授权";
            info = "No Authorized License";
        }
        if (info) {
            z.dom.removeStyle("#licenseDiv", "display")
            z.dom.removeClass("#licenseDiv", "bg-color-danger bg-color-warning")
            z.dom.addClass("#licenseDiv", cls);
            z.dom.setValue("#licenseDiv", info)
        } else {
            z.dom.setStyle("#licenseDiv", "display", "none");
        }
    },
    _initAccountProfile: function (profile) {
        if (profile.hasOwnProperty("locale")) {
            z.bom.setLocalStorage("locale", profile.locale);
        }
        this._account_profile = profile;
        this.initAccountProfile(profile);
    }
});
z.util.mergeObject(Admin, {
    initPreferenceController: function () {
        this.profileForm = z.form.Form("#modalDiv");
        z.dom.event.onclick("#modalOkBtn", function () {
            var value = this.profileForm.getValue();
            if (value == null) {
                return;
            }
            var password = value.password || "";
            if (password.trim().length === 0) {
                delete value.password;
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
        }, this);
        if (z.dom.query("#licenseA")) {
            z.dom.event.onclick("#licenseA", this.showLicenseModal, this);
        }
    },
    handleSignOut: function () {
        if (AjaxUrl.sys_auth.logout) {
            pro.AjaxCRUD.ajax({
                url: AjaxUrl.sys_auth.logout,
                tips: "Sign Out",
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
    showPreferenceModal: function () {
        z.widget.popover.close();
        this.profileForm.setValue(this._account_profile);
        z.widget.modal("#modalDiv");
    },
    showAboutModal: function () {
        z.widget.popover.close();
        z.widget.alert("<ul style='white-space: break-spaces'>" +
            "<li>Used for quick initialization of the project</li>" +
            "<li>Provides system and permission management modules(RBAC)</li>" +
            "<li>Provides the front-end page</li>" +
            "</ul>", "Flaskz Admin Template");
    },
    showLicenseModal: function () {
        z.widget.popover.close();
        var license = this._license;
        if (!license) {
            return;
        }
        var licenseItems = [];
        ['User', "Type", "StartDate", "EndDate", "ExpireDays"].forEach(function (item) {
            if (license.hasOwnProperty(item)) {
                licenseItems.push(item + " :  " + license[item])
            }
        })
        z.widget.alert(licenseItems.join("\n"), "License")
    },
    updateLocale: function (locale) {
        z.bom.setLocalStorage("locale", locale)
        window.location.reload();
    }
});
z.util.mergeObject(Admin, {
    _initAccountMenus: function (menus) {
        if (menus == null || menus.length === 0) {
            z.dom.empty("body>.body-main");
            z.dom.setValue("body>.body-main", "No Menus Available")
            z.dom.addClass('body>.body-main', "color-danger")
            return;
        }
        var _this = this;
        var map = {};
        var rootMenus = [];
        menus.forEach(function (item) {
            var name = item.name;
            if (name) {
                item.name = z.i18n.t("MODULE_" + name.trim().replace(/[- ]/g, "_").toUpperCase()) ||
                    z.i18n.t("MODULE_" + name.trim().toUpperCase()) || name;
            }
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
            if (!(item.name || "").trim().startsWith("<i")) {
                var font_icon = _this._getMenuIcon(item);
                if (font_icon) {
                    item.font_icon = font_icon;
                }
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
                path_ops[path] = item.actions;
            }
        });
        z.bom.setSessionStorage("menu_permissions", path_ops);
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