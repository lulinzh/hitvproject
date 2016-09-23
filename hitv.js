function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }

    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0);
}
function initHitvBridge() {
    setupWebViewJavascriptBridge(function (bridge) {
        //Android Bridge init
        bridge.init(function (message, responseCallback) {
        });
    });
}
function HitvJS() { }
//获取Api列表及版本
HitvJS.prototype.getApi = function (responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'get_api', 'data': '' }
        , responseData
    );
};

//打开搜索结果
HitvJS.prototype.postSerchResultScene = function (keyword, responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    var data = { 'keyword': keyword };
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'post_search_result_scene', 'data': JSON.stringify(data) }
        , responseData
    );
};
//打开扫描二维码场景
HitvJS.prototype.getQRCodeResult = function (type, responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    var data = { 'type': type };
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'get_scan_qr_result', 'data': JSON.stringify(data) }
        , responseData
    );
};
//打开分享
HitvJS.prototype.postShare = function (link_url, title, image_url, content, responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    //操作
    var data = { 'link_url': link_url, 'title': title, 'image_url': image_url, 'content': content };
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'post_share', 'data': JSON.stringify(data) }
        , responseData
    );
};
//打开音视频页面
HitvJS.prototype.postVideoScene = function (video_id, title,thumb, type,responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    //操作
    var data = { 'video_id': video_id, 'title': title , 'thumb': thumb, 'type': type};
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'post_video_scene', 'data': JSON.stringify(data) }
        , responseData
    );
};
//打开新网页
HitvJS.prototype.postWebScene = function (url, title, responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    //操作
    var data = { 'url': url, 'title': title };
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'post_web_scene', 'data': JSON.stringify(data) }
        , responseData
    );
};
//关闭新网页
HitvJS.prototype.popWebScene = function (responseData) {
    if (!window.WebViewJavascriptBridge) {
        var error = { 'status': { 'code': 100, 'message': '未正确设置HiTVWebBridge' } };
        responseData(error);
        return;
    }
    //操作
    window.WebViewJavascriptBridge.callHandler(
        "hitv"
        , { 'action': 'pop_web_scene', 'data': '' }
        , responseData
    );
};