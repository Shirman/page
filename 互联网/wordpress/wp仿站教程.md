wordpress仿站教程
==========================================


- [目标网站抓取](#目标网站抓取)
- [分割首页](#分割首页)
- [修改header.php](#修改headerphp)
- [调整导航栏](#调整导航栏)
- [轮播图修改](#轮播图修改)


仿站的目标网站：[仿站的目标网站](http://hyxy.tust.edu.cn/)。


## 目标网站抓取

目标网站的抓取，使用仿站小工具8.0.2挺好用的，能够尽可能多的将整个网站抓取下来。

![](https://img-blog.csdn.net/20170809142830852)

将文件保存到wp-content/tust。保存的首页default.html和其他的文件目录如下：

![](https://img-blog.csdn.net/20170809143209940)



然后建立标准的wp文件。如下图所示：

![](https://img-blog.csdn.net/20170809144458607)


## 分割首页

将default.html分割到header.php, index.php, footer.php

header.php 包含body再内的导航栏，等下还会贴出修改后的代码。

index.php 包含主体部分，要引用header.php 和 footer.php。

footer.php 包含最后的版权等信息。

## 修改header.php

修改header.php中的链接使首页正常。其中常用的模板函数：

1、基本条件判断函数:

    is\_home()：是否为主页

    is\_single()：是否为内容页 (Post)

    is\_page()：是否为内容页 (Page)

    is\_category()：是否为 Category/Archive 页

    is\_tag()：是否为标签 (Tag) 存档页

    is\_date()：是否为指定日期存档页

    is\_year()：是否为指定年份存档页

    is\_month()：是否为指定月份存档页

    is\_day()：是否为指定日存档页

    is\_time()：是否为指定时间存档页

    is\_archive()：是否为存档页

    is\_search()：是否为搜索结果页

    is\_404()：是否为 "HTTP 404: Not Found" 错误页

    is\_paged()：主页 /Category/Archive 页是否以多页显示

2、Header 部分常用到的 PHP 函数：
    
    <?php bloginfo('name'); ?>：博客名称 (Title)

    <?php bloginfo('stylesheet\_url'); ?>：CSS 文件路径

    <?php bloginfo('pingback\_url'); ?>：PingBack URL

    <?php bloginfo('template\_url'); ?>：模板文件路径

    <?php bloginfo('version'); ?>：WordPress 版本

    <?php bloginfo('atom\_url'); ?>：Atom URL

    <?php bloginfo('rss2\_url'); ?>：RSS 2.o URL

    <?php bloginfo('url'); ?>：博客 URL

    <?php bloginfo('html\_type'); ?>：博客网页 HTML 类型

    <?php bloginfo('charset'); ?>：博客网页编码

    <?php bloginfo('description'); ?>：博客描述

    <?php wp\_title(); ?>：特定内容页 (Post/Page) 的标题

3、模板常用的 PHP 函数及命令

    <?php get\_header(); ?>：调用 Header 模板

    <?php get\_sidebar(); ?>：调用 Sidebar 模板

    <?php get\_footer(); ?>：调用 Footer 模板

    <?php the\_content(); ?>：显示内容 (Post/Page)

    <?php if(have\_posts()):?>：检查是否存在 Post/Page

    <?php while(have\_posts()):the\_post(); ?>：如果存在Post/Page则予以显示

    <?php endwhile; ?>：While 结束

    <?php endif; ?>：If 结束

    <?php the\_time('字符串') ?>：显示时间，时间格式由"字符串"参数决定，具体参考 PHP 手册

    <?php comments\_popup\_link(); ?>：正文中的留言链接，如果使用 comments\_popup\_script(); 则新窗口打开链接

    <?php the\_title(); ?>：内容页 (Post/Page) 标题

    <?php the\_permalink() ?>：内容页 (Post/Page) URL

    <?php the\_category(',') ?>：特定内容页 (Post/Page) 所属 Category

    <?php the\_author(); ?>：作者

    <?php the\_ID(); ?>：特定内容页 (Post/Page) ID

    <?php edit\_post\_link(); ?>：如果用户已登录并具有权限，显示编辑链接

    <?php get\_links\_list(); ?>：显示 Blogroll 中的链接

    <?php comments\_template(); ?>：调用留言/回复模板

    <?php wp\_list\_pages(); ?>：显示 Page 列表

    <?php wp\_list\_categories(); ?>：显示 Categories 列表

    <?php next\_post\_link('%link '); ?>：下一篇文章链接

    <?php previous\_post\_link('%link'); ?>：上一篇文章链接

    <?php get\_calendar(); ?>：日历

    <?php wp\_get\_archives() ?>：显示内容存档

    <?php posts\_nav\_link(); ?>：导航，显示上一篇/下一篇文章链接

    <?php include(TEMPLATEPATH . '/文件名'); ?>：嵌入其他文件，可为定制的模板或其他类型文件

4、与模板相关的其他函数

    <?php \_e('Message'); ?>：输出相应信息

    <?php wp\_register(); ?>：显示注册链接

    <?php wp\_loginout(); ?>：显示登录/注销链接

    <!–next page–>：将当前内容分页

    <!–more–>：将当前内容截断，以不在主页/目录页显示全部内容

    <?php timer\_stop(1); ?>：网页加载时间（秒）

    <?php echo get\_num\_queries(); ?>：网页加载查询量

    将模板中的css,js,图片的链接都换成上面的函数

## 调整导航栏

页面显示正常时，进行导航栏的修改。

其中导航栏设置时，修改原始代码：![](https://img-blog.csdn.net/20170809195233274)

使用wp\_nav\_menu进行代替，菜单导航的代码，如图下注释的部分，将所有的菜单都进行注释。其中代换时，遵循下面的参数。



```php
<?php wp_nav_menu(  
array(  
'theme_location'  => '' //指定显示的导航名，如果没有设置，则显示第一个  
'menu'            => 'header-menu',  
'container'       => 'nav', //最外层容器标签名  
'container_class' => 'primary', //最外层容器class名  
'container_id'    => '',//最外层容器id值  
'menu_class'      => 'sf-menu', //ul标签class  
'menu_id'         => 'topnav',//ul标签id  
'echo'            => true,//是否打印，默认是true，如果想将导航的代码作为赋值使用，可设置为false  
'fallback_cb'     => 'wp_page_menu',//备用的导航菜单函数，用于没有在后台设置导航时调用  
'before'          => '',//显示在导航a标签之前  
'after'           => '',//显示在导航a标签之后  
'link_before'     => '',//显示在导航链接名之后  
'link_after'      => '',//显示在导航链接名之前  
'items_wrap'      => '<ul id="%1$s">%3$s</ul>',  
'depth'           => 0,////显示的菜单层数，默认0，0是显示所有层  
'walker'          => ''// //调用一个对象定义显示导航菜单 ));   
?>  
```

  
其中首页header.php修改完成后，大致如下： 

```html
<span style="font-size:10px;">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo('charset'); ?>" />
	<title>天津科技大学海洋与环境学院</title>
	<meta name="keywords" content="天津科技大学海洋与环境学院" />
	<meta name="description" content="<?php bloginfo('description'); ?>" />
	<link rel="shortcut icon" type="image/ico" href="<?php echo get_option(' wpd_logo '); ?>" />
<link href="<?php bloginfo('template_url'); ?>/css/reset-min.css" rel="stylesheet" type="text/css" />
<link href="<?php bloginfo('template_url'); ?>/css/fonts-min.css" rel="stylesheet" type="text/css" />
<link href="<?php bloginfo('template_url'); ?>/css/grids-min.css" rel="stylesheet" type="text/css" />
<link href="<?php bloginfo('template_url'); ?>/css/common.css" rel="stylesheet" type="text/css" />
<script src="<?php bloginfo('template_url'); ?>/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<!--[if lt IE 7]>
<script src="js/ie7.js"></script>
<![endif]-->
<script type="text/javascript" src="js/iepngfix_tilebg.js"></script>
<link href="<?php bloginfo('template_url'); ?>/css/index.css" rel="stylesheet" type="text/css" />
	<link href="<?php bloginfo('template_url'); ?>/css/frame-top-link.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/mainmenu.css" />
	<link href="<?php bloginfo('template_url'); ?>/css/jqueryslidemenu.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/bigpic.css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/modulelist.css" />
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/pager.css" />
	<script src="<?php bloginfo('template_url'); ?>/js/jquery.slidemenu.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/xmosaic.js"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/jquery.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/kandytabs.pack.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_url'); ?>/js/custom.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/footer.css" />
<style>
.tag_description
{
    float: left;
    margin-top:7px;
      padding-bottom:5px;
	  list-style:none;
}

    .tag_description a
    {
 
        font-size: 12px;
        text-indent: 24px;
    }

    .tag_description p
    {
	font-family:"宋体",Verdana, Lucida, Arial, Helvetica;
		color: #666666;
		float:right;
		width:220px;
		line-height:24px;
        font-size: 12px;
        text-indent: 24px;
        text-align:justify; 
		margin-top:0px;
        text-justify:inter-ideograph;

    }
				    #AcadeInfoList
				    {
				        position:relative;
				        top:-20px;
				    }
				    #AcadeInfo_spliter
				    {
				         position:relative;
				        top:10px;
				    }
				    
				    #AcadeInfoList:nth-of-type(n)
				    {
				        position:relative;
				        top:0px;
				    }
				    #AcadeInfo_spliter:nth-of-type(n)
				    {
				         position:relative;
				        top:30px;
				    }
.tag_title{
	line-height:24px;
            background-position-x: 0%;
            background-position-y: -540px;
            background-repeat: no-repeat;
	    overflow-x: hidden;
	width:370px;
}
.tag_title a{color: #666666; font-size:12px; margin-left:0px; padding-left:5px; }

</style>
</head>
<body>
<div id="frame-top">
	<div id="frame-top-warpper">
		<div class="frame-top-link">
		
	<ul>
		<li class="first"><a target="" href="/">学院首页</a></li><li class=""><a target="" href="/7db3dc.html">联系我们</a></li><li class=""><a target="_blank" href="/admin.html">管理员入口</a></li>	</ul>
</div>
<div id="frame-top-logo">
	<table>
		<tr>
			<td  style="vertical-align:top">
				<a href="/" title="天津科技大学海洋与环境学院">
					<img src="<?php bloginfo('template_url'); ?>/picture/2015-09-16-19-7642419411.png" />
				</a>
			</td>
		</tr>
	</table>
</div>
<div id="frame-top-navbar">
	<script type="text/javascript">
	    $(document).ready(function () {
	        mlddminit(375);
	    });
	</script>
	
	
		<div id="navbar-left"></div>
		<?php wp_nav_menu( array( 'container' => 'div','container_id' => 'navbar-middle','menu_class' => 'mlddm') ); ?>
	
		<!--<ul class="mlddm" params="1,-1,500,slide,200,h">
			<li class="">
	<a href="#" target="">学院概况</a>
	<ul>
		<li><a href='/01589e.html' target="">学院简介</a>
		        </li><li><a href='/cbc95b.html' target="">历史沿革</a>
		        </li><li><a href='/1ab539.html' target="">学院领导</a>
		        </li><li><a href='/ad9daf.html' target="">学院党委</a>
		        </li><li><a href='/0c2b70.html' target="">职能部门</a>
		        </li><li><a href='#' target="">学术机构</a>
	
		  </li>    替换这里第一条的东西。	
	-->
	
	<div id="navbar-right"></div>
</div>

<?php wp_head(); ?></span>
```

## 轮播图修改

修改index.php中的这里先进行轮播图的修改，其中轮播图修改后的代码如下：



```html
<span style="font-size:10px;"><?php get_header(); ?>
<div id="frame-top-slider-detail"> </div>
		<div id="frame-top-slider" class="smallslider">
			<!-- 大图轮播-->
			<script type="text/javascript">
		        $(document).ready(function () {
					var l=$('#bigpic').children().length;
					var str='';
					for(var i=0; i < l;i++)
					{
						if(i==0)
							str += '<li  class="on" ></li>';
						else
							str += '<li class=" "></li>';
					}
					$('#pager').html(str);
		            var mosaic = XMosaic('bigpic', { pager: 'pager', delay: 10000, countX: 10, countY: 5, how: 9, order: 0 });
		        });
		    </script>
			<div  id ="bigpic">
			<a style="left: 0px; top: 0px; position: absolute;" target="_blank" href="/13v0to-1.html">
	<img src='<?php echo get_option(' wpd_banner1 '); ?>' alt='1' />
</a><a style="left: 0px; top: 0px; position: absolute;" target="_blank" href="">
	<img src='<?php echo get_option(' wpd_banner2 '); ?>' alt='2' />
</a>			</div>
		</div>
	</div></span>
```

  
然后修改文章的列表部分：

```php
	<div id="frame-top-slider-mask">
		<ul class="ctrls" id="pager">
		</ul>
	</div>
</div>
<div id="frame-main-body">
	<div id="frame-main-wrapper" class="yui3-g">
		<div id="frame-main" class="yui3-u">
			<div id="frame-main-left" class="yui3-u-1-2">
				<div class="module module_left">
					<div class="module-name">
					<a href="/75d14e-1.html" target="_blank">学院新闻</a>
					<a style="font-size:13px; margin-left:250px; color:blue;" target="_blank" href="/75d14e-1.html">更多</a>
					</div>
					<div class="module-spliter">
						<div> </div>
					</div>
					<div class="module-warpper">
						<div>
	<div class="row pd5 fb">
		<a target="_blank" title="海洋与环境学院孙军院长一行走访国家海洋信息中心" href="/lqpmfv.html">海洋与环境学院孙军院长一行走访国家海洋信息中心</a>
	</div>
	<li class="row spic tag_description">
		<a target="_blank" href="/lqpmfv.html" title="海洋与环境学院孙军院长一行走访国家海洋信息中心">
			<img width=360 height="150" align="left" alt="海洋与环境学院孙军院长一行走访国家海洋信息中心" src="<?php bloginfo('template_url'); ?>/picture/540_225.jpg">
					</a>
	</li>
	<div style="clear:both;"></div>
</div>						<table cellspacing="0" cellpadding="0" class="tag_table">
	<tbody>
		
        <?php
			query_posts(
				//'query_type = post&posts_per_page=8'
				array ( 'category_name' => 'business', 'posts_per_page' => 8 )
				);
				$i=0; while(have_posts()) : the_post(); $i++; ?>
				<tr>
				<td width="100%">
					<ul>
						<li class="tag_title">
							<a target="_blank" title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</li>
					</ul>
				</td>
				</tr>				
			<?php endwhile; wp_reset_query(); ?>	
		
		</tbody>
</table>					</div>
				</div>
			</div>
			<div id="frame-main-right" class="yui3-u-1-2">
				<div class="module">
					<div class="module-name"> <a href="/c6c7e7-1.html" target="_blank">通知公告</a>
					<a style="font-size:13px; margin-left:250px; color:blue;" target="_blank" href="/c6c7e7-1.html">更多</a>
					</div>
					<div class="module-spliter">
						<div> </div>
					</div>
					<div class="module-warpper">
			<table cellspacing="0" cellpadding="0" class="tag_table">
	<tbody>
		
        <?php
		query_posts(
			//'query_type = post&posts_per_page=8'
			array ( 'category_name' => 'technolo', 'posts_per_page' => 8 )
			);
			$i=0; while(have_posts()) : the_post(); $i++; ?>			
				<tr>
					<td width="100%">
						<ul>
							<li class="tag_title">
								<a target="_blank" title="<?php the_title(); ?>" href="<?php the_permalink(); ?>"><?php the_time('Y年n月j日'); ?>  <?php the_title(); ?></a>
							</li>
						</ul>
					</td>
				</tr>
		<?php endwhile; wp_reset_query(); ?>	
		
		</tbody>
</table>					</div>
				</div>
			</div>
		</div>
		<div id="frame-side" class="yui3-u">
			<div id="placehoder"></div>
			<ul>
				<li><a target="" href="/906368.html">研究成果</a></li><li><a target="" href="/faef50-1.html">学术交流</a></li><li><a target="_blank" href="http://hyxy.tust.edu.cn/shiyanshifan/1shoye.html">实践教学</a></li><li><a target="" href="/ccac59.html">教学成果</a></li><li><a target="" href="/4d3baa-1.html">学生资助</a></li><li><a target="" href="/801d37-1.html">校友相聚</a></li><li><a target="" href="#">学术报告</a></li>			</ul>
		</div>
	</div>
	<div id="frame-main-link" class="yui3-g">
		<div>
			<div id="demo" style="overflow:hidden;height:110px;margin:0 auto;">
				<table align="left" cellpadding="0" cellspace="0" border="0">
					<tr>
						<td id="demo1" valign="top">
						<div>
						<a style="width:0px;" href="/0c8a9f.html#ppzy" target="_blank"><img src="<?php bloginfo('template_url'); ?>/picture/57243dbb36ec49fe8ea8839a947fe310.jpg" /></a><img src="<?php bloginfo('template_url'); ?>/picture/869b86dfeae34a31b851fb01cec2b074.jpg" /><a style="width:0px;" href="http://hyhjbhjs.cl1.soochong.com" target="_blank"><img src="<?php bloginfo('template_url'); ?>/picture/2015-08-27-20-0606158108.jpg" /></a><img src="<?php bloginfo('template_url'); ?>/picture/39bfa2a5c9be4d87bb8c50a886d3f3c0.jpg" /></div>
						</td>
						<td id="demo2" valign="top"> </td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
<?php get_footer(); ?>
```

  
![](https://img-blog.csdn.net/20170809210900094)  
修改后显示成上图所示，文章换成了 后台上传的文章。

<font size=2 color=grey>[阅读原文](https://blog.csdn.net/juezhanangle/article/details/76985202)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
