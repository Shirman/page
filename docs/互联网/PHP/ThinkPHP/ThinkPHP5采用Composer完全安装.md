


<!-- TOC -->

- [composer安装](#composer安装)
- [ThinkPHP5 composer安装](#thinkphp5-composer安装)
- [安装其他扩展](#安装其他扩展)
    - [安装think-image](#安装think-image)
    - [安装think-captcha](#安装think-captcha)
    - [安装JWT](#安装jwt)
    - [安装七牛SDK](#安装七牛sdk)
    - [安装querylist](#安装querylist)

<!-- /TOC -->
### composer安装

windows详见：
[windows10安装composer](/开发调试/windows10安装composer.md);

linux详见：
[Ubuntu安装composer](/开发调试/Ubuntu安装composer.md);

建议更换composer镜像为中国镜像，详见
https://pkg.phpcomposer.com

### ThinkPHP5 composer安装

    composer create-project topthink/think=5.0.* tp5  --prefer-dist

表示安装最新的5.0版本

```
PS I:\src\qing-tp> composer create-project topthink/think=5.0.* tp5  --prefer-dist
```  

```
Installing topthink/think (v5.0.24)
- Installing topthink/think (v5.0.24): Downloading (100%)
Created project in tp5
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 2 installs, 0 updates, 0 removals
- Installing topthink/think-installer (v1.0.12): Loading from cache
- Installing topthink/framework (v5.0.24): Loading from cache
Writing lock file
Generating autoload files
```

>在qing-tp目录下生成tp5目录，个人将tp5目录文件全部移动到qing-tp目录下。

```
PS I:\src\qing-tp> ls


    目录: I:\src\qing-tp


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----        2019/2/27     16:01                application
d-----        2019/2/27     16:01                extend
d-----        2019/2/27     16:01                public
d-----        2019/2/27     16:01                runtime
d-----        2019/2/27     16:01                thinkphp
d-----        2019/2/27     16:01                vendor
-a----        2019/2/27     16:01             35 .gitignore
-a----        2019/2/27     16:01           2038 .travis.yml
-a----        2019/2/27     16:01           1099 build.php
-a----        2019/2/27     16:01          48648 CHANGELOG.md
-a----        2019/2/27     16:01            660 composer.json
-a----        2019/2/27     16:01           3782 composer.lock
-a----        2019/2/27     16:01           1822 LICENSE.txt
-a----        2019/2/27     16:01           5779 README.md
-a----        2019/2/27     16:01            753 think
```



### 安装其他扩展

#### 安装think-image

```
PS I:\src\qing-tp> composer require topthink/think-image
```

```
Using version ^1.0 for topthink/think-image
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing topthink/think-image (v1.0.7): Loading from cache
Writing lock file
Generating autoload files
```

#### 安装think-captcha

```
PS I:\src\qing-tp> composer require topthink/think-captcha:1.*
```

```
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing topthink/think-captcha (v1.0.8): Loading from cache
Writing lock file
Generating autoload files
```


#### 安装JWT
```
PS I:\src\qing-tp> composer require firebase/php-jwt
```

```
Using version ^5.0 for firebase/php-jwt
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing firebase/php-jwt (v5.0.0): Loading from cache
Writing lock file
Generating autoload files
```


#### 安装七牛SDK
```
PS I:\src\qing-tp> composer require qiniu/php-sdk
Using version ^7.2 for qiniu/php-sdk
```

```
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing qiniu/php-sdk (v7.2.7): Loading from cache
Writing lock file
Generating autoload files
```

#### 安装querylist
```
PS I:\src\qing-tp> composer require jaeger/querylist
```

```
Using version ^4.1 for jaeger/querylist
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 19 installs, 0 updates, 0 removals
  - Installing league/flysystem (1.0.50): Downloading (100%)
  - Installing psr/cache (1.0.1): Downloading (100%)
  - Installing cache/tag-interop (1.0.0): Downloading (100%)
  - Installing psr/log (1.1.0): Loading from cache
  - Installing psr/simple-cache (1.0.1): Downloading (100%)
  - Installing cache/adapter-common (1.1.0): Downloading (100%)
  - Installing cache/filesystem-adapter (1.0.0): Downloading (100%)
  - Installing guzzlehttp/promises (v1.3.1): Loading from cache
  - Installing ralouphie/getallheaders (2.0.5): Loading from cache
  - Installing psr/http-message (1.0.1): Loading from cache
  - Installing guzzlehttp/psr7 (1.5.2): Loading from cache
  - Installing guzzlehttp/guzzle (6.3.3): Loading from cache
  - Installing jaeger/g-http (V1.6.0): Downloading (100%)
  - Installing symfony/polyfill-php72 (v1.10.0): Loading from cache
  - Installing symfony/polyfill-mbstring (v1.10.0): Loading from cache
  - Installing symfony/var-dumper (v4.2.3): Downloading (100%)
  - Installing tightenco/collect (v5.7.27): Downloading (100%)
  - Installing jaeger/phpquery-single (1.0.0): Downloading (100%)
  - Installing jaeger/querylist (V4.1.1): Downloading (100%)
league/flysystem suggests installing league/flysystem-aws-s3-v2 (Allows you to use S3 storage with AWS SDK v2)
league/flysystem suggests installing league/flysystem-aws-s3-v3 (Allows you to use S3 storage with AWS SDK v3)
league/flysystem suggests installing league/flysystem-azure (Allows you to use Windows Azure Blob storage)
league/flysystem suggests installing league/flysystem-cached-adapter (Flysystem adapter decorator for metadata caching)
league/flysystem suggests installing league/flysystem-eventable-filesystem (Allows you to use EventableFilesystem)
league/flysystem suggests installing league/flysystem-rackspace (Allows you to use Rackspace Cloud Files)
league/flysystem suggests installing league/flysystem-sftp (Allows you to use SFTP server storage via phpseclib)
league/flysystem suggests installing league/flysystem-webdav (Allows you to use WebDAV storage)
league/flysystem suggests installing league/flysystem-ziparchive (Allows you to use ZipArchive adapter)
league/flysystem suggests installing spatie/flysystem-dropbox (Allows you to use Dropbox storage)
league/flysystem suggests installing srmklive/flysystem-dropbox-v2 (Allows you to use Dropbox storage for PHP 5 applications)
symfony/var-dumper suggests installing ext-intl (To show region name in time zone dump)
symfony/var-dumper suggests installing symfony/console (To use the ServerDumpCommand and/or the bin/var-dump-server script)
Writing lock file
Generating autoload files
```




