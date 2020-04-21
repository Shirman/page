// ==UserScript==
// @name         生成页面分享块
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

    GM_registerMenuCommand("生成分享块", jmShareBlock)        


})();

function jmShareBlock(){
    console.log("start...");
    let _data = {
        url:window.location.href,        
        from:"postman"
    };

    let _dataString = '';
    for(let _key in _data){
        _dataString += _key+"=" + encodeURIComponent(_data[_key])+"&";
    }

    // console.log(_dataString);

    GM_xmlhttpRequest({
        method: "POST",
        url: "http://1.3513.top/query/Api/fetchUrlShareInfo",
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:_dataString,
        onload: function(response) {
            console.log('request...');
            // console.log(response.responseText);
            GM_setClipboard(response.responseText,{type: 'text', mimetype: 'text/plain'});
            jmDisplayShareBlock(response.responseText);
            // alert("已经复制");
            
        },
        onerror:function(e){
            console.log("onerror...");
            console.log(e);
        }
    });
    
}

function jmDisplayShareBlock(_shareBlockDivHtml){
    let div = document.createElement("div");
    div.innerHTML = '<div id="jm_share_block_wrap" style="border:1px solid;background-color:#f5f5dc;position:fixed;top:20%;right:40%;padding:10px;z-index:9999;">'+_shareBlockDivHtml+'<div><button style="margin:10px;" id="jm_close_div">关闭</button>[已经复制到剪贴板]</div></div>';
    document.body.appendChild(div);
    div.outerHTML = div.innerHTML;    
    document.getElementById("jm_close_div").onclick = function(){
        console.log('close....');
        document.getElementById("jm_share_block_wrap").style.display = 'none';
    };
}

