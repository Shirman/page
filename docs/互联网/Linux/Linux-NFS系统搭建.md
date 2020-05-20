<!-- TOC -->

- [一、server(233文件服务器)](#一server233文件服务器)
        - [1、检查/etc/init.d 下是否有portmap或rpcbind服务](#1检查etcinitd-下是否有portmap或rpcbind服务)
    - [2、编辑/etc/exports](#2编辑etcexports)
    - [3、一般centos都自带nfs服务](#3一般centos都自带nfs服务)
    - [exportfs命令](#exportfs命令)
- [二、client（238-web服务器）](#二client238-web服务器)
    - [1、检查/etc/init.d 下是否有rpcbind服务](#1检查etcinitd-下是否有rpcbind服务)
    - [2、建立个目录，用于挂载远程共享目录](#2建立个目录用于挂载远程共享目录)
- [问题](#问题)

<!-- /TOC -->
> server和client，环境centos

## 一、server(233文件服务器)

提供nfs服务，需要rpc服务的支持，需要安装portmap服务或rpcbind服务

#### 1、检查/etc/init.d 下是否有portmap或rpcbind服务

没有：

    yum install portmap

有：

    service portmap start | service rpcbind start


### 2、编辑/etc/exports

    /GB/Data2/wsd 10.10.115.238(rw,sync,no_root_squash)

**要具体了解括号中的详细配置**

不要让root可以在客户端服务器上操作文件；但其他帐号在目录允许的权限下可以增删改目录文件；

### 3、一般centos都自带nfs服务

有：

    service nfs restart

没有：

    yum install nfs-utils  

*安装nfs服务也会自带rpc的服务*


### exportfs命令

如果我们在启动了NFS之后又修改了/etc/exports，是不是还要重新启动nfs呢？这个时候我们就可以用exportfs命令来使改动立刻生效，该命令格式如下：

    exportfs [-aruv]
    -a ：全部mount或者unmount /etc/exports中的内容
    -r ：重新mount /etc/exports中分享出来的目录
    -u ：umount 目录
    -v ：在 export 的時候，将详细的信息输出到屏幕上。

具体例子：

*<==全部重新 export 一次！*

    [root @test root]# exportfs -rv 
    exporting 192.168.0.100:/home/test
    exporting 192.168.0.*:/home/public
    exporting *.the9.com:/home/linux
    exporting *:/home/public
    exporting *:/tmp
    reexporting 192.168.0.100:/home/test to kernel


## 二、client（238-web服务器）

> 在rpc服务的支持下，通过挂载方式从提供nfs服务的server挂载指定的目录文件

### 1、检查/etc/init.d 下是否有rpcbind服务

没有：

    yum install portmap
有：

    service portmap start | service rpcbind start
    service rpcidmapd start  //*该服务用于解决NFS4 *
    mount shows all ownership as "nobody" or 4294967294

### 2、建立个目录，用于挂载远程共享目录

    mkdir /wsd/
    mount -t nfs 10.10.115.233:/GB/Data2/wsd /wsd

*注：10.10.115.233 为xxx.112.115.233局域网私有ip*


## 问题

1、在mount的时候报以下错误就要检查下rpc服务是否启动且有效；

    [root@host-238 tmp]# mount -t nfs 10.10.115.233:/tmp/nfs /tmp/nfs/
    mount: wrong fs type, bad option, bad superblock on 10.10.115.233:/tmp/nfs,
        missing codepage or helper program, or other error
        (for several filesystems (e.g. nfs, cifs) you might
        need a /sbin/mount.<type> helper program)
        In some cases useful info is found in syslog - try
        dmesg | tail  or so