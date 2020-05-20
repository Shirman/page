<!-- TOC -->

- [【第一部分】全局环境配置](#第一部分全局环境配置)
- [【第二部分】主要服务配置](#第二部分主要服务配置)
- [【第三部分】虚拟主机配置](#第三部分虚拟主机配置)

<!-- /TOC -->


> Apache的基本设置主要交由httpd.conf来设定管理，我们要修改Apache的相关设定，主要还是通过修改httpd.cong来实现。下面让我们来看看httpd.conf的内容，它主要分成3大部分：
> 
> Section 1:Global Environment
> 
> Section 2:Main server configuration
> 
> Section 3:Virtual Hosts

### 【第一部分】全局环境配置 ###
	ServerType standalone

> 这表示Apache是以standalone启动，也可以是inetd。所谓standalone是指启动一次来接听所有的连线；而inetd是接到http的连线要求才启动，随着连线的结束而结束，	这样负担是不是很但呢？所以一般都是以standalone启动。
	ServerRoot /usr/local/httpd

> 此为apache的目录

	#LocdFile /use/local/httpd/logs/httpd.lock
> 保留预设值，不更动
	
	PidFile /usr/local/httpd/logs/httpd.pid

> 此文件记录着apache的父处理程序id

	ScoreBoardFile /usr/local/httpd/logs/httpd.scoreboard

> 此文件存储处理程序的信息

	#ResourceConfig conf/srm.conf
	#AccessConfig conf/access.conf

> 由于我们统筹由httpd.conf来管理，所以这两个文件预设是注解起来的，可以保留预设值不更动
	
	Timeout 300


> 设盯超时的时间。如果用户端超过300秒还没连上server，或server超过300秒还没传送信息给用户端，即断线。

	KeepAlive On

> 允许用户端的连线有多个请求，设为Off表示不允许

	MaxKeepAliveRequests 100


> 每次连线最大的请求树木，数字愈大，效能愈好。0表示不限制
	
	MinSpareServer 5
	MaxSpareServers 10

> MinSpareServer 5表示最少会有5个闲置的处理程序，如果实际的数目少于此数目，则会增加处理程序。MaxSpareServers 10表示最大的闲置处理程序数目，如果你的网站需求量很大，可以将此数目设大一些，大不要随便将此数目设得太大。

	StartServers 5


> 启动时Server的数目

	MaxClients 150


> 限制同时间最大的连线数目，当然不能设得太小，一旦达到此数目，就无法再增加用户端
	
	MaxRequestPerChild 0


> 限制子处理程序结果前的要求数目，0表示不限制

	#Listen 3000
	#Listen 12.34.56.78:80


> 使用其它的连接端口或IP
	
	BindAddress *


> 可以接听*（所有IP地址）、指定的IP地址或是完整的域名
	
	#LoadModule foo_module libexec/mod_foo.so


> 使用DSO模块

	#ExtendedStatus On


> 可检阅apache的状态信息，预设是Off（注解起来）

### 【第二部分】主要服务配置 ###
**如果之前的ServerType是inetd，请直接跳到ServerAdmin。**

	Port 80


> Standalone服务器接听的连接端口，当然也可以是其他小于1023的端口号

	User nobody
	Group nobody


> 执行httpd的用户和群组

	ServerAdmin 
> 管理员的电子邮件地址
> 这是管理员的电子邮件地址，如果apache有问题的话，会寄信通知管理员，当然你也可以建立一个专门负责web的帐号来收信

	ServerName 
> 你的主机名称
> 此为主机名称，如果没有域名，也可以用IP

	DocumentRoot usr/local/httpd/htdocs


> 此目录为apache放置网页的地方，里面的index.html即为连到此主机的预设首页
	
	Options FollowSymLinks
	AllowOverride none


> 此目录设定用户放置网页的目录（public_html）的执行动作。详细的目录存取方法会在后面说明

	Options Indexes FolloeSymLinks
	AllowOverride None
	Order allow,deny
	Allow from all


> 此目录设定apache的网页目录（htdocs）的执行动作

	UserDir public_html


> 用户可在自己的目录下建立public_html目录来放置网页，输入http://主机地址/~用户名称即可连接到...

	DirectoryIndex index.html


> 这里设定预设主页的名称
	
	AccessFileName .htaccess


> 这个是控制存取的文件名称，一般采用预设的.htaccess名称，后面会说明htaccess的使用方法

	Order allow,deny
	Deny from all
> 这用来防止其他人看到.ht开头的文件内容，不仅是保护.htaccess的内容，还保护.htpasswd的内容。当然也可以直接写成。如果你有更改AccessFilename，例如将.htaccess改成.accessht，请记得也要在此做相关的更改，如此才能防止其他人看到哦

	#CacheNegotiatedDocs


> 注解起来是告诉Proxy不要将互动产生的文件存入cache，如果拿掉#，则会存在cache中
	
	UseCanonicalName On


> 使用标准的名称，预设是On。假设有一个web server的全名是www.sample.com

	TypeConfig /usr/local/httpd/conf/mime.types


> 指定存放MIME文件类型的文件。你可以自行编辑mime.types文件。
	
	DefaultType text/plain


> 当server不认得此文件类型时的预设格式，此设定是当成一般文字
	
	MIMEMagicFile /usr/local/httpd/conf/magic


> mod_mime_magic模块可使server由文件内容决定其MIME类型。如果有载入mod_mime_magic模块，才会处理MIMEMagicFile这一段。如果是，则表示如果没有载入该模块，才	会处理这一段

	HostLookups Off


> 如果为On，则每次都会向name server解析该IP，记录此连线的名称（例如www.apache.org）如果为Off，仅记录IP

	ErrorLog /usr/local/httpd/logs/error_log


> 指定发生错误的记录文件（error_log）位置。如果在没有指定发生错误的记录文件，则会沿用此文件
	
	LogLevel warn


> 记录分成很多等级，在此是warn。各等级如下： 等级 说明
> debug debug信息
> info 普通信息
> notice 重要信息
> warn 警告信息
> error 发生错误
> crit 紧急情况
> alert 马上要处理的情况
> amerg 系统快要死了

	LogFormat %h %l %u %t%r%s %b{Referer}i${UserAgent}icombined
	LogFormat %h %l %u %t%r%s %bcommom
	LogFormat %{Referer}i-%Ureferer
	LogFormat %{User-agent}iagent


> 自定四种记录格式：combined、common、referer、agent
	
	CustomLog /usr/local/httpd/logs/access_log common


> 存取的记录文件（access_log）使用自定的common格式
	
	#CustomLog /usr/local/httpd/logs/referer_log referer
	#CustomLog /usr/local/httpd/logs/agent_log agent
	#CustomLog /usr/local/httpd/logs/agent_log combined


> 这三个记录文件也是使用自定义格式（分别是referer、agent、combined），不过注解起来表示未使用这三个文件
	
	ServerSignature On

> 设为On时，在server所产生的网页（像是错误发生时）上，会有apache的版本、主机、连接端口的一行信息；如果设为Email，则会有mailto:给管理员的超链接

	Alias /icons/ /usr/local/httpd/icons/


> 使用较短的别名，其格式为：Alias 别名 原名。
	
	ScriptAlias /cgi-bin/ /usr/local/httpd/cgi-bin/


> 和Alias一样，只是这是设定server script的目录

	IndexOptions FancyIndexing


> 显示好看的文件清单（配合下面各文件所对应的图形）
	
	AddIconByEncoding(CMP,/icons/compressed.gif)x-conpress x-gzip
	AddIcon /icons/blank.gif＾＾BLANKICON＾＾DefaultIcon/icons/unknow.gif


> 这些是在显示文件清单（之前所说的FancyIndex）时，各种文件类型的对应图形。例如.ps .si .eps这三种文件的表示图形都是a.gif
	
	#AddDescription GZIP conpressed document .gz
	#AddDescription tar archive .tar
	#AddDescription GZIP compressed tar archive .tgz


> 这些是在显示文件清单时，在文件后面附上说明，其格式为：
> AddDescription 说明 文件名
> 例如：AddDescription It is private txt my.txt
> ReadmeName README
> 显示文件清单时，在最下面显示README的文件内容
> 设置CGI脚本/将httpd.conf做为唯一的配置文件/用户授权和访问控制等
> 关于Apache的配置及使用，在LinuxAid中已经有不少文章做了详细的阐述，本文讨论了在使用Apache时，有关配置文件的使用及对文件的访问控制等内容，算是对Apache的使用所做的一些补充吧！

### 【第三部分】虚拟主机配置 ###

	#
	# VirtualHost example:
	# Almost any Apache directive may go into a VirtualHost container.
	# The first VirtualHost section is used for requests without a known
	# server name.
	#
	<VirtualHost *:80>
	    ServerAdmin shanyang@example.com
	    DocumentRoot /var/www/www.example.com/
	    ServerName www.example.com
	    ErrorLog logs/www.example.com.error.log
	    CustomLog logs/www.example.com.access.log common
	</VirtualHost>

----------
@tsingchan