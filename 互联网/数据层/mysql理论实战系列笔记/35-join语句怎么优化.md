

主要介绍Multi-Range Read 优化 (MRR)。这个优化的主要目的是尽量使用顺序读盘。

- BKA 优化是 MySQL 已经内置支持的，建议你默认使用；
- BNL 算法效率低，建议你都尽量转成 BKA 算法。优化的方向就是给被驱动表的关联字段加上索引；
- 基于临时表的改进方案，对于能够提前过滤出小数据的 join 语句来说，效果还是很好的；
- MySQL 目前的版本还不支持 hash join，但你可以配合应用端自己模拟出来，理论上效果要好于临时表的方案。

原文：https://time.geekbang.org/column/article/80147

