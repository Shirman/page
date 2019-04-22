


- [注释](#注释)
- [常用内建函数](#常用内建函数)
- [类型-运算-输出](#类型-运算-输出)
    - [True与False](#true与false)
    - [判断循环语句注意：](#判断循环语句注意)
    - [元组封装和拆封](#元组封装和拆封)
    - [求余、求整](#求余求整)
    - [平方](#平方)
    - [逻辑运算符号](#逻辑运算符号)
    - [强制转换类型](#强制转换类型)
    - [右边表达式](#右边表达式)
    - [format](#format)
    - [print](#print)
    - [print 打印多个相同字符](#print-打印多个相同字符)
- [列表](#列表)
    - [列表](#列表-1)
- [循环遍历](#循环遍历)
    - [for](#for)
    - [for中使用enumerate](#for中使用enumerate)
    - [for中使用zip](#for中使用zip)
    - [range()函数](#range函数)
- [数据结构](#数据结构)
    - [列表](#列表-2)
    - [元组](#元组)
    - [集合](#集合)
    - [字典](#字典)
- [字符串对象](#字符串对象)
    - [注意](#注意)
    - [内建方法](#内建方法)
    - [格式化操作符](#格式化操作符)
- [函数](#函数)
    - [\_\_name\_\_](#\_\_name\_\_)
    - [局部变量和全局变量](#局部变量和全局变量)
    - [默认参数](#默认参数)
    - [关键字参数](#关键字参数)
    - [文档字符串](#文档字符串)
    - [高阶函数](#高阶函数)
- [文件读写](#文件读写)
    - [打开文件](#打开文件)
    - [关闭文件](#关闭文件)
    - [读取文件](#读取文件)
    - [with语句](#with语句)
- [异常](#异常)
    - [捕获异常](#捕获异常)
    - [raise 抛出异常](#raise-抛出异常)
- [类](#类)
    - [定义](#定义)
    - [实例化](#实例化)
    - [继承](#继承)
    - [多继承](#多继承)
    - [删除对象](#删除对象)
    - [属性读取](#属性读取)
    - [装饰器](#装饰器)
- [模块和包](#模块和包)
    - [模块定义](#模块定义)
    - [模块导入](#模块导入)
    - [默认模块](#默认模块)
    - [包](#包)
    - [包的使用](#包的使用)
    - [包内引用](#包内引用)
    - [安装第三方模块](#安装第三方模块)
- [collections 集合类模块](#collections-集合类模块)
    - [Counter](#counter)
    - [defaultdict](#defaultdict)
    - [namedtuple](#namedtuple)
- [迭代器、生成器、装饰器、闭包](#迭代器生成器装饰器闭包)
    - [装饰器](#装饰器-1)
- [系统模块](#系统模块)
    - [os](#os)
    - [glob 文件通配符](#glob-文件通配符)
    - [sys 命令行参数](#sys-命令行参数)
    - [sys.stdin stdout stderr](#sysstdin-stdout-stderr)
    - [re 字符串正则匹配](#re-字符串正则匹配)
    - [数学 math](#数学-math)
    - [随机数 random](#随机数-random)
    - [日期和时间 datetime](#日期和时间-datetime)
    - [数据压缩](#数据压缩)
    - [timeit 性能度量](#timeit-性能度量)
    - [string](#string)
    - [threading 多线程](#threading-多线程)
    - [logging 日志](#logging-日志)
    - [decimal 十进制浮点数计算](#decimal-十进制浮点数计算)
    - [列表工具](#列表工具)
- [unix环境TAB补全](#unix环境tab补全)
- [虚拟环境virtualenv](#虚拟环境virtualenv)
- [测试](#测试)
    - [范例 fact.py](#范例-factpy)
    - [测试用例 fact_test.py](#测试用例-fact_testpy)
    - [assert语句](#assert语句)
- [疑问](#疑问)
- [不方便](#不方便)





## 注释

文档符号

"""与'''

```
"""
这是一个模块，这个模块什么都不处理
"""
def get_name(index):
    '''获取名字
    
    :arg index: 名字索引
    '''
    names = {1:'tsing',2:'chan'}
    return names[index]
```

## 常用内建函数

- type 内建函数
可以知道任何变量的数据类型
- len 内建函数
可以知道任意序列类型数据的长度

## 类型-运算-输出

### True与False

**在python中返回使用真值，需要首字母大写**

不能使用true和false

而是True和False

### 判断循环语句注意：


    if a > 10:
    #
    elif a > 8:
    #
    else:
    #


### 元组封装和拆封

    data = ("a","b")
    _a,_b = data    #输出_a值为a，


### 求余、求整

    14 % 4  #2
    14 / 4  #3.5
    14 // 4 #3
    divmod(15,2) ## 取整+取余，相当于15//2,15%2 得到 (7,1)

### 平方

    n**2

### 逻辑运算符号

关系运算可以通过逻辑运算符 and 和 or 组合，比较的结果可以用 not 来取反意。逻辑运算符的优先级又低于关系运算符，在它们之中，**not 具有最高的优先级**，or 优先级最低，所以 A and not B or C 等于 (A and (not B)) or C。当然，括号也可以用于比较表达式。

    2>1 and not 3>5 or 4 #True

### 强制转换类型

    int()
    float()
    str()
    
### 右边表达式

Python 中赋值语句执行时会先对赋值运算符右边的表达式求值，然后将这个值赋值给左边的变量。

    a,b = b,a+b
    
### format

    print("zzz{:2d}zzz{:5.2f}".format(12,12345.10))
    # zzz12zzz12345.10
    
### print

默认情况下，print() 除了打印你提供的字符串之外，还会打印一个换行符，所以每调用一次 print() 就会换一次行.

可以通过 print() 的另一个参数 end 来替换这个换行符.

    print(a,end=" ")
    
### print 打印多个相同字符

    print("#" * 20)
    ####################

## 列表    
### 列表

它可以写作中括号之间的一列逗号分隔的值。列表的元素不必是同一类型

    a = [1,23,4,5,"out","in"]

- 与php相同地方

与php数组定义类似，使用方式也类似

- 截取子列表负数索引

    截取类似php的slice

    可以使用负数索引，可以直接切割
    
    ```
    a[-1]   # "in"
    a[3]    # "in"
    
    a[0:2]  #从0位置开始取长度2的子列表
    a[0:-2]   #如果为负数，表示从0位置取到倒数第2个 
    ```
- 截取步长
    
    ```
    a[0::2] #从0位置开始每隔2个元素取值
    ```
- 列表连接合并

    类似于php的array_merge

    ```
    a = [1,2,3]
    b = [4,5]
    c = a + b #[1,2,3,4,5]
    ```

- 切片赋值与清空

    ```
    a = [1,2,3,4,5,6]
    a[2:3] = [3,2] #[1,3,2,4,5,6]
    a[2:3] = [] #[1,4,5,6]
    
    ```
    
- 判断值是否在列表

    ```
    a = [,1,2,3]
    if 1 in a:
        print('yes')
    else:
        print("false")
    
    ```
    
- 判断列表
    
    ```
    a = []
    if a:
        print("not empty")
    else:
        print("empty")
    ```

## 循环遍历

### for

    ```
    a = [1,2,3]
    for i in a
        print(i)
    ```
    
### for中使用enumerate

如你想在遍历列表或任何序列类型的同时获得元素索引值，可以使用enumerate

```
for i,j in enumerate(a):
    print(i,j)
```    

### for中使用zip

你也许需用同时遍历两个序列类型，你可以使用zpi函数

```
a = ["a",'b']
b = ['apple','banana']

for _a,_b in zip(a,b):
    print("{} is {}".format(_a,_b))
    
#a is apple
#b is banana
```

### range()函数

生成一个**等差数列**，**不是一个列表**

    ```
    a = range(1,15,2)   #第一个数1，最大不超过15，以2递增
    list(a)
    #[1, 3, 5, 7, 9, 11, 13]    
    ```

## 数据结构

### 列表

> 可以看做是其他语言的非键值对数组，允许不同类型的元素存在。常使用[]进行标识。

- a.append("a") 添加元素到尾端
- a.insert(1,"a") 添加元素到任何位置
- a.count("a") 返回列表中定值为"a"的元素
- a.remove("a") 删除列表中定值为a的元素
- a.reverse() 翻转列表
- a.extend(b) 列表b扩展合并到列表a，末尾追加
- a.sort() 按元素值给列表排序，前提是元素可排序
- del 关键字非方法，删除指定位置（key）的元素 # del a[1]
- a.pop(0) 将列表第1个元素弹出
栈：lifo, last in first out
队列：fifo，first in first out
- 列表推导式
```
a = [1,2,3]
y = [x*2 for x in a]
z = [x-1 for x in[x**2 for x in a]]
#y :[2,4,6]
#z :[0,3,8]
```    

### 元组

> 元组是由数个逗号分割的 **值**(不一定是字符串) 组成。除了逗号外，也常使用()来标识。

    a = 'apple','banana','city','decimal'
    b = 1,2,3,4

> 元组可以像列表一样进行for循环遍历。

- 元组的拆封

```
data = ('a','b')
_a,_b = data
#_a:a,_b:b
x,y = divmod(15,2)
#x:7 y:1
```
    
- 创建一个元素的元组
要创建只含有一个元素的元组，在值后面跟一个逗号。（因为元组是通过逗号来分割的，机器只认这个）

```
a = (12,)
b = 12,
```


### 集合

> 集合是一个无序不重复元素的集。基本功能包括关系测试和消除重复元素。常使用{}来标识。

集合支持并集、交集、差集、对称差集等数学运算。

- set函数 对字符串转换成无重复元素的集合
```
a = set('chinese')
#a = {'s','i','h','e','n','c'} ,这里输出是无序的

```

- 常用集合操作

```
b = set('children')
a-b  #求a有b没有的元素
b-a  #反之
a|b  #在a或在b中的元素
a&b  #在a且在b中的元素
a^b  #在a或b中，但不同时存在的元素
```

- a.pop()  随机弹出并删除一个元素
- a.add(22) 



### 字典

> 字典是无序的键值对（key：value）**集合**，同一个字典内的键必须是唯一的。常使用{}标识，可以参考json串。


```
data = {"a":"apple",'b':"banner"}
```

- del 关键字删除元素

```
del data['a']
```

- in 同样使用in来判断元素值是否在字典中
- dinct() 可以从包含键值对的元组中创建字典

```
a = dinct((("a","apple"),("b","banner")));
#{"a":"apple","b":"banner"}
```
- data.items()遍历字典
```
for x, y in data.items():
    print("{} uses {}".format(x, y))
```    
- 索引建最佳方式

不建议直接使用 data[index]，除非你确定有index存在。
否则建议：

```
data.get(index,0) # 如果键不存在，会返回默认值
```
## 字符串对象

### 注意

- \n \t等转义

和php脚本相反，python的转义符只有在单引号''里才有效果，在双引号里"\n"直接显示转义符号

```
a = 'a\nb'  
#a
#b
a = "a\nb"
#a\nb
```

- 三对引号/文档字符串

"""或'''

```
a = '''
a     
     b
     c'''
print(a)     
#a     
#     b
#     c
```

- 字符串可以当做列表来使用

```
a = 'abcde'
print(a[::1])
#abcde
print(a[::2])
#ace
```

### 内建方法

- a.title() 返回首字母大写字符串
- a.upper() 返回全部字母大写
- a.lower() 返回全小写
- a.swapcase() 返回大小写置换，大写的字符变小写，反之
- a.isalnum()   检查字符是否只有字母和数字
- a.isalpha()   检查字符中只有字母
- isdigit 检查全数字
- islower   检查是否小写
- istitle   检查是否标题样式字符串
- isupper   检查是否全大写
- split 分割任意字符，返回列表
- "-".join(list)  使用指定字符连接多个字符串
```
"-".join("we are chinese".split())
#we-are-chinese
```
- strip 去除收尾指定字符，类似于php的trim,默认去除空格与换行，支持lstrip和rstrip
- find  搜索字符串里的文本或子字符串，没有找到返回-1
- startwith 检查是否以指定字符串开头
- endwith   检查是否以指定字符串结尾
- a.count('\t') a中有多少tab

### 格式化操作符

%

    print("the name is %s.%d years old" % ('jm',4))
    #the name is jm.4 years old


## 函数

### \_\_name\_\_

__name__这个系统变量显示了当前模块执行过程中的名称，如果当前程序运行在这个模块中，__name__ 的名称就是__main__如果不是，则为这个模块的名称。

### 局部变量和全局变量

如果你使用过java或php这些语言，基本差不多

和php相似的是，提供了关键字：global，可以在函数或局部模块中声明该变量是否全局变量

```
a = 9
def echome():
    global a
    a = 100    
    print(a)
print(a)    
echome()
print(a)
#9
#100  声明a为全局变量，但又被重新赋值
#100  全局变量在函数中已经被更改
#通过global声明后，在函数echome中才不会出现a未定义的问题
```

### 默认参数

与php脚本语言的函数默认参数值一样，可以预置默认值，但要注意的是传参是列表、字典等数据结构时，和php引用传参，会改变参数变量的值

```

def echome(a,b=1):
    print(a,b)

def echome(a,b=[]):
    b.append(a)
#如果b是个列表结构，则后续调用函数echome时，b不会一直是空列表，而是会累计元素

```

### 关键字参数

有时函数中会有多个默认参数，在调用函数时，需要跳过第1个默认参数设置，直接设置第二个默认参数，这就有了关键字参数

```
def echome(a,b=1,c=2):
    print(a,b,c)

echome(0,c=3)
#指定关键字参数c传值为3，b仍然使用默认参数值

```

### 文档字符串

前面我们说三对引号 """ 或 '''


### 高阶函数

参考js的回调函数、php的可变函数和匿名函数

通俗地说：允许函数传参时，参数是另一个函数

- 内建函数map，就是高阶函数

```
list = [1,2,3]
def square(num):
    return num*num
print(list(map(square,list)))
```

> list函数将元组转换成列表


## 文件读写

### 打开文件

    open(file,mode)
    #返回文件对象
### 关闭文件

    fobj.close()
    #确保显示关闭打开的每个文件
    
### 读取文件

- 读取整个文件

```    
fobj.read(size)
#size 默认空，读取整个文件
#注意：read二次调用的时候，返回空，官方说已经读取过整个文件
```

- 读取文件的一行
```
fobj.readline()
#
```

- 读取所有行到一个列表

```
fobj.readlines()
```

- 写文件

```
ff = opne("a.txt",'w')
ff.write("tsing")
ff.close()
```
### with语句

在实际情况中，我们应该尝试使用 with 语句处理文件对象，它会在文件用完后会自动关闭，就算发生异常也没关系。它是 try-finally 块的简写：

```
with open("sample.txt") as fileobj:
    lines = fileobj.reads()
    for line in lines:
        print(line,end='')
```
```
import os
path = '/proc/cpuinfo'
if os.path.exists(path):
    with open(path) as cpuobj:
        for line in cpuinfo:
            print(line,end='')
else:
    print("get cpuinfo failed.")
```

## 异常

### 捕获异常
    try:
    
    except:
    
    finally:

with 是 try-finally的简写

### raise 抛出异常

    try:
        raise ValueError
    except:
        ##

## 类

### 定义

关键字：class

在类的声明中，可以写任何的python语句，包括函数。

```
class myclass(parentClass):
    i=1
    def mymethod():
        return 1+1
        
```

### 实例化

类的实例化使用函数符号

只要把类对象看做是一个返回新的类实例的无参函数即可。

```
x = myclass()
#创建一个空的新的类实例，并将该对象赋给变量x
```

如果我们需要根据不同需要创建不同状态的相同类的不同实例时，需要使用到**构造函数\_\_init\_\_**

```
class myclass():
    def __init__(self,_b,_c):
        self.b = _b
        self.c = _c

x = myclass(1,2)        

print(x.b)
# 1
print(x.c)
# 2

```


### 继承

与大部分面向对象语言一样，继承都需要构造器重写，并调用父级构造器，python构造器__init__的第一个参数必须是类自己self

初始类继承于object


```
class Person(object):
    """
    返回具有给定名称的 Person 对象
    """

    def __init__(self, name):
        self.name = name

    def get_details(self):
        """
        返回包含人名的字符串
        """
        return self.name


class Student(Person):
    """
    返回 Student 对象，采用 name, branch, year 3 个参数
    """

    def __init__(self, name, branch, year):
        Person.__init__(self, name)
        self.branch = branch
        self.year = year

    def get_details(self):
        """
        返回包含学生具体信息的字符串
        """
        return "{} studies {} and is in {} year.".format(self.name, self.branch, self.year)


class Teacher(Person):
    """
    返回 Teacher 对象，采用字符串列表作为参数
    """
    def __init__(self, name, papers):
        Person.__init__(self, name)
        self.papers = papers

    def get_details(self):
        return "{} teaches {}".format(self.name, ','.join(self.papers))


person1 = Person('Sachin')
student1 = Student('Kushal', 'CSE', 2005)
teacher1 = Teacher('Prashad', ['C', 'C++'])

print(person1.get_details())
print(student1.get_details())
print(teacher1.get_details())
```

### 多继承

```
class class1(object):
    #
class class2(object):
    #
class myclass(class1,class2):
    def __init__(self):
        class1.__init__(self)
        class2.__init__(self)
    
```

### 删除对象

    del x

del 实际上使对象的引用计数减少一，当对象的引用计数变成零的时候，垃圾回收器会删除这个对象。


### 属性读取

在 Python 里请不要使用属性（attributes）读取方法（getters 和 setters）。如果你之前学过其它语言（比如 java\php），你可能会想要在你的类里面定义属性读取方法。请不要这样做，直接使用属性就可以了，就像下面这样：

> 这个对于java\php的开发者一下子可能无法理解

```
class myclass(object):
    def __init__(self):
        self.name = 'tsing'
        
x = myclass()
print(x.name)   #不用在类中声明属性set/get方法，再通过set/get设置


```



### 装饰器

为了解决set和get的问题，python引入装饰器。

你可能想要更精确的调整控制属性访问权限，你可以使用 @property 装饰器，@property 装饰器就是负责把一个方法变成属性调用的。

> 注意：amount.setter 的声明

```
class Account(object):
    """账号类,
    amount 是美元金额.
    """
    def __init__(self, rate):
        self.__amt = 0
        self.rate = rate

    @property
    def amount(self):
        """账号余额（美元）"""
        return self.__amt

    @property
    def cny(self):
        """账号余额（人民币）"""
        return self.__amt * self.rate

    @amount.setter
    def amount(self, value):
        if value < 0:
            print("Sorry, no negative amount in the account.")
            return
        self.__amt = value

if __name__ == '__main__':
    acc = Account(6.6)
    acc.amount = 20
    print("Dollar amount:", acc.amount)
    print("In CNY:", acc.cny)
    acc.amount = -100
    print("Dollar amount:", acc.amount)
```

## 模块和包

### 模块定义

模块是包括 Python 定义和声明的文件。文件名就是模块名加上 .py 后缀。

例子胜过描述：


创建一个bars.py文件：

定义一个模块bars及定义3个函数

```
"""
Bars Module
============
这是一个打印不同分割线的示例模块
"""
def starbar(num):
    """打印 * 分割线

    :arg num: 线长
    """
    print('*' * num)

def hashbar(num):
    """打印 # 分割线

    :arg num: 线长
    """
    print('#' * num)

def simplebar(num):
    """打印 - 分割线

    :arg num: 线长
    """
    print('-' * num)
```

### 模块导入

导入模块：

```
import bars
bars.starbar(10)
# **********
```

也可以导入模块中指定函数：

> 注意：没有模块bars变量

```
from bars import starbar,hashbar
starbar(5)
```

### 默认模块

查看默认模块列表

```
>>> help()
>>> modules
>>> help(str) #查看str对象帮助文档
```

### 包
含有 __init__.py 文件的目录可以用来作为一个包，目录里的所有 .py 文件都是这个包的子模块。

__init__.py 最简单的方式就是放空，当然也可以自定义执行包的初始化代码。

比如有个处理音频的包：

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

### 包的使用

用户可以每次只导入包里的特定模块，例如:

    import sound.effects.echo

这样就导入了 sound.effects.echo 子模块。它必需通过完整的名称来引用:

    sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)

导入包时有一个可以选择的方式:

    from sound.effects import echo

这样就加载了 echo 子模块，并且使得它在没有包前缀的情况下也可以使用，所以它可以如下方式调用:

    echo.echofilter(input, output, delay=0.7, atten=4)

还有另一种变体用于直接导入函数或变量:

    from sound.effects.echo import echofilter

这样就又一次加载了 echo 子模块，但这样就可以直接调用它的 echofilter() 函数:

    echofilter(input, output, delay=0.7, atten=4)

### 包内引用

### 安装第三方模块

Requests 是一个第三方 Python 模块。

首先安装pip3

    sudo apt-get update
    sudo apt-get install python3-pip

然后用pip3安装requests

    sudo pip3 install requests

查看已安装第三方模块

    sudo pip3 list

## collections 集合类模块

### Counter

most_common() 方法返回最常见的元素及其计数，顺序为最常见到最少。

```
from collections import Counter
Counter("asdkfhajshfdkjashdf").most_common(3)
```

### defaultdict

### namedtuple

## 迭代器、生成器、装饰器、闭包

### 装饰器

给add函数，额外装饰处理

关键词：*args **kwargs 回调函数

```
def mydecorator(func):
    def wrapper(*args,**kwargs):
        print("before call")
        res = func(*args,**kwargs)
        print("after call")
        return res 
    return wrapper
         
@mydecorator
def add(a,b):
    return a+b 
num = add(1,3)
print(num)    
```


## 系统模块

### os

模块提供了与操作系统相关的功能。

大部分类unix系统的命令都有相应方法：

    os.chidir("/tmp")
    os.system("mkdir today")
### glob 文件通配符

    import glob
    glob.glob('*.py')
    #['1.py','2.py']
    

### sys 命令行参数

    import sys
    sys.exit(1) #退出脚本
    sys.argv #获取脚本参数列表，和php脚本一样第一个参数为脚本文件名，后续参数为输入参数
    
如在linux：

    python3 ./index.py "tsing" "real"

则sys.argv列表有三个值：

argv[0]:    
    
    ./  index.py,

argv[1]:

    tsing

argv[2]:

    real

### sys.stdin stdout stderr

### re 字符串正则匹配

    import re
    re.findall(r'\bf[a-z]*','which foot or hand fell fastest')

### 数学 math

    import math
    math.cos(math.pi/4.0)
    math.log(1024,2) #10

### 随机数 random

    import random
    random.choice([1,2,3]) # 1
    random.random() #0.1716166161
    random.randrange(6) #从1~6选一个整数
    
### 日期和时间 datetime

    from datetime import date
    now = date.today()
    now.strftime("%m-%d-%y")
    birthdayy = date(1990,1,1)
    age = now - birthday
    age.days

### 数据压缩

zlib,gzip,bz2,lzma,zipfile,tarfile

### timeit 性能度量

    >>> from timeit import Timer
    >>> Timer('t=a; a=b; b=t', 'a=1; b=2').timeit()
    0.57535828626024577
    >>> Timer('a,b = b,a', 'a=1; b=2').timeit()
    0.54962537085770791

### string

### threading 多线程

### logging 日志

    import logging
    logging.debug('Debugging information')
    logging.info('Informational message')
    logging.warning('Warning:config file %s not found', 'server.conf')
    logging.error('Error occurred')
    logging.critical('Critical error -- shutting down')

### decimal 十进制浮点数计算

### 列表工具

array  

collections




## unix环境TAB补全

首先创建一个文件：~/.pythonrc ，文件内写入如下内容：

    import rlcompleter, readline
    readline.parse_and_bind('tab: complete')
    
    
    history_file = os.path.expanduser('~/.python_history')
    readline.read_history_file(history_file)
    
    import atexit
    atexit.register(readline.write_history_file, history_file)
    
下一步在 ~/.bashrc 文件中设置 PYTHONSTARTUP 环境变量指向这个文件：

    $ export PYTHONSTARTUP=~/.pythonrc

现在，从今以后每当你打开 bash shell，你将会有 TAB 补全和 Python 解释器中代码输入的历史记录。

要在当前 shell 中使用，source 这个 bashrc 文件。

    $ source ~/.bashrc


## 虚拟环境virtualenv

    sudo pip3 install virtualenv

    mkdir virtual
    cd virtual
    #创建环境
    virtualenv virt1
    #激活环境
    source virt1/bin/activate
    #关闭虚拟环境
    deactivate
    
> 可以再创建另一个虚拟环境，两个虚拟环境安装不同模块，进行A/B环境测试

## 测试

### 范例 fact.py
```
import sys

def fact(n):
    """
    阶乘函数

    :arg n: 数字
    :returns: n 的阶乘

    """
    if n == 0:
        return 1
    return n * fact(n -1)

def div(n):
    """
    只是做除法
    """
    res = 10 / n
    return res


def main(n):
    res = fact(n)
    print(res)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        main(int(sys.argv[1]))
```

### 测试用例 fact_test.py

```
import unittest
from fact import fact

class TestFact(unittest.TestCase):
    """
    我们的基本测试类
    """

    def test_fact(self):
        """
        实际测试
        任何以 `test_` 开头的方法都被视作测试用例
        """
        res = fact(5)
        self.assertEqual(res, 120)


if __name__ == '__main__':
    unittest.main()
    
```

```
#测试结果

python3 fact_test.py

.
----------------------
Ran 1 test in 0.003s

OK

```

### assert语句
    
    |Method|Checks that|New in|
    |------ | ---- | ----- |
    |assertEqual(a, b)|	a == b|	
    |assertNotEqual(a, b)|	a != b	|
    |assertTrue(x)|	bool(x) is True	|
    |assertFalse(x)|	bool(x) is False|	
    |assertIs(a, b)|	a is b|	2.7
    |assertIsNot(a, b)|	a is not b|	2.7
    |assertIsNone(x)|	x is None|	2.7
    |assertIsNotNone(x)|	x is not None|	2.7
    |assertIn(a, b)|	a in b|	2.7
    |assertNotIn(a, b)|	a not in b|	2.7
    |assertIsInstance(a, b)|	isinstance(a, b)|	|2.7
    |assertNotIsInstance(a, b)|	not |isinstance(a, b)|	|2.7

## 疑问

- 列表、元组、集合的方法是通用的吗？比如add、pop，含义一样吗？

## 不方便

- 类、模块、函数相关注释不像java、php、js直观
- 类中属性set与get使用装饰器方式，不方便编写及理解
- 

