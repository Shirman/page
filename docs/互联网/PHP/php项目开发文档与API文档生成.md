<!-- TOC -->

- [一、php项目生成开发文档](#一php项目生成开发文档)
    - [1、下载及安装](#1下载及安装)
    - [2、使用介绍](#2使用介绍)
    - [3、简单范例：](#3简单范例)
    - [4、使用--config配置](#4使用--config配置)
- [二、API文档生成与维护](#二api文档生成与维护)
    - [1、API文档规范](#1api文档规范)
    - [2、API文档编辑](#2api文档编辑)
- [附录：](#附录)

<!-- /TOC -->

### 一、php项目生成开发文档 ###
> 注意：apigen4.2版本要求php版本至少5.4以上
> 
> 再注意：使用apigen的前提是每个类、方法、函数、变量都要有详细规范的注释说明，类型、文字说明、返回类型、返回范例等

#### 1、下载及安装 ####
（以下操作或许需要sudo）
下载phar包：

    wget http://apigen.org/apigen.phar

赋予执行权限：

	chmod +x apigen.phar  

将文件放入可执行bin目录：

	mv apigen.phar /usr/local/bin/apigen

确认安装成功：

	apigen --version

#### 2、使用介绍 ####
	apigen  generate options

	apigen generate --help
	Usage:
	generate [-s|--source="..."] [-d|--destination="..."] ...
	Options:
	--source (-s) 源码文件目录（可设置多个值）（必填）
	--destination (-d) 文档生成目录（必填）
	--access-levels 属性及方法的访问级别（默认："public","protected"）（可选）（可设置多个值）
	--base-url 文档根路径
	--config 自定义apigen.neon配置文件
	--google-cse-id Custom google search engine id (for search box).
	--google-analytics 谷歌统计代码
	--debug 开启Debug模式
	--deprecated 将标签（@deprecated）生成弃用信息
	--download 添加一个下载链接到ZIP归档文件
	--extensions 允许解析的文件扩展名列表（默认："php"）（可设置多个值）
	--exclude 被匹配的目录和文件将不被解析（可设置多个值）
	--groups 菜单项分组（默认："auto"）
	--charset 源文件的字符集（可设置多个值）
	--main 被匹配的名称前缀生成为“主要项目”
	--internal 包含标签@internal
	--php 生成PHP内部类文档
	--skip-doc-path 被匹配的文件将会出现在类树中，但不会链接到这些文档（可设置多个值）
	--no-source-code 不高亮源代码中的标签
	--template-theme 模板名称（默认："default"）
	--template-config 模板设置
	--title 文档标题
	--todo 将标签（@todo）生成任务文档
	--tree 生成类、接口、特征和异常的目录树
	--help (-h) 显示帮助信息
	--quiet (-q) 不输出任何信息
	--version (-V) 显示程序版本号

#### 3、简单范例： ####
	apigen generate --access-levels="public","protected","private" 
	--no-source-code -s /var/www/html/Application/Wh/ -d /var/www/html/doc/

【默认会忽略private， 默认生成源码文件】
为Wh目录生成代码文档，允许处理public protected private的方法，不加入源码文件，源目录/var/www/html/Application/Wh/，生成文档目录/var/www/html/doc/

#### 4、使用--config配置 ####
在范例中我们加入不同的选项配置，由于参数偏多，我们可以把参数选项写入一个配置文件中，当执行生成文档时加载配置文件：

	apigen generate --config=/root/apigen/apigen.neon

**附录： apigen.neon 配置文件**

### 二、API文档生成与维护 ###
#### 1、API文档规范 ####
服务端API文档对于不同平台不同版本的客户端开发来说，是很重要的。
文档主要记录API输入与输出。格式、字域、类型等协议。

**API文档一般我们需要哪些内容：**

> 接口名称、接口功能描述、接口调用方式、接口输入、接口输出、接口范例

由于接口内容比较详细，可以采用人工编写markdown的方式来生成漂亮可读的API的详细文档。


#### 2、API文档编辑 ####
Windows下建议使用markdown pad2编辑工具

MP官方：http://markdownpad.com/



### 附录： ###

apigen.neno配置文件（其中去掉大部分没有用上的配置）：

	# Source file or directory to parse
	source: /var/www/html/wh/Application/Warehouse/
	# Directory where to save the generated documentation
	destination: /var/www/html/doc/
	# List of allowed file extensions
	#extensions: [php]
	# Mask to exclude file or directory from processing
	#exclude:
	# Don't generate documentation for classes from file or directory with this mask
	#skipDocPath:
	# Don't generate documentation for classes with this name prefix
	#skipDocPrefix:
	# Character set of source files
	#charset: auto
	accessLevels: [public, protected, private]
	noSourceCode: Yes


----
@tsingchan