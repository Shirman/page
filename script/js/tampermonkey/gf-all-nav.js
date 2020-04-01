// ==UserScript==
// @name         所有页面的操作导航条
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       tsingchan
// @match        *
// ==/UserScript==

(function() {
    'use strict';


    jmPageAddNav();


})();

var gOpen = false;
function jm_nav_oper(){
    if(gOpen){
        jm_nav_close();
        gOpen = true;
    }else{
        jm_nav_open();
        gOpen = false;
    }

}
function jm_nav_close(){
    alert("jm_nav_close");
}

function jm_nav_open(){
    alert("jm_nav_open");
}


function jmPageAddNav(){

    let div = document.createElement("div");
    div.className = '';
    div.innerHTML = '<style>.jm-side-bar{width:40px;position:fixed;bottom:5%;right:1%;font-size:12px;border:1px solid#eee;z-index:1040}.jm-side-bar a{width:40px;height:40px;display:inline-block;text-align:center;margin-bottom:2px}.jm-side-bar a:hover{background-color:#669fdd}a{color:#64854c;text-decoration:none;font-size:12px}</style><div id="jm-side-bar" class="jm-side-bar"><a id="jm-nav-oper"href="javascript:void(0);"onclick="jm_nav_oper();">展开</a></div>';
    document.body.appendChild(div);
    div.outerHTML = div.innerHTML;
    document.getElementById("jm-nav-oper").onclick=function(){              
        jm_nav_oper();
    };    


}

function jmPageRegisterNavBtn(_name,_onclick){
    let _a = document.createElement("a");
    _a.href = 'javascript:void(0);';
    _a.innerHTML = _name || "unknown";
    document.getElementById("jm-side-bar").appendChild(_a);
    
    // _a.outerHTML = _a.innerHTML;
    _a.onclick = (typeof _onclick == 'function') ? _onclick:(function(){alert("没有任何操作")});

}