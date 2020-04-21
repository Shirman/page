anaconda的安装与环境配置
----
<!-- TOC -->

- [**1.下载**](#1下载)
- [**2.安装**](#2安装)
- [**3.配置环境**](#3配置环境)
- [**4.检查**](#4检查)
- [**4.jupyter的使用**](#4jupyter的使用)

<!-- /TOC -->

> 由于python项目经常import各种package，需要预先下载安装对应package，对于非常熟悉python的人来说安装、下载、源、版本等问题会很头疼，anaconda解决这些不重要但又烦人的问题。

  
### **1.下载** 


关于下载有两个方法:  
- anaconda官网下载  

    [下载地址](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.anaconda.com%2Fdistribution%2F)  

    [https://www.anaconda.com/distribution/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.anaconda.com%2Fdistribution%2F)  

    注意选用该电脑相应的系统和64/32位。

    注：该方法下载有点慢

- 镜像下载  

    方法:搜索anaconda清华即可，选择最新版本下载，同时匹配电脑系统Windows和操作系统64位即可。

### **2.安装** 

![](https://upload-images.jianshu.io/upload_images/17567939-ae60316341da1f4f.png)


![](https://upload-images.jianshu.io/upload_images/17567939-c9d73d3e959aa693.png)

![](https://upload-images.jianshu.io/upload_images/17567939-5139e5939bdcf423.png)

  
安装路径最好是默认路径，可以省很多事。当然，如果你熟悉改路径，只要能配置好环境即可。注意：路径中不要出现中文字符。


![](https://upload-images.jianshu.io/upload_images/17567939-bb592ea4cda83d05.png)


  
**一定不要在这一步勾选第一个选项配置环境，后续自己配置环境，否则容易出错，且出错后卸载很麻烦Ծ‸Ծ**   


![](https://upload-images.jianshu.io/upload_images/17567939-0088384c05d730df.png)



![](https://upload-images.jianshu.io/upload_images/17567939-3c6aea84319bb35b.png)


![](https://upload-images.jianshu.io/upload_images/17567939-46a60226d3ff60bc.png)

![](https://upload-images.jianshu.io/upload_images/17567939-41e5e372131b4a66.png)


安装就完毕了。接下来配置环境，在cmd上检查一下就可以了。

### **3.配置环境** 


主要有两个环境的配置:  

- anaconda安装路径

    （为了Python检查正常）:前面安装时路径一定要记清楚，这边默认是C:\\ProgramData\\Anaconda3  

- 安装路径\\scripts（为了conda检查正常）

    只需在上述路径中找到scripts，然后复制路径即可，我的默认路径是C:\\ProgramData\\Anaconda3\\Scripts

上述两个环境变量都是通过：此电脑—右键—高级系统设置—环境变量—系统变量—双击path—新建这两个变量即可。

### **4.检查** 


快捷键：Windows＋R  

或Windows系统—运行—cmd—  

- Python检查  

    输入Python后有如下显示即可证明没有问题

    ![](https://upload-images.jianshu.io/upload_images/17567939-4803bbb298b6ce5c.png)

    注意，不要有warning的信息，否则要找出问题。

- conda  

    输入conda后有如下显示即可证明没有问题

    ![](https://upload-images.jianshu.io/upload_images/17567939-1d6811f0bb568b42.png)


    注意，不要有warning的信息，否则要找出问题。

- 更新升级工具包  

    conda upgrade --all  
    
    之后有提示输入y即可

### **4.jupyter的使用** 


全部安装完成后，使用jupyter时需要注意打开.py文件必须要将文件放入默认路径，否则是打不开的。  

- 默认路径查看

    jupyter notebook打开之后看serving notebooks from local dictionary:**C:\\Users\\Administrator** 。  

    一定要把文件放在默认路径下。

- 改变默认路径  

    以后再说，现在没有改的打算。

    至此，全部安装完毕并能成功打开文件。

<font size=2 color=grey>[阅读原文](https://www.jianshu.com/p/d3a5ec1d9a08)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
