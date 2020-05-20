



<!-- TOC -->

- [webpack是什么](#webpack是什么)
- [为什么要用webpack](#为什么要用webpack)
- [安装与使用](#安装与使用)
    - [初始化](#初始化)
    - [安装](#安装)
    - [使用](#使用)
    - [**配置webpack.config.js**](#配置webpackconfigjs)
- [资源管理](#资源管理)
    - [安装](#安装-1)
    - [在webpack.config.js中配置loader](#在webpackconfigjs中配置loader)
    - [常用的loader](#常用的loader)
    - [加载图片](#加载图片)
        - [安装](#安装-2)
        - [配置loader](#配置loader)
    - [加载字体](#加载字体)
        - [webpack.config.js中配置](#webpackconfigjs中配置)
    - [加载less](#加载less)
        - [安装](#安装-3)
        - [配置](#配置)
    - [加载sass](#加载sass)
        - [安装](#安装-4)
        - [配置:](#配置)
    - [加载ES6及以上版本及jsx文件](#加载es6及以上版本及jsx文件)
        - [安装:](#安装)
        - [配置:](#配置-1)
        - [总的配置集合](#总的配置集合)
- [Plugin](#plugin)
    - [html-webpack-plugin：生成html文件](#html-webpack-plugin生成html文件)
        - [安装](#安装-5)
        - [修改配置文件](#修改配置文件)
    - [分离css文件--MiniCssExtractPlugin](#分离css文件--minicssextractplugin)
        - [安装](#安装-6)
        - [在webpack.config.js中的配置](#在webpackconfigjs中的配置)
        - [安装webpack-dev-server](#安装webpack-dev-server)

<!-- /TOC -->
## webpack是什么


官网给出的概念是:本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。

当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 为什么要用webpack


为什么要使用webpack,这应该和前端的发展是有关系的,因为计算机网络的飞速发展,导致前端也在迅猛发展,最初的实践方案已经不能满足我们的需求,加上新的技术和新思想框架的产生，为了节省开发的成本和效率，所以webpack的产生是一个必然的结果

相比gulp、grunt、Rollup，为什么要使用webpack？

gulp和grunt的操作都是流式的,但是gulp是基于内存流,grunt是基于文件流,所以相对来说,gulp的性能要高于grunt，而且他们都是需要定义一个个任务，然后自动将一个个任务执行。

而webpack是模块化的组织，模块化的依赖，然后模块化的打包，相对来说，webpack更强调模块化开发，而那些文件合并压缩、预处理等功能，不过是他的附带功能。而且现在相对于前两者，webpack的插件也更为丰富。

Rollup是在webpack流行后出现的替代品，Rollup和webpack类似，但是专注于ES6模块打包，相比webpack,Rollup功能和插件都不如webpack完善，不过Rollup在用于打包JavaScript库时比webpack更加有又是，因为其打包的代码更小更快。但也因为功能不完善，很多场景找不到现成的解决方案。


## 安装与使用


因为现在webpack已经更新到到4.0+了，所以本篇就直接按4.0+的来讲好了

### 初始化

创建package.json文件

叫初始化,可以手动创建，也可以使用命令自动创建，建议是命令创建

```
npm init
```
 
然后自己配置文件名、版本号等信息

如果想要快捷安装的话，使用下面的命令（-y 表示使用默认参数）

```
npm init -y

```
 

> 注意：
>
>1.package文件里面的name属性的值如果用驼峰式命名的话，会报警告
>
>2.通过文件名我们就知道package.json文件是json的对象，所以语法肯定是严格按照json的格式，不能添加注释，属性和值只能用双引号不能用单引号，不能多添加逗号

**package.json文件说明：** 

![](https://img2018.cnblogs.com/blog/1034530/201908/1034530-20190805103745684-333715504.png)

### 安装

webpack可以直接使用npm安装，因为我们需要使用webpack这个命令，所以必须要全局安装

```
npm i webpack -g

```
 
然后在项目中安装-即本地安装

```
npm i webpack -S

```
 
> 注意：webpack 4+以上的，都需要安装webpack-cli，所以还需要安装webpack-cli

```
npm i webpack-cli -S

```
> -g 全局安装参数 ，-S 写入package.json中的依赖配置 

按着上面的步骤安装好之后，等你配置好webpack.config.js文件在终端输入webpack时你可能会遇到下面这个问题

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190729175130458-445308830.png)

解决办法：全局安装一下webpack-cli即可

```
npm i webpack -g

```
 
到此安装步骤就已经搞定了，下面教大家如何使用

### 使用

创建src文件夹、public文件夹和webpack.config.js文件

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190729175802510-959645129.png)

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="bundle.js"></script>
</body>
</html>

```
 

### **配置webpack.config.js** 

```js
module.exports = {
  mode:'development', // 当前的开发模式
  entry:  __dirname + "/src/main.js",// 入口文件
  output: {
    path: __dirname + "/dist",// 打包后的文件存放的地方
    filename: "bundle.js" // 打包后输出文件的文件名
  }
}

```
 
这些基础配置完之后,我们在项目的终端输入

```
webpack

```

就会输出一下信息

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190730103621566-1646545478.png)

看到这样的信息的话,那么恭喜你,你的第一个webpack项目完成了

此时你会看到文件夹目录下会多了一个dist文件夹

OK,上面的文件写法我们还可以做一下改进,例如文件的文件路径问题,我们需要写成的是绝对路径,node里面有自带一个path模块,我们可以换成下面的写法

```js
const path=require('path');
module.exports={
 
    mode:'development',
    // 入口文件
    entry:'./src/main.js',
    // 出口文件
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'public')
    }
}

```
 

上面这个是单个入口文件的写法,有单个入口的话,那肯定是有多个入口的啊,下面这段就是多个入口文件的写法:

```js
const path=require('path');
module.exports={
    mode:'development',
    // 多个入口的话,在这边配置
    entry:{
        index:'./src/js/1.js',
        admin:'./src/js/index.js',
    },
    output:{
        // 出口的名字就是上面entry定义的名字,上面定义的是index和admin,打包后在dist文件夹里面的js就是index.min.js和admin.min.js
        filename:'[name].js',
        
        path:path.resolve(__dirname,'dist')
    }
}
```
 

在出口文件处的filename中,就不需要写死bundle.js这些了,直接用name变量来接收,打包出来后的文件名字来源于entry中入口文件中的定义的键,如上面的就是index和admin

## 资源管理


webpack本身只能处理javascript,如果要处理其他类型的文件的话,就需要使用loader来进行转换。下面我就列举了我们经常用的几个

css-loader---->引入css文件

我们可以在src文件夹里面新建一个css文件夹，然后在里面新建一个main.css文件。在webpack中，所有的文件都是一个模块，所以要使用这个css文件，就必须要先引入

在main.js文件中引入css文件

```js
import './css/main.css'

```
 

然后在终端输入webpack后发现报错啦

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190730121150383-46949170.png)

这个时候呢，安装一下css需要使用到的loader，然后在配置一下在试试

### 安装

处理css需要使用到两个loader，css-loader和style-loader

```
npm install --save-dev style-loader css-loader

```
 

### 在webpack.config.js中配置loader

```js
module.exports={
    // 当前的开发模式 
    // 开发模式:development,会保留我们开发时的一些必要信息
    // 生产模式:production会尽力压缩,能压多大就压多大
    // none:什么也不干,就只是打包
    mode:'development',
    entry:'./src/js/main.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    // 添加的module里面的rules
    module:{
        rules:[
            {
                test:/\.css$/,
                // webpack的loader执行顺序是反的,先执行css-loader后执行style-loader
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}

```
 

说明: loader都是在module里面的rules中配置的,rules是一个数组配置规则,该规则告诉webpack符合test的文件，使用use后面的loader处理,所以该规则就是对所有的.css文件使用css-loader、style-loader

注意点：loader的执行顺序是由右向左执行的，先执行css-loader后在执行style-loader

在终端输入webpack后，提示下面的信息就是成功啦

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190730122150072-187835652.png)

###  常用的loader


|**资源** | **loader名**|
|-|-|-|
|图片| file-loader|
|sass |saa-loader |
|less |less-loader |
|babel |babel-loader |
|字体 |file-loader和url-loader|
|||

### 加载图片

#### 安装

```
npm install --save-dev file-loader

```
 

#### 配置loader

```json
rules:[
            {
                test:/\.css$/,
                // webpack的loader执行顺序是反的,先执行css-loader后执行style-loader
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
               test: /\.(png|svg|jpg|gif)$/,
               use: [
                   'file-loader'
                    ]
           }
       ]
```
 

### 加载字体

#### webpack.config.js中配置

```json
{
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
          'file-loader'
         ]
}

```
 

### 加载less

#### 安装

```
npm install --save-dev less-loader less

```
 

#### 配置

```json
{
    test: /\.less$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings
    }, {
        loader: "css-loader" // translates CSS into CommonJS
    }, {
        loader: "less-loader" // compiles Less to CSS
    }]
}
```
 

### 加载sass

#### 安装

```
npm install sass-loader node-sass --save-dev

```
 

#### 配置:

```json
{
    test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }]
}

```
 

### 加载ES6及以上版本及jsx文件

#### 安装:

```
npm install -D babel-loader @babel/core @babel/preset-env 

```
 

#### 配置:

```json
{
    test: /\.(js|jsx)$/i,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
        presets: ['@babel/preset-env']
        }
    }
}

```
 

#### 总的配置集合

```json
module:{
    rules:[
        // 加载css
        {
            test:/\.css$/,
            // webpack的loader执行顺序是反的,先执行css-loader后执行style-loader
            use:[
                'style-loader',
                'css-loader'
            ]
        },
        // 加载图片
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
                ]
        },
        // 加载字体
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
            'file-loader'
            ]
        },
        // 加载less
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
        // 加载sass
        {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
        // 加载base64
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                loader: 'url-loader',
                options: {
                    limit: 8192 // 当图片小于8192K之后转为base64
                }
                }
            ]
        },
        // 加载数据
        {
            test: /\.(csv|tsv)$/,
            use: [
            'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
            'xml-loader'
            ]
        },
　　　　　　　// 加载ES6以上版本
        {
            test: /\.(js|jsx)$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
            }
    ]
}

```
 

## Plugin


插件(Plugin)是用来扩展webpack功能的,webpack可以实现loader所不能实现完成的复杂功能,使用plugin丰富的自定义API以及生命周期事件,可以控制webpack打包流程的每个环节,实现webpack的自定义功能扩展

### html-webpack-plugin：生成html文件

`html-webpack-plugin` 可以根据你设置的模板，在每次运行后生成对应的模板文件，同时所依赖的 CSS/JS 也都会被引入，如果 CSS/JS 中含有 hash 值，则 `html-webpack-plugin` 生成的模板文件也会引入正确版本的 CSS/JS 文件。

#### 安装

 

```
npm i html-webpack-plugin -D

```
 

#### 修改配置文件

```js
const path=require('path');
const HtmlPlugin=require('html-webpack-plugin');
module.exports = {
    entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
      path:path.resolve(__dirname, './dist'),//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },
    module:{
        rules:[
            // 加载css
            {
                test:/\.css$/,
                // webpack的loader执行顺序是反的,先执行css-loader后执行style-loader
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            // 加载图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                    ]
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                'file-loader'
                ]
            },
            // 加载less
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            // 加载sass
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            // 加载base64
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        limit: 8*1024 // 当图片小于8192K之后转为base64
                    }
                  }
                ]
            },
            // 加载数据
            {
                test: /\.(csv|tsv)$/,
                use: [
                'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                'xml-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    plugins: [
        new HtmlPlugin(),
    ]
}

```
 

配置完之后,你会看到在dist文件夹下面会多了一个index.html文件

如果你想打包一个固定的模板的话,你可以在实例化插件的时候添加参数配置

```
plugins: [
        new HtmlPlugin({
            template: './public/index.html' // 模板的地址
        }),
      ]

```
 

### 分离css文件--MiniCssExtractPlugin

在webpack中,默认css文件是一起打包进js文件里面去的,如果你希望打包后css在单独的文件中的话,name你就需要MiniCssExtractPlugin（ExtractTextPlugin在webpack4+版本中已经废弃掉了，如果使用4以下的版本的话，可以自行官网查api，也是类似的写法的）这个plugin了

#### 安装

```
npm i mini-css-extract-plugin -D

```
 

#### 在webpack.config.js中的配置

```js
const path=require('path');
const HtmlPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports = {
    entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
      path:path.resolve(__dirname, './dist'),//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },
    module:{
        rules:[
            // 加载css
            {
                test:/\.css$/,
                // webpack的loader执行顺序是反的,先执行css-loader后执行style-loader
                use:[ {
                    loader: MiniCssExtractPlugin.loader,
                  }, 
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlPlugin({
            title:'webpack test',
            template:path.join(__dirname, './public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[id].css'
        })
    ]
}

```
 

配置完成后在终端输入webpack,你会发现dist文件夹里面会多了一个main.css文件(前面已经在src目录下的css文件夹中新建了main.css,并导入到了main.js中),到这,css就已经抽离出来啦

构建运行环境
------

我们平时开发的时候,例如gulp都会区分开发环境还是生产环境,这两个环境下所要配置的一些参数肯定是要不一样的,而且我们在开发环境下,并不需要打包。在这种情况下，我们要这么去区分运行环境呢？webpack提供了一个webpack-dev-server工具给我们搭建本地运行环境。有了这个插件之后，我们可以配置命令脚本快捷运行

#### 安装webpack-dev-server

 ```
npm i webpack-dev-server -D

```
 

#### 然后在package.json配置中的script里面脚本命令

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server ",
    "dev": "webpack-dev-server ",
    "build": "webpack"

  }
```
 

通过上面的代码，我们可以知道，在看法环境下才要运行项目环境，如果打包的时候就用build的那个命令来充当生产环境

#### 开发环境命令使用

```
npm run start
// 或
npm run dev
```
 

#### 生产环境命令使用

生产环境下的话，我们需要做的是打包的工作

 

```
npm run build

```
 



了解npm 命令的话，我们应该知道，在npm的命令脚本中，我们是可以添加参数的，我们可以通过添加参数来设置一下在开发环境下自动在默认浏览器中打开项目

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190731114826921-39052496.png)

默认的端口是8080端口

**修改默认端口**

嗯，有些时候我们的端口可能被其他项目占用着，所以为了项目得以运行，肯定是要改一下端口的啊。我们可以在配置命令脚本的时候添加参数--port 端口号

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --port 3000",
    "dev": "webpack-dev-server ",
    "build": "webpack"
},

```
 

![](https://img2018.cnblogs.com/blog/1034530/201907/1034530-20190731115245216-787945337.png)

此时的端口就已经改为了3000端口了

#### 自动热更新

我们每次修改完都要重启一下运行环境，这样的操作效率太低了，而且很浪费时间，我们要怎么做到每次修改完他都会自动更新呢，当然是有解决方法的啊，添加--hot参数即可

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --port 3000 --hot",
    "dev": "webpack-dev-server ",
    "build": "webpack"
}

```
 

开发的时候区分环境更项目配置的，可以查看我的上一篇的使用webpack构建简易的vue-cli框架的笔记（<https://www.cnblogs.com/cythia/p/10672042.html>）

####  **统计编译的时间** 

有时候我们在开发的时候需要做性能优化的时候,就肯定想要知道在编译过程中哪些步骤耗时最长。这个时候我们可以使用--profile

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --port 3000 --hot --profile",
    "dev": "webpack-dev-server ",
    "build": "webpack"
}

```
 

![](https://img2018.cnblogs.com/blog/1034530/201908/1034530-20190805104251589-742138507.png)

<font size=2 color=grey>[阅读原文](https://www.cnblogs.com/cythia/p/11265727.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@TsingChan](http://www.9ong.com/) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
