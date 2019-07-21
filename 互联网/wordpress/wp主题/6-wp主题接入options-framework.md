6 WP 主题开发：接入 Options Framework
======================================================

- [接入 Options Framework 的优势](#接入-options-framework-的优势)
- [在 GitChat 主题中接入 Options Framework](#在-gitchat-主题中接入-options-framework)
- [添加设置项](#添加设置项)
- [在主题中调用函数获取设置项](#在主题中调用函数获取设置项)
- [修改获取参数的函数](#修改获取参数的函数)
- [如何修改菜单中的 Theme Options](#如何修改菜单中的-theme-options)
- [其他优秀的面板](#其他优秀的面板)
- [OptionTree](#optiontree)
    - [Unyson Framework](#unyson-framework)
    - [Redux Framework](#redux-framework)
    - [Titan Framework](#titan-framework)
- [总结](#总结)

  
接入 Options Framework
--------------------

终于在这节课要开始为主题制作一个管理后台了。

可能中间你一直奇怪，为什么我没有讲为主题制作一个管理后台，毕竟一个高度自定义化的主题，是一定会需要很多设置项的，如果不将其做在后台的管理菜单中，就需要通过修改代码来实现自定义，显然这并不符合我们的主题的定位，通过修改代码实现自定义的形式仅适合开发者们。

如今，我们要尝试使用 Options Framework 来在我们的主题内集成主题设置。

### 接入 Options Framework 的优势

接入 Options Framework 可以让我们以更简单的形式来实现主题的选项，让我们把更多的精力放在主题的本身，而不是研究如何过滤用户输入的数据，这些内容 Options Framework 都会在后台帮我们做好，只需要设计具体的设置项目即可。

### 在 GitChat 主题中接入 Options Framework

首先，我们需要下载 Options Framework，开发者将其开源在 [Github](https://github.com/devinsays/options-framework-theme)，可以在这里直接下载到最新的代码。

> 下载地址请[单击这里](https://github.com/devinsays/options-framework-theme/archive/master.zip)。

下载后，将这个压缩包解压，可以看到里面有很多文件，不过大部分都是用不到的，只需要将 *images* 、*inc* 、*options.php*  三个文件移动到主题根目录中去。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxowmzyttj30ll070jrd.jpg)

然后，打开主题的 *functions.php*  文件，在其中加入如下代码：

```
<span class="hljs-keyword">if</span> (!function_exists(<span class="hljs-string">'optionsframework_init'</span>)){
    define(<span class="hljs-string">'OPTIONS_FRAMEWORK_DIRECTORY'</span>, get_template_directory_uri().<span class="hljs-string">'/inc/'</span>);
    <span class="hljs-keyword">require_once</span> dirname(<span class="hljs-keyword">__FILE__</span>).<span class="hljs-string">'/inc/options-framework.php'</span>;
}

```

加入后代码如下：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxp1kqcirj316a0hwwfd.jpg)

保存文件，回到 WordPress 后台，可以在「外观」中找到一个「Theme Options」，点击即可进入设置页面。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmxp2j1aouj309q03st8j.jpg)

进入设置页面后，会看到非常多的设置项，这个都是 Options Framework 为我们提供的 Demo，等下会将这些内容处理一下，只保留我们自己需要的内容。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmxp3qxe2rj30lj0eawel.jpg)

当看到这里，说明 Options Framework 接入成功了。

### 添加设置项

我们的设置项被放在主题根目录下的 *options.php*  文件中，我们可以打开这个文件，查看具体的内容。

首先，会看到一个函数：

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmxp6ywaarj31fw08mt8y.jpg)

这个函数定义了数据库中我们的参数存放的字段名，可以把它改成我们自己需要的，比如 `gitchat_theme_options`。

在下方，可以找到我们的设置项目：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxp94f6r0j311a0jswf3.jpg)

项目大体上可以两种，分别是选项卡和其他设置项，选项卡的 type 是 *heading* ，设置项则支持多种类型：

- text
- textarea
- checkbox
- select
- radio
- upload（图片上传工具）
- images（使用图片替代 radio 选择）
- background（背景设置）
- multicheck
- color（Jquery 实现的颜色选择器）
- typography（排版选择器）
- editor

可以根据需要选择不同的选项，具体的设置范例，可以在 *options.php*  中看到。在对设置项精简以后，可以看出代码是这个样子的。这里面最需要关注的是 *id*  和 *type* ，id 会用于后续获取对应的设置项，如果 id 不唯一，就没办法获取到准确的值。而 type 不对，在后台设置时，可能体验不同。*name*  和 *description*  则分别是设置项的名称和描述，可以帮助我们更好的输入对应的设置项。*std*  是默认填写的内容，*placeholder*  是在未输入内容情况下，文本框会显示的内容。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmxpcqq7a9j30xw0nsq3m.jpg)

于此同时，后台设置项变成了：

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmxpdglulhj30oc09mjrb.jpg)

可以看出，这里的设置项和我们设置数据的顺序有关，可以根据我们的需要，来设置不同的顺序。

接下来，将站长的信息作为选项，用于侧边栏的输出。

将 *options.php*  中的代码改为如下代码：

```
    $options[] = <span class="hljs-keyword">array</span>( 
        <span class="hljs-string">'name'</span> => __( <span class="hljs-string">'作者名称'</span>, <span class="hljs-string">'theme-textdomain'</span> ),
        <span class="hljs-string">'desc'</span> => __( <span class="hljs-string">'作者的昵称或网名，用于侧边栏显示'</span>, <span class="hljs-string">'theme-textdomain'</span> ),
        <span class="hljs-string">'id'</span> => <span class="hljs-string">'user_name'</span>,
        <span class="hljs-string">'placeholder'</span> => <span class="hljs-string">'会显示在侧边栏'</span>,
        <span class="hljs-string">'std'</span> => <span class="hljs-string">''</span>,
        <span class="hljs-string">'class'</span> => <span class="hljs-string">'mini'</span>,
        <span class="hljs-string">'type'</span> => <span class="hljs-string">'text'</span>
    );
    $options[] = <span class="hljs-keyword">array</span>( 
        <span class="hljs-string">'name'</span> => __( <span class="hljs-string">'作者的邮箱地址'</span>, <span class="hljs-string">'theme-textdomain'</span> ),
        <span class="hljs-string">'desc'</span> => __( <span class="hljs-string">'作者的邮箱地址，用于侧边栏显示'</span>, <span class="hljs-string">'theme-textdomain'</span> ),
        <span class="hljs-string">'id'</span> => <span class="hljs-string">'user_mail'</span>,
        <span class="hljs-string">'std'</span> => <span class="hljs-string">''</span>,
        <span class="hljs-string">'class'</span> => <span class="hljs-string">''</span>,
        <span class="hljs-string">'placeholder'</span> => <span class="hljs-string">'会显示在侧边栏'</span>,
        <span class="hljs-string">'type'</span> => <span class="hljs-string">'text'</span>
    );
    $options[] = <span class="hljs-keyword">array</span>( 
        <span class="hljs-string">'name'</span> => __( <span class="hljs-string">'作者的网站地址'</span>, <span class="hljs-string">'theme-textdomain'</span> ),
        <span class="hljs-string">'desc'</span> => __( <span class="hljs-string">'作者的网站地址，用于侧边栏显示'</span>, <span class="hljs-string">'theme-textdomain'</span> ),
        <span class="hljs-string">'id'</span> => <span class="hljs-string">'user_url'</span>,
        <span class="hljs-string">'std'</span> => <span class="hljs-string">''</span>,
        <span class="hljs-string">'class'</span> => <span class="hljs-string">''</span>,
        <span class="hljs-string">'placeholder'</span> => <span class="hljs-string">'会显示在侧边栏'</span>,
        <span class="hljs-string">'type'</span> => <span class="hljs-string">'text'</span>
    );

```

然后在后台展示的效果如图。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxpkzaomvj30pi0eh0sx.jpg)

我们可以填写一下内容，测试一下能否正常保存设置项目。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxploebpbj30pe0fzjrk.jpg)

可以看到，我们的设置项被正确保存了。

### 在主题中调用函数获取设置项

现在的设置项已经设置好了，接下来在主题中调用它。

打开 *sidebar.php*  文件，找到 `<?php the_author_meta( 'description' ); ?>`，删去这段代码，然后使用我们的设置项来输出内容。

默认情况下，我们获取设置项的函数是`of_get_option`，使用如下代码，可以获取到我们的设置项的值：

```
<span class="hljs-meta"><?php</span> <span class="hljs-keyword">echo</span> of_get_option(<span class="hljs-string">"设置id"</span>);<span class="hljs-meta">?></span>

```

接下来，修改我们的 About 的输出，将其改为：

```
<span class="hljs-meta"><?php</span> <span class="hljs-keyword">echo</span> of_get_option(<span class="hljs-string">"user-name"</span>).<span class="hljs-string">","</span>.of_get_option(<span class="hljs-string">"user-email"</span>).<span class="hljs-string">","</span>.of_get_option(<span class="hljs-string">"user-url"</span>);<span class="hljs-meta">?></span>

```

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmxpse84iuj30wk09odg8.jpg)

保存文件，回到网站的首页，刷新即可看到我们输出的内容。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyj3560dlj309603s3yb.jpg)

### 修改获取参数的函数

可能你会觉得默认的函数太长了，需要变得短一点，可以修改 *inc/options-framework.php*  文件，搜索 `of_get_option`，找到这段代码，将这里的两个 `of_get_option` 改为你自己的函数名：

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmxqbbfhxkj310c0kggmm.jpg)

修改完成后，记得到主题中你调用的位置去修改对应的函数名。

### 如何修改菜单中的 Theme Options

想要修改菜单中的 Theme Options ，可以打开 *inc/includes/class-options-framework-admin.php*  文件，搜索 *Theme Options* ，然后就可以找到这些代码，修改其中的 `page_title` 和 `menu_title` 为你自己需要的内容。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmxqer8n4lj30zu0m83z9.jpg)

修改完成后，回到后台，可以看到菜单项中的文字和页面顶部的标题都修改过来了。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxqgh44x9j30fo095t8s.jpg)

### 其他优秀的面板

除了 Options Framework，还有很多其他比较优秀的面板，我们也可以选择这些面板来使用。

### OptionTree

OptionTree 是由 ThemeForest 赞助的主题设置模板，界面美观简洁大方，也是一个非常不错的选项框架。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmyj76kcf6j30x90j8mxr.jpg)

插件地址[详见这里](https://wordpress.org/plugins/option-tree/)。

演示主题[详见这里](https://github.com/valendesigns/option-tree-theme)。

#### Unyson Framework

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyjb4k2ynj30hs0aamxd.jpg)

插件地址[详见这里](https://wordpress.org/plugins/unyson/)。

演示主题[详见这里](https://github.com/ThemeFuse/Scratch-Theme)。

#### Redux Framework

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyjfw7o1sj30hs0aaq3a.jpg)

插件地址[详见这里](https://wordpress.org/plugins/redux-framework/)。

#### Titan Framework

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyjgi2gn3j30hs08yq32.jpg)

插件地址[详见这里](https://wordpress.org/plugins/titan-framework/)。

插件的选项框架非常的多，可以根据自己的需要，选择一款美观好用的主题插件。各个插件的使用大体上相同，区别仅仅是引入的文件不同罢了。

可以选择一个你喜欢的选项框架，然后一直用下去。

### 总结

至此，我们学习了如何接入 Options Framework，你也可以根据自己的审美喜好，添加不同的主题设置框架，来加速你的主题开发。

<font size=2 color=grey>[阅读原文](https://www.easywpbook.com/theme/options-framework.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
