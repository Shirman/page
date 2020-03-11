Swoole框架有哪些怎么选择

<!-- TOC -->

- [Swoole](#swoole)
- [Swoole Framework](#swoole-framework)
- [Swoole框架与生态发展](#swoole框架与生态发展)
- [选择哪一个Swoole框架](#选择哪一个swoole框架)
- [只有swoole才有协程吗](#只有swoole才有协程吗)

<!-- /TOC -->

## Swoole

Swoole是实现各种协议及实现异步高性能的一个库，不是框架。包括上层的编程API和底层的hack，协程只不过是实现异步的一种方式。

基于Swoole，PHP开发者可以轻松快速开发出支持高并发的应用，比如即时通讯类应用，甚至游戏服务器，进一步拓宽了PHP的应用场景。

越来越多的PHP项目已经享受到Swoole带来的技术红利。基于异步协程库Swoole的PHP框架越来越多了。

[【教你Swoole入门】](.\教你Swoole入门.md)

## Swoole Framework

目前基于Swoole的都有哪些框架：

- TSF: 腾讯基于协程和Swoole的PHP服务器框架
- EasySwoole: 企业级服务框架
- PHP-MSF: Camera360基于Swoole的协程企业级微服务框架
- ZanPHP: 有赞基于Swoole的PHP框架
- SwooleDistributed: 基于Swoole的分布式通讯框架
- Group-Co: PHP异步协程框架
- Swoft: 基于Swoole协程的框架
- MixPHP: 基于Swoole的次世代PHP框架
- FastD: 一个支持Swoole的轻量级Web开发框架
- QueryPHP: 渐进式PHP常驻框架引擎
- Hyperf: PHP企业级微服务协程框架


## Swoole框架与生态发展

最初Swoole感觉很惊艳，那时候创始人韩天峰还是用php原生来实现常驻内存，思路和Workerman相似。

后来用C扩展重构，性能确实提升很大，但是技术曲线直线上升，想用好swoole需要走很长的路，让普通的PHPer很难爱起来，swoole官方的框架又太简陋，没什么人用也没人维护。

EasySwoole的出现，让所有人看到了一线希望，swoole也有了明确的方向。

再后来swoft出现，让很多PHP老鸟觉得，这就是我想要的东西，更让人感觉PHP终于要跻身现代编程语言的行列，而切换成本不高。

再再后来Hyperf出现了，从代码和注释里有人找到了swoft的痕迹，后来发现是swoft曾经的开发组成员发起的Hyperf。

EasySwoole和Swoft看起来是swoole生态的奠基者，也已经是swoole生态的重要组成部分。

2020年Swoole与ThinkPHP合作，由ThinkPHP全权代理推广Swoole及其3个收费产品Swoole的企业级框架、加密方案、调试方案，另外还和Hyperf合作，有指定Hyperf为官方框架的嫌疑，当然这肯定引起了EsaySwoole、Swoft等前期一起奠定Swoole生态的框架大大们不愉快。

## 选择哪一个Swoole框架

我们先来看swoole+php与go的比较：

- CSP 模型：swoole 与 go 只差一个 select，go还有多线程协程 runtime.GOMAXPROCS，当然单线程又有单线程的好处，少考虑很多线程安全问题。

- 抽象能力：php5之后 与 java 比较接近，面向对象能力更好，设计模式更好运用，业务实现用php会更好，如果是做中间件使用go更好一些。

- 错误处理：php 的 try/catch/finally 虽然内置不足，且传统但可以少写不少处理异常的代码，异常不容导致服务停止，go 则在错误处理的粒度更精细一些，需要要更加细心处理每个异常错误，否则一不小心服务就挂了，php确实适合快速实现业务。

- 组件库生态：php 现有的库分 c 扩展和 composer 包，其中 composer 包中有一些使用了一些全局变量/方法，导致无法在协程中使用，而很多老的c扩展都没有考虑到异步的场景，导致很多细粒度的功能实现不了，还有使用单独网络库无法 hook 为协程的，而 go 所有的库都天然的可以用协程，并且是用本身 go 编写的，没有用到c，也便于调试修改源码。显然在生态方面java和go是很占优的。

- 类型系统：强弱类型自有各自的优势，强类型执行效率肯定高，弱类型比较自由灵活。

- 性能：swoole主要提供了websocket/长链接的服务、协程异步实现，而协程异步主要是异步IO，解决以往php只能同步IO带来的低效，但对于密集运算的话，swoole解决不了cpu这块效率问题。swoole通过协程把原php磁盘IO、网络IO的同步阻塞方式升级为异步不阻塞的方式，提高CPU利用率，加快请求处理。

我们需要基于swoole的框架吗？还是可用在第三方框架上加入swoole扩展，比如laravel或thinkphp的swoole扩展？

项目不大，用户量不大，那本身就不会遇到性能瓶颈问题，那还是用自己熟悉的传统的mvc框架即可，效率高，容错率好，易维护。

项目大，用户量大，并发大，公司只有php技术栈，那就先考虑前端优化（代码逻辑优化、加载优化、资源优化等）、负载均衡、后端优化（业务逻辑或算法优化、流量限流、异步队列等）、数据层优化（适当缓存机制、数据库读写分离、sql语句优化、数据库索引优化等）等等


为了进一步优化，及可能还会考虑更完整的分布式，数据库主从与集群、缓存主从与集群、消息队列集群，再考虑服务剥离，慢慢发展成为微服务架构，一方面提高性能，还提高开发测试部署效率。


而微服务常用的RPC、API（RESTful）技术，如果要求提高新能，显然客户端（后端业务客户端）需要支持异步实现，RPC服务端也需要支持异步，才能保证连接快速处理并结束，避免系统连接太多最后导致三高宕机。

选择Swoole框架，EasySwoole从文档上看虽然没有像Swoft、Hyperf看起来高大上优雅，但他提供了不少phper需要的composer包或库，比如微信、支付宝、jwt、spider等一些常用工具和sdk二次封装，显然会提升开发的效率；Swoft和Hyper重点核心在微服务和websocket。

目前对于web服务，除非新项目，允许试验，否则不建议使用基于swoole的框架实现http服务。

## 只有swoole才有协程吗

Swoole目前局限于 C 扩展与 composer 包的协程兼容性，当然如果项目只用 mysql/redis 这些常用的组件就影响非常小。在此号召所有 PHP 开源者：请大家从现在开始不要使用原生 CURL ，请使用 guzzle。请大家封装时考虑到异步场景，不要大量使用全局变量，单例。


协程可以实现异步，那只有swoole才能实现协程吗？其实php官方也是有协程的概念和实现方式的，只是太难以理解和应用，相信php后续大版本会借鉴。


附上鸟哥的[【在PHP中使用协程实现多任务调度】](https://www.laruence.com/2015/05/28/3038.html)

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。