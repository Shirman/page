Workerman结合其他mvc框架
----
<!-- TOC -->

- [结合建议](#结合建议)
- [小结](#小结)
- [代码示例](#代码示例)

<!-- /TOC -->
如何与其它mvc框架（thinkPHP、Yii等）整合？

## 结合原则

举个例子，再看下面一张图，会比较清楚：

我们经常会使用到第三方的推送，比如飞鸽、极光、个推等，那wokerman服务就是自助的推送服务，TP、YII、Laravel等MVC框架就可以用自助的推送服务，不再去使用第三方服务。


![workerman-thinkphp](http://www.workerman.net/img/doc/workerman-work-with-thinkphp.png)

与其它mvc框架结合**建议** 以上图的方式(ThinkPHP为例)：

- 1、ThinkPHP与Workerman是两个独立的系统，独立部署(可部署在不同服务器)，互不干扰。

- 2、ThinkPHP以HTTP协议提供网页页面在浏览器渲染展示。

- 3、ThinkPHP提供的页面的js发起websocket连接，连接workerman

- 4、连接后给Workerman发送一个数据包(包含用户名密码或者某种token串)用于验证websocket连接属于哪个用户。

- 5、仅在ThinkPHP需要向浏览器推送数据时，才调用workerman的socket接口推送数据。

- 6、其余请求还是按照原本ThinkPHP的HTTP方式调用处理。

## 小结

把Workerman作为一个可以向浏览器推送的通道，仅仅在需要向浏览器推送数据时才调用Workerman接口完成推送。业务逻辑全部在ThinkPHP中完成。

ThinkPHP如何调用Workerman socket接口推送数据参考[见常见问题-在其它项目中推送](push-in-other-project.html)一节



## 代码示例

如何在php后端及时推送消息给客户端 - workerman问答社区
==================================

  
**推送服务后端代码**   
push.php

  
```php
<?php
use Workerman\Worker;
require_once './Workerman/Autoloader.php';
// 初始化一个worker容器，监听1234端口
global $worker;
$worker = new Worker('websocket://0.0.0.0:1234');
// 这里进程数必须设置为1
$worker->count = 1;
// worker进程启动后建立一个内部通讯端口
$worker->onWorkerStart = function($worker)
{
    // 开启一个内部端口，方便内部系统推送数据，Text协议格式 文本+换行符
    $inner_text_worker = new Worker('Text://0.0.0.0:5678');
    $inner_text_worker->onMessage = function($connection, $buffer)
    {
        global $worker;
        // $data数组格式，里面有uid，表示向那个uid的页面推送数据
        $data = json_decode($buffer, true);
        $uid = $data['uid'];
        // 通过workerman，向uid的页面推送数据
        $ret = sendMessageByUid($uid, $data['percent']);
        // 返回推送结果
        $connection->send($ret ? 'ok' : 'fail');
    };
    $inner_text_worker->listen();
};
// 新增加一个属性，用来保存uid到connection的映射
$worker->uidConnections = array();
// 当有客户端发来消息时执行的回调函数
$worker->onMessage = function($connection, $data)use($worker)
{
    // 判断当前客户端是否已经验证,既是否设置了uid
    if(!isset($connection->uid))
    {
        // 没验证的话把第一个包当做uid（这里为了方便演示，没做真正的验证）
        $connection->uid = $data;
        /* 保存uid到connection的映射，这样可以方便的通过uid查找connection，
         * 实现针对特定uid推送数据
         */
        $worker->uidConnections[$connection->uid] = $connection;
        return;
    }
};
// 当有客户端连接断开时
$worker->onClose = function($connection)use($worker)
{
    global $worker;
    if(isset($connection->uid))
    {
        // 连接断开时删除映射
        unset($worker->uidConnections[$connection->uid]);
    }
};
// 向所有验证的用户推送数据
function broadcast($message)
{
    global $worker;
    foreach($worker->uidConnections as $connection)
    {
        $connection->send($message);
    }
}
// 针对uid推送数据
function sendMessageByUid($uid, $message)
{
    global $worker;
    if(isset($worker->uidConnections[$uid]))
    {
        $connection = $worker->uidConnections[$uid];
        $connection->send($message);
        return true;
    }
    return false;
}
// 运行所有的worker（其实当前只定义了一个）
Worker::runAll();
```

  
**启动推送后端服务**   
php push.php start -d

  
**业务前端连接及接收推送的js代码**

  
```js
var ws = new WebSocket('ws://127.0.0.1:1234');
ws.onopen = function(){
    var uid = 'uid1';
    ws.send(uid);
};
ws.onmessage = function(e){
    alert(e.data);
};
```

  
**业务后端推送消息的代码（TP/YII）**

  
```php
// 建立socket连接到内部推送端口
$client = stream_socket_client('tcp://127.0.0.1:5678', $errno, $errmsg, 1);
// 推送的数据，包含uid字段，表示是给这个uid推送
$data = array('uid'=>'uid1', 'percent'=>'88%');
// 发送数据，注意5678端口是Text协议的端口，Text协议需要在数据末尾加上换行符
fwrite($client, json_encode($data)."\n");
// 读取推送结果
echo fread($client, 8192);
```

  
这里的uid不一定是用户的id，也可以理解为任务id即 taskid

  
记得开放1234 5678 两个端口的防火墙。如果是云服务器，还要开放这两个端口的安全组。

  

----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
