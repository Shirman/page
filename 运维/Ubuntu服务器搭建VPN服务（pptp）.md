## Ubuntu服务器搭建VPN服务（pptp）



- [Ubuntu服务器搭建VPN服务（pptp）](#ubuntu服务器搭建vpn服务pptp)
    - [一、简介](#一简介)
    - [二、搭建步骤](#二搭建步骤)
        - [1、安装pptpd](#1安装pptpd)
        - [2、配置内网ip策略](#2配置内网ip策略)
        - [3、配置dns](#3配置dns)
        - [4、配置VPN帐号](#4配置vpn帐号)
        - [5、TCP/IP策略配置开启内核IP转发](#5tcpip策略配置开启内核ip转发)
        - [6、开放网络端口](#6开放网络端口)
        - [7、配置NAT网络地址转换](#7配置nat网络地址转换)
        - [8、重启pptpd](#8重启pptpd)
        - [9、客户端连接](#9客户端连接)
        - [其他问题：](#其他问题)


### 一、简介 ###
> vpn全称虚拟专用网络(Virtual Private Network)指的是在公用网络上建立专用网络的技术,主要采用了彩隧道技术、加解密技术、密钥管理技术和使用者与设备身份认证技术。
> 点对点隧道协议（PPTP）是VPN服务的一种最简单的实现协议，其它常见的VPN类型还有：使用IPsec的第2层隧道协议（L2TP/IPsec）、安全套接字隧道协议（SSL VPN）。


【前提：带公网独立ip的ubuntu服务器一台】

### 二、搭建步骤 ###
#### 1、安装pptpd ####
根据实际情况是否需要update

	sudo apt-get update 
	sudo apt-get install pptpd

#### 2、配置内网ip策略 ####

	sudo vim /etc/pptpd.conf

在# TAG: localip后增加2行

	localip 192.168.0.1   #VPN服务器的虚拟ip
	remoteip 192.168.0.234-238,192.168.0.245   #分配给VPN客户端的虚拟ip

#### 3、配置dns ####
	
	sudo vim /etc/ppp/pptpd-options

在#ms-dns后增加2行，也可以配置其他dns

	ms-dns 8.8.8.8
	ms-dns 8.8.4.4

#### 4、配置VPN帐号 ####

	sudo vim /etc/ppp/chap-secrets

添加账号、服务器名、密码和IP限制，一个帐号一行，每个参数中间用空格间隔。如：

	username pptpd passwd *

其中username是用户名，pptpd表示是pptpd服务，passwd是密码,*表示随机分配ip


#### 5、TCP/IP策略配置开启内核IP转发 ####

	sudo vim /etc/sysctl.conf

插入一行：

	net.ipv4.ip_forward=1

保存并退出vim

执行

	sudo sysctl –p

提示net.ipv4.ip_forward = 1，说明配置生效

#### 6、开放网络端口 ####
安装iptables(已安装请忽略)

	sudo apt-get install iptables

开放1723端口(如果已经开放请忽略)

	sudo iptables -I INPUT -p tcp –dport 1723 -j ACCEPT


#### 7、配置NAT网络地址转换 ####

	sudo iptables –table nat –append POSTROUTING –out-interface eth1 –jump MASQUERADE

参数说明：

	-table：选择表。这里选择nat，nat, 这个表被查询时表示遇到了产生新的连接的包,
			由三个内建的链构成：PREROUTING (修改到来的包)、
			OUTPUT（修改路由之前本地的包）、POSTROUTING（修改准备出去的包）；
	-append：在所选择的链末添加一条或更多规则。
	-out-interface:这是包经由该接口送出的可选的出口名称。
	-jump：目标跳转 


> 注意eth1是你连接外网的那块网卡，不一定是1也有可能是0或者看你的机器哪块网卡连的外网了。这样就以NAT的方式请求外网的东西了。

不知道你的机器哪块网卡连的外网的话ifconfig一下看看哪个网卡是外网IP就知道了。

#### 8、重启pptpd ####

	sudo /etc/init.d/procps restart

搭建完毕，客户端可以连接了。

#### 9、客户端连接 ####
移动端如iphone：服务器填vpn所在服务器公网ip、服务器类型选择pptp、填写服务器上配置的用户名username密码passwd即可连接。


#### 其他问题： ####

问题1：Ubuntu 14版本可能遇到以下问题

	# /etc/init.d/pptpd status
	 * /usr/sbin/pptpd is not running
	# /etc/init.d/pptpd start
	# /etc/init.d/pptpd restart
	 * Restarting PoPToP Point to Point Tunneling Server pptpd                 [ OK ]
	# /etc/init.d/pptpd status
	 * /usr/sbin/pptpd is not running
 
解决：

	i know this already has correct answer but would like to point out how to solve this bug.
	
	Just edit pptpd(/etc/init.d/pptpd) file and add simple "-p" after status_of_proc it should look like this.
	
	status_of_proc -p "$PIDFILE" "$DAEMON" "$NAME" && exit 0 || exit $?


----
@tsingchan    