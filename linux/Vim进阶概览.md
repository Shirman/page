## Vim进阶


- [Vim进阶](#vim进阶)
    - [书签功能](#书签功能)
    - [标示选择亮起](#标示选择亮起)
    - [tab标签页](#tab标签页)
    - [ctags](#ctags)
    - [自动补全](#自动补全)
    - [好用的文件浏览器](#好用的文件浏览器)
    - [文件加密](#文件加密)
    - [文本对齐](#文本对齐)
    - [缩进设置](#缩进设置)
    - [正则](#正则)
    - [专治乱码](#专治乱码)
    - [其他实用指令](#其他实用指令)


### 书签功能

你可以在文章中的某个地方做个标记（marks），然后跑到其他地方去编辑，在呼叫这个mark时又会回到原处。

    mx 	
    其中x 代表26个小写英文字母，这样光标所在处就会被mark；
    `x 	
    回到标签原设定的位置   `是tab键上面那一个；
    ‘x
    回到标签设定行行首   ‘是enter键左边那一个；
    `0
    表示回到前一次编辑文档中离开前的最后位置，
    `1
    表示回到前二次编辑文档的最后位置，依次类推，你不必使用m来标示，vim会自动记忆。 
    `` 
    在两跳之间会跳  esc按键下的按键

>这又是vim的一个秘密武器，简单的说，你可以在文章的某处做个记号，然后跑到其他地方去编辑，在呼叫这个标记时又回到原处，妙！

### 标示选择亮起

    v	
    小写v，这是属于字元标示（character vimsual），按下 v 后你就可以移动游标，游标走过的地方就会被选择。再按一次v 就会结束v-mode。

    V	
    大写 V，这是行标示（line vimsual），按下 V 后会整行被选择（包括行首前空白的部分），您移动上下键，会选择多行。再按一次 V 就会结束v-mode。

### tab标签页

    打开帮助文档
    :h

    新打开tab
    :tabe[dit] {file}
    :tabnew

    tab切换
    :tabn[ext]  下一个  快捷键gt
    :tabp[revimous]  上一个  快捷键gT

    tab移动
    :tabm[ove] N   其中N为数字，0为第一，1为第二

    关闭tab
    :tabc[lose] 关闭当前tab页
    :tabo[nly] 关闭除当前的tab页


### ctags

在安装了ctags（5.6）前提下，在你所需要进行查找tag的源码目录下执行：

    ctags –R
    
会在当前目录下生成一个tags文件（该文件是对这个目录下的所有文件进行内部的索引，方便跳转）；在.vimrc文件中添加 ```set tags=源码目录下的tags绝对路径```；

设定完后，在编辑文件时，就可以通过 ```<C+]>``` 进行查询当前光标下的字段。


### 自动补全

本来vim也是支持自动补全的，用的键是```<c+p>(ctrl+p)```，在编写代码的过程当中，我们很容易发现，如果你的文件(指得是php文件)有include, include_once, require, require_once 这些包含的文件中如果有你要的函数，你用vim自动补全时，vim是可以找到的，还有当前文件中有的字串都可以找到。

### 好用的文件浏览器 

文件浏览器   
编辑目录的文件信息如: 

    vim  编辑当前目录

    <Enter> 在当前窗口中打开文件|netrw-cr|
    o 	打开一个水平分隔的窗口显示文件|netrw-o|
    v 	打开一个垂直分隔的窗口显示文件|netrw-v|
    p 	使用jpreview-windowj窗口|netrw-p|
    p 	在jpreview-windowj窗口中编辑|netrw-P|
    t 	在一个新标签页中打开文件|netrw-t|	个人常用 tabedit
    i 	控制列表显示的风格(仅文件名, 还是在一行中显示详细信息,逐行列出项目, 还是树形显示), 其中详细信息风格包括文件大小和日期信息
    s 	重复按s会循环改变文件排序的方式: 按文件名排序, 按最后修改时间,或者根据文件大小.
    r 	切换正反向排序
    c 	将当前目录切换到浏览器正打开的目录。(请参考jg:netrw_keepdirj对此进行控制)
    R 	更改当前光标下的文件，Vim会提示你输入一个新的文件名
    d	创建一个目录
    D 	删除当前光标下的文件名。Vim也会提示你进行确认
    mb gb 	标记书签/跳转到书签

### 文件加密
    
    vim -x  file.txt   给文件加密

    :set key=打开或关闭文件加密key的值为密码，设置为空串表示不再对文件加密（好像set  key=置为空字符串没有效果）

推荐使用：

    :X              
    这个和vim  -x 一样密码都是用星号代替了

    可直接通过X 直接回车不输入任何字符串，即不设置密码，在windows下的文件也管用

### 文本对齐

    左对齐		
    :[rangeBeg,rangeEnd]left:10,20left 第十行到第二十行向左对齐

    右对齐		
    :[rangeBeg,rangeEnd]right

    居中对齐	
    :[rangeBeg,rangeEnd]center

    文本按照一定格式对齐
    [lines]==	
    如：10==

    文本统一向右移动由shiftwidth指定的字符个数
    [lines]>>
    如：之后20行向右移动
    20>>

    文本统一向左移动由shiftwidth指定的字符个数
    [lines]<<

### 缩进设置

    "开启自动缩进
    :set autoindent 

    "开启语法缩进，比如if(...)[Enter]会缩进一个tab
    :set smartindent

    "设置自动缩进 4 个空格
    :set shiftwidth=4

    "实际的 tab 即为 4 个空格, 而不是缺省的 8 个
    :set tabstop=4

### 正则

查找 正则表达式内部大小写

/c大小写不敏感的

/C大小写敏感的

eg：

    /cword   
    可以匹配到word  Word WORD 等等

    /a*
    /\(ab\)*
    就可以匹配到："ab", "abab", "ababab"，等等。还有"".

    /ab\+
    会匹配到"ab", "abb", "abbb"， 等等

    /folders\=
    匹配"folder"和"folders"。

    /ab\{3,5}

    /foo\|bar   
    匹配foo或bar  或的关系 前后两个条件满足其一即可

    /forever\&...   
    并且前后两个条件都要满足
    它要求两个并列的选项同时被匹配到。
    将只会匹配"forever"中的"for"。但不会匹配到"fortuin"中的"for"

    /[0-9a-z]   
    匹配0-9和a-z的字符

    /[^123]

    "\s"匹配空白，"\ s"匹配空白或断行

### 专治乱码

Vim编码我们单独开篇，详见[Vim文件编码步步分解](/linux/Vim文件编码步步分解.md)

用于打开不同的编码的文件 

    let &termencoding=&encoding
    set fileencodings=utf-8,gbk,cp936

### 其他实用指令

    vim -p 	同时打开多个文件
    ctrl+r 	对使用u命令撤销的操作进行恢复
    Ctrl+n	自动匹配已输入类似词组
    %		跳转到配对的括号去
    . 		点操作符号意义：重复上一次操作动作；
    ^    	行首  	home
    $		行尾	end
    aw  	文本对象  a word   
    daw 	删除所在当前单词   动名词的结构
    zo   	在vimdiff会出现折叠的代码行，可执行zo命令展开
    zc   	折叠

----

    :!  		后面带shell命令  执行完成后可返回之前vim打开的文件
    :set showmatch  	键入)字符时要是能看出来它与前面的哪个(字符匹配就太好了。
    :set list  	查看制表符号 一般是I^$
    :set background=light 		设置背景色
    :set background&		选项后面加个&表示该设置为默认设置
    :diffupdate  	时时更新对比文件的差异，并色彩标识
    :sp		横向打开多个窗口
    :vsp		纵向打开多个窗口
    :only   	保留当前窗口，退出其他文件
    :set scrollbind  	两个文件同步滚动  对比的时候很有用
    :set fileformat=unix		将文件变为unix格式的
    :set hlsearch			高亮显示查找结果
    :set incsearch			增量查找

----

    替换命令格式	[range]s/str/replace/gc
    %s/str1/rep1/g		将每一行中的每一个str1替换为rep1
    1,12s/str2/rep2/c	将1-12行的第一个str2替换为rep2，c会提示是否要替换等确认信息
    1,23s/^the/theses/g	将1-23行中的每个开头为the的字符串替换为theses
    :%s/\s\+$//g		删除所有的空格，注意在替换的命令中正则加了反斜杠

    在insert模式下， 

    c^p   	自动补全变量或方法名
    C^y   	从上一行复制
    C^e   	从下一行复制
    CTRL-O fcommandg   	针对这种情形vim提供了一个快速的办法。使用CTRL-O fcommandg你可以在Insert模式下执行任何一个Normal模式下的命令
    C^z   	将当前vim打开的文件放到后台   可用fg切换到前台显示
    CTRL-W +   	加大当前窗口高度
    CTRL-W -   		减小当前窗口高度
    CTRL-W _   	当前窗口高度最大化，其他窗口最小化

----

写几个我也不懂也没用过的：

    g c^g    显示当前字符数 行数 字节数等信息
    :%!xxd    十六进制的方式显示二进制文件内容
    :iabbrev ill i love linux  用ill缩写代替 多个单词：i love linux
    :iab #b begin    iab本身就是iabbrev的缩写
    :iabclear
    :undolist	可以在每次撤销分支上查看都有了几次改动及什么时间做的改动
    :earlier 10s 	回到10s前
    :later 1m	回到1m后
    :earlier 1h	回到1h前
    :undo 2		回到编号为2的撤销  通过undolist可以查看到相关编号

    缩写但只能缩写最多一行
    :iabbrev BO Benny Ox12
    :iab BO Benny Ox12

----
@tsingchan    