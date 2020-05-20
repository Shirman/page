<!-- TOC -->

- [一、sssever搭建](#一sssever搭建)
- [二、客户端socks连接](#二客户端socks连接)
    - [1、window pc端](#1window-pc端)
    - [2、mac](#2mac)
    - [3、iOS](#3ios)
    - [4、Android](#4android)

<!-- /TOC -->

> 关键词 shadowsock,ssserver,vpn


## 一、sssever搭建

系统：ubuntu 14.04

基本设置

0、更新软件源

    sudo apt-get update

1、安装pip3

    sudo apt-get install python3-pip

2、先用python3安装shadowsocks：

    sudo pip3 install shadowsocks

3、编辑配置文件（新建文件）

    sudo vim /etc/shadowsocks.json

配置文件按照以下设置：

    {
        "server":"0.0.0.0",
        "server_port": 9999,
        "password":"password",
        "timeout":600,
        "method":"aes-256-cfb",
    }

或者限制发起socks客户端端口：

    {
        "server":"0.0.0.0",
        "server_port": 9999,
    "local_address":"127.0.0.1",
    "local_port":1080,
        "password":"password",
        "timeout":600,
        "method":"aes-256-cfb",
    }

或者多端口：

    {
        "server":"0.0.0.0",
        "server_port": 9999,
        "password":"password",
        "timeout":600,
        "method":"aes-256-cfb",
        "port_password":
        {
            "5200":"password",
            "5201":"password",
            "5202":"password",
            "5203":"password",
            "5204":"password",
            "5205":"password",
            "1314":"password"
        }
    }

4、启动服务（以后台方式启动）

    sudo ssserver -c /etc/shadowsocks.json -d start

5、启动时，部分服务器会有以下报错

    INFO: loading config from /home/lee/shadowsocks.json
    2018-09-29 14:50:53 WARNING  warning: your timeout 30 seems too short
    2018-09-29 14:50:53 INFO     loading libcrypto from libcrypto.so.1.1
    Traceback (most recent call last):
    File "/home/lee/.local/bin/sslocal", line 11, in <module>
        sys.exit(main())
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/local.py", line 39, in main
        config = shell.get_config(True)
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/shell.py", line 262, in get_config
        check_config(config, is_local)
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/shell.py", line 124, in check_config
        encrypt.try_cipher(config['password'], config['method'])
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/encrypt.py", line 44, in try_cipher
        Encryptor(key, method)
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/encrypt.py", line 83, in __init__
        random_string(self._method_info[1]))
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/encrypt.py", line 109, in get_cipher
        return m[2](method, key, iv, op)
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/crypto/openssl.py", line 76, in __init__
        load_openssl()
    File "/home/lee/.local/lib/python3.6/site-packages/shadowsocks/crypto/openssl.py", line 52, in load_openssl
        libcrypto.EVP_CIPHER_CTX_cleanup.argtypes = (c_void_p,)
    File "/usr/lib/python3.6/ctypes/__init__.py", line 361, in __getattr__
        func = self.__getitem__(name)
    File "/usr/lib/python3.6/ctypes/__init__.py", line 366, in __getitem__
        func = self._FuncPtr((name_or_ordinal, self))
    AttributeError: /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1: undefined symbol: EVP_CIPHER_CTX_cleanup



> 解决方法：https://kionf.com/2016/12/15/errornote-ss/

A. vim打开文件openssl.py

    vim /usr/local/lib/python3.5/dist-packages/shadowsocks/crypto/openssl.py

路径不同根据报错路径而定

B. vim下修改openssl.py文件中的

    libcrypto.EVP_CIPHER_CTX_cleanup.argtypes为libcrypto.EVP_CIPHER_CTX_reset.argtypes
    :%s/cleanup/reset/
    :x

C、重新运行ssserver

    sudo ssserver -c /etc/shadowsocks.json -d restart

## 二、客户端socks连接

https://github.com/shadowsocks

https://github.com/shadowsocks/shadowsocks-android

https://github.com/shadowsocks/shadowsocks-windows/wiki/Shadowsocks-Windows-使用说明


### 1、window pc端

https://github.com/shadowsocks/shadowsocks-windows/releases

下载安装shadowsocks.exe

双击运行shadowsocks.exe，之后会在任务栏有一个小飞机图标，右击**小飞机图标**，选择**服务器**->**编辑服务器**：

*[图缺失详见有道笔记]*

在shadowsocks的windows客户端中，**服务器IP**指你购买的VPS的IP，**服务器端口**指你服务器的配置文件中的端口，**密码**指你服务器的配置文件中的密码，**加密**指你服务器的配置文件中的加密方式，**代理端口**默认为1080不需要改动。**其他都可以默认**。设置好后，点击添加按钮即可。

基本使用

- 在任务栏找到 Shadowsocks 图标

- 在 **服务器** 菜单添加多个服务器

- 选择 **启用系统代理** 来启用系统代理。**请禁用浏览器里的代理插件，或把它们设置为使用系统代理**。

### 2、mac

双击运行shadowsocksX-NG.app，之后会在任务栏有一个小飞机图标，右击小飞机图标，选择服务器->服务器设置：

*[图缺失详见有道笔记]*

在shadowsocks的Mac OS客户端中，**地址**指你购买的VPS的IP，冒号后面跟上配置文件中的端口，**密码**指你服务器的配置文件中的密码，**加密**指你服务器的配置文件中的加密方式。**其他都可以默认**。设置好后，点击确认即可。

### 3、iOS

**建议：pc安装pp助手，手机连接PP助手，搜索shadowrocket 安装一个紫蓝色上升的小火箭logo的app。**

安装app成功后，点击右上角，添加SS配置信息

*[图缺失详见有道笔记]*

添加完成回到首页，打开第一个，会跳到设置，选择打开VPN，成功之后就会看到通知栏的VPN图标。Ping一下看看延迟。136ms还不错

*[图缺失详见有道笔记]*

----

以下的方案基本已经被国家禁止了：

shadowsocks苹果客户端经常会被App Store下架，可以在App Store搜索关键字shadowsock或者wingy，找到一个软件截图中包括填写ip，加密方式，密码的软件一般就是对的了（目前可以用的是FirstWingy）。当然，你也可以下载PP助手，之后在PP助手上下载Wingy（Wingy支持）或者shadowrocket（shadowrocket支持）。


### 4、Android

下载apk安装好后，打开影梭客户端，点击主界面左上角的编辑按钮（铅笔形状）：

*[图缺失详见有道笔记]*

在shadowsocks安卓客户端的配置中填入相应配置信息，其中，**功能设置**中，路由改成如上图所示，其**他都可以默认**。


----
2016 markdown tsingchan



