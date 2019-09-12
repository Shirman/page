


### 1、推荐文章与标签关系联表查询优化

目的查询带有指定标签的所有文章信息

#### sql写法1

```
SELECT DISTINCT  qa.id as id,`title`,`banner`,`stime`,`etime`,`status`,`desc` FROM qu_article qa JOIN qu_article_tag as qat ON qa.id=qat.a_id  and qat.tag_id in(1057,1051,1044,1043,1035,1034,1015,1014,1006,999,988,983,980,975,974,973,968,964,946,944,938,936,913,894,874,867,860,859,851,831,829,822,813,767,760,751,748,723,720,719,715,714,702,629,624,622,620,618,610,598,593,580,561,558,552,537,536,531,521,516,513,512,505,494,488,487,483,453,449,447,435,433,429,428,416,411,403,402,392,383,381,374,368)  ORDER BY qa.order_num desc LIMIT 10,10

#执行：3.096s

#Explain分析结果：

id	select_type	table	type	possible_keys	key	key_len	ref	rows	Extra
1	SIMPLE	hat	range	idx_article_id,idx_tag_id	idx_tag_id	4	\N	31112	Using where; Using temporary; Using filesort
1	SIMPLE	ha	eq_ref	PRIMARY	PRIMARY	4	qing.qat.article_id	1	
```

#### sql写法2

```
explain SELECT `id`,`title`,`banner`,`stime`,`etime`,`status`,`desc` FROM qu_article where id in(select a_id from qu_article_tag where tag_id in(1057,1051,1044,1043,1035,1034,1015,1014,1006,999,988,983,980,975,974,973,968,964,946,944,938,936,913,894,874,867,860,859,851,831,829,822,813,767,760,751,748,723,720,719,715,714,702,629,624,622,620,618,610,598,593,580,561,558,552,537,536,531,521,516,513,512,505,494,488,487,483,453,449,447,435,433,429,428,416,411,403,402,392,383,381,374,368)) order by order_num desc limit 10;

#执行时间：0.08s

#Explain分析结果：

id	select_type	table	type	possible_keys	key	key_len	ref	rows	Extra
1	PRIMARY	qu_article	index	\N	idx_order_num	4	\N	10	Using where
2	DEPENDENT SUBQUERY	qu_article_tag	index_subquery	idx_article_id,idx_tag_id	idx_article_id	4	func	1	Using where
```

注：文章推荐表与文章标签关系表，两张表的记录不大（不超10万条），不需要采用join，join会产生临时表及内存的文件排序，将join改为子查询，可以充分利用各自表的索引与主键查询与排序。



