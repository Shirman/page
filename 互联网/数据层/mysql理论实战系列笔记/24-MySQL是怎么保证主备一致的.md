

主要介绍了主备数据库之间的数据如何同步，及整个数据同步事务逻辑流程；并着重介绍了binlog（同步的主要载体）的3种格式，statement、row及mixed，mysql会通过自动判断一些不会让同步数据产生不一致的操作采用statement格式（mixed），文中作者建议越来越多采用row的方式，不论是insert、delete、update的误操作的都可以通过row的格式方便的恢复回来，

原文：https://time.geekbang.org/column/article/76446


