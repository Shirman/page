

- [Vue实例](#vue实例)
- [生命周期](#生命周期)
- [模板语法](#模板语法)
    - [插值](#插值)
    - [指令](#指令)
    - [缩写](#缩写)
- [计算属性](#计算属性)
- [侦听器](#侦听器)
- [Class 与 Style 绑定](#class-与-style-绑定)
    - [绑定HTML CLASS](#绑定html-class)
    - [绑定内联样式](#绑定内联样式)
- [条件渲染](#条件渲染)
- [列表渲染](#列表渲染)
    - [数组的v-for](#数组的v-for)
    - [对象的v-for](#对象的v-for)
    - [数组检测更新](#数组检测更新)
    - [<template>使用v-for](#template使用v-for)
    - [v-for 与 v-if](#v-for-与-v-if)
    - [组件的v-for](#组件的v-for)
- [事件处理](#事件处理)
    - [监听事件](#监听事件)
    - [事件处理方法](#事件处理方法)
    - [内联处理器中的方法](#内联处理器中的方法)
    - [事件修饰符](#事件修饰符)
    - [按键修饰符](#按键修饰符)
    - [鼠标按钮修饰符](#鼠标按钮修饰符)
- [表单输入绑定](#表单输入绑定)
    - [基础用法](#基础用法)
    - [值绑定](#值绑定)
    - [修饰符](#修饰符)
- [组件基础](#组件基础)
    - [组件复用](#组件复用)
    - [组件的组织](#组件的组织)
    - [组件注册](#组件注册)
    - [模块系统](#模块系统)
    - [通过Prop向子组件传递数据](#通过prop向子组件传递数据)
    - [Prop单向数据流](#prop单向数据流)
    - [Prop数据验证](#prop数据验证)
    - [非Prop的特性](#非prop的特性)
    - [单个根元素](#单个根元素)
    - [监听子组件事件](#监听子组件事件)
    - [子组件事件抛出一个值](#子组件事件抛出一个值)
    - [组件上使用v-model](#组件上使用v-model)
    - [动态组件](#动态组件)
    - [异步组件](#异步组件)
- [自定义事件](#自定义事件)
    - [事件名称](#事件名称)
    - [触发事件](#触发事件)
    - [组件prop与外部数据进行"双向绑定"（.sync修饰符）](#组件prop与外部数据进行双向绑定sync修饰符)
- [插槽](#插槽)
    - [通过插槽分发内容](#通过插槽分发内容)
    - [编辑作用域](#编辑作用域)
    - [默认内容](#默认内容)
    - [具名插槽](#具名插槽)
- [过渡与动画](#过渡与动画)
- [单文件组件](#单文件组件)
- [规模化](#规模化)
- [响应式原理](#响应式原理)
- [Vue 与 React、Angular](#vue-与-reactangular)
- [疑问](#疑问)



### Vue实例

- mvvm模型：没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。

- 根vue实例：一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例

- 响应式：只有当实例被创建时，data中存在的属性才是响应式的。

- 阻止响应式：Object.freeze(dataObj);

- 暴露实例属性与方法：都有前缀$,

```    
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})

```

### 生命周期

- this：生命周期钩子的 this 上下文指向调用它的 Vue 实例

> 不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数是和父级上下文绑定在一起的，this 不会是如你所预期的 Vue 实例

- vue生命周期图示：
![vue生命周期图示](https://cn.vuejs.org/images/lifecycle.png)

### 模板语法
- 底层实现：在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。

#### 插值

- 文本

mustache语法：{{}}，双大括号会将数据解释为普通文本，而非 HTML 代码。

v-once指令：能执行一次性地插值，当数据改变时，插值处的内容不会更新。
```
<span v-once>这个将不会改变: {{ msg }}</span>
```

- 原始HTML

上面说了mustache语法{{}}会将数据解析成文本，
为了输出真正的 HTML，你需要使用 v-html 指令：
```
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

> 注意：你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

- 特性

Mustache 语法不能作用在 HTML 特性上，比如需要双向绑定id的值时，遇到这种情况应该使用 v-bind 指令：

```
<div v-bind:id="dynamicId"></div>
```

- 使用javascript表达式

前面一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

> 这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

```js
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}

```

> 你不应该在模板表达式中试图访问用户定义的全局变量。

#### 指令

- 指令

指令：指令 (Directives) 是带有 v- 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。

指令的职责：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

```
<p v-if="seen">现在你看到我了</p>
```

这里，v-if指令将根据表达式 seen 的值的真假来插入/移除\<p\>元素。

- 参数

一些指令能够接收一个"参数"，在指令名称之后以冒号表示。

```
<a v-bind:href="url">...</a>
```
在这里 href 是参数，告知 v-bind 指令将该元素的 href 特性与表达式 url 的值**绑定**。

另一个例子是 v-on 指令，它用于**监听** DOM 事件：
```
<a v-on:click="doSomething">...</a>
```

在这里参数是**监听**的事件名。

- 动态参数

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```
<a v-bind:[attributeName]="url"> ... </a>

```

- 修饰符

```
<form v-on:submit.prevent="onSubmit">...</form>
```
常用语v-on  v-for


#### 缩写

v- 前缀作为一种视觉提示，用来识别模板中 Vue 特定的特性。

~~吧啦吧啦~~，处于各种原因，主要是为了提高编码效率和代码美观，vue为v-bind和v-on这两常用指令提供了特定简写方式：

```
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

```


```
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```


### 计算属性

基础例子：

关键代码：computed对象 ，getter，reversedMessage；

```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})

```
结果：

Original message: "Hello"

Computed reversed message: "olleH"

> 其实我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

> 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。


### 侦听器

除了 watch 选项之外，您还可以使用命令式的 [vm.$watch API](https://cn.vuejs.org/v2/api/#vm-watch)


### Class 与 Style 绑定

#### 绑定HTML CLASS

- 对象语法

除了可以拼接字符串外，vue还专门做了增强，支持对象和数组方式：

```
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```
```
data: {
  isActive: true,
  hasError: false
}
```

渲染结果：

```
<div class="static active"></div>
```

**绑定的数据对象不必内联定义在模板里：**

```
<div v-bind:class="classObject"></div>
```

```
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

> 同样的，我们也可以考虑使用计算属性，来实现CLASS对象，这会是一种常用且强大的使用方式。可以减少大量不必要的判断与计算开销。

- 数组语法

如果用的不娴熟，建议还是统一使用对象语法。

- 用在组件上

声明组件：

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

使用组件，并添加一些自定义class：
```
<my-component class="baz boo"></my-component>
```

组件模板渲染结果：

```
<p class="foo bar baz boo">Hi</p>
```

动态绑定自定义class：

```
<my-component v-bind:class="{ active: isActive }"></my-component>
```

当isActive为truthy时，渲染结果为：

```
<p class="foo bar active">Hi</p>
```

#### 绑定内联样式

与绑定HTML CLASS的语法类似。

- 对象语法

通常直接绑定到一个样式对象更好：

```
<div v-bind:style="styleObject"></div>
```

```
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

- 数组语法

建议采用对象语法。

- 多重值

```
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。

### 条件渲染

- v-if指令

> 用于条件性地渲染一块内容，v-else用于添加else块。

看简单例子：

```
<h1 v-if="awesome">Vue is awesome!</h1>
```

> <template>元素上也可以使用v-if

> v-else-if 可以用来表示v-if的else if块

> v-else 可以用来表示v-if的else 块

> key管理可复用的元素：vue会高效利用重复的标签元素，通过key属性来表达标签的唯一独立性。

```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
- v-show 

用法
```
<h1 v-show="ok">Hello!</h1>
```

> v-show 只是简单地切换元素的 CSS 属性 display。

- v-if 与 v-show 的区别

v-if是真正的条件渲染，只有条件为真时才会被渲染，且会销毁和重建相应的事件监听与子组件；

v-show元素总会被渲染，只是简单基于css display进行切换。

v-if初始化开销小，但切换开销就大；v-show初始化开销大，但切换开销小。

- v-if 与 v-for一起使用

> 不推荐同时使用两者，那如果在列表循环中需要做判断怎么做会更好呢？@todo


### 列表渲染

#### 数组的v-for

```
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

```
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
v-for 还支持一个可选的第二个参数为当前项的索引。
```
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

#### 对象的v-for

```
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```


> 同数组，你也可以提供第二个的参数为键名。

> 对象还可以提供第三个参数作为索引。

```
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

- key

> 建议尽可能在使用 v-for 时提供 key。避免当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

#### 数组检测更新

- 变异方法

push、pop、shift、unshift、splice、sort、reverse这些方法称为数组变异方法，这些方法将会改变原始数组，所以也将会触发视图的更新。

```
vm.items.push({ message: 'Baz' })
```

- 替换数组

filter、concat、slice这些方法不会改变原始数组，但会总会返回一个新的数组，我们只要将新数组替换旧数组，也将会达到更新视图的效果：

```
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

> vue 对于数组的替换，并不会完全重新渲染，还是会最大范围的复用。所以替换原来的数组是非常高效的。


- **注意事项**

由于js的限制，vue不能检测以下变动的数组：

1、当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue

2、当你修改数组的长度时，例如：vm.items.length = newLength

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题:


```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

```

```
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

> 你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名。


为了解决第二类问题，你可以使用 splice:

```
vm.items.splice(newLength)
```

同样的，vue也不能检测到对象属性的添加与删除：

```
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的

```

> 对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。

#### <template>使用v-for

> 类似于v-if 也可以在<template>中使用v-for

#### v-for 与 v-if

> vue的循环与其他模板引擎不一样，大部分模板引擎循环是使用循环**标签**，比如<foreach>、<volist>等，而vue使用的循环叫做**指令**，比如v-for。

```
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

#### 组件的v-for

@todo


### 事件处理

#### 监听事件

v-on指令可以监听DOM事件，并在触发时运行一些js代码。


#### 事件处理方法

当然很多事件处理方法会更为复杂，所以v-on还支持接收一个方法名称。

```
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```

#### 内联处理器中的方法

```
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

事件处理方法与内联处理器中的方法有什么区别？

事件处理方法：（事件参数event）

```
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}
```

内联处理器中的方法：（参数自定义）

```
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

#### 事件修饰符

    .stop
    .prevent
    .capture
    .self
    .once
    .passive

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

> 使用多个修饰符，注意顺序。


#### 按键修饰符

```
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

    .enter
    .tab
    .delete (捕获“删除”和“退格”键)
    .esc
    .space
    .up
    .down
    .left
    .right


- 按键码

```
<input v-on:keyup.13="submit">
```

- 系统修饰键（支持组合键）

    .ctrl
    .alt
    .shift
    .meta


```
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

- .exact 修饰符
```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

#### 鼠标按钮修饰符

    .left
    .right
    .middle

> 鼠标双击： @dbclick.left="dobuleClick(this);";


### 表单输入绑定

[表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)

> 关键指令：v-model，在表单input、textarea、select元素上创建双向数据绑定。


#### 基础用法

v-model本质上不过是语法糖，它负责监听用户的输入事件以及更新数据。


> v-model 会忽略所有表单元素的value、checked、selected特性的初始值。

v-model 在内部使用不同的属性为不同的输入元素并抛出不同的事件：


- text 和 textarea 元素使用 value 属性和 input 事件；

- checkbox 和 radio 使用 checked 属性和 change 事件；

- select 字段将 value 作为 prop 并将 change 作为事件。

#### 值绑定

详见：[值绑定](https://cn.vuejs.org/v2/guide/forms.html#值绑定)

#### 修饰符

- .lazy

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：

```
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```
- .number

如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符。

```
<input v-model.number="age" type="number">
```

- .trim

如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符

```
<input v-model.trim="msg">
```

### 组件基础

> **因为组件是可复用的vue实例，所以它们与new vue接收相同的选项，例如data、computed、watch、methods 以及生命周期钩子等，仅有的例外是像el这样根实例特有的选项。**

> data必须是一个函数，data并不像vue对象直接提供一个对象，取而代之的是，一个组件的data选项必须是一个函数，**因此每个实例可以维护一份被返回对象的独立拷贝**。

```
data: function () {
  return {
    count: 0
  }
}
```

#### 组件复用

> 每使用一次组件，就会有一个它的新**实例**被创建。每个组件实例都会独立维护它的数据、属性、方法等.

#### 组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织：

![vue组件的组织方式](https://cn.vuejs.org/images/components.png)

#### 组件注册

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。

这里有两种组件的注册类型：全局注册和局部注册。

- 全局注册

```
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })
```
这些组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中。这三个组件在各自内部也都可以相互使用。

- 局部注册

> 特别是在使用webpack等打包构建工具构建系统时，局部注册可以避免用户下载不必要的js。


通过普通的js对象定义组件：
```
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
```
然后在 components 选项中定义你想要使用的组件：
```
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

#### 模块系统


@todo


#### 通过Prop向子组件传递数据

> HTML 中的特性名是大小写不敏感的， prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名。

注册prop：

```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

注册之后，你就可以像这样把数据作为一个自定义特性传递进来：

```
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>

```

> vue也支持注册对象，传递对象数据给组件，组件中的template可以自由地使用对象数据。


#### Prop单向数据流

> 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。

#### Prop数据验证

协助开发者实现验证。

#### 非Prop的特性

vue会自动将组件并没有相应的prop定义的特性自动添加到组件的根元素上。

#### 单个根元素

> 每个组件的模板必须只有一个根元素

错误：

```
<h3>{{ title }}</h3>
<div v-html="content"></div>
```

正确：

```
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

#### 监听子组件事件

vue实例data数据：
```
data:{font:1}
```

实例自定义监听事件：
```
<blog-post
  ...
  v-on:customeEvent="font += 1;"
></blog-post>
```

组件内元素可以通过调用内建的 **$emit** 方法 并传入事件名称，触发组件自定义事件customEvent：
```
<button v-on:click="$emit('customEvent')">
  Enlarge text
</button>
```

> 按钮click后会触发组件的customEvent事件，customEvent事件修改外部数据，实现组件与外部数据沟通。


#### 子组件事件抛出一个值

在上面的例子中，vue还支持触发实例自定义事件时，并传入一个值：

```
<button v-on:click="$emit('customEvent', 2)">
  Enlarge Font Size
</button>
```

实例自定义事件接收值：

```
<blog-post
  ...
  v-on:customeEvent="addFont"
></blog-post>
```

```
methods: {
  addFont: function (enlargeAmount) {
    this.font += enlargeAmount
  }
}
```

#### 组件上使用v-model

@todo

#### 动态组件

> 指令：v-bind:is="组件名称"

```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>

```

> 当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题：
```
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

#### 异步组件
@todo

### 自定义事件

#### 事件名称

由于v-on 事件监听器在 DOM 模板中会被自动转换为全小写，所以 v-on:myEvent 将会变成 v-on:myevent，导致 myEvent 不可能被监听到。**vue推荐始终使用 kebab-case 的事件名。**

#### 触发事件

触发的事件名需要完全匹配监听这个事件所用的名称:

```
this.$emit('myEvent')
```

#### 组件prop与外部数据进行"双向绑定"（.sync修饰符）

> 其实如果想要实现组件与外部数据同步，可以借用js的数组或对象是引用传入的方式，达到数据同步更新。当然这个需要我们确认外部数据是允许改变的！

```
<text-document v-bind:title.sync="doc.title"></text-document>
```

### 插槽

插槽应用于组件。

#### 通过插槽分发内容

```
<alert-box>
  Something bad happened.
</alert-box>
```

```
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

结果渲染：
```
<div class="demo-alert-box">
  <strong>Error!</strong>
  Something bad happened.
</div>
```

#### 编辑作用域

> **父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

#### 默认内容

插槽提供默认内容：submit

```
<button type="submit">
  <slot>Submit</slot>
</button>
```

```
<submit-button></submit-button>
```

```
<button type="submit">
  Submit
</button>
```


#### 具名插槽
关键指令：v-slot

组件template定义具名插槽：
```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

使用模板，并指定使用具名插槽：
```
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 过渡与动画

参考：[过渡与动画](https://cn.vuejs.org/v2/guide/transitions.html)

### 单文件组件
 @todo

### 规模化

### 响应式原理

![vue响应式原理](https://cn.vuejs.org/images/data.png)


> 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 不能检测到对象属性的添加或删除。

> 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

> 所以你必须在初始化实例前声明根级响应式属性，哪怕只是一个空值。


> 异步更新队列：Vue 异步执行 DOM 更新，支持去重，如果同一个 watcher 被多次触发，只会被推入到队列中一次。


### Vue 与 React、Angular

[对比其他框架](https://cn.vuejs.org/v2/guide/comparison.html)


### 疑问

1、自定义组件的v-model，上手难度大，熟练要求高，没有达到vue轻量优雅的目标。

2、特殊规则太多，意味着很多使用不自然，需要很多特殊处理，开发者记忆难度大。比如上面说的自定义组件的v-model绑定、组件绑定原生事件、组件内部传递值到外部

3、使用方式不统一，类似工具不同使用方式。比如组件的作用域与插槽的作用域实现方式不一样，让开发者有点纠结混乱；再比如有些命名大小写敏感允许使用骆驼峰，有些命名大小写不敏感只能使用-间隔符等



----

注：花了几个小时通读了下官方文档，顺带有印象的掌握vue的基本使用方式，为进一步读iview ui框架做准备。






