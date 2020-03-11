## windows10安装bower



- [windows10安装bower](#windows10安装bower)
    - [前提](#前提)
    - [安装bower](#安装bower)
    - [检查](#检查)
    - [使用](#使用)
        - [安装](#安装)
        - [更新](#更新)
        - [卸载](#卸载)
    - [与webpack/gulp的关系](#与webpackgulp的关系)



### 前提

安装好npm

检查是否已经安装npm，进入cmd命令行

    npm -v

### 安装bower

全局安装 bower，进入cmd命令行

    npm install bower -g

>npm WARN deprecated bower@1.8.8: We don't recommend using Bower for new projects. Please consider Yarn and Webpack or Parcel. You can read how to migrate legacy project here: https://bower.io/blog/2017/how-to-migrate-away-from-bower/

### 检查

    bower -v

>1.8.8

### 使用

#### 安装

```    
# 模块的名称
$ bower install jquery
# github用户名/项目名
$ bower install jquery/jquery
# git代码仓库地址
$ bower install git://github.com/user/package.git
# 模块网址
$ bower install http://example.com/script.js
```

>所谓"安装"，就是将该模块（以及其依赖的模块）下载到当前目录的bower_components子目录中。下载后，就可以直接插入网页。

```
<script src="/bower_componets/jquery/dist/jquery.min.js">
```

#### 更新
bower update命令用于更新模块:

```
$ bower update jquery
```
>如果不给出模块的名称，则更新所有模块。


#### 卸载

bower uninstall命令用于卸载模块:
```
$ bower uninstall jquery
```

**注意，默认情况下，会连所依赖的模块一起卸载。比如，如果卸载jquery-ui，会连jquery一起卸载，除非还有别的模块依赖jquery。**

### 与webpack/gulp的关系

gulp是工具链，可以配合各种插件做js压缩，css压缩，less编译等工作

webpack是文件打包工具，可以把项目的各种js文、css文件等打包合并成一个或多个文件

bower是包管理器，用来管理你项目里的那些外部依赖的。
