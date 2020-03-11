nginx给wordpress反向代理,实现多域名访问wordpress
=====================================================
 

**问题1**：搭建好的worpress服务器用的端口不是80端口，80端口被占用，想转换到80上来。

**问题2**：搭建好的wordpress服务器向用多个域名来指向。

但是简单的修改数据库中的wp\_options中的home和siteurl可不行，而且也不支持多域名。

建议的做法是：

1.首先配置nginx

```

server_name www.xxx.com blog.xxx.com;

location / {
 proxy_pass http:<span class="hljs-comment">//localhost:81/blog/;</span>
 proxy_set_header Host <span class="hljs-variable">$host</span>;
 }

 location /blog/ {
 proxy_pass http:<span class="hljs-comment">//localhost:81/blog/;</span>
 proxy_set_header Host <span class="hljs-variable">$host</span>;
 }
```


2.修改wp-config.php，加入下面

```
define('WP_HOME', 'http://'.$_SERVER['HTTP_HOST'].'/blog');
define('WP_SITEURL', 'http://'.$_SERVER['HTTP_HOST'].'/blog');
```

其中blog为wordpress路径

----

markdown @tsingchan 
