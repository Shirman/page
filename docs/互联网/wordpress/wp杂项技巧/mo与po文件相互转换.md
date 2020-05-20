
首先是找到那个文件，然后顺藤摸瓜一直找，结果还是没找到（自己找的不够仔细，其实可以找到对应的英文）。同时又在数据库里找了一下没找到。最后才猛然想起这玩意是不是在语言包里，找到一个bbpress-zh\_CN.po和bbpress-zh\_CN.mo。

bbpress-zh\_CN.po可以打开，里面基本都是中文一句，英文一句
-------------------------------------

![这里写图片描述](https://img-blog.csdn.net/20170314163059800?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTElVX1lBTlpIQU8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

我们也把bbpress-zh\_CN.mo打开看看，乱码的
-----------------------------

![这里写图片描述](https://img-blog.csdn.net/20170314163130862?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTElVX1lBTlpIQU8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> 当我们试图直接修改po文件里的内容，发现并不起作用，由此判断真正起作用的应该是mo文件。下面我们来讲一讲mo和po文件如何互相转化。

一、如何把po文件转化成mo文件呢？
------------------

第一步、下载po文件

首先通过ftp工具把你的po文件下载下来，放到一个文件夹里。   
第二步、编辑文件

用记事本或者Editplus编辑你的po文件，保存（这个只是编辑作用，不会自动生成mo文件 ）   
第三步、下载特殊工具

然后下载一个poedit软件（百度有很多），点击打开，选中你的po文件，最后保存，自动生成mo文件（无需更多操作，直接保存即可）。像这样、

![这里写图片描述](https://img-blog.csdn.net/20170314163408549?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTElVX1lBTlpIQU8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

二、如何把mo文件转化成po文件呢？
------------------

同样还需要poedit，只不过我们这次是需要其中的msgunfmt.exe进行反编译，这次我们不能使用客户端软件了，需要在cmd下执行操作。

```
首先交待一下：

博主的poedit的安装路径是：D:\常用软件\poedit\Poedit

msgunfmt.exe的路径是：D:\常用软件\poedit\Poedit\GettextTools\bin

测试文件bbpress-zh_CN.mo的位置是：D:\test

```

第一步、打开cmd（命令行工具）

快捷键是win+R输入cmd，回车   
第二步、进入D盘: 命令是

```
D:

```

第三步、进入poedit的bin目录，命令是

```
cd D:\常用软件\poedit\Poedit\GettextTools\bin

```

第四步、执行mo转化成po操作，命令是

```
msgunfmt.exe D:\test\bbpress-zh_CN.mo -o D:\test\bbpress-zh_CN.po

```

如图   
![这里写图片描述](https://img-blog.csdn.net/20170314163457628?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTElVX1lBTlpIQU8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


<font size=2 color=grey>[阅读原文](https://blog.csdn.net/liu_yanzhao/article/details/62045260)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
