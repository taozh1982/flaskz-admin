var License = z.util.mergeObject(pro.template.CRUDTablePage, {
    page_options: {
        url: AjaxUrl.sys_license,
        grid_options: {
            columns: [
                {name: z.i18n.t("SYS_LICENSES_USER"), field: "user"},
                {
                    name: z.i18n.t("SYS_LICENSES_TYPE"), field: "type",
                    render: function (td, data) {
                        td.innerHTML = License.getLicenseType(data.get("type"));
                    }
                },
                {
                    name: z.i18n.t("SYS_LICENSES_START_END_DATE"), field: "start_date",
                    render: function (td, data) {
                        var txt = data.get("start_date") + " - " + data.get("end_date");
                        if (data.get('in_use') === true) {
                            txt += " <span class='color-success'><i class='fa fa-check'></i></span>"
                        }
                        td.innerHTML = txt;
                    }
                }, {
                    name: z.i18n.t("SYS_LICENSES_UPLOAD_AT"), field: "created_at",
                    render: function (td, data) {
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
    },
    getLicenseType: function (type) {
        var typeMap = {
            "EVALUATION": z.i18n.t("SYS_LICENSES_TYPE_EVALUATION"),
            "RUNTIME": z.i18n.t("SYS_LICENSES_TYPE_RUNTIME")
        }
        return typeMap[type] || type;
    }
}, {
    initFormModalValue: function () {
        z.dom.setValue("#fileInput", "");
    },
    handleModelOk: function () {
        var _this = this;
        pro.FileUtil.upload({
            files: z.dom.getValue("#fileInput"),
            url: AjaxUrl.sys_license.add,
            success: function () {
                z.widget.alert(z.i18n.t("SYS_LICENSES_UPLOAD_SUCCESS_MSG"), z.i18n.t("PRO_MESSAGE_TIPS"), function () {
                    window.top.location.reload();
                });
            }
        })
        return false;
    }
});