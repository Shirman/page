
<!-- TOC -->

- [准备](#准备)
- [安装jira](#安装jira)
    - [下载atlassian-agent.jar文件](#下载atlassian-agentjar文件)
    - [编写jira对应Dockerfile文件](#编写jira对应dockerfile文件)
    - [构建镜像](#构建镜像)
    - [启动容器](#启动容器)
    - [web访问安装设置](#web访问安装设置)
    - [破解jira](#破解jira)
    - [完成配置](#完成配置)
- [安装confluence](#安装confluence)
    - [编写dockerfile](#编写dockerfile)
    - [下载atlassian-agent.jar文件](#下载atlassian-agentjar文件-1)
    - [构建镜像](#构建镜像-1)
    - [启动容器](#启动容器-1)
    - [界面安装](#界面安装)
    - [破解confluence](#破解confluence)
- [外部数据库设置](#外部数据库设置)
- [中文乱码问题](#中文乱码问题)
    - [文件系统编码不正确](#文件系统编码不正确)
    - [数据库编码中文支持](#数据库编码中文支持)
    - [collation层面的编码检查](#collation层面的编码检查)
    - [表结构f层次的编码检查](#表结构f层次的编码检查)
    - [修复数据库连接串的编码](#修复数据库连接串的编码)
    - [关于mysql中set编码无效的解决方案](#关于mysql中set编码无效的解决方案)
- [java环境](#java环境)
    - [jdk下载](#jdk下载)
    - [配置java](#配置java)
    - [测试java](#测试java)

<!-- /TOC -->

## 准备

目录：/var/www/docker/Atlassian

目录：/var/www/docker/Atlassian/jira

目录：/var/www/docker/Atlassian/confluence


## 安装jira

制作jira Docker破解容器

### 下载atlassian-agent.jar文件

https://pan.baidu.com/s/1AucTmTNPSG85hhWF7mkIcQ

文件解压后得到jar包放入Atlassian目录

```
cqj@ubuntu:/var/www/docker/Atlassian$ ls
atlassian-agent.jar  atlassian-agent-v1.2.3  atlassian-agent-v1.2.3.zip  Dockerfile
```

### 编写jira对应Dockerfile文件

Dockerfile文件内容：

```
FROM cptactionhank/atlassian-jira-software:7.12.0

USER root

# 将代理破解包加入容器
COPY "atlassian-agent.jar" /opt/atlassian/jira/

# 设置启动加载代理包
RUN echo 'export CATALINA_OPTS="-javaagent:/opt/atlassian/jira/atlassian-agent.jar ${CATALINA_OPTS}"' >> /opt/atlassian/jira/bin/setenv.sh
~                                                                                        
```


> Dockerfile与atlassian-agent.jar包在同一个目录下，比如Atlassian目录


### 构建镜像

```
cqj@ubuntu:/var/www/docker/Atlassian$ sudo docker build -t jira/jira:v7.12.0 .
Sending build context to Docker daemon  3.116MB
Step 1/4 : FROM cptactionhank/atlassian-jira-software:7.12.0
7.12.0: Pulling from cptactionhank/atlassian-jira-software
8e3ba11ec2a2: Pull complete 
311ad0da4533: Pull complete 
df312c74ce16: Pull complete 
2e22a8aaa076: Pull complete 
3132eb4a4b91: Pull complete 
Digest: sha256:45208c3b82bbe08887bf741233a2da20a8880013cba9a994b869c94bf1bdbd16
Status: Downloaded newer image for cptactionhank/atlassian-jira-software:7.12.0
 ---> 1b29859343c2
Step 2/4 : USER root
 ---> Running in 74dbb20c7f7d
Removing intermediate container 74dbb20c7f7d
 ---> 268d321f3dc7
Step 3/4 : COPY "atlassian-agent.jar" /opt/atlassian/jira/
 ---> facf112e85dc
Step 4/4 : RUN echo 'export CATALINA_OPTS="-javaagent:/opt/atlassian/jira/atlassian-agent.jar ${CATALINA_OPTS}"' >> /opt/atlassian/jira/bin/setenv.sh
 ---> Running in a7db34bc5080
Removing intermediate container a7db34bc5080
 ---> ace8d9857463
Successfully built ace8d9857463
Successfully tagged jira/jira:v7.12.0

```

### 启动容器

```
cqj@ubuntu:/var/www/docker/Atlassian$ sudo docker run -d -p 8080:8080 jira/jira:v7.12.0
35f2c9f917e46e99fc3ac598bb7cbb043a20f5d3e6aa3c7095239e6241c10b1d

```

### web访问安装设置

http://192.168.8.130:8080

![](https://upload-images.jianshu.io/upload_images/10973635-f0b10fa66e7ef70e.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/909/format/webp)

![](https://upload-images.jianshu.io/upload_images/10973635-8acdb83cffc07500.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/825/format/webp)

![](https://upload-images.jianshu.io/upload_images/10973635-fcc7621048d67219.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/836/format/webp)



### 破解jira

![](https://upload-images.jianshu.io/upload_images/10973635-4168e67779acb0b2.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/842/format/webp)

复制服务器ID:BW2Q-QAZT-PYNI-LTZ5

在本地存放"atlassian-agent.jar"的目录下执行命令，生成许可证：（如果没有java环境，参考java环境章节）

```
java -jar atlassian-agent.jar -d -m 421808956@qq.com -n jmcqj -p jira -o http://192.168.8.130:8080 -s BFXL-ZQGP-45U5-1PZZ
```

执行结果：

```

cqj@ubuntu:/var/www/docker/Atlassian$ java -jar atlassian-agent.jar -d -m 421808956@qq.com -n jmcqj -p jira -o http://192.168.8.130:8080 -s BW2Q-QAZT-PYNI-LTZ5


Your license code(Don't copy this line!!!): 

AAABqQ0ODAoPeJyNkk9vozAQxe98CqSeoTabNCSSpe0CB1aEpAvdantzyKRxBIaMTbbpp68JVNs/U
bSSL7bmPf/mzVw9wNr+yaVNfJvQmTljYi+z3PaIR6wnBJDbumkA3UQUIBXkxwZSXgELFvN59CuIb
xMrQOBa1DLkGlgndAh1iG9dkISgChRNp2L3shSV0Aak7AX26mhvtW7U7Pr6ZStKcEVtzbmQGiSXB
UTPjcDj8Js/dcjEHGsnkL9RRmvRW6dJPI/zKLTStloBLjb3ClAxh77BXfBqsF63hXa7i6Pqjf7LE
dwvRhdqeaHFAZjGFj5k+f79gtxQ8QBM19iXDvH8Nh93zXlW1q7+xXgqiQ68bE/DYBteqsH+s9ECn
7gUqq/rkjZB06nn0hvf9V36jcx84hMrqKU2qJGJvmQjj5rH6fjm+37vFnXVO59P4z/7yzTHjqknH
QYShyyJwyxKnYSOJ/5oMqLU/Es/zPfcSmWAB0Aj//Hg3Tl3t4+5s/yTxk6SP47PbfLXHVm2WGy5g
s97/F58SrFBoYb2DCg7AztEd2LcVcV+9wrwtyhNMCwCFCEXvg3UQ8199PjfBkyUlSqJtgL4AhR2E
BQ/sAK8H4H84AZg2gD4Q1RlFw==X02kg

cqj@ubuntu:/var/www/docker/Atlassian$ 

```


### 完成配置

按照界面引导完成相关配置及设置管理员账号密码

账号密码
cxxxxi
cxxxxe

## 安装confluence

### 编写dockerfile

```
FROM cptactionhank/atlassian-confluence:6.13.0

USER root

# 将代理破解包加入容器
COPY "atlassian-agent.jar" /opt/atlassian/confluence/

# 设置启动加载代理包
RUN echo 'export CATALINA_OPTS="-javaagent:/opt/atlassian/confluence/atlassian-agent.jar ${CATALINA_OPTS}"' >> /opt/atlassian/confluence/bin/setenv.sh
```

### 下载atlassian-agent.jar文件

https://pan.baidu.com/s/1AucTmTNPSG85hhWF7mkIcQ


### 构建镜像

```
docker build -f Dockerfile -t confluence/confluence:6.13.0 .
```

执行结果

```
cqj@ubuntu:/var/www/docker/Atlassian/confluence$ sudo docker build -f Dockerfile -t confluence/confluence:6.13.0 .
[sudo] password for cqj: 
Sending build context to Docker daemon  976.9kB
Step 1/4 : FROM cptactionhank/atlassian-confluence:6.13.0
6.13.0: Pulling from cptactionhank/atlassian-confluence
4fe2ade4980c: Pull complete 
6fc58a8d4ae4: Pull complete 
ef87ded15917: Pull complete 
99a1f578099a: Pull complete 
72baaac031ca: Pull complete 
Digest: sha256:a4bc580dcd457f80e515655e4736f1c7ea88b46b420d03a850a4289d0e747473
Status: Downloaded newer image for cptactionhank/atlassian-confluence:6.13.0
 ---> 8f0611520159
Step 2/4 : USER root
 ---> Running in 8dfef05ce155
Removing intermediate container 8dfef05ce155
 ---> 8a2ddbc1b77d
Step 3/4 : COPY "atlassian-agent.jar" /opt/atlassian/confluence/
 ---> d068d6fc6c23
Step 4/4 : RUN echo 'export CATALINA_OPTS="-javaagent:/opt/atlassian/confluence/atlassian-agent.jar ${CATALINA_OPTS}"' >> /opt/atlassian/confluence/bin/setenv.sh
 ---> Running in b31d9e199872
Removing intermediate container b31d9e199872
 ---> b019d8fadc08
Successfully built b019d8fadc08
Successfully tagged confluence/confluence:6.13.0
cqj@ubuntu:/var/www/docker/Atlassian/confluence$ 
```

### 启动容器

```
docker run -d -p 8090:8090 confluence/confluence:6.13.0
```


### 界面安装

按照界面引导安装配置即可

集群暂时随便填一个

注意先安装jira后安装confluence，在这个环节，可以配置连接到jira，绑定jira账户


### 破解confluence




```

# 设置产品类型：-p conf， 详情可执行：java -jar atlassian-agent.jar 

java -jar atlassian-agent.jar -d -m 421808956@qq.com -n jmcqj -p conf -o http://192.168.8.130:8090 -s BESI-2M4M-IAF7-S4KQ
```

```
cqj@ubuntu:/var/www/docker/Atlassian/confluence$ java -jar atlassian-agent.jar -d -m 421808956@qq.com -n jmcqj -p conf -o http://192.168.8.130:8090 -s BNED-V9E1-934R-0OMK


Your license code(Don't copy this line!!!): 

AAABWg0ODAoPeJxtUMtugzAQvPsrkHqG2CQkBgmpLXBIyyMKSXp26KZxBIYYEzX9+pqHVKmK5MvOr
Gdm5+kDPo03JgxMDTz3bOI5xNjkO8PGNkaBBKZ4LUKmwO8RExMTUxTdWNkNjH9iZQsohLaQvBmQv
Sh5xZXWLXkBogXjeDfOSjWtN5v9nHkJFq9RJr+Y4O0o0rOaJK5tkSW1qEXm2KPYxaioxcliheI38
JXsAAW1UHqOEsZLf2ETiqnrLJ+vV6uoq3E9V0wqkFO0AYrHJLt7AymrwA+yJIm2wfolRlpIKBBMF
BB9N1zep2Opa+KVfmj6uw79eB3mUWrGxFnRBbUdQhyyRDnIG0hNv6ZRaB7ciJjufLE1cZa8j+5ak
QUg+kzDDZPiY7tNJ4sza+F/51OZB5BtX5mN8u74V/qgO5ilXXUEmZ32rd70TYJ0ZP9B7KnIoY5LV
VwvvyAppr4wLAIUG9GMaCy0y7aVmzXHJK7W8QK+6KECFGaRV7Kgrv/+vl8B63oL1ej9VUYrX02h1

```


## 外部数据库设置

以下只是给了个参考，你可以使用你已有的数据库主机及用户信息。

```mysql
--创建jira数据库及用户

create database jiradb character set 'UTF8';
create user jirauser identified by 'jira';
grant all privileges on *.* to 'jirauser'@'%' identified by 'jira' with grant option;
grant all privileges on *.* to 'jirauser'@'localhost' identified by 'jira' with grant option;
flush privileges;


--创建confluence数据库及用户
create database confdb character set 'UTF8';
create user confuser identified by 'conf';
grant all privileges on *.* to 'confuser'@'%' identified by 'conf' with grant option;
grant all privileges on *.* to 'confuser'@'localhost' identified by 'conf' with grant option;
flush privileges;

-- 设置confdb事务级别
show variables like 'tx%';
SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
show variables like 'tx%';
```

## 中文乱码问题

主要针对confluence

首先明确一个东西，如果confluence写得文章保存以后出现乱码，那么只有三种可能:

- 文件系统编码不正确。不支持中文（上传的附件中有中文，预览出现乱码，大部分是这个原因）
- 数据库编码不正确（大部分是这个原因）
- 数据连接串没显示指定编码（这个最容易忽略，这次问题也是因为这个）

### 文件系统编码不正确

confluence官网提供了专门校验文件系统编码的方法。 官网推荐检测文件系统编码：
https://confluence.atlassian.com/doc/troubleshooting-character-encodings-167194.html

具体方法其实很简单,就是用访问下面的URL，confluence会自动检测编码的支持程度。

```

#如果有域名的话可以用这个URL:
http://confluence.atlassian.com/admin/encodingtest.action
#或者简单粗暴直接用ip访问也行
http://<host address>:<port>/admin/encodingtest.action
```


### 数据库编码中文支持

如果文件系统编码支持中文，那么继续下一步检验 数据库的编码支持。

调整数据库乱码分为三步

- 数据库层面上的字符检查
- collation层面的编码检查
- 表结构层次的编码检查

数据库层面上的字符检查

运行下面的sql语句，查看结果，结果应该如下图所示

```
show variables like 'char%';
```

sql执行结果应该如下所示：

```
character_set_client    utf8
character_set_connection    utf8
character_set_database    utf8
character_set_filesystem    binary
character_set_results    utf8
character_set_server    utf8
character_set_system    utf8
character_sets_dir    /rdsdbbin/mysql-5.6.27.R1/share/charsets/

```

如果不是，那么分别执行对应的sql语句，然后看下是不是修改成了utf8

```
set character_set_client=utf8;
set character_set_connection=utf8;
set character_set_database=utf8;
set character_set_results=utf8;
set character_set_server=utf8;
set character_set_system=utf8;
```

### collation层面的编码检查

运行如下的sql语句

```
show variables like 'collation%';
```

上面sql运行结果应该如下图所示：


```
#结果应该如下
collation_connection    utf8_general_ci
collation_database    utf8_bin
collation_server    utf8_general_ci
```

如果不是上面所示的结果，那么执行对应的sql语句调整过来

```
ALTER DATABASE <Confluence database name> CHARACTER SET utf8 COLLATE utf8_bin;
set collation_connection=utf8;
set collation_database=utf8 ;
set collation_server=utf8;
```

### 表结构f层次的编码检查

执行如下两个sql，会自动生成修改语句, 然后你只用复制结果sql，执行就可以修复table层级的编码

```
SELECT CONCAT('ALTER TABLE ',  table_name, ' CHARACTER SET utf8 COLLATE utf8_bin;') FROM information_schema.TABLES AS T, information_schema.`COLLATION_CHARACTER_SET_APPLICABILITY` AS C
WHERE C.collation_name = T.table_collation
AND T.table_schema = 'confluence 数据库名字'
AND
(
    C.CHARACTER_SET_NAME != 'utf8'
    OR
    C.COLLATION_NAME != 'utf8_bin'
);

```
```
SELECT CONCAT('ALTER TABLE `', table_name, '` MODIFY `', column_name, '` ', DATA_TYPE, ' CHARACTER SET UTF8 COLLATE utf8_bin', (CASE WHEN IS_NULLABLE = 'NO' THEN ' NOT NULL' ELSE '' END), ';')
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'confluence 数据库名字'
AND DATA_TYPE != 'varchar'
AND
(
    CHARACTER_SET_NAME != 'utf8'
    OR
    COLLATION_NAME != 'utf8_bin'
);
```

经过上面步骤，数据库层面的编码格式已经修复了。

### 修复数据库连接串的编码

```
vim  /var/atlassian/application-data/confluence/confluence.cfg.xml
```

如果是docker服务，可以进入docker后找到confluence.cfg.xml文件修改即可

```
sudo docker exec [docker-container-id] -it /bin/bash
```

```
#找到如下行
<property name="hibernate.connection.url">jdbc:mysql://jira.csphgnawyi6m.us-west-1.rds.amazonaws.com/confluencedb</property>
#修改为
<property name="hibernate.connection.url">jdbc:mysql://jira.csphgnawyi6m.us-west-1.rds.amazonaws.com/confluencedb?useUnicode=true&amp;characterEncoding=UTF-8</property>

```


### 关于mysql中set编码无效的解决方案

如果以上修改无效的话，可以修改mysql配置文件默认编码：

找到mysql配置文件my.ini或my.cnf

--在 [mysqld] 标签下加上以下内容：

character_set_server = utf8

注意：如果此标签下已经存在“default-character-set=GBK”类似的内容，只需修改成“default-character-set = utf8”，否则这里不添加这个项。

--在 [mysql]  标签下加上一行

default-character-set = utf8

--在 [mysql.server]标签下加上一行

default-character-set = utf8

--在 [mysqld_safe]标签下加上一行

default-character-set = utf8

--在 [client]标签下加上一行

default-character-set = utf8

重新启动MySql服务


## java环境

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
cqj@ubuntu:~$ java -version
java version "13.0.1" 2019-10-15
Java(TM) SE Runtime Environment (build 13.0.1+9)
Java HotSpot(TM) 64-Bit Server VM (build 13.0.1+9, mixed mode, sharing)

cqj@ubuntu:~$ javac -version
javac 13.0.1

```

参考文章

http://www.moheqionglin.com/site/blogs/26/detail.html


