var Departments = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.ex_departments,
        grid_options: {
            columns: [
                {name: "部门", field: "name"},
                {name: "备注", field: "description"},
                {
                    name: "更新时间", field: "updated_at", render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("updated_at"));
                    }
                },
                {
                    name: "创建时间", field: "created_at", render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("created_at"));
                    }
                },
                {
                    name: "操作", width: 200, sortable: false, filter: false,
                    visible: pro.AccessControl.hasUpdatePermission(),
                    render: function (td, data, column) {
                        pro.GridUtil.renderOperateButton(null, data, "add", td, function () {
                            Departments.showFormModal("add", {
                                parent_id: data.get("id")
                            })
                        }, {label: "<i class='fa fa-plus'></i>添加", attributes: {"class": "btn btn-link color-success", "title": "添加子部门"}});
                        pro.template.CRUDTablePage.renderUpdateColumn(td, data, column);
                    }
                }
            ]
        }
    },
    createGrid: function (grid_options) {
        var columns = this.getGridColumns(grid_options);
        if (z.type.isArray(columns)) {
            grid_options = z.util.mergeObject({}, grid_options, {
                columns: columns
            });
        }
        return z.widget.TreeGrid(grid_options);
    },
    setGridData: function (result, data) {
        if (z.type.isArray(data)) {
            this.departments = data;
            this.department_map = z.util.toArrayMap(data, "id")
            this.grid.setData(pro.DataUtil.parseLevelData(data));
            this.grid.expandAll();
        }
    },
    init: function () {
        this.department_map = {};
        this.departments = [];
        this._initPopover();
    },
    onModelChange: function (type, event) {
        this.queryData({
            success_notify: false
        });
    },
    _initPopover: function () {
        var departmentTree = this.departmentTree = z.widget.Tree({
            expand_on_click: false
        });
        var _this = this;
        var deptPopover = PopoverSelect.init("#selectDepartmentBtn", departmentTree, {
            onPopoverOpen: function () {
                var data = _this._getDepartmentTreeData()
                console.log(data);
                departmentTree.setData(data);
                departmentTree.expandAll();
            },
            popover_options: {
                direction: "down_right",
                class: "popover-select-dropdown nav-tree light"
            }
        })
        departmentTree.onDataClick(function (evt) {
            deptPopover.close();

            var parent = evt.data;
            var parent_id = parent.get("id");
            var btn = "#selectDepartmentBtn";
            if ((z.dom.getAttribute(btn, 'parent_id') | 0) === parent_id) {
                return;
            }
            var parent_name = parent.get("name");
            z.dom.setAttribute(btn, "parent_id", parent_id || "");
            z.dom.setValue(btn, parent_name);
        }, this);
    },
    _getDepartmentTreeData: function () {
        var departments = [];
        var current_id = z.dom.getValue("[ze-model='id']") | 0;
        this.grid.eachData(function (data) {
            if (data.get("id") === current_id) {
                return;
            }
            departments.push({
                id: data.get("id"),
                name: data.get("name"),
                parent_id: data.get("parent_id")
            })
        })
        var department_map = z.util.toArrayMap(departments, "id");
        departments.forEach(function (item) {
            var parent_item = department_map[item.parent_id];
            if (parent_item) {
                var children = parent_item.children = parent_item.children || [];
                children.push(item)
            }
        });
        departments = z.util.filterArray(departments, function (item) {
            return item.parent_id == null;
        });
        return z.util.mergeArray([{"name": "-"}], departments);
    },
    onShowFormModal: function (editType, value) {
        var parentDept = this.department_map[value.parent_id] || {}
        z.dom.setValue("#selectDepartmentBtn", parentDept.name || "-");
        z.dom.setAttribute("#selectDepartmentBtn", 'parent_id', parentDept.id || "");
    },
    getFormValue: function () {
        //需要做校验
        var value = this.form.getValue();
        if (value) {
            value.parent_id = z.dom.getAttribute("#selectDepartmentBtn", 'parent_id');
        }
        return value;
    }
}, {});