var License = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.sys_license,
        grid_options: {
            columns: [
                {name: "用户", field: "user"},
                {name: "类型", field: "type"},
                {
                    name: "起止日期", field: "start_date", render: function (td, data) {
                        var txt = data.get("start_date") + " - " + data.get("end_date");
                        if (data.get('in_use') === true) {
                            txt += " <span class='color-success'><i class='fa fa-check'></i></span>"
                        }
                        td.innerHTML = txt;
                    }
                }, {
                    name: "上传时间", field: "created_at", render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("created_at"));
                    }
                },
                {
                    name: "License", field: "license", minimizable: true, minimized: true, style: {"padding": "0.2em"},
                    render: function (td, data) {
                        td.innerHTML = "<pre style='margin: 0'>" + (data.get('license') || "").trim() + "</pre>"
                    }
                }
            ]
        }
    }
}, {
    init: function () {
    },
    initFormModalValue: function () {
        z.dom.setValue("#fileInput", "");
    },
    handleModelOk: function () {
        var _this = this;
        pro.FileUtil.upload({
            files: z.dom.getValue("#fileInput"),
            url: AjaxUrl.sys_license.add,
            success: function () {
                z.widget.alert("License上传成功", z.getDefault("PRO_MESSAGE_TIPS"), function () {
                    window.top.location.reload();
                });
            }
        })
        return false;
    }
});