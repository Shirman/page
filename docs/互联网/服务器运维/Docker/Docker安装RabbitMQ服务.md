Docker下RabbitMQ服务
----
<!-- TOC -->

- [rabbitMQ镜像](#rabbitmq镜像)
- [创建rabbitMQ容器并运行](#创建rabbitmq容器并运行)
- [PHP安装扩展AMQP](#php安装扩展amqp)
- [生产者demo](#生产者demo)
- [消费者demo](#消费者demo)
- [demo执行](#demo执行)
- [更多](#更多)
- [参考](#参考)

<!-- /TOC -->



### rabbitMQ镜像

```
tsing@ubuntu:/var/www/docker/rabbitmq$ sudo docker pull rabbitmq:3-management
[sudo] password for tsing: 
3-management: Pulling from library/rabbitmq
5c939e3a4d10: Pull complete 
c63719cdbe7a: Pull complete 
19a861ea6baf: Pull complete 
651c9d2d6c4f: Pull complete 
da31881b2e3b: Pull complete 
6aae87463836: Pull complete 
4868e6f6789c: Pull complete 
a0e5e7340570: Pull complete 
5e443803c4d1: Pull complete 
38b125c26270: Pull complete 
224a01c24786: Pull complete 
a594cff47326: Pull complete 
Digest: sha256:51d69beaba0c49795d0f3277bb66aca88a421bf14f2e9a7843fb2611943ce34f
Status: Downloaded newer image for rabbitmq:3-management
docker.io/library/rabbitmq:3-management
```

### 创建rabbitMQ容器并运行
```
docker run -d --hostname my-rabbit --name Myrabbitmq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

说明：

-d 后台运行容器；

–name 指定容器名；

-p 指定服务运行的端口（5672：应用访问端口；15672：控制台Web端口号）；

-v 映射目录或文件；

–hostname 主机名（RabbitMQ的一个重要注意事项是它根据所谓的 “节点名称” 存储数据，默认为主机名）；

-e 指定环境变量；（RABBITMQ_DEFAULT_VHOST：默认虚拟机名；RABBITMQ_DEFAULT_USER：默认的用户名；RABBITMQ_DEFAULT_PASS：默认用户名的密码）


### PHP安装扩展AMQP

1、安装rabbitmq-c，rabbitmq-c是一个用于C语言的，与AMQP server进行交互的client库。

下载地址：https://github.com/alanxz/rabbitmq-c

    unzip rabbitmq-c-master.zip
    cd rabbitmq-c-master
    sudo mkdir /opt/rabbitmq-c
    sudo mkdir build && cd build
    sudo cmake -DCMAKE_INSTALL_PREFIX=/opt/rabbitmq-c ..
    sudo cmake --build .
    sudo make
    sudo make install

2、从https://pecl.php.net/package/amqp下载 [amqp-1.9.4.tgz ](https://pecl.php.net/get/amqp-1.9.4.tgz)


    wget https://pecl.php.net/get/amqp-1.9.4.tgz
    tar -zxvf amqp-1.9.4.tgz
    cd amqp-1.9.4
    /usr/bin/phpize
    ./configure --with-php-config=/usr/bin/php-config --with-amqp --with-librabbitmq-dir=/opt/rabbitmq-c
    make && make install
---

    可能报错：
    /usr/bin/ld: cannot find -lrabbitmq
    collect2: error: ld returned 1 exit status
    make: *** [amqp.la] Error 1
    解决：yum install librabbitmq-devel
    解决：apt install librabbitmq-dev


结果：

    tsing@ubuntu:~/package/amqp-1.9.4$ sudo make install
    Installing shared extensions:     /usr/lib/php/20160303/


3、然后在php.ini添加 extension=amqp.so，然后执行/php -m|grep amqp，看列出的已安装扩展是否存在amqp。

    extension=amqp.so #extension_dir自己定义

>cli/php.ini 与 fpm/php.ini 都要添加，使得命令行及CGI模式下都支持amqp模块

4、验证

命令行模式：php -m |grep amqp 

CGI模式通过访问PHPinfo()函数确认，页面上会显示amqp的的compiled时间。

### 生产者demo

```php
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
```

### 消费者demo
```php
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
```

### demo执行

> 注：cli/php.ini一定要加amqp.so扩展，在命令行下才支持AMQP相关类及方法

先执行消费者脚本接收消息：

    php -f rabbit_consumer.php

再生产消息：

    php -f rabbit_publisher.php

### 更多

更多RabbitMQ的概念说明详见：[读懂RabbitMQ概念及原理](../../知识点/读懂RabbitMQ概念及原理.md)

### 参考

https://hub.docker.com/_/rabbitmq/

https://my.oschina.net/peaksoho/blog/2872689 

https://blog.csdn.net/guyan0319/article/details/88850824

https://www.cnblogs.com/myvic/p/10157043.html