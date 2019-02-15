

### Linux常用命令

	cat		在屏幕上显示文件内容
	cat		连接文件   cat file1 file2 >file3  文件1、2连接成文件3
	cd		切换目录
	cp		cp file1 file2
	file		显示文件内容类型与用途
	info		显示给定命令的信息页
	less		屏幕上显示问价内容一次一屏
	ls		列出目录的内容
	man		显示给定命令联机帮助页
	mkdir	创建新目录
	more	与less相似
	mv		文件重命名或移动
	mv a b   如果b不存在则是把a重命名为b   而若b存在则会把a移动到b目录下。
	pwd		显示当前工作目录
	rm		删除文件
	-r      递归删除目录下的所有目录层 
	-f      强制删除，非交互式删除
	rmdir	删除空目录
	touch	创建空文件
	zcat		在屏幕上显示压缩文件的内容  zcat /tmp/report.gz
	startx	启动X window system
	alias 	命令别名    alias ll=”ls -ln”
	echo		输出到屏幕  echo hello
	export	使得新创建的环境变量可供同一环境中使用 export PS1=”$”
	history	历史命令
	mail		
	ps -aux | mail -s "subject ps" real@9ong.com
	mail content....
	Cc:
	^D
	可直接发送邮件到real@9ong.com
	set		显示当前环境中已经定义的所有环境变量
	tee		将程序的输出发送到某文件的同时也在屏幕上显示
	wc		显示文本文件中的字符数、字数、行数等信息
	chgrp	改变文件或目录的组
	chmod	改变文件或目录的访问模式（文件的权限）
	chown	改变分配给文件或目录组的所有者
			chgrp –R usergroup filename
			chown –R user.group filename
			chmod 777 filename
			chmod (ugo)(+-)(rwx) filename
	df		显示系统信息
	find		find /home –name filename –print   
	在home目录下查找文件名匹配filename的文件
	groups	列出当前有效的uid的所属组
	gzip		压缩文件   gzip archive
	gunzip	解由gzip压缩的文件  gunzip archive.gz
	id		显示当前有效的uid gid
	ln		硬链接或符号链接  ln –s /etc/abcd abc(符号链接)
	logname	登陆到linux上的用户名
	mount	把物理设备或逻辑设备作为可用的文件系统
	su		改变有效的uid   su或su mike  （系统会要求输入相应用户的密码）
	tar		打包压缩文件  （略-详见打包命令）
	umask	创建文件时，阻止默认的文件权限值
	umount	详见mount命令版
	w who whoami		显示当前有效id
	cmp		用于判断文件是否相同 cmp addold addnew
	diff		用于找出两个文件之间的不同之处并以一种标准格式显示出来
	grep		详见grep版
	head		显示文件开头几行
	tail		显示文件最后几行
			head -3 开头的前3行        tail -3  最后3行
			head +3 开头到倒数第3行    tail +3 从开头的第3行到结尾
	sed		详见sed版
	sort		对文本文件中的行进行排序，并将排序后的结果输出
	at		将输入的一条或多条命令通过atd守护进程在未来某个时刻完成 
	at 5：00 report.src
	atq		列举等待atd执行的每个作业
	atrm		从atd的执行命令队列中删除一项作业 atrm 14
	bg		将作业置于后台，从而使shell提示符重新活跃
	fg		将作业提至前台
	free		显示内存使用信息
	kill		发送信号给进程 kill -9 进程id
	killall	发送信号给参数名称相匹配的进程  killall 进程名（而非进程id）
	ps		显示当前系统上运行的进程 ps –aux  、、、ps –ef
	top		显示linux中某个特定时刻cpu运算最密集的进程及进程相关信息
	tty		显示当前终端设备名称
	nice		运行并改变程序的优先级  nice –n 进程名    （-20《n《19）
	renice	改变运行中进程的优先级  renice  n 进程id    （-20《n《19）
	ftp		详见ftp版    连接：ftp user:pwd@ip:port
	ifconfig	显示当前已经配置好的网络接口或配置网络接口
	setup	配置linux相关内容，包括网络
	ping		在系统之间发送数据包用于网络测试
	chkconfig		配置档引导linux时默认启动的服务
	init		管理init程序，将系统切换到不同的run level  ： init 6
	reboot	重启linux
	service	服务管理命令  service network start（stop、restart）					
	shutdown		shutdown –r 5 温和地关闭系统
	uname	显示系统的信息，包括内核的版本
	df		显示当前已经挂载的每一个文件系统空间使用信息
	du		显示某目录下的所有文件磁盘空间使用情况  du /home
	fdisk	查看并修改硬盘分区的交互工具  fdisk /dev/hdb
	system-config-packages		在redhat系统中管理rpm包的图形界面工具
	rpm		详见rpm包版
	groupadd		创建新组  groupdd jobs
	groupdel		删除组    groupdel jobs
	gpasswd		分配或修改某个组的口令 gpasswd jobs
	groupmod	修改现有组的名称或gid  groupmod –n jobs
	sudo		允许对通常只有root才可以运行的命令进行访问
	useradd		创建新用户 ueradd com
	userdel		删除现有用户
	usermod	修改现有用户的各项设置
	wall			将一条广播消息发送给登录到系统所有用户   wall have a look
	date		显示系统时钟中的当前日期和时间
	!tail  		!tail  执行最近执行过的tail命令执行最近执行过的tail命令

	iconv 转换编码
	先除去utf-8上的feef标识码
			iconv -f utf-8 -t gb18030 index.tpl > index.tpl.gb
			mv index.tpl.gb index.tpl
			vi index.tpl
			dos2unix index.tpl
			jobs
			vi index.tpl

	scp实例

	1，下载目录
	[root@test test]# scp -r root@172.30.4.42:/tmp/test2 ./
	将172.30.4.42linux系统中/tmp/test2目录copy到当前目录下面，在这172.30.4.42前面加了root@,提示输入密码，如果不加呢，会提示你输入用户名和密码

	2，下载文件
	[root@test test]# scp 172.30.4.42:/tmp/test2/aaa.php ./
	将172.30.4.42linux系统中/tmp/test2/aaa.php文件copy到当前目录下面

	3，上传目录
	[root@test test]# scp -r ./mytest 172.30.4.42:/tmp/test2
	将当前目录中的mytest目录上传到172.30.4.42服务器/tmp/test2目录下面。

	4，上传文件
	[root@test test]# scp ./mytest/password.php 172.30.4.42:/tmp/test2
	将当前目录中的mytest目录下的password.php上传到172.30.4.42服务器/tmp/test2目录下面。

### Linux命令分类

	linux命令格式，命令名、命令选项和命令参数

	命令的帮助信息	help man info

	文件命令	ls(-la) cp（复制） mv（移动重命名） rm（删除-rf)  find（文件查找）

	目录命令	pwd cd mkdir rmdir

	文本查看命令	cat more less head tail

	存储管理	mount umount fdisk

	帐号管理	adduser userdel passwd groupadd groupdel

	文件的读、写、执行属性	chmod（chmod a+x xx)   chown（chown user:group xxx)


### 文本编辑器vim

	vi编辑器的三种模式，命令模式（esc）、输入模式（i、o。。）、末行模式（esc、：）

	vi的编辑操作，光标移动（hjkl）、翻页、输入、删除（dd)、复制(yy)、粘贴(p)、 取消（u）

	vi的文件操作，打开(vi)、读取(:e! file :r file)、保存（w）、另存为(w file)、退出（q wq q! x）

	vi中的字符串查找与替换功能（？word、/word）

### shell的使用

bash的主要功能，命令行编辑、命令补全、命令历史、命令别名

输入输出文件，标准输入、标准输出、错误输出

输入输出重定向， >>  2>  &>

管道符用于连接两条命令，cmd1 | cmd2

脚本程序可以实现命令的组合执行和复杂的管理任务 

脚本程序的基本组成，环境设置、注释和语句

example:

	vi example
	#!/bin/bash
	#this is my first shell program.
	echo you're pig!!
	touch ping
	chmod a+x example
	./example   or . example

### 软件包管理与源代码编译安装

red hat linux系统发行版使用rpm包格式进行软件包的管理
rpm命令用于对rpm软件包进行管理，可实现查询(qa\ql\qi)、安装(qpl\qpi\ i --nodeps ivh )、卸载(-e --nodeps)、升级(-U)

应用程序源代码安装需要linux系统中具有编译环境(gcc)
源码编译安装包括配置(下载原代码、解压、进入源代码、./configure --prefix=/usr/user1)、编译和安装三个步骤(make\make install)

### 系统管理 

linux系统的运行级别使用0-6的数字表示，各运行级别具有不同的含义

系统启动过程和init进程(chkconfig --list    chkconfig --level 24 xx on)(/etc/inittab)

进程查看命令，ps top pstree

### Cron计划任务

程序实现周期性任务的自动执行

Cron服务可以用crontab命令来编辑

	Crontab –u root –l  显示root用户的从容服务的详细内容
	Crontab –u root –e  进入vi编辑，编辑完保存。

编辑的内容的格式：

	* * * * * echo “have a break.” >>temp/test.txt
	* * * * * sh ../../command.sh >>../../test.txt

上面有5个星号，依次代表分钟，小时，日子，月份，星期；另外还有几个特殊的符号：*表示任意字符 ，/表示每的意思 ，- 表示某个数字到某个数字 ，,英式逗号表示几个离散的数字。

例如：

	*/3 12-15 1,3,5 12 * echo “hhhhh” >> tem.txt

12月的1、3、5日12到15时的每3分钟输出hhhhh到tem.txt


cron是一个linux下的定时执行工具，可以在无需人工干预的情况下运行作业。由于Cron 是Linux的内置服务，但它不自动起来，可以用以下的方法启动、关闭这个服务:

	/sbin/service crond start //启动服务
	/sbin/service crond stop //关闭服务
	/sbin/service crond restart //重启服务
	/sbin/service crond reload //重新载入配置

　　你也可以将这个服务在系统启动的时候自动启动:

　　在/etc/rc.d/rc.local这个脚本的末尾加上:

	/sbin/service crond start

1、linux任务调度的工作主要分为以下两类：

- 系统执行的工作：系统周期性所要执行的工作，如备份系统数据、清理缓存

- 个人执行的工作：某个用户定期要做的工作，例如每隔10分钟检查邮件服务器是否有新信，这些工作可由每个用户自行设置。


2、crontab命令选项:

	-u指定一个用户,
	-l列出某个用户的任务计划,
	-r删除某个用户的任务,
	-e编辑某个用户的任务

3、cron文件语法:

	分    小时   日      月      星期     命令
	0-59  0-23  1-31  1-12    0-6    command    

>(取值范围,0表示周日一般一行对应一个任务)

4、记住几个特殊符号的含义:

	"*"代表取值范围内的数字,
	"/"代表"每",
	"-"代表从某个数字到某个数字,
	","分开几个离散的数字
	
5、实例

具体格式如下：

	Minute 	Hour 	Day 	Month 	Dayofweek   	command
	分钟    小时  	天    	月       天每星期       	命令

每个字段代表的含义如下：

	Minute            每个小时的第几分钟执行该任务
	Hour               每天的第几个小时执行该任务
	Day                每月的第几天执行该任务
	Month             每年的第几个月执行该任务
	DayOfWeek    每周的第几天执行该任务
	Command       指定要执行的程序

在这些字段里，除了“Command”是每次都必须指定的字段以外，其它字段皆为可选字段，可视需要决定。对于不指定的字段，要用“*”来填补其位置。

举例如下：

	5   *   *  *   *    ls        
指定每小时的第5分钟执行一次ls命令

	30  5  *   *  *  ls        
指定每天的 5:30 执行ls命令

	30  7  8  *  *   ls        
	
指定每月8号的7：30分执行ls命令

	3   5  8   6  *   ls         
指定每年的6月8日5：30执行ls命令

	30  6  *   *  0   ls        
指定每星期日的6:30执行ls命令[注：0表示星期天，1表示星期1，以此类推，也可以用英文来表示，sun表示星期天，mon表示星期一等。]

	30  3   10,20  *  *   ls    

每月10号及20号的3：30执行ls命令[注：“，”用来连接多个不连续的时段]

	25    8-11 *  *   *  ls      
每天8-11点的第25分钟执行ls命令[注：“-”用来连接连续的时段]

	*/15  *   *   *    *  ls         
	
每15分钟执行一次ls命令 [即每个小时的第0 15 30 45 60分钟执行ls命令 ]

	30   6   */10   *   *   ls      
每个月中，每隔10天6:30执行一次ls命令[即每月的1、11、21、31日是的6：30执行一次ls命令。 ]

	50 7 * * *  root  run-parts  /etc/cron.daily  
每天7：50以root 身份执行/etc/cron.daily目录中的所有可执行文件

[ 注：run-parts参数表示，执行后面目录中的所有可执行文件。 ]

### 基本网络配置

linux系统中的第一个网络接口的名称是eth0

	Ifconfig	
	命令用于查看和设置网络接口属性(/etc/sysconfig/network-scripts/ifcfg-eth0)

	Route	
	命令用于查看和管理路由表 

	Hostname	
	命令用于显示和设置主机名称(/etc/sysconfig/network)

	Netconfig	
	配置工具能够辅助完成对网络配置文件的设置

	eth0	
	网络接口的配置文件名称是“ifcfg-eth0” 

	Resolv.conf	
	文件用于设置系统中使用的dns服务器的ip地址(/etc/resolv.conf) 

-----
@tsingchan