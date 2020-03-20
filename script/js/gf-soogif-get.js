// ==UserScript==
// @name         soogif search gif
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.soogif.com/*
// @grant       GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    // jmPageAddDoBtn();
    GM_registerMenuCommand("提取soogif表情包", jmFetch)    


})();


function jmPageAddDoBtn(){
    $("body").append('<div style="position:fixed;top:100px;right:100px;z-index:9999;color:red;background-color:green;padding:20px;"><button id="jm-fetch">提 取</button></div>');
    //<div class="with-scroll-search-button">搜索</div>
    $("#jm-fetch").on("click",function(){
        jmFetch();
    });
}


function jmFetch(){
    console.log("start fetch...");
    var _markdown = jmGifSrcsToMarkdown(jmGetGifSrc());
    // console.log(_markdown);
    jmCopyToClipboard(_markdown);

}

function jmGetGifSrc(){
    var gifSrcs = [];//$("#container").each("a.item").find("img.lazy").attr("src");
    $("#container").find("a.item").each(function(){
        var _src = $(this).find("img.lazy").attr('data-original');
        // var _src = $(this).find("img.lazy").attr('src');
        if(_src!='/images/img/img-home-page/default.png'){
            gifSrcs.push(_src);
        }

    });
    gifSrcs.pop();
    return gifSrcs;

}

function jmGifSrcsToMarkdown(gifSrcs){
    var _markdown = '';
    gifSrcs.forEach(element => {
        _markdown += "![]("+element+")\n\n";
    });
    return _markdown
}

function jmCopyToClipboard (text) {
    if(text.indexOf('-') !== -1) {
        let arr = text.split('-');
        text = arr[0] + arr[1];
    }
    var textArea = document.createElement("textarea");
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
       alert(msg);
      } catch (err) {
        alert('该浏览器不支持点击复制到剪贴板');
      }

      document.body.removeChild(textArea);
}
