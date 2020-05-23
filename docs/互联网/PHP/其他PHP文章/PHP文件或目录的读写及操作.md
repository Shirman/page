<!-- TOC -->

- [文件：](#文件)
    - [1、File_exists(string name)](#1file_existsstring-name)
    - [2、Fopen（string filename，string mode）](#2fopenstring-filenamestring-mode)
- [读取文件的方式：](#读取文件的方式)
    - [3、Fgetc（source handle）](#3fgetcsource-handle)
    - [4、Fgets（source handle）](#4fgetssource-handle)
    - [5、Fread（resource handle，int length）](#5freadresource-handleint-length)
    - [6、File（string filename）](#6filestring-filename)
    - [7、Readfile(string filename)](#7readfilestring-filename)
- [写入文件：](#写入文件)
    - [8、Is_writeable（string filename）](#8is_writeablestring-filename)
    - [9、Fwrite(resource handle,string content[,int length])](#9fwriteresource-handlestring-contentint-length)
    - [10、Fputs（resource handle，string content）](#10fputsresource-handlestring-content)
- [关闭文件：](#关闭文件)
    - [11、Fclose（resource handle）](#11fcloseresource-handle)
    - [12、文件操作](#12文件操作)
- [目录读取及操作：](#目录读取及操作)
    - [1、Is_dir（string filename）](#1is_dirstring-filename)
    - [2、Opendir（string path）](#2opendirstring-path)
    - [3、Readdir(resource dirhandle)](#3readdirresource-dirhandle)
    - [4、Mkdir（string path，int mode）](#4mkdirstring-pathint-mode)
    - [5、Rmdir(string dirname)](#5rmdirstring-dirname)
    - [6、Closedir（resource handle）](#6closedirresource-handle)

<!-- /TOC -->

### 文件： ###

#### 1、File_exists(string name) ####

检查文件或目录是否存在

存在返回true 	不存在返回false

	Feof（resource handle）

测试文件指针是否到了文件结束的位置

如果碰到eof也就是结束的时候就返回true，否则返回false

#### 2、Fopen（string filename，string mode） ####

用于打开文件或一个url

Fopen将指定的filename的资源绑定在一个流上

打开文件的模式有(均为小写形式)

- R:只读方式，将文件指针指向文件头
- R+：读写方式，将文件指针指向文件头
- W：写入方式打开 ，将文件指针指向文件头并将文件大小截为0，如果文件不存在则创建
- W+：读写方式打开，。。。。。。。。。。。。。。。。。。。。。。。
- A：写入方式打开，将文件指针指向文件末尾，如果文件不存在则创建之
- A+：读写方式打开，。。。。。。。。。
- X
- X+
- B：强制使用二进制模式这样就不会进行数据格式转换了

常用的组合：r，a+ ，wb

	$handle = fopen("/tmp/cc.txt","r"); -- 一般只为读取文件的情况
	$handle = fopen("/tmp/cc.txt","wb"); --可能需要对文件进行读写的
	$handle = fopen("/tmp/cc.txt","a+"); -- 可能需要对文件进行读写的

一般要判断文件是否能打开：

	If(!$handle = fopen("/tmp/cc.txt","wb"))
	{
		Echo "file open fail";
		Exit;
	}

### 读取文件的方式： ###
#### 3、Fgetc（source handle） ####

从文件中读取一个字符，从文件头开始；

当读取指针指向文件结束符EOF时，返回false;

从文件中一个一个字符的读取:

	While（false !== ($char = fgetc($handle))）
	{
		Echo "$char\r\n";
	}

#### 4、Fgets（source handle） ####
从文件中读取一行或指定字节数的字符串；

出错时返回false

	While（!feof（$handle））
	{
		$buffer = fgets($handle,4096);//不指定字节数，默认是一行1024字节
	}

#### 5、Fread（resource handle，int length） ####

读取文件，从文件指针handle读取最多length个字节;如果出错返回false

	$conten = fread($handle,filesize($filename)); --相当于读取整个文件的内容

#### 6、File（string filename） ####

将整个文件读入到一个数组中

数组中每个单元就对应文件中的一行，包括换行符

如果失败会返回false

	$arr = file($filename)

#### 7、Readfile(string filename) ####

读入一个文件并写入到缓存中
比较少用。

### 写入文件： ###
#### 8、Is_writeable（string filename） ####

判断给定文件名是否可写

可写返回true   不可写返回false

#### 9、Fwrite(resource handle,string content[,int length]) ####
写入文件   返回写入文件的字符数，出错时返回false

把content内容写入到文件指针handle处，从哪里开始写这个由文件打开的模式，即打开时已经指定文件指针的位置（是文件开头或是文件末尾）

Length指定允许写入length个字节

	Fwrite（$handle,$content）

#### 10、Fputs（resource handle，string content） ####
写入文件  

是fwrite的别名   使用方式一样

### 关闭文件： ###
#### 11、Fclose（resource handle） ####
操作文件结束后是要关闭文件指针

成功返回true  失败返回false


#### 12、文件操作 ####
//测试文件的copy move unlink 和文件属主、权限的关系

$filename = "/tmp/cc.txt";

//打开文件 文件必须有足够的操作权限x表示有操作权限 如果是root则拥有对文件的所有权限 否则将打开文件失败

	if(!$handle = fopen($filename,"a+"))
	{
	    die("\r\nfile ".$filename." open fail");
	}
	$content_arr = file($filename);
	echo "BEG Read File...";
	foreach($content_arr as $content)
	{
	    echo $content."\r\n";
	}
	echo "END Read\r\nBEG Write File...";
	$new_content = "my name is cc\r\ni am from right\r\ngo to left\r\ntoday i will go home\r\nnew file yyl.txt";
	if(is_writeable($filename))
	{
	    fwrite($handle,$new_content);
	    echo "END Write\r\n";
	}
	else
	{
	    die("\r\nfile ".$filename." is not writeable");
	}
	
	$newfilename = "/tmp/yyl.txt";
	
	//复制文件 文件对用户必须有足够的操作权限
	if(!copy($filename,$newfilename))
	{
	    die("\r\n".$filename." copy fail");
	}
	else
	{
	    echo "$filename copy success to $newfilename\r\n";
	}
	
	//删除文件 文件必须是属主自己或root才可删除 当然要在有权限的情况下
	if(!unlink($filename))
	{
	    die("\r\n".$filename." unlink fail");
	}
	else
	{
	    echo "$filename unlink success\r\n";
	}
	
	//移动或重命名文件 文件必须属主或root才可重命名 当然要在有适当权限的情况下
	if(!rename($newfilename,$filename))
	{
	    die("\r\n".$newfilename." rename fail");
	}
	else
	{
	    echo "$newfilename rename success $filename\r\n";
	}


要注意文件的路径的存在，否则将可能删除整个目录下的所有文件；‘


### 目录读取及操作： ###

#### 1、Is_dir（string filename） ####
判断给定目录名是否是目录

是目录则返回true  否则返回false

#### 2、Opendir（string path） ####
打开目录句柄

如果因为path错误、权限等问题不能打开则返回false

	If(is_dir("/tmp/"))
	{
		If(!$dirhandle = Opendir("/tmp"))
		{
			Die("open dir fail");
		}
	}

#### 3、Readdir(resource dirhandle) ####
从目录句柄中读取条目

返回下一个文件的文件名（包括目录名），文件名以文件系统中的排序返回

成功就返回文件名 否则就返回false

	While(false !== ($filename = readdir($dirhandle)))
	{
		Echo $filename;//可以适当过滤不需要的文件名 也包括目录名
	}

#### 4、Mkdir（string path，int mode） ####
尝试创建一个由path指定的目录，mode指的是目录的创建后的权限 如最大权限777

	Mkdir（"/tmp/ccc",0777）;

#### 5、Rmdir(string dirname) ####
尝试删除dirname指定的目录，不够该目录必须是空的

#### 6、Closedir（resource handle） ####
关闭目录句柄


----------
@tsingchan
