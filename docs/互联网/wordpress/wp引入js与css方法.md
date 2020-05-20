<!-- TOC -->

- [在前台加载css/js](#在前台加载cssjs)
- [什么时需要先注册css/js](#什么时需要先注册cssjs)
- [在WordPress登录页面加载](#在wordpress登录页面加载)
- [在后台全局加载](#在后台全局加载)
- [在后台按需加载](#在后台按需加载)

<!-- /TOC -->
  
WordPress引入css/js方法很多，条件很多。如何全局加载，或仅在某些页面精准加载，什么时候需要先注册脚本再加载，本文希望找到最简单的方式，并给出探索更多方法的途径。



### 在前台加载css/js

用**wp\_enqueue\_script()** 函数加载js，用**wp\_enqueue\_style()** 加载css，加载资源的位置（action）只有一个——**wp\_enqueue\_scripts** 。

用wp\_enqueue\_系列函数可以更好的处理脚本样式表的依赖关系，防止重复加载，以twentyfifteen主题为例。

```
function twentyfifteen_scripts() {
	
	//全局加载一般的样式表
	wp_enqueue_style( 'genericons', get_template_directory_uri() . '/genericons/genericons.css', array(), '3.2' );

	//全局加载主样式表
	wp_enqueue_style( 'twentyfifteen-style', get_stylesheet_uri() );

	//全局加载仅用于IE的样式表
	wp_enqueue_style( 'twentyfifteen-ie', get_template_directory_uri() . '/css/ie.css', array( 'twentyfifteen-style' ), '20141010' );
	wp_style_add_data( 'twentyfifteen-ie', 'conditional', 'lt IE 9' );

	//全局加载js脚本
	wp_enqueue_script( 'twentyfifteen-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20141212', true );
	
	//给js脚本传递变量，解决脚本中不能调用php的问题
	wp_localize_script( 'twentyfifteen-script', 'screenReaderText', array(
		'expand'   => '<span class="screen-reader-text">' . __( 'expand child menu', 'twentyfifteen' ) . '</span>',
		'collapse' => '<span class="screen-reader-text">' . __( 'collapse child menu', 'twentyfifteen' ) . '</span>',
	) );
}
add_action( 'wp_enqueue_scripts', 'twentyfifteen_scripts' );

```
若仅在某些页面加载，利用WordPress的[Conditional Tags](https://codex.wordpress.org/Conditional_Tags)即可。

### 什么时需要先注册css/js

即何时需要使用**wp\_register\_script()** 和**wp\_register\_style()** 函数。

当css/js很多，并且要分情况加载时，使用wp\_register\_script()可以更好的管理资源，避免重复劳动。下面的示例代码中，先在init action上把所有需要用到样式表都注册一遍，之后不管想在哪里引入，都可以简单的用wp\_enqueue\_style( $handle )来加载。

```
// 在init action处注册脚本，可以与其它逻辑代码放在一起
function my_init(){
	$url = get_template_directory_uri();
	// 注册样式表
	$styles = array(
		'style1' => $url . '/css/style1.css',
		'style2' => $url . '/css/style2.css',
		'style3' => $url . '/css/style3.css'
	);

	foreach( $styles as $k => $v ){
		wp_register_style( $k, $v, false ); 
	}

	// 注册脚本
	
	// 其它需要在init action处运行的脚本
}
add_action( 'init', 'my_init' );

```
注册脚本时需要运行$wp\_scripts->add( $handle, $src, $deps, $ver );，若脚本没有注册直接使用wp\_enqueue\_script，需要先调用add方法，也就是说重复enqueue一个脚本就会运行多次add方法，降低了程序的效率。

### 在WordPress登录页面加载

将action替换为**login\_enqueue\_scripts** 即可，例如

```
function enqueue_for_login(){
	wp_enqueue_style( 'core', 'style.css', false );
	wp_enqueue_script( 'my-js', 'filename.js', false );
}
add_action( 'login_enqueue_scripts', 'enqueue_for_login' );

```
如果想了解其它方式，可以仔细阅读wp-login.php。

### 在后台全局加载

同理，将action改为**admin\_enqueue\_scripts**

```
function my_enqueue() {
    wp_enqueue_script( 'my_custom_script', plugin_dir_url( __FILE__ ) . 'myscript.js' );
}
add_action( 'admin_enqueue_scripts', 'my_enqueue' );

```
想了解更多方法，请阅读wp-admin/admin-header.php。

### 在后台按需加载

仅用于后台某些页面的资源只在这些页面加载就好，不要到处使用，可以减少不必要的冲突。

**1. $hook\_suffix**

首先我们可以根据admin\_enqueue\_scripts这个action传递的$hook\_suffix参数来判断所处的页面，例如仅在edit.php加载，代码如下

```
function my_enqueue( $hook_suffix ) {
    if ( 'edit.php' == $hook_suffix ) {
       wp_enqueue_script( 'my_custom_script', plugin_dir_url( __FILE__ ) . 'myscript.js' );
    }    
}
add_action( 'admin_enqueue_scripts', 'my_enqueue' );

```
edit.php就是post、page或者custom post type的列表页面，编辑页面是post.php，新建页面是post-new.php，可以在不同页面打印$hook\_suffix来了解它的使用方法。但由此也可看出它不能区分现在是在哪种post页面，需要借助更多的全局变量来判断。

**2. $typenow**

全局变量**$typenow** 可以告诉我们当前的post type，例如仅在post的列表页面加载可以这样来判断

```
function my_enqueue( $hook_suffix ) {
	global $typenow;
	if ( 'edit.php' == $hook_suffix && $typenow == 'post' ) {
	   wp_enqueue_script( 'my_custom_script', plugin_dir_url( __FILE__ ) . 'myscript.js' );
	}    
}
add_action( 'admin_enqueue_scripts', 'my_enqueue' );

```
**3. get\_current\_screen()**

上述两个全局变量可以区分大多数情况，若区分不了，可以试试使用get\_current\_screen()函数，该函数返回当前页面的post type、ID、base等信息，只能在admin\_init之后使用，具体可以参考官方文档。

**4. $pagenow**

全局变量$pagenow的返回值与$hook\_suffix类似，只是它在前台后台都可以访问，定义的更早，例如前三者在admin\_init处没有值，但$pagenow却有。

它定义在wp-includes/vars.php中，该文件还定义了浏览器、服务器全局变量，例如$is\_winIE、$is\_apache，wp\_is\_mobile()函数也在这里出现。

上述全局变量和函数能区分大多数情况，但依然有无力的时候，这时可以借助$\_REQUEST来判断。上述变量的值也是从$\_REQUEST获取，但多一层值是否存在的检查，所以能用它们解决的就不要用$\_REQUEST或者$\_GET。

----

markdown @tsingchan 
