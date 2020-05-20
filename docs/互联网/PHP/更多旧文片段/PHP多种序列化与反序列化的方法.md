<!-- TOC -->

- [1. serialize和unserialize函数](#1-serialize和unserialize函数)
- [2. json_encode 和 json_decode](#2-json_encode-和-json_decode)
- [小结](#小结)

<!-- /TOC -->

> 序列化是将变量转换为可保存或传输的字符串的过程;反序列化就是在适当的时候把这个字符串再转化成原来的变量使用。这两个过程结合起来，可以轻松地存储和传输数据，使程序更具维护性。

#### 1. serialize和unserialize函数 ####

这两个是序列化和反序列化PHP中数据的常用函数。

    $a = array('a' => 'Apple' ,'b' => 'banana' , 'c' => 'Coconut');
    //序列化数组
    $s = serialize($a);
    echo $s;
    //输出结果：a:3:{s:1:"a";s:5:"Apple";s:1:"b";s:6:"banana";s:1:"c";s:7:"Coconut";}
    echo '';
    //反序列化
    $o = unserialize($s);
    print_r($o);
    //输出结果 Array ( [a] => Apple [b] => banana [c] => Coconut )
    
    //当数组值包含如双引号、单引号或冒号等字符时，它们被反序列化后，可能会出现问题。
	//为了克服这个问题，一个巧妙的技巧是使用base64_encode和base64_decode。
    $obj = array();
    //序列化
    $s = base64_encode(serialize($obj));
    //反序列化
    $original = unserialize(base64_decode($s));

但是base64编码将增加字符串的长度。为了克服这个问题，可以和gzcompress一起使用。


    //定义一个用来序列化对象的函数
    function my_serialize( $obj )
    {
    return base64_encode(gzcompress(serialize($obj)));
    }
    //反序列化
    function my_unserialize($txt)
    {
    return unserialize(gzuncompress(base64_decode($txt)));
    }

#### 2. json_encode 和 json_decode ####

使用JSON格式序列化和反序列化是一个不错的选择：

使用json_encode和json_decode格式输出要serialize和unserialize格式快得多。

JSON格式是可读的。

JSON格式比serialize返回数据结果小。

JSON格式是开放的、可移植的。其他语言也可以使用它。


    $a = array('a' => 'Apple' ,'b' => 'banana' , 'c' => 'Coconut');
    //序列化数组
    $s = json_encode($a);
    echo $s;
    //输出结果：{"a":"Apple","b":"banana","c":"Coconut"}
    echo '';
    //反序列化
    $o = json_decode($s);
    在上面的例子中，json_encode输出长度比上个例子中serialize输出长度显然要短。
    3. var_export 和 eval
    var_export 函数把变量作为一个字符串输出;
	eval把字符串当成PHP代码来执行，反序列化得到最初变量的内容。
    $a = array('a' => 'Apple' ,'b' => 'banana' , 'c' => 
    'Coconut');
    //序列化数组
    $s = var_export($a , true);
    echo $s;
    //输出结果： array ( 'a' => 'Apple', 'b' => 'banana', 'c' => 'Coconut', )
    echo '';
    //反序列化
    eval('$my_var=' . $s . ';');
    print_r($my_var);
    4. wddx_serialize_value 和 wddx deserialize
    wddx_serialize_value函数可以序列化数组变量，并以XML字符串形式输出。
    $a = array('a' => 'Apple' ,'b' => 'banana' , 'c' => 'Coconut');
    //序列化数组
    $s = wddx_serialize_value($a);
    echo $s;
    //输出结果(查看输出字符串的源码)：
    ApplebananaCoconutecho '';//反序列化$o = wddx_deserialize($s);print_r($o);
	//输出结果：Array ( [a] => Apple [b] => banana 1 => Coconut )

可以看出，XML标签字符较多，导致这种格式的序列化还是占了很多空间。

#### 小结 ####

上述所有的函数在序列化数组变量时都能正常执行，但运用到对象就不同了。例如json_encode序列化对象就会失败。反序列化对象时，unserialize和eval将有不同的效果。