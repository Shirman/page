<!-- TOC -->

- [jdk下载](#jdk下载)
- [配置java](#配置java)
- [测试java](#测试java)

<!-- /TOC -->


> 经常需要用到java环境，烦不胜烦，ubuntu下的java环境快速安装配置

### jdk下载

1.进入官网下载页面
http://www.oracle.com/technetwork/java/javase/downloads/index.html

2.选择需要的版本，进入下载页面 
 
选中红框才可以下载

![](https://img-blog.csdn.net/20180708130959114?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Nhbmdld3V4aWU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

3.下载完成解压

下载后解压：

```
tar -zxvf jdk-13.0.1_linux-x64_bin.tar.gz
```

假设安装目录是/usr/java下

将解压后的目录jdk-13.0.1转移到安装目录/usr/java下

解压完成/usr/java/jdk-13.0.1/

### 配置java

编辑/etc/profile

```
sudo vim /etc/profile
```

```
###java###
#java安装目录
export   JAVA_HOME=/usr/java/jdk-13.0.1/
#java 其他配置目录
export   CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export  PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
export   JRE_HOME=$JAVA_HOME/jre
###java###
```

source profile，读取并执行该脚本，让配置生效

```
source /etc/profile
```

### 测试java


```
jm@ubuntu:~$ java -version
java version "13.0.1" 2019-10-15
Java(TM) SE Runtime Environment (build 13.0.1+9)
Java HotSpot(TM) 64-Bit Server VM (build 13.0.1+9, mixed mode, sharing)

jm@ubuntu:~$ javac -version
javac 13.0.1

```

