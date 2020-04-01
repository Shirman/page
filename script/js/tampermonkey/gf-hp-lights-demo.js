// ==UserScript==
// @name         虎扑指定第一回复点亮demo
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://bbs.hupu.com/31827581.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function(){ doLike();alert("点亮来自Tsing");},3000);

    var _key = "jm_hp_text";
    window.localStorage.setItem(_key,"请把我蒂格，带回你滴家;请把你滴威少留下？");
    console.log(window.localStorage.getItem(_key));
})();

function doLike(){

    var _this = $("#readfloor").children("div").first().find("a.ilike_icon");

    var t = _this.parents(".f444");
    //t.length || (t = _this.parents(".f666"));
    console.log(t);
    console.log(t.attr("pid"));
    //return true;
    var i = t.attr("pid")
    , e = t.attr("uid")
    , o = _this.attr("mid")
    , s = $("#j_data").attr("csrftoken")
    , n = _this;
    t.after("<b class='loading'>&nbsp;</b>"),
        $.ajax({
        type: "POST",
        dataType: "json",
        url: "/ajax/lights.ajax.php",
        data: {
            tid: tid,
            pid: i,
            state: o,
            authorid: e,
            fid: fid,
            token: s
        },
        success: function(t) {
            if ($("b.loading").hide(),
                1 != t.code)
                return -11 == t.code ? show_login() : ($(".tips_up_pop").fadeIn().fadeOut(3e3),
                                                       $(".tips_pop").text(t.msg)),
                    !1;
            if (n.parent(".ilike_icon_list").addClass("red"),
                $("span." + i + " .stime").text(t.num),
                n.parents(".button-light-inner").length) {
                var e = n.parents(".button-light-inner").find(".ilike_icon");
                parseInt(t.num) >= 0 ? !e.hasClass("ilike_light_icon") && e.addClass("ilike_light_icon") : e.removeClass("ilike_light_icon")
            }
            $(".tips_up_pop").fadeIn().fadeOut(1500),
                $(".tips_pop").text("操作成功"),
                $(document).trigger("HpAttention")
        }
    }),
        setTimeout("clearLike()", 3e3);

}