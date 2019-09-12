什么是promise，怎么用promise
==========================

- [**特点：**](#特点)
- [**缺点：**](#缺点)
- [**基本用法**](#基本用法)
- [**1. Promise.prototype.then()**](#1-promiseprototypethen)
- [**2. Promise.prototype.catch()**](#2-promiseprototypecatch)
- [**3. Promise.prototype.finally()**](#3-promiseprototypefinally)
- [**4.Promise.all的使用**](#4promiseall的使用)
- [**5、Promise.race的使用**](#5promiserace的使用)



Promise是异步编程的一种解决方案，比传统的回调函数和事件更合理和强大。

所谓Promise，简单来说就是一个容器，里面保存着某个未来才会结束的事情（通常是一个异步操作）。从语法上说，Promise是一个对象，从他可以获取异步操作的消息。

### **特点：** 

- 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（以失败）。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来。



- 一旦状态改变，就不会再变，任何时候都是可以得到这个结果的。Promise对象的状态改变只有两种可能：\*从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就会凝固，不会再变了。再对Promise对象添加回调函数也会立即得到这个结果。有了Promise对象，就可以将异步操作以同步操作的流程表达出来。

### **缺点：** 

首先无法取消Promise，一旦新建他就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部跑出的错误无法反应到外部。当pending的时候，无法知道进展到了哪一步。

### **基本用法**   


ES6规定，Promise对象是一个构造函数，用来生成Promise实例。

下面代码创造了一个Promise实例。

![](https://pic4.zhimg.com/v2-e8d4296d5962a5545c809d42fa522e2b_b.jpg)Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从"未完成"变成"成功"。（即从pending变为resolved）。在异步操作成功的时候调用，并将异步操作结果作为参数传递出去；

reject函数的作用是，将promise对象的状态从"未完成"变成"失败"（即从pending变为rejected）。在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成后，可以用then方法分别指定resolve状态和rejected状态的回调函数。

![](https://pic2.zhimg.com/v2-7b795f2ea613069435cd6137ceb9d4bd_b.jpg)then方法可以接受两个回调函数作为参数，

第一个回调函数是promise对象的状态变为resolved的时候调用，

第二个回调函数是promise对象的状态变为rejected时调用。

其中第二个函数是可选的，不一定需要提供。

这两个函数都接受Promise对象传出的值作为参数。

![](https://pic4.zhimg.com/v2-5bb37d354879829b97ffd98c12c3daa3_b.jpg)上面代码中，timeout方法返回一个Promise实例，表示一段时间后才会发生的结果。

过了指定的时间以后，Promise实例的状态变为resolved，就会触发then方法绑定的回调函数。

Promise新建后就会立即执行。

![](https://pic2.zhimg.com/v2-b4b406df2f351a14c8f9139d545f0211_b.jpg)上面代码中，Promise新建后立即执行，所以首先输出的是Promise，然后then方法指定回调函数，将在当前脚本所有同步任务执行完成后才会执行，所以resolved最后输出。

如下是一个异步加载图片的例子：

![](https://pic2.zhimg.com/v2-b62610e12edbd9104251c84230a55b51_b.jpg)上面代码中，使用Promise包装一个图片加载的异步操作，如果加载成功就调用resolve方法， 否则就调用rejected方法。

### **1. Promise.prototype.then()** 

Promise实例具有then方法，也就是说then方法时定义在原型对象上的。

它的作用是为Promise实例添加状态改变时的回调函数。

前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数（可选）。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）因此可以采用链式写法，即then方法后面再调用另一个then方法。

采用链式的then可以指定一组按照次序调用的回调函数。这时，前一个回调函数可能返回一个还是Promise对象（即有异步操作），这时候一个回调函数就会等该Promise对象的状态发生变化，才会被调用。

![](https://pic1.zhimg.com/v2-002ddce139ea69cb5d49f599b8ae0c98_b.jpg)上面代码中，第一个then方法指定的回调函数，返回的是一个Promise对象。这时，第二个方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA, 如果状态变为rejected，就调用funcB.

### **2. Promise.prototype.catch()** 

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

![](https://pic2.zhimg.com/v2-cc3f9191602fddfd68e51f7d8024317d_b.jpg)上面代码中，getJSON方法返回一个Promise对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数。另外，then方法指定的回调函数，如果运行抛出错误，也会被catch方法捕获。

![](https://pic1.zhimg.com/v2-b7919eae83853ea326fafb33b6d91180_b.jpg)如果Promise状态以及变成resolved，再抛出错误是无效的。因为Promise的状态一旦改变，就永久保持该状态，不会再变了。

Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止，也就是说错误总会被下一个catch语句捕获。

### **3. Promise.prototype.finally()** 

finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。

### **4.Promise.all的使用** 

Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

具体代码如下：

![](https://pic2.zhimg.com/v2-849d66f5be6952f7f76175b97b5b38f9_b.jpg)Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。

![](https://pic1.zhimg.com/v2-a92097c37efda2ca1bd6d048fb1d94e0_b.jpg)需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

### **5、Promise.race的使用** 

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race(\[p1, p2, p3\])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

![](https://pic4.zhimg.com/v2-1a7675b60a71ff32f8558d058930dc57_b.jpg)原理是挺简单的，但是在实际运用中还没有想到什么的使用场景会使用到。

举例：超时取消

我们来看一下如何使用Promise.race来实现超时机制。

当然XHR有一个 timeout 属性，使用该属性也可以简单实现超时功能，但是为了能支持多个XHR同时超时或者其他功能，我们采用了容易理解的异步方式在XHR中通过超时来实现取消正在进行中的操作。

**1. 让Promise等待指定时间** 
----------------------

首先我们来看一下如何在Promise中实现超时。

所谓超时就是要在经过一定时间后进行某些操作，使用 setTimeout 的话很好理解。

首先我们来串讲一个单纯的在Promise中调用 setTimeout 的函数。

![](https://pic2.zhimg.com/v2-474de1090bb014d38b62e45adc1e20b9_b.jpg)delayPromise(ms) 返回一个在经过了参数指定的毫秒数后进行onFulfilled操作的promise对象，这和直接使用 setTimeout 函数比较起来只是编码上略有不同，如下所示。

![](https://pic2.zhimg.com/v2-3e79d24244ae424fd46a9e6f8a1fd42d_b.jpg)在这里 promise对象 这个概念非常重要，请切记。

**2. Promise.race中的超时** 
------------------------

我们可以将刚才的 delayPromise 和其它promise对象一起放到 Promise.race 中来是实现简单的超时机制。

![](https://pic2.zhimg.com/v2-806de9dbc3b5cded23d3cb389ef0e875_b.jpg)函数 timeoutPromise(比较对象promise, ms) 接收两个参数，第一个是需要使用超时机制的promise对象，第二个参数是超时时间，它返回一个由 Promise.race 创建的相互竞争的promise对象。

之后我们就可以使用 timeoutPromise 编写下面这样的具有超时机制的代码了。

![](https://pic1.zhimg.com/v2-e001274cc8b4561465adeec11ea7de28_b.jpg)虽然在发生超时的时候抛出了异常，但是这样的话我们就不能区分这个异常到底是\_普通的错误\_还是\_超时错误\_了。

为了能区分这个 Error 对象的类型，我们再来定义一个Error 对象的子类 TimeoutError。

**扩展知识：定制Error对象** 
-------------------

Error 对象是ECMAScript的内建（build in）对象。

但是由于stack trace等原因我们不能完美的创建一个继承自 Error 的类，不过在这里我们的目的只是为了和Error有所区别，我们将创建一个 TimeoutError 类来实现我们的目的。

在ECMAScript6中可以使用 class 语法来定义类之间的继承关系。

![](https://pic3.zhimg.com/v2-a62f886509b65ec883329205933d424e_b.png)为了让我们的 TimeoutError 能支持类似 error instanceof TimeoutError 的使用方法，我们还需要进行如下工作。

![](https://pic4.zhimg.com/v2-aef671d8c57896c445745472d747f127_b.jpg)我们定义了 TimeoutError 类和构造函数，这个类继承了Error的prototype。

它的使用方法和普通的 Error 对象一样，使用 throw 语句即可，如下所示。

![](https://pic4.zhimg.com/v2-65b0632757ff8f881794729d4e37e363_b.png)有了这个 TimeoutError 对象，我们就能很容易区分捕获的到底是因为超时而导致的错误，还是其他原因导致的Error对象了。



<font size=2 color=grey>[阅读原文](https://zhuanlan.zhihu.com/p/81431697)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
