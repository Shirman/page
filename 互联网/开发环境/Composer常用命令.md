


- [镜像应用](#镜像应用)
- [1、搜索包](#1搜索包)
- [2、包的安装](#2包的安装)
- [3、更新包](#3更新包)
- [4、删除包](#4删除包)
- [5、依赖打包](#5依赖打包)
- [6、生成类库映射文件](#6生成类库映射文件)



### 镜像应用

国内在使用composer前，建议更换镜像，详见：
https://pkg.phpcomposer.com

推荐方式：

打开命令行窗口（windows用户）或控制台（Linux、Mac 用户）并执行如下命令：

    composer config -g repo.packagist composer https://packagist.phpcomposer.com


### 1、搜索包

    composer search

例子：搜索一个包含有 qiniu 的包

    composer search qiniu



### 2、包的安装

    composer require
    composer install

例子：安装七牛php-sdk

    composer require qiniu/php-sdk

输出：

    Using version ^7.2 for qiniu/php-sdk./composer.json has been updated
    Loading composer repositories with package information
    Updating dependencies (including require-dev)
    Package operations: 2 installs, 0 updates, 0 removals
    - Installing topthink/think-image (v1.0.7): Downloading (100%)
    - Installing qiniu/php-sdk (v7.2.7): Downloading (100%)
    Writing lock file
    Generating autoload files

>说明：
    安装后会产生两个文件和一个文件夹，如下：
    composer.json 是包的依赖文件；
    composer.lock 是包的版本锁定文件；
    vendor 是包的所在目录；    　　
>   
>对于 require 和 install 是不相同的，**require 会把包的信息添加到 composer.json 文件中并进行 install** 。而 install 是直接从 composer.json 或 composer.lock 文件中提取依赖信息，然后进行安装。

### 3、更新包

    composer update

例子：

到该网址查找一个包 https://packagist.org/

首先安装一个包，命令如下：

    composer require qsnh/think-auth -v 0.2.0


查看composer.json

内容如下：

    {
        "require": {
            "qiniu/qiniu": "dev-master",
            "qsnh/think-auth": "0.2.0"
        }
    }

修改 composer.json 文件将 0.2.0 更新为 0.2.2 ，然后保存执行composer 更新包：

    composer update

> 因为 composer update 的逻辑是按照 composer.json 指定的扩展包版本规则，把所有扩展包更新到最新版本，注意，是 所有扩展包，举个例子，你在项目一开始的时候使用了 monolog，安装的是 monolog 1.1 版本，而一个多月以后的现在，monolog 已经是 1.2 了，运行命令后直接更新到 1.2，这时项目并没有针对 1.2 进行过测试，项目一下子变得很不稳定，情况有时候会比这个更糟糕，尤其是在一个庞大的项目中，你没有对项目写完整覆盖测试的情况，什么东西坏掉了你都不知道。

### 4、删除包

    composer remove xxx/xxxxx

删除刚才添加的包使用的命令是：

    composer remove qsnh/think-auth

这样包就被删除了，查看一下 composer.json 文件，如下：

    {
        "require": {
                "qiniu/qiniu": "dev-master"
        }
    }    

这样包就被删除了。

### 5、依赖打包

如果项目中安装了不止一个包，可能安装了很多个项目依赖的包，需要对项目中的包依赖进行一个打包处理成为一个压缩文件。　　

    composer archive
 

### 6、生成类库映射文件
比如我们经常会修改composer.json中autoload的配置，新增自己编写的类库，或者是覆盖第三方类库：

> autoload的主要两个选项: files 和 psr-4。

    "autoload": {
        "psr-4": {
            "app\\": "application",
            "Test\\" :"test/"
        },
        "files":["extend/html-to-markdown-overwrite/autoload.php"]                
    },

上面的配置意思：新增命名空间Test，及新增自定义extend/html-to-markdown-overwrite/autoload.php

Test命名空间下的类库文件，在composer.json同一目录下建立文件夹test，并编写ClassTest类：

    <?php
    namespace Test;
    class ClassTest{
        public function getName(){
            return "test";
        }
    }
    ?>


自定义autoload.php的文件，覆盖第三方类库（在composer安装的vnedor已经有该命名空间文件）League\HTMLToMarkdown\Converter\ImageConverter：

    <?php
    /**
    * 重写html-to-markdown类文件
    */
    spl_autoload_register(function ($class) {
        $map = [
            'League\HTMLToMarkdown\Converter\ImageConverter' => __DIR__ . '/ImageConverter.php',
        ];

        if (isset($map[$class])) {
            debug_log($class . ' loaded' . PHP_EOL);
            include $map[$class];
            return true;
        }
    // 注意需要设置prepend参数为true
    }, true, true);

文件extend/html-to-markdown-overwrite/ImageConverter.php：

    <?php

    namespace League\HTMLToMarkdown\Converter;

    use League\HTMLToMarkdown\ElementInterface;

    class ImageConverter implements ConverterInterface
    {
        /**
        * @param ElementInterface $element
        *
        * @return string
        */
        public function convert(ElementInterface $element)
        {
            //@todo
        }

        /**
        * @return string[]
        */
        public function getSupportedTags()
        {
            return array('img');
        }
    }


修改了composer.json的autoload配置，只要简单的重新生成autoload自动加载器即可，不需要重新require或update：

    composer dump-autoload
 


----




以上就是总结的一些命令了，关于安装的方法详见：

windows详见：
[windows10安装composer](/开发调试/windows10安装composer.md);

linux详见：
[Ubuntu安装composer](/开发调试/Ubuntu安装composer.md);


----
@tsingchan
