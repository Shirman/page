<!-- TOC -->

- [Q1第一个问题关于弱类型](#q1第一个问题关于弱类型)
- [Q2下面的输出结果会是怎样?](#q2下面的输出结果会是怎样)
- [Q3关于变量的引用](#q3关于变量的引用)
- [Q4下面是true还是false](#q4下面是true还是false)
- [Q5下面的代码有什么问题吗?输出会是什么，怎样修复它](#q5下面的代码有什么问题吗输出会是什么怎样修复它)
- [Q6$x应该是输出什么?](#q6x应该是输出什么)
- [Q7经过下面的运算 $x的值应该是多少?](#q7经过下面的运算-x的值应该是多少)
- [Q8运行下面的代码，$text 的值是多少?strlen($text)又会返回什么结果?](#q8运行下面的代码text-的值是多少strlentext又会返回什么结果)
- [Q9下面的输出结果会是什么](#q9下面的输出结果会是什么)
- [Q10执行下面代码$x会变成什么值呢?](#q10执行下面代码x会变成什么值呢)

<!-- /TOC -->

> 文章所罗列的问题虽然看似简单，但是每个背后都涵盖了一个或几个大家容易忽视的基础知识点，希望能够帮助到你的面试和平时工作。



### Q1第一个问题关于弱类型 ###

	$str1 = 'yabadabadoo';
	$str2 = 'yaba';
	if (strpos($str1,$str2)) {  
	    echo "/"" . $str1 . "/" contains /"" . $str2 . "/"";
	} else {
	    echo "/"" . $str1 . "/" does not contain /"" . $str2 . "/"";
	}
正确运行的输出结果:

	"yabadabadoo" does not contain "yaba"
strpos是返回字符串str2在str1的位置，没有找到则返回false然而实际上这次返回了0而在if语句中0也被当作false,所以我们需要对false做类型判断，正确的代码如下:

	$str1 = 'yabadabadoo';
	$str2 = 'yaba';
	if (strpos($str1,$str2) !== false) {  
	    echo "/"" . $str1 . "/" contains /"" . $str2 . "/"";
	} else {
	    echo "/"" . $str1 . "/" does not contain /"" . $str2 . "/"";
	}
需要注意的是我们使用了!==，在php 和 JS中= !相对== 更为严格需要要求数据类型一致。

### Q2下面的输出结果会是怎样? ###

	$x = 5;
	echo $x;  
	echo "<br />";  
	echo $x+++$x++;  
	echo "<br />";  
	echo $x;  
	echo "<br />";  
	echo $x---$x--;  
	echo "<br />";  
	echo $x;
实际运行结果是
	
	5
	11
	7
	1
	5
关于 $x++ 和 $x–这个问题其实非常容易遇见，我们只需记住$x++使用最近的值，然后才自增。

运算符的优先级，++ 是明显高于 +，因此先执行++ 再执行 + 。关于运算符的优先级，有的时候我们真的可以通过括号来让我们的程序更让人直观的了解，毕竟代码不光是用于执行的，有的时候或许团队的可读性也是提高效率的一种。

### Q3关于变量的引用 ###

	$a = '1';
	$b = &$a;
	$b = "2$b";
请问 $a 和 $b的值各位多少

部分第一时间会想到 $a=’1′ $b=’21′,仔细一看 $b=&$a,这里$b是变量$a的引用而不是直接 赋值。

### Q4下面是true还是false ###

	var_dump(0123 == 123);
	var_dump('0123' == 123);
	var_dump('0123' === 123);
	var_dump(0123 == 123);// false,PHP会默认把0123当作8进制来处理，实际转化为10进制就是83，显然这不是相等的。

	var_dump(’0123′ == 123);// true这里php会非常有趣的将’0123′转换成一个数字而且默认去掉了前面的0也就是123==123

	var_dump(’0123′ === 123);// false很显然上面的问题已经说过了数字和字符串类型不一致。

### Q5下面的代码有什么问题吗?输出会是什么，怎样修复它 ###

	$referenceTable = array();
	$referenceTable['val1'] = array(1, 2);
	$referenceTable['val2'] = 3;
	$referenceTable['val3'] = array(4, 5);
	 
	$testArray = array();
	 
	$testArray = array_merge($testArray, $referenceTable['val1']);
	var_dump($testArray);  
	$testArray = array_merge($testArray, $referenceTable['val2']);
	var_dump($testArray);  
	$testArray = array_merge($testArray, $referenceTable['val3']);
	var_dump($testArray);
实际输出如下：

	array(2) { [0]=> int(1) [1]=> int(2) }
	NULL
	NULL
运行的时候你或许还能看到下面的警告

	Warning: array_merge(): Argument #2 is not an array
	Warning: array_merge(): Argument #1 is not an array
array_merge需要传入的参数都是数组，如果不是，则会返回null。 你可以这样修改

	$testArray = array_merge($testArray, (array)$referenceTable['val1']);
	var_dump($testArray);
	$testArray = array_merge($testArray, (array)$referenceTable['val2']);
	var_dump($testArray);
	$testArray = array_merge($testArray, (array)$referenceTable['val3']);
	var_dump($testArray);
### Q6$x应该是输出什么? ###

	$x = true and false;
	var_dump($x);
部分同学或许会第一时间想到false,实际上这里依旧是强调运算符的优先级，= 会比 and级别高点，因此等同下面的代码

	$x = true;
	true and false
答案显而易见。

### Q7经过下面的运算 $x的值应该是多少? ###

	$x = 3 + "15%" + "$25"
答案是18，PHP是会根据上下文实现类型的自动转换

上面的代码我们可以这样理解，如果我们在与字符串进行数学运算，实际php会尽可能将字符串中的数组进行转换，如果是数字开头的话则转换成改数字比如”15%”会变成15,如果不是数字开头则会变成0; 上面的运算类似下面 ：

	$x = 3 + 15 + 0
### Q8运行下面的代码，$text 的值是多少?strlen($text)又会返回什么结果? ###

	$text = 'John ';
	$text[10] = 'Doe';
上面代码执行完毕后 $text = “John D”(John后面会有连续的5个空格) strlen($text)会返回11

$text[10] = “Doe”给某个字符串具体的某个位置具体字符时候，实际只会把D赋给$text. 虽然$text才开始只有5个自负长度，但是php会默认填充空格。这和别的语言有些差别。

### Q9下面的输出结果会是什么 ###

	$v = 1;
	$m = 2;
	$l = 3;
	 
	if( $l > $m > $v){  
	    echo "yes";
	}else{
	    echo "no";
	}
实际的输出是”no”,只要仔细分析就不难得出

$l>$m 会转换成1 ，则这个时候再和$m比较。

### Q10执行下面代码$x会变成什么值呢? ###

	$x = NULL;
	 
	if ('0xFF' == 255) {  
	    $x = (int)'0xFF';
	}
实际的运行结果是$x=0而不是255.

首先’oxFF’ == 255我们好判断，会进行转换将16进制数字转换成10进制数字，0xff -> 255.

PHP使用is_numeric_string 判断字符串是否包含十六进制数字然后进行转换。

但是$x = (int)’0xFF’;是否也会变成255呢?显然不是，将一个字符串进行强制类型转换实际上用的是convert_to_long,它实际上是将字符串从左向右进行转换，遇到非数字字符则停止。因此0xFF到x就停止了。所以$x=0

----------
