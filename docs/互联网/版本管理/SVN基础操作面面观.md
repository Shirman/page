<!-- TOC -->

- [一、为什么要用svn](#一为什么要用svn)
- [二、svn功能介绍](#二svn功能介绍)
- [三、svn文件状态说明](#三svn文件状态说明)
- [四、windows svn安装](#四windows-svn安装)
- [五、Windows svn操作使用](#五windows-svn操作使用)
    - [1、svn简单操作示意图](#1svn简单操作示意图)
    - [2、svn仓库资源路径](#2svn仓库资源路径)
    - [3、客户端本地检出：](#3客户端本地检出)
    - [4、添加标记](#4添加标记)
    - [5、本地更新update](#5本地更新update)
    - [6、删除](#6删除)
    - [7、重命名&移动](#7重命名移动)
    - [8、查看日志show log](#8查看日志show-log)
    - [9、本地还原revert](#9本地还原revert)
    - [10、锁lock](#10锁lock)
    - [11、清除 clean up](#11清除-clean-up)
    - [12、分支/标记（branch/tag)](#12分支标记branchtag)
    - [13、合并merge](#13合并merge)
    - [14、relocate](#14relocate)
    - [15、patch 补丁](#15patch-补丁)
- [六、冲突与解决](#六冲突与解决)
    - [本地更新及提交冲突](#本地更新及提交冲突)
    - [本地版本合并冲突](#本地版本合并冲突)
    - [解决冲突](#解决冲突)
- [七、冲突解决实例](#七冲突解决实例)
- [八、Commit Monitor](#八commit-monitor)
- [九、svn版本目录管理（branch/tag）](#九svn版本目录管理branchtag)
- [十、Linux环境下svn安装与使用](#十linux环境下svn安装与使用)

<!-- /TOC -->

### 一、为什么要用svn

有很多原因，说几个实际点：

写文档、码代码很辛苦，备份很必要
利于版本管控，管理层可以及时了解团队中小伙伴的进度
团队协作，提高团队工作效率。

工欲善其事必先利其器。


### 二、svn功能介绍

Subversion 是一个开源的版本控制系統。

有一个简单但不十分精确比喻：

svn = 版本控制 + 备份服务器

简单的说，您可以把svn当成您的备份服务器，更好的是，他可以帮您记住每次上传到这个服务器的档案内容。并且自动的赋予每次的变更一个版本。

svn分为服务器端和客户端，通常情况大多人都在客户端操作。


### 三、svn文件状态说明

![normal](/image/svn/svn-status-normal.png)绿色的勾，	表示subversion状态正常。不论是刚检出或是正常更新；

![svn-status-modified](/image/svn/svn-status-modified.png)红色感叹号，表示有文件被修改，且没有提交到版本库中；

![svn-status-conflicted](/image/svn/svn-status-conflicted.png)在提交过程中出现了冲突，图标显示黄色感叹号；

![svn-status-locked](/image/svn/svn-status-locked.png)加锁图标，	表示有一个文件加了锁，同时也在提醒：如果不使用改文件的话，要记得释放锁，否则其他人将无法对该文件进行修改；

![svn-status-deleted](/image/svn/svn-status-deleted.png)红色的叉，	表示当前文件夹下的某些文件或文件夹被计划从版本控制中删除，或是该文件夹下某个受控的文件丢失了；

![added](/image/svn/svn-status-added.png)蓝色加号，	表示我们有一个文件或是目录已经被加入版本控制中。


### 四、windows svn安装

下载Windows 端程序：http://tortoisesvn.net/downloads


执行下载回来的Tortoisesvn 安装程序，正确安装后，不知道现在的版本和windows是否要求重启电脑。这里忽略安装过程，有问题的话，可以找你身边的开发帅哥们。


**Windows安装及汉化**

安装及汉化参考1：http://jingyan.baidu.com/article/0aa223758081b788cc0d64e7.html

安装及汉化参考2：http://jingyan.baidu.com/article/48b558e32b9ab27f39c09a50.html

### 五、Windows svn操作使用

#### 1、svn简单操作示意图

![svn简单操作示意图](/image/svn/svn-use-sample.png)

**常用功能：**

checkout检出、add添加、commit提交、update更新、删除、重命名、移动、show log日志

**更多功能：**

revert还原、get lock上锁、release lock释放锁、clean up清除、branch分支、tag标签、switch切换分支、merge合并、resolve解决冲突、relocate重新定位、create patch、apply patch

![更多功能](/image/svn/w-svn-use-000.png)


#### 2、svn仓库资源路径

假设有个项目叫chineseapple，首先svn管理员会在svn服务端创建一个svn项目，并提供一个项目svn路径。
管理员在svn管理后台创建了一个svn项目目录，这个目录有svn仓库的地址（至于权限的问题，管理员关心，使用者不用关心）

#### 3、客户端本地检出：

本地创建一个chineseapple的目录

![更多功能](/image/svn/w-svn-use-002.png)

右键找到svn checkout（检出）	 

![更多功能](/image/svn/w-svn-use-003.png)

检出时，如果是私有不公开的svn仓库，需要输入svn帐户和密码。

![更多功能](/image/svn/w-svn-use-006.png)

完成检出checkout

![更多功能](/image/svn/w-svn-use-004.png)

![更多功能](/image/svn/w-svn-use-005.png)

svn会在您的chinesapple工作目录下，以及其子目录下建立这个.svn的子目录。您不应该进去这个目录，尤其不应该更动这个目录下面的任何内容。否则会很可能会造成svn无法正常运作。

![更多功能](/image/svn/w-svn-use-007.png)
	
#### 4、添加标记

尝试在工作目录下创建一个starry的文件，然后加了些文字

![更多功能](/image/svn/w-svn-use-009.png)

点击添加add操作，弹出：

![更多功能](/image/svn/w-svn-use-010.png)

![更多功能](/image/svn/w-svn-use-011.png)

提交commit文档，提交时备注简要信息，可以供自己或他人查找版本时，了解该版本更新了什么内容

![更多功能](/image/svn/w-svn-use-012.png)

一般在需要和svn服务器交互时，比如提交，会要求再次输入帐号密码，如果觉得电脑环境安全靠谱，可以记住授权	  

![更多功能](/image/svn/w-svn-use-013.png)

![更多功能](/image/svn/w-svn-use-014.png)


这个时候就可以在svn服务器上看到starry这个文件了（我们不关心，只要知道）


#### 5、本地更新update

为什么会用到更新？

团队协作，提交到svn的文档，团队里有权限的成员都可以更新到本地并做修改再提交。

比如说有个新人叫小明，小明也在自己电脑checkout检出svn目录，小明就看到了starry的文件，小明的英语可能比较好，就随手翻译了里面的内容并加进点英文介绍。

小明为了让所其他人看得到英文版的介绍，他准备提交文件starry到svn，当然小明还有个未完成的文件xiaoming，他暂时不想提交，小明做了以下操作：

![更多功能](/image/svn/w-svn-use-017.png)

![更多功能](/image/svn/w-svn-use-018.png)

这个时候要看小明的英文介绍，需要去更新我们自己的工作副本目录：
更新工作目录svn update：

![更多功能](/image/svn/w-svn-use-019.png)

更新后可以看到更新了starry文件 版本3：

![更多功能](/image/svn/w-svn-use-020.png)

为了大概知道更新了什么，可以用右下角的show log查看日志：

![更多功能](/image/svn/w-svn-use-021.png)

然后你可能决定夸下小明，就在starry尾部追加了夸奖，并提交commit：

![更多功能](/image/svn/w-svn-use-023.png)

当然小明明天早上起来更新工作目录的时候，会发现你夸奖了他。

后面再说为什么更新很重要。

#### 6、删除	

你可以用svn上的删除操作

![更多功能](/image/svn/w-svn-use-024.png)

也可以直接手动删除；

两种删除方式，最后都要提交commit告诉svn服务器这个版本删除某个文件；

![更多功能](/image/svn/w-svn-use-025.png)

![更多功能](/image/svn/w-svn-use-026.png)


#### 7、重命名&移动

重命名和移动，在计算机里被定义为复制再删除。等价于新建文档，再删除旧文档。

根据之前添加、删除的操作，我们可以用以下操作：

正常重命名、复制或移动文档后，在svn工作目录下，添加add，再提交commit即可。

#### 8、查看日志show log

show log 可以查看svn仓库的所有提交等操作日志，可以查看谁在什么时间对什么文档做了什么操作。

![更多功能](/image/svn/w-svn-use-027.png)

在查看日志界面上有很多功能，比较文档、创建分支标签、还原版本、合并版本等

![更多功能](/image/svn/w-svn-use-028.png)

这里先介绍文档比较，后面陆续介绍其他功能；
双击上图中红框中的路径文本链接，svn会对当前版本和上一个版本进行比较。


#### 9、本地还原revert

默认还原到最新版本，将最新版本中被修改、被删除的文档都还原到最新版本状态。

![更多功能](/image/svn/w-svn-use-030.png)

![更多功能](/image/svn/w-svn-use-031.png)

当然还可以还原回滚到指定版本:

![更多功能](/image/svn/w-svn-use-032.png)

#### 10、锁lock

上锁get lock：
比如你可能在改一个很重要的文件，为了防止出现别人也在改的情况，你就提前锁住这个文件：

![更多功能](/image/svn/w-svn-use-033.png)

可能小明刚好也要改这个文件，这时小明修改了文件但是提交不了；

![更多功能](/image/svn/w-svn-use-035.png)

![更多功能](/image/svn/w-svn-use-034.png)

直到你亲自释放锁release lock：

![更多功能](/image/svn/w-svn-use-036.png)

释放锁后，小明就可以update更新工作目录，没有出现冲突的情况下，就可以再次提交了

![更多功能](/image/svn/w-svn-use-037.png)

![更多功能](/image/svn/w-svn-use-038.png)



#### 11、清除 clean up

svn 本地更新时，由于一些操作中断更新，如磁盘空间不够，用户取消，可能会造成本地文件被锁定的情况。

一般出现这种情况的解决方法：使用svn clean up来清除锁定。

当然像之前对文件上锁，如果你忘了释放锁，就会导致其他协作伙伴不能提交，也可以直接使用clean up，或者手动到.svn目录中删除.lock的文件。

#### 12、分支/标记（branch/tag)

svn中分支和标记操作一样，只是你心里要给当前这个copy叫分支和标记的区别。

说到分支，一般把第一份文档代码放入trunk的目录，表示主干分支，长期正常开发使用。

而在trunk的平行目录里创建branchs和tags目录，tags目录用于存放每一次可以发布的版本（from trunk），
branchs目录用于存放每一次版本release后做bug修复分支版本（from tags）；

![更多功能](/image/svn/w-svn-use-043.png)


创建branch/tag：

![更多功能](/image/svn/w-svn-use-039.png)

![更多功能](/image/svn/w-svn-use-040.png)


切换到branch/tag：

![更多功能](/image/svn/w-svn-use-041.png)


![更多功能](/image/svn/w-svn-use-042.png)


#### 13、合并merge

进入合并目的目录，比如要合并到trunk，进入trunk目录，点击merge操作；

选择适合合并到trunk的类型，有些版本有三个类型，有的两个类型

![更多功能](/image/svn/w-svn-use-044.png)

选择合并来源

![更多功能](/image/svn/w-svn-use-045.png)

选择来源分支，bug_fix修复分支

![更多功能](/image/svn/w-svn-use-046.png)

![更多功能](/image/svn/w-svn-use-047.png)

![更多功能](/image/svn/w-svn-use-048.png)

合并一般不出现冲突的情况下会自动合并

![更多功能](/image/svn/w-svn-use-049.png)

合并结果，不出现冲突（合并的时候会提示是否冲突）情况下，及时提交commit目的目录

![更多功能](/image/svn/w-svn-use-050.png)


#### 14、relocate

假设哪天，某个项目的svn路径更改了，那么不需要重新checkout，只需要relocate 路径即可。

![更多功能](/image/svn/w-svn-use-064.png)


#### 15、patch 补丁

没使用过，留给勤奋的人去研究。


### 六、冲突与解决

冲突一般出现以下两种场景：

>本地更新及提交冲突
>
>版本合并冲突；

#### 本地更新及提交冲突

团队协同工作时，当多位团队成员同时修改同一个文件，造成本地文件与svn系统中的文件版本不一致，而导致文件无法更新或提交的情况。

**产生原因：**

当团队协同工作的时候，多位团队成员同时操作一个文件。团队成员A操作完成后，将该文件提交到svn上，此时，其他成员的本地文件与svn上的文件版本不一致。

当团队成员B操作完成并对文件进行提交操作时，就会产生冲突。	


#### 本地版本合并冲突

在多分支管理下，经常需要把分支合并到主干上，当分支和主干修改了同一个文件，则在合并时，可能出现无法自动完成合并的情况。

**产生原因：**

项目版本管理需要，无法避免。	

#### 解决冲突

不论是否遇到冲突，应该养成一个好的习惯：提交前先更新。可以最大限度的避免不必要的冲突。

更新时文件还是冲突了或者版本合并冲突，都可以根据svn工具提供的冲突文件，选择需要的版本文件或模块或行，甚至手动修改行。	

		
### 七、冲突解决实例

背景：其他成员已经更新了starry文件，但小明还不知道，又在starry改了点东西

![更多功能](/image/svn/w-svn-use-051.png)


在未更新的情况下，小明主动提交了starry文件

![更多功能](/image/svn/w-svn-use-052.png)


提交的时候，冲突了

![更多功能](/image/svn/w-svn-use-053.png)


那小明就先更新下，再提交，真不巧，就碰上了本地更新冲突

![更多功能](/image/svn/w-svn-use-054.png)


双击红色冲突文件,开始解决本地冲突,：

![更多功能](/image/svn/w-svn-use-059.png)


解决同一行冲突

![更多功能](/image/svn/w-svn-use-060.png)


冲突解决结果

![更多功能](/image/svn/w-svn-use-061.png)


标记冲突解决

![更多功能](/image/svn/w-svn-use-062.png)


解决完冲突，再提交

【本地版本合并代码，处理冲突方式与解决本地更新冲突类似】


### 八、Commit Monitor

检测及提示团队其他成员svn提交操作。对于管理层、测试或经常与小伙伴协作同一个文件的童鞋很有用处。

![更多功能](/image/svn/w-svn-monitor-001.png)



### 九、svn版本目录管理（branch/tag）

![更多功能](/image/svn/svn-branch-dir-use.png)

详见[SVN目录结构规划](/版本管理/SVN目录结构规划.md)

### 十、Linux环境下svn安装与使用

环境：centos6.4

    yum -y install subversion

环境：ubuntu 12.04

    sudo apt-get install subversion  

当然也可以自己编译比较新的svn版本。

svn常用命令：

详见[SVN常用基本命令](/版本管理/SVN常用基本命令.md)


-----
条件允许的话，建议使用git管理。
@tsingchan












	
	
	
	
			
	
	
	
	
	

	
