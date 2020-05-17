
> 一些mysql文章方案解决与补充分享

<!-- TOC -->

- [主从](#主从)
- [优化](#优化)
- [索引](#索引)
- [事务](#事务)
- [实例方案](#实例方案)
- [面试知识点](#面试知识点)

<!-- /TOC -->



## 主从

> 主从解决数据库单点故障问题，支持读写分离方案。从库复制主库binlog到relaylog中继日志并重放得到同步数据。注意读写分离配置后，从库可能存在延时，在写入数据后又马上需要读取时的场景。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489687&idx=1&sn=527060b6350622aa806dd5e62ac1668a&chksm=972184a6a0560db09f74fbc4e860f6377ec9da61a261b113c5d6deb2a2a7518882628da9f868&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL进阶——主从复制</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>主从复制的配置，大部分都在主机上，注意查看相关步骤。</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488116&idx=1&sn=17172dada9ea0f600355c838733ffe14&chksm=97218e45a05607536856331a5bc09a6681f25aea8cd747655a810e1f2e284ba22e391be6aeb8&scene=21#wechat_redirect" _target="blank" style="color:black;">Mysql主从同步的实现原理与配置实战</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Mysql主从同步的实现原理与配置实战</font></div></div></div>



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486988&idx=2&sn=fb645fe7711e41b52064ed5553970f80&chksm=9721923da0561b2be21dec64bdef2d2ea294f2225ee9e13f7720ae71e161a166c5a401b16bfb&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL主从复制虽好，能完美解决数据库单点问题吗？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、单个数据库服务器的缺点数据库服务器存在单点问题；数据库服务器资源无法满足增长的读写请求；高峰时数据库连接</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489731&idx=1&sn=d58c7cca4ef29df7b0949f5bc06cd0ac&chksm=972184f2a0560de49126606648d510a5a3bdcc9c0ab98a1c67da727fc14db24391d80fa0350d&scene=21#wechat_redirect" _target="blank" style="color:black;">Mysql复制方式(半同步复制，并行复制，多源复制)</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>mysql默认的复制是异步的，主库写入了binlog后就会返回给客户端，而无论从库是否复制成功。</font></div></div></div>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487923&idx=1&sn=9e150fbc5a2b1f3ebc30a746471d8b85&chksm=97218d82a05604940fb9a6a5ff7b009eefc9d4ec04bf17e8b3f481eeb63fd4b52ea1ffaa9cf3&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL主从不一致情形与解决方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>mysql主从复制是基于binlog的一种异步复制！</font></div></div></div>


## 优化

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486950&idx=2&sn=f8f09380cc594ff8df3f5c743927cb4a&chksm=972191d7a05618c13a222aaee8a15b303e79a8cbda4bff9af059e8681d73b8508ae77511b443&scene=21#wechat_redirect" _target="blank" style="color:black;">关于 MySQL 通用查询和慢查询日志，看这篇就够了！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>通用查询日志：记录建立的客户端连接和执行的语句。</font></div></div></div>

> 数据库的优化，一般从慢查询开始，我们先学会慢查询日志的配置，拿到慢查询sql语句后，通过explain进行分析，然后对sql进行调整或索引上的优化，最后explain及验证。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487750&idx=1&sn=56a21a0216c28de2ce1742cb813b781a&chksm=97218d37a0560421e653f8533df5da4a7dd7230c618c9ad777d69ec7534862062736a7d4c40a&scene=21#wechat_redirect" _target="blank" style="color:black;">图解 SQL 里的各种 JOIN，看完不懂来找我！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>图解 SQL 里的各种 JOIN，看完不懂来找我！</font></div></div></div>


> 该文图文结合简单易懂的介绍了多种join的方式，inner join,left join,right join,full outer join等。大部分开发过程中用到最多的也都是inner join和left join，而且大多开发在使用上没有问题，问题在于性能上，后面有关于join的优化文章。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://time.geekbang.org/column/article/79700" _target="blank" style="color:black;">34 | 到底可不可以使用join？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://time.geekbang.org/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>今天，我和你介绍了MySQL执行join语句的两种可能算法，这两种算法是由能否使用被驱动表的索引决定的。而能否用上被驱动表的索引，对join</font></div></div></div>

> 这是阿里丁奇老师mysql实战45讲的34讲，主要介绍了join是如何工作的，到底我们能不能用join，另外35讲介绍的是join如何去优化，在34讲中，我们了解了join的原理，我们就懂得如何去优化join语句。
> 
> join可以用，但要考虑语句的扫描行数，决定执行效率。优化器会自动判断选择适合的join驱动表。
>
> 在35讲中join的优化，主要介绍Multi-Range Read 优化 (MRR)。这个优化的主要目的是尽量使用顺序读盘。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489624&idx=1&sn=4bf9f283cd32269d90b4012d98f9ccd0&chksm=97218469a0560d7f85c2c088f012c729ec53af6823b54b326f6028f22ba4e1e41cbab263403a&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL中ORDER BY与LIMIT一起使用（有坑）</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>MySQL中ORDER BY与LIMIT一起使用（有坑）</font></div></div></div>

> 文章最后的小结是精华部分，有利于开发组织高效正确的sql语句实现：

```
如果你只需要结果集中的某几行，那么建议使用limit。这样的话可以避免抓取全部结果集，然后再丢弃那些你不要的行。

如果limit row_count 与 order by 一起使用，那么在找到第一个row_count就停止排序，直接返回。

对于order by查询，带或者不带limit可能返回行的顺序是不一样的。

如果order by列有相同的值，那么MySQL可以自由地以任何顺序返回这些行。换言之，只要order by列的值不重复，就可以保证返回的顺序。

可以在order by子句中包含附加列，以使顺序具有确定性。
```

## 索引

> 索引本应该放在优化章节里，我们认为索引是一块很重要的部分，基本上所有优化都会是围绕着索引，所以我们将索引单独一章。如果没有特别指出，以下都以innodb为默认引擎。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487933&idx=1&sn=232a13bb7d84aa99cec9c7c5ecfa6cfa&chksm=97218d8ca056049a54d0dbef389aaa273e19cef777e46ffa5ae8d763202632745f05f49da4bd&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL索引和SQL调优手册</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>MySQL索引和SQL调优手册</font></div></div></div>

> 索引概念、B+树索引、主索引树、普通索引树、聚簇索引、非聚簇索引...
>
> 该文章从mysql的索引原理、实现到配置及如何优化做了详细的介绍
>
> 如果有耐心，我们还是很推荐阿里丁奇老师的mysql实战45讲。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487774&idx=1&sn=78f75d46d3c1e151820d15e31212237f&chksm=97218d2fa0560439586dec9afd1330ade40ad76dbf18fdce46180c978e7e35b2b89cf5678185&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL 索引原理及设计</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>MySQL 索引原理及设计</font></div></div></div>

> 多一篇索引文章，多一次理解，多一次从稍微不同的角度或讲述重新理解索引

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487412&idx=1&sn=855b8a54b5dca43843e9a2f9781ace34&chksm=97219385a0561a93bf51c0a657f0820d9ac82dac28489dbeb8b68b6a9ffdf41e4c12cf4a0a86&scene=21#wechat_redirect" _target="blank" style="color:black;">数据库索引是什么？新华字典来帮你！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>学过服务器端开发的朋友一定知道，程序没有数据库索引也可以运行。</font></div></div></div>

> 这篇文章通过新华字典的示例操作告诉我们什么是索引、联合索引、聚簇索引，这是从宏观的角度去解读索引，上面的文章提到B+树及原理的我们称为微观的解决索引（理解索引的实现理论，而不仅仅是停留在合理性上）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487095&idx=1&sn=f196d2da868dd360326de0d27dca73b2&chksm=97219246a0561b5078056228e7834ffeb97dd08ab854fe60bcfc911e186e20d4e3083a21c53f&scene=21#wechat_redirect" _target="blank" style="color:black;">Mysql索引优化</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Mysql索引优化</font></div></div></div>

> 索引优化的一些所谓的军规和范例，值得再一次理解并化为自己所有。更多干货：[更多mysql数据库相关知识与优化](/互联网/数据层/README.md)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489826&idx=1&sn=12dfa53f94500250e35757ff63c2cc11&chksm=97218513a0560c05f81810f9502a90887fd205fc1bfdd2a97ac7ec19fd5ee457c39c9375a946&scene=21#wechat_redirect" _target="blank" style="color:black;">mysql性能分析-------profiling和explain</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>profiling之性能分析 MySQL5.0.37版本以上支持了Profiling – 官方手册。</font></div></div></div>


> mysql优化中，除了慢查询日志，explain是一个很重要的分析工具。更多关于explain的参数说明：[高性能mysql笔记-62、explain扩展](/互联网/数据层/高性能mysql笔记.md)

## 事务


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://www.cnblogs.com/kismetv/p/10331633.html" _target="blank" style="color:black;">深入学习MySQL事务：ACID特性的实现原理 - 编程迷思 - 博客园</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.cnblogs.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>深入学习MySQL事务：ACID特性的实现原理 - 编程迷思 - 博客园</font></div></div></div>



> mysql服务器架构、什么是事务、ACID是什么？我们很推荐这篇文章。我们也顺带转载了，避免哪天文章被删除了。
>
> 日志：redo log保证持久性（解决buff pool可能丢失数据问题）、undo log保证原子性、bin log是mysql服务器层的日志，常用于基于时间点恢复数据（redo log属于innodb引擎层）
>
> 隔离性研究的是不同事务之间的相互影响。隔离性是指，事务内部的操作与其他事务是隔离的，并发执行的各个事务之间不能互相干扰。严格的隔离性，对应了事务隔离级别中的Serializable (可串行化)，但实际应用中出于性能方面的考虑很少会使用可串行化。四种隔离级别：
>
> ![](https://mmbiz.qpic.cn/mmbiz_png/UDxcwVqYKVicgbWABIjK6iaLicrIp1u5gDEjlWOr9uRSRZkkekjp65CALsfwF03bhTKGbOzZiaUibtyibJy5p7t0FCww/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
>
> 一般来说，隔离级别越低，系统开销越低，可支持的并发越高，但隔离性也越差。innodb默认可重复度RR隔离级别，加上间隙锁解决了脏读、不可重复读、幻读问题
>
> 一致性：是事务追求的最终目标：前面提到的原子性、持久性和隔离性，都是为了保证数据库状态的一致性。一致性是指事务执行结束后，数据库的完整性约束没有被破坏，事务执行的前后都是合法的数据状态。数据库的完整性约束包括但不限于：实体完整性（如行的主键存在且唯一）、列完整性（如字段的类型、大小、长度要符合要求）、外键约束、用户自定义完整性（如转账前后，两个账户余额的和应该不变）。
>
> 更多：[明明白白事务ACID](/互联网/数据层/明明白白事务ACID.md)、[03-mysql事务隔离](/互联网/数据层/mysql理论实战系列笔记/03-mysql事务隔离.md)、[08-事务到底是不是隔离的](/互联网/数据层/mysql理论实战系列笔记/08-事务到底是不是隔离的.md)
>
> 事务的文章有不少，其他的就不推荐了，先把这些弄懂，还是推荐丁奇老师的课，不贵还值得，有课程分销二维码，但我们是真诚推荐，就不贴了，搜索下就有丁奇老师的课。




<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489644&idx=1&sn=4696f3069a414bb1c590ef26c6bb7a37&chksm=9721845da0560d4bb76960640a254e820facd05ac5b6d7be3c0a1f422e69d975067a1e372ff9&scene=21#wechat_redirect" _target="blank" style="color:black;">SQL注入--盲注及报错注入</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>如果XPath_string的值不符合xpath的语法格式则会报错，报错信息会提示这个数据错误，所以我们就在这个参数里注入我们的返回数据结果</font></div></div></div>

> 在以前没有很多框架的年代，新手开发都会被告知注意SQL注入。对于SQL注入这样的词汇，和现在框架里常提到的依赖注入这样的词汇一样，很难让新手理解，老鸟们又喜欢总说一些高度抽象或概念化的词汇，又不进一步说明，让新手捉摸不透。文中介绍了布尔盲注、时间盲注等方式。
>
> 总之用户的输入是不可信的，永远记住这点，不论使用什么开发语言或工具场景，永远要对用户输入数据进行处理，才能进一步用于sql查询，当然现在大部分框架已经处理都很好了。

## 实例方案

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486219&idx=1&sn=f53a8c949660ae29750045155cf078ec&chksm=9721973aa0561e2ccc7db9187fbd595dfe4f6e6d3915132c2b7b4cddfe9d49b2c19ef86e99e8&scene=21#wechat_redirect" _target="blank" style="color:black;">mysql读写分离在项目实践中的应用，干货</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>工程背景介绍：我们开发了一个万能接口，用户通过这个接口中传入数据，我们拿到数据进行复杂的逻辑处理然后再将数据</font></div></div></div>


> 有人考虑的读写方案。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486664&idx=1&sn=6025ec6b513fa35ff536d39d0914c952&chksm=972190f9a05619ef03b7aec5d31977d46da742d778c23e8a36b956b109a9d80e4533cd07e426&scene=21#wechat_redirect" _target="blank" style="color:black;">数据库分库分表，何时分？怎样分？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一. 数据切分关系型数据库本身比较容易成为系统瓶颈，单机存储容量、连接数、处理能力都有限。当单表的数据量达到</font></div></div></div>

> 文章应该是java系的开发提供的，数据切分方式，切分带来的问题，及如何解决这些问题，什么时候去做切分，用案例来验证以上理论方案。理论同样适用于php。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486737&idx=2&sn=4204aea829812af7df8eeb1d13dcb7c3&chksm=97219120a05618365a3ee958f23d6a5a408aea2a56762f35dd5a70c66fd298d1560863f8461c&scene=21#wechat_redirect" _target="blank" style="color:black;">最易懂的数据库异地多活方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>前言随着业务发展越来越快，数据量越来越多，用户也越来越多，业务出现故障的几率也越来越大，而可用性是衡量一个系</font></div></div></div>

> 简单介绍了方案

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487251&idx=1&sn=e92636705d24e0c9b4d3f3cfb47c5c99&chksm=97219322a0561a344bd6d9677e59fcce9c87504bfa5e2279df5e97c058a5a4b678fedaac1bfd&scene=21#wechat_redirect" _target="blank" style="color:black;">详记一次MySQL千万级大表优化过程！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>使用阿里云rds for MySQL数据库（就是MySQL5.6版本），有个用户上网记录表6个月的数据量近2000万，保留最近一年的数据量达到4000万，查询速度极慢，日常卡死。</font></div></div></div>


> 前面作者通过折腾优化mysql的方案，罗列了很多mysql从设计到开发到优化每个环节要注意的一些细节知识点，基本可以在《高性能MySql》这本书里可以找到，或者简单阅读[高性能mysql笔记](/互联网/数据层/高性能mysql笔记.md)；文中第二种方案是作者考虑第三方能力更强可兼容mysql的数据库，如阿里云的POLARDB、oceanbase，腾讯云的DCDB等



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487178&idx=1&sn=00908c72ccd8ef088038619372373b81&chksm=972192fba0561bed7adaec0d62296da651e85997257294f14bf37dcaa95354c2ab9690c4ee68&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL百万级数据量分页查询方法及其优化</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>方法1: 直接使用数据库提供的SQL语句语句样式: MySQL中,可用如下方法</font></div></div></div>


> 这篇文章，推荐出来，不是因为他写的很好（虽然很好），而是想说我们获取知识的途径有二：实践和书本。百万数据量分页查询的解决方法就是通过索引及主键id条件快速定位、延迟关联查询方案，为什么呢什么原理？这个在很多mysql书籍，比如《高性能MySql》都有提及，或者简单阅读[高性能mysql笔记](/互联网/数据层/高性能mysql笔记.md)中：46、优化limit分页，而本文确实从实践中一步一步去摸索，没有谈到每次试验结论的原理，虽然精神可嘉，但行动不可取（可能作者是已经知道原理后，反推写的文章，我们打下自己的脸）。我们推荐可以从书本或前人经验获取的知识，不需要亲自从无到有学习（类似机器学习通过训练集得到原理公式，然后拟合测试集，但你有机器的GPU高速计算能力吗？）
>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487171&idx=1&sn=c1d3324e89f95e11a9e9b872ce4dc4c5&chksm=972192f2a0561be4ef55b440b3070ab737f29968481b518bfa824bf9e05740713789ae790a10&scene=21#wechat_redirect" _target="blank" style="color:black;">mysql亿级数据数据库优化方案测试-银行交易流水记录的查询</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>对MySQL的性能和亿级数据的处理方法思考，以及分库分表到底该如何做，在什么场景比较合适？</font></div></div></div>


> 作者不仅精神可嘉，实际行动很踏实，做了很多开发者平常能做但不敢想的事情，也验证了mysql千万及亿级数据库的各种可能性，毕竟这种经验在书本上很难找到，不像一些优化方案基本是板上钉钉再结合实际项目逻辑。
>
> 文中试验了亿级表的查询、索引查询、条件查询、小数据量查询、大数据量查询、插入数据，最后也考虑分表查询。总结出了一些结论，这些结论也都验证了mysql的一些原理：大数据表索引是要的，适合条件是可取的有用的，结果范围越大速度越慢，插入数据是要更新索引的从而影响写入速度，分表分库是降低数据库压力的一个大杀器


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486079&idx=1&sn=fc9921a6766e4e405e6d06ac909bbc23&chksm=9721964ea0561f5838bddf637324ec5bb5db364f9b02836b536bf9dd09f69b4fd97be063a922&scene=21#wechat_redirect" _target="blank" style="color:black;">性能优化：Mysql分表与分库使用场景以及设计方式</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>对于大型的互联网应用来说，数据库单表的记录行数可能达到千万级甚至是亿级</font></div></div></div>

>  这篇文章说了几个分库分表路由策略：(java都是用中间件，php还在手动写路由类)
> - 中间变量 = user_id % (分库数量 * 每个库的表数量)
> - 库 = 取整数 (中间变量 / 每个库的表数量)
> - 表 = 中间变量 % 每个库的表数量


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487688&idx=1&sn=0b4b6c4431b848ab349287c43e5d6271&chksm=97218cf9a05605ef147b06d37b8acea99c59c31538cadff9239fb08ceff3bee40719fb72f995&scene=21#wechat_redirect" _target="blank" style="color:black;">分库分表？如何做到永不迁移数据和避免热点？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、前言中大型项目中，一旦遇到数据量比较大，小伙伴应该都知道就应该对数据进行拆分了。有垂直和水平两种。垂直拆</font></div></div></div>

> 讲的更清晰的，方案更复杂一点的分库分表方案。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486856&idx=2&sn=5d7f15e39b69b9be76a4f5f6da1ed490&chksm=972191b9a05618af3bdff4fe5fddb0ac4895663915becbd35d50401167c6651cf3dd791d636c&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL 每秒 570000 的写入，如何实现？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一个朋友接到一个需求，从大数据平台收到一个数据写入在20亿+，需要快速地加载到MySQL</font></div></div></div>

> 前面有一篇文章的作者在一个表中写入1亿条数据，数据占用空间将近8G，20亿这个概念有点大，另外mysql官方及高性能MySql中提到表记录达到4、5千万没有问题，更简单的表且进一步优化可以达到1~2亿，这20亿单表没见过。




<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489786&idx=2&sn=38674f602369237fa333c6c1560a8bb0&chksm=972184cba0560dddcd0e93bd983bc29fa8cf64ae03707fb33ac22462320f900562e716662e01&scene=21#wechat_redirect" _target="blank" style="color:black;">一张900w的数据表，怎么把原先要花费17s执行的SQL优化到300ms？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一张900w的数据表，怎么把原先要花费17s执行的SQL优化到300ms？</font></div></div></div>

> 看来分页优化问题很热门。文中说的方法在高性能MySql中称为延迟关联。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487545&idx=1&sn=cc0313ed996cd830498ae0d2053f9657&chksm=97218c08a056051ea5b414f468949b7827f0db00f2b83d63cf0d2a1bc1be866101b03c7554c8&scene=21#wechat_redirect" _target="blank" style="color:black;">10分钟搞懂：亿级用户的分布式数据存储解决方案！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>以上为分布式数据库的部署方案</font></div></div></div>



## 面试知识点

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487889&idx=1&sn=efc8f346ebf507cd4134f6478f85aff6&chksm=97218da0a05604b6eaeeb6bb4a6e49d8d8329aaf4a81be15f63207640fa02f8b420856902969&scene=21#wechat_redirect" _target="blank" style="color:black;">超级全面的 MySQL 优化面试解析</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>超级全面的 MySQL 优化面试解析</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487012&idx=1&sn=266758f75929506963c45b6105466875&chksm=97219215a0561b033e317526d4bb2098dde5bbe280352d93e489913d1ed7ea7385d88c83a5bb&scene=21#wechat_redirect" _target="blank" style="color:black;">面试中那些经典的数据库问题总结</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、为什么用自增列作为主键1、如果我们定义了主键(PRIMARY KEY)，那么InnoDB会选择主键作为聚</font></div></div></div>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486873&idx=1&sn=8d1bfc6bcbb905d668791b32e9312d64&chksm=972191a8a05618be50e5da1b5555ec184f940150a03ec2e23cea978b9330441086329cdd63e2&scene=21#wechat_redirect" _target="blank" style="color:black;">一千行 MySQL 学习笔记</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHPer都需要学习的MySQL知识点</font></div></div></div>

> 适合mysql新手碎片时间看看，多看看，看几遍，心中有素，实践中适当应用，熟能生巧，不求完全记住，但求大概知道

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487610&idx=1&sn=fdb4c18754a436e80b51e1771bc4c5b1&chksm=97218c4ba056055d02b840e702f52f97c158335245f18a60317ff1a50473923edd6f4bd56126&scene=21#wechat_redirect" _target="blank" style="color:black;">MySQL 面试高频一百问</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>MySQL面试题目</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487041&idx=1&sn=4944729cace77cbb99fac6e382e38615&chksm=97219270a0561b665af88928322e1bfefc3b0db00cbd0ca29274008e7c2d2c7c520f1697b29d&scene=21#wechat_redirect" _target="blank" style="color:black;">面试经常问的 MySQL 四种隔离级别</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>什么是事务事务是应用程序中一系列严密的操作，所有操作必须成功完成，否则在每个操作中所作的所有更改都会被撤消。</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487208&idx=1&sn=9ec825b07c631fa4bd3772543fd098c1&chksm=972192d9a0561bcfc96b2a19c205bb908359656b2c7ddf1e2db0780294d3cecc29c12a2d6e31&scene=21#wechat_redirect" _target="blank" style="color:black;">面试官：给我说说你平时是如何优化MySQL的？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>#1、EXPLAIN做MySQL优化，我们要善用 EXPLAIN 查看SQL执行计划。下面来个简单的示例，标</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487292&idx=2&sn=2df2a7a412b9a44ff2e7d94ecae3108a&chksm=9721930da0561a1b4755881400c0d9864e3652c403a63036e944a86ecc8a17c3b728f8060903&scene=21#wechat_redirect" _target="blank" style="color:black;">经典面试题：如何保证缓存与数据库的双写一致性？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>只要用缓存，就可能会涉及到缓存与数据库双存储双写，你只要是双写，就一定会有数据一致性的问题，那么你如何解决一致性问题？</font></div></div></div>
