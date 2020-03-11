GatewayWorker结合其他mvc框架
========================
<!-- TOC -->

- [结合原则](#结合原则)
- [具体实现步骤](#具体实现步骤)
- [示例代码](#示例代码)
- [注意](#注意)

<!-- /TOC -->
与结合Workerman原理是一样的，可以参考[Workerman结合其他mvc框架](./Workerman结合其他mvc框架.md)

使用GatewayWorker时开发者最关心的是如何与现有mvc框架(ThinkPHP Yii laravel等)整合，以下是官方推荐的整合方式。见示意图：



![](http://www.workerman.net/img/doc/work-with-other-mvc-framework.png)



## 结合原则


现有mvc框架项目与GatewayWorker**独立** 部署互不干扰

**所有** 的业务逻辑都由网站页面post/get到mvc框架中完成

GatewayWorker不接受客户端发来的数据，即GatewayWorker不处理任何业务逻辑，GatewayWorker仅仅当做一个**单向** 的推送通道

仅当mvc框架需要向浏览器主动推送数据时才在mvc框架中调用Gateway的API([GatewayClient](https://github.com/walkor/GatewayClient))完成推送

## 具体实现步骤


1、网站页面建立与GatewayWorker的websocket连接

2、GatewayWorker发现有页面发起连接时，将对应连接的client\_id发给网站页面

3、网站页面收到client\_id后触发一个ajax请求(假设是`bind.php`)将client\_id发到mvc后端

4、mvc后端`bind.php`收到client\_id后利用GatewayClient调用`Gateway::bindUid($client_id, $uid)`将client\_id与当前uid(用户id或者客户端唯一标识)绑定。如果有群组、群发功能，也可以利用`Gateway::joinGroup($client_id, $group_id)`将client\_id加入到对应分组

5、页面发起的所有请求都直接post/get到mvc框架统一处理，包括发送消息

6、mvc框架处理业务过程中需要向某个uid或者某个群组发送数据时，直接调用[GatewayClient](https://github.com/walkor/GatewayClient)的接口`Gateway::sendToUid Gateway::sendToGroup` 等发送即可

## 示例代码


GatewayWorker中Events.php代码（只有个onConnect回调设置）

```php
<?php
use \GatewayWorker\Lib\Gateway;
class Events
{
    // 当有客户端连接时，将client_id返回，让mvc框架判断当前uid并执行绑定
    public static function onConnect($client_id)
    {
        Gateway::sendToClient($client_id, json_encode(array(
            'type'      => 'init',
            'client_id' => $client_id
        )));
    }

    // GatewayWorker建议不做任何业务逻辑，onMessage留空即可
    public static function onMessage($client_id, $message)
    {

    }
}

```

**网站页面js片段**

```js
/**
 * 与GatewayWorker建立websocket连接，域名和端口改为你实际的域名端口，
 * 其中端口为Gateway端口，即start_gateway.php指定的端口。
 * start_gateway.php 中需要指定websocket协议，像这样
 * $gateway = new Gateway(websocket://0.0.0.0:7272);
 */
ws = new WebSocket("ws://your_domain.com:7272");
// 服务端主动推送消息时会触发这里的onmessage
ws.onmessage = function(e){
    // json数据转换成js对象
    var data = eval("("+e.data+")");
    var type = data.type || '';
    switch(type){
        // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
        case 'init':
            // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
            $.post('./bind.php', {client_id: data.client_id}, function(data){}, 'json');
            break;
        // 当mvc框架调用GatewayClient发消息时直接alert出来
        default :
            alert(e.data);
    }
};
```

**mvc后端uid绑定代码片段**   
bind.php (利用[GatewayClient](https://github.com/walkor/GatewayClient)绑定)

```php
<?php
//加载GatewayClient。关于GatewayClient参见本页面底部介绍
require_once '/your/path/GatewayClient/Gateway.php';
// GatewayClient 3.0.0版本开始要使用命名空间
use GatewayClient\Gateway;
// 设置GatewayWorker服务的Register服务ip和端口，请根据实际情况改成实际值(ip不能是0.0.0.0)
Gateway::$registerAddress = '127.0.0.1:1236';

// 假设用户已经登录，用户uid和群组id在session中
$uid      = $_SESSION['uid'];
$group_id = $_SESSION['group'];
// client_id与uid绑定
Gateway::bindUid($client_id, $uid);
// 加入某个群组（可调用多次加入多个群组）
Gateway::joinGroup($client_id, $group_id);
```

**mvc后端发消息代码片段**   
send\_message.php (利用[GatewayClient](https://github.com/walkor/GatewayClient)发送)

```php
<?php
//加载GatewayClient。关于GatewayClient参见本页面底部介绍
require_once '/your/path/GatewayClient/Gateway.php';
// GatewayClient 3.0.0版本开始要使用命名空间
use GatewayClient\Gateway;
// 设置GatewayWorker服务的Register服务ip和端口，请根据实际情况改成实际值(ip不能是0.0.0.0)
Gateway::$registerAddress = '127.0.0.1:1236';

// 向任意uid的网站页面发送数据
Gateway::sendToUid($uid, $message);
// 向任意群组的网站页面发送数据
Gateway::sendToGroup($group, $message);
```

## 注意


以上仅是mvc框架与GatewayWorker官方推荐的结合方式，并不是强制使用此方式，开发者可以自由变化选择结合方式以适应自己的业务需求。 当然也可以采用客户端与GatewayWorker直接双向通讯的方式完成业务通讯。


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
