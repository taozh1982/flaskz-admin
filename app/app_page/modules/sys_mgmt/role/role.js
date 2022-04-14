var Role = z.util.mergeObject(pro.template.CRUDTablePage, {
        page_options: {
            url: AjaxUrl.sys_role,
            grid_options: {
                columns: [
                    {name: "角色名称", field: "name"},
                    {name: "描述", field: "description", "minimizable": true},
                    {
                        name: "权限列表", field: "menus", sortable: false, filter: false, "minimizable": true, "minimized": true,
                        render: function (td, data) {
                            td.innerHTML = Role.getMenusName(data.get("menus"));
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
            this.initMenuGrid(value);
        },
        getFormValue: function () {
            //需要做校验
            var value = this.form.getValue();
            if (value) {
                var menus = this._getMenuGridValue();
                if (menus.length === 0) {
                    z.widget.notify("请选择角色菜单", {type: "info", duration: 1200});
                    return null;
                }
                value.menus = menus;
            }
            return value;
        },

        initModel: function () {
            pro.AjaxCRUD.query({
                url: AjaxUrl.sys_role.query,
                success: function (result) {
                    var data = result.data;
                    this._menuArr = data.menus;
                    this.grid.setData(data.roles);
                },
                context: this
            });
        },
        getMenusName: function (menus) {
            if (!this._menuMap) {
                var map = {};
                this._menuArr.forEach(function (item) {
                    map[item.id] = item;
                });
                this._menuMap = map;
            }
            var _this = this;
            var labelArr = [];
            menus = menus || [];
            menus.forEach(function (item) {
                var menu_id = item.menu_id;
                var menuItem = _this._menuMap[menu_id];
                if (menuItem) {
                    var menuLabel = menuItem.name;
                    var menuOPPermissions = menuItem.op_permissions || [];
                    var permissions = item.op_permissions || [];
                    var opNameArr = [];
                    menuOPPermissions.forEach(function (op_permission) {
                        if (permissions.indexOf(op_permission.permission) > -1) {
                            opNameArr.push(op_permission.label)
                        }
                    });
                    if (opNameArr.length > 0) {
                        menuLabel += ("(" + opNameArr.join("/") + ")")
                    }
                    labelArr.push(menuLabel);
                }
            });
            return labelArr.join(",")
        }
    });