JavaScript面试概要
====================


- [闭包](#闭包)
- [作用域，作用域链](#作用域作用域链)
- [原型，原型链](#原型原型链)
- [事件代理](#事件代理)
- [继承](#继承)
- [谈谈This对象的理解](#谈谈this对象的理解)
- [事件模型](#事件模型)
- [new操作符具体干了什么呢?](#new操作符具体干了什么呢)
- [Ajax原理](#ajax原理)
- [跨域](#跨域)
- [深浅拷贝](#深浅拷贝)
- [数组去重](#数组去重)
- [防抖/节流](#防抖节流)
- [call, apply, bind 区别](#call-apply-bind-区别)
- [重绘和回流](#重绘和回流)
- [怎么判断对象类型](#怎么判断对象类型)
- [instanceof 原理](#instanceof-原理)
- [存储](#存储)
- [Service Worker](#service-worker)
- [let/const](#letconst)
- [模块化](#模块化)
- [Proxy](#proxy)
- [map, filter, reduce](#map-filter-reduce)
- [Generator](#generator)
- [Promise](#promise)
- [async,await](#asyncawait)
- [Event Loop](#event-loop)
- [Decorator](#decorator)
- [减少 Webpack 打包时间](#减少-webpack-打包时间)
- [减少 Webpack 打包后的文件体积](#减少-webpack-打包后的文件体积)


### 闭包

当function里嵌套function时，内部的function可以访问外部function里的变量

```
function a(a){
 var c = 1
    return function(b){
        alert(a+b+c)        
}
} 
var b = a(1)
b(1) // 3
```

- 用处： 可以读取函数内部的变量，让变量始终保持在内存里
- 坏处： 消耗内存，使用不当会导致内存溢出

### 作用域，作用域链

变量作用域  
全局变量，局部变量  
函数作用域

根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问。

js为每一个执行环境关联了一个变量对象。环境中定义的所有变量和函数都保存在这个对象中。

在JavaScript中，函数也是对象，实际上，JavaScript里一切都是对象。函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是\[\[Scope\]\]，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问。

当一个函数创建后，它实际上保存一个作用域链，并且作用域链会被创建此函数的作用域中可访问的数据对象填充。

### 原型，原型链

原型分为显式原型和隐式原型

- 每个函数都有个属性显式原型（prototype） ，这个属性的属性值是一个对象，默认只有一个叫constructor的属性，指向函数本身
- 每个对象都有一个隐式原型（`__proto__`），指向创建该对象的函数的显式原型（prototype），即：`fn.__proto__ === Fn.prototype`
- Object.prototype确实一个特例——它的`__proto__`指向的是null
- 自定义函数的prototype本质上就是和 var obj = {} 是一样的，都是被Object创建，所以它的`__proto__`指向的就是Object.prototype

原型链： 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着`__proto__`这条链向上找，这就是原型链

### 事件代理

事件代理（Event Delegation），又称之为事件委托。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。  
事件代理的原理是DOM元素的事件冒泡。  
使用事件代理的好处是可以提高性能  
可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件就非常棒  
可以实现当新增子对象时无需再次对其绑定

### 继承

在 ES5 中，继承实现思路就是将子类的原型设置为父类的原型  
在 ES6 中，我们可以通过 class 语法轻松解决这个问题

先创建父类实例 => 改变实例原先的 `__proto__` 转而连接到子类的 prototype => 子类的 prototype 的 `__proto__` 改为父类的 prototype。

<https://juejin.im/post/5bcb2e295188255c55472db0>

### 谈谈This对象的理解

this 指向最后调用它的对象

1、直接调用的 this 是window  
2、obj.foo() this是obj  
3、new 的方式，this 被绑定在了c 上面，不会被任何方式改变  
4、箭头函数其实是没有this的，箭头函数的this 只取决于包裹箭头函数的第一个普通函数的this。  
5、 bind 这些改变上下文的 API ，对于这些函数来说，this 取决于第一个参数，如果第一个参数为空，那么就是 window。

### 事件模型

W3C中定义事件的发生经历三个阶段：捕获阶段（capturing）、目标阶段（targetin）、冒泡阶段（bubbling）

冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发  
捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发  
DOM事件流：同时支持两种事件模型：捕获型事件和冒泡型事件  
阻止冒泡：在W3c中，使用stopPropagation（）方法；在IE下设置cancelBubble = true  
阻止捕获：阻止事件的默认行为，例如click - <a>后的跳转。在W3c中，使用preventDefault（）方法，在IE下设置window.event.returnValue = false</a>

### new操作符具体干了什么呢?

- 新生成了一个对象
- 链接到原型
- 绑定 this
- 返回新对象

### Ajax原理

Ajax的原理简单来说是在用户和服务器之间加了—个中间层(AJAX引擎)，  
通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，  
然后用javascript来操作DOM而更新页面。使用户操作与服务器响应异步化。  
这其中最关键的一步就是从服务器获得请求数据

优点：

```
通过异步模式，提升了用户体验.
优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.
Ajax在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
Ajax可以实现动态不刷新（局部刷新）
```

缺点：

```
安全问题 AJAX暴露了与服务器交互的细节。
对搜索引擎的支持比较弱。
不容易调试。

```

### 跨域

- JSONP  
  JSONP 的原理很简单，就是利用 \<script\> 标签没有跨域限制的漏洞。

通过 \<script\> 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

JSONP 使用简单且兼容性不错，但是只限于 get 请求

- CORS  
  CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。

浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。  
服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。   
该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

- document.domain

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。  
只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

- postMessage  
  这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

### 深浅拷贝

浅拷贝：

- Object.assign
- 展开运算符（…）

```
let a = {
    age: 1
}
let b = {...a}
```

深拷贝

- JSON.parse(JSON.stringify(object))  
  会忽略 undefined

会忽略 symbol  
不能序列化函数  
不能解决循环引用的对象

- lodash 的深拷贝函数
- MessageChannel (所需拷贝的对象含有内置类型并且不包含函数)
- 递归函数

### 数组去重

- 用ES6 Set去重
- for循环
- indexOf
- 对象属性名称唯一性

### 防抖/节流

防抖和节流的作用都是防止函数多次调用。  
区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，  
而节流的 情况会每隔一定时间（参数wait）调用函数。  
防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

### call, apply, bind 区别

call 和 apply 都是为了解决改变 this 的指向。作用都是相同的，只是传参的方式不同  
除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。  
bind 和其他两个方法作用也是一致的，只是该方法会返回一个函数。并且我们可以通过 bind 实现柯里化。

### 重绘和回流

重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘  
回流是布局或者几何属性需要改变就称为回流。  
回流必定会发生重绘，重绘不一定会引发回流

### 怎么判断对象类型

可以通过 Object.prototype.toString.call(xx)。这样我们就可以获得类似 \[object Type\] 的字符串。

### instanceof 原理

instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

### 存储

- cookie  
  一般由服务器生成，可以设置过期时间,4K
- localStorage  
  除非被清理，否则一直存在,5M
- sessionStorage  
  页面关闭就清理 ,5M
- indexDB  
  除非被清理，否则一直存在,无限

### Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。

Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

- - - - - -

ES6
---

### let/const

首先在全局作用域下使用 let 和 const 声明变量，变量并不会被挂载到 window 上，这一点就和 var 声明有了区别

函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部  
var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用  
var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会  
let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

### 模块化

解决命名冲突  
提供复用性  
提高代码可维护性

实现方案

立即执行函数  
AMD 和 CMD  
CommonJS  
ES Module

### Proxy

let p = new Proxy(target, handler)  
target 代表需要添加代理的对象，handler 用来自定义对象中的操作，比如可以用来自定义 set 或者 get 函数。

Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

如果需要实现一个 Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。

### map, filter, reduce

map 作用是生成一个新数组，遍历原数组

reduce 可以将数组中的元素通过回调函数最终转换为一个值。

reduce ，它接受两个参数，分别是回调函数和初始值

```
const arr = [1, 2, 3]
const sum = arr.reduce((acc, current) => acc + current, 0)
console.log(sum)
```

首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入  
回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数  
在一次执行回调函数时，当前值和初始值相加得出结果 1，该结果会在第二次执行回调函数时当做第一个参数传入  
所以在第二次执行回调函数时，相加的值就分别是 1 和 2，以此类推，循环结束后得到结果 6

### Generator

Generator 最大的特点就是可以控制函数的执行  
一种可以用来控制迭代器（iterator）的函数，它可以随时暂停，并可以在任意时候恢复  
生成器函数只有在需要的时候它才会产生下一个值，而不会一次性产生所有的值。

- yield

yield 类似 return，但又不完全相同。return 会在完成函数调用后简单地将值返回，  
在 return 语句之后的语句是不会执行的，你无法进行任何操作。

在生成器中，我们通常会在输出时得到一个对象。这个对象有两个属性：value 与 done。如你所想，value 为返回值，done 则会显示生成器是否完成了它的工作。

- next() 方法

这是最常用的方法。它每次被调用时都会返回下一个对象。在生成器工作结束时，next() 会将 done 属性设为 true，value 属性设为 undefined。

### Promise

- 解决地狱回调
- 3种状态  
  等待中（pending）

完成了（resolved）  
拒绝了（rejected）

这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变

Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装

其实它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。

### async,await

一个函数如果加上 async ，那么该函数就会返回一个 Promise

async 就是将函数返回值使用 Promise.resolve() 包裹了下，和 then 中处理返回值一样，并且 await 只能配套 async 使用

await 内部实现了 generator，其实 await 就是 generator 加上 Promise 的语法糖，且内部实现了自动执行 generator。

### Event Loop

当遇到异步的代码时，会被挂起并在需要执行的时候加入到 Task（有多种 Task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）

所以 Event Loop 执行顺序如下所示：

首先执行同步代码，这属于宏任务  
当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行  
执行所有微任务  
当执行完所有微任务后，如有必要会渲染页面  
然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

### Decorator

- - - - - -

webpack
-------

### 减少 Webpack 打包时间

- 优化 Loader, 优化 Loader 的文件搜索范围

1. 文件才使用 babel, 只在 src 文件夹下查找, 不会去查找node\_modules路径

- HappyPack  
  HappyPack 可以将 Loader 的同步执行转换为并行的
- DllPlugin  
  DllPlugin 可以将特定的类库提前打包然后引入

### 减少 Webpack 打包后的文件体积

- 按需加载  
  为了首页能更快地呈现给用户，我们肯定是希望首页能加载的文件体积越小越好，这时候我们就可以使用按需加载，将每个路由页面单独打包为一个文件
- Scope Hoisting  
  Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。
- Tree Shaking  
  Tree Shaking 可以实现删除项目中未被引用的代码

---

markdown @tsingchan 

