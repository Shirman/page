一文读懂 JavaScript 和 ECMAScript 的区别
====

- [**JavaScript/ECMAScript 词汇表**](#javascriptecmascript-词汇表)
- [**Ecma International**](#ecma-international)
- [**ECMA-262**](#ecma-262)
- [**脚本语言**](#脚本语言)
- [**ECMAScript**](#ecmascript)
    - [**JavaScript**](#javascript)
- [**JavaScript 引擎**](#javascript-引擎)
    - [**JavaScript 运行时**](#javascript-运行时)
    - [**ECMAScript 6**](#ecmascript-6)
- [**一段趣闻**](#一段趣闻)



我们曾试着在谷歌上检索 “ JavaScript 和 ECMAScript 之间的区别。”



最后我在得到的海量的混淆不清又相互矛盾的结果中彻底绝望了：



“ECMAScript 是标准。”



“JavaScript 是标准。”



“ECMAScript 是规范。”



“JavaScript 是 ECMAScript 标准的实现。”



“ECMAScript 是标准化的 JavaScript。”



“ECMAScript 是一门语言。”



“JavaScript 是 ECMAScript 的一个分支。”



“ECMAScript 是 JavaScript。”



![](http://mmbiz.qpic.cn/mmbiz_gif/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXFjdzFGo33Me1HSc6asccrDicNrjY1A1QopGmJLU4TRqRaG1QRDA7KDQ/0?wx_fmt=gif)



忍住，别哭。我强打精神决定做一些痛苦但却有成果的研究。



这篇文章代表了我目前对 JavaScript 和 ECMAScript 之间差异的理解。文章适合那些熟悉 JavaScript 但又想更加清楚地了解其与 ECMAScript、web 浏览器、Babel 等是何种关系的人。你还会额外了解到脚本语言、JavaScript 引擎以及 JavaScript 运行时。



那么，打起精神来吧。



### **JavaScript/ECMAScript 词汇表** 



下面是一系列的定义，设计的侧重点在于一致性和清晰性。定义并非百分比完整。它们被设计从宏观的的层面对 JavaScript 和 ECMAScript 之间的联系和关系给出了说明。



闲话少叙，让我们开始吧。



### **Ecma International** 



一个为科学技术制定标准的组织。

![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXDUnOQJyNkwW1htsHkyiadNyLjBLicpibc69lPnVFpHGX3elHLq8uOT35Q/0?wx_fmt=png)



为了要举一个“标准”的例子（尽管并非由 Ecma 所发明），可以用我们曾用过的键盘来说明。是不是大多数的字母以同样的顺序排列，有一个空格键、一个输入键、箭头键，并将数字显示在最上面的一行？这是由于大多数键盘制造商的键盘设计是基于 QWERTY 布局标准的。



### **ECMA-262** 



这是由 Ecma 国际发布的标准。它包含通用目的的脚本语言的规范。

![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrX8f7SgnMJcI1XMmGC7VfaoFkdYo1J8ibiculZeMhEHarqRArUF3ZCicTOw/0?wx_fmt=png)



ECMA-262 是一个类似 QWERTY 的标准，但不同于呈现一个键盘层的规范，它呈现了被称为 ECMAScript 的脚本语言规范。



可以把 ECMA-262 当做 ECMAScript 的参考数字。



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXTiaF8ZChpS8iafTzRTn07OGzoWvewYXhdibWPib6pULJaawjLe0Bu6XS4w/0?wx_fmt=png)



### **脚本语言** 



一种专门为在一种存在的实体或系统上操作而设计的编程语言。



关于如何使编程语言成为脚本语言的常规想法，请考虑命令“walk”、“run” 和 “jump”。这些操作需要一些东西来驱动，可能是一个人、一条狗或一个视频游戏角色。如果没有操作员来执行这些命令，“walk”、“run” 和 “jump” 是没有意义的。这组操作类似于专注于操纵外部实体的脚本语言。



### **ECMAScript** 



The specification defined in ECMA-262 中定义的标准，是用于创建通用目的脚本语言的。



同义词: ECMAScript 规范



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXqa6RvCgvjVEK6XHVibaUwBJicYQJcOdibu8VbAKWNScibVsWybZfLHAVsg/0?wx_fmt=png)



然而ECMA-262是标准的名称，它代表了脚本语言规范ECMAScript。

  
ECMAScript提供脚本语言必须遵守的规则、细节和准则，这些才是其被视为兼容ECMAScript的判断标准。



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXrYVJgvT4N3TfjQLWIrD4aUhvwsmzdianqfiaK4L6IyDptSFIKjUaiaTfA/0?wx_fmt=png)



#### **JavaScript** 



一种通用目的的脚本语言，遵循 ECMAScript 规范。



它是 ECMAScript 语言的一个分支版本。



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXKjN3d711ppYajlXFM2qqwqz5tgqoicVPNnDVp6GvAScdLZmc7fb6iapQ/0?wx_fmt=png)



JavaScript 是我喜欢编程的咖啡味语言（指代 Java 族，译者注）。ECMAScript 是它所基于的规范。通过阅读 ECMAScript 规范，你将学会如何创建脚本语言。通过阅读 JavaScript 文档，你将学习如何使用脚本语言。



当人们把 JavaScript 称为“ ECMAScript 语言的方言”的时候，他们的意思就像谈论英语、法语或者中国方言时一样。一种方言从其母语中衍生出大部分的词汇和语法，但偏离得值得保留这些差异。



JavaScript 实现了多数 ECMA-262 中描述的 ECMAScript 规范，但存在少数差异。 Mozilla 在此概述了 JavaScript 的非 ECMAScript 语言功能：



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXSwFYwJiaUP0mrZMwBHQ1PGGejAB4PxzUz8nQVHHpUqauiamxp3hEAB9Q/0?wx_fmt=png)



### **JavaScript 引擎** 



能够理解和执行 JavaScript 代码的程序或解释器。



同义词：JavaScript 解释器，JavaScript 的实现



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXd772Z8Egw7k9ibJQtCfGms8Uia53s2zFKrrIdNdZLvS0Tx7edofzhdwA/0?wx_fmt=png)



JavaScript 引擎通常可以在 web 浏览器中被发现，包括 Chrome 中的 V8 ，火狐中的 SpiderMonkey ，以及 Edge 中的 Chakra 。每款引擎就像是一个用于其应用程序的语言模块，可以让其支持某种 JavaScript 语言的分支。



JavaScript 引擎对于浏览器来说就像是人类对语言的理解一样。如果我们重新拿我们日常行为中的“走”、“跑”、“跳”来举例的话，一个 JavaScript 引擎是真正能够理解这些动作是何意义的根本机制。



这个比喻可以帮我们解释一些关于浏览器的事情：



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrX8VFbVzpLY6I1MmxfsKTh3lagEhQZOIIDnW6QCwYB01WrGwE6skOagA/0?wx_fmt=png)



**浏览器性能的差异**



两个人也许会识别“跳”的命令，但是一个人由于理解和对命令的处理比另一个人更快些，也许会比另一个人对命令的反应更快些。类似的是，两个浏览器都可以理解 JavaScript 代码，但是一个由于其 JavaScript 引擎实现起来效率更高而运行得更快。



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXj8nXfTH7Cib7qHvyL8qVpae9YWwmPI7x9ziaD8gaA1L2hreXtfh8oQXw/0?wx_fmt=png)



**浏览器支持的差异**



再以即使说同样语言的人们之间也会有差异为例。即使许多人讲英语，但是一些人也许懂得他人不懂的某些词、表达式和与语法规则，反之亦然。浏览器也是同样的道理。尽管浏览器的 JavaScript 引擎都理解 JavaScript ，但是某些浏览器会比其他的浏览器对 JavaScript 理解得更好些。在浏览器对 JavaScript 的支持中就存在着这一的差别。



至于说到浏览器支持，人们通常会谈到 “ECMAScript 兼容性” 而非“ JavaScript 兼容性”，尽管 JavaScript 引擎解析和执行的是 JavaScript 。这个问题说起来有点绕，下面的表格可以对其作出解释。



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXutbkhxcPDMkYicabWibnx22yGqFFFc3zLaRYzhvTaZwZdJ1ZBLmiamkYw/0?wx_fmt=png)



如果你还记得的话，ECMAScript 是一份规定了脚本语言可以看起来像什么的规范。发布一个新的 ECMAScript 版本并不意味着所有现存的 JavaScript 引擎突然就拥有了这些新功能。这取决于负责那款 JavaScript 引擎的团体或组织是否要更新到最新的 ECMAScript 规范并采用其所带来的变化。



因此，开发者倾向于问这样的问题，“这款浏览器支持哪个版本的 ECMAScript ？”或者“这款浏览器支持哪些 ECMAScript 功能？”他们想知道是否 Google、Mozilla 和微软已经开始更新他们浏览器的 JavaScript 引擎了，例如 V8、SpiderMonkey 和 Chakra 是否都已经具有最新的 ECMAScript 中的功能了。



ECMASCript 兼容性列表是回答这类问题的绝佳答案参考。



如果新版的 ECMAScript 发布了，JavaScript 引擎不会一下子整合所有的更新。他们会逐渐地加入 ECMAScript 功能，这一点从火狐的 JavaScript 变更记录中可见一斑：



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrX7N6AQSk1TCwkmvXObkpjOHH8fznPq0oIuR5FB0ia3GSMVz8icouphUKQ/0?wx_fmt=png)



#### **JavaScript 运行时** 



JavaScript 代码运行所在的环境，并为 JavaScript 引擎所解释。运行时提供了 JavaScript 可以运行和操作的宿主对象。



同义词：宿主环境



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXicQiaBf4fNzlvDDnEdibTpBWJC9ERZEcj8NVtu6z7COsibU9HCiaQNnjmJQ/0?wx_fmt=png)



JavaScript 运行时是在脚本化语言定义中所提到的“已存在的实体或系统”。代码通过 JavaScript 引擎传递，一旦被解析和被理解之后，实体或系统将会执行解释行为。一条狗走路，一个人跑步，一个视频游戏中的任务跳跃（或如上图例子中的那样搞破坏）。



应用程序通过在运行时提供“宿主对象”令其本身可用于 JavaScript 脚本。对于客户方来说，JavaScript 运行时可以是 web 浏览器，这时如视窗或 HTML 文档这样的宿主对象就可以用于操作了。



你是否曾经使用过视窗或文档宿主对象呢？视窗和文档对象并非真正的核心 JavaScript 语言的一部分。它们是 Web APIs ，即扮演着 JavaScript 宿主环境的浏览器所提供的对象。对于服务器端来说，JavaScript 运行时是 Node.js 。服务器相关的宿主对象，如文件系统、处理和请求都在 Node.js 中被提供。



有趣的一点是：不同的 JavaScript 运行时可以分享同样的 JavaScript 引擎。例如 V8 ，是既为 Google Chrome 也为 Node.js 所用的 JavaScript 引擎—两个截然不同的环境。



#### **ECMAScript 6** 



它是 ECMA-262 标准的第六个版本，其特点是对 ECMAScript 规范有着显著的变化和改进。



同义词：ES6、ES2015 和 ECMAScript 2015



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXG0doVIowadSHqe9ZnA8UqQVH6aZJicicl8YTQ6joR2Ry3wRyIfnticFlQ/0?wx_fmt=png)



这一版的 ECMAScript 将其名字由 ES6 改为了 ES2015 ，这是由于 Ecma 国际决定每年都对 ECMAScript 发布一次。相应地，Ecma 国际也开始基于每年所发布的来命名新版本的 ECMAScript 规范。简而言之， ES6 和 ES2015 是对同一件事情的两个不同的名字。



**Babel**



一款可以将 ES6 代码转换为 ES5 代码的转译器。



![](http://mmbiz.qpic.cn/mmbiz_png/dkwuWwLoRK8cD6aOslE50nV8ZfMzSkrXoIfasDsM0BiaiaKDlCmxibKfUicK1yNa3belXl4UsZuezHP9KosHml35iaA/0?wx_fmt=png)



开发者可以使用 ES6 中炫目的新功能，但会为他们的 web 应用担心跨浏览器的兼容性问题。在编写这篇文章的时候，Edge 和 Internet Explorer 并没有完全地支持 ES6 规范中的功能。



有顾虑的开发者可以使用 Bable 将 ES6 代码转换为功能一样的版本，只不过使用的是 ES5 功能。所有主流的浏览器都完全支持 ES5 ，所以他们可以在运行代码时不要担心任何问题。



### **一段趣闻** 



我希望这些关于 JavaScript 和 ECMAScript 的信息对你有用。在我们结束之前，我想要再分享一点能够让像我这样的菜鸟 web 开发者茅塞顿开的信息。



**先有鸡还是先有蛋**



有一段关于 JavaScript 混淆不清的历史是它是于1996年被开发出来的。然后在1997年被提交给 ECMA 国际用于标准化工作，这导致了 ECMAScript 的诞生。同时，由于 JavaScript 与 ECMAScript 规范保持一致，所以可以说 JavaScript 是根据 ECMAScript 所实现的一个例子。



令我们感到有趣的是：ECMAScript 是基于 JavaScript 的，而同时 JavaScript 又是基于 ECMAScript 的。



好吧，我知道这听起来就像是一个人穿越变成了自己的父母一样——有点矛盾，不过想起来还是挺搞笑的。



----
<font size=2 color='grey'>本文收藏来自互联网，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
