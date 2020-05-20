
<!-- TOC -->

- [通过索引优化来实现MySQL的ORDER BY语句优化](#通过索引优化来实现mysql的order-by语句优化)
- [MySQL Order By不能使用索引来优化排序的情况](#mysql-order-by不能使用索引来优化排序的情况)
- [特别提示](#特别提示)

<!-- /TOC -->


### 通过索引优化来实现MySQL的ORDER BY语句优化


1、ORDER BY的索引优化。如果一个SQL语句形如：

    SELECT [column1],[column2],…. FROM [TABLE] ORDER BY [sort];

在[sort]这个栏位上建立索引就可以实现利用索引进行order by 优化。


2、WHERE + ORDER BY的索引优化，形如：

    SELECT [column1],[column2],…. FROM [TABLE] WHERE [columnX] = [value] ORDER BY [sort];

建立一个联合索引(columnX,sort)来实现order by 优化。


注意：如果columnX对应多个值，如下面语句就无法利用索引来实现order by的优化

    SELECT [column1],[column2],…. FROM [TABLE] WHERE [columnX] IN ([value1],[value2],…) ORDER BY[sort];


3、WHERE+ 多个字段ORDER BY

    SELECT * FROM [table] WHERE uid=1 ORDER x,y LIMIT 0,10;

建立索引(uid,x,y)实现order by的优化，比建立(x,y,uid)索引效果要好得多。


### MySQL Order By不能使用索引来优化排序的情况

1、对不同的索引键做 ORDER BY ：(key1,key2分别建立索引)

    SELECT * FROM t1 ORDER BY key1, key2;


2、在非连续的索引键部分上做 ORDER BY：(key_part1,key_part2建立联合索引;key2建立索引)

*涉及最左前缀原则，但在5.6之后的版本不会受到最左前缀的影响。*

    SELECT * FROM t1 WHERE key2=constant ORDER BY key_part2;


3、同时使用了 ASC 和 DESC：(key_part1,key_part2建立联合索引)

    SELECT * FROM t1 ORDER BY key_part1 DESC, key_part2 ASC;


4、用于搜索记录的索引键和做 ORDER BY 的不是同一个：(key1,key2分别建立索引)

*需要建立联合索引才有效果，参考以上可用索引优化order by第二个范例*

    SELECT * FROM t1 WHERE key2=constant ORDER BY key1;


5、如果在WHERE和ORDER BY的栏位上应用**表达式(函数)**时，则无法利用索引来实现order by的优化

    SELECT * FROM t1 ORDER BY YEAR(logindate) LIMIT 0,10;


### 特别提示

> **mysql一次查询只能使用一个索引。如果要对多个字段使用索引，建立联合索引。**

> 在ORDER BY操作中，MySQL只有在排序条件不是一个查询条件**表达式**的情况下才使用索引。




