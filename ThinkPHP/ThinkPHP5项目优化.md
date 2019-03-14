



### 数据库优化

#### 索引

#### 分表

#### 优化sql语句

#### 优化业务逻辑代码


### 缓存

#### 数据库缓存

#### 内存级别缓存

#### 前端/客户端缓存


### 框架优化

#### TP5框架

##### 生成类库映射文件

提高系统自动加载的性能

    php think optimize:autoload


指令执行成功后，会在runtime目录下面生成```classmap.php```文件，生成的类库映射文件会扫描系统目录和应用目录的类库。

##### 生成路由缓存

如果你的应用定义了比较多的路由规则，可以使用下面的指令生成路由缓存文件，提高系统的路由检测的性能。

    php think optimize:route

指令执行成功后，会在runtime目录下面生成```route.php```文件，生成的路由缓存文件仅仅支持在应用的路由配置文件中定义的路由（包括方法定义和配置定义）。

##### 生成配置缓存文件

可以为应用或模块生成配置缓存文件，提高每次请求读取各种配置文件数据效率。

    php think optimize:config

默认生成应用的配置缓存文件，调用后会在runtime目录下面生成init.php文件，生成配置缓存文件后，应用目录下面的```config.php``` ```common.php```以及```tags.php```不会被加载，被```runtime/init.php```取代。

如果需要生成某个模块的配置缓存，可以使用：

    php think optimize:config index

调用后会在```runtime/index```目录下面生成```init.php```文件，生成后，index模块目录下面的```config.php``` ```common.php```以及```tags.php```不会被加载，被```runtime/index/init.php```取代。

##### 生成数据库表字段缓存文件

1、可以通过生成数据表字段信息缓存，提升数据库查询的性能，避免多余的查询。

    php think optimize:schema

执行后会自动在runtime/schema目录下面按照数据表生成字段缓存文件。

2、如果你的应用使用了不同的数据库连接，可以根据模块来生成，如下:

    php think optimize:schema --module index

会读取index模块的模型来生成数据表字段缓存。

3、如果你自定义数据库连接配置，可以根据配置来生成：

    php think optimize:schema --config db_default

4、也支持指定数据库表

    php think optimize:schema --table think_user

    php think optimize:schema --table db.think_user

5、更新数据库表字段缓存文件

> 与生成是同样的方式，每次执行都会重新生成缓存。


### 前端/客户端优化

#### 业务请求

#### 图片请求

#### js/css 请求

#### 逻辑代码优化







