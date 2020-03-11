ThinkPHP6试用简易报告
---

<!-- TOC -->

- [环境要求](#环境要求)
- [安装](#安装)
- [测试运行](#测试运行)
- [目录结构](#目录结构)
- [配置](#配置)
- [请求流程](#请求流程)
- [控制器](#控制器)
- [多应用模式](#多应用模式)
- [URL访问](#url访问)
- [容器](#容器)
- [依赖注入](#依赖注入)
- [服务](#服务)
- [门面](#门面)
- [中间件](#中间件)
- [事件](#事件)
- [路由](#路由)
    - [路由定义](#路由定义)
    - [路由规则](#路由规则)
    - [路由地址](#路由地址)
    - [路由参数](#路由参数)
    - [资源路由](#资源路由)
    - [注解路由](#注解路由)
    - [域名路由](#域名路由)
    - [MISS路由](#miss路由)
    - [支持跨域请求](#支持跨域请求)
    - [URl生成规则](#url生成规则)
- [控制器](#控制器-1)
- [请求](#请求)
- [响应](#响应)
- [数据库](#数据库)
    - [数据库配置](#数据库配置)
    - [分布式与读写分离](#分布式与读写分离)
    - [查询构造](#查询构造)
- [模型](#模型)
- [视图](#视图)
- [异常](#异常)
- [日志](#日志)
- [调试](#调试)
- [验证](#验证)
- [缓存](#缓存)
- [session与cookie](#session与cookie)
- [多语言](#多语言)
- [上传](#上传)
- [命令行](#命令行)
- [数据库迁移工具](#数据库迁移工具)
- [验证码](#验证码)
- [workman](#workman)
- [swoole](#swoole)
- [think助手工具库](#think助手工具库)
- [助手函数](#助手函数)
- [更新升级](#更新升级)
- [自动补全](#自动补全)
- [单元测试](#单元测试)
- [更多](#更多)
- [设计模式](#设计模式)

<!-- /TOC -->


## 环境要求

- php > 7.1

- 必须使用composer安装及更新

## 安装



    PS I:\src\tp6> composer create-project topthink/think tp
    Installing topthink/think (v6.0.0)
    - Installing topthink/think (v6.0.0): Downloading (100%)
    Created project in tp
    Loading composer repositories with package information
    Updating dependencies (including require-dev)
    Package operations: 14 installs, 0 updates, 0 removals
    - Installing psr/container (1.0.0): Downloading (100%)
    - Installing topthink/think-helper (v3.1.3): 
    
    ...

    Writing lock file
    Generating autoload files
    > @php think service:discover
    Succeed!
    > @php think vendor:publish
    Succeed!

## 测试运行

采用内置web服务器运行测试，默认8000端口

    php think run 

## 目录结构

- 默认单应用模式
- 多应用模式
    
    需要安装模式拓展
```
composer require topthink/think-multi-app
```
```
www  
├─app           应用目录
│  ├─app_name           应用目录
│  │  ├─common.php      函数文件
│  │  ├─controller      控制器目录
│  │  ├─model           模型目录
│  │  ├─view            视图目录
│  │  ├─config          配置目录
│  │  ├─route           路由目录
│  │  └─ ...            更多类库目录
│  │
│  ├─common.php         公共函数文件
│  └─event.php          事件定义文件
│
├─config                全局配置目录
│  ├─app.php            应用配置
│  ├─cache.php          缓存配置
│  ├─console.php        控制台配置
│  ├─cookie.php         Cookie配置
│  ├─database.php       数据库配置
│  ├─filesystem.php     文件磁盘配置
│  ├─lang.php           多语言配置
│  ├─log.php            日志配置
│  ├─middleware.php     中间件配置
│  ├─route.php          URL和路由配置
│  ├─session.php        Session配置
│  ├─trace.php          Trace配置
│  └─view.php           视图配置
│
├─public                WEB目录（对外访问目录）
│  ├─index.php          入口文件
│  ├─router.php         快速测试文件
│  └─.htaccess          用于apache的重写
│
├─extend                扩展类库目录
├─runtime               应用的运行时目录（可写，可定制）
├─vendor                Composer类库目录
├─.example.env          环境变量示例文件
├─composer.json         composer 定义文件
├─LICENSE.txt           授权说明文件
├─README.md             README 文件
├─think 
```

## 配置

这里以多应用模式为例：

> 注意：官方说除了一级配置外，严格区分大小写。显然很容易让人混淆，不如建议自己约定统一采用小写。

- 全局配置

    app/config/*
     
    对所有应用有效
- 应用配置

    app/app*/config/*

    只对当前应用有效

- 环境配置

    官方只强调了怎么配置，没有说环境配置的目的和使用，对于TP6小白，可能不够友好。

```
配置文件名	描述
app.php	应用配置
cache.php	缓存配置
console.php	控制台配置
cookie.php	Cookie配置
database.php	数据库配置
filesystem.php	磁盘配置
lang.php	多语言配置
log.php	日志配置
middleware.php	中间件配置
route.php	路由和URL配置
session.php	Session配置
trace.php	页面Trace配置
view.php	视图配置
```

## 请求流程

流程环节多，但官方说效率甚至比5.1更高

也看出确实采用了更多的成熟的设计模式和技巧，更好的TP将会更靠近laravel，毕竟框架设计模式及开发方法都有一套成熟的理念


## 控制器

从传统的MVC来看，C不应该做太多业务逻辑处理，应该是考虑流程的梳理整合。

控制器主要负责请求的接收，并调用相关的模型处理，并最终通过视图输出。严格来说，控制器不应该过多的介入业务逻辑处理。

## 多应用模式

安装多应用扩展模式：

    PS I:\src\tp6\tp> composer require topthink/think-multi-app
    Using version ^1.0 for topthink/think-multi-app
    ./composer.json has been updated
    Loading composer repositories with package information
    Updating dependencies (including require-dev)
    Package operations: 1 install, 0 updates, 0 removals
    - Installing topthink/think-multi-app (v1.0.11): Downloading (100%)
    Writing lock file
    Generating autoload files
    > @php think service:discover
    Succeed!
    > @php think vendor:publish
    File I:\src\tp6\tp\config\trace.php exist!
    Succeed!



- 允许为每个应用增加应用入口文件（public/index.php）
- 应用映射，支持应用的别名映射，映射支持泛解析
- 支持使用composer加载应用，设置虽然相对复杂
- 支持域名绑定应用
- 支持禁止应用访问


## URL访问

- pathinfo的支持
- apache、iis、nginx 重写支持单一入口

## 容器

tp5引入的容器，到底是什么意思？

官方是这么说的：ThinkPHP使用容器来更方便的管理类依赖及运行依赖注入，新版的容器支持PSR-11规范。

大部分人还是不懂得容器是什么？

- [谈谈tp中的容器和门面的实现](https://www.cnblogs.com/cqingt/p/8243294.html)

- [深入tp容器container及门面模式](https://www.jianshu.com/p/72635dfe523b)

- [TP6核心分析](https://www.kancloud.cn/hubqin/thinkphp/1361597)

## 依赖注入
如果小白还不懂得什么是依赖注入的话：

[IOC/DI通俗解释]https://www.iteye.com/blog/cngolon-2187021

[控制反转与依赖注入的理解](https://blog.csdn.net/crossing2012/article/details/89504664)

了解了依赖注入后，再去看TP官方关于依赖注入的使用

依赖注入的对象参数支持多个，且与顺序无关

以下场景支持依赖注入：

- 控制器构造方法
- 控制器操作方法
- 路由的闭包定义
- 事件类的执行方法
- 中间件的执行方法等




## 服务

官方文档更多的是说服务定义、服务注册、启动，没有更多关于服务的使用和目的。

文档碎片化较多，小白很难理解。（好的开发者文档可以参考微信小程序，都会说明为什么做，理论怎么做，范例怎么做，最佳实践等）

为什么要注册系统服务，也就是将服务绑定到容器中？

服务更多停留在内置服务，后续有时间展开。

## 门面

> 官方：门面为容器中的（动态）类提供了一个静态调用接口，相比于传统的静态方法调用， 带来了更好的可测试性和扩展性，你可以为任何的非静态类库定义一个facade类。

看完官方描述，我们都有个疑问门面的应用场景是什么，为什么要用门面？可测试性和扩展性优势在哪里？

依赖注入和门面的使用方式不同，但可以达到同一个效果，当然在编码方式也会有一些差异，这就是框架给小白带来的额外学习负担和烦恼：

```
<?php
namespace app\index\controller;

use think\Request;

class Index
{
    public function index(Request $request)
    {
        echo $request->controller();
    }
}
```

```
<?php
namespace app\index\controller;

use think\facade\Request;

class Index
{
    public function index()
    {
        echo Request::controller();
    }
}
```

两段代码效果一样，但use写法不一样

> 依赖注入的优势是支持接口的注入，而Facade则无法完成。


## 中间件

- 4组中间件：全局中间件、应用中间件、路由中间件、控制器中间件
- 中间件注册支持别名及中间件参数传递
- 中间件执行顺序为中间件注册顺序

- 安装TP中间件组件
```
PS I:\src\tp6\tp> php .\think make:middleware Check
Middleware:app\middleware\Check created successfully.

PS I:\src\tp6\tp\app> ls


    目录: I:\src\tp6\tp\app


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2019/11/27     11:58                index
d-----       2019/11/27     15:59                middleware
-a----       2019/11/27     10:30             13 .htaccess
-a----       2019/11/27     10:30           2086 BaseController.php
-a----       2019/11/27     10:30             28 common.php
-a----       2019/11/27     10:30            256 event.php
-a----       2019/11/27     10:30           1398 ExceptionHandle.php
-a----       2019/11/27     10:30            263 middleware.php
-a----       2019/11/27     10:30            195 provider.php
-a----       2019/11/27     10:30             89 Request.php    
```


- 定义前置和后置中间件

前置
```
namespace app\middleware;

class Check
{
    /**
    * 处理请求
    *
    * @param \think\Request $request
    * @param \Closure       $next
    * @return Response
    */
    public function handle($request, \Closure $next)
    {
        debug_log(__METHOD__);
        if ($request->param('name') == 'think') {
            return redirect('index/think');
        }
        return $next($request);        
    }
}    
```
后置
```
namespace app\middleware;

class EndCheck
{
    /**
     * 处理请求
     *
     * @param \think\Request $request
     * @param \Closure       $next
     * @return Response
     */
    public function handle($request, \Closure $next)
    {
        $response = $next($request);

        debug_log(__METHOD__);
        // 添加中间件执行代码

        return $response;        
        
    }
}
```

- 注册中间件 app/index/middleware.php
``` 
return [
    \app\middleware\Check::class,
    app\middleware\EndCheck::class,
];

```
- 控制器

```
class Index extends BaseController
{
    public function index()
    {
        debug_log(__METHOD__);
        return config_path();
    }
}
```

- 测试结果
```
##2019-11-27 16:44:59
app\middleware\Check::handle
##2019-11-27 16:44:59
app\index\controller\Index::index
##2019-11-27 16:44:59
app\middleware\EndCheck::handle
```

## 事件

事件，可以说是之前的行为及钩子的升级版，事件也比中间件在粒度上会更细，事件的目的也一样，解耦观察者和被观察者，主要是为了方便系统的易拓展、易维护

- 定义事件
- 注册监听
```
// 事件定义文件 app/event.php
return [
    //绑定/定义事件
    'bind'      => [
        'UserLogin',
//        'UserLogin'=>['app\event\UserLogin'],
    ],
    //注册监听
    'listen'    => [
        'AppInit'  => ['app\listener\ShowAppInit'],
        'HttpRun'  => [],
        'HttpEnd'  => [],
        'LogLevel' => [],
        'LogWrite' => [],
        'UserLogin'=>['app\listener\UserLogin'],
//        'UserLogin'=>[],
//        'UserLogout'=>[],
    ],
    
    'subscribe' => [
    ],
];

```

- 监听事件
```
    //控制器
    public function index()
    {
        debug_log(__METHOD__);
        event("UserLogin");
        return config_path();
    }
```
- 事件订阅

```
// 事件定义文件 app/event.php
return [
    //绑定/定义事件
    'bind'      => [        
    ],
    //注册监听
    'listen'    => [
        'AppInit'  => ['app\listener\ShowAppInit'],
        'HttpRun'  => [],
        'HttpEnd'  => [],
        'LogLevel' => [],
        'LogWrite' => [],        
        'UserLogin'=>[],
        'UserLogout'=>[],
    ],
    
    'subscribe' => [
    ],
];

```
生成订阅类User
```
php think make:subscribe User
```
```
class User
{
    public function onUserLogin(){
        echo '我知道用户登录了，因为我订阅了<br>';
    }
    public function onUserLogout(){
        echo '我知道用户退出了，因为我订阅了<br>';
    }
}
```
控制器订阅实现
```
    public function __construct(){
        //添加一个订阅类
        Event::subscribe(\app\subscribe\User::class);
    }
    public function login(){
        debug_log("用户登录了");
        Event::trigger('UserLogin');
    }

    public function logout(){
        debug_log("用户退出了");
        Event::trigger('UserLogout');
    }
```

- 生成事件类
```
PS I:\src\tp6\tp> php .\think make:event UserLogin
Event:app\event\UserLogin created successfully.
```

事件订阅就是一种「复合」的监听器，可以同时监听多个事件。从其实现过程来看，本质和事件监听器是一样的，个人认为，使用事件订阅的好处是仅仅集中管理代码，把对某个对象(被观察者)的多个动作的监听，都写在一个事件订阅类里面，因而就不用另外写相应多个动作的监听器类。

## 路由

目的：

- 使得URL更加规范优雅 
- 可做到统一拦截处理 
- 支持路由中间件等

解析过程：
- 路由定义
- 路由检测
- 路由解析
- 路由调度

> 注意：路由是针对应用的，每个应用的路由是完全独立。也就是说设置路由后的访问URL地址还需要带上应用名，除非是单应用

开发者只需要关注路由的定义与配置即可。

### 路由定义
- 路由定义快捷方法get/post/put/delete/patch
- 按照定义顺序匹配路由规则
- 静态地址与动态地址路由规则
- 根据路由生成URL地址
### 路由规则
- 路由规则变量有限制
```
    // 默认的路由变量规则 只会匹配字母、数字、中文和下划线字符，并不会匹配特殊符号以及其它字符
    'default_route_pattern' => '[\w\.]+',
```
### 路由地址
- 路由支持多级控制器
- 路由支持到类型解析
- 路由支持302重定向
- 路由支持直接到view模板
- 路由支持直接输出响应（response）
- 路由支持到闭包（当场响应请求）
### 路由参数
- 路由参数提供对url的检查及二次处理

### 资源路由
- 支持RESTFul请求的资源路由

### 注解路由
- 在方法的注释中使用@Route关键词定义路由规则，目前应该会存在一些意想不到的问题，不建议使用

### 域名路由
- 支持解析路由
- 支持绑定到路由
- 

### MISS路由
- 注意设置MISS路由意味着开启强制路由

### 支持跨域请求

### URl生成规则

## 控制器
- 仍然支持多级控制器，但不建议使用（除非逼不得已），多级控制器在URL上存在一些不好处理的问题，需要通过路由协助访问多级控制器
- 不建议使用php原生的die及exit，避免中断，不利于后续的单元测试、框架流程还有其他第三方组件比如swoole

- 支持错误时默认控制器Error类
- 支持资源控制器（RESTFul），配合资源路由
- 支持中间件

## 请求

和java一样拥有9大对象之一 Request

- request对象通常使用依赖注入，不需要单独实例化
- 支持获取当前请求信息，如http协议上的相关信息
- 支持获取当前访问控制器及操作
- 支持获取请求参数
- 支持请求类型获取
- 支持伪静态
- 支持请求缓存，只对get类型请求有效

## 响应

和java一样，专门的Response对象

支持多种方式类型输出：
- 默认HTML
- 渲染模板 View
- JSON输出 JSON
- JSONP输出 JSONP
- XML输出 XML
- 页面重定向 Redirect
- 附件下载 Download

> 看完后第一个印象是少个部分产品经常使用的图片资源的输出

**响应输出还支持数据类型的参数设置：**
- 支持设置状态码
- 支持设置头信息
- 支持写入cookie


**重定向支持外部和内部的重定向：**

官方重定向的例子没能走通，报错：

时间：2019.11.28

```
[0] ArgumentCountError in helper.php line 373
Too few arguments to function redirect(), 0 passed in I:\src\tp6\tp\app\index\controller\Index.php on line 45 and at least 1 expected
```
redirect方法第一个参数url没有默认值，我们尝试用空值代替，虽然没有报错了，但redirect("")->restore()没有达到官方说的效果

**文件下载**

文件下载的封装很符合我们的习惯，我们很喜欢，但是试用结果：

先试了下载一个文件，报错了，最后复制最后的那个download例子，也报错了：
```
    //20191128
    public function download(){
//        $file = "robots.txt";
//        return download($file,'t.txt',true);
        $data = '这是一个测试文件';
        return download($data, 'test.txt', true);        
    }
```

```
[0] Error in Response.php line 142
Call to a member function save() on null
```
## 数据库

### 数据库配置

支持全局配置，支持应用独立配置（覆盖全局），支持群组配置，可灵活切换数据库连接，与我们之前5.0版本对数据库配置切换连接的改造思想契合（模型类的定义中考虑了不同model自动连接不同数据库），满足我们的多库灵活清晰使用数据库，赞一个

### 分布式与读写分离

分布式与读写分离配置更加清晰、成熟、简洁

> 原生sql的执行，人工判断写操作sql使用exceute，读操作sql使用query，才能保证读写分离的正常，避免主从读写混乱

> 主从有个弊端就是当写完数据，特别是新增数据后，需要马上再读取数据时，主库还未同步到从库时，出现读取旧数据问题，TP6提供了read_master的配置参数，允许我们在某个表的写操作后，当前请求的后续所有对该表的查询都会从主库读取

> 可能还有人会担心主从读写分离的方式，在事务、读锁等操作时是否需要自己分清主从？
>
> 其实TP6除了读操作和写操作的方法自动连接对应数据库外，在事务、锁（lock）、连接失败、手动master/readmaster设置都会自动连接主数据库

### 查询构造

还是吐槽下facade的方式，让IDE的自动补全没了，很是难受，后面看看有没有插件帮忙补全，提供开发者的敲代码效率

- 游标查询cursor采用了php的生成器（返回迭代器），可以节省大量内存，大大提高查询处理效率

- TP系列一直让我们吐槽的是效果相同的操作方法多得让开发者有记忆和选择困难，比如有了update还支持save，比如update($data)，也可以data($data),比如where()参数写法超过两种，让人记忆混淆，特别是从3.2一直追到6的开发者，这个过程中，出现好多种where参数写法（字符串，关联数组，索引数组，而数组的方式格式还不一样，经常有开发者拿3.2的写法用在5.1以上的版本），中间还废弃了一些

- 竟然支持无条件删除所有数据，既然不建议，就不用提供，而且删除所有数据，比如mysql下建议使用truncate而不是简单delete

- where
- page方法比limit更加直观人性化
- cache 本地文件缓存
- comment 支持为sql添加注释内容
- fetchSql 返回sql语句
- 时间查询，框架内置了常用的时间查询，支持自动识别时间字段类型
- 高级查询，提供了快捷查询方式、批量查询方式、闭包查询、混合查询、字符串查询；我们觉得快捷查询并不快捷，还额外让开发者有了记忆负担，建议熟练批量查询并偶尔字符串查询及闭包查询，结合whereXXX快捷方法基本可以完成所有查询条件，
- 视图查询并不是数据库的视图，而是join的上一层封装实现而已
- 子查询sql生成 fetchSql buildSql
- 原生sql通过query及execute实现，支持参数绑定，实现方式有：问号占位符?和命名占位符:paramter
- 支持mysql的InnoDB的XA分布式事务
- 

## 模型

模型的操作方法无需和数据库查询一样调用必须首先调用table或者name方法，因为模型会按照规则自动匹配对应的数据表，例如：

```
Db::name('user')->where('id','>',10)->select();
```
改成模型操作的话就变成

```
User::where('id','>',10)->select();
```
虽然看起来是相同的查询条件，但一个最明显的区别是查询结果的类型不同。第一种方式的查询结果是一个 **（二维）数组**，而第二种方式的查询结果是包含了**模型（集合）的数据集**。不过，在大多数情况下，这二种返回类型的使用方式并无明显区别。

官方介绍：

模型操作和数据库操作的另外一个显著区别是模型支持包括获取器、修改器、自动时间写入在内的一系列自动化操作和事件，简化了数据的存取操作，但随之而来的是性能有所下降（其实并没下降，而是自动帮你处理了一些原本需要手动处理的操作）。

- 支持动态切换后缀，支持多语言或分表情况，解决相同结构表多个模型问题

- 模型如果没有提前明确定义字段，将会浪费一次查询开销，但定义字段偏麻烦，当然TP还是一直提供指令来手动缓存数据库表字段信息
    ```
    php think optimize:schema
    ```

    当然这也有个弊端，在分布式服务器上每个服务器都需要手动执行一次

- 新增、更新

    对象方法：save、saveAll

    save方法成功返回true，并只有当before_update事件返回false的时候返回false，有错误则会抛出异常。

    类静态方法：create、update，返回模型对象实例


    建议：
    
    使用create方法新增数据，使用saveAll批量新增数据。

    如果需要使用模型事件，那么就先查询后更新，如果不需要使用事件或者不查询直接更新，直接使用静态的Update方法进行条件更新，如非必要，尽量不要使用批量更新。（先查询后更新，对于性能影响大不大？）

- 删除
    建议使用类静态方法destory。（关键词有点奇怪，可能是delete被用了，没有找到更好的）

- 查询

    模型查询除了使用自身的查询方法外，一样可以使用数据库的查询构造器，返回的都是模型对象实例。但如果直接调用查询对象的方法，IDE可能无法完成自动提示。如果很在意IDE是否能自动完成，特别是完美主义者很难接受。

- 查询范围

    官方支持一些查询的二次封装，看起来挺有用的，但使用方式像是在做字符游戏，有点牵强的使用方式，不自然，难以记忆及阅读

- 获取器

    获取器，获取的是字段值对应自定义的值，比如status值为1，我们自定义为正常，0定义为异常；

    使用场景：集合/枚举/数字状态/组合字段的转换文本输出场景，以前需要开发者自己组织这方面的代码，TP6在模型中提供了获取器的设置与读取
- 修改器

    修改器，在数据保存之前，会将对应字段值修改为自定义的值

- 搜索器

- 只读字段

    支持保护敏感字段

- 软删除

    软删除只有在模型下有效，数据库方式无效

    使用官方模型的软删除，可以正常使用模型的删除方法，还可以通过方法恢复软删除数据；当然如果我们觉得麻烦或者觉得还是数据库方式用的舒服，那也可以考虑自己设计软删除，也不复杂，就是要注意调用删除方法（自定义封装）

- 自动时间戳

    我们很喜欢用，因为我们的表基本都会创建create_time和update_time，但注意auto_timestamp在TP6是默认开启的，如果不需要自动写入，需要再单独的模型中设置 
    ```
    protected $autoWriteTimestamp = false;
    ```

- 模型关联

    模型关联，让开发者不用去关心底层sql具体如何实现，甚至怎么组装sql更优化，也避免致命的sql错误及严重的性能瓶颈

    但模型关联，使用方式还有点生硬，可能多用几次后，会更加上手，特别是根据关联条件查询has、hasWhere 的使用，一开始会摸不着头脑


> 模型的使用过程中，太多前提限制条件，也就说规则不统一，容易让人混乱；比如多对多关联，中间表要继承新的类，会自动关闭自动写入时间，需要手动重新设置；当然模型会越来越让开发门槛更低，不用再去了解数据库和sql，要掌握模型建议不要带着数据库sql的想法去看

## 视图
- 视图过滤

    允许通过闭包的方式对视图进行过滤替换

- 模板引擎

    新版框架默认只能支持PHP原生模板，如果需要使用thinkTemplate模板引擎，需要安装think-view扩展（该扩展会自动安装think-template依赖库）。

    ```
    composer require topthink/think-view
    ```

## 异常

- 自定义异常页面
    ```
    'exception_tmpl'   => app()->getThinkPath() . 'tpl/think_exception.tpl',
    ```

- 自定义异常处理（接管异常处理）

    框架支持异常处理由开发者自定义类进行接管，需要在app目录下面的provider.php文件中绑定异常处理类，例如：

    ```
    // 绑定自定义异常处理handle类
    'think\exception\Handle'       => '\\app\\exception\\Http',
    ```

    实际上TP6安装时已经内置了app\ExceptionHandle异常处理类，我们可以参考该类定义自己的异常处理类

- 异常抛出及捕获

    很高兴，php的框架都在进步，很明显的一点就是在错误和异常处理上，越来越多的框架采用异常机制，虽然php异常内置系统异常较少，但越来越多框架补了这块短板，并引导开发者去使用，当然开发者不论是构件/中间件开发者还是产品开发者，都应该更注意异常的抛出，协助完善php异常生态，让系统更加灵活优雅。（虽然这些java在10+年前就干的很好了）

- HTTP异常  
    

## 日志

日志记录了所有的运行错误，日志配置app/log.php

官方这个版本的日志，可以满足我们各种需要的日志功能，不需要自己想破脑子的封装自己的日志组件

支持日志配置，多通道，多日志级别类型，支持延时和实时写入，提供日志级别的写入方法，允许上下文信息替换写入，支持某个级别的日志信息单独文件写入，默认日志按日期分目录按天生成新日志文件，但我们也可配置将某类型日志全部记录到一个文件，还支持日志写入回调，可以通过clear静态方法手动清除日志，也可以配合日志自动清理，支持json格式日志配合第三方日志分析工具

详见官方文档

##  调试

调试是开发的一个很重要的环节

- 环境配置

    通过create-project默认安装的话， 会在根目录自带一个.example..env文件，你可以直接更名为.env文件。

    本地开发的时候可以在应用根目录下面定义.env文件。在开发阶段，可以修改环境变量APP_DEBUG开启调试模式。

- 部署模式下显示具体错误信息

    在部署模式下，发生错误后不会提示具体的错误信息，我们经常希望看到具体的错误信息，可以在app.php文件中如下设置：

    ```
    // 显示错误信息
    'show_error_msg'        =>  true,    
    ```

    其实更好的方法应该是在部署模式下，error级别的错误，记录到错误日志文件即可，不需要展示，错误时展示异常页面更友好

- Trace调试

    Trace调试功能就是ThinkPHP提供给开发人员的一个用于开发调试的辅助工具。可以实时显示当前页面或者请求的请求信息、运行情况、SQL执行、错误信息和调试信息等，并支持自定义显示，并且支持没有页面输出的操作调试。

    很不错的扩展调试工具

##  验证

- 定义与使用

    支持在控制器或业务类中设置验证规则（rule）并执行验证（check）

    ```
    \think\facade\Validate::rule($rules)->check($data);
    ```

    也支持独立的验证类，可以让业务开发更关注业务，工具开发关注工具

    验证器定义
    ```
    class User extends Validate
    {
        /**
        * 定义验证规则
        * 格式：'字段名'	=>	['规则1','规则2'...]
        *
        * @var array
        */	
        protected $rule =   [
            'name'  => 'require|max:25|min:6',
            'age'   => 'number|between:1,120',
            'email' => 'email',    
        ];
        
        /**
        * 定义错误信息
        * 格式：'字段名.规则名'	=>	'错误信息'
        *
        * @var array
        */	
        protected $message  =   [
            'name.require' => '名称必须',
            'name.max'     => '名称最多不能超过25个字符',
            'name.min'     => '名称最少要6个字符',
            'age.number'   => '年龄必须是数字',
            'age.between'  => '年龄只能在1-120之间',
            'email'        => '邮箱格式错误',    
        ];    
    }    
    ```
    验证调用
    ```
    try{
        $res = validate(\app\validate\User::class)->batch(true)->check([
            'name'  => '12345',
            'email' => 'thinkphpqq.com',                
        ]);
        if(true != $res){
            dump($res);
        }
            
    } catch (\think\exception\ValidateException $ex) {
        dump($ex->getMessage());
    }  
    ```

> 如果是临时使用或少量规则，可以使用临时；常用提交页面或API可以使用验证器类，易于拓展且不涉及业务逻辑代码

- 验证场景

    上面提到验证器类可以满足新增修改相关数据对象，虽然新增和修改或其他操作验证的字段大部分一样，但有时也存在部分字段差异，官方提供了验证场景的机制，很好的补充这方面

    ```
    protected $scene = [
        'edit'  =>  ['name','age'],
    ];
    ```

- 内置规则

    验证的主体

- 表单令牌

    如果没有采用前后端分离的开发方式的话，提交建议采用表单令牌，避免低级的重复提交和重放攻击

    > 注意token的实现方式依赖于session中间件（不是php的原始session机制，是TP官方的session机制）



## 缓存

TP6缓存cache更多的是集成了文件、memcache、redis等第三方缓存的一些基础实现，主要是set、get、inc、dec、expire等，虽然官方已经做的很好了，但由于是要兼容大部分第三方缓存，所以如果我们确定使用redis内存数据库级别的缓存，其实可以不使用官方的缓存，可以自己封装redis（php内置redis接口）的使用，特别是还能使用redis除了缓存以外的更多功能

我们建议采用redis，并结合TP6的缓存配置实现缓存管理类。

如果自己实现需要注意：

- 缓存容易配置
- 默认过期时间
- 缓存路径（redis操作库）
- 前缀定义

## session与cookie

> 新版本不支持操作原生$_SESSION数组和所有session_开头的函数，只能通过Session类（或者助手函数）来操作。会话数据统一在当前请求结束的时候统一写入 所以不要在session写入操作之后执行exit等中断操作,否则会导致Session数据写入失败。
> 
> 6.0的Session类可以很好的支持诸如Swoole/Workerman等环境

- session是中间件
- 默认不开启
- 官方提示：尽量避免把对象保存到Session会话
- session 提供了一个闪存flah方法，下次请求前有效
- 在分布式场景，可以将session存储方式更换为cache
- 

cookie详见官方文档

## 多语言

从CI、YII、Laravel、TP，多语言都做的不错，但一直没有满足我们这么一个设想，大概方式可以用类的常量举个相似的例子：

```
class Lang{
    const user_welcome = "欢迎您";
}
```

```
echo Lang::user_welcome
```

这个一方面常量就可以差不多表达出意思，还可以在编码时自动提示与匹配，解决翻查语言包去找相似的变量，再使用，特别是同应用下的不同开发者会用到相同或相似的语言文本时，要么有点辛苦才能找适合自己的语言变量，或者干脆自己再新增一个，不管是否已经存在相同或接近的


## 上传

从官方的评论来看，上传是一个经常使用的功能，随着上云的产品越来越多，上传到第三方云端会是更多开发者的选择

阿里云、又拍云、七牛等


## 命令行


TP6仍然支持Console应用，也就是通过命令行的方式执行一些操作。

在think文件所在目录下：
```
php think
```

```
PS I:\src\tp6\tp> php .\think
##2019-11-29 12:28:55
App 初始化啦

version 6.0.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -V, --version         Display this console version
  -q, --quiet           Do not output any message
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  build             Build App Dirs
  clear             Clear runtime file
  help              Displays help for a command
  list              Lists commands
  run               PHP Built-in Server for ThinkPHP
  version           show thinkphp framework version
 make
  make:command      Create a new command class
  make:controller   Create a new resource controller class
  make:event        Create a new event class
  make:listener     Create a new listener class
  make:middleware   Create a new middleware class
  make:model        Create a new model class
  make:service      Create a new Service class
  make:subscribe    Create a new subscribe class
  make:validate     Create a validate class
 optimize
  optimize:route    Build app route cache.
  optimize:schema   Build database schema cache.
 route
  route:list        show route list.
 service
  service:discover  Discover Services for ThinkPHP
 vendor
  vendor:publish    Publish any publishable assets from vendor packages
```

比如有些开发者可能需要在更新服务端代码后，需要删除runtime下的文件，但又担心不小心误操作/误删服务器上的文件，我们就可以考虑使用TP提供的命令行工具：

不带任何参数调用clear命令的话，会清除runtime目录（包括模板缓存、日志文件及其子目录）下面的所有的文件，但会保留目录。

```
//clear 还有更多参数，详细见官方文档
php think clear
```

比如通过生成数据库表字段信息缓存，可以提升数据库查询性能，避免不必要的表字段查询。

```
//更多参数详见官方文档
php think optimize:schema
```
执行后会自动在runtime/schema目录下面按照数据表生成字段缓存文件。

> 没有继承think\Model类的（抽象）模型类不会生成。分布式服务器的runtime文件不一样，需要所有服务器都执行一次该命令，重新生成相应缓存

当然TP6 还是支持自定义命令

## 数据库迁移工具

[使用数据库迁移工具
ThinkPHP6数据库迁移工具](https://www.kancloud.cn/augushong/write_by_augushong/1187642)


## 验证码

如果对验证码使用要求严谨，建议使用第三方验证方式（风控/人机验证），比如极验证、网易易盾等

当然官方提供的验证码还是能满足目前的需求的


## workman

Workerman是一款纯PHP开发的开源高性能的PHP socket 服务器框架。更多的是为了解决长连接场景，解决php socket底层开发问题。

## swoole

初步引入，继续加油

## think助手工具库

目前还只是字符串和数组的简单处理，一般成熟的项目内部也都有字符串、数组、对象、加解密等相关工具库

## 助手函数

[助手函数](https://www.kancloud.cn/manual/thinkphp6_0/1037653)

## 更新升级

> 官方不建议老的项目升级到新版，除非你有重构计划，否则就算升级了也只是表面上升级了。也就是这点，让人很头疼，从3到5，5.0到5.x的各个版本，5到6都不能无缝升级或不保证所有功能正常升级。

## 自动补全

目前即使是一直对TP自动补全做的比较好的phpstorm也暂时无法自动补全，需要继续等待官方或第三方的补充，更不用说那些部分试用的NetBeans、vscode等

20191130

## 单元测试

[thinkphp单元测试手册](https://www.kancloud.cn/code7/tpunit/220874)

[ThinkPHP5与单元测试PHPUnit使用](https://blog.csdn.net/weixin_34384915/article/details/93571756)

[PHPUnit简介及使用（thinkphp5的单元测试安装及使用](https://blog.csdn.net/Srodong/article/details/88640325)

## 更多

[ThinkPHP6 核心分析](https://www.kancloud.cn/hubqin/thinkphp/1361643)

## 设计模式

容器采用到单例模式对类/对象进行管理

事件采用观察者模式实现事件的传播与订阅

待续

----


