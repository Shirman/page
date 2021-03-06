<!-- TOC -->

- [问题](#问题)
- [docker的好处](#docker的好处)
- [其他建议](#其他建议)

<!-- /TOC -->
### 问题

通俗的问题：代码放在Docker里面还是外面呢？


可能是一个新手，刚接触docker ，看了好多docker方面的文档。目前已经学了一些很基础的东西。但是还有一些疑问。

首先项目是公司内部使用，所以并发不大，项目也不多，接触docker后，在想，项目代码是放在docker里面，还是外面呢？？放在外面和里面分别有什么好处吗？


docker的外部，可以认为是和Docker没有任何关系。而Docker的内部，可以认为有两个维度，第一，Docker容器内部，第二，Docker的镜像image内部。

### docker的好处

首先需要知道的是：Docker到底能够给我们项目带来哪些好处，带来轻量级虚拟化容器方面的优势（资源利用率高，创建快捷，环境纯净简洁）？还是镜像带来的优势（便于部署，记录容器状态，持续集成等）？确定了使用的场景，才好说明代码到底放到什么地方更合适。


- 场景一：服务分发

    如果做好了所有代码，想分发给其他使用者，这种无疑代码放到image是最佳的，包括数据库初始化脚本等。让用户可以一键安装使用，无需关心环境配置等


- 场景二：内部开发环境

    如果是开发环境，代码是用于调试，代码不应该在image里面，代码最好是在主机上，如MacOS，Windows，Linux的个人PC上，通过volume方式进行挂载是最方便的，修改代码直接就可以进行调试。

- 场景三：线上测试环境

    如果是测试环境，建议使用git方式管理代码，代码不直接放在image中，一种是通过docker exec到容器内git pull对应的代码，另一种是主机上git pull代码，然后通过web服务比如nginx等通过volumes挂载的方式映射到容器中。


> 如果是软件产品售卖，且非saas模式的话，建议直接做为image镜像分发；其他如果是公司或团队自己运营产品项目，且频繁代码修改版本上线的话，建议docker只负责服务环境处理，代码仍然交给主机，由git去维护
>
> 没有哪种最优，只有最适合的。


### 其他建议


建议1：代码不放入镜像，使用volume挂载放入容器。这样我的镜像只需要维护程序运行的环境，不同的项目运行不同的容器挂载不同的代码。我认为这种粒度比较合适。代码版本控制还可以继续使用git/svn来管理。

建议2：有一种是例外的，那就是你使用开发的代码来直接搭建一个完整的服务，不想要对代码再继续修改。那这时候集成到镜像内是合适的。


更多建议：
http://dockone.io/question/24

