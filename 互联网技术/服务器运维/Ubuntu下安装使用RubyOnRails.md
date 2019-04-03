### Ubuntu 下安装使用 Ruby On Rails

> 由于最近需要，自学ror，对于我这个ror新手来说，安装rails有时确实是一件痛苦的事。这不懂，那不理解的，尽管网上博客什么的介绍ubuntu下安装ror环境的文章一大把，但简单又容易理解不多。


- [Ubuntu 下安装使用 Ruby On Rails](#ubuntu-下安装使用-ruby-on-rails)
    - [1、命令行下升级一下源，执行：](#1命令行下升级一下源执行)
    - [2、安装Git (git版本管理)和curl， RVM的安装和使用需要使用到它们，还有build-essential用来编译 Ruby。为了安装这三个包，我们执行：](#2安装git-git版本管理和curl-rvm的安装和使用需要使用到它们还有build-essential用来编译-ruby为了安装这三个包我们执行)
    - [3、安装ruby管理工具RVM执行命令：](#3安装ruby管理工具rvm执行命令)
    - [4、如果步骤3需要依赖包，且依赖包安装成功后再重新安装RVM：](#4如果步骤3需要依赖包且依赖包安装成功后再重新安装rvm)
    - [5、加载RVM：](#5加载rvm)
    - [6、测试RVM：](#6测试rvm)
    - [7、安装ruby执行：](#7安装ruby执行)
    - [8、安装框架rails （在安装rvm时已经安装了gem）](#8安装框架rails-在安装rvm时已经安装了gem)
    - [9、gem主要是用来安装rails及rails的插件，插件比如说mysql等组件](#9gem主要是用来安装rails及rails的插件插件比如说mysql等组件)



教你如何安装rails的文章可以说数不胜数，本文也是其中之一，希望能够对你有帮助~~~
我们先理解下几个概念：

**rvm ruby gemset gemfile gem的关系**

> 一个rvm，管理多个ruby版本
> 
> 一个ruby版本下，可以创建多个gemset，肯定会有一个名为default和global的gemset
> 
> 一个项目，对应一个gemset和一个gemfile，此gemfile中指定的所有gem的版本被此gemset管理

#### 1、命令行下升级一下源，执行： ####

	sudo apt-get update 

#### 2、安装Git (git版本管理)和curl， RVM的安装和使用需要使用到它们，还有build-essential用来编译 Ruby。为了安装这三个包，我们执行： ####

	sudo apt-get install build-essential git-core curl

#### 3、安装ruby管理工具RVM执行命令： ####

	bash < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer )

执行后，注意终端输出，安装RVM你的服务器可能还需要一些依赖包（9先生的依赖包都是全的）：
可用apt-get或aptitude安装例如（根据实际提示内容安装相应的依赖包）：

	sudo apt-get install build-essential bison openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf

#### 4、如果步骤3需要依赖包，且依赖包安装成功后再重新安装RVM： ####
	
	bash < <(curl -sk https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)

#### 5、加载RVM： ####

	echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile

	source .bash_profile


#### 6、测试RVM： ####

	type rvm | head -1

【成功则显示rvm is a function 】

#### 7、安装ruby执行： ####
**7.1、列出已知的ruby版本**

	rvm list known

**7.2、安装稳定版本ruby（最好是1.9以上）**

	rvm install 2.1.1 


**7.3、使用ruby 2.1.1**
执行：

	rvm use 2.1.1	

**7.4、查看ruby版本及应用**

	ruby -v
	ruby 2.1.1p76 (2014-02-24 revision 45161) [x86_64-linux]
	
	which ruby
	/usr/local/rvm/rubies/ruby-2.1.1/bin/ruby

**7.5、最后设置ruby 2.1.1为默认(ruby)版本：**
	
	rvm use 1.9.2 --default


#### 8、安装框架rails （在安装rvm时已经安装了gem） ####

	gem install rails

提示：安装rails,时间可能很久需要翻墙或者国内服务器推荐替换 RubyGems 的到淘宝镜像:
	
	$ gem sources --remove https://rubygems.org/
	$ gem sources -a http://ruby.taobao.org/
	$ gem sources -l
*** CURRENT SOURCES ***

http://ruby.taobao.org

然后再执行：
	
	gem install rails


#### 9、gem主要是用来安装rails及rails的插件，插件比如说mysql等组件 ####

其它的gem，可以执行：

	gem install XXX

来安装(注意即使是一些‘常用’的库也需要依赖才能工作，比如：mysql2 gem…您需要安装libmysqlclient16-dev包)。

----------
@tsingchan


