var ActionLog = z.util.mergeObject(pro.template.CRUDTablePage, {
    action_selects: [
        {name: z.i18n.t("COMMON_ALL"), value: ""},
        {name: z.i18n.t("COMMON_ACTION_ADD"), value: "add"},
        {name: z.i18n.t("COMMON_ACTION_DELETE"), value: "delete"},
        {name: z.i18n.t("COMMON_ACTION_UPDATE"), value: "update"},
        {name: z.i18n.t("COMMON_ACTION_UPLOAD"), value: "upload"},
        {name: z.i18n.t("COMMON_ACTION_LOGIN"), value: "login"}
    ],
    /*ext_modules: [
        {
            name: "其他", children: [
                {name: "用户登录", module: "User-login"},
                {name: "退出登录", module: "User-logout"}
            ]
        }
    ],*/
    page_options: {
        url: AjaxUrl.sys_action_log,
        grid_options: {
            pageable: true,
            columns: [
                {
                    name: z.i18n.t("SYS_ACTION_LOGS_MODULE"), field: "module", width: 160,
                    render: function (td, data) {
                        var module = data.get("module");
                        td.innerHTML = ActionLog._getModuleI18nName(module);
                    }
                },
                {
                    name: z.i18n.t("SYS_ACTION_LOGS_USER"), field: "username", width: 180,
                    render: function (td, data) {
                        var user_name = data.get("user_name") || "";
                        var username = data.get("username") || "";
                        if (user_name) {
                            td.innerHTML = user_name + "(" + username + ")";
                        } else {
                            td.innerHTML = username;
                        }
                    }
                },
                {name: z.i18n.t("SYS_ACTION_LOGS_IP"), field: "user_ip", width: 150},
                {
                    name: z.i18n.t("COMMON_ACTION"), field: "action", width: 120,
                    render: function (td, data) {
                        var action = data.get("action");
                        td.innerHTML = ActionLog.getActionName(action) || action || "";
                    }
                },
                {
                    name: z.i18n.t("SYS_ACTION_LOGS_ACTION_RESULT"), field: "result", width: 110,
                    render: function (td, data) {
                        pro.GridUtil.renderResult(td, data);
                    }
                },
                {
                    name: z.i18n.t("SYS_ACTION_LOGS_REQ_RESULT"), field: "req_data",
                    render: function (td, data) {
                        ActionLog.renderDetail(td, data, "req_data")
                    }
                },
                {
                    name: z.i18n.t("SYS_ACTION_LOGS_RES_RESULT"), field: "res_data",
                    render: function (td, data) {
                        ActionLog.renderDetail(td, data, "res_data")
                    }
                },
                {
                    name: z.i18n.t("SYS_ACTION_LOGS_AT"), field: "created_at", width: 160,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("created_at"))
                    }
                },
                {name: z.i18n.t("COMMON_DESCRIPTION"), field: "description", minimized: true, minimizable: true}
            ]
        }
    },

    renderDetail: function (td, data, attr) {
        var content = data.get(attr);
        if (content) {
            var title;
            try {
                title = JSON.stringify(JSON.parse(content), null, "  ")
            } catch (e) {
                title = content;
                // title = title.replace(/[\\]+n/g, "\n").replace(/[\\]+/g, "");
            }
            var label = content;
            var _this = this;
            if (content.length > 60) {
                label = content.substring(0, 60) + "...";
            }
            var btn = pro.GridUtil.renderOperateButton(
                null, data, attr, td, _this.showDetail, {
                    attributes: {"title": this.decodeDetail(title), "field": attr},
                    this: _this
                }
            )
            btn.textContent = label;
        }
    },
    showDetail: function (evt) {
        var target = z.dom.event.getTarget(evt, 'button');
        if (target == null) {
            return;
        }
        var field = target.getAttribute("field");
        this.showFormModal("view", {
            modal_title: field === "req_data" ? z.i18n.t("SYS_ACTION_LOGS_REQ_RESULT") : z.i18n.t("SYS_ACTION_LOGS_RES_RESULT"),
            detail: target.getAttribute("title")
        })
    },
    decodeDetail: function (str) {
        return str.replace(/\\u([\d\w]{4})/gi, function (match, group) {
            return String.fromCharCode(parseInt(group, 16));
        });
    },
    getActionName: function (action) {
        this._actionNameMap = this._actionNameMap || pro.DataUtil.getArrayMap(this.action_selects, "value", "name");
        return this._actionNameMap[action];
    }
}, {
    initView: function () {
        pro.FormUtil.initSelectOptions("#actionSelect", this.action_selects);
    },
    initModel: function () {
        pro.AjaxCache.query('ajax_cache_action_logs_modules', {url: AjaxUrl.sys_action_log.modules, success_notify: false}, function (data) {
            var modules = z.util.mergeArray([{name: z.i18n.t("COMMON_ALL"), module: ""}], data)
            modules.forEach(function (item) {
                this._updateModuleItem(item);
            }, this);
            var ext_modules = this.ext_modules || [];
            if (ext_modules.length > 0) {
                modules = z.util.mergeArray(modules, ext_modules)
            }
            z.dom.initSelectOptions("#moduleSelect", modules, {
                value_field: "module"
            });
        }, this, function (result) {
            var menus = result.data;
            var levelMenus = pro.DataUtil.parseLevelData(menus);
            menus.forEach(function (item) {
                delete item.id;
                delete item.parent_id;
            });
            return levelMenus;
        });

        this.handleSearchChange();
    },
    _updateModuleItem: function (item) {
        var name = item.name;
        if (name) {
            if (!item.hasOwnProperty("module")) {
                item.module = name;
            }
            item.name = this._getModuleI18nName(name);//z.i18n.t(i18n_key) || name
        }
        z.util.eachArray(item.children || [], function (child) {
            this._updateModuleItem(child);
        }, this)
    },
    _getModuleI18nName: function (module) {
        var name = z.i18n.t("MODULE_" + module.trim().replace(/[- ]/g, "_").toUpperCase()) ||
            z.i18n.t("MODULE_" + module.trim().toUpperCase()) || module;
        return z.dom.create("<span>"+name+"</span>").textContent;
    },
    initController: function () {
        this.queryForm = z.form.Form(".module>.toolbar");
        this.queryForm.onFormChange(this.handleSearchChange, this);
    },
    handleSearchChange: function () {
        var query_params = this.queryForm.getValue();
        z.util.mergeObject(query_params, {
            created_at: this._getQueryDateRange(query_params.created_at)
        })
        this.setSearchConfig(query_params);
    },
    _getQueryDateRange: function (date_range) {
        var current = new Date();
        switch (date_range) {
            case "previous_24_hours":
                current.setSeconds(0);
                return {
                    ">=": z.util.formatDate(new Date(current - 24 * 60 * 60 * 1000))
                }
            case "previous_7_days":
                current.setHours(0, 0, 0, 0);
                return {
                    ">=": z.util.formatDate(new Date(current - 24 * 60 * 60 * 1000 * 6)) //include today
                }
            case "previous_30_days":
                current.setHours(0, 0, 0, 0);
                return {
                    ">=": z.util.formatDate(new Date(current - 24 * 60 * 60 * 1000 * 29)) //include today
                }
        }
    }
});