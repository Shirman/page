<!-- TOC -->

- [FTP连接](#ftp连接)
- [基本命令](#基本命令)
    - [ftp [-p] [host|IP] [port]](#ftp--p-hostip-port)
- [续传命令](#续传命令)
    - [上传续传步骤：](#上传续传步骤)
    - [下载续传步骤：](#下载续传步骤)
- [其他更多命令](#其他更多命令)

<!-- /TOC -->
### FTP连接 ###
使用之前，先是连接上ftp：

	ftp user:pwd@ip:port

### 基本命令 ###
#### ftp [-p] [host|IP] [port] ####

	-p 		启动被动模式(passive, PASV)；
	
	ftp> help         	提供更多的可用指令，可以常參考
	ftp> cd /pub      	切换目录到/pub
	ftp> dir          	显示当前目录下文件内容
	ftp> get file     	下载file这个文件
	ftp> mget file    	下载file这个文件或目录
	ftp> put file     	上传file这个文件到ftp服务器
	ftp> delete file 	删除服务器上file这个文件
	ftp> mkdir dir    	建立dir这个文件目录
	ftp> lcd /home    	切换本地目录到/home工作目录
	ftp> passive      	启动或关闭passive模式
	ftp> binary       	文件传输模式设定为binary

### 续传命令 ###
#### 上传续传步骤： ####

在命令行使用ftp命令，第一次上传了文件的一半，意外断线需要续传。

比如说文件file已经上传了1024字节.中断后:

	ftp>restart 1024
	ftp>put file

便可以了

#### 下载续传步骤： ####

	ftp>reget remote-file [local-file]

如果local-file存在,则从上次传输中断处续传


### 其他更多命令 ###
	FTP>! 		
从 ftp 子系统退出到外壳。

	FTP> ? 	
显示 ftp 命令说明。? 与 help 相同。
　　	格式：? [command]
说明：[command]指定需要帮助的命令。如果没有指定 command，将显示全部命令列表。

	FTP> append 
使用当前文件类型设置将本地文件附加到远程计算机上的文件。

格式：append local-file [remote-file]

说明：local-file 指定要添加的本地文件。

remote-file 指定要添加 local-file 的远程计算机上的文件。如果省略了 remote-file，本地文件名将被用作远程文件名。

	FTP> ascii 	
将文件传送类型设置为默认的 ASCII。

说明：FTP 支持两种文件传送类型，ASCII 码和二进制图像。在传送文本文件时应该使用ASCII。

	FTP> bell 
切换响铃以在每个文件传送命令完成后响铃。默认情况下，铃声是关闭的。

	FTP> binary（或bi） 
将文件传送类型设置为二进制。

	FTP> bye（或by） 
结束与远程计算机的 FTP 会话并退出 ftp。
	
	FTP> cd 
更改远程计算机上的工作目录。

格式：cd remote-directory Os V G) z* 

说明：remote-directory 指定要更改的远程计算机上的目录。
	
	FTP> close 
结束与远程服务器的 FTP 会话并返回命令解释程序。

	FTP> debug 	
切换调试。当调试打开时，发送到远程计算机的每个命令都打印，前面是字符串“>”。默认情况下，调试是关闭的。

	FTP> delete 
删除远程计算机上的文件。

格式：delete remote-file

说明：remote-file 指定要删除的文件。

	FTP> dir 
显示远程目录文件和子目录列表。

格式：dir [remote-directory] [local-file]

说明：remote-directory 指定要查看其列表的目录。如果没有指定目录，将使用远程计算机中的当前工作目录。Local-file 指定要存储列表的本地文件。如果没有指定，输出将显示在屏幕上。

	FTP> disconnect 
从远程计算机断开，保留 ftp 提示。

	FTP> get 
使用当前文件转换类型将远程文件复制到本地计算机。

格式：get remote-file [local-file]

说明：remote-file 指定要复制的远程文件。
Local-file 指定要在本地计算机上使用的名称。如果没有指定，文件将命名为 remote-file。

	FTP >glob 
切换文件名组合。组合允许在内部文件或路径名中使用通配符（*和?）。默认情况下，组合是打开的。

	FTP >hash 	
切换已传输的每个数据块的数字签名 (#) 打印。数据块的大小是2048 字节。默认情况下，散列符号打印是关闭的。

	FTP >help 
显示 ftp 命令说明。

格式：help [command]

说明：command 指定需要有关说明的命令的名称。如果没有指定 command，ftp 将显示全部命令的列表。

	FTP >lcd 
更改本地计算机上的工作目录。默认情况下，工作目录是启动 ftp 的目录。

格式：lcd [directory]

说明：directory 指定要更改的本地计算机上的目录。如果没有指定directory，将显示本地计算机中当前的工作目录。

	FTP >literal 
将参数逐字发送到远程 FTP 服务器。将返回单个的 FTP 回复代码。

格式：literal argument [ ...]

说明：argument 指定要发送到 FTP 服务器的参数。

	FTP >ls 
显示远程目录文件和子目录的缩写列表。

格式：ls [remote-directory] [local-file]

说明：remote-directory 指定要查看其列表的目录。如果没有指定目录，将使用远程计算机中的当前工作目录。 local-file 指定要存储列表的本地文件。如果没有指定，输出将显示在屏幕上。

	FTP >mdelete 
删除远程计算机上的文件。

格式：mdelete remote-files [ ...]

说明：remote-files 指定要删除的远程文件。

	FTP >mdir 
显示远程目录文件和子目录列表。可以使用 mdir 指定多个文件。

格式：mdir remote-files [ ...] local-file 

说明：remote-files 指定要查看列表的目录。必须指定 remote-files。请键入 - 使用远程计算机上的当前工作目录。

local-file 指定要还原列表的本地文件。请键入- 在屏幕上显示列表。

	FTP >mget 	
使用当前文件传送类型将远程文件复制到本地计算机。

格式：mget remote-files [ ...]

说明：remote-files 指定要复制到本地计算机的远程文件。

	FTP >mkdir 
创建远程目录。

格式：mkdir directory

说明：directory 指定新的远程目录的名称。

	FTP >mls 
显示远程目录文件和子目录的缩写列表。

格式：mls remote-files [ ...] local-file

说明：remote-files 指定要查看列表的文件。必须指定 remote-files；

请键入- 使用远程计算机上的当前工作目录。

local-file 指定要存储列表的本地文件。请键入 - 以在屏幕上显示列表。

	FTP >mput 
使用当前文件传送类型将本地文件复制到远程计算机上。

格式：mput local-files [ ...]

说明：local-files 指定要复制到远程计算机的本地文件

	FTP >open 
与指定的 FTP 服务器连接。

格式：open computer [port]

说明：computer 指定要连接的远程计算机。可以通过 IP 地址或计算机名称指定计算机（DNS 或主机文件必须可用）。如果自动登录打开（默认），ftp 还将尝试自动将用户登录到 FTP 服务器
port 指定用来联系 FTP 服务器的端口号。

	FTP >prompt 
切换提示。如果关闭提示时 mget 及 mput 传送所有文件，Ftp在多文件传送过程中将提示允许您有选择地检索或存储文件。默认情况下，提示是打开的。

FTP >put 
使用当前文件传送类型将本地文件复制到远程计算机上。

格式：put local-file [remote-file]

说明：local-file 指定要复制的本地文件。

remote-file 指定要在远程计算机上使用的名称。如果没有指定，文件将命名为 local-file。

	FTP >pwd 
显示远程计算机上的当前目录。

	FTP >quit 
结束与远程计算机的 FTP 会话并退出 ftp。

	FTP >quote 
将参数逐字发送到远程 FTP 服务器。将返回单个的 FTP 回复代码。

Quote 与 literal 相同。

格式：quote argument [ ...]

说明：argument 指定要发送到 FTP 服务器的参数。

	FTP >recv 
使用当前文件传送类型将远程文件复制到本地计算机。Recv 与 get相同。

格式：recv remote-file [local-file]

说明：remote-file 指定要复制的远程文件。

local-file 指定要在本地计算机上使用的名称。如果没有指定，文件将命名为 remote-file。

	FTP >remotehelp 
显示远程命令帮助。

格式：remotehelp [command]

说明：command 指定需要帮助的命令的名称。如果没有指定 command，ftp将显示全部远程命令的列表。

	FTP >rename 
重命名远程文件。

格式：rename filename newfilename

说明：filename 指定要重命名的文件。 newfilename 指定新的文件名。

	FTP >rmdir 
删除远程目录。

格式：rmdir directory

说明：directory 指定要删除的远程目录的名称。

	FTP >send 
使用当前文件传送类型将本地文件复制到远程计算机上。Send 与put 相同。

格式：send local-file [remote-file]

说明：local-file 指定要复制的本地文件。 remote-file 指定要在远程计算机上使用的名称。如果没有指定，文件将命名为 local-file。

	FTP >status 
显示 FTP 连接和切换的当前状态。

	FTP >trace 
切换数据包跟踪。Trace 在运行 ftp 命令时显示每个数据包的路由。

	FTP >type 
设置或显示文件传送类型。

格式：type [type-name]

说明：type-name 指定文件传送类型。默认设置为 ascii。如果没有指定type-name，将显示当前的类型。

	FTP >user 
指定远程计算机的用户。

格式：user username [password] [account]

说明：user-name 指定登录到远程计算机所使用的用户名。password 指定 user-name 的密码。如果没有指定，但必须指定，ftp 会提示输入密码。

account 指定登录到远程计算机所使用的帐户。如果没有指定account，但是需要指定，ftp 会提示您输入帐户。

	FTP >verbose 
切换 verbose 模式。如果打开，将显示所有 ftp 响应。在文件传送完成后，将同时显示与传送效率有关的统计信息。默认情况下，verbose 是打开的。

----------
@tsingchan