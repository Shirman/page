
## webpack

- 全局安装webpack

npm install -g webpack

- 全局安装webpack-cli

npm install -g webpack-cli

- 新打包命令

webpack <entry> -o <output>

注意：新的方式增加了-o

- 安装webpack本地服务器

npm install -g webpack-dev-server

支持实时调试

- package.json

npm工具配置

- webpack.config.js

webpack 工具配置

- loader

webpack本身只能处理js，通过loader转换，webpack可以处理其他类型文件，比如css、less、sass、图片、字体等，json文件webpack4已经内置加载json文件方法。


- babel

babel是一个js编译平台，可以把下一代更新的js写法编译成现在浏览器可支持的编码

```
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install -g @babel/core babel-loader @babel/preset-env @babel/preset-react
```

```
//本地安装
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react
```

npm uninstall babel-core
- npm参数说明

```
npm install module_name -S    即    npm install module_name --save    写入dependencies

npm install module_name -D    即    npm install module_name --save-dev 写入devDependencies

npm install module_name -g 全局安装(命令行使用)

npm install module_name 本地安装(将安装包放在 ./node_modules 下)

npm uninstall 模块：删除模块，但不删除模块留在package.json中的对应信息

npm uninstall 模块 --save 删除模块，同时删除模块留在package.json中dependencies下的对应信息

npm uninstall 模块 --save-dev删除模块，同时删除模块留在package.json中devDependencies下的对应信息

–save ： dependencies 键下，发布后还需要依赖的模块，譬如像jQuery库或者Angular框架类似的，我们在开发完后后肯定还要依赖它们，否则就运行不了。

–save-dev ： devDependencies 键下，开发时的依赖比如安装 js的压缩包gulp-uglify 因为我们在发布后用不到它，而只是在我们开发才用到它。

```


- react

npm install -g react react-dom

npm install --save-dev react react-dom


