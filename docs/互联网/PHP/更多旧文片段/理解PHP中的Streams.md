<!-- TOC -->

- [Stream 基础知识](#stream-基础知识)
- [php:// 包装类](#php-包装类)
- [Stream上下文](#stream上下文)
- [总结](#总结)

<!-- /TOC -->


> Streams 是PHP提供的一个强有力的工具，我们常常在不经意会使用到它，如果善加利用将大大提高PHP的生产力。 驾驭Streams的强大力量后，应用程序将提升到一个新的高度。

下面是PHP手册中对Streams的一段描述：

> Streams 是在PHP 4.3.0版本被引入的，它被用于统一文件、网络、数据压缩等类文件的操作方式，为这些类文件操作提供了一组通用的函数接口。简而言之，一个stream就是一个具有流式行为的资源对象。也就是说，我们可以用线性的方式来对stream进行读取和写入。并且可以用使用fseek()来跳转到stream内的任意位置。
> 
> 每个Streams对象都有一个包装类，在包装中可以添加处理特殊协议和编码的相关代码。PHP中已经内置了一些常用的包装类，我们也可以创建和注册自定义的包装类。我们甚至能够使用现有的context和filter对包装类进行修改和增强。

#### Stream 基础知识 ####

Stream 可以通过: **//** 方式来引用。其中是包装类的名字，中的内容是由包装类的语法指定，不同的包装类的语法会有所不同。

PHP默认的包装类是file://，也就是说我们在访问文件系统的时候，其实就是在使用一个stream。

我们可以通过下面两种方式来读取文件中的内容，readfile('/path/to/somefile.txt')或者readfile('file:///path/to/somefile.txt')，这两种方式是等效的。如果你是使用readfile('http://google.com/')，那么PHP会选取HTTP stream包装类来进行操作。

正如上文所述，PHP提供了不少内建的包转类，protocol以及filter。 按照下文所述的方式，可以查询到本机所支持的包装类：

在我机器上的输出结果为：

    Array ( [0] => tcp [1] => udp [2] => unix [3] => udg [4] => 
    ssl [5] => sslv3 [6] => sslv2 [7] => tls ) Array ( [0] => https [1] 
    => ftps [2] => compress.zlib [3] => compress.bzip2 [4] => php [5] 
    => file [6] => glob [7] => data [8] => http [9] => ftp [10] => 
    zip [11] => phar ) Array ( [0] => zlib.* [1] => bzip2.* [2] => 
    convert.iconv.* [3] => string.rot13 [4] => string.toupper [5] => 
    string.tolower [6] => string.strip_tags [7] => convert.* [8] => 
    consumed [9] => dechunk [10] => mcrypt.* [11] => mdecrypt.* )
提供的功能非常多，看上去还不错。

*除了上述内建的Stream，我们还可以为 Amazon S3, MS Excel, Google Storage, Dropbox 甚至Twitter编写更多的第三方的Stream。*

#### php:// 包装类 ####

PHP中内建了本语言用于处理I/O stream的包装类。可以分为几类：

基础的有php://stdin,php://stdout, 以及php://stderr，这3个stream分别映射到默认 的I/O资源。同时PHP还提供了php://input，通过这个包装类可以使用只读的方式访问POST请求中的raw body。 这是一项非常有用的功能，特别是在处理那些将数据负载嵌入到POST请求中的远程服务时。

下面我们使用cURL工具来做一个简单的测试：

    curl -d "Hello World" -d "foo=bar&name=John" 
    http://localhost/dev/streams/php_input.php
在PHP脚本中使用print_r($_POST)的测试结果如下所示：

    Array ( [foo] => bar [name] => John )
我们注意$_POST array中是无法访问到第一项数据的。但是如果我们使用readfile('php://input')，结果就不同了：

    Hello World&foo=bar&name=John

*PHP 5.1又增加了php://memory和php://tempstream这两个包转类，用于读写临时数据。正如包装类命名中所暗示的，这些数据被存储在底层系统中的内存或者临时文件中。*

php://filter是一个元包装类，用于为stream增加filter功能。在使用readfile()或者file_get_contents()/stream_get_contents()打开stream时，filter将被使能。

在第一个例子中使用了一个filter来对保存到磁盘中的数据进行编码处理，在二个例子中，使用两个级联的filter来从远端的URL读取数据。使用filter能为你的应用带来极为强大的功能。

#### Stream上下文 ####

context是一组stream相关的参数或选项，使用context可以修改或增强包装类的行为。例如使用context来修改HTTP包装器是一个常用到的使用场景。 这样我们就可以不使用cURL工具，就能完成一些简单的网络操作。下面是一个例子：

    array( 'method'=>"POST", 
		'header'=> "Auth: SecretAuthTokenrn" . 
		"Content-type: application/x-www-form-urlencodedrn" . 
		"Content-length: " . strlen("Hello World"),
 		'content' => 'Hello World' ) 
	); 
	$default = stream_context_get_default($opts); 
	readfile('http://localhost/dev/streams/php_input.php');

首先要定义一个options array,这是个二位数组，可以通过$array\['wrapper'\]\['option_name'\]的形式来访问其中的参数。(注意每个包装类中context的options是不同的)。然后调用stream_context_get_default()来设置这些option,stream_context_get_default()同时还会将默认的context作为结果返回回来。设置完成后，接下来调用readfile()，就会应用刚才设置好的context来抓取内容。

在上面的例子中，内容被嵌入到request的body中，这样远端的脚本就可以使用php://input来读取这些内容。同时，我们还能使用apache_request_headers()来获取request的header，如下所示：

    Array (
		[Host] => localhost 
		[Auth] => SecretAuthToken 
		[Content-type] => application/x-www-form-urlencoded 
		[Content-length] => 11 
	)

在上面的例子中是修改默认context的参数，当然我们也可以创建一个新的context,进行交替使用。

#### 总结 ####

我们怎样在开发中驾驭stream的强大力量呢?使用stream能为我们的程序带来什么现实的好处? 正如前文介绍的那样，stream对所有文件系统相关的功能进行了抽象，所以我第一个想到的应用场景是使用虚拟文件系统的包装类来访问PaaS供应商提供的服务，比如说访问HeroKu或者AppFog，它们实际上都没有真正文件系统。 使用stream只要对我们的应用程序稍作修改，就可以将其移植到云端。