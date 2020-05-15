从swoole谈起性能比对
================================

>这篇文章我主要想备注的是：那些流行的框架一般性能都不是中上的，但这些流行框架的强大在于它的生态体系和易用性、可用性、扩展性等, 如果仅仅只是追求高性能， 他们其实并这不是个好选择。 像django, flask, yii, laravel, symfony等传统框架， 这些框架简单易用, 生态强大, 开发效率高，其实现实中大部分产品的性能并不像微信、微博这些巨头App需要超高并发性能要求，反而安全、效率、易用、可用性会是更重要的追求，但如果一定要追求高性能，那真的没得比。

  
**数据参考：**   
  
[https://www.techempower.com/benchmarks/#section=data-r18](https://link.zhihu.com/?target=https%3A//www.techempower.com/benchmarks/%23section%3Ddata-r18)   
  
数据来自 techempower 的 Web Framework Benchmarks .该测试会选取大量的web框架进行评测. 目前试到现在已经到了第18轮. 相关测试用的代码在 Github:

[https://github.com/TechEmpower/FrameworkBenchmarks](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks)

**强烈建议自己去看. 因为我写这篇文章自然是我自己的观点. 而你自己去看, 才是你自己的观点.**

测试主要分这么几个方面:

- JSON serialization (JSON 序列化)
- Single query (访问数据库, 获取单行数据)
- Multiple queries (并发访问数据库, 请求多行, 最后合并输出json)
- Fortunes (更复杂的数据库请求然后渲染html)
- Data updates (并发更新数据库并输出json)
- Plaintext (仅用框架输出helloWorld)

(详细测试细节可以拉到最底部看描述)


我们直接来看最纯粹的 hello world 部分, 这部分的性能代表了框架以及语言的处理性能, 框架的QPS天花板就限制在这里.

  
(数据测试平台也分两种，一种是超高配的物理机搭配10G网卡，一种是Azure云的D3v2, 4core14G内存, 在低性能环境上, 更能体现框架设计的优越性, 所以这个截图是Azure D3v2的结果)

[https://www.techempower.com/benchmarks/#section=data-r18&hw=cl&test=plaintext](https://link.zhihu.com/?target=https%3A//www.techempower.com/benchmarks/%23section%3Ddata-r18%26hw%3Dcl%26test%3Dplaintext)

![](https://pic3.zhimg.com/50/v2-ab3252b91d1f3a796d4c99ac6d02b019_hd.jpg)可以看到排名第一的是 C语言的 [libreactor](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/C/libreactor) 达到了惊人的 1,867,993 QPS.

Go 语言的高性能框架 [fasthttp](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/Go/fasthttp) 排名9, 成绩是 1,219,876 QPS, 性能是 libreactor 的65.3%.

PHP框架 [swoole](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/PHP/swoole) 排名76, 成绩是 206,522 QPS, 性能是 libreactor 的 11.1%.

顺便我们还可以看到一些其他的熟悉的框架的成绩:

[netty](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/Java/netty) 排名26, 成绩是 873,660 QPS.

[openresty](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/Lua/openresty) 排名90, 成绩是 178,374 QPS.

直接使用 nginx 输出, 排名 62, 成绩是 306,772 QPS.

直接使用 nodejs 输出, 排名 100, 成绩是 148,330 QPS.

直接使用 go 语言的net库输出, 排名是 112, 成绩是 118,809 QPS.

beego 框架, 排名 144, 成绩是 85,015 QPS.

spring 框架, 排名 211, 成绩是 31,620 QPS.

直接用 php 搭配 nginx输出, 排名226, 成绩是 26,281 QPS.

django-py3 19,089 QPS.

flask 13,507 QPS.

swoole 搭配 laravel, 7,113 QPS.

Yii 2, 5,855 QPS.

symfony, 3,335 QPS.

纯 laravel, 1,525 QPS.



**这说明了什么呢? 这说明了很多东西:**

首先这只是helloWorld, 填上你的业务逻辑性能能有十分之一就很不错了.

有人说, 哇这个 [libreactor](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/C/libreactor) 在 4核心机器上就能 QPS 一百八十六万, 太NB了, 我就学这个了! 嘛, 我劝你先看看写个helloWorld, 需要写多少代码管理多少细节... 然后在评估下自己的日常开发, 换到 [libreactor](https://link.zhihu.com/?target=https%3A//github.com/TechEmpower/FrameworkBenchmarks/tree/master/frameworks/C/libreactor) 上会不会原本一天干完的活没准2周才能上线?

fasthttp 确实优秀. 有很多设计的细节值得所有框架学习. 建议大家有时间阅读它的源码. 特别是http协议解析部分, 设计的很精妙, 从最大限度上节省了性能.

swoole 也很优秀, 但受限制于语言, 模型等问题. 这个结果是它能做到的极限了. 我估计郭新华大佬要是不给swoole怼个DPDK, 基本swoole不会有**质的提升** 了.

openresty 很尴尬, 因为原生 nginx 也才 306,772 QPS. openresty 不魔改nginx 肯定超不过这个数值. 而nginx本身为了做好一个web服务器, 不得不在各方面妥协(比如加在http解析过程中的各种过滤点).

netty 目前是强有力的java框架. 而且性能也足够. 非常不错.

nodejs 的裸机性能实在是堪忧. 未来如果前端页面继续用nodejs来做伪后端渲染, 性能瓶颈会是大问题.  
  
go 语言自带的net库用来实现普通应用没问题, 但要实现高性能应用, 需要换fasthttp. 同理, beego基于go 的 net/http, 在流量不大时做做小应用没问题. 在流量达到一定程度后, 会面临性能瓶颈.

spring 的强大在于它的生态和易用性, 如果追求高性能. 这不是个好选择. 同样的道理同样适用于django, flask, yii, latavel, symfony等传统框架上. 这些框架简单易用, 生态强大, 开发效率高. 但如果追求高性能..... 真的不行.

这里说个有趣的小细节, 我在360搜索的时候, 刚开始的搜索结果页就用的是Yii2弄的, 结果一压测, 崩了.

![](https://pic3.zhimg.com/50/v2-759f368d3b80f365794b980a4d8c9f55_hd.jpg)(这个就是搜索结果页, 原理是请求后端引擎merger, 然后把吐出来的json数据渲染成这个样子.)

后来换了鸟哥的yaf, 性能总算没问题了. 顺利上线. 现在已经换成了openresty.

框架的好处就在于快和统一, 能更好的提供一个方法来组织项目. laravel 的代码写的很不错, 设计模式, 代码组织, 命名, 结构. 都可圈可点. 甚至可以作为大型项目的教材. 但, 性能真的太惨了.

人家连http头都不全部解析就把寄存器里面的"helloWorld"吐出去了(fasthttp), 你的runtime还在parse classLoader部分的代码. 性能怎么能拼得过嘛.......



**结论:**

单纯从IO性能上说, swoole 不可能打得过 go (特指fasthttp). 但在实际应用中. 框架IO性能并不能决定最后的QPS. 因为你还要访问数据库, 还要JSON序列化, 还要调用外部接口, 还要处理各种逻辑. 这写有相当大的部分都在框架范围内.

![](https://pic3.zhimg.com/50/v2-9fb987da8f0c2bc1efe2932728a704bc_hd.jpg)![](https://pic1.zhimg.com/50/v2-7836b985075df3d75279150837514919_hd.jpg)比如这是 Multiple queries 访问数据库的测试结果, 纯fasthttp反而拼不过 swoole.

所以选择一个框架, 性能只是一方面. 除非你告诉我你是做高频的, 时间和金钱直接挂钩. 那你用ASIC写web都不过分. 对于普通开发者. 即使不是go或者swoole, 性能也足够了(我真的没有在黑laravel, 手动滑稽). 对于996的我等码农来说, 更快的撸完一个接口回家睡觉, 很明显比接口能跑100W更有诱惑力.

不过, 追求也可以有嘛, 可以多看看高性能框架, 说不定哪天就用的上了不是.



<font size=2 color=grey>[阅读原文](https://www.zhihu.com/question/346571485/answer/838398506)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
