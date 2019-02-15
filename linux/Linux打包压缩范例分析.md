
## Linux打包压缩范例分析


- [Linux打包压缩范例分析](#linux打包压缩范例分析)
    - [tar命令](#tar命令)
        - [格式：](#格式)
        - [参数：](#参数)
        - [范例：](#范例)
            - [范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar](#范例一将整个-etc-目录下的文件全部打包成为-tmpetctar)
            - [范例二：查阅上述 /tmp/etc.tar.gz 文件内有哪些文件](#范例二查阅上述-tmpetctargz-文件内有哪些文件)
            - [范例三：将 /tmp/etc.tar.gz 文件解压缩在 /usr/local/src 底下](#范例三将-tmpetctargz-文件解压缩在-usrlocalsrc-底下)
            - [范例四：在 /tmp 底下，我只想要将 /tmp/etc.tar.gz 内的 etc/passwd 解开而已](#范例四在-tmp-底下我只想要将-tmpetctargz-内的-etcpasswd-解开而已)
            - [范例五：将 /etc/ 内的所有文件备份下来，并且保存其权限。](#范例五将-etc-内的所有文件备份下来并且保存其权限)
            - [范例六：在 /home 当中，比 2005/06/01 新的文件才备份](#范例六在-home-当中比-20050601-新的文件才备份)
            - [范例七：我要备份 /home, /etc ，但不要 /home/dmtsai](#范例七我要备份-home-etc-但不要-homedmtsai)
            - [范例八：将 /etc/ 打包后直接解开在 /tmp 底下，而不产生文件](#范例八将-etc-打包后直接解开在-tmp-底下而不产生文件)
    - [gzip, zcat 命令](#gzip-zcat-命令)
        - [格式：](#格式-1)
        - [参数：](#参数-1)
        - [范例：](#范例-1)
            - [范例一：将 /etc/man.config 复制到 /tmp ，并且以 gzip 压缩](#范例一将-etcmanconfig-复制到-tmp-并且以-gzip-压缩)
            - [范例二：将范例一的文件内容读出来](#范例二将范例一的文件内容读出来)
            - [范例三：将范例一的文件解压缩](#范例三将范例一的文件解压缩)
            - [范例四：将范例三解开的 man.config 用最佳的压缩比压缩，并保留原本的文件](#范例四将范例三解开的-manconfig-用最佳的压缩比压缩并保留原本的文件)
    - [bzip2, bzcat 命令](#bzip2-bzcat-命令)
        - [格式：](#格式-2)
        - [参数：](#参数-2)
        - [范例：](#范例-2)
            - [范例一：将刚刚的 /tmp/man.config 以 bzip2 压缩](#范例一将刚刚的-tmpmanconfig-以-bzip2-压缩)
            - [范例二：将范例一的文件内容读出来](#范例二将范例一的文件内容读出来-1)
            - [范例三：将范例一的文件解压缩](#范例三将范例一的文件解压缩-1)
            - [范例四：将范例三解开的 man.config 用最佳的压缩比压缩，并保留原本的文件](#范例四将范例三解开的-manconfig-用最佳的压缩比压缩并保留原本的文件-1)
    - [compress 命令](#compress-命令)
        - [格式：](#格式-3)
        - [参数：](#参数-3)
        - [范例：](#范例-3)
            - [范例一：将 /etc/man.config 复制到 /tmp ，并加以压缩](#范例一将-etcmanconfig-复制到-tmp-并加以压缩)
            - [范例二：将刚刚的压缩档解开](#范例二将刚刚的压缩档解开)
            - [范例三：将 man.config 压缩成另外一个文件来备份](#范例三将-manconfig-压缩成另外一个文件来备份)



### tar命令

#### 格式：

    tar [-cxtzjvfpPN] 文件与目录 ....

#### 参数：

    -c ：建立一个压缩文件的参数指令(create 的意思)；

    -x ：解开一个压缩文件的参数指令。

    -t ：查看 tarfile 里面的文件。

    特别注意，在参数的下达中， c/x/t 仅能存在一个。不可同时存在。因为不可能同时压缩与解压缩。

    -z ：是否同时具有 gzip 的属性？亦即是否需要用 gzip 压缩？

    -Z ：用compress进行压缩

    -j ：是否同时具有 bzip2 的属性？亦即是否需要用 bzip2 压缩？

    -v ：压缩的过程中显示文件。这个常用，但不建议用在后台执行过程。

    -f ：使用文件名，请留意，在 f 之后要立即接文件名。不再加参数。

    例如使用『 tar -zcvfP tfile sfile』就是错误的写法，要写成:

    『 tar -zcvPf tfile sfile』才对。

    -p ：使用原文件的原来属性（属性不会依据使用者而变）

    -P ：可以使用绝对路径来压缩。

    -N ：比后面接的日期(yyyy/mm/dd)还要新的才会被打包进新建的文件中。

    --exclude FILE：在压缩的过程中，不要将 FILE 打包。


#### 范例：

##### 范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar

    [root@linux ~]# tar -cvf /tmp/etc.tar /etc 	
    	<==仅打包，不压缩
    [root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc 
    	<==打包后，以 gzip 压缩
    [root@linux ~]# tar -jcvf /tmp/etc.tar.bz2 /etc
     	<==打包后，以 bzip2 压缩

> 特别注意，在参数 f 之后的文件名是自己取的，我们习惯上都用 .tar 来作为标识。
>
> 如果加 z 参数，则以 .tar.gz 或 .tgz 来代表 gzip 压缩过的 tar file 
>
> 如果加 j 参数，则以 .tar.bz2 来作为文件名
>
> 上述指令在执行的时候，会显示一个警告讯息：
>
> 『tar: Removing leading `/' from member names』那是关于绝对路径的特殊设定。


##### 范例二：查阅上述 /tmp/etc.tar.gz 文件内有哪些文件

    [root@linux ~]# tar -ztvf /tmp/etc.tar.gz

> 由于我们使用 gzip 压缩，所以要查阅该 tar file 内的文件时，就得要加上 z 这个参数了。这很重要的。


##### 范例三：将 /tmp/etc.tar.gz 文件解压缩在 /usr/local/src 底下

    [root@linux ~]# cd /usr/local/src
    [root@linux src]# tar -zxvf /tmp/etc.tar.gz

> 在预设的情况下，我们可以将压缩档在任何地方解开的。以这个范例来说，
> 我先将工作目录变换到 /usr/local/src 底下，并且解开 /tmp/etc.tar.gz ，
> 则解开的目录会在 /usr/local/src/etc 呢。另外，如果您进入 /usr/local/src/etc
> 则会发现，该目录下的文件属性与 /etc/ 可能会有所不同。

##### 范例四：在 /tmp 底下，我只想要将 /tmp/etc.tar.gz 内的 etc/passwd 解开而已

    [root@linux ~]# cd /tmp
    [root@linux tmp]# tar -zxvf /tmp/etc.tar.gz etc/passwd

>我可以透过 tar -ztvf 来查阅 tarfile 内的文件名称，如果单只要一个文件，
>就可以透过这个方式来下达。注意到： etc.tar.gz 内的根目录 / 是被拿掉了。

##### 范例五：将 /etc/ 内的所有文件备份下来，并且保存其权限。

    [root@linux ~]# tar -zxvpf /tmp/etc.tar.gz /etc

>这个 -p 的属性是很重要的，尤其是当您要保留原本文件的属性时。

##### 范例六：在 /home 当中，比 2005/06/01 新的文件才备份
    [root@linux ~]# tar -N '2005/06/01' -zcvf home.tar.gz /home

##### 范例七：我要备份 /home, /etc ，但不要 /home/dmtsai

    [root@linux ~]# tar --exclude /home/dmtsai -zcvf myfile.tar.gz /home/* /etc

##### 范例八：将 /etc/ 打包后直接解开在 /tmp 底下，而不产生文件

    [root@linux ~]# cd /tmp
    [root@linux tmp]# tar -cvf - /etc | tar -xvf -

>这个动作有点像是 cp -r /etc /tmp 啦～依旧是有其有用途的。
>要注意的地方在於输出档变成 - 而输入档也变成 - ，又有一个 | 存在～
>这分别代表 standard output, standard input 与管线命令。


### gzip, zcat 命令

#### 格式：

    gzip [-cdt#] 文件名

    zcat 文件名.gz

#### 参数：
    -c ：将压缩的资料输出到萤幕上，可透过资料流重导向来处理；
    -d ：解压缩的参数；
    -t ：可以用来检验一个压缩档的一致性～看看文件有无错误；
    -# ：压缩等级，-1 最快，但是压缩比最差、-9 最慢，但是压缩比最好！预设是 -6 ～

#### 范例：

##### 范例一：将 /etc/man.config 复制到 /tmp ，并且以 gzip 压缩

    [root@linux ~]# cd /tmp
    [root@linux tmp]# cp /etc/man.config .
    [root@linux tmp]# gzip man.config

>此时 man.config 会变成 man.config.gz 

##### 范例二：将范例一的文件内容读出来

    [root@linux tmp]# zcat man.config.gz

>此时萤幕上会显示 man.config.gz 解压缩之后的文件内容

##### 范例三：将范例一的文件解压缩
    
    [root@linux tmp]# gzip -d man.config.gz

##### 范例四：将范例三解开的 man.config 用最佳的压缩比压缩，并保留原本的文件

    [root@linux tmp]# gzip -9 -c man.config > man.config.gz


### bzip2, bzcat 命令

#### 格式：
    bzip2 [-cdz] 文件名
    bzcat 文件名.bz2

#### 参数：
    -c ：将压缩的过程产生的资料输出到萤幕上
    -d ：解压缩的参数
    -z ：压缩的参数
    -# ：与 gzip 同样的，都是在计算压缩比的参数， -9 最佳， -1 最快

#### 范例：

##### 范例一：将刚刚的 /tmp/man.config 以 bzip2 压缩

    [root@linux tmp]# bzip2 -z man.config

>此时 man.config 会变成 man.config.bz2 

##### 范例二：将范例一的文件内容读出来
    [root@linux tmp]# bzcat man.config.bz2

>此时萤幕上会显示 man.config.bz2 解压缩之后的文件内容

##### 范例三：将范例一的文件解压缩
    [root@linux tmp]# bzip2 -d man.config.bz2

##### 范例四：将范例三解开的 man.config 用最佳的压缩比压缩，并保留原本的文件
    
    [root@linux tmp]# bzip2 -9 -c man.config > man.config.bz2


### compress 命令

#### 格式：
    compress [-dcr] 文件或目录
#### 参数：
    -d ：用来解压缩的参数
    -r ：可以连同目录下的文件也同时给予压缩
    -c ：将压缩文件输出成为 standard output (输出到屏幕)

#### 范例：

##### 范例一：将 /etc/man.config 复制到 /tmp ，并加以压缩
    [root@linux ~]# cd /tmp
    [root@linux tmp]# cp /etc/man.config .
    [root@linux tmp]# compress man.config
    [root@linux tmp]# ls -l
    -rw-r--r-- 1 root root 2605 Jul 27 11:43 man.config.Z


##### 范例二：将刚刚的压缩档解开
    [root@linux tmp]# compress -d man.config.Z

##### 范例三：将 man.config 压缩成另外一个文件来备份
    [root@linux tmp]# compress -c man.config > man.config.back.Z
    [root@linux tmp]# ll man.config*
    -rw-r--r-- 1 root root 4506 Jul 27 11:43 man.config
    -rw-r--r-- 1 root root 2605 Jul 27 11:46 man.config.back.Z

>这个 -c 的参数比较有趣。他会将压缩过程的资料输出到萤幕上，而不是写入成为
>file.Z 文件。所以，我们可以透过资料流重导向的方法将资料输出成为另一个档名。


