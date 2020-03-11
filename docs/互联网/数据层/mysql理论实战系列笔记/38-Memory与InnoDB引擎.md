

### 表组织结构

- InnoDB 引擎把数据放在主键索引上，其他索引上保存的是主键 id。这种方式，我们称之为索引组织表（Index Organizied Table）。
- 而 Memory 引擎采用的是把数据单独存放，索引上保存数据位置的数据组织形式，我们称之为堆组织表（Heap Organizied Table）。


### 不建议使用内存表

不建议在生产环境上使用内存表。两个方面原因：

- 锁粒度问题
- 数据持久化问题


原文：
https://time.geekbang.org/column/article/80495