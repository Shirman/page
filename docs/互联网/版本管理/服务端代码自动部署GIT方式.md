<!-- TOC -->

- [前言](#前言)
- [Git客户端推送更新方式](#git客户端推送更新方式)
- [远程服务端配置](#远程服务端配置)
- [本地客户端检出与推送](#本地客户端检出与推送)
    - [命令行方式](#命令行方式)
    - [TortoiseGit客户端方式](#tortoisegit客户端方式)
- [服务端代码更新操作（第一次）](#服务端代码更新操作第一次)
- [服务端代码更新（后续）](#服务端代码更新后续)
- [代码回滚](#代码回滚)
    - [服务器上回滚](#服务器上回滚)
- [疑问 & 其他：](#疑问--其他)
- [附：hooks shell 范例](#附hooks-shell-范例)

<!-- /TOC -->

### 前言
记得第一次负责服务端开发及部署线上服务器时，对于服务器项目代码的更新很是疑惑，如何增量更新代码成为一个不小的难题，特别是对于花钱买服务的客户来说，他们不容许你在白天出那么一小会的一丁点的问题。

见过项目复杂到配置需要手动配置，导致代码更新需要开发与测试写成更新计划：哪个文件要替换，哪个文件第几行需要换成什么参数如此之类的；

也见过负责更新服务端代码的哥们因为太累看错了参数，参数复制错了服务器；

也见过简单点的部署方式是服务器直接从svn或git上直接拉代码下来，再进行手动修改相关配置等，但这样需要一个公共的svn或git帐号而且需要在服务器上操作更新，对服务端操作不熟练的负责人，使得服务器安全没有足够的保证。


### Git客户端推送更新方式

服务器的代码由客户端推送到正式服务器，git服务自动强制更新代码，并由git自带hooks执行相应脚本操作文件增\删\改\链接等配置操作；不需要连接服务器，不需要手动更改代码相关配置，对服务器更安全，操作者更简单便捷。


### 远程服务端配置

注：以下工作在root下操作：

1. 确保安装了git服务：

    ubuntu:

    ```> apt-get install git ```

    centos： 

    ```> yum install git-core```
    

2. 配置部署代码的属组、属主：

    ```> useradd -m user_9```

    ```> passwd password_9```
    
3. 新建一个目录作为要部署代码的根目录，如：

    ```> mkdir /www/999/```

4. 授权属主和属组

    ```> chown user_9.user_9 /www/999/```

5.  切换到部署代码的属主

    ``` > su user_9```

6. 进入项目目录，初始化git仓库	   

    ```> cd /www/999 ```

    ```> git init```

    >在当前目录下生成文件目录：/www/9ong/.git

7. 允许仓库接受提交到主分支

    ```> git config receive.denyCurrentBranch ignore```

    >到这里git仓库就在服务器上创建好了，
    >
    >仓库的地址为：
    >
    >ssh://user_9@xx.xx.xx.xx:/www/999/.git

### 本地客户端检出与推送

#### 命令行方式

1. 从项目代码托管的git服务商（比如github）仓库上将代码获取到本地;
    ```> git clone ```
    
    ```> git pull origin master```

2. 将新建的自有远程仓库添加到本地远程仓库列表，使用名字来区分不同的仓库地址，如999-server;

    ```> git remote add 999-server ssh://user_9@xx.xx.xx.xx:/www/999/.git```

3. 将本地代码提交到自有远程服务器仓库

    ```> git push 999-server master```

    >注：如果不确定分支是否master，一定要写实际要推送的分支名称；

#### TortoiseGit客户端方式

>假设本地客户端已有项目代码。


1. 修改代码并commit到本地

2. 推送代码到自有远程服务器（不是托管代码的git服务器比如github gitlab等）

3. 推送输入自有服务器指定部署属主（如user_9）的密码

4. 推送成功，自有远程服务器更新代码




### 服务端代码更新操作（第一次）

1. 进入项目目录：

    ```> cd /www/999```

    ```> git update-server-info  ```

    ```> git checkout master  ```

    \* 如果有分支的注意：git checkout 分支名称 

2. 设置服务端更新钩子 post-update

    ```> cd .git/hooks```

    \* 目录下的hooks文件默认以sample结尾是不会被执行的，只有去掉sample后才会被git调用；

    如新建 post-update 或将 post-update.sample 重命名为 post-update;

写入：
```
#!/bin/sh
#post-update：git 在push操作后将自动执行checkout检出最新代码
#
# An example hook script to prepare a packed repository for use over
# dumb transports.
#
# To enable this hook, rename this file to "post-update".

#exec git update-server-info
unset GIT_DIR
cd ..
#pwd >> /tmp/pwd.log
git checkout -f 

```

### 服务端代码更新（后续）

1. 项目托管服务git有更新时，pull 更新本地部署仓库

2. 从本地客户端push 到线上服务器进行测试（专门的测试地址或测试服务器）

3. 测试通过之后 push 到正式服务器进行正式远程服务器

### 代码回滚

#### 服务器上回滚

1. 通过git log 或git reflog查看要回滚到的版本

    ```> Git log```

2. 我们尝试回滚到版本

    5d92da49449748e83098992a342f35510a47218f

    ```> sudo git reset --hard 5d92da49449748e83098992a342f35510a47218f```

    >结果：HEAD is now at 5d92da4 ssss


3. 是否可以再回滚到push时的版本？

    通过git reflog 可以看到（git log查看不到删除的commit）

    5d92da49449748e83098992a342f35510a47218f

    我们回滚最新的代码就是最后一次push的版本78649bd:

    ```> Git reset --hard 78649bd```

4. 回滚版本后是否可以继续push代码并自动更新？
    
    可以的。

    仍然是正常的push到服务器上，并执行hooks。（检出时注意检出的分支）

### 疑问 & 其他：

1. 在push的时候可能会有小伙伴碰到以下的问题：

	问题 : git-receive-pack  not found

    解决：ln -s /usr/local/git/bin/git-receive-pack /usr/bin/git-receive-pack


### 附：hooks shell 范例


1、 post-checkout：第一次checkout时自动做配置目录或文件的软链接

```
#!/bin/sh
#post-checkout：第一次checkout时自动做配置目录或文件的软链接

unset GIT_DIR
#cd ..

pwd >>/tmp/pwd.log
config_dir='./config/'

if [ ! -d "$config_dir" ]; then
        pwd "$config_dir">> /tmp/config.dir.log
        whoami >>/tmp/whoami.log
        ln -s ./config_testing ./config
fi

```

2、push后服务器自动检出最新代码

```
#!/bin/sh
#post-update：push后服务器自动检出最新代码
#
# An example hook script to prepare a packed repository for use over
# dumb transports.
#
# To enable this hook, rename this file to "post-update".

#exec git update-server-info
unset GIT_DIR
cd ..
pwd >> /tmp/pwd.log
git checkout -f 

```




