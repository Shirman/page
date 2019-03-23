


- [安装](#安装)
    - [CDN安装](#cdn安装)
    - [NPM安装](#npm安装)
- [基础](#基础)
    - [色彩](#色彩)
    - [字体](#字体)
    - [按钮](#按钮)
    - [图标](#图标)
- [布局](#布局)
    - [栅栏grid](#栅栏grid)
    - [布局layout](#布局layout)
- [导航](#导航)
- [表单](#表单)
- [视图](#视图)
- [图表](#图表)
- [其他](#其他)


[iView](https://www.iviewui.com)


### 安装

#### CDN安装

只要引入vue.js iview.js及iview.css 文件即可：

```
<!-- import Vue.js -->
<script src="//vuejs.org/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="//unpkg.com/iview/dist/styles/iview.css">
<!-- import iView -->
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
```

#### NPM安装

为更好享受生态及更好与webpack使用：

```
$ npm install iview --save
```


### 基础

#### 色彩

主色：默认安全色蓝色为主色调

辅助色：代表性颜色，信心提示类

中性色：文本、背景、边框、阴影等提现层次结构的颜色。


#### 字体

```
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

```

建议按照iview字体建议设计。


#### 按钮

参考按钮示例：[点击查看iview按钮示例](https://www.iviewui.com/components/button)


```
<template>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br><br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
</template>
```


> 注意iview提供了标签上各种属性api，支持按钮类型、形状、大小、状态、组合、自定义图标等

#### 图标

```
<Icon type="ios-checkmark" />
```

渲染后：
```
<i class="ivu-icon ivu-icon-ios-checkmark"></i>
```

    标签属性：
    type：图标的名称
    size：图标的大小，单位px
    color：图标的颜色
    custom：自定图标

查看并使用所有iview自带图标：[点击查看iview所有icon](https://www.iviewui.com/components/icon)

### 布局

#### 栅栏grid

> 采用了24栅格系统，将区域进行24等分，这样可以轻松应对大部分布局问题。使用栅格系统进行网页布局，可以使页面排版美观、舒适。

两个概念：行row 与 列col


```
<template>
    <Row>
        <Col span="12">col-12</Col>
        <Col span="12">col-12</Col>
    </Row>
    <br>
</template>
```

除了span可以定义列的大小外，iview还提供了：

order改变列表顺序

push与pull设置改变顺序

offset便宜栅栏

justify定义排列方式，start、end、center等

align定义上下排列方式，top、bottom、middle

**响应式** ：:xs :sm :md :lg :xl :xxl，以上属性可以通过内嵌到xs等属性中实现其他属性的响应式：


```
<template>
    <Row>
        <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
        <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
        <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
    </Row>
</template>
```


#### 布局layout

组件概述：

- Layout：布局容器，其下可嵌套 HeaderSiderContentFooter或 Layout 本身，可以放在任何父容器中。

- Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

- Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。

- Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

- Footer：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。


参考布局示例：[iview布局示例代码](https://www.iviewui.com/components/layout)


典型页面布局

上中下布局：使用用户上下浏览，较为经典的网站导航模式，例如门户站点、导航网站

顶部-侧边布局-通栏：同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站，如应用管理后台

顶部-侧边布局：拥有顶部导航及侧边栏的页面，多用于展示类网站，例如cms系统


侧边布局：侧边两列式布局。页面横向空间有限时，侧边导航可收起。

响应式布局：Sider支持响应式布局

### 导航 
### 表单 
### 视图 
### 图表 
### 其他

---- 

以上只要浏览iview官方文档示例即可，心中知道有哪些组件及能实现什么样的组件效果，考虑需求设计时才会自然而然的想到组件，并参考示例运用。

总结：iview api、组件齐全、配置项丰富、样式风格统一、基本可以不用考虑layer之类的前端ui或交互第三方组件。



