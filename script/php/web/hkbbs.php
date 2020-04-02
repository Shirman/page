<?php
/**
 * 配合js/tampermokey/gf-hk-bbs-reply.js 及 gf-hk-bbs-newthread.js 
 * 提交回复及发帖日志到本地web服务，并写入本地日志文件
 * usage：
 * http://localhost:8088/hkbbs.php?action=test
 */
error_reporting(E_ERROR);
$action = $_REQUEST['action'];//建议action 也采用post提交
// $action = $_POST['action'];


if(is_string($action) && function_exists($action)){
    $action();
    success();
}
error("invalide action");

//------------------logic function--------------------------
function test(){
    success("test success....");
}
function reply(){
    try {
        //code...
        //用户、帖子标题、帖子url、回帖内容、回帖时间
        $post = getPost();
        $logDir = getLogDir();
        $line = $post['message']."\t".$post['title']."\t".$post['url']."\t".$post['username']."\t".$post['time'];
        
        $replyLogFileName = $logDir."discuss_bbs_回复_".date("Y-m-d").".log";

        file_put_contents($replyLogFileName,$line."\r\n",FILE_APPEND);
    } catch (\Exception $e) {
        error($e->getMessage());
    }
    
}

function new_thread(){
    try {
        //code...
        //标题、帖子url、用户、发帖时间
        $post = getPost();
        $logDir = getLogDir();

        $logFileName = $logDir."discuss_bbs_新帖_".date("Y-m-d").".log";

        $line = $post['title']."\t".$post['url']."\t".$post['username']."\t".$post['time'];

        file_put_contents($logFileName,$line."\r\n",FILE_APPEND);        
    } catch (\Exception $e) {
        error($e->getMessage());
    }
}

function getPost(){
    $post = $_POST;
    $post['time'] = date("Y-m-d H:i:s");
    return $post;
}
function getLogDir(){
    $logDir = "C:\\Users\\Public\\Documents\\";
    if(!is_dir($logDir)){
        error("服务端日志目录不存在：".$logDir);
    }
    return $logDir;
}
//----------------tool function---------------------

function success($message='ok'){
    returnJson($message);
}
function error($message='nok'){
    returnJson($message);
}
function returnJson($message,$data=[],$code=1){
    echo json_encode(['code'=>$code,"msg"=>$message,'data'=>[]],JSON_UNESCAPED_UNICODE);
    exit;
}



















