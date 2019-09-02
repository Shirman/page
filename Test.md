
## 抽奖模块

### 列表
#### 我创建的活动列表 @done

- 查询使用了时间排序，但没有索引，优化器采用filesort方式；

    调整：更换排序字段为id主键


#### 我参与的抽奖活动 @done

- lottery_user_data与lottery_activity做join查询

    被驱动表使用主键，扫描数量不会多，但排序时需要在临时表做一次排序；
    
    调整：新增idx_uid_ctime，保证主动order by ctime时，驱动表扫描该索引树并已有序


### 编辑入口9宫格 @done

- 活动详情数据缓存

### 编辑页面 

注意：这里尽量不使用缓存数据（活动及奖项）


### 编辑提交

注意：这里尽量不使用缓存数据（活动及奖项）

调整：
- 补充活动及奖项缓存数据清除


### 中奖名单 @done

```
[ 2019-08-28T14:01:25+08:00 ] 192.168.8.1 POST /api/Lottery/myWinnerList
[ sql ] [ DB ] CONNECT:[ UseTime:0.123115s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_results` [ RunTime:0.082748s ]
[ sql ] [ SQL ] SELECT COUNT(*) AS tp_count FROM `yyzs_lottery_results` `LotteryResults` INNER JOIN `yyzs_lottery_prize` `LotteryPrize` ON `LotteryResults`.`prize_id`=`LotteryPrize`.`id` WHERE  `LotteryResults`.`activity_id` = 2104 LIMIT 1 [ RunTime:0.159290s ]
[ sql ] [ SQL ] SELECT `LotteryResults`.`id`,`LotteryResults`.`uid`,`LotteryResults`.`create_time`,`LotteryResults`.`contact`,`LotteryResults`.`phone`,`LotteryResults`.`remark`,`LotteryResults`.`status`,`LotteryResults`.`prize_id`,`LotteryPrize`.`num`,`LotteryPrize`.`num_text`,`LotteryPrize`.`name` FROM `yyzs_lottery_results` `LotteryResults` INNER JOIN `yyzs_lottery_prize` `LotteryPrize` ON `LotteryResults`.`prize_id`=`LotteryPrize`.`id` WHERE  `LotteryResults`.`activity_id` = 2104 ORDER BY `create_time` DESC LIMIT 0,20 [ RunTime:0.163313s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_user` [ RunTime:0.162143s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 7 LIMIT 1 [ RunTime:0.159575s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 39 LIMIT 1 [ RunTime:0.158909s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 38 LIMIT 1 [ RunTime:0.159089s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 33 LIMIT 1 [ RunTime:0.191157s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 32 LIMIT 1 [ RunTime:0.159222s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 31 LIMIT 1 [ RunTime:0.159656s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 7 LIMIT 1 [ RunTime:0.159206s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 7 LIMIT 1 [ RunTime:0.159425s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 7 LIMIT 1 [ RunTime:0.160453s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 7 LIMIT 1 [ RunTime:0.160482s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 318 LIMIT 1 [ RunTime:0.159497s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 305 LIMIT 1 [ RunTime:0.188117s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 288 LIMIT 1 [ RunTime:0.158545s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 270 LIMIT 1 [ RunTime:0.176803s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 254 LIMIT 1 [ RunTime:0.159992s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 249 LIMIT 1 [ RunTime:0.159983s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 242 LIMIT 1 [ RunTime:0.158808s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 238 LIMIT 1 [ RunTime:0.159055s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 237 LIMIT 1 [ RunTime:0.160221s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 228 LIMIT 1 [ RunTime:0.160421s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_prize` [ RunTime:0.159402s ]
[ sql ] [ SQL ] SELECT `num`,`num_text` FROM `yyzs_lottery_prize` WHERE  `activity_id` = 2104  AND `status` = 0 [ RunTime:0.158873s ]

```

调整：
- 列表sql优化order by create_time，补充idx_aid_ctime 索引
- 用户昵称从lottery_results表取，不需要去user表遍历查询


### 中奖统计

- 挺好

### 用户列表 @done

```
[ 2019-08-28T14:18:20+08:00 ] 192.168.8.1 POST /api/Lottery/myActivityUsers
[ sql ] [ DB ] CONNECT:[ UseTime:0.120665s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_user_data` [ RunTime:0.082043s ]
[ sql ] [ SQL ] SELECT `LotteryUserData`.`create_time`,`User`.`nickname`,`User`.`avatar` FROM `yyzs_lottery_user_data` `LotteryUserData` INNER JOIN `yyzs_user` `User` ON `LotteryUserData`.`uid`=`User`.`id` WHERE  `LotteryUserData`.`activity_id` = 2104 ORDER BY `create_time` DESC LIMIT 0,20 [ RunTime:0.177342s ]

```

调整：
- yyzs_lottery_user_data 表提供 idx_aid_ctime 索引

### 复制活动

同编辑提交

### 抽奖码

#### 新增抽奖码


#### 抽奖码列表



### 分享活动 

/api/Hdj/getSharePoster  优化

### 浏览活动

请求：
```
资源：
http://yyzs.hdj.com/h5/Lottery/index?aid=_1JSyE&source_key=hdj
ajax：
http://yyzs.hdj.com/h5/Lottery/page?modal=1
http://yyzs.hdj.com/api/Lottery/getActivityPreview
http://yyzs.hdj.com/api/Lottery/getSharePoster
```

sql：
```
[ 2019-08-28T14:23:56+08:00 ] 192.168.8.1 GET /h5/lottery/index?aid=_1JSyE&source_key=hdj&ticket=06e2f3e2efe03d285ee2b484ce5cf024
[ sql ] [ DB ] CONNECT:[ UseTime:0.110121s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.072984s ]
[ sql ] [ SQL ] SELECT * FROM `yyzs_lottery_activity` WHERE  `id` = 2104  AND `status` <> 4 LIMIT 1 [ RunTime:0.180881s ]
---------------------------------------------------------------
[ 2019-08-28T14:23:58+08:00 ] 192.168.8.1 POST /api/Lottery/getActivityPreview
[ sql ] [ DB ] CONNECT:[ UseTime:0.131435s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.086901s ]
[ sql ] [ SQL ] SELECT `id`,`template_key`,`title`,`draw_num`,`day_num`,`max_win`,`start_time`,`end_time`,`status`,`mode`,`init_people`,`join_people`,`draw_code_info`,`show_winner` FROM `yyzs_lottery_activity` WHERE  `id` = 2104 LIMIT 1 [ RunTime:0.171147s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_results` [ RunTime:0.168230s ]
[ sql ] [ SQL ] SELECT COUNT(*) AS tp_count FROM `yyzs_lottery_results` WHERE  `activity_id` = 2104  AND `uid` = 7  AND `prize_code` <> ''  AND `prize_id` <> 0 LIMIT 1 [ RunTime:0.166204s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_prize` [ RunTime:0.168386s ]
[ sql ] [ SQL ] SELECT `num`,`num_text`,`name` FROM `yyzs_lottery_prize` WHERE  `activity_id` = 2104  AND `status` = 0 [ RunTime:0.166699s ]
[ sql ] [ SQL ] SELECT `LotteryResults`.`prize_title`,`User`.`nickname`,`User`.`avatar` FROM `yyzs_lottery_results` `LotteryResults` INNER JOIN `yyzs_user` `User` ON `LotteryResults`.`uid`=`User`.`id` WHERE  `LotteryResults`.`activity_id` = 2104 [ RunTime:0.168824s ]
---------------------------------------------------------------
[ 2019-08-28T14:23:58+08:00 ] 192.168.8.1 POST /api/Lottery/getSharePoster
[ sql ] [ DB ] CONNECT:[ UseTime:0.123916s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.082017s ]
[ sql ] [ SQL ] SELECT * FROM `yyzs_lottery_activity` WHERE  `id` = 2104  AND `status` <> 4 LIMIT 1 [ RunTime:0.164189s ]


```

调整：

- /h5/Lottery/index活动详情缓存管理
- /api/Lottery/getSharePoster中getSharePoster采用活动详情缓存数据
- 获取跑马灯数据时，虽然取得所有，但只下发最后20个，提供页面渲染效率

### 抽奖操作

```
[ 2019-08-28T11:55:46+08:00 ] 192.168.8.1 POST /api/Lottery/draw
[ sql ] [ DB ] CONNECT:[ UseTime:0.120875s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.082142s ]
[ sql ] [ SQL ] SELECT `id`,`template_key`,`title`,`draw_num`,`day_num`,`max_win`,`status`,`mode`,`start_time`,`end_time`,`init_people`,`limit_people`,`join_people`,`prize_max_win` FROM `yyzs_lottery_activity` WHERE  `id` = 2104 LIMIT 1 [ RunTime:0.160812s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_results` [ RunTime:0.162497s ]
[ sql ] [ SQL ] SELECT COUNT(*) AS tp_count FROM `yyzs_lottery_results` WHERE  `activity_id` = 2104  AND `uid` = 7  AND `prize_code` <> ''  AND `prize_id` <> 0 LIMIT 1 [ RunTime:0.161604s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_code` [ RunTime:0.188910s ]
[ sql ] [ SQL ] SELECT `status`,`activity_id` FROM `yyzs_lottery_code` WHERE  `code` = '52w41I6oA6' LIMIT 1  FOR UPDATE [ RunTime:0.162433s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_code`  SET `status`=1  WHERE  `code` = '52w41I6oA6' [ RunTime:0.194714s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_prize` [ RunTime:0.162025s ]
[ sql ] [ SQL ] SELECT `id`,`num`,`num_text`,`name`,`total`,`max_day`,`today_num`,`prize_time`,`stock`,`min`,`max`,`prize_num` FROM `yyzs_lottery_prize` WHERE  `activity_id` = 2104  AND `status` = 0 [ RunTime:0.160271s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_prize`  SET `today_num`=0,`update_time`=1566964543  WHERE  `id` = 4647 [ RunTime:0.162289s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_user_data` [ RunTime:0.160663s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_user_data`  SET `use_total`=`use_total`+1  WHERE  `activity_id` = 2104  AND `uid` = 7 [ RunTime:0.161988s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_activity`  SET `join_people`=`join_people`+1  WHERE  `id` = 2104 [ RunTime:0.162568s ]
[ sql ] [ SQL ] SELECT `stock`,`today_num`,`prize_time`,`prize_num` FROM `yyzs_lottery_prize` WHERE  `id` = 4647 LIMIT 1  FOR UPDATE [ RunTime:0.172306s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_prize`  SET `stock`=37,`prize_num`=23,`today_num`=1,`prize_time`=1566964544,`update_time`=1566964544  WHERE  `id` = 4647 [ RunTime:0.160201s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_activity`  SET `prize_num`=`prize_num`+1  WHERE  `id` = 2104 [ RunTime:0.170343s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_user` [ RunTime:0.183611s ]
[ sql ] [ SQL ] SELECT `nickname` FROM `yyzs_user` WHERE  `id` = 7 LIMIT 1 [ RunTime:0.179042s ]
[ sql ] [ SQL ] INSERT INTO `yyzs_lottery_results` (`activity_id` , `uid` , `user_name` , `prize_id` , `prize_code` , `prize_title` , `prize_goods` , `create_time` , `update_time`) VALUES (2104 , 7 , 'Tsing.Chan.Zreal' , 4647 , '914qE5A4F5' , '38现金红包' , '3.88元现金红包' , 1566964545 , 1566964545) [ RunTime:0.160433s ]
[ sql ] [ SQL ] SELECT `User`.*,`UserOpenid`.* FROM `yyzs_user` `User` INNER JOIN `yyzs_user_openid` `UserOpenid` ON `User`.`id`=`UserOpenid`.`uid` WHERE  `User`.`id` = 7  AND `UserOpenid`.`source` = 'hdj' LIMIT 1 [ RunTime:0.160987s ]
[ sql ] [ SQL ] SELECT `name` FROM `yyzs_lottery_prize` WHERE  `activity_id` = 2104  AND `num` = 2 LIMIT 1 [ RunTime:0.160238s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_msg_list` [ RunTime:0.161724s ]
[ sql ] [ SQL ] INSERT INTO `yyzs_msg_list` (`uid` , `msg` , `source` , `create_time`) VALUES (7 , '{\"header\":[[\"中奖啦\",\"8月28号 11:55\"]],\"body\":[[\"活动名称\",\"抽奖疑似异常数据-九宫格1\"],[\"获奖内容\",\"3.88元现金红包\"],[\"备注\",\"记得分享给好友炫耀一下哟\"]],\"btn\":[\"点击查看详情\",\"\"]}' , 'hdj' , 1566964546) [ RunTime:0.162101s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_push` [ RunTime:0.159965s ]
[ sql ] [ SQL ] INSERT INTO `yyzs_push` (`type` , `status` , `content` , `push_time` , `source` , `expiry_time` , `create_time` , `update_time`) VALUES (0 , 0 , '{\"uid\":7,\"sendData\":{\"touser\":\"oBqjM4qnG2ThsUyr7jMbyvAogCio\",\"page\":\"\\/lottery\\/pages\\/game\\/game?aid=_1JSyE\",\"data\":{\"keyword1\":{\"value\":\"\\u606d\\u559c\\u60a8\\u4e2d\\u5956\\u4e86\"},\"keyword2\":{\"value\":\"\\u62bd\\u5956\\u7591\\u4f3c\\u5f02\\u5e38\\u6570\\u636e-\\u4e5d\\u5bab\\u683c1\"},\"keyword3\":{\"value\":\"Tsing.Chan.Zreal\"},\"keyword4\":{\"value\":\"\\u70b9\\u51fb\\u6d3b\\u52a8\\u8be6\\u60c5\\uff0c\\u67e5\\u770b\\u5956\\u54c1\\u9886\\u53d6\\u8bf4\\u660e\\u3002\"}},\"emphasis_keyword\":\"keyword1.DATA\",\"template_id\":\"v2yEZ2VC2S5_wwpv_9bgNmArGMNPlwVhqAxRh-ZaJoA\",\"push_time\":1566964605,\"latest_time\":1566971745,\"msg_id\":\"5288\"},\"source\":\"hdj\"}' , 1566964605 , 'hdj' , 1566971745 , 1566964546 , 1566964546) [ RunTime:0.167122s ]

```

调整：

- 尽量将写入公共表的操作放到事务末尾，缩短事务时长
- 消息推送异步 @todo重点测试
- 博饼特殊方法： getDrawBoBingExt



### 活动详情

```
[ 2019-08-28T11:34:45+08:00 ] 192.168.8.1 POST /api/Lottery/getActivityDetail
[ sql ] [ DB ] CONNECT:[ UseTime:0.136148s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.075359s ]
[ sql ] [ SQL ] SELECT * FROM `yyzs_lottery_activity` WHERE  `id` = 2104  AND `status` <> 4 LIMIT 1 [ RunTime:0.170274s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_prize` [ RunTime:0.163335s ]
[ sql ] [ SQL ] SELECT * FROM `yyzs_lottery_prize` WHERE  `status` = 0  AND `activity_id` = 2104 ORDER BY `num` [ RunTime:0.160920s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_results` [ RunTime:0.155286s ]
[ sql ] [ SQL ] SELECT `LotteryResults`.`id`,`LotteryResults`.`prize_code`,`LotteryResults`.`send_time`,`LotteryResults`.`create_time`,`LotteryResults`.`contact`,`LotteryResults`.`phone`,`LotteryResults`.`remark`,`LotteryPrize`.`num`,`LotteryPrize`.`num_text`,`LotteryPrize`.`name` FROM `yyzs_lottery_results` `LotteryResults` INNER JOIN `yyzs_lottery_prize` `LotteryPrize` ON `LotteryResults`.`prize_id`=`LotteryPrize`.`id` WHERE  `LotteryResults`.`activity_id` = 2104  AND `LotteryResults`.`uid` = 7  AND `LotteryResults`.`status` = 0 [ RunTime:0.156855s ]
```

调整：
- 活动数据缓存管理


### 活动详情-兑奖码获取

再次请求了：/api/Lottery/getActivityDetail 详见活动详情

调整：
- 前端需要根据实际获取指定获奖兑奖码请求对应兑奖数据，避免后端扫描用户所有中奖信息 @前端


### 兑奖及确认兑奖

```
---------------------------------------------------------------
[ 2019-08-28T14:46:21+08:00 ] 192.168.8.1 POST /api/Lottery/scanCode
[ sql ] [ DB ] CONNECT:[ UseTime:0.124346s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_results` [ RunTime:0.086614s ]
[ sql ] [ SQL ] SELECT `id`,`prize_code`,`prize_id`,`uid`,`status` FROM `yyzs_lottery_results` WHERE  `activity_id` = 2104  AND `prize_code` = '91Vv5B31q8' LIMIT 1 [ RunTime:0.176896s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.189744s ]
[ sql ] [ SQL ] SELECT `uid`,`title`,`cover`,`status`,`start_time`,`end_time` FROM `yyzs_lottery_activity` WHERE  `id` = 2104 LIMIT 1 [ RunTime:0.163425s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_prize` [ RunTime:0.445274s ]
[ sql ] [ SQL ] SELECT `num`,`num_text`,`name` FROM `yyzs_lottery_prize` WHERE  `id` = 4652  AND `activity_id` = 2104 LIMIT 1 [ RunTime:0.442469s ]
---------------------------------------------------------------
[ 2019-08-28T14:46:44+08:00 ] 192.168.8.1 POST /api/Lottery/confirmPrizeCode
[ sql ] [ DB ] CONNECT:[ UseTime:0.124389s ] mysql:host=121.42.225.20;dbname=yyzs;charset=utf8mb4
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_results` [ RunTime:0.080242s ]
[ sql ] [ SQL ] SELECT `id`,`prize_code`,`prize_id`,`uid`,`status` FROM `yyzs_lottery_results` WHERE  `activity_id` = 2104  AND `prize_code` = '91Vv5B31q8' LIMIT 1 [ RunTime:0.188839s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_activity` [ RunTime:0.159551s ]
[ sql ] [ SQL ] SELECT `uid`,`title` FROM `yyzs_lottery_activity` WHERE  `id` = 2104 LIMIT 1 [ RunTime:0.434147s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_results`  SET `status`=1,`send_time`=1566974802,`update_time`=1566974802  WHERE  `id` = 20135  AND `uid` = 7  AND `activity_id` = 2104  AND `prize_code` = '91Vv5B31q8' [ RunTime:0.158880s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_lottery_prize` [ RunTime:0.390551s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_prize`  SET `prize_expiry_num`=`prize_expiry_num`+1  WHERE  `id` = 4652  AND `activity_id` = 2104 [ RunTime:0.213714s ]
[ sql ] [ SQL ] UPDATE `yyzs_lottery_activity`  SET `prize_expiry_num`=`prize_expiry_num`+1  WHERE  `id` = 2104 [ RunTime:0.198573s ]
[ sql ] [ SQL ] SELECT `num_text`,`name` FROM `yyzs_lottery_prize` WHERE  `id` = 4652 LIMIT 1 [ RunTime:0.159171s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_user_openid` [ RunTime:0.160095s ]
[ sql ] [ SQL ] SELECT `openid` FROM `yyzs_user_openid` WHERE  `uid` = 7  AND `source` = 'hdj' LIMIT 1 [ RunTime:0.194599s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_msg_list` [ RunTime:0.160759s ]
[ sql ] [ SQL ] INSERT INTO `yyzs_msg_list` (`uid` , `msg` , `source` , `create_time`) VALUES (7 , '{\"header\":[[\"兑奖成功\",\"8月28号 14:46\"]],\"body\":[[\"活动名称\",\"9宫格抽奖代金券-常用\"],[\"获奖内容\",\"价值666元代金券\"],[\"备注\",\"记得分享给好友炫耀一下哟\"]],\"btn\":[\"点击查看详情\",\"\"]}' , 'hdj' , 1566974803) [ RunTime:0.183884s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_formid_hdj` [ RunTime:0.449641s ]
[ sql ] [ SQL ] SELECT `id`,`form_id` FROM `yyzs_formid_hdj` WHERE  `uid` = 7  AND `create_time` > 1566370003 ORDER BY `create_time` DESC LIMIT 1 [ RunTime:0.158312s ]
[ sql ] [ SQL ] SHOW COLUMNS FROM `yyzs_push` [ RunTime:0.167168s ]
[ sql ] [ SQL ] INSERT INTO `yyzs_push` (`type` , `status` , `push_time` , `err_message` , `content` , `source` , `expiry_time` , `times` , `create_time` , `update_time`) VALUES (1 , 0 , 1566975404 , '\"formid is empty.\"' , '{\"uid\":7,\"sendData\":{\"touser\":\"oBqjM4qnG2ThsUyr7jMbyvAogCio\",\"page\":\"\\/lottery\\/pages\\/game\\/game?aid=_1JSyE\",\"data\":{\"keyword1\":{\"value\":\"9\\u5bab\\u683c\\u62bd\\u5956\\u4ee3\\u91d1\\u5238-\\u5e38\\u7528\"},\"keyword2\":{\"value\":\"2019-08-28 14:46\"},\"keyword3\":{\"value\":\"\\u4ef7\\u503c666\\u5143\\u4ee3\\u91d1\\u5238\"},\"keyword4\":{\"value\":\"\\u70b9\\u51fb\\u67e5\\u770b\\u6d3b\\u52a8\\u8be6\\u60c5\\u4ecb\\u7ecd\\u3002\"}},\"template_id\":\"H6zoErIL9M_2ALKnm5AyIccV0Ddyt4L-Xs0K1siSD38\",\"push_time\":1566974803,\"latest_time\":1566982003,\"msg_id\":\"5289\"},\"source\":\"hdj\"}' , 'hdj' , 1566982003 , 1 , 1566974804 , 1566974804) [ RunTime:0.162585s ]

```

调整：
- 是否有事务，调整写入到事务末尾
- 活动数据缓存  兑奖码查看scanCode 重点测试下@todo

### 创建活动（活动模板）



