// ==UserScript==
// @name         html to markdown
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*/*
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';


    jmPageAddDoBtn();


})();

var whiteList = [
    ""
];



function jmPageAddDoBtn(){   
     
    let div = document.createElement("div");
    div.innerHTML = '<div style="position:fixed;top:50px;right:10px;z-index:9999;color:blue;background-color:green;padding:20px;"><button id="jm-fetch">ToMarkdown</button></div>';
    document.body.appendChild(div);
    div.outerHTML = div.innerHTML;
    document.getElementById("jm-fetch").onclick=function(){              
        jmFetch();
    };
    
}


function jmFetch(){
    console.log("start fetch...");
    let _data = {
        url:window.location.href,
        selector:"#js_content",
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
            console.log('==============================');
            // console.log(response.responseText);
            GM_setClipboard(response.responseText,{type: 'text', mimetype: 'text/plain'});
            alert("已经复制");
            
        },
        onerror:function(e){
            console.log("----------------------------");
            console.log(e);
        }
    });
}
