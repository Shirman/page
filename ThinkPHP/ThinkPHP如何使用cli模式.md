## ThinkPHP如何使用cli模式

> 和其他框架一样，ThinkPHP有人会提供除了web访问方式外，也提供里cli模式，即命令模式。
> 在需要做批处理、定时任务等场景里，通常使用cli模式，使得产品代码具有统一性，代码复用率高，开发效率更高。


- [ThinkPHP如何使用cli模式](#thinkphp如何使用cli模式)
    - [1、新增入口文件cli.php](#1新增入口文件cliphp)
    - [2、解决引入路径问题](#2解决引入路径问题)
    - [3、新增cli模式下的通用配置](#3新增cli模式下的通用配置)
    - [4、在cli模式下如何执行](#4在cli模式下如何执行)
    - [5、参数模式说明](#5参数模式说明)
        - [5.1、普通参数模式，URL_MODE为0](#51普通参数模式url_mode为0)
        - [5.2、PATHINFO模式，URL_MODE为1](#52pathinfo模式url_mode为1)
        - [5.3、其他REWRITE或兼容模式](#53其他rewrite或兼容模式)
    - [6、如何获取参数](#6如何获取参数)
    - [7、其他](#7其他)


**基于ThinkPHP3.2版本的cli模式，步骤如下：**

### 1、新增入口文件cli.php ###
复制框架文件中的入口文件index.php，改为cli.php作为cli模式下的入口文件，index.php文件仍然作为正常模式下的入口文件。

在新的入口文件cli.php加入常量APP_MODE，值为cli：

	define(‘APP_MODE’,'cli');

### 2、解决引入路径问题 ###
通常在cli模式下执行php脚本文件时，一般使用绝对路径去执行，这导致了执行脚本文件时，报错提示引入的/ThinkPHP/ThinkPHP.php文件与/Application/目录不存在，将引入时的相对路径更改为绝对路径：[cli.php中]

	define( 'APP_PATH', dirname(__FILE__).'/Application/' ); 
	require dirname( __FILE__).’/ThinkPHP/ThinkPHP.php';

### 3、新增cli模式下的通用配置 ###
在ThinkPHP/Mode/目录下，复制common.php文件，改为cli.php，作为cli模式下的通用配置文件。

### 4、在cli模式下如何执行 ###
**手动执行：**
	
	php -f /var/www/html/myproject/cli.php Home/Index/GetUser/id/1

**在cron定时任务中：**
	
	30 3 1 * * php -f /var/www/html/myproject/cli.php Home/Cache/Init


### 5、参数模式说明 ###
	
#### 5.1、普通参数模式，URL_MODE为0 ####

在普通参数模式下面 ，我们需要这样调用模块和操作

	php -f /var/www/html/cli.php module controller action id 4

#### 5.2、PATHINFO模式，URL_MODE为1 ####

在PATHINFO参数模式下面，我们可以这样调用模块和操作

	php -f /var/www/html/myproject/cli.php Home/Index/GetUser/id/1

#### 5.3、其他REWRITE或兼容模式 ####
也可以采用PATHINFO的模式获取
	
### 6、如何获取参数 ###
在5中已经说明了如何传参。这里说如何获取参数。
比如：

	php -f /var/www/html/myproject/cli.php Home/Index/GetUser/id/1

在ThinkPHP中，通过以下方式可以获得id参数：

	I("get.id");

以此类推。

### 7、其他 ###

7.1、可能有些项目特殊场景下，需要删除runtime下的所有缓存文件。才能正常使用cli模式。

----
@tsingchan