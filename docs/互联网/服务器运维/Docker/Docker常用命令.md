
<!-- TOC -->

- [命令分类](#命令分类)
- [docker-compose](#docker-compose)
- [常用命令](#常用命令)
- [参考](#参考)

<!-- /TOC -->
## 命令分类

- 容器生命周期管理

    - run
    - start/stop/restart
    - kill
    - rm 
    - pause/unpause
    - create
    - exec


- 容器操作

    - ps
    - inspect
    - top
    - attach
    - events
    - logs
    - wait
    - export
    - port


- 容器rootfs命令

    - commit
    - cp
    - diff

- 镜像仓库

    - login
    - pull
    - push
    - search

- 本地镜像管理

    - images
    - rmi
    - tag
    - build
    - history
    - load
    - import

- 其他    
    - info
    - version

## docker-compose





----

## 常用命令

- 查看容器ip地址
```
docker inspect --format '{{ .NetworkSettings.IPAddress }}' nginx-test
```

- 创建一个nginx容器
```
docker run -d --name nginx -p 80:80 -p 443:443 -v /etc/nginx/:/etc/nginx -v /var/www/html:/var/www/html -v /var/log/nginx:/var/log/nginx nginx
```

- 进入容器并修改文件

```
jm@ubuntu:/tmp$ sudo docker exec -it 1498f0ea59f8 /bin/bash
bash-4.4# ls
atlassian-synchrony.log    index                      logs                       plugins-temp               synchrony-standalone.jar
bundled-plugins            journal                    plugins-cache              shared-home                temp
confluence.cfg.xml         lock                       plugins-osgi-cache         synchrony-args.properties  webresource-temp
bash-4.4# vim confluence.cfg.xml 
bash: vim: command not found
bash-4.4# vi confluence.cfg.xml 
```

- 查看镜像构建过程

```
docker history --help
Usage:  docker history [OPTIONS] IMAGE
Show the history of an image
Options:
      --format string   Pretty-print images using a Go template
      --help            Print usage
  -H, --human           Print sizes and dates in human readable format (default true)
      --no-trunc        Don't truncate output
  -q, --quiet           Only show numeric IDs

```
示例
```
sudo docker history phpdockerio/php72-fpm:latest --no-trunc |grep systemd

```

- 主机与容器之间数据拷贝

将主机/www/html目录拷贝到容器96f7f14e99ab的/html目录下。

```
docker cp /www/html 96f7f14e99ab:/html/
```

目标地址和源地址可以反过来，即从容器复制到主机中

## 参考

https://www.runoob.com/docker/docker-command-manual.html

http://study.p2hp.com/docker/docker-command-manual.html