
<!-- TOC -->

- [更新ubuntu软件源](#更新ubuntu软件源)
- [安装nodejs](#安装nodejs)
- [检查nodejs与npm](#检查nodejs与npm)
- [bower安装](#bower安装)
- [问题](#问题)

<!-- /TOC -->

### 更新ubuntu软件源

    sudo apt-get update
    sudo apt-get upgrade

### 安装nodejs

    sudo apt-get install nodejs
    sudo apt-get install nodejs-legacy
    sudo apt-get install npm

### 检查nodejs与npm

    node -v

    npm -v

### bower安装

    sudo npm install -g bower

---- 
输出

    npm WARN deprecated bower@1.8.8: We don't recommend using Bower for new projects. Please consider Yarn and Webpack or Parcel. You can read how to migrate legacy project here: https://bower.io/blog/2017/how-to-migrate-away-from-bower/
    /usr/local/bin/bower -> /usr/local/lib/node_modules/bower/bin/bower
    /usr/local/lib
    └── bower@1.8.8


### 问题

>一般是本地依赖包需要更新，建议使用国内apt-get source源，并尽量使用电信之类的宽带