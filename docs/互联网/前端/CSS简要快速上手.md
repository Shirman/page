CSS简要快速上手
====

> 适合未专注于前端的其他开发人员，当然初步学习的前端也可以阅读。文末推荐了一个通俗易懂的学习CSS布局的站点。


- [格式化排版](#格式化排版)
- [CSS 盒模型](#css-盒模型)
    - [块级元素](#块级元素)
    - [内联元素](#内联元素)
    - [内联块状元素](#内联块状元素)
    - [边框](#边框)
    - [内填充](#内填充)
    - [外边距](#外边距)
    - [宽度和高度](#宽度和高度)
- [布局模型](#布局模型)
    - [流动模型 Flow](#流动模型-flow)
    - [浮动模型 Float](#浮动模型-float)
    - [层模型 Layer](#层模型-layer)
- [其他技巧](#其他技巧)
    - [长度值](#长度值)
    - [display属性](#display属性)
    - [flexbox简单布局（display:flex）](#flexbox简单布局displayflex)
    - [flexbox实现垂直居中](#flexbox实现垂直居中)
    - [水平居中设置-行内元素](#水平居中设置-行内元素)
    - [水平居中-块级元素](#水平居中-块级元素)
    - [垂直居中-单行文本](#垂直居中-单行文本)
    - [垂直居中-多行文本 table td](#垂直居中-多行文本-table-td)
    - [垂直居中-多行文本 table-cell](#垂直居中-多行文本-table-cell)
    - [媒体查询（响应式）](#媒体查询响应式)
- [其他](#其他)



## 格式化排版

字体

    body{font-family:"Microsoft Yahei";}

字号与颜色

    body{font-size:12px;color:#666}

粗体

    p span{font-weight:bold;}

斜体

    p a{font-style:italic;}

下划线

    p a{text-decoration:underline;}

删除线
    
    span{text-decoration:line-through;}

缩进

    p{text-indent:2em;}

> 2em 意思是文字的两倍大小

行间距

    p{line-height:2em;}


中文字间隔、字母间隔设置：

    h1{
        letter-spacing:50px;
    }

单词间距设置：

    h1{
        word-spacing:50px;
    }

段落对齐

    div{text-align:center;}



## CSS 盒模型

标签元素大体被分为三种不同的类型：`块状元素`、`内联元素`(又叫`行内元素`)和`内联块状元素`。

常用的块状元素有：

    <div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>

常用的内联元素有：

    <a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>

常用的内联块状元素有：

    <img>、<input>

### 块级元素

什么是块级元素？在html中`<div>`、 `<p>`、`<h1>`、`<form>`、`<ul>` 和 `<li>`就是块级元素。设置display:block就是将元素显示为块级元素。如下代码就是将内联元素a转换为块状元素，从而使a元素具有块状元素特点。

    a{display:block;}

**块级元素特点**：

1、占用一行：每个块级元素都从新的一行开始，并且其后的元素也另起一行。

2、可设置：元素的高度、宽度、行高以及顶和底边距都可设置。

3、默认100%：元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。


### 内联元素

在html中，`<span>`、`<a>`、`<label>`、 `<strong>` 和`<em>`就是典型的内联元素（行内元素）（inline）元素。当然块状元素也可以通过代码display:inline将元素设置为内联元素。如下代码就是将块状元素div转换为内联元素，从而使 div 元素具有内联元素特点。

    div{
        display:inline;
    }


**内联元素特点**：

1、共用一行：和其他元素都在一行上；

2、不可设置：元素的高度、宽度及顶部和底部边距不可设置；

3、不可改变：元素的宽度就是它包含的文字或图片的宽度，不可改变。



### 内联块状元素

内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点，代码 `display:inline-block` 就是将元素设置为内联块状元素。(css2.1新增)，`<img>`、`<input>`标签就是这种内联块状标签。

**内联块状元素特点**：

1、共用一行：和其他元素都在一行上；

2、可设置：元素的高度、宽度、行高以及顶和底边距都可设置。


### 边框

盒子模型的边框就是围绕着内容及补白的线，这条线你可以设置它的粗细、样式和颜色(边框三个属性)。

如下面代码为 div 来设置边框粗细为 2px、样式为实心的、颜色为红色的边框：

    div{
        border:2px  solid  red;
    }

上面是 border 代码的缩写形式，可以分开写：

    div{
        border-width:2px;
        border-style:solid;
        border-color:red;
    }

注意：

1、border-style（边框样式）常见样式有：

dashed（虚线）| dotted（点线）| solid（实线）。


2、border-color（边框颜色）中的颜色可设置为十六进制颜色，如:

border-color:#888;//前面的井号不要忘掉。

3、border-width（边框宽度）中的宽度也可以设置为：

thin | medium | thick（但不是很常用），最常还是用像素（px）。

如果有想为 p 标签单独设置下边框，而其它三边都不设置边框样式怎么办呢？css 样式中允许只为一个方向的边框设置样式：

    div{border-bottom:1px solid red;}
    


### 内填充

元素内容与边框之间是可以设置距离的，称之为“填充”。填充也可分为上、右、下、左(顺时针)。如下代码：

    div{padding:20px 10px 15px 30px;}

顺序一定不要搞混。可以分开写上面代码：

    div{
        padding-top:20px;
        padding-right:10px;
        padding-bottom:15px;
        padding-left:30px;
    }

如果上、右、下、左的填充都为10px;可以这么写

    div{padding:10px;}

如果上下填充一样为10px，左右一样为20px，可以这么写：

    div{padding:10px 20px;}

### 外边距

元素与其它元素之间的距离可以使用边界（margin）来设置。边界也是可分为上、右、下、左。如下代码：

    div{margin:20px 10px 15px 30px;}

也可以分开写：

    div{
        margin-top:20px;
        margin-right:10px;
        margin-bottom:15px;
        margin-left:30px;
    }
如果上右下左的边界都为10px;可以这么写：

    div{ margin:10px;}

如果上下边界一样为10px，左右一样为20px，可以这么写：

    div{ margin:10px 20px;}


### 宽度和高度

![](http://pic.3513.top/github/page/6ab2a8de6502ef5878f9cf18d753986e.jpg)

![](http://pic.3513.top/github/page/2ce706110a00f9ff47150eb7e3a4cb21.jpg)



## 布局模型

布局模型与盒模型一样都是 CSS 最基本、 最核心的概念。 但布局模型是建立在盒模型基础之上，布局模型是本，CSS 布局模板就是末了，是外在的表现形式。 

CSS包含3种基本的布局模型，用英文概括为：`Flow`、`Layer` 和 `Float`。

在网页中，元素有三种布局模型：
- 1、流动模型（Flow）
- 2、浮动模型 (Float)
- 3、层模型（Layer）

### 流动模型 Flow
先来说一说流动模型，流动（Flow）是默认的网页布局模式。也就是说网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。

流动布局模型具有2个比较典型的特征：

第一点，块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布，因为在默认状态下，块状元素的宽度都为100%。实际上，块状元素都会以行的形式占据位置。如右侧代码编辑器中三个块状元素标签(div，h1，p)宽度显示为100%。

第二点，在流动模型下，内联元素都会在所处的包含元素内从左到右水平分布显示。（内联元素可不像块状元素这么霸道独占一行）

右侧代码编辑器中内联元素标签a、span、em、strong都是内联元素。

### 浮动模型 Float

块状元素这么霸道都是独占一行，如果现在我们想让两个块状元素并排显示，怎么办呢？不要着急，设置元素浮动就可以实现这一愿望。

任何元素在默认情况下是不能浮动的，但可以用 CSS 定义为浮动，如 div、p、table、img 等元素都可以被定义为浮动。如下代码可以实现两个 div 元素一行显示。

    div{
        width:200px;
        height:200px;
        border:2px red solid;
        float:left;
    }
    <div id="div1"></div>
    <div id="div2"></div>

![](http://img.mukewang.com/540e62c60001c56a06760417.jpg)

### 层模型 Layer

如何让html元素在网页中精确定位，就像图像软件PhotoShop中的图层一样可以对每个图层能够精确定位操作。CSS定义了一组定位（positioning）属性来支持层布局模型。

层模型有三种形式：

1、绝对定位(position: absolute)

2、相对定位(position: relative)

3、固定定位(position: fixed)


**绝对定位：**

如果想为元素设置层模型中的绝对定位，需要设置`position:absolute`(表示绝对定位)，**这条语句的作用将元素从文档流中拖出来**，然后使用left、right、top、bottom属性**相对于其最接近的一个具有定位属性的父包含块**进行绝对定位。如果不存在这样的包含块，则相对于body元素，即相对于浏览器窗口。

如下面代码可以实现div元素相对于浏览器窗口向右移动100px，向下移动50px。

    div{
        width:200px;
        height:200px;
        border:2px red solid;
        position:absolute;
        left:100px;
        top:50px;
    }
    <div id="div1"></div>

![](http://img.mukewang.com/53a00b130001e86707360547.jpg)


**相对定位：**

如果想为元素设置层模型中的相对定位，需要设置`position:relative`（表示相对定位），它通过left、right、top、bottom属性确定元素在**正常文档流中**的偏移位置。相对定位完成的过程是首先按static(float)方式生成一个元素(并且元素像层一样浮动了起来)，然后**相对于以前的位置移动**，移动的方向和幅度由left、right、top、bottom属性确定，**偏移前的位置保留不动**。

如下代码实现相对于以前位置向下移动50px，向右移动100px;

    #div1{
        width:200px;
        height:200px;
        border:2px red solid;
        position:relative;
        left:100px;
        top:20px;
    }

    <div id="div1"></div>


<div class="divrelative"></div>


<style>
div.divrelative{
    width:200px;
    height:200px;
    border:2px red solid;
    position:relative;
    left:100px;
    top:20px;
}
</style>

-----
> 底部


**固定定位：**

fixed：表示固定定位，与absolute定位类型类似，但它的相对移动的坐标是视图（**屏幕内的网页窗口**）本身。由于视图本身是固定的，它不会随浏览器窗口的滚动条滚动而变化，除非你在屏幕中移动浏览器窗口的屏幕位置，或改变浏览器窗口的显示大小，**因此固定定位的元素会始终位于浏览器窗口内视图的某个位置，不会受文档流动影响**，这与background-attachment:fixed;属性功能相同。

以下代码可以实现相对于浏览器视图向右移动100px，向下移动50px。并且拖动滚动条时位置固定不变。

    #div1{
        width:200px;
        height:200px;
        border:2px red solid;
        position:fixed;
        left:100px;
        top:50px;
    }
    <p>zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz。</p>
    ....


**相对定位与绝对定位结合使用：**

使用position:absolute可以实现被设置元素相对于浏览器（body）设置定位以后。使用position:relative来帮忙，可以巧妙的定位元素位置，但是必须遵守下面规范：

1、参照定位的元素必须是相对定位元素的前辈元素：

    <div id="box1"><!--参照定位的元素-->
        <div id="box2">相对参照元素进行定位</div><!--相对定位元素-->
    </div>

从上面代码可以看出box1是box2的父元素（父元素当然也是前辈元素了）。

2、参照定位的元素必须加入position:relative;

    #box1{
        width:200px;
        height:200px;
        position:relative;        
    }

3、定位元素加入position:absolute，便可以使用top、bottom、left、right来进行偏移定位了。

    #box2{
        position:absolute;
        top:20px;
        left:30px;         
    }

**这样box2就可以相对于父元素box1定位了，也就是说box2绝对定位的参照物不是浏览器可视窗口，而是其设置了相对定位的父辈（不一定是父级，可能是父级的父级）元素。**



## 其他技巧

### 长度值

长度单位总结一下，目前比较常用到px（像素）、em、% 百分比，要注意其实这三种单位都是相对单位。

**1、像素**

像素为什么是相对单位呢？因为像素指的是显示器上的小点（CSS规范中假设“90像素=1英寸”）。实际情况是浏览器会使用显示器的实际像素值有关，在目前大多数的设计者都倾向于使用像素（px）作为单位。

**2、em**

就是本元素给定`字体`的 font-size 值，如果元素的 font-size 为 14px ，那么 1em = 14px；如果 font-size 为 18px，那么 1em = 18px。如下代码：

    p{font-size:12px;text-indent:2em;}

上面代码就是可以实现段落首行缩进 24px（也就是两个字体大小的距离）。

**下面注意一个特殊情况**：

但当给 font-size 设置单位为 em 时，此时计算的标准以 p 的父元素的 font-size 为基础。如下代码：

html:

    <p>以这个<span>例子</span>为例。</p>

css:

    p{font-size:14px}
    span{font-size:0.8em;}

结果 span 中的字体“例子”字体大小就为 11.2px（14 * 0.8 = 11.2px）。

**3、百分比**

    p{font-size:12px;line-height:130%}

设置行高（行间距）为`字体`的130%（12 * 1.3 = 15.6px）。






### display属性

对于大多数元素它们的默认值通常是 block 或 inline 。一个 block 元素通常被叫做块级元素。一个 inline 元素通常被叫做行内元素。

**block**

div 是一个标准的块级元素。一个块级元素会新开始一行并且尽可能撑满容器。其他常用的块级元素包括 p 、 form 和HTML5中的新元素： header 、 footer 、 section 等等。

**inline**

span 是一个标准的行内元素。一个行内元素可以在段落中
    
    <span> 像这样 </span>
 
包裹一些文字而不会打乱段落的布局。 a 元素是最常用的行内元素，它可以被用作链接。

**none**

另一个常用的display值是 none 。一些特殊元素的默认 display 值是它，例如 script 。 display:none 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。

它和 visibility 属性不一样。把 display 设置成 none 元素不会占据它本来应该显示的空间，但是设置成 visibility: hidden; 还会占据空间。

### flexbox简单布局（display:flex）

css代码：

    <style>
    .container {
    display: -webkit-flex;
    display: flex;
    }
    .elem {
        border: solid red 3px;
        position: relative;
    }
    .elem-green {
        border: solid green 3px;
    }
    .endlabel,.label{
        background-color: blue;    
    }
    .initial {
    -webkit-flex: initial;
            flex: initial;
    width: 200px;
    min-width: 100px;
    }
    .none {
    -webkit-flex: none;
            flex: none;
    width: 200px;
    }
    .flex1 {
    -webkit-flex: 1;
            flex: 1;
    }
    .flex2 {
    -webkit-flex: 2;
            flex: 2;
    }
    </style>

html代码：

    <div class="container elem">

    <section class="elem elem-green initial">
        <span class="label">&lt;div class="initial"&gt;</span>
        <p>
        空间足够的时候，我的宽度是200px，如果空间不足，我会变窄到100px，但不会再窄了。
        </p>
        <span class="endlabel">&lt;/div&gt;</span>
    </section>

    <section class="elem elem-green none">
        <span class="label">&lt;div class="none"&gt;</span>
        <p>
        无论窗口如何变化，我的宽度一直是200px。
        </p>
        <span class="endlabel">&lt;/div&gt;</span>
    </section>

    <section class="elem elem-green flex1">
        <span class="label">&lt;div class="flex1"&gt;</span>
        <p>
        我会占满剩余宽度的1/3。
        </p>
        <span class="endlabel">&lt;/div&gt;</span>
    </section>

    <section class="elem elem-green flex2">
        <span class="label">&lt;div class="flex2"&gt;</span>
        <p>
        我会占满剩余宽度的2/3。
        </p>
        <span class="endlabel">&lt;/div&gt;</span>
    </section>

    </div>

<style>
.container {
  display: -webkit-flex;
  display: flex;
}
.elem {
    border: solid red 3px;
    position: relative;
}
.elem-green {
    border: solid green 3px;
}
.label{
    background-color: blue;  
    position:absolute;
    top: 0;
    left: 0;
    padding: 0 3px 3px 0;    

}
.endlabel{
    background-color: blue;  
    position:absolute;
    bottom: 0;
    right: 0;
    padding: 0 3px 3px 0;    

}
.initial {
  -webkit-flex: initial;
          flex: initial;
  width: 200px;
  min-width: 100px;
}
.none {
  -webkit-flex: none;
          flex: none;
  width: 200px;
}
.flex1 {
  -webkit-flex: 1;
          flex: 1;
}
.flex2 {
  -webkit-flex: 2;
          flex: 2;
}
</style>


<div class="container elem">

  <section class="elem elem-green initial">
    <span class="label">&lt;div class="initial"&gt;</span>
    <p>
      空间足够的时候，我的宽度是200px，如果空间不足，我会变窄到100px，但不会再窄了。
    </p>
    <span class="endlabel">&lt;/div&gt;</span>
  </section>

  <section class="elem elem-green none">
    <span class="label">&lt;div class="none"&gt;</span>
    <p>
      无论窗口如何变化，我的宽度一直是200px。
    </p>
    <span class="endlabel">&lt;/div&gt;</span>
  </section>

  <section class="elem elem-green flex1">
    <span class="label">&lt;div class="flex1"&gt;</span>
    <p>
      我会占满剩余宽度的1/3。
    </p>
    <span class="endlabel">&lt;/div&gt;</span>
  </section>

  <section class="elem elem-green flex2">
    <span class="label">&lt;div class="flex2"&gt;</span>
    <p>
      我会占满剩余宽度的2/3。
    </p>
    <span class="endlabel">&lt;/div&gt;</span>
  </section>

</div>

### flexbox实现垂直居中

css代码：

    <style>
    .vertical-container {
    height: 300px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
            align-items: center;
    -webkit-justify-content: center;
            justify-content: center;
    }
    </style>

html代码：

    <div class="vertical-container elem">

    <section class="elem elem-green">
        <span class="label">&lt;div&gt;</span>
        <p>
        CSS里总算是有了一种简单的垂直居中布局的方法了！
        </p>
        <span class="endlabel">&lt;/div&gt;</span>
    </section>

    </div>


<style>
.vertical-container {
  height: 300px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;
}
</style>

<div class="vertical-container elem">

  <section class="elem elem-green">
    <span class="label">&lt;div&gt;</span>
    <p>
      CSS里总算是有了一种简单的垂直居中布局的方法了！
    </p>
    <span class="endlabel">&lt;/div&gt;</span>
  </section>

</div>

### 水平居中设置-行内元素

行内元素怎么进行水平居中？hin简单：

如果被设置元素为文本、图片等行内元素时，水平居中是通过给父元素设置 `text-align:center` 来实现的。(父元素和子元素：如下面的html代码中，div是“我想要在父容器中水平居中显示”这个文本的父元素。反之这个文本是div的子元素 )如下代码：

html代码：

    <body>
    <div class="txtCenter">我想要在父容器中水平居中显示。</div>
    </body>

css代码：

    <style>
    .txtCenter{
        text-align:center;
    }
    </style>


<div class="txtCenter">我想要在父容器中水平居中显示。</div>


<style>
.txtCenter{
    text-align:center;
}
</style>    

### 水平居中-块级元素

**1、定宽块级元素**

满足定宽和块状两个条件的元素是可以通过设置“左右margin”值为“auto”来实现居中的。我们来看个例子就是设置 div 这个块状元素水平居中：

html代码：

    <body>
    <div>我是定宽块状元素，哈哈，我要水平居中显示。</div>
    </body>

css代码：

    <style>
    div{
        border:1px solid red;/*为了显示居中效果明显为 div 设置了边框*/
        
        width:200px;/*定宽*/
        margin:20px auto;/* margin-left 与 margin-right 设置为 auto */
    }

    </style>



<div class="dingkuan">我是定宽块状元素，哈哈，我要水平居中显示。</div>

<style>
div.dingkuan{
    border:1px solid red;/*为了显示居中效果明显为 div 设置了边框*/
    
    width:200px;/*定宽*/
    margin:20px auto;/* margin-left 与 margin-right 设置为 auto */
}
</style>

**水平居中-不定宽-table方式**

为什么选择方法一加入table标签? 是利用table标签的长度自适应性---即不定义其长度也不默认父元素body的长度（table其长度根据其内文本长度决定），因此可以看做一个定宽度块元素，然后再利用定宽度块状居中的margin的方法，使其水平居中。

第一步：为需要设置的居中的元素外面加入一个 table 标签 ( 包括 `<tbody>`、`<tr>`、`<td>` )。

第二步：为这个 table 设置“左右 margin 居中”（这个和定宽块状元素的方法一样）。

举例如下：

html代码：

    <div>
    <table>
    <tbody>
        <tr><td>
        <ul>
            <li>我是第一行文本</li>
            <li>我是第二行文本</li>
            <li>我是第三行文本</li>
        </ul>
        </td></tr>
    </tbody>
    </table>
    </div>  

css代码：

    <style>
    table{
        border:1px solid;
        margin:0 auto;
    }
    </style>



<div class=budingkuan-table>
 <table>
  <tbody>
    <tr><td>
    <ul>
        <li>我是第一行文本</li>
        <li>我是第二行文本</li>
        <li>我是第三行文本</li>
    </ul>
    </td></tr>
  </tbody>
 </table>
</div>

<style>
div.budingkuan-table table{
    border:1px solid;
    margin:0 auto;
}
</style>

**水平居中-不定宽-inline方式**

改变块级元素的 display 为 `inline` 类型（设置为 行内元素 显示），然后使用 `text-align:center` 来实现居中效果。如下例子：

html代码：

    <body>
    <div class="container">
        <ul>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
        </ul>
    </div>
    </body>

css代码：

    <style>
    .container{
        text-align:center;
    }
    /* margin:0;padding:0（消除文本与div边框之间的间隙）*/
    .container ul{
        list-style:none;
        margin:0;
        padding:0;
        display:inline;
    }
    /* margin-right:8px（设置li文本之间的间隔）*/
    .container li{
        margin-right:8px;
        display:inline;
    }
    </style>


<div class="budingkuan-inline">
    <ul>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
    </ul>
</div>


<style>
.budingkuan-inline{
    text-align:center;
}
/* margin:0;padding:0（消除文本与div边框之间的间隙）*/
.budingkuan-inline ul{
    list-style:none;
    margin:0;
    padding:0;
    display:inline;
}
/* margin-right:8px（设置li文本之间的间隔）*/
.budingkuan-inline li{
    margin-right:8px;
    display:inline;
}
</style>

### 垂直居中-单行文本

父元素高度确定的单行文本的竖直居中的方法是通过设置父元素的 `height` 和 `line-height` 高度`一致`来实现的。(height: 该元素的高度，line-height: 顾名思义，行高（行间距），指在文本中，行与行之间的 基线间的距离 )。

line-height 与 font-size 的计算值之差，在 CSS 中成为“行间距”。分为两半，分别加到一个文本行内容的顶部和底部。

这种文字行高与块高一致带来了一个弊端：当文字内容的长度大于块的宽时，就有内容脱离了块。

html代码：

    <div class="container">
        hi,github!
    </div>

css代码：

    <style>
    .container{
        height:50px;
        line-height:50px;
        background:#999;
    }
    </style>

<div class="chuzhi-danhang">
    hi,github!
</div>


<style>
div.chuzhi-danhang{
    height:50px;
    line-height:50px;
    background:grey;
}
</style>


### 垂直居中-多行文本 table td

`父元素高度确定`的`多行文本`、`图片`等的竖直居中的方法有两种：

方法一：使用插入 table  (包括tbody、tr、td)标签，同时设置 `vertical-align：middle`。

css 中有一个用于竖直居中的属性 vertical-align，在父元素设置此样式时，会对inline-block类型的子元素都有用。下面看一下例子：

html代码：

    <table class="chuizhi-table">
        <tbody>
            <tr>
                <td class="wrap">
                    <div>
                        <p>我居中了吗，我居中了？。</p>
                        <p>我居中了吗，我居中了？。</p>    
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

css代码：

    <style>
    table.chuizhi-table td{height:200px;background:blue}
    </style>


<table class="chuizhi-table">
    <tbody>
        <tr>
            <td class="wrap">
                <div>
                    <p>我居中了吗，我居中了？。</p>
                    <p>我居中了吗，我居中了？。</p>    
                </div>
            </td>
        </tr>
    </tbody>
</table>


<style>
table.chuizhi-table td{height:200px;background:blue}
</style>

因为 td 标签默认情况下就默认设置了 vertical-align 为 middle，所以我们不需要显式地设置了。

### 垂直居中-多行文本 table-cell

在 chrome、firefox 及 IE8 以上的浏览器下可以设置块级元素的 display 为 table-cell（设置为表格单元显示），激活 vertical-align 属性，但注意 IE6、7 并不支持这个样式, 兼容性比较差。

html代码：

    <div class="chuzhi-table-cell">
        <div>
            <p>我居中了吗，我居中了？。</p>
            <p>我居中了吗，我居中了？。</p>
        </div>
    </div>

css代码：

    <style>
    .chuzhi-table-cell{
        height:300px;
        background:blue;
        display:table-cell;/*IE8以上及Chrome、Firefox*/
        vertical-align:middle;/*IE8以上及Chrome、Firefox*/
    }
    </style>

<div class="chuzhi-table-cell">
    <div>
        <p>我居中了吗，我居中了？。</p>
        <p>我居中了吗，我居中了？。</p>
    </div>
</div>


<style>
.chuzhi-table-cell{
    height:200px;
    background:blue;
    display:table-cell;/*IE8以上及Chrome、Firefox*/
    vertical-align:middle;/*IE8以上及Chrome、Firefox*/
}
</style>

这种方法的好处是不用添加多余的无意义的标签，但缺点也很明显，它的兼容性不是很好，不兼容 IE6、7而且这样修改display的block变成了table-cell，破坏了原有的块状元素的性质。


### 媒体查询（响应式）

“响应式设计（Responsive Design” 是一种让网站针对不同的浏览器和设备“呈现”不同显示效果的策略，这样可以让网站在任何情况下显示的很棒！

媒体查询是做此事所需的最强大的工具。让我们使用百分比宽度来布局，然后在浏览器变窄到无法容纳侧边栏中的菜单时，把布局显示成一列：

    @media screen and (min-width:600px) {
        nav {
            float: left;
            width: 25%;
        }
        section {
            margin-left: 25%;
        }
    }
    @media screen and (max-width:599px) {
        nav li {
            display: inline;
        }
    }


## 其他

新手推荐通俗易懂：[学习CSS布局](http://zh.learnlayout.com/toc.html)

<div name="section_div" style="background-color:white;padding:1px 10px;width:100%;border-radius:5px;margin-top:15px;"><div><p><font size=3 style="color:black;"><a href="http://zh.learnlayout.com" _target="blank" style="color:black;">学习CSS布局</a></font></p></div><div style="display:flex;display:-webkit-flex;"><div style="width:50px;"><img style="width:50px;" src="http://zh.learnlayout.com/images/logo.png" /></div><div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;"><font size=2 color=grey>我们假设你已经掌握了CSS的选择器、属性和值。并且你可能已经对布局有一定了解，即使亲自去写的话还是会很苦恼。如果你想要从头开始学习HTML和CSS，那么你可以看下这篇教程。不然的话，让我们看看我们是否可以让你在下一个项目少一些烦恼。</font></div></div></div>

-----

@tsingchan markdown from moco
