var Template = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.for_test,
        grid_options: {
            columns: [
                {name: "Name", field: "name"},
                {name: "Age", field: "age"},
                {name: "Email", field: "email"},
                {name: "Description", field: "description", "minimizable": true},
                {
                    name: "created_at", field: "updated_at", "minimizable": true, "minimized": true,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("updated_at"));
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
    }
});