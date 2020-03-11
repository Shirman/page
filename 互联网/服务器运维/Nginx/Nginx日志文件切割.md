
> Nginx 是一个非常轻量的 Web 服务器，体积小、性能高、速度快等诸多优点。但不足的是也存在缺点，比如其产生的访问日志文件一直就是一个，不会自动地进行切割，如果访问量很大的话，将 导致日志文件容量非常大，不便于管理。当然了，我们也不希望看到这么庞大的一个访问日志文件，那需要手动对这个文件进行切割。

在 Linux 平台上 Shell 脚本丰富，使用 Shell 脚本加 crontab 命令能非常方便地进行切割。

日志文件切割要求

由于 Nginx 的日志都是写在一个文件当中的，因此，我们需要每天零点将前一天的日志存为另外一个文件，这里我们就将 Nginx 位于 logs 目录中的 access.log 存为 access_[yyyy-MM-dd].log 的文件。其实 logs 目录中还有个 error.log 的错误日志文件，这个文件也需要每天切割一个，在这里就说 access.log 了，error.log 的切割方法类似。

Linux 平台切割

在 Linux 平台上进行切割，需要使用 date 命令以获得昨天的日期、使用 kill 命令向 Nginx 进程发送重新打开日志文件的信号，以及 crontab 设置执行任务周期。

先创建一个 Shell 脚本，如下：

Shell代码

    #!/bin/bash
    ## 零点执行该脚本
    ## Nginx 日志文件所在的目录
    LOGS_PATH=/usr/local/nginx/logs
    ## 获取昨天的 yyyy-MM-dd
    YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
    ## 移动文件
    mv ${LOGS_PATH}/access.log ${LOGS_PATH}/access_${YESTERDAY}.log
    ## 向 Nginx 主进程发送 USR1 信号。USR1 信号是重新打开日志文件
    kill -USR1 $(cat /usr/local/nginx/nginx.pid)

上面这个脚本中的最后一行必须向 Nginx 的进程发送 USR1 信号以重新打开日志文件，如果不写的话，Nginx 会继续将日志信息写入 access_[yyyy-MM-dd].log 的那个文件中，这显然是不正确的。

脚本完成后将其存入 Nginx 安装目录的 sbin 中，取名为 cut-log.sh，之后使用 crontab -e 新增一个定时任务，在其中增加执行这个脚本：

    >crontab -e
    0 0 * * * /bin/bash /usr/local/nginx/sbin/cut-log.sh

到这里 Linux 下切割 Nginx 日志就完成了，可以将 crontab 设置为距当前时较近的时间测试一下.
