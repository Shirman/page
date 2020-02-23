<?php
//配置信息 
$conn_args = array( 
    'host' => '192.168.8.130',  
    'port' => '5672',  
    'login' => 'guest',  
    'password' => 'guest', 
    'vhost'=>'/' 
);   
$e_name = 'e_jm'; //交换机名 
$q_name = 'q_jm'; //无需队列名 
$k_route = 'key_jm'; //路由key 
 
//创建连接和channel 
$conn = new AMQPConnection($conn_args);   
if (!$conn->connect()) {   
    die("无法连接，中断!\n");   
}   
$channel = new AMQPChannel($conn);   
 

 
//创建交换机对象    
$ex = new AMQPExchange($channel);   
$ex->setName($e_name);   
date_default_timezone_set("Asia/Shanghai");
//发送消息 
//$channel->startTransaction(); //开始事务  
for($i=0; $i<100; ++$i){ 
    sleep(1);//休眠1秒
    //消息内容 
    $message = "测试消息：".date("Y-m-d H:i:s");   
    echo "发送消息:".$ex->publish($message, $k_route)."\n";  
} 
//$channel->commitTransaction(); //提交事务 
 
$conn->disconnect();
?>