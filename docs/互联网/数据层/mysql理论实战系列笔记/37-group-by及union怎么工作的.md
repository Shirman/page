<!-- TOC -->

- [union](#union)
- [union all](#union-all)
- [group by](#group-by)
- [group by 的几种优化实现](#group-by-的几种优化实现)

<!-- /TOC -->

### union 

```
(select 1000 as f) union (select id from t1 order by id desc limit 2);
```

explain 结果：

![](https://static001.geekbang.org/resource/image/40/4e/402cbdef84eef8f1b42201c6ec4bad4e.png)

可以看到：

第二行的 key=PRIMARY，说明第二个子句用到了索引 id。

第三行的 Extra 字段，表示在对子查询的结果集做 union 的时候，使用了临时表 (Using temporary)。

**union这个语句的执行流程是这样的：**

- 创建一个内存临时表，这个临时表只有一个整型字段 f，并且 f 是主键字段。

- 执行第一个子查询，得到 1000 这个值，并存入临时表中。
- 执行第二个子查询：拿到第一行 id=1000，试图插入临时表中。但由于 1000 这个值已经存在于临时表了，违反了唯一性约束，所以插入失败，然后继续执行；取到第二行 id=999，插入临时表成功。
- 从临时表中按行取出数据，返回结果，并删除临时表，结果中包含两行数据分别是 1000 和 999。

### union all

如果把上面这个语句中的 union 改成 union all 的话，就没有了“去重”的语义。这样执行的时候，就依次执行子查询，得到的结果直接作为结果集的一部分，发给客户端。因此也就不需要临时表了。

explain结果：

![](https://static001.geekbang.org/resource/image/c1/6d/c1e90d1d7417b484d566b95720fe3f6d.png)

可以看到，第二行的 Extra 字段显示的是 Using index，表示只使用了覆盖索引，没有用临时表了。




### group by

```

select id%10 as m, count(*) as c from t1 group by m;
```

这个语句的逻辑是把表 t1 里的数据，按照 id%10 进行分组统计，并按照 m 的结果排序后输出。它的 explain 结果如下：

![](https://static001.geekbang.org/resource/image/3d/98/3d1cb94589b6b3c4bb57b0bdfa385d98.png)

在 Extra 字段里面，我们可以看到三个信息：
- Using index，表示这个语句使用了覆盖索引，选择了索引 a，不需要回表；
- Using temporary，表示使用了临时表；
- Using filesort，表示需要排序。

group by语句的执行流程是这样的：
- 创建内存临时表，表里有两个字段 m 和 c，主键是 m；
- 扫描表 t1 的索引 a，依次取出叶子节点上的 id 值，计算 id%10 的结果，记为 x；
    - 如果临时表中没有主键为 x 的行，就插入一个记录 (x,1);
    - 如果表中有主键为 x 的行，就将 x 这一行的 c 值加 1；
- 遍历完成后，再根据字段 m 做排序，得到结果集返回给客户端。


### group by 的几种优化实现

- 如果对 group by 语句的结果没有排序要求，要在语句后面加 order by null；
- 尽量让 group by 过程用上表的索引，确认方法是 explain 结果里没有 Using temporary 和 Using filesort；
- 如果 group by 需要统计的数据量不大，尽量只使用内存临时表；也可以通过适当调大 tmp_table_size 参数，来避免用到磁盘临时表；
- 如果数据量实在太大，使用 SQL_BIG_RESULT 这个提示，来告诉优化器直接使用排序算法得到 group by 的结果。


原文：
https://time.geekbang.org/column/article/80477