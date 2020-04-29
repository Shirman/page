<!-- TOC -->

- [目录](#目录)
- [缘由：](#缘由)
- [nginx配置：](#nginx配置)
- [基本认证密码生成：](#基本认证密码生成)
- [最后解释下nginx的配置:](#最后解释下nginx的配置)

<!-- /TOC -->

### 目录


- [Nginx配置http基本认证及资源文件下载目录别名配置](#nginx配置http基本认证及资源文件下载目录别名配置)
    
    - [缘由：](#缘由)
    - [nginx配置：](#nginx配置)
    - [基本认证密码生成：](#基本认证密码生成)
    - [最后解释下nginx的配置:](#最后解释下nginx的配置)




### 缘由： ###
> 一般我们会在自己的站点提供一个特殊url：http://xxx.xxx.com/download/提供下载目录列表；

### nginx配置： ###

       location /download/ {
                auth_basic "yourusername";
                auth_basic_user_file /data/your_pass_file;
                charset utf-8;
                autoindex on;
                autoindex_exact_size off;
                autoindex_localtime on;
                #add_header Content-Disposition "attachment;";
                alias /data/your/resourceDir/;
        }

### 基本认证密码生成： ###
	
	sudo htpasswd -c -d /data/your_pass_file  your_password

你可以查看pass_file这个加密文件，里面有你的明文密码和加密密码；

	apache htpasswd命令选项参数说明

	　　-c 创建一个加密文件
	　　-n 不更新加密文件，只将apache htpasswd命令加密后的用户名密码显示在屏幕上
	　　-m 默认apache htpassswd命令采用MD5算法对密码进行加密
	　　-d apache htpassswd命令采用CRYPT算法对密码进行加密
	　　-p apache htpassswd命令不对密码进行进行加密，即明文密码
	　　-s apache htpassswd命令采用SHA算法对密码进行加密
	　　-b 在apache htpassswd命令行中一并输入用户名和密码而不是根据提示输入密码
	　　-D 删除指定的用户

### 最后解释下nginx的配置: ###

	auth_basic "yourusername";
	auth_basic_user_file /data/your_pass_file;
	#这两行指定了访问页面需要的用户和密码；

	charset utf-8;
	#该行指定了页面采用什么编码解释输出；

	autoindex on;
	#该行指定访问目录时将目录文件以列表显示；

	autoindex_exact_size off;
	#该行指定是否显示文件精确大小；
	
	autoindex_localtime on;
	#该行指定是否显示文件时间；
	
	#add_header Content-Disposition "attachment;";
	#该行指定输出要用附件的方式处理；我们这里需要的是列表，所以不需要；
	
	alias /data/your/resourceDir/;
	#该行指定在访问host之后带有/download/的url时直接访问/data/your/resourceDir/下的资源；


----------
@tsingchan