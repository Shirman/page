<!-- TOC -->

- [前言](#前言)
- [PHP革新](#php革新)
- [微信生态相关技术](#微信生态相关技术)
- [阿里生态相关技术](#阿里生态相关技术)
- [电子商务相关](#电子商务相关)
- [时间日期](#时间日期)
- [基础实践](#基础实践)
- [瞎谈PHP](#瞎谈php)
- [面试相关](#面试相关)
- [小结](#小结)
- [其他](#其他)

<!-- /TOC -->

## 前言

php已经成年好多年，虽然php5之后的版本还年轻，但各种解决方案还是层出不穷，看到一篇文章（四年精华PHP技术文合集-杂文篇），本着空闲时每一篇看看，备注点我们个人的一些经验总结，毕竟有些文章是旧文章，有些技术有更新有不一样，分享给新手php开发们。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="undefined" _target="blank" style="color:black;">四年精华PHP技术文合集——杂文篇</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP是在服务端执行的脚本语言，也是最有争议性语言。</font></div></div></div>



## PHP革新

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247484118&idx=3&sn=b959b0e7f455c16ac38fbb65a2bec940&chksm=97219ee7a05617f155be994c32cdd64e69b63953bb589836a02b6732b5256c4287969d5cc17c&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP 7革新与性能优化</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>有幸参与2015年的PHP技术峰会（PHPCON），听了鸟哥（惠新宸）的关于PHP7的新特性和性能优化的分享</font></div></div></div>

> php5.6跨版本到php7，在wordpress的比对测试中，PHP7对比PHP5.6，QPS提升了2.27倍，不说提升个50%大家就高兴的不得了，更何况是2倍以上

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486894&idx=2&sn=91996bf30bc097f7ebe71f690d454175&chksm=9721919fa0561889a2f73127addef1970806e1487942501cc7971b2f8d53edccd473de098057&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP7带来了哪些重大的变革</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP7带来了哪些重大的变革</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://www.php.net/manual/zh/migration70.php" _target="blank" style="color:black;">PHP: 从PHP 5.6.x 移植到 PHP 7.0.x - Manual</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.php.net/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP: 从PHP 5.6.x 移植到 PHP 7.0.x - Manual</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://www.runoob.com/php/php7-new-features.html" _target="blank" style="color:black;">PHP 7 新特性 | 菜鸟教程</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.runoob.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP 7 新特性 PHP 7+ 版本极大地改进了性能，在一些WordPress基准测试当中，性能可以达到PHP 5.6的3倍。 PHP 7+ 版本新加特性如下表所示：    序号 内容   1 PHP 标量类型与返回值类型声明   2  PHP NULL 合并运算符     3  PHP 太空船运算符（组合比较符）     4  PHP 常量数组     5  PHP 匿名类     6  PHP Closure::call()   ..</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489418&idx=1&sn=131bc535c85846419c06d8b6ae00bd08&chksm=97218bbba05602ad140d842b82debcb07c7327439787ddc01cc3ac0dc6dce1e2ea5a1ec5c6c1&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP 8 能有多快？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP-8将于今年年底发布，其最令人期待的功能之一就是JIT编译。</font></div></div></div>

> php8最令人期待的应该就是JIT编译了，经过测试比对，php8在使用JIT编译情况下，比PHP7.4提升了45%左右的速度，很满意的。了解JIT编译详见：[理解JIT编译](http://www.9ong.com/#/互联网/知识点/理解JIT编译)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487369&idx=2&sn=3cdc5c2095c932a8ceb9112e8d327254&chksm=972193b8a0561aae47a243742ab4cc9a5638f21db0ead7366199d93d9404a61e8f758c0e89c2&scene=21#wechat_redirect" _target="blank" style="color:black;">2019 年 PHP 开发者调查报告（JetBrains版）</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>整理：PHP开发者（ID：phpDevs）最近知名 IDE 厂商 JetBrains 发布了 2019 年开</font></div></div></div>

> 根据调查到2020年，已经有至少85%的开发者使用php7.x版本
>
> 开发者常用的框架：Laravel、wordpress，显然中国的统计缺失，个人觉得ThinkPHP与CI应该还是有不少开发者在使用特别是TP
>
> 常用IDE：56%以上使用phpstorm，还有10+%的VSCode，除了VSCode个人还常用那个3%的NetBeans、VIM
> 
> 常用测试框架：phpunit
>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247484325&idx=2&sn=ad63f96e46504bfce7d7837db373b101&chksm=97219f94a0561682090a1cc85f67f7bb469572085ab31a74422cb53896afa0b22b14211aa96b&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP过往及现在及变革</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>相信每一家成长中的公司多少都会经历以下事宜：解决方法：使用opcache缓冲转换后的代码，文件如果没有更新则</font></div></div></div>

> 这是一篇使劲吹Swoole的文章哈。更具体的可以阅读 [Swoole相关文章](swoole/README.md)

## 微信生态相关技术

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489256&idx=1&sn=c719d3f9b68740e10a29885a0763b60f&chksm=97218ad9a05603cff23a67b1c76a04d06a05c00e0169ff45af450964e81bb6a4c8cb0b3ad245&scene=21#wechat_redirect" _target="blank" style="color:black;">微信公众号开发基本流程</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>过年前后做了个微信公众号项目，已经过去一段时间了，抽空回忆总结下基本流程吧，不然很快估计自己就忘了。。</font></div></div></div>

> 微信开发流程并不复杂，复杂的地方在于调试。该文章中提到的：测试账号的重要、开发环境的内网穿透比如使用netapp等，对于初学者要着重注意accessToken的理解和使用，基本上和微信服务器交互都需要accessToken，比如登录验证、支付、分享、公众号消息等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485911&idx=2&sn=8ceb40ce064702210c9462837b48577d&chksm=972195e6a0561cf076f0550f9e1d15887051f5ae9e6a0ef40db1c3d173ca9f654a143baf14ee&scene=21#wechat_redirect" _target="blank" style="color:black;">微信H5支付接口如何申请？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信H5支付接口如何申请？</font></div></div></div>



> 基本所有和电商有关的产品，都会使用到微信的支付，微信支付有App、公众号H5、小程序支付相关接口（还有一种是移动端普通浏览器上的微信支付，比较少见）。至于文中提到的斑马支付，应该是广告，官网在百度关键词上也不是首页，信任度不高，目前最有名的聚合支付应该还是[ping++](https://www.pingxx.com/products.html)

个人之前收藏的官方开发文档，非微信H5支付比较少见，但那些产品只在微信生态体系下，且想把触角伸到微信生态外的，可以普通H5+非微信支付实现在非微信环境下的支付：

公众号H5支付：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=3_1

App支付：https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1

企业支付：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1

非微信H5支付：https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487012&idx=2&sn=669cd7d5cf2d91f8c111257c5966dc3c&chksm=97219215a0561b035c37080ef1c9448c286638b9d3fe5c27e13feeca2aa3e4ea58443a2429a3&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP是如何实现微信H5支付的？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>开发前配置进行代码接入前，需在微信后台填写授权回调域名，此域名必须经过ICP备案</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486962&idx=2&sn=6596936d061c43dcc3c2ce40903d3e3e&chksm=972191c3a05618d5d2bdf19a1228dc66d2e521485496455f76cfcfd4d556f2bca8e1ddfc0eb7&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP与微信公众号支付</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例讲述了PHP与微信支付，在公众号支付的功能，接入Api是很简单的</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486299&idx=1&sn=ba052a523b4a473f00c147a1d493d2be&chksm=9721976aa0561e7c6001aae2c7705ed3fa7278f4ce5b94d9d917a483f8efaab66b70b709bd82&scene=21#wechat_redirect" _target="blank" style="color:black;">微信小程序支付完整示例，可学习参考下</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例为大家分享了php实现小程序支付的具体代码，供大家参考，具体内容如下环境</font></div></div></div>

> 微信支付，都是先生成统一订单，发起支付，支付回调，商品发放
>
> 注意：订单号、验签、价格单位、主动请求微信服务器确认支付成功

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487041&idx=2&sn=ae6c498b831d3a169f4c81d6bba2e29b&chksm=97219270a0561b66883829e33100547625a7d5164f8ed65e93c76c59b354428b3a9d4d81f58d&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现微信提现功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>提现必须得用双向证书、所以大家一定要在微信的商户平台找到相应的地方去设置、因为我做这个提现已经有一段时间了、</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486408&idx=1&sn=62436ada6c9e24a556123e15d43846f8&chksm=972197f9a0561eef571bfef1155987c5de695025040ecdba35c8461ed5bc1412e1dbbdeedb3e&scene=21#wechat_redirect" _target="blank" style="color:black;">微信企业付款到个人用户提现功能实现</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1.基本配置//公众账号appid $data[\x26quot;mch_appid\x26quot;] = \x26#39;appid\x26#39;;//商户号</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487125&idx=1&sn=830f2be6a10468a950bd68753a725047&chksm=972192a4a0561bb27ad5895f425bd23c9c9bd95ede9e7f056092af851b3f75e0a15fd4622a84&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现微信企业付款到个人零钱步骤</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信支付企业付款到零钱功能应用广泛，比如微信红包奖励，业务结算等。通过企业向个人付款，付款资金将直接进入用户</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="PHP微信商户支付企业付款到零钱功能" _target="blank" style="color:black;">PHP微信商户支付企业付款到零钱功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信支付企业付款到零钱功能应用广泛，比如微信红包奖励，业务结算等。通过企业向个人付款，付款资金将直接进入用户</font></div></div></div>

> 这些提现，都是企业支付，企业支付：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1 ，企业支付才支持提现
>
> 注意：双向证书（退款也是）、商户余额判断（事务+锁+提现申请+频率限制，避免被恶意提现）、微信提现规范限制、价格单位


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486021&idx=1&sn=59c44f85a845df1ecc8ec3301716f4b4&chksm=97219674a0561f6254783265b405d0e9cd39d004e3de69a891aa746b4bbd19c5896a99901d99&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现微信申请退款流程与实例，你会了嘛</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>当然网上可能也有很多大神自己重写和封装了demo，或许更加好用简洁，但是我还是不提倡用</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487346&idx=1&sn=a57c6a50e551d35ee10127dadbb1c54e&chksm=97219343a0561a552f3f56068f1def2157ae422568feab496496c217f6d0387c2046d0cdc34e&scene=21#wechat_redirect" _target="blank" style="color:black;">微信小程序支付及退款流程详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信小程序支付的主要逻辑集中在后端，前端只需携带支付所需的数据请求后端接口然后根据返回结果做相应成功失败处理</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485904&idx=1&sn=29e4fc5ed1c13a6d3c745d24e5bb2ae6&chksm=972195e1a0561cf7ac3ac0192546b293cdf4237605bc6c9547fb70debdd04fc10eccf0e6287e&scene=21#wechat_redirect" _target="blank" style="color:black;">php如何实现微信小程序支付及退款</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信小程序支付</font></div></div></div>

> 前面的文章已经介绍了好多微信支付，这里着重推荐退款操作。
>
> 退款注意事项：退款可信（事务+锁+退款申请+频率限制，避免恶意退款），主动查询退款可信、双向证书、商户订单号、交易流水号、单位、用户id、退款超时、及微信可能要求多久的订单号才允许退款

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486341&idx=2&sn=81cce6876561fcb8eea70726d9144b8a&chksm=972197b4a0561ea2e6e35a21e579faec9a19182067060a5fd8a135d16f6bdedae86cef5b8d7c&scene=21#wechat_redirect" _target="blank" style="color:black;">微信支付对账，你是如何处理的？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>做支付对账，即检查第三方支付与数据库中账单是否一一对应，涉及到微信对账单的处理，成功时，微信账单接口返回数据</font></div></div></div>

> 有了支付，项目越大，企业财务需要对业务流水进行对账。一般是要求研发提供业务系统的支付流水账单，财务到财付通得到微信提供的相应账户的账单，通过Excel或python进行对账。这里介绍了微信对账单接口使用，返回有具体流水数据和统计信息，通过业务加工可以实现每日自动对账。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486072&idx=1&sn=457517bd4ef451bb8f695dc53e6b1dbf&chksm=97219649a0561f5f3bbdcb3cec625c3f99e9c13b3c457ed273e23e432545763a7fcd5ece021f&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP后台实现用微信小程序登录，可学习下</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>这篇文章主要为大家详细介绍了PHP后台实现微信小程序登录，具有一定的参考价值，感兴趣的小伙伴们可以参考一下微</font></div></div></div>

> 理解微信（第三方平台Oauth）用户体系验证逻辑（时序图）比较重要，思想理解了，剩下就是技术方法了，参考官方文档即可.
>
> 小程序的用户体系可能会有一点差异，但万变不离其中。
>
> 注意：第一次登录、二次登录、业务session或token处理（可以用session机制，也可以使用JWT的方式）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485145&idx=2&sn=8e6ff15f8bc9663559ead9429ea084a0&chksm=97219ae8a05613fe4a7886d1803b9b8aa686213b315266a84bda2e0cfe95d64f1f9b40c6fd41&scene=21#wechat_redirect" _target="blank" style="color:black;">ⓟⓗⓟ实现微信小程序人脸识别刷脸登录</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>首先我们先确认我们的百度云人脸库里已经上传了我们的个人信息照片然后我们在后台写刷脸登陆的接口login我们要</font></div></div></div>

> 人工智能应用已经很成熟（并不是说很厉害了哈，但在声音、视觉、图片领域解决很多普通应用计算解决不了的问题）。对于php来说，由于各方面的原因，php并不能直接参与机器学习甚至深度学习等人工智能方面的计算，只能在业务层面去调用第三方API或模型才能实现输入=>智能输出的效果。本文介绍了微信小程序结合百度AI人脸库实现刷脸登录，如果没有业务后端的登录，都可以不需要php参与。


## 阿里生态相关技术

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488032&idx=1&sn=076d7de3db770286c94ef24d4b5cd4e9&chksm=97218e11a0560707c2c4fac1870a493ad461696a05174c386fa8086bb6f1c1de4502953c7033&scene=21#wechat_redirect" _target="blank" style="color:black;">php与阿里云短信接口接入</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php与阿里云短信接口接入</font></div></div></div>

> 阿里大于，可以二次封装，让使用更轻松更友好。该文章可能是只需要一个模板，我们还可以封装更多模板，让团队其他短信功能使用更方便。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485291&idx=1&sn=20ae7f3ec65ed0f0c2ab52abb22d2c71&chksm=97219b5aa056124c5fd22ac3519098abfab342ba9980e3fef5181433c175907ba26f40fde551&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP执行支付宝支付订单</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>正文内容先来个效果图做这个支付宝支付我总共用到了三个控制器：1：支付宝支付控制器。2：支付宝支付配置参数控制</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486471&idx=1&sn=8225547fe6e861b31f9ce0b14df0f199&chksm=97219036a0561920482b4ceffb4663fe01aaf94180362912c35819f79c8c10acbf44d7cd9bcc&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现支付宝支付，退款，回调</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1.首先你要加载你的支付宝配置项 include(\x26#39;alipay/aop/AopClient.php\x26#39;);</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486330&idx=1&sn=0a11a946c58d21deb8354fe21a6b289d&chksm=9721974ba0561e5d332889e1c7a8a4589af73845749ca9b9fb3d9f65af84820d3bfcf1344716&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP是如何实现单笔转账到支付宝，参考下步骤</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例为大家分享了php实现单笔转账到支付宝的具体代码，供大家参考，具体内容如下：1.首先 去蚂蚁金服签约</font></div></div></div>

> 支付宝支付原理与微信支付大体原理是类似，只有在部分技术细节及参数和平台有关，当然支付还是坚持严谨，不论是单位、二次确认、事务、锁、频率等繁琐的细节，都不能少，毕竟涉及钱的问题，再小的隐患都是大隐患。尽量让更多技术开发参与逻辑评估，或者公司内部形成统一的php支付sdk

## 电子商务相关

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485542&idx=1&sn=3bf22652318b300eaf4d90de383d1ad5&chksm=97219457a0561d414a86e23a4fc1689ef9f3ebca76b243ed19712ee5d26c2ec3f5f454d9fd5d&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP后端银联支付及退款实例代码</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>近期遇到银联支付以及相关退款(此文仅以手机控件支付作为前提)操作，下面会依次写出期间遇到的问题以及基本流程，</font></div></div></div>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486929&idx=1&sn=eebc4ef64c76eb6da060f7988e9dc514&chksm=972191e0a05618f6f9c1c5b03afb0bce2dd18b7c74e7b891074731c93c07f9fdb451d0e61018&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP打造智能识别收货地址信息</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>功能需求：用户输入混合的收货地址，能智能识别出地址，手机，姓名</font></div></div></div>

> 类电商系统都会用都地址模块，也都会碰到智能识别收货地址问题，或说是校正地址问题。该文的整体思路建立在字符串处理（匹配），之前实现过类似的地址校正问题，效果还行，但不能说是智能。期待机器学习式的智能地址识别模型。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486241&idx=1&sn=fb76cf2bd09ba62ea05ecb6b049bca05&chksm=97219710a0561e06492602629055bd181e48b02cbbba6d858376edb8af01ded596d661e69f28&scene=21#wechat_redirect" _target="blank" style="color:black;">实现电子商务的订单拆单思路，可深入参考</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>拆分订单服务是为了适应不同商品、库区及灵活的发货方式，我们将对订单状况进行更加细致的跟踪。</font></div></div></div>

> 拆单逻辑挺清晰的，我们曾经也遇到类似问题，也能理出拆单的逻辑，但主要瓶颈在于拆单前快递费用如何精确计算，考虑不同商家、不同仓库、不同重量、不同快递商，这些因素只有在拆单后才能确定，有点像薛定谔的猫，只有打开盒子才知道猫是活的还是死的。这个问题有一种方案是通过数学的近似求解来处理（可能部分用户会存在不满，因为不精确），

## 时间日期

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486186&idx=2&sn=d2bc65443e4d1d11252d985cdcdc9270&chksm=972196dba0561fcd075c1ccf6ead4c615871094a5a00ff581893327929b14931bfd08da2eb2c&scene=21#wechat_redirect" _target="blank" style="color:black;">经常用到的PHP时间类完整实例，可直接用</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>最近开发中，经常用到时间的一些例子，比如昨天，今天，前天，近七天，一周等等。这里整理了一个时间的完整类实例，</font></div></div></div>

> php的date函数很强大的，我们也都很喜欢用，基本不会去记太多参数配置，常用的记住就可，不用过度封装，除非重复代码多。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486616&idx=2&sn=d421378c989b374aab43f456ee8f217e&chksm=972190a9a05619bf8f15e7d57ca6b5b98fe5d14a1f41fd9975d4c4aeca5f98722ecc1344da29&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP时间戳和日期相互转换操作总结</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在php中我们要把时间戳转换日期可以直接使用date函数来实现，如果要把日期转换成时间戳可以使用strtot</font></div></div></div>

> 常用的可能就是xx分钟前，xx小时前，xx小时后，xx天后等这种需要稍微思考下才能写出来的代码。除非经常使用，不然很难一直记住使用方式，毕竟php的函数参数很多都不是很自然，有点牵强的的方式，但能用的程度。




## 基础实践

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247489773&idx=1&sn=bc499f81fbd641c2a175029b073eb494&chksm=972184dca0560dca13df0537ae8f87efe270efe5031bcf876c665cc413904d6f91c9dc3d4cde&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现智能语音播报</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>有兴趣的童鞋可以买个类似树莓派这样的低功耗设备去运行。</font></div></div></div>

> 语音播报，php自身很难做到的，还是需要外部接口，比如百度语音接口、科大讯飞语音接口等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486281&idx=2&sn=6ea9f6797ea0747b5729373fb290406a&chksm=97219778a0561e6eae47432c55ad2d57de0202d0e4b76dbfad78c4b554ebe2b438e05f207e08&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP简单实现“相关文章推荐”功能的方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>摘要：通常在做内容网站的时候,需要在每一篇文章中出现与该文章相关的文章列表。对于大多数人来说,使用的方法通常</font></div></div></div>

> 如果在10年前，你看这篇文章会觉得还有点意思，现在看到标题你以为是机器学习实现的文章推荐。这篇文章主要借用similar_text函数实现标题字样相近判断，简单粗暴，并不是从文章语义、分类、用户等维度判断，应用场景不大。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485474&idx=2&sn=99787a57fd89c99b183dce6841410301&chksm=97219413a0561d05f1c778de4350bb3869e527bacb93d4d3a4e95695e463650e4604540619d2&scene=21#wechat_redirect" _target="blank" style="color:black;">简单聊聊PHP下的截断问题</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>简单聊聊PHP下的截断问题</font></div></div></div>

> 大部分情况，大部分开发者不会遇到这些奇葩的问题。但经常会忽略编码（UTF-8、GB2312、GBK）问题，导致字符串截断出现乱码的情况，这个是很经常出现的哦，比如mb_substr、mb_strcut等函数，都有个encoding的参数，这个参数的默认值在多个php版本上是在配置中声明的，如果服务器上php的配置你不清楚的，最好每次都给函数补充明确的编码。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485454&idx=3&sn=61acf0782a905b6b0ee314b61fc2f508&chksm=9721943fa0561d29a7098258a56390f0fef52f7ba9ef39e857f8c28c0187590ff1a97a872352&scene=21#wechat_redirect" _target="blank" style="color:black;">关于怎样实现楼中楼的评论系统具体操作</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>关于怎样实现楼中楼的评论系统具体操作</font></div></div></div>

> 知乎采用了楼中楼的回复方式，但用的不舒服，在我们使用的应用中，发现体育论坛虎扑的楼中楼回复做的很舒服（套中套），还有点亮的亮点功能，虎扑的回复结合了原来回复当成一层楼，也能点开[回复]查看所有回复，并允许递归深度查看回复，逻辑清晰，层级清楚，界面简洁，数据设计清晰明白简单。楼中楼回复在前端实现，有一种是楼中楼回复嵌套展开，这对前端实现和后端取数据有一定难度，如果这种成虎扑的这种方式，前端回复仍然是列表展示，不存在递归嵌套展示，多了个【查看回复】按钮，设计一个回复的回复列表（依然是回复列表的子列表设计），一层层

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485344&idx=3&sn=f6207f9dcc2df1e67efa72480bc88a39&chksm=97219b91a05612871c897d924e7af3549004447a9c85cad3525673dab3183ae7203091302879&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP与反ajax推送，实现的消息实时推送功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>本文实例讲述了PHP实现的消息实时推送功能。分享给大家供大家参考，具体如下：入口文件index.html\x26lt;!</font></div></div></div>

> ajax的短连接通过php的死循环（while true）模拟长连接方式。长连接的实现，现在很成熟了，有workerman，还有swoole等，如果实在需要简单近似长连接的实现，可以参考微信二维码扫码验证的方式：前端ajax轮询方式，补充异常或一定规则下自动停止轮询，并提供手动再次轮询的方式，相对简单

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485329&idx=2&sn=f2b32215420ee5493bca52b2f0217346&chksm=97219ba0a05612b65f2927276e0f02fbf2eed3e530ba61220a52585c86edc78a30c1834db6b5&scene=21#wechat_redirect" _target="blank" style="color:black;">php实现的SSO单点登录系统接入功能示例分析</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>点击上面关注我关注我哟小编 隔天推送php教程，php技巧，php视频教程，MySQL，笔试题等诸多优质内容</font></div></div></div>


> 这篇文章简单介绍了公司内部业务系统的SSO实现。关于SSO策略参考：[单点登录策略](/互联网/解决方案/单点登录策略.md)，有三种情况，1：同公司同域名下，一般采用cookie方式的JWT；2：同公司不同域名，CAS一般提供一个公共的用户体系，业务服务端向CAS服务器请求ticket，并通过业务客户端向CAS服务器验证ticket；3：不同公司不同域名，我们常见的有微信、QQ、微博等基于OAuth的授权方式。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487273&idx=1&sn=5453caa7c8b5b2b487a8e113c62714f3&chksm=97219318a0561a0e42f5cd63fc2946a93b4d34960a5b44536dda8bfecd3161882f81273bff58&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现SSO单点登录步骤</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>这个操作还可以</font></div></div></div>

> 又看到一篇简单介绍单点登录文章，虽然简单不是非常完整，但对于初次接触的phper来说，可以通过其中体会一些东西，之后慢慢体系的看sso单点登录的文章，加深印象并刻在脑子里。
>
> 最重要的是原理思路要记在脑海里，不论什么语言，什么系统，都是这个理，通过这篇文章里的一张图，我们可以在具象的描述：五一放假，我们出去游玩，去厦门，厦门有好多景点，2020的5.1假期，景点都需要预约及买票，我们今天要去鼓浪屿、胡里山炮台、植物园、园博园等，我们去这些景点（业务网站A、B、C...）需要带有门票，现在呢，厦门提供了一个统一门票服务中心（SSO服务中心）负责售票、验票，我们要去门票服务中心购票，去鼓浪屿前，在门口检票员扫一扫我们手机上门票二维码验票，验票成功我们就可以上鼓浪屿小岛了，如果这个时候检票员发现我们并没有买票或票无效，会提醒我们到门票服务中心购票（SSO服务中心），现在手机那么方便，我们现场就购票，并验票就又可以去鼓浪屿了。
> 

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485466&idx=3&sn=475093c51d20b3a1169f40dc66938d1a&chksm=9721942ba0561d3d78fae6708da215de6873cca081922ce8518afba7a88069059ea83372a042&scene=21#wechat_redirect" _target="blank" style="color:black;">关于PHP实现读取一个1G的文件大小操作</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>关于PHP实现读取一个1G的文件大小操作</font></div></div></div>

> 该文章在没有迭代器的php版本里，只能通过其他取巧的方式实现内存低消耗快速的实现方式。但我们更想要的是在php里就把他实现了。
>
> python在处理大文件方面就是使用迭代器的方式实现，php的实现参考：[通俗易懂PHP迭代生成器](通俗易懂PHP迭代生成器.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485427&idx=2&sn=7cb92d134d1377c92a161f0ede06cfb1&chksm=97219bc2a05612d4c586cf7606922cae6b899b7f348cfaecee9e9f5d2eeebfb1fac0366adc37&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP会员找回密码功能的简单实现</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP会员找回密码功能的简单实现</font></div></div></div>

> 找回密码是一个拥有用户体系产品必不可少的一个功能。有多种实现方式，比如发送邮件重置密码、发送短信验证码重新设置密码。
>
> 发邮件注意事项：邮件发送格式、重置密码链接、token验证、重置密码界面及安全，相对短信来说复杂了些，但免费。（越来越多产品只考虑手机号、巨头产品用户体系如微信、微博、头条、钉钉）
>
> 发送短信验证码：短信费用考虑、短信攻击（图形验证码、频率、ip限制、用户限制、第三方智能验证），相对简单有效，但有费用


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485366&idx=1&sn=99f132ef519f22713f9ba86e229f3ac3&chksm=97219b87a05612913c3d1de8ff067d0b41c672d3637ed18858e0a09818e3220978d7f5d61dec&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP生成短网址方法汇总</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>文章来自：脚本之家http://www.jb51.net/article/88436.htm正常的网址带上参</font></div></div></div>

> 移动互联网时代，短网址很流行，2020年了，百度短网址已经不再免费供应，其他靠谱的大平台的免费短网址也不再那么容易找到。
> 
> 公司内部产品多的话，可以考虑实现简易的短网址服务，提供短网址接口
>
> 简单来说是表url地址映射。生成地址：一个id对应一个url地址，生成短地址（id根据一定规则转换成字符串，比如自定义36的进制）；解析地址：根据规则解析地址为id，通过id到数据库表中查询到原地址。当然表会越来越大，可以考虑分表（根据域名进行一定转换取首字母）智能分配到不同表中，这里就要考虑解析时如何找到是哪个分表中的id。
> 
> 这种简单的表（id，url），mysql5.6至少可以支持4千万条，且查询依然很快（一条记录），毕竟是主键索引树查询
>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://github.com/tsingchan/shortme" _target="blank" style="color:black;">tsingchan/shortme: Yet Another URL Shortening Service in Golang</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://github.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Yet Another URL Shortening Service in Golang. Contribute to tsingchan/shortme development by creating an account on GitHub.</font></div></div></div>

> 补充一个golang+mysql的现成的短网址服务：

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485366&idx=3&sn=42d978cd602d3919e3685464bd3a6f19&chksm=97219b87a05612914599ae3d139d5d828423d11bd00ec2e73b069100c860e8fea5aae036c6c3&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现IP访问限制及提交次数的方法详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、原理提交次数是肯定要往数据库里写次数这个数据的，比如用户登陆，当用户出错时就忘数据库写入出错次数1，并且</font></div></div></div>

> 这篇文章，只是一个思路，但实际并不会使用数据库。
>
> 哪些场景会使用到限制ip呢？高并发（秒杀、抽奖、投票、抢购、恶意请求如验证）场景
>
> 数据库因为需要额外的连接消耗且是硬盘操作，效率肯定不如内存级别的存储，比如memcache、redis，建议可以使用redis，支持秒级、自动过期、快速读写、单线程、分布式。
>
> 限制ip，除非是恶意程度严重，否则容易误伤正常用户，所以如果设计中，有必要要求用户登录才可操作，通过限制用户来得更精确。而且方便后续验证是否僵尸、恶意用户，进行用户限制



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485357&idx=1&sn=f4671cc970977e0006cfc129c3c7e72b&chksm=97219b9ca056128af249fefd0ea9bbdec0e94f0a283fe444dd9847b135b0e64ce5b460b79b71&scene=21#wechat_redirect" _target="blank" style="color:black;">Swool案例介绍</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>今天小编向大家普及一下，采用swoole框架的一些 用户和案例半次元 半次元：t 半次元是国内第一中文COS</font></div></div></div>

> 这篇文章介绍的是一些采用Swoole的案例，而不是使用php读取和解析大文件实战。
>
> YY语音部门内多款移动APP使用swoole作为底层框架，实现了手机客户端与服务器段长连接，直接通信的模式。大大提升了移动网络下应用程序的用户体验。
>
> 另外部门内部的数据统计监控平台，实时日志上报和实时推送，爬虫引擎都是基于swoole的。是因为韩天峰大佬在YY语音主导的项目？
>
> 通过这些案例都是早几年的Swoole的应用，特别是在实时推送、日志上报，php也有自己的不错的库（workerman虽然更成熟些，但是基于php实现）。现如今swoole4.x已经不仅仅局限于长连接，还提供了协程异步、高性能网络通信，可以方便快速的实现 TCP/UDP服务、高性能Web、WebSocket服务、物联网、实时通讯、游戏、微服务等，使 PHP 不再局限于传统的 Web 领域。[查看更多Swoole入门信息](swoole/README.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485357&idx=3&sn=73b52b9fa2ba45f7ee1fa65d3b966288&chksm=97219b9ca056128a67a146b1e8f5bc358aef23681fa987ac1bb4d95a4d0561203e89cbace383&scene=21#wechat_redirect" _target="blank" style="color:black;">【PHP】PHP实时生成并下载超大数据量的EXCEL文件</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>由于用户量较大，经常会有导出50万加数据的情况。而常用的PHPexcel包需要把所有数据拿到后才能生</font></div></div></div>

> 从数据库中按page读取数据，实时写入php的output输出流（php://output），再通过ob输出给web浏览器。解决了大数据表格输出占用大内存的问题。
> 
> 当然大数据下载，面临php的长时间连接带来的风险，建议：如果是外部用户下载，提供一个专门冷数据查询或下载的备库；建议严格限制用户访问频率及合法性；另外大数据，特别是日志类的数据表往往都很大，如果一直翻页查询，越往后速度越慢，文章作者最后提到了如何优化的问题，虽然是个细节，却是大部分开发者需要学习的地方，细节往往决定成败，作者利用B+树的原理，补充lastid进行查询，保证sql语句利用了主键索引树。参考：[高性能mysql笔记](/互联网/数据层/高性能mysql笔记.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485482&idx=1&sn=df750f169eb0495593d8a64d36ed6ae4&chksm=9721941ba0561d0df0cddb2bc6950acfd35265d6194b8fc25006a781e0ae5d9e1dc1c4314f39&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP环境安全加固方案</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>1.启用 PHP 的安全模式PHP 环境提供的安全模式是一个非常重要的内嵌安全机制，PHP 安全模式能有效控</font></div></div></div>

> 大部分在php7之后都得到调整或废弃了。当然如果版本还低的可以参考调整设置，在不影响业务的情况下。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486254&idx=2&sn=756f44df1564afa318d37fe48143faf3&chksm=9721971fa0561e09e68b3184c604fc2dca9cb1286987f010f07be59c4436dfbc60a99b014c85&scene=21#wechat_redirect" _target="blank" style="color:black;">用PHP屏蔽关键字，敏感词，你用哪些方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在文章评论，分享内容中有时候会遇到屏蔽敏感词，关键字等之类的</font></div></div></div>

> 在2020年看，这两个方案（词库正则匹配与词库循环匹配）都是小打小闹，只能是有局限的使用。当然要自己设计一套敏感词方案（如微信公众号后台敏感词）确实不容易，首先要有个基础敏感词库，其次还需要一个支持自动与手动增删改敏感词的服务，再次有个高效检测敏感算法机制。
>
> 当然用钱也是解决的，比如微信、网易、阿里云、七牛等各种平台都会提供敏感词检测、鉴图等有偿服务

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486202&idx=2&sn=2209c33953af7ed1381a8550cf3001df&chksm=972196cba0561fddf6b2c22893b75a9b235c670b19a4b75b0c00cd0d639cc5c23e3d4fb5c338&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP与视频播放插件功能实现，其实很简单</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php与视频播放器插件的功能，说白了就是前端是播放器的插件，直接调用后端传递过来的播放地址</font></div></div></div>

> 这篇文章简单易懂的告诉我们视频播放的整体思路。前端负责播放器的插件初始化及运行；后端负责播放数据信息的封装，比如封面图面，名称，播放时间，视频地址等等。
>
> 现在流行直播（当然很多也都是录播视频而已），视频播放在技术上仍然不变动，只是直播会有直播源地址及相关信息，业务端只要调用平台方的直播数据即可。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486186&idx=1&sn=d6e7fc651bcff4ee679c41bf89af20ee&chksm=972196dba0561fcd6e3f6721cc101adc2bdc74a8b0a2333fb21d6db06104e74a7f1e79624eaa&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP非递归遍历目录下所有文件，可以试一下！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>上干货，直接看代码\x26lt;?php /** * PHP 非递归实现查询该目录下所有文件 * @param unkn</font></div></div></div>

> 作者并不是说递归有问题，而是作者的专研精神，告诉我们非递归也可以很自然很好理解遍历多层目录的实现方式。非递归方式更符合人类第一个遍历目录的想法，递归是经过论证积累下的抽象的优秀算法（代码更简洁）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486192&idx=2&sn=9d91fbd430d087cac99ec1ced5d02620&chksm=972196c1a0561fd753232eee689af1e512465d53aa5664d69157a90f23b599403439917c53f7&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP基于Token的身份验证的方法，可参考学习下</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP在控制器中怎么添加token验证//获得token</font></div></div></div>

> 这篇文章介绍了表单提交增加token验证，为了防止外站提交、重复提交、双击提交问题。重复提交、双击提交这种正常用户的异常操作能得到限制，但除了正常用户（君子），黑客（小人）就难防了。目前ajax请求模拟、表单提交也能模拟，不信你看那些公众号聚合编辑器、爬虫等，我们曾经使用自定义浏览器内核可以模拟各种http提交请求（不论是ajax、表单、特殊body、cookie限制、csrf、token等），现在有了机器学习，甚至图片验证码也不是问题；甚至普通浏览器上也可以通过油猴插件+自定义js脚本也能达到模拟提交表单等能力。
>
> 这里要说的是，用户输入都是不靠谱的（提交数据），所以后端一定要做好各种校验与限制。（当然你觉得你们的产品将来会是个大项目，或者你觉得你们的产品值得黑客来黑的时候，比如提现、退款、红包等和金钱过得去的功能）


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486036&idx=2&sn=a91b4a25e21f160f6771de2016e2cef8&chksm=97219665a0561f73fe9071dcce87edc495fdb035ad0c432af3f42b753c7336f3a57694c97dcd&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP RBAC权限控制实现思路，你会了吗</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>什么是RBAC基于角色的访问控制（Role-Based Access Control)</font></div></div></div>

> RBAC，基于角色的访问控制，大部分成熟的php框架里都会带有差不多的RBAC模块，其实我们更喜欢独立的RBAC模块，允许通过composer安装（涉及到数据层设计）。
>
> RBAC很重要的概念：管理员（用户）、角色、权限，管理员只能是一种角色，一种角色对应一套权限配置。
>
> 用户（管理员）访问时，根据角色判断是否用户对应的操作权限。
> 
> 权限粒度：有的系统按模块粗略分（财务、营销...），有的系统按操作细分（增删改查等每个按钮点击操作）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485983&idx=2&sn=aa723e8b72ab581d45ca5404eb7ce368&chksm=9721962ea0561f38ae474dfda5ecb0973b318dada6618a60fac545c634bbae7b42f83a8d1462&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP代码审计，你会吗？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>代码审核，是对应用程序源代码进行系统性检查的工作。它的目的是为了找到并且修复</font></div></div></div>

> 这个很考验经验，没有多年经验，想不出来，甚至看了也察觉不出大部分门道来；当然不同php版本也会有不同的潜在风险问题，这是一个发展性问题，其实IDE完全可以实现这方面的初步审核，不需要使用第三方安全审核工具才能及时纠正，当然现在很多IDE也能建议一些有效的方案了，但还是会有很多潜在风险是没有识别，至少可以全面检查项目代码后，给出潜在风险列表，由开发人员二次判断及纠正（毕竟php门槛低，部分开发者水平暂时还是很低的，性能和安全方面完全不考虑，需要一个有经验的一线实战技术管理人员进行代码审核）
>
> 我们以前都会养成一个习惯，每天早上都会把SVN或GIT的提交记录大致过一遍，一方面可以学习别人好的编码及思路，另一方面可以帮助发现模块代码存在风险问题。如果有时间的话，这是技术负责人解项目各个成员的编码情况是一个不错的直观方式，当然审核代码还是需要一些工具，才能提高效率。参考：[php代码审计](/互联网/测试/PHP代码审计.md) 及 [代码审查方式](/互联网/测试/代码审核.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485602&idx=1&sn=09f0aa4589cd392cb1cdcf4220818e08&chksm=97219493a0561d85f9e34b104c71f7c8755c20b90c21d06dad0bcb3760e6a34b85a8e2415d13&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP路由技术的原理与实践</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>用户通过指定的URL范式对后台进行访问，URL路由处理类进行处理后，转发到逻辑处理类，逻辑处理类将请求结果返</font></div></div></div>

> 初学php框架的开发可以了解下，虽然你们看框架源码也能看懂。
>
> 这边要注意的是：普通模式和PATHINFO模式
> 
> 多年php开发人员都知道php的处理本质就是字符串处理。把字符串玩出花来。2020年了，我们会发现编程并不仅仅是字符串的处理，还有数学公式的处理，你看python，你看机器学习，你看大数据处理

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485563&idx=2&sn=bcc745d660b1d627c7366b4b1a42c9a8&chksm=9721944aa0561d5c06899710fffe4cadf0dca8665fa62de890f0630892ae4e58fd30fe966c6e&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP随机生成中国人姓名的类</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP随机生成中国人姓名的类</font></div></div></div>

> 没有很特殊的算法，只是这个取名想想有趣，给小孩取名是最有趣的，赶紧去找个女朋友吧，工程师们，然后准备给孩子取名。没结婚前我们也为孩子准备了两个名字，一男一女，但当有了孩子，我们还是另外取了哈，毕竟时代在发展，不能是6、70年代的建国、建设等，不是80的张伟、李娜，不是90、00后的子萱、梓萱、子璇、子涵等


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485549&idx=2&sn=ca69dc25d01caeee3d9a6d343606c75e&chksm=9721945ca0561d4af1c388d0572b7c2e47c99113ca925b517caadc3cb1c3feb6f45f040bd494&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现打印出库单，有没有实现过?</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>有时候你在实现一个出库订单之类的功能模块，这里也有可能要你的站点也实现相应的打印出库单预览，今天给大家分享用</font></div></div></div>

> 有涉及到电商的项目，在出库的时候，需要打印拣货清单、出库清单之类，这是一个范例。如果是对接阿里系电商的可以，考虑菜鸟网络的打印组件，可以满足所有快递单打印，还支持自定义表单打印。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485549&idx=3&sn=05bb9915488228d83da0c1ca7424a9ea&chksm=9721945ca0561d4a7848fbb9a4fa47aa3953af869548e96fc43c1d0a86fdb7cad4bc3b9adfe0&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP模拟浏览器访问，抓取非本地文件的几种方法【爬虫】</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在做一些天气预报或者RSS订阅的程序时，往往需要抓取非本地文件，一般情况下都是利用php模拟浏览器的访问，通</font></div></div></div>

> 这文章内容简约到你可以不用看，除非你是初学者，想知道一些过去的实现方式。
>
> 模拟请求我们建议使用：[guzzle](https://github.com/guzzle/guzzle)，swoole类框架会建议使用guzzle，因为协程异步；
>
> 爬虫我们建议python。php爬虫，我们建议：[querylist](https://www.querylist.cc)，一个挺优雅的库，当然他用了guzzle


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485145&idx=3&sn=e7526ff0b5b3aa09eadee7ea58d2a21a&chksm=97219ae8a05613fef7104721cb319ce7b3ca828f0fc4ac78871b9d33375e416b7aa29f3aef48&scene=21#wechat_redirect" _target="blank" style="color:black;">ⓟⓗⓟ使用文件锁解决高并发问题示例</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>涉及抢购、秒杀、抽奖、抢票等活动时，为了避免超卖，那么库存数量是有限的，但是如果同时下单人数超过了库存数量，</font></div></div></div>

> 这篇文章从文件锁示例讲起，介绍了mysql的悲观锁、乐观锁，再通过两个锁，延伸到文件锁的阻塞与非阻塞模式，最后引出分布集群及redis实现锁机制。悲观锁实践参考：[悲观锁实践](/互联网/数据层/悲观锁实践.md)
>
> 属于示例、思路。更复杂精细的高并发设计参考：[设计一个秒杀系统](/互联网/解决方案/设计一个秒杀系统.md)



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487583&idx=2&sn=8ef15df353779e0aa48e5d1863877764&chksm=97218c6ea0560578fd53f872423abb1b7a60451b5ef7de2fb7f9e4a773d2cf98921a22dc26e6&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP 的闭包说明和应用实例</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>说到闭包，就不得不说一下匿名函数。匿名函数是没有名称的函数，可以赋值给变量，本身作为参数传递在函数之间，可以</font></div></div></div>


> 闭包，可能前端js开发更经常听到，在php中也有闭包的概念（php真的是，模仿C，不错过JAVA，学点JS，python这么火，能学点吗）。
>
> 闭包，有点抽象，如果你把他看成匿名的回调函数，可能比较好理解些，比如文中addRoute方法中第二个参数$routeCallback是一个闭包函数。如果你熟知js的闭包，那你能瞬间理解。
> 
> 虽然js中闭包使用广泛，但php中并不怎么使用，一来效率不足，没法缓存opcode，每次都要动态解释，也许php8就能解决，而来函数是一次性的，不能重用


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487710&idx=2&sn=8d5bdc8a467de72b9e550483cc7f51ce&chksm=97218cefa05605f933099b07ff87c3f99e07e1281df6310109587abd660c982c359cdf4bf340&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP浮点数运算精度问题</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>最近有客户反应商城订单金额总是不准确，总是相隔一分钱。检查相关代码逻辑都是正确的，就是运用了四则运算。大概推</font></div></div></div>

> php的浮点数问题，经常出现在金钱计算上，订单、提现、统计等，如果采用普通的四则运算，金钱数值总会出现一点偏差，在精确度要求高的系统，显然很难满足。
>
> 经常实现金钱交易的小伙伴们都知道如何去处理浮点数运算：首先数据字段类型设计，如果使用double浮点数，则在php业务逻辑运算的时候，建议使用BC数学函数进行运算及比较；如果考虑放大价格单位（比如分），则可以在业务层面使用整数四则运算。目前大部分平台的价格单位都是分，也就是说大部分平台建议使用整数进行运算是个比较的方案。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487610&idx=2&sn=c8d71431f81134570246f216c59619b4&chksm=97218c4ba056055d73a52a828bb6ea690eac5e2bff3e55536a7506b0566bdfbe446bcd6c0b5d&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP与WorkerMan实现简单的多人在线聊天</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>切换到 Linux 工作，体验暴增 100 倍！</font></div></div></div>

> workerman文档成熟齐全，阅读官方文档及demo，基本能掌握workerman相关技术解决方案。本站更多参考：[workerman汇总](wokerman/README.md)
>


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487328&idx=1&sn=615e782b28b365584c17c60b3fd3e300&chksm=97219351a0561a47f5c0cacd5abdd890be32d90b88947d36473f10fde6679f1cd269da0af102&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现用户注册、验证邮箱激活功能示例</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>这里将结合实例介绍如何使用PHP+Mysql完成注册帐号、发送激活邮件、验证激活帐号、处理URL链接过期的功</font></div></div></div>

> 很多开发者很了解注册账号、发送并验证激活邮件之类的实现。
>
> 这边推荐的目的是想让我们不要陷入为了实现而寻找技术方案，而是回顾了解产品功能的本质，为什么我们要发送并验证激活邮件，目的是什么，才更清楚为什么这么设计，这么设计好不好。开发人员养成这样的好习惯，避免为了实现而实现功能，养成主动去思考功能的本地化、个性化、目的等，从而选择解决方案，并实现方案，有理论依据的达到目的。
>
> 发送及验证激活邮件：首先是为了确认邮箱有效且是属于用户的，方便后续找回密码可用，其次是为了避免恶意注册的一种很好的方式，再次多收集一个有效邮箱，说不定可以卖，说不定推广告（这些都是以前遗留下来，现在不一定好用）


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://github.com/tsingchan/30-seconds-of-php-code" _target="blank" style="color:black;">tsingchan/30-seconds-of-php-code: A curated collection of useful PHP snippets that you can understand in 30 seconds or less.</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://github.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>A curated collection of useful PHP snippets that you can understand in 30 seconds or less. - tsingchan/30-seconds-of-php-code</font></div></div></div>

> 30秒的php代码

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://github.com/php-ai/php-ml" _target="blank" style="color:black;">php-ai/php-ml: PHP-ML - Machine Learning library for PHP</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://github.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP-ML - Machine Learning library for PHP. Contribute to php-ai/php-ml development by creating an account on GitHub.</font></div></div></div>

> 这是一个php的机器学习库





<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487664&idx=1&sn=8ac0dc10e98d7f8d72676bf9a629c005&chksm=97218c81a05605971c7a80b3534516c4792e7b49c38eb74e84de19d97063de0f493ecd1110e5&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP发送邮件</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Tomcat 服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器</font></div></div></div>

> 该文介绍了邮箱邮件的一些基本概念。当然php的话，要快速使用邮件组件，文中提到的phpmailer、swift mailer都是比较顺手的适合现代的实现方式，不需要自己准备邮件需要的相关东西，只要知道邮箱地址、对应smtp地址与端口




<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486455&idx=1&sn=f3903b4d1f8eb9e8729c796bcba0f98d&chksm=972197c6a0561ed0b2f5ea9385b1878dcd577a3a2ac2ed2b6e9285f30596da782ffdebba3453&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现微信扫码自动登陆与注册，参考实例</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>微信开发已经是现在phper必须要掌握的一项基本的技术了,其实做过微信开发的都知道微信接口非常的强大做起来也</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://blog.csdn.net/chengzheng5879/article/details/100913449" _target="blank" style="color:black;">微信扫码登录功能实现_网络_chengzheng5879的博客-CSDN博客</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://blog.csdn.net/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>原因：很简单，公司的账号登录需要用到微信扫码登录与QQ的登录功能，所以，在做好了微信的扫码登录之后，网络</font></div></div></div>

> 前面一篇文章，没有时序图之类的流程图，对于小白来说，可能是云里雾里的，对于懂的开发者，又显得没有看的必要。
>
> 很想画个图，但我们太懒了。
>
> 第二篇CSDN的文章逻辑清楚，步骤分明，可以看得很出清楚扫码到拿code换accessToken，获取openid及用户信息。当然缺少了如何去验证PC端的本地登录逻辑
>
> 对于PC端微信扫码登录，4个实体：用户手机、业务客户端、业务服务器、微信服务器，业务服务器向微信服务器申请生成场景二维码，用户手机扫描场景二维码，用户手机访问二维码链接（微信服务器），通过微信服务器回调业务服务器方法，实现用户授权登录与本地注册；用户手机扫码后同时PC端场景二维码页面，轮询业务服务器，确认是否授权登录成功（通过场景值+）


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486430&idx=1&sn=df4d8a6336a71f7c5053112d86dcee14&chksm=972197efa0561ef9af7df417d2da8acffb7246c4e01ce4d89ef9369c8bb29991b0bb623078dd&scene=21#wechat_redirect" _target="blank" style="color:black;">php实现事件监听与触发的方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP如何实现事件监听，参考了jQuery的事件绑定思路，简单的实现了一下。</font></div></div></div>

> 文章中事件的监听与触发编码很简洁也很好理解。这个看明白了，可以顺手掌握设计模式中的观察者模式详见：[23-观察者模式](/互联网/设计模式/PHP设计模式全解析/23-观察者模式.md)
>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486589&idx=2&sn=e6db2d6beeaa7a9669a74743cdc024cf&chksm=9721904ca056195a7e335e130f517241a79ecbe873d78ed4e7c71273e4dd0fe1352a006f0fcc&scene=21#wechat_redirect" _target="blank" style="color:black;">记录用户登陆信息，你用PHP是如何来实现的</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>对于初入门的PHP新手来说，或许有一定的难度。建议大家先看看PHP中session的基础含义，需要的朋友可以</font></div></div></div>

> 分享这篇新手关于用户登录的文章，主要不是为了让新手去实现，而是为了让新手明明白白的理解session和cookie，详见：[通俗理解session与cookie运行机制](/互联网/后端/通俗理解session与cookie运行机制.md)




<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486582&idx=1&sn=5495a708eefc1758260b1f8ba85c42f0&chksm=97219047a0561951aac42eee3d3ce7f1e63fd52581bc56eebfad0e8dfa24e90304f123c9d2c7&scene=21#wechat_redirect" _target="blank" style="color:black;">用php脚本，你如何定时更新商品列表</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>电商项目中为了提高抗并发能力，需要对商品列表做缓存，以下是更新缓存用的脚本：//PRODUCTION_为缓存</font></div></div></div>

> 这篇文章虽然凑字数且简单到个人认为是编辑敷衍文章，介绍的功能虽然看似简单，却涉及（只是点到为止）：
> - 高并发能力的缓存用途
> - 考虑数量大时更新方案（redis：lpush、rename）
> - crontab计划，文章中一般篇幅在介绍crontab使用，显然是凑字数的
> - 锁，可以通过flock，也可以在脚本中实现


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486571&idx=2&sn=570bdfc4280015584cac9c2ef970040b&chksm=9721905aa056194c76ae3bf96fd28960b57e1c0d1682db028ae07c7de932bac47d12bea170d5&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP生成短链接的实例汇总与分享</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>正常的网址带上参数的那种可能会很长，尤其是我们在印刷纸质品如企业宣传册中要印上某个长的url的话非常难看，而</font></div></div></div>

> 前面我们也有介绍过短地址的实现方式，就是文章中方法3的详细版，该文章方法1、2都不是很好的设计方案

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486542&idx=2&sn=b23b58f8c6eef4bfb54ec233b5789182&chksm=9721907fa0561969bf4efc851d211a98f597c943d09c98d02c522da32e8e9a8dfe622d595b97&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现远程抓取网站图片并保存在文件中</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>这个功能类虽然是PHP原生的，但是也值得你去学习一下的。</font></div></div></div>

> 思路：获取远程页面所有图片地址，遍历下载所有图片地址并保存到本地。
> - 原生php采用正则匹配图片src地址，也可使用第三方比如querylist
> - 遍历下载图片
> - 如果是长期需求且下载量大，建议使用python实现爬虫与下载（毕竟爬虫生态更成熟、效率更高，特别是针对反爬虫与多线程）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://www.woshipm.com/pd/32652.html" _target="blank" style="color:black;">Web网站通知系统设计 | 人人都是产品经理</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="http://www.woshipm.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>写在前面： 通知系统是网站信息传播机制的重要的一部分，足够写一大章来说明。本文只梳理设计原则，后续相关内容会持续更新。 这里的通知包括但不限于公告、提醒或消息（不同使用场景下的功能定义不同）。 关于各客户端平台（ios、android、wp等）的通知机制，在其</font></div></div></div>

> 小小的站内通知，大大的设计考虑



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488457&idx=1&sn=2cf5c77cc2e62bd10b902de4f32b9967&chksm=97218ff8a05606eed1ac68c285a49f633fb86de96923fd4a094de50cd576cab2b041f006e526&scene=21#wechat_redirect" _target="blank" style="color:black;">GO+PHP, 让全宇宙最好的两种语言合体的神器——RoadRunner</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>从图中可以看出RoadRunner对比Nginx+FPM，运行效率是有数量级上的提升。</font></div></div></div>

> 是不是看出来了，其实国内的Swoole拥有这个能力的，效率更高，还支持异步协程编程。其实国内互联网技术现如今在很多方面也是世界的榜样和翘楚了，当然人工智能方面，我们依然在追赶，但在不远的将来，我们也能像电商一样领先全球。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488203&idx=1&sn=699b3318796e05de2276a956b47c7ba8&chksm=97218efaa05607ec62a5e16c136b22aac81a44e382518ebcd32674faa45d930f95ec2a1377b0&scene=21#wechat_redirect" _target="blank" style="color:black;">php是如何实现websocket实时消息推送的</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php是如何实现websocket实时消息推送的</font></div></div></div>

> 这篇文章通过php原生实现websocket服务，实现在线聊天服务。虽然现在有workerman、swoole等库/引擎可以快速实现websocket服务部署，这篇文章中的代码仍然可以让我们了解websocket服务的实现原理。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488168&idx=1&sn=cd0212c71442ac4b653f25510627e8fd&chksm=97218e99a056078f8c2020c42f07541126bec78f57ddb9d185677d208892870f90b6fbc1280c&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现用户异地登录提醒功能的方法</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP实现用户异地登录提醒功能的方法</font></div></div></div>

> 通过ip不一定可靠，通过session_id可以实现，其实只要是登录凭证记录下来即可，比如JWT的token或是其他一些ticket，都可以实现异地（只是区别不同会话）登录标记，通过每次操作验证或轮询或消息推送的方式通知前一个会话异地登录并强制退出。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488150&idx=1&sn=5dfceb67c8cdfc95e2c17639e76b9cef&chksm=97218ea7a05607b159b8b80330a5a260211e46e72c27148775b61e265b28bf85842d1b442936&scene=21#wechat_redirect" _target="blank" style="color:black;">php实现JWT(json web token)鉴权实例详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>谢谢你的关注！</font></div></div></div>

> session和cookie，详见：[通俗理解session与cookie运行机制](/互联网/后端/通俗理解session与cookie运行机制.md)，JWT的好处不少，但我们也要关注他的一些可能不足的地方：JWT是外放token，token里带有验签信息、过期信息等，服务器端难以主动冻结或提前结束某个有效的token（存在只要有令牌就可以调动军队的风险），也有项目是JWT+Redis类内存存储方式用于替代session的方案。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247488072&idx=2&sn=864d3d8ee62af219d871e5c790d39cab&chksm=97218e79a056076f1571e6f921ca106d732ee17d8496c2170ea55c0abdae3bee2f7cff0a3982&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP基于openssl实现的非对称加密操作</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP基于openssl实现的非对称加密操作</font></div></div></div>


> 到目前为止，至少要非对称级别的加密方式才是更可靠的方式。
>
> 对称加解密，一般用于不开源的两端通信，比如两服务器之间通信保密（虽然还是有一定风险），再配合签名避免数据被篡改
>
> 更好的方案当然是使用非对称加密及机器学习加密
>
> 我们经常要对前端请求数据进行加密，然后提交给服务端，但是避免不了被模拟，除了像微信小程序客户端代码全局加密不泄露，我们就可以在客户端和服务端实现一些比如验签就可以保证数据安全与完整性


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247484203&idx=1&sn=e1a3599c60a19fb36f439e1ece9696c0&chksm=97219f1aa056160c666343455c3375dd76fae2d88b71b4cba231552883be9d1eeff96631bd72&scene=21#wechat_redirect" _target="blank" style="color:black;">在PHP中如何使用全局变量的方法详解</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>对于大多数web应用来说，数据库都是一个十分基础性的部分。如果你在使用PHP，那么你很可能也在使用MySQL</font></div></div></div>

> 并不推荐看这篇文章（瞄一眼排版和内容，我们都不想看下去了），主要是提到了全局变量global关键字，我们也想到了$_SESSION超级数组，好久好久以前，有个项目组两个phper因为是否可以在随便定义$_SESSION元素并使用而争吵大打出手，让我们有意识地重点关注了全局变量如何使用的问题。


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487653&idx=2&sn=407e40757866d057770cc37599a52ad1&chksm=97218c94a0560582d812fe882eb50c0c22287d1077b9ff2c85a97ec4678cf97b5b2efc54805b&scene=21#wechat_redirect" _target="blank" style="color:black;">位运算在 PHP 实际项目当中的高级运用</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>位运算想必软件相关专业的同学应该非常清楚。非科班专业出身的也不要着急。</font></div></div></div>

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://www.php.cn/php-weizijiaocheng-369689.html" _target="blank" style="color:black;">php 位运算符的用途-php教程-PHP中文网</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://www.php.cn/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>下面小编就为大家带来一篇php 位运算符的用途。小编觉得挺不错的，现在就分享给大家，也给大家做个参考。一起跟随小编过来看看吧  在实际应用中可以做用户权限的应用</font></div></div></div>

> 我们觉得开发都应该要懂得简单的一些位运算：与、或、非、异或（通俗理解：相同为0，不同为1）。位运算在lanmp体系常常配合数据库设计实现权限、类配置位设计（比如一个实体表中有很多开关/属性标志位的设置项），可以考虑位的设计替代多tinyint字段，特别是能够预感到表后续会逐步增加新的标志位字段的（需要结合实际产品功能场景情况进行设计，位运算设计并不定是最好的）

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487245&idx=1&sn=3f5378e19c1175c1d7f249e4f8681ad9&chksm=9721933ca0561a2a694da395db180d6d4c537ad05853512e36c2c2c915e4af7a9859dc25a2fc&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP实现页面静态化</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>随着网站的内容的增多和用户访问量的增多，无可避免的是网站加载会越来越慢，受限于带宽和服务器同一时间的请求次数</font></div></div></div>

> 静态化，在CMS类产品项目（门户、新闻信息流等）经常使用到静态化，降低服务器压力、提高访问效率、提升系统安全、更有利于SEO。可以通过php原生OB函数实现文件缓存并静态化（访问后缀），也可以利用smarty或PHP框架自带模板引擎配置实现静态化，静态化技术现在已经很成熟（除了页面html静态化外，页面资源js、css、图片、视频都使用cdn服务，进一步降低业务服务器压力并提高资源访问速度）


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486909&idx=2&sn=fe4d2180a8b77dfdd146cb2b67bb246c&chksm=9721918ca056189a904d642a0de95ab84cabb20891a42d9741c9d0d36763b17857adb31c36fd&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP生成器的创建和使用</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>生成器是 PHP 5.5 引入的新特性，但是目测很少人用到它，其实这是个非常有用的功能。</font></div></div></div>

> 生成器、迭代器是php的一个进步的表现，虽然来晚了点，且很少有人知道（虽然Swoole等框架也都提供了异步协程编程）。文章中示例提到了读取一个4G的文件（系统内存只有1G）的问题，迭代器的经典场景。更多详见：[PHP协程实现-多进程-多线程-并发-生成器-迭代器-协程](./PHP协程实现.md)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486690&idx=1&sn=0fabc81e022e240a202fd8e08daeb447&chksm=972190d3a05619c547c755f23a98253566124cf8073d1bf791e2c769c3a704bb345a796bbd0c&scene=21#wechat_redirect" _target="blank" style="color:black;">解析PHP跳出循环的方法以及continue、break、exit的区别介绍</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP中的循环结构大致有for循环，while循环，do{} while 循环以及foreach循环几种，不</font></div></div></div>

> 基础知识。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486341&idx=1&sn=aac8d1b562ab2bdc6143b03fa4e1f230&chksm=972197b4a0561ea25f7d282ff4504027e355c257917ba1955b7b24833ff0b291628737c0e186&scene=21#wechat_redirect" _target="blank" style="color:black;">重复提交是我们开发中经常遇到的问题，你怎么解决？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>直接上案例</font></div></div></div>

> 重复提交的问题，有两种，一种是文章中说的表单form的重复提交，可以通过token的方式进行限制，一种是ajax（大部分新项目都采用前后端完全分离的开发方式）避免用户无意的重复提交，要考虑前端的友好交互，还要考虑后端重复提交的数据完整与安全问题。大部分前端新手想不起前端的限制及友好交互处理，因为能实现功能已经很不错了，哪还有空考虑更多细节。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487629&idx=2&sn=e0ee1b64bd95611fbe66a51a3b19d092&chksm=97218cbca05605aac9bdedcb03cfdc1ec22acc0beaaa093cfc3d11b6ed5b82c33f75938cacf1&scene=21#wechat_redirect" _target="blank" style="color:black;">谈谈我们为什么要前后端分离</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>前后端分离</font></div></div></div>

> 为什么前后端分离？我们先说我们自己的想法：1、随着互联网的成熟，产业分工越来越细越明确，出现工种从开发到前端开发、后端开发，后端开发都不想碰前端开发只专注后端，前端开发不碰后端开发只专注前端（另外可能还有拿一份钱哪有做两份事的私心）；2、开发流程的优化，要求前后端分离，并行配合，加大人力投入，提高开发效率与质量的原因；3、前后端分离除了让前端更具模块化外，对后端的微服务推进很有帮助
>
> 当然项目是否前后端分离，还需要看项目的规模，凡事都是有个度，有个临界点（比如项目功能模块数、开发团队人数等），过了临界点就需要考虑明确开发流程、确定前后端分离，如果是一个简单展示类门户（不带管理后台），就不需要去考虑太多，直接按传统mvc架构实现，等哪天需要迭代更多或大版本升级再次评估是否前后端分离
>
> 什么是前后端分离，我们文章中的一张图片： ![什么是前后端分离](https://mmbiz.qpic.cn/mmbiz_png/8KKrHK5ic6XDHLxn7NGMmbCwicbWsPPclY7qXLu2zichDU2hah6b1hgvTy7bic9B3Uuh8oofElnljWAlpiafwz7pNcQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486281&idx=1&sn=cfbc911cf18e77ddf5404a2aa1f09297&chksm=97219778a0561e6e13330635b0aaf409752d9dc134542e4f4766426e632f0f1bfd8702ba8388&scene=21#wechat_redirect" _target="blank" style="color:black;">流行的前后端分离，咱们来看看它的优缺点！</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>WEB 前后端分离三个最大的优点在于：1：最大的好处就是前端JS可以做很大部分的数据处理工作</font></div></div></div>

> 又一篇前后端分离的文章，这文章是java生态圈的文章，虽然都是前后端分离方案，但这篇和上一篇的前后端分离的含义不一样，甚至更高级些。
>
> 本文的前后分离，实际是把以前的MVC分离成前端（c+v）+后端（m+s），c是控制层（业务流程控制），v是渲染层，m是数据模型层，s是数据服务层（业务逻辑服务）。
>
> 本文前端采用的nodejs实现了c+v，采用java实现backend的m+s，当然你也可以考虑前端采用php来实现c+v，如果这样的话，团队需要view层的前端开发（js方向），还得要有php开发，然后java开发三拨人，成本高，语言多，效率下降，不如c+v全部使用js实现（比如淘宝当然前端c+v就是全部通过nodejs实现）


## 瞎谈PHP


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487341&idx=2&sn=ed4531c5e330628cdf85b58171c261ae&chksm=9721935ca0561a4a47fb4c366961defd8f390de9d866beeb190bbe9ce30b534cb224d40f09b9&scene=21#wechat_redirect" _target="blank" style="color:black;">提高工作效率的7个 Vim 使用技巧</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>vim 是个非常高效、非常好用的工具，很多人一旦开始使用 Vim 之后就再也无法自拔。然而， Vim 仍然有</font></div></div></div>

> 如果你vim用的不多不熟，那就不用看了，但可以看我们从一本秘籍抽取除来的部分知识编写的系列文章：[Vim基础概览](/互联网/Linux/Vim基础概览.md)、[Vim基础配置说明](/互联网/Linux/Vim基础配置说明.md)、[Vim进阶概览](/互联网/Linux/Vim进阶概览.md)、[Vim文件编码步步分解](/互联网/Linux/Vim文件编码步步分解.md)

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247484190&idx=3&sn=b6b928e45c4ce29c42a34192ff5543ec&chksm=97219f2fa05616395682cb6701f5a9f832ac57d555daa77c9fce55923227efb45c65ca0c7bba&scene=21#wechat_redirect" _target="blank" style="color:black;">提升代码可读性的 10 个技巧</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>具有较强可读性的代码，能帮助你调试程序，不让自己活得太累。代码可读性是计算机编程领域中普遍存在的问题。这也是</font></div></div></div>

> 我们比较挑剔，年轻冲动喜欢挑刺。这篇文章太散乱了，看起来还是公众号凑数的文章，不影响我们去延伸，文章中：
>
> - 1、注释和文档，注释看个人素养，编码就如果写文章，辞藻除了华丽外还有有物，不能变量都是a、b、c、d，变量本身要有意义，语句尽量人可读（虽然我们的第一目标是让机器更可读），在不可读难以理解的情况下，加入规范的优雅的有必要的注释；代码规整如果作文段落分明、文字清晰规整不混乱，这方面除了人为外，还可以借助IDE
> - 2、保持一致的缩进：IDE、协作者之间的配合沟通
> - 3、不必要的注释：除非你心情好，写首诗、写个歌词
> - 4、代码分组：前面提到了编码如同作文，一个文件有自己的主题意义，需要不同代码模块来配合，每个模块又有自己的目的和意义，每相邻的几句代码也都可能组成一定的含义，代码模块如同作文段落，代码分组如同段落中句号分组，让阅读的人可以快速理解
> - 5\6\7\8\9、保持一致的命名规范：都是属于代码简洁之道的范畴，推荐：[代码整洁之道-php版](/互联网/编码规范/代码整洁之道-php版.md)、[前端编码规范](/互联网/编码规范/前端编码规范.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485578&idx=1&sn=d7b0e10bc4a26271f8bbe183f1b122b5&chksm=972194bba0561dad8e29eb07359ae81f0e2da3ffb353587a53e8959feaf498eaeec613fc25a3&scene=21#wechat_redirect" _target="blank" style="color:black;">9个小窍门帮你提高编码技能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>你想成为一名程序员，并且正在为之奋斗，那么你努力的方式，比如做事方法、思维习惯都将会影响你会成为怎样的一名程</font></div></div></div>

> 不论现在你学什么语言，主动、积极、多看、多问、多做项目、多加班（年轻身体好的时候，注意作息），其他都不是事，应用层的开发编程，就是你早知道能记住早记住（经验）的比较，而不像人功智能机器学习、算法研究这些可能需要更高的一些门槛（线代、统计、微积分等高数基础知识）
>
> 年轻人，多看书、多运动、多睡觉、少玩手机

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485584&idx=2&sn=9c91f2358cd7a5f57f2fca630455bbf9&chksm=972194a1a0561db792a61069104f098fe558d78e6c7e6611be55be112bb16ec85132c0247add&scene=21#wechat_redirect" _target="blank" style="color:black;">了解php工作原理以及常用功能</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP的设计理念及特点多进程模型：由于PHP是多进程模型，不同请求间互不干涉，这样保证了一个请求挂掉不会对全</font></div></div></div>

> 标题太大，内容太小。php说到底，本质就是处理字符串。

----

> 吐槽下：php开源社区公众号的汇总的这些文章，我们看到这里快看不下去了，2018年的文章都是拼凑，标题说造火箭，内容螺丝钉。后面还是另外开我们自己收集的PHP相关好文。

----


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247487297&idx=2&sn=b6a9e1ec4b732ae94df7417dece929b6&chksm=97219370a0561a6614c709e37c94422cc8ec39bdb71e942f2cf91a288fb4deddad8f2e2fa7ba&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP7中的异常与错误处理</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>PHP 中的 Exception, Error, Throwable</font></div></div></div>

> php的异常，虽然向好好学java的异常，但天生残疾，详见：[解惑PHP的异常](./解惑PHP的异常.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486758&idx=1&sn=66a881de0f30a9057b08154ad43887fa&chksm=97219117a05618017818377e0b8a79154beff4537590d5452c114fb0a77fa2a7f8968ce5ceac&scene=21#wechat_redirect" _target="blank" style="color:black;">九种跨域方式实现原理（完整版）</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>前言前后端数据交互经常会碰到请求跨域，什么是跨域，以及有哪几种跨域方式，这是本文要探讨的内容。</font></div></div></div>

> 目前如果跨域的内部自己的域名，可以通过jsonp、CORS设置去实现，如果跨域域名是他人域名，可通过反向代理，还有一些可以通过修改浏览器同源策略设置来访问






<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486264&idx=1&sn=61a34cbe0a25308bba39ccc990a24918&chksm=97219709a0561e1fafbc2b0651948c9d0306138472ae54bc64e82583f7bf86f95967c9317ec5&scene=21#wechat_redirect" _target="blank" style="color:black;">在PHP开发中六种加密的方法，你用的是哪种？</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>php 自带的加密函数 不可逆的加密函数为：md5()、crypt()md5() 用来计算 MD5 哈稀。</font></div></div></div>

> 有时你需要一些简单的不复杂的加密工具函数，这篇文章可以收藏补充道自己的工具函数库中。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486360&idx=1&sn=00b31c996f9ff9f101068e6cf34c7a82&chksm=972197a9a0561ebfe7312b10beb44dad8332762be333a5685f837f5e88c6305fe3038cb267d2&scene=21#wechat_redirect" _target="blank" style="color:black;">最实用的PHP Composer教程</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>Composer是PHP用来管理依赖（dependency）关系的工具。Composer通常情况下通过com</font></div></div></div>

> php20+年，php5之后的几年在生态上也在快速追赶java，并学习java、js生态，虽然PHP的PEAR也表现甚佳，但还不够。且现在流行的语言，java、python、go、js都有库管理工具，生态体系一下子舒服多了。composer必须会，如果你还写php的话。详见：[Composer常用命令与示例](/互联网/开发环境/Composer常用命令.md)


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485234&idx=3&sn=370f09ff0b51c89ce4112a04d5f774c2&chksm=97219b03a05612153a78e5a52111f15c8cf62b3b75b08447c04e05d30db88253dbe601a69867&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP7之静态库的扩展封装</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>在本文，我们将建立一个简单的lib静态库，并在扩展中进行封装调用。代码基础代码这个扩展，我们将在say扩展上</font></div></div></div>

> 这篇文章让新手对php的扩展有了进一步的认识，不再惧怕php扩展，也能稍微了解Swoole库

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485181&idx=2&sn=a906bfae18a2009df61c214019f78872&chksm=97219acca05613da699ce84e1d98781770359f3a21114219081fd26435cf2a3eb9b4f24879ed&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP 语言来编码和解码 JSON 对象</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>将为大家介绍如何使用 PHP 语言来编码和解码 JSON 对象。环境配置在 php5.2.0 及以上版本已经</font></div></div></div>

> 这文章有点不必要，json在php5.2之后已经内置，不需要另外安装扩展或使用第三方库实现。
> 
> php的json函数，我们需要了解并知道的是json_encode\json_decode的后面几个参数都有什么用途，当我们有需求的时候，才知道内置的json函数就能够处理，不需要自己亲自动手处理。以及如何运用json_last_error判断识别json处理是否异常，异常后如何友好处理，这些更能体现我们的编码水平，能实现正向功能，只是其一，还得考虑到异常情况，接受异常并如何友好的处理异常。

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486878&idx=1&sn=188c63c8ccd9bce1a74de0c6f9f7d5de&chksm=972191afa05618b9e3f672d98645f2ce0ec0e46edc9b6277a42e02e30f4cf12fad61f4917158&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP控制反转(IOC)和依赖注入(DI)</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>IOC（inversion of control）控制反转模式；控制反转是将组件间的依赖关系从程序内部</font></div></div></div>

> 现在的框架很喜欢说自己运用了控制反转/依赖注入，有时直接说IOC/DI，新手看了一脸懵逼。看了这篇文章，我们新手就可以知道这个到底是什么

## 面试相关


<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485012&idx=4&sn=795fc4f754b6ff088d08212e0e7bd6fb&chksm=97219a65a0561373a0341eed9cee9d545265e5544248c0ffef84c26b79e3fd4f1f80a64a4949&scene=21#wechat_redirect" _target="blank" style="color:black;">php面试题之—PHP核心技术（高级部分）</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>一、PHP核心技术1.写出一个能创建多级目录的PHP函数（新浪网技术部）\x26lt;?php\x0a    /**</font></div></div></div>

> 看起来是至少5年前的面试题，现在的面试题要考“造火箭”的架构、微服务、设计模式、算法、缓存设计、数据库设计

<div name="section_div" style="background-color:#f5f5dc;padding:5px 10px;width:480px;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247485044&idx=2&sn=dab225c2684eaad961f2f4593bd9c2b3&chksm=97219a45a0561353481fa3fd1af1860d5a4d5a804cca0dd7bd114ad5226aa12a6133d86fb8b9&scene=21#wechat_redirect" _target="blank" style="color:black;">PHP面试篇</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="https://mp.weixin.qq.com/favicon.ico" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>长的好看的人都关注了我们面试之后总是没有下文，你知道自己输在哪吗？面试官最看中你的哪些表现？仪表风度、专业知</font></div></div></div>

> 我们以面试官的角色来看这篇文章：
> - 1、仪表风度：是人都喜欢干净整洁不邋遢的人，颜值和谐更佳，身体英朗精神抖索（毕竟要996的福利嘛）
> - 2、专业知识：能解决面试官的问题（一般可能都是公司碰到过的问题），有一定深度，能反杀面试官的更佳
> - 3、工作经验：大厂喜欢大厂出来的，小厂大部分更喜欢大厂出来的，但也有小厂喜欢全面的人才（高度不足广度来补，毕竟大厂的全面的人才哪会来小厂）
> - 4、口表达能力：沟通是很重要的一方面，谈吐清楚、逻辑清晰、说话有分寸，更多详见：[职场团队/沟通](/职场团队/沟通/README.md)
> - 5、综合分析能力：考虑周全、有细节、有态度、透过现象直击本质（推荐：[马哲通俗之美 | 5 辩证法之联系发展全面](https://zhuanlan.zhihu.com/p/78195313)）
> - 6、反映与应变能力：抛出线上问题，让其提供处理方案
> - 7、人际交往能力：开发一般都比较宅，但不乏有些交际能力强的人，喜欢参加社会活动，喜欢组织活动
> - 8、自我控制能力：
> - 9、求职动机：人求职的本质目的：钱和爽（马云说离职的本质原因就是：1、钱没有给够；2、干的不爽）。我们如果硬要问求职者动机，求职者也不会直白的告知，我们就不要去灵魂拷问了；可以尝试了解其对公司、产品、技术、团队、其他工作条件福利等方面的了解和兴趣程度


....

## 小结

中间有段看不去了，好多文章是凑数的，都不算是推荐，只能是借标题写写我们再这方面的一些想法和经验，分享给有需要的小伙伴们。

## 其他

[PHP性能优化解读与补充](./PHP性能优化解读与补充.md)

----

> 持续补充

@tsingchan 2020















