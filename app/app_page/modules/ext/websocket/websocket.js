var EXWebsocket = {
    init: function () {
        z.dom.event.onclick("#openBtn", this.openWS, this);
        z.dom.event.onclick("#closeBtn", this.closeWS, this);
    },
    closeWS: function () {
        if (this.ws) {
            this.ws.close();
        }
    },
    openWS: function () {
        this.closeWS();
        var url = z.dom.getValue("#urlInput").trim();
        if (url === "") {
            z.widget.notify("请输入Websocket地址", {type: "info", duration: 1200});
            z.dom.focus("#urlInput");
            return;
        }

        var _this = this;
        var ws = this.ws = new WebSocket(url);
        ws.onopen = function () {
            _this.appendMsg("open websocket:" + url)
        }

        // 接收到服务器消息后的回调函数
        ws.onmessage = function (evt) {
            _this.appendMsg("recv msg: " + evt.data)
        };

        // 连接关闭后的回调函数
        ws.onclose = function () {
            _this.appendMsg("close websocket:" + url)
        };
    },
    appendMsg: function (msg) {
        var msgPre = z.dom.query("#msgPre");
        var time = pro.TimeUtil.format(new Date());
        z.dom.setValue(msgPre, "["+time+"]-"+msg + "<br>" + z.dom.getValue(msgPre));
        msgPre.scrollTop = 0;
    }
}
z.ready(function () {
    EXWebsocket.init();
})