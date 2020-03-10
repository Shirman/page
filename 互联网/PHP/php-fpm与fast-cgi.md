FastCgi 与 PHP-FPM 之间的区别


  
## CGI 的作用


CGI 是为了保证 web server 传递过来的数据是标准格式的，方便 CGI 程序的编写者。

web server（比如说 nginx）只是内容的分发者。

- 如果请求 `/index.html`，那么 web server 会去文件系统中找到这个文件，发送给浏览器，这里分发的是静态数据。
- 如果现在请求的是 `/index.php`，根据配置文件，nginx 知道这个不是静态文件，需要去找 PHP 解析器来处理，那么他会把这个请求简单处理后交给 PHP 解析器。Nginx 会传哪些数据给 PHP 解析器呢？url、查询字符串、POST 数据、HTTP header 等等，CGI 就是规定要传哪些数据、以什么样的格式传递给后方处理这个请求的协议。

当 web server 收到 `/index.php` 这个请求后，会启动对应的 CGI 程序，这里就是 PHP 的解析器。接下来 PHP 解析器会解析 php.ini 文件，初始化执行环境，然后处理请求，再以规定 CGI 规定的格式返回处理后的结果，退出进程。web server 再把结果返回给浏览器。

**CGI 是个协议，跟进程什么的没关系** 。

## fastCgi 是什么


fastCgi 是用来提高 CGI 程序性能的。

那么 CGI 程序的性能问题在哪呢？"PHP 解析器会解析 `php.ini` 文件，初始化执行环境"，就是这里了。标准的 CGI 对每个请求都会执行这些步骤，所以处理每个请求的时间会比较长。

那么 fastCgi 是怎么做的呢？首先，fastCgi 会先启一个 master，解析配置文件，初始化执行环境，然后再启动多个 worker。当请求过来时，master 会传递给一个 worker，然后立即可以接受下一个请求。这样就避免了重复的劳动，效率自然是高。而且当 worker 不够用时，master 可以根据配置预先启动几个 worker 等着；当然空闲 worker 太多时，也会停掉一些，这样就提高了性能，也节约了资源。这就是 fastCgi 对进程的管理。

## PHP-FPM 是什么


PHP-FPM 是一个实现了 FastCgi 的程序，被 PHP 官方收录。

PHP 的解释器是 php-cgi，它只是个 CGI 程序，只能解析请求，返回结果，不会进程管理。所以就出现了一些能够调度 php-cgi 进程的程序，比如说由 lighthttpd 分离出来的 spawn-fcgi。PHP-FPM 也是这么个东西，在长时间的发展后，逐渐得到了大家的认可，也越来越流行。

PHP-FPM其实是PHP源代码的一个补丁，旨在将FastCGI进程管理整合进PHP包中。必须将它patch到你的PHP源代码中，在编译安装PHP后才可以使用。

现在我们可以在最新的PHP 5.3.2的源码树里下载得到直接整合了PHP-FPM的分支，据说下个版本会融合进PHP的主分支去。相对Spawn-FCGI，PHP-FPM在CPU和内存方面的控制都更胜一筹，而且前者很容易崩溃，必须用crontab进行监控，而PHP-FPM则没有这种烦恼。

PHP5.3.3已经集成php-fpm了，不再是第三方的包了。PHP-FPM提供了更好的PHP进程管理方式，可以有效控制内存和进程、可以平滑重载PHP配置，比spawn-fcgi具有更多有点，所以被PHP官方收录了。在./configure的时候带 –enable-fpm参数即可开启PHP-FPM。


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
