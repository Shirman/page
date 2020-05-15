
<!-- TOC -->

- [1. ServerRoot](#1-serverroot)
- [2. Listen](#2-listen)
- [3. LoadModule](#3-loadmodule)
- [4. User](#4-user)
- [5. Group](#5-group)
- [6. ServerAdmin](#6-serveradmin)
- [7. ServerName](#7-servername)
- [8. DocumentRoot](#8-documentroot)
- [9. Directory](#9-directory)
- [10. Files](#10-files)
- [11. IfModule](#11-ifmodule)
- [12. Options](#12-options)
- [13. AllowOverride](#13-allowoverride)
- [14. DirectoryIndex](#14-directoryindex)
- [15. ErrorLog](#15-errorlog)
- [16. LogLevel](#16-loglevel)
- [17. LogFormat](#17-logformat)
- [18. CustomLog](#18-customlog)
- [19. TransferLog](#19-transferlog)
- [20. Alias](#20-alias)
- [21. ScriptAlias](#21-scriptalias)
- [22. DefaultType](#22-defaulttype)
- [23. AddType](#23-addtype)
- [24. ErrorDocument](#24-errordocument)
- [25. EnableMMAP](#25-enablemmap)
- [26. EnableMMAP Off](#26-enablemmap-off)
- [27. EnableSendfile](#27-enablesendfile)
- [28. include](#28-include)
- [29 虚拟主机httpd-vhost.conf](#29-虚拟主机httpd-vhostconf)

<!-- /TOC -->



### 1. ServerRoot

服务器的基础目录，一般来说它将包含conf/和logs/子目录，其它配置文件的相对路径即基于此目录。默认为安装目录，不需更改。

语法：ServerRoot directory-path

如： ServerRoot "/usr/local/apache-2.2.6"

注意，此指令中的路径最后不要加 / 。



### 2. Listen

指定服务器监听的IP和端口。默认情况下Apache会在所有IP地址上监听。Listen是Apache2.0以后版本必须设置的指令，如果在配置文件中找不到这个指令，服务器将无法启动。

语法：Listen \[IP-address:\]portnumber \[protocol\]

Listen指令指定服务器在那个端口或地址和端口的组合上监听接入请求。如果只指定一个端口，服务器将在所有地址上监听该端口。如果指定了地址和端口的组合，服务器将在指

定地址的指定端口上监听。可选的protocol参数在大多数情况下并不需要，若未指定该参数，则将为443端口使用默认的https 协议，为其它端口使用http协议。

使用多个Listen指令可以指定多个不同的监听端口和/或地址端口组合。

默认为：Listen 80

如果让服务器接受80和8080端口上请求，可以这样设置：

Listen 80

Listen 8080

如果让服务器在两个确定的地址端口组合上接受请求，可以这样设置：

Listen 192.168.2.1:80

Listen 192.168.2.2:8080

如果使用IPV6地址，必须用方括号把IPV6地址括起来：

Listen \[2001:db8::a00:20ff:fea7:ccea\]:80

### 3. LoadModule

加载特定的DSO模块。Apache默认将已编译的DSO模块存放于4.1目录结构小节中所示的动态加载模块目录中。

语法：LoadModule module filename

如：LoadModule rewrite\_module modules/mod\_rewrite.so

如果filename使用相对路径，则路径是相对于ServerRoot所指示的相对路径。

Apache配置文件默认加载所有已编译的DSO模块，笔者建议只加载如下模块：authn\_file、authn\_default、 authz\_host、authz\_user、authz\_default、auth\_basic、dir、alias

、filter、speling、 log\_config、env、vhost\_alias、setenvif、mime、negotiation、rewrite、deflate、 expires、headers、cache、file-cache、disk-cache、mem-cache。

### 4. User

设置实际提供服务的子进程的用户。为了使用这个指令，服务器必须以root身份启动和初始化。如果你以非root身份启动服务器，子进程将不能够切换至非特权用户，并继续以启动服务器的原始用户身份运行。如果确实以root用户启动了服务器，那么父进程将仍然以root身份运行。

用于运行子进程的用户必须是一个没有特权的用户，这样才能保证子进程无权访问那些不想为外界所知的文件，同样的，该用户亦需没有执行那些不应当被外界执行的程序的权限。强烈建议专门为Apache子进程建立一个单独的用户和组。一些管理员使用nobody用户，但是这并不能总是符合要求，因为可能有其他程序也在使用这个用户。

例：User daemon

### 5. Group

设置提供服务的Apache子进程运行时的用户组。为了使用这个指令，Apache必须以root初始化启动，否则在切换用户组时会失败，并继续以初始化启动时的用户组运行。

例：Group daemon

### 6. ServerAdmin

设置在所有返回给客户端的错误信息中包含的管理员邮件地址。

语法：ServerAdmin email-address|URL

如果httpd不能将提供的参数识别为URL，它就会假定它是一个email-address ，并在超连接中用在mailto:后面。推荐使用一个Email地址，因为许多CGI脚本是这样认为的。如果你确实想使用URL，一定要保证指向一个你能够控制的服务器，否则用户将无法确保一定可以和你取得联系。

### 7. ServerName

设置服务器用于辨识自己的主机名和端口号。

语法：ServerName \[scheme://\]fully-qualified-domain-name\[:port\]

可选的'scheme://'前缀仅在2.2.3以后的版本中可用，用于在代理之后或离线设备上也能正确的检测规范化的服务器URL。

当没有指定ServerName时，服务器会尝试对IP地址进行反向查询来推断主机名。如果在ServerName中没有指定端口号，服务器会使用接受请求的那个端口。

为了加强可靠性和可预测性，建议使用ServerName显式的指定一个主机名和端口号。

如果使用的是基于域名的虚拟主机，在<VirtualHost>段中的ServerName将是为了匹配这个虚拟主机，在"Host:"请求头中必须出现的主机名。

### 8. DocumentRoot

设置Web文档根目录。

语法：DocumentRoot directory-path

在没有使用类似Alias这样的指令的情况下，服务器会将请求中的URL附加到DocumentRoot后面以构成指向文档的路径。

如果directory-path不是绝对路径，则被假定为是相对于ServerRoot的路径。

指定DocumentRoot时不应包括最后的"/"。

### 9. Directory

<Directory>和</Directory>用于封装一组指令，使之仅对某个目录及其子目录生效。

语法：<Directory Directory-path> ... </Directory>

Directory-path可以是一个目录的完整路径，或是包含了Unix shell匹配语法的通配符字符串。在通配符字符串中，"?"匹配任何单个的字符，"\*"匹配任何字符序列。也可以使用"\[\]"来确定字符范围。在"~" 字符之后也可以使用正则表达式。

如果有多个(非正则表达式)<Directory>配置段符合包含某文档的目录(或其父目录)，那么指令将以短目录优先的规则进行应用，并包含.htaccess文件中的指令。

正则表达式将在所有普通配置段之后予以考虑。所有的正则表达式将根据它们出现在配置文件中的顺序进行应用。

<Directory>指令不可被嵌套使用，也不能出现在<Limit>或<LimitExcept>配置段中。

### 10. Files

提供基于文件名的访问控制，类似于<Directory>和<Location>指令。

语法：<Files filename> ... </Files>

filename参数应当是一个文件名或是一个包含通配符的字符串，其中"?"匹配任何单个字符，"\*"匹配任何字符串序列。在"~"字符之后可以使用正则表达式。

在此配置段中定义的指令将作用于其基本名称(不是完整的路径)与指定的文件名相符的对象。<Files>段将根据它们在配置文件中出现的顺序被处理：在<Directory>段和.htaccess

文件被处理之后，但在<Location>段之前。<Files>能嵌入到<Directory>段中以限制它们作用的文件系统范围，也可用于.htaccess文件当中，以允许用户在文件层面上控制对它们自己文件的访问。

### 11. IfModule

封装根据指定的模块是否启用而决定是否生效的指令。

语法：<IfModule \[!\]module-file|module-identifier> ... </IfModule>

module-file是指编译模块时的文件名，比如mod\_rewrite.c 。

module-identifier是指模块的标识符，比如mod\_rewrite 。

在<IfModule>配置段中的指令仅当测试结果为真的时候才进行处理，否则所有其间的指令都将被忽略。

### 12. Options

控制在特定目录中将使用哪些服务器特性

语法：Options \[+|-\]option \[\[+|-\]option\] ...

option可以为None，不启用任何额外特性，或者下面选项中的一个或多个：

All 除MultiViews之外的所有特性，这是默认设置。

ExecCGI 允许使用mod\_cgi执行CGI脚本。

FollowSymLinks 服务器允许在此目录中使用符号连接，如果此配置位于<Location>配置段中，则会被忽略。

Includes 允许使用mod\_include提供的服务器端包含。

IncludesNOEXEC 允许服务器端包含，但禁用"#exec cmd"和"#exec cgi"，但仍可以从ScriptAlias目录使用"#include virtual"虚拟CGI脚本。

Indexes 如果一个映射到目录的URL被请求，而此目录中又没有DirectoryIndex(例如：index.html)，那么服务器会返回由mod\_autoindex生成的一个格式化后的目录列表。

MultiViews 允许使用mod\_negotiation提供内容协商的"多重视图"(MultiViews)。

SymLinksIfOwnerMatch 服务器仅在符号连接与其目的目录或文件的拥有者具有相同的uid时才使用它。 如果此配置出现在<Location>配置段中，则将被忽略。

一般来说，如果一个目录被多次设置了Options ，则最特殊的一个会被完全接受(其它的被忽略)，而各个可选项的设定彼此并不融合。然而，如果所有作用于Options指令的可选项前都加有"+" 或"-"符号，此可选项将被合并。所有前面加有"+"号的可选项将强制覆盖当前的可选项设置，而所有前面有"-"号的可选项将强制从当前可选项设置中去除。

### 13. AllowOverride

确定允许存在于.htaccess文件中的指令类型。

语法：AllowOverride All|None|directive-type \[directive-type\] ...

如果此指令被设置为None ，那么.htaccess文件将被完全忽略。事实上，服务器根本不会读取.htaccess文件。

当此指令设置为All时，所有具有".htaccess"作用域的指令都允许出现在.htaccess文件中。

directive-type可以是下列各组指令之一：

AuthConfig 允许使用与认证授权相关的指令

FileInfo 允许使用控制文档类型的指令、控制文档元数据的指令、mod\_rewrite中的指令、mod\_actions中的Action指令

Indexes 允许使用控制目录索引的指令

Limit 允许使用控制主机访问的指令

Options\[=Option,...\] 允许使用控制指定目录功能的指令(Options和XBitHack)。可以在等号后面附加一个逗号分隔的(无空格的)Options选项列表，用来控制允许Options指令

使用哪些选项。

AllowOverride仅在不包含正则表达式的<Directory>配置段中才是有效的。在<Location>, <DirectoryMatch>, <Files>配置段中都是无效的。

Order：控制默认的访问状态与Allow和Deny指令生效的顺序。

Ordering取值范围是以下几种范例之一：

Deny,Allow Deny指令在Allow指令之前被评估。默认允许所有访问。任何不匹配Deny指令或者匹配Allow指令的客户都被允许访问。

Allow,Deny Allow指令在Deny指令之前被评估。默认拒绝所有访问。任何不匹配Allow指令或者匹配Deny指令的客户都将被禁止访问。

Mutual-failure 只有出现在Allow列表并且不出现在Deny列表中的主机才被允许访问。这种顺序与"Order Allow,Deny"具有同样效果，不赞成使用。

关键字只能用逗号分隔，它们之间不能有空格，在所有情况下每个Allow和Deny指令语句都将被评估。

**Allow** ：控制哪些主机可以访问服务器的该区域。可以根据主机名、IP地址、 IP地址范围或其他环境变量中捕获的客户端请求特性进行控制。

语法：Allow from all|host|env=env-variable \[host|env=env-variable\] ...

这个指令的第一个参数总是"from"，随后的参数可以有三种不同形式：如果指定"Allow from all"，则允许所有主机访问，按照下述Deny和Order指令的配置；若要只允许特定的主

机或主机群访问服务器。

host可以用下面任何一种格式来指定：一个（部分）域名、完整的IP地址、部分IP地址、网络/掩码、网络/nnn无类别域间路由规格；

第三种参数格式允许对服务器的访问由环境变量的一个扩展指定，指定"Allow from env=env-variable"时，如果环境变量env-variable存在则访问被允许，使用由mod\_setenvif提供的指令，服务器用一种基于客户端请求的弹性方式提供了设置环境变量的能力。因此，这条指令可以用于允许基于像User-Agent(浏览器类型)、Referer或其他 HTTP请求头字段的访问。

**Deny** ：控制哪些主机被禁止访问服务器的该区域。可以根据主机名、IP地址、 IP地址范围或其他环境变量中捕获的客户端请求特性进行控制。

语法：Deny from all|host|env=env-variable \[host|env=env-variable\] ...

此指令的参数设置和Allow指令完全相同。

### 14. DirectoryIndex

当客户端请求一个目录时寻找的资源列表。

语法：DirectoryIndex Local-url \[Local-url\] ...

Local-url(%已解码的)是一个相对于被请求目录的文档的URL(通常是那个目录中的一个文件)。可以指定多个URL，服务器将返回最先找到的那一个，

比如：

DirectoryIndex index.html index.php

### 15. ErrorLog

指定当服务器遇到错误时记录错误日志的文件。

语法：ErrorLog file-path|syslog\[:facility\]

如果file-path不是一个以斜杠(/)开头的绝对路径，那么将被认为是一个相对于ServerRoot的相对路径；如果file-path以一个管道符号(|)开头，那么会为它指定一个命令来处理错误日志，如 ErrorLog "|/usr/local/sbin/cronolog /var/log/httpd/%w/errors\_log"。

如果系统支持，使用"syslog"替代文件名将通过 syslogd(8)来记载日志。默认将使用系统日志机制local7 ，但您可以用"syslog:facility"语法来覆盖这个设置，其中，facility的取值为syslog(1)中记载的任何一个名字。

### 16. LogLevel

用于调整记录在错误日志中的信息的详细程度。

语法：LogLevel level

可以选择下列level，依照重要性降序排列：

emerg 紧急(系统无法使用)

alert 必须立即采取措施

crit 致命情况

error 错误情况

warn 警告情况

notice 一般重要情况

info 普通信息

debug 调试信息

当指定了某个级别时，所有级别高于它的信息也会被同时记录。比如，指定 LogLevel info ，则所有notice和warn级别的信息也会被记录。建议至少使用crit级别。

当错误日志是一个单独分开的正式文件的时候，notice级别的消息总是会被记录下来，而不能被屏蔽。但是，当使用syslog来记录时就没有这个问题。

### 17. LogFormat

定义访问日志的记录格式。

语法：LogFormat format|nickname \[nickname\]

LogFormat指令可以使用两种定义格式中的一种。

在第一种格式中，指令只带一个参数，以定义后续的TransferLog指令定义的日志格式。另外它也可以通过下述的方法使用nickname来引用某个之前的LogFormat定义的日志格式。

第二种定义LogFormat指令的格式中，将一个直接的format和一个nickname联系起来。这样在后续的LogFormat或 CustomLog指令中，就不用一再重复整个冗长的格式串。

定义别名的LogFormat指令仅仅用来定义一个nickname ，而不做其它任何事情，也就是说，它只是定义了这个别名，它既没有实际应用这个别名，也不是把它设为默认的格式。

因此，它不会影响后续的 TransferLog指令。另外，LogFormat不能用一个别名来定义另一个别名。nickname不能包含百分号(%)。

关于format的格式，请参见Apache2.2官方文档中的自定义日志格式小节。

### 18. CustomLog

设定日志的文件名和格式。

语法：CustomLog file|pipe format|nickname \[env=\[!\]environment-variable\]

第一个参数指定了日志记录的位置，可以使用以下两种方式来设定：

file 相对于ServerRoot的日志文件名。  
pipe 管道符"|"后面紧跟着一个把日志输出当作标准输入的处理程序路径。

第二个参数指定了写入日志文件的内容。它既可以是由前面的LogFormat指令定义的nickname ，也可以是直接按Apache2.2官方文档中的自定义日志格式小节所描述的规则定义的format字符串。

第三个参数是可选的，它根据服务器上特定的环境变量是否被设置来决定是否对某一特定的请求进行日志记录。如果这个特定的环境变量被设置(或者在"env=!name"的情况下未被设置)，那么这个请求将被记录。可以使用mod\_setenvif和/或mod\_rewrite模块来为每个请求设置环境变量。

### 19. TransferLog

指定日志文件的位置。

语法：TransferLog file|pipe

本指令除不允许直接定义日志格式或根据条件进行日志记录外，与CustomLog指令有完全相同的参数和功能。实际应用中，日志的格式是由最近的非别名定义的LogFormat指令指定。如果没有定义任何日志格式，则使用通用日志格式。

### 20. Alias

映射URL到文件系统的特定区域。

语法：Alias URL-path file-path|directory-path

Alias指令使文档可以被存储在DocumentRoot以外的本地文件系统中。以(%已解码的)url-path路径开头的URL可以被映射到以directory-path开头的本地文件。

如果对在DocumentRoot之外的某个目录建立了一个Alias ，则可能需要通过<Directory>段明确的对目标目录设定访问权限。

### 21. ScriptAlias

映射一个URL到文件系统并视之为CGI脚本目录。

语法：ScriptAlias URL-path file-path|directory-path

ScriptAlias指令的行为与Alias指令相同，但同时它又标明此目录中含有应该由cgi-script处理器处理的CGI脚本。以URL-path开头的(%已解码的)的URL会被映射到由第二个参数指定的具有完整路径名的本地文件系统中的脚本。

ScriptSock：在以线程式MPM(worker)运行的Apache中设置用来与CGI守护进程通信的套接字文件名前缀(其后附加父进程 PID组成完整的文件名)。这个套接字将会用启动Apache服

务器的父进程用户权限(通常是root)打开。为了维护与CGI脚本通讯的安全性，不允许其他用户拥有写入套接字所在目录的权限是很重要的。

### 22. DefaultType

在服务器无法由其他方法确定内容类型时，发送的默认MIME内容类型。

语法：DefaultType MIME-type

默认：DefaultType text/plain

### 23. AddType

在给定的文件扩展名与特定的内容类型之间建立映射关系。

语法：AddType MIME-type extension \[extension\] ...

MIME-type指明了包含extension扩展名的文件的媒体类型。这个映射关系会添加在所有有效的映射关系上，并覆盖所有相同的extension扩展名映射。

extension参数是不区分大小的，并且可以带或不带前导点。

### 24. ErrorDocument

批示当遇到错误的时候服务器将给客户端什么样的应答。

语法：ErrorDocument error-code document

error-code 服务器返回的错误代码

document 可以由一个斜杠(/)开头来指示一个本地URL(相对于DocumentRoot)，或是提供一个能被客户端解释的完整的URL。

此外还能提供一个可以被浏览器显示的消息。

比如：

ErrorDocument 500http://www.entage.net/err500.html

ErrorDocument 404 /errors/bad\_urls.html

ErrorDocument 403 "Sorry can't allow you access today"

### 25. EnableMMAP

指示httpd在递送中如果需要读取一个文件的内容，它是否可以使用内存映射。

语法：EnableMMAP On|Off

当处理一个需要访问文件中的数据的请求时，比如说当递送一个使用mod\_include进行服务器端分析的文件时，如果操作系统支持，Apache将默认使用内存映射。

这种内存映射有时会带来性能的提高，但在某些情况下，您可能会需要禁用内存映射以避免一些操作系统的问题：

在一些多处理器的系统上，内存映射会减低一些httpd的性能；

在挂载了NFS的DocumentRoot上，若已经将一个文件进行了内存映射，则删除或截断这个文件会造成httpd因为分段故障而崩溃。

在可能遇到这些问题的服务器配置过程中，应当使用下面的命令来禁用内存映射：

### 26. EnableMMAP Off

对于挂载了NFS的文件夹，可以单独在<directory>段中指定禁用内存映射：

<Directory "/path-to-nfs-files">  
EnableMMAP Off  
</Directory>

### 27. EnableSendfile

控制httpd是否可以使用操作系统内核的sendfile支持来将文件发送到客户端。

默认情况下，当处理一个请求并不需要访问文件内部的数据时(比如发送一个静态的文件内容)，如果操作系统支持，Apache将使用sendfile将文件内容直接发送到客户端而并不读取文件。

这个sendfile机制避免了分开的读和写操作以及缓冲区分配，但是在一些平台或者一些文件系统上，最好禁止这个特性来避免一些问题：

一些平台可能会有编译系统检测不到的有缺陷的sendfile支持，特别是将在其他平台上使用交叉编译得到的二进制文件运行于当前对sendfile支持有缺陷的平台时；

在Linux上启用IPv6时，使用sendfile将会触发某些网卡上的TCP校验和卸载bug；

当Linux运行在Itanium处理器上的时候，sendfile可能无法处理大于2GB的文件；

对于一个通过网络挂载了NFS文件系统的DocumentRoot (比如：NFS或SMB)，内核可能无法可靠的通过自己的缓冲区服务于网络文件。

如果出现以上情况，你应当禁用sendfile ：

EnableSendfile Off

针对NFS或SMB，可以单独在<directory>段中指定禁用：

<Directory "/path-to-nfs-files">  
EnableSendfile Off  
</Directory>

### 28. include

在服务器配置文件中包含其它配置文件。

语法：Include file-path|directory-path

Shell风格(fnmatch())的通配符可以用于按照字母顺序一次包含多个文件。另外，如果Include指向了一个目录而不是一个文件，Apache将读入该目录及其子目录下的所有文件，并依照字母顺序将这些文件作为配置文件进行解析。但是并不推荐这么做，因为偶尔会有临时文件在这个目录中生成，从而导致httpd启动失败。文件的路径可以是一个完整的绝对路径(以一个斜杠开头)，或是相对于ServerRoot目录的相对路径。



### 29 虚拟主机httpd-vhost.conf

这里重点介绍一下基于多端口的配置

```
NameVirtualHost *:81
    NameVirtualHost *:82
    NameVirtualHost *:83


    <VirtualHost *:81>
        ServerAdmin jafy@jafy00.com
        DocumentRoot /www1
        ServerName www.jafy00.com
        ErrorLog logs/www1-error.log
        CustomLog logs/www1-access_log common
    </VirtualHost>


    <VirtualHost *:82>
        <Directory "/www2" >
        Options FollowSymLinks
        #Deny from all
        Allow from all
        </Directory>
        ServerAdmin jafy@jafy00.com
        DocumentRoot /www2
        ServerName www.jafy00.com
        DirectoryIndex index.php index.html
        ErrorLog logs/www2-error.log
        CustomLog logs/www2-access_log combined
    </VirtualHost>Host>

```

<font size=2 color=grey>[阅读原文](https://www.cnblogs.com/mzhaox/p/11216635.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
