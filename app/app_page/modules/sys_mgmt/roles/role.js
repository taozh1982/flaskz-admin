var Role = z.util.mergeObject(pro.template.CRUDTablePage, {
        page_options: {
            url: AjaxUrl.sys_role,
            grid_options: {
                columns: [
                    {name: z.i18n.t("SYS_ROLE_NAME"), field: "name"},
                    {name: z.i18n.t("COMMON_DESCRIPTION"), field: "description", "minimizable": true},
                    {
                        name: z.i18n.t("SYS_ROLE_MODULES"), field: "modules", sortable: false, filter: false, "minimizable": true, "minimized": true,
                        render: function (td, data) {
                            td.innerHTML = "<small>" + Role.getModulesName(data.get("modules")) + "</small>";
                        }
                    },
                    {
                        name: z.i18n.t("COMMON_UPDATED_AT"), field: "updated_at", "minimizable": true, render: function (td, data) {
                            td.innerHTML = pro.TimeUtil.format(data.get("updated_at"))
                        }
                    },
                    {
                        name: z.i18n.t("COMMON_ACTION"), width: 180, sortable: false, filter: false,
                        visible: pro.AccessControl.hasUpdatePermission(),
                        render: function (td, data, column) {
                            pro.template.CRUDTablePage.renderUpdateColumn(td, data, column);
                        }
                    }
                ]
            }
        },
        onModelChange: function (type, changeData) {
            var admin = window.top.Admin;
            if (admin) {
                var roles = [];
                this.grid.getDataArray().forEach(function (data) {
                    roles.push({
                        id: data.get("id"),
                        name: data.get("name")
                    })
                });
                admin.dispatchModuleChange("role", roles);
            }
        }
    },
    {
        onShowFormModal: function (editType, value) {
            this.initModuleGrid(value);
        },
        getFormValue: function () {
            //需要做校验
            var value = this.form.getValue();
            if (value) {
                var modules = this._getModuleGridValue();
                if (modules.length === 0) {
                    z.widget.notify(z.i18n.t("SYS_ROLE_MODULES_REQUIRED"), {type: "info", duration: 1200});
                    return null;
                }
                value.modules = modules;
            }
            return value;
        },

        initModel: function () {
            pro.AjaxCRUD.query({
                url: AjaxUrl.sys_role.query,
                success: function (result) {
                    var data = result.data || {};
                    this._moduleArr = data.modules || [];
                    this._moduleArr.forEach(function (item) {
                        var name = item.name;
                        if (name) {
                            item.name = z.i18n.t("MODULE_" + name.trim().replace(/[- ]/g, "_").toUpperCase()) ||
                                z.i18n.t("MODULE_" + name.trim().toUpperCase()) || name;
                        }
                    });
                    this.grid.setData(data.roles);
                },
                context: this
            });
        },
        getModulesName: function (modules) {
            if (!this._moduleMap) {
                var map = this._moduleMap = {};
                this._moduleArr.forEach(function (item) {
                    map[item.id] = item;
                });
            }
            var _this = this;
            var labelArr = [];
            modules = modules || [];
            modules.forEach(function (item) {
                var module_id = item.module_id;
                var moduleItem = _this._moduleMap[module_id];
                if (moduleItem) {
                    var moduleLabel = moduleItem.name;
                    var moduleAllActions = moduleItem.actions || [];
                    var actions = item.actions || [];
                    var opNameArr = [];
                    moduleAllActions.forEach(function (action) {
                        if (actions.indexOf(action.action) > -1) {
                            opNameArr.push(action.label)
                        }
                    });
                    if (opNameArr.length > 0) {
                        moduleLabel += ("(" + opNameArr.join("/") + ")")
                    }
                    labelArr.push(moduleLabel);
                }
            });
            return labelArr.join("<br>")
        }
    });