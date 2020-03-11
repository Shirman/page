一次搞懂Python装饰器
=============================

- [python中的函数](#python中的函数)
- [装饰器入门](#装饰器入门)
- [@语法](#语法)
- [带参数的函数](#带参数的函数)
- [带参数的装饰器](#带参数的装饰器)
- [总结](#总结)



> 装饰器，从字面上很容易理解，就是装饰什么东西的。就好比警察本来就穿一身制服，正义凛然，当他们出去抓捕时候，为了保障安全， 会怎样呢？穿上防弹衣。 在原来已有衣服的基础上在包一层，保暖又安全。那么在Python中又是什么呢？ 简单理解起来就是，在原有功能的基础上，以最小的代价提供更多的功能。


### python中的函数

对python了解的人都知道，在python中一切都是对象，包括函数，所以：

```
def foo():
    print("foo")

def plus(func):
    func()

plus(foo)

```


从中可以看出，这里不同于其他面向对象的语言，这里和js有点相似，它可以把方法当作实参传递给另一个函数，所以就为装饰器打下了一个基础。 下面看一个这样的需求： 这里有这样一段代码，我们现在要给他增加记录日志的功能，你会怎样处理呢？

```
def foo():
    print('this is foo')

```

修改源代码

```
def foo():
    print('this is foo')
    logging.info('save log') #模拟记录日志
  
```

这样确实可以达到效果，如果我们不允许修改代码，或者还有其他10000个地方也要记录呢？是不是就有很多相同的代码了，而且很繁琐，为了解决这个问题，那就是我们今天的主角--装饰器。

### 装饰器入门

```
def save_logging(func):
    def wrapper():
        logging.i("save log")
        return func() # 这里就是把实参当作函数执行
    return wrapper

def say():
    print('say hello')

say = save_logging(say) # 此处想当于执行了say, 即上面的func
say() # 此处执行的是wrapper

```


这样save\_logging就变成了一个装饰器。**在原有任意函数上装饰了一层新的功能**。

### @语法

**@符号就是装饰器的语法糖**，这个没有什么原因，就是这样规定的，只要记住就行了。 我们把上面的例子改造一下：

```
def save_logging(func):
    def wrapper():
        logging.i("save log")
        return func() # 这里就是把实参当作函数执行
    return wrapper

@save_logging
def say():
    print('say hello')

say()

```

这个有点像java的注解，但是本质上是有区别的，注解是在编译器期会被编译器处理掉的。而此处是被解释器处理，是在运行阶段。

### 带参数的函数

如果我本来的函数就带参数要怎么处理呢，下面我们就开始讲解。

```
def say(word):
    print('say %s' % word)

```


我们这样定义装饰器。

```
def save_logging(func):
    def wrapper(word):
        logging.i("save log")
        return func(word) # 这里就是把实参当作函数执行
    return wrapper

```


其实就是，要把包装函数修改成带参的函数就行了，是不是很简单。 同样我们这里也可以定义关键字参数和可变参数，同python的基本函数本无区别。

```
def save_logging(func):
    def wrapper(*args, **kwargs):
        logging.i("save log")
        return func(w*args, **kwargs) # 这里就是把实参当作函数执行
    return wrapper

```


如果python基本函数你很清楚这里也就不复杂了。

### 带参数的装饰器

上面我们讲了带参数的函数，那么装饰器本身是否可以带参数了，答案是肯定的，毕竟python是如此强大。

```
def save_logging(size):
    def decorator(func):
        def wrapper(*args, **kwargs):
            logging.i("save log")
            return func(w*args, **kwargs) # 这里就是把实参当作函数执行
        return wrapper
    return decorator

@save_logging(size=10)
def say(word='good job'):
    print('say %s' % word)

say()

```

很简单很强大。

### 总结

python装饰器是个什么东西，其实就记住一条：修饰函数的函数。


<font size=2 color=grey>[阅读原文](https://litets.com/article/2019/3/19/55.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
