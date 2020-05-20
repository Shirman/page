<!-- TOC -->

- [1. 下载安装ImageMagick](#1-下载安装imagemagick)
- [2. 下载安装Imagick](#2-下载安装imagick)
    - [2.1放置imagick.so文件](#21放置imagickso文件)
    - [2.2配置php.ini](#22配置phpini)

<!-- /TOC -->
> imagick是一个PHP的扩展，用ImageMagick提供的API来进行图片的创建与修改，不过这些操作已经包装到扩展imagick中去了，最终调用的是ImageMagick提供的API. 


> ImageMagick是一套软件系列，主要用于图片的创建、编辑以及转换等，详细的解释见ImageMagick的官方网站http://www.imagemagick.org/，ImageMagick与GD的性能要高很多，如果是在处理大量的图片时更加能体现ImageMagick的性能。 

### 1. 下载安装ImageMagick  ###
Linux代码(可以下载更新的版本，有些方法只有在更新版本才能使用)

	wget ftp://mirror.aarnet.edu.au/pub/imagemagick/ImageMagick-6.6.8-10.tar.gz  
  
	tar -xzvf ImageMagick-6.6.8-10.tar.gz  
	./configure --prefix=/usr/local/imagemagick  
	make  
	make install  

**可能碰到的问题：**

后来安装ImageMagick6.8.6总是编译失败：magick/.libs/libMagickCore-6.Q16.so: undefined reference to `jpeg_default_qtables'所以不得不重新编译libjpeg最新版本，下载jpegsrc.v9.tar.gz 
Linux代码

	tar -xzvf jpegsrc.v9.tar.gz  
	cd jpeg-9  
	./configure  
	make libdir=/usr/lib64   
	make libdir=/usr/lib64 install  

曾经在一个服务器上，libdir参数必须有，否则错误仍在。我猜，如果不用libdir参数，而是在make install后执行  sudo ldconfig /usr/lib64(imagemagick官方说明)是否起到同样效果。

### 2. 下载安装Imagick  ###

> 注：安装该扩展不要求安装ImageMagick
 
从http://pecl.php.net/package/imagick找到imagick的最新的版本 
Linux代码

	wget http://pecl.php.net/get/imagick-3.4.3RC1.tgz 
  
	tar -xzvf imagick-3.4.3RC1  
	phpize  
	./configure --with-php-config=/usr/local/php/bin/php-config --with-imagick=/usr/local/imagemagick  
	make  
	make install  


	make install执行结果显示： 
	Installing shared extensions:     /usr/local/php/lib/php/extensions/no-debug-non-zts-20090626/ 
	Installing header files:          /usr/local/php/include/php/ 

#### 2.1放置imagick.so文件 ####
生成imagick.so到php/lib/php/extensions/no-debug-non-zts-20131226（至于这个路径，不同系统不同版本略有差异，只要找php/lib/php/extensions即可）

#### 2.2配置php.ini ####
然后手动配置php.ini使imagick.so扩展生效：(如果不知道放哪里，就简单的在php.ini文件最后加上以下两行)

	[imagick]
	extension=imagick.so

----------
@tsingchan
