### PHP中判断变量为空的五种方法

#### 目录


- [PHP中判断变量为空的五种方法](#php中判断变量为空的五种方法)
    
    - [1.isset功能：判断变量是否被初始化](#1isset功能判断变量是否被初始化)
    - [2. empty功能：检测变量是否为”空”](#2-empty功能检测变量是否为空)
    - [3. var == null功能：判断变量是否为”空”](#3-var--null功能判断变量是否为空)
    - [4. is_null功能：检测变量是否为”null”](#4-is_null功能检测变量是否为null)
    - [5. var === null功能：检测变量是否为”null”，同时变量的类型也必须是”null”](#5-var--null功能检测变量是否为null同时变量的类型也必须是null)
    - [总结：](#总结)



> 判断变量为空，在许多场合都会用到，但也有很多新手仍会弄错。这里整理了5个判断变量为空的方法，大家可以根据实际情况选择使用。

#### 1.isset功能：判断变量是否被初始化 ####

说明：它并不会判断变量是否为空，并且可以用来判断数组中元素是否被定义过

**注意：当使用isset来判断数组元素是否被初始化过时，它的效率比array_key_exists高4倍左右**


    <?php
    $a = '';
    $a['c'] = '';
    if (!isset($a)) echo '$a 未被初始化' . "";
    if (!isset($b)) echo '$b 未被初始化' . "";
    if (isset($a['c'])) echo '$a 已经被初始化' . "";
    // 显示结果为
    // $b 未被初始化
    // $a 已经被初始化

#### 2. empty功能：检测变量是否为”空” ####

说明：任何一个未初始化的变量、值为 0 或 false 或 空字符串”” 或 null的变量、空数组、没有任何属性的对象，都将判断为empty==true

**注意1：未初始化的变量也能被empty检测为”空”**

**注意2：empty只能检测变量，而不能检测语句**

    <?php
    $a = 0;
    $b = '';
    $c = array();
    if (empty($a)) echo '$a 为空' . "";
    if (empty($b)) echo '$b 为空' . "";
    if (empty($c)) echo '$c 为空' . "";
    if (empty($d)) echo '$d 为空' . "";

#### 3. var == null功能：判断变量是否为”空” ####

说明：值为 0 或 false 或 空字符串”” 或 null的变量、空数组、都将判断为 null

**注意：与empty的显著不同就是：变量未初始化时 var == null 将会报错。**


    <?php
    $a = 0;
    $b = array();
    if ($a == null) echo '$a 为空' . "";
    if ($b == null) echo '$b 为空' . "";
    if ($c == null) echo '$b 为空' . "";
    // 显示结果为
    // $a 为空
    // $b 为空
    // Undefined variable: c

#### 4. is_null功能：检测变量是否为”null” ####

说明：当变量被赋值为”null”时，检测结果为true

**注意1：null不区分大小写：$a = null; $a = NULL 没有任何区别**

**注意2：仅在变量的值为”null”时，检测结果才为true，0、空字符串、false、空数组都检测为false**

**注意3：变量未初始化时，程序将会报错**

    $a = null;
    $b = false;
    if (is_null($a)) echo '$a 为NULL' . "";
    if (is_null($b)) echo '$b 为NULL' . "";
    if (is_null($c)) echo '$c 为NULL' . "";
    // 显示结果为
    // $a 为NULL
    // Undefined variable: c

#### 5. var === null功能：检测变量是否为”null”，同时变量的类型也必须是”null” ####

说明：当变量被赋值为”null”时，同时变量的类型也是”null”时，检测结果为true

**注意1：在判断为”null”上，全等于和is_null的作用相同**

**注意2：变量未初始化时，程序将会报错**

#### 总结： ####

PHP中，”NULL” 和 “空” 是2个概念。

isset 主要用来判断变量是否被初始化过

empty 可以将值为 “假”、”空”、”0″、”NULL”、”未初始化” 的变量都判断为TRUE

is_null 仅把值为 “NULL” 的变量判断为TRUE

var == null 把值为 “假”、”空”、”0″、”NULL” 的变量都判断为TRUE

var === null 仅把值为 “NULL” 的变量判断为TRUE

**注意：在判断一个变量是否真正为”NULL”时，大多使用 is_null，从而避免”false”、”0″等值的干扰。**

----
@tsingchan
