

> docsify,A magical documentation site generator.
>
> docsify，一个神奇的文档网站生成器。

## 参考文档

https://docsify.js.org/#/zh-cn/

## 安装

这个安装，指的是自动配置文档网站的工具，其实是为了一开始方便创建docsify的相关文件及本地可以预览文档网站。

推荐安装 docsify-cli 工具，可以方便创建及本地预览文档网站。

```
npm i docsify-cli -g
```

如果没有安装npm，可以在9ong.com左上角搜索：npm

会看到一篇：
[windows10搭建nodejs+npm环境](http://www.9ong.com/#/互联网/开发环境/windows10搭建nodejs+npm环境?id=window10%e7%8e%af%e5%a2%83%e6%90%ad%e5%bb%banodejs%e4%b8%8enpm%e7%8e%af%e5%a2%83)

## 初始化

如果想在项目的 ./docs 目录里写文档，直接通过 init 初始化项目。

```
docsify init ./docs
```

## 写文档

初始化成功后，可以看到 ./docs 目录下创建的几个文件

- index.html 入口文件
- README.md 会做为主页内容渲染
- .nojekyll 用于阻止 GitHub Pages 会忽略掉下划线开头的文件

直接编辑 docs/README.md 就能更新网站内容，当然也可以写多个页面

[官方文档](https://docsify.js.org/#/zh-cn/quickstart)

## 本地预览

运行一个本地服务器通过 docsify serve 可以方便的预览效果，而且提供 LiveReload 功能，可以让实时的预览。默认访问 http://localhost:3000 。

```
docsify serve docs
```

## docsify-cli

https://github.com/docsifyjs/docsify-cli

## 配置

配置项，主要是index.html中的js参数配置，用于定制我们的文档网站，比如名称、logo、左侧边栏、导航栏、主题色等等

详见：[官方文档](https://docsify.js.org/#/zh-cn/configuration)

## 部署

本地预览ok后，就可以将网站部署到网上，提供提其他朋友访问。

以下常用的3中部署方式：


### github page

好处：

- 可以自定义域名（无需备案）
- 只要代码push到github仓库，即可自动编译更新
- 免流量消耗、资源cdn更好

不好：
- 不会被百度收录
- 国内网速偶尔短路，比如刚才刚部署完云主机，github.io就短路了3分钟
- 

### gitlab

如果团队内部有在使用自有的gitlab，放内部使用的一些文档是个不错的选择

参考官方文档部署

### VPS

这个只要有nginx就可以了，不论是本地、虚拟机、内网电脑、云主机、VPS都可以，

和部署所有静态网站一样，只需将服务器的访问根目录设定为 index.html 文件。

### nginx配置

官方推荐配置：

```
server {
  listen 80;
  server_name  your.domain.com;

  location / {
    alias /path/to/dir/of/docs;
    index index.html;
  }
}
```

如果以上方案报403错误，可以尝试以下方案，与nginx版本有关：

```
server {
    listen   80;
    index   index.html;
    server_name  www.9ong.com;
    root /your/docsify/docs/;

    location / {

    }

}

```

### git推送更新

搜索本站左上角关键字：GIT

参考本站[版本管理/服务端代码自动部署GIT方式]

更多部署方式参考[官方文档](https://docsify.js.org/#/zh-cn/deploy)


## 插件
https://docsify.js.org/#/zh-cn/awesome?id=plugins

- 白天黑夜模式切换
https://github.com/anikethsaha/docsify-plugin/tree/master/packages/docsify-dark-mode

- 代码高亮

https://docsify.js.org/#/zh-cn/language-highlight

## PWA离线模式

https://docsify.js.org/#/zh-cn/pwa

## 统计

除了官方指定ga外，还可以用百度统计


## 其他问题


- 图床

大部分使用docsify的用户，都或多或少使用第三方的图床或图片，部分图床和图片是限制外链访问的，很多人在页面header上加上了no-referer的meta标签，导致百度等统计组件失效。

如果为了统计正常及图片正常访问，我们可以将图片放到一些有免费空间和流量的云服务商，比如七牛、又拍云等

个人自己写了一键转换md文件所有图片的python脚本，有需要可以联系我，或者到[github](https://github.com/tsingchan)上，在page仓库script/python/qiniu-img-class.py

- cdn

默认采用unpkg.com

国内偶然速度慢

可以使用知乎的unpkg.zhimg.com

知乎没有公开，但少人用应该没有问题

[@tsingchan](https://github.com/tsingchan)

