
<!-- TOC -->

- [查看docker hub上有哪些nginx镜像](#查看docker-hub上有哪些nginx镜像)
- [pull及安装nginx镜像](#pull及安装nginx镜像)
- [确认nginx镜像](#确认nginx镜像)
- [运行nginx容器](#运行nginx容器)
- [测试访问](#测试访问)

<!-- /TOC -->

### 查看docker hub上有哪些nginx镜像

```
jm@ubuntu:/var/www/docker/demo$ sudo docker search nginx
NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
nginx                             Official build of Nginx.                        12314               [OK]                
jwilder/nginx-proxy               Automated Nginx reverse proxy for docker con…   1698                                    [OK]
richarvey/nginx-php-fpm           Container running Nginx + PHP-FPM capable of…   746                                     [OK]
linuxserver/nginx                 An Nginx container, brought to you by LinuxS…   83                                      
bitnami/nginx                     Bitnami nginx Docker Image                      73                                      [OK]
...
...
   
```       

### pull及安装nginx镜像

```
jm@ubuntu:/var/www/docker/demo$ sudo docker pull nginx:latest
latest: Pulling from library/nginx
000eee12ec04: Pull complete 
eb22865337de: Pull complete 
bee5d581ef8b: Pull complete 
Digest: sha256:50cf965a6e08ec5784009d0fccb380fc479826b6e0e65684d9879170a9df8566
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```

### 确认nginx镜像

```
jm@ubuntu:/var/www/docker/demo$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               latest              231d40e811cd        2 weeks ago         126MB
hello-world         latest              fce289e99eb9        11 months ago       1.84kB
```

### 运行nginx容器

```
jm@ubuntu:/var/www/docker/demo$ sudo docker run --name nginx-test -p 8080:80 -d nginx
bae3e0acf7418079cd682a86cc810f75d36e8a19e1d8651e0fd111fcfea0fd1d
```

容器名称nginx-test 

-d nginx 后台运行

### 测试访问

在本地访问8080端口，即可访问到容器的80的端口，即nginx绑定的80端口：
```
http://192.168.8.130:8080
```





