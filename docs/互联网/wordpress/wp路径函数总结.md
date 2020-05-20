<!-- TOC -->

- [站点路径相关函数](#站点路径相关函数)
- [主题路径相关函数](#主题路径相关函数)
- [路径相关常量](#路径相关常量)


<!-- /TOC -->
与WordPress打交道，经常遇到的一个问题就是获取路径，包括URL路径和服务器路径，在主题或插件中引用js或css文件需要URL地址，而include一些文件时则需要服务器路径。在WordPress中，不能认定wp-content目录一定位于/wp-content下，也不能认为admin的地址一定是/wp-admin，为了避免错误，了解WordPress中与获取路径相关的函数很重要。


以下均假设WordPress站点安装在https://www.jm.com下

### 站点路径相关函数

#### home\_url() [>>](http://codex.wordpress.org/Function_Reference/home_url "Codex")

返回站点路径，相当于后台**设置->常规** 中的"**站点地址（URL）** "。

```
$url = home_url();
echo $url;

//输出: https://www.jm.com

```
```
$url = home_url('/images/');
echo $url;

输出：https://www.jm.com/images/

```
#### site\_url() [>>](http://codex.wordpress.org/Function_Reference/site_url)

如果WordPress安装在域名根目录下，则该函数与home\_url()相同。

如果WordPress安装在子目录下，例如https://www.jm.com/wordpress，则site\_url()返回WordPress实际安装地址，相当于**后台->设置->常规** 中的“**WordPress 地址（URL）** ”。

```
<pre class="brush:java;">$url = site_url();
echo $url;

//假设WordPress安装在https://www.jm.com/wordpress下
//输出：https://www.jm.com/wordpress

```
#### admin\_url() [>>](http://codex.wordpress.org/Function_Reference/admin_url)

返回后台地址，传递参数后也可返回后台menu的地址

```
$url = admin_url();
echo $url;

//输出：https://www.jm.com/wp-admin/

```
#### content\_url() [>>](http://codex.wordpress.org/Function_Reference/content_url)

返回实际的wp-content目录，如果是默认安装，且装在根目录下，则如下所示

```
<pre class="brush:java;">$url = content_url();
echo $url;

//输出：https://www.jm.com/wp-content

```
如果在wp-config.php中改变了wp-content目录的位置，则该函数会返回正确地址，例如wp-config.php中如下定义

```
<pre class="brush:java;">define('WP_CONTENT_DIR', '/home/user/public_html/cdn');
define('WP_CONTENT_URL', 'http://sola-cdn.me');

```
则content\_url()的返回值为

```
<pre class="brush:plain;">http://sola-cdn.me

```
#### includes\_url() [>>](http://codex.wordpress.org/Function_Reference/includes_url)

返回当前WordPress站点存放核心文件的目录wp-includes的地址，可以带一个$path作为参数。

```
$url = includes_url( '/js/');
echo $url;

//输出：https://www.jm.com/wp-includes/js/

```
#### wp\_upload\_dir() [>>](http://codex.wordpress.org/Function_Reference/wp_upload_dir)

返回WordPress上传目录的地址，是一个数组，包含一系列与上传地址相关的信息。

```
<?php $upload_dir = wp_upload_dir(); ?>

```
提供如下信息给你

```
* 'path' - 上传目录的服务器绝对路径，通常以反斜杠（/）开头
* 'url' - 上传目录的完整URL
* 'subdir' - 子目录名称，通常是以年/月形式组织的目录地址，例如/2012/07
* 'basedir' - 上传目录的服务器绝对路径，不包含子目录
* 'baseurl' - 上传目录的完整URL，不包含子目录
* 'error' - 报错信息.

```
例如

```
$upload_dir = wp_upload_dir();
echo $upload_dir['baseurl'];

//输出：https://www.jm.com/wp-content/uploads

```
### 主题路径相关函数

#### get\_theme\_root\_uri() [>>](http://codex.wordpress.org/Function_Reference/get_theme_root_uri)

获取存放主题的目录URI

```
<pre class="brush:java;">echo get_theme_root_uri();

//输出：https://www.jm.com/wp-content/themes

```
#### get\_theme\_root() [>>](http://codex.wordpress.org/Function_Reference/get_theme_root)

获取存放主题的目录的服务器绝对路径

```
<pre class="brush:java;">echo get_theme_root();

//输出：<tt>/home/user/public_html/wp-content/themes</tt>

```
#### get\_theme\_roots() [>>](http://codex.wordpress.org/Function_Reference/get_theme_roots)

获取主题目录的目录名称，如果你的主题目录是/wp-content/themes，则

```
echo get_theme_roots();

//输出：/themes

```
#### get\_stylesheet\_directory() [>>](http://codex.wordpress.org/Function_Reference/get_stylesheet_directory)

获取当前启用的主题目录的服务器绝对路径，例如

```
/home/user/public_html/wp-content/themes/twentyeleven

```
可以用来include文件，例如

```
<?php include( get_stylesheet_directory() . '/includes/myfile.php'); ?>

```
#### get\_stylesheet\_directory\_uri() [>>](http://codex.wordpress.org/Function_Reference/get_stylesheet_directory_uri)

获取当前启用的主题目录的URI，例如

```
echo get_stylesheet_directory_uri();

//输出：https://www.jm.com/wp-content/themes/twentyeleven

```
可以使用在需要主题目录URI的场合，例如图片

```
<pre class="brush:java;"><img src="<?php echo get_stylesheet_directory_uri() ?>/images/aternus.png" alt="" title="" width="" height="" />

```
#### get\_template\_directory\_uri() [>>](http://codex.wordpress.org/Function_Reference/get_template_directory_uri)

如果当前启用的主题是一个child theme，该函数返回parent theme的主题目录URI，用法与get\_stylesheet\_directory\_uri()类似。

#### get\_template\_directory() [>>](http://codex.wordpress.org/Function_Reference/get_template_directory)

如果当前启用的主题是一个child theme，该函数返回parent theme的主题目录的服务器绝对路径，用法与get\_stylesheet\_directory()类似。

#### get\_template() [>>](http://codex.wordpress.org/Function_Reference/get_template)

获取当前启用主题的主题目录名称，例如现在启用的主题为twentyeleven，则

```
echo get_stylesheet();

//输出：twentyeleven

```
#### get\_stylesheet() [>>](http://codex.wordpress.org/Function_Reference/get_stylesheet)

获取当前启用主题的主题目录名称，与get\_template()的区别是，如果用了child theme，则返回child theme的目录名称。

### 插件路径相关函数

#### plugins\_url() [>>](http://codex.wordpress.org/Function_Reference/plugins_url)

获取当前插件的目录的URI，例如一个插件位于/wp-content/plugins/myplugin下，该目录下放有插件的主文件名为myplugin.php，在myplugin.php中执行下面的代码，结果如下

```
echo plugins_url();

//输出：https://www.jm.com/wp-content/plugins

```
```
echo plugins_url('',__FILE__);

//输出：https://www.jm.com/wp-content/plugins/myplugin

```
```
echo plugins_url('js/myscript.js',__FILE__);

//输出：https://www.jm.com/wp-content/plugins/myplugin/js/myscript.js

```
#### plugin\_dir\_url() [>>](http://codex.wordpress.org/Function_Reference/plugin_dir_url)

返回当前插件的目录URI，例如

```
echo plugin_dir_url( __FILE__ );

//输出：https://www.jm.com/wp-content/plugins/myplugin/

```
注意结尾有反斜杠。

#### plugin\_dir\_path() [>>](http://codex.wordpress.org/Function_Reference/plugin_dir_path)

返回当前插件目录的服务器绝对路径，例如

```
echo plugin_dir_path( __FILE__ );

//输出：/home/user/public_html/wp-content/plugins/myplugin/

```
可以用来引用文件，例如

```
<?php
define( 'MYPLUGINNAME_PATH', plugin_dir_path(__FILE__) );
require MYPLUGINNAME_PATH . 'includes/class-metabox.php';
require MYPLUGINNAME_PATH . 'includes/class-widget.php';
?>

```
#### plugin\_basename() [>>](http://codex.wordpress.org/Function_Reference/plugin_basename)

返回调用该函数的插件文件名称（包含插件路径）

例如在插件myplugin下的myplugin.php文件中调用该函数，结果如下

```
echo plugin_basename(__FILE__);

//输出：myplugin/myplugin.php

```
如果在myplugin/include/test.php文件中调用（test.php通过include引用到myplugin.php中），结果如下

```
echo plugin_basename(__FILE__);

//输出：myplugin/include/test.php

```
### 路径相关常量

WordPress中还有一组用define定义的常量代表路径。

#### WP\_CONTENT\_DIR

wp-content目录的服务器绝对路径，例如

```
<pre class="brush:plain;">/home/user/public_html/wp-content

```
#### WP\_CONTENT\_URL

wp-content目录的URI地址，例如

```
<pre class="brush:plain;">https://www.jm.com/wp-content

```
#### WP\_PLUGIN\_DIR

插件目录的服务器绝对路径，例如

```
<pre class="brush:plain;">/home/user/public_html/wp-content/plugins

```
#### WP\_PLUGIN\_URL

插件目录的URI地址，例如

```
<pre class="brush:plain;">https://www.jm.com/wp-content/plugins

```
#### TEMPLATEPATH

当前启用主题目录的服务器绝对路径，相当于get\_template\_directory()例如

```
<pre class="brush:plain;">/home/user/public_html/wp-content/themes/twentyeleven

```
#### STYLESHEETPATH

当前启用主题目录的服务器绝对路径，相当于get\_stylesheet\_directory()，与TEMPLATEPATH的区别在于如果使用child theme，该常量指向child theme目录。



----

markdown @tsingchan 

