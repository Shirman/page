WordPress动作钩子函数add\_action()、do\_action()源码解析
===========================================================



- [钩子概念与原理](#钩子概念与原理)
- [动作钩子使用步骤](#动作钩子使用步骤)
- [动作钩子函数详解](#动作钩子函数详解)


## 钩子概念与原理

WordPress常用两种钩子，过滤钩子和动作钩子。过滤钩子相关函数及源码分析在上篇文章中完成，本篇主要分析动作钩子源码。



然而，在了解了动作钩子的源码后你会发现，动作钩子核心代码竟然跟过滤钩子差不多！是的，至此，我不得不告诉你，动作钩子只是WP开发者为了区分概念而把过滤钩子另外命名的一种东西！当然，它们还是有一些细微的差别，下面我们将从源码来深入解读。



**动作钩子概念** ：动作钩子是WP代码执行到某处或某个事件发生时触发的一系列函数，插件可以利用动作钩子API在WP代码执行的特定点之前插入一系列函数以控制执行。它跟过滤钩子极像，**唯一不同的是过滤钩子返回一个处理后的值，而动作钩子仅完成函数执行并不返回值**，如果钩子不存在则返回NULL并新增该钩子。



**动作钩子原理** ：由于动作钩子和过滤钩子几乎一样，所以它们的实现原理也是一样的。它主要利用一个全局变量$wp\_filter，增加动作函数时使用add\_action()函数给全局变量$wp\_filter增加了一个数组元素，这个元素键名中含有钩子名，值中含有对应函数及执行优先级等信息，在调用do\_action()函数使用动作钩子时，它通过循环查找出所有跟钩子关联的函数并将其依次调用，最后返回处理后的数据。



## 动作钩子使用步骤


由于PHP代码会经过Zend等引擎翻译，代码中步骤的先后顺序并不重要，所以以下步骤仅为便于理解钩子原理的伪步骤，不具有实际参考意义！

1、**创建钩子** （可省略）：使用do\_action()函数可以创建一个没有挂载函数的钩子，挂载函数可以通过add\_action()添加，最后再使用do\_action()调用执行；

2、**创建动作函数** ：它可以有传入参数也可以无传入参数，其他与创建普通函数没有任何区别，函数的作用为完成某项动作；

3、**挂载函数** ：即使用add\_action()将函数挂载到指定钩子上；

4、**执行动作钩子** ：使用do\_action()可以依次执行挂载在指定钩子上的所有函数以完成指定任务；



## 动作钩子函数详解


在看动作钩子函数作用、参数说明等时，你会发现几乎是跟过滤钩子重复的。至于为什么会这样，那就要看源码了，我保证，看完源码后你会感慨自己被WP开发者涮了！

**1** **、add\_action($tag,$function\_to\_add,$priority = 10,$accepted\_args = 1)**

**add\_action()** **作用** ：该函数用于给指定的动作钩子$tag添加指定的挂载函数$function\_to\_add，同时它可以确定挂载函数执行优先级及其可接收参数个数；

**add\_action()** **参数说明** ：

$tag为钩子名；

$function\_to\_add为挂载函数名；

可选参数$priority为该挂载函数执行的优先级，默认为10，该数字越小则越早执行，数字相同则按其添加到钩子上的顺序执行，越早添加越早执行；

可选参数$accepted\_args确定挂载函数接收的参数个数，默认为1；

**add\_action()** **源码分析：**

 ```
function add_action($tag, $function_to_add, $priority = 10, $accepted_args = 1) {
    return add_filter($tag, $function_to_add, $priority, $accepted_args);
}

```


怎么样，看到了吧！被坑了有木有！add\_action()函数的代码竟然是调用一次add\_filter()！这尼玛完全是一个人的大名和小名的问题有木有！


**2** **、do\_action($tag, $arg = '')**

**do\_action()** **作用** ：该函数调用挂载在过滤钩子$tag上的所有函数以完全特定的任务；

**do\_action()** **参数说明：**

$tag为钩子名；

$arg为动作钩子上挂载函数的传入参数，默认为空；

**do\_action()** **源码分析：**

 ```
function do_action($tag, $arg = '') {
    global $wp_filter, $wp_actions, $merged_filters, $wp_current_filter;
    if ( ! isset($wp_actions) )
        $wp_actions = array();
# 如果$wp_actions变量未设置过，则将其定义为数组；
    if ( ! isset($wp_actions[$tag]) )
        $wp_actions[$tag] = 1;
    else
        ++$wp_actions[$tag];
    # 如果$wp_actions[$tag]未设置则将其赋值为1，否则将其值加1；
    if ( isset($wp_filter['all']) ) {
        $wp_current_filter[] = $tag;
        $all_args = func_get_args();
        _wp_call_all_hook($all_args);
    }
    # 跟apply_filters()中的all钩子处理方式完全一样！_wp_call_all_hook()源码分析见上篇文章过滤钩子源码解析；
    if ( !isset($wp_filter[$tag]) ) {
        if ( isset($wp_filter['all']) )
            array_pop($wp_current_filter);
        return;
    }
    # 当前钩子不存在，则直接返回，不再执行以后代码；
    if ( !isset($wp_filter['all']) )
        $wp_current_filter[] = $tag;
    # 将当前钩子设置为$tag；
    $args = array();
    if ( is_array($arg) && 1 == count($arg) && isset($arg[0]) && is_object($arg[0]) )
        $args[] =& $arg[0];
    else
        $args[] = $arg;
    # do_action()若有传入参数，且为一个数组，该数组仅此一个元素，该元素有值则将$args值设置为引用$arg[0]，否则直接赋值；
    for ( $a = 2; $a < func_num_args(); $a++ )
        $args[] = func_get_arg($a);
    # 通过for循环，若do_action()有不只一个传入参数，将这些值赋给数组$args；
    if ( !isset( $merged_filters[ $tag ] ) ) {
        ksort($wp_filter[$tag]);
        $merged_filters[ $tag ] = true;
    }
    # 跟apply_filter()函数排序代码完全一样！详解见上文；
    reset( $wp_filter[ $tag ] );
    do {
        foreach ( (array) current($wp_filter[$tag]) as $the_ )
            if ( !is_null($the_['function']) )
                call_user_func_array($the_['function'], array_slice($args, 0, (int) $the_['accepted_args']));
    } while ( next($wp_filter[$tag]) !== false );
    array_pop($wp_current_filter);
}
    # 除了少了一行return $value其他跟apply_filters()完全一样！

```

看过动作钩子的源码，就是过滤钩子换了个名儿而已！

<font size=2 color=grey>[阅读原文](https://www.cnblogs.com/huangcong/p/4773993.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
