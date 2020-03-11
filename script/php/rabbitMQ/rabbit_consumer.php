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
$q_name = 'q_jm'; //队列名 
$k_route = 'key_jm'; //路由key 
 
//创建连接和channel 
$conn = new AMQPConnection($conn_args);   
if (!$conn->connect()) {   
    die("无法连接，中断!\n");   
}   
$channel = new AMQPChannel($conn);   
 
//创建交换机    
$ex = new AMQPExchange($channel);   
$ex->setName($e_name); 
$ex->setType(AMQP_EX_TYPE_DIRECT); //direct类型  
$ex->setFlags(AMQP_DURABLE); //持久化 
echo "交换机状态:".$ex->declare()."\n";   
   
//创建队列    
$q = new AMQPQueue($channel); 
$q->setName($q_name);   
$q->setFlags(AMQP_DURABLE); //持久化  
echo "消息总数:".$q->declare()."\n";   
 
//绑定交换机与队列，并指定路由键 
echo '队列绑定: '.$q->bind($e_name, $k_route)."\n"; 
 
//阻塞模式接收消息 
echo "消息:\n";   
while(True){ 
    $q->consume('processMessage');   
    //$q->consume('processMessage', AMQP_AUTOACK); //自动ACK应答  
} 
$conn->disconnect();   
 
/**
 * 消费回调函数
 * 处理消息
 */ 
function processMessage($envelope, $queue) { 
    $msg = $envelope->getBody(); 
    echo $msg."\n"; //处理消息 
    $queue->ack($envelope->getDeliveryTag()); //手动发送ACK应答 
}
?>