wordpress数据库结构及表说明
=========================================


- [数据表结构](#数据表结构)
- [按照功能大致分为五类](#按照功能大致分为五类)
- [表](#表)
    - [wp\_posts](#wp\_posts)
    - [wp\_postmeta](#wp\_postmeta)
    - [wp\_comments](#wp\_comments)
    - [wp\_users](#wp\_users)
    - [wp\_usermeta](#wp\_usermeta)
    - [wp\_options](#wp\_options)
    - [wp\_links](#wp\_links)
    - [wp\_terms , wp\_term\_relationships, wp\_term\_taxonomy](#wp\_terms--wp\_term\_relationships-wp\_term\_taxonomy)
    - [wp\_terms](#wp\_terms)
    - [wp\_term\_taxonomy](#wp\_term\_taxonomy)
    - [wp\_term\_relationships](#wp\_term\_relationships)


  
## 数据表结构
  
wp\_commentmeta：存储评论的元数据  
wp\_comments：存储评论  
wp\_links：存储友情链接（Blogroll）  
wp\_options：存储WordPress系统选项和插件、主题配置  
wp\_postmeta：存储文章（包括页面、上传文件、修订）的元数据  
wp\_posts：存储文章（包括页面、上传文件、修订）  
wp\_terms：存储每个目录、标签  
wp\_term\_relationships：存储每个文章、链接和对应分类的关系  
wp\_term\_taxonomy：存储每个目录、标签所对应的分类  
wp\_usermeta：存储用户的元数据  
wp\_users：存储用户  
  
## 按照功能大致分为五类
  
user: 用户信息，包括wp\_users表和wp\_usermeta表。

link：链接信息，包括wp\_links表。 

post: 文章及评论信息，包括wp\_posts、wp\_postmeta、wp\_comments。  

category,link\_category,tag:这个是比较复杂的信息模块，它包含了对分类，链接分类，标签的管理，包括wp\_term，wp\_term\_relationships和wp\_term\_taxonomy表。  

option: 全局设置信息，包括wp\_options表。  
  
## 表

### wp\_posts  

作为一个博客系统，最核心的当然是博主发表的一些“文章”了，这些“文章”存放的地方就是这个 wp\_posts 表了。注意，这里所说的“文章”是加引号的，因为这个表里存放的除了普通的文章之外，还有附件和页面（page）的一些信息。表里面的 post\_type 这个字段就是用来标示类型的。还有一点需要注意的就是，这个表里一些字段是针对于 post\_type 的特定类型的，比如 menu\_order 这个字段是“页面（page）”特有的，用来指定“页面”的顺序。post\_mime\_type 是针对附件的，来指定附件的类型。  

    ID：自增唯一ID
    post_author：对应作者ID
    post_date：发布时间
    post_date_gmt：发布时间（GMT+0时间）
    post_content：正文
    post_title：标题
    post_excerpt：摘录
    post_status：文章状态（publish/auto-draft/inherit等）
    comment_status：评论状态（open/closed）
    ping_status：PING状态（open/closed）
    post_password：文章密码
    post_name：文章缩略名
    to_ping：未知
    pinged：已经PING过的链接
    post_modified：修改时间
    post_modified_gmt：修改时间（GMT+0时间）
    post_content_filtered：未知
    post_parent：父文章，主要用于PAGE
    guid：未知
    menu_order：排序ID
    post_type：文章类型（post/page等）
    post_mime_type：MIME类型
    comment_count：评论总数

### wp\_postmeta  

每篇文章的属性是不可能仅仅用 wp\_posts 表里的那几个字段来完全标示的，往往还有一些因人而异的属性：写这篇文章时候的心情，地点等等。这些属性的名称和值类型都是不确定的，因 此，Wordpress 采用了元信息(meta)来表示它们。这个表很简单，只有 meta\_id, post\_id, meta\_key, meta\_value 这四个字段。post\_id 是相关 post 的 id。我们注意到 meta\_value 是 longtext 类型的，这里仅是用来存储值，至于值的确切类型，需要程序员来关心。  
在撰写文章的时候，我们可以发现编辑框下面有一个 Custom Fields 的选项，我们可以在这里添加 post 的 meta 信息。  
    meta_id：自增唯一ID
    post_id：对应文章ID
    meta_key：键名
    meta_value：键值

### wp\_comments  

用户评论。除了评论的内容以外，还记录了评论用户的名字，邮箱，网址，浏览器类型等信息。比较重要的两个字段是 comment\_post\_ID 和 comment\_approved，前一个用来指示这条评论隶属于哪一篇文章，后一个用来记录审核状况。还有一个比较有意思的是这个 commnet\_agent 字段，我们可以利用这个字段来统计一下用户浏览器类型。

    comment_ID：自增唯一ID
    comment_post_ID：对应文章ID
    comment_author：评论者
    comment_author_email：评论者邮箱
    comment_author_url：评论者网址
    comment_author_IP：评论者IP
    comment_date：评论时间
    comment_date_gmt：评论时间（GMT+0时间）
    comment_content：评论正文
    comment_karma：未知
    comment_approved：评论是否被批准
    comment_agent：评论者的USER AGENT
    comment_type：评论类型(pingback/普通)
    comment_parent：父评论ID
    user_id：评论者用户ID（不一定存在）

### wp\_users  
用户帐号表。存储用户名、密码还有一些用户的基本信息。  

    ID：自增唯一ID
    user_login：登录名
    user_pass：密码
    user_nicename：昵称
    user_email：Email
    user_url：网址
    user_registered：注册时间
    user_activation_key：激活码
    user_status：用户状态
    display_name：显示名称

### wp\_usermeta  
类似上面的 wp\_postmeta，存储一些因人而异的用户信息。

    umeta_id：自增唯一ID
    user_id：对应用户ID
    meta_key：键名
    meta_value：键值

### wp\_options  
用来记录 WordPress 的一些设置和选项。里面有一个 blog\_id 字段，这个应该是用在 MU 版里面来标示不同的 Blog 的。  

    option_id：自增唯一ID
    blog_id：博客ID，用于多用户博客，默认0
    option_name：键名
    option_value：键值
    autoload：在WordPress载入时自动载入（yes/no）

### wp\_links  
用来存储友情链接Blogroll 里面的链接。  

    link_id：自增唯一ID
    link_url：链接URL
    link_name：链接标题
    link_image：链接图片
    link_target：链接打开方式
    link_description：链接描述
    link_visible：是否可见（Y/N）
    link_owner：添加者用户ID
    link_rating：评分等级
    link_updated：未知
    link_rel：XFN关系
    link_notes：XFN注释
    link_rss：链接RSS地址

### wp\_terms , wp\_term\_relationships, wp\_term\_taxonomy  

这三个表是这里面关系最复杂的了，在 WordPress 2.2 及以前的版本中是没有这三个表的，代之的是 wp\_categories、wp\_post2cat 和 wp\_link2cat 这三个表。对比这两个版本我们可以发现：在 2.2 版和之前的版本，post 和 link 和 category 的关系都是通过各自单独的表来记录的。而在 2.3 版中加入了 tag 的支持，Wordpress 把 post、link、tag 的分类都抽象成了统一的形式，用新的三个表来记录这些信息。  
### wp\_terms  
记录分类，链接分类，标签的一些简要信息，包括名称，缩写。  
    term_id：分类ID
    name：分类名
    slug：缩略名
    term_group：未知

### wp\_term\_taxonomy  
是对wp\_terms中的信息的关系信息补充，有所属类型（category,link\_category,tag），详细描述，父类，所拥有文章（链接）数量。  

    term_taxonomy_id：分类方法ID
    term_id：taxonomy：分类方法(category/post_tag)
    description：未知
    parent：所属父分类方法ID
    count：文章数统计

### wp\_term\_relationships  
关系表，多对多的，object\_id是与不同的对象关联，例如wp\_posts中的ID（wp\_links中的link\_id）等，term\_taxonomy\_id就是关联wp\_term\_taxonomy中的term\_taxonomy\_id。

    object_id：对应文章ID/链接ID
    term_taxonomy_id：对应分类方法ID
    term_order：排序

----

markdown @tsingchan 


