
<!-- TOC -->

- [国内镜像源](#国内镜像源)
- [设置镜像源](#设置镜像源)
- [重启服务](#重启服务)

<!-- /TOC -->
### 国内镜像源

https://registry.docker-cn.com

http://hub-mirror.c.163.com

https://3laho3y3.mirror.aliyuncs.com

http://f1361db2.m.daocloud.io

https://mirror.ccs.tencentyun.com

https://docker.mirrors.ustc.edu.cn
————————————————


### 设置镜像源

/etc/docker/daemon.json

文件不存在则创建

```
{
    "registry-mirrors": ["https://registry.docker-cn.com","http://hub-mirror.c.163.com"]
}
```

> 可以多加几个国内镜像源，由于这些国内镜像源并没有完全实时同步镜像，比如在中国移动网络环境下，阿里云的镜像对于phpdockerio/php72-fpm镜像访问速度低，经常导致http超时或错误中断

### 重启服务


```
jm@ubuntu:~$ sudo systemctl daemon-reload
jm@ubuntu:~$ sudo systemctl restart docker

```
