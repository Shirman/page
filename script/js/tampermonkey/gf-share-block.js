// ==UserScript==
// @name         生成页面分享块
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @require     https://code.jquery.com/jquery-2.1.4.min.js
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

    var _title = $.trim($("title").text());
    var _desc = $.trim($("meta[name='description']").attr("content")) || _title || "";    
    var _url = window.location.href;
    var _favicon = window.location.origin+"/favicon.ico";


    var _html = '<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;">'+
                '<div>'+
                    '<p><font size=3 style="color:black;"><a href="'+_url+'" _target="blank" style="color:black;">'+_title+'</a></font></p>'+
                '</div>'+
                '<div style="display:flex;display:-webkit-flex;">'+
                    '<div style="width:50px;">'+
                        '<img style="width:50px;" src="'+_favicon+'" />'+
                    '</div>'+
                    '<div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;">'+
                        '<font size=2 color=grey>'+_desc+'</font>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            "\n\n";

    GM_setClipboard(_html,{type: 'text', mimetype: 'text/plain'},function(){jmDisplayShareBlock(_html);});
    

    // let _data = {
    //     url:window.location.href,        
    //     from:"postman"
    // };

    // let _dataString = '';
    // for(let _key in _data){
    //     _dataString += _key+"=" + encodeURIComponent(_data[_key])+"&";
    // }

    // // console.log(_dataString);

    // GM_xmlhttpRequest({
    //     method: "POST",
    //     url: "http://1.3513.top/query/Api/fetchUrlShareInfo",
    //     headers:{'Content-type':'application/x-www-form-urlencoded'},
    //     data:_dataString,
    //     onload: function(response) {
    //         console.log('request...');
    //         // console.log(response.responseText);
    //         GM_setClipboard(response.responseText,{type: 'text', mimetype: 'text/plain'});
    //         jmDisplayShareBlock(response.responseText);
    //         // alert("已经复制");
            
    //     },
    //     onerror:function(e){
    //         console.log("onerror...");
    //         console.log(e);
    //     }
    // });
    
}

function jmDisplayShareBlock(_shareBlockDivHtml){
    let div = document.createElement("div");
    div.innerHTML = '<div id="jm_share_block_wrap" style="border:1px solid;background-color:#f5f5dc;position:fixed;top:20%;right:40%;padding:10px;z-index:9999;">'+_shareBlockDivHtml+'<div><button style="margin:10px;" id="jm_close_div">关闭</button>[已经复制到剪贴板]</div></div>';
    document.body.appendChild(div);
    div.outerHTML = div.innerHTML;    
    document.getElementById("jm_close_div").onclick = function(){        
        console.log('close....');
        var _div = document.getElementById("jm_share_block_wrap");
        _div.parentNode.removeChild(_div)
        // _div.style.display = 'none';
    };
}

