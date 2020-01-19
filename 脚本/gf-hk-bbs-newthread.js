// ==UserScript==
// @name         hk論壇發新帖
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.discuss.com.hk/post.php?action=newthread*
// @grant        none
// ==/UserScript==

var gHost = 'https://www.discuss.com.hk/';

var jmtool = {


    getCurrentTimestamp:function(){
        return parseInt(new Date().getTime()/1000);
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
    getAllFromStorage:function(){                
        let _str = window.localStorage.getItem(this.formLocalStorageKey);
        let _json = JSON.parse(_str) || [];
        if(typeof _json !== Object || !_json){
            _json = {};
        }            
        return _json || null;
        
    }

};

(function() {
    'use strict';    

    initPage();

    function initPage(){
        addBtnsTr();
        addTimeoutInput();
        adddoSubmitBtn();
        //@todo init threds list show
    }
    function addBtnsTr(){
        let newBtnsTr = 
        '<tr class="btns">\
            <th>&nbsp;</th>\
            <td id="newBtnsTrTd">\
            </td>\
        </tr>';
        $$("#newpost").children("tbody").last().append(newBtnsTr);
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
        
        let theform = $("postform");
        console.log(theform);    

        //todo check message
        if(validateOnly(theform,false)){
            let theFormData = getFormData(theform);
            console.log(theFormData,"theFormData");            

            theFormData.timeout = parseInt($$("#timeout_jm").val()||60);
            theFormData.postAction = $$("#postform").attr("action");
            theFormData.referer = window.location.href;            
            theFormData.time = jmtool.getCurrentTimestamp()+parseInt(theFormData.timeout||60);//publish time
            theFormData.date = jmtool.convertTimesatmpToDate(theFormData.time);
            storage.addToStorage(theFormData.subject,theFormData);
            // return true;

            //settimeout do submit
            setTimeout(() => {
                console.log("run settimeout");
                // validate(theform,false);//validate again and submit
                submitFormdata(theFormData);
            }, theFormData.timeout);        
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
        let _typeid = parseInt(theform.typeid.value||0);//parseInt($$("select[name='typeid']").val() ||0);

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
            dataType: 'json',
            data:_formData,
            timeout:10000,            
            processData: false,
            contentType: false,//"application/x-www-form-urlencoded", //false时默认为：multipart/form-data            
            beforeSend: function (XHR) {
                XHR.setRequestHeader("Referer", theFormData.referer);
                XHR.setRequestHeader("Origin", gHost);
                // XHR.setRequestHeader("Host", _this.config._wwwDomain);
                // XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");                
            },
            success: function (res) {
                console.log(_formData.subject+"发布成功");                
                //access my.php get the latest subject
                //check suject
                getMyThreadsCheckSubject(_formData.subject);

            },        
            error:function(e){
                console.log(_formData.subject+"发布失败");                                
                console.log(e);
            }
        });        
    }
    
    function getMyThreadsCheckSubject(_subject){
        _$.ajax({
            url: "https://www.discuss.com.hk/my.php?item=threads",
            type: 'GET',
            timeout:10000,
            data: {},
            beforeSend: function (XHR) {
                XHR.setRequestHeader("Referer", "");
                XHR.setRequestHeader("Origin", gHost);                
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
                    let _formData = storage.getFromStorage(_subject);
                    _formData.status = 1;
                    _formData.time = jmtool.getCurrentTimestamp();
                    _formData.date = jmtool.convertTimesatmpToDate(_formData.time);
                    _formData.url = _url;
                    storage.addToStorage(_subject);
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
    

    


    //Tool Tool Tool Tool


   
})();