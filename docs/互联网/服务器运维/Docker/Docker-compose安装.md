

Docker-compose 安装
----

- 概念

docker-compose是用来管理docker多个容器服务的

比如我们有一个nginx的容器，一个php的容器，还有个mail的容器等等，这么多容器，start、config等操作都需要成倍的操作，如果通过docker-compose我们可以统一管理这些容器的参数配置及启动等，可以极大程度的简化命令行的复杂操作



- 下载

进入

https://github.com/docker/compose/releases 

查看最新版本，当前版本为1.25.1

sudo curl -L https://github.com/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

- 设置

sudo chmod +x /usr/local/bin/docker-compose

- 查看

docker-compose --version


- 示例

示例是直接手动下载：

页面：https://github.com/docker/compose/releases

直接下载linux x86_64的资源：

https://github.com/docker/compose/releases/download/1.25.1/docker-compose-Linux-x86_64

```
jm@ubuntu:~$ ls
docker-compose  html  jdk-13.0.1_linux-x64_bin.tar.gz  qiniu  sql  x.php  xx.php
jm@ubuntu:~$ sudo chmod +x ./docker-compose 
jm@ubuntu:~$ sudo mv docker-compose /usr/bin/
jm@ubuntu:~$ docker-compose version
docker-compose version 1.25.1, build a82fef07
docker-py version: 4.1.0
CPython version: 3.7.4
OpenSSL version: OpenSSL 1.1.0l  10 Sep 2019

```

参考：

https://docs.docker.com/compose/install/

https://www.jianshu.com/p/4fbe3de8f416