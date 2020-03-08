// ==UserScript==
// @name         豆瓣 wechat id get
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       tsingchan
// @match        https://www.douban.com/group/topic/*
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
    div.innerHTML = '<div style="position:fixed;top:50px;right:10px;z-index:9999;color:blue;background-color:green;padding:20px;"><button id="jm-fetch">提取微信号</button></div>';
    document.body.appendChild(div);
    div.outerHTML = div.innerHTML;
    document.getElementById("jm-fetch").onclick=function(){              
        jmFetch();
    };
    
}


function jmFetch(){
    console.log("start fetch...");
    
    if(history()){
        alert("已经提取过");
        return false;
    }

    let _reg = /[^-a-zA-Z0-9_]/;
    let _str = '';
    $("#comments  p.reply-content").each(function(e){
        let _comment = $.trim($(this).text());
        console.log(_comment);        
        if(_comment.length < 5){
            console.log("：字符长度小于5，抛弃");            
        }else{
            if(_reg.test(_comment)){
                console.log("：有特殊符号，抛弃");
            }else{
                _str += _comment + "\n";
                console.log("：无特殊符号，提取");
            }
            
        }
    });

    GM_setClipboard(_str,{type: 'text', mimetype: 'text/plain'});
    alert("提取复制成功");
}

function history(){
    let _url = window.location.href;
    let key = "jm-douban-wetchat-url";
    let data = window.localStorage.getItem(key);
    data = JSON.parse(data) || [];//json objext
    if(data){
        for(let _index in data){
            if(data[_index] == _url){
                return true;
            }
        }    
    }
    data.push(_url);
    
    window.localStorage.setItem(key,JSON.stringify(data));
    return false;
}
