var PopoverSelect = {
    init: function (select, view, options) {
        select = z.dom.query(select);
        options = z.util.mergeObject({
            popover_options: {
                direction: "down_right",
                class: "popover-select-dropdown"
            },
            popover_event: "click",
            select_id_attr: "data-select-id"

            // onPopoverOpen: function () {},
            // onPopoverClose: function () {}
        }, options)
        var popover;
        z.dom.event.on(select, options.popover_event, function (evt) {
            var target = z.dom.event.getTarget(evt, '.popover-select');
            view.host = target;
            if (z.type.isFunction(options.onPopoverOpen)) {
                options.onPopoverOpen(select, view);
            }
            popover = z.widget.popover.open(target, z.util.mergeObject({
                content: view.getRoot(),
                onClose: function () {
                    if (z.type.isFunction(options.onPopoverClose)) {
                        options.onPopoverClose(select, view);
                    }
                }
            }, options.popover_options || {}));
        }, this);
        z.dom.event.onresize(document.body, function () {
            if (popover) {
                popover.close()
            }
        });
        return {
            getPopover: function () {
                return popover
            },
            close: function () {
                if (popover) {
                    z.util.callLater(function () {
                        popover.close();
                        popover = null;
                    }, 10);
                }
            }
        }
    }
}