
<!-- TOC -->

- [1、先生成一个key（密钥）](#1先生成一个key密钥)
- [2、根据上面的key生成证书请求文件](#2根据上面的key生成证书请求文件)
- [3、使用rsa加密](#3使用rsa加密)
- [4、根据以上key文件及证书请求文件生成crt证书文件](#4根据以上key文件及证书请求文件生成crt证书文件)
- [5、如果需要pfx可以使用以下命令生成( 一般不需要)](#5如果需要pfx可以使用以下命令生成-一般不需要)
- [6、nginx配置](#6nginx配置)
- [7、apache配置](#7apache配置)
- [8、本地浏览器导入自颁发证书](#8本地浏览器导入自颁发证书)

<!-- /TOC -->

> 部署个简单https，做点笔记

这里不赘述为什么要使用https，https和http的区别，

证书验证原理，大家先自行了解

这里只介绍在linux（以ubuntu为例）下自己颁发证书，并在配置到nginx上



#### 1、先生成一个key（密钥）

会要求输入密码(设置简单点，后面步骤我们再把密码省去)

    sudo openssl genrsa -des3 -out ssl.key 2048

#### 2、根据上面的key生成证书请求文件

(Certificate Signing Request)        

    sudo openssl req -new -key ssl.key -out ssl.csr
    
会要求输入国家、省份、市区、email、组织结构、公司名及主机域名

这里要注意主机域名必须是你nginx配置的server_name(不能是泛域名，必须是子域名)，否则浏览器访问的时候，会认为证书不是为访问的域名颁发

#### 3、使用rsa加密

目的是在使用ssl.key的时候不需要再输入密码

    sudo cp ssl.key ssl.key.bak
    sudo openssl rsa -in ssl.key -out ssl.key

#### 4、根据以上key文件及证书请求文件生成crt证书文件

    sudo openssl x509 -req -days 365 -in ssl.csr -signkey ssl.key -out ssl.crt

#### 5、如果需要pfx可以使用以下命令生成( 一般不需要)

    sudo openssl pkcs12 -export -inkey ssl.key -in ssl.crt -out ssl.pfx

#### 6、nginx配置

    server {
    listen   443;
    server_name  xxx.xxx.xxx;

    #启用SSL模块
    ssl on;
    #证书文件放置路径
    ssl_certificate /etc/ssl/nginx/ssl.crt;
    #私钥文件放置路径
    ssl_certificate_key /etc/ssl/nginx/ssl.key;

    root /xxxx/xxxx/;

    location / {
            index index.php index.html;
    }
    location ~ .*\.php$ {
            include /etc/nginx/fastcgi_params;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
    }

    }

#### 7、apache配置
    
除了openssl要安装外，还需要apache模块mod_ssl：

除了编译apache时加配置

    --enable-ssl

还可以在centos下

    yum install mod_ssl -y

如果不是手动安装mod_ssl，则需要在httpd.conf配置中追加：

    LoadModule ssl_module modules/mod_ssl.so

增加一个vhost配置：

    Listen 443
    NameVirtualHost *:443
    <VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /www/wdlinux/httpd-2.2.24/conf/ssl.crt
    SSLCertificateKeyFile /www/wdlinux/httpd-2.2.24/conf/ssl.key
    ServerName k.xxx.com
    DocumentRoot /var/www/html/xxx
    ErrorLog "logs/s_error_log"
    CustomLog "logs/s_access_log" common
    <Directory /var/www/html/xxx>
    AllowOverride All
    </Directory>
    </VirtualHost>

如果访问https的时候报了ssl 的session问题，可以在httpd.conf配置文件中追加如下：

    <IfModule ssl_module>
    SSLRandomSeed startup builtin
    SSLRandomSeed connect builtin
    SSLSessionCache "shmcb:/www/wdlinux/httpd-2.2.24/logs/ssl_scache(512000)"
    SSLSessionCacheTimeout 300
    </IfModule>

#### 8、本地浏览器导入自颁发证书

一般浏览器自己携带了一些通常使用的国际公认的根证书，我们自己颁发的证书需要自己手动加入受信任根证书

IE浏览器：

    直接打开访问 https://yourhost/  会提示不信任证书、不安全之类的提示，点击页面上继续访问的链接，幸运的话在url地址右侧会有红色的证书提示，点击并查看证书，查看页面可以直接点击安装证书，将证书安装到受信任证书，重启浏览器再次访问即可
    
谷歌浏览器：

    在设置页面，点击高级设置-》HTTPS/SSL-》管理证书 -》受信任的根证书颁发机构-》将crt证书文件导入即可
        
其他浏览器自行google或度娘

以上就完成了自颁发证书及配置https服务的过程，如果需要国际认可证书，可查询verisign，目前最大的靠谱的

----
@tsingchan 注








