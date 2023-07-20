var Simples = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.ex_simples,
        grid_options: {
            columns: [
                {name: "String", field: "field_string"},
                {name: "Integer", field: "field_integer"},
                {name: "Float", field: "field_float"},
                {
                    name: "Boolean", field: "field_boolean", filter: false,
                    render: function (td, data) {
                        pro.GridUtil.renderCheckbox(null, data, "field_boolean", td, {
                            attributes: {"readonly": ""}
                        })
                    }
                },
                {name: "Text", field: "field_text", minimizable: true, minimized: true},
                {
                    name: "DateTime", field: "field_datetime",
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("field_datetime"));
                    }
                },
                {
                    name: "#", width: 130, sortable: false, filter: false,
                    visible: pro.AccessControl.hasUpdatePermission(),
                    render: function (td, data, column) {
                        pro.template.CRUDTablePage.renderUpdateColumn(td, data, column);
                    }
                }
            ]
        }
    },
    getFormValue: function () {
        var value = this.form.getValue();
        if (value) {
            value = z.util.filterObject(value, function (key, value) {
                if (z.type.isString(value) && value.trim() === "") {
                    return false;
                }
                return true;
            })
        }
        return value;
    }
});