var Employees = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.ex_employees,
        modal_options: {
            beforeClose: function () {
                return z.dom.query(".z-popover.open") == null;
            }
        },
        grid_options: {
            pageable: true,
            columns: [
                {
                    name: "部门", field: "department_id",
                    render: function (td, data) {
                        td.innerHTML = Employees.getDepartmentName(data.get("department_id"), true);
                    }
                },
                {name: "姓名", field: "name"},
                {name: "Email", field: "email"},
                {name: "年龄", field: "age"},
                {name: "备注", field: "description", minimized: true, minimizable: true},
                {
                    name: "更新时间", field: "updated_at", minimized: true, minimizable: true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("updated_at"));
                    }
                },
                {
                    name: "创建时间", field: "created_at", minimized: true, minimizable: true,
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
    initView: function () {
        var departmentTree = this.departmentTree = z.widget.Tree({
            expand_on_click: false,
            class: "nav-tree light"
        });
        departmentTree.onDataClick(function (evt) {
            z.util.callLater(function () {
                z.widget.popover.close();
            }, 10);

            var data = evt.data;
            var department_id = data.get("id");
            var btn = this._department_tree_select_type === "search" ? "#departmentBtn" : "#selectDepartmentBtn";
            if ((z.dom.getAttribute(btn, 'data-dept-id') | 0) === department_id) {
                return;
            }
            var department_name = data.get("name");
            z.dom.setAttribute(btn, 'data-dept-id', department_id);
            z.dom.setValue(btn, department_name);
            if (this._department_tree_select_type === "search") {
                this.handleSearchChange(department_id);
            }
        }, this);
    },
    initController: function () {
        z.dom.event.onclick("#departmentBtn", function (evt) {
            this.showDepartmentTree(evt);
        }, this);
        z.dom.event.onclick("#selectDepartmentBtn", function (evt) {
            this.showDepartmentTree(evt);
        }, this);

        z.dom.event.onresize(document.body, function () {
            z.widget.popover.close()
        });

        var _this = this;
        var selectDepartmentBtn = z.dom.query("#selectDepartmentBtn");
        new MutationObserver(function (mutationsList, observer) {
            var rect = selectDepartmentBtn.getBoundingClientRect();
            if (rect.top < 0 || rect.left < 0 || rect.bottom > window.innerHeight || rect.right > window.innerWidth) {
                return;
            }
            mutationsList.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'department_id') {
                    _this.form.getValidator().validate();
                }
            })
        }).observe(selectDepartmentBtn, {attributes: true, childList: false, subtree: false});
    },
    getDepartmentName: function (id, level) {
        return ((this.department_map || {})[id] || {})[level === true ? "level_name" : "name"] || "";
    },
    getSubDepartmentIDs: function (id) {
        var ids = [];
        var dept = this.department_map[id] || {};
        (dept.children || []).forEach(function (item) {
            var cid = item.id;
            ids.push(cid);
            ids = z.util.mergeArray(ids, this.getSubDepartmentIDs(cid))
        }, this);
        return ids;
    },
    initModel: function () {
        this.department_map = {};
        pro.AjaxCRUD.query({
            url: AjaxUrl.ex_departments.query,
            tips: "加载部门列表",
            success_notify: false,
            success: function (result) {
                var departments = result.data || [];
                var department_map = this.department_map = z.util.toArrayMap(departments, "id")
                departments.forEach(function (item) {
                    var levelNames = [item.name];
                    var parent = department_map[item.parent_id];
                    while (parent) {
                        levelNames.unshift(parent.name)
                        parent = department_map[parent.parent_id];
                    }
                    item.level_name = levelNames.join(" / ");
                });
                this.initDepartmentSelect(departments);
            },
            context: this
        })
        this.handleSearchChange();
    },
    initDepartmentSelect: function (departments) {
        var department_map = this.department_map;
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
        this.departmentTree.setData(z.util.mergeArray([{"name": "全部", "id": 0}], departments));
        this.departmentTree.expandAll();
    },

    showDepartmentTree: function (evt) {
        var target = z.dom.event.getTarget(evt, '.popover-select');
        var selected_id = z.dom.getAttribute(target, "data-select-id");
        var type = z.dom.getAttribute(target, 'data-select-type')
        this.departmentTree.host = target;
        this._department_tree_select_type = type;
        this.departmentTree.setSelect({"id": selected_id | 0});
        this.departmentTree.getRootDataArray()[0].set("visible", type === "search");

        z.widget.popover.open(target, {
            content: this.departmentTree.getRoot(),
            direction: "down_right",
            class: "popover-select-dropdown nav-tree light"
        });
    },
    handleSearchChange: function (department_id) {
        var department_ids = [];
        department_id = department_id | 0;
        if (department_id !== 0) {
            department_ids = z.util.mergeArray([department_id], this.getSubDepartmentIDs(department_id))
        }
        if (department_ids.length === 0) {
            department_ids = null;
        }

        this.setSearchConfig({
            department_id: {
                "in": department_ids
            }
        });
    },
    onShowFormModal: function (editType, value) {
        var department_id = value.department_id;
        var department_name = this.getDepartmentName(department_id);
        z.dom.setValue("#selectDepartmentBtn", department_name);
        z.dom.setAttribute("#selectDepartmentBtn", 'department_id', department_id);
    },
    getFormValue: function () {
        //需要做校验
        var value = this.form.getValue();
        if (value) {
            value.department_id = z.dom.getAttribute("#selectDepartmentBtn", 'department_id');
        }
        return value;
    }
}, {});