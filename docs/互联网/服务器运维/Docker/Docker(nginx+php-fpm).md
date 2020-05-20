

<!-- TOC -->

- [docker-compose文件目录结构](#docker-compose文件目录结构)
- [docker-compose.yml文件](#docker-composeyml文件)
- [php-fpm镜像Dockfile](#php-fpm镜像dockfile)
- [nginx.conf配置](#nginxconf配置)
- [php.ini覆盖设置](#phpini覆盖设置)
- [关于日志](#关于日志)
    - [nginx日志](#nginx日志)
    - [php日志](#php日志)
- [创建并启动容器](#创建并启动容器)
- [镜像和容器服务示例](#镜像和容器服务示例)
- [项目文件](#项目文件)
- [测试](#测试)
- [修改配置](#修改配置)

<!-- /TOC -->

这个网站是专注于自动生成php+nginx docker镜像配置

https://phpdocker.io/generator



### docker-compose文件目录结构

```
jm@ubuntu:/var/www/docker/nginx+php$  tree
.
├── docker-compose.yml
├── nginx
│   └── nginx.conf
└── php7.2
    ├── Dockerfile
    └── php-ini-overrides.ini

2 directories, 4 files

```

### docker-compose.yml文件

```

###############################################################################
#                          Generated on phpdocker.io                          #
###############################################################################
version: "3.1"
services:

    webserver:
      image: nginx:alpine
      container_name: jm-php7-2-webserver
      working_dir: /application
      volumes:
          - /var/www/html:/application
          - /var/log/nginx:/var/log/nginx
          - /var/www/docker/nginx+php/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      ports:
       - "8081:80"

    php-fpm:
      build: /var/www/docker/nginx+php/php7.2
      container_name: jm-php7-2-php-fpm
      working_dir: /application
      volumes:
        - /var/www/html:/application
        - /var/www/docker/nginx+php/php7.2/php-ini-overrides.ini:/etc/php/7.2/fpm/conf.d/99-overrides.ini
```

说明：
webserver就是nginx镜像生成的容器服务

php-fpm就是php服务

volumes是宿主服务器的文件挂载到容器中的文件路径，以：分割，比如将主机的/var/www/html挂载到容器的/application目录


### php-fpm镜像Dockfile

文件位置：/var/www/docker/nginx+php/php7.2/Dockerfi


```
FROM phpdockerio/php72-fpm:latest
WORKDIR "/application"

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install  php7.2-mysql php-redis php7.2-gd php-yaml \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

```

### nginx.conf配置

```
server {
    listen 80 default;

    client_max_body_size 20M;

    access_log /var/log/nginx/docker-demo.access.log;


    root /application/docker-demo;
    index index.html index.php;

    if (!-e $request_filename) {
        rewrite ^.*$ /index.php last;
    }

    location ~ \.php$ {
        fastcgi_pass php-fpm:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PHP_VALUE "error_log=/var/log/nginx/docker-demo.log";
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        include fastcgi_params;
    }

}

```

注意：fastcgi_pass php-fpm:9000，这里的php-fpm对应的是docker-compose.yml里配置的php-fpm服务

### php.ini覆盖设置

文件位置：/var/www/docker/nginx+php/php-ini-overrides.ini

```
upload_max_filesize = 20M
post_max_size = 20M
display_errors = On
```

### 关于日志

#### nginx日志

volumes配置中挂载了日志映射

```
- /var/log/nginx:/var/log/nginx
```

可以直接在主机中/var/log/nginx中查看ngxin容器的相关日志，一般php的错误日志，在php.ini中开启display_errors和log_errors，及error_log设置对应日志文件路径情况下，当前nginx版本也会记录php的错误日志信息

#### php日志

当然也可以通过Docker-compose logs来查看容器服务的一些日志


比如：

```
# 以下可以查看php-fpm容器的日志输出

sudo docker-compose logs -f php-fpm
```

> 实际上docker镜像将access.log和error.log分别软连接到了标准输出和标准错误，所以你能在docker logs中看到输出

参考：

https://docs.docker.com/compose/reference/logs/

https://segmentfault.com/q/1010000011411966

### 创建并启动容器

```
sudo docker-compose up
或者 
sudo docker-compose up -d
```

> -d 表示在后台运行
> 如果docker-compose.yml中配置的镜像或容器服务不存在，则docker-compose会拉取镜像或根据自定义的Dockerfile生成新的镜像，并run对应容器

----

示例，可以忽略跳过

```

jm@ubuntu:/var/www/docker/nginx+php$ sudo docker-compose up
Building php-fpm
Step 1/4 : FROM phpdockerio/php72-fpm:latest
latest: Pulling from phpdockerio/php72-fpm
2746a4a261c9: Pull complete
4c1d20cdee96: Pull complete
0d3160e1d0de: Pull complete
c8e37668deea: Pull complete
3d840b964755: Pull complete
0641ebfca34e: Pull complete
5a7b3caf5738: Pull complete
6fe9c8c3e668: Pull complete
Digest: sha256:5fc3706cbeb4884be483a921dbf11d36db8302b687fef7b54fe200b807031caa
Status: Downloaded newer image for phpdockerio/php72-fpm:latest
 ---> 399d5621db6e
Step 2/4 : WORKDIR "/application"
 ---> Running in ea372bf75790
Removing intermediate container ea372bf75790
 ---> 842fb7c0132b
Step 3/4 : ARG DEBIAN_FRONTEND=noninteractive
 ---> Running in 27ba0b451a65
Removing intermediate container 27ba0b451a65
 ---> 4133539681fc
Step 4/4 : RUN apt-get update     && apt-get -y --no-install-recommends install  php7.2-mysql php-redis php7.2-gd php-yaml     && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*
 ---> Running in 045606e42526
Get:1 http://ppa.launchpad.net/ondrej/php/ubuntu bionic InRelease [20.8 kB]
Get:2 http://archive.ubuntu.com/ubuntu bionic InRelease [242 kB]
Get:3 http://security.ubuntu.com/ubuntu bionic-security InRelease [88.7 kB]
Get:4 http://ppa.launchpad.net/ondrej/php/ubuntu bionic/main amd64 Packages [62.4 kB]
Get:5 http://archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]
Get:6 http://archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]
Get:7 http://archive.ubuntu.com/ubuntu bionic/universe amd64 Packages [11.3 MB]
Get:8 http://archive.ubuntu.com/ubuntu bionic/multiverse amd64 Packages [186 kB]
Get:3 http://security.ubuntu.com/ubuntu 
...
Fetched 17.5 MB in 1min 40s (175 kB/s)
Reading package lists...
Reading package lists...
Building dependency tree...
Reading state information...
The following additional packages will be installed:
  fontconfig-config fonts-dejavu-core libbsd0 libexpat1 libfontconfig1
  libfreetype6 libgd3 libjbig0 libjpeg-turbo8 libjpeg8 libpng16-16 libtiff5
  libwebp6 libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxpm4 libyaml-0-2
  multiarch-support php-igbinary
Suggested packages:
  libgd-tools redis-server
The following NEW packages will be installed:
  fontconfig-config fonts-dejavu-core libbsd0 libexpat1 libfontconfig1
  libfreetype6 libgd3 libjbig0 libjpeg-turbo8 libjpeg8 libpng16-16 libtiff5
  libwebp6 libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxpm4 libyaml-0-2
  multiarch-support php-igbinary php-redis php-yaml php7.2-gd php7.2-mysql
0 upgraded, 26 newly installed, 0 to remove and 2 not upgraded.
Need to get 4102 kB of archives.
After this operation, 17.1 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu bionic/main amd64 multiarch-support amd64 2.27-3ubuntu1 [6916 B]
...
Get:24 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 libtiff5 amd64 4.0.9-5ubuntu0.3 [153 kB]
Get:25 http://archive.ubuntu.com/ubuntu bionic/main amd64 libwebp6 amd64 0.6.1-2 [185 kB]
Get:26 http://archive.ubuntu.com/ubuntu bionic/main amd64 libxpm4 amd64 1:3.5.12-1 [34.0 kB]
debconf: delaying package configuration, since apt-utils is not installed
Fetched 4102 kB in 12s (342 kB/s)
Selecting previously unselected package multiarch-support.
(Reading database ... 7166 files and directories currently installed.)
Preparing to unpack .../multiarch-support_2.27-3ubuntu1_amd64.deb ...
Unpacking multiarch-support (2.27-3ubuntu1) ...
Setting up multiarch-support (2.27-3ubuntu1) ...
Selecting previously unselected package libxau6:amd64.
(Reading database ... 7169 files and directories currently installed.)
Preparing to unpack .../00-libxau6_1%3a1.0.8-1_amd64.deb ...
Unpacking libxau6:amd64 (1:1.0.8-1) ...
Selecting previously unselected package libjpeg-turbo8:amd64.
Preparing to unpack .../01-libjpeg-turbo8_1.5.2-0ubuntu5.18.04.3_amd64.deb ...
Unpacking libjpeg-turbo8:amd64 (1.5.2-0ubuntu5.18.04.3) ...
Selecting previously unselected package php-igbinary.

 ...

Creating config file /etc/php/7.2/mods-available/mysqlnd.ini with new version

Creating config file /etc/php/7.2/mods-available/mysqli.ini with new version

Creating config file /etc/php/7.2/mods-available/pdo_mysql.ini with new version
Setting up libexpat1:amd64 (2.2.5-3ubuntu0.2) ...
Setting up libpng16-16:amd64 (1.6.34-1ubuntu0.18.04.2) ...
Setting up libjbig0:amd64 (2.1-3.1build1) ...

...

Creating config file /etc/php/7.2/mods-available/gd.ini with new version
Processing triggers for libc-bin (2.27-3ubuntu1) ...
Processing triggers for php7.2-fpm (7.2.26-1+ubuntu18.04.1+deb.sury.org+1) ...
invoke-rc.d: could not determine current runlevel
invoke-rc.d: policy-rc.d denied execution of restart.
Removing intermediate container 045606e42526
 ---> 1be304071f84
Successfully built 1be304071f84
Successfully tagged nginxphp_php-fpm:latest
WARNING: Image for service php-fpm was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating jm-php7-2-webserver ... done
Creating jm-php7-2-php-fpm   ... done
Attaching to jm-php7-2-php-fpm, jm-php7-2-webserver
jm-php7-2-php-fpm | [11-Jan-2020 02:26:56] NOTICE: fpm is running, pid 7
jm-php7-2-php-fpm | [11-Jan-2020 02:26:56] NOTICE: ready to handle connections
jm-php7-2-php-fpm | [11-Jan-2020 02:26:56] NOTICE: systemd monitor interval set to 10000ms

```

### 镜像和容器服务示例


```
jm@ubuntu:/var/www/docker/nginx+php$ sudo docker images
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
nginxphp_php-fpm                        latest              1be304071f84        About an hour ago   169MB
phpdockerio/php72-fpm                   latest              399d5621db6e        3 hours ago         151MB
nginx                                   alpine              36189e6707f4        29 hours ago        21.5MB


```

phpdockerio/php72-fpm镜像是nginxphp_php-fpm的基础镜像，通过基础镜像，配置Dockerfile生成新的镜像nginxphp_php-fpm镜像。


```
jm@ubuntu:/var/www/docker/nginx+php$ sudo docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                            NAMES
d6844b66b2e2        nginxphp_php-fpm    "/bin/sh -c /usr/bin…"   About an hour ago   Up 57 minutes       9000/tcp                         jm-php7-2-php-fpm
15fe488dbf8a        nginx:alpine        "nginx -g 'daemon of…"   About an hour ago   Up 57 minutes       80/tcp, 0.0.0.0:8081->8081/tcp   jm-php7-2-webserver


```

### 项目文件

nginx配置root为：/application/docker-demo，且将主机/var/www/html挂载到/application，所以我们/var/www/html/docker-demo建立项目文件：

```
jm@ubuntu:/var/www/html/docker-demo$ tree
.
├── index.html
└── index.php
```
index.html
```

from nginx docker.html

```

index.php
```
phpinfo();
```

### 测试

访问　http://192.168.8.130:8081

输出：

from ngxin docker.html

----

访问 http://192.168.8.130:8081/index.php

输出：

PHP Version 7.2.26-1+ubuntu18.04.1+deb.sury.org+1

### 修改配置

如果修改了docker-compose.yml的配置，那需要3步才能生效

```
#在docker-compose.yml当前目录下

sudo docker-compose stop
sudo docker-compose rm
sudo docker-compose up
```


如果没有生效，建议在up之前重启docker服务


参考：

https://www.awaimai.com/2120.html

https://segmentfault.com/a/1190000020541448

https://www.cnblogs.com/jso0/p/10956781.html