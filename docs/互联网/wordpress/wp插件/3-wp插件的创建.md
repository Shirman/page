3 WP 插件的创建
==================================


- [插件开发目标](#插件开发目标)
- [插件开发过程](#插件开发过程)
    - [给插件起名](#给插件起名)
    - [创建一个插件](#创建一个插件)
        - [1. 创建插件目录](#1-创建插件目录)
        - [2. 创建插件文件，并初始化代码](#2-创建插件文件并初始化代码)
    - [添加插件代码](#添加插件代码)
        - [1. 分析功能](#1-分析功能)
        - [2. 代码实现](#2-代码实现)
        - [3. 启动测试](#3-启动测试)
        - [4. 代码解读](#4-代码解读)
    - [优化插件](#优化插件)
        - [实现初始化方法](#实现初始化方法)
        - [实现后台的管理](#实现后台的管理)
        - [实现停用方法](#实现停用方法)
        - [实现卸载方法](#实现卸载方法)
- [结论](#结论)


  
创建一个插件
------

### 插件开发目标

这节课来尝试创建一个插件，实现在文章尾部输出一段简单的文字。

### 插件开发过程

#### 给插件起名

既然要创建一个插件，那么必然就要给插件起一个名字，在起名时，需要注意以下三点：

（1）插件名唯一：我们的插件名称应该是唯一的，这样才不会在加载时出现错误。同时也可以不用担心上传到 WordPress 官方中浏览出错( WordPress 官方给每个插件有一个单页，单页地址和你的插件名称有关)。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmv5m96yv7j30la0ehq7m.jpg)

（2）插件名可识别：插件名称应该尽可能的可读，通过简单的读插件的名称，就能知道大体上这个插件的功能。

（3）如果名字已经重复了，可以使用前缀来区分，比如 *gitchat\_*  来区分插件和其他人的插件。

#### 创建一个插件

##### 1. 创建插件目录

打开开发环境中的 WordPress，进入*wp-content/plugins*  目录，创建一个新的目录 *gitchat\_copyright*  目录。

> 为了避免冲突，使用 *gitchat\_*  作为插件前缀。

##### 2. 创建插件文件，并初始化代码

进入 *copyright*  目录，创建一个文件 *gitchat\_copyright.php* ，并在其中添加如下代码。

> 这里创建的 *gitchat\_copyright.php*  是插件的入口文件。有了入口文件，WordPress 才能识别出插件和对应的功能。
> 
> **如果是 Windows 系统，保存时请确保以 UTF-8 编码保存代码。**

```
<span class="hljs-meta"><?php</span>
<span class="hljs-comment">/*
Plugin Name: Copyright
Plugin URI: https://gitchat.cn/plugins
Description: 这是一个 copyright 插件，能够在文章尾部添加内容。
Version: 1.0
Author: Gitchat
Author URI: https://gitchat.cn/
*/</span>

```

保存后退出。

这段代码，是 WordPress 标准的插件信息头，通过这段代码，WordPress 就可以自动识别出我们的插件具体信息。具体的说明，可以在 [这里](https://codex.wordpress.org/zh-cn:%E5%BC%80%E5%8F%91%E4%B8%80%E4%B8%AA%E6%8F%92%E4%BB%B6#.E5.90.8D.E5.AD.97.EF.BC.8C.E6.96.87.E4.BB.B6.E5.92.8C.E4.BD.8D.E7.BD.AE) 找到相关信息。

这时，回到 WordPress 后台，可以在插件列表中看到这样的界面。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmum6kndtwj312s04k74c.jpg)

这就是我们创建的插件。WordPress 会自动读取我们在注释中填写的内容，加载为插件的详细信息，可以把这段信息改为你自己的对应信息。

#### 添加插件代码

##### 1. 分析功能

我们希望实现的功能是在文章的尾部加入一些内容，则需要对 `the_conent` 函数进行修改，实现在内容后输出特定的内容。

##### 2. 代码实现

在原有代码后加入如下代码，来实现具体的功能：

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyright_end</span><span class="hljs-params">($content)</span></span>{
    <span class="hljs-keyword">if</span>(is_single()){
       $content .= <span class="hljs-string">'<hr><p>这是一个来自 GitChat 达人课的插件</p><hr>'</span>;
       <span class="hljs-keyword">return</span> $content;
    }
 }
 add_filter( <span class="hljs-string">"the_content"</span>, <span class="hljs-string">"copyright_end"</span> );

```

添加后，代码如下：

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmv3z9mjvuj310e0jywfb.jpg)

保存文件并退出。

##### 3. 启动测试

回到 WordPress 的后台，进入「插件」— 「已安装的插件」，找到刚刚创建的「Copyright」插件，并启用。

启用成功后，回到首页，找一篇文章，点击进去，可以看到如图的样式。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmv3v8i9f9j30fi0bg0sr.jpg)

这说明我们的插件功能已经实现了。

##### 4. 代码解读

在这段代码中定义了 *copyright\_end*  函数，来实现对输出内容的修改。

同时，我在下方调用 *the\_content*  过滤器，实现对内容的修改嵌入。

这里特别需要注意的是，在函数中调用了`is_single`函数，该函数是用来判断当前页面是否是文章页面。

如果注销这个 if 判断条件，那么在首页可能也会看到这个输出的结果。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmv45pv4cpj30qt0avmxb.jpg)

#### 优化插件

目前我们的插件并不好用，因为输出的内容是在代码中写死的，对于开发者来说，无伤大雅，但插件的使用者不可能只是开发者，所以需要对插件进行优化，让输出的内容可以在后台进行修改。

##### 实现初始化方法

既然要允许在后台修改我们要输出的内容，那么就需要将用户设置的输出内容进行设置，允许用户输出内容。最简单的，就是将数据存储在 WordPress 的设置表，和站点设置放在一起。

这就需要我们在插件启用时，对这个数据进行初始化。这里用到了 WordPress 提供的 *register\_activation\_hook* 。

> 如果你放在普通过程中，会发现你的设置内容会被不停的初始化。

在插件中添加如下代码：

```
<span class="hljs-comment">/**
 * 初始化设置项
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gitchat_copyright_activate</span><span class="hljs-params">()</span> </span>{
    add_option(<span class="hljs-string">'gitchat_copyright_code'</span>,<span class="hljs-string">'<hr><p>这是一个来自 GitChat 达人课的插件</p><hr>'</span>);
}
register_activation_hook( <span class="hljs-keyword">__FILE__</span>, <span class="hljs-string">'gitchat_copyright_activate'</span> );

```

添加后的代码如下：

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmv7yd9y18j31800xs0ue.jpg)

保存插件，回到后台停用插件，并重新启用。

重新启用成功后，就可以在数据库中找到对应的选项，比如我们查询一下看一下。

```
<span class="hljs-keyword">select</span> * <span class="hljs-keyword">from</span> wp_options <span class="hljs-keyword">where</span> option_name = <span class="hljs-string">'gitchat_copyright_code'</span>

```

> **如何执行上述操作？**
> 
> 如果你是 macOS 操作系统，可以下载 Sequel Pro。使用 Sequel Pro 链接到数据库，并进行管理。
> 
> 如果你是 Windows 操作系统，可以使用 phpStudy 自带的 phpMyAdmin 来进行管理，访问 <http://localhost/phpmyadmin> 即可。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmv7v2t5gmj310i0dqwep.jpg)

现在我们内容已经放在数据库了。接下来设置内容的输出，让输出使用数据库中的值，而不是写死在代码中。

将第24行的：

```
$content .= <span class="hljs-string">'<hr><p>这是一个来自 GitChat 达人课的插件</p><hr>'</span>;

```

改为：

```
 $content .= get_option(<span class="hljs-string">'gitchat_copyright_code'</span>);

```

保存文件。回到网站首页，打开一个文章页，可以看到刚刚设置的效果依然还在。

接下来修改一下数据库中的值，来测试一下输出的是否是我们存放在数据中的内容。

在数据库中执行如下代码：

```
<span class="hljs-keyword">update</span> wp_options <span class="hljs-keyword">set</span> option_value = <span class="hljs-string">"<hr><p>现在输出的是数据库中的内容了</p><hr>"</span> <span class="hljs-keyword">where</span> option_name = <span class="hljs-string">'gitchat_copyright_code'</span>

```

刷新刚刚的文章页面，可以看到输出的内容已经发生了改变。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmv86picdvj30g30bgt8q.jpg)

##### 实现后台的管理

虽然现在实现了参数的数据库存储，但是目前的方式依然非常不方便，需要在数据库管理工具的帮助下才能设置输出内容，极为不方便。

接下来把这一项放在系统后台的设置项目中。

在插件中添加如下代码：

```
<span class="hljs-comment">/**
 * 菜单项注册
 */</span>
$new_general_setting = <span class="hljs-keyword">new</span> new_general_setting();
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">new_general_setting</span> </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">new_general_setting</span><span class="hljs-params">( )</span> </span>{
    add_filter( <span class="hljs-string">'admin_init'</span> , <span class="hljs-keyword">array</span>( &$this , <span class="hljs-string">'register_fields'</span> ) );
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">register_fields</span><span class="hljs-params">()</span> </span>{
    register_setting( <span class="hljs-string">'general'</span>, <span class="hljs-string">'gitchat_copyright_code'</span>);
    add_settings_field(<span class="hljs-string">'fav_color'</span>, <span class="hljs-string">'<label for="gitchat_copyright_code">Copyright 代码</label>'</span> , <span class="hljs-keyword">array</span>(&$this, <span class="hljs-string">'fields_html'</span>) , <span class="hljs-string">'general'</span> );
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fields_html</span><span class="hljs-params">()</span> </span>{
    $value = get_option( <span class="hljs-string">'gitchat_copyright_code'</span>, <span class="hljs-string">''</span> );
    <span class="hljs-keyword">echo</span> <span class="hljs-string">'<textarea name="gitchat_copyright_code" id="gitchat_copyright_code" cols="30" rows="10">'</span>. $value. <span class="hljs-string">'</textarea>'</span>;
  }
}

```

添加后的代码如下：

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmv9qci3jnj31a010a0uy.jpg)

> 这段代码构建了一个新的类，在类中通过 `register_fields` 方法来注入新的设置项，并通过 `fields_html` 设置了输入框的类型。

回到 WordPress 停用插件并重新启用插件。进入「设置」-「常规」：

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmv9rb5lajj308w05a0sk.jpg)

拉到底部，可以看到这样一项：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmv9rynu33j30er0anglj.jpg)

这时可以修改输入框里的代码并保存。回到文章页后刷新，会发现你的 copyright 代码已经更新了。

这样就实现了在后台的管理。

##### 实现停用方法

有些时候可能需要记录用户对插件的停用，比如当用户停用了插件后，向服务端发送情况，停掉某些特定服务等等。

这部分，可以使用 WordPress 的 `register_deactivation_hook` 来实现。

这个函数的使用方法和刚刚提到的 `register_activation_hook` 差不多，不再举例说明这里给出一个示例代码，大家根据自己的需要进行设置。

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gitchat_copyright_deactivate</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 具体的停用插件的逻辑</span>
}
register_deactivation_hook( <span class="hljs-keyword">__FILE__</span>, <span class="hljs-string">'gitchat_copyright_deactivate'</span> );

```

##### 实现卸载方法

我们在启用插件时，在数据库中加入了一些字段，当卸载这个插件时，最好将添加的数据库字段删除，不然的话，长期以往会导致我们的数据库中存在大量无用的字段。

在插件目录下创建一个 *uninstall.php* ，在其中加入如下代码：

```
<span class="hljs-meta"><?php</span>
<span class="hljs-comment">// part 1</span>
<span class="hljs-keyword">if</span>(!defined(<span class="hljs-string">"WP_UNINSTALL_PLUGIN"</span>))
    <span class="hljs-keyword">exit</span>();
<span class="hljs-comment">// part 2</span>
delete_option(<span class="hljs-string">"gitchat_copyright_code"</span>);

```

上述这段代码可以分为两个部分，第一部分是 WordPress 的卸载插件检测，在卸载时，会设置`WP_UNINSTALL_PLUGIN`。如果检测不到，就退出，以确保这个程序是被合理的调用，而不是会是被直接访问而调用，导致我们的设置丢失。

第二部分则是从数据库中删除这个数据项。以达到删除无用字段的目的。当然，如果你的插件十分复杂，也可以在这里写具体的卸载逻辑。

### 结论

至此，我们创建了一个非常简单的插件，这个插件只需要寥寥数行代码，就可以实现在整站的所有内容的尾部加入一段版权代码。

[单击这里下载本课插件](http://www.easywpbook.com/course-resources/15_gitchat_copyright.zip)。

<font size=2 color=grey>[阅读原文](https://www.easywpbook.com/plugin/create.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
