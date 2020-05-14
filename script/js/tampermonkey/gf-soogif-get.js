// ==UserScript==
// @name         soogif search gif
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.soogif.com/*
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
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
    GM_setClipboard(_markdown,{type: 'text', mimetype: 'text/plain'},function(){alert("提取图片成功,直接复制粘贴");});    
    

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

    var _markdown = '\n*整理自网络，如若侵权联系删除*\n\n温馨提示：前方高流量预警。\n\n你的 点赞/在看 是我们最大的动力。\n\n';

    gifSrcs.forEach(element => {
        _markdown += "![]("+element+")\n\n";
    });

    _markdown += '\n----\n'+
    "## 不用点赞，点在看，为我们提供最大的动力\n"+
    "\n"+
    "![](https://pic1.zhimg.com/50/v2-2034338e9c7cff4f15dc7a8a60889f63_hd.jpg)\n"+
    "\n"+
    "----\n"+
    '<font size=2 color="grey">本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>\n';    

    return _markdown
}
