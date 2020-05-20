
<!-- TOC -->

- [EasySwoole](#easyswoole)
- [Hyperf](#hyperf)
- [Swoft](#swoft)
- [Swoole官方](#swoole官方)

<!-- /TOC -->


## EasySwoole

官网：https://www.easyswoole.com

EasySwoole是最早被人所知，也是因为EasySwoole等基于Swoole的框架不断冒出，逐步与Swoole打造了一个生态。

- 创始人很了不起，年轻的90后。[知乎](https://www.zhihu.com/people/ru-guo-de-ru-guo-36-89)
- [EasySwoole文档](https://www.easyswoole.com/Cn/Preface/introduction.html)，提供了足够简易的门槛，主要还是HTTP服务与Socket服务，让phper了解使用Swoole。

- 目前来说由于Swoole异步协程对于c扩展或composer包的完全兼容性兼容还需要一段路，且一些http服务常用的全局变量及session等信息，没有传统php-fpm框架完善，不建议成熟项目使用基于Swoole的HTTP服务，
- EasySwoole把Esay这点抓的很好，Easy不仅仅是要Easy的了解和使用Swoole，还要能Easy的使用第三方业务模块，这是开发者最喜欢的。EasySwoole提供了缓存、队列、redis组件、连接池、OSS客户端、JWT、Words-Match、Spider、Smtp等组件库、微信支付宝SDK接入等
- 微服务和分布式章节，简单描述微服务与分布式，给出了Rpc服务的注册、服务端、客户端代码，初学者难以看懂，可能因为这不是EasySwoole的重点或是因为没有讲清楚或是因为本身没有足够深入只是因为其他框架有
- 仅比对文档的话，相对于Swoft\Hyperf框架，EasySwoole的文档结构不属于正规军，文档语言典型的开发人员编写（其实谁写无所谓，只要有干货，但给老鸟的感觉是不够高大上，乔治喜欢高大上的东西，大家都喜欢高大上的东西）
- 2019年末2020年初，Swoole与EasySwoole两边有了些摩擦或误会，详见知乎[骑驴找马？可以，但请善待那头驴](https://zhuanlan.zhihu.com/p/103182712)、[放话删帖怎么办](https://zhuanlan.zhihu.com/p/103373502)、[为什么国内的开源项目很少有做大的？](https://zhuanlan.zhihu.com/p/103018763)，这些消息曝出，让Swoole生态蒙上一层阴影，明显利益分配不均，没有出现双赢，首先让在使用或想使用EasySwoole的phper担心EasySwoole是否会继续维护，是否能修复这些关系继续发展。

你会考虑EasySwoole吗？


## Hyperf

官网：https://hyperf.io

文档：https://hyperf.wiki/#/

坊间说Hyperf是从Swoft出来的分支（内部有人出来搞了Hyperf，理念大致，大致代码）

但，目前Hyperf受到Swoole官方的[商业支持](https://www.swoole-cloud.com/?from=hyperf.io)，或者说他们之间有协议

到这里自然我们都会想，为什么Swoole最后选择了Hyperf作为所谓的官方框架（虽然一开始说了，又删了，且引起不少框架的不满和争论），但个人觉得其中除了商业利益外，必定有一定原因的，比如是不是Swoole团队更认可Hyperf的理念、技术、发展路线等，方方面面和Swoole更契合？

- Hyperf目标是超高速、灵活性
- Hyperf对环境要求较高，>=php7.2,swoole>=4.4，php版本的要求，可能只有新项目或新团队才回去考虑
- Hyperf引入注解、依赖注入、事件机制、AOP等新方式
- 在HTTP服务方面依然会提供TP的一些基础功能、数据库模型。如果是纯HTTP服务，还是建议使用TP、Laravel、YII等成熟的传统MVC框架
- 个人觉得优势可能也是在[微服务](https://hyperf.wiki/#/zh-cn/microservice),在微服务的理解上更有深度也更有思路，对于大项目来说，除非你只有php技术栈，否则java、go都更能胜任这方面的处理
- Hyperf也提供了不少组件，比如redis、HTTP、ElasticSearch、websocket等
- 


你出于什么原因会考虑Hyperf？

## Swoft

官网：https://www.swoft.org/

文档：https://www.swoft.org/documents/v2/index.html

听说Swoft出来的时候，让很多phper觉得这就是他们想要的东西。让他们感觉php跻身于现代编程语言行列，而切换成本不高。（为什么phper会认为php不在现代编程语言行列呢？异步？多线程？协程？）




- 从文档来看，Swoft质量高于EasySwoole，略简于Hyperf，但仍然保证通俗易懂


但在2020年初的Swoole暗示Hyperf为官方指定框架，各Swoole框架与Swoole互怼事件，听说Swoft3.0不再考虑Swoole？

你会考虑Swoft吗？


## Swoole官方


- Swoole Plus

    类似于nginx也提供了ngxin plus，主要是在ngxin这个基本盘的基础上，增加一些安全性、性能方面、企业定制方面的功能。

    付费。

    Swoole需要通过变现，来维持、推广、优化开源项目

- Swoole Tracker

    https://business.swoole.com/tracker/index

    很不错的工具服务。

    监控和调试解决方案，同时支持 FPM/Swoole，监控方面实现是根据 Google 的先进链路追踪理论模型，同时得益于 Swoole 团队在 PHP 领域多年的积累做到了零性能损耗无侵入监控，能够准确的定位到出问题的哪行代码、类、函数等，实时将调用拓扑可视化呈现出来。结合 Web 远程调试器，可以方便的解决性能、内存泄漏、阻塞、卡死等常见问题。一键部署，极易运维，并且提供永久存储的免费 sass 版本（限 10w 条数据）。

    付费。
    


- Swoole Compiler


    Swoole Compiler是Swoole官方推出的PHP代码加密和客户端授权解决方案，通过业内先进的代码加密技术（流程混淆，花指令，变量混淆，函数名混淆，虚拟机保护技术，扁平化代码，sccp优化等）将PHP程序源代码编译为二进制指令，来保护您的源代码。

    付费。

    目前除了增zend guard以外，个人感觉靠谱的php源码加密方案

    这些工具服务要是开源的话，当然是phper的福音，显然现在还是要牛奶和面包的，不然连远方的诗歌都没得听。Swoole是否会有很大市场？毕竟连php开发者的公众号都在劝退phper转大数据开发。

----

2020 [@tsingchan](http://www.9ong.com)




