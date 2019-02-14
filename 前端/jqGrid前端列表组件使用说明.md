## jqGrid前端列表组件使用说明

### 目录

- [jqGrid前端列表组件使用说明](#jqgrid前端列表组件使用说明)
    - [前言：](#前言)
        - [列表表格常用场景：](#列表表格常用场景)
        - [列表一般具备哪些功能：](#列表一般具备哪些功能)
        - [随便一说：](#随便一说)
        - [为什么要迅速？](#为什么要迅速)
        - [如何迅速？](#如何迅速)
    - [1、jqGrid是什么，能做什么](#1jqgrid是什么能做什么)
    - [2、jqGrid原理&嵌入项目](#2jqgrid原理嵌入项目)
    - [3、jqGrid|初始化|参数](#3jqgrid初始化参数)
    - [4、数据传输结构定义jsonReader](#4数据传输结构定义jsonreader)
    - [5、colModel 参数](#5colmodel-参数)
    - [6、操作导航及翻页工具栏](#6操作导航及翻页工具栏)
    - [7、自定义操作](#7自定义操作)
    - [8、前端更新列数据](#8前端更新列数据)
    - [9、服务端涉及的代码](#9服务端涉及的代码)
    - [参考](#参考)


### 前言： ###

#### 列表表格常用场景： ####
列表表格是后台服务甚至部分前台服务都会高频运用到的功能模块。
只要有数据库的地方基本都能用到。

#### 列表一般具备哪些功能： ####
数据展示、翻页、排序、查询、删除、修改、增加、自定义操作等

#### 随便一说： ####
*互联网从PC端发展到移动端，还有蠢蠢欲动的物联网，他们背后都有服务器强有力的默默支持，不论输出任何协议格式的数据，趋势是前端WEB+移动，后端Linux+开源，万众创新的今天，老板要求快速部署、快速实现、内容优质、高大帅气产品，PHP成为万众服务端语言首选；如同一个帅气的才子，咱们负责迅速有才，前端工程师们负责光鲜帅气；当然你也许是有才还帅气。*

#### 为什么要迅速？ ####
一个产品除了客户能看到的产品前端外，成熟可用的产品少不了内部灵活可用的管理后台。
那客户看得到的需求是轻重缓急中重要紧急的，所以我们应该利用尽量少的时间完成尽量好的管理后台。

服务端做一个功能模块，大体包含以下小功能：
数据列表、翻页、排序、查询、删除、修改、增加、自定义操作等
而且管理后台其他功能需要用到他们，对于开发来说批量流水组件化，对我们的青春是更有价值的，对公司来说一定时间内的产出率更高；

#### 如何迅速？ ####
以下介绍jqGrid前端组件，可能你有了解过，但可能以前有设计要求和美工要求，导致你没去用他，毕竟成熟组件不宜自定义改动组件框架。

### 1、jqGrid是什么，能做什么 ###
快速搭建包含数据列表展示、分页、排序、查询、增加、修改、删除与一整个页面的组件。
方便后端快速完成增删改查重复性的功能。
jqGrid提供能快速、稳定、靠谱的组件功能。

[图1][图2]【列表图示】


### 2、jqGrid原理&嵌入项目 ###
> jqGrid是典型的B/S架构，服务器端只是提供数据管理，客户端只提供数据显示。换句话说，jqGrid可以以一种更加简单的方式来展现你数据库的信息，而且也可以把客户端数据传回给服务器端。

对于jqGrid我们所关心的就是：必须有一段代码把一些页面信息保存到数据库中，而且也能够把响应信息返回给客户端。jqGrid是用ajax来实现对请求与响应的处理。

jqGrid嵌入项目很简单，只需把相应的css、js文件加入到页面中即可。

	<link rel="stylesheet" href="/Public/css/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" href="/Public/css/ui.jqGrid.css" />
	
	<script src="/Public/js/jqGrid/jquery.jqGrid.min.js"></script>
	<script src="/Public/js/jqGrid/i18n/grid.locale-zh.js"></script>

当然前提也需要jquery。

### 3、jqGrid|初始化|参数 ###
根据jqGrid的文档，要想生成一个jqGrid，最直接的方法就是：

	$("#grid-table").jqGrid(options);

Options：就是生成的表格一些属性赋值，用定规则赋值的方式，由jqGrid读取规则渲染表格；
其中list是页面上的一个table：

	<table id="grid-table"></table>

**示例代码**

	jQuery("#grid-table").jqGrid({
	        //direction: "rtl",
	        jsonReader: {
	                root: "rows",
	                page: "currpage",
	                total: "totalpages",
	                records: "totalrecords",
	                repeatitems: false,
	                id: "0",
	                userdata: "userdata"
	
	        },
	        //data: grid_data,
	        mtype: "POST",
	        url: "/wx/au/getListData",
	        editurl: "/wx/au/operation",
	        datatype: "json",
	        colNames: ['ID','父节点', '名称', '链接',"状态","创建时间", '更新时间', '操作'],
	        colModel: [
	                {name: 'id', index: 'id', width: 60, sortable: true, editable: false},
	                {name: 'pid', index: 'pid', width: 60, sortable: true, editable: true,stype:"select",searchoptions:{value:getSelectData("pid")},edittype:"select",editoptions:{value:getSelectData("pid")}},
	                {name: 'title', index: 'title', width: 60, sortable: false, editable: true,editrules:{required:true}},
	                {name: 'name', index: 'name', width: 60, sortable: true, editable: true,editrules:{required:true}},
	                {name: 'status', index: 'status', width: 60, sortable: false, editable: true,stype:"select",searchoptions:{value:getSelectData("status")},edittype:"select",editoptions:{value:getSelectData("status")},editrules:{required:true},formatter:'select'},
	                {name: 'create_time', index: 'create_time',width: 60, sortable: true, editable: false,formatter:"date",
	                        formatoptions:{srcformat:'u',newformat:"Y-m-d H:i:s"}},
	                {name: 'update_time', index: 'update_time',width: 60, sortable: true, editable: false,formatter:"date",
	                        formatoptions:{srcformat:'u',newformat:"Y-m-d H:i:s"}},
	                {name: 'myac', index: '', width: 80, fixed: true, sortable: false, resize: true, search: false,
	                        formatter: myacFormatter
	                }
	        ],
	        viewrecords: true,
	        rowNum: 25,
	        rowList: [25, 50,100],
	        pager: pager_selector,
	        altRows: true,                
	        multiselect: true,
	        //multikey: "ctrlKey",
	        multiboxonly: true,
	        loadComplete : function(res) {
	                if(res.status == 0){
						alert(“warinning”);
	                }
	                var table = this;               
	        },
	        loadtext: "数据加载中...",
	        caption: "xxx列表",
	        autowidth: true,
	        height: "100%"
	});

### 4、数据传输结构定义jsonReader ###
一般要展示的数据来自于服务端，那服务端要下发什么格式的数据，前端的jqGrid才懂得解析呢？
jqGrid可支持的数据类型：xml、json、jsonp、local or clientSide、xmlstring、jsonstring 、script、function (…)。

需要定义jsonReader跟服务端返回的数据结构。

jsonReader属性说明：

	属性			备注
	total		总页数
	page		当前页
	records		查询出的记录数
	rows		包含实际数据的数组
	id			行id
	cell		当前行的所有单元格
	repeatitems	是否允许数据重复

比如常用：

	jsonReader: {        
	        page: "currpage",
	        total: "totalpages",
	        records: "totalrecords",
	        repeatitems: false,
	        id: "0",
	        userdata: "userdata"
	}

**服务器返回示例：**

	{
	    "currpage": "1",
	    "totalpages": 1,
	    "totalrecords": "2",
	    "rows": [
	        {
	            "id": "1",
	            "pid": "0",
	            "name": "wx/Admin",
	            "title": "xx模块1",
	            "status": "1",
	            "type": "1",   
				"create_time": "1472116719",
	            "update_time": "1472189457"
	        },
	        {
	            "id": "2",
	            "pid": "0",
	            "name": "wx/User",
	            "title": "xx模块2",
	            "status": "1",
	            "type": "1",
	            "create_time": "1472116719",
	            "update_time": "1472189457"			
	        }
	    ]
		"userdata":[{...},{...}]
	}


用户数据（user data） 在某些情况下，我们需要从服务器端返回一些参数但并不想直接把他们显示到表格中，而是想在别的地方显示，那么我们就需要用到userdata标签。
在客户端我们可以有下面两种方法得到这些额外信息：

	1、jQuery("grid_id").getGridParam('userData') 
	2、Query("grid_id").getUserData()
	3、jQuery("grid_id").getUserDataItem( key )


### 5、colModel 参数 ###
上面我们定义了读取服务端下发数据结构了，那接下来就是要定义前端组件如何展示这些返回的数据。colModel参数设置负责格式化这些数据。

colModel的参数很多，需要一一去看，那具体在colModel参数设置能实现什么功能效果呢？
可以设置表格每一列的title、可以设置搜索或排序时的参数名、可以设置列宽度、可以设置是否可以排序、是否可编辑、可设置是否下拉框、可设置下拉框值来源、可根据实际情况格式化显示值等等。

colModel也有许多非常重要的选项，在使用搜索、排序等方面都会用到。这里列举一些基础常用的字段参数：

	name ：		为Grid中的每个列设置唯一的名称，这是一个必需选项，其中保留字包括	subgrid、cb、rn。
	index ：		设置排序时所使用的索引名称，这个index名称会作为sidx参数（prmNames	中设置的）传递到Server。
	label ：		当jqGrid的colNames选项数组为空时，为各列指定题头。如果colNames和	此项都为空时，则name选项值会成为题头。
	width ：		设置列的宽度，目前只能接受以px为单位的数值，默认为150。
	editable：	单元格是否可编辑
	edittype：	可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.
	editoptions：编辑的一系列选项。
	editrules：	编辑的规则{name:’age’,index:’age’, width:90,editable:true,editrules:{edithidden:true,required:true,number:true,minValue:10,maxValue:100}},设定年龄的最大值为100，最小值为10，而且为数字类型，并且为必输字段。
	sortable ：	设置该列是否可以排序，默认为true。
	search ：	设置该列是否可以被列为搜索条件，默认为true。
	resizable ：	设置列是否可以变更尺寸，默认为true。
	hidden ：	设置此列初始化时是否为隐藏状态，默认为false。
	formatter ：	预设类型或用来格式化该列的自定义函数名。常用预设格式有：integer、date、currency、number等（具体参见文档 ）。

**实际开发中典型的下拉框实例：**

	{
	    name: 'status',
	    index: 'status',
	    width: 60,
	    sortable: true,
	    editable: false,
	    stype: "select",
	    searchoptions: {
	        value: getSelectData("status")
	    },
	    edittype: "select",
	    editoptions: {
	        value: getSelectData("status")
	    },
	    formatter: "select" //表示从以上定义的select的数据中获取对应的文本格式
	},

**定义获取value的函数：**

	var statusData = '';//避免一次加载多次请求相同数据
	var getSelectData = function (type) {
			return ":选择状态;1:开启;0:禁用";//这里我们直接把服务器返回的数据写死，这个格式是jqGrid要求的下拉框字符串格式
	        var data = '';
	        if(type== "status" && statusData!==""){
	                return statusData;
	        }
	        $.ajax({
	                type:"post",
	                url: "/xx/xx/getSelectData",
	                data:"type="+type,
	                async: false,
	                success: function (e) {
	                        if (e != null) {
	                               data = e;
	                               if(type=="status"){
	                                       statusData = data;
	                               }
	                        }
	                }
	        });
	        return data;
	}; 

### 6、操作导航及翻页工具栏 ###
以上基本完成了列表数据的展示与排序功能。我们还需要基本的翻页、查询、添加、修改、删除功能，我们把这些功能都集中放在操作导航与翻页工具栏上。

[新增品类][查询][编辑品类]

我们先来看以下有规则的代码：（忽略部分回调函数）

	jQuery(grid_selector).jqGrid('navGrid', ‘#grid-pager’,
    {
            //navbar options  这里可以设置编辑、添加、删除、搜索、刷新、查看功能按钮；后面每个object对应一个功能按钮设置，参数意思都很简明。
            edit: true,
            editicon: 'icon-pencil blue',
            add: true,
            addicon: 'icon-plus-sign purple',
            del: false,
            delicon: 'icon-trash red',
            search: true,
            searchicon: 'icon-search orange',
            refresh: true,
            refreshicon: 'icon-refresh green',
            view: true,
            viewicon: 'icon-zoom-in grey',
    },
    {
            //edit record form
            width: 500,
            //height:600,
            left: ($(window).width() - 500) / 2,
            top: ($(window).height()) / 4,
            editCaption: "编辑",
            bSubmit: "保存",
            bCancel: "取消",
            closeAfterEdit: true,
            recreateForm: true,
            beforeSubmit:fn_beforeEditSubmit,
            afterSubmit: fn_editSubmit,
            beforeShowForm: function (e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
                    style_edit_form(form);
            }
    },
    {
            //new record form
            width: 500,
            //height:600,
            left: ($(window).width() - 500) / 2,
            top: ($(window).height()) / 4,
            addCaption: "新增",
            bSubmit: "保存",
            bCancel: "取消",
            closeAfterAdd: true,
            recreateForm: true,
            viewPagerButtons: false,
            afterSubmit: fn_addSubmit,
            beforeShowForm: function (e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
                    style_edit_form(form);
            }
    },
    {
            //delete record form
            left: ($(window).width()) / 2,
            top: ($(window).height()) / 4,
            delCaption: "删除",
            bSubmit: "删除",
            bCancel: "取消",
            closeAfterDel: true,
            recreateForm: true,
            afterSubmit: fn_delSubmit,
            beforeShowForm: function (e) {
                    var form = $(e[0]);
                    if (form.data('styled'))
                            return false;
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
                    style_delete_form(form);
                    form.data('styled', true);
            },
            onClick: function (e) {
                    alert(1);
            }
    },
    {
            //search form
            width: 500,
            //height:600,
            left: ($(window).width() - 500) / 2,
            top: ($(window).height()) / 4,
            recreateForm: true,
            closeAfterSearch: true,
            sopt: ['eq', 'ne', 'lt', 'le', 'gt', 'ge', 'bw', 'bn', 'in', 'ni', 'ew', 'en', 'cn', 'nc'],
            afterShowSearch: function (e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
                    style_search_form(form);
            },
            afterRedraw: function () {
                    style_search_filters($(this));
            },
            multipleSearch: true,
            /**
             multipleGroup:true,
             showQuery: true
             */
    },
    {
            //view record form
            width: 500,
            //height:600,
            left: ($(window).width() - 500) / 2,
            top: ($(window).height()) / 4,
            recreateForm: true,
            beforeShowForm: function (e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
                    $("#trv_myac").remove();
            },
    }
);		

### 7、自定义操作 ###
有时我们需要在每一行最后一列加个操作按钮，比如重置、开启等小功能按钮，这个时候我们就可以使用到自定义操作按钮。

[自定义操作按钮]

我们在colModel中定义一列，这一列特殊在name不是下发数据中的key，formatter定义了这一列的显示。

	{name: 'myac', index: '', width: 80, fixed: true, sortable: false, resize: true, search: false,
	        formatter: myacFormatter
	}

定义操作函数：

	var myacFormatter = function(cellvalue,options,rowObject){        
	        var openBtn = '<button class="btn-success" onclick="openMe('+ rowObject.id + ',' + rowObject.pid + ',\'' + rowObject.status + '\')">开启</button>';        
	        return openBtn;
	};		

> 注：formatter回调函数中参数rowObject为一行的记录object，可以获取一行中的所有数据。

### 8、前端更新列数据 ###

	var openMe = function (id,pid,status){
	  if(confirm("确定开启吗")){
	        $.ajax({
	                type:'post',
	                url:"/wx/xx/openMe",
	                data:"id="+id+"&pid="+pid+"&status="+status,
	                dataType:'json',
	                success:function(res){
	                        if(1 === res.status){
									//调用setRowData去更新当前行中status字段数据为0，如果status列设置的formatter为select，那么页面会显示0对应的文本格式比如关闭。
	                                jQuery(grid_selector).jqGrid('setRowData', id, {
	                                      status : 0
	                                });                       
									console.log("success");                                
									return true;
	                        }else{
									console.log("fail");                                
									return false;
	                        }
	                }
	        });
	  }          
	return [true,""];        
	};

### 9、服务端涉及的代码 ###
以下代码基于php框架thinkphp编码。
    /**
     * 页面展示
     */
    public function index() {
		//按你的方式显示页面
        $this->display("index");
    }

    /**
     * 获取列表数据
     */
    public function getListData() {
        $page = I("get.page", 1);
        $rows = I("get.rows", 10);
        $sidx = I("get.sidx", 'create_time');
        $sord = I("get.sord", 'desc');
        $where = $this->getSearchCondition();        
        
        if (empty($sidx) || empty($sord)) {
            $sidx = "create_time";
            $sord = "desc";
        }
        $order = array($sidx => $sord);
		
		$authuserModel = new Model\AuthuserModel();	//从model中获取多条数据，各个框架使用方式大体相同，本例适用thinkphp。
        $res = $authuserModel->getPage($where, $field, $page, $rows, $order);             
        echo json_encode($res, TRUE);
        exit;
    }

    /**
     * 操作分发入口
     */
    public function operation() {
        $oper = I("post.oper", null);
        if (!empty($oper)) {
            switch ($oper) {
                case 'add':
                    $this->toAdd();
                    break;
                case 'edit':
                    $this->toEdit();
                    break;
                case 'del':
                    $this->ajaxError("未完善" . I("post.oper") . "操作");
                    $this->toDelete();
                    break;
                default:
                    $this->ajaxError("未完善" . I("post.oper") . "操作");
                    exit;
                    break;
            }
        }
    }

	/**
     * 获取分页数据
     * 注意：where条件可能需要进一步扩展复杂查询，增加condition；注意相关字段的索引；
     * @param array $where
     * @param string $field *表示查询所有字段
     * @param int $page 当前页码
     * @param int $rows 每页记录数
     * @param array $order 排序信息  array("a"=>"desc",'b'=>'asc','c') 默认asc
     * @return array
     */
    public function getPage($where = array(), $field = "*", $page = 1, $rows = 10, $order = array("create_time" => "desc")) {
        $model = M("db_tablename");
        $count = $model->where($where)->count();

        $totalPage = ceil($count / $rows);
        $limitString = implode(',', $this->getPageLimit($page, $rows));
        $list = $model->where($where)->field($field)->order($order)->limit($limitString)->select();
        return array(
            "currpage" => $page,
            "totalpages" => $totalPage,
            "totalrecords" => $count,
            "rows" => $list
        );
    }

    /**
     * 组合所有查询条件
	 * 解析所有jqGrid前端发送的查询条件规则，对应当前框架对应model的查询规则（本例适用thinkphp）,可以根据你实际使用数据库操作
     * @return array
     */
    protected function getSearchCondition() {
        //filters:{"groupOp":"OR","rules":[{"field":"id","op":"eq","data":"1"},{"field":"category_id","op":"ne","data":"123"}]}
        //_search:true
        $condition = array();
        if (I("param._search", '')) {
            $filters = I("param.filters", '', 'htmlspecialchars_decode');
            if (!empty($filters)) {
                $filters = json_decode($filters, true);
                if (in_array($filters['groupOp'], array('AND', 'OR'))) {
                    $condition['_logic'] = $filters['groupOp'];
                    $rules = $filters['rules'];
                    foreach ($rules as $one) {
                        if (!empty($condition[$one['field']])) {
                            //相同字段至少有2个条件以上
                            if (is_array($condition[$one['field']][0])) {
                                $condition[$one['field']][] = $this->getOneCondition($one['op'], $one['data']);
                            } else {
                                //相同字段已经有一个条件
                                $tmpArray = $condition[$one['field']];
                                unset($condition[$one['field']]);
                                $condition[$one['field']][] = $tmpArray;
                                $condition[$one['field']][] = $this->getOneCondition($one['op'], $one['data']);
                            }
                        } else {
                            //相同字段的第一个条件
                            $condition[$one['field']] = $this->getOneCondition($one['op'], $one['data']);
                        }
                    }
                }
            }
        }
        return $condition;
    }
	
   	/**
     * 组合最小查询条件
     * @param string $op and or
     * @param strig $data search string
     * @return array
     */
    protected function getOneCondition($op, $data) {
        $opMap = array(
            "eq" => 'eq', "ne" => "neq", 'lt' => 'lt', 'le' => 'elt', 'gt' => 'gt', 'ge' => 'egt', 'bw' => 'like',
            'bn' => 'notlike', 'ew' => 'like', 'en' => 'notlike', 'in' => 'in', 'ni' => 'not in', 'cn' => 'like', 'nc' => 'notlike'
        );
        switch ($op) {
            case 'bw':
            case 'bn':
                $data = $data . "%";
                break;
            case 'ew':
            case 'en':
                $data = "%" . $data;
                break;
            case 'cn':
            case 'nc':
                $data = "%" . $data . "%";
                break;
            default:
                break;
        }
        return array($opMap[$op], $data);
    }	



### 参考 ###
http://blog.mn886.net/jqGrid/

----
@tsingchan