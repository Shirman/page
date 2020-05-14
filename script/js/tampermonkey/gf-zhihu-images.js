// ==UserScript==
// @name         知乎答案图片markdown
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http*://*.zhihu.com/*
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand("提取知乎图片MD", jmGetImagesMd)        


})();

function jmGetImagesMd(){
    console.log("start...");

    var _imagesMd = '\n*整理自网络，如若侵权联系删除*\n\n温馨提示：前方高流量预警。\n\n你的 点赞/在看 是我们最大的动力。\n\n';


    $("div.AnswerCard figure").find("img").each(function(e){
        var _img_original = $.trim($(this).data("original"));
        if((typeof _img_original != 'undefined') && _img_original){
            _imagesMd += "\n![]("+_img_original+")\n"; 
        }
    });


    _imagesMd += '\n----\n'+
    "## 不用点赞，点在看，为我们提供最大的动力\n"+
    "\n"+
    "![](https://pic1.zhimg.com/50/v2-2034338e9c7cff4f15dc7a8a60889f63_hd.jpg)\n"+
    "\n"+
    "----\n"+
    '<font size=2 color="grey">本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>\n';
    
    // console.log(_imagesMd);
 
    GM_setClipboard(_imagesMd,{type: 'text', mimetype: 'text/plain'},function(){alert("提取图片成功");});
    
    console.log("End...");
    
}

