
  
Python不同于C/C++、java，程序执行并不需要主程序，如main()，而是文件自上而下的执行。  

但很多Python程序中都有这样的语句：

 ```python
if __name__ == '__main__':
    statements
```


这段代码的主要作用主要是让该python文件既可以独立运行，也可以当做模块导入到其他文件。

当导入到其他的脚本文件的时候，此时\_\_name\_\_的名字其实是导入模块的名字，不是\_\_main\_\_, 所有这个if里的代码就不执行了。

比如我们写一个程序test.py：

 ```python
def fun():
    print 'This is function'
if __name__ == '__main__':
    fun()
    print 'This is main'

```
 
终端执行这个程序，得到结果：

```
This is function
This is main
```

以上输出为test.py顺序执行的结果。

---

然后我们将test作为模块引入

```
import test
```

得到结果：
```
This is function
```

发现，\_\_main\_\_模块中的代码并未执行。


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
