z.util.mergeObject(Role, {
    _renderOps: function (td, data) {
        var _this = this;
        var op_permissions = data.get("op_permissions") || [];
        op_permissions.forEach(function (item) {
            var permission = item.permission;
            var checkbox = data["_" + permission];
            if (!checkbox) {
                checkbox = z.dom.create("input","check-input");
                checkbox.setAttribute("type", "checkbox");
                z.dom.event.onchange(checkbox, function () {
                    var _op_permissions = z.util.mergeObject({}, data.get("_op_permissions"));
                    var checked = z.dom.getValue(checkbox);
                    _op_permissions[permission] = checked;
                    data.set("_op_permissions", _op_permissions);
                    if (checked === true) {
                        _this._is_ops_checked_$ = true;
                        _this.menuGrid.addCheck(data);
                        _this._is_ops_checked_$ = false;
                    }
                });
                var label = z.dom.create("label", "ops");
                label.innerHTML = item.label;
                z.dom.insertFirst(checkbox, label);
                data["_" + permission] = checkbox;
            }
            var _op_permissions = data.get("_op_permissions");
            if (_op_permissions) {
                z.dom.setValue(checkbox, _op_permissions[permission] === true);
            } else {
                z.dom.setValue(checkbox, false);
            }
            td.appendChild(checkbox.parentNode);
        });
    },
    initMenuGrid: function (value) {
        if (!this.menuGrid) {
            var _this = this;
            this.menuGrid = z.widget.TreeGrid(z.util.mergeObject({}, z.getDefault("PRO_CRUDTABLEPAGE_GRID_OPTIONS"), {
                appendTo: "#menuGridDiv",
                sortable: false,
                overflow: false,
                columns: [
                    {name: "菜单", field: "name", type: "check"},
                    {
                        name: "操作权限", width: 120,
                        render: function (td, data, column) {
                            if (!data.hasChildren()) {
                                _this._renderOps(td, data);
                            }
                        }
                    }
                ]
            }));
            this.menuGrid.onCheckChange(this._handleCheckChange, this);
            this._initAllMenuData();
        }
        this._setMenuGridValue(value);
    },
    _initAllMenuData: function () {
        if (this._menuArr) {
            var menuArr = [];
            var menuMap = {};
            this._menuArr.forEach(function (item) {
                var menuItem = z.util.mergeObject({
                    children: []
                }, item);
                menuMap[item.id] = menuItem;
                if (item.parent_id == null) {
                    menuArr.push(menuItem)
                }
            });
            this._menuArr.forEach(function (item) {
                var parent_id = item.parent_id;
                if (parent_id != null) {
                    var parentMenuItem = menuMap[parent_id];
                    if (parentMenuItem) {
                        parentMenuItem.children.push(menuMap[item.id]);
                    }
                }
            });
            this.menuGrid.setData(menuArr);
            this.menuGrid.expandAll();
        }
    },
    _handleCheckChange: function (evt) {
        if (this._is_ops_checked_$ === true) {
            return;
        }
        var type = evt.type;
        var data = evt.data;
        if (type === "add") {
            this._checkMenuOps(data);
        } else if (type === "remove") {
            data.remove("_op_permissions")
        } else if (type === "set") {
            this._checkMenuOps(data);
        } else if (type === "clear") {
            this._resetMenuGridValue();
        }
    },
    _checkMenuOps: function (dataArr) {
        if (!z.util.isArray(dataArr)) {
            dataArr = [dataArr];
        }
        dataArr.forEach(function (data) {
            var op_permissions = data.get("op_permissions");
            var keyMap = {};
            if (op_permissions) {
                op_permissions.forEach(function (item) {
                    keyMap[item.permission] = true;
                });
            }
            data.set("_op_permissions", keyMap)
        })
    },
    _resetMenuGridValue: function () {
        this.menuGrid.clearCheck();
        this.menuGrid.eachData(function (data) {
            data.remove("_op_permissions")
        });
    },
    _setMenuGridValue: function (value) {
        this._resetMenuGridValue();
        var menus = value.menus || [];
        menus.forEach(function (item) {
            var data = this.menuGrid.findData("id", item.menu_id);
            if (data && data.get("parent")) {//only check child menu
                this.menuGrid.addCheck(data);
                var op_permissions = item.op_permissions || [];
                var _ops = {};
                op_permissions.forEach(function (permission) {
                    _ops[permission] = true;
                });
                data.set("_op_permissions", _ops);
            }
        }, this)
    },
    _getMenuGridValue: function () {
        var menus = [];
        this.menuGrid.getChecked().forEach(function (data) {
            if (!data.hasChildren()) {
                var op_permissions = [];
                z.util.eachObject(data.get("_op_permissions") || {}, function (permission, checked) {
                    if (checked === true) {
                        op_permissions.push(permission)
                    }
                });
                menus.push({
                    menu_id: data.get("id"),
                    op_permissions: op_permissions
                })
            }
        });
        return menus;
    }
});