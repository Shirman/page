<!-- TOC -->

- [使用 Theme Check 插件来检查你的主题是否合格](#使用-theme-check-插件来检查你的主题是否合格)
- [使用 GenerateWP 来生成代码](#使用-generatewp-来生成代码)
- [使用 Theme Unit Test Data 来进行测试](#使用-theme-unit-test-data-来进行测试)
- [使用 `get_template_part` 方法来拆分内容模板](#使用-get_template_part-方法来拆分内容模板)
- [使用 `wp_enqueue_style` 和 `wp_enqueue_script` 来加载脚本和样式表](#使用-wp_enqueue_style-和-wp_enqueue_script-来加载脚本和样式表)
- [用户注销账户后，返回到首页](#用户注销账户后返回到首页)
- [屏蔽掉一些无用的菜单项](#屏蔽掉一些无用的菜单项)
- [屏蔽后台仪表盘一些无用的控件](#屏蔽后台仪表盘一些无用的控件)
- [移除管理菜单的图标](#移除管理菜单的图标)
- [使用 *is\_*  语法来判断当前页面](#使用-is\_--语法来判断当前页面)
- [在管理员后台添加开发者信息](#在管理员后台添加开发者信息)

<!-- /TOC -->

### 使用 Theme Check 插件来检查你的主题是否合格

WordPress 主题审核团队开发了一款 ThemeCheck 插件，来帮助开发者自查插件是否有问题，进入插件列表就可以看到这个插件：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyiy67g88j31bu0j9dhs.jpg)

安装成功后，启用该插件，在菜单栏中就会多出一项菜单项。

找到「外观」—「Theme Check」，进入主题检查的页面：

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmyizac30qj308w064wed.jpg)

在这个页面选择你要检查的主题，然后点击 Check it！就可以开始检查你的主题是否合格：

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyj05u5srj30cf03bglf.jpg)

在运行了主题的测试后，会看到一些提示：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyj0tctzoj30wn0n1mys.jpg)

告诉你有哪些问题要处理。一般来说，Waring 和 Require 是必须要处理的，Recommend 可以根据自己的需要开启：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyj1zro50j312c03raa9.jpg)

INFO 则是你自己需要检查的。

### 使用 GenerateWP 来生成代码

对于一些常用的代码，可以考虑使用 GenerateWP 来生成。这是一个辅助开发的网站，里面有大量的代码生成工具，可以根据自己的需要，使用这里的生成器，来生成复合格式的代码，从而加速开发过程。

网站地址[请单击这里](https://generatewp.com/generator/)。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmxx0ddvm5j30rr0lf0v1.jpg)

### 使用 Theme Unit Test Data 来进行测试

我们在开发主题时，可能会遇见没有足够的文章来测试我们的主题。这个时候，可以考虑使用 WordPress Theme Review Team 提供的 Theme Unit Test 数据来进行测试。

这些数据存放在[这里](https://github.com/WPTRT/theme-unit-test)，可以直接下载[这个文件](https://raw.githubusercontent.com/WPTRT/theme-unit-test/master/themeunittestdata.wordpress.xml)。

下载后，打开开发环境的 WordPress 后台，找到「工具」—「导入」，选择其中的 WordPress 导入工具，安装该插件。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmxw0lkb2wj30lw05wwel.jpg)

安装完成后，点击「运行导入器」，选择刚刚下载的 xml 文件，点击上传文件并导入：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxw1tstj0j30ok05x3yn.jpg)

在新的页面中，会提示你是导入作者还是创建新的作者或是分配给现有的作者，由于我们是测试环境，保持默认即可。

这里需要注意的是，下方有一个「下载并导入文件附件」这个选项，如果网络不是超级好的话，不建议勾选，因为这个选项勾选后，WordPress 会去下载图片等附件，需要耗费大量的时间，足以把 WordPress 卡死。

确认完选项后，单击“提交”按钮，WordPress 会自动提示你导入完成。

可能会看到提示导入媒体失败的信息，不过不用管，我们没有勾选下载附件，所以报错是正常的。回到仪表盘，会看到导入了大量的文章、页面和评论：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmxw5t2o6mj30if074jrd.jpg)

除此之外，包括菜单也导入了一些，足够用来测试我们的主题了。

### 使用 `get_template_part` 方法来拆分内容模板

在前面的开发中注意到，其实文章页和单页的内容部分是一样的，而首页和这个页面的内容又是几乎相同，仅仅区别于 `the_content` 和 `the_excerpt` 函数。但是我们却不得不将文章页的代码复制了一份，这样代码复用度依然不够高。

有没有什么办法能够提升代码复用度呢？有的，那就是使用`get_template_part`函数。

这个函数可以实现引用另一个模板的部分代码到当前的模板中。这样，我们就可以很方便的在不同的文件中使用同一份代码，从而提高我们代码的复用度，提升代码的可读性。

这个函数的使用方法如下：

```
 <span class="hljs-meta"><?php</span> get_template_part( $slug, $name ); <span class="hljs-meta">?></span>

```

在模板中加入这一行代码， WordPress 会自动查找：

- `$slug.php`
- `$slug-$name.php`

这些文件，来进行引用（也可以用于子主题调用父主题的内容）。

### 使用 `wp_enqueue_style` 和 `wp_enqueue_script` 来加载脚本和样式表

大部分时候，我们都是直接将 CSS 和 Javascirpt 的 URL 直接放在页面的模板中，不过，按照 WordPress 官方的规范，应该使用`wp_enqueue_style`和`wp_enqueue_script`来加载脚本和样式表。

这里举一个例子：

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gitchat_theme_style</span><span class="hljs-params">()</span> </span>{
    wp_enqueue_style( <span class="hljs-string">'gitchat_style'</span>, get_template_directory_uri() . <span class="hljs-string">'/style.css'</span> ); 
}
add_action( <span class="hljs-string">'wp_enqueue_script'</span>, <span class="hljs-string">'gitchat_theme_style'</span> );

```

上面这段代码实现了在页面顶部加载主题根目录的 *style.css*  文件。

### 用户注销账户后，返回到首页

默认情况下，用户注销后会回到登录页，不过大多数情况下，用户注销便是不想再次登录，可以直接将下述代码加入到你的 *functions.php*  中：

```
add_action(‘wp_logout’,’auto_redirect_after_logout’);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">auto_redirect_after_logout</span><span class="hljs-params">()</span></span>{
  wp_redirect( home_url() ); <span class="hljs-comment">// 注销后跳转到首页</span>
  <span class="hljs-keyword">exit</span>();
}

```

### 屏蔽掉一些无用的菜单项

WordPress 提供了很多强大的功能，但是客户可能很多时候是一些小白用户，对于他们来说，能够更加简单的使用才是最重要的。所以可以在代码中加入一些函数，屏蔽掉一些无用的菜单项，简化后台。

比如，下面这段代码就只保留了仪表盘、文章、页面、评论和设置这几项，可以直接将下述代码加入到你的 *functions.php*  中。

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove_menus</span><span class="hljs-params">()</span></span>{
  remove_menu_page( <span class="hljs-string">'upload.php'</span> );                 <span class="hljs-comment">//媒体库</span>
  remove_menu_page( <span class="hljs-string">'themes.php'</span> );                 <span class="hljs-comment">//外观</span>
  remove_menu_page( <span class="hljs-string">'plugins.php'</span> );                <span class="hljs-comment">//插件</span>
  remove_menu_page( <span class="hljs-string">'users.php'</span> );                  <span class="hljs-comment">//用户</span>
  remove_menu_page( <span class="hljs-string">'tools.php'</span> );                  <span class="hljs-comment">//工具</span>
}
add_action( <span class="hljs-string">'admin_menu'</span>, <span class="hljs-string">'remove_menus'</span> );

```

简化后的菜单对于一些普通用户来说，会更加友好。

如果只是想要屏蔽一些二级菜单，则可以参考下面的代码来修改：

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove_submenu</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 删除”外观”下面的子菜单”编辑”</span>
    remove_submenu_page(<span class="hljs-string">'themes.php'</span>, <span class="hljs-string">'theme-editor.php'</span>);
}
<span class="hljs-keyword">if</span> (is_admin()){
    <span class="hljs-comment">//删除子菜单</span>
    add_action(<span class="hljs-string">'admin_init'</span>,<span class="hljs-string">'remove_submenu'</span>);
}

```

### 屏蔽后台仪表盘一些无用的控件

仪表盘是用户登录后台第一眼就会看到的内容，过多的控件会让用户产生迷惑，可以根据你自己的需要屏蔽控件。

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove_dashboard_widget</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">global</span> $wp_meta_boxes;
    <span class="hljs-comment">// 以下这一行代码将删除 "快速发布" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'side'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_quick_press'</span>]);
    <span class="hljs-comment">// 以下这一行代码将删除 "引入链接" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'normal'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_incoming_links'</span>]);
    <span class="hljs-comment">// 以下这一行代码将删除 "插件" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'normal'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_plugins'</span>]);
    <span class="hljs-comment">// 以下这一行代码将删除 "近期评论" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'normal'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_recent_comments'</span>]);
    <span class="hljs-comment">// 以下这一行代码将删除 "近期草稿" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'side'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_recent_drafts'</span>]);
    <span class="hljs-comment">// 以下这一行代码将删除 "WordPress 开发日志" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'side'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_primary'</span>]);
    <span class="hljs-comment">// 以下这一行代码将删除 "其它 WordPress 新闻" 模块</span>
    <span class="hljs-keyword">unset</span>($wp_meta_boxes[<span class="hljs-string">'dashboard'</span>][<span class="hljs-string">'side'</span>][<span class="hljs-string">'core'</span>][<span class="hljs-string">'dashboard_secondary'</span>]);
}
add_action(<span class="hljs-string">'wp_dashboard_setup'</span>, <span class="hljs-string">'remove_dashboard_widget'</span> );

```

### 移除管理菜单的图标

对于直接作为外包项目的 WordPress，我们希望让用户尽可能的少看到 WordPress 的相关信息，所以或许需要这段移除 WordPress logo 的代码：

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove_admin_bar_logo</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">global</span> $wp_admin_bar;
        $wp_admin_bar->remove_menu(<span class="hljs-string">'wp-logo'</span>);
}
add_action(<span class="hljs-string">'wp_before_admin_bar_render'</span>, <span class="hljs-string">'remove_admin_bar_logo'</span>, <span class="hljs-number">0</span>);

```

### 使用 *is\_*  语法来判断当前页面

WordPress 为我们提供了很多 *is\_*  开头的判断函数，借助这些函数，可以很方便的对不同页面的内容进行定制。具体的标签可以 [参考这里](https://codex.wordpress.org/zh-cn:%E6%9D%A1%E4%BB%B6%E6%A0%87%E7%AD%BE)。

这里举个例子，根据所处页面，生成不同的 `title`标签：

```
<title>
<span class="hljs-meta"><?php</span> 
<span class="hljs-keyword">if</span> (is_home()) {
    <span class="hljs-keyword">echo</span> bloginfo(<span class="hljs-string">'name'</span>);
} <span class="hljs-keyword">elseif</span> (is_404()) {
    <span class="hljs-keyword">echo</span> <span class="hljs-string">'404 未找到'</span>;
} <span class="hljs-keyword">elseif</span> (is_category()) {
    <span class="hljs-keyword">echo</span> <span class="hljs-string">'目录:'</span>; wp_title(<span class="hljs-string">''</span>);
} <span class="hljs-keyword">elseif</span> (is_search()) {
    <span class="hljs-keyword">echo</span> <span class="hljs-string">'搜索结果'</span>;
} <span class="hljs-keyword">elseif</span> ( is_day() || is_month() || is_year() ) {
    <span class="hljs-keyword">echo</span> <span class="hljs-string">'归档:'</span>; wp_title(<span class="hljs-string">''</span>);
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">echo</span> wp_title(<span class="hljs-string">''</span>);
}
<span class="hljs-meta">?></span>
</title>

```

### 在管理员后台添加开发者信息

可以通过如下代码，在管理员后台添加开发者信息，这样可以帮助客户更好的联系到你。

在主题中添加如下代码可以实现：

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">remove_footer_admin</span> <span class="hljs-params">()</span> </span>{
<span class="hljs-keyword">echo</span> <span class="hljs-string">'由<a href="">白宦成 </a>开发'</span>;
}
add_filter(<span class="hljs-string">'admin_footer_text'</span>, <span class="hljs-string">'remove_footer_admin'</span>);

```

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmxwggxhncj30fg08nglp.jpg)

<font size=2 color=grey>[阅读原文](https://www.easywpbook.com/theme/tips.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
