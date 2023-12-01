var ActionLog = z.util.mergeObject(pro.template.CRUDTablePage, {
    action_selects: [
        {name: "全部", value: ""},
        {name: "添加", value: "add"},
        {name: "删除", value: "delete"},
        {name: "更新", value: "update"},
        {name: "登录", value: "login"}
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
                {name: "模块", field: "module", width: 160},
                {
                    name: "用户", field: "username", width: 180,
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
                {name: "IP地址", field: "user_ip", width: 150},
                {
                    name: "操作", field: "action", width: 120,
                    render: function (td, data) {
                        var action = data.get("action");
                        td.innerHTML = ActionLog.getActionName(action) || action || "";
                    }
                },
                {
                    name: "操作结果", field: "result", width: 100,
                    render: function (td, data) {
                        pro.GridUtil.renderResult(td, data);
                    }
                },
                {
                    name: "请求数据", field: "req_data",
                    render: function (td, data) {
                        ActionLog.renderDetail(td, data, "req_data")
                    }
                },
                {
                    name: "结果数据", field: "res_data",
                    render: function (td, data) {
                        ActionLog.renderDetail(td, data, "res_data")
                    }
                },
                {
                    name: "时间", field: "created_at", width: 160,
                    render: function (td, data) {
                        td.innerHTML = pro.TimeUtil.format(data.get("created_at"))
                    }
                },
                {name: "备注", field: "description", minimized: true, minimizable: true}
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
            }
            var label = content;
            var _this = this;
            if (content.length > 100) {
                label = content.substring(0, 100) + "...";
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
            modal_title: field === "req_data" ? "请求数据" : "结果数据",
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
        pro.AjaxCache.query('ajax_cache_action_logs_modules', {url: AjaxUrl.sys_action_log.modules}, function (data) {
            (data || []).forEach(function (item) {
                item.module = data.name;//for select
            });
            var modules = z.util.mergeArray([{name: "全部", module: ""}], data)
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