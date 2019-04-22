


- [官方文档](#官方文档)
- [安装](#安装)
- [使用](#使用)
    - [account配置](#account配置)
    - [json配置文件](#json配置文件)
    - [上传](#上传)
    - [刷新目录 refresh.list 每一行一个目录](#刷新目录-refreshlist-每一行一个目录)
    - [刷新链接 refresh.list  每一行一个链接](#刷新链接-refreshlist--每一行一个链接)
    - [上传成功示例](#上传成功示例)
    - [下载 get](#下载-get)
    - [其他](#其他)




### 官方文档

https://github.com/qiniu/qshell

https://developer.qiniu.com/kodo/tools/1302/qshell

### 安装

比如ubuntu 64位，把qshell_linux_x64文件复制到/usr/bin/qshell，并赋予执行权限：

    mkdir qiniu 
    cd qiniu    
    wget http://devtools.qiniu.com/qshell-v2.3.6.zip
    unzip qshell-v2.3.6.zip
    sudo cp qshell_linux_x64 /usr/bin/qshell
    sudo chmod +x /usr/bin/qshell

### 使用

> 以下以类unix系统为范例

#### account配置

GetBucketManager: Open account file error, open /home/tsing/.qshell/account.json: no such file or directory, please use `account` to set AccessKey and SecretKey first

详见：https://github.com/qiniu/qshell/blob/master/docs/account.md

    qshell account ELUs327kxVPJrGCXqWae9yioc0xYZyrIpbM6Wh6x LVzZY2SqOQ_I_kM1n00ygACVBArDvOWtiLkDtKiw name_test


#### json配置文件

配置参数说明：

https://github.com/qiniu/qshell/blob/master/docs/qupload.md

qiniu.conf.json范例：

    {
    "src_dir"            :   "/root/qiniu/images/mini/image/",
    "access_key"         :   "xxxxxxxxxx",
    "secret_key"         :   "xxxxxxxxxx",
    "bucket"             :   "xxxx",
    "key_prefix"         :   "test/",
    "skip_file_prefixes" :   ".git,bin",
    "skip_fixed_strings" :   ".svn",
    "skip_suffixes"      :   ".DS_Store,.exe",
    "skip_path_prefixes" :   "",
    "rescan_local"       :   true,
    "log_level"          :   "info",
    "overwrite"          :   true
    }

#### 上传

    qshell qupload qiniu.conf.json

#### 刷新目录 refresh.list 每一行一个目录

    qshell cdnrefresh -dirs refresh.list

#### 刷新链接 refresh.list  每一行一个链接

    qshell cdnrefresh refresh.list

#### 上传成功示例


    tsing@ubuntu:~/qiniu$ qshell qupload weixin.conf.json 
    Writing upload log to file /home/tsing/.qshell/qupload/faa6945ae7344d966f1bd51cb0e47a6a/faa6945ae7344d966f1bd51cb0e47a6a.log

    Uploading /root/qiniu/images/mini/image/gw1cj.png => test/gw1cj.png [1/5, 20.0%] ...
    Uploading /root/qiniu/images/mini/image/gw2gncj.png => test/gw2gncj.png [2/5, 40.0%] ...
    Uploading /root/qiniu/images/mini/image/gw3mfcj.png => test/gw3mfcj.png [3/5, 60.0%] ...
    Uploading /root/qiniu/images/mini/image/gw4sy.png => test/gw4sy.png [4/5, 80.0%] ...
    Uploading /root/qiniu/images/mini/image/gw5gywm.png => test/gw5gywm.png [5/5, 100.0%] ...

    See upload log at path /home/tsing/.qshell/qupload/faa6945ae7344d966f1bd51cb0e47a6a/faa6945ae7344d966f1bd51cb0e47a6a.log



本地图片路径：

    /root/qiniu/images/mini/image/1.png

上传成功路径：

    http://imgcdn.xxxx.com/mini/image/1.png

#### 下载 get

详见官方文档：https://github.com/qiniu/qshell/blob/master/docs/get.md

格式：

    qshell get <Bucket> <Key> [-o <OutFile>]

示例
    
    qshell get qiniutest test.txt



#### 其他

如果第一次使用qshell会碰到需要先设置account的提示：

    GetBucketManager: Open account file error, open /home/tsing/.qshell/account.json: no such file or directory, please use `account` to set AccessKey and SecretKey first

解决：

    qshell account <Your AccessKey> <Your SecretKey> <Your Name>

----
@tsingchan
