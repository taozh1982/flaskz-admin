/**
 * ajax数据缓存
 */
var AjaxCache = {
    op_log_menu: {
        _key: "flasky_ajax_cache_op_log_menu",
        query: function (callback, context) {
            var key = AjaxCache.op_log_menu._key;
            var data = z.bom.getLocalStorage(key);
            if (data) {
                callback.apply(context, [data]);
                return;
            }
            pro.AjaxCRUD.query({
                url: AjaxUrl.sys_op_log.menu,
                success_notify: false,
                success: function (result) {
                    var menus = result.data;
                    menus.forEach(function (item) {
                        if (item.module) {
                            item.value = item.module;
                        }
                    });
                    var levelMenus = pro.DataUtil.parseLevelData(menus);
                    menus.forEach(function (item) {
                        delete item.id;
                        delete item.parent_id;
                    });
                    callback.apply(context, [levelMenus]);
                    z.bom.setLocalStorage(key, levelMenus, 2880);
                }
            });
        }
    },
    clear: function () {
        z.bom.clearSessionStorage();
    }
};