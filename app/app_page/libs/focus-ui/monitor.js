(function (window) {
    var $monitor_server_url = "/sys/page_monitor/";// your server url
    var $monitor_performance_navigation = {
        duration: 10000
    };
    var $monitor_performance_resource = {
        duration: 10000
    };
    var $Monitor = {
        init: function () {
            $Monitor.initErrMonitor();
            $Monitor.initPerformanceMonitor();
        },
        initErrMonitor: function () {
            window.addEventListener('error', function (event) {
                if (event instanceof ErrorEvent) {
                    $Monitor.handleJSErr(event);
                } else if (event instanceof Event) {
                    $Monitor.handleResourceErr(event);
                }
            }, true);
            window.addEventListener('unhandledrejection', $Monitor.handleUnhandledRejection, true);
        },
        handleJSErr: function (event) {
            // console.log("js error");
            $Monitor.sendErrToServer({
                error_type: "javascript",
                error: {
                    lineno: event.lineno,
                    colno: event.colno,
                    message: event.message,
                    stack: event.error.stack
                }
            }, event);
        },
        handleResourceErr: function (event) {
            // console.log("resource error");
            $Monitor.sendErrToServer({
                error_type: "resource",
                error: {
                    target: event.target.outerHTML
                }
            }, event);
        },
        handleUnhandledRejection: function (event) {
            // console.log("unhandledrejection");
            $Monitor.sendErrToServer({
                error_type: "unhandledrejection",
                error: {
                    reason: event.reason,
                    promise: event.promise
                }
            }, event);
        },
        sendErrToServer: function (errData, event) {
            errData.monitor_type = "error";
            $Monitor._sendToServer(errData);
        },

        initPerformanceMonitor: function () {
            window.addEventListener('load', function (event) {
                setTimeout($Monitor.handlePerformance, 1000);
            });
        },
        handlePerformance: function () {
            var navigationTiming = $Monitor.getNavigationTiming();
            var timing = {resource: []};
            if ($Monitor.checkPerformance(navigationTiming, $monitor_performance_navigation) === false) {
                timing.navigation = navigationTiming;
            }

            var resourceTiming = $Monitor.getResourceTiming();
            resourceTiming.forEach(function (resourceTimingItem) {
                if ($Monitor.checkPerformance(resourceTimingItem, $monitor_performance_resource) === false) {
                    timing.resource.push(resourceTimingItem);
                }
            });
            if (timing.navigation || timing.resource.length > 0) {
                $Monitor.sendPerformanceToServer({
                    timing: timing
                });
            }
        },
        sendPerformanceToServer: function (performanceData) {
            performanceData.monitor_type = "performance";
            $Monitor._sendToServer(performanceData);
        },
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
                 ????????????
                 navigate/reload/back_forward/prerender
                 */
                type: navigationTiming.type,
                /*
                ?????? onload ?????????????????????
                -- ??????onload?????????????????????
                */
                loadEvent: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
                /*
                ??????dom?????????
                -- ??????dom?????????
                */
                domReady: navigationTiming.domComplete - navigationTiming.domInteractive
            });
        },
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
                 ??????
                 */
                name: timingObj.name,
                /*
                 ??????/??????????????????navigation/link/script/css/img/iframe
                 */
                initiatorType: timingObj.initiatorType,
                /*
                ???????????????
                */
                redirectCount: timingObj.redirectCount | 0,
                /*
                ???????????????
                -- ?????????????????????????????????????????????????????????????????????
                */
                redirect: timingObj.redirectEnd - timingObj.redirectStart,
                /*
                DNS????????????
                -- ??????DNS???????????????
                -- DNS????????? <link rel="dns-prefetch" href="//example.com"  />
                */
                domainLookup: timingObj.domainLookupEnd - timingObj.domainLookupStart,
                /*
                TCP????????????
                -- ??????HTTP??????????????????
                    1#????????????
                    2#?????????
                */
                connect: timingObj.connectEnd - timingObj.connectStart,
                /*
                SSL/TLS????????????
                */
                secureConnection: timingObj.connectEnd - timingObj.secureConnectionStart,
                /*
                ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
                */
                ttfb: timingObj.responseStart - timingObj.requestStart,
                /*
                 ??????????????????
                 -- ???????????????gzip
                 */
                contentDownload: timingObj.responseEnd - timingObj.responseStart,
                /*
                 ??????????????????/??????????????????
                 */
                duration: timingObj.duration
            }
        },
        _sendToServer: function (monitorData) {
            if (!$monitor_server_url) {
                return;
            }
            window.setTimeout(function () {
                monitorData.url = window.location.href;
                var httpRequest = new XMLHttpRequest();
                httpRequest.open("POST", $monitor_server_url);
                httpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                httpRequest.send(JSON.stringify(monitorData));
            }, 100);
        }
    };
    $Monitor.init();
})(window);
//test code
//js error test
//  window.abc.error = '123';


//unhandledrejection test
/*
new Promise(function (resolve, reject) {
    reject('promise reject');
});
*/


//resource error
/* &lt;img src="../resource/notfound.png"&gt; */
