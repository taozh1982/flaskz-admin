z.util.mergeObject(Role, {
    _renderOps: function (td, data) {
        var _this = this;
        var actions = data.get("actions") || [];
        actions.forEach(function (item) {
            var permission = item.action;
            var checkbox = data["_" + permission];
            if (!checkbox) {
                checkbox = z.dom.create("input", "check-input");
                checkbox.setAttribute("type", "checkbox");
                z.dom.event.onchange(checkbox, function () {
                    var _actions = z.util.mergeObject({}, data.get("_actions"));
                    var checked = z.dom.getValue(checkbox);
                    _actions[permission] = checked;
                    data.set("_actions", _actions);
                    if (checked === true) {
                        _this._is_action_checked_$ = true;
                        _this.moduleGrid.addCheck(data);
                        _this._is_action_checked_$ = false;
                    }
                });
                var label = z.dom.create("label", "ops");
                label.innerHTML = item.label;
                z.dom.insertFirst(checkbox, label);
                data["_" + permission] = checkbox;
            }
            var _actions = data.get("_actions");
            if (_actions) {
                z.dom.setValue(checkbox, _actions[permission] === true);
            } else {
                z.dom.setValue(checkbox, false);
            }
            td.appendChild(checkbox.parentNode);
        });
    },
    initModuleGrid: function (value) {
        if (!this.moduleGrid) {
            var _this = this;
            this.moduleGrid = z.widget.TreeGrid(z.util.mergeObject({}, z.getDefault("PRO_CRUDTABLEPAGE_GRID_OPTIONS"), {
                appendTo: "#moduleGridDiv",
                sortable: false,
                overflow: false,
                columns: [
                    {
                        name: "模块<small class='color-secondary'>(带*表示没有菜单)</small>", field: "name", type: "check",
                        render: function (td, data) {
                            var module = data.get("name");
                            if (!data.hasChildren() && !data.get("path")) {
                                module += " ⋆"
                            }
                            td.innerHTML = module;
                        }
                    },
                    {
                        name: "操作权限", width: 110,
                        render: function (td, data, column) {
                            if (!data.hasChildren()) {
                                _this._renderOps(td, data);
                            }
                        }
                    }
                ]
            }));
            this.moduleGrid.onCheckChange(this._handleCheckChange, this);
            this._initAllModuleData();
        }
        this._setModuleGridValue(value);
    },
    _initAllModuleData: function () {
        if (this._moduleArr) {
            var moduleArr = [];
            var moduleMap = {};
            this._moduleArr.forEach(function (item) {
                var moduleItem = z.util.mergeObject({
                    children: []
                }, item);
                moduleMap[item.id] = moduleItem;
                if (item.parent_id == null) {
                    moduleArr.push(moduleItem)
                }
            });
            this._moduleArr.forEach(function (item) {
                var parent_id = item.parent_id;
                if (parent_id != null) {
                    var parentModuleItem = moduleMap[parent_id];
                    if (parentModuleItem) {
                        parentModuleItem.children.push(moduleMap[item.id]);
                    }
                }
            });
            this.moduleGrid.setData(moduleArr);
            this.moduleGrid.expandAll();
        }
    },
    _handleCheckChange: function (evt) {
        if (this._is_action_checked_$ === true) {
            return;
        }
        var type = evt.type;
        var data = evt.data;
        if (type === "add") {
            this._checkModuleActions(data);
        } else if (type === "remove") {
            data.remove("_actions")
        } else if (type === "set") {
            this._checkModuleActions(data);
        } else if (type === "clear") {
            this._resetModuleGridValue();
        }
    },
    _checkModuleActions: function (dataArr) {
        if (!z.util.isArray(dataArr)) {
            dataArr = [dataArr];
        }
        dataArr.forEach(function (data) {
            var actions = data.get("actions");
            var keyMap = {};
            if (actions) {
                actions.forEach(function (item) {
                    keyMap[item.action] = true;
                });
            }
            data.set("_actions", keyMap)
        })
    },
    _resetModuleGridValue: function () {
        this.moduleGrid.clearCheck();
        this.moduleGrid.eachData(function (data) {
            data.remove("_actions")
        });
    },
    _setModuleGridValue: function (value) {
        this._resetModuleGridValue();
        var modules = value.modules || [];
        modules.forEach(function (item) {
            var data = this.moduleGrid.findData("id", item.module_id);
            if (data && !data.hasChildren()) {//only check child module
                this.moduleGrid.addCheck(data);
                var actions = item.actions || [];
                var _ops = {};
                actions.forEach(function (permission) {
                    _ops[permission] = true;
                });
                data.set("_actions", _ops);
            }
        }, this)
    },
    _getModuleGridValue: function () {
        var modules = [];
        this.moduleGrid.getChecked().forEach(function (data) {
            if (!data.hasChildren()) {
                var actions = [];
                z.util.eachObject(data.get("_actions") || {}, function (permission, checked) {
                    if (checked === true) {
                        actions.push(permission)
                    }
                });
                modules.push({
                    module_id: data.get("id"),
                    actions: actions
                })
            }
        });
        return modules;
    }
});