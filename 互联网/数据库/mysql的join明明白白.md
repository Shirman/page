Mysql Join 明明白白
====================================


- [一．Join语法概述](#一．join语法概述)
- [二.Inner join](#二inner-join)
- [三.Left join](#三left-join)
- [四.Right join](#四right-join)
- [五.Cross join](#五cross-join)
- [六.Full join](#六full-join)
- [七.性能优化](#七性能优化)
    - [1.显示inner join VS 隐式inner join](#1显示inner-join-vs-隐式inner-join)
    - [2.left join/right join VS inner join](#2left-joinright-join-vs-inner-join)
        - [注意ON 子句和 WHERE 子句的不同](#注意on-子句和-where-子句的不同)
        - [尽量避免子查询，而用join](#尽量避免子查询而用join)
- [八.参考：](#八参考)

  
## 一．Join语法概述


join 用于多表中字段之间的联系，语法如下：

```
... FROM table1 INNER|LEFT|RIGHT JOIN table2 ON conditiona
```

table1:左表；table2:右表。

JOIN 按照功能大致分为如下三类：

INNER JOIN（内连接,或等值连接）：取得两个表中存在连接匹配关系的记录。

LEFT JOIN（左连接）：取得左表（table1）完全记录，即是右表（table2）并无对应匹配记录。

RIGHT JOIN（右连接）：与 LEFT JOIN 相反，取得右表（table2）完全记录，即是左表（table1）并无匹配对应记录。

注意：**mysql不支持Full join** ,不过可以通过UNION 关键字来合并 LEFT JOIN 与 RIGHT JOIN来模拟FULL join.

接下来给出一个列子用于解释下面几种分类。如下两个表(A,B)

```
mysql> select A.id,A.name,B.name from A,B where A.id=B.id;
+----+-----------+-------------+
| id | name       | name             |
+----+-----------+-------------+
|  1 | Pirate       | Rutabaga      |
|  2 | Monkey    | Pirate            |
|  3 | Ninja         | Darth Vader |
|  4 | Spaghetti  | Ninja             |
+----+-----------+-------------+
4 rows in set (0.00 sec)
```

## 二.Inner join


内连接，也叫等值连接，inner join产生同时符合A和B的一组数据。

```
mysql> select * from A inner join B on A.name = B.name;
+----+--------+----+--------+
| id | name   | id | name   |
+----+--------+----+--------+
|  1 | Pirate |  2 | Pirate |
|  3 | Ninja  |  4 | Ninja  |
+----+--------+----+--------+
```

![](https://images.cnblogs.com/cnblogs_com/BeginMan/486940/o_sql1.png)

## 三.Left join


```
mysql> select * from A left join B on A.name = B.name;
#或者：select * from A left outer join B on A.name = B.name;

+----+-----------+------+--------+
| id | name      | id   | name   |
+----+-----------+------+--------+
|  1 | Pirate    |    2 | Pirate |
|  2 | Monkey    | NULL | NULL   |
|  3 | Ninja     |    4 | Ninja  |
|  4 | Spaghetti | NULL | NULL   |
+----+-----------+------+--------+
4 rows in set (0.00 sec)
```

left join,（或**left outer join:在Mysql中两者等价，推荐使用left join.** ）左连接从左表(A)产生一套完整的记录,与匹配的记录(右表(B)) .如果没有匹配,右侧将包含null。

![](https://images.cnblogs.com/cnblogs_com/BeginMan/486940/o_sql3.png)

如果想只从左表(A)中产生一套记录，但不包含右表(B)的记录，可以通过设置where语句来执行，如下：

```
mysql> select * from A left join B on A.name=B.name where A.id is null or B.id is null;
+----+-----------+------+------+
| id | name      | id   | name |
+----+-----------+------+------+
|  2 | Monkey    | NULL | NULL |
|  4 | Spaghetti | NULL | NULL |
+----+-----------+------+------+
2 rows in set (0.00 sec)
```

![](https://images.cnblogs.com/cnblogs_com/BeginMan/486940/o_sql4.png)

同理，还可以模拟inner join. 如下：

```
mysql> select * from A left join B on A.name=B.name where A.id is not null and B.id is not null;
+----+--------+------+--------+
| id | name   | id   | name   |
+----+--------+------+--------+
|  1 | Pirate |    2 | Pirate |
|  3 | Ninja  |    4 | Ninja  |
+----+--------+------+--------+
2 rows in set (0.00 sec)
```

**求差集：**

根据上面的例子可以求差集，如下：

```
SELECT * FROM A LEFT JOIN B ON A.name = B.name
WHERE B.id IS NULL
union
SELECT * FROM A right JOIN B ON A.name = B.name
WHERE A.id IS NULL;
# 结果
    +------+-----------+------+-------------+
| id   | name      | id   | name        |
+------+-----------+------+-------------+
|    2 | Monkey    | NULL | NULL        |
|    4 | Spaghetti | NULL | NULL        |
| NULL | NULL      |    1 | Rutabaga    |
| NULL | NULL      |    3 | Darth Vader |
+------+-----------+------+-------------+
```

![](https://images.cnblogs.com/cnblogs_com/BeginMan/486940/o_sql5.png)

## 四.Right join


```
mysql> select * from A right join B on A.name = B.name;
+------+--------+----+-------------+
| id   | name   | id | name        |
+------+--------+----+-------------+
| NULL | NULL   |  1 | Rutabaga    |
|    1 | Pirate |  2 | Pirate      |
| NULL | NULL   |  3 | Darth Vader |
|    3 | Ninja  |  4 | Ninja       |
+------+--------+----+-------------+
4 rows in set (0.00 sec)
```

同left join。

## 五.Cross join


cross join：交叉连接，得到的结果是两个表的乘积，即[笛卡尔积](http://baike.baidu.com/view/348542.htm?fromtitle=%E7%AC%9B%E5%8D%A1%E5%B0%94%E7%A7%AF&fromid=1434391&type=syn)

> 笛卡尔（Descartes）乘积又叫直积。假设集合A={a,b}，集合B={0,1,2}，则两个集合的笛卡尔积为{(a,0),(a,1),(a,2),(b,0),(b,1), (b,2)}。可以扩展到多个集合的情况。类似的例子有，如果A表示某学校学生的集合，B表示该学校所有课程的集合，则A与B的笛卡尔积表示所有可能的选课情况。

```
mysql> select * from A cross join B;
+----+-----------+----+-------------+
| id | name      | id | name        |
+----+-----------+----+-------------+
|  1 | Pirate    |  1 | Rutabaga    |
|  2 | Monkey    |  1 | Rutabaga    |
|  3 | Ninja     |  1 | Rutabaga    |
|  4 | Spaghetti |  1 | Rutabaga    |
|  1 | Pirate    |  2 | Pirate      |
|  2 | Monkey    |  2 | Pirate      |
|  3 | Ninja     |  2 | Pirate      |
|  4 | Spaghetti |  2 | Pirate      |
|  1 | Pirate    |  3 | Darth Vader |
|  2 | Monkey    |  3 | Darth Vader |
|  3 | Ninja     |  3 | Darth Vader |
|  4 | Spaghetti |  3 | Darth Vader |
|  1 | Pirate    |  4 | Ninja       |
|  2 | Monkey    |  4 | Ninja       |
|  3 | Ninja     |  4 | Ninja       |
|  4 | Spaghetti |  4 | Ninja       |
+----+-----------+----+-------------+
16 rows in set (0.00 sec)

#再执行：mysql> select * from A inner join B; 试一试

#在执行mysql> select * from A cross join B on A.name = B.name; 试一试
```

实际上，**在 MySQL 中（仅限于 MySQL） CROSS JOIN 与 INNER JOIN 的表现是一样的** ，在不指定 ON 条件得到的结果都是笛卡尔积，反之取得两个表完全匹配的结果。  
INNER JOIN 与 CROSS JOIN 可以省略 INNER 或 CROSS 关键字，因此下面的 SQL 效果是一样的：

```
... FROM table1 INNER JOIN table2
... FROM table1 CROSS JOIN table2
... FROM table1 JOIN table2
```

## 六.Full join


```
mysql> select * from A left join B on B.name = A.name 
    -> union 
    -> select * from A right join B on B.name = A.name;
+------+-----------+------+-------------+
| id   | name      | id   | name        |
+------+-----------+------+-------------+
|    1 | Pirate    |    2 | Pirate      |
|    2 | Monkey    | NULL | NULL        |
|    3 | Ninja     |    4 | Ninja       |
|    4 | Spaghetti | NULL | NULL        |
| NULL | NULL      |    1 | Rutabaga    |
| NULL | NULL      |    3 | Darth Vader |
+------+-----------+------+-------------+
6 rows in set (0.00 sec)
```

全连接产生的所有记录（双方匹配记录）在表A和表B。如果没有匹配,则对面将包含null。

![](https://images.cnblogs.com/cnblogs_com/BeginMan/486940/o_sql2.png)

## 七.性能优化


### 1.显示inner join VS 隐式inner join

如：

```
select * from
table a inner join table b
on a.id = b.id;
```

VS

```
select a.*, b.*
from table a, table b
where a.id = b.id;
```

在数据库中比较(10w数据)得之，它们用时几乎相同，第一个是显示的inner join，后一个是隐式的inner join。

[**参照:Explicit vs implicit SQL joins** ](http://stackoverflow.com/questions/44917/explicit-vs-implicit-sql-joins)

### 2.left join/right join VS inner join

尽量用inner join，避免 LEFT JOIN 和 NULL。

在使用left join（或right join）时，应该清楚的知道以下几点：

#### 注意ON 子句和 WHERE 子句的不同

可参考[sql语句中join on和where用法的区别和联系](https://my.oschina.net/jun24bryant/blog/787375)

如举一个列子：

```
mysql> SELECT * FROM product LEFT JOIN product_details
       ON (product.id = product_details.id)
       AND product_details.id=2;
+----+--------+------+--------+-------+
| id | amount | id   | weight | exist |
+----+--------+------+--------+-------+
|  1 |    100 | NULL |   NULL |  NULL |
|  2 |    200 |    2 |     22 |     0 |
|  3 |    300 | NULL |   NULL |  NULL |
|  4 |    400 | NULL |   NULL |  NULL |
+----+--------+------+--------+-------+
4 rows in set (0.00 sec)
 
mysql> SELECT * FROM product LEFT JOIN product_details
       ON (product.id = product_details.id)
       WHERE product_details.id=2;
+----+--------+----+--------+-------+
| id | amount | id | weight | exist |
+----+--------+----+--------+-------+
|  2 |    200 |  2 |     22 |     0 |
+----+--------+----+--------+-------+
1 row in set (0.01 sec)
```

> 从上可知，第一条查询使用 ON 条件决定了从 LEFT JOIN的 product\_details表中检索符合的所有数据行。第二条查询做了简单的LEFT JOIN，然后使用 WHERE 子句从 LEFT JOIN的数据中过滤掉不符合条件的数据行。

#### 尽量避免子查询，而用join

往往性能这玩意儿，更多时候体现在数据量比较大的时候，此时，我们应该避免复杂的子查询。如下：

PASS

```
insert into t1(a1) select b1 from t2 where not exists(select 1 from t1 where t1.id = t2.r_id); 
```

Great

```
insert into t1(a1)  
select b1 from t2  
left join (select distinct t1.id from t1 ) t1 on t1.id = t2.r_id   
where t1.id is null;  
```

这个可以参考[mysql的exists与inner join 和 not exists与 left join 性能差别惊人](http://openxtiger.iteye.com/blog/1911228)



## 八.参考：


[**A Visual Explanation of SQL Joins** ](http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/)

[**五种提高 SQL 性能的方法** ](https://www.microsoft.com/china/MSDN/library/data/sqlserver/FiveWaystoRevupYourSQLPerformanCE.mspx?mfr=true)

[**关于 MySQL LEFT JOIN 你可能需要了解的三点** ](http://www.oschina.net/question/89964_65912)

<font size=2 color=grey>[阅读原文](https://www.cnblogs.com/BeginMan/p/3754322.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
