

> 有些时候在某一个项目中, 使用了一个第三方包, 但是会发现某一些地方不符合项目需求. 或者需要在包代码里注入一段自己的逻辑. 我们可以选择自己维护一个分支, 或者干脆改vendor文件夹, 并它他加入代码管理. 但对于要修改少量代码时, 这样做貌似不太'优雅'


### spl_autoload_register

请先查阅函数[spl_autoload_register](http://www.php.net/manual/zh/function.spl-autoload-register.php)文档

### composer autoload自动加载器原理

其实composer也是利用这个函数来实现自动加载的.

php代码执行时, 如果遇到代码里依赖了一个类, 而这个类在当前进程中不存在时, php 会按照加载器队列顺序调用通过spl_autoload_register函数注册过的类加载器. 直到某个加载器执行完后, 这个被依赖的类被加载进当前进程空间, 或者所有加载器都执行完这个类仍不存在, 并抛出类不存在的异常.

### 覆盖composer第三方类库

所以我们也可以利用spl_autoload_register函数, 注册一个加载器, 并使其在队列里位于composer加载器之前. 当php需要加载我们要改动的第三方代码包里的类时, 我们加载自己改好的php文件, 而不是vendor包里的php文件. 这样就达到了覆盖的目的.

### 范例

项目中使用到html-to-markdown类库：

    composer require league/html-to-markdown

但由于其中的图片image的转换处理，其中//协议及懒加载的图片，不能被正确转换，但官方类库又没有更新，我们又急着使用，稍微看了html-to-markdown的源码，我们清楚原理后，需要完善image的转换处理，我们先看下html-to-markdown类库的结构：

查看文件树结构：

```
tree ./src /f /a
```


    vendor\league\html-to-markdown\src
    |   Configuration.php
    |   ConfigurationAwareInterface.php
    |   Element.php
    |   ElementInterface.php
    |   Environment.php
    |   HtmlConverter.php
    |   HtmlConverterInterface.php
    |
    \---Converter
            BlockquoteConverter.php
            CodeConverter.php
            CommentConverter.php
            ConverterInterface.php
            DefaultConverter.php
            DivConverter.php
            EmphasisConverter.php
            HardBreakConverter.php
            HeaderConverter.php
            HorizontalRuleConverter.php
            ImageConverter.php
            LinkConverter.php
            ListBlockConverter.php
            ListItemConverter.php
            ParagraphConverter.php
            PreformattedConverter.php
            TextConverter.php   


从上面代码文件结构，我们知道只需要重写ImageConvert.php类文件即可，在extend扩展目录准备html-to-markdown-overwrite：

    extend\html-to-markdown-overwrite
        autoload.php
        ImageConverter.php
        

注意到里面的autoload.php文件内容：

    <?php
    /**
    * 重写html-to-markdown类文件
    * 在composer.json中配置自定义files，并重新生成：composer dump-autoload    
        "autoload": {
            "psr-4": {
                "app\\": "application"
            },
            "files":["extend/html-to-markdown-overwrite/autoload.php"]                
        },
    */
    spl_autoload_register(function ($class) {
        $map = [
            'League\HTMLToMarkdown\Converter\ImageConverter' => __DIR__ . '/ImageConverter.php',
        ];

        if (isset($map[$class])) {
    //        debug_log($class . ' loaded' . PHP_EOL);
            include $map[$class];
            return true;
        }
    // 注意需要设置prepend参数为true
    }, true, true);

项目composer.php加载该自定义autoload.php 加载器：

    "autoload": {
        "psr-4": {
            "app\\": "application"
        },
        "files":["extend/html-to-markdown-overwrite/autoload.php"]                
    },

> 修改了composer.php的autoload的配置后，我们需要重新生成整个项目最终autoload.php，在项目路径执行命令：

    composer dump-autoload

而我们覆盖的ImageConverter.php 从原类库复制而来，做逻辑上的微调整。

----
@tsingchan 2019