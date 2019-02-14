### ​PHP执行linux命令的6个函数

#### 目录

- [​PHP执行linux命令的6个函数](#​php执行linux命令的6个函数)
    - [目录](#目录)
    - [1、exec函数](#1exec函数)
    - [2、system函数](#2system函数)
    - [3、passthru函数](#3passthru函数)
    - [4、popen函数](#4popen函数)
    - [5、proc_open函数](#5proc_open函数)
    - [6、shell_exec函数](#6shell_exec函数)


> 一般情况下，很少会用php去执行linux命令，不过特殊情况下，你也许会用到这些函数。以前我知道有二个函数可以执行linux命令，一个是exec,一个是shell_exec。其实有很多的，结合手册内容，介绍以下6个函数。

#### 1、exec函数 ####

    <?php
    $test = "ls /tmp/test"; //ls是linux下的查目录，文件的命令
    exec($test,$array); //执行命令
    print_r($array);
    ?>
返回结果如下：

    [root@krlcgcms01 shell]# php ./exec.php
    Array
    (
    [0] => 1001.log
    [1] => 10.log
    [2] => 10.tar.gz
    [3] => aaa.tar.gz
    [4] => mytest
    [5] => test1101
    [6] => test1102
    [7] => weblog_2010_09
    )
#### 2、system函数 ####

    <?php
    $test = "ls /tmp/test";
    $last = system($test);
    print "last: $last\n";
    ?>
结果如下：

    [root@krlcgcms01 shell]# php system.php
    1001.log
    10.log
    10.tar.gz
    aaa.tar.gz
    mytest
    test1101
    test1102
    weblog_2010_09
    last:weblog_2010_09
#### 3、passthru函数 ####

    <?php
    $test = "ls /tmp/test";
    passthru($test);
    ?>

#### 4、popen函数 ####

    <?php
    $test = "ls /tmp/test";
    $fp = popen($test,"r"); //popen打一个进程通道
    while (!feof($fp)) { //从通道里面取得东西
    $out = fgets($fp, 4096);
    echo $out; //打印出来
    }
    pclose($fp);
    ?>
#### 5、proc_open函数 ####

    <?php
    $test = "ls /tmp/test";
    $array = array(
    array("pipe","r"), //标准输入
    array("pipe","w"), //标准输出内容
    array("pipe","w") //标准输出错误
    );
    $fp = proc_open($test,$array,$pipes); //打开一个进程通道
    echo stream_get_contents($pipes[1]); //为什么是$pipes[1]，因为1是输出内容
    proc_close($fp);
    ?>
#### 6、shell_exec函数 ####

    <?php
    $test = "ls /tmp/test";
    $out = shell_exec($test);
    echo $out;
    ?>

popen,passthru,proc_open,shell_exec的返回结果如下：

    [root@krlcgcms01 shell]# php test.php
    1001.log
    10.log
    10.tar.gz
    aaa.tar.gz
    mytest
    test1101
    test1102
    weblog_2010_09

这几个函数，能执行linux下的命令，欢迎大家补充。当然在有些php环境下，是禁止这些函数执行的，需要在php.ini配置中开启。

----
@tsingchan
