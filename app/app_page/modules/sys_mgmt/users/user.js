var User = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.sys_user,
        grid_options: {
            columns: [
                {name: "账号", field: "username"},
                // {name: "账号类型", field: "type"},
                {
                    name: "状态", field: "status", filter: false,
                    render: function (td, data) {
                        pro.GridUtil.renderResult(td, data, {
                            key: "status",
                            success_value: "enable",
                            fail_value: "disable",
                            success_label: "正常",
                            fail_label: "停用"
                        });
                        if (pro.AccessControl.hasUpdatePermission()) {
                            var status = data.get("status");
                            if (status === "enable") {
                                pro.GridUtil.createOPButton(td, data, "enable", "<i class='text-danger fa fa-stop-circle-o' title='停用'></i>", function () {
                                    User.handleClickActive(data)
                                })
                            } else if (status === "disable") {
                                pro.GridUtil.createOPButton(td, data, "disable", "<i class='text-success fa fa-play-circle-o' title='启用'></i>", function () {
                                    User.handleClickActive(data)
                                })
                            }
                        }
                    }
                },
                {
                    name: "用户角色", field: "role_id",
                    render: function (td, data) {
                        td.innerHTML = User.getRoleName(data.get("role_id")) || "";
                    }
                },
                {name: "Email", field: "email"},
                {name: "姓名", field: "name"},
                {name: "电话", field: "phone"},
                {name: "备注", field: "description", minimizable: true},
                /*{
                    name: "上次登录时间", field: "last_login_at", minimizable: true, minimized: true, render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("last_login_at"));
                    }
                },*/

                {
                    name: "最后登录时间", field: "option.last_login_at", minimizable: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format((data.get("option") || {}).last_login_at);
                    }
                },
                {name: "登录次数", field: "option.login_times", minimizable: true, width: 100},
                {
                    name: "更新时间", field: "updated_at", minimizable: true, minimized: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("updated_at"));
                    }
                },
                {
                    name: "创建时间", field: "created_at", minimizable: true, minimized: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("created_at"));
                    }
                },
                {
                    name: "操作", width: 130, sortable: false, filter: false,
                    visible: pro.AccessControl.hasUpdatePermission(),
                    render: function (td, data, column) {
                        pro.template.CRUDTablePage.renderUpdateColumn(td, data, column);
                    }
                }
            ]
        }
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
    },
    handleClickActive: function (data) {
        var status = data.get("status");
        status = status === "enable" ? "disable" : "enable";
        var message = status === "enable" ? "启用" : "停用";
        var _this = this;
        z.widget.confirm("<i class='fa fa-warning color-warning'></i> 确认" + message + "?", z.getDefault("PRO_MESSAGE_TIPS"), function (result) {//callback
            if (result) {
                _this.handleModelUpdate({
                    id: data.get("id"),
                    status: status
                }, {tips: message})
            }
        }, {
            confirm_class: z.getDefault("PRO_MODAL_CONFIRM_CLASS"),
            cancel_class: z.getDefault("PRO_MODAL_CANCEL_CLASS"),
            confirm_text: z.getDefault("PRO_MODAL_CONFIRM_TEXT"),
            cancel_text: z.getDefault("PRO_MODAL_CANCEL_TEXT")
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