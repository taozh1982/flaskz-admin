var Option = z.util.mergeObject(pro.template.CRUDTablePage, {
        page_options: {
            url: AjaxUrl.sys_options,
            grid_options: {
                columns: [
                    {name: z.i18n("SYS_OPTIONS_KEY"), field: "key"},
                    // {name: z.i18n("SYS_OPTIONS_KEY"), field: "key"},
                    {name: z.i18n("SYS_OPTIONS_VALUE"), field: "value"},
                    {
                        name: z.i18n("SYS_OPTIONS_LABEL"), field: "label"
                    },
                    {name: z.i18n.t("COMMON_DESCRIPTION"), field: "description"},
                    {
                        name: z.i18n.t("COMMON_UPDATED_AT"), field: "updated_at",
                        render: function (td, data) {
                            td.innerHTML = pro.TimeUtil.format(data.get("updated_at"));
                        }
                    },
                    {
                        name: z.i18n.t("COMMON_ACTION"), width: 120, sortable: false, filter: false,
                        visible: pro.AccessControl.hasUpdatePermission(),
                        render: function (td, data, column) {
                            if (data.hasChildren()) {
                                return;
                            }
                            pro.GridUtil.renderUpdateOperateButton(null, data, 'update', td, function (evt) {
                                evt.stopImmediatePropagation();
                                Option.handleClickUpdate(data);
                            });
                        }
                    }
                ]
            }
        },
        createGrid: function (grid_options) {
            var columns = this.getGridColumns(grid_options);
            if (z.type.isArray(columns)) {
                grid_options = z.util.mergeObject({}, grid_options, {columns: columns});
            }
            return z.widget.TreeGrid(grid_options);
        },
        setGridData: function (result, data) {
            if (!z.type.isArray(data)) {
                return;
            }
            var data_list = []
            var category_map = {}
            data.forEach(function (item) {
                var category = item.category;
                if (category == null || category === "") {
                    data_list.push(item);
                } else {
                    var category_item = category_map[category];
                    if (!category_item) {
                        category_item = category_map[category] = {
                            _type: "category",
                            key: category,
                            children: [item]
                        }
                        data_list.push(category_item);
                    } else {
                        category_item.children.push(item)
                    }
                }
            });
            data_list.sort(function (d1, d2) {
                if (d1._type === "category" && d2._type !== "category") {
                    return -1;
                }
                if (d1._type !== "category" && d2._type === "category") {
                    return 1;
                }
                var key1 = d1.key;
                var key2 = d2.key;
                if (key1 < key2) {
                    return -1;
                }
                if (key1 > key2) {
                    return 1;
                }
                return 0;
            });
            this.grid.setData(data_list);
            this.grid.expandAll();
        }
    }
);