var Role = z.util.mergeObject(pro.template.CRUDTablePage, {
        page_options: {
            url: AjaxUrl.sys_roles,
            grid_options: {
                columns: [
                    {name: z.i18n("SYS_ROLES_NAME"), field: "name"},
                    {name: z.i18n("COMMON_DESCRIPTION"), field: "description", "minimizable": true},
                    {
                        name: z.i18n("SYS_ROLES_MODULES"), field: "modules", sortable: false, filter: false, "minimizable": true, "minimized": true,
                        render: function (td, data) {
                            td.innerHTML = "<small>" + Role.getModulesName(data.get("modules")) + "</small>";
                        }
                    },
                    {
                        name: z.i18n("COMMON_UPDATED_AT"), field: "updated_at", "minimizable": true, render: function (td, data) {
                            td.innerHTML = pro.TimeUtil.format(data.get("updated_at"))
                        }
                    },
                    {
                        name: z.i18n("COMMON_ACTION"), width: 180, sortable: false, filter: false,
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
        },
        getModulesName: function (modules) {
            if (!this._moduleMap) {
                var map = this._moduleMap = {};
                this._moduleArr.forEach(function (item) {
                    map[item.id] = item;
                });
            }
            modules = modules || [];
            modules.sort(function (m1, m2) {
                var module_id1 = m1.module_id;
                var module_id2 = m2.module_id;
                if (module_id1 < module_id2) {
                    return -1;
                }
                if (module_id1 > module_id2) {
                    return 1;
                }
                return 0;
            })
            var _this = this;
            var labelArr = [];
            modules = modules || [];
            modules.forEach(function (item) {
                var module_id = item.module_id;
                var moduleItem = _this._moduleMap[module_id];
                if (moduleItem) {
                    var parentLabels = _this._appendModuleParenLabels(labelArr, moduleItem, _this._moduleMap);
                    var indent = parentLabels.length;
                    var moduleLabel = '-- '.repeat(indent) + moduleItem.name;
                    var moduleAllActions = moduleItem.actions || [];
                    var actions = item.actions || [];
                    var opNameArr = [];
                    moduleAllActions.forEach(function (action) {
                        if (actions.indexOf(action.action) > -1) {
                            var label = action.label;
                            opNameArr.push(z.i18n("COMMON_ACTION_" + label.trim().toUpperCase()) || label)
                        }
                    });
                    if (opNameArr.length > 0) {
                        moduleLabel += ("(" + opNameArr.join("/") + ")")
                    }
                    labelArr.push(moduleLabel);
                }
            });
            return labelArr.join("<br>")
        },
        _appendModuleParenLabels: function (labelArr, moduleItem, moduleMap) {
            var parentModules = [];
            var parent_id = moduleItem.parent_id;
            while (parent_id) {
                moduleItem = moduleMap[parent_id];
                if (!moduleItem) {
                    break;
                }
                parentModules.unshift(moduleItem)
                parent_id = moduleItem.parent_id;
            }
            var labels = [];
            parentModules.forEach(function (item, index) {
                var label = '--'.repeat(index) + " " + item.name;
                labels.push(label);
                if (labelArr.indexOf(label) < 0) {
                    labelArr.push(label)
                }
            });
            return labels;
        }
    },
    {
        initModel: function () {
            pro.AjaxCRUD.query({
                url: AjaxUrl.sys_roles.query,
                success: function (result) {
                    var data = result.data || {};
                    this._moduleArr = data.modules || [];
                    this._moduleArr.forEach(function (item) {
                        var name = item.name;
                        if (name) {
                            item.name = z.i18n("MODULE_" + name.trim().replace(/[- ]/g, "_").toUpperCase()) ||
                                z.i18n("MODULE_" + name.trim().toUpperCase()) || name;
                        }
                    });
                    this.grid.setData(data.roles);
                },
                context: this
            });
        },
        onShowFormModal: function (editType, value) {
            this.initModuleGrid(value);
        },
        getFormValue: function () {
            //需要做校验
            var value = this.form.getValue();
            if (value) {
                var modules = this._getModuleGridValue();
                if (modules.length === 0) {
                    z.widget.notify(z.i18n("SYS_ROLES_MODULES_REQUIRED"), {type: "info", duration: 1200});
                    return null;
                }
                value.modules = modules;
            }
            return value;
        }
    });