通俗易懂php迭代生成器
===========================================

- [优点](#优点)
- [概念引入](#概念引入)
- [思考一个问题](#思考一个问题)
- [创建生成器](#创建生成器)
- [使用生成器](#使用生成器)
- [深入理解生成器](#深入理解生成器)
    - [代码剖析](#代码剖析)
    - [概念理解](#概念理解)
- [实际开发应用](#实际开发应用)
    - [读取超大文件](#读取超大文件)
- [流程图加深理解](#流程图加深理解)
- [参考](#参考)



对Python的小伙伴，对于生成器应该不陌生。但很多PHP开发者或许不知道生成器这个功能，可能因为生成器是PHP 5.5.0才引入的功能，也可以是生成器作用不是很明显。但是，生成器功能的确非常有用。

## 优点


直接讲概念会是一头雾水，所以我们先来说说优点，也许能勾起你的兴趣。那么生成器有哪些优点，如下：

- 生成器会对PHP应用的性能有非常大的影响
- PHP代码运行时节省大量的内存
- 比较适合计算大量的数据

那么，这些神奇的功能究竟是如何做到的？我们先来举个例子。

## 概念引入


首先，放下生成器概念的包袱，来看一个简单的PHP函数：

```php
function createRange($number){
    $data = [];
    for($i=0;$i<$number;$i++){
        $data[] = time();
    }
    return $data;
}
```

这是一个非常常见的PHP函数，我们在处理一些数组的时候经常会使用。这里的代码也非常简单：

1. 我们创建一个函数。
2. 函数内包含一个`for`循环，我们循环的把当前时间放到`$data`里面
3. `for`循环执行完毕，把`$data`返回出去。

下面没完，我们继续。我们再写一个函数，把这个函数的返回值循环打印出来：

```php
$result = createRange(10); // 这里调用上面我们创建的函数
foreach($result as $value){
    sleep(1);//这里停顿1秒，我们后续有用
    echo $value.'<br />';
}
```

我们在浏览器里面看一下运行结果：

![图片描述](http://pic.3513.top/github/page/291e13a93e470737e8967cf9885be59f.jpg)

这里非常完美，没有任何问题。（当然`sleep(1)`效果你们看不出来）

## 思考一个问题

我们注意到，在调用函数`createRange`的时候给`$number`的传值是10，一个很小的数字。假设，现在传递一个值`10000000`（1000万）。

那么，在函数`createRange`里面，`for`循环就需要执行`1000`万次。且有`1000`万个值被放到`$data`里面，而`$data`数组在是被放在内存内。所以，在调用函数时候会占用大量内存。

这里，生成器就可以大显身手了。

## 创建生成器


我们直接修改代码，你们注意观察：

``` php
function createRange($number){
    for($i=0;$i<$number;$i++){
        yield time();
    }
}
```

看下这段和刚刚很像的代码，我们删除了数组`$data`，而且也没有返回任何内容，而是在`time()`之前使用了一个关键字`yield`

## 使用生成器


我们再运行一下第二段代码：

```php
$result = createRange(10); // 这里调用上面我们创建的函数
foreach($result as $value){
    sleep(1);
    echo $value.'<br />';
}
```

![图片描述](http://pic.3513.top/github/page/8c5006c2bd10213b10497c063c9c6c81.jpg)

我们奇迹般的发现了，输出的值和第一次没有使用生成器的不一样。这里的值（时间戳）中间间隔了1秒。

这里的间隔一秒其实就是`sleep(1)`造成的后果。但是为什么第一次没有间隔？那是因为：

- 未使用生成器时：`createRange`函数内的`for`循环结果被很快放到`$data`中，并且立即返回。所以，`foreach`循环的是一个固定的数组。
- 使用生成器时：`createRange`的值不是一次性快速生成，而是依赖于`foreach`循环。`foreach`循环一次，`for`执行一次。

到这里，你应该对生成器有点儿头绪。

## 深入理解生成器


### 代码剖析

下面我们来对于刚刚的代码进行剖析。

```php
function createRange($number){
    for($i=0;$i<$number;$i++){
        yield time();
    }
}

$result = createRange(10); // 这里调用上面我们创建的函数
foreach($result as $value){
    sleep(1);
    echo $value.'<br />';
}
```

我们来还原一下代码执行过程。

1. 首先调用`createRange`函数，传入参数`10`，但是`for`值执行了一次然后停止了，并且告诉`foreach`第一次循环可以用的值。
2. `foreach`开始对`$result`循环，进来首先`sleep(1)`，然后开始使用`for`给的一个值执行输出。
3. `foreach`准备第二次循环，开始第二次循环之前，它向`for`循环又请求了一次。
4. `for`循环于是又执行了一次，将生成的时间戳告诉`foreach`.
5. `foreach`拿到第二个值，并且输出。由于`foreach`中`sleep(1)`，所以，`for`循环延迟了1秒生成当前时间

**所以，整个代码执行中，始终只有一个记录值参与循环，内存中也只有一条信息**。

无论开始传入的`$number`有多大，由于并不会立即生成所有结果集，所以内存始终是一条循环的值。

> yield 中断执行，并返回；
下次send执行后，从中断的地方继续执行，直到再次遇到yield

### 概念理解

到这里，你应该已经大概理解什么是生成器了。下面我们来说下生成器原理。

首先明确一个概念：**生成器yield关键字不是返回值，他的专业术语叫产出值，只是生成一个值**

那么代码中`foreach`循环的是什么？其实是PHP在使用生成器的时候，会返回一个`Generator`类的对象。`foreach`可以对该对象进行迭代，每一次迭代，PHP会通过`Generator`实例计算出下一次需要迭代的值。这样`foreach`就知道下一次需要迭代的值了。

而且，在运行中`for`循环执行后，会立即停止。等待`foreach`下次循环时候再次和`for`索要下次的值的时候，`for`循环才会再执行一次，然后立即再次停止。直到不满足条件不执行结束。

## 实际开发应用

很多PHP开发者不了解生成器，其实主要是不了解应用领域。那么，生成器在实际开发中有哪些应用？

### 读取超大文件

PHP开发很多时候都要读取大文件，比如csv文件、text文件，或者一些日志文件。这些文件如果很大，比如5个G。这时，直接一次性把所有的内容读取到内存中计算不太现实。

这里生成器就可以派上用场啦。简单看个例子：读取text文件

![图片描述](http://pic.3513.top/github/page/982f3abcba81caba598cebb965b41c08.jpg)

我们创建一个text文本文档，并在其中输入几行文字，示范读取。

```php
<?php
header("content-type:text/html;charset=utf-8");
function readTxt()
{
    # code...
    $handle = fopen("./test.txt", 'rb');

    while (feof($handle)===false) {
        # code...
        yield fgets($handle);
    }

    fclose($handle);
}

foreach (readTxt() as $key => $value) {
    # code...
    echo $value.'<br />';
}
```

![图片描述](https://segmentfault.com/img/bVZT1d?w=343&h=343)

通过上图的输出结果我们可以看出代码完全正常。

但是，背后的代码执行规则却一点儿也不一样。使用生成器读取文件，第一次读取了第一行，第二次读取了第二行，以此类推，**每次被加载到内存中的文字只有一行** ，大大的减小了内存的使用。

这样，即使读取上G的文本也不用担心，完全可以像读取很小文件一样编写代码。

## 流程图加深理解

> 左边是普通实现方式，右边是加入迭代生成器的实现方式：

![php迭代生成器](http://pic.3513.top//github/page/php迭代生成器.jpg)

## 参考


更多高深技巧比如携程多任务等，可以参考鸟哥博客：
<div name="section_div" style="background-color:white;padding:1px 10px;width:100%;border-radius:5px;margin-top:15px;">
    <div>
        <p>
            <font size=3 style="color:black;">
                <a href="http://www.laruence.com/2015/05/28/3038.html" _target="blank" style="color:black;">在PHP中使用协程实现多任务调度 | 风雪之隅</a>
            </font>
        </p>
    </div>
    <div style="display:flex;display:-webkit-flex;">
        <div style="width:50px;">
            <img style="width:50px;" src="http://www.laruence.com/favicon.ico" />
        </div>
        <div style="flex:1;-webkit-flex:1;padding-left:10px;overflow:hidden;">
            <font size=2 color=grey>PHP5.5一个比较好的新功能是加入了对迭代生成器和协程的支持.对于生成器,PHP的文档和各种其他的博客文章已经有了非常详细的讲解.协程相对受到的关注就少了,因为协程虽然有很强大的功能但相对比...</font>
        </div>
    </div>
</div>


<font size=2 color=grey>[阅读原文](https://segmentfault.com/a/1190000012334856)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
