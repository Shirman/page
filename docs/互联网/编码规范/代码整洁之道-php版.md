<!-- TOC -->

- [变量](#变量)
    - [使用有意义且可发音的变量名称](#使用有意义且可发音的变量名称)
    - [对于相同类型的变量使用相同的词汇](#对于相同类型的变量使用相同的词汇)
    - [使用可搜索的名称（一）](#使用可搜索的名称一)
    - [使用解释性变量](#使用解释性变量)
    - [避免嵌套太深或太早返回](#避免嵌套太深或太早返回)
    - [避免猜测式变量命名](#避免猜测式变量命名)
    - [不要加不必要的上下文内容](#不要加不必要的上下文内容)
    - [使用默认参数代替条件式定义参数](#使用默认参数代替条件式定义参数)
- [比较](#比较)
    - [使用完全相等比较](#使用完全相等比较)
- [函数](#函数)
    - [函数参数（理想情况2个或更少）](#函数参数理想情况2个或更少)
    - [函数应该只做一件事](#函数应该只做一件事)
    - [函数名应该告诉阅读者它在做什么](#函数名应该告诉阅读者它在做什么)
    - [函数应该只能一个抽象级别](#函数应该只能一个抽象级别)
    - [不建议使用布尔值标记值作为参数](#不建议使用布尔值标记值作为参数)
    - [避免副作用](#避免副作用)
    - [尽量不定义全局通用函数](#尽量不定义全局通用函数)
    - [尽量不使用单例模式](#尽量不使用单例模式)
    - [条件表达式封装](#条件表达式封装)
    - [尽量避免否定条件表达式](#尽量避免否定条件表达式)
    - [避免条件表达式](#避免条件表达式)
    - [避免类型检查](#避免类型检查)
    - [删除无用的代码](#删除无用的代码)
- [对象与数据结构](#对象与数据结构)
    - [使用对象封装](#使用对象封装)
    - [使用类受保护[protected]与私有[private]成员变量或方法](#使用类受保护protected与私有private成员变量或方法)
- [类](#类)
    - [组合还是继承？](#组合还是继承)
    - [避免链式写法](#避免链式写法)
    - [鼓励使用final关键字](#鼓励使用final关键字)
- [面向对象编程设计5个原则（SOLID）](#面向对象编程设计5个原则solid)
    - [单一职责原则 （SRP）](#单一职责原则-srp)
    - [开放/封闭原则（OCP）](#开放封闭原则ocp)
    - [里氏替换原则（LSP）](#里氏替换原则lsp)
    - [接口隔离原则（ISP）](#接口隔离原则isp)
    - [依赖倒置原则（DIP）](#依赖倒置原则dip)
- [避免重复的代码](#避免重复的代码)

<!-- /TOC -->


> 记录主要用于温故而知新，本文参考翻译https://github.com/jupeter/clean-code-php

> 编码工具是有形的利器，编码规范是无形的利器，同样帮助提高效率，降低成本；

> 当然代码整洁之道不是风格指南，它是生成可读、可重用、可重构的编码设计指南；

> 并非所有准则都必须严格遵守，但这些准则是很多多年编码经验的coder集体结晶，建议了解结合实际情况形成习惯。
    


---

### 变量
#### 使用有意义且可发音的变量名称

bad

```
$ymdstr = $moment->format('y-m-d');
```
good

```
$currentDate = $moment->format('y-m-d');
```

#### 对于相同类型的变量使用相同的词汇

bad
```
getUserInfo();
getUserData();
getUserRecord();
getUserProfile();
```
good

```
getUser();
```

#### 使用可搜索的名称（一）
比起写代码，我们更经常阅读代码。

编写可阅读可搜索的代码是很重要，通过未赋予名称的变量将使得我们的程序难以理解，将会伤害阅读代码及维护代码的人。我们要确保我们的变量命名可阅读可搜索。

bad

```
// 到底什么是448？
$result = $serializer->serialize($data, 448);
```

good

```
$json = $serializer->serialize($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
```

bad

```
// What the heck is 4 for?
if ($user->access & 4) {
    // ...
}
```
good

```
class User
{
    const ACCESS_READ = 1;
    const ACCESS_CREATE = 2;
    const ACCESS_UPDATE = 4;
    const ACCESS_DELETE = 8;
}

if ($user->access & User::ACCESS_UPDATE) {
    // do edit ...
}
```

#### 使用解释性变量
bad

```
$address = 'One Infinite Loop, Cupertino 95014';
$cityZipCodeRegex = '/^[^,]+,\s*(.+?)\s*(\d{5})$/';
preg_match($cityZipCodeRegex, $address, $matches);

saveCityZipCode($matches[1], $matches[2]);
```

not bad
比之前更好，但仍然严重依赖于正则表达式


```
$address = 'One Infinite Loop, Cupertino 95014';
$cityZipCodeRegex = '/^[^,]+,\s*(.+?)\s*(\d{5})$/';
preg_match($cityZipCodeRegex, $address, $matches);

[, $city, $zipCode] = $matches;
saveCityZipCode($city, $zipCode);
```

good
通过子模式命名减少对正则的依赖
```
$address = 'One Infinite Loop, Cupertino 95014';
$cityZipCodeRegex = '/^[^,]+,\s*(?<city>.+?)\s*(?<zipCode>\d{5})$/';
preg_match($cityZipCodeRegex, $address, $matches);

saveCityZipCode($matches['city'], $matches['zipCode']);
```

#### 避免嵌套太深或太早返回
太多的if-else语句会让代码难以阅读跟踪，显式优于隐式
bad

```
function isShopOpen($day): bool
{
    if ($day) {
        if (is_string($day)) {
            $day = strtolower($day);
            if ($day === 'friday') {
                return true;
            } elseif ($day === 'saturday') {
                return true;
            } elseif ($day === 'sunday') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
```

good

```
function isShopOpen(string $day): bool
{
    if (empty($day)) {
        return false;
    }

    $openingDays = [
        'friday', 'saturday', 'sunday'
    ];

    return in_array(strtolower($day), $openingDays, true);
}
```

bad

```
function fibonacci(int $n)
{
    if ($n < 50) {
        if ($n !== 0) {
            if ($n !== 1) {
                return fibonacci($n - 1) + fibonacci($n - 2);
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    } else {
        return 'Not supported';
    }
}
```
good

```
function fibonacci(int $n): int
{
    if ($n === 0 || $n === 1) {
        return $n;
    }

    if ($n > 50) {
        throw new \Exception('Not supported');
    }

    return fibonacci($n - 1) + fibonacci($n - 2);
}
```

#### 避免猜测式变量命名
不要迫使代码阅读者去翻译或猜测变量的含义

bad

```
$l = ['Austin', 'New York', 'San Francisco'];

for ($i = 0; $i < count($l); $i++) {
    $li = $l[$i];
    doStuff();
    doSomeOtherStuff();
    // ...
    // ...
    // ...
    // Wait, $li 又是表示什么意思？
    dispatch($li);
}
```
good

```
$locations = ['Austin', 'New York', 'San Francisco'];

foreach ($locations as $location) {
    doStuff();
    doSomeOtherStuff();
    // ...
    // ...
    // ...
    dispatch($location);
}
```

#### 不要加不必要的上下文内容
如果你的类名已经清楚告诉是什么事物了，不要再内部变量或方法命名上重复该事物

bad

```
class Car
{
    public $carMake;
    public $carModel;
    public $carColor;

    //...
}
```

good

```
class Car
{
    public $make;
    public $model;
    public $color;

    //...
}
```

#### 使用默认参数代替条件式定义参数
not good

```
//$breweryName 有可能是null
function createMicrobrewery($breweryName = 'Hipster Brew Co.'): void
{
    // ...
}
```

not bad
这个版本比上一个版本更好理解，且更好地控制变量的值

```
function createMicrobrewery($name = null): void
{
    $breweryName = $name ?: 'Hipster Brew Co.';
    // ...
}
```
good
可以使用类型提示确保变量$breweryName不会是null
```
function createMicrobrewery(string $breweryName = 'Hipster Brew Co.'): void
{
    // ...
}
```

---

### 比较
#### 使用完全相等比较
简单比较将字符串转换成数字

not good
```
$a = '42';
$b = 42;

if ($a != $b) {
   // 虽然表达式 $a != $b 返回true，但实际是上字符串42有别于数字42
}
```

good

完全相等比较将比较<font color=blue>**类型和值**</font>

```
$a = '42';
$b = 42;

if ($a !== $b) {
    // 这个表达式返回true，才是真正不相等
}
```


---
### 函数
#### 函数参数（理想情况2个或更少）
限制函数参数数量是非常重要的，因为它使得函数更加简洁，测试更容易。超过3个参数会导致参数组合繁杂混乱，你需要大量不同的用例来测试每个独立的参数。

没有参数是最理想的例子。1个或2个参数还也还行，3个参数应该需要注意，建议避免。通常如果超过2个参数，说明你的函数做了太多的事；如果确实需要传入很多参数，我们可以考虑<font color=blue>**更高级别的数据结构如数组或对象**</font>作为参数。


bad
```
function createMenu(string $title, string $body, string $buttonText, bool $cancellable): void
{
    // ...
}
```

good

```
class MenuConfig
{
    public $title;
    public $body;
    public $buttonText;
    public $cancellable = false;
}

$config = new MenuConfig();
$config->title = 'Foo';
$config->body = 'Bar';
$config->buttonText = 'Baz';
$config->cancellable = true;

function createMenu(MenuConfig $config): void
{
    // ...
}
```

#### 函数应该只做一件事
<font color=blue>**这是目前为止软件工程里最重要的原则之一。**</font> 当函数做太多事，将难以编写、测试及推导。如果可以封装一个函数做一件事，那以后将很容易重构代码，代码也更容易阅读与维护。<font color=blue>**只要记住并学会这点，你就已经走在大部分开发者的前列了。**</font>

当然大部分情况下，遵循这个原则，仍然要实事求是，根据实际情况采取适当的编写方式。

bad

client的查询、激活判断、发送邮件，三件事在一个函数里完成，函数功能过多。

```
function emailClients(array $clients): void
{
    foreach ($clients as $client) {
        $clientRecord = $db->find($client);
        if ($clientRecord->isActive()) {
            email($client);
        }
    }
}
```


good

```
function emailClients(array $clients): void
{
    $activeClients = activeClients($clients);
    array_walk($activeClients, 'email');
}

function activeClients(array $clients): array
{
    return array_filter($clients, 'isClientActive');
}

function isClientActive(int $client): bool
{
    $clientRecord = $db->find($client);

    return $clientRecord->isActive();
}
```

#### 函数名应该告诉阅读者它在做什么
bad

```
class Email
{
    //...

    public function handle(): void
    {
        mail($this->to, $this->subject, $this->body);
    }
}

$message = new Email(...);
// 这个handle方法是什么？消息句柄吗？是要写文件流吗？
$message->handle();
```
good

```
class Email 
{
    //...

    public function send(): void
    {
        mail($this->to, $this->subject, $this->body);
    }
}

$message = new Email(...);
// 清晰明了，知道对象是什么，知道send方法做了什么
$message->send();
```

#### 函数应该只能一个抽象级别
当函数有多层抽象时，说明函数做了太多事。分而治之使得函数更高的可重用性，也更便于测试。

<font color=blue>**示例不是为了教我们怎么编码，而是教我们面向对象编码思维。**</font>

bad

```
function parseBetterJSAlternative(string $code): void
{
    $regexes = [
        // ...
    ];

    $statements = explode(' ', $code);
    $tokens = [];
    foreach ($regexes as $regex) {
        foreach ($statements as $statement) {
            // ...
        }
    }

    $ast = [];
    foreach ($tokens as $token) {
        // lex...
    }

    foreach ($ast as $node) {
        // parse...
    }
}
```

bad too

在上面的基础，抽取出部分代码封装成函数，但parseBetterJSAlternative函数仍然复杂且不好测试。
```
function tokenize(string $code): array
{
    $regexes = [
        // ...
    ];

    $statements = explode(' ', $code);
    $tokens = [];
    foreach ($regexes as $regex) {
        foreach ($statements as $statement) {
            $tokens[] = /* ... */;
        }
    }

    return $tokens;
}

function lexer(array $tokens): array
{
    $ast = [];
    foreach ($tokens as $token) {
        $ast[] = /* ... */;
    }

    return $ast;
}

function parseBetterJSAlternative(string $code): void
{
    $tokens = tokenize($code);
    $ast = lexer($tokens);
    foreach ($ast as $node) {
        // parse...
    }
}
```

good

更好的方案是从parseBetterJSAlternative剥离出那些依赖项。

```
class Tokenizer
{
    public function tokenize(string $code): array
    {
        $regexes = [
            // ...
        ];

        $statements = explode(' ', $code);
        $tokens = [];
        foreach ($regexes as $regex) {
            foreach ($statements as $statement) {
                $tokens[] = /* ... */;
            }
        }

        return $tokens;
    }
}

class Lexer
{
    public function lexify(array $tokens): array
    {
        $ast = [];
        foreach ($tokens as $token) {
            $ast[] = /* ... */;
        }

        return $ast;
    }
}

class BetterJSAlternative
{
    private $tokenizer;
    private $lexer;

    public function __construct(Tokenizer $tokenizer, Lexer $lexer)
    {
        $this->tokenizer = $tokenizer;
        $this->lexer = $lexer;
    }

    public function parse(string $code): void
    {
        $tokens = $this->tokenizer->tokenize($code);
        $ast = $this->lexer->lexify($tokens);
        foreach ($ast as $node) {
            // parse...
        }
    }
}
```

#### 不建议使用布尔值标记值作为参数
布尔值标记值作为参数，说明我们的函数做了至少两件以上的事，函数尽量只做一件事，尝试拆分函数。

bad
```
function createFile(string $name, bool $temp = false): void
{
    if ($temp) {
        touch('./temp/'.$name);
    } else {
        touch($name);
    }
}
```
good

```
function createFile(string $name): void
{
    touch($name);
}

function createTempFile(string $name): void
{
    touch('./temp/'.$name);
    //createFile('./temp/'.$name);    //或者调用下一级函数    
}
```

#### 避免副作用
当一个函数有输入参数并执行操作后返回值时，就有可能产生副作用。副作用有可能是写入文件、修改全局变量或偶然的将余额写入其他用户账户上。

如果有时确实无法避免这样类似的副作用，向上面写入文件的例子，我们可以尝试集中在一个文件/类/函数/方法等服务来统一处理文件的写入，不要有多个函数或类在处理这些特殊的文件写入。<font color=blue>**只要有一个服务处理文件写入这项事情，有且只有一个。**</font>

bad
```
// 函数里引用全局变量$name
// 如果接下来还有第二个函数使用到这个全局变量$name，第二个函数接收到的变量$name已经是一个array数组，破坏了变量类型的一致性

$name = 'Ryan McDermott';

function splitIntoFirstAndLastName(): void
{
    global $name;

    $name = explode(' ', $name);
}

splitIntoFirstAndLastName();

var_dump($name); // ['Ryan', 'McDermott'];
```
good

<font color=blue>**一个函数只做一件事，且事情有开始和结束，完整的闭环。所以尽量保证每个函数或方法都会返回值，即使是布尔值。**</font>
```
function splitIntoFirstAndLastName(string $name): array
{
    return explode(' ', $name);
}

$name = 'Ryan McDermott';
$newName = splitIntoFirstAndLastName($name);

var_dump($name); // 'Ryan McDermott';
var_dump($newName); // ['Ryan', 'McDermott'];
```

#### 尽量不定义全局通用函数

比如我们经常会在入口文件定义一些通用函数config、check等简单命名的通用函数，这是一个不良好的习惯，通用函数很容易和第三方库或其他模块函数冲突。

<font color=blue>**通过类、命名空间能很好的解决这个问题。**</font>

bad

```
function config(): array
{
    return  [
        'foo' => 'bar',
    ]
}
```
good

```
//配置类
class Configuration
{
    private $configuration = [];

    public function __construct(array $configuration)
    {
        $this->configuration = $configuration;
    }

    public function get(string $key): ?string
    {
        return isset($this->configuration[$key]) ? $this->configuration[$key] : null;
    }
}


//创建配置
$configuration = new Configuration([
    'foo' => 'bar',
]);
//使用配置
$fooConfig = $congiguration->get("foo");


```
#### 尽量不使用单例模式

单例模式是一种[反模式anti-pattern](https://en.wikipedia.org/wiki/Singleton_pattern)：

单例通常作为全局实例，为什么不建议使用？单例隐藏了应用代码里的所有依赖，而不是通过接口来暴露。

单例违反单一职责原则，它自己控制了自己的创建和生命周期。

单例使得代码高耦合，也使得在编码和测试过程更加不方便。

单例会让测试用例混淆不独立，测试用例应该是单一独立的。

bad

```
class DBConnection
{
    private static $instance;

    private function __construct(string $dsn)
    {
        // ...
    }

    public static function getInstance(): DBConnection
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    // ...
}

$singleton = DBConnection::getInstance();
```

good

```
class DBConnection
{
    public function __construct(string $dsn)
    {
        // ...
    }

     // ...
}


//创建一个DB实例，并配置相应DSN，之后代码里必须使用实例$connnection。
$connection = new DBConnection($dsn);

```

#### 条件表达式封装
bad

```
if ($article->state === 'published') {
    // ...
}

```

good

<font color=blue>**条件判断更直观，且不暴露外部不关心的内部属性。**</font>

```
if ($article->isPublished()) {
    // ...
}
```

#### 尽量避免否定条件表达式
bad

```
function isDOMNodeNotPresent(\DOMNode $node): bool
{
    // ...
}

if (!isDOMNodeNotPresent($node))
{
    // ...
}
```

good

阅读更容易、舒服

```
function isDOMNodePresent(\DOMNode $node): bool
{
    // ...
}

if (isDOMNodePresent($node)) {
    // ...
}
```


#### 避免条件表达式
这个有点模糊，可能很多人一下子难以理解和接受。先看个例子：

not good

```
class Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        switch ($this->type) {
            case '777':
                return $this->getMaxAltitude() - $this->getPassengerCount();
            case 'Air Force One':
                return $this->getMaxAltitude();
            case 'Cessna':
                return $this->getMaxAltitude() - $this->getFuelExpenditure();
        }
    }
}
```

good

```
interface Airplane
{
    // ...

    public function getCruisingAltitude(): int;
}

class Boeing777 implements Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        return $this->getMaxAltitude() - $this->getPassengerCount();
    }
}

class AirForceOne implements Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        return $this->getMaxAltitude();
    }
}

class Cessna implements Airplane
{
    // ...

    public function getCruisingAltitude(): int
    {
        return $this->getMaxAltitude() - $this->getFuelExpenditure();
    }
}
```

看完以上示例，发现将条件表达式转换成多态的实现方式。

多态有点：

- 消除类型之间的耦合关系
- 可替换性
- 可扩充性
- 接口性
- 灵活性
- 简化性

<font color=blue>**建议：如果是条件表达式执行的操作粒度较大，建议采用多态实现；如果是条件表达式执行逻辑很简单，个人建议不必要采用多态直到业务逻辑复杂到需要重构时。**</font>



#### 避免类型检查
PHP是弱类型语言，函数可以接收任何类型的参数。

尽量保证API的一致性和永久性。

bad

```
function travelToTexas($vehicle): void
{
    if ($vehicle instanceof Bicycle) {
        $vehicle->pedalTo(new Location('texas'));
    } elseif ($vehicle instanceof Car) {
        $vehicle->driveTo(new Location('texas'));
    }
}
```

good

```
function travelToTexas(Traveler $vehicle): void
{
    $vehicle->travelTo(new Location('texas'));
}
```

bad

```
function combine($val1, $val2): int
{
    if (!is_numeric($val1) || !is_numeric($val2)) {
        throw new \Exception('Must be of type Number');
    }

    return $val1 + $val2;
}
```

good

```
function combine(int $val1, int $val2): int
{
    return $val1 + $val2;
}
```

#### 删除无用的代码
无用的代码和重复的代码一样糟糕，没有必要在项目代码中一直保留这些无用的代码。如果这些代码从不被调用，那就删除它们。如果你还需要他们，可以从git或svn版本管理的历史版本中获取。

bad

```
function oldRequestModule(string $url): void
{
    // ...
}

function newRequestModule(string $url): void
{
    // ...
}

$request = newRequestModule($requestUrl);
inventoryTracker('apples', $request, 'www.inventory-awesome.io');
```
good

```
function requestModule(string $url): void
{
    // ...
}

$request = requestModule($requestUrl);
inventoryTracker('apples', $request, 'www.inventory-awesome.io');
```

---

### 对象与数据结构

#### 使用对象封装

在PHP中可以设定public，protected以及private对方法的关键词。使用这些关键词可以控制对象的属性修改。

这是PHP开发者面向对象基本知识。

- 当除了get对象属性外，还想对属性有更多操作时，则不必查找并更改代码库中的每个访问对象对应的访问对象属性代码。
- 在set的时候，可以额外做更多的验证
- 封装内部逻辑表现
- get和set时，可以方便地添加日志记录和错误处理
- 继承此类，您可以覆盖重写默认功能函数
- 您可以延迟加载对象的属性，假设从服务器获取

bad
```
class BankAccount
{
    public $balance = 1000;
}

$bankAccount = new BankAccount();

// Buy shoes...
$bankAccount->balance -= 100;
```

good

```
class BankAccount
{
    private $balance;

    public function __construct(int $balance = 1000)
    {
      $this->balance = $balance;
    }

    public function withdraw(int $amount): void
    {
        if ($amount > $this->balance) {
            throw new \Exception('Amount greater than available balance.');
        }

        $this->balance -= $amount;
    }

    public function deposit(int $amount): void
    {
        $this->balance += $amount;
    }

    public function getBalance(): int
    {
        return $this->balance;
    }
}

$bankAccount = new BankAccount();

// Buy shoes...
$bankAccount->withdraw($shoesPrice);

// Get balance
$balance = $bankAccount->getBalance();
```

#### 使用类受保护[protected]与私有[private]成员变量或方法
public 方法或属性的修改都是很危险的，因为外部访问代码很容易依赖且修改它们，且所属类不能控制哪些访问代码依赖于它们。<font color=blue>**类的修改都会影响所有依赖该类的访问代码。**</font>

protected 与public一样危险，只不过在访问机制上有差异，只有子类范围可以访问及修改。类中的修改对所有后代类都是危险的。

private 修饰符可以保证类属性的设置与获取入口统一，可以保证类方法不暴露，业务逻辑原子性。


bad

```
class Employee
{
    public $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }
}

$employee = new Employee('John Doe');
echo 'Employee name: '.$employee->name; // Employee name: John Doe
```


good

```
class Employee
{
    private $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }
}

$employee = new Employee('John Doe');
echo 'Employee name: '.$employee->getName(); // Employee name: John Doe
```

---

### 类
#### 组合还是继承？
什么时候使用继承？这取决于你现在手上的问题，可以从以下列表判断是否更适合使用继承：

- 1、你的继承关系是"is-a"的关系，而不是"has-a"的关系（比如human->animal是is-a的关系，user->userDetail是has-a的关系）
- 2、你可以复用基类的属性或方法代码（比如human和animal都有move的方法等）
- 3、你想通过修改基类改变所有派生类（比如改变所有animals->move方法中消耗的卡路里）


bad


```
class Employee 
{
    private $name;
    private $email;

    public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    // ...
}

// Bad because Employees "have" tax data. 
// EmployeeTaxData is not a type of Employee

class EmployeeTaxData extends Employee 
{
    private $ssn;
    private $salary;
    
    public function __construct(string $name, string $email, string $ssn, string $salary)
    {
        parent::__construct($name, $email);

        $this->ssn = $ssn;
        $this->salary = $salary;
    }

    // ...
}
```

good

<font color=blue>**显然：Employee与EmployeeTaxData是has-a的关系，不应该考虑继承关系，而是组合的关系。**</font>

```
class EmployeeTaxData 
{
    private $ssn;
    private $salary;

    public function __construct(string $ssn, string $salary)
    {
        $this->ssn = $ssn;
        $this->salary = $salary;
    }

    // ...
}

class Employee 
{
    private $name;
    private $email;
    private $taxData;

    public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    public function setTaxData(string $ssn, string $salary)
    {
        $this->taxData = new EmployeeTaxData($ssn, $salary);
    }

    // ...
}
```

#### 避免链式写法
链式写法可以提高代码的可读性及降低代码冗长度，但也要付出一些代价：
- 1、破坏封装
- 2、破坏装饰器
- 3、在测试套件中难以模拟
- 4、提交的差异更难阅读

我们也喜欢使用链式的写法，代码简洁不冗长，但如果为了系统工程自动化集成、测试等，可以尝试避免链式写法。

bad

```
class Car
{
    private $make = 'Honda';
    private $model = 'Accord';
    private $color = 'white';

    public function setMake(string $make): self
    {
        $this->make = $make;

        // NOTE: Returning this for chaining
        return $this;
    }

    public function setModel(string $model): self
    {
        $this->model = $model;

        // NOTE: Returning this for chaining
        return $this;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        // NOTE: Returning this for chaining
        return $this;
    }

    public function dump(): void
    {
        var_dump($this->make, $this->model, $this->color);
    }
}

$car = (new Car())
  ->setColor('pink')
  ->setMake('Ford')
  ->setModel('F-150')
  ->dump();
```

good

```
class Car
{
    private $make = 'Honda';
    private $model = 'Accord';
    private $color = 'white';

    public function setMake(string $make): void
    {
        $this->make = $make;
    }

    public function setModel(string $model): void
    {
        $this->model = $model;
    }

    public function setColor(string $color): void
    {
        $this->color = $color;
    }

    public function dump(): void
    {
        var_dump($this->make, $this->model, $this->color);
    }
}

$car = new Car();
$car->setColor('pink');
$car->setMake('Ford');
$car->setModel('F-150');
$car->dump();
```

#### 鼓励使用final关键字
final关键字使用场景：

- 1、防止不受控制的继承链
- 2、鼓励组合
- 3、鼓励单一职责模式
- 4、鼓励开发者使用public方法代替继承类方式访问protected方法
- 5、在不破坏应用流程下修改代码

但final的使用，要求实现一个接口，且没有public的方法定义。

bad

```
final class Car
{
    private $color;
    
    public function __construct($color)
    {
        $this->color = $color;
    }
    
    /**
     * @return string The color of the vehicle
     */
    public function getColor() 
    {
        return $this->color;
    }
}
```

good

```
interface Vehicle
{
    /**
     * @return string The color of the vehicle
     */
    public function getColor();
}

final class Car implements Vehicle
{
    private $color;
    
    public function __construct($color)
    {
        $this->color = $color;
    }
    
    /**
     * {@inheritdoc}
     */
    public function getColor() 
    {
        return $this->color;
    }
}
```

---
### 面向对象编程设计5个原则（SOLID）

SOLID是面向对象编程和设计的5个基本原则：
- S:单一职责原则 Single Responsibility Principle (SRP)
- O:开放/封闭原则 Open/Closed Principle (OCP)
- L:里氏替换原则 Liskov Substitution Principle (LSP)
- I:接口隔离原则 Interface Segregation Principle (ISP)
- D:依赖倒置原则 Dependency Inversion Principle (DIP)

#### 单一职责原则 （SRP）
一个类塞进所有功能函数，可能看起来多大全，像一个百宝箱，也意味着箱子会有各种原因要求调整修改，而尽量不修改类是很重要的，因为类中有很多功能，修改了其中的一部分，很容易影响到代码库中的其他依赖模块。

<font color=blue>**一个类应该仅有一个引起它变化的原因(最简单，最容易理解却最不容易做到的一个设计原则)**</font>

bad
```
class UserSettings
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function changeSettings(array $settings): void
    {
        if ($this->verifyCredentials()) {
            // ...
        }
    }

    private function verifyCredentials(): bool
    {
        // ...
    }
}
```

good

```
class UserAuth 
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
    
    public function verifyCredentials(): bool
    {
        // ...
    }
}

class UserSettings 
{
    private $user;
    private $auth;

    public function __construct(User $user) 
    {
        $this->user = $user;
        $this->auth = new UserAuth($user);
    }

    public function changeSettings(array $settings): void
    {
        if ($this->auth->verifyCredentials()) {
            // ...
        }
    }
}
```
再举个职员类例子：

比如在员工类里，将产品、设计、开发、测试等这些岗位员工都放在员工类里考虑，其结果必然是大融合导致混乱，在这个假设下，员工类里的每个方法都要if else判断是哪种岗位，从类结构上来说将会很臃肿，并且上述多种的员工类型，不论哪一种发生需求变化，都会改变员工类，这个是我们所不愿意看到的。

#### 开放/封闭原则（OCP）

正如Bertrand Meyer表述的：应用实体（类、模块、函数等）对扩展要开放，对修改要封闭。

<font color=blue>**我们要允许访问者在不修改已存在代码的情况下添加新的方法实体。**</font>

not good

```
abstract class Adapter
{
    protected $name;

    public function getName(): string
    {
        return $this->name;
    }
}

class AjaxAdapter extends Adapter
{
    public function __construct()
    {
        parent::__construct();

        $this->name = 'ajaxAdapter';
    }
}

class NodeAdapter extends Adapter
{
    public function __construct()
    {
        parent::__construct();

        $this->name = 'nodeAdapter';
    }
}

class HttpRequester
{
    private $adapter;

    public function __construct(Adapter $adapter)
    {
        $this->adapter = $adapter;
    }

    public function fetch(string $url): Promise
    {
        $adapterName = $this->adapter->getName();

        if ($adapterName === 'ajaxAdapter') {
            return $this->makeAjaxCall($url);
        } elseif ($adapterName === 'httpNodeAdapter') {
            return $this->makeHttpCall($url);
        }
    }

    private function makeAjaxCall(string $url): Promise
    {
        // request and return promise
    }

    private function makeHttpCall(string $url): Promise
    {
        // request and return promise
    }
}
```

good

一般情况下，同类型实体的相同方法有不同的业务逻辑时，其中的if else 或者是switch的类型判断都可以尝试考虑使用多态来实现。ajaxAdapter的调整不会影响nodeAdapter的正常使用。

```
interface Adapter
{
    public function request(string $url): Promise;
}

class AjaxAdapter implements Adapter
{
    public function request(string $url): Promise
    {
        // request and return promise
    }
}

class NodeAdapter implements Adapter
{
    public function request(string $url): Promise
    {
        // request and return promise
    }
}

class HttpRequester
{
    private $adapter;

    public function __construct(Adapter $adapter)
    {
        $this->adapter = $adapter;
    }

    public function fetch(string $url): Promise
    {
        return $this->adapter->request($url);
    }
}
```

#### 里氏替换原则（LSP）
比方说你有个父类和子类，而他们互换使用方法不会得到错误的结果。这里举了个正方形和矩形的例子，正方形是矩形的一种，但我们不能将其定义为继承的is-a的关系。

not good

```
class Rectangle
{
    protected $width = 0;
    protected $height = 0;

    public function setWidth(int $width): void
    {
        $this->width = $width;
    }

    public function setHeight(int $height): void
    {
        $this->height = $height;
    }

    public function getArea(): int
    {
        return $this->width * $this->height;
    }
}

class Square extends Rectangle
{
    public function setWidth(int $width): void
    {
        $this->width = $this->height = $width;
    }

    public function setHeight(int $height): void
    {
        $this->width = $this->height = $height;
    }
}

function printArea(Rectangle $rectangle): void
{
    $rectangle->setWidth(4);
    $rectangle->setHeight(5);
 
    // BAD: Will return 25 for Square. Should be 20.
    echo sprintf('%s has area %d.', get_class($rectangle), $rectangle->getArea()).PHP_EOL;
}

$rectangles = [new Rectangle(), new Square()];

foreach ($rectangles as $rectangle) {
    printArea($rectangle);
}
```

good

最好的方法是将他们分开成两个形状

```
interface Shape
{
    public function getArea(): int;
}

class Rectangle implements Shape
{
    private $width = 0;
    private $height = 0;

    public function __construct(int $width, int $height)
    {
        $this->width = $width;
        $this->height = $height;
    }

    public function getArea(): int
    {
        return $this->width * $this->height;
    }
}

class Square implements Shape
{
    private $length = 0;

    public function __construct(int $length)
    {
        $this->length = $length;
    }

    public function getArea(): int
    {
        return $this->length ** 2;
    }
}

function printArea(Shape $shape): void
{
    echo sprintf('%s has area %d.', get_class($shape), $shape->getArea()).PHP_EOL;
}

$shapes = [new Rectangle(4, 5), new Square(5)];

foreach ($shapes as $shape) {
    printArea($shape);
}
```

尽管作者建议将其分开作为has-a关系处理，可能有很多人有不同建议和意见，这个见仁见智，但<font color=blue>**里氏替换原则需要我们关注的是覆盖重写的编码方式**</font>。

#### 接口隔离原则（ISP）

实现类不应该被迫依赖他们不使用的接口。
不要求实现类设置大量选项是有益的，因为大多实现类不需要所有的设置，使它们成为可选项有助于防止出现冗余接口。

使用多个专门的接口比使用单个接口更好。

很多人在编码过程中为了减少接口的定义，将许多类似的方法都放在一个接口中，最后发现维护和实现接口的时候花了太多精力，而接口所定义的操作相当于对客户端的一种承诺，这种承诺当然是越少越好，越精炼越好，过多的承诺带来的是大量的精力和时间去维护。

not good

```
interface Employee
{
    public function work(): void;

    public function eat(): void;
}

class HumanEmployee implements Employee
{
    public function work(): void
    {
        // ....working
    }

    public function eat(): void
    {
        // ...... eating in lunch break
    }
}

class RobotEmployee implements Employee
{
    public function work(): void
    {
        //.... working much more
    }

    public function eat(): void
    {
        //.... robot并没有eat的功能，但却要实现eat的接口方法
    }
}
```

good

并不是每个worker是emplyee，但是每个employee都是worker。

```
interface Workable
{
    public function work(): void;
}

interface Feedable
{
    public function eat(): void;
}

interface Employee extends Feedable, Workable
{
}

class HumanEmployee implements Employee
{
    public function work(): void
    {
        // ....working
    }

    public function eat(): void
    {
        //.... eating in lunch break
    }
}

// robot can only work
class RobotEmployee implements Workable
{
    public function work(): void
    {
        // ....working
    }
}
```

#### 依赖倒置原则（DIP）


这条原则说明两个基本的要点：

- 高阶的模块不应该依赖低阶的模块，它们都应该依赖于抽象
- 抽象不应该依赖于实现，实现应该依赖于抽象

这条起初看起来有点晦涩难懂，但是如果你使用过PHP框架（例如Symfony），你应该见过依赖注入（DI），它是对这个概念的实现。虽然它们不是完全相等的概念，依赖倒置原则使高阶模块与低阶模块的实现细节和创建分离。可以使用依赖注入（DI）这种方式来实现它。最大的好处是它使模块之间解耦。耦合会导致你难于重构，它是一种非常糟糕的的开发模式。


not good

```
class Employee
{
    public function work(): void
    {
        // ....working
    }
}

class Robot extends Employee
{
    public function work(): void
    {
        //.... working much more
    }
}

class Manager
{
    private $employee;

    public function __construct(Employee $employee)
    {
        $this->employee = $employee;
    }

    public function manage(): void
    {
        $this->employee->work();
    }
}
```

good

```
interface Employee
{
    public function work(): void;
}

class Human implements Employee
{
    public function work(): void
    {
        // ....working
    }
}

class Robot implements Employee
{
    public function work(): void
    {
        //.... working much more
    }
}

class Manager
{
    private $employee;

    public function __construct(Employee $employee)
    {
        $this->employee = $employee;
    }

    public function manage(): void
    {
        $this->employee->work();
    }
}
```


---
### 避免重复的代码

<font color=blue>**关键词：归纳、抽象、封装**</font>

在[mysql高性能]的书里有这么一句话：快速、简单、精确三者总是难以一起满足，更多时候是满足其中两者，快速简单不精确，简单精确不快速，快速精确不简单。

所有开发者都知道，复制代码是一种糟糕的行为，复制代码通常意味着当你需要变更一些逻辑时，你需要修改不止一个地方。

不要举太多例子，有经验的开发者都理解这个想法。

通常我们复制代码应该是2个或甚至多个略微差别不同的逻辑，剩余其他大多数是一样的，所以我们想通过复制代码快速完成编码实现，这是一种对自己代码不负责任的表现（根据实际情况判断），移除重复代码就是使用一个函数、类、模块建一个能处理差异的抽象。

用对抽象非常关键，可以参考SOLID原则，不合理的抽象比复制代码更糟糕，务必谨慎考虑。

bad

```
function showDeveloperList(array $developers): void
{
    foreach ($developers as $developer) {
        $expectedSalary = $developer->calculateExpectedSalary();
        $experience = $developer->getExperience();
        $githubLink = $developer->getGithubLink();
        $data = [
            $expectedSalary,
            $experience,
            $githubLink
        ];

        render($data);
    }
}

function showManagerList(array $managers): void
{
    foreach ($managers as $manager) {
        $expectedSalary = $manager->calculateExpectedSalary();
        $experience = $manager->getExperience();
        $githubLink = $manager->getGithubLink();
        $data = [
            $expectedSalary,
            $experience,
            $githubLink
        ];

        render($data);
    }
}
```

good

```
function showList(array $employees): void
{
    foreach ($employees as $employee) {
        $expectedSalary = $employee->calculateExpectedSalary();
        $experience = $employee->getExperience();
        $githubLink = $employee->getGithubLink();
        $data = [
            $expectedSalary,
            $experience,
            $githubLink
        ];

        render($data);
    }
}
```

perfect

```
function showList(array $employees): void
{
    foreach ($employees as $employee) {
        render([
            $employee->calculateExpectedSalary(),
            $employee->getExperience(),
            $employee->getGithubLink()
        ]);
    }
}
```

参考：

[clean-code-php](https://github.com/jupeter/clean-code-php)





