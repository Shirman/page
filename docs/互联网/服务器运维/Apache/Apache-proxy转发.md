

> 将请求转发给其他域名处理

```
<VirtualHost *:80>
ServerName 123.com
ServerAlias *.123.com
DocumentRoot /var/www/html/123
DirectoryIndex index.html index.htm index.php
<Directory /var/www/html/123>
    Options FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
</Directory>
<Proxy *>
Order deny,allow
Allow from all
</Proxy>
ProxyPass /cms http://cms.456.com/
ProxyPassReverse /cms http://cms.456.com/
</VirtualHost>
```

说明：

http://www.123.com/cms/Test/test

服务器将会把请求转发给

http://cms.456.com/Test/test
