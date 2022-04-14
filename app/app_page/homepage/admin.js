// {name: "Menu 1", path: "main", font_icon: "<i class='fa fa-home'></i>", url: "./page/main.html"}
//path is the primary key  url = url|path
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
            if (this.get("update_hash") === true) {
                window.location.hash = lastSelect.get("path");
            }
            this.setCurrentDataContent(lastSelect);
            z.bom.setSessionStorage("selected_menu", {
                name: lastSelect.get("name"),
                path: lastSelect.get("path")
            })
        }
    },
    isSelectable: function (data) {
        return data.get("path") != null;
    },
    getContentContainer: function () {
        return this.get("content_container");
    }
}, z.widget.$interface.DataContentInterface(NavTree)));

var Admin = {
    init: function () {
        z.widget.popover.init();
        this.initController();
        this.initView();
        this.initModel();
        this.initCustom();
    },
    initView: function () {
        this.tree = new NavTree({
            expand_on_click: true,
            model_select: true,
            // cache_page:false,
            update_hash: true,
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
                return data.get("path") != null;
            }
        });
    },
    initMenuItems: function (items) {
        this.tree.setData(items);
        var firstPathData;
        this.tree.eachData(function (data) {
            var url = data.get("url") || data.get("path");
            if (url) {
                data.set("content", "url:" + url);
                if (!firstPathData) {
                    firstPathData = data;
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
        this.tree.setSelect(selected_menu || firstPathData);
    },
    initAccountProfile: function (profile) {
        z.dom.setValue("#accountLabel", profile.name);
    },
    initController: function () {
        if (z.dom.query(z.dom.query(".toggle-menu", "header"))) {
            z.dom.event.onclick(z.dom.query(".toggle-menu", "header"), function () {
                z.dom.toggleClass("body", "aside-collapsed");
            });
        }
        if (z.dom.query(".refresh-page", "header")) {
            z.dom.event.onclick(z.dom.query(".refresh-page", "header"), function () {
                this.refreshMenu();
            }, this);
        }
        this._initProfileController();
    },
    _initProfileController: function () {
        if (z.dom.query("#signOutA")) {
            z.dom.event.onclick("#signOutA", this.handleSignOut, this);
        }
        if (z.dom.query("#profileA")) {
            z.dom.event.onclick("#profileA", this.showProfileModal, this);
        }
    },
    fullScreen: function (full) {
        if (full === false) {
            z.dom.removeClass(document.body, "full-screen")
        } else {
            z.dom.toggleClass(document.body, "full-screen");
        }
    }
};
//menu
z.util.mergeObject(Admin, {
    selectMenu: function (path) {
        var selected_menu;
        if (z.type.isString(path)) {
            selected_menu = this.tree.findData({
                path: path
            });
        } else if (z.type.isObject(path)) {
            selected_menu = this.tree.findData(path);
        }
        if (selected_menu) {
            this.tree.setSelect(selected_menu);
        }
    },
    refreshMenu: function (menuItems) {
        var lastSelected = this.tree.getLastSelected();
        if (arguments.length === 0) {//refresh current page
            if (lastSelected) {
                menuItems = [lastSelected.get("path")];
            }
        }
        if (!z.type.isArray(menuItems)) {
            menuItems = [menuItems]
        }
        menuItems.forEach(function (item) {
            if (z.type.isString(item)) {
                item = {path: item}
            }
            var menuData = this.tree.findData(item);
            if (menuData) {
                this.tree.removeDataContent(menuData);
                if (lastSelected === menuData) {
                    this.tree.setCurrentDataContent(lastSelected);
                }
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

//custom
z.util.mergeObject(Admin, {
    initModel: function () {
        this.initMenuItems(MenuItems);
        this.initAccountProfile({name: "admin"});
    },
    handleSignOut: function () {
        alert("Sign out");
    },
    showProfileModal: function () {
        z.widget.popover.close();
        alert("Show profile modal");
    }
});
z.ready(function () {
    Admin.init();
});