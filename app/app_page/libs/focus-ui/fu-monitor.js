/*! http://focus-ui.com/ | taozh@cisco.com */
/**
 用于页面性能监控和异常信息收集
 全局设置
 window.FU_MONITOR_SERVICE_URL //后端API(POST)
 window.FU_MONITOR_PERFORMANCE_NAVIGATION //导航计时阈值(ms)
 window.FU_MONITOR_PERFORMANCE_RESOURCE //资源计时阈值(ms)
 window.FU_MONITOR_SEND_INTERVAL //最大缓存间隔(ms)
 window.FU_MONITOR_SEND_MAX_COUNT //最大缓存条数
 */
(function (window) {
        var SERVICE_URL = "";// 后端API(POST)，如果不提供默认记录到localstorage中
        var PERFORMANCE_NAVIGATION = {duration: 10000};//导航计时阈值(ms)
        var PERFORMANCE_RESOURCE = {duration: 10000};//资源计时阈值(ms)
        var SEND_INTERVAL = 10000;//最大缓存间隔(ms)
        var SEND_MAX_COUNT = 10;//最大缓存条数
        var $Monitor = {
            init: function () {
                $Monitor.err_data_list = [];
                $Monitor.initErrMonitor();
                $Monitor.initPerformanceMonitor();
            },
            /**
             * 初始化异常监控
             */
            initErrMonitor: function () {
                window.addEventListener('error', function (event) {
                    if (event instanceof ErrorEvent) {
                        $Monitor.handleJSErr(event);
                    } else if (event instanceof Event) {
                        $Monitor.handleResourceErr(event);
                    }
                }, true);
                window.addEventListener('unhandledrejection', $Monitor.handleUnhandledRejection, true);
                window.addEventListener("unload", function () {//关闭页面时发送数据
                    $Monitor._sendToServer($Monitor.err_data_list, true);
                });
            },
            /**
             * js异常处理
             */
            handleJSErr: function (event) {
                $Monitor.sendErrToServer({
                    error_type: "javascript",
                    error: {
                        lineno: event.lineno,
                        colno: event.colno,
                        message: event.message,
                        stack: event.error ? event.error.stack : null
                    }
                }, event);
            },
            /**
             * 资源异常处理
             */
            handleResourceErr: function (event) {
                $Monitor.sendErrToServer({
                    error_type: "resource",
                    error: {
                        target: event.target.outerHTML
                    }
                }, event);
            },
            /**
             * unhandledrejection异常处理(promise)
             */
            handleUnhandledRejection: function (event) {
                $Monitor.sendErrToServer({
                    error_type: "unhandledrejection",
                    error: {
                        reason: event.reason,
                        promise: event.promise
                    }
                }, event);
            },
            /**
             * 发送异常到server
             */
            sendErrToServer: function (errData, event) {
                errData.monitor_type = "error";
                errData.url = window.location.href
                $Monitor.err_data_list.push(errData);
                var now = Date.now();
                if ($Monitor._last_send_time == null) {
                    $Monitor._last_send_time = now;
                }
                if ($Monitor._shouldSend() === true) {
                    $Monitor._sendToServer($Monitor.err_data_list);
                    $Monitor.err_data_list = [];
                    $Monitor._last_send_time = Date.now();
                }
            },

            /**
             * 初始化性能监控
             */
            initPerformanceMonitor: function () {
                window.addEventListener('load', function (event) {
                    setTimeout($Monitor.handlePerformance, 1000);
                });
            },
            /**
             * 遍历检查性能项
             */
            handlePerformance: function () {
                var navigationTiming = $Monitor.getNavigationTiming();
                var timing = {resource: []};
                if ($Monitor.checkPerformance(navigationTiming, $Monitor._getPerfNavigation()) === false) {
                    timing.navigation = navigationTiming;
                }

                var resourceTiming = $Monitor.getResourceTiming();
                resourceTiming.forEach(function (resourceTimingItem) {
                    if ($Monitor.checkPerformance(resourceTimingItem, $Monitor._getPerfResource()) === false) {
                        timing.resource.push(resourceTimingItem);
                    }
                });
                if (timing.navigation || timing.resource.length > 0) {
                    $Monitor.sendPerformanceToServer({
                        timing: timing
                    });
                }
            },
            /**
             * 发送性能数据到server
             */
            sendPerformanceToServer: function (performanceData) {
                performanceData.monitor_type = "performance";
                performanceData.url = window.location.href
                $Monitor._sendToServer([performanceData]);
            },
            /**
             * 检查性能项
             */
            checkPerformance: function (timing, monitor_performance) {
                if (!timing || !monitor_performance) {
                    return true;
                }
                var keys = Object.keys(timing);
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    var key = keys[i];
                    if (monitor_performance.hasOwnProperty(key)) {
                        if (timing[key] > monitor_performance[key]) {
                            return false;
                        }
                    }
                }
                return true
            },
            /**
             * 获取导航timing
             */
            getNavigationTiming: function () {
                var performance = window.performance;
                if (!performance) {
                    return null;
                }
                var navigationTiming = performance.getEntriesByType('navigation')[0];
                if (!navigationTiming) {
                    navigationTiming = performance;
                    var navigation = navigationTiming.navigation;
                    var type = navigation.type;
                    switch (type) {
                        case 0:
                            type = "navigate";
                            break;
                        case 1:
                            type = "reload";
                            break;
                        case 2:
                            type = "back_forward ";
                            break;
                    }
                    navigationTiming = navigationTiming.timing.toJSON();
                    navigationTiming.startTime = navigationTiming.startTime || navigationTiming.navigationStart;
                    navigationTiming.name = window.location.href;
                    navigationTiming.type = type;
                    navigationTiming.initiatorType = "navigation";
                    navigationTiming.redirectCount = navigation.redirectCount;
                    navigationTiming.duration = navigationTiming.loadEventEnd - navigationTiming.startTime;
                } else {
                    navigationTiming = navigationTiming.toJSON();
                }
                return Object.assign($Monitor._getPerformanceTiming(navigationTiming), {
                    /*
                     导航类型
                     navigate/reload/back_forward/prerender
                     */
                    type: navigationTiming.type,
                    /*
                    执行 onload 回调函数的时间
                    -- 减少onload回调函数操作，
                    */
                    loadEvent: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
                    /*
                    解析dom树时间
                    -- 减少dom树嵌套
                    */
                    domReady: navigationTiming.domComplete - navigationTiming.domInteractive,
                    /*
                    解析dom树时间
                    -- 减少dom树嵌套
                    */
                    nextHopProtocol: navigationTiming.nextHopProtocol
                });
            },
            /**
             * 获取资源timing
             */
            getResourceTiming: function () {
                var timingArr = [];
                var performance = window.performance;
                if (!performance) {
                    return timingArr;
                }
                performance.getEntriesByType('resource').forEach(function (timing) {
                    timingArr.push($Monitor._getPerformanceTiming(timing.toJSON()))
                });
                return timingArr;
            },
            _getPerformanceTiming: function (timingObj) {
                return {
                    /*
                     地址
                     */
                    name: timingObj.name,
                    /*
                     导航/资源的类型，navigation/link/script/css/img/iframe
                     */
                    initiatorType: timingObj.initiatorType,
                    /*
                    重定向计数
                    */
                    redirectCount: timingObj.redirectCount | 0,
                    /*
                    重定向时间
                    -- 直接使用重定向之后的地址，可以减少重定向耗时
                    */
                    redirect: timingObj.redirectEnd - timingObj.redirectStart,
                    /*
                    DNS查询时间
                    -- 减少DNS的请求次数
                    -- DNS预获取 <link rel="dns-prefetch" href="//example.com"  />
                    */
                    domainLookup: timingObj.domainLookupEnd - timingObj.domainLookupStart,
                    /*
                    TCP连接时间
                    -- 减少HTTP的请求数量，
                        1#资源合并
                        2#长链接
                    */
                    connect: timingObj.connectEnd - timingObj.connectStart,
                    /*
                    SSL/TLS协商时间
                    */
                    secureConnection: timingObj.connectEnd - timingObj.secureConnectionStart,
                    /*
                    第一字节的到达时间，浏览器请求页面与从服务器接收到信息的第一字节之间的时间
                    */
                    ttfb: timingObj.responseStart - timingObj.requestStart,
                    /*
                     内容下载时间
                     -- 内容压缩，gzip
                     */
                    contentDownload: timingObj.responseEnd - timingObj.responseStart,
                    /*
                     整个导航完成/资源可用时间
                     */
                    duration: timingObj.duration
                }
            },

            _sendToServer: function (monitorDataList, beacon) {
                if (monitorDataList.length === 0) {
                    return;
                }
                var monitor_service_url = $Monitor._getServiceURL();
                if (!monitor_service_url) {
                    $Monitor._saveToStorage(monitorDataList);
                    return false;
                }
                if (beacon === true) {
                    navigator.sendBeacon(monitor_service_url, JSON.stringify(monitorDataList));//string --> request.data
                } else {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.open("POST", monitor_service_url);
                    httpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    httpRequest.send(JSON.stringify(monitorDataList));
                }
            },
            _saveToStorage: function (monitorDataList) {
                if (window.localStorage) {
                    var now = new Date();
                    window.localStorage.setItem("monitor-log-" + now.getMonth() + "/" + now.getDate() + "/" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(), JSON.stringify(monitorDataList));
                }
            },
            /**
             * 接受异常信息的服务api
             * 通过window.FU_MONITOR_SERVICE_URL定义
             */
            _getServiceURL: function () {
                return window.FU_MONITOR_SERVICE_URL || SERVICE_URL
            },
            /**
             * 导航计时阈值(ms)
             * 通过window.FU_MONITOR_PERFORMANCE_NAVIGATION自定义
             */
            _getPerfNavigation: function () {
                return window.FU_MONITOR_PERFORMANCE_NAVIGATION || PERFORMANCE_NAVIGATION || {};
            },
            /**
             * 资源计时阈值(ms)
             * 通过window.FU_MONITOR_PERFORMANCE_RESOURCE自定义
             */
            _getPerfResource: function () {
                return window.FU_MONITOR_PERFORMANCE_RESOURCE || PERFORMANCE_RESOURCE || {};
            },
            _shouldSend: function () {
                var interval = window.FU_MONITOR_SEND_INTERVAL || SEND_INTERVAL;
                if (interval > 0 && Date.now() - $Monitor._last_send_time >= interval) {
                    return true;
                }
                var count = window.FU_MONITOR_SEND_MAX_COUNT || SEND_MAX_COUNT;
                if (count > 0 && $Monitor.err_data_list.length >= count) {
                    return true;
                }
                return false;
            }
        };
        $Monitor.init();
        window.Page_Monitor = $Monitor;//对外
    }
)(window);
//for vue
if (window.Vue) {
    Vue.config.errorHandler = function (err, instance, info) {
        window.Page_Monitor.sendErrToServer({
            error_type: "vue",
            error: {
                message: err.message,
                stack: err.stack,
                info: info
            }
        });
    }
}
/*//for react
class ReactErrorBoundary extends React.Component {
    //...
    componentDidCatch(error, errorInfo) {
        window.Page_Monitor.sendErrToServer({
            error_type: "react",
            error: {
                message: error.message,
                stack: error.stack,
                info: errorInfo
            }
        });
    }
}*/
