/**
 * Created by liuzhihua on 2016-1-13.
 * ajax全局事件
 * predict (function) ajax完成条件
 * callback ajax完成后回调函数
 * ajax  url
 * return $
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    var inited, callbackList = {};
    $.ajaxhook = function (url, predict, callback) {
        if (!(url && predict && callback)) {
            return this;
        }
        if (predict()) {
            callback(url);
        }
        callbackList[url.toLowerCase()] = callback;
        if (!inited) {
            inited = true;
            $(document).on("ajaxSuccess", function (event, xhr, options) {
                (callbackList[options.url.toLowerCase()] || $.noop)(options.url);
            });
        }
        return this;
    }
}));