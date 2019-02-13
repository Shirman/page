## Linux明明白白你的系统日志

### 目录



- [Linux明明白白你的系统日志](#linux明明白白你的系统日志)
    - [/var/log/boot.log系统开机日志](#varlogbootlog系统开机日志)
    - [/var/log/cron 定时任务日志](#varlogcron-定时任务日志)
    - [/var/log/maillog 系统邮件日志](#varlogmaillog-系统邮件日志)
    - [/var/log/syslog 系统主要操作日志](#varlogsyslog-系统主要操作日志)
    - [/var/log/wtmp 用户连接信息日志-永久日志](#varlogwtmp-用户连接信息日志-永久日志)
    - [/var/run/utmp 用户链接信息日志-当前日志](#varrunutmp-用户链接信息日志-当前日志)
    - [/var/log/xferlog FTP操作日志](#varlogxferlog-ftp操作日志)
    - [/var/log/dmesg 开机启动信息](#varlogdmesg-开机启动信息)
    - [/var/log/messages 系统杂货铺日志](#varlogmessages-系统杂货铺日志)
    - [/var/log/lastlog 最近登录系统日志](#varloglastlog-最近登录系统日志)
    - [/var/log/spooler](#varlogspooler)
    - [/var/log/yum.log](#varlogyumlog)



### /var/log/boot.log系统开机日志

该文件记录了系统在引导过程中发生的事件，就是Linux系统开机自检过程显示的信息。

　　
### /var/log/cron 定时任务日志

该日志文件记录crontab守护进程crond所派生的子进程的动作，前面加上用户、登录时间和PID，以及派生出的进程的动作。CMD的一个动作是cron派生出一个调度进程的常见情况。REPLACE(替换)动作记录用户对它的cron文件的更新，该文件列出了要周期性执行的任务调度。RELOAD动作在REPLACE动作后不久发生，这意味着cron注意到一个用户的cron文件被更新而cron需要把它重新装入内存。该文件可能会查到一些反常的情况。

### /var/log/maillog 系统邮件日志

该日志文件记录了每一个发送到系统或从系统发出的电子邮件的活动。它可以用来查看用户使用哪个系统发送工具或把数据发送到哪个系统。


该文件的格式是每一行包含日期、主机名、程序名，后面是包含PID或内核标识的方括号、一个冒号和一个空格，最后是消息。该文件有一个不足，就是被记录的入侵企图和成功的入侵事件，被淹没在大量的正常进程的记录中。但该文件可以由/etc/syslog文件进行定制。由/etc/syslog.conf配置文件决定系统如何写入/var/messages。

### /var/log/syslog 系统主要操作日志

默认Fedora不生成该日志文件，但可以配置/etc/syslog.conf让系统生成该日志文件。它和/etc/log/messages日志文件不同，它只记录警告信息，常常是系统出问题的信息，所以更应该关注该文件。要让系统生成该日志文件，在/etc/syslog.conf文件中加上：*.warning /var/log/syslog 该日志文件能记录当用户登录时login记录下的错误口令、Sendmail的问题、su命令执行失败等信息。该日志文件记录最近成功登录的事件和最后一次不成功的登录事件，由login生成。在每次用户登录时被查询，该文件是二进制文件，需要使用lastlog命令查看，根据UID排序显示登录名、端口号和上次登录时间。如果某用户从来没有登录过，就显示为"**Never logged in**"。该命令只能以root权限执行。


　　
### /var/log/wtmp 用户连接信息日志-永久日志

该日志文件永久记录每个用户登录、注销及系统的启动、停机的事件。因此随着系统正常运行时间的增加，该文件的大小也会越来越大，增加的速度取决于系统用户登录的次数。该日志文件可以用来查看用户的登录记录，last命令就通过访问这个文件获得这些信息，并以反序从后向前显示用户的登录记录，last也能根据用户、终端tty或时间显示相应的记录。

### /var/run/utmp 用户链接信息日志-当前日志

该日志文件记录有关当前登录的每个用户的信息。因此这个文件会随着用户登录和注销系统而不断变化，它只保留当时联机的用户记录，不会为用户保留永久的记录。系统中需要查询当前用户状态的程序，如 who、w、users、finger等就需要访问这个文件。该日志文件并不能包括所有精确的信息，因为某些突发错误会终止用户登录会话，而系统没有及时更新 utmp记录，因此该日志文件的记录不是百分之百值得信赖的。

以上提及的3个文件(/var/log/wtmp、/var/run/utmp、/var/log/lastlog)是日志子系统的关键文件，都记录了用户登录的情况。这些文件的所有记录都包含了时间戳。这些文件是按二进制保存的，故不能用less、cat之类的命令直接查看这些文件，而是需要使用相关命令通过这些文件而查看。其中，utmp和wtmp文件的数据结构是一样的，而lastlog文件则使用另外的数据结构，关于它们的具体的数据结构可以使用man命令查询。

每次有一个用户登录时，login程序在文件lastlog中查看用户的UID。如果存在，则把用户上次登录、注销时间和主机名写到标准输出中，然后login程序在lastlog中记录新的登录时间，打开utmp文件并插入用户的utmp记录。该记录一直用到用户登录退出时删除。utmp文件被各种命令使用，包括who、w、users和finger。

下一步，login程序打开文件wtmp附加用户的utmp记录。当用户登录退出时，具有更新时间戳的同一utmp记录附加到文件中。wtmp文件被程序last使用。

### /var/log/xferlog FTP操作日志

该日志文件记录FTP会话，可以显示出用户向FTP服务器或从服务器拷贝了什么文件。该文件会显示用户拷贝到服务器上的用来入侵服务器的恶意程序，以及该用户拷贝了哪些文件供他使用。

该文件的格式为：第一个域是日期和时间，第二个域是下载文件所花费的秒数、远程系统名称、文件大小、本地路径名、传输类型(a：ASCII，b：二进制)、与压缩相关的标志或tar，或"_"(如果没有压缩的话)、传输方向(相对于服务器而言：i代表进，o代表出)、访问模式(a：匿名，g：输入口令，r：真实用户)、用户名、服务名(通常是ftp)、认证方法(l：RFC931，或0)，认证用户的ID或"*"。

### /var/log/dmesg 开机启动信息
dmesg提供了一个简单的方法查看系统启动信息。当Linux启动的时候，内核的信息被存入内核ring缓存当中，dmesg可以显示缓存中的内容。默认情况下，dmesg打印内容到屏幕上面，当然你可以重定向输出到一个文件。如果硬件损坏的话，在dmesg日志里是有显示的，可用以下命令来查看dmesg | grep error。

/var/log/secure	The authpriv file has restricted access
/var/log/secure：记录登入系统存取数据的文件，例如 pop3, ssh, telnet, ftp 等都会被记录，我们可以利用此文件找出不安全的登陆IP。

### /var/log/messages 系统杂货铺日志

首先说下我们最关注的系统/var/log/messages，这东东不仅是咱们服务器的系统日志，很多时候它也做了许多服务的日志，这也是它被称为杂货铺的原因，值得重点关注，大家一般都喜欢用以下命令看最后十条日志。

其实还可以将一段日志保存成文件，正用练下自己的awk、sed和grep水平；或者直接用vim来查看,这也是算是一种经验之谈吧。我以前配置bind的主从复制，有时因为权限的原因报错；这时可以在一台报错的服务器上用命令tail -f /var/log/messages实时查看服务器的变化情况，从中查找错误的蛛丝马迹；事实证明，效果很好，而且用于lvs+keepalived的排错效也不错，其它事例依此类推。

### /var/log/lastlog 最近登录系统日志
记录每个使用者最近登录系统的时间， 因此当使用者登录时， 就会显示其上次登录的时间，您应该注意一下这个时间， 若不是您上次登录的时间， 表示您的帐号可能被人盗用了。 此档可用 /usr/bin/lastlog 指令读取（Freebsd下为/usr/sbin/lastlogin）。


### /var/log/spooler

Save news errors of level crit and higher in a special file

### /var/log/yum.log

yum工具的安装、更新日志

@tsingchan
