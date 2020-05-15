Jupyter的安装和使用
----
<!-- TOC -->

- [1、Jupyter Notebooks 简介](#1jupyter-notebooks-简介)
- [2、安装Jupyter Notebooks](#2安装jupyter-notebooks)
    - [pip 方法](#pip-方法)
    - [Anaconda 方法](#anaconda-方法)
- [修改jupyter notebook工作空间](#修改jupyter-notebook工作空间)
- [jupyter notebook 基本使用](#jupyter-notebook-基本使用)
- [jupyter notebook 中编写并执行python代码](#jupyter-notebook-中编写并执行python代码)
- [jupyter notebook 中的快捷键介绍](#jupyter-notebook-中的快捷键介绍)
- [小结](#小结)

<!-- /TOC -->

本文转载自：<font size=2 color=grey>[阅读原文](https://blog.csdn.net/qq_33619378/article/details/83037106)</font>

注：本文内容仅针对windows环境下安装和配置Jupyter Notebooks 。

### 1、Jupyter Notebooks 简介


```
Jupyter Notebook是一个Web应用程序，允许您创建和共享包含实时代码，方程，可视化和说明文本的文档。 用途包括：数据清理和转换，数值模拟，统计建模，机器学习等等。

```

Notebooks其实就像是你的python笔记本一样，不仅可以运行书写的python代码，同时还支持markdown格式的文本显示。  

在Notebooks中不仅可以运行python，它还支持R、Julia 和 JavaScript等其他40余种语言。

### 2、安装Jupyter Notebooks

安装方式大致分为两种：

- pip 方法
- Anaconda 方法

#### pip 方法

使用pip命令安装之前需要我们先安装Python。此处以python3.6为例

**1.安装Python**

可以在[python下载处](https://www.python.org/downloads/windows/)，选则对应的系统版本，我这里选择`Windows x86-64 executable installer`下载安装。

具体的安装就不再赘述，主要说明一下几点：  

需要注意的是安装时记得勾选`Add Python 3.6 to PATH`，然后选择`Customize installation`。  

添加 Path，是为了以后可以在任何目录下使用 cmd 运行 Python，跟 Java 的 path一样。如果安装过程中没有添加 Path，也可以以后再添加。

![](https://images2015.cnblogs.com/blog/855959/201706/855959-20170611095032137-133687280.png)

**2.升级pip到最新版本**

安装python3.6的同时会安装pip，但此时需要升级pip到最新版

打开命令提示窗，切换到python3.6的安装目录下的`Scripts`文件夹。

执行如下命令：

```
pip install --upgrade pip

```

![](https://img-blog.csdn.net/20181013120252199?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)  

**3.安装Jupyter Notebooks**

打开命令提示窗，切换到python3.6的安装目录下的`Scripts`文件夹。执行如下命令

```
pip install jupyter

```

安装完成`Scripts`文件夹如下图

![](https://img-blog.csdn.net/20181013120340751?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**4.启动 Jupyter Notebooks**

打开命令提示窗，切换到python3.6的安装目录下的`Scripts`文件夹。执行如下命令

```
jupyter notebook

```

出现如下提示，启动成功，并且浏览器自动打开notebook窗口。此时显示的是`Script`文件夹下的文件目录。

![在这里插入图片描述](https://img-blog.csdn.net/20181013120412852?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### Anaconda 方法

对与初学者而言，还是推荐该使用 Anaconda 来安装 Python 和 Jupyter Notebooks。

在安装 `Anaconda` 的同时会安装Python 和 Jupyter Notebooks这两个工具，并且还包含相当多数据科学和机器学习社区常用的软件包。

可以在[Anaconda官网下载页](https://www.anaconda.com/download/#windows)来下载安装包，它提供了python3.6和python2.7两个版本，可以根据自己的需要来下载对应系统的安装文件。具体的安装步骤可以参考[Windows系统安装Anaconda](https://www.jianshu.com/p/62f155eb6ac5)

### 修改jupyter notebook工作空间

在我们第一次启动Notebooks时，默认显示的是`Script`文件夹下的文件目录。因为此时notebooks默认的工作空间是安装目录。

当然了，你也可以自定义一个专属的工作空间，操作如下：

**1.创建一个文件夹**

此处创建了一个`jupyter-notebook`文件夹，他的目录是`E:\MyTools\Python\jupyter-notebook`

**2.获取jupyter notebook的配置文件**

打开命令提示窗口，执行如下命令：

```
jupyter notebook --generate-config

```

此处需要注意的是，如果你已经配置过notebooks的相关信息，执行此命令会提示你是否覆盖原有配置。如果是首次执行此命令，则生成配置到相应目录。如下图所示，输入`y`直接覆盖

![在这里插入图片描述](https://img-blog.csdn.net/2018101312044865?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

**3.修改配置文件**

打开生成的配置文件，修改`#c.NotebookApp.notebook_dir = ''`此条配置，在单引号中填入我们刚才创建的专属工作空间，此处我这里是`E:\MyTools\Python\jupyter-notebook`，此条配置默认是注释掉的，所以我们需要删除第一个`#`，ok,保存配置文件。

![在这里插入图片描述](https://img-blog.csdn.net/20181013120503832?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

现在打开命令提示窗口，执行`jupyter notebook`重新启动notebooks，浏览器相应会打开notebooks主页，主页中相应会显示工作空间中的文件目录。

**注意：启动notebooks之后，不要不要不要关闭该命令提示窗口，因为一旦关闭该窗口就会与本地服务器断开连接**

### jupyter notebook 基本使用

如果按照上面的操作进行配置后，启动notebooks后的首页应该是这个样子的

![在这里插入图片描述](https://img-blog.csdn.net/20181013120535933?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

下面对首页上的功能按钮进行基本说明：

![在这里插入图片描述](https://img-blog.csdn.net/20181013120556516?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)  

**第一部分介绍：**

- Files：列出所有文件
- Running：展示你当前打开的终端和笔记本
- Clusters：由 IPython 并行提供的（emmmmm，暂时也没使用过）

**第二部分介绍：**  

点击右侧的`New`按钮可展开如图的下拉列表按钮，其内包括了可创建的四种工作环境：

- Python3：创建一个可以执行python代码的文件（`后面详细介绍`）
- Text File：创建文本类型的文件，后缀名为`.txt`
- Folder：创建一个文件夹
- Teminal：在浏览器中打开一的命令窗口

**第三部分介绍：**  

这里的按钮其实就是对当前工作空间内的文件进行复制、重命名等的一系列操作：

- Duplicate：复制文件
- Rename：重命名
- Move：移动文件
- Download：下载文件
- View：在浏览器中预览文件内容
- Edit：编辑文件
- Delete(小图标)：删除选中的文件

### jupyter notebook 中编写并执行python代码

在首页右侧点击`New`，选择点击`Python3`,页面即跳转到一个新的窗口，此时已经创建了一个新的文件，红色区域为该文件的名称(默认为Untitled)，点击即可修改文件名，此处我们命名为`test`，如下所示，  

![在这里插入图片描述](https://img-blog.csdn.net/20181013125151183?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

在`In [ ] :`后面的输入框中我们可以输入一段python代码进行测试，点击Run按钮执行,也可以快捷键`Ctrl+Enter`执行代码，结果如下

![在这里插入图片描述](https://img-blog.csdn.net/20181013125629604?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

Jupyter Notebooks 的强大之处在于除了能够输入代码之外，你还可以用 Markdown 添加叙述性和解释性文本。比如我想添加一个文字说明，在代码上面添加了一个单元格，并以 Markdown 输入了一个文本。按下`Ctrl+Enter`，效果如下:  
![在这里插入图片描述](https://img-blog.csdn.net/20181013130324314?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### jupyter notebook 中的快捷键介绍

当你熟练使用notebooks的基本功能后，掌握他的快捷键是十分必要的，这样可以大大提高你的工作效率。下面是一些比较常用的快捷键：

编辑模式：点击单元格按下`Enter`  
命令模式（退出编辑模式）：`Esc`

进入命令模式之后（此时你没有活跃单元），有以下快捷键：

- `A`：在所选单元之上插入一个新的单元
- `B`：在所选单元之下插入一个新的单元
- `D`：连续按两次删除所选的单元
- `Z`：撤销被删除的单元
- `Y`：将当前选中的单元变成一个代码单元
- `F`：查找和替换
- `Shift +上或下箭头`：可选择多个单元。
- `Shift + M`：在多选模式时，可合并你的选择。

处于编辑模式时（在命令模式时按 Enter 会进入编辑模式），下列快捷键很有用：

- `Ctrl + Home` ：到达单元起始位置
- `Ctrl + S` ：保存进度
- `Ctrl + Enter` ：会运行你的整个单元块
- `Alt + Enter` ：不止会运行你的单元块，还会在下面添加一个新单元
- `Ctrl + Shift + F` ：打开命令面板

可在命令模式按 `H` 或进入`Help > Keyboard Shortcuts`。可以查看键盘快捷键完整列表。如下：  

![在这里插入图片描述](https://img-blog.csdn.net/20181013132202178?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjE5Mzc4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 小结

关于notebooks的安装和基本用法就先介绍到这里了，有兴趣的朋友不妨动手安装一个试试。

<font size=2 color=grey>[阅读原文](https://blog.csdn.net/qq_33619378/article/details/83037106)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
