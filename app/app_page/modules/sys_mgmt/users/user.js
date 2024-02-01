var User = z.util.mergeObject(pro.template.CRUDTablePage, {
    user_types: [
        {name: "Local", value: "local"},
        {name: "TACACS+", value: "tacacs+"},
        {name: "RADIUS", value: "radius"},
        {name: "LDAP", value: "ldap"}
    ],
    page_options: {
        url: AjaxUrl.sys_user,
        grid_options: {
            columns: [
                {name: z.i18n.t("SYS_USER_USERNAME"), field: "username"},
                {
                    name: z.i18n.t("COMMON_STATUS"), field: "status", filter: false, width: 100,
                    render: function (td, data) {
                        pro.GridUtil.renderResult(td, data, {
                            key: "status",
                            success_value: "enable",
                            fail_value: "disable",
                            success_label: z.i18n.t("SYS_USER_ENABLE"),
                            fail_label: z.i18n.t("SYS_USER_DISABLE")
                        });
                        if (pro.AccessControl.hasUpdatePermission()) {
                            var status = data.get("status");
                            if (status === "enable") {
                                pro.GridUtil.createOPButton(td, data, "enable", "<i class='text-danger fa fa-stop-circle-o' title='" + z.i18n.t("SYS_USER_DISABLE") + "'></i>", function () {
                                    User.handleClickActive(data)
                                })
                            } else if (status === "disable") {
                                pro.GridUtil.createOPButton(td, data, "disable", "<i class='text-success fa fa-play-circle-o' title='" + z.i18n.t("SYS_USER_ENABLE") + "'></i>", function () {
                                    User.handleClickActive(data)
                                })
                            }
                        }
                    }
                },
                {
                    name: z.i18n.t("COMMON_TYPE"), field: "type", width: 100,
                    render: function (td, data) {
                        td.innerHTML = User.getTypeLabel(data.get("type")) || "";
                    }
                },
                {
                    name: z.i18n.t("SYS_USER_ROLE"), field: "role_id",
                    render: function (td, data) {
                        td.innerHTML = User.getRoleName(data.get("role_id")) || "";
                    }
                },
                {name: "Email", field: "email"},
                {name: z.i18n.t("SYS_USER_NAME"), field: "name"},
                {name: z.i18n.t("SYS_USER_PHONE"), field: "phone"},
                {
                    name: z.i18n.t("SYS_USER_LAST_LOGIN_AT"), field: "option.last_login_at", minimizable: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format((data.get("option") || {}).last_login_at);
                    }
                },
                {name: z.i18n.t("SYS_USER_LOGIN_TIMES"), field: "option.login_times", minimizable: true, width: 100},
                {
                    name: z.i18n.t("COMMON_UPDATED_AT"), field: "updated_at", minimizable: true, minimized: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("updated_at"));
                    }
                },
                {
                    name: z.i18n.t("COMMON_CREATED_AT"), field: "created_at", minimizable: true, minimized: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("created_at"));
                    }
                },
                {name: z.i18n.t("COMMON_DESCRIPTION"), field: "description", minimizable: true},
                {
                    name: z.i18n.t("COMMON_ACTION"), width: 150, sortable: false, filter: false,
                    visible: pro.AccessControl.hasUpdatePermission(),
                    render: function (td, data, column) {
                        pro.template.CRUDTablePage.renderUpdateColumn(td, data, column);
                    }
                }
            ]
        }
    },
    getTypeLabel: function (type) {
        this._typeLabelMap = this._typeLabelMap || pro.DataUtil.getArrayMap(this.user_types, "value", "name");
        return this._typeLabelMap[type] || type;
    }
}, {
    init: function () {
        var admin = window.top.Admin;
        if (admin) {
            admin.onModuleChange(function (event) {
                if (event.module === "role") {
                    this.roleArr = event.data;
                    this._roleMap = null;
                    this.grid.update();
                    pro.FormUtil.initSelectOptions("[ze-model=role_id]", this.roleArr);
                }
            }, this);
        }

        z.dom.event.onchange("#pwdVisibleCheck", function () {
            var visible = z.dom.getValue("#pwdVisibleCheck");
            z.dom.setAttribute("#pwdInput", "type", visible ? "text" : "password");
        })
    },
    onShowFormModal: function (editType, initValue) {
        var pwd_required = editType !== "update";
        if (pwd_required) {
            z.dom.addClass("#pwdLabel", "required");
            z.dom.setAttribute("#pwdInput", "v-rules", "required");
        } else {
            z.dom.removeClass("#pwdLabel", "required");
            z.dom.removeAttribute("#pwdInput", "v-rules");
        }
        this.form.update();
    },
    handleClickActive: function (data) {
        var status = data.get("status");
        status = status === "enable" ? "disable" : "enable";
        var message = status === "enable" ? z.i18n.t("SYS_USER_ENABLE") : z.i18n.t("SYS_USER_DISABLE");
        var confirm_msg = status === "enable" ? z.i18n.t("SYS_USER_ENABLE_CONFIRM") : z.i18n.t("SYS_USER_DISABLE_CONFIRM");
        var _this = this;
        z.widget.confirm("<i class='fa fa-warning color-warning'></i> " + confirm_msg + "?", z.i18n.t("PRO_MESSAGE_TIPS"), function (result) {//callback
            if (result) {
                _this.handleModelUpdate({
                    id: data.get("id"),
                    status: status
                }, {tips: message})
            }
        }, {
            confirm_class: z.getDefault("PRO_MODAL_CONFIRM_CLASS"),
            cancel_class: z.getDefault("PRO_MODAL_CANCEL_CLASS"),
            confirm_text: z.i18n.t("PRO_MODAL_CONFIRM_TEXT"),
            cancel_text: z.i18n.t("PRO_MODAL_CANCEL_TEXT")
        });
    },

    setGridData: function (result, data) {
        data = result.data;
        this.roleArr = data.roles;
        pro.FormUtil.initSelectOptions("[ze-model=role_id]", this.roleArr);
        this.grid.setData(data.users);
    },
    getRoleName: function (id) {
        var map = this._roleMap;
        if (!map) {
            map = {};
            this.roleArr.forEach(function (item) {
                map[item.id] = item.name;
            });
            this._roleMap = map;
        }
        return map[id];
    },
    initFormModalValue: function (editType, initValue) {
        initValue.password = "";
        return initValue;
    }
});