/*! Focus Pro v2.3.2 | http://focus-ui.com/ | 2023-01-01 */
(function(window, undefined) {
    z.setDefault({
        PRO_GRID_OPERATE_CLASS: "btn btn-link",
        PRO_GRID_OPERATE_UPDATE_LABEL: "Update",
        PRO_GRID_OPERATE_UPDATE_CLASS: "btn btn-link",
        PRO_GRID_OPERATE_DELETE_LABEL: "Delete",
        PRO_GRID_OPERATE_DELETE_CLASS: "btn btn-link",
        PRO_GRID_RESULT_KEY: "result",
        PRO_GRID_RESULT_SUCCESS_VALUE: "success",
        PRO_GRID_RESULT_SUCCESS_CLASS: "color-success",
        PRO_GRID_RESULT_SUCCESS_LABEL: "Success",
        PRO_GRID_RESULT_FAIL_VALUE: "fail",
        PRO_GRID_RESULT_FAIL_CLASS: "color-danger",
        PRO_GRID_RESULT_FAIL_LABEL: "Fail",
        PRO_GRID_HIGHLIGHT_CLASS: "filter-matched",
        PRO_AJAX_QUERY_METHOD: "GET",
        PRO_AJAX_QUERY_TIPS: "Query",
        PRO_AJAX_ADD_METHOD: "POST",
        PRO_AJAX_ADD_TIPS: "Add",
        PRO_AJAX_CREATE_METHOD: "POST",
        PRO_AJAX_CREATE_TIPS: "Create",
        PRO_AJAX_READ_METHOD: "GET",
        PRO_AJAX_READ_TIPS: "Read",
        PRO_AJAX_UPDATE_METHOD: "PATCH",
        PRO_AJAX_UPDATE_TIPS: "Update",
        PRO_AJAX_DELETE_METHOD: "DELETE",
        PRO_AJAX_DELETE_TIPS: "Delete",
        PRO_AJAX_TIMEOUT_TIPS: " Timeout",
        PRO_AJAX_FORBIDDEN_TIPS: " Forbidden",
        PRO_AJAX_EXCEPTION_TIPS: " Exception",
        PRO_AJAX_CLIENT_ERROR_TIPS: " Client Error",
        PRO_AJAX_SERVER_ERROR_TIPS: " Server Error",
        PRO_AJAX_SUCCESS_TIPS: " Success",
        PRO_AJAX_FAIL_TIPS: " Fail",
        PRO_AJAX_SUCCESS_STATE: "success",
        PRO_AJAX_UPLOAD_TIPS: "Upload",
        PRO_AJAX_UPLOAD_FILE_NAME: "file",
        PRO_AJAX_UPLOAD_METHOD: "POST",
        PRO_AJAX_NOTIFY_OPTIONS: {},
        PRO_TIME_FORMAT: "%Y-%m-%d %H:%M:%S",
        PRO_TIME_WEEKS: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
        PRO_TIME_MONTHS: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        PRO_MESSAGE_TIPS: "Tips",
        PRO_MESSAGE_DELETE_CONFIRM: "Confirm Delete?",
        PRO_MODAL_UPDATE_TITLE: "Update",
        PRO_MODAL_ADD_TITLE: "Add",
        PRO_MODAL_VIEW_TITLE: "View",
        PRO_MODAL_CONFIRM_TEXT: "Ok",
        PRO_MODAL_CANCEL_TEXT: "Cancel",
        PRO_MODAL_CONFIRM_CLASS: "btn btn-primary",
        PRO_MODAL_CANCEL_CLASS: "btn btn-outline-secondary",
        PRO_CRUDTABLEPAGE_GRID_OPTIONS: {
            hoverable: false,
            sortable: true,
            overflow: "scroll"
        },
        PRO_CRUDTABLEPAGE_MODAL_OPTIONS: {},
        PRO_CRUDTABLEPAGE_NESTED_MODAL_OPTIONS: {},
        PRO_CRUD_PAGE_MODAL_OPTIONS: {},
        PRO_GVIEW_TOOLBAR_ZOOM_IN_TITLE: "Zoom In",
        PRO_GVIEW_TOOLBAR_ZOOM_OUT_TITLE: "Zoom Out",
        PRO_GVIEW_TOOLBAR_ZOOM_FIT_TITLE: "Zoom Fit",
        PRO_GVIEW_TOOLBAR_RESET_TITLE: "Reset",
        PRO_GVIEW_TOOLBAR_SAVE_IMAGE_TITLE: "Save Image",
        PRO_SHEET_PROPERTY_COLUMN_NAME: "Property",
        PRO_SHEET_PROPERTY_COLUMN_FIELD: "name",
        PRO_SHEET_VALUE_COLUMN_NAME: "Value",
        PRO_SHEET_VALUE_FIELD: "_value",
        PRO_SHEET_PROPERTY_FIELD: "property"
    });
    var $Util = {
        runCode: function(code, vars, var_regex) {
            return z.util.exec(code, vars, var_regex);
        }
    };
    var $DomUtil = {
        createTableHTML: function(values, columns, attributes, inner) {
            var tt = "";
            if (z.type.isArray(values) && z.type.isArray(columns)) {
                var thead = "<tr>";
                var fields = [];
                columns.forEach(function(col) {
                    fields.push(col.field || col.key);
                    var name = col.title || col.name || col.label;
                    if (name == null) {
                        name = "";
                    }
                    thead += "<th " + (col.attributes || "") + ">" + name + "</th>";
                });
                thead += "</tr>";
                tt += thead;
                var tbody = "";
                var colCount = fields.length;
                values.forEach(function(rowData) {
                    var tr = "<tr>";
                    var tdList = [];
                    fields.forEach(function(field) {
                        var value = "";
                        if (field) {
                            value = rowData[field];
                            if (value == null) {
                                value = "";
                            }
                        }
                        tdList.push("<td>" + value + "</td>");
                    });
                    var span = rowData.span;
                    if (span > 0 && span <= colCount) {
                        tdList = tdList.splice(0, colCount - span + 1);
                        var lastTD = tdList.pop();
                        lastTD = lastTD.replace("<td>", "<td colspan='" + span + "'>");
                        tdList.push(lastTD);
                    }
                    tr += tdList.join("");
                    tr += "</tr>";
                    tbody += tr;
                });
                tt += tbody;
            }
            if (z.type.isObject(values)) {
                z.util.eachObject(values, function(key, value) {
                    if (value == null) {
                        value = "";
                    }
                    tt += "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
                });
            }
            if (inner === true) {
                return tt;
            }
            return "<table " + (attributes || "") + ">" + tt + "</table>";
        }
    };
    var $FormUtil = {
        initSelectOptions: function(selects, selectOptions, initOption) {
            return z.dom.initSelectOptions(selects, selectOptions, initOption);
        }
    };
    var $GridUtil = {
        renderResult: function(td, data, opts) {
            opts = z.util.mergeObject({
                key: z.getDefault("PRO_GRID_RESULT_KEY"),
                success_value: z.getDefault("PRO_GRID_RESULT_SUCCESS_VALUE"),
                success_class: z.getDefault("PRO_GRID_RESULT_SUCCESS_CLASS"),
                success_label: z.getDefault("PRO_GRID_RESULT_SUCCESS_LABEL"),
                fail_value: z.getDefault("PRO_GRID_RESULT_FAIL_VALUE"),
                fail_class: z.getDefault("PRO_GRID_RESULT_FAIL_CLASS"),
                fail_label: z.getDefault("PRO_GRID_RESULT_FAIL_LABEL")
            }, opts);
            var result;
            if (opts.hasOwnProperty("value")) {
                result = opts.value;
            } else {
                result = data.get(opts.key);
            }
            if (result != null) {
                var cls = "";
                var label = result;
                var options = opts.options;
                var statusItem;
                if (z.type.isArray(options)) {
                    statusItem = z.util.findArray(options, function(item) {
                        return item.value === result;
                    });
                    if (statusItem) {
                        cls = statusItem.class;
                        label = statusItem.label;
                    }
                } else {
                    if (result === opts.success_value) {
                        cls = opts.success_class;
                        label = opts.success_label;
                    } else if (result === opts.fail_value) {
                        cls = opts.fail_class;
                        label = opts.fail_label;
                    }
                }
                if (cls) {
                    label = "<span class='" + cls + "'>" + label + "</span>";
                }
                td.innerHTML = label;
            }
        }
    };
    z.util.mergeObject($GridUtil, {
        _getCellKey: function(grid, data, field, type) {
            if (field != null) {
                var arr = [ "" ];
                if (grid) {
                    arr.push(grid.id());
                }
                arr.push(data.id());
                arr.push(field);
                if (type) {
                    arr.push(type);
                }
                return arr.join("_") + "_$";
            }
        },
        getCellElement: function(grid, data, columnOrField, type) {
            var fk = $GridUtil._getCellKey(grid, data, columnOrField, type);
            if (fk) {
                return data[fk];
            }
        },
        _getCellField: function(columnOrField) {
            var field;
            if (columnOrField != null) {
                if (z.type.isString(columnOrField)) {
                    field = columnOrField;
                } else {
                    field = columnOrField.get("field");
                }
            }
            return field;
        },
        renderCell: function(grid, data, columnOrField, td, cellEleGenerator, option) {
            option = option || {};
            var eleAttr = option.attributes;
            var twoWayBind = option.bind;
            var updateCell = option.update;
            var type = option.type;
            var field;
            if (option.hasOwnProperty("field")) {
                field = option.field;
            } else {
                field = $GridUtil._getCellField(columnOrField);
            }
            var fk = $GridUtil._getCellKey(grid, data, field, type);
            var cellEle;
            if (fk) {
                cellEle = data[fk];
            }
            if (!cellEle) {
                if (z.type.isFunction(cellEleGenerator)) {
                    cellEle = cellEleGenerator(grid, data, columnOrField);
                } else {
                    cellEle = cellEleGenerator;
                }
                if (fk) {
                    data[fk] = cellEle;
                }
                if (twoWayBind === true) {
                    z.dom.event.onchange(cellEle, function() {
                        data.set(field, z.dom.getValue(cellEle));
                    });
                }
            }
            if (eleAttr) {
                z.dom.setAttribute(cellEle, eleAttr);
            }
            if (updateCell === true) {
                var value = data.get(field);
                if (value == null) {
                    value = "";
                }
                z.dom.setValue(cellEle, value);
            }
            td.appendChild(cellEle);
            return cellEle;
        },
        renderOperateButton: function(grid, data, columnOrField, td, onclick, option) {
            option = z.util.mergeObject({
                className: z.getDefault("PRO_GRID_OPERATE_CLASS")
            }, option);
            var btn = $GridUtil.renderCell(grid, data, columnOrField, td, function() {
                var btn = z.dom.create("button", option.className || z.getDefault("PRO_GRID_OPERATE_CLASS"));
                if (onclick) {
                    z.dom.event.onclick(btn, onclick, option.this);
                }
                return btn;
            }, option);
            if (btn) {
                btn.innerHTML = option.label || "";
            }
            return btn;
        },
        renderUpdateOperateButton: function(grid, data, columnOrField, td, onclick, option) {
            return $GridUtil.renderOperateButton(grid, data, columnOrField, td, onclick, z.util.mergeObject({
                className: z.getDefault("PRO_GRID_OPERATE_UPDATE_CLASS"),
                label: z.getDefault("PRO_GRID_OPERATE_UPDATE_LABEL")
            }, option));
        },
        renderDeleteOperateButton: function(grid, data, columnOrField, td, onclick, option) {
            return $GridUtil.renderOperateButton(grid, data, columnOrField, td, onclick, z.util.mergeObject({
                className: z.getDefault("PRO_GRID_OPERATE_DELETE_CLASS"),
                label: z.getDefault("PRO_GRID_OPERATE_DELETE_LABEL")
            }, option));
        },
        renderUpdateDeleteOperateButton: function(grid, data, columnOrField, td, onUpdate, onDelete, option) {
            option = option || {};
            var field = $GridUtil._getCellField(columnOrField) || "";
            option.field = option.update_field || field + "_update";
            $GridUtil.renderUpdateOperateButton(grid, data, columnOrField, td, onUpdate, option);
            option.field = option.delete_field || field + "_delete";
            $GridUtil.renderDeleteOperateButton(grid, data, columnOrField, td, onDelete, option);
        },
        renderInput: function(grid, data, columnOrField, td, option) {
            return $GridUtil._renderEditCell(grid, data, columnOrField, td, function() {
                return document.createElement("input");
            }, option);
        },
        renderSelect: function(grid, data, columnOrField, td, selectOptions, option) {
            return $GridUtil._renderEditCell(grid, data, columnOrField, td, function() {
                var select = document.createElement("select");
                z.dom.initSelectOptions(select, selectOptions);
                return select;
            }, option);
        },
        _renderEditCell: function(grid, data, columnOrField, td, cellEleGenerator, option) {
            return $GridUtil.renderCell(grid, data, columnOrField, td, cellEleGenerator, z.util.mergeObject({
                bind: true,
                update: true
            }, option));
        }
    });
    z.util.mergeObject($GridUtil, {
        createOPButton: function(td, data, buttonKey, label, onClick, opts) {
            var button = $GridUtil.appendRenderer(function() {
                opts = z.util.mergeObject({
                    className: z.getDefault("PRO_GRID_OPERATE_CLASS")
                }, opts);
                var btn = z.dom.create("button", opts.className);
                btn.innerHTML = label;
                if (onClick) {
                    z.dom.event.onclick(btn, onClick, opts.this);
                }
                return btn;
            }, td, data, buttonKey);
            button.innerHTML = label;
        },
        createUpdateOPButton: function(td, data, column, onClick, opts) {
            opts = z.util.mergeObject({
                className: z.getDefault("PRO_GRID_OPERATE_UPDATE_CLASS")
            }, opts);
            return $GridUtil.createOPButton(td, data, "update", z.getDefault("PRO_GRID_OPERATE_UPDATE_LABEL"), onClick, opts);
        },
        createDeleteOPButton: function(td, data, column, onClick, opts) {
            opts = z.util.mergeObject({
                className: z.getDefault("PRO_GRID_OPERATE_DELETE_CLASS")
            }, opts);
            return $GridUtil.createOPButton(td, data, "delete", z.getDefault("PRO_GRID_OPERATE_DELETE_LABEL"), onClick, opts);
        },
        createUpdateDeleteOPButton: function(td, data, column, onEditClick, onRemoveClick, opts) {
            $GridUtil.createUpdateOPButton(td, data, column, onEditClick, opts);
            $GridUtil.createDeleteOPButton(td, data, column, onRemoveClick, opts);
        }
    });
    z.util.mergeObject($GridUtil, {
        appendRenderInput: function(td, data, columnOrRendererKey, rendererAttr) {
            return $GridUtil.appendRenderer(function() {
                return document.createElement("input");
            }, td, data, columnOrRendererKey, rendererAttr, true);
        },
        appendRenderSelect: function(td, data, columnOrRendererKey, options, rendererAttr) {
            return $GridUtil.appendRenderer(function() {
                var select = document.createElement("select");
                $FormUtil.initSelectOptions(select, options);
                return select;
            }, td, data, columnOrRendererKey, rendererAttr, true);
        },
        appendRenderer: function(createFunction, td, data, columnOrRendererKey, rendererAttr, updatePropOnRendererChange) {
            var field;
            if (z.type.isString(columnOrRendererKey)) {
                field = columnOrRendererKey;
            } else {
                field = columnOrRendererKey.get("field");
            }
            var fk;
            if (field) {
                fk = "_" + field + "_$";
            }
            var renderer;
            if (fk) {
                renderer = data[fk];
            }
            if (!renderer) {
                if (z.type.isFunction(createFunction)) {
                    renderer = createFunction();
                } else {
                    renderer = createFunction;
                }
                if (fk) {
                    data[fk] = renderer;
                }
                if (updatePropOnRendererChange === true) {
                    z.dom.event.onchange(renderer, function() {
                        data.set(field, z.dom.getValue(renderer));
                    });
                }
            }
            if (rendererAttr) {
                z.dom.setAttribute(renderer, rendererAttr);
            }
            z.dom.setValue(renderer, data.get(field) || "");
            td.appendChild(renderer);
            return renderer;
        },
        getCachedRenderer: function(data, columnOrRendererKey) {
            var field;
            if (z.type.isString(columnOrRendererKey)) {
                field = columnOrRendererKey;
            } else {
                field = columnOrRendererKey.get("field");
            }
            return data["_" + field + "_$"];
        },
        createNestedGrid: function(td, items, cls) {
            if (items && items.length > 0) {
                var table = z.dom.create("table");
                items.forEach(function(item) {
                    var tr = z.dom.create("tr");
                    if (cls) {
                        tr.innerHTML = "<td class='" + cls + "'>" + item + "</td>";
                    } else {
                        tr.innerHTML = "<td>" + item + "</td>";
                    }
                    table.appendChild(tr);
                });
                td.appendChild(table);
                z.dom.addClass(td, "nested_td");
            }
        }
    });
    z.util.mergeObject($GridUtil, {
        addInputFilter: function(grid, filterInput, columns, options) {
            if (!z.dom.query(filterInput)) {
                return;
            }
            if (columns == null) {
                columns = [];
                grid.getColumnArray().forEach(function(colData) {
                    columns.push(z.util.mergeObject({
                        render: colData.render
                    }, colData.getProperties()));
                });
            }
            if (!z.type.isArray(columns) || columns.length < 1) {
                return;
            }
            var filterValue = z.dom.getValue(filterInput).trim();
            var updateFilter = function(value) {
                if (arguments.length > 0) {
                    z.dom.setValue(filterInput, value);
                    filterValue = value;
                } else {
                    filterValue = z.dom.getValue(filterInput).trim();
                }
                grid.update();
            };
            grid.updateInputFilter = updateFilter;
            z.dom.event.on(filterInput, "input", function() {
                updateFilter();
            });
            z.dom.event.on(filterInput, "keydown.Escape", function(evt) {
                updateFilter("");
            });
            options = options || {};
            if (options.highlight === true) {
                var highlight_class = options.highlight_class || z.getDefault("PRO_GRID_HIGHLIGHT_CLASS");
                columns.forEach(function(column) {
                    if (column.filter !== false && column.type !== "check" && column.template == null) {
                        var _column = grid.findColumn("field", column.field) || column;
                        var render = column.render;
                        if (z.type.isFunction(render)) {
                            _column.render = function(td, data, column) {
                                render(td, data, column);
                                if (filterValue) {
                                    td.innerHTML = $GridUtil._getFilterMatchValue(td.innerHTML, filterValue, highlight_class);
                                }
                            };
                        } else {
                            _column.render = function(td, data) {
                                var field = column.field;
                                if (field) {
                                    var value = z.util.getObjectDeepValue(data.getProperties(false), field);
                                    if (value == null) {
                                        value = "";
                                    }
                                    if (filterValue) {
                                        td.innerHTML = $GridUtil._getFilterMatchValue(value, filterValue, highlight_class);
                                    } else {
                                        td.innerHTML = value;
                                    }
                                }
                            };
                        }
                    }
                });
            }
            grid.addVisibleFilter(function(data) {
                if (filterValue) {
                    return $GridUtil._columnContains(grid, columns, data, filterValue.toLowerCase());
                }
                return true;
            });
        },
        _columnContains: function(grid, columns, data, filterText) {
            var has = false;
            var td = z.dom.create("td");
            columns.forEach(function(column) {
                if (column.filter !== false) {
                    var render = column.render;
                    if (z.type.isFunction(render)) {
                        td.innerHTML = "";
                        render(td, data);
                        var inner = td.innerHTML;
                        if (inner && inner.toLowerCase().indexOf(filterText) >= 0) {
                            has = true;
                        }
                    } else {
                        var field = column.field;
                        if (field) {
                            z.util.eachArray(field.split("|"), function(fieldItem) {
                                var prop = z.util.getObjectDeepValue(data.getProperties(false), fieldItem);
                                if (prop && (prop + "").toLowerCase().indexOf(filterText) >= 0) {
                                    has = true;
                                    return false;
                                }
                            });
                        }
                    }
                }
            });
            return has;
        },
        _getFilterMatchValue: function(value, filterValue, highlight_class) {
            if (value !== null) {
                var highlightStart = '<span class="' + highlight_class + '">';
                return (value + "").replace(new RegExp(filterValue, "gi"), function(val) {
                    return highlightStart + val + "</span>";
                });
            }
            return "";
        }
    });
    var $VisibleUtil = {
        addInputVisibleFilter: function(view, filterInput, matchProperty) {
            var matchFunc;
            if (z.type.isFunction(matchProperty)) {
                matchFunc = matchProperty;
            } else {
                if (!z.type.isString(matchProperty)) {
                    matchProperty = "name";
                }
                matchProperty = matchProperty.trim();
                matchFunc = function(data, filterValue) {
                    if (filterValue) {
                        filterValue = filterValue.toLowerCase();
                        var prop = data.get(matchProperty);
                        return prop !== null && (prop + "").toLowerCase().indexOf(filterValue) >= 0;
                    }
                    return true;
                };
            }
            view.addVisibleFilter(function(data) {
                var filterValue = z.dom.getValue(filterInput).trim();
                return matchFunc(data, filterValue);
            });
            z.dom.event.on(filterInput, "input", function() {
                view.update();
            });
            z.dom.event.on(filterInput, "keydown.Escape", function(evt) {
                z.dom.setValue(filterInput, "");
                view.update();
            });
        }
    };
    var $ModalUtil = {
        createModal: function(options) {
            options = z.util.mergeObject({
                confirm_class: z.getDefault("PRO_MODAL_CONFIRM_CLASS"),
                confirm_text: z.getDefault("PRO_MODAL_CONFIRM_TEXT"),
                cancel_class: z.getDefault("PRO_MODAL_CANCEL_CLASS"),
                cancel_text: z.getDefault("PRO_MODAL_CANCEL_TEXT")
            }, options);
            var modal_class = "zw-modal";
            if (options.modal_class) {
                modal_class += " " + options.modal_class;
            }
            var modalDiv = z.dom.create("div", modal_class);
            if (options.id) {
                modalDiv.setAttribute("id", options.id);
            }
            var content = z.dom.create("div", "content");
            var header = z.dom.create("div", "header");
            header.innerHTML = "<span class='title'>" + (options.title || "") + "</span><span class='close' data-dismiss='modal'>×</span>";
            var body = z.dom.create("div", "body");
            if (options.body_id) {
                body.setAttribute("id", options.body_id);
            }
            var footer = z.dom.create("div", "footer");
            if (options.confirm_button !== false) {
                var confirmBtn = z.dom.create("button", options.confirm_class || "");
                confirmBtn.innerHTML = options.confirm_text;
                if (options.confirm_click) {
                    z.dom.event.onclick(confirmBtn, options.confirm_click);
                }
                footer.appendChild(confirmBtn);
            }
            if (options.cancel_button !== false) {
                var cancelBtn = z.dom.create("button", options.cancel_class || "");
                cancelBtn.setAttribute("data-dismiss", "modal");
                cancelBtn.innerHTML = options.cancel_text;
                footer.appendChild(cancelBtn);
            }
            content.appendChild(header);
            content.appendChild(body);
            if (footer.childNodes.length > 0) {
                content.appendChild(footer);
            }
            modalDiv.appendChild(content);
            if (options.parent) {
                z.dom.query(options.parent).appendChild(modalDiv);
            }
            return modalDiv;
        }
    };
    var $AjaxCRUD = {
        query: function(options) {
            $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_QUERY_METHOD"),
                tips: z.getDefault("PRO_AJAX_QUERY_TIPS")
            }));
        },
        add: function(options) {
            $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_ADD_METHOD"),
                tips: z.getDefault("PRO_AJAX_ADD_TIPS")
            }));
        },
        create: function(options) {
            $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_CREATE_METHOD"),
                tips: z.getDefault("PRO_AJAX_CREATE_TIPS")
            }));
        },
        read: function(options) {
            $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_READ_METHOD"),
                tips: z.getDefault("PRO_AJAX_READ_TIPS")
            }));
        },
        update: function(options) {
            $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_UPDATE_METHOD"),
                tips: z.getDefault("PRO_AJAX_UPDATE_TIPS")
            }));
        },
        delete: function(options) {
            $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_DELETE_METHOD"),
                tips: z.getDefault("PRO_AJAX_DELETE_TIPS")
            }));
        },
        ajax: function(options) {
            var tips = options.tips;
            var loading = options.loading;
            if (loading !== false) {
                z.widget.loading(tips, options.loading_parent);
            }
            var url = options.url;
            var method = options.method || "GET";
            if (z.type.isObject(url)) {
                method = url.method || method;
                url = url.url;
            }
            url = $AjaxCRUD._getURL(url, options.url_params);
            return z.ajax.ajax(method, url, options.data, z.util.mergeObject({
                complete: function(status, result) {
                    if (loading !== false) {
                        z.widget.loading(false, options.loading_parent);
                    }
                    var failContent;
                    var codeType = status / 100 | 0;
                    if (codeType === 2) {
                        if (result.hasOwnProperty("status") && result.status !== z.getDefault("PRO_AJAX_SUCCESS_STATE")) {
                            failContent = z.getDefault("PRO_AJAX_FAIL_TIPS");
                        }
                    } else if (codeType === 4) {
                        if (status === 408) {
                            failContent = tips + z.getDefault("PRO_AJAX_TIMEOUT_TIPS");
                        } else {
                            failContent = z.getDefault("PRO_AJAX_CLIENT_ERROR_TIPS");
                        }
                    } else if (codeType === 5) {
                        failContent = z.getDefault("PRO_AJAX_SERVER_ERROR_TIPS");
                    } else {
                        failContent = tips + z.getDefault("PRO_AJAX_EXCEPTION_TIPS");
                    }
                    if (options.complete) {
                        options.complete.apply(options.context, [ result ]);
                    }
                    if (failContent != null) {
                        if (z.type.isObject(result)) {
                            failContent = result.message || failContent;
                        }
                        if (options.fail_notify !== false) {
                            $AjaxCRUD.showError(failContent);
                        }
                        if (options.error) {
                            options.error.apply(options.context, [ result ]);
                        }
                        return;
                    }
                    if (options.success_notify !== false) {
                        z.widget.notify(tips + z.getDefault("PRO_AJAX_SUCCESS_TIPS"), z.util.mergeObject({
                            type: "success",
                            duration: 1e3
                        }, z.getDefault("PRO_AJAX_NOTIFY_OPTIONS")));
                    }
                    if (options.success) {
                        options.success.apply(options.context, [ result ]);
                    }
                }
            }, options.ajax_options));
        },
        showError: function(error) {
            z.widget.notify(error, z.util.mergeObject({
                type: "error",
                close_on_click: false
            }, z.getDefault("PRO_AJAX_NOTIFY_OPTIONS")));
        },
        _getURL: function(url, url_params) {
            if (z.type.isObject(url_params)) {
                return url.replace(/([\[({])(.+?)([\])}])/g, function(word) {
                    var d_model = word.substr(1, word.length - 2);
                    var v = z.util.getObjectDeepValue(url_params, d_model);
                    if (v != null) {
                        return v;
                    }
                    return v || "";
                });
            }
            return url;
        },
        _getOptions: function(options, defaultOptions) {
            if (z.type.isString(options)) {
                options = {
                    url: options
                };
            }
            return z.util.mergeObject({}, defaultOptions, options);
        }
    };
    var $AjaxCache = {
        _ajaxQueryCBMap: {},
        query: function(cacheKey, ajaxOption, callback, thisArg, resultParser, cbArgsParser) {
            var data = z.bom.getSessionStorage(cacheKey);
            if (data) {
                var args = [ data ];
                if (cbArgsParser) {
                    args = cbArgsParser(data);
                }
                callback.apply(thisArg, args);
                return;
            }
            $AjaxCache._queryAndCache.apply($AjaxCache, arguments);
        },
        refresh: function(cacheKey, ajaxOption, callback, thisArg, resultParser, cbArgsParser) {
            $AjaxCache._queryAndCache.apply($AjaxCache, arguments);
        },
        _queryAndCache: function(cacheKey, ajaxOption, callback, thisArg, resultParser, cbArgsParser) {
            var cbArray = $AjaxCache._ajaxQueryCBMap[cacheKey] = $AjaxCache._ajaxQueryCBMap[cacheKey] || [];
            cbArray.push({
                callback: callback,
                context: thisArg
            });
            if (cbArray.length > 1) {
                return;
            }
            pro.AjaxCRUD.query(z.util.mergeObject({
                success: function(result) {
                    var data = result.data;
                    if (resultParser) {
                        data = resultParser(result, result.data);
                    }
                    z.bom.setSessionStorage(cacheKey, data, 30);
                    var args = [ data ];
                    if (cbArgsParser) {
                        args = cbArgsParser(data);
                    }
                    cbArray.forEach(function(item) {
                        if (item.callback) {
                            item.callback.apply(item.context, args);
                        }
                    });
                    delete $AjaxCache._ajaxQueryCBMap[cacheKey];
                }
            }, ajaxOption));
        },
        clear: function(obj, args) {
            if (arguments.length === 1) {
                z.bom.removeSessionStorage(function(key) {
                    return key.startsWith(obj._key);
                });
            } else {
                z.bom.removeSessionStorage(obj._getKey(args));
            }
        }
    };
    var $FileUtil = {
        download: function(url, urlParameters, attrs) {
            var link = $FileUtil._getDownloadLink();
            link.href = $AjaxCRUD._getURL(url, urlParameters);
            if (attrs) {
                z.dom.setAttribute(link, attrs);
            }
            document.body.appendChild(link);
            link.click();
            z.dom.remove(link);
        },
        upload: function(options) {
            var files = options.files;
            var len = files.length;
            if (len === 0) {
                return;
            }
            var filename = options.filename || z.getDefault("PRO_AJAX_UPLOAD_FILE_NAME");
            var formData = new FormData();
            if (len === 1) {
                formData.append(filename, files[0]);
            } else {
                for (var i = 0; i < len; i++) {
                    formData.append(filename + "_" + i, files[i]);
                }
            }
            return $AjaxCRUD.ajax($AjaxCRUD._getOptions(options, {
                method: z.getDefault("PRO_AJAX_UPLOAD_METHOD"),
                tips: z.getDefault("PRO_AJAX_UPLOAD_TIPS"),
                data: formData,
                ajax_options: {
                    headers: {
                        "Content-Type": false
                    }
                }
            }));
        },
        addClickToSelectFileListener: function(ele, selectFileCallback, context, fileInputAttr) {
            var fileInput = $FileUtil._addHiddenFileInput(ele, fileInputAttr);
            z.dom.event.onclick(ele, function() {
                fileInput.value = "";
                fileInput.click();
            }, this);
            z.dom.event.onchange(fileInput, function() {
                selectFileCallback.apply(context, [ fileInput.files ]);
            });
            return fileInput;
        },
        _getDownloadLink: function() {
            var link = $FileUtil._downloadLink;
            if (!link) {
                link = z.dom.create("a");
                link.setAttribute("target", "_blank");
                link.setAttribute("download", "");
                $FileUtil._downloadLink = link;
            }
            return link;
        },
        _addHiddenFileInput: function(hostEle, fileInputAttr) {
            var input = z.dom.create("input");
            z.dom.setStyle(input, "display", "none");
            z.dom.setAttribute(input, z.util.mergeObject({
                type: "file",
                name: "fileToUpload"
            }, fileInputAttr));
            z.dom.insertAfter(input, hostEle);
            return input;
        }
    };
    var $TimeUtil = {
        format: function(dateTime, outputFormat, dateFormat) {
            if (dateTime == null) {
                return "";
            }
            if (!(dateTime instanceof Date)) {
                dateTime = $TimeUtil._getDate(dateTime, dateFormat);
            }
            if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
                return "";
            }
            if (outputFormat == null) {
                outputFormat = z.getDefault("PRO_TIME_FORMAT");
            }
            var aDays = z.getDefault("PRO_TIME_WEEKS"), aMonths = z.getDefault("PRO_TIME_MONTHS");
            var nDay = dateTime.getDay(), nDate = dateTime.getDate(), nMonth = dateTime.getMonth(), nYear = dateTime.getFullYear(), nHour = dateTime.getHours(), aDayCount = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], isLeapYear = function() {
                if ((nYear & 3) !== 0) return false;
                return nYear % 100 !== 0 || nYear % 400 === 0;
            }, getThursday = function() {
                var target = new Date(dateTime);
                target.setDate(nDate - (nDay + 6) % 7 + 3);
                return target;
            }, zeroPad = function(nNum, nPad) {
                return ("" + (Math.pow(10, nPad) + nNum)).slice(1);
            };
            return outputFormat.replace(/%[a-z]/gi, function(sMatch) {
                return {
                    "%a": aDays[nDay].slice(0, 3),
                    "%A": aDays[nDay],
                    "%b": aMonths[nMonth].slice(0, 3),
                    "%B": aMonths[nMonth],
                    "%c": dateTime.toUTCString(),
                    "%C": Math.floor(nYear / 100),
                    "%d": zeroPad(nDate, 2),
                    "%e": nDate,
                    "%F": dateTime.toISOString().slice(0, 10),
                    "%G": getThursday().getFullYear(),
                    "%g": ("" + getThursday().getFullYear()).slice(2),
                    "%H": zeroPad(nHour, 2),
                    "%I": zeroPad((nHour + 11) % 12 + 1, 2),
                    "%j": zeroPad(aDayCount[nMonth] + nDate + (nMonth > 1 && isLeapYear() ? 1 : 0), 3),
                    "%k": "" + nHour,
                    "%l": (nHour + 11) % 12 + 1,
                    "%m": zeroPad(nMonth + 1, 2),
                    "%M": zeroPad(dateTime.getMinutes(), 2),
                    "%p": nHour < 12 ? "AM" : "PM",
                    "%P": nHour < 12 ? "am" : "pm",
                    "%s": Math.round(dateTime.getTime() / 1e3),
                    "%S": zeroPad(dateTime.getSeconds(), 2),
                    "%u": nDay || 7,
                    "%V": function() {
                        var target = getThursday(), n1stThu = target.valueOf();
                        target.setMonth(0, 1);
                        var nJan1 = target.getDay();
                        if (nJan1 !== 4) target.setMonth(0, 1 + (4 - nJan1 + 7) % 7);
                        return zeroPad(1 + Math.ceil((n1stThu - target) / 6048e5), 2);
                    }(),
                    "%w": "" + nDay,
                    "%x": dateTime.toLocaleDateString(),
                    "%X": dateTime.toLocaleTimeString(),
                    "%y": ("" + nYear).slice(2),
                    "%Y": nYear,
                    "%z": dateTime.toTimeString().replace(/.+GMT([+-]\d+).+/, "$1"),
                    "%Z": dateTime.toTimeString().replace(/.+\((.+?)\)$/, "$1")
                }[sMatch] || sMatch;
            });
        },
        utcToLocal: function(date) {
            if (date == null) {
                return null;
            }
            if (z.type.isString(date)) {
                date = new Date(date);
            }
            if (!date instanceof Date) {
                return null;
            }
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        },
        _getDate: function(dateTime, dateFormat) {
            if (dateTime != null) {
                if (z.type.isString(dateTime)) {
                    if (dateFormat) {
                        dateTime = $TimeUtil.parse(dateTime, dateFormat);
                    } else {
                        if (dateTime.endsWith("GMT")) {
                            dateTime = $TimeUtil.utcToLocal(dateTime);
                        } else {
                            dateTime = dateTime.replace("T", " ");
                            dateTime = new Date(dateTime);
                        }
                    }
                } else if (z.type.isNumber(dateTime)) {
                    dateTime = new Date(dateTime);
                }
                if (dateTime instanceof Date) {
                    return dateTime;
                }
            }
            return null;
        }
    };
    z.util.mergeObject($TimeUtil, {
        _parseFormat: {
            "%": [ "%", function() {} ],
            a: [ "[a-z]+", function(matched) {} ],
            A: [ "[a-z]+", function(matched) {} ],
            b: [ "[a-z]+", function(matched) {
                this.setUTCMonth($TimeUtil._parseMonthMap[matched]);
            } ],
            B: [ "[a-z]+", function(matched) {
                this.setUTCMonth($TimeUtil._parseMonthMap[matched.slice(0, 3)]);
            } ],
            Y: [ "[0-9]{4}", function(matched) {
                this.setUTCFullYear(+matched);
            } ],
            m: [ "[0-9]{0,2}", function(matched) {
                this.setUTCMonth(+matched - 1);
            } ],
            d: [ "[0-9]{0,2}", function(matched) {
                this.utcDay = +matched;
            } ],
            H: [ "[0-9]{0,2}", function(matched) {
                this.setUTCHours(+matched);
            } ],
            M: [ "[0-9]{0,2}", function(matched) {
                this.setUTCMinutes(+matched);
            } ],
            S: [ "[0-9]{0,2}", function(matched) {
                this.setUTCSeconds(+matched);
            } ],
            s: [ "[0-9]+", function(matched) {
                this.setUTCMilliseconds(+matched);
            } ],
            z: [ "[+-][0-9]{4}", function(matched) {
                this.timezone = +matched.slice(0, 3) * (60 * 60) + +matched.slice(3, 5) * 60;
            } ],
            Z: [ "UTC|Z|[+-][0-9][0-9]:?[0-9][0-9]", function(matched) {
                if (matched === "Z") {
                    return;
                }
                if (matched === "UTC") {
                    return;
                }
                matched = matched.replace(/:/, "");
                this.timezone = +matched.slice(0, 3) * (60 * 60) + +matched.slice(3, 5) * 60;
            } ],
            I: [ "[0-9]{0,2}", function(matched) {
                this.setUTCHours(+matched);
            } ],
            p: [ "AM|PM", function(matched) {
                this.AMPM = matched;
            } ]
        },
        _parseMonthMap: {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        },
        parse: function(str, format) {
            if (!format) {
                return null;
            }
            var ff = [];
            var null_fd = false;
            var re = new RegExp(format.replace(/%(?:([a-zA-Z%])|('[^']+')|("[^"]+"))/g, function(_, a, b, c) {
                var fd = a || b || c;
                var d = $TimeUtil._parseFormat[fd];
                if (!d) {
                    null_fd = true;
                } else {
                    ff.push(d[1]);
                    return "(" + d[0] + ")";
                }
            }), "i");
            if (null_fd === true) {
                return null;
            }
            var matched = str.match(re);
            if (!matched) {
                return null;
            }
            var date = new Date(0);
            for (var i = 0, len = ff.length; i < len; i++) {
                var fun = ff[i];
                if (!fun) continue;
                fun.call(date, matched[i + 1]);
            }
            if (date.utcDay) {
                date.setUTCDate(date.utcDay);
            }
            if (date.timezone) {
                date = new Date(date.getTime() - date.timezone * 1e3);
            }
            if (date.AMPM) {
                if (date.getUTCHours() === 12) {
                    date.setUTCHours(date.getUTCHours() - 12);
                }
                if (date.AMPM === "PM") {
                    date.setUTCHours(date.getUTCHours() + 12);
                }
            }
            return date;
        }
    });
    var $DataUtil = {
        parseLevelData: function(levelData, options) {
            options = z.util.mergeObject({
                id: "id",
                parent: "parent_id",
                children: "children"
            }, options);
            var idKey = options.id;
            var parentKey = options.parent;
            var idMap = {};
            levelData.forEach(function(item) {
                idMap[item[idKey]] = item;
            });
            var childrenArr = [];
            levelData.forEach(function(item) {
                var parent_id = item[parentKey];
                if (parent_id) {
                    childrenArr.push(item);
                    var parent = idMap[parent_id];
                    if (parent) {
                        var children = parent[options.children];
                        if (children == null) {
                            children = [];
                            parent.children = children;
                        }
                        children.push(item);
                    }
                }
            });
            return z.util.filterArray(levelData, function(item) {
                return childrenArr.indexOf(item) < 0;
            });
        },
        getArrayMap: function(arr, mapKey, mapValueKey, itemChildrenKey) {
            var map = {};
            if (mapKey == null) {
                mapKey = "value";
            }
            if (itemChildrenKey !== false) {
                if (!z.type.isString(itemChildrenKey)) {
                    itemChildrenKey = "children";
                }
            } else {
                itemChildrenKey = null;
            }
            $DataUtil._fillArrayMap(map, arr, mapKey, mapValueKey, itemChildrenKey);
            return map;
        },
        _fillArrayMap: function(map, arr, mapKey, mapValueKey, itemChildrenKey) {
            arr.forEach(function(item) {
                if (z.type.isObject(item)) {
                    var kv = item[mapKey];
                    if (mapValueKey) {
                        map[kv] = item[mapValueKey];
                    } else {
                        map[kv] = item;
                    }
                    if (itemChildrenKey != null && z.type.isArray(item[itemChildrenKey])) {
                        $DataUtil._fillArrayMap(map, item.children, mapKey, mapValueKey, itemChildrenKey);
                    }
                } else {
                    map[item] = item;
                }
            });
        },
        parseToKVData: function(data) {
            if (z.type.isString(data)) {
                data = JSON.parse(data);
            }
            var resultArr = [];
            if (z.type.isObject(data)) {
                $DataUtil._parseObjKVData(resultArr, data);
            } else if (z.type.isArray(data)) {
                $DataUtil._parseKVArrData(resultArr, data);
            }
        },
        _parseObjKVData: function(dataArr, objValue) {
            z.util.eachObject(objValue, function(key, value) {
                var itemData = {
                    key: key,
                    children: []
                };
                dataArr.push(itemData);
                if (z.type.isArray(value)) {
                    itemData.key += ":[]";
                    $DataUtil._parseKVArrData(itemData.children, value);
                } else if (z.type.isObject(value)) {
                    itemData.key += ":{}";
                    $DataUtil._parseObjKVData(itemData.children, value);
                } else {
                    itemData.value = value;
                }
            });
        },
        _parseKVArrData: function(dataArr, arrValue) {
            arrValue.forEach(function(item, index) {
                var itemData = {
                    key: index,
                    children: []
                };
                dataArr.push(itemData);
                if (z.type.isArray(item)) {
                    $DataUtil._parseKVArrData(itemData.children, item);
                } else if (z.type.isObject(item)) {
                    $DataUtil._parseObjKVData(itemData.children, item);
                } else {
                    itemData.value = item;
                }
            });
        }
    };
    var $ValidUtil = {
        isBlank: function(value) {
            return value == null || /^[\s]*$/.test(value);
        },
        isEmail: function(value) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        },
        isInteger: function(value) {
            return /^-?\d+$/.test(value);
        },
        isNumeric: function(value) {
            return /^-?\d*\.?\d+$/.test(value);
        },
        isAlphaNumeric: function(value) {
            return /^[a-zA-Z0-9]+$/.test(value);
        },
        isAlphaNumericDash: function(value) {
            return /^[a-zA-Z0-9_\-]+$/.test(value);
        },
        isAlphaNumericSpace: function(value) {
            return /^[a-zA-Z0-9 ]+$/.test(value);
        },
        isIPV4: function(value) {
            return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
        },
        isIPV4Mask: function(value) {
            return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(value);
        },
        isIPV6: function(value) {
            return /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(value);
        },
        isIPV6Mask: function(value) {
            return /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/.test(value);
        },
        isIP: function(value) {
            return /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/.test(value);
        }
    };
    var $NetworkUtil = {
        getAddressAndMask: function(address) {
            address = address.split("/");
            var maskBit = address[1];
            return address[0] + "/" + $NetworkUtil.getSubnetMask(maskBit == null ? 32 : maskBit);
        },
        getSubnetMask: function(bit) {
            var bArr = [];
            bit = bit | 0;
            for (var i = 0; i < 32; i++) {
                bArr[i] = i < bit ? "1" : "0";
            }
            var maskArr = [];
            for (var m = 0; m < 4; m++) {
                var item = "";
                for (var n = 0; n < 8; n++) {
                    item += bArr[m * 8 + n];
                }
                maskArr.push(item);
            }
            var mask = [];
            maskArr.forEach(function(item) {
                mask.push(parseInt(item, 2));
            });
            return mask.join(".");
        },
        getSubnetMaskBit: function(mask) {
            var str = "";
            mask.split(".").forEach(function(item) {
                item = (item | 0).toString(2);
                str += "00000000".slice(0, 8 - item.length) + item;
            });
            str = str.split("");
            var len = str.length;
            for (var i = 0; i < len; i++) {
                if (str[i] === "0") {
                    return i;
                }
            }
            return 32;
        }
    };
    var $SheetUtil = {
        parseToKVData: function(data, option) {
            option = z.util.mergeObject({
                key_field: "key",
                value_field: "value",
                children_field: "children",
                array_index_prefix: "#",
                array_type_suffix: ":[]",
                object_type_suffix: ":{}"
            }, option);
            if (z.type.isString(data)) {
                data = JSON.parse(data);
            }
            var resultArr = [];
            if (z.type.isObject(data)) {
                $SheetUtil._parseObjKVData(resultArr, data, option);
            } else if (z.type.isArray(data)) {
                $SheetUtil._parseKVArrData(resultArr, data, option);
            }
            return resultArr;
        },
        _parseObjKVData: function(resultArr, objValue, option) {
            z.util.eachObject(objValue, function(key, value) {
                var key_field = option.key_field;
                var value_field = option.value_field;
                var itemData = {};
                itemData[key_field] = key;
                itemData[option.children_field] = [];
                resultArr.push(itemData);
                if (z.type.isArray(value)) {
                    itemData[key_field] += option.array_type_suffix;
                    $SheetUtil._parseKVArrData(itemData.children, value, option);
                } else if (z.type.isObject(value)) {
                    itemData[key_field] += option.object_type_suffix;
                    $SheetUtil._parseObjKVData(itemData.children, value, option);
                } else {
                    itemData[value_field] = value;
                }
            });
        },
        _parseKVArrData: function(resultArr, arrValue, option) {
            arrValue.forEach(function(item, index) {
                var key_field = option.key_field;
                var value_field = option.value_field;
                var itemData = {};
                itemData[key_field] = option.array_index_prefix + (index + 1);
                itemData[option.children_field] = [];
                resultArr.push(itemData);
                if (z.type.isArray(item)) {
                    $SheetUtil._parseKVArrData(itemData.children, item, option);
                } else if (z.type.isObject(item)) {
                    $SheetUtil._parseObjKVData(itemData.children, item, option);
                } else {
                    itemData[value_field] = item;
                }
            });
        }
    };
    var $AccessControl = {
        setPermissions: function(permissions) {
            window._acPermissions_$ = permissions || [];
            this.updateControls();
        },
        hasUpdatePermission: function() {
            return this.hasPermission("update");
        },
        hasPermission: function(op_permission) {
            return this.getACPermissions().indexOf(op_permission) > -1;
        },
        getACPermissions: function() {
            if (window._acPermissions_$ == null) {
                var all_module_permissions = z.bom.getSessionStorage("module_permissions") || {};
                var module = this.getPageModule();
                var module_permissions = all_module_permissions[module];
                if (module_permissions == null) {
                    module = module.replace(/_/g, "-");
                    module_permissions = all_module_permissions[module];
                }
                window._acPermissions_$ = module_permissions || [];
            }
            return window._acPermissions_$;
        },
        getPageModule: function() {
            var page_module = window.ac_module || z.bom.getLocationSearchParam("module");
            if (page_module == null) {
                page_module = z.util.findArray(window.location.pathname.split("/").reverse(), function(item) {
                    return item !== "";
                }) || "";
                page_module = page_module.split(".")[0];
            }
            return page_module;
        },
        updateControls: function() {
            var acPermissions = this.getACPermissions();
            this._getControls().forEach(function(acEle) {
                var opt = acEle._ac_opt_$ || {};
                var ac_permission = opt.ac_permission;
                if (acPermissions.indexOf(ac_permission) < 0) {
                    z.dom.remove(acEle);
                } else {
                    var parentNode = opt.parentNode;
                    if (parentNode) {
                        var parentChildNodes = opt.parentChildNodes;
                        var index = opt.index;
                        var count = parentChildNodes.length;
                        for (var i = index + 1; i < count; i++) {
                            var nextSibling = parentChildNodes[i];
                            if (nextSibling && nextSibling.parentNode) {
                                z.dom.insertBefore(acEle, nextSibling);
                                break;
                            }
                        }
                        if (!acEle.parentNode) {
                            parentNode.appendChild(acEle);
                        }
                    }
                }
            });
        },
        _getControls: function() {
            var acEles = this._acEles;
            if (!acEles) {
                acEles = this._acEles = z.dom.queryAll("[ac_permission]");
                acEles.forEach(function(ele) {
                    var parentNode = ele.parentNode;
                    var parentChildNodes = z.util.mergeArray([], parentNode.childNodes);
                    ele._ac_opt_$ = {
                        ac_permission: ele.getAttribute("ac_permission"),
                        parentNode: parentNode,
                        parentChildNodes: parentChildNodes,
                        index: parentChildNodes.indexOf(ele)
                    };
                    ele.removeAttribute("ac_permission");
                });
            }
            return acEles;
        }
    };
    z.ready(function() {
        $AccessControl.updateControls();
    });
    var $CRUDTablePage = {
        _init$: function(page_options) {
            if (!page_options) {
                return;
            }
            this._initPageOptions(page_options);
            this.init();
            this._initView();
            this._initController();
            this.initModel();
        },
        _initPageOptions: function(page_options) {
            this.page_options = z.util.mergeObject({
                grid_parent: "#gridDiv",
                modal_form: "#modalDiv",
                modal_ok_btn: "#modalOkBtn",
                filter_input: "#filterInput",
                search_input: "#searchInput",
                add_btn: "#addBtn",
                bat_delete_btn: "#batDeleteBtn"
            }, page_options);
            this.page_options.modal_options = z.util.mergeObject({}, z.getDefault("PRO_CRUDTABLEPAGE_MODAL_OPTIONS"), this.page_options.modal_options);
            this.page_options.nested_modal_options = z.util.mergeObject({}, z.getDefault("PRO_CRUDTABLEPAGE_NESTED_MODAL_OPTIONS"), this.page_options.nested_modal_options);
            this.page_options.grid_options = z.util.mergeObject({
                columns: []
            }, z.getDefault("PRO_CRUDTABLEPAGE_GRID_OPTIONS"), this.page_options.grid_options);
            this.searchConfig = {
                like: ""
            };
        },
        _initView: function() {
            this.grid = this._createGrid();
            if (z.dom.query(this.page_options.modal_form)) {
                this.form = z.form.Form(this.page_options.modal_form);
            }
            this.initView();
        },
        _createGrid: function() {
            var _this = this;
            var options = {
                appendTo: this.page_options.grid_parent
            };
            var pageable = this._is_pageable();
            if (pageable) {
                options = z.util.mergeObject(options, {
                    pageable: true,
                    onPageChange: function(config) {
                        _this.pageConfig = config;
                        if (config.changed === true) {
                            _this.queryData();
                        }
                    },
                    onPageRefresh: function(config) {
                        _this.pageConfig = config;
                        _this.queryData();
                    },
                    onSortChange: function(config) {
                        _this.sortConfig = config;
                        _this.queryData();
                    }
                });
            }
            var grid = this.createGrid(z.util.mergeObject(options, this.page_options.grid_options));
            if (pageable) {
                this.gridPagination = grid.getPagination();
                this.pageConfig = grid.getPageConfig();
            }
            return grid;
        },
        _is_pageable: function() {
            return this.page_options.grid_options.pageable === true;
        },
        createGrid: function(grid_options) {
            var columns = this.getGridColumns(grid_options);
            if (z.type.isArray(columns)) {
                grid_options = z.util.mergeObject({}, grid_options, {
                    columns: columns
                });
            }
            return z.widget.Grid(grid_options);
        },
        getGridColumns: function(grid_options) {
            return null;
        },
        renderUpdateColumn: function(td, data, column) {
            var _this = this;
            pro.GridUtil.renderUpdateDeleteOperateButton(this.grid, data, column, td, function(evt) {
                evt.stopImmediatePropagation();
                _this.handleClickUpdate(data);
            }, function(evt) {
                evt.stopImmediatePropagation();
                _this.handleClickDelete(data);
            });
        },
        setSearchConfig: function(config) {
            this.searchConfig = z.util.mergeObject(this.searchConfig, config);
            this.queryData();
        },
        setPageTotal: function(changeOrTotal, isTotal) {
            if (this.gridPagination) {
                if (isTotal === true) {
                    this.pageConfig.total = changeOrTotal;
                } else {
                    this.pageConfig.total = this.pageConfig.total + changeOrTotal;
                }
                this.gridPagination.set("total", this.pageConfig.total);
            }
        },
        _initController: function() {
            z.form.attrOn(this);
            if (z.dom.query(this.page_options.add_btn)) {
                z.dom.event.onclick(this.page_options.add_btn, this.handleClickAdd, this);
            }
            if (z.dom.query(this.page_options.bat_delete_btn)) {
                z.dom.event.onclick(this.page_options.bat_delete_btn, this.handleClickBatDelete, this);
            }
            if (z.dom.query(this.page_options.filter_input)) {
                var columns = this.getGridColumns(this.page_options.grid_options);
                if (!z.type.isArray(columns)) {
                    columns = this.page_options.grid_options.columns;
                }
                $GridUtil.addInputFilter(this.grid, this.page_options.filter_input, columns, {
                    highlight: true
                });
            }
            if (z.dom.query(this.page_options.search_input)) {
                z.dom.event.on(this.page_options.search_input, "keydown.Escape", function(evt) {
                    z.dom.setValue(this.page_options.search_input, "");
                    this.handleSearchChange();
                }, this);
                z.dom.event.on(this.page_options.search_input, "keydown.Enter", function(evt) {
                    this.handleSearchChange();
                }, this);
            }
            if (z.dom.query(this.page_options.modal_ok_btn)) {
                z.dom.event.onclick(this.page_options.modal_ok_btn, this.handleClickModalOK, this);
            }
            this.initController();
        },
        handleClickModalOK: function() {
            var value = this.getFormValue();
            if (value == null) {
                return;
            }
            if (this.validateFormValue(value) === false) {
                return;
            }
            if (this.handleModelOk(this._editType, value) === false) {
                return;
            }
            if (this._editType === "add") {
                this.handleModelAdd(value);
            } else if (this._editType === "update") {
                this.handleModelUpdate(value);
            }
        },
        handleClickAdd: function() {
            this.showFormModal("add");
        },
        handleClickUpdate: function(data) {
            this.showFormModal("update", data.getProperties());
        },
        handleClickView: function(data) {
            this.showFormModal("view", data.getProperties());
        },
        handleClickDelete: function(data) {
            this.handleModelDelete([ data ]);
        },
        handleClickBatDelete: function() {
            this.handleModelDelete(this.grid.getChecked());
        },
        handleSearchChange: function() {
            var like = z.dom.getValue(this.page_options.search_input).trim();
            if (this.searchConfig.like !== like) {
                this.searchConfig.like = like;
                this.queryData();
            }
        },
        showFormModal: function(editType, formValue) {
            this._editType = editType;
            var modal_title;
            switch (editType) {
              case "add":
                modal_title = z.getDefault("PRO_MODAL_ADD_TITLE");
                break;

              case "update":
                modal_title = z.getDefault("PRO_MODAL_UPDATE_TITLE");
                break;

              case "view":
                modal_title = z.getDefault("PRO_MODAL_VIEW_TITLE");
                break;

              default:
                modal_title = " ";
            }
            var defaultValue = {};
            z.dom.queryAll("[ze-reset=false]", this.page_options.modal_form).forEach(function(ele) {
                var model = ele.getAttribute("ze-model");
                if (model) {
                    defaultValue[model] = z.dom.getValue(ele);
                }
            });
            z.dom.queryAll("[ze-default]", this.page_options.modal_form).forEach(function(ele) {
                var model = ele.getAttribute("ze-model");
                if (model) {
                    var _default = ele.getAttribute("ze-default");
                    if (_default === "true") {
                        _default = true;
                    } else if (_default === "false") {
                        _default = false;
                    }
                    defaultValue[model] = _default;
                }
            });
            formValue = z.util.mergeObject({
                modal_title: modal_title,
                editType: editType,
                id: ""
            }, defaultValue, formValue);
            var value = this.initFormModalValue(editType, formValue) || formValue;
            this.setFormValue(value);
            this.onShowFormModal(editType, value);
            z.widget.modal(this.page_options.modal_form, this.page_options.modal_options);
        },
        closeFormModal: function() {
            z.widget.modal(this.page_options.modal_form, false);
        },
        setFormValue: function(value) {
            this.form.setValue(value);
        },
        showModal: function(modal, options) {
            z.widget.modal(modal, z.util.mergeObject({}, this.page_options.modal_options, options));
        },
        showNestedModal: function(nestedModalDiv, options, modalDiv) {
            z.widget.modal(nestedModalDiv, z.util.mergeObject({}, this.page_options.nested_modal_options, options), modalDiv || this.page_options.modal_form);
        },
        handleModelAdd: function(value) {
            $AjaxCRUD.add({
                url: this.page_options.url.add || this.page_options.url.create,
                data: value,
                success: function(result) {
                    this.addGridData(result, result.data, value);
                    this._onModelAdd(value, result.data);
                    z.widget.modal(this.page_options.modal_form, false);
                },
                context: this
            });
        },
        addGridData: function(resResult, resResultData, reqPayload) {
            this.grid.addData(resResultData);
        },
        _onModelAdd: function(value, resultData) {
            this.setPageTotal(1);
            this.onModelChange("add", resultData);
        },
        handleModelUpdate: function(value, opts) {
            $AjaxCRUD.update(z.util.mergeObject({
                url: this.page_options.url.update || this.page_options.url.edit,
                url_params: value,
                data: value,
                success: function(result) {
                    this.updateGridData(result, result.data, value);
                    this._onModelUpdate(value, result.data);
                    z.widget.modal(this.page_options.modal_form, false);
                },
                context: this
            }, opts));
        },
        updateGridData: function(resResult, resData, reqPayload) {
            var gData = this.grid.findData("id", resData.id);
            if (gData) {
                gData.set(resData);
            }
        },
        _onModelUpdate: function(value, resultData) {
            this.onModelChange("update", resultData);
        },
        handleModelDelete: function(modelDataArr, confirm) {
            if (modelDataArr.length === 0) {
                return;
            }
            var _this = this;
            var ajaxDelete = function() {
                var ids = [];
                modelDataArr.forEach(function(item) {
                    ids.push(item.get("id"));
                });
                $AjaxCRUD.delete({
                    url: _this.page_options.url.delete || _this.page_options.url.remove,
                    url_params: {
                        id: ids
                    },
                    data: _this.getModelDeleteData(modelDataArr),
                    success: function(result) {
                        _this.grid.removeData(modelDataArr);
                        _this._onModelDelete(modelDataArr);
                    }
                });
            };
            if (confirm === false) {
                ajaxDelete();
            } else {
                z.widget.confirm(z.getDefault("PRO_MESSAGE_DELETE_CONFIRM"), z.getDefault("PRO_MESSAGE_TIPS"), function(result) {
                    if (result) {
                        ajaxDelete();
                    }
                }, {
                    confirm_class: z.getDefault("PRO_MODAL_CONFIRM_CLASS"),
                    cancel_class: z.getDefault("PRO_MODAL_CANCEL_CLASS"),
                    confirm_text: z.getDefault("PRO_MODAL_CONFIRM_TEXT"),
                    cancel_text: z.getDefault("PRO_MODAL_CANCEL_TEXT")
                });
            }
        },
        _onModelDelete: function(modelDataArr) {
            this.setPageTotal(-modelDataArr.length);
            this.onModelChange("delete", modelDataArr);
        },
        getModelDeleteData: function(dataArr) {
            var ids = [];
            dataArr.forEach(function(item) {
                ids.push(item.get("id"));
            });
            return {
                id: ids
            };
        },
        onModelChange: function(type, event) {},
        initModel: function() {
            this.queryData();
        },
        reloadData: function() {
            this.queryData();
        },
        queryData: function(options) {
            var _this = this;
            this.grid.clearData();
            $AjaxCRUD.query(z.util.mergeObject({
                url: _this.page_options.url.query || _this.page_options.url.search,
                data: this.getQueryPayload(this.searchConfig, this.pageConfig, this.sortConfig),
                success: function(result) {
                    var data = result.data;
                    if (z.type.isObject(data)) {
                        var count = data.count;
                        if (count == null) {
                            count = data.total;
                        }
                        if (count != null) {
                            _this.setPageTotal(count, true);
                        }
                        if (data.data) {
                            data = data.data;
                        }
                    }
                    _this.setGridData(result, data);
                }
            }, options));
        },
        getQueryPayload: function(search, page, sort) {
            var data;
            if (search || page || sort) {
                data = {};
                if (search) {
                    var keys = Object.keys(search);
                    if (keys.length > 0 && !(keys.length === 1 && keys[0] === "like" && search["like"] === "")) {
                        data.search = search;
                    }
                }
                if (page) {
                    data.page = page;
                }
                if (sort) {
                    data.sort = sort;
                }
            }
            return data;
        },
        setGridData: function(result, data) {
            if (z.type.isArray(data)) {
                this.grid.setData(data);
            }
        },
        onShowFormModal: function(editType, initValue) {},
        initFormModalValue: function(editType, formValue) {
            return formValue;
        },
        getFormValue: function() {
            return this.form.getValue();
        },
        validateFormValue: function(formValue) {
            return true;
        },
        init: function() {},
        initView: function() {},
        initController: function() {},
        handleModelOk: function(editType, value) {}
    };
    z.ready(function() {
        $CRUDTablePage._init$($CRUDTablePage.page_options);
    });
    var $TemplatePageUtil = {
        getPrefixKey: function(str, prefix) {
            if (prefix == null || prefix === "") {
                str = str.replace(/\$_/g, "");
            } else {
                str = str.replace(/\$[a-z]/g, function(substring) {
                    return substring.toUpperCase();
                });
            }
            str = str.replace(/\$/g, function(substring, index) {
                var pChar = str[index - 1];
                var nChar = str[index + 1];
                if (pChar != null && nChar != null && pChar.match(/[a-zA-Z]/) && nChar.match(/[a-zA-Z]/)) {
                    return prefix.charAt(0).toUpperCase() + prefix.substring(1);
                }
                return prefix;
            });
            return str;
        }
    };
    var $CrudPage = function(prefix) {
        if (!z.type.isString(prefix)) {
            prefix = "";
        }
        prefix = prefix.trim();
        var itfCommon = z.util.mergeObject({
            $_crud_edit_type: "$_crud_edit_type",
            $crudForm: "$crudForm",
            $crudView: "$crudView",
            $_crud_page_options: "$_crud_page_options"
        }, {
            init$CrudPage: function() {
                this[itfKeyMap.init$CrudPageOptions]();
                var formModal = this[itfKeyMap._get$FormModal]();
                if (formModal) {
                    this[itfKeyMap.$crudForm] = z.form.Form(formModal);
                }
                this[itfKeyMap.init$CrudPageView]();
                this[itfKeyMap.init$CrudPageController]();
                this[itfKeyMap.init$CrudPageModel]();
            },
            init$CrudPageOptions: function() {
                var options = z.util.mergeObject({
                    form_modal: $TemplatePageUtil.getPrefixKey("#$modalDiv", prefix),
                    form_modal_ok_btn: $TemplatePageUtil.getPrefixKey("#$modalOkBtn", prefix),
                    add_btn: $TemplatePageUtil.getPrefixKey("#add$Btn", prefix),
                    bat_delete_btn: $TemplatePageUtil.getPrefixKey("#batDelete$Btn", prefix)
                }, this[itfKeyMap.$_crud_page_options]);
                options.form_modal_options = z.util.mergeObject({}, z.getDefault("PRO_CRUD_PAGE_MODAL_OPTIONS"), options.form_modal_options);
                this[itfKeyMap.$_crud_page_options] = options;
            },
            init$CrudPageView: function() {},
            get$CrudView: function() {
                return this[itfKeyMap.$crudView];
            },
            init$CrudPageController: function() {
                var options = this[itfKeyMap.get$CrudPageOptions]();
                if (z.dom.query(options.add_btn)) {
                    z.dom.event.onclick(options.add_btn, this[itfKeyMap.handle$ClickAdd], this);
                }
                if (z.dom.query(options.bat_delete_btn)) {
                    z.dom.event.onclick(options.bat_delete_btn, this[itfKeyMap.handle$ClickBatDelete], this);
                }
                if (z.dom.query(options.form_modal_ok_btn)) {
                    z.dom.event.onclick(options.form_modal_ok_btn, this[itfKeyMap.handleClick$ModalOK], this);
                }
            },
            init$CrudPageModel: function() {
                this[itfKeyMap.query$Data]();
            },
            query$Data: function(options) {
                var view = this[itfKeyMap.get$CrudView]();
                if (view) {
                    view.clearData();
                }
                var _this = this;
                $AjaxCRUD.query(z.util.mergeObject({
                    url: this[itfKeyMap._get$URL]("query", "search"),
                    data: this[itfKeyMap.get$QueryPayload](),
                    success: function(resResult) {
                        _this[itfKeyMap.on$ModelLoad](resResult, resResult.data);
                    }
                }, options));
            },
            get$QueryPayload: function() {},
            on$ModelLoad: function(resResult, resResultData) {
                var view = this[itfKeyMap.get$CrudView]();
                if (view) {
                    view.setData(resResultData);
                }
            },
            get$CrudPageOptions: function(key) {
                var options = this[itfKeyMap.$_crud_page_options] || {};
                if (arguments.length > 0) {
                    return options[key];
                }
                return options;
            },
            _get$FormModal: function() {
                return this[itfKeyMap.get$CrudPageOptions]("form_modal");
            },
            _get$URL: function(keys) {
                var url = this[itfKeyMap.get$CrudPageOptions]("url") || {};
                var argLen = arguments.length;
                if (argLen > 0) {
                    for (var i = 0; i < argLen; i++) {
                        var arg = arguments[i];
                        if (url.hasOwnProperty(arg)) {
                            return url[arg];
                        }
                    }
                    return null;
                }
                return url;
            }
        }, {
            _find$Data: function(data) {
                if (!z.view.isData(data)) {
                    var view = this[itfKeyMap.get$CrudView]();
                    var fData;
                    if (view) {
                        if (z.type.isString(data) || z.type.isNumber(data)) {
                            data = {
                                id: data
                            };
                        }
                        fData = view.findData(data);
                    }
                    return fData;
                }
                return data;
            },
            handle$ClickAdd: function() {
                this[itfKeyMap.show$FormModal]("add");
            },
            handle$ClickUpdate: function(data) {
                data = this[itfKeyMap._find$Data](data);
                if (data) {
                    this[itfKeyMap.show$FormModal]("update", data.gets());
                }
            },
            handle$ClickDelete: function(data) {
                data = this[itfKeyMap._find$Data](data);
                if (data) {
                    this[itfKeyMap.handle$ModelDelete]([ data ]);
                }
            },
            handle$ClickView: function(data) {
                data = this[itfKeyMap._find$Data](data);
                if (data) {
                    this[itfKeyMap.show$FormModal]("view", data.gets());
                }
            },
            handle$ClickBatDelete: function() {
                var view = this[itfKeyMap.get$CrudView]();
                if (view) {
                    this[itfKeyMap.handle$ModelDelete](view.getChecked());
                }
            },
            handleClick$ModalOK: function() {
                var value = this[itfKeyMap.get$FormValue]();
                if (value == null) {
                    return;
                }
                if (this[itfKeyMap.validate$FormValue](value) === false) {
                    return;
                }
                var editType = this[itfKeyMap.$_crud_edit_type];
                if (this[itfKeyMap.handle$ModelOK](editType, value) === false) {
                    return;
                }
                if (editType === "add") {
                    this[itfKeyMap.handle$ModelAdd](value);
                } else if (editType === "update") {
                    this[itfKeyMap.handle$ModelUpdate](value);
                }
            },
            handle$ModelOK: function(editType, value) {}
        }, {
            get$Form: function() {
                return this[itfKeyMap.$crudForm];
            },
            show$FormModal: function(editType, formValue) {
                this[itfKeyMap.$_crud_edit_type] = editType;
                var modalTitle;
                switch (editType) {
                  case "add":
                    modalTitle = z.getDefault("PRO_MODAL_ADD_TITLE");
                    break;

                  case "update":
                    modalTitle = z.getDefault("PRO_MODAL_UPDATE_TITLE");
                    break;

                  case "view":
                    modalTitle = z.getDefault("PRO_MODAL_VIEW_TITLE");
                    break;

                  default:
                    modalTitle = " ";
                }
                var modal = this[itfKeyMap._get$FormModal]();
                var defaultValue = {};
                z.dom.queryAll("[ze-reset=false]", modal).forEach(function(ele) {
                    var model = ele.getAttribute("ze-model");
                    if (model) {
                        defaultValue[model] = z.dom.getValue(ele);
                    }
                });
                z.dom.queryAll("[ze-default]", modal).forEach(function(ele) {
                    var model = ele.getAttribute("ze-model");
                    if (model) {
                        var _default = ele.getAttribute("ze-default");
                        if (_default === "true") {
                            _default = true;
                        } else if (_default === "false") {
                            _default = false;
                        }
                        defaultValue[model] = _default;
                    }
                });
                formValue = z.util.mergeObject({
                    $modal_title: modalTitle,
                    $edit_type: editType,
                    id: ""
                }, defaultValue, formValue);
                var value = this[itfKeyMap.init$FormValue](editType, formValue) || formValue;
                this[itfKeyMap.set$FormValue](value);
                this[itfKeyMap.onShow$FormModal](editType, value);
                z.widget.modal(this[itfKeyMap._get$FormModal](), this[itfKeyMap.get$CrudPageOptions]("form_modal_options"));
            },
            close$FormModal: function() {
                z.widget.modal(this[itfKeyMap._get$FormModal](), false);
            },
            init$FormValue: function(editType, formValue) {
                return formValue;
            },
            set$FormValue: function(value) {
                this[itfKeyMap.get$Form]().setValue(value);
            },
            onShow$FormModal: function(editType, initValue) {},
            get$FormValue: function() {
                return this[itfKeyMap.get$Form]().getValue();
            },
            validate$FormValue: function(value) {
                return true;
            }
        }, {
            handle$ModelAdd: function(value) {
                $AjaxCRUD.add({
                    url: this[itfKeyMap._get$URL]("add", "create"),
                    data: value,
                    success: function(resResult) {
                        this[itfKeyMap.on$ModelAdd](value, resResult, resResult.data);
                        this[itfKeyMap.on$ModelChange]("add", value, resResult, resResult.data);
                        this[itfKeyMap.close$FormModal]();
                    },
                    context: this
                });
            },
            on$ModelChange: function(type, value, resResult, resResultData) {},
            on$ModelAdd: function(value, resResult, resResultData) {
                var view = this[itfKeyMap.get$CrudView]();
                if (view) {
                    view.addData(resResultData);
                }
            },
            handle$ModelUpdate: function(value, opts) {
                $AjaxCRUD.update(z.util.mergeObject({
                    url: this[itfKeyMap._get$URL]("update", "edit"),
                    url_params: value,
                    data: value,
                    success: function(resResult) {
                        this[itfKeyMap.on$ModelUpdate](value, resResult, resResult.data);
                        this[itfKeyMap.on$ModelChange]("update", value, resResult, resResult.data);
                        this[itfKeyMap.close$FormModal]();
                    },
                    context: this
                }, opts));
            },
            on$ModelUpdate: function(value, resResult, resResultData) {
                var view = this[itfKeyMap.get$CrudView]();
                if (view) {
                    var gData = view.findData("id", resResult.data.id);
                    if (gData) {
                        gData.set(resResultData);
                    }
                }
            },
            handle$ModelDelete: function(modelDataArr, confirm) {
                if (modelDataArr.length === 0) {
                    return;
                }
                var _this = this;
                var modelDelete = function() {
                    var ids = [];
                    modelDataArr.forEach(function(item) {
                        ids.push(item.get("id"));
                    });
                    $AjaxCRUD.delete({
                        url: _this[itfKeyMap._get$URL]("delete", "remove"),
                        url_params: {
                            id: ids
                        },
                        data: _this[itfKeyMap.get$ModelDeleteData](modelDataArr),
                        success: function(resResult) {
                            _this[itfKeyMap.on$ModelDelete](modelDataArr, resResult, resResult.data);
                            this[itfKeyMap.on$ModelChange]("delete", modelDataArr, resResult, resResult.data);
                        }
                    });
                };
                if (confirm === false) {
                    modelDelete();
                    return;
                }
                z.widget.confirm(z.getDefault("PRO_MESSAGE_DELETE_CONFIRM"), z.getDefault("PRO_MESSAGE_TIPS"), function(result) {
                    if (result) {
                        modelDelete();
                    }
                }, {
                    confirm_class: z.getDefault("PRO_MODAL_CONFIRM_CLASS"),
                    cancel_class: z.getDefault("PRO_MODAL_CANCEL_CLASS"),
                    confirm_text: z.getDefault("PRO_MODAL_CONFIRM_TEXT"),
                    cancel_text: z.getDefault("PRO_MODAL_CANCEL_TEXT")
                });
            },
            get$ModelDeleteData: function(dataArr) {
                var ids = [];
                dataArr.forEach(function(item) {
                    ids.push(item.get("id"));
                });
                return {
                    id: ids
                };
            },
            on$ModelDelete: function(modelDataArr, resResult, resResultData) {
                var view = this[itfKeyMap.get$CrudView]();
                if (view) {
                    view.removeData(modelDataArr);
                }
            }
        });
        var itf = {};
        var itfKeyMap = {};
        z.util.eachObject(itfCommon, function(key, value) {
            if (z.type.isString(value)) {
                value = $TemplatePageUtil.getPrefixKey(value, prefix);
            }
            var _key = $TemplatePageUtil.getPrefixKey(key, prefix);
            itf[_key] = value;
            itfKeyMap[key.replace(/(\$_?)/g, "")] = _key;
            itfKeyMap[key] = _key;
        });
        itf.super = z.util.mergeObject({}, itf);
        return itf;
    };
    var $PropertySheet = function() {
        $PropertySheet.superClass.constructor.apply(this, arguments);
        var _this = this;
        this.setColumns([ z.util.mergeObject({
            name: z.getDefault("PRO_SHEET_PROPERTY_COLUMN_NAME"),
            field: z.getDefault("PRO_SHEET_PROPERTY_COLUMN_FIELD"),
            sortable: true
        }, this.get("property_column_properties")), z.util.mergeObject({
            name: z.getDefault("PRO_SHEET_VALUE_COLUMN_NAME"),
            filter: false,
            render: function(td, propertyRowData) {
                if (_this._getPropertyField(propertyRowData)) {
                    var editType = _this._getEditType(propertyRowData);
                    if (propertyRowData.render) {
                        propertyRowData.render(_this, propertyRowData, editType, td);
                    } else {
                        _this.render(_this, propertyRowData, editType, td);
                    }
                }
            }
        }, this.get("value_column_properties")) ]);
        this.setProperties(this.get("properties"));
        this.onDataChange(this._onPropertyValueChange, this);
        this.onDataClick(this._onPropertyClick, this);
        z.dom.addClass(this.getRoot(), "sheet");
    };
    z.util.extendClass($PropertySheet, z.widget.TreeGrid, z.util.mergeObject({
        ___zdefaults_: {
            editable: false,
            expand_on_click: true
        },
        isVisible: function(data) {
            if (this._isPropertyVisible(data) === false) {
                return false;
            }
            return $PropertySheet.superClass.isVisible.apply(this, arguments);
        },
        _isPropertyVisible: function(propertyRowData) {
            if (propertyRowData.isVisible) {
                if (propertyRowData.isVisible(this) === false) {
                    return false;
                }
            }
            return true;
        },
        _getPropertyField: function(propertyRowData) {
            return propertyRowData.get(z.getDefault("PRO_SHEET_PROPERTY_FIELD") || "property");
        },
        _getEditType: function(propertyRowData) {
            var editable;
            if (propertyRowData) {
                editable = this.getDataViewProperty(propertyRowData, "editable");
            } else {
                editable = this.getProperty("editable");
            }
            return editable === true ? "edit" : "view";
        },
        setProperties: function(properties) {
            this.setData(properties);
        },
        setValue: function(valueObj) {
            this._is_updating = true;
            var valueField = z.getDefault("PRO_SHEET_VALUE_FIELD");
            this.getDataArray().forEach(function(propertyRowData) {
                if (!this._isPropertyVisible(propertyRowData)) {
                    return;
                }
                var property = this._getPropertyField(propertyRowData);
                if (property) {
                    var value = z.util.getObjectDeepValue(valueObj, property);
                    if (value == null) {
                        value = propertyRowData.get("default_value");
                    }
                    if (z.type.isFunction(propertyRowData.setValue)) {
                        propertyRowData.setValue(propertyRowData, value, property);
                    } else {
                        var valueType = propertyRowData.get("value_type") || propertyRowData.get("type");
                        value = this._convertValue(value, valueType);
                        propertyRowData.setProperty(valueField, value);
                    }
                }
            }, this);
            this._set_value = z.util.mergeObject({}, valueObj);
            this._is_updating = false;
        },
        getValue: function(notNull, onlyChanged) {
            var valueObj = {};
            var valueField = z.getDefault("PRO_SHEET_VALUE_FIELD");
            this.getDataArray().forEach(function(propertyRowData) {
                if (!this._isPropertyVisible(propertyRowData)) {
                    return;
                }
                var property = this._getPropertyField(propertyRowData);
                if (property) {
                    var value = this._getPropertyValue(propertyRowData, propertyRowData.getProperty(valueField));
                    if (value != null && !isNaN(value) || notNull !== true) {
                        if (onlyChanged !== true || value !== z.util.getObjectDeepValue(this._set_value, property)) {
                            z.util.setObjectDeepValue(valueObj, property, value);
                        }
                    }
                }
            }, this);
            return valueObj;
        },
        _getPropertyValue: function(propertyRowData, value) {
            if (z.type.isFunction(propertyRowData.getValue)) {
                value = propertyRowData.getValue(value, propertyRowData);
            } else {
                var valueType = propertyRowData.get("value_type") || propertyRowData.get("type");
                value = this._convertValue(value, valueType);
            }
            return value;
        },
        _convertValue: function(value, valueType) {
            switch (valueType) {
              case "number":
                value = parseFloat(value) || 0;
                break;

              case "int":
                value = parseInt(value) || 0;
                break;

              case "float":
                value = parseFloat(value) || 0;
                break;

              case "range":
                value = parseFloat(value) || 0;
                break;
            }
            return value;
        }
    }, {
        _onPropertyClick: function(evt) {
            var propertyRowData = evt.data;
            var property = this._getPropertyField(propertyRowData);
            if (property) {
                var event = evt.event;
                var valueField = z.getDefault("PRO_SHEET_VALUE_FIELD");
                var cellEle = $GridUtil.getCellElement(this, propertyRowData, valueField, this._getEditType(propertyRowData));
                if (cellEle && event.target !== cellEle) {
                    if (cellEle.select) {
                        cellEle.select();
                    }
                    z.dom.focus(cellEle);
                }
            }
        },
        _onPropertyValueChange: function(evt) {
            if (this._is_updating === true) {
                return;
            }
            var data = evt.data;
            var event = evt.event;
            var property = this._getPropertyField(data);
            var new_value = this._getPropertyValue(data, event.new_value);
            var old_value = event.old_value;
            var validate = data.validate;
            if (z.type.isFunction(validate)) {
                if (validate(new_value) === false) {
                    this._is_updating = true;
                    data.set(property, old_value);
                    this._is_updating = false;
                    return;
                }
            }
            evt = {
                property: property,
                new_value: new_value,
                old_value: old_value
            };
            this._callOn("onValueChange", "on.value.change", evt, [ property, new_value, old_value ]);
        },
        onValueChange: function(listener, context) {
            this.addListener("on.value.change", listener, context);
        }
    }, {
        render: function(sheet, propertyRowData, editType, td) {
            var valueField = z.getDefault("PRO_SHEET_VALUE_FIELD");
            var type = (propertyRowData.get("type") || "").toLowerCase();
            if (type === "check") {
                type = "checkbox";
            }
            var attr = {};
            var isEdit = editType === "edit";
            if (!isEdit) {
                attr.disabled = true;
            }
            var attributes = z.util.mergeObject(attr, propertyRowData.get("attributes"));
            var option = {
                type: editType,
                attributes: attributes,
                bind: isEdit
            };
            switch (type) {
              case "select":
                $GridUtil.renderSelect(sheet, propertyRowData, valueField, td, propertyRowData.get("options"), option);
                break;

              case "checkbox":
                attributes.type = "checkbox";
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
                break;

              case "color":
                attributes.type = "color";
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
                break;

              case "date":
                attributes.type = "date";
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
                break;

              case "number":
                attributes.type = "number";
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
                break;

              case "range":
                attributes.type = "range";
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
                break;

              case "text":
                attributes.type = "text";
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
                break;

              default:
                $GridUtil.renderInput(sheet, propertyRowData, valueField, td, option);
            }
        }
    }));
    var $GVUtil = {};
    z.util.mergeObject($GVUtil, {
        getDefaultShapeTypes: function() {
            return [ "rect", "circle", "ellipse", "roundrect", "triangle", "right_triangle", "diamond", "pentagon", "hexagon", "star", "parallelogram", "cloud" ];
        },
        createColorStops: function(colors, no_gradient, start, end) {
            if (start == null) {
                start = 0;
            }
            if (end == null) {
                end = 1;
            }
            var min = Math.min(start, end);
            var max = Math.max(start, end);
            start = Math.max(0, min);
            end = Math.min(1, max);
            var colorStops = {};
            var count = colors.length;
            if (count < 2) {
                colorStops[start] = colors[0];
                colorStops[end] = colors[0];
            } else {
                var step, i;
                if (no_gradient === true) {
                    step = (end - start) / count;
                    for (i = 0; i < count; i++) {
                        colorStops[start + i * step] = colors[i];
                        colorStops[start + (i + 1) * step - .001] = colors[i];
                    }
                } else {
                    step = (end - start) / (count - 1);
                    for (i = 0; i < count; i++) {
                        colorStops[start + i * step] = colors[i];
                    }
                }
            }
            return colorStops;
        },
        createArcBezierPoints: function(cx, cy, radius, startAngle, endAngle) {
            startAngle = (startAngle % 360 + 360) % 360;
            endAngle = (endAngle % 360 + 360) % 360;
            if (endAngle < startAngle) {
                endAngle += 360;
            }
            var angle = Math.abs(endAngle - startAngle);
            if (angle === 0) {
                return [];
            }
            var segAngle = 90;
            var count = Math.ceil(angle / segAngle);
            var points = [];
            var start = Math.min(startAngle, endAngle);
            var center = {
                x: cx,
                y: cy
            };
            for (var i = 0; i < count; i++) {
                var end = Math.min(start + segAngle, endAngle);
                var itemAngle = z.math.toRadians(Math.abs(end - start));
                var cpLen = 4 * Math.tan(itemAngle / 4) / 3 * radius;
                var cp1 = z.math.calcRotatedPoint(center, {
                    x: radius + cx,
                    y: cpLen + cy
                }, start);
                var cp2 = z.math.calcRotatedPoint(center, {
                    x: radius + cx,
                    y: -cpLen + cy
                }, end);
                if (i === 0) {
                    var p1 = z.math.calcPointOnCircle(center, radius, start);
                    p1.seg = "bezier_curve_to";
                    points.push(p1);
                }
                var p2 = z.math.calcPointOnCircle(center, radius, end);
                if (i < count - 1) {
                    p2.seg = "bezier_curve_to";
                }
                points.push(cp1, cp2, p2);
                start += segAngle;
            }
            return points;
        }
    });
    var $GVDataParser = {
        _createData: function(parseOption, item, defaultCls, params) {
            var clazz = item[parseOption.class_key];
            if (z.type.isString(clazz)) {
                var strCls;
                switch (clazz.toLowerCase()) {
                  case "group":
                    strCls = z.gv.Group;
                    break;

                  case "subview":
                    strCls = z.gv.Subview;
                    break;

                  case "link":
                    strCls = z.gv.Link;
                    break;

                  case "linksubview":
                    strCls = z.gv.LinkSubview;
                    break;
                }
                if (!strCls) {
                    strCls = z.util.getObjectDeepValue(window, clazz);
                }
                clazz = strCls;
            }
            if (!z.type.isFunction(clazz)) {
                clazz = defaultCls;
            }
            params = z.util.mergeArray([ clazz ], params || [ item ]);
            return new (clazz.bind.apply(clazz, params))();
        },
        _getDataItem: function(parseOption, item) {
            var _item = z.util.mergeObject({}, item);
            var optValue = {};
            parseOption._keys.forEach(function(key) {
                if (_item.hasOwnProperty(key)) {
                    delete _item[key];
                    optValue[key] = item[key];
                }
            });
            _item["_$_opt"] = optValue;
            return _item;
        },
        _parseNode: function(parseOption, item, allNodeKeyMap, parent, resultDataArr) {
            if (z.type.isString(item)) {
                item = {
                    name: item
                };
            }
            resultDataArr = resultDataArr || [];
            var dataItem = $GVDataParser._getDataItem(parseOption, item);
            var node = $GVDataParser._createData(parseOption, dataItem, z.gv.Node);
            if (parent) {
                node.set("parent", parent);
            }
            var keyValue = item[parseOption.node_key];
            if (keyValue != null) {
                allNodeKeyMap[keyValue] = node;
            }
            resultDataArr.push(node);
            var children = item[parseOption.children_key];
            if (z.type.isArray(children)) {
                children.forEach(function(child) {
                    $GVDataParser._parseNode(parseOption, child, allNodeKeyMap, node, resultDataArr);
                });
            }
            return resultDataArr;
        },
        _parseNodes: function(parseOption, nodeItems, allNodeArr, allNodeKeyMap, parent) {
            if (!nodeItems) {
                return;
            }
            nodeItems.forEach(function(item) {
                if (z.type.isString(item)) {
                    item = {
                        name: item
                    };
                }
                z.util.mergeArray(allNodeArr, $GVDataParser._parseNode(parseOption, item, allNodeKeyMap, parent));
            });
        },
        _getParseOption: function(parseOption) {
            parseOption = parseOption || {};
            var data_key = parseOption.data_key || "id";
            var opt = {
                nodes_key: parseOption.nodes_key || "nodes",
                links_key: parseOption.links_key || "links",
                data_key: data_key,
                node_key: parseOption.node_key || data_key,
                link_key: parseOption.link_key || data_key,
                class_key: parseOption.class_key || "class",
                parent_key: parseOption.parent_key || "parent",
                children_key: parseOption.children_key || "children",
                link_from_key: parseOption.link_from_key || "from",
                link_to_key: parseOption.link_to_key || "to"
            };
            opt._keys = [ opt.parent_key, opt.children_key, opt.link_from_key, opt.link_to_key ];
            return opt;
        },
        parseJSON: function(json_data, parseOption) {
            if (z.type.isString(json_data)) {
                json_data = JSON.parse(json_data);
            }
            if (!z.type.isObject(json_data)) {
                return;
            }
            parseOption = $GVDataParser._getParseOption(parseOption);
            var nodeItems = json_data[parseOption.nodes_key] || [];
            var linkItems = json_data[parseOption.links_key] || [];
            var allNodeArr = [];
            var allLinkArr = [];
            var allNodeKeyMap = {};
            var allLinkKeyMap = {};
            $GVDataParser._parseNodes(parseOption, nodeItems, allNodeArr, allNodeKeyMap);
            linkItems.forEach(function(item) {
                var fromNode = allNodeKeyMap[item[parseOption.link_from_key]];
                var toNode = allNodeKeyMap[item[parseOption.link_to_key]];
                if (fromNode && toNode) {
                    var dataItem = $GVDataParser._getDataItem(parseOption, item);
                    var link = $GVDataParser._createData(parseOption, dataItem, z.gv.Link, [ fromNode, toNode, dataItem ]);
                    var clazz = item[parseOption.class_key];
                    if (z.type.isString(clazz) && clazz.toLowerCase() === "linksubview" || clazz === z.gv.LinkSubview) {
                        $GVDataParser._parseNodes(parseOption, item[parseOption.children_key] || [], allNodeArr, allNodeKeyMap, link);
                    }
                    allLinkArr.push(link);
                    var keyValue = item[parseOption.link_key];
                    if (keyValue != null) {
                        allLinkKeyMap[keyValue] = link;
                    }
                }
            });
            allNodeArr.forEach(function(deviceNode) {
                var opt = deviceNode.get("_$_opt");
                var pkValue = opt[parseOption.parent_key];
                if (pkValue) {
                    var parent = allNodeKeyMap[pkValue] || allLinkKeyMap[pkValue];
                    if (parent) {
                        deviceNode.set("parent", parent);
                    }
                }
            });
            return z.util.mergeArray(allNodeArr, allLinkArr);
        },
        toJSON: function(gview, options) {
            var dataArr = [];
            if (z.type.isData(gview)) {
                dataArr = [ gview ];
            } else {
                dataArr = gview.getDataArray();
            }
            var parseOption = $GVDataParser._getParseOption(options);
            var nodeArr = [];
            var nodeIDMap = {};
            dataArr.forEach(function(data) {
                if (z.type.isNode(data)) {
                    nodeArr.push($GVDataParser._getDataProps(data, true));
                }
            });
        },
        _getDataClass: function(data) {
            if (z.type.isLinkSubview(data)) {
                return "linksubview";
            }
            if (z.type.isGroup(data)) {
                return "group";
            }
            if (z.type.isSubview(data)) {
                return "subview";
            }
        },
        _getDataProps: function(data, withClass) {
            var props = JSON.parse(JSON.stringify(data.gets()));
            if (withClass === true) {
                var cls = $GVDataParser._getDataClass();
                if (cls) {
                    props["class"] = cls;
                }
            }
            return props;
        }
    };
    $GVUtil.parseData = $GVDataParser.parseJSON;
    z.util.mergeObject($GVUtil, {
        initSubviewNav: function(gView, option) {
            option = z.util.mergeObject({
                nav_style: "position: absolute;left: 60px;top:0;user-select: none;padding:2px",
                active_style: "color: #006bce;cursor: pointer;",
                top_label: "#"
            }, option);
            if (!option.getLabel) {
                option.getLabel = function(item) {
                    return gView.getLabel(item);
                };
            }
            var navDiv = z.dom.create('<div id="navDiv" style="' + option.nav_style + '"></div>');
            gView.getRoot().appendChild(navDiv);
            $GVUtil._updateSubviewNav(gView, navDiv, option);
            gView.onViewChange(function(evt) {
                if (evt.property === "current_subview") {
                    $GVUtil._updateSubviewNav(gView, navDiv, option);
                }
            });
            z.dom.event.onclick(navDiv, function(event) {
                var a = z.dom.event.getTarget(event, "a");
                if (a) {
                    var svID = a.getAttribute("sv-id");
                    var sv = gView.findData(function(data) {
                        return data.id() === svID;
                    });
                    gView.setCurrentSubview(sv);
                }
            });
        },
        _updateSubviewNav: function(gView, navDiv, option) {
            var current = gView.get("current_subview");
            navDiv = z.dom.query(navDiv);
            z.dom.empty(navDiv);
            if (current) {
                var arr = [ current ];
                var parent = current.get("parent");
                while (parent) {
                    arr.push(parent);
                    parent = parent.get("parent");
                }
                arr.push(null);
                arr.reverse();
                var count = arr.length;
                arr.forEach(function(item, index) {
                    if (index > 0) {
                        z.dom.appendText(navDiv, " / ");
                    }
                    var itemName;
                    if (item) {
                        itemName = option.getLabel(item);
                    }
                    if (itemName == null) {
                        itemName = "";
                    }
                    var aText;
                    if (index === count - 1) {
                        if (item) {
                            aText = itemName;
                        } else {
                            aText = "#";
                        }
                        z.dom.appendText(navDiv, aText);
                    } else {
                        if (item) {
                            aText = "<a sv-id=" + item.id() + ' style="' + option.active_style + '">' + itemName + "</a>";
                        } else {
                            aText = '<a style="' + option.active_style + '">' + option.top_label + "</a>";
                        }
                        navDiv.appendChild(z.dom.create(aText));
                    }
                });
            }
        }
    });
    z.util.mergeObject($GVUtil, {
        initToolbar: function(gView) {
            $GVUtil._insertToolbarStyle();
            var toolbar = z.dom.create("div", "gv-toolbar");
            $GVUtil.createToolbarBtn(toolbar, '<svg><line x1="11" y1="3" x2="11" y2="19"></line><line x1="3" y1="11" x2="19" y2="11"></line></svg>', z.getDefault("PRO_GVIEW_TOOLBAR_ZOOM_IN_TITLE"), function() {
                gView.zoomIn(false);
            });
            $GVUtil.createToolbarBtn(toolbar, '<svg><line x1="3" y1="11" x2="19" y2="11"></line></svg>', z.getDefault("PRO_GVIEW_TOOLBAR_ZOOM_OUT_TITLE"), function() {
                gView.zoomOut(false);
            });
            $GVUtil.createToolbarBtn(toolbar, '<svg><path d="M8 3H4a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M2 16v3a2 2 0 002 2h3"></path></svg>', z.getDefault("PRO_GVIEW_TOOLBAR_ZOOM_FIT_TITLE"), function() {
                gView.zoomFit();
            });
            $GVUtil.createToolbarBtn(toolbar, '<svg><polyline points="17 2 20 5 17 8"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h13"></path><polyline points="7 20 3 17 7 14"></polyline><path d="M20 11v2a4 4 0 0 1-4 4H3"></path></svg>', z.getDefault("PRO_GVIEW_TOOLBAR_RESET_TITLE"), function() {
                gView.resetTransform();
            });
            toolbar.appendChild(z.dom.create("br"));
            $GVUtil.createToolbarBtn(toolbar, '<svg><rect x="2" y="2" width="18" height="18" rx="2" ry="2"></rect><circle cx="8" cy="8" r="1.5"></circle><polyline points="20 14 15 9 4 20"></polyline></svg>', z.getDefault("PRO_GVIEW_TOOLBAR_SAVE_IMAGE_TITLE"), function() {
                $GVUtil._saveAsImg(gView.toImage(), "gv.png");
            });
            var viewParent = gView.getRoot().parentNode;
            if (viewParent) {
                if (z.dom.getStyle(viewParent, "position") === "static") {
                    z.dom.setStyle(viewParent, "position", "relative");
                }
                viewParent.appendChild(toolbar);
            }
            return toolbar;
        },
        _saveAsImg: function(img, name) {
            $GVUtil._saveAs(img.src, name || "img.png");
        },
        _saveAs: function(data, name) {
            var downloadLink = $GVUtil._downloadLink;
            if (!downloadLink) {
                downloadLink = document.createElement("a");
                downloadLink.setAttribute("target", "_blank");
                $GVUtil._downloadLink = downloadLink;
            }
            downloadLink.setAttribute("href", data);
            document.body.appendChild(downloadLink);
            downloadLink.setAttribute("download", name);
            downloadLink.click();
            downloadLink.parentNode.removeChild(downloadLink);
        },
        _insertToolbarStyle: function() {
            var css = ".gv-toolbar{position:absolute;left:6px;top:30px;opacity:0.8;}.gv-toolbar>button{display:block;padding:1px;margin-bottom:1px;background-color:#fff;cursor:pointer;border:1px solid #ccc;outline:none;}.gv-toolbar>button:hover{color:#333;background-color:#e6e6e6;border-color:#adadad;}.gv-toolbar>button>img,.gv-toolbar>button>svg{display:block;width:22px;height:22px;}";
            var style = z.dom.create("style");
            style.appendChild(document.createTextNode(css));
            var head = document.getElementsByTagName("head")[0];
            if (head) {
                head.appendChild(style);
            }
        },
        createToolbarBtn: function(toolbar, icon, title, handler) {
            var btn = z.dom.create("button");
            btn.setAttribute("title", title);
            toolbar.appendChild(btn);
            if (icon) {
                if (z.type.isString(icon)) {
                    btn.innerHTML = icon;
                } else if (icon instanceof HTMLElement) {
                    btn.appendChild(icon);
                }
                var svg = z.dom.query("svg", btn);
                if (svg) {
                    z.dom.setAttribute(svg, {
                        stroke: "currentColor",
                        fill: "none",
                        "stroke-width": 2,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                    });
                }
            }
            z.dom.event.onclick(btn, handler);
            return btn;
        }
    });
    z.util.mergeObject($GVUtil, {
        initTooltip: function(gView, option) {
            if (option === true) {
                option = {
                    properties_json_tip: true
                };
            } else {
                option = z.util.mergeObject({}, option);
            }
            var tt = $GVUtil._getTooltip(option);
            var change_close = option.change_close !== false;
            var properties_json_tip = option.properties_json_tip === true;
            if (properties_json_tip) {
                gView.getTooltip = gView.getTooltip || function(data) {
                    var dataTip = data.get("tooltip");
                    if (dataTip) {
                        return dataTip;
                    }
                    var props = {};
                    z.util.eachObject(data.gets(), function(key, value) {
                        if (z.type.isNode(value) || z.type.isLink(value)) {
                            var v = gView.getLabel(value);
                            if (v == null) {
                                return;
                            }
                            value = v;
                        }
                        if (!key.startsWith("_")) {
                            props[key] = value;
                        }
                    });
                    if (Object.keys(props).length === 0) {
                        return null;
                    }
                    return "<pre>" + JSON.stringify(props, function(key, value) {
                        if (z.type.isData(value)) {
                            return gView.getLabel(value);
                        }
                        return value;
                    }, "  ") + "</pre>";
                };
            }
            gView.onViewChange(function(evt) {
                if (evt.property === "current_subview" || change_close) {
                    z.util.callLater(function() {
                        tt.close();
                    }, 100);
                }
            });
            if (change_close) {
                gView.onModelChange(function() {
                    tt.close();
                });
            }
            if (option.trigger === "hover") {
                gView.onHoverChange(function(evt) {
                    if (evt.isHover === false) {
                        tt.close();
                        return;
                    }
                    var data = evt.data;
                    $GVUtil._showTooltip(gView, data, event, option);
                });
            } else {
                gView.onDataClick(function(evt) {
                    var data = evt.data;
                    var event = evt.event;
                    $GVUtil._showTooltip(gView, data, event, option);
                });
            }
        },
        _showTooltip: function(gView, data, event, option) {
            var body_only = option.body_only !== false;
            var content;
            if (gView.getTooltip) {
                content = gView.getTooltip(data, event);
            }
            var tt = $GVUtil._getTooltip(option);
            tt.close();
            if (content) {
                var ttRoot = tt.getRoot();
                z.dom.removeClass(ttRoot, "node link group subview");
                var dataType;
                if (z.type.isLink(data)) {
                    dataType = "link";
                } else if (z.type.isGroup(data)) {
                    dataType = "group";
                } else if (z.type.isSubview(data)) {
                    dataType = "subview";
                } else if (z.type.isNode(data)) {
                    dataType = "node";
                }
                if (dataType) {
                    z.dom.addClass(ttRoot, dataType);
                }
                tt.set({
                    content: content
                });
                if (!tt.getRoot().parentNode || tt._tooltip_data !== data) {
                    tt._tooltip_data = data;
                    var bounds;
                    if (z.type.isNode(data)) {
                        bounds = gView.getDataWindowBounds(data, body_only);
                        if (option.in_node_center === true) {
                            bounds = {
                                x: bounds.x + bounds.width / 2,
                                y: bounds.y + bounds.height / 2
                            };
                        }
                    }
                    tt.open(bounds || event);
                }
                event.stopImmediatePropagation();
            }
        },
        _getTooltip: function(option) {
            if (!$GVUtil._tooltip) {
                $GVUtil._tooltip = new z.widget.Tooltip(z.util.mergeObject({
                    class: "gv-tooltip",
                    direction: "screen_center"
                }, option.tooltip_props));
            }
            return $GVUtil._tooltip;
        },
        getTableTooltipStr: function(values) {
            var tt = "<table class='tooltip-table'>";
            z.util.eachObject(values, function(key, value) {
                tt += "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
            });
            tt += "</table>";
            return tt;
        }
    });
    z.util.mergeObject($GVUtil, {
        getHTMLImageData: function(element, width, height) {
            if (element == null) {
                return null;
            }
            if (z.$.DomType.isElement(element)) {
                var size = z.$.DomGeom.getElementWindowBounds(element);
                if (width == null || width <= 0) {
                    width = size.width;
                }
                if (height == null || height <= 0) {
                    height = size.height;
                }
                element = element.outerHTML;
            }
            var xml = $GVUtil._htmlToXML(element);
            xml = xml.replace(/\#/g, "%23");
            return "data:image/svg+xml;charset=utf-8," + '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + '<foreignObject width="100%" height="100%">' + xml + "</foreignObject>" + "</svg>";
        },
        _htmlToXML: function(htmlTxt) {
            var doc = document.implementation.createHTMLDocument("");
            doc.write(htmlTxt);
            doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);
            z.dom.setStyle(doc.body, {
                margin: 0
            });
            htmlTxt = new XMLSerializer().serializeToString(doc.body);
            return htmlTxt;
        }
    });
    var $GVEditController = function(gView, propertySheet, options) {
        this.gView = gView;
        this.propertySheet = propertySheet;
        this._init(options);
    };
    z.util.extendClass($GVEditController, Object, z.util.mergeObject({
        _init: function(options) {
            options = options || {};
            this._value = {};
            this._current = {
                obj: null,
                type: null,
                props: null
            };
            this._type_property_kv_map = {};
            this._changed_value = {};
            this._is_updating = false;
            this._is_setting = false;
            this.data_property_first = false;
            z.util.eachObject(options, function(key, value) {
                if (z.type.isFunction(value)) {
                    this[key] = value;
                }
            }, this);
            this._updateGViewGetProps();
            this._initListener();
        },
        getGView: function() {
            return this.gView;
        },
        getPropertySheet: function() {
            return this.propertySheet;
        },
        getValue: function() {
            return z.util.mergeObject({}, this._value);
        },
        clearValue: function() {
            this._value = {};
            this.gView.update();
        },
        getObjectValue: function(object) {
            return z.util.mergeObject({}, this._value[this.getEditID(object)]);
        },
        removeObjectValue: function(object) {
            delete this._value[this.getEditID(object)];
            this.gView.update();
        },
        setValue: function(value) {
            this._is_setting = true;
            var gView = this.getGView();
            gView.clearSelect();
            this._current = {};
            this._changed_value = {};
            value = z.util.mergeObject({}, value);
            this._value = value;
            gView.eachData(function(data) {
                var editID = this.getEditID(data);
                if (editID == null) {
                    return;
                }
                var objectValue = value[editID] || {};
                var type = this.getEditType(data);
                var setProps = this.getPropertiesOfData(data, type) || {};
                z.util.eachObject(setProps, function(key, value) {
                    if (objectValue.hasOwnProperty(key)) {
                        setProps[key] = objectValue[key];
                    }
                });
                data.set(setProps);
            }, this);
            gView.resetTransform();
            this._setCurrentEditObject(gView);
            this._is_setting = false;
        },
        _getObjectEditValue: function(object) {
            return z.util.mergeObject({}, this._value[this.getEditID(object)]);
        },
        getObjectEditValue: function(object, objValue, data) {
            return objValue;
        },
        isChanged: function() {
            return Object.keys(this._changed_value).length > 0;
        }
    }, {
        _updateGViewGetProps: function() {
            var gView = this.getGView();
            var getDataProperties = gView.getDataProperties;
            var gViewGetProperty = gView.getProperty;
            var _this = this;
            gView.getDataProperties = function(data) {
                var editID = _this.getEditID(data);
                if (editID == null) {
                    return getDataProperties.apply(gView, arguments);
                }
                var viewValue = _this.getObjectEditValue(gView, _this._getObjectEditValue(gView), data);
                var dataValue = _this.getObjectEditValue(data, _this._getObjectEditValue(data), data);
                var props = z.util.mergeObject({}, viewValue, dataValue || {}, getDataProperties.apply(gView, arguments));
                if (_this.data_property_first === true) {
                    var dataProps = data.gets(false);
                    props = z.util.filterObject(props, function(key, value) {
                        return !dataProps.hasOwnProperty(key);
                    });
                }
                return props;
            };
            gView.getProperty = function(key) {
                var objectValue = _this.getObjectEditValue(gView, _this._getObjectEditValue(gView));
                if (objectValue.hasOwnProperty(key)) {
                    return objectValue[key];
                }
                return gViewGetProperty.apply(gView, arguments);
            };
        },
        _initListener: function() {
            var gView = this.getGView();
            var _this = this;
            gView.onDataChange(function(evt) {
                if (_this._is_setting) {
                    return;
                }
                var data = evt.data;
                _this._updateObjectEditValue(data, evt.event);
                _this._updateSheetValue(data);
            });
            gView.onViewChange(function(evt) {
                if (_this._is_setting) {
                    return;
                }
                _this._updateObjectEditValue(gView, evt);
                _this._updateSheetValue(gView);
            });
            gView.onSelectBatchChange(function() {
                _this._setCurrentEditObject(gView.getLastSelected() || gView);
            });
            _this._setCurrentEditObject(gView.getLastSelected() || gView);
            var propertySheet = this.getPropertySheet();
            if (!propertySheet) {
                return;
            }
            propertySheet.onValueChange(function(evt) {
                if (_this._is_setting) {
                    return;
                }
                _this._updateObjectEditValue(_this._current.obj, evt);
                gView.update(true);
            });
        },
        _setCurrentEditObject: function(currentObject) {
            if (this._current.obj === currentObject) {
                return;
            }
            var newType = this.getEditType(currentObject);
            this._current.obj = currentObject;
            var propertySheet = this.getPropertySheet();
            if (propertySheet) {
                propertySheet.edit_object = currentObject;
            }
            if (this._current.type !== newType) {
                this._current.type = newType;
                var newSheetProps = this.getEditProperties(newType, currentObject);
                this._current.props = newSheetProps;
                if (propertySheet) {
                    propertySheet.setProperties(newSheetProps);
                    propertySheet.expand(propertySheet.getRootDataArray());
                }
            }
            this._updateSheetValue(currentObject);
        },
        _updateObjectEditValue: function(object, evt) {
            if (this._is_setting === true || this._is_updating === true) {
                return;
            }
            var property = evt.property;
            if (!this._isEditProperty(object, property)) {
                return;
            }
            this._is_updating = true;
            var editID = this.getEditID(object);
            var newValue = this.getPropertyEditValue(object, property, evt.new_value);
            var changedKey = editID + "-" + property;
            var changedMap = this._changed_value;
            if (changedMap.hasOwnProperty(changedKey)) {
                if (changedMap[changedKey] === newValue) {
                    delete changedMap[changedKey];
                }
            } else {
                changedMap[changedKey] = this.getPropertyEditValue(object, property, evt.old_value);
            }
            var objectValue = this._value[editID] = this._value[editID] || {};
            var isNull = this._isNullValue(newValue);
            if (isNull) {
                delete objectValue[property];
            } else {
                objectValue[property] = newValue;
            }
            this.onValueChange(object, evt);
            if (z.type.isNode(object)) {
                if (property === "x" || property === "y") {
                    newValue = parseFloat(newValue) || 0;
                    object.set(property, newValue);
                } else if (property === "image") {
                    if (isNull) {
                        object.remove(property);
                    } else {
                        object.set(property, newValue);
                    }
                }
            }
            this._is_updating = false;
        },
        _isNullValue: function(value) {
            if (z.type.isNumber(value) && isNaN(value)) {
                return true;
            }
            return value == null || value === "";
        },
        _isEditProperty: function(object, property) {
            var typeProps = this._getEditProperties(object) || {};
            return typeProps.hasOwnProperty(property);
        },
        _getEditProperties: function(object) {
            var type = this.getEditType(object);
            if (!this._type_property_kv_map.hasOwnProperty(type)) {
                this._type_property_kv_map[type] = this._getPropertyKVMap(this.getEditProperties(type, object));
            }
            return this._type_property_kv_map[type];
        },
        _getPropertyKVMap: function(editProps, map) {
            map = map || {};
            (editProps || []).forEach(function(item) {
                var prop = item.property;
                if (prop) {
                    map[prop] = item;
                }
                var children = item.children;
                if (children) {
                    this._getPropertyKVMap(children, map);
                }
            }, this);
            return map;
        }
    }, {
        _updateSheetValue: function(object) {
            var propertySheet = this.getPropertySheet();
            if (!propertySheet) {
                return;
            }
            if (this._current.obj === object) {
                propertySheet.setValue(this._getObjectSheetValue(object, this._current.props));
            }
        },
        _getObjectSheetValue: function(object, edit_props, values) {
            values = values || {};
            var objectEditValue = this._getObjectEditValue(object);
            (edit_props || []).forEach(function(item) {
                var property = item.property;
                if (property) {
                    if (objectEditValue.hasOwnProperty(property)) {
                        values[property] = objectEditValue[property];
                    } else {
                        var currentObj = this._current.obj;
                        if (z.type.isData(currentObj)) {
                            values[property] = this.getGView().getDataViewProperty(currentObj, property);
                        } else if (z.type.isView(currentObj)) {
                            values[property] = currentObj.get(property);
                        }
                    }
                }
                var children = item.children;
                if (children) {
                    this._getObjectSheetValue(object, children, values);
                }
            }, this);
            return values;
        }
    }, {
        onValueChange: function(object, evt) {},
        getPropertyEditValue: function(object, property, value) {
            return value;
        },
        getEditID: function(object) {
            if (z.type.isData(object)) {
                return object.get("edit_id");
            }
            return "view";
        },
        getEditType: function(data) {
            if (z.type.isNode(data)) {
                if (z.type.isGroup(data)) {
                    return "group";
                }
                return "node";
            }
            if (z.type.isLink(data)) {
                return "link";
            }
            if (z.type.isView(data)) {
                return "view";
            }
        },
        getEditProperties: function(type, data) {},
        getPropertiesOfData: function(data, type) {
            if (z.type.isNode(data)) {
                return {
                    x: 0,
                    y: 0,
                    image: null
                };
            }
        }
    }));
    var $GeoJSONParser = {
        parse: function(geoJSON, screenBounds, option) {
            if (z.type.isString(geoJSON)) {
                geoJSON = JSON.parse(geoJSON);
            }
            var nameCenter = geoJSON.name_center;
            option = option || {};
            var areaTransform = option.area_transform;
            var keyField = option["key"] || "name";
            var arr = [], idMap = {};
            (geoJSON.features || []).forEach(function(feature) {
                var item = $GeoJSONParser._parseFeature(feature);
                var id = item.properties[keyField];
                var existItem = idMap[id];
                if (item.points.length > 0) {
                    if (existItem) {
                        var existPoints = existItem.points;
                        existPoints[existPoints.length - 1].seg = "move_to";
                        existPoints.push.apply(existPoints, item.points);
                    } else {
                        idMap[id] = item;
                        arr.push(item);
                    }
                }
            });
            if (areaTransform) {
                z.util.eachObject(areaTransform, function(area, transform) {
                    var item = idMap[area];
                    if (!item) {
                        return;
                    }
                    $GeoJSONParser._transformPoints(item.points, transform);
                });
            }
            var minX, minY, maxX, maxY;
            arr.forEach(function(item, index) {
                item.points.forEach(function(point, pIndex) {
                    var px = point.x, py = point.y;
                    if (index === 0 && pIndex === 0) {
                        minX = maxX = px;
                        minY = maxY = py;
                    } else {
                        minX = Math.min(minX, px);
                        minY = Math.min(minY, py);
                        maxX = Math.max(maxX, px);
                        maxY = Math.max(maxY, py);
                    }
                });
            });
            var pw = maxX - minX, ph = maxY - minY;
            var x = screenBounds.x | 0, y = screenBounds.y | 0, width = screenBounds.width, height = screenBounds.height;
            var zoom = 1, xOffset = 0, yOffset = 0;
            if (width > 0 && height > 0) {
                zoom = Math.min(width / pw, height / ph);
                xOffset = (width - pw * zoom) / 2 + x | 0;
                yOffset = (height - ph * zoom) / 2 + y | 0;
            } else if (width > 0) {
                zoom = width / pw;
                xOffset = (width - pw * zoom) / 2 + x | 0;
            } else if (height > 0) {
                zoom = height / ph;
                yOffset = (height - ph * zoom) / 2 + y | 0;
            }
            arr.forEach(function(item) {
                var pointsCount = item.points.length;
                if (pointsCount === 0) {
                    return;
                }
                var sumX = 0, sumY = 0;
                var itemMinX, itemMinY, itemMaxX, itemMaxY;
                item.points.forEach(function(point, index) {
                    var x = (point.x - minX) * zoom + xOffset;
                    var y = (ph - (point.y - minY)) * zoom + yOffset;
                    point.x = x;
                    point.y = y;
                    sumX += x;
                    sumY += y;
                    if (index === 0) {
                        itemMinX = itemMaxX = x;
                        itemMinY = itemMaxY = y;
                    } else {
                        itemMinX = Math.min(itemMinX, x);
                        itemMinY = Math.min(itemMinY, y);
                        itemMaxX = Math.max(itemMaxX, x);
                        itemMaxY = Math.max(itemMaxY, y);
                    }
                });
                var pointCenter = {
                    x: sumX / pointsCount,
                    y: sumY / pointsCount
                };
                var bounds = {
                    x: itemMinX,
                    y: itemMinY,
                    width: itemMaxX - itemMinX,
                    height: itemMaxY - itemMinY
                };
                var point_center_offset = {
                    x: pointCenter.x - (bounds.x + bounds.width / 2),
                    y: pointCenter.y - (bounds.y + bounds.height / 2)
                };
                if (item.properties.name_center === "points" || nameCenter === "points") {
                    item.label_x_offset = point_center_offset.x;
                    item.label_y_offset = point_center_offset.y;
                }
                item.coordinate = {
                    points_center: pointCenter,
                    bounds: bounds
                };
            });
            return arr;
        },
        _calcBounds: function(points) {
            var minX, minY, maxX, maxY, sumX = 0, sumY = 0;
            if (points == null || points.length < 2) {
                return null;
            }
            points.forEach(function(point, pIndex) {
                var px = point.x, py = point.y;
                sumX += px;
                sumY += py;
                if (pIndex === 0) {
                    minX = maxX = px;
                    minY = maxY = py;
                } else {
                    minX = Math.min(minX, px);
                    minY = Math.min(minY, py);
                    maxX = Math.max(maxX, px);
                    maxY = Math.max(maxY, py);
                }
            });
            return {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY,
                center_x: minX + (maxX - minX) / 2,
                center_y: minY + (maxY - minY) / 2,
                min_x: minX,
                min_y: minY,
                max_x: maxX,
                max_y: maxY,
                sum_x: sumX,
                sum_y: sumY
            };
        },
        _transformPoints: function(points, transform) {
            var bounds = $GeoJSONParser._calcBounds(points);
            if (!bounds) {
                return;
            }
            var minX = bounds.min_x, minY = bounds.min_y;
            var centerX = bounds.center_x, centerY = bounds.center_y;
            var zoomX = 1, zoomY = 1;
            var tZoom = transform.zoom;
            if (tZoom) {
                if (z.type.isArray(tZoom)) {
                    if (tZoom.length > 1) {
                        zoomX = tZoom[0];
                        zoomY = tZoom[1];
                    } else if (tZoom.length > 0) {
                        zoomX = zoomY = tZoom[0];
                    }
                } else if (z.type.isObject(tZoom)) {
                    if (tZoom.hasOwnProperty("x")) {
                        zoomX = tZoom.x;
                    }
                    if (tZoom.hasOwnProperty("y")) {
                        zoomY = tZoom.y;
                    }
                } else {
                    zoomX = zoomY = parseFloat(tZoom);
                }
            }
            if (zoomX !== 1 || zoomY !== 1) {
                points.forEach(function(p) {
                    p.x = minX + (p.x - minX) * zoomX;
                    p.y = minY + (p.y - minY) * zoomY;
                });
                centerX = minX + (centerX - minX) * zoomX;
                centerY = minY + (centerY - minY) * zoomY;
            }
            var tCenter = transform.center;
            var xOffset = 0, yOffset = 0;
            if (tCenter) {
                if (z.type.isArray(tCenter)) {
                    if (tCenter.length > 1) {
                        xOffset = tCenter[0] - centerX;
                        yOffset = tCenter[1] - centerY;
                    }
                } else if (z.type.isObject(tCenter)) {
                    if (tCenter.hasOwnProperty("x")) {
                        xOffset = tCenter.x - centerX;
                    }
                    if (tCenter.hasOwnProperty("y")) {
                        yOffset = tCenter.y - centerY;
                    }
                }
            }
            if (xOffset !== 0 && yOffset !== 0) {
                points.forEach(function(point) {
                    point.x += xOffset;
                    point.y += yOffset;
                });
            }
        },
        _parseFeature: function(feature) {
            var properties = feature.properties || {};
            var geometry = feature.geometry || {};
            var points = [];
            (geometry.coordinates || []).forEach(function(coordinate) {
                var pointArr = [];
                $GeoJSONParser._parseCoordinatePoints(pointArr, coordinate);
                if (pointArr.length > 0 && points.length > 0) {
                    points[points.length - 1].seg = "move_to";
                }
                points.push.apply(points, pointArr);
            });
            return {
                properties: properties,
                points: points
            };
        },
        _parseCoordinatePoints: function(pointArr, coordinate) {
            var first = coordinate[0];
            if (z.type.isArray(first)) {
                coordinate.forEach(function(child) {
                    $GeoJSONParser._parseCoordinatePoints(pointArr, child);
                });
            } else {
                pointArr.push({
                    x: first,
                    y: coordinate[1]
                });
            }
        }
    };
    var $GifUtil = {
        _loadingMap: {},
        _cachedMap: {},
        _errorMap: {},
        register: function(name, imgSrc) {
            if (imgSrc) {
                if (z.type.isString(imgSrc)) {
                    var loadingArr = $GifUtil._loadingMap[name];
                    if (loadingArr == null) {
                        loadingArr = [];
                        $GifUtil._loadingMap[name] = loadingArr;
                    }
                    $GifUtil.load(name, imgSrc);
                }
            }
        },
        get: function(name, loadCallBack, context) {
            if ($GifUtil._cachedMap.hasOwnProperty(name)) {
                return z.util.mergeObject({}, $GifUtil._cachedMap[name]);
            }
            if ($GifUtil._errorMap[name] > 1) {
                return false;
            }
            var callBackArray = $GifUtil._loadingMap[name];
            var needLoad = callBackArray == null;
            if (needLoad === true) {
                callBackArray = [];
                $GifUtil._loadingMap[name] = callBackArray;
            }
            if (loadCallBack) {
                callBackArray.push({
                    callBack: loadCallBack,
                    context: context
                });
            }
            if (needLoad === true) {
                $GifUtil.load(name, name);
            }
        },
        load: function(name, gif_src) {
            z.ajax.ajax("GET", gif_src, {
                responseType: "arraybuffer",
                complete: function(status, result) {
                    if ((status / 100 | 0) === 2) {
                        var gifObj = $GifUtil.parse(result);
                        $GifUtil.cache(name, gifObj);
                    } else {
                        console.error("Load Gif Image Error:" + gif_src);
                        $GifUtil.cache(name, null);
                    }
                }
            });
        },
        cache: function(name, gifObj) {
            if (gifObj) {
                $GifUtil._cachedMap[name] = gifObj;
            } else {
                $GifUtil._errorMap[name] = ($GifUtil._errorMap[name] | 0) + 1;
            }
            var callBackArray = $GifUtil._loadingMap[name];
            if (callBackArray) {
                callBackArray.forEach(function(item) {
                    item.callBack.apply(item.context, [ z.util.mergeObject({}, gifObj) ]);
                });
                delete $GifUtil._loadingMap[name];
            }
        },
        parse: function(binaryData) {
            var gifParseObj = {
                width: null,
                height: null,
                frames: [],
                comment: "",
                duration: 0,
                currentFrame: 0,
                lastFrame: null,
                interlacedBufSize: null,
                deInterlaceBuf: null,
                pixelBufSize: null,
                pixelBuf: null,
                st: new $GifUtil.GifStream(binaryData),
                image: null,
                waitTillDone: true,
                firstFrameOnly: false
            };
            var st = gifParseObj.st;
            st.pos += 6;
            gifParseObj.width = st.data[st.pos++] + (st.data[st.pos++] << 8);
            gifParseObj.height = st.data[st.pos++] + (st.data[st.pos++] << 8);
            var bitField = st.data[st.pos++];
            gifParseObj.colorRes = (bitField & 112) >> 4;
            gifParseObj.globalColourCount = 1 << (bitField & 7) + 1;
            gifParseObj.bgColourIndex = st.data[st.pos++];
            st.pos++;
            if (bitField & 128) {
                gifParseObj.globalColourTable = $GifUtil._parseColourTable(gifParseObj, gifParseObj.globalColourCount);
            }
            $GifUtil._parseBlock(gifParseObj);
            return {
                width: gifParseObj.width,
                height: gifParseObj.height,
                frames: gifParseObj.frames,
                image: (gifParseObj.frames[0] || {}).image,
                frame_count: gifParseObj.frames.length,
                duration: gifParseObj.duration
            };
        },
        _parseBlock: function(gifParseObj) {
            var st = gifParseObj.st;
            var blockId = st.data[st.pos++];
            if (blockId === $GifUtil.GIF_SPECIFICATION_CONST.HEADERS.IMAGE) {
                $GifUtil._parseBlockImg(gifParseObj);
                if (gifParseObj.firstFrameOnly === true) {
                    return;
                }
            } else if (blockId === $GifUtil.GIF_SPECIFICATION_CONST.HEADERS.EOF) {
                return;
            } else {
                $GifUtil._parseBlockExt(gifParseObj);
            }
            $GifUtil._parseBlock(gifParseObj);
        },
        _parseBlockExt: function(gifParseObj) {
            var st = gifParseObj.st;
            var blockID = st.data[st.pos++];
            if (blockID === $GifUtil.GIF_SPECIFICATION_CONST.HEADERS.GCExt) {
                $GifUtil._parseBlockGCExt(gifParseObj);
            } else if (blockID === $GifUtil.GIF_SPECIFICATION_CONST.HEADERS.COMMENT) {
                gifParseObj.comment += st.readSubBlocks();
            } else if (blockID === $GifUtil.GIF_SPECIFICATION_CONST.HEADERS.APPExt) {
                $GifUtil._parseBlockAppExt(gifParseObj);
            } else {
                if (blockID === $GifUtil.GIF_SPECIFICATION_CONST.HEADERS.UNKNOWN) {
                    st.pos += 13;
                }
                st.readSubBlocks();
            }
        },
        _parseBlockGCExt: function(gifParseObj) {
            var st = gifParseObj.st;
            st.pos++;
            var bitField = st.data[st.pos++];
            gifParseObj.disposalMethod = (bitField & 28) >> 2;
            gifParseObj.transparencyGiven = bitField & 1 ? true : false;
            gifParseObj.delayTime = st.data[st.pos++] + (st.data[st.pos++] << 8);
            gifParseObj.transparencyIndex = st.data[st.pos++];
            st.pos++;
        },
        _parseBlockAppExt: function(gifParseObj) {
            var st = gifParseObj.st;
            st.pos += 1;
            if ("NETSCAPE" === st.getString(8)) {
                st.pos += 8;
            } else {
                st.pos += 3;
                st.readSubBlocks();
            }
        },
        _parseBlockImg: function(gifParseObj) {
            var st = gifParseObj.st;
            var deInterlace, frame, bitField;
            deInterlace = function(width) {
                var lines, fromLine;
                lines = gifParseObj.pixelBufSize / width;
                fromLine = 0;
                if (gifParseObj.interlacedBufSize !== gifParseObj.pixelBufSize) {
                    gifParseObj.deInterlaceBuf = new Uint8Array(gifParseObj.pixelBufSize);
                    gifParseObj.interlacedBufSize = gifParseObj.pixelBufSize;
                }
                for (var pass = 0; pass < 4; pass++) {
                    for (var toLine = $GifUtil.GIF_SPECIFICATION_CONST.INTERLACE_OFFSETS[pass]; toLine < lines; toLine += $GifUtil.GIF_SPECIFICATION_CONST.INTERLACE_STEPS[pass]) {
                        gifParseObj.deInterlaceBuf.set(gifParseObj.pixelBuf.subarray(fromLine, fromLine + width), toLine * width);
                        fromLine += width;
                    }
                }
            };
            frame = {};
            gifParseObj.frames.push(frame);
            frame.disposalMethod = gifParseObj.disposalMethod;
            frame.start = gifParseObj.duration;
            frame.delay = gifParseObj.delayTime * 10;
            gifParseObj.duration += frame.delay;
            if (gifParseObj.transparencyGiven) {
                frame.transparencyIndex = gifParseObj.transparencyIndex;
            } else {
                frame.transparencyIndex = undefined;
            }
            frame.leftPos = st.data[st.pos++] + (st.data[st.pos++] << 8);
            frame.topPos = st.data[st.pos++] + (st.data[st.pos++] << 8);
            frame.width = st.data[st.pos++] + (st.data[st.pos++] << 8);
            frame.height = st.data[st.pos++] + (st.data[st.pos++] << 8);
            bitField = st.data[st.pos++];
            frame.localColourTableFlag = bitField & 128 ? true : false;
            if (frame.localColourTableFlag) {
                frame.localColourTable = $GifUtil._parseColourTable(gifParseObj, 1 << (bitField & 7) + 1);
            }
            if (gifParseObj.pixelBufSize !== frame.width * frame.height) {
                gifParseObj.pixelBuf = new Uint8Array(frame.width * frame.height);
                gifParseObj.pixelBufSize = frame.width * frame.height;
            }
            $GifUtil._lzwDecode(gifParseObj, st.data[st.pos++], st.readSubBlocksB());
            if (bitField & 64) {
                frame.interlaced = true;
                deInterlace(frame.width);
            } else {
                frame.interlaced = false;
            }
            $GifUtil._createFrameImg(gifParseObj, frame);
        },
        _createFrameImg: function(gifParseObj, frame) {
            var pixel, pDat, col;
            var img_cvs = frame.image = z.dom.create("canvas");
            img_cvs.width = gifParseObj.width;
            img_cvs.height = gifParseObj.height;
            var img_cvs_ctx = img_cvs.getContext("2d");
            var frameColorTable = frame.localColourTableFlag ? frame.localColourTable : gifParseObj.globalColourTable;
            if (gifParseObj.lastFrame === null) {
                gifParseObj.lastFrame = frame;
            }
            if (gifParseObj.lastFrame.disposalMethod === 1) {
                img_cvs_ctx.drawImage(gifParseObj.lastFrame.image, 0, 0, gifParseObj.width, gifParseObj.height);
            }
            var useT = gifParseObj.lastFrame.disposalMethod === 2 || gifParseObj.lastFrame.disposalMethod === 3;
            var cvsImageData = img_cvs_ctx.getImageData(frame.leftPos, frame.topPos, frame.width, frame.height);
            var ti = frame.transparencyIndex;
            var cvsImageDataArr = cvsImageData.data;
            if (frame.interlaced) {
                pDat = gifParseObj.deinterlaceBuf;
            } else {
                pDat = gifParseObj.pixelBuf;
            }
            var pixCount = pDat.length;
            var index = 0;
            for (var i = 0; i < pixCount; i++) {
                pixel = pDat[i];
                col = frameColorTable[pixel];
                if (ti !== pixel) {
                    cvsImageDataArr[index++] = col[0];
                    cvsImageDataArr[index++] = col[1];
                    cvsImageDataArr[index++] = col[2];
                    cvsImageDataArr[index++] = 255;
                } else if (useT) {
                    cvsImageDataArr[index + 3] = 0;
                    index += 4;
                } else {
                    index += 4;
                }
            }
            img_cvs_ctx.putImageData(cvsImageData, frame.leftPos, frame.topPos);
            gifParseObj.lastFrame = frame;
        },
        _parseColourTable: function(gifParseObj, count) {
            var st = gifParseObj.st;
            var colours = [];
            for (var i = 0; i < count; i++) {
                colours.push([ st.data[st.pos++], st.data[st.pos++], st.data[st.pos++] ]);
            }
            return colours;
        },
        _lzwDecode: function(gifParseObj, minSize, data) {
            var i, pixelPos, pos, clear, eod, size, done, dic, code, last, d, len;
            pos = pixelPos = 0;
            dic = [];
            clear = 1 << minSize;
            eod = clear + 1;
            size = minSize + 1;
            done = false;
            while (!done) {
                last = code;
                code = 0;
                for (i = 0; i < size; i++) {
                    if (data[pos >> 3] & 1 << (pos & 7)) {
                        code |= 1 << i;
                    }
                    pos++;
                }
                if (code === clear) {
                    dic = [];
                    size = minSize + 1;
                    for (i = 0; i < clear; i++) {
                        dic[i] = [ i ];
                    }
                    dic[clear] = [];
                    dic[eod] = null;
                } else {
                    if (code === eod) {
                        done = true;
                        return;
                    }
                    if (code >= dic.length) {
                        dic.push(dic[last].concat(dic[last][0]));
                    } else if (last !== clear) {
                        dic.push(dic[last].concat(dic[code][0]));
                    }
                    d = dic[code];
                    len = d.length;
                    for (i = 0; i < len; i++) {
                        gifParseObj.pixelBuf[pixelPos++] = d[i];
                    }
                    if (dic.length === 1 << size && size < 12) {
                        size++;
                    }
                }
            }
        }
    };
    z.util.mergeObject($GifUtil, {
        GIF_SPECIFICATION_CONST: {
            HEADERS: {
                GCExt: 249,
                COMMENT: 254,
                APPExt: 255,
                UNKNOWN: 1,
                IMAGE: 44,
                EOF: 59,
                EXT: 33
            },
            INTERLACE_OFFSETS: [ 0, 4, 2, 1 ],
            INTERLACE_STEPS: [ 8, 8, 4, 2 ]
        },
        GifStream: function(data) {
            this.data = new Uint8ClampedArray(data);
            this.pos = 0;
            var len = this.data.length;
            this.getString = function(count) {
                var s = "";
                while (count--) {
                    s += String.fromCharCode(this.data[this.pos++]);
                }
                return s;
            };
            this.readSubBlocks = function() {
                var size, count, data = "";
                do {
                    count = size = this.data[this.pos++];
                    while (count--) {
                        data += String.fromCharCode(this.data[this.pos++]);
                    }
                } while (size !== 0 && this.pos < len);
                return data;
            };
            this.readSubBlocksB = function() {
                var size, count, data = [];
                do {
                    count = size = this.data[this.pos++];
                    while (count--) {
                        data.push(this.data[this.pos++]);
                    }
                } while (size !== 0 && this.pos < len);
                return data;
            };
        }
    });
    var $GridLayout = z.util.newClass(z.gv.layout.Layout, function() {
        $GridLayout.superClass.constructor.apply(this, arguments);
    }, {
        ___zdefaults_: {
            cols: 10,
            x: 60,
            y: 60,
            cell_height: 100,
            cell_width: 100
        },
        layout: function(nodeArr) {
            nodeArr = this._getLayoutNodes(nodeArr);
            if (nodeArr.length === 0) {
                return;
            }
            var start_x = this.getProperty("x"), start_y = this.getProperty("y"), cell_height = this.getProperty("cell_height"), cell_width = this.getProperty("cell_width");
            var rows = this.getProperty("rows");
            var cols;
            if (rows > 0) {
                cols = Math.ceil(nodeArr.length / rows);
            } else {
                cols = this.getProperty("cols");
            }
            if (!(cols > 0)) {
                cols = 10;
            }
            nodeArr.forEach(function(node, index) {
                var rowIndex = Math.floor(index / cols);
                var colIndex = index % cols;
                node.setPosition(start_x + colIndex * cell_width, start_y + rowIndex * cell_height);
            });
        }
    });
    var $MindMapLayout = z.util.newClass(z.gv.layout.Layout, function() {
        $MindMapLayout.superClass.constructor.apply(this, arguments);
    }, {
        ___zdefaults_: {
            node_padding: 16,
            node_space: 160,
            direction: "center"
        },
        _getRootNodeArr: function(nodeArr) {
            return z.util.filterArray(nodeArr, function(data) {
                if (z.type.isNode(data)) {
                    return data.getToLinks().length === 0;
                }
                return false;
            });
        },
        _getChildren: function(data) {
            var children = [];
            data.getFromLinks().forEach(function(link) {
                var toNode = link.get("to");
                if (toNode && children.indexOf(toNode) < 0) {
                    children.push(toNode);
                }
            });
            return children;
        },
        layout: function(nodeArr) {
            nodeArr = this._getLayoutNodes(nodeArr);
            if (nodeArr.length === 0) {
                return;
            }
            var _this = this;
            this._size_map = {};
            var direction = this.getProperty("direction");
            this._getRootNodeArr(nodeArr).forEach(function(root) {
                var children = _this._getChildren(root);
                var childrenSizeArr = [];
                var isv = direction === "top" || direction === "bottom" || direction === "v_center";
                if (isv) {
                    children.forEach(function(c) {
                        childrenSizeArr.push({
                            data: c,
                            size: _this._getVerticalWidth(c)
                        });
                    });
                } else {
                    children.forEach(function(c) {
                        childrenSizeArr.push({
                            data: c,
                            size: _this._getHorizontalHeight(c)
                        });
                    });
                }
                switch (direction) {
                  case "left":
                    _this._layoutToLeft(root, childrenSizeArr);
                    break;

                  case "right":
                    _this._layoutToRight(root, childrenSizeArr);
                    break;

                  case "top":
                    _this._layoutToTop(root, childrenSizeArr);
                    break;

                  case "bottom":
                    _this._layoutToBottom(root, childrenSizeArr);
                    break;

                  case "v_center":
                    _this._layoutVerticalCenter(root, childrenSizeArr);
                    break;

                  default:
                    _this._layoutHorizontalCenter(root, childrenSizeArr);
                }
            });
            this._size_map = {};
        },
        _layoutHorizontalCenter: function(root, childrenHeights) {
            childrenHeights.sort(function(a, b) {
                var ah = a.size;
                var bh = b.size;
                if (ah < bh) {
                    return 1;
                }
                if (ah > bh) {
                    return -1;
                }
                return 0;
            });
            var leftHeight = 0;
            var rightHeight = 0;
            var leftArr = [];
            var rightArr = [];
            childrenHeights.forEach(function(o, index) {
                if (index % 2 === 0) {
                    rightHeight += o.size;
                    rightArr.push(o.data);
                } else {
                    leftHeight += o.size;
                    leftArr.push(o.data);
                }
            });
            var node_padding = this.getProperty("node_padding");
            var node_space = this.getProperty("node_space");
            var h = Math.max(leftHeight, rightHeight);
            var cy = h / 2 + node_padding;
            var leftLayers = 0;
            var _this = this;
            leftArr.forEach(function(node) {
                leftLayers = Math.max(_this.getNodeLayerCount(node), leftLayers);
            });
            var rightLayers = 0;
            rightArr.forEach(function(node) {
                rightLayers = Math.max(_this.getNodeLayerCount(node), rightLayers);
            });
            var width = (leftLayers + rightLayers + 1) * node_space;
            var cx = width / 2 + node_padding;
            root.setCenter(cx, cy);
            this._layoutHorizontal(rightArr, cx, cy, false);
            this._layoutHorizontal(leftArr, cx, cy, true);
        },
        _layoutToLeft: function(root, childrenHeights) {
            var h = 0;
            var arr = [];
            childrenHeights.forEach(function(o) {
                h += o.size;
                arr.push(o.data);
            });
            var node_padding = this.getProperty("node_padding");
            var node_space = this.getProperty("node_space");
            var cy = h / 2 + node_padding;
            var layers = 0;
            var _this = this;
            arr.forEach(function(node) {
                layers = Math.max(_this.getNodeLayerCount(node), layers);
            });
            var width = (layers + 1) * node_space;
            var cx = width + node_padding;
            root.setCenter(cx, cy);
            this._layoutHorizontal(arr, cx, cy, true);
        },
        _layoutToRight: function(root, childrenHeights) {
            var h = 0;
            var arr = [];
            childrenHeights.forEach(function(o) {
                h += o.size;
                arr.push(o.data);
            });
            var node_padding = this.getProperty("node_padding");
            var node_space = this.getProperty("node_space");
            var cy = h / 2 + node_padding;
            var cx = node_padding + node_space / 2;
            root.setCenter(cx, cy);
            this._layoutHorizontal(arr, cx, cy, false);
        },
        _layoutHorizontal: function(arr, cx, cy, isLeft) {
            var sum = 0;
            var _this = this;
            arr.forEach(function(node) {
                sum += _this._getNodeLayoutSize(node);
            });
            var node_space = this.getProperty("node_space");
            var ncx;
            if (isLeft === true) {
                ncx = cx - node_space;
            } else {
                ncx = cx + node_space;
            }
            var startY = cy - sum / 2;
            arr.forEach(function(node) {
                var ns = _this._getNodeLayoutSize(node);
                var ncy = startY + ns / 2;
                startY += ns;
                node.setCenter({
                    x: ncx,
                    y: ncy
                });
                var children = _this._getChildren(node);
                if (children.length > 0) {
                    _this._layoutHorizontal(children, ncx, ncy, isLeft);
                }
            });
        },
        _layoutToTop: function(root, childrenSizeList) {
            var w = 0;
            var arr = [];
            childrenSizeList.forEach(function(o) {
                w += o.size;
                arr.push(o.data);
            });
            var node_padding = this.getProperty("node_padding");
            var node_space = this.getProperty("node_space");
            var cx = w / 2 + node_padding;
            var topLayers = 0;
            var _this = this;
            arr.forEach(function(node) {
                topLayers = Math.max(_this.getNodeLayerCount(node), topLayers);
            });
            var height = (topLayers + 1) * node_space;
            var cy = height + node_padding;
            root.setCenter(cx, cy);
            this._layoutVertical(arr, cx, cy, true);
        },
        _layoutToBottom: function(root, childrenSizeList) {
            var w = 0;
            var arr = [];
            childrenSizeList.forEach(function(o) {
                w += o.size;
                arr.push(o.data);
            });
            var node_padding = this.getProperty("node_padding");
            var node_space = this.getProperty("node_space");
            var cx = w / 2 + node_padding;
            var bottomLayers = 0;
            var _this = this;
            arr.forEach(function(node) {
                bottomLayers = Math.max(_this.getNodeLayerCount(node), bottomLayers);
            });
            var cy = node_padding;
            root.setCenter(cx, cy);
            this._layoutVertical(arr, cx, cy, false);
        },
        _layoutVerticalCenter: function(root, childrenSizeList) {
            childrenSizeList.sort(function(a, b) {
                var ah = a.size;
                var bh = b.size;
                if (ah < bh) {
                    return 1;
                }
                if (ah > bh) {
                    return -1;
                }
                return 0;
            });
            var topWidth = 0;
            var bottomWidth = 0;
            var topArr = [];
            var bottomArr = [];
            childrenSizeList.forEach(function(o, index) {
                if (index % 2 === 0) {
                    bottomWidth += o.size;
                    bottomArr.push(o.data);
                } else {
                    topWidth += o.size;
                    topArr.push(o.data);
                }
            });
            var node_padding = this.getProperty("node_padding");
            var node_space = this.getProperty("node_space");
            var w = Math.max(topWidth, bottomWidth);
            var cx = w / 2 + node_padding;
            var topLayers = 0;
            var _this = this;
            topArr.forEach(function(node) {
                topLayers = Math.max(_this.getNodeLayerCount(node), topLayers);
            });
            var bottomLayers = 0;
            bottomArr.forEach(function(node) {
                bottomLayers = Math.max(_this.getNodeLayerCount(node), bottomLayers);
            });
            var height = (topLayers + bottomLayers + 1) * node_space;
            var cy = height / 2 + node_padding;
            root.setCenter(cx, cy);
            this._layoutVertical(bottomArr, cx, cy, false);
            this._layoutVertical(topArr, cx, cy, true);
        },
        _layoutVertical: function(list, cx, cy, isTop) {
            var sum = 0;
            var _this = this;
            list.forEach(function(node) {
                sum += _this._getNodeLayoutSize(node);
            });
            var node_space = this.getProperty("node_space");
            var ncy;
            if (isTop === true) {
                ncy = cy - node_space;
            } else {
                ncy = cy + node_space;
            }
            var startX = cx - sum / 2;
            list.forEach(function(node) {
                var ns = _this._getNodeLayoutSize(node);
                var ncx = startX + ns / 2;
                startX += ns;
                node.setCenter({
                    x: ncx,
                    y: ncy
                });
                var children = _this._getChildren(node);
                if (children.length > 0) {
                    _this._layoutVertical(children, ncx, ncy, isTop);
                }
            });
        },
        getNodeLayerCount: function(node) {
            var _this = this;
            var c = 1;
            var children = _this._getChildren(node);
            var childrenMaxLayerCount = 0;
            children.forEach(function(c) {
                childrenMaxLayerCount = Math.max(_this.getNodeLayerCount(c), childrenMaxLayerCount);
            });
            return c + childrenMaxLayerCount;
        },
        _getNodeLayoutSize: function(data) {
            return this._size_map[data.id()];
        },
        _getHorizontalHeight: function(node) {
            var _this = this;
            var nodeSize = node.getSize();
            var height = nodeSize.height || 32;
            if (node.get("rotation") === 90) {
                height = nodeSize.width || 32;
            }
            var nodeHeight = height + this.getProperty("node_padding") * 2;
            var childrenHeight = 0;
            var children = _this._getChildren(node);
            children.forEach(function(c) {
                childrenHeight += _this._getHorizontalHeight(c);
            });
            var h = Math.max(nodeHeight, childrenHeight);
            _this._size_map[node.id()] = h;
            return h;
        },
        _getVerticalWidth: function(node) {
            var _this = this;
            var nodeSize = node.getSize();
            var width = nodeSize.width || 32;
            if (node.get("rotation") === 90) {
                width = nodeSize.height || 32;
            }
            var nodeWidth = width + this.getProperty("node_padding") * 2;
            var childrenWidth = 0;
            var children = _this._getChildren(node);
            children.forEach(function(c) {
                childrenWidth += _this._getVerticalWidth(c);
            });
            var w = Math.max(nodeWidth, childrenWidth);
            _this._size_map[node.id()] = w;
            return w;
        }
    });
    var $PathLayout = z.util.newClass(z.gv.layout.Layout, function() {
        $PathLayout.superClass.constructor.apply(this, arguments);
    }, {
        layout: function(nodeArr) {
            nodeArr = this._getLayoutNodes(nodeArr);
            var count = nodeArr.length;
            if (count === 0) {
                return;
            }
            var pathPoints = this.get("points");
            if (!z.type.isArray(pathPoints)) {
                return;
            }
            var start = 0;
            if (count === 1) {
                count = 3;
                start = 1;
            } else if (count === 2) {
                count = 4;
                start = 1;
            }
            var avgLen = z.math.calcPathLength(pathPoints) / (count - 1);
            nodeArr.forEach(function(node, index) {
                var point = z.math.calcOffsetPointOnPath(pathPoints, (index + start) * avgLen);
                if (point) {
                    node.setCenter(point);
                }
            });
        }
    });
    var $RingLayout = z.util.newClass(z.gv.layout.Layout, function() {
        $RingLayout.superClass.constructor.apply(this, arguments);
    }, {
        ___zdefaults_: {
            bounds: {
                x: 60,
                y: 60,
                width: 1e3,
                height: 600
            },
            rotation: 0
        },
        layout: function(nodeArr) {
            nodeArr = this._getLayoutNodes(nodeArr);
            var count = nodeArr.length;
            if (count === 0) {
                return;
            }
            var angleAvg = 360 / count;
            var bounds;
            if (!this.hasProperty("bounds")) {
                var gv = this.getGView();
                if (gv) {
                    var size = gv.getRootSize();
                    if (size.width > 0 && size.height > 0) {
                        bounds = {
                            x: 0,
                            y: 0,
                            width: size.width,
                            height: size.height
                        };
                    }
                }
            }
            bounds = bounds || this.getProperty("bounds");
            var rotation = this.getProperty("rotation") | 0;
            nodeArr.forEach(function(node, index) {
                node.setCenter(z.math.calcPointOnEllipse(bounds, rotation + angleAvg * index));
            });
        }
    });
    var $SpiralLayout = z.util.newClass(z.gv.layout.Layout, function() {
        $SpiralLayout.superClass.constructor.apply(this, arguments);
    }, {
        ___zdefaults_: {
            radius_scale: 60
        },
        layout: function(nodeArr) {
            nodeArr = this._getLayoutNodes(nodeArr);
            if (nodeArr.length === 0) {
                return;
            }
            var center;
            if (!this.hasProperty("center")) {
                var gv = this.getGView();
                if (gv) {
                    var size = gv.getRootSize();
                    if (size.width > 0 && size.height > 0) {
                        center = {
                            x: size.width / 2,
                            y: size.height / 2
                        };
                    }
                }
            }
            center = center || {
                x: 300,
                y: 300
            };
            var cx = center.x;
            var cy = center.y;
            var scale = this.getProperty("radius_scale");
            var angleSum = 0;
            nodeArr.forEach(function(node, i) {
                var radius = Math.sqrt(i + 1);
                angleSum += Math.asin(1 / radius);
                var x = Math.cos(angleSum) * (radius * scale) + cx;
                var y = Math.sin(angleSum) * (radius * scale) + cy;
                node.setCenter({
                    x: x,
                    y: y
                });
            });
        }
    });
    var $GVPathCalc = {
        calcShortestPathsBetween: function(srcNode, dstNode, filerFun, sortCmp, directed) {
            var paths = $GVPathCalc.calcPathsBetween(srcNode, dstNode, filerFun, sortCmp, directed);
            if (paths.length > 1) {
                var path1 = paths[0];
                if (path1) {
                    var shortestArr = [ path1 ];
                    paths.forEach(function(path, index) {
                        if (index > 0 && sortCmp(path1, path) === 0) {
                            shortestArr.push(path);
                        }
                    });
                    paths = shortestArr;
                }
            }
            return paths;
        },
        calcPathsBetween: function(fromNode, toNode, filterFun, sortCmp, directed, disjoint) {
            var pathArr = [];
            $GVPathCalc._calcPathsBetween(fromNode, toNode, pathArr, directed);
            if (filterFun) {
                pathArr = z.util.filterArray(pathArr, filterFun);
            }
            if (sortCmp) {
                pathArr.sort(sortCmp);
            }
            if (disjoint === true) {
                return $GVPathCalc.filterDisjointPaths(pathArr);
            }
            return pathArr;
        },
        filterDisjointPaths: function(pathArr) {
            var existMap = {};
            var nrPathArr = [];
            pathArr.forEach(function(path) {
                var pathDataMap = {};
                var joint = false;
                var count = path.length;
                path.forEach(function(data, index) {
                    if (index !== 0 && index !== count - 1) {
                        var did = data.id();
                        pathDataMap[did] = true;
                        if (existMap.hasOwnProperty(did)) {
                            joint = true;
                        }
                    }
                });
                if (joint === false) {
                    nrPathArr.push(path);
                    existMap = z.util.mergeObject(existMap, pathDataMap);
                }
            });
            return nrPathArr;
        },
        _calcPathsBetween: function(fromNode, toNode, pathArr, directed, containedDataArr) {
            var toLinks;
            if (directed !== true) {
                toLinks = fromNode.getLinks();
            } else {
                toLinks = fromNode.getFromLinks();
            }
            var size = toLinks.length;
            for (var i = 0; i < size; i++) {
                var link = toLinks[i];
                var linkToNode = link.get("to");
                if (directed !== true) {
                    if (linkToNode === fromNode) {
                        linkToNode = link.get("from");
                    }
                }
                var currentPathArr = z.util.mergeArray([], containedDataArr);
                currentPathArr.push(fromNode);
                if (currentPathArr.indexOf(linkToNode) < 0) {
                    currentPathArr.push(link);
                    if (linkToNode === toNode) {
                        currentPathArr.push(toNode);
                        pathArr.push(currentPathArr);
                    } else {
                        $GVPathCalc._calcPathsBetween(linkToNode, toNode, pathArr, directed, currentPathArr);
                    }
                }
            }
        }
    };
    var $GifNode = z.util.newClass(z.gv.Node, function() {}, {
        _updateGifImage: function() {
            var gifObj = this._gifObj;
            if (!gifObj) {
                return;
            }
            var current_index = this._gif_playing_current_index | 0;
            var frame = gifObj.frames[current_index % gifObj.frame_count];
            this.set("image", frame.image);
            var delay = frame.delay;
            if (this.has("gif_speed")) {
                delay /= this.get("gif_speed");
            }
            this._gif_playing_current_index = current_index + 1;
            this._gif_playing_calllater_id = z.util.callLater(this._updateGifImage, delay, this);
        },
        afterSetProperty: function(key, value, old) {
            if (key === "image") {
                if (z.type.isString(value)) {
                    if (value.endsWith(".gif")) {
                        this._updateGifPlayingStatus("stopped");
                        pro.gv.GifUtil.get(value, function(gifObj) {
                            this._gifObj = gifObj;
                            this._updateGifPlayingStatus("playing");
                        }, this);
                    } else {
                        if (this._gifObj) {
                            this.pause();
                            delete this._gifObj;
                        }
                    }
                }
            }
            $GifNode.superClass.afterSetProperty.apply(this, arguments);
        },
        togglePlay: function() {
            if (this._gif_playing_status === "playing") {
                this.pause();
            } else {
                this.play();
            }
        },
        _updateGifPlayingStatus: function(status) {
            if (!this._gifObj) {
                return;
            }
            var oldStatus = this._gif_playing_status;
            if (oldStatus === status) {
                return;
            }
            this._gif_playing_status = status;
            if (status === "paused" || status === "stopped") {
                if (this._gif_playing_calllater_id) {
                    z.util.cancelCallLater(this._gif_playing_calllater_id);
                    delete this._gif_playing_calllater_id;
                }
                if (status === "stopped") {
                    delete this._gif_playing_current_index;
                    this.set("image", this._gifObj.image);
                }
            } else if (status === "playing") {
                this._updateGifImage();
            }
        },
        play: function() {
            this._updateGifPlayingStatus("playing");
        },
        pause: function() {
            this._updateGifPlayingStatus("paused");
        },
        stop: function() {
            this._updateGifPlayingStatus("stopped");
        },
        getGifStatus: function() {
            return this._gif_playing_status;
        },
        getGif: function() {
            return this._gifObj;
        }
    }, {});
    var pro = {
        Util: $Util,
        DomUtil: $DomUtil,
        AjaxCRUD: $AjaxCRUD,
        AjaxCache: $AjaxCache,
        FileUtil: $FileUtil,
        GridUtil: $GridUtil,
        ModalUtil: $ModalUtil,
        AccessControl: $AccessControl,
        FormUtil: $FormUtil,
        TimeUtil: $TimeUtil,
        DataUtil: $DataUtil,
        ValidUtil: $ValidUtil,
        NetworkUtil: $NetworkUtil,
        SheetUtil: $SheetUtil,
        VisibleUtil: $VisibleUtil,
        PropertySheet: $PropertySheet,
        template: {
            CRUDTablePage: $CRUDTablePage,
            CrudPage: $CrudPage
        },
        GVUtil: $GVUtil,
        GVPathCalc: $GVPathCalc,
        GVEditController: $GVEditController,
        gv: {
            GifUtil: $GifUtil,
            GifNode: $GifNode,
            GeoJSONParser: $GeoJSONParser,
            layout: {
                GridLayout: $GridLayout,
                RingLayout: $RingLayout,
                PathLayout: $PathLayout,
                MindMapLayout: $MindMapLayout,
                SpiralLayout: $SpiralLayout
            }
        }
    };
    window.pro = pro;
})(window);

if (typeof module !== "undefined" && module.exports) {
    module.exports = pro;
}