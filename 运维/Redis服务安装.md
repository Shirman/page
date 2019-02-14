## Redis服务安装及php redis扩展安装与加载



- [Redis服务安装及php redis扩展安装与加载](#redis服务安装及php-redis扩展安装与加载)
    - [一、下载安装](#一下载安装)
    - [二、配置文件](#二配置文件)
    - [三、开机自启动](#三开机自启动)
    - [四、PHP redis扩展安装](#四php-redis扩展安装)
    - [五、PHP redis扩展加载](#五php-redis扩展加载)
    - [六：测试](#六测试)
    - [附](#附)



### 一、下载安装
官方地址：http://redis.io/download

	tar zxvf redis-2.8.9.tar.gz
	
	cd redis-2.8.9

直接make 编译

	make

可使用root用户执行`make install`，将可执行文件拷贝到/usr/local/bin目录下。这样就可以直接敲名字运行程序了。(新版本在install后会在/usr/local/bin目录下生成server和cli的二进制可执行文件)

	make install

### 二、配置文件

在redis编译根目录下有redis.conf模版，复制到/etc/redis/redis.conf


	cp redis.conf /etc/redis/redis.conf

一些比较常用的配置都有，比如：

    #修改daemonize为yes，即默认以后台程序方式运行，否则需要手动运行时加&强制后台运行
    
    daemonize no
    
    #可修改默认监听端口
    
    port 6379
    
    #修改生成默认日志文件位置
    
    logfile "/home/xxxx/logs/redis.log"
    
    #配置持久化文件存放位置
    
    dir /home/xxx/redisData

### 三、开机自启动

在redis编译根目录下 utils/ 有redis服务自启动脚本模版：redis_init_script

	cp utils/redis_init_script /etc/init.d/redisd

修改redisd自启动加载配置：

	#配置文件位置，需要修改
	CONF="/etc/redis/${REDISPORT}.conf"

修改为：

	#配置文件位置，需要修改
	CONF="/etc/redis/redis.conf"


加入chkconfi列表，开机自启动：

如果直接开启自启动： 
	
	chkconfig redisd on

\#将会报错：

service redisd does not support chkconfig 

\#解决：

在自动脚本redisd前缀注释修改为：

	#!/bin/sh
	# chkconfig:   2345 90 10
	# description:  Redis is a persistent key-value database
	#

再次设置：
	
	chkconfig redisd on

检测是否在自启动列表中：

	chkconfig --list |grep redis

开启redis服务：
	
	service redisd start

关闭redis服务：
		
	service redisd stop


### 四、PHP redis扩展安装

PHP redis扩展官方下载地址:http://pecl.php.net/package/redis

建议使用稳定版本，也不一定要求最新版本，除非你确定新版本兼容本地系统等服务。

	wget http://pecl.php.net/get/redis-2.2.8.tgz

	tar zxf redis-2.2.8.tgz

	cd redis-2.2.8

	#phpize一般在php的bin可执行目录下
	/usr/local/php/bin/phpize
	
	./configure --with-php-config=/usr/local/php/bin/php-config
	
	make 
	
	make install

安装成功会提示扩展so文件放在哪个目录：

	Installing shared extensions:     /usr/local/php/lib/php/extensions/no-debug-non-zts-20131226/


### 五、PHP redis扩展加载

	#具体看所使用php的配置文件php.ini在哪里
	vim /etc/php.ini

在文件尾巴加入：

	[redis]
	extension=redis.so

### 六：测试
@todo

### 附
当然新版本的php，都自带redis扩展，不需要额外编译。

----
@tsingchan



