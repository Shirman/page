
<!-- TOC -->

- [1.Promise](#1promise)
    - [1.简介](#1简介)
    - [2.then](#2then)
    - [3.链式调用](#3链式调用)
    - [4.catch](#4catch)
    - [5.Promise.resolve()](#5promiseresolve)
    - [6.Promise.reject()](#6promisereject)
    - [7.Promise.all()](#7promiseall)
    - [8.Promise.race](#8promiserace)
    - [9.异常处理](#9异常处理)
- [2.Async-Await](#2async-await)
    - [1.简介：](#1简介)
    - [2.基本语法](#2基本语法)
    - [3.规则](#3规则)
    - [4.应用](#4应用)
    - [5.错误处理](#5错误处理)
    - [6.注意你的并行执行和循环](#6注意你的并行执行和循环)

<!-- /TOC -->
  
    原创Lawliet_ZMZ
    ————————————————
    版权声明：本文为CSDN博主「Lawliet_ZMZ」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
    原文链接：https://blog.csdn.net/major_zhang/article/details/79154287

## 1.Promise


### 1.简介

Promise,简单来说就是一个容器，里面保存着某个未来才会结束的时间(通常是一个异步操作的结果)

Promise对象的基本语法：

```
new Promise((resolve,reject) => {
    //.....
});

```

从语法上来说，Promise是一个对象，从它可以获取异步操作的消息。

基本语法：

```
let p = new Promise((resolve,reject) => {
    //...
    resolve('success')
});

p.then(result => {
    console.log(result);//success
});

```

Promise对象特点和三个状态：

  


![](https://upload-images.jianshu.io/upload_images/9146767-54453d1e7bbf50ee)



这里写图片描述



例如：

```
let p = new Promise((resolve,reject) => {
    //...
    resolve('success');
    console.log('after resolve');
    reject('error');
});

p.then(result => {
    console.log(result);
});

p.catch(result => {
    console.log(result);
})

```

运行结果：  
after resolve  
success

resolve下面的语句其实是可以执行的，那么为什么reject的状态信息在下面没有接受到呢？这就是因为Promise对象的特点：状态的凝固。new出一个Promise对象时，这个对象的起始状态就是Pending状态，在根据resolve或reject返回Fulfilled状态/Rejected状态。

### 2.then



![](https://upload-images.jianshu.io/upload_images/9146767-c149b0295cd07d8a)



这里写图片描述



Then分别接受resolve和reject的信息，有三种参数形式，第三种比较“怪异”，只用来接收做reject处理。

eg：

```
let p = new Promise((resolve,reject) => {
    //...
    let random = Math.random();//小于1大于0
    if(random > 0.4) {
        resolve('random > 0.4');
    }else {
        reject('random <= 0.4');
    }
});

p.then(result => {
    console.log('resolve',result);
}, result => {
    console.log('reject',result);
});



```

### 3.链式调用

我们来执行一段代码：

```
let p = new Promise((resolve,reject) => {
    reject('reject');
});

let resultP = p.then(null,result => {
    console.log(result);
});

console.log(resultP);

```

结果：  
Promise { <pending> }  
reject

js的执行顺序就是这样，同步->异步->回调，在同步执行的时候，Promise对象还处于pending的状态，也说明了这个then返回的是一个Promise对象。

而且必须在then里面给一个返回值，才能继续调用，否则undefined。  
eg：

```
let p = new Promise((resolve,reject) => {
    reject('error');
});

let resultP = p.then(null,result => {
    console.log(result);
    return 123;
});

// console.log(resultP);
resultP.then(tmp => {
    console.log(tmp);
})

```

结果：  
error  
123

### 4.catch



![](https://upload-images.jianshu.io/upload_images/9146767-a804302326040455)



这里写图片描述



eg:

```
let p = new Promise((resolve,reject) => {
    reject('error');
});

p.catch(result => {
    console.log(result);
})

```

那这个catch的返回值是什么呢：  
和上面then是一样的。

### 5.Promise.resolve()



![](https://upload-images.jianshu.io/upload_images/9146767-24f9f343baf5497a)



这里写图片描述



传一个普通的对象：

```
// let p1 =Promise.resolve(123);
let p1 =Promise.resolve({name:'xixi',age:'xxxx'});

p1.then(result => {
    console.log(result);
});

```

如果是Promise对象呢，直接返回

```
let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('success');
    },500);
});

let pp = Promise.resolve(p);

pp.then(result => {
    console.log(result);
});

console.log(pp == p);

```

结果：  
true  
success

### 6.Promise.reject()



![](https://upload-images.jianshu.io/upload_images/9146767-cb1a9428c024a183)



这里写图片描述



eg：

```
let p = Promise.reject(123);

console.log(p);

p.then(result => {
    console.log(result);
}).catch(result => {
    console.log('catch',result);
})

```

结果：  
Promise { <rejected> 123 }  
catch 123

### 7.Promise.all()



![](https://upload-images.jianshu.io/upload_images/9146767-f53a9487f29d4247)



这里写图片描述



eg：

```
let p1 = Promise.resolve(123);
let p2 = Promise.resolve('hello');
let p3 = Promise.resolve('success');


Promise.all([p1,p2,p3]).then(result => {
    console.log(result);
})

```

结果：  
\[ 123, 'hello', 'success' \]

成功之后就是数组类型，当所有状态都是成功状态才返回数组，只要其中有一个的对象是reject的，就返回reject的状态值。  
eg：

```
let p1 = Promise.resolve(123);
let p2 = Promise.resolve('hello');
let p3 = Promise.resolve('success');
let p4 = Promise.reject('error');

// Promise.all([p1,p2,p3]).then(result => {
//     console.log(result);
// });

Promise.all([p1,p2,p4]).then(result => {
    console.log(result);
}).catch(result => {
    console.log(result);
});

```

结果：  
error

又一个eg：

```
//用sleep来模仿浏览器的AJAX请求
function sleep(wait) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res(wait);
        },wait);
    });
}

let p1 = sleep(500);
let p2 = sleep(500);
let p3 = sleep(1000);

Promise.all([p1,p2,p3]).then(result => {
    console.log(result);
    //.....
    //loading
});

```

### 8.Promise.race



![](https://upload-images.jianshu.io/upload_images/9146767-ed5178d2bcc7dbe7)



这里写图片描述



和all同样接受多个对象，不同的是，race()接受的对象中，哪个对象返回的快就返回哪个对象，就如race直译的赛跑这样。如果对象其中有reject状态的，必须catch捕捉到，如果返回的够快，就返回这个状态。race最终返回的只有一个值。  
eg：

```
//用sleep来模仿浏览器的AJAX请求
function sleep(wait) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res(wait);
        },wait);
    });
}

let p1 = sleep(500);
let p0 = sleep(2000);

Promise.race([p1,p0]).then(result => {
    console.log(result);
});

let p2 = new Promise((resolve,reject) => {
    setTimeout(()=>{
        reject('error');
    },1000);
});

Promise.race([p0,p2]).then(result => {
    console.log(result);
}).catch(result => {
    console.log(result);
});

```

500  
error

### 9.异常处理



![](https://upload-images.jianshu.io/upload_images/9146767-36e82b6410887625)



这里写图片描述



为什么说安静，一个例子，Pormise内部的错误外界用try-catch捕捉不到  
eg：

```
try {
    let p = new Promise((resolve, reject) => {
        throw new Error("I'm error");
        // reject(new Error("I'm Error"));
    });
}catch(e) {
    console.log('catch',e);
}

```

结果什么都没打印。  
但是抛出的错误可以通过catch来捕捉：

```
// try {
    let p = new Promise((resolve, reject) => {
        throw new Error("I'm error");
        // reject(new Error("I'm Error"));
    });
// }catch(e) {
//     console.log('catch',e);
// }


p.catch(result => {
    console.log(result);
});



```

这样就捕捉到错误。所以:

  


![](https://upload-images.jianshu.io/upload_images/9146767-38d680f9ec330ef1)



这里写图片描述



## 2.Async-Await


### 1.简介：



![](https://upload-images.jianshu.io/upload_images/9146767-7de96f91d82c6f32)



这里写图片描述





![](https://upload-images.jianshu.io/upload_images/9146767-1a7ea8e3ca647801)



这里写图片描述



async和await在干什么，async用于申明一个function是异步的，而await可以认为是async wait的简写，等待一个异步方法执行完成。

### 2.基本语法



![](https://upload-images.jianshu.io/upload_images/9146767-845d07637938117b)



这里写图片描述



  
在Chrome里申明这样一个函数，可以在控制台看到返回的其实就是一个Promise对象。  
扩展需要了解的就是Chrome现在也支持asyncFunction,可以在Chrome控制台测试：  
console.log(async function(){}.constructor);  
ƒ AsyncFunction() { \[native code\] }

### 3.规则



![](https://upload-images.jianshu.io/upload_images/9146767-1c058fed80b4b016)



这里写图片描述



如图，await放在普通函数里是会报错的。



![](https://upload-images.jianshu.io/upload_images/9146767-4c411fc9eac1f579)



这里写图片描述



eg：

```
async function demo() {
    let result = await Promise.resolve(123);
    console.log(result);
}
demo();

```

### 4.应用

Promise虽然一方面解决了callback的回调地狱，但是相对的把回调“纵向发展”了，形成了一个回调链。eg：

```
function sleep(wait) {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res(wait);
        },wait);
    });
}

/*
let p1 = sleep(100);
let p2 = sleep(200);
let p =*/

sleep(100).then(result => {
    return sleep(result + 100);
}).then(result02 => {
    return sleep(result02 + 100);
}).then(result03 => {
    console.log(result03);
})


```

控制台：  
300

后面的结果都是依赖前面的结果。  
改成async/await写法就是：

```
async function demo() {
    let result01 = await sleep(100);
    //上一个await执行之后才会执行下一句
    let result02 = await sleep(result01 + 100);
    let result03 = await sleep(result02 + 100);
    // console.log(result03);
    return result03;
}

demo().then(result => {
    console.log(result);
});

```

因为async返回的也是promise对象，所以用then接受就行了。  
结果：  
300  
需要注意的就是await是强制把异步变成了同步，这一句代码执行完，才会执行下一句。

### 5.错误处理



![](https://upload-images.jianshu.io/upload_images/9146767-778ada3e989dfce9)



这里写图片描述



如果是reject状态，可以用try-catch捕捉  
eg：

```
let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject('error');
    },1000);
});

async function demo(params) {
    try {
        let result = await p;
    }catch(e) {
        console.log(e);
    }
}

demo();

```

结果：  
error  
这是基本的错误处理，但是当内部出现一些错误时，和上面Promise有点类似，demo（）函数不会报错，还是需要catch回调捕捉。这就是内部的错误被“静默”处理了。

```
let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject('error');
    },1000);
});

async function demo(params) {
    // try {
        let result = name;
    // }catch(e) {
    //     console.log(e);
    // }
}

demo().catch((err) => {
    console.log(err);
})

```

### 6.注意你的并行执行和循环

比如上面的例子：

  


![](https://upload-images.jianshu.io/upload_images/9146767-d5b2d2a42bdae73d)



这里写图片描述



如果这三个是你想异步发出的AJAX请求，在这段代码里其实是同步的，第一个发出去才会发第二个，所以async/await需要谨慎使用。



![](https://upload-images.jianshu.io/upload_images/9146767-56019d7386325726)



这里写图片描述



现在有一些forEach或者map的循环里，比如在forEach里使用await，这时候的上下文就变成了array，而不是async function，就会报错。这时候你就要想到是什么错误。

<font size=2 color=grey>[阅读原文](https://blog.csdn.net/major_zhang/article/details/79154287)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。


