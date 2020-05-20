<!-- TOC -->

- [1. 代码方式](#1-代码方式)

<!-- /TOC -->

开发WordPress主题或者插件时可能需要查看当前页面执行了哪些SQL语句，有两种方法可以实现


### 1. 代码方式

第一步，打开wp-config.php，添加

```php
define('SAVEQUERIES', true);

```

开启**SAVEQUERIES** 会使WordPress将当前页面执行的sql查询保存到一个数组中，数组保存了每条查询的语句、调用该查询的函数以及执行时间。只要打印这个数组就能了解当前页面所有的sql查询了，所以…

第二步，打印数组，将下面的代码放到footer.php \<\/body\>前面
```
<?php  
if (current\_user\_can('administrator')){  
 global $wpdb;  
 echo "<pre>";  
 print\_r($wpdb->queries);  
 echo "</pre>";  
}  
?>  
```

具体可以参考这里，最好到下面的地址拷贝代码

[http://codex.wordpress.org/Editing\_wp-config.php#Save\_queries\_for\_analysis](http://codex.wordpress.org/Editing_wp-config.php#Save_queries_for_analysis)

为了安全起见，这段代码限定只有管理员才能看见


----

markdown @tsingchan 

