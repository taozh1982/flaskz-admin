var NavTree = function () {
    NavTree.superClass.constructor.apply(this, arguments);
    this.onSelectBatchChange(this.showPage, this);
};
z.util.extendClass(NavTree, z.widget.Tree, z.util.mergeObject({
        showPage: function () {
            var lastSelect = this.getLastSelected();
            if (lastSelect) {
                if (this.get("cache_page") === false) {
                    this.clearDataContent();
                }
                this.setCurrentDataContent(lastSelect);
                z.bom.setSessionStorage("selected_menu", {
                    name: lastSelect.get("name"),
                    url: lastSelect.get("url")
                })
            }
        },
        isSelectable: function (data) {
            return data.get("url") != null;
        },
        getContentContainer: function () {
            return this.get("content_container");
        }
    }, z.widget.$interface.DataContentInterface(NavTree))
);

var Admin = {
    init: function () {
        z.widget.popover.init();
        this.initListener();
        this.initMenu();
        this._init();
    },
    initMenu: function () {
        this.tree = new NavTree({
            expand_on_click: true,
            model_select: true,
            // cache_page:false,
            content_container: z.dom.query(".content", ".body-main"),
            getLabel: function (data) {
                return (data.get("font_icon") || "") + data.get("name");
            }
        });

        this.menu = z.widget.Menu({
            mode: "vertical",
            selectable: true,
            model_select: true,
            getLabel: function (data) {
                var font_icon = data.get("font_icon") || "";
                if (!data.get("parent")) {
                    return font_icon;
                }
                return font_icon + data.get("name");
            },
            isSelectable: function (data) {
                return data.get("url") != null;
            }
        });

        // this._initMenuItems(MenuItems);
    },
    _initMenuItems: function (items) {
        this.tree.setData(items);
        var firstUrlData;
        this.tree.hEachData(function (data) {
            var url = data.get("url");
            if (url) {
                data.set("content", "url:" + url);
                if (!firstUrlData) {
                    firstUrlData = data;
                }
            }
        });
        this.menu.setProvider(this.tree.getProvider());
        this.tree.appendTo("#asideDiv");
        this.menu.appendTo("#asideDiv");

        var selected_menu = z.bom.getURLHash();
        if (selected_menu) {
            selected_menu = this.tree.findData({
                path: selected_menu
            }) || this.tree.findData({
                name: decodeURI(selected_menu)
            }) || null;

        }
        if (!selected_menu) {
            selected_menu = z.bom.getSessionStorage("selected_menu");
            if (selected_menu) {
                selected_menu = this.tree.findData(selected_menu);
            }
        }
        this.tree.setSelect(selected_menu || firstUrlData);
    },

    initListener: function () {
        z.dom.event.onclick(z.dom.query(".toggle-menu", "header"), function () {
            z.dom.toggleClass("body", "aside-collapsed");
        });
    }
};
z.util.mergeObject(Admin, {
    refreshMenu: function (menuItems) {
        if (!z.util.isArray(menuItems)) {
            menuItems = [menuItems]
        }
        menuItems.forEach(function (item) {
            if (z.util.isString(item)) {
                item = {url: item}
            }
            var menuData = this.tree.findData(item);
            if (menuData) {
                this.tree.removeDataContent(menuData);
            }
        }, this);
    },
    dispatchModuleChange: function (mudule, data) {
        this.tree.dispatchEvent("module_change", {
            module: mudule,
            data: data
        })
    },
    onModuleChange: function (listener, context) {
        this.tree.addListener("module_change", listener, context)
    },
    offModuleChange: function (listener, context) {
        this.tree.removeListener("module_change", listener, context)
    }
});


z.ready(function () {
    Admin.init();
});