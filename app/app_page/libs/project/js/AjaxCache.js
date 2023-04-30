/**
 * ajax数据缓存
 */
var AjaxCache = {
    action_logs_modules: {
        _key: "flasky_ajax_cache_action_logs_modules",
        query: function (callback, context) {
            var key = AjaxCache.action_logs_modules._key;
            var data = z.bom.getLocalStorage(key);
            if (data) {
                callback.apply(context, [data]);
                return;
            }
            pro.AjaxCRUD.query({
                url: AjaxUrl.sys_action_log.modules,
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