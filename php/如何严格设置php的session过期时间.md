### 如何严格设置php中session过期时间


- [如何严格设置php中session过期时间](#如何严格设置php中session过期时间)
    - [首先来了解下php中session的基本原理](#首先来了解下php中session的基本原理)
    - [再看session垃圾回收器回收机制](#再看session垃圾回收器回收机制)



> 你有没有尝试过设置一个严格的特定时间内过期的session？如果有，说明你已经有一定的了解，可以再加深下对session相关机制的了解及解决方案；如果还么有，巧了，看完这篇胜读好多session的文章。
> 这个问题普遍存在于php工程师的心里。我们先给出解决方案：

- 设置客户端cookie的lifetime为30分钟；
- 设置session的最大存活周期也为30分钟；
- 为每个session加入时间戳，然后在程序调用时进行判断；

#### 首先来了解下php中session的基本原理 ####

PHP中的session**有效期默认是1440秒（24分钟）**，也就是说，客户端超过24分钟没有刷新，当前session就会失效。如果用户关闭了浏览器，实际上Session还是存在于服务器上的。

大家知道，Session储存在服务器端，根据客户端提供的SessionID来得到这个用户的文件，然后读取文件，取得变量的值，SessionID可以使用客户端的Cookie或者Http1.1协议的
Query_String（就是访问的URL的“?”后面的部分）来传送给服务器，然后服务器读取Session的目录……

要控制Session的生命周期，首先我们需要了解一下php.ini关于Session的相关设置（打开php.ini文件，在“[Session]”部分）：

- session.use_cookies：默认的值是“1”，代表SessionID使用Cookie来传递，反之就是使用Query_String来传递；

- session.name：这个就是SessionID储存的变量名称，可能是Cookie，也可能是Query_String来传递，默认值是“PHPSESSID”；

- session.cookie_lifetime：这个代表SessionID在客户端Cookie储存的时间，默认是0，代表浏览器一关闭SessionID就作废！

- session.gc_maxlifetime：这个是Session数据在服务器端储存的时间，如果超过这个时间，那么Session数据就自动删除！（**实际上这里我们需要咬文嚼字了，英文里的意思是将会可能被垃圾回收器给回收了，或者说不超过这个时间就不会回收，但超过了不一定回收**）

那我们根据以上的设置说明设置一次session的严格过期时间：

- 把“session.use_cookies”设置为1，使用Cookie来储存SessionID，不过默认就是1，一般不用修改；

- 把“session.cookie_lifetime”改为你需要设置的时间（比如一个小时，就可以设置为3600，以秒为单位）;

- 把“session.gc_maxlifetime”设置为和“session.cookie_lifetime”一样的时间；

#### 再看session垃圾回收器回收机制 ####

在PHP的文档中明确指出，设定session有效期的参数是session.gc_maxlifetime。可以在php.ini文件中，或者通过ini_set()函数来修改这一参数。问题在于，经过多次测试，修改这个
参数基本不起作用，session有效期仍然保持24分钟的默认值。

**由于PHP的工作机制，它并没有一个daemon线程，来定时地扫描session信息并判断其是否失效。当一个有效请求发生时，PHP会根据全局变量session.gc_probability/session.gc_divisor的值，来决定是否启动一个GC（Garbage Collector）。**

默认情况下，session.gc_probability ＝ 1，session.gc_divisor ＝100，也就是说有1%的可能性会启动GC。GC的工作，就是扫描所有的session信息，用当前时间减去session的最后修
改时间（modified date），同session.gc_maxlifetime参数进行比较，如果生存时间已经超过gc_maxlifetime，就把该session删除。

到此为止，工作一切正常。那为什么会发生gc_maxlifetime无效的情况呢？
在默认情况下，session信息会以文本文件的形式，被保存在系统的临时文件目录中。在Linux下，这一路径通常为\tmp，在 Windows下通常为C:\Windows\Temp。当服务器上有多个PHP应
用时，它们会把自己的session文件都保存在同一个目录中。同样地，这些PHP应用也会按一定机率启动GC，扫描所有的session文件。

问题在于，GC在工作时，并不会区分不同站点的session。举例言之，站点A的gc_maxlifetime设置为2小时，站点B的 gc_maxlifetime设置为默认的24分钟。当站点B的GC启动时，它会扫
描公用的临时文件目录，把所有超过24分钟的session文件全部删除掉，而不管它们来自于站点A或B。这样，站点A的gc_maxlifetime设置就形同虚设了。

找到问题所在，解决起来就很简单了。修改session.save_path参数，或者使用session_save_path()函数，把保存session的目录指向一个专用的目录，gc_maxlifetime参数工作正常了。

**还有一个问题就是，gc_maxlifetime只能保证session生存的最短时间**，并不能够保存在超过这一时间之后session信息立即会得到删除。因为GC是按机率启动的，可能在某一个长时间内
都没有被启动，那么大量的session在超过gc_maxlifetime以后仍然会有效。

解决这个问题的一个方法是，把session.gc_probability/session.gc_divisor的机率提高，如果提到100%，就会彻底解决这个问题，但显然会对性能造成严重的影响。另一个方法是自己
在代码中判断当前session的生存时间，如果超出了 gc_maxlifetime，就清空当前session。

**另外在查看php手册时发现，手册本身提供了一个函数用来管理session，可以有效的解决session定时过期问题，**
    <?php
    class FileSessionHandler
    {
	    private $savePath;
	    
	    function open($savePath, $sessionName)
	    {
		    $this->savePath = $savePath;
		    if (!is_dir($this->savePath)) {
		    	mkdir($this->savePath, 0777);
	    	}
	    
	    	return true;
	    }
	    
	    function close()
	    {
	    	return true;
	    }
	    
	    function read($id)
	    {
	    	return (string)@file_get_contents(“$this->savePath/sess_$id”);
	    }
	    
	    function write($id, $data)
	    {
	    	return file_put_contents(“$this->savePath/sess_$id”, $data) === false ? false : true;
	    }
	    
	    function destroy($id)
	    {
	    	$file = “$this->savePath/sess_$id”;
	    	if (file_exists($file)) {
	    		unlink($file);
	    	}
	    
	    	return true;
	    }
	    
	    function gc($maxlifetime)
	    {
	    	foreach (glob(“$this->savePath/sess_*”) as $file) {
		    	if (filemtime($file) + $maxlifetime < time() && file_exists($file)) {
		    		unlink($file);
		    	}
	    	}
	    
	    	return true;
	    }
    }
    
    $handler = new FileSessionHandler();
    session_set_save_handler(
    array($handler, ‘open’),
    array($handler, ‘close’),
    array($handler, ‘read’),
    array($handler, ‘write’),
    array($handler, ‘destroy’),
    array($handler, ‘gc’)
    );
    
    // the following prevents unexpected effects when using objects as save handlers
    register_shutdown_function(‘session_write_close’);
    
    session_start();
    // proceed to set and retrieve values by key from $_SESSION
    ?>

PS：也需有的童鞋会有一些疑惑，为什么定义的时候read 、write等方法都有参数，但是用session_set_save_handler函数调用的时候却没有加入任何参数，这是因为这些参数本身是不用我们手动传入的，而是由php自动传入，可以理解为php会从php.ini里读取对应的设置，然后将对应的值传入对应方法！所以我们不用担心这些参数，只需要按照这些函数的格式，和参数个数将方法写好就OK！

----
@tsingchan
