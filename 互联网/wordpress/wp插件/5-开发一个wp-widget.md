5 开发一个 WordPress Widget
===============================================


- [插件开发目标](#插件开发目标)
- [重新认识 Widget](#重新认识-widget)
- [插件开发过程](#插件开发过程)
    - [创建插件](#创建插件)
- [初始化小工具](#初始化小工具)
    - [实现前台展示功能](#实现前台展示功能)
    - [添加小工具设置](#添加小工具设置)
    - [完善前台展示](#完善前台展示)
    - [再次验证功能](#再次验证功能)
- [开发中需要注意的内容](#开发中需要注意的内容)

  
开发一个 WordPress Widget
---------------------

### 插件开发目标

这节课来创建一个简单的 WordPress Widget，实现在侧边栏显示达人课的链接。

### 重新认识 Widget

很多 WordPress 主题都支持自定义的侧边栏小工具，有了自定义的侧边栏小工具，WordPress 的侧边栏也可以变得多姿多彩。在开始开发 Widget 之前，先来重新认识一下 Widget。

一个 Widget 可以分为两个部分：

- 上方的标题部分
- 下方的内容部分

在管理后台，它是这个样子的：

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmvm1li61aj30c80dgjr9.jpg)

而在前台，它是这个样子的：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmvm6fgoq6j309f05lmwy.jpg)

每一个 Widget 都至少包含这两部分，其中第二部分又可能会有很多不同的样式。大多数就是对第二部分进行自定义，来达到展示特定内容的目的。

### 插件开发过程

这节课就来尝试创建一个 WordPress widget 小工具，这个小工具可以通过后台的设置，实现在前台输出达人课的基本信息。

#### 创建插件

首先要创建一个插件，这里创建的插件名称为 *gitchat\_widget* ，并进行初始化。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmvlggtbyxj30ep01yglg.jpg)

### 初始化小工具

初始化完成插件后，来初始化我们的小工具。

在插件中加入如下代码：

```
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">gitchat_widget</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WP_Widget</span> </span>{

    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__construct</span><span class="hljs-params">()</span> </span>{
        $widget_ops = <span class="hljs-keyword">array</span>( 
            <span class="hljs-string">'classname'</span> => <span class="hljs-string">'gitchat_widget'</span>,
            <span class="hljs-string">'description'</span> => <span class="hljs-string">'这是一个 GitChat 小工具'</span>,
        );
        <span class="hljs-keyword">parent</span>::__construct( <span class="hljs-string">'gitchat_widget'</span>, <span class="hljs-string">'Gitchat Widget'</span>, $widget_ops );
    }

}
add_action(<span class="hljs-string">'widgets_init'</span>,
    create_function(<span class="hljs-string">''</span>, <span class="hljs-string">'return register_widget("gitchat_widget");'</span>)
);

```

上述代码就是 WordPress 初始化一个小工具的代码。

这里创建了一个继承了 *WP\_Widget*  类的类 *gitchat\_widget* ，该类的的构造函数内构造了一组参数，参数指定了控件的名称、描述、id 等。

此外，通过 `add_action` 实现对 *widgets*  进行初始化的挂载，这里用到了一个函数 `create_function`，该函数可以实现创建一个匿名函数，这个函数没有参数，代码是注册一个 id 为 gitchat\_widget 的 Widget。

#### 实现前台展示功能

接下来实现前台的展示功能。

首先在 `__constract` 函数后加入一个新的函数 `widget`，这个函数接受两个参数，分别是 *args*  和 *instance* 。

此时代码如下：

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmvpjf6478j313u0usdh6.jpg)

我们将两个参数打印出来看看，具体有什么作用。

在 `widget`函数中加入代码`var_export($args);`。

进入 WordPress 后台的小工具中，拖动我们创建的 GitChat Widget 到侧边栏中。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmwaekew7og30rw0biwgm.gif)

来到前台，我们可以看到这样的输出：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmwafbi7bjj30a90bvdfw.jpg)

现在我们知道了这里都有哪些内容了，可以调整一下输出。将 *widget*  函数代码改为这样：

```
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">widget</span><span class="hljs-params">( $args, $instance )</span> </span>{
        <span class="hljs-keyword">echo</span> $args[<span class="hljs-string">'before_widget'</span>]; <span class="hljs-comment">// 输出 widget 前面的内容，一般是主题提供的样式。</span>
        <span class="hljs-comment">// 输出内容</span>
        <span class="hljs-keyword">echo</span> $args[<span class="hljs-string">'after_widget'</span>];
    }

```

#### 添加小工具设置

现在小工具不能设置任何东西，所以接下来要让小工具更加完善，可以添加图片地址和对应的链接，这样就可以在前台显示我们的达人课和跳转链接了。

在 *widget*  函数后新创建一个函数 *form*  ，该函数接受一个 *instance*  参数，其将会在小工具中为我们渲染一个表单，用于填写具体的信息。同时，还要创建另外一个函数 *update* ，该函数接受两个参数，分别是 *new\_instance*  和 *old\_instance* 。

```
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">form</span><span class="hljs-params">( $instance )</span> </span>{     
    }
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span><span class="hljs-params">( $new_instance, $old_instance )</span> </span>{
    }

```

接下来一一实现这两个方法。

首先要实现的是 *form*  表单，在这个方法中要输出表单，同时，还需要确保之前填写的内容不会丢失，这样方便修改，而无需每次都重新完全填写所有内容，所以将 form 方法改写成下面这样。

```
public function form( $instance ) {
        $title = ! empty( $instance['title'] ) ? $instance['title'] : "默认标题";
        $image_url = !empty($instance['image_url']) ? $instance['image_url'] : "http://images.gitbook.cn/FjhhSzg105uzXTpqZb3N3JIAKokE";
        $link  = ! empty( $instance['link'] ) ? $instance['link'] : "http://gitbook.cn/gitchat/column/5a16601f13c02f4a35c9f8ad";
        ?>
        <p>
        <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">标题</label> 
        <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
        </p>
        <p>
        <label for="<?php echo esc_attr( $this->get_field_id( 'image_url' ) ); ?>">图片地址</label> 
        <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'image_url' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'image_url' ) ); ?>" type="text" value="<?php echo esc_attr( $image_url ); ?>">
        </p>
        <p>
        <label for="<?php echo esc_attr( $this->get_field_id( 'link' ) ); ?>">链接</label> 
        <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'link' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'link' ) ); ?>" type="text" value="<?php echo esc_attr( $link ); ?>">
        </p>
        <?php 
    }

```

其中，代码的前三行是设置从数据库中获取到原先的数据，如果数据不存在，则将其设置为默认的数据。当然也可以额将后面的默认数据置空。

```
$title = ! <span class="hljs-keyword">empty</span>( $instance[<span class="hljs-string">'title'</span>] ) ? $instance[<span class="hljs-string">'title'</span>] : <span class="hljs-string">"默认标题"</span>;
$image_url = !<span class="hljs-keyword">empty</span>($instance[<span class="hljs-string">'image_url'</span>]) ? $instance[<span class="hljs-string">'image_url'</span>] : <span class="hljs-string">"http://images.gitbook.cn/FjhhSzg105uzXTpqZb3N3JIAKokE"</span>;
$link  = ! <span class="hljs-keyword">empty</span>( $instance[<span class="hljs-string">'link'</span>] ) ? $instance[<span class="hljs-string">'link'</span>] : <span class="hljs-string">"http://gitbook.cn/gitchat/column/5a16601f13c02f4a35c9f8ad"</span>;

```

下面的数据则是输出一个个表单，这里我取其中一个来说明

```
<p>
<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">标题</label> 
<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
</p>

```

首先，输出一个 *label* ，来帮助我们分辩到底设置的是哪个选项。然后，定义一个输入框，设置它的名字为 *field\_name* ，然后再设置其内容为我们刚刚获取到的数据库中的值。

> esc\_attr 是安全输出函数，对输出内容进行转义，确保恶意代码不会被执行。

保存文件，回到小工具页面，刷新。

再次拖动一个 GitChat Widget 到侧边栏，这时会发现我们的小工具中有了三个设置项。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmwb4puamaj30d20akgln.jpg)

将三个设置项进行修改，设置为你自己的值。

#### 完善前台展示

现在后台的设置已经完善了，接下来完善前台的展示，刚刚只是展示了框架，并没有展示具体的内容。

刚刚设置的内容，会通过 widget 函数的 *instance*  参数传递进入函数。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmwb7scxhjj30ne06wmx9.jpg)

我们可以通过 `$instance['属性名']` 来调用它.这里使用 html 的 *figure*  标签来实现结果的输出。

在上面的代码中加入如下代码：

```
<span class="hljs-keyword">echo</span> <span class="hljs-string">'<figure>
       <a href="'</span> .   $instance[<span class="hljs-string">'link'</span>] .  <span class="hljs-string">'">
       <img src="'</span>.   $instance[<span class="hljs-string">'image_url'</span>] .  <span class="hljs-string">'" alt="'</span>.$instance[<span class="hljs-string">'title'</span>].<span class="hljs-string">'" width="304" height="228"></a>
       <figcaption>'</span>. $instance[<span class="hljs-string">'title'</span>] .  <span class="hljs-string">'</figcaption>
      </figure>'</span>;

```

效果如下：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmwbfm51eaj314q0egaak.jpg)

这样就简单的实现了前台内容的输出。


#### 再次验证功能

回到后台，将我们的小工具的设置改为其他达人课的信息，可以看到内容已经发生了改变。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmwbjpzvvwj309c0ci0to.jpg)

这样，就验证了我们的小工具开发成功。

### 开发中需要注意的内容

在开发过程中需要注意，并不是每个小工具都有输入和输出，在涉及到用户的输入和输出时，一定要注意在其中加入过滤函数，常用的过滤函数你可以在[这里](https://codex.wordpress.org/Validating_Sanitizing_and_Escaping_User_Data) 找到。通过对用户输入的过滤，能够避免由用户的错误输入导致的恶意代码的嵌入。

> 记住，不要相信用户的输入！

[单击这里下载本课插件](http://www.easywpbook.com/course-resources/17_gitchat_widget.zip)。

<font size=2 color=grey>[阅读原文](https://www.easywpbook.com/plugin/create-widget.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
