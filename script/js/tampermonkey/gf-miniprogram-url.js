// ==UserScript==
// @name         普通URL转成小程序路径
// @namespace    tsingchan
// @version      0.1
// @description  将URL转换成微信小程序路径，只支持部分小程序，如果返回pages/index/index，可能链接转换有误，目前支持知乎、豆瓣、腾讯视频、优酷视频、哔哩哔哩、喜马拉雅、荔枝FM、QQ音乐、网易云音乐、什么值得买、百度网盘、腾讯问卷
// @author       tsingchan
// @require     https://code.jquery.com/jquery-2.1.4.min.js
// @match        http*://*/*
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// ==/UserScript==

var gUrl = window.location.href;

(function() {
    'use strict';

    GM_registerMenuCommand("生成小程序路径", jmMiniPath)        


})();

function jmMiniPath(){
    console.log("start...");

    // var _title = $.trim($("title").text());
    // var _desc = $.trim($("meta[name='description']").attr("content")) || _title || "";
    // var _url = window.location.href;
    // var _favicon = window.location.origin+"/favicon.ico";

    var _host = window.location.host.replace(/\./g,"_");    
    var _miniPath = 'pages/index/index';
    try {
        
        var _res = eval(_host+'.cu()');
        if(_res){
            _miniPath = _res;
        }
        console.log(_miniPath);
                
    } catch (error) {      
        console.log(error);  
        alert("可能该站点还没有支持");
    }
    GM_setClipboard(_miniPath,{type: 'text', mimetype: 'text/plain'},function(){
            // alert(_miniPath)
            let = _appName = eval(_host+".name");
            alert("小程序路径已复制成功！\n操作帮助：\n1、微信公众号后台插入小程序\n2、搜索小程序：\""+_appName+"\"\n3、插入小程序路径："+_miniPath);
        }
    );                    
    
    
}


/**
 * 知乎热榜
 https://www.zhihu.com/question/35351736  to zhihu/question?id=35351736
 https://www.zhihu.com/question/35351736/answer/1211323031 to zhihu/answer?source=wxmarkdown&id=1211323031
 */
var www_zhihu_com = {
    name:"知乎热榜",
    appid:"",
    cu:function(){
        let ss = gUrl.split("/");
        var id = ss[ss.length-1];
    
        if(gUrl.indexOf("answer") !== -1){
            return "zhihu/answer?src=jm&id="+id;
        }else if(gUrl.indexOf("question") !== -1){
            return "zhihu/question?src=jm&id="+id;
        }else{
            return "";
        }
    },
    
}

/**
 * 哔哩哔哩
 https://www.bilibili.com/video/BV1BK411W75W 
 to 
 pages/video/video?avid=498190004
 */
var www_bilibili_com = {
    name:"哔哩哔哩",
    appid:"",
    cu:function(){

        var metaUrl = $.trim($("meta[itemprop='url']").attr("content")) || "";//<meta data-vue-meta="true" itemprop="url" content="https://www.bilibili.com/video/av498190004/">
        let ss = metaUrl.split("/");
        
        var id = ss[ss.length-2];
        id = id.substr(2);
        
        if(gUrl.indexOf("video") !== -1){
            return "pages/video/video?src=jm&avid="+id;    
        }else{
            return "";
        }    
    }

}

/**
 * 优酷视频
 https://v.youku.com/v_show/id_XNDY0MDc4NDYyMA==.html?s=acaf72236f5846d391d2&scm=20140719.rcmd.15319.show_acaf72236f5846d391d2
 to
 pages/play/play?videoId=XNDY0MDc4NDYyMA==
 * 
 */
var v_youku_com = {
    name:"优酷视频",
    appid:"",
    cu:function(){

        let ss = gUrl.split("?");
        let url = ss[0];
        url = url.replace(".html","");
        ss = url.split("/");
        let id = ss[ss.length-1];
        id = id.substr(3);
        
        if(gUrl.indexOf("v_show") !== -1){
            return "pages/play/play?src=jm&videoId="+id;    
        }else{
            return "";
        }
    }
    
}


/**
 * 网易云音乐听歌
单曲 https://music.163.com/#/song?id=5268423 to pages/song/song?id=5268423
列表 https://music.163.com/#/playlist?id=3207684962 to pages/playlist/playlist?id=3207684962 
 */
var music_163_com = {
    name:"网易云音乐听歌",
    appid:"",    
    cu:function(){

        let ss = gUrl.split("?");
        let idStr = ss[1];
        var id = idStr.substr(3);
        
        if(gUrl.indexOf("song") !== -1){
            return "pages/song/song?src=jm&id="+id;
        }else if(gUrl.indexOf("playlist") !== -1){
            return "pages/playlist/playlist?src=jm&id="+id;
        }else{
            return "";
        }
    }
}


/**
 * 荔枝App
 * https://www.lizhi.fm/user/12474765 to pages/user/index?id=12474765
 */
var www_lizhi_fm={
    name:"荔枝App",
    appid:"",
    cu:function(){
        return ""
    }
}


/**
 * 豆瓣评分
 * - 电影
 * https://movie.douban.com/subject/33420285/?tag=热门&from=gaia to pages/subject/subject?id=33420285&type=movie
 */
var movie_douban_com={
    name:"豆瓣评分",
    appid:"",
    cu:function(){
        return ""
    }    

}

/**
 * 豆瓣评分
 * - 读书
 * https://book.douban.com/subject/35005062/?icn=index-latestbook-subject to pages/subject/subject?id=35005062&type=book
 */
var book_douban_com={
    name:"豆瓣评分",
    appid:"",
    cu:function(){
        return ""
    }
}

/**
 * 什么值得买
 * https://www.smzdm.com/p/21056496/ to pages/haojia_details/haojia_details?id=21056496
 */
var www_smzdm_com={
    name:"什么值得买",
    appid:"",
    cu:function(){
        return ""
    }
}


/**
 * 百度网盘
 * https://pan.baidu.com/s/1YNuM8MTHbgi63Blbsa7IAA to pages/netdisk_share/share?surl=1YNuM8MTHbgi63Blbsa7IAA
 */
var pan_baidu_com={
    name:"百度网盘",
    appid:"",
    cu:function(){
        return ""
    }    

}

/**
 * 腾讯问卷
 * https://wj.qq.com/s2/chui123/1a1a/ to pages/survey/index?sid=chui123&hash=1a1a
 */
var wj_qq_com={
    name:"腾讯问卷",
    appid:"",
    cu:function(){
        return ""
    }


}

/**
 * 腾讯视频
 * https://v.qq.com/x/cover/bzfkv5se8qaqel2.html  to pages/play/index?vid=bzfkv5se8qaqel2
 */
var v_qq_com={
    name:"腾讯视频",
    appid:"",
    cu:function(){
        return ""
    }

}

/**
 * QQ音乐
 * 列表：https://y.qq.com/n/yqq/playlist/7060350091.html#stat=y_new.index.playlist.name to pages/playlist/playlist?id=7060350091
 * 单曲：https://y.qq.com/n/yqq/song/003PsVQm1fwoKc.html to pages/index/index?songmid=003PsVQm1fwoKc
 */
var music_qq_com={
    name:"QQ音乐",
    appid:"",
    cu:function(){
        return ""
    }

}