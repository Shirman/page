
<!-- TOC -->

- [下载](#下载)
- [*nix系统](#nix系统)
- [Windows系统](#windows系统)

<!-- /TOC -->
## 下载

首先，下载ApiGen（http://apigen.org/apigen.phar）

## *nix系统

下载phar文件后, 移动到PATH目录中，以保证全局有权限调用

```
$ mv apigen.phar /usr/local/bin/apigen
```
现
在你可以使用简洁的 apigen 替代 php apigen.phar 


## Windows系统

移动phar文件到环境变量PATH任一目录中

打开CMD，切换到phar文件所在目录，通过 apigen.phar 生成 apigen.bat 

```
C:\bin>echo @php "%~dp0apigen.phar" %*>apigen.bat
```

在命令行中，检验是否安装成功：

```
C:\Users\username>apigen
ApiGen version v4.0.0
```