<!-- TOC -->

- [前言](#前言)
- [nginx](#nginx)
- [redis](#redis)
- [php](#php)
- [数据库-mysql](#数据库-mysql)
- [高并发方案场景](#高并发方案场景)
- [其他](#其他)

<!-- /TOC -->


## 前言

> 性能优化的目标就是使得系统高并发高可用，一般涉及到技术或方案关键字有：缓存、索引、异步、消息队列、分布式、集群、主从等

从该文章中筛选了一部分和优化相关的文章分享解读与补充：

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489936&idx=1&sn=75a52c89e36d0d2f342cf6abf0e55e84&chksm=972185a1a0560cb7ec54efe4ccd0c493762696ad2f20e370b851251250caeabf23479bbed532&scene=21#wechat_redirect" _target="blank" style="color:black;">四年精华PHP技术文章整理合集——性能优化篇</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>什么是性能优化？</font></div></div></div>


----

## nginx

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489428&idx=1&sn=0674cd9418d28f9281167dd0743732d7&chksm=97218ba5a05602b38dfd0032c4fdc9658b85413f5f4b53be6ff78487923acf95723c6443c9c3&scene=21#wechat_redirect" _target="blank" style="color:black;">Nginx为什么快到根本停不下来？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>并发连接数，一般优化后，峰值能保持在 1~3w 左右。</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487346&idx=2&sn=e982f86ab8750c6d11b4ab315d9a5726&chksm=97219343a0561a5536535c481a91674817e1e68e29f807f6e9bf0a3440fcb90fb31d26d443af&scene=21#wechat_redirect" _target="blank" style="color:black;">生产环境：Nginx高可用方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Nginx安装</font></div></div></div>

> 如果没有上云，可以考虑自己搭建nginx高可用方案，原理基本类似。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487434&idx=1&sn=fa692112b9b7df6c2cf7525716821575&chksm=972193fba0561aed39757533843c8db358032a456ac463c9fcd8ef4477773cfa7b9988d200c7&scene=21#wechat_redirect" _target="blank" style="color:black;">Nginx代理与反向代理、负载均衡实</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>通过 Nginx 提供的反向代理和负载均衡功能，可以合理的完成业务的分配，提高网站的处理能力；同时利用缓存功</font></div></div></div>

> 代理和反向代理，有几个区别：1、正向代理，后端服务器不知道客户端是谁，反向代理后端服务器知道客户端是谁；2、正向代理一般是代理作为用户客户端的中介跳板服务，并代替访问后端服务器，后端服务器仍然是对外暴露的，而反向代理只是做了转发，并不代替用户客户端，后端服务器一并隐藏在反向代理服务后面，并不会暴露，只有通过发现代理服务才能访问到后端服务
>
> 反向代理使得服务更安全，还能提供负载均衡服务，提高性能及资源利用

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486994&idx=2&sn=c1754860b1f53309ab9d4d9fbb3aa160&chksm=97219223a0561b35be8f815bcf6f8687a853bb61690d153ea6e80030f7c88e79d1fba426b9cd&scene=21#wechat_redirect" _target="blank" style="color:black;">Nginx+PHP+FastCGI加速模式</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Nginx+PHP+FastCGI加速模式</font></div></div></div>

> 要优化，首先得知道nginx的工作原理和流程，该文章很详细的介绍了处理php动态请求的全过程，步骤清晰，这个基础知识点很重要，当然一般我们也不建议在nginx上做缓存处理。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487287&idx=2&sn=1840f064669fc53fd56206c752aaf39d&chksm=97219306a0561a104227837e1a2a0dbbe48a204ab85b2b44a55a6febfd2dce5127c58cb7c97e&scene=21#wechat_redirect" _target="blank" style="color:black;">除了负载均衡，Nginx还可以做很多，限流、缓存、黑白名单等</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、静态代理Nginx擅长处理静态文件，是非常好的图片、文件服务器。把所有的静态资源的放到nginx上，可以</font></div></div></div>

> 限流、缓存、黑白名单这些都是高并发场景经常会遇到的要解决的问题，nginx提供了这些解决方案，当然我们也可以考虑自己编码实现，比如通过redis等内存级缓存实现

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://www.cnblogs.com/biglittleant/p/8979915.html" _target="blank" style="color:black;">死磕nginx系列--nginx 限流配置 - biglittleant - 博客园</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.cnblogs.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>死磕nginx系列--nginx 限流配置 - biglittleant - 博客园</font></div></div></div>

> nginx限流更加详细的介绍和配置说明

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486353&idx=2&sn=8b6fded39c014b6d822c919f68d3b75f&chksm=972197a0a0561eb675128f46e9bc7ab92b683400f79cdb98226f81e1b9fd93517f780f983dcb&scene=21#wechat_redirect" _target="blank" style="color:black;">Nginx作为静态资源web服务 - 控制浏览器缓存、防盗链</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1. 浏览器缓存简介浏览器缓存遵循HTTP协议定义的缓存机制（如：Expires;Cache-control</font></div></div></div>

> nginx缓存控制详细说明，及图片防盗链设置


## redis

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486851&idx=1&sn=0ffc36b2b187e05e09e9fdaf674a9621&chksm=972191b2a05618a4a66f9c3c935abb533b3be8a935209695c728f77a88ab4f4b9973503c6f6e&scene=21#wechat_redirect" _target="blank" style="color:black;">Redis的各项功能解决了哪些问题？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>作者：blackheartwww.cnblogs.com/linianhui先看一下Redis是一个什么东西</font></div></div></div>

> 这篇文章朴实的文字介绍了redis缓存使用场景的发展，因为要求效率，增加客户端缓存，后来将缓存移到服务端采用redis内存缓存；由于担心redis服务器偶尔抽风缓存数据丢失，考虑redis持久化，保证重启后能恢复缓存数据；再发展到可能redis服务器一挂就是一天，这个时候主从机制（哨兵+复制）就派上用场了，主redis服务挂了，哨兵自动检测并切换到从redis服务；由于业务越来越大，用户量激增，单台redis服务内存不足以支撑用户量，考虑增加内存，但机器的内存也是有个上限的，再考虑横向扩展redis服务（如同数据库分表），这就是redis集群了，可以使用中间件codis进行集群管理，也可以用官方推荐的cluster集群。该文属于介绍方法论，不做具体教学实践，不错的缓存指南。[为什么要用redis？点这里](../数据层/redis/为什么要用redis.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488565&idx=2&sn=221cc76c8a3b876a103f0ec8eecbacc3&chksm=97218804a05601121667cc675aeb8e03fd8a4d4204cf707976cdf8f113b9465a19fd3f04d059&scene=21#wechat_redirect" _target="blank" style="color:black;">令牌桶限流思路分享（PHP+Redis实现机制）</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>服务接口的流量控制策略：分流、降级、限流等。</font></div></div></div>

> 很完整的一个php+redis限流方案（之前我们介绍过nginx的限流方案），该文主要介绍的是令牌桶算法，大概通俗点说：每隔一定时间t会往令牌桶里放一定数量m的令牌（实际代码中表现为令牌数），当请求来时，从令牌桶（redis键值对）检查令牌数（大于0表示拿到令牌，否则表示没有令牌），拿到令牌则继续访问，否则拒绝访问。可能很多开发者自己设计过类似的限流方案，但可能不知道是类令牌桶限流方案，叫什么名字不重要，重要的是有效和正确的思路。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://zhuanlan.zhihu.com/p/60501638" _target="blank" style="color:black;">基于Redis的Stream类型的完美消息队列解决方案 - 知乎</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://zhuanlan.zhihu.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1 概述 2 追加新消息，XADD，生产消息 3 从消息队列中获取消息，XREAD，消费消息 4 消息ID说明 5 消费者组模式，consumer group6 Pending 等待列表 7 消息转移 8 坏消息问题，Dead Letter，死信问题 9 信息监控，X…</font></div></div></div>

> 消息队列可用于实现异步处理。在没有采用第三方消息队列中间件或服务时，我们经常采用redis做消息队列，可能是PUB/SUB订阅与发布模式（效果没有很好），可能是基于LIST的push和pop实现，也可能是sset的实现，现在redis5.0新增了stream类型，看起来是对消息队列的进一步完善实现：消息ID序列生成、消息遍历、消息阻塞与非阻塞读取、消息分组消费、消息队列监控等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485026&idx=5&sn=0decd3ea6197046667a19dfc059d737e&chksm=97219a53a0561345a139f2cd0fe9369731bca41abd8df82a3f6a33c494ab9d013feec0ecbd40&scene=21#wechat_redirect" _target="blank" style="color:black;">深入学习Redis的高可用特性“持久化”</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>深入学习Redis的高可用特性“持久化”</font></div></div></div>


> 这篇文章干货较多，主要从redis持久化RDB与AOF入手，介绍了两种持久化方案的优缺点，并介绍了哪些场景下使用什么样的持久化方案会更好（我们觉得这种文章比起只说原理不说如何处理或不给具体案例场景的文章，对新手更友好）：
>
> 有些场景下redis数据仅仅是缓存数据，丢失也不影响时，都可以不考虑持久化甚至主从（当然不考虑雪崩和穿透问题）；而单机环境下，可以接受短时段的部分数据丢失，可以考虑AOF（实时性更好，但恢复较慢、文件较大）；如果我们有主从的配置，那么可以不考虑持久化；最完美的方案就是集群+主从，既保证负载均衡又保证数据安全。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487352&idx=2&sn=84dc9e9383142e246adc95c26aae0e56&chksm=97219349a0561a5f23ad18d347193325ee37918b33a6d5375f300610ab852b8f8449b70b1c15&scene=21#wechat_redirect" _target="blank" style="color:black;">面试被问哭：Redis 如何做持久化与恢复？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文主要讲了 Redis 的持久化相关功能，持久化一直是影响 Redis 性能的高发地</font></div></div></div>

> 另外一篇详细说明AOF与RDB的文章。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489137&idx=1&sn=448f256a14dae01eaf9f4094d0636563&chksm=97218a40a056035668ef48484a4aabb3bd90926ae1bee29401d5088cdf79538b2ebe0d96a486&scene=21#wechat_redirect" _target="blank" style="color:black;">为什么我们做分布式使用Redis？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>学习 Redis，这几方面尤其重要：Redis 客户端、Redis 高级功能、Redis 持久化和开发运维常用问题探讨、Redis 复制的原理和优化策略、Redis 分布式解决方案等。</font></div></div></div>

> 该文是一篇基础普及redis使用的文章，可轻松阅读，干货知识甚多。主要介绍了redis的非阻塞IO多路复用是什么（利用送外卖的例子通俗讲解了，更多关于详见：[同步-异步-阻塞-非阻塞-IO模型](../知识点/同步-异步-阻塞-非阻塞-IO模型.md)）；介绍了redis各种数据类型的常用场景，比如string用于set/get缓存与计数，hash可实现session，list可实现分页，set可实现交集、差集、并集，sorted set可实现排行榜；还介绍了redis的过期策略：定期删除+惰性删除+LRU（最近最少使用淘汰）；也谈到了我们之前说到的穿透与雪崩问题/解决方案...


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485989&idx=1&sn=51110a97717e5d7205c15484f62255cf&chksm=97219614a0561f02987e2c644914b9a77c65477b1d4945ad64609187850e30fd365f6fd21885&scene=21#wechat_redirect" _target="blank" style="color:black;">php与Redis实现分布式锁，你会了吗？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>redis写入时不带锁定功能，为防止多个进程同时进行一个操作，出现意想不到的结果</font></div></div></div>

> 分布式锁

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486010&idx=1&sn=5570c2828e4909c1f92d7aabe2ad69e6&chksm=9721960ba0561f1d8b1e83c2ca1b2a46d88193831c260f0a00cc37401b8ba54b47f54644228d&scene=21#wechat_redirect" _target="blank" style="color:black;">高并发下，php与redis实现的抢购、秒杀功能实现步骤</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>抢购、秒杀这两个现象是如今很常见的一个应用场景</font></div></div></div>

> 抢购秒杀是redis的一个经典使用场景。
>
> redis中list的push与pop是原子操作，具备


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://zhuanlan.zhihu.com/p/74185541" _target="blank" style="color:black;">揭开面纱，追着 redis 七连问！ - 知乎</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://zhuanlan.zhihu.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>01 redis的通讯协议是什么redis的通讯协议是文本协议，是的，Redis服务器与客户端通过RESP（REdis Serialization Protocol）协议通信，没错，文本协议确实是会浪费流量，不过它的优点在于直观，非常的简单，解析性…</font></div></div></div>

> 主要探讨内存级数据库redis是否具备数据库的ACID特性
>
> 原子性是数据库的事务中的特性。在数据库事务的情景下，原子性指的是：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。
>
> 对于Redis而言，命令的原子性指的是：一个操作的不可以再分，操作要么执行，要么不执行。
>
> Redis的操作之所以是原子性的，是因为Redis是单线程的。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486555&idx=1&sn=4849a56abca2855b5c19655e8686dab2&chksm=9721906aa056197c5953add848cfb1c1079f0a0441817a56332f09ec04eeffbf39f47d4b59ff&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP基于Redis实现轻量级延迟队列</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>延迟队列，顾名思义它是一种带有延迟功能的消息队列。 那么，是在什么场景下我才需要这样的队列呢？一、背景先看看</font></div></div></div>



## php

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487968&idx=1&sn=2bb913334c9ea26824550e05cb0bce83&chksm=97218dd1a05604c7ab3f68dcdf1859f27a3b3dace015df347517238f64312cbda82765bbb354&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP进阶学习之垃圾回收机制详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP进阶学习之垃圾回收机制详解</font></div></div></div>

> 新手phper只要了解php底层基于引用计数实现的垃圾回收机制。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487137&idx=1&sn=8e52b97e2b838612d6b14c00b0e949d7&chksm=97219290a0561b866d795c9e148c0150f653c70f6877c2b8a816cac7003289971e09a5bd96c1&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP底层运行机制与原理</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP的设计理念及特点多进程模型：由于PHP是多进程模型，不同请求间互不干涉</font></div></div></div>

> php核心架构、执行流程、opcode、zend引擎、hash table、php变量实现、引用计数、写时拷贝
>
> ![](https://mmbiz.qpic.cn/mmbiz_jpg/mpTpNCHRiciaicY66U6vT18wib1WMqzpAxWLl1q3MCPAljBqJOMApAUUoWR7yMd4n4Hia7ZlibLzTOshaaH5O6vsMR2g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487071&idx=1&sn=9e14c1cce8b72f9dbd928d907151f691&chksm=9721926ea0561b788c12796d835ddaf7c920b905a3a0f6d2ea64c75973fde1ae8ad820d83b37&scene=21#wechat_redirect" _target="blank" style="color:black;">负载均衡原理的解析</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>开头先理解一下所谓的“均衡”不能狭义地理解为分配给所有实际服务器一样多的工作量，因为多台服务器的承载能力各不同</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487788&idx=1&sn=3ed76321c942c09e4803260705ea39c0&chksm=97218d1da056040bbd85a7a8593a2076256ff623c0584c931c5c8e8789f55e2071e110a8fdc1&scene=21#wechat_redirect" _target="blank" style="color:black;">想要高可用？搞定负载均衡架构是关键</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>想要高可用？搞定负载均衡架构是关键</font></div></div></div>

> 可能你常会听到别人说四层和七层负载均衡，他们到底是是什么？负载均衡有哪些常用方案？http、dns、反向代理、ip、直接路由等负载均衡方式...简单阅读下本文了解下这些基础知识点

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487451&idx=1&sn=7a9435de2a96f37dda24e8f43480fab5&chksm=972193eaa0561afcd779513ce2ae93f82090d460b1f8a8e46031efd45c150e4d8bd3aabbcc00&scene=21#wechat_redirect" _target="blank" style="color:black;">深入理解php的输出缓冲区(output buffer)</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>这篇文章从多个方面讲解了PHP中的输出缓冲区以及怎么使用它。</font></div></div></div>

> 深入理解php的输出缓冲区，这个标题实至名归。在平常是不是经常看到ob函数的实现，但又很迷惑。
> 
> 这篇文章深入剖析了phps输出缓冲区。
> 输出层（output layer）就像一个网，它会把所有从PHP”遗漏“的输出圈起来，然后把它们保存到一个大小固定的缓冲区中。当缓冲区被填满了的时，里面的内容会刷新（写入）到下一层（如果有的话），或者是写入到下面的逻辑层：SAPI缓冲区。
>
> ![](https://mmbiz.qpic.cn/mmbiz_png/LFP9SpGv0PHIcPoMGaniabLbHUjamYgjq5owIbiciaD14nkWFjgmBshabGs1xGMKdicdE9sWQCzkZf5sLkQZIQMqQw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486089&idx=2&sn=628223faf1d1c802eec4aaf8514012cf&chksm=972196b8a0561faecbd209eae9025521406791ae6dd85dbd41d8e8fd0a7c2708901152234c36&scene=21#wechat_redirect" _target="blank" style="color:black;">Session的生成机制、回收机制和存储机制详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php中session的生成机制我们先来分析一下PHP中是怎么生成一个session的。设计出sessi</font></div></div></div>

> 很多phper做了好多年开发，都一直没有弄清楚session是怎么回事，可能被996压榨的没时间去整理回顾下，这篇文章简洁快速的让你从996的工作中挤出点时间就可以掌握session。更多关于session文章：[如何严格设置php的session过期时间](./更多就问片段/如何严格设置php的session过期时间.md)、[Session与cookie的运行机制](./更多旧文片段/Session与cookie的运行机制.md)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488103&idx=1&sn=c746056c495f65d99c11cb662ed68f8c&chksm=97218e56a05607409754793a645383c8e162d1f75f9565964f02e711fb4c06f6efcda7b5cc9e&scene=21#wechat_redirect" _target="blank" style="color:black;">Session攻击手段(会话劫持/固定)及其安全防御措施</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Session攻击手段(会话劫持/固定)及其安全防御措施</font></div></div></div>

> 这个属于安全方面的问题。你的站点使用了https了吗，你的cookie安全吗，是否存在xss漏洞呢，是否有可以随便访问获取php信息的接口等等，这些都有可能暴露信息，让会话被劫持。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489652&idx=1&sn=8a3d4ea76c2ba9ee2584333b3eeb05c6&chksm=97218445a0560d53e5a0baf149f5cc62dbd1ca0c14c6273677feb9f089ca65849ce467516260&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP Opcache的工作原理</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP项目中，尤其是在高并发大流量的场景中，如何提升PHP的响应时间，是一项十分重要的工作。</font></div></div></div>

> 由于php是动态解释型脚本，边执行边解释代码（opcode），导致重复的代码也会重新解释执行，显然这样的效率是不高的，开发都知道重复的代码可以封装，重复的数据可以缓存，所以opcode我们也可以通过缓存就能保证重复代码不需要二次解释成opcode，这就有了官方的opcache。
>
> php8最令人期待的应该就是JIT编译了，经过测试比对，php8在使用JIT编译情况下，比PHP7.4提升了45%左右的速度，很满意的。了解JIT编译详见：[理解JIT编译](../知识点/理解JIT编译.md)



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487388&idx=2&sn=194e08632e734cca555596ea4674092d&chksm=972193ada0561abbabc4b759c56c6458b35ed9f977b7b3dcdb7fcaa1fa52b7a784705335670b&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP 性能监控：Tideways、xhprof 和 xhgui 打造 PHP 非侵入式监控平台</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>环境准备安装之前确保已经正确安装了以下软件PHPNginxMongodb安装 PHP mongodb 扩展$</font></div></div></div>

> 如果不是云服务器，可以考虑搭建php环境监控平台。







## 数据库-mysql


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487592&idx=1&sn=fa42a9b9eaa6a9c822525de4be0b8f64&chksm=97218c59a056054fb9d75fed206dc1e3cf16658461f179bee2be5c8f1b6568fbe2ad5d926e6c&scene=21#wechat_redirect" _target="blank" style="color:black;">面试官：数据量很大，分页查询很慢，怎么优化？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>当需要从数据库查询的表有上万条记录的时候，一次性查询所有结果会变得很慢</font></div></div></div>

> 《高性能MySql》中给出的最佳方案还是限定id查询方案，更多详见：[高性能mysql笔记](../数据层/高性能mysql笔记.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489477&idx=1&sn=57a3c3dc2ee822f25f4740f17d84394c&chksm=97218bf4a05602e20f75d6de9d11ba8d5ac564899b4859067ed5ad8730a840fe7e772b408910&scene=21#wechat_redirect" _target="blank" style="color:black;">【BAT面试题系列】面试官：你了解乐观锁和悲观锁吗？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>前言乐观锁和悲观锁问题，是出现频率比较高的面试题。</font></div></div></div>

> 你知道乐观锁和悲观锁吗，你知道他们用在哪里吗，怎么用？更多关于悲观锁：[悲观锁实践](../数据层/悲观锁实践.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487710&idx=1&sn=b475e13b296703180488d5a714950fe8&chksm=97218cefa05605f90518b23ee1da4b071ef4eb41946a453f903e500c76e2ec12debce85b90ff&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL在并发场景下的问题及解决思路</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>MySQL在并发场景下的问题及解决思路</font></div></div></div>


> mysql的优化可以围绕锁、索引展开，具体可以学习阿里丁奇老师的《MySql实战45讲》（收费项目，可以搜下，通俗易懂干货很多，打通你在mysql层面的任督二脉）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487573&idx=2&sn=ba850e12a49797b3893fd11246a14691&chksm=97218c64a05605724291bb950e098ac0b81a55eebd56e319f6983944fd0f0f102e7a7f00fbe8&scene=21#wechat_redirect" _target="blank" style="color:black;">Mysql千万级别数据批量插入只需简单三步！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>第一步：配置my.ini文件文件中配置bulk_insert_buffer_size=120M 或者更大将i</font></div></div></div>

> 因为表大，再加上可能有多个索引的情况下，mysql插入多条数据，数据库需要加锁（间隙锁？）、更新索引等复杂操作，耗时较长，文章中采用拼接单条sql的方式，减少不必要的加锁

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486962&idx=1&sn=38df9731eb28e5a82786b97a035a883a&chksm=972191c3a05618d5ec92b136f72b21ba0a0838aca0c43a12b0d7309f872d31d517ec6b8b2a9c&scene=21#wechat_redirect" _target="blank" style="color:black;">Mysql数据库的分布式锁有哪几种？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>悲观锁Mysql实现分布式悲观锁:直接创建一张锁表，然后通过操作该表中的数据来实现了。</font></div></div></div>

> 文中作者也说了：但无论如何,Mysql数据库的性能和效率大家心里都有点abcd数的,在高并发的情况下, 用Mysql做分布式锁,等着跑路吧。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486292&idx=1&sn=4b74bca7b558bc64432d138b61815ef6&chksm=97219765a0561e7336332462778dd9a9a616930945a39d0f79ca12a3c51189f05e1fa95ff232&scene=21#wechat_redirect" _target="blank" style="color:black;">深入理解PHP+Mysql分布式事务与解决方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>事务(Transaction)是访问并可能更新数据库中各种数据项的一个程序执行单元；事务的ACID特性事务应</font></div></div></div>

> 基于XA协议的两阶段提交

## 高并发方案场景

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488050&idx=2&sn=8949dd4f62bd7942407be4bc10802572&chksm=97218e03a05607154b02a8362588c07d9ac49c4b98123d9206f07b0f4b418ffe4e81ecde8dae&scene=21#wechat_redirect" _target="blank" style="color:black;">什么是高并发架构？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>什么是高并发？</font></div></div></div>

> 什么是高并发，高并发有哪些指标数据，一般系统高并发如何演变


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489054&idx=2&sn=bf27cd0b9d37752495f5d3ed513c994b&chksm=97218a2fa0560339a565aecc87faea6574254d7f720d277aead5c8e6ede9636a6604b61b2948&scene=21#wechat_redirect" _target="blank" style="color:black;">高并发下的抽奖优化</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>高并发下的抽奖优化</font></div></div></div>

> 抽奖开奖、投票、预约售票、抢购秒杀，这些都是典型经常碰到的高并发场景。文章中针对抽奖环节的优化，从页面展示、抽奖点击操作流程，从nginx入口请求限流、业务逻辑、缓存、数据库等层面作符合实际情况的进一步优化，涉及队列降级和削峰、redis限流和缓存、异步队列消息、锁和事务保证数据安全和一致性、索引优化提高效率。
> 
> 结合文章我们也备注下相关思路：nginx限流、队列削峰进一步降低请求处理数、数据内存缓存、与抽奖无关的其他业务操作可以异步队列处理、减小业务处理事务（将时间操作长的数据库操作放在事务最后，避免长事务引发更多的等待造成死锁）、数据库读写分离降低数据库压力、本地内存级限流（针对恶意用户）、验证码限流（普通图片验证码适合普通用户、云智能验证平台适合限制恶意用户）


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488463&idx=1&sn=4f9db0efcc461925a213b0519d2ab820&chksm=97218ffea05606e82b49c48406a8d1d5a7c0845f1f08ffb88b521764e869924294beb2912e8d&scene=21#wechat_redirect" _target="blank" style="color:black;">设计秒杀系统，应该如何思考？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一个秒杀系统的设计，可以根据不同级别的流量，由简单到复杂打造出不同的架构，本质是各方面的取舍和权衡。</font></div></div></div>

> 推荐一篇比较完整的关于秒杀系统的设计

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489405&idx=1&sn=0aea5103421fc3a870282447951d7fe3&chksm=97218b4ca056025af74abe3730fa97efe717be918f20be7815a789598cb3997b7911465d657f&scene=21#wechat_redirect" _target="blank" style="color:black;">高并发的核心技术 - 幂等的实现方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>幂等性应该是合格程序员的一个基因，在设计系统时，是首要考虑的问题</font></div></div></div>

> 幂等性这个概念对于大部分开发，可能不是很熟悉，通俗点说就是保证数据只被处理过一次，不会被多次处理，比如扣款，退款、更新数据等。哪些场景常用到：表单重复提交、支付扣款加锁、不存在则插入数据、某种状态下的订单数据更新、对外提供API更新能力。幂等性还经常要考虑事务、数据一致性、回滚、异常延迟队列处理等，都是为了保证幂等。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486084&idx=2&sn=d1de5ce8a5d989cba5baae010f2263a6&chksm=972196b5a0561fa3ef93ff22aff1fd999d5bb838017b0abb52ee1f1433d499c72e8edc264587&scene=21#wechat_redirect" _target="blank" style="color:black;">一个在高并发下财务支付锁的问题分析</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在工作项目中，会遇到一些php并发访问去修改一个数据问题，如果这个数据不加锁，就会造成数据的错误。</font></div></div></div>

> 如果我们还不明白高并发下像抽奖、预约、支付等这些有库存场景为什么要加入锁的话，我们可以花10分钟看下这篇很简单的关于支付锁的问题分析。更多关于锁与ACID：[悲观锁实践](../数据层/悲观锁实践.md)、[明明白白事务ACID](../数据层/明明白白事务ACID.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488093&idx=1&sn=896d3c481362c282e9d99cbcbe348920&chksm=97218e6ca056077a2ea8a5879e2606a3f276066dc2ea361a0b9f99c9fe454b6ce570ff86ca04&scene=21#wechat_redirect" _target="blank" style="color:black;">在开发过程中，怎样的级别才算是高并发</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在开发过程中，怎样的级别才算是高并发</font></div></div></div>

> 高并发，我们觉得是根据现有机器数量和QPS来下结论的（狭义上），广义上当然是大厂大项目的高并发。如何评估现有系统的并发数？是否属于高并发？高并发解决思路？
>
> 可以通过现有系统一天的流量（PV）结合28定律（80%的访问在20%的时间里）推导出平均并发数（每秒），预测并发数可能峰值，再结合机器是否三高（IO负载、cpu、内存）推断是否快超出现有系统的负载能力（"高并发"），高并发的解决思想：分而治之，不论是堆机器负载均衡分流，还是限流削峰降级、异步队列等优化（总之就是降低每个请求的处理时间即连接时长）。银行柜员如果处理一个客户的业务用时1小时，一天只能处理不到10个客户，如果柜员使用各种智能机器设备工具后，平均处理一个客户的业务用时5分钟，那一天就能处理至少90个客户。提高处理一个客户业务（一次连接请求）效率，降低事务时长，我们能接受处理业务的客户就会更多。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487847&idx=1&sn=a1b315add9abdccd78da8c04a0525a6a&chksm=97218d56a0560440f59ff95a9339cdfb9d386b11ac6f3484d224d3b1cd626795757283c06827&scene=21#wechat_redirect" _target="blank" style="color:black;">商品SKU系统，你如何设计？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>如何设计库存，哪些库存呢？</font></div></div></div>

> 设计过sku的人，才知道sku有多难设计。做电商的必须把sku的设计吃透，不然后续一堆复杂的问题。



----

以下分享几个比较大型的系统架构设计。

先来看web架构的演变发展：

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489435&idx=1&sn=268cc2728d6bed85e7496e8a96ca8aca&chksm=97218baaa05602bc0a8a1f0676672fb7587f15bc5344510160980f70cb83ebce78076f43df7c&scene=21#wechat_redirect" _target="blank" style="color:black;">九阶段读懂互联网的架构演变</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>只有认真的分析和不断地探究，才能发现适合自己网站的架构。</font></div></div></div>

> web架构的演变过程，并不适合所有的网站，实际中网站演进过程与自身业务和不同遇到的问题有密切的关系，没有固定的模式，只有结合网站实际情况，认真的分析和不断地探究，才能发现适合自己网站的架构。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489355&idx=1&sn=f9477a7dc1313477db3f8a051eafecf7&chksm=97218b7aa056026c4b80e3242648797f0608d7bc91d40e8a0ac34caedf48d28e14035acc1a0b&scene=21#wechat_redirect" _target="blank" style="color:black;">架构师眼中的高并发架构</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>前言高并发经常会发生在有大活跃用户量和用户高聚集的业务场景中，如：秒杀活动、定时领取红包等。为了让业务可以流</font></div></div></div>

> 都是因为业务的复杂和用户量的猛增，才会有高并发的场景，高并发场景倒逼架构师要留扩展余地。文章中对异步、缓存、CDN、静态化、集群、分层/分布式、面向服务、冗余与自动化有较深入的解释。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487395&idx=2&sn=af045318a91298e9a17c35ef0eb739a0&chksm=97219392a0561a84688ad74aad424b3ddc1d7b01f160dad63bf4e02dd0f1e2e70e0989226735&scene=21#wechat_redirect" _target="blank" style="color:black;">深度剖析｜数据库生产常用架构方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>深度剖析｜数据库生产常用架构方案</font></div></div></div>

> 再来看数据库结构的演变，一样根据自身产品实际情况和需要进行探索演进。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487224&idx=2&sn=237f4229fe71533129c678530839f657&chksm=972192c9a0561bdf00f201d438709c859adcdd3060f91c55d26254f617ad72edc22fd93cc80b&scene=21#wechat_redirect" _target="blank" style="color:black;">日均7亿交易量，如何设计高可用的MySQL架构？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文作者将给大家分享工行基于 MySQL 构建分布式架构的转型之路！</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487500&idx=1&sn=cb1bfc7a1aa14b884d01b0acb6a0f2b8&chksm=97218c3da056052b20325486c5ce456cce6167db6376f8c88653ac9f0d6f36f2215745292675&scene=21#wechat_redirect" _target="blank" style="color:black;">淘宝高可用高伸缩高性能框架之实现</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一，应用无状态（淘宝session框架）俗话说，一个系 统的伸缩性的好坏取决于应用的状态如何管理。</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487279&idx=2&sn=fd24a38415e93595d08eccce6a84fdd9&chksm=9721931ea0561a08ca6edcb9b29478387e5dcb082ddae94edff6f15faf427aa6f5313af3fd34&scene=21#wechat_redirect" _target="blank" style="color:black;">知乎千万级高性能网关是如何搭建的？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>实时的响应总是让人兴奋的，就如你在微信里看到对方正在输入，如你在王者峡谷里一呼百应</font></div></div></div>

> 虽然可能不是php生态体系的系统，但在高并发场景里，大家考虑的思路是类似，技术思想相近，只是使用不同的中间件或实现方式。


...

## 其他

[PHP方案解读与补充](./PHP方案解读与补充.md)

----

> 持续补充


@tsingchan
























