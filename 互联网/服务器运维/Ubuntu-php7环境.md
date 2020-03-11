<!-- TOC -->

- [更新系统软件](#更新系统软件)
- [添加php仓库](#添加php仓库)
- [安装php](#安装php)
- [nginx](#nginx)
- [启动相关服务](#启动相关服务)
- [测试php解析](#测试php解析)
- [mysql服务](#mysql服务)

<!-- /TOC -->

> 基于Ubuntu 16.04

### 更新系统软件

    apt update

    apt upgrade

### 添加php仓库

    apt install -y software-properties-common
    add-apt-repository ppa:ondrej/php


### 安装php
    sudo apt install -y php7.1 php7.1-mysql php7.1-fpm php7.1-curl php7.1-xml php7.1-mcrypt php7.1-json php7.1-gd php7.1-mbstring php7.1-zip php-mongodb php-memcached php-redis

    #修复一个问题

    $ vim /etc/php/7.1/fpm/php.ini
    #cgi.fix_pathinfo=1  //把#去掉, 并且把值从1改为0

### nginx

    sudo apt-get install nginx

尝试配置php转发：

    # vim /etc/nginx/sites-enabled/test   (一般是从/etc/nginx/sites-available/test 软链指向)
    server {
            listen 80;

            server_name www.1998.top;

            root /var/www/html/1998/;
            index index.html index.php;

            location / {
                    if (!-e $request_filename) {
                            rewrite  ^(.*)$  /index.php?s=/$1  last;
                            break;
                    }
            }
            location ~ \.php$ {
                include /etc/nginx/snippets/fastcgi-php.conf;

                # With php7.0-cgi alone:
                #fastcgi_pass 127.0.0.1:9000;
                # With php7.0-fpm:
                fastcgi_pass unix:/run/php/php7.1-fpm.sock;
            }
            location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|mp3)$ {
                    expires      30d;
            }

            location ~ .*\.(js|css)?$ {
                    expires      12h;
            }
    }
    

### 启动相关服务

    #确认服务状态
    service php7.1-fpm status
    service nginx status

    #可以start 也可以 restart
    service php7.1-fpm restart
    service nginx restart

### 测试php解析

/var/www/html/1998/index.php

    <?php
    phpinfo();
    
    ?>

### mysql服务

    $ sudo apt install mysql-server
    $ sudo apt install mysql-client

    $ sudo service mysqld status
    $ sudo service mysqld restart


    $ mysql -uroot -p
    # % 表示不限制客户端，最好配合mysqld的配置中的bind_addr    
    > grant all on *.* to username@'%' identified by 'password'; 
    > flush privileges;


    






