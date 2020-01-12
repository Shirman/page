
<!-- TOC -->

- [docker hub个人仓库使用](#docker-hub个人仓库使用)
- [阿里云容器仓库创建](#阿里云容器仓库创建)
- [使用阿里云容器仓库](#使用阿里云容器仓库)

<!-- /TOC -->


### docker hub个人仓库使用

```
step1——找到本地镜像的ID：docker images

step2——登陆Hub：docker login --username=username --password=password --email=email

step3——tag：docker tag <imageID> <namespace>/<image name>:<version tag eg latest>

step4——push镜像：docker push <namespace>/<image name>
```


### 阿里云容器仓库创建

- 登录阿里云容器镜像服务器 

https://cr.console.aliyun.com

- 设置Registry登录密码

- 创建命名空间

- 创建镜像仓库


### 使用阿里云容器仓库

- 登录阿里云Docker Registry

```
$ sudo docker login --username=yourusername registry.cn-hangzhou.aliyuncs.com
```

用于登录的用户名为阿里云账号全名，密码为开通服务时设置的密码。

您可以在产品控制台首页修改登录密码。

- 从Registry中拉取镜像

```
$ sudo docker pull registry.cn-hangzhou.aliyuncs.com/jm/php-fpm:v1
```

- 将镜像推送到Registry
```
$ sudo docker login --username=yourusername registry.cn-hangzhou.aliyuncs.com


$ sudo docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/jm/php-fpm:[镜像版本号]

$ sudo docker push registry.cn-hangzhou.aliyuncs.com/jm/php-fpm:[镜像版本号]

```

根据实际镜像信息替换示例中的[ImageId]和[镜像版本号]参数。

- 选择合适的镜像仓库地址

从ECS推送镜像时，可以选择使用镜像仓库内网地址。推送速度将得到提升并且将不会损耗您的公网流量。

如果您使用的机器位于经典网络，请使用 registry-internal.cn-hangzhou.aliyuncs.com 作为Registry的域名登录，并作为镜像命名空间前缀。

如果您使用的机器位于VPC网络，请使用 registry-vpc.cn-hangzhou.aliyuncs.com 作为Registry的域名登录，并作为镜像命名空间前缀。
