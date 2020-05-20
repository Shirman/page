<!-- TOC -->

- [1、apache或nginx增加子域名vhost配置](#1apache或nginx增加子域名vhost配置)
- [2、在Application目录下新增模块](#2在application目录下新增模块)
- [3、项目中增加子域名配置](#3项目中增加子域名配置)
- [4、旧URL问题兼容问题](#4旧url问题兼容问题)

<!-- /TOC -->

> 注意：tp3.2 已经是老版本了 @2019，

> 移动互联网的快速发展，带动了API服务，移动客户端也会慢慢积累一些版本的客户端，且逐步强更淘汰一些更旧版本的客户端，而服务端的API服务，当然也需要区分版本（主要是大版本上的区分），避免多版本的代码混杂在一块，导致牵一发而动全身。


### 1、apache或nginx增加子域名vhost配置 ###
以apache为例：
	
	<VirtualHost *:80>
	ServerName v1.tpapi.com
	DocumentRoot /var/www/html/ThinkPHP-API-Version-Test/
	ErrorLog "logs/v1_error_log"
	CustomLog "logs/v1_access_log" common
	<Directory /var/www/html/ThinkPHP-API-Version-Test>
	    Options FollowSymLinks
	    AllowOverride All
	    Order allow,deny
	    Allow from all
	</Directory>
	</VirtualHost>


	<VirtualHost *:80>
	ServerName v2.tpapi.com
	DocumentRoot /var/www/html/ThinkPHP-API-Version-Test/
	ErrorLog "logs/v2_error_log"
	CustomLog "logs/v2_access_log" common
	<Directory /var/www/html/ThinkPHP-API-Version-Test>
	    Options FollowSymLinks
	    AllowOverride All
	    Order allow,deny
	    Allow from all
	</Directory>
	</VirtualHost>


### 2、在Application目录下新增模块 ###
从Index模块复制命名为Two模块，将Two模块中涉及到namespace Index/xxxx批量更改为namespace Two/xxxx。

这样就新增了一个Two模块。

> Index模块作为版本v1访问的模块。
 
> Two模块作为版本v2访问的模块。

### 3、项目中增加子域名配置 ###
在全局配置文件Common/Conf/config.php新增如下配置：
    
	/**
     * 开启子域名配置
     */
    'APP_SUB_DOMAIN_DEPLOY' => 1,
    'APP_SUB_DOMAIN_RULES' => array(
        'v1' => 'Index',
		//'v1.tpapi.com' => 'Index',
        'v2' => 'Two',
		
    ),
	
以上配置效果：

> 如原来访问的URL：http://www.tpapi.com/Index/Innertest/decodePickList
> 
> 配置后的访问URL：http://v1.tpapi.com/Innertest/decodePickList
> 
> 
> 如原来访问的URL：http://www.tpapi.com/Two/Innertest/decodePickList
> 
> 配置后的访问URL：http://v2.tpapi.com/Innertest/decodePickList


### 4、旧URL问题兼容问题 ###
如果在启用子域名部署后，已经有线上版本，我们也要考虑兼容旧的URL访问。

这个ThinkPHP已经在做了兼容，未在项目配置中指定子域名部署的，apache或nginx要求如何访问，还怎么访问。

也就是上面两个原来访问的URL即：

> http://www.tpapi.com/Index/Innertest/decodePickList
> http://www.tpapi.com/Two/Innertest/decodePickList

仍然可以继续使用。


----------
@tsingchan 







