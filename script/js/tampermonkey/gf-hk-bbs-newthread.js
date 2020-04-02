// ==UserScript==
// @name         discuss.com.hk延迟发新帖
// @namespace    jm
// @version      1.0
// @description  论坛延迟发布新帖并统一保存到本地文件
// @author       tsingchan
// @match        https://*.discuss.com.hk/post.php?action=newthread*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var gApiHost = "http://localhost:8088/";
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

        _jqObj.text(`倒计时  ${d}天 ${h} 时 ${m} 分 ${s} 秒`);
        if (lefttime <= 0) {
            _jqObj.text("倒计时结束，准备发帖...");
            return true;
        }

        setTimeout(function(){
            jmtool.countDown((lefttime-1),_jqObj);
        }, 1000);
    },    
    tip:function(message){
        $$("#tips_jm").text(message);
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
        </tr><tr><th></th><td>结果：<span id="tips_jm"></span></td></tr>';        
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

    function enableSubmit(_boolean){                
        $$("#postsubmit-jm").prop("disabled",!_boolean);
    }
    function doSubmit(){        
        console.log("run doSubmit");        
        enableSubmit(false);
        // getMyThreadsCheckSubject("0119湖人大戰火箭");
        // return true;
        jmtool.tip("准备发帖数据...");
        
        let theform = $("postform");
        console.log(theform);    

        //todo check message
        if(validateOnly(theform,false)){
            let theFormData = getFormData(theform);
            console.log(theFormData,"theFormData");            

            theFormData.timeout = parseInt($$("#timeout_jm").val()||60);
            theFormData.postAction = $$("#postform").attr("action");
            theFormData.referer = window.location.href;            
            theFormData.time = jmtool.getCurrentTimestamp();//submit time
            theFormData.date = jmtool.convertTimesatmpToDate(theFormData.time);            
            theFormData.publishTime = jmtool.getCurrentTimestamp() + parseInt(theFormData.timeout||60);//publish time
            theFormData.publishDate = jmtool.convertTimesatmpToDate(theFormData.publishTime);            
            theFormData.author = gUsername;
            // storage.addToStorage(theFormData.subject,theFormData);            
            // return true;

            jmtool.countDown(theFormData.timeout,$$("#tips_jm"));            
            //settimeout do submit
            setTimeout(() => {
                console.log("run settimeout");
                // validate(theform,false);//validate again and submit
                submitFormdata(theFormData);
            }, theFormData.timeout*1000);  
            console.log("已进入定时发布队列，请保留页面");   
            jmtool.tip("已进入定时发布队列，请保留页面");
        } else{
            return false;      
        } 
        
            
    }

    function getFormData(theform){
        
        let _subject = theform.subject.value || "";
        let _message = bbinsert && wysiwyg ? html2bbcode(getEditorContents()) : (!theform.parseurloff.checked ? parseurl(theform.message.value) : theform.message.value);        
        _message = parseurl(_message, 'bbcode');        

        let _formhash = theform.formhash.value||"";//$$("#formhash").val() || "";
        let _isblog = theform.isblog.value||"";//$$("input=[name='isblog']").val()||"";
        let _frombbs = parseInt(theform.frombbs.value||1);//parseInt($$("input[name='frombbs']").val()||1);
        let _typeid = 0;
        if('undefined'!=typeof theform.typeid){
            _typeid = parseInt(theform.typeid.value||0);//parseInt($$("select[name='typeid']").val() ||0);        
        }

        let formData = {
            isblog:_isblog,
            formhash:_formhash,
            frombbs:1,
            subject:_subject, 
            parseurloff:0,
            message:_message,
            iconid:0,
            wysiwyg:1,
            typeid:_typeid
        };
        return formData;

    }    

    function submitFormdata(theFormData){
        let _formData = new FormData();
        let postFields = ["formhash","isblog","frombbs","subject","parseurloff","message","iconid","wysiwyg","typeid"];

        for(let _key in theFormData){
            if(postFields.indexOf(_key)!==-1){
                _formData.append(_key,theFormData[_key]);
            }            
        }           
        
        console.log(postFields,"postFields");
        // return true;

        
        $$.ajax({
            url: theFormData.postAction,
            type: 'POST',
            // dataType: 'json',
            data:_formData,
            timeout:10000,            
            processData: false,
            contentType: false,//"application/x-www-form-urlencoded", //false时默认为：multipart/form-data            
            beforeSend: function (XHR) {
                // XHR.setRequestHeader("referer", theFormData.referer);
                // XHR.setRequestHeader("origin", gHost);
                // XHR.setRequestHeader("Host", _this.config._wwwDomain);
                // XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");                
            },
            success: function (res) {
                console.log(theFormData.subject+"发布成功");    
                jmtool.tip("发布成功");            
                //access my.php get the latest subject
                //check suject
                getMyThreadsCheckSubject(theFormData.subject);

            },        
            error:function(e){
                enableSubmit(true);
                console.log(e);
                if(e.status == 200 && e.statusText=='parsererror'){
                    jmtool.tip("发布成功，但解析返回数据失败");
                    console.log(theFormData.subject+"发布成功，但解析返回数据失败");                                                    
                    getMyThreadsCheckSubject(theFormData.subject);
                }else{
                    console.log(theFormData.subject+"发布失败："+e.statusText);                                
                }
            }
        });        
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
                    jmtool.tip("匹配我的话题列表结束，成功匹配...");
                    backupToServer(_subject,_url);                  
                }

                
            },
            
        });        
    }

        
    function backupToServer(_title,_url){                        
        var _username = gUsername;                        
        console.log(_title,_url,_username);
        jmtool.tip("保存日志到本地...");
        let _data = {
            action:"new_thread",            
            url:_url,        
            title:_title,
            username:_username,            
        };
    
        let _dataString = '';
        for(let _key in _data){
            _dataString += _key+"=" + encodeURIComponent(_data[_key])+"&";
        }
        GM_xmlhttpRequest({
            method: "POST",
            url: gApiHost+"hkbbs.php",
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            responseType:"json",
            data:_dataString,
            onload: function(response) {
                console.log('request...');
                console.log(response);                                
                if(response.response.code == 1){
                    jmtool.tip("保存日志到本地成功");                                        
                }else{
                    jmtool.tip("保存日志到本地失败，确认是否已经开启web服务："+gApiHost);                                        
                }                
            },
            onerror:function(e){
                jmtool.tip("保存日志到本地失败，确认是否已经开启web服务："+gApiHost);                                                                        
                console.log("onerror...");
                console.log(e);
            }
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