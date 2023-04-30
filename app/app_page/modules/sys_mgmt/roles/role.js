var Role = z.util.mergeObject(pro.template.CRUDTablePage, {
        page_options: {
            url: AjaxUrl.sys_role,
            grid_options: {
                columns: [
                    {name: "角色名称", field: "name"},
                    {name: "描述", field: "description", "minimizable": true},
                    {
                        name: "权限列表", field: "modules", sortable: false, filter: false, "minimizable": true, "minimized": true,
                        render: function (td, data) {
                            td.innerHTML = Role.getModulesName(data.get("modules"));
                        }
                    },
                    {
                        name: "更新时间", field: "updated_at", "minimizable": true, render: function (td, data) {
                            td.innerHTML = pro.TimeUtil.format(data.get("updated_at"))
                        }
                    },
                    {
                        name: "操作", width: 180, sortable: false, filter: false,
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
                    z.widget.notify("请选择功能模块", {type: "info", duration: 1200});
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
                    var data = result.data;
                    this._moduleArr = data.modules;
                    this.grid.setData(data.roles);
                },
                context: this
            });
        },
        getModulesName: function (modules) {
            if (!this._moduleMap) {
                var map = {};
                this._moduleArr.forEach(function (item) {
                    map[item.id] = item;
                });
                this._moduleMap = map;
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
            return labelArr.join(",")
        }
    });