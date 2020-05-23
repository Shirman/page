

<!-- TOC -->

- [关联数组](#关联数组)
    - [1、添加数组元素](#1添加数组元素)
    - [2、删除数组元素](#2删除数组元素)
    - [3、交换键和值](#3交换键和值)
    - [4、合并数组](#4合并数组)
    - [5、编辑数组值](#5编辑数组值)
    - [6、按键对数组排序](#6按键对数组排序)
    - [7、随机数组排序](#7随机数组排序)
    - [8、确定键和值是否存在](#8确定键和值是否存在)
    - [9、搜索数组](#9搜索数组)
    - [10、标准PHP库](#10标准php库)

<!-- /TOC -->



>在使用 PHP 进行开发的过程中，或早或晚，您会需要创建许多相似的变量，这时候你可以把数据作为元素存储在数组中。数组中的元素都有自己的 ID，因此可以方便地访问它们。

### 关联数组 ###

关联数组，它的每个 ID 键都关联一个值。在存储有关具体命名的值的数据时，使用数值数组不是最好的做法。通过关联数组，我们可以把值作为键，并向它们赋值。

这里介绍10个操作PHP关联数组的技巧，熟练运用能帮助你提高开发效率。

#### 1、添加数组元素 ####

PHP是一种弱类型语言，这意味着你不需要显示声明一个数组及其大小，相反，你可以同时声明并填充数组。

    $capitals = array(
	    'Alabama' => 'Montgomery',
	    'Alaska' => 'Juneau',
	    'Arizona' => 'Phoenix'
    );

额外的数组元素可以象下面这样追加：

    $capitals['Arkansas'] = 'Little Rock';
如果你正在处理数字索引数组，你可能想使用显示命名的函数前置和追加元素，如array_push()和array_unshift()函数，但这些函数不能操作关联数组。

#### 2、删除数组元素 ####

如果要从数组中删除一个元素，请使用unset()函数，如：

    unset($capitals['California']);
使用数字索引数组时，删除数组元素的办法更多，更灵活，可以使用array_shift()和array_pop()函数分别从数组的开头和末尾删除一个元素。

#### 3、交换键和值 ####

假设你想创建一个名叫$states的新数组，使用州府作为索引，使用州名作为关联值，使用array_flip()函数很容易完成这个任务。

    $capitals = array(
	    'Alabama' => 'Montgomery',
	    'Alaska' => 'Juneau',
	    'Arizona' => 'Phoenix'
    );
    $states = array_flip($capitals);
    // $states = array(
    // 'Montgomery' => string 'Alabama',
    // 'Juneau' => string 'Alaska',
    // 'Phoenix' => string 'Arizona'
    // );

#### 4、合并数组 ####

假设前面的数组由一个基于Web的“FlashCard”服务使用，你想提供一种方法测试学生对美国各州首府的掌握情况，你可以使用array_merge()函数合并包含州和首府的数组。

    $stateCapitals = array(
	    'Alabama' => 'Montgomery',
	    'Alaska' => 'Juneau',
	    'Arizona' => 'Phoenix'
    );
    $countryCapitals = array (
	    'Australia' => 'Canberra',
	    'Austria' => 'Vienna',
	    'Algeria' => 'Algiers'
    );
    $capitals = array_merge($stateCapitals, $countryCapitals);

#### 5、编辑数组值 ####

假设在数组中的数据包含大小写错误，在插入到数据库之前，你想纠正这些错误，你可以使用array_map()函数给每个数组元素应用一个回调。

    function capitalize($element)
    {
    	$element = strtolower($element);
    	return ucwords($element);
    }
    $capitals = array(
	    'Alabama' => 'montGoMEry',
	    'Alaska' => 'Juneau',
	    'Arizona' => 'phoeniX'
    );
    $capitals = array_map("capitalize", $capitals);
#### 6、按键对数组排序 ####

FlashCard程序常常使用各种排序，如按字母顺序排序，你可以使用ksort()函数按键对关联数组进行排序。

    $capitals = array(
	    'Arizona' => 'Phoenix',
	    'Alaska' => 'Juneau',
	    'Alabama' => 'Montgomery'
    );
    ksort($capitals);
因为数组是通过参数传递给ksort()函数的，意味着你不再需要将排序结果分配给另一个变量。

#### 7、随机数组排序 ####

在FlashCard程序中还涉及到另一种随机排序技术，这时你要使用shuffle()函数实现数组项目的随机排序。

	$capitals = array(
		'Arizona' => 'Phoenix',
		'Alaska' => 'Juneau',
		'Alabama' => 'Montgomery'
	);
shuffle($capitals);
如果不需要打乱数组顺序，你只是想随机选择一个值，那么使用array_rand()函数即可。

#### 8、确定键和值是否存在 ####

你可以使用in_array()函数确定一个数组元素是否存在。

	$capitals = array(
		'Arizona' => 'Phoenix',
		'Alaska' => 'Juneau',
		'Alabama' => 'Montgomery'
	);
	if (in_array("Juneau", $capitals))
	{
		echo "Exists!";
	} else {
		echo "Does not exist!";
	}
很少有人知道这个函数也可以确定一个数组键是否存在，在这一点上，它和array_key_exists()函数的功能一样。

	$capitals = array(
		'Arizona' => 'Phoenix',
		'Alaska' => 'Juneau',
		'Alabama' => 'Montgomery'
	);
	if (array_key_exists("Alaska", $capitals))
	{
		echo "Key exists!";
	} else {
		echo "Key does not exist!";
	}

#### 9、搜索数组 ####

你可能想搜索数组资源，这样用户就可以方便地用一个特定的州府检索关联的州，可以通过array_search()函数实现数组搜索。

	$capitals = array(
		'Arizona' => 'Phoenix',
		'Alaska' => 'Juneau',
		'Alabama' => 'Montgomery'
	);
	$state = array_search('Juneau', $capitals);
	// $state = 'Alaska'
#### 10、标准PHP库 ####

标准PHP库(Standard PHP Library，SPL)为开发人员提供了许多数据结构，迭代器，接口，异常和其它以前PHP语言没有的功能，使用这些功能可以通过面向对象的语法遍历数组。
	
	$capitals = array(
		'Arizona' => 'Phoenix',
		'Alaska' => 'Juneau',
		'Alabama' => 'Montgomery'
	);
	$arrayObject = new ArrayObject($capitals);
	foreach ($arrayObject as $state => $capital)
	{
		printf("The capital of %s is %s", $state, $capital);
	}
	// The capital of Arizona is Phoenix
	// The capital of Alaska is Juneau
	// The capital of Alabama is Montgomery


----------
@tsingchan
