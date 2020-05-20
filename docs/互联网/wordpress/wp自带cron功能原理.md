<!-- TOC -->

- [wp\_get\_schedule](#wp\_get\_schedule)
- [wp\_get\_schedules](#wp\_get\_schedules)
- [wp\_next\_scheduled](#wp\_next\_scheduled)
- [wp\_schedule\_event](#wp\_schedule\_event)
- [wp\_reschedule\_event](#wp\_reschedule\_event)
- [wp\_unschedule\_event](#wp\_unschedule\_event)
- [wp\_clear\_scheduled\_hook](#wp\_clear\_scheduled\_hook)
- [wp\_schedule\_single\_event](#wp\_schedule\_single\_event)
- [查看 WordPress 定时任务列表](#查看-wordpress-定时任务列表)

<!-- /TOC -->

WP Cron 是什么? 是 WordPress 一套定时触发机制, 可以循环安排任务执行. 如: 定时发布新文章, 定期检测版本等功能都是通过这个来实现的.

WP Cron 可以为我们实现什么? 我们可以循环更新和提交网站数据, 节日定期向读者发送贺卡或者表单, …

WordPress 定时任务方法列表可以参考: [WP-Cron Functions](http://codex.wordpress.org/Category:WP-Cron_Functions)  

WP-Cron 效率不高, 但还是很方便好用的, 整理了一下相关函数的使用方法如下.

### wp\_get\_schedule

通过勾子别名, 获取预定安排的勾子. 成功时返回循环周期类别 (hourly, twicedaily, daily, …), 失败时返回 false.

```
<?php wp_get_schedule( $hook, $args ) ?>
```

$hook: 勾子别名

$args: 勾子对应函数的参数数组 (可选)

### wp\_get\_schedules

WordPress 默认支持的循环周期类别有 hourly, twicedaily 和 daily. 通过该函数我们可以获取所有这些循环周期数组.

```
<?php wp_get_schedules() ?>
```

在默认情况下, 由以上方法获得的数组对象如下.

```
array(
	'hourly' => array(
		'interval' => 3600,
		'display' => 'Once Hourly'
	),
	'twicedaily' => array(
		'interval' => 43200,
		'display' => 'Twice Daily'
	),
	'daily' => array(
		'interval' => 86400,
		'display' => 'Once Daily'
	)
)
```

我们可以向 cron\_schedules 过滤器添加更多的类型. 添加例子如下:

```
add_filter('cron_schedules', 'cron_add_weekly'); 
function cron_add_weekly( $schedules )
{
	// Adds once weekly to the existing schedules.
	$schedules['weekly'] = array(
		'interval' => 604800, // 1周 = 60秒 * 60分钟 * 24小时 * 7天
		'display' => __('Once Weekly')
	);
	return $schedules;
}
```

### wp\_next\_scheduled

通过勾子别名, 获取预定安排的下一个运行时刻, 以整型返回. 常用于判断是否已经做了预定安排.

```
<?php $timestamp = wp_next_scheduled( $hook, $args ); ?>
```

$hook: 勾子别名

$args: 勾子对应函数的参数数组 (可选)

### wp\_schedule\_event

按周期循环预定安排一个 WordPress 勾子, 在预定时间触发勾子对应的函数.

```
<?php wp_schedule_event($timestamp, $recurrence, $hook, $args); ?>
```

$timestamp: 时间 (整型)

$recurrence: 循环周期类别 (hourly, twicedaily, daily, …)

$hook: 勾子别名

$args: 勾子对应函数的参数数组 (可选)

### wp\_reschedule\_event

按周期循环重新预定安排一个 WordPress 勾子. 但我发现这个方法不能正常使用, Codex 写得很草, 如果哪位清楚知道怎么使用, 请告知一下.

### wp\_unschedule\_event

通过预定时间和勾子别名, 取消预定的安排.

```
<?php wp_unschedule_event($timestamp, $hook, $args ); ?>
```

$timestamp: 时间 (整型)

$hook: 勾子别名

$args: 勾子对应函数的参数数组 (可选)

### wp\_clear\_scheduled\_hook

通过勾子别名, 移除预定安排的勾子.

```
<?php wp_clear_scheduled_hook( $hook ); ?>
```

$hook: 勾子别名

### wp\_schedule\_single\_event

预定安排一个 WordPress 勾子, 在预定时间触发勾子对应的函数. 与 wp\_schedule\_event 不同的是该方法的只安排一次触发, 不存在循环预定.

```
<?php wp_schedule_single_event($timestamp, $hook); ?>
```

$timestamp: 时间 (整型)

$args: 勾子对应函数的参数数组 (可选)

### 查看 WordPress 定时任务列表

因为是定时任务, 不能立即生效, 那我们要如何查看这些任务安排呢? 可以装个插件进行辅助. 我建议使用比较轻量级的 [WP-Cron Dashboard](http://wordpress.org/extend/plugins/wp-cron-dashboard/) (与 [Quick Comments](http://www.neoease.com/quick-comments/) 同一个作者), 安装后可以在 Tool -> WP-Cron 打开控制面板.


<font size=2 color=grey>[阅读原文](https://shipengliang.com/software-exp/wordpress-cron-定时任务详解.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
