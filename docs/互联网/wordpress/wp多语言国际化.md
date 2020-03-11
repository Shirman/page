1 WP 主题开发：为你的主题/插件实现国际化
===============================================

- [为什么要为插件/主题实现国际化](#为什么要为插件主题实现国际化)
- [核心代码](#核心代码)
- [调整主题的输出](#调整主题的输出)
- [如何快速生成语言包](#如何快速生成语言包)
- [翻译主题](#翻译主题)
    - [验证翻译](#验证翻译)
    - [查看统计](#查看统计)
    - [更新翻译](#更新翻译)
    - [保存文件](#保存文件)
- [Poedit 的高级用法](#poedit-的高级用法)
    - [翻译文件属性设置](#翻译文件属性设置)
    - [自动填充翻译](#自动填充翻译)
- [总结](#总结)


  
为你的主题、插件实现国际化
-------------

这节课来学习如何为你的主题和插件实现多语言。

### 为什么要为插件/主题实现国际化

我们的主题、插件可以通过加入国际化，实现全球范围的用户支持，即使是海外的用户，也可以直接使用你的主题/插件。所以我建议你在制作主题/插件时，就按照多语言的规范来制作。

### 核心代码

```
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">i10n</span><span class="hljs-params">()</span></span>{
    $current_locale = get_locale();
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">empty</span>($current_locale)){
        $mo_file = dirname(<span class="hljs-keyword">__FILE__</span>).<span class="hljs-string">'/languages/'</span>.$current_locale.<span class="hljs-string">".mo"</span>;
        <span class="hljs-keyword">if</span> (@file_exists($mo_file)&& is_readable($mo_file))
            load_textdomain(<span class="hljs-string">'your-plugins'</span>,$mo_file);
    }
}
add_action(<span class="hljs-string">'init'</span>,<span class="hljs-string">'i10n'</span>);

```

在插件主文件/主题的 functions.php 中加入上述代码，就可以为主题/插件接入多语言功能。

这段代码会自动到插件的根目录下的 /*languages*  目录下查找对应语言的语言包，比如 *zh\_CN.mo* 。

存在语言包文件的话，则会自动加载语言包，对界面进行汉化。

### 调整主题的输出

上面实现了语言包的引入，但是我们现在还没有语言包，首先要制作语言包，这里为大家介绍两个函数：

```
<span class="hljs-comment">// 返回值，不输出</span>
__( <span class="hljs-string">'New'</span>,<span class="hljs-string">'your-plugins'</span>)
<span class="hljs-comment">// 直接输出</span>
_e( <span class="hljs-string">'New'</span>,<span class="hljs-string">'your-plugins'</span>)

```

这两个函数可以用于在主题、插件中的输出，当使用 `__("xx","xxy")`时，主题、插件会自动到 *xxy*  的语言包中查找 *xx*  字段，从而实现多语言输出的支持。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyi1ha21ej316009sglx.jpg)

因此，**要将我们的主题/插件中所有涉及到文字输出的内容，改为使用这个函数进行输出！**

这也是我为什么要推荐你在开发主题时就按照规范来，如果在一开始没有养成良好的习惯，最终修改时，就会面临巨量的工作，可能一下子就打消了做国际化的念头。

这一步一定要做，一方面，我们需要使用这两个函数实现根据不同语言输出不同的内容，另一方面，还需要借助这两个函数来快速生成语言包。

此外，还需要修改我们的 *style.css*  文件，在其中加入语言设置项：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyi7j6fu1j30z60h2wfi.jpg)

前者指明我们的翻译文件的文本域（你可以理解为唯一的标识）和语言文件夹所在目录，这里我们使用 *languages* ，修改完成后，保存这个文件，并创建对应的语言文件夹。

### 如何快速生成语言包

这里需要用到一个软件——Poedit，我们会使用这个软件来生成语言包，并生成不同语言的翻译文件。

可以在他们的[官网下载](https://poedit.net/)。

Poedit 提供了 Windows/macOS 的版本，还提供了源代码，即使使用的是 Linux，也可以使用。

安装完成后，打开 Poedit，点击其中的「翻译 WordPress 的主题或插件」：

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyi2szpq3j30r80ligly.jpg)

然后在弹出的窗口中选择你的主题文件夹，或者拖动文件夹到这里来：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyi38rpd8j30dw094t8t.jpg)

这里选择「创建 Pot」，这样可以创建一个用于翻译的模板，后续再根据这个模板创建我们自己语言的翻译。

Poedit 会读取我们的主题文件，并生成要翻译的字符串列表：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyi60jml9j30go0b1jrh.jpg)

单击“确定”按钮，就会看到我们所有的主题：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyi6sa66nj30r80lidg7.jpg)

确认无误后，单击文件“保存”按钮，将这个 Pot 文件保存下来，后续语言翻译的志愿者就可以借助这个模板文件，来帮助你更新翻译了。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmyi9kxvs1j30js0cgt8x.jpg)

### 翻译主题

生成了语言包后，接下来翻译主题，点击界面上的创建新的翻译。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyib6lqc1j30r80limxi.jpg)

在新的窗口中选择我们要翻译的项目：

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyibdg347j309509qaa2.jpg)

单击“确定”按钮，就可以进入到翻译的界面了。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyiccrx9hj30r80limxg.jpg)

红色区域是条目区域，点击我们要翻译的条目，相关信息就会在下方黄色的编辑区域显示出来。

右侧的是建议区域，在这个区域，软件将会查询云端数据库和翻译平台，对当前内容进行翻译，给你提供参考。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmyidhf8hsj307e042dfn.jpg)

如果曾经翻译过这个字段，这里还会显示你之前的翻译，供你选择。

#### 验证翻译

当翻译完成后，点击上方工具栏中的验证按钮， Poedit 将会检查你的翻译是否出现了错误。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyif2459yj30jq05naa8.jpg)

会提示当前翻译是否可以使用、还有多少个条目没有被翻译。

#### 查看统计

单击上方的“统计”按钮，可以查看当前语言包的状况。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmyifp0gtwj30b00813yg.jpg)

比如有多少个文本需要翻译、多少个文本需要检查等等。

#### 更新翻译

单击上方的“更新”按钮，Poedit 会自动扫描主题目录下的代码文件，检查是否有新的需要翻译的字段加入进来。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyqjihzh1j30xc0m2js9.jpg)

并在弹框中告诉你哪些是新的、哪些是旧的。

一般来说，可以直接单击“确定”按钮，但是如果代码没有发生任何改变，更新翻译后却提醒有了变化，就要仔细检查是否真的发生了代码变化。

#### 保存文件

当翻译完成后，可以单击「文件」|「保存」命令，来保存你的翻译文件，这个文件需要保存到你的 language 文件夹下，并且以语言为文件名，就像这样：

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmyihc7dekj30js0cgmx7.jpg)

保存后，会自动在这个文件夹下生成两个文件，其中 *zh\_CN.po*  文件是翻译的源码，可供我们修改使用 *zh\_CN.mo*  则是 WordPress 用于多语言识别的二进制文件。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmyihof06tj306c03a3yb.jpg)

至此，我们完成了基本的翻译工作。

### Poedit 的高级用法

#### 翻译文件属性设置

在使用 Poedit 时，应该设置一下你的自己的译者信息。

单击「编目」|「属性」命令，可以看到属性设置，可以修改信息为你自己的：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyikh6ohsj30e60bzglp.jpg)

在「源关键字」一项中，可以看到所有 Poedit 会识别的 WordPress 的多语言输出函数：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyild9i6nj30e60bzgln.jpg)

可以到 WordPres 的官网文档中查询这些函数的用法，使用这些函数来完成你的开发。

#### 自动填充翻译

我之所以喜欢使用 Poedit 来做翻译，很大程度上是因为 Poedit 的记忆库功能，Poedit 的记忆库功能可以学习我以往的翻译内容，来填充记忆库，当我再进行翻译时，会自动从记忆库匹配完全一样的词条出来，这让翻译有了累计效应，你翻译和处理的主题、插件越多，翻译、处理主题就越快，因为很多内容都是之前曾经翻译过的，只需要再判断是否符合当前这个场景即可。

单击菜单栏中的「编目」—「从 TM 中填补缺少的翻译」命令，可以勾选第一项，这样就只匹配完全一致的词条，可以提升准确率，同时减少工作：

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmyiq5vc7jj30b407e3yo.jpg)

如果你已经翻译过多次，而且每次匹配的效果都不错，那么可以勾选第二项。如果没有勾选，匹配的项目会被标记为模糊，还需要手动确认是否匹配。

### 总结

经过这节课我们学习了如何汉化一个主题，插件的操作基本是一致的，将核心代码添加到插件的核心文件即可。

<font size=2 color=grey>[阅读原文](https://www.easywpbook.com/i18n/theme.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
