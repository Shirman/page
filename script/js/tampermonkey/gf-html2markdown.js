// ==UserScript==
// @name         HTML TO MARkDOWN
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand("转成MARkDOWN", jmFetch)            

})();


function urlsAndSelector(){
    return {
        "mp.weixin.qq.com":"#js_content",
        "blog.csdn.net":"#content_views",
        "www.zhihu.com":".AnswerItem .RichContent",
        "zhuanlan.zhihu.com":".Post-RichText",
        "www.cnblogs.com":"#cnblogs_post_body",
        "www.jianshu.com":"article",
        "www.woshipm.com":".grap",
        "bbs.hupu.com":"#tpc",
        "book.douban.com":"#review-content",
        "segmentfault.com":"article",

    }
}

function matchUrlAndGetSelector(){
    console.log("strat matchUrlAndGetSelector...");
    var _url = window.location.href;
    var _urlPattern = '';///mp\.weixin\.qq\.com|/;
    console.log(_url);
    var _matchUrls = urlsAndSelector();

    for (let keyUrl in _matchUrls) {
        if (_matchUrls.hasOwnProperty(keyUrl)) {
            let selector = _matchUrls[keyUrl]; 
            if(selector){
                if(_urlPattern){
                    _urlPattern += "|" + keyUrl.replace(/\./g,"\\.");
                }else{
                    _urlPattern += keyUrl.replace(/\./g,"\\.");                    
                }
            }
        }
        
    }
    console.log(_urlPattern);
    let _matchUrl = '';
    if(_urlPattern){
        let _urlPatternObj = new RegExp(_urlPattern);     
        console.log(_urlPatternObj);
        let _matchRes = _urlPatternObj.exec(window.location.href);
        console.log(_matchRes);

        if(_matchRes && _matchRes[0] && _matchUrls[_matchRes[0]]){
            _matchUrl = _matchRes[0];
            console.log("match selector : "+_matchUrls[_matchUrl]);
            return _matchUrls[_matchUrl];//selector
        }
    }

    console.log("未能匹配到[请补充新URL及选择器]："+_url);
    return false;
    

}


function jmFetch(){
    console.log("start fetch...");

    let _selector = matchUrlAndGetSelector();
    if(!_selector){
        alert("没有匹配到对应URl的选择器，请补充");
        return false;
    }

    let _data = {
        url:window.location.href,
        selector:_selector,
        strip_tags:true,
        remove_nodes:"script",
        save_file:false,
        from:"postman"
    };

    let _dataString = '';
    for(let _key in _data){
        _dataString += _key+"=" + encodeURIComponent(_data[_key])+"&";
    }

    // console.log(_dataString);

    GM_xmlhttpRequest({
        method: "POST",
        url: "http://1.3513.top/query/Api/urlToMarkdownFile",
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:_dataString,
        onload: function(response) {
            console.log('xmlhttprequest onload....');
            // console.log(response.responseText);
            GM_setClipboard(response.responseText,{type: 'text', mimetype: 'text/plain'},function(){alert("已经复制到剪贴板");});
                        
        },
        onerror:function(e){
            console.log("xmlhttprequest onerror...");
            console.log(e);
        }
    });
}
