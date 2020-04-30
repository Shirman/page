<!-- TOC -->

- [PHP革新](#php革新)
- [微信生态相关技术](#微信生态相关技术)
- [阿里生态相关技术](#阿里生态相关技术)
- [电子商务相关](#电子商务相关)
- [时间日期](#时间日期)
- [基础实践](#基础实践)
- [其他第三方平台](#其他第三方平台)

<!-- /TOC -->

## PHP革新

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP 7革新与性能优化</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>有幸参与2015年的PHP技术峰会（PHPCON），听了鸟哥（惠新宸）的关于PHP7的新特性和性能优化的分享</font></div></div></div>

> php5.6跨版本到php7，在wordpress的比对测试中，PHP7对比PHP5.6，QPS提升了2.27倍，不说提升个50%大家就高兴的不得了，更何况是2倍以上

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP7带来了哪些重大的变革</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP7带来了哪些重大的变革</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP: 从PHP 5.6.x 移植到 PHP 7.0.x - Manual</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.php.net/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP: 从PHP 5.6.x 移植到 PHP 7.0.x - Manual</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP 7 新特性 | 菜鸟教程</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.runoob.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP 7 新特性 PHP 7+ 版本极大地改进了性能，在一些WordPress基准测试当中，性能可以达到PHP 5.6的3倍。 PHP 7+ 版本新加特性如下表所示：    序号 内容   1 PHP 标量类型与返回值类型声明   2  PHP NULL 合并运算符     3  PHP 太空船运算符（组合比较符）     4  PHP 常量数组     5  PHP 匿名类     6  PHP Closure::call()   ..</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP 8 能有多快？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP-8将于今年年底发布，其最令人期待的功能之一就是JIT编译。</font></div></div></div>

> php8最令人期待的应该就是JIT编译了，经过测试比对，php8在使用JIT编译情况下，比PHP7.4提升了45%左右的速度，我是很满意的。了解JIT编译详见：[理解JIT编译](http://www.9ong.com/#/互联网/知识点/理解JIT编译)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">2019 年 PHP 开发者调查报告（JetBrains版）</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>整理：PHP开发者（ID：phpDevs）最近知名 IDE 厂商 JetBrains 发布了 2019 年开</font></div></div></div>

> 根据调查到2020年，已经有至少85%的开发者使用php7.x版本
>
> 开发者常用的框架：Laravel、wordpress，显然中国的统计缺失，个人觉得ThinkPHP与CI应该还是有不少开发者在使用特别是TP
>
> 常用IDE：56%以上使用phpstorm，还有10+%的VSCode，除了VSCode个人还常用那个3%的NetBeans、VIM
> 
> 常用测试框架：phpunit
>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP过往及现在及变革</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>相信每一家成长中的公司多少都会经历以下事宜：解决方法：使用opcache缓冲转换后的代码，文件如果没有更新则</font></div></div></div>

> 这是一篇使劲吹Swoole的文章哈。更具体的可以阅读 [Swoole相关文章](swoole/README.md)

## 微信生态相关技术

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">微信公众号开发基本流程</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>过年前后做了个微信公众号项目，已经过去一段时间了，抽空回忆总结下基本流程吧，不然很快估计自己就忘了。。</font></div></div></div>

> 微信开发流程并不复杂，复杂的地方在于调试。该文章中提到的：测试账号的重要、开发环境的内网穿透比如使用netapp等，对于初学者要着重注意accessToken的理解和使用，基本上和微信服务器交互都需要accessToken，比如登录验证、支付、分享、公众号消息等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">微信H5支付接口如何申请？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信H5支付接口如何申请？</font></div></div></div>



> 基本所有和电商有关的产品，都会使用到微信的支付，微信支付有App、公众号H5、小程序支付相关接口（还有一种是移动端普通浏览器上的微信支付，比较少见）。至于文中提到的斑马支付，应该是广告，官网在百度关键词上也不是首页，信任度不高，目前最有名的聚合支付应该还是[ping++](https://www.pingxx.com/products.html)

个人之前收藏的官方开发文档，非微信H5支付比较少见，但那些产品只在微信生态体系下，且想把触角伸到微信生态外的，可以普通H5+非微信支付实现在非微信环境下的支付：

公众号H5支付：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=3_1

App支付：https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1

企业支付：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1

非微信H5支付：https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP是如何实现微信H5支付的？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>开发前配置进行代码接入前，需在微信后台填写授权回调域名，此域名必须经过ICP备案</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP与微信公众号支付</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例讲述了PHP与微信支付，在公众号支付的功能，接入Api是很简单的</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">微信小程序支付完整示例，可学习参考下</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例为大家分享了php实现小程序支付的具体代码，供大家参考，具体内容如下环境</font></div></div></div>

> 微信支付，都是先生成统一订单，发起支付，支付回调，商品发放
>
> 注意：订单号、验签、价格单位、主动请求微信服务器确认支付成功

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现微信提现功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>提现必须得用双向证书、所以大家一定要在微信的商户平台找到相应的地方去设置、因为我做这个提现已经有一段时间了、</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">微信企业付款到个人用户提现功能实现</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1.基本配置//公众账号appid $data[\x26quot;mch_appid\x26quot;] = \x26#39;appid\x26#39;;//商户号</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现微信企业付款到个人零钱步骤</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信支付企业付款到零钱功能应用广泛，比如微信红包奖励，业务结算等。通过企业向个人付款，付款资金将直接进入用户</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP微信商户支付企业付款到零钱功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信支付企业付款到零钱功能应用广泛，比如微信红包奖励，业务结算等。通过企业向个人付款，付款资金将直接进入用户</font></div></div></div>

> 这些提现，都是企业支付，企业支付：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1 ，企业支付才支持提现
>
> 注意：双向证书（退款也是）、商户余额判断（事务+锁+提现申请+频率限制，避免被恶意提现）、微信提现规范限制、价格单位


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现微信申请退款流程与实例，你会了嘛</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>当然网上可能也有很多大神自己重写和封装了demo，或许更加好用简洁，但是我还是不提倡用</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">微信小程序支付及退款流程详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信小程序支付的主要逻辑集中在后端，前端只需携带支付所需的数据请求后端接口然后根据返回结果做相应成功失败处理</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">php如何实现微信小程序支付及退款</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信小程序支付</font></div></div></div>

> 前面的文章已经介绍了好多微信支付，这里着重推荐退款操作。
>
> 退款注意事项：退款可信（事务+锁+退款申请+频率限制，避免恶意退款），主动查询退款可信、双向证书、商户订单号、交易流水号、单位、用户id、退款超时、及微信可能要求多久的订单号才允许退款

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">微信支付对账，你是如何处理的？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>做支付对账，即检查第三方支付与数据库中账单是否一一对应，涉及到微信对账单的处理，成功时，微信账单接口返回数据</font></div></div></div>

> 有了支付，项目越大，企业财务需要对业务流水进行对账。一般是要求研发提供业务系统的支付流水账单，财务到财付通得到微信提供的相应账户的账单，通过Excel或python进行对账。这里介绍了微信对账单接口使用，返回有具体流水数据和统计信息，通过业务加工可以实现每日自动对账。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP后台实现用微信小程序登录，可学习下</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>这篇文章主要为大家详细介绍了PHP后台实现微信小程序登录，具有一定的参考价值，感兴趣的小伙伴们可以参考一下微</font></div></div></div>

> 理解微信（第三方平台Oauth）用户体系验证逻辑（时序图）比较重要，思想理解了，剩下就是技术方法了，参考官方文档即可.
>
> 小程序的用户体系可能会有一点差异，但万变不离其中。
>
> 注意：第一次登录、二次登录、业务session或token处理（可以用session机制，也可以使用JWT的方式）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">ⓟⓗⓟ实现微信小程序人脸识别刷脸登录</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>首先我们先确认我们的百度云人脸库里已经上传了我们的个人信息照片然后我们在后台写刷脸登陆的接口login我们要</font></div></div></div>

> 人工智能应用已经很成熟（并不是说很厉害了哈，但在声音、视觉、图片领域解决很多普通应用计算解决不了的问题）。对于php来说，由于各方面的原因，php并不能直接参与机器学习甚至深度学习等人工智能方面的计算，只能在业务层面去调用第三方API或模型才能实现输入=>智能输出的效果。本文介绍了微信小程序结合百度AI人脸库实现刷脸登录，如果没有业务后端的登录，都可以不需要php参与。


## 阿里生态相关技术

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">php与阿里云短信接口接入</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php与阿里云短信接口接入</font></div></div></div>

> 阿里大于，可以二次封装，让使用更轻松更友好。该文章可能是只需要一个模板，我们还可以封装更多模板，让团队其他短信功能使用更方便。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP执行支付宝支付订单</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>正文内容先来个效果图做这个支付宝支付我总共用到了三个控制器：1：支付宝支付控制器。2：支付宝支付配置参数控制</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现支付宝支付，退款，回调</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1.首先你要加载你的支付宝配置项 include(\x26#39;alipay/aop/AopClient.php\x26#39;);</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP是如何实现单笔转账到支付宝，参考下步骤</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例为大家分享了php实现单笔转账到支付宝的具体代码，供大家参考，具体内容如下：1.首先 去蚂蚁金服签约</font></div></div></div>

> 支付宝支付原理与微信支付大体原理是类似，只有在部分技术细节及参数和平台有关，当然支付还是坚持严谨，不论是单位、二次确认、事务、锁、频率等繁琐的细节，都不能少，毕竟涉及钱的问题，再小的隐患都是大隐患。尽量让更多技术开发参与逻辑评估，或者公司内部形成统一的php支付sdk

## 电子商务相关

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP后端银联支付及退款实例代码</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>近期遇到银联支付以及相关退款(此文仅以手机控件支付作为前提)操作，下面会依次写出期间遇到的问题以及基本流程，</font></div></div></div>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP打造智能识别收货地址信息</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>功能需求：用户输入混合的收货地址，能智能识别出地址，手机，姓名</font></div></div></div>

> 类电商系统都会用都地址模块，也都会碰到智能识别收货地址问题，或说是校正地址问题。该文的整体思路建立在字符串处理（匹配），之前实现过类似的地址校正问题，效果还行，但不能说是智能。期待机器学习式的智能地址识别模型。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">实现电子商务的订单拆单思路，可深入参考</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>拆分订单服务是为了适应不同商品、库区及灵活的发货方式，我们将对订单状况进行更加细致的跟踪。</font></div></div></div>

> 拆单逻辑挺清晰的，我们曾经也遇到类似问题，也能理出拆单的逻辑，但主要瓶颈在于拆单前快递费用如何精确计算，考虑不同商家、不同仓库、不同重量、不同快递商，这些因素只有在拆单后才能确定，有点像薛定谔的猫，只有打开盒子才知道猫是活的还是死的。这个问题有一种方案是通过数学的近似求解来处理（可能部分用户会存在不满，因为不精确），

## 时间日期

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">经常用到的PHP时间类完整实例，可直接用</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>最近开发中，经常用到时间的一些例子，比如昨天，今天，前天，近七天，一周等等。这里整理了一个时间的完整类实例，</font></div></div></div>

> php的date函数很强大的，我们也都很喜欢用，基本不会去记太多参数配置，常用的记住就可，不用过度封装，除非重复代码多。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP时间戳和日期相互转换操作总结</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在php中我们要把时间戳转换日期可以直接使用date函数来实现，如果要把日期转换成时间戳可以使用strtot</font></div></div></div>

> 常用的可能就是xx分钟前，xx小时前，xx小时后，xx天后等这种需要稍微思考下才能写出来的代码。除非经常使用，不然很难一直记住使用方式，毕竟php的函数参数很多都不是很自然，有点牵强的的方式，但能用的程度。




## 基础实践

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现智能语音播报</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>有兴趣的童鞋可以买个类似树莓派这样的低功耗设备去运行。</font></div></div></div>

> 语音播报，php自身很难做到的，还是需要外部接口，比如百度语音接口、科大讯飞语音接口等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP简单实现“相关文章推荐”功能的方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>摘要：通常在做内容网站的时候,需要在每一篇文章中出现与该文章相关的文章列表。对于大多数人来说,使用的方法通常</font></div></div></div>

> 如果在10年前，你看这篇文章会觉得还有点意思，现在看到标题你以为是机器学习实现的文章推荐。这篇文章主要借用similar_text函数实现标题字样相近判断，简单粗暴，并不是从文章语义、分类、用户等维度判断，应用场景不大。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">简单聊聊PHP下的截断问题</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>简单聊聊PHP下的截断问题</font></div></div></div>

> 大部分情况，大部分开发者不会遇到这些奇葩的问题。但经常会忽略编码（UTF-8、GB2312、GBK）问题，导致字符串截断出现乱码的情况，这个是很经常出现的哦，比如mb_substr、mb_strcut等函数，都有个encoding的参数，这个参数的默认值在多个php版本上是在配置中声明的，如果服务器上php的配置你不清楚的，最好每次都给函数补充明确的编码。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">关于怎样实现楼中楼的评论系统具体操作</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>关于怎样实现楼中楼的评论系统具体操作</font></div></div></div>

> 知乎采用了楼中楼的回复方式，但用的不舒服，在我们使用的应用中，发现体育论坛虎扑的楼中楼回复做的很舒服（套中套），还有点亮的亮点功能，虎扑的回复结合了原来回复当成一层楼，也能点开[回复]查看所有回复，并允许递归深度查看回复，逻辑清晰，层级清楚，界面简洁，数据设计清晰明白简单。楼中楼回复在前端实现，有一种是楼中楼回复嵌套展开，这对前端实现和后端取数据有一定难度，如果这种成虎扑的这种方式，前端回复仍然是列表展示，不存在递归嵌套展示，多了个【查看回复】按钮，设计一个回复的回复列表（依然是回复列表的子列表设计），一层层

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP与反ajax推送，实现的消息实时推送功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例讲述了PHP实现的消息实时推送功能。分享给大家供大家参考，具体如下：入口文件index.html\x26lt;!</font></div></div></div>

> ajax的短连接通过php的死循环（while true）模拟长连接方式。长连接的实现，现在很成熟了，有workerman，还有swoole等，如果实在需要简单近似长连接的实现，可以参考微信二维码扫码验证的方式：前端ajax轮询方式，补充异常或一定规则下自动停止轮询，并提供手动再次轮询的方式，相对简单

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">php实现的SSO单点登录系统接入功能示例分析</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>点击上面关注我关注我哟小编 隔天推送php教程，php技巧，php视频教程，MySQL，笔试题等诸多优质内容</font></div></div></div>

> 这篇文章简单介绍了公司内部业务系统的SSO实现。关于SSO策略参考：[单点登录策略](../解决方案/单点登录策略.md)，有三种情况，1：同公司同域名下，一般采用cookie方式的JWT；2：同公司不同域名，CAS一般提供一个公共的用户体系，业务服务端向CAS服务器请求ticket，并通过业务客户端向CAS服务器验证ticket；3：不同公司不同域名，我们常见的有微信、QQ、微博等基于OAuth的授权方式。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">关于PHP实现读取一个1G的文件大小操作</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>关于PHP实现读取一个1G的文件大小操作</font></div></div></div>

> 该文章在没有迭代器的php版本里，只能通过其他取巧的方式实现内存低消耗快速的实现方式。但我们更想要的是在php里就把他实现了。
>
> python在处理大文件方面就是使用迭代器的方式实现，php的实现参考：[通俗易懂PHP迭代生成器](通俗易懂PHP迭代生成器.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP会员找回密码功能的简单实现</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP会员找回密码功能的简单实现</font></div></div></div>

> 找回密码是一个拥有用户体系产品必不可少的一个功能。有多种实现方式，比如发送邮件重置密码、发送短信验证码重新设置密码。
>
> 发邮件注意事项：邮件发送格式、重置密码链接、token验证、重置密码界面及安全，相对短信来说复杂了些，但免费。（越来越多产品只考虑手机号、巨头产品用户体系如微信、微博、头条、钉钉）
>
> 发送短信验证码：短信费用考虑、短信攻击（图形验证码、频率、ip限制、用户限制、第三方智能验证），相对简单有效，但有费用


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP生成短网址方法汇总</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>文章来自：脚本之家http://www.jb51.net/article/88436.htm正常的网址带上参</font></div></div></div>

> 移动互联网时代，短网址很流行，2020年了，百度短网址已经不再免费供应，其他靠谱的大平台的免费短网址也不再那么容易找到。
> 
> 公司内部产品多的话，可以考虑实现简易的短网址服务，提供短网址接口
>
> 简单来说是表url地址映射。生成地址：一个id对应一个url地址，生成短地址（id根据一定规则转换成字符串，比如自定义36的进制）；解析地址：根据规则解析地址为id，通过id到数据库表中查询到原地址。当然表会越来越大，可以考虑分表（根据域名进行一定转换取首字母）智能分配到不同表中，这里就要考虑解析时如何找到是哪个分表中的id。
> 
> 这种简单的表（id，url），mysql5.6至少可以支持4千万条，且查询依然很快（一条记录），毕竟是主键索引树查询

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现IP访问限制及提交次数的方法详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、原理提交次数是肯定要往数据库里写次数这个数据的，比如用户登陆，当用户出错时就忘数据库写入出错次数1，并且</font></div></div></div>

> 这篇文章，只是一个思路，但实际并不会使用数据库。
>
> 哪些场景会使用到限制ip呢？高并发（秒杀、抽奖、投票、抢购、恶意请求如验证）场景
>
> 数据库因为需要额外的连接消耗且是硬盘操作，效率肯定不如内存级别的存储，比如memcache、redis，建议可以使用redis，支持秒级、自动过期、快速读写、单线程、分布式。
>
> 限制ip，除非是恶意程度严重，否则容易误伤正常用户，所以如果设计中，有必要要求用户登录才可操作，通过限制用户来得更精确。而且方便后续验证是否僵尸、恶意用户，进行用户限制



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">Swool案例介绍</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>今天小编向大家普及一下，采用swoole框架的一些 用户和案例半次元 半次元：t 半次元是国内第一中文COS</font></div></div></div>

> 这篇文章介绍的是一些采用Swoole的案例，而不是使用php读取和解析大文件实战。
>
> YY语音部门内多款移动APP使用swoole作为底层框架，实现了手机客户端与服务器段长连接，直接通信的模式。大大提升了移动网络下应用程序的用户体验。
>
> 另外部门内部的数据统计监控平台，实时日志上报和实时推送，爬虫引擎都是基于swoole的。是因为韩天峰大佬在YY语音主导的项目？
>
> 通过这些案例都是早几年的Swoole的应用，特别是在实时推送、日志上报，php也有自己的不错的库（workerman虽然更成熟些，但是基于php实现）。现如今swoole4.x已经不仅仅局限于长连接，还提供了协程异步、高性能网络通信，可以方便快速的实现 TCP/UDP服务、高性能Web、WebSocket服务、物联网、实时通讯、游戏、微服务等，使 PHP 不再局限于传统的 Web 领域。[查看更多Swoole入门信息](swoole/README.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">【PHP】PHP实时生成并下载超大数据量的EXCEL文件</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>由于用户量较大，经常会有导出50万加数据的情况。而常用的PHPexcel包需要把所有数据拿到后才能生</font></div></div></div>

> 从数据库中按page读取数据，实时写入php的output输出流（php://output），再通过ob输出给web浏览器。解决了大数据表格输出占用大内存的问题。
> 
> 当然大数据下载，面临php的长时间连接带来的风险，建议：如果是外部用户下载，提供一个专门冷数据查询或下载的备库；建议严格限制用户访问频率及合法性；另外大数据，特别是日志类的数据表往往都很大，如果一直翻页查询，越往后速度越慢，文章作者最后提到了如何优化的问题，虽然是个细节，却是大部分开发者需要学习的地方，细节往往决定成败，作者利用B+树的原理，补充lastid进行查询，保证sql语句利用了主键索引树。参考：[高性能mysql笔记](../数据层/高性能mysql笔记.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP环境安全加固方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1.启用 PHP 的安全模式PHP 环境提供的安全模式是一个非常重要的内嵌安全机制，PHP 安全模式能有效控</font></div></div></div>

> 大部分在php7之后都得到调整或废弃了。当然如果版本还低的可以参考调整设置，在不影响业务的情况下。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">用PHP屏蔽关键字，敏感词，你用哪些方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在文章评论，分享内容中有时候会遇到屏蔽敏感词，关键字等之类的</font></div></div></div>

> 在2020年看，这两个方案（词库正则匹配与词库循环匹配）都是小打小闹，只能是有局限的使用。当然要自己设计一套敏感词方案（如微信公众号后台敏感词）确实不容易，首先要有个基础敏感词库，其次还需要一个支持自动与手动增删改敏感词的服务，再次有个高效检测敏感算法机制。
>
> 当然用钱也是解决的，比如微信、网易、阿里云、七牛等各种平台都会提供敏感词检测、鉴图等有偿服务

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP与视频播放插件功能实现，其实很简单</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php与视频播放器插件的功能，说白了就是前端是播放器的插件，直接调用后端传递过来的播放地址</font></div></div></div>

> 这篇文章简单易懂的告诉我们视频播放的整体思路。前端负责播放器的插件初始化及运行；后端负责播放数据信息的封装，比如封面图面，名称，播放时间，视频地址等等。
>
> 现在流行直播（当然很多也都是录播视频而已），视频播放在技术上仍然不变动，只是直播会有直播源地址及相关信息，业务端只要调用平台方的直播数据即可。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP非递归遍历目录下所有文件，可以试一下！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>上干货，直接看代码\x26lt;?php /** * PHP 非递归实现查询该目录下所有文件 * @param unkn</font></div></div></div>

> 作者并不是说递归有问题，而是作者的专研精神，告诉我们非递归也可以很自然很好理解遍历多层目录的实现方式。非递归方式更符合人类第一个遍历目录的想法，递归是经过论证积累下的抽象的优秀算法（代码更简洁）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP基于Token的身份验证的方法，可参考学习下</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP在控制器中怎么添加token验证//获得token</font></div></div></div>

> 这篇文章介绍了表单提交增加token验证，为了防止外站提交、重复提交、双击提交问题。重复提交、双击提交这种正常用户的异常操作能得到限制，但除了正常用户（君子），黑客（小人）就难防了。目前ajax请求模拟、表单提交也能模拟，不信你看那些公众号聚合编辑器、爬虫等，我们曾经使用自定义浏览器内核可以模拟各种http提交请求（不论是ajax、表单、特殊body、cookie限制、csrf、token等），现在有了机器学习，甚至图片验证码也不是问题；甚至普通浏览器上也可以通过油猴插件+自定义js脚本也能达到模拟提交表单等能力。
>
> 这里要说的是，用户输入都是不靠谱的（提交数据），所以后端一定要做好各种校验与限制。（当然你觉得你们的产品将来会是个大项目，或者你觉得你们的产品值得黑客来黑的时候，比如提现、退款、红包等和金钱过得去的功能）


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP RBAC权限控制实现思路，你会了吗</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>什么是RBAC基于角色的访问控制（Role-Based Access Control)</font></div></div></div>

> RBAC，基于角色的访问控制，大部分成熟的php框架里都会带有差不多的RBAC模块，其实我们更喜欢独立的RBAC模块，允许通过composer安装（涉及到数据层设计）。
>
> RBAC很重要的概念：管理员（用户）、角色、权限，管理员只能是一种角色，一种角色对应一套权限配置。
>
> 用户（管理员）访问时，根据角色判断是否用户对应的操作权限。
> 
> 权限粒度：有的系统按模块粗略分（财务、营销...），有的系统按操作细分（增删改查等每个按钮点击操作）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP代码审计，你会吗？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>代码审核，是对应用程序源代码进行系统性检查的工作。它的目的是为了找到并且修复</font></div></div></div>

> 这个很考验经验，没有多年经验，想不出来，甚至看了也察觉不出大部分门道来；当然不同php版本也会有不同的潜在风险问题，这是一个发展性问题，其实IDE完全可以实现这方面的初步审核，不需要使用第三方安全审核工具才能及时纠正，当然现在很多IDE也能建议一些有效的方案了，但还是会有很多潜在风险是没有识别，至少可以全面检查项目代码后，给出潜在风险列表，由开发人员二次判断及纠正（毕竟php门槛低，部分开发者水平暂时还是很低的，性能和安全方面完全不考虑，需要一个有经验的一线实战技术管理人员进行代码审核）
>
> 我们以前都会养成一个习惯，每天早上都会把SVN或GIT的提交记录大致过一遍，一方面可以学习别人好的编码及思路，另一方面可以帮助发现模块代码存在风险问题。如果有时间的话，这是技术负责人解项目各个成员的编码情况是一个不错的直观方式，当然审核代码还是需要一些工具，才能提高效率。参考：[php代码审计](../测试/PHP代码审计.md) 及 [代码审查方式](../测试/代码审核.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP路由技术的原理与实践</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>用户通过指定的URL范式对后台进行访问，URL路由处理类进行处理后，转发到逻辑处理类，逻辑处理类将请求结果返</font></div></div></div>

> 初学php框架的开发可以了解下，虽然你们看框架源码也能看懂。
>
> 这边要注意的是：普通模式和PATHINFO模式
> 
> 多年php开发人员都知道php的处理本质就是字符串处理。把字符串玩出花来。2020年了，我们会发现编程并不仅仅是字符串的处理，还有数学公式的处理，你看python，你看机器学习，你看大数据处理

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP随机生成中国人姓名的类</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP随机生成中国人姓名的类</font></div></div></div>

> 没有很特殊的算法，只是这个取名想想有趣，给小孩取名是最有趣的，赶紧去找个女朋友吧，工程师们，然后准备给孩子取名。没结婚前我们也为孩子准备了两个名字，一男一女，但当有了孩子，我们还是另外取了哈，毕竟时代在发展，不能是6、70年代的建国、建设等，不是80的张伟、李娜，不是90、00后的子萱、梓萱、子璇、子涵等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP实现打印出库单，有没有实现过?</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>有时候你在实现一个出库订单之类的功能模块，这里也有可能要你的站点也实现相应的打印出库单预览，今天给大家分享用</font></div></div></div>

> 有涉及到电商的项目，在出库的时候，需要打印拣货清单、出库清单之类，这是一个范例。如果是对接阿里系电商的可以，考虑菜鸟网络的打印组件，可以满足所有快递单打印，还支持自定义表单打印。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP模拟浏览器访问，抓取非本地文件的几种方法【爬虫】</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在做一些天气预报或者RSS订阅的程序时，往往需要抓取非本地文件，一般情况下都是利用php模拟浏览器的访问，通</font></div></div></div>

> 这文章内容简约到你可以不用看，除非你是初学者，想知道一些过去的实现方式。
>
> 模拟请求我们建议使用：[guzzle](https://github.com/guzzle/guzzle)，swoole类框架会建议使用guzzle，因为协程异步；
>
> 爬虫我们建议python。php爬虫，我们建议：[querylist](https://www.querylist.cc)，一个挺优雅的库，当然他用了guzzle


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">ⓟⓗⓟ使用文件锁解决高并发问题示例</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>涉及抢购、秒杀、抽奖、抢票等活动时，为了避免超卖，那么库存数量是有限的，但是如果同时下单人数超过了库存数量，</font></div></div></div>

> 这篇文章从文件锁示例讲起，介绍了mysql的悲观锁、乐观锁，再通过两个锁，延伸到文件锁的阻塞与非阻塞模式，最后引出分布集群及redis实现锁机制。悲观锁实践参考：[悲观锁实践](../数据层/悲观锁实践.md)
>
> 属于示例、思路。更复杂精细的高并发设计参考：[设计一个秒杀系统](../解决方案/设计一个秒杀系统.md)



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP 的闭包说明和应用实例</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>说到闭包，就不得不说一下匿名函数。匿名函数是没有名称的函数，可以赋值给变量，本身作为参数传递在函数之间，可以</font></div></div></div>


> 闭包，可能前端js开发更经常听到，在php中也有闭包的概念（php真的是，模仿C，不错过JAVA，学点JS，python这么火，能学点吗）。
>
> 闭包，有点抽象，如果你把他看成匿名的回调函数，可能比较好理解些，比如文中addRoute方法中第二个参数$routeCallback是一个闭包函数。如果你熟知js的闭包，那你能瞬间理解。
> 
> 虽然js中闭包使用广泛，但php中并不怎么使用，一来效率不足，没法缓存opcode，每次都要动态解释，也许php8就能解决，而来函数是一次性的，不能重用


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">PHP发送邮件</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Tomcat 服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器</font></div></div></div>

> 该文介绍了邮箱邮件的一些基本概念。当然php的话，要快速使用邮件组件，文中提到的phpmailer、swift mailer都是比较顺手的适合现代的实现方式，不需要自己准备邮件需要的相关东西，只要知道邮箱地址、对应smtp地址与端口

















## 其他第三方平台

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">用PHP调用微博接口实现微博登录，可参考学习下！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在平时项目开发过程中，除了注册本网站账号进行登录之外，还可以调用第三方接口进行登录网站。这里以微博登录为例。</font></div></div></div>

> 老调重弹的第三方平台登录。














