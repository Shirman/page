

- [https配置](#https配置)
- [访问日志显示更多内容](#访问日志显示更多内容)
- [反向代理配置](#反向代理配置)
- [负载均衡配置](#负载均衡配置)
- [资源文件下载目录列表](#资源文件下载目录列表)
- [资源下载rewrite](#资源下载rewrite)



### https配置

    server {
            listen   443;
            server_name  ssl.9999.com;

            #启用SSL模块
            ssl on;
            #证书文件放置路径
            ssl_certificate /etc/ssl/nginx/ssl.crt;
            #私钥文件放置路径
            ssl_certificate_key /etc/ssl/nginx/ssl.key;

            root /var/www/html/ssl/;
            access_log      /data/logs/nginx/ssl.access.log;
            error_log       /data/logs/nginx/ssl.error.log;

            location / {
                    index index.php index.html;
            }
            location ~ .*\.php$ {
                    include /etc/nginx/fastcgi_params;
                    fastcgi_pass 127.0.0.1:9000;
                    fastcgi_index index.php;
            }

    }


### 访问日志显示更多内容

首先在 /etc/nginx/nginx.conf 下 http 配置段 添加新的日志格式定义

    ##
    # Logging format
    # 日志格式定义
    # 如下: access 为格式定义的名称
    ##
    log_format access '$remote_addr - $remote_user [$time_local] "$request - $request_body" '
        '$status $body_bytes_sent "$request_time" "$upstream_response_time" "$http_referer" '
        '"$http_user_agent" $http_x_forwarded_for';


变量说明: 

		$remote_addr				客户端的ip地址
		$remote_user				用来记录客户端用户名称
		$time_local					在日志中写入服务器本地的时间
		$request 					用来记录请求的url与http协议
		$request_body				POST数据
		$status						响应的状态代码
		$body_bytes_sent			传递到客户端的字节数减去响应头的后的大小
		$request_time				请求时间，这个时间是指Nginx在这个请求上花费的时间，单位为精确到毫秒的秒
		$upstream_response_time		从Nginx向后端（php-cgi)建立连接开始到接受完数据然后关闭连接为止的时间
		$http_referer				用来记录从那个页面链接访问过来的
		$http_user_agent			记录客户端浏览器的相关信息
		$http_x_forwarded_for		客户端的ip地址

然后在虚拟主机配置段里面记录日志的地方用如下格式配置日志记录方法:
	access_log  /path/to/access.log access;


参考资料: 

nginx优化之request_time和upstream_response_time差别 http://wuzhangshu927.blog.163.com/blog/static/114224687201310674652147/

nginx日志增加响应时间  http://jamesbond0479.blog.163.com/blog/static/2414758201261710241605/

nginx日志记录post的参数 http://www.nginx.cn/2173.html


### 反向代理配置


访问http://localhost:9528/v/test.php 会被代理到http://pay.9000.com/v/test.php


    server {
        listen 9528;
        #server_name localhost;

        root html;
        index index.php index.html;

        access_log  /data/logs/nginx/9528_proxy_pass.access.log;
        error_log  /data/logs/nginx/9528_proxy_pass.error.log;

        location / {
            proxy_pass http://pay.9000.com;
        }
    }


### 负载均衡配置

    user  www www;
    worker_processes  4;

    #error_log  logs/error.log;
    #error_log  logs/error.log  notice;
    #error_log  logs/error.log  info;

    pid        logs/nginx.pid;


    events {
        worker_connections  1024;
    }

    http {
        include       mime.types;
        default_type  application/octet-stream;

        #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        #                  '$status $body_bytes_sent "$http_referer" '
        #                  '"$http_user_agent" "$http_x_forwarded_for"';

        #access_log  logs/access.log  main;

        sendfile        on;
        #tcp_nopush     on;

        #keepalive_timeout  0;
        keepalive_timeout  65;
        client_max_body_size 20m;

        #gzip  on;

        upstream  pay.9000  {
                server   10.10.10.78:80;
        }
        upstream  oauth.9000  {
                server   10.10.10.78:80;
        }
        upstream  inner.9000  {
                server   10.10.10.78:80;
        }
        upstream  sys.9000  {
                server   10.10.10.78:80;
        }
        upstream  dev.9000  {
                server   10.10.10.78:80;
        }

    server {
        listen       80;
        server_name pay.9000.com;
        access_log  /data/logs/nginx/pay.9000.com.access.log;

        location /{
                proxy_pass        http://pay.9000;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }
    server {
        listen       80;
        server_name oauth.9000.com;
        access_log  /data/logs/nginx/oauth.9000.com.access.log;

        location /{
                proxy_pass        http://oauth.9000;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }

    server {
        listen       80;
        server_name inner.9000.com;
        access_log  /data/logs/nginx/inner.9000.com.access.log;

        location /{
                proxy_pass        http://inner.9000;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }

    server {
        listen       80;
        server_name sys.9000.com;
        access_log  /data/logs/nginx/sys.9000.com.access.log;

        location /{
                proxy_pass        http://sys.9000;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }
    server {
        listen       80;
        server_name dev.9000.com;
        access_log  /data/logs/nginx/dev.9000.com.access.log;

        location /{
                proxy_pass        http://dev.9000;
                proxy_set_header   Host             $host;
                proxy_set_header   X-Real-IP        $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }

    }


==============
以上配置解释，增加upstream：

    pay.9000
    oauth.9000
    inner.9000
    sys.9000
    dev.9000


在相应的sever中设置proxy_pass到相应的upstream



### 资源文件下载目录列表

    location /download/ {
            auth_basic "9000";
            auth_basic_user_file /data/9000/pass_file;
            charset utf-8;
            autoindex on;
            autoindex_exact_size off;
            autoindex_localtime on;
            #add_header Content-Disposition "attachment;";
            alias /data/9000/www/;
    }


另外再生成：

    sudo htpasswd -c -d /data/9000/pass_file  9000

### 资源下载rewrite


场景1、http://domain/download/xxx.png 下载该png文件

该png文件在服务器/data/heredownload/目录

1、以附件下载的形式

    location /download/ {
        add_header Content-Disposition "attachment;";
        alias /data/heredownload/;
    }

场景2、http://domain/download/xxx.png 在页面直接显示该png图片

该png文件在服务器/data/heredownload/目录

2、直接打开资源文件或显示图片

    location /download/ {
        alias /data/anysdk_download/;
    }


@continue
----
