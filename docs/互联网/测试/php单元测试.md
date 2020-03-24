<!-- TOC -->

- [文档入口](#文档入口)
- [概念](#概念)
- [安装](#安装)
    - [phpunit](#phpunit)
        - [phar安装](#phar安装)
        - [composer安装](#composer安装)
    - [phpunit-skelgen](#phpunit-skelgen)
- [使用](#使用)
    - [NetBeans集成](#netbeans集成)
        - [配置phpunit](#配置phpunit)
        - [选择项目测试工具](#选择项目测试工具)
        - [创建和运行phpunit测试](#创建和运行phpunit测试)
        - [使用测试组](#使用测试组)
    - [可选包](#可选包)

<!-- /TOC -->

## 文档入口

官方文档：https://phpunit.de/index.html


中文文档：https://phpunit.readthedocs.io/zh_CN/latest/installation.html


## 概念

- phpunit：是php的测试框架，来源于xunit

- phar：是PHP 档案包 (PHAR)，参考java的JAR包

- phpunit-skelgen：是phpunit一个脚手架，可以自动生成phpunit的测试文件，省去手动编写大部分重复的测试代码

## 安装

### phpunit

#### phar安装

- unix

```
wget -O phpunit https://phar.phpunit.de/phpunit-7.phar

chmod +x phpunit

./phpunit --version

```
- windows

下载phar：https://phar.phpunit.de/phpunit-7.phar

如需要转换成.bat文件：

在phar当前文件目录下创建一个空文件：phpunit.bat

写入：

```
@php "%~dp0phpunit-7.phar" %*
```

#### composer安装

```
PS I:\src\php-shiyanchang> php -v
PHP 7.1.23 (cli) (built: Oct 10 2018 00:37:01) ( ZTS MSVC14 (Visual C++ 2015) x86 )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2018 Zend Technologies
PS I:\src\php-shiyanchang> composer require --dev phpunit/phpunit ^7
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 29 installs, 0 updates, 0 removals
  - Installing sebastian/version (2.0.1): Downloading (100%)
  - Installing sebastian/resource-operations (1.0.0): Downloading (100%)
  - Installing sebastian/recursion-context (3.0.0): Downloading (100%)
  - Installing sebastian/object-reflector (1.1.1): Downloading (100%)
  - Installing sebastian/object-enumerator (3.0.3): Downloading (100%)
  - Installing sebastian/global-state (2.0.0): Downloading (100%)
  - Installing sebastian/exporter (3.1.2): Downloading (100%)
  - Installing sebastian/environment (3.1.0): Downloading (100%)
  - Installing sebastian/diff (3.0.2): Downloading (100%)
  - Installing sebastian/comparator (2.1.3): Downloading (100%)
  - Installing doctrine/instantiator (1.3.0): Downloading (100%)
  - Installing phpunit/php-text-template (1.2.1): Downloading (100%)
  - Installing phpunit/phpunit-mock-objects (6.1.2): Downloading (100%)
  - Installing phpunit/php-timer (2.1.2): Downloading (100%)
  - Installing phpunit/php-file-iterator (1.4.5): Downloading (100%)
  - Installing theseer/tokenizer (1.1.3): Downloading (100%)
  - Installing sebastian/code-unit-reverse-lookup (1.0.1): Downloading (100%)
  - Installing phpunit/php-token-stream (3.1.1): Downloading (100%)
  - Installing phpunit/php-code-coverage (6.0.5): Downloading (100%)
  - Installing symfony/polyfill-ctype (v1.14.0): Downloading (100%)
  - Installing webmozart/assert (1.7.0): Downloading (100%)
  - Installing phpdocumentor/reflection-common (2.0.0): Downloading (100%)
  - Installing phpdocumentor/type-resolver (1.0.1): Downloading (100%)
  - Installing phpdocumentor/reflection-docblock (4.3.4): Downloading (100%)
  - Installing phpspec/prophecy (v1.10.3): Downloading (100%)
  - Installing phar-io/version (1.0.1): Downloading (100%)
  - Installing phar-io/manifest (1.0.1): Downloading (100%)
  - Installing myclabs/deep-copy (1.9.5): Downloading (100%)
  - Installing phpunit/phpunit (7.0.0): Downloading (100%)
sebastian/global-state suggests installing ext-uopz (*)
phpunit/phpunit-mock-objects suggests installing ext-soap (*)
phpunit/php-code-coverage suggests installing ext-xdebug (^2.6.0)
phpunit/phpunit suggests installing phpunit/php-invoker (^2.0)
phpunit/phpunit suggests installing ext-xdebug (*)
Package phpunit/phpunit-mock-objects is abandoned, you should avoid using it. No replacement was suggested.
Writing lock file
Generating autoload files
```
确认
```
PS I:\src\php-shiyanchang> .\vendor\bin\phpunit --version
PHPUnit 7.0.0 by Sebastian Bergmann and contributors.
```


### phpunit-skelgen

https://phar.phpunit.de

可以看到：phpunit-skelgen-2.0.1.phar，2014年的版本，已经是最新的，显然已经不支持phpunit7及更高版本，也就是说目前skelgen脚手架生成的phpunit测试骨架文件已经不是最新的phpunit编写方式，主要表现在类及命名空间上，原大部分方法仍然可用。后续例子会有体现。

下载：https://phar.phpunit.de/phpunit-skelgen-2.0.1.phar


## 使用

### NetBeans集成

本节内容基本来自：http://netbeans.apache.org/kb/docs/php/phpunit.html

由于skelgen版本未支持phpunit7以上版本，netbeans上的文档未能提及，这里稍微补充。

#### 配置phpunit

请打开“工具”>“选项”（在Mac上，打开“ NetBeans首选项”），然后查看“ PHP”窗口。打开“单元测试”选项卡。PHPUnit和Skeleton Generator脚本的路径应出现。如果没有脚本，请单击空白字段旁边的“搜索”。IDE将在本地系统中搜索脚本。或者，单击浏览并浏览该脚本。

这里我们自己下载了phpunit的phar包，和skelgen的phar包，选择我们自己的phar包即可。

![如图：配置phpunit](/docs/_media/images/phpunit/01-配置phpunit.png)

#### 选择项目测试工具

每个项目都能选择测试工具，并添加单元测试文件存储目录（后面skelgen脚手架自动生成测试文件时需要）

![如图：选择项目测试工具为phpunit，并添加测试目录](/docs/_media/images/phpunit/02-选择项目测试工具为phpunit.png)

#### 创建和运行phpunit测试

NetBeans IDE可以在文件中的所有PHP类上创建并运行PHPUnit测试。为了确保测试生成器能够正常工作，请为PHP文件指定与文件中的第一类相同的名称。

要为类创建并运行PHPUnit测试：

- 创建一个名为Calculator的PHP项目。在此项目中，创建一个名为的文件 calculator.php。在此文件中，从PHPUnit文档的Skeleton Generator章中键入或粘贴Calculator类。

```
<?php
class Calculator
{
    public function add($a, $b)
    {
        return $a + $b;
    }
}
?>
```
- 添加带有@assert批注的注释块以及一些示例输入和输出。请注意，此示例中包含一个错误的断言

<?php
class Calculator
{
    /**
     * @assert (0, 0) == 0
     * @assert (0, 1) == 1
     * @assert (1, 0) == 1
     * @assert (1, 1) == 2
     * @assert (1, 2) == 4
     */
    public function add($a, $b)
    {
        return $a + $b;
    }
}
?>

> 您可以使用注释代码完成来添加@assert注释。使用Tab键在参数之间导航，或在填写参数值后单击Enter。

- 在“项目”窗口中，右键单击Calculator.php文件节点，然后选择“工具”>“创建/更新测试”。请注意，您可以在“源文件”节点的上下文菜单中为项目中的所有文件创建测试。


![如图：创建测试](/docs/_media/images/phpunit/03-创建测试.png)

首次创建测试时，将打开一个对话框，询问您要在其中存储测试文件的目录。在此示例中，使用浏览功能创建 tests 目录

![如图：选择测试框架及生成测试文件位置](/docs/_media/images/phpunit/04-选择测试框架.png)

> 您可以为一个项目手动编写多个测试。如果编写多个测试，则可以将它们分类到测试文件目录的子文件夹中，例如“重要”或“快速”。然后，通过右键单击该文件夹并选择“运行测试”，可以在子文件夹中运行测试。

IDE在名为CalculatorTest.php的文件中生成框架测试类，该文件显示在“项目”窗口中，并在编辑器中打开。

> 请注意，将为每个@assert 注释创建一个测试 


**调整CalculatorTest.php文件支持更新版本的phpunit：**

```php
/**
 * Generated by PHPUnit_SkeletonGenerator on 2020-03-23 at 20:19:56.
 */
include_once dirname(dirname(__DIR__))."/UnitTestDemo/Calculator.php";//这行是我们手动加的。这个可以在项目设置中-测试-phpunit选项中设置bootstrap启动脚本，常用语自动加载文件及一些常量设置，这里我们可以写个autoload
use PHPUnit\Framework\TestCase;//这行是我们手动加的。为了支持新的phpunit。
use UnitTestDemo\Calculator;//这行我们手动加的。为了支持自动生成测试代码中使用到Calculator类。

class CalculatorTest extends TestCase
//class CalculatorTest extends PHPUnit_Framework_TestCase   // 这行是脚手架skelgen自动生成的，由于skelgen仍然使用的是旧的phpunit的写法，所以更换成:extends PHPUnit\Framework\TestCase

{

    /**
     * @var Calculator
     */
.......略....

}

```

> bootstrap启动脚本自动加载参考

```php
//bootstrap启动脚本自动加载参考
spl_autoload_register('autoloadDesignPattern');
function autoloadDesignPattern($className){
    include_once __DIR__.DIRECTORY_SEPARATOR.$className.".php";
}
```

> 显然我们需要新的脚手架，或者自己团队日积月累打造适合自己产品项目的脚手架

您可以测试单个文件或整个项目。要测试项目，请右键单击项目的父节点，然后选择“测试”，或按Alt-F6。要测试Calculator.php文件，请右键单击该文件的节点，然后选择“测试”，或按Ctrl-F6 /⌘-F6。此示例在一个文件中只有一个类，因此结果是相同的。IDE将运行测试，并在“测试结果”窗口中显示结果。

![如图：测试结果](/docs/_media/images/phpunit/05-测试结果.png)

结果的更详细的文本版本显示在“输出”窗口中。


#### 使用测试组

详见：http://netbeans.apache.org/kb/docs/php/phpunit.html

可以选择运行测试套件时要执行的测试组。例如，您可能有一些只想在生产环境中运行的测试，而有些想同时在生产和开发环境中运行的测试。你会放置一个前测试 production 组，后者的测试中都 production 和 development 团体。在开发环境中运行测试套件时，仅选择development 要执行的 测试组。

### 可选包

- PHP_Invoker

一个工具类，可以用带有超时限制的方式调用可调用内容。当需要在严格模式下保证测试的超时限制时，这个组件包是必须的。

    composer require --dev phpunit/php-invoker

- DbUnit

移植到 PHP/PHPUnit 上的 DbUnit 用于提供对数据库交互测试的支持。

    composer require --dev phpunit/dbunit

----

2020 [@TsingChan](http://9ong.com/)
