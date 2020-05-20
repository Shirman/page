
<!-- TOC -->

- [HTTP-GET 和 HTTP-POST](#http-get-和-http-post)
- [Web Service（SOAP）](#web-servicesoap)
- [Restful](#restful)
- [SOAP与HTTP的区别](#soap与http的区别)
- [Restful与SOAP的区别](#restful与soap的区别)

<!-- /TOC -->
  
> Webservice 两种实现方式跟HTTP（post/get） 直接请求各个优缺点，以及如何判断选择使用哪一种。

#### HTTP-GET 和 HTTP-POST

HTTP-GET和HTTP-POST是标准协议，他们使用HTTP（超文本传输协议）谓词（谓词是指条件表达式的求值返回真或假的过程。）对参数进行编码并将参数作为名称/值对传递，还使用关联的请求语义。每个协议都包含一系列HTTP请求标头，HTTP请求标头及其他一些信息定义客户端向服务器请求哪些内容，哪个服务器用一系列HTTP响应标头和所请求的数据进行响应。

HTTP-GET 使用 MIME 类型 application/x-www-form-urlencoded（将追加到处理请求的服务器的 URL 中）以 URL 编码文本的形式传递其参数。 URL 编码是一种字符编码形式，可确保传递的参数中包含一致性文本，例如将空格编码为 %20，其它符号转换为%XX,其中XX为该符号以16进制表示的ASCII（或ISO Latin-1）值。 追加的参数也称为查询字符串。

与 HTTP-GET 类似，HTTP-POST 参数也是 URL 编码的。 但是，名称/值对是在实际的 HTTP 请求消息内部传递的，而不是作为 URL 的一部分进行传递。

我们日常网站、系统都是使用这种形式进行访问我们的应用程序。

#### Web Service（SOAP）

Webservice的一个最基本的目的就是提供在各个不同平台的不同应用系统的协同工作能力。

Web service 就是一个应用程序，它向外界暴露出一个能够通过Web进行调用的API。

SOAP是一种简单基于xml的轻量协议，用户web上交换结构化信息和类型信息。

soap请求是HTTP POST的一个专用版本，遵循一种特殊的xml消息格式Content-type设置为: text/xml任何数据都可以xml化。

#### Restful

REST(Representational State Transfer)一种轻量级的Web Service架构，可以完全通过HTTP协议实现。其实现和操作比SOAP和XML-RPC更为简洁，还可以利用缓存Cache来提高响应速度，性能、效率和易用性上都优于SOAP协议。 REST架构对资源的操作包括获取、创建、修改和删除资源的操作正好对应HTTP协议提供的GET、POST、PUT和DELETE方法(Verb)

#### SOAP与HTTP的区别

为什么要学习web service？大多数对外接口会实现web service方法而不是http方法，如果你不会，那就没有办法对接。 web service相对http (post/get)有好处吗？

1.接口中实现的方法和要求参数一目了然

2.不用担心大小写问题

3.不用担心中文urlencode问题

4.代码中不用多次声明认证(账号,密码)参数

5.传递参数可以为数组，对象等... web service相对http（post/get）快吗？

由于要进行xml解析，速度可能会有所降低。 web service 可以被http（post/get）替代吗？

完全可以，而且现在的开放平台都是用的HTTP（post/get）实现的。

#### Restful与SOAP的区别

安全性：SOAP会好于restful

效率和易用性(REST更胜一筹)

成熟度(总的来说SOAP在成熟度上优于REST)

<font size=2 color=grey>[阅读原文](https://zhuanlan.zhihu.com/p/23464866)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
