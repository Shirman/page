
<!-- TOC -->

- [概述](#概述)
- [安装](#安装)
- [IDE自动补全](#ide自动补全)
- [服务端（异步方式）](#服务端异步方式)
    - [TCP/UDP服务](#tcpudp服务)
    - [HTTP服务](#http服务)
    - [WebSocket服务](#websocket服务)
    - [投递异步任务Task](#投递异步任务task)
    - [支持同时监听多端口](#支持同时监听多端口)
- [服务端（协程方式）](#服务端协程方式)
    - [协程coroutine](#协程coroutine)
    - [父子协程](#父子协程)
    - [TCP服务](#tcp服务)
    - [HTTP服务](#http服务-1)
    - [WebSocket](#websocket)
- [客户端](#客户端)
- [协程进阶](#协程进阶)
    - [协程API](#协程api)
    - [Channel](#channel)
    - [协程与通道实现并发调用](#协程与通道实现并发调用)
    - [WaitGroup](#waitgroup)
    - [连接池](#连接池)
- [协程调试](#协程调试)
- [定时器](#定时器)
- [进程间共享内存Table](#进程间共享内存table)
- [更多](#更多)

<!-- /TOC -->
## 概述

是什么，能做什么，什么场景？

Swoole 是一个 PHP 的`协程`、`高性能`网络通信引擎，使用 C/C++ 语言编写。

提供了多种通信协议的网络服务器和客户端模块。

可以方便快速的实现 TCP/UDP服务、高性能Web、WebSocket服务、物联网、实时通讯、游戏、微服务等，使 PHP 不再局限于传统的 Web 领域。

## 安装

安装方式，怎么安装配置，注意什么

- 编译
- docker
- pecl

https://wiki.swoole.com/#/environment

在ubuntu16.4 按照官方文档编译，一路畅通。

## IDE自动补全


https://github.com/swoole/ide-helper


## 服务端（异步方式）

异步方式，是swoole之前几个版本采用的服务端实现方式，关键词：`监听`、`事件`

### TCP/UDP服务

Swoole\Server 类是所有异步风格服务器的基类，后面章节的 Http\Server、Websocket\Server、Redis\Server 都继承于它。

https://wiki.swoole.com/#/server/tcp_init

以上链接介绍了：Server类包含的：方法、属性、事件、配置（set方法说明）



### HTTP服务

虽然Swoole中Http\Server也有了自己的Request及Response对象，但仍然对 Http 协议的支持并不完整，只能作为应用服务器处理动态请求，且信息完整比不上nginx、apache等web服务，比如session、cookie等http协议信息的处理，并且在前端增加 Nginx 作为代理。


Http\Server 继承自 Server，所以 Server 提供的所有 API 和配置项都可以使用，进程模型也是一致的。

HTTP服务有自己独有的事件和方法：

https://wiki.swoole.com/#/http_server

> HTTP服务仍然建议使用lanmp+web mvc框架，比如laravel、thinkphp等

### WebSocket服务

一开始Swoole和Workerman比较出色的点都是在长连接的封装，让phper更容易理解websocket的应用开发。

由于都已经较好封装了websocket服务，开发只需要几行代码就完全能实现异步IO多进程的WebSocket服务，且一样继承于Swoole/Server类，编码风格类似。


WebSocket服务也有自己一些独有的事件和方法等，详见：

https://wiki.swoole.com/#/websocket_server

### 投递异步任务Task

在 Server 程序中如果需要执行一个很耗时的操作且不需要等待处理结果时，比如一个聊天服务发送广播，发送邮件、短信、推送等与业务关系不大的，如果直接去执行这些函数就会阻塞当前进程，在高并发情况下，导致服务器响应变慢。

**Swoole 提供了异步任务处理的功能，可以投递一个异步任务到 TaskWorker 进程池中执行，不影响当前请求的处理速度。**

https://wiki.swoole.com/#/start/start_task



### 支持同时监听多端口

https://wiki.swoole.com/#/server/port

## 服务端（协程方式）


### 协程coroutine

Swoole都提供了服务端和客户端一键协程的编码方式，在使用同步编码的同时无感知地应用协程实现异步IO。

**关键词**：`同步IO`,`异步IO`,`协程`、`channel`、`协程容器`、`协程调度`,`EventLoop`

- **同步IO**

    简单的例子就是执行到 Mysql->query 的时候，这个进程什么事情都不做，等待 Mysql 返回结果，返回结果后再向下执行代码，所以同步 IO 的服务并发能力是很差的。

- **协程**

    协程可以简单理解为线程，只不过这个线程是用户态的，不需要操作系统参与，创建销毁和切换的成本非常低，**和线程不同的是协程没法利用多核 cpu 的，想利用多核 cpu 需要依赖 Swoole 的多进程模型Swoole\Process\Pool。**

- **协程容器**

    为了简化协程编程，Swoole采用hook部分原生php函数（主要是耗时较长函数，比如网络访问、文件访问等）实现协程容器。

    **使用 Coroutine::create 或 go 方法创建协程 (参考别名小节)，在创建的协程中才能使用协程 API，而协程必须创建在协程容器里面，参考协程容器。**

    > Co\run() 函数其实是对 Swoole\Coroutine\Scheduler 类 (协程调度器类) 的封装。
    >
    > Co\run() 是创建了协程容器，go() 是创建协程，这两个操作在 Swoole 提供的 Swoole\Server 类簇都是自动做好的，不需要手动做。


    详见协程容器：https://wiki.swoole.com/#/coroutine/scheduler

- **Channel**

    可以理解为消息队列，只不过是协程间的消息队列，多个协程通过 push 和 pop 操作生产消息和消费消息，用来协程之间的通讯，注意 channel 是没法跨进程的，只能一个 Swoole 进程里的协程间通讯，最典型的应用是[连接池](https://wiki.swoole.com/#/coroutine/conn_pool)和[并发调用](https://wiki.swoole.com/#/coroutine/multi_call)

- **协程调度** 

    CPU 资源是有限的，一个进程内上万个协程，到底执行哪个协程的代码，决定到底让 CPU 执行哪个协程的代码决断的过程就是协程调度。原理：

    - 协程代码碰到IO阻塞耗时的编码时，Swoole会将产生IO的资源句柄放入EventLoop中
    - 让出当前协程的cpu给其他协程
    - 在网络IO处理结束数据返回后，恢复这个协程

    和javascript的异步回调原理是不是很类似。

- **EventLoop**
    
    即事件循环，可以简单的理解为 epoll_wait，我们会把所有要发生事件的句柄（fd）加入到 epoll_wait 中，这些事件包括可读，可写，出错等。 我们的进程就阻塞在 epoll_wait 这个内核函数上，当发生了事件 (或超时) 后 epoll_wait 这个函数就会结束阻塞返回结果，就可以回调相应的 PHP 函数，例如，收到客户端发来的数据，回调 OnRecieve 回调函数。

    当有大量的 fd 放入到了 epoll_wait 中，并且同时产生了大量的事件，epoll_wait 函数返回的时候我们就会挨个调用相应的回调函数，叫做一轮事件循环，即 IO 多路复用，然后再次阻塞调用 epoll_wait 进行下一轮事件循环。


### 父子协程

优先执行子协程 (即 go() 里面的逻辑)，直到发生协程 yield(co::sleep 处)，然后协程调度到外层协程

```php
echo "main start\n";
Co\run(function () {
    echo "coro ".co::getcid()." start\n";
    go(function () {
        echo "coro ".co::getcid()." start\n";
        co::sleep(.2);
        echo "coro ".co::getcid()." end\n";
    });
    echo "coro ".co::getcid()." do not wait children coroutine\n";
    co::sleep(.1);
    echo "coro ".co::getcid()." end\n";
});
echo "end\n";
/*
main start
coro 1 start
coro 2 start
coro 1 do not wait children coroutine
coro 1 end
coro 2 end
end
*/


```

详见：https://wiki.swoole.com/#/coroutine


### TCP服务

Swoole\Coroutine\Server 是一个完全协程化的类，用于创建协程 TCP 服务器，支持 TCP 和 unixSocket 类型。

https://wiki.swoole.com/#/coroutine/server


### HTTP服务

完全协程化的 Http 服务器实现，Co\Http\Server 继承自 Co\Server。

https://wiki.swoole.com/#/coroutine/http_server

当然我们仍然先不建议使用Swoole的HTTP服务，后续应该会有在Swoole基础上的优秀的HTTP服务框架。


### WebSocket

完全协程化的 Websocket 服务器实现，继承自 Co\Http\Server，底层提供了对 WebSocket 协议的支持。

意思就是说，Co\Http\Server 支持HTTP服务的同时，底层也智能支持客户端发起的WebSocket请求服务。

```php
Co\run(function () {
    $server = new Co\Http\Server("0.0.0.0", 9505, false);
    $server->handle('/websocket', function ($request, $ws) {
        $ws->upgrade();
        while (true) {
            $frame = $ws->recv();
        }
    }
}                        
```
如接收到的请求服务是WebSocket的话，handle回调函数的第二参数response就是一个WebSocket对象
- $ws->upgrade()：向客户端发送 WebSocket 握手消息
- while(true) 循环处理消息的接收和发送
- $ws->recv() 接收 WebSocket 消息帧
- $ws->push() 向对端发送数据帧
- $ws->close() 关闭连接




## 客户端

建议使用 **一键协程化**：https://wiki.swoole.com/#/runtime

swoole在之前几个版本还提供了两种客户端：
- 同步阻塞客户端：仍然可以使用
    
    https://wiki.swoole.com/#/client

- 携程客户端：建议使用一键协程化

    https://wiki.swoole.com/#/coroutine_client/init

## 协程进阶

### 协程API

协程的设置、创建、延迟、挂起、恢复、id等API方法。

详见：
https://wiki.swoole.com/#/coroutine/coroutine


Co\run() 是创建了协程容器，go() 是创建协程，这两个操作在 Swoole 提供的 Swoole\Server 类簇都是自动做好的，不需要手动做

使用 Coroutine::create 或 go 方法创建协程，在创建的协程中才能使用协程 API，而协程必须创建在协程容器里面，参考协程容器。

> go函数名是Swoole\Coroutine::create的短名（别名）


### Channel

通道，用于协程间通讯，支持多生产者协程和多消费者协程。

channel是内存级别的，可以看做是内存级数组式的先进后出队列结构。无IO消耗。

我们经常用到的进程之间的通信，比如使用session、redis等内存级应用；而同一进程下的多线程的通信，我们就可以通过Channel通道来实现。

常用方法：push、pop，一般称为生产与消费

详见：
https://wiki.swoole.com/#/coroutine/channel


### 协程与通道实现并发调用

举个例子，go创建的子协程是个产品生产车间里的工人，go创建两个工人，而主协程是打包处，子协程负责生产push到通道channel，主协程通过channel的pop拿到不知道哪个工人生产的产品，进行打包发货。

阮一峰写过一篇关于进程和线程的通俗易懂的文章：http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html

并发调用实现详见：
https://wiki.swoole.com/#/coroutine/multi_call

### WaitGroup

WaitGroup是模仿go语言中的sync.WaitGroup

那WaitGroup是什么意思呢？

启动多个并发协程，通过waitgroup可以等待所有协程逻辑结束后再执行后面的代码逻辑。

如果写过比较多的js，可能也会有点熟悉，经常会碰到js异步延迟，需要等待异步延迟完成再继续执行（deferred）

简述下Swoole中WithGroup的例子：

- 创建WaitGroup实例wg
- 启动两个子协程，并引入wg观察两个子协程，分别获取百度和淘宝首页数据
- wg实例观察两个子协程done状态
- 主协程中，通过wg->wait()方法，等待两个子协程完成wg->done()状态更改
- 最后主协程继续执行

示例详见：
https://wiki.swoole.com/#/coroutine/wait_group

### 连接池

Swoole并不提供数据库类的ORM组件，需要使用其他在Swoole基础上的框架。

而Swoole连接池目前支持PDO、Mysqli、Redis三种

https://wiki.swoole.com/#/coroutine/conn_pool

这里了解个概念，具体ORM的应用参考EasySwoole等第三方框架

## 协程调试

https://wiki.swoole.com/#/coroutine/gdb


## 定时器

常用方法：
- tick：间隔时间触发
- after：多久后触发
- clear：清除定时器
- clearAll
- status
- ...

注意：

- 定时器仅在当前进程空间内有效
- 定时器是纯异步实现的，不能与同步 IO的函数一起使用，否则定时器的执行时间会发生错乱
- 定时器在执行的过程中可能存在一定误差
- 每个定时器回调时都会创建一个协程

https://wiki.swoole.com/#/timer

## 进程间共享内存Table

前面我们说协程之间通过channel进行通信，也可以说是共享数据。

由于php不支持多线程，而Swoole使用多进程模式，且进程之间内存是隔离的，也就是说global全局变量及超全局变量，在其他进程是不一样的，修改数据同步无效的。

为了解决这个问题，我们可以考虑中间存储媒介来存储共享数据：

- 文件：file
- 数据库服务：mysql
- 内存级缓存服务：memcache、redis

本地文件存在磁盘IO、数据库与缓存服务存在网络上的TCP连接问题，性能都不是最好的，Swoole提供Swoole\Table，基于共享内存和锁实现的超高性能的并发数据结构，用于解决多进程、多协程数据共享、同步、加锁问题。

Table很好理解，允许创建一张表，设置字段column，可以set整行数据，get整行数据，del行...

> Table不受PHP的memory_limit限制

详见：

https://wiki.swoole.com/#/memory/table





## 更多

- Swoole常见问题：https://wiki.swoole.com/#/question/FAQ
- Swoole编程须知：https://wiki.swoole.com/#/coroutine/notice

- 启动文件常驻内存，所以业务代码应该分离，且采用autoload的方式加载，避免更新代码要重启服务问题

- Swoole文章：https://wiki.swoole.com/#/blog_list


markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。