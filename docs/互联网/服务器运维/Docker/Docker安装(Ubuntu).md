<!-- TOC -->

- [Docker安装](#docker安装)
    - [Ubuntu](#ubuntu)
- [镜像加速](#镜像加速)

<!-- /TOC -->
## Docker安装

docker document 

https://docs.docker.com

### Ubuntu

https://docs.docker.com/install/linux/docker-ce/ubuntu/

以上文档介绍了3中安装方式：通过repository安装、通过package安装、通过shell脚本安装



## 镜像加速



- Ubuntu16.04+、Debian8+、CentOS7

对于使用 systemd 的系统，请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）：

```
{"registry-mirrors":["https://registry.docker-cn.com"]}
```

之后重新启动服务：
```
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

建议使用阿里云镜像源：
https://tnxkcso1.mirror.aliyuncs.com



镜像加速参考：https://www.runoob.com/docker/docker-mirror-acceleration.html