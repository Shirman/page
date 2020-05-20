

这个问题分为两种情况：

1. 你迁移后不改域名
2. 你迁移后改为新的域名

如果是前者，操作比较简单，具体操作步骤如下

1. 使用 MySQL 数据管理工具导出数据，比如 phpMyAdmin ，或者可以执行命令来导出数据库数据 `mysqldump -u<userName> -p <dbName> >> <fileName>.sql`。替换其中的`<userName>`等信息为你自己的。比如`mysqldump -uroot -p wordpress >> wordpress.sql`。
2. 将网站文件打包生成压缩包。如果你的网站文件已经上传在了别人虚拟主机，你可以通过 FTP 将文件下载下来，保存到本地。
3. 在新的虚拟主机中，使用数据库管理工具导入刚刚生成的 SQL 数据文件。
4. 将文件通过 FTP 上传到新的虚拟主机。并按照下方截图，修改 `wp-config.php` 文件中的对应配置为你的新的虚拟主机配置。具体的修改你可以参考：![](https://postimg.aliavv.com/2018/j8i35.png)

如果是后者，你需要在搬迁前，先修改网站地址。

1. 参考[如何修改网站地址](http://www.easywpbook.com/#/qa-1?id=%e5%a6%82%e4%bd%95%e4%bf%ae%e6%94%b9%e7%bd%91%e7%ab%99%e5%9c%b0%e5%9d%80)，修改你的网站地址。
2. 使用 MySQL 数据管理工具导出数据，比如 phpMyAdmin ，或者可以执行命令来导出数据库数据 `mysqldump -u<userName> -p <dbName> >> <fileName>.sql`。替换其中的`<userName>`等信息为你自己的。比如`mysqldump -uroot -p wordpress >> wordpress.sql`。
3. 将网站文件打包生成压缩包。如果你的网站文件已经上传在了别人虚拟主机，你可以通过 FTP 将文件下载下来，保存到本地。
4. 在新的虚拟主机中，使用数据库管理工具导入刚刚生成的 SQL 数据文件。
5. 将文件通过 FTP 上传到新的虚拟主机。并按照下方截图，修改 `wp-config.php` 文件中的对应配置为你的新的虚拟主机配置。具体的修改你可以参考：![](https://postimg.aliavv.com/2018/j8i35.png)

<font size=2 color=grey>[阅读原文](https://www.easywpbook.com/qa/20171206.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
