
## TP 3.2

### 模板编译配置

**默认模板编译配置：**

    'TMPL_CACHE_ON'         =>  true,        // 是否开启模板编译缓存,设为false则每次都会重新编译
    'TMPL_CACHE_PREFIX'     =>  '',         // 模板缓存前缀标识，可以动态改变
    'TMPL_CACHE_TIME'       =>  0,         // 模板缓存有效期 0 为永久，(以数字为值，单位:秒)


**访问页面，模板编译缓存生成：**

    [root@localhost Www]# ll
    total 40
    -rw-r--r-- 1 www www 39347 May 23 15:36 69ad4943f8e10e0d3fe3f4a519d81c15.php
    [root@localhost Www]# pwd
    /var/www/html/web-tp/Application/Runtime/Cache/Www

**关闭模板编译缓存：**

    'TMPL_CACHE_ON'         =>  false,        // 是否开启模板编译缓存,设为false则每次都会重新编译

**再次访问相同页面，模板编译缓存文件无变化：**

    [root@localhost Www]# ll
    total 40
    -rw-r--r-- 1 www www 39347 May 23 15:36 69ad4943f8e10e0d3fe3f4a519d81c15.php

> 经过多次测试，不论TMPL_CACHE_ON是否打开，都会有模板编译缓存文件，且修改对应模板文件后，再次访问都会实时更新模板编译缓存文件（除了修改使用include或继承模板的方式的外部文件）

参考：

    /**
    * 系统行为扩展：模板解析
    */
    class ParseTemplateBehavior


    /**
    * ThinkPHP 视图类
    */
    class View


    /**
    * ThinkPHP内置模板引擎类
    * 支持XML标签和普通标签的模板解析
    * 编译型模板引擎 支持动态缓存
    */
    class  Template



## TP 5.0





