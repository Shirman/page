<!-- TOC -->

- [1.概述](#1概述)
- [2.输入验证和输出显示](#2输入验证和输出显示)
    - [1.命令注入](#1命令注入)
    - [2.跨站脚本](#2跨站脚本)
    - [3.文件包含](#3文件包含)
    - [4.代码注入](#4代码注入)
    - [5.SQL注入](#5sql注入)
    - [6.XPath注入](#6xpath注入)
    - [7.HTTP响应拆分](#7http响应拆分)
    - [8.文件管理](#8文件管理)
    - [9.文件上传](#9文件上传)
    - [10.变量覆盖](#10变量覆盖)
    - [11.动态函数](#11动态函数)
- [3.会话安全](#3会话安全)
- [4.加密](#4加密)
- [5.认证和授权](#5认证和授权)
- [6.随机函数](#6随机函数)
- [7.特殊字符和多字节编码](#7特殊字符和多字节编码)
- [8.PHP危险函数](#8php危险函数)
- [9.信息泄露](#9信息泄露)
- [10.PHP环境](#10php环境)
- [11.性能预审计](#11性能预审计)

<!-- /TOC -->



## 1.概述

代码审核，是对程序源代码进行系统性检查的工作。目的是为了找到并且修复在开发阶段存在的一些编码漏洞或者逻辑错误，避免漏洞被非法利用给团队带来不必要的风险。

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PEIxTHe5SDvzrMcVNHEib5jB0giccX1wgBicAeVeogoWQQRhGUCj43sswgQh3XGEuI6CXncQl79WrSbQ/640?wx_fmt=jpeg)

  
代码审核不是简单的检查代码，审核代码的目的是确保代码能安全的做到对信息和资源进行足够的保护，所以熟悉产品应用的所有业务流程对于控制潜在风险是非常重要的。审核人员可以使用类似下面的问题对开发者进行访谈，来收集产品应用信息。  
  
- 应用服务中包含什么类型的敏感信息，如何保护这些信息的？  
- 应用服务是对内提供服务，还是对外？哪些人会使用，他们都是可信用户么？- 用户的输入可信吗？  
- 应用服务部署在哪里？  
- 应用服务对于企业的重要性？  

最好的方式是做一个checklist，让开发人员填写。Checklist能比较直观的反映应用服务的信息和开发人员所做的编码安全，它应该涵盖可能存在严重漏洞的模块，例如：数据验证、身份认证、会话管理、授权、加密、错误处理、日志、安全配置、网络架构等。
  
## 2.输入验证和输出显示

> 用户的输入应该认为是不可信的。

大多数漏洞的形成原因主要都是未对输入数据进行**安全验证**或对输出数据未经过**安全处理**，一些比较严格的数据验证方式为：  
  
- 对数据进行精确匹配；  
- 接受白名单的数据；  
- 拒绝黑名单的数据；  
- 对匹配黑名单的数据进行编码；
  
在PHP中可由用户输入的变量列表如下：  
$\_SERVER  
$\_GET  
$\_POST  
$\_COOKIE  
$\_REQUEST  
$\_FILES  
$\_ENV  
$\_HTTP\_COOKIE\_VARS  
$\_HTTP\_ENV\_VARS  
$\_HTTP\_GET\_VARS  
$\_HTTP\_POST\_FILES  
$\_HTTP\_POST\_VARS  
$\_HTTP\_SERVER\_VARS  

我们应该对这类输入变量进行检查（大部分框架已经对输入做了一定的安全验证和处理，除非产品应用特有的数据验证）
  
### 1.命令注入  

> 除非不得已，才调用执行系统命令的函数。

PHP执行系统命令可以使用以下几个函数：system、exec、passthru、“、shell\_exec、popen、proc\_open、pcntl\_exec  

我们通过在全部程序文件中搜索这些函数，确定函数的参数是否会因为外部提交而改变，检查这些参数是否有经过安全处理。  
  
**防范方法：**

- 1.使用自定义函数或函数库来替代外部命令的功能  
- 2.使用escapeshellarg函数来处理命令参数  
- 3.使用safe\_mode\_exec\_dir指定可执行文件的路径  
  
### 2.跨站脚本  

反射型跨站常常出现在用户提交的变量接受以后经过处理，直接输出显示给客户端；存储型跨站常常出现在用户提交的变量接受过经过处理后，存储在数据库里，然后 又从数据库中读取到此信息输出到客户端。输出函数经常使用：echo、print、printf、vprintf、< %=$test%>  

对于反射型跨站，因为是立即输出显示给客户端，所以应该在当前的php页面检查变量被客户提交之后有无立即显示，在这个过程中变量是否有经过安全检查。  

对于存储型跨站，检查变量在输入后入库，又输出显示的这个过程中，变量是否有经过安全检查。  
  
**防范方法：**
- 1.如果输入数据只包含字母和数字，那么任何特殊字符都应当阻止  
- 2.对输入的数据经行严格匹配，比如邮件格式，用户名只包含英文或者中文、下划线、连字符  
- 3.对输出进行HTML编码，编码规范  

  
### 3.文件包含  

PHP可能出现文件包含的函数：include、include\_once、require、require\_once、show\_source、highlight\_file、readfile、file\_get\_contents、fopen、file  
  
**防范方法：**

- 1.对输入数据进行精确匹配，比如根据变量的值确定语言en.php、cn.php，那么这两个文件放在同一个目录下’language/’.$\_POST\[‘lang’\].’.php’，那么检查提交的数据是否是en或者cn是最严格的，检查是否只包含字母也不错  
- 2.通过过滤参数中的/、..等字符  
  
### 4.代码注入

PHP可能出现代码注入的函数：eval、preg\_replace+/e、assert、call\_user\_func、call\_user\_func\_array、create\_function  
查找程序中程序中使用这些函数的地方，检查提交变量是否用户可控，有无做输入验证  
  
**防范方法：**

- 1.输入数据精确匹配
- 2.白名单方式过滤可执行的函数

### 5.SQL注入 

SQL注入因为要操作数据库，所以一般会查找SQL语句关键字：insert、delete、update、select，查看传递的变量参数是否用户可控制，有无做过安全处理  
  
**防范方法：**

- 使用参数化查询  
  
### 6.XPath注入  

Xpath用于操作xml，我们通过搜索xpath来分析，提交给xpath函数的参数是否有经过安全处理  

防范方法：  

- 对于数据进行精确匹配  
  
### 7.HTTP响应拆分  

PHP中可导致HTTP响应拆分的情况为：使用header函数和使用$\_SERVER变量。注意PHP的高版本会禁止HTTP表头中出现换行字符，这类可以直接跳过本测试。  
  
防范方法：  

- 1.精确匹配输入数据  
- 2.检测输入，输入中如果有\\r或\\n，直接拒绝  
  
### 8.文件管理  

> 和执行系统命令一样，除非不得已，不建议直接操作文件

PHP 的用于文件管理的函数，如果输入变量可由用户提交，程序中也没有做数据验证，可能成为高危漏洞。我们应该在程序中搜索如下函数：copy、rmdir、 unlink、delete、fwrite、chmod、fgetc、fgetcsv、fgets、fgetss、file、 file\_get\_contents、fread、readfile、ftruncate、file\_put\_contents、fputcsv、 fputs，**但通常PHP中每一个文件操作函数都可能是危险的**。  

http://ir.php.net/manual/en/ref.filesystem.php  
  
防范方法：  

- 1.对提交数据进行严格匹配  
- 2.限定文件可操作的目录  
  
### 9.文件上传  

PHP文件上传通常会使用move\_uploaded\_file，也可以找到文件上传的程序进行具体分析  
  
防范方式：  

- 1.使用白名单方式检测文件后缀
- 2.上传之后按时间能算法生成文件名称  
- 3.上传目录脚本文件不可执行
- 4.注意%00截断  
  
### 10.变量覆盖  

PHP变量覆盖会出现在下面几种情况：  

1.遍历初始化变量  

例：  
foreach($\_GET as $key => $value)  
$$key = $value;  

2.函数覆盖变量：

parse\_str、mb\_parse\_str、import\_request\_variables  

3.Register\_globals=ON时，GET方式提交变量会直接覆盖  
防范方法：  

1.设置Register\_globals=OFF  
2.不要使用这些函数来获取变量  
  
### 11.动态函数  

当使用动态函数时，如果用户对变量可控，则可导致攻击者执行任意函数。  
例：  

```
$myfunc = $_GET['myfunc']; $myfunc(); 
```

防御方法：不要这样使用函数  

## 3.会话安全

1.HTTPOnly设置  
session.cookie\_httponly = ON时，客户端脚本(JavaScript等)无法访问该cookie，打开该指令可以有效预防通过XSS攻击劫持会话ID  

2.domain设置  
检查session.cookie\_domain是否只包含本域，如果是父域，则其他子域能够获取本域的cookies  

3.path设置  
检查session.cookie\_path，如果网站本身应用在/app，则path必须设置为/app/，才能保证安全  

4.cookies持续时间  
检查session.cookie\_lifetime，如果时间设置过程过长，即使用户关闭浏览器，攻击者也会危害到帐户安全  

5.secure设置  
如果使用HTTPS，那么应该设置session.cookie\_secure=ON，确保使用HTTPS来传输cookies  

6.session固定  
如果当权限级别改变时（例如核实用户名和密码后，普通用户提升到管理员），我们就应该修改即将重新生成的会话ID，否则程序会面临会话固定攻击的风险。  

7.CSRF  
跨站请求伪造攻击，是攻击者伪造一个恶意请求链接，通过各种方式让正常用户访问后，会以用户的身份执行这些恶意的请求。我们应该对比较重要的程序模块，比如修改用户密码，添加用户的功能进行审查，检查有无使用一次性令牌防御csrf攻击。  
  
## 4.加密

1.明文存储密码  
采用明文的形式存储密码会严重威胁到用户、应用程序、系统安全。  

2.密码弱加密  
使用容易破解的加密算法，MD5加密已经部分可以利用md5破解网站来破解  

3.密码存储在攻击者能访问到的文件  
例如：保存密码在txt、ini、conf、inc、xml等文件中，或者直接写在HTML注释中  
  
## 5.认证和授权

1.用户认证  

检查代码进行用户认证的位置，是否能够绕过认证，例如：登录代码可能存在表单注入。  

检查登录代码有无使用验证码等，防止暴力破解的手段  

2.函数或文件的未认证调用  

一些管理页面是禁止普通用户访问的，有时开发者会忘记对这些文件进行权限验证，导致漏洞发生某些页面使用参数调用功能，没有经过权限验证，比如index.php?action=upload  

3.密码硬编码  
有的程序会把数据库链接账号和密码，直接写到数据库链接函数中。  
  
## 6.随机函数

1.rand()  
rand()最大随机数是32767，当使用rand处理session时，攻击者很容易破解出session，建议使用mt\_rand()  

2.mt\_srand()和mt\_rand()  
PHP4和PHP5<5.2.6，这两个函数处理数据是不安全的。在web应用中很多使用mt\_rand来处理随机的session，比如密码找回功能等，这样的后果就是被攻击者恶意利用直接修改密码。  
  
## 7.特殊字符和多字节编码

多字节编码  
  
## 8.PHP危险函数

1.缓冲区溢出  
confirm\_phpdoc\_compiled  
影响版本：  
phpDocumentor phpDocumentor 1.3.1  
phpDocumentor phpDocumentor 1.3 RC4  
phpDocumentor phpDocumentor 1.3 RC3  
phpDocumentor phpDocumentor 1.2.3  
phpDocumentor phpDocumentor 1.2.2  
phpDocumentor phpDocumentor 1.2.1  
phpDocumentor phpDocumentor 1.2  
mssql\_pconnect/mssql\_connect  
影响版本：PHP < = 4.4.6  
crack\_opendict  
影响版本：PHP = 4.4.6  
snmpget  
影响版本：PHP <= 5.2.3  
ibase\_connect  
影响版本：PHP = 4.4.6  
unserialize  
影 响版本：PHP 5.0.2、PHP 5.0.1、PHP 5.0.0、PHP 4.3.9、PHP 4.3.8、PHP 4.3.7、PHP 4.3.6、PHP 4.3.3、PHP 4.3.2、PHP 4.3.1、PHP 4.3.0、PHP 4.2.3、PHP 4.2.2、PHP 4.2.1、PHP 4.2.0、PHP 4.2-dev、PHP 4.1.2、PHP 4.1.1、PHP 4.1.0、PHP 4.1、PHP 4.0.7、PHP 4.0.6、PHP 4.0.5、PHP 4.0.4、PHP 4.0.3pl1、PHP 4.0.3、PHP 4.0.2、PHP 4.0.1pl2、PHP 4.0.1pl1、PHP 4.0.1  

2.session\_destroy()删除文件漏洞  

影响版本：不祥，需要具体测试  
测试代码如下：  

```
<?php  
    session_save_path(‘./’);  
    session_start();  
    if($_GET[‘del’]) {  
        session_unset();  
        session_destroy();  
    }else{  
        $_SESSION[‘do’]=1;  
        echo(session_id());  
        print_r($_SESSION);  
    }  
?>  
```

当我们提交cookie PHPSESSIONID=/../1.php，相当于删除了此文件  

3.unset()-zend\_hash\_del\_key\_or\_index漏洞  

zend\_hash\_del\_key\_or\_index PHP4小于4.4.3和PHP5小于5.1.3，可能会导致zend\_hash\_del删除了错误的元素。当PHP的unset()函数被调用时，它会阻止变量被unset。  
  
## 9.信息泄露

1.phpinfo  

如果攻击者可以浏览到程序中调用phpinfo显示的环境信息，会为进一步攻击提供便利  
  
## 10.PHP环境

1.open\_basedir设置  
open\_basedir能限制应用程序能访问的目录，检查有没有对open\_basedir进行设置，当然有的通过web服务器来设置，例如：apache的php\_admin\_value，nginx+fcgi通过conf来控制php设置  

2.allow\_url\_fopen设置  
如果allow\_url\_fopen=ON，那么php可以读取远程文件进行操作，这个容易被攻击者利用  

3.allow\_url\_include设置  
如果allow\_url\_include=ON，那么php可以包含远程文件，会导致严重漏洞  

4.safe\_mode\_exec\_dir设置  
这个选项能控制php可调用的外部命令的目录，如果PHP程序中有调用外部命令，那么指定外部命令的目录，能控制程序的风险  

5.magic\_quote\_gpc设置  
这个选项能转义提交给参数中的特殊字符，建议设置magic\_quote\_gpc=ON  

6.register\_globals设置  
开启这个选项，将导致php对所有外部提交的变量注册为全局变量，后果相当严重  

7.safe\_mode设置  
safe\_mode是PHP的重要安全特性，建议开启  

8.session\_use\_trans\_sid设置  
如果启用 session.use\_trans\_sid，会导致 PHP 通过 URL 传递会话 ID，这样一来，攻击者就更容易劫持当前会话，或者欺骗用户使用已被攻击者控制的现有会话。  

9.display\_errors设置  
如果启用此选项，PHP将输出所有的错误或警告信息，攻击者能利用这些信息获取web根路径等敏感信息  

10.expose\_php设置  
如果启用 expose\_php 选项，那么由 PHP 解释器生成的每个响应都会包含主机系统上所安装的 PHP 版本。了解到远程服务器上运行的 PHP 版本后，攻击者就能针对系统枚举已知的盗取手段，从而大大增加成功发动攻击的机会。

## 11.性能预审计

php发展了20+年，出现越来越多的框架，自从php5后，php框架在安全方面已经可以规避以上大部分编码意外的问题，除了输入与输出仍然是最主要的审计外，性能问题会导致部分系统安全，所以现在代码审计，我们还会额外补充性能方面的初步审计，基本原则：逻辑算法简单可读可信可靠，流量小、计算少、连接少、处理快实现高可靠。

- 算法复杂度（时间与空间）
- 资源分发
- 缓存减少逻辑层计算量
- 数据库慢查询优化，减少长连接、大事务，提高并发处理连接数
- 异步、消息队列、协程高效利用系统资源
- 借助第三方方案，减少资源调度


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
