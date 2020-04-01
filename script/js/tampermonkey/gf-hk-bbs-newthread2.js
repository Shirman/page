// ==UserScript==
// @name         hk論壇發新帖
// @namespace    tsingchan
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.discuss.com.hk/post.php?action=newthread*
// @grant        none
// ==/UserScript==


var gHost = 'https://'+window.location.host+'/';
if(window.location.host != 'www.discuss.com.hk'){
    window.location.href = window.location.href.replace(window.location.host,"www.discuss.com.hk");
}
var gUsername = '';

var jmtool = {


    getCurrentTimestamp:function(){
        return parseInt(new Date().getTime()/1000);
    },
    getCurrentDate:function(){
        return this.convertTimesatmpToDate(this.getCurrentTimestamp());
    },
    convertTimesatmpToDate:function(time){
        if(typeof(time)=="undefined"){
            return "";
        }
        time = time * 1000;
        var oDate = new Date(time),  
        oYear = oDate.getFullYear(),  
        oMonth = oDate.getMonth()+1,  
        oDay = oDate.getDate(),  
        oHour = oDate.getHours(),  
        oMin = oDate.getMinutes(),  
        oSen = oDate.getSeconds(), 

        //补0操作,当时间数据小于10的时候，给该数据前面加一个0  
            
        oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay) +' '+ this.getzf(oHour) +':'+ this.getzf(oMin) +':'+this.getzf(oSen);//最后拼接时间  
                
        return oTime;          
    },

    getzf:function(num){  
        if(parseInt(num) < 10){  
            num = '0'+num;  
        }  
        return num;  
    },    
    
    
    addZero:function (i) {
        return i < 10 ? "0" + i: i + "";
    },
    countDown:function (lefttime,_jqObj) {
        // var nowtime = new Date();
        // var endtime = new Date("2019/03/16,17:57:00");
        // var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
        var d = parseInt(lefttime / (24*60*60))
        var h = parseInt(lefttime / (60 * 60) % 24);
        var m = parseInt(lefttime / 60 % 60);
        var s = parseInt(lefttime % 60);
        d = this.addZero(d)
        h = this.addZero(h);
        m = this.addZero(m);
        s = this.addZero(s);

        _jqObj.val(`倒计时  ${d}天 ${h} 时 ${m} 分 ${s} 秒`);
        if (lefttime <= 0) {
            _jqObj.val("已结束");
            return true;
        }

        setTimeout(countDown, 1000);
    },
  

    //生成从minNum到maxNum的随机数
    randomNum:function(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    },  

    /**
     * 指定区域复制
     * @param {*} _domId 
     */
    copyText:function(_domId){
        const range = document.createRange();
        range.selectNode(document.getElementById(_domId));//需要复制的内容的ID
        const selection = window.getSelection();
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
    },

};

var storage = {
    //localstorage
    formLocalStorageKey:"jm_hk_bbs_threads_form",

    addToStorage:function(_subject,_data){
        if(_subject && _data){        
            
            let _json = this.getAllFromStorage();                        

            let _defaultData = {status:0,time:0,date:"-",url:"",timeout:60};
            _json[_subject] = Object.assign(_defaultData,_data);             
            
            window.localStorage.setItem(this.formLocalStorageKey,JSON.stringify(_json));
        }
    },
    getFromStorage:function(_subject){
        if(_subject){
            let _json = this.getAllFromStorage();
            if(_json){
                return _json[_subject] || null;
            }
        }
        return null;
    },
    deleteFromStorage:function(_subject){
        if(_subject){            
            
            let _json = this.getAllFromStorage();
            if(_json){
                delete _json[_subject];
                window.localStorage.setItem(this.formLocalStorageKey,JSON.parse(_json));        
            }            
        }
    },
    deleteAllFromStorage:function(){
        window.localStorage.setItem(this.formLocalStorageKey,null);
    },
    getAllFromStorage:function(){                
        let _str = window.localStorage.getItem(this.formLocalStorageKey);
        let _json = JSON.parse(_str) || [];
        if((typeof _json !== "object") || !_json){
            _json = {};
        }            
        return _json || null;
        
    }

};

(function() {
    'use strict';    

    initPage();

    function initPage(){
        getUsername();
        addBtnsTr();
        addTimeoutInput();
        adddoSubmitBtn();        
        // reloadThreadsList();
        bindKeyCode();
    }
    function getUsername(){
        gUsername = $$(".username").children("a").text();
    }

    function bindKeyCode(){
        $$("body").bind("keydown",function(e){    
            e=window.event||e; 
               
             //禁止空格键翻页  
             if(event.keyCode==32){ 
              return false;  
             } 
               
             //屏蔽F5刷新键  
             if(event.keyCode==116){ 
            //   e.keyCode = 0; //IE下需要设置为keyCode为false  
              return false;  
             }  
              
             //屏蔽 Alt+ 方向键 ←  
             //屏蔽 Alt+ 方向键 → 
             if ((event.altKey)&&((event.keyCode==37)||(event.keyCode==39)))  
             {  
              event.returnValue=false;  
              return false; 
             } 
             
             //屏蔽退格删除键  
             if(event.keyCode==8){ 
              return false;  
             } 
             
            //屏蔽ctrl+R  
            if((event.ctrlKey) && (event.keyCode==82)){ 
              e.keyCode = 0;  
              return false;  
            } 
           });        
    }
    function addBtnsTr(){
        let newBtnsTr = 
        '<tr class="btns">\
            <th>&nbsp;</th>\
            <td id="newBtnsTrTd">\
            </td>\
        </tr>';
        let _lastTbody = $$("#newpost").children("tbody").last();
        _lastTbody.append(newBtnsTr);
        _lastTbody.children("tr").first().hide();
    }
    function adddoSubmitBtn(){
        let _newBtn = '<button class="btn btn-primary" type="button" name="topicsubmit-jm" id="postsubmit-jm" value="true" tabindex="301"> 延時發新話題</button>';
        // $$("#postsubmit").after(_newBtn);
        $$("#newBtnsTrTd").append(_newBtn);


        $$("#postsubmit-jm").on("click",function(){
            console.log("onclick");
            doSubmit();                        
        });        
    }
    function addTimeoutInput(){
        let timeoutInput = '<span>延时（随机*秒）</span><input style="margin-right:30px;" type="text" name="timeout_jm" id="timeout_jm" value="60" />';
        $$("#newBtnsTrTd").append(timeoutInput);

        // let _timeout = jmtool.randomNum(60,18000);
        let _timeout = jmtool.randomNum(1,10);        
        $$("#timeout_jm").val(_timeout);
    }

    function doSubmit(){        
        console.log("run doSubmit");        

        // getMyThreadsCheckSubject("0119湖人大戰火箭");
        // return true;
        
        let theform = $("postform");
        console.log(theform);    

        //todo check message
        if(validateOnly(theform,false)){
            
            let _subject = theform.subject.value || "";
            let _timeout = parseInt($$("#timeout_jm").val()||60);

            //settimeout do submit
            setTimeout(() => {
                console.log("run settimeout");
                validate(theform,false);//validate again and submit    
                //延迟10s检查标题    
                setTimeout(() => {
                    getMyThreadsCheckSubject(_subject);
                }, 10000);    
            }, _timeout*1000);     
            //倒计时
            jmtool.countDown(_timeout,$$("#timeout_jm"));            
            alert("已进入定时发布");   
        } else{
            return false;      
        } 
        
            
    }

    
    function getMyThreadsCheckSubject(_subject){
        $$.ajax({
            url: "https://www.discuss.com.hk/my.php?item=threads",
            type: 'GET',
            timeout:10000,
            data: {},
            beforeSend: function (XHR) {
                // XHR.setRequestHeader("referer", "");
                // XHR.setRequestHeader("origin", gHost);                
            },
            error:function(){
                
            },
            statusCode:{
                403:function(){
                    
                }
            },
            success: function (res) {
                let _anchor = $$("div.mainbox>table>tbody>tr",res).first().children("td").first().children("a");
                let _latestSubject = _anchor.text()||"";
                let _url = gHost +　_anchor.attr("href");
                console.log(_latestSubject);
                console.log(_url);
                if(_latestSubject == _subject){                    
                    let _data = {subject:_subject,url:_url};
                    console.log(_data);  
                    storage.addToStorage(_subject,_data);
                }

                
            },
            
        });        
    }

    


    
    /**     
     * do validate form input only,not submit
     * copy from post_editor.js validate
     * @param {*} theform 
     * @param {*} previewpost 
     */
    function validateOnly(theform, previewpost) {
        var message = bbinsert && wysiwyg ? html2bbcode(getEditorContents()) : (!theform.parseurloff.checked ? parseurl(theform.message.value) : theform.message.value);
        if (($('postsubmit').name != 'replysubmit' && !($('postsubmit').name == 'editsubmit' && !isfirstpost) && theform.subject.value == "") || message == "") {
            alert(lang['post_subject_and_message_isnull']);
            if (special != 2) {
                theform.subject.focus();
            }
            return false;
        } else if (mb_strlen(theform.subject.value) > 80) {
            alert(lang['post_subject_toolong']);
            theform.subject.focus();
            return false;
        }
        if (tradepost) {
            if (theform.item_name.value == '') {
                alert(lang['post_trade_goodsname_null']);
                theform.item_name.focus();
                return false;
            } else if (theform.item_price.value == '') {
                alert(lang['post_trade_price_null']);
                theform.item_price.focus();
                return false;
            } else if (!parseInt(theform.item_price.value)) {
                alert(lang['post_trade_price_is_number']);
                theform.item_price.focus();
                return false;
            } else if (theform.item_costprice.value != '' && !parseInt(theform.item_costprice.value)) {
                alert(lang['post_trade_costprice_is_number']);
                theform.item_costprice.focus();
                return false;
            } else if (theform.item_number.value != '0' && !parseInt(theform.item_number.value)) {
                alert(lang['post_trade_amount_is_number']);
                theform.item_number.focus();
                return false;
            }
        }
        // if ($('postsubmit').name == 'topicsubmit') {
        //     newsSourceExist = document.getElementById('news_source_url');
        //     if (newsSourceExist) {
        //         if (theform.news_source_url.value == '' || !isValidUrl(theform.news_source_url.value)) {
        //             alert(lang['post_source_isnull']);
        //             theform.news_source_url.focus();
        //             $$('html,body').scrollTop(0);
        //             $$('#miss_msg').html(lang['post_source_isnull_warning']);
        //             return false;
        //         }
        //         var news_abs = document.getElementById('news_abstract');
        //         var input = document.createElement("input");
        //         input.setAttribute("type", "hidden");
        //         input.setAttribute("name", "news_abs");
        //         input.setAttribute("value", news_abs.innerHTML);
        //         document.getElementById("postform").appendChild(input);
        //     }
        // }
        // if (in_array($('postsubmit').name, ['topicsubmit', 'editsubmit'])) {
        //     priceExist = document.getElementById('sec_hand_price');
        //     if (theform.typeid && (theform.typeid.options && theform.typeid.options[theform.typeid.selectedIndex].value == 0) && typerequired) {
        //         alert(lang['post_type_isnull']);
        //         theform.typeid.focus();
        //         return false;
        //     }
        //     if (special == 3 && isfirstpost) {
        //         if (theform.rewardprice.value == "") {
        //             alert(lang['post_reward_credits_null']);
        //             theform.rewardprice.focus();
        //             return false;
        //         }
        //     } else if (special == 4 && isfirstpost) {
        //         if (theform.activityclass.value == "") {
        //             alert(lang['post_activity_sort_null']);
        //             theform.activityclass.focus();
        //             return false;
        //         } else if ($('starttimefrom_0').value == "" && $('starttimefrom_1').value == "") {
        //             alert(lang['post_activity_fromtime_null']);
        //             return false;
        //         } else if (theform.activityplace.value == "") {
        //             alert(lang['post_activity_addr_null']);
        //             theform.activityplace.focus();
        //             return false;
        //         }
        //     } else if (special == 6 && isfirstpost) {
        //         $('subjectu8').value = encodeURIComponent($('subject').value);
        //         if ($('tags') != null)
        //             $('tagsu8').value = encodeURIComponent($('tags').value);
        //         if ($('vid').value == '') {
        //             alert(lang['post_video_uploading']);
        //             return false;
        //         } else if ($('vclass') && getradiovalue('vclass') == '') {
        //             alert(lang['post_video_vclass_required']);
        //             return false;
        //         }
        //     }
        //     if (priceExist && isfirstpost) {
        //         if (theform.sec_hand_price.value != "" && isNaN(theform.sec_hand_price.value)) {
        //             alert(lang['post_sechand_price_not_number']);
        //             theform.sec_hand_price.focus();
        //             return false;
        //         }
        //         if (theform.sec_hand_price.value != "" && !(/^[0-9\.]+$/.test(theform.sec_hand_price.value))) {
        //             alert(lang['post_sechand_price_not_number']);
        //             theform.sec_hand_price.focus();
        //             return false;
        //         }
        //         if (theform.sec_hand_price.value != "") {
        //             var numDec = theform.sec_hand_price.value.split(".");
        //             if ((numDec.length == 2 && numDec[1].length > 1) || numDec.length > 2) {
        //                 alert(lang['post_sechand_price_decimal']);
        //                 theform.sec_hand_price.focus();
        //                 return false;
        //             }
        //         }
        //     }
        // }
        if (!disablepostctrl && ((postminchars != 0 && mb_strlen(message) < postminchars) || (postmaxchars != 0 && mb_strlen(message) > postmaxchars))) {
            alert(lang['post_message_length_invalid'] + '\n\n' + lang['post_curlength'] + ': ' + mb_strlen(message) + ' ' + lang['bytes'] + '\n' + lang['board_allowed'] + ': ' + postminchars + ' ' + lang['lento'] + ' ' + postmaxchars + ' ' + lang['bytes']);
            return false;
        }
        theform.message.value = parseurl(message, 'bbcode');
        if (in_array($('postsubmit').name, ['topicsubmit', 'replysubmit']))
            return true;
            // seccheck(theform, seccodecheck, secqaacheck, previewpost);
        if (previewpost || $('postsubmit').name == 'editsubmit')
            return true;
    }
    

    



   
})();