Django 开发相关知识整理
=============================

  
- [前言](#%E7%9B%AE%E5%BD%95)
- [前端ajax](#%E5%89%8D%E7%AB%AFajax)
  - [HTTP请求头](#HTTP%E8%AF%B7%E6%B1%82%E5%A4%B4)
  - [ajax上传文件](#ajax%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6)
  - [jsonp跨域](#jsonp%E8%B7%A8%E5%9F%9F)
- [URL](#URL)
  - [设计](#%E8%AE%BE%E8%AE%A1)
  - [分发](#%E5%88%86%E5%8F%91)
  - [url参数编码](#url%E5%8F%82%E6%95%B0%E7%BC%96%E7%A0%81)
  - [反向生成url](#%E5%8F%8D%E5%90%91%E7%94%9F%E6%88%90url)
- [视图](#%E8%A7%86%E5%9B%BE)
  - [request对象](#request%E5%AF%B9%E8%B1%A1)
      - [POST](#POST)
      - [url信息](#url%E4%BF%A1%E6%81%AF)
  - [视图返回值](#%E8%A7%86%E5%9B%BE%E8%BF%94%E5%9B%9E%E5%80%BC)
      - [HttpResponse](#HttpResponse)
      - [JsonResponse](#JsonResponse)
      - [shortcuts](#JsonResponse)
      - [返回值响应头和状态设置](#%E8%BF%94%E5%9B%9E%E5%80%BC%E5%93%8D%E5%BA%94%E5%A4%B4%E5%92%8C%E7%8A%B6%E6%80%81%E8%AE%BE%E7%BD%AE)
  - [CBV](#CBV)
  - [cookie与session](#cookie%E4%B8%8Esession)
  - [自定义404页面](#%E8%87%AA%E5%AE%9A%E4%B9%89404%E9%A1%B5%E9%9D%A2)
- [ORM](#ORM)
  - [字段](#%E5%AD%97%E6%AE%B5)
  - [查询](#%E6%9F%A5%E8%AF%A2)
      - [管理器自带api](#%E7%AE%A1%E7%90%86%E5%99%A8%E8%87%AA%E5%B8%A6api)
      - [django提供api（get\_object\_or\_404 与 get\_list\_or\_404）](#django%E6%8F%90%E4%BE%9Bapi%EF%BC%88get_object_or_404%20%E4%B8%8E%20get_list_or_404%EF%BC%89)
      - [原生查询](#%E5%8E%9F%E7%94%9F%E6%9F%A5%E8%AF%A2)
      - [连表查询](#%E8%BF%9E%E8%A1%A8%E6%9F%A5%E8%AF%A2)
  - [用于查询的对象](#%E7%94%A8%E4%BA%8E%E6%9F%A5%E8%AF%A2%E7%9A%84%E5%AF%B9%E8%B1%A1)
      - [Q对象](#Q%E5%AF%B9%E8%B1%A1)
      - [F对象](#F%E5%AF%B9%E8%B1%A1)
  - [序列化](#%E5%BA%8F%E5%88%97%E5%8C%96)
  - [自定义Manager](#%E8%87%AA%E5%AE%9A%E4%B9%89Manager)
  - [模型继承](#%E6%A8%A1%E5%9E%8B%E7%BB%A7%E6%89%BF)
  - [数据库事务](#%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%8B%E5%8A%A1)
  - [资源共享问题](#%E8%B5%84%E6%BA%90%E5%85%B1%E4%BA%AB%E9%97%AE%E9%A2%98)
  - [分库](#%E5%88%86%E5%BA%93)
      - [分库的方法](#%E5%88%86%E5%BA%93%E7%9A%84%E6%96%B9%E6%B3%95)
      - [分库的思路](#%E5%88%86%E5%BA%93%E7%9A%84%E6%80%9D%E8%B7%AF)
- [模版](#%E6%A8%A1%E7%89%88)
  - [内置过滤器](#%E5%86%85%E7%BD%AE%E8%BF%87%E6%BB%A4%E5%99%A8)
  - [自定义过滤器](#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%BB%A4%E5%99%A8)
  - [自定义simple\_tag](#%E8%87%AA%E5%AE%9A%E4%B9%89simple_tag)
  - [页面分离与导入](#%E9%A1%B5%E9%9D%A2%E5%88%86%E7%A6%BB%E4%B8%8E%E5%AF%BC%E5%85%A5)
- [settings.py配置](#settings.py%E9%85%8D%E7%BD%AE)
  - [多个setting文件](#%E5%A4%9A%E4%B8%AAsetting%E6%96%87%E4%BB%B6)
  - [静态文件与上传文件配置](#%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6%E4%B8%8E%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E9%85%8D%E7%BD%AE)
  - [日志配置](#%E6%97%A5%E5%BF%97%E9%85%8D%E7%BD%AE)
  - [sql查询语句显示配置](#sql%E6%9F%A5%E8%AF%A2%E8%AF%AD%E5%8F%A5%E6%98%BE%E7%A4%BA%E9%85%8D%E7%BD%AE)
- [django内置组件](#django%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6)
  - [Form组件](#Form%E7%BB%84%E4%BB%B6)
      - [验证器](#%E9%AA%8C%E8%AF%81%E5%99%A8)
  - [缓存](#%E7%BC%93%E5%AD%98)
  - [中间件](#%E4%B8%AD%E9%97%B4%E4%BB%B6)
  - [异常](#%E5%BC%82%E5%B8%B8)
  - [脚本运行环境配置](#%E8%84%9A%E6%9C%AC%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)
  - [APP](#APP)
      - [ready方法](#ready%E6%96%B9%E6%B3%95)
      - [app设计](#app%E8%AE%BE%E8%AE%A1)
  - [信号](#%E4%BF%A1%E5%8F%B7)
  - [时区](#%E6%97%B6%E5%8C%BA)
  - [闪现](#%E9%97%AA%E7%8E%B0)
  - [csrf](#csrf)
  - [auth组件](#auth%E7%BB%84%E4%BB%B6)
  - [admin](#admin)
  - [邮件](#%E9%82%AE%E4%BB%B6)
- [第三方库](#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93)
  - [二级域名组件(django-hosts)](#%E4%BA%8C%E7%BA%A7%E5%9F%9F%E5%90%8D%E7%BB%84%E4%BB%B6(django-hosts))
  - [cors跨域处理包(django-cors-headers)](#cors%E8%B7%A8%E5%9F%9F%E5%A4%84%E7%90%86%E5%8C%85(django-cors-headers))
  - [调试工具(django-pdb)](#%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7(django-pdb))
  - [redis(django-redis)](#redis(django-redis))
  - [celery(django-celery)](#celery(django-celery))
  - [验证码(django-simple-captcha)](#%E9%AA%8C%E8%AF%81%E7%A0%81(django-simple-captcha))
  - [第三方分页组件(django-pure-pagination)](#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%88%86%E9%A1%B5%E7%BB%84%E4%BB%B6(django-pure-pagination))
  - [富文本编辑器(DjangoUeditor)](#%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8(DjangoUeditor))
  - [xadmin](#xadmin)
  - [支付宝](#%E6%94%AF%E4%BB%98%E5%AE%9D)
- [开发环境](#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)[  ](#Django%E6%8E%A8%E8%8D%90%E9%A1%B9%E7%9B%AE%E5%B8%83%E5%B1%80)
  - [pip](#pip)
  - [虚拟环境](#%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83)
  - [pycharm断点调试](#pycharm%E6%96%AD%E7%82%B9%E8%B0%83%E8%AF%95)
  - [Django推荐项目布局](#Django%E6%8E%A8%E8%8D%90%E9%A1%B9%E7%9B%AE%E5%B8%83%E5%B1%80)
- [生产环境](#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83)
  - [uWSGI](#uWSGI)
  - [nginx](#nginx)
  - [部署流程](#%E9%83%A8%E7%BD%B2%E6%B5%81%E7%A8%8B)
  - [通过supervisor管理进程](#%E9%80%9A%E8%BF%87supervisor%E7%AE%A1%E7%90%86%E8%BF%9B%E7%A8%8B)
 


 



前言
==

旨在记录Django web常用的开发技术，帮助开发者更加快速开发

前端ajax
======

 [详细  ](https://www.cnblogs.com/liwenzhou/p/8718861.html)注意：post提交时，url对后缀一定要补齐'/'  
 ```
$.ajax({
  url: "/cookie_ajax/",
  type: "POST",
  data: {
    "username": "Q1mi",
    "password": 123456,
    "csrfmiddlewaretoken": $("[name = 'csrfmiddlewaretoken']").val()  // 使用jQuery取出csrfmiddlewaretoken的值，拼接到data中
  },
  success: function (data) {
    console.log(data);
  }
})
```
 

 

 ```
// 原生ajax，XMLHttpRequest     
    以下两函数功能一样。
         function Ajax1()
            {
                $.ajax({
                    url:'index.html',
                    type:'GET',
                    data:{'p':123},
                    success:function(arg){
                        console.log(arg);
                    }
                })
            }    
    
           
        function Ajax2()
            {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4){
                        //状态‘4’表示将服务器的返回的数据全部接收完毕
                        console.log(xhr.responseText);  //xhr.responseText表示服务器端返回的数据
                    }
                }
                xhr.open('GET','/index.html?p=123').  //GET请求只能将data数据写在url中
                xhr.send(null)
            }
        
        而POST请求而只要改动以下
        xhr.open('POST','/index.html') 
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset-UTF-8');  
　　　　　xhr.send('p=123')  
//send中字符串参数是post请求，而且必须带请求头，否则django不会解析，即request.POST会无数据，
//但是request.body中可以查看到数据确实发过去了。jquery的ajax已经帮我们封装好请求头了。并且可能有其他框架会指定要特有的请求头。
//注意，若前端使用Formdata封装数据(因为不需要头，jquery的ajax中也要做特殊处理），则不用请求头也可
```
 



HTTP请求头
-------

**首先理解一下HTTP协议**   
1.建立在tcp协议之上，属于应用层的协议  
2.我把它理解为一个规范的传输数据格式，即请求和响应（请求头\\r\\n\\r\\n请求体、响应头\\r\\n\\r\\n响应体）  
3.无状态，短链接（一次请求一次响应，然后断开链接）  
  
**常用请求头**

 ```
    content-type ：服务器端给客户端发送的数据类型
    accept ：服务器端告诉客户端要接收数据类型
    User-agent
    COOKIE
```
 

**django的request.POST里面有值要求有**   
1.请求头要求：  
如果请求头中的 Content-Type: application/x-www-form-urlencoded，request.POST中才有值,django会去request.body中解析数据  
2.数据格式要求：  
即使请求头中的 Content-Type为 application/x-www-form-urlencoded。request.POST也不一定有值，还要request.body要满足name=alex&age=18&gender=男 这种格式  
form表单提交默认的 Content-Type为 application/x-www-form-urlencoded  
  
**ajax可以序列化和定制请求头**

 ```
        // 默认：（和form表单一样的头）
        $.ajax({
            url:...
            type:POST,
            data:{name:alex,age=18} # 内部转化 name=alex&age=18&gender=男
        })
        
         // 情况二：（定制了请求头，Content-Type 不再是 application/x-www-form-urlencoded）
        $.ajax({
                url:...
                type:POST,
                headers:{'Content-Type':"application/json"}
                data:{name:alex,age=18} # 内部转化 name=alex&age=18&gender=男
            })
            # body有值；POST无
        //  情况三：（序列化，数据格式不满足，而且头也不满足）
            $.ajax({
                url:...
                type:POST,
                headers:{'Content-Type':"application/json"}
                data:JSON.stringfy({name:alex,age=18}) # {name:alex,age:18...}
            })
            // body有值；POST无
            // json.loads(request.body)
```
 

ajax上传文件
--------

使用ajax文件上传,ajax配置必须带以下参数  
1.processData:false  
2.contentType:false  
3.data必须是formData()

 ```
        // #avatar是文件上传按钮
          $('#avatar').click(function () {
                    if (!$('#avatar-img').val()) {
                        // $('#avatar-img').val() 是文件路径名
                        // $('#avatar-img')[0].files[0] 是文件对象，后台从request.FILES里取出就是它
                    }
                    var formData = new FormData();
                    formData.append('csrfmiddlewaretoken', $('[name = "csrfmiddlewaretoken"]').val());
                    formData.append('img', $('#avatar-img')[0].files[0]);
                    $.ajax({
                        url: '/account/upload_avatar/',
                        type: 'post',
                        processData: false,
                        contentType: false,
                        data: formData,
                        dataType: 'json',
                        success: function (data) {
                            console.log(typeof(data), data);
                        }
                    })
                });
```
 

jsonp跨域
-------

同源策略是检测网页js脚本是不是向同一个域的url发送请求,ajax刚好受到同源策略限制，而script标签则没有。  
而script标签的工作原理是向src指向的url发送GET请求，然后将请求到的数据包裹在标签里面。  
所以我们可以创建一个标签

    <script src=‘http://xxx.com/fuck'> <script>  

例如：  

    <script> egon </script>   

\#return HttpResponse('egon')  

但是，由于数据是直接被包裹在标签里面，相当于声明一个变量名，而js不支持所以报错  
所以常见的做法是，本地声明一个回调函数，jsonp返回该函数包裹的跨域数据字符串。  
例如：  
HttpResponse("func({'a':1,'b':2})")  
更深一层，我们可以通过传递GET参数告诉服务器毁掉函数，实现动态的返回指定包裹函数  
例如：127.0.0.1：9999?callback=myfunc

 ![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190104180732742-113996311.png)jquery版小技巧：不写JsonpCallback，这样做jquery会随机生成一串字符串作为callback函数名，这样jquery会直接将返回的数据取出作为success函数的参数  
视图：  
 HttpResponse("%s('%s')"%(callback,data))  
![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190104181010406-1277080.png)



URL
===

设计
--

**多个url对应一个视图**   
利用是‘子类’在前，‘父类’在后，多余的参数使用\*\*kwargs接收

 ```
url(r'^(?P<type>type_[1-3])', views.index),
url(r'^$', views.index),
```
 

**在URL传递搜索条件**   
一般是以GET参数传递，这个了解一下也好

 ```
# 该正则表示按标签或者日期或者种类过滤
url(r'^(?P<site>\w+)/(?P<condition>((tag)|(date)|(category))/(?P<val>\w+).html$',home.filter)
```
 

分发
--

url匹配有两种，一种是路径对视图，另一种则是分发  
**- url分发的格式**

```
url('^yuan',([],None,None))
```
 

正则对应不再是一个视图函数，而是一个元组。  
元组的第一个元素是列表，里面有多个url，一般url对象里面是路径对视图，但是你若喜欢可以再嵌套分发  
第二元素为App名，第三元素为名字空间  
![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190103222102103-1979358009.png)

url参数编码
-------

将空格等特殊字符编码，常用于处理GET传参的特别参数  
 ```
from django.utils.http import urlquote
def parse_filter_kwargs(kwargs):
    # kwargs: {'title':1,'price':12000}
    # return: title=1&price=12000
    l = []

    for k, v in kwargs.items():
        l.append('%s=%s' % (k, urlquote(v)))
    return '&'.join(l)
```
 

反向生成url
-------

视图

```
from django.core.urlresolvers import reverse
#kwargs参数接收 一个字典，代表命名正则的名 和 对应的值
    if kwargs:
            base_url = reverse('index', kwargs=kwargs)
        else:
            base_url = '/'
```
 

html  
```
# 默认版
url('all/(\d+).html$',home.index,name='index')
{%url "index" 1%}
# 在html中
reverse('index',kwargs=(1,)) # 在view中

# 命名正则版
url('all/(?<my_id>\d+).html$',home.index,name='index')
{%url "index" my_id=1%}

# 在html中：
reverse('index',kwargs={"my_id":1}) #在view中

# 命名空间的url反转
{% url 'org:org_list'%}
```
 

   
视图
==

request对象
---------

### POST

1. input 类型像checkbox这种多值的，要用values = request.POST.getlist('hobby',None)  
2. requst.body #请求体，若要去这里拿值时，一定是post方式进来的 

url信息

 ![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190103221044145-301551695.png)
 
视图返回值
-----

### HttpResponse

1. input 类型像checkbox这种多值的，要用values = request.POST.getlist('hobby',None)  
2. requst.body #请求体，若要去这里拿值时，一定是post方式进来的

### JsonRespone 

```
from django.http import JsonRespone
#注意：默认JsonRespone只能返回字典，若一定要返回列表，则需要加参数
    return JsonRespone([11,22,33],safe=False)
```
 

### shortcuts

 **- render**   
1.render的context参数可以传递locals()函数，将当前作用域所有的变量传递到模板里面去

 **- redirect**   
[详细](https://www.jianshu.com/p/3d99ddd5148f)  
1.redirect函数对于ajax提交没用  
2.redirect('/index') 和 redirect('index')的区别：前者跳转到127.0.0.1:8000/index，后者在现有url的网址后面追加index  
 例如：现访问的是127.0.0.1:8000/backend，追加为：127.0.0.1:8000/backend/index

### 返回值响应头和状态设置

 ```
# HttpResponse可以带几个参数：

"""

content: 返回的内容
content_type: 返回内容的类型
status

"""

def index(request):
　　　　return HttpResponse('<p>this is a test</p>', content_type="text/html", status="201")
```
 

**- 响应头设置**

 ```
　res = HttpRespone('xxxxx')
　res['Access-Control-Allow-Origin']='*'
　return res
```
 

CBV
---

 

**- 更好对代码复用** 例如：自定义cbv的login验证mixin

 ```
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View


class LoginRequiredMixin(object):
    @method_decorator(login_required(login_url='/url/'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(request, *args, **kwargs)


# 注意继承顺序
class CommentView(LoginRequiredMixin, View):
    pass
```
 

  

**- CBV装饰器使用**   
要在CBV视图中使用我们上面的check\_login装饰器，有以下三种方式：

1\. 加在CBV视图的get或post方法上

 ```
from django.utils.decorators import method_decorator

class HomeView(View):

    def dispatch(self, request, *args, **kwargs):
        return super(HomeView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        return render(request, "home.html")
    
    @method_decorator(check_login)
    def post(self, request):
        print("Home View POST method...")
        return redirect("/index/")
```
 

2\. 加在dispatch方法上，因为CBV中首先执行的就是dispatch方法，所以这么写相当于给get和post方法都加上了登录校验。

 ```
from django.utils.decorators import method_decorator

class HomeView(View):

    @method_decorator(check_login)
    def dispatch(self, request, *args, **kwargs):
        return super(HomeView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        return render(request, "home.html")

    def post(self, request):
        print("Home View POST method...")
        return redirect("/index/")
```
 

3\. 直接加在视图类上，但method\_decorator必须传 name 关键字参数，如果get方法和post方法都需要登录校验的话就写两个装饰器。

 ```
from django.utils.decorators import method_decorator

@method_decorator(check_login, name="get")
@method_decorator(check_login, name="post")
class HomeView(View):

    def dispatch(self, request, *args, **kwargs):
        return super(HomeView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        return render(request, "home.html")

    def post(self, request):
        print("Home View POST method...")
        return redirect("/index/")
```
 

cookie与session  
-----------------

 [详细](https://www.cnblogs.com/liwenzhou/p/8343243.html) 
 
```
# cookie
request.COOKIES.get('username111')
res = render(request,'index.html')
res.set_cookie('key',"value",max_age=10)  # 设置cookie, N秒后失效

#session
x = request.session['xx'] 
request.session['xx'] = 1
request.session.set_expiry(value)
        # * 如果value是个整数，session会在些秒数后失效。
        # * 如果value是个datatime或timedelta，session就会在这个时间后失效。
        # * 如果value是0,用户关闭浏览器session就会失效。
        # * 如果value是None,session会依赖全局session失效策略。
```
 

自定义404页面
--------

1.全局urls.py上

```
# 指明函数路径
handler404 = 'users.views.page_not_found'
```
 

2.编写函数

```
def page_not_found(request):
    from django.shortcuts import render_to_response
    response = render_to_response('404.html',{})
    response.status_code = 404
    return response
```
 

3.设置settings.py的DEBUG=false，ALLOW\_HOSTS=\['\*'\]  
4.注意：DEBUG=false之后，django的static静态文件处理会实现。所以，要跟处理media一样，自己编写url路由

```
url(r'^static/(?P<path>.*)$,serve,{"document_root":STATIC_ROOT})
```
 

ORM
===

[详细](https://www.cnblogs.com/liwenzhou/p/8660826.html) 

 ```
    # django setting里面的database的初始化命令
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'imoocc',
            'USER': 'imoocc',
            'PASSWORD': 'imoocccom',
            'HOST': '127.0.0.1',
            'PORT': '',
            'OPTIONS': {},
            'init_command': 'SET storage_engine=INNODB,'
                            'SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED, autocommit=1, names "utf8";',
        }
}
```


字段
--

**注意： 定义数据库字段时，小心那些冲突的关键字，例如date， datetime这些就不要取了**

**- obj.get\_xxx\_display可以显示将本来数据库存储的数字按照choice的定义转换为相应字符串**

 ```
status = models.IntegerField(choices=[(-1, '未处理'), (0, '待处理'), (1, '已处理')]）
　　# obj.get_status_choice
```
 

**- default参数可以传入一个无参函数，当对象创建时便会调用**

 ```
send_time = models.DateTimeFIeld(default=datetime.now)
```
 

**-一对一**

和ForeignKey类似，但是多了一个不能重复的约束  
OnetoOne常用于分表  
即当一张表的某一些字段查询的比较频繁，另外一些字段查询的不是特别频繁，把不怎么常用的字段 单独拿出来做成一张表 然后用过一对一关联起来，  
好处是既保证数据都完整的保存下来，又能保证大部分的检索更快

**- 多对多** 注意:ManytoMany 通常设置在正向查询多的那边 ****两种方式混合定义多对多****

 ```
# 如果有额外的字段的时候tags=models.ManyToManyField(
to='Tag',
through = 'Article2Tag',
through_fields = ('article','tag'),
) 
```
 

注意:使用此种方式创建多对多表的时候，没有 add() remove() 等方法  
即创建时候就需要直接使用第三张表

 ```
models.Author2Book.objects.get(author_id=1,book_id=1).delete()
```
 

**- 文件字段**   
 文件字段都设置了upload\_to参数，upload\_to指向的字符串，若存在'/'，则表示文件夹，若文件夹不存在则会自动创建  
例如：upload\_to = 'head'表示放在settings配置uploads文件下的head文件夹里面  
也可以指向一个函数，该函数返回一个动态的文件夹路径

```
# 例如：为每个用户创建一个指定的文件夹
def upload_to(instance, filename):
    import uuid
    filename = '%s-%s' % (str(uuid.uuid4())[:8], filename)
    return '/'.join(['head', instance.username, filename])
```
 

这个参数可以让django内部帮助我们处理文件上传，只要将数据库的文件字段指向文件对象即可

 ```
    UserInfo.objects.create(img=request.FILES)
    # 或者：
    username = form.cleaned_data['username']
            headImg = form.cleaned_data['headImg']
            #写入数据库
            user = User()
            user.username = username
            user.headImg = headImg
            user.save()
    
```
 

 

**upload\_to可以支持%Y%m表示年月，换句话说，他会自动将上传时间传入**  
```
image = models.ImageField(upload_to="courses/%Y/%m")
```
 
**- content-type** 

一般而言，表数量可以动态变化，表结构不能变化。注意表结构设计时，表结构不随着其有关系的表的数量增加而改变结构。有时候需要一个定义一个外键关联不同的表，就显得有点麻烦。  
为此，Django提供了ContentType，ContenType是django给我们写好的处理一张表关联混合类型外键的组件。所谓混合关联，指的是这个外键字段可能关联到不同的表  
 ```
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class Course(models.Model):
    """
    普通课程
    """
    title = models.CharField(max_length=32)
    # 不生成表列，仅用于反向查找
    price_policy_list = GenericRelation("PricePolicy")


# 用于反向查找的特殊字段（一个课程可以对应多个价格策略），由于不能用xxx_set。
# 注意：GenericRelation("PricePolicy")要定义在一对多的‘一’处
# course = models.Course.objects.filter(id=1).first()
# price_policys = course.price_policy_list.all() # 反向查找出课程所有的价格策略


class DegreeCourse(models.Model):
    """
    学位课程
    """
    title = models.CharField(max_length=32)

    price_policy_list = GenericRelation("PricePolicy")


class PricePolicy(models.Model):
    """
    价格策略
    """
    price = models.IntegerField()
    period = models.IntegerField()

    # ContentType是django生成一张管理所有表的表，会自动将所有表的名称存进去进行管理
    content_type = models.ForeignKey(ContentType, verbose_name='关联的表')  #
    object_id = models.IntegerField(verbose_name='关联的表中的数据行的ID')

    # 帮助你快速实现带contenttype关联字段的表对象创建工作，不会数据库中生成列
    content_object = GenericForeignKey('content_type', 'object_id')


# 1. 为学位课“Python全栈”添加一个价格策略：一个月 9.9
"""
obj = DegreeCourse.objects.filter(title='Python全栈').first()
# obj.id
cobj = ContentType.objects.filter(model='course').first()
# cobj.id
PricePolicy.objects.create(price='9.9',period='30',content_type_id=cobj.id,object_id=obj.id)
"""

# 增加GenericForeignKey（"conten_type"，"object_id"）之后，会自动识别obj的表的名称，并将表在contenType中的id赋予GenericForeignKey第二个参数
# obj = DegreeCourse.objects.filter(title='Python全栈').first()
# PricePolicy.objects.create(price='9.9',period='30',content_object=obj)
```
 

 

  
查询
--

 QuerySet的查询时惰性的,即当我们去执行all,filter,get等时是不会去执行sql的，只有当我们调用查询结果集的时候才会真正执行sql ### 管理器自带api

 ****- get()**** 返回model对象,若没有符合条件的对象，触发DoesNotExist异常  
 ```
try:
　　aricle = Article.objects.get(pk=id)
except Article.DoesNotExist:
　　return render(request,'failure.html',{'reason':'没有找到对应的文章'})
```
 

**- 跨表** ‘\_\_’可以在filter和values或者相关函数中使用，并且是双向的，只要存在关系即可

 ```
# 注：两种用法，可以做条件，也可以取值
　BookInfo.object.filter(heroinfo__hgender__exact = False)
#取值
v2 = models.Host.objects.filter(nid__gt=0).values('nid','hostname','b_id','b__caption')
v3 = models.Host.objects.filter(nid__gt=0).values_list('nid','hostname','b_id','b__caption')
```
 

**- values与values\_list**

values 可以提取反向的关联对象  
注意：反向查询的参数是小写的orm类名，可以看作是关联表id另一种表示法

 ```
a = CategoryInfo.objects.values('articleinfo')
# a = CategoryInfo.objects.filter(articleinfo=1) #可以看作articleinfo__id
```
 

values 可以提取外键字段  
注意：通过双下划线链接

 ```
ArticleInfo.objects.values('category__title') #即使是manytomany也行
```
 

**- 复杂查询** **extra()函数**

 extra(self, select=None, where=None, params=None, tables=None, order\_by=None, select\_params=None)  
 select和select\_params是一组，用于子查询  
 where和params是一组，用于附加过滤条件  
tables表示要引入哪些新表(会有笛卡尔积),order\_by表示数据条目按本表的哪个字段排序

 ```
# 附加where条件
Entry.objects.extra(where=['headline=%s'], params=['Lennon'])
# 先filter筛选出指定博客掉文章，再按指定年月过滤
article_list = modles.Article.objects.filter(blog=blog).extra(where=['strftime("%%Y-%%m",create_time)=%s'],params=[val,])


# 自定义一个“子查询”字段
Entry.objects.extra(select={'new_id': "select id from tb where id > %s"}, select_params=(1,), order_by=['-nid'])　
```
 

 ```
# 查询语句对比：
    models.UserInfo.objects.extra(
                        select={'newid':'select count(1) from app01_usertype where id>%s'},
                        select_params=[1,],
                        where = ['age>%s'],
                        params=[18,],
                        order_by=['-age'],
                        tables=['app01_usertype']
                    )
                    """
                    select 
                        app01_userinfo.id,
                        (select count(1) from app01_usertype where id>1) as newid
                    from app01_userinfo,app01_usertype
                    where 
                        app01_userinfo.age > 18
                    order by 
                        app01_userinfo.age desc
                    """
    
```
 

**- 统计函数 aggregate**

没有groupby效果，并且查出来之后就不死queryset对象了，是一个字典。适用于没有groupby的统计

 ```
TableInfo.objects.aggregate(c=Count('category_id')) 
```
 

**- 统计聚合函数annotate**   
 注意：annotate前面必须有个的value来指定group by后面的字段，默认是以自己的id分组

 ```
from django.db.models import Sum, Count
Comment.objects.values(‘article’).annotate(comment_count=Count(‘article’)).order_by(‘-comment_count)。
# select count(article) as c from Evainfo group by aricle ordey by c
# annotate前面的value指定group by后面的字段，默认是以自己的id分组
# 注：comment_count是自定义查询字典的key
```
 

annotate统计操作默认以发起表的id进行group by，配合反向查询非常好用

 ```
# 查询不同种类对应的书籍数目
CategoryInfo.objects.filter(blog_id=1).values(c=Count('articleinfo')).values('title', 'c')
 # 按日期归档
 archive_list = models.Article.objects.filter(user=user).extra(
  select={"archive_ym": "date_format(create_time,'%%Y-%%m')"}).values("archive_ym").annotate(c=Count("nid")).values("archive_ym", "c")
    
# 标签,种类归档
category_list = models.Category.objects.filter(blog=blog).annotate(c=Count("article")).values("title", "c")
 tag_list = models.Tag.objects.filter(blog=blog).annotate(c=Count("article")).values("title", "c")
```
 

 **- 其他不常用**

 ```
# like查询
filter(sname__contains='黄') #也适用于整型等其他类型，并且要配合比较运算符使用 等同于select * from table where sname like "黄%" 

#字段排序 
order_by('-price')   #支持多字段排序 order_by('id','-price','title') 

#判断查询集中是否有数据，返回bool值
exists() 

#返回查询集的总条数
count() 

# 去重
distinct()

# 排除指定条件，常用作不等于
exclude()
obj = Permission2Action.objects.filter().exclude(p__menu_isnull =True)

#根据字段排序，支持多字段排序 
order_by('id','-price','title') 

# 附：查看执行的sql原生语句
#obj.query 
```
 

### django提供api（get\_object\_or\_404 与 get\_list\_or\_404）

 一般都会有这么一个需求，若查找不出指定对象，返回404页面  
 ```
from django.http import Http404

try:
    product = Product.objects.get(pk=1)
except MyModel.DoesNotExist:
    raise Http404
```
 

get\_object\_or\_404 会简化这个操作

 ```
from django.shortcuts import get_object_or_404 
product = get_object_or_404(Product, pk=1) 
```
 

### 原生查询

\- Manger.extra()  
常用于附加复杂条件，子查询

 ```
# 查询语句对比：
    models.UserInfo.objects.extra(
                        select={'newid':'select count(1) from app01_usertype where id>%s'},
                        select_params=[1,],
                        where = ['age>%s'],
                        params=[18,],
                        order_by=['-age'],
                        tables=['app01_usertype']
                    )
                    """
                    select 
                        app01_userinfo.id,
                        (select count(1) from app01_usertype where id>1) as newid
                    from app01_userinfo,app01_usertype
                    where 
                        app01_userinfo.age > 18
                    order by 
                        app01_userinfo.age desc
                    """
     
```
 

\- **Manager.raw()**   
注意，raw查询，查询结果一定要包含主键

 ```
Topic.objects.raw('select * form forum_topic')
 
# 异常，因为返回的结果没有包含主键
blog_article.objects.raw(‘select distinct date_format(r‘blog_article’.’date_publist’,’%Y-%m’) from blog_article’)
```
 
\- DB-API

```
直接使用了MySQLbd的api，使用原生语句查询 )
```
 ```
from django.db import connection, transaction
        cursor = connection.cursor() 
    　　# cursor = connections['default'].cursor()
     
        # 数据修改操作——提交要求
        cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
        transaction.commit_unless_managed()
     
        # 数据检索操作,不需要提交
        cursor.execute("SELECT foo FROM bar WHERE baz = %s", [self.baz])
        row = cursor.fetchone()
```
 

### 连表查询

注意的是：selected\_related不支持ManytoMany，而prefetch\_related支持所有关系  
![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190104225258056-880829197.png)

用于查询的对象
-------

### Q对象



 ```
from django.db.models import Q

Q(Q(account='fuck_man') & Q(status=0) | Q(birthday_lte=ctime))

# 多个Q对象组装复杂条件
q = Q()

q1 = Q()
q1.connector = 'AND'
q1.children.append('account', 'fuck_man')
q1.children.append('status', 0)
q1.children.append('birthday_lte', ctime)

q2 = Q()
q2.connector = 'AND'
q2.children.append('title', 'fuck')

q.add(q1, 'OR')
q.add(q2, 'OR')
```
 

 **- filter 的 != 条件应该使用Q查询**

 ```
from django.db.models.query import Q
queryset = UserInfo.objects.filter(~Q(name=""))
```
 

**- 条件的“或”操作** **- 动态实现Q条件**    
比如简单的搜索功能（搜索一个文章的标题或内容或作者名称包含某个关键字）:

 ```
import operator
from django.db.models.query import Q

# 用户要查询的值
q = request.GET.get('q', '').strip()
# 可能的查询键值列表
key_list = ['title__contains', 'content__contains','author__name__contains']
# 实现Q(title__contains=q)|Q(content__contains=q)|Q(author__name__contains=q)
l = [Q(**{key:q}) for key in key_list]
#reduce相当于c++的accumulate，累加函数, operator.or_(x,y)是二进制的'或'操作， 从列表里将所有Q对象一起'或'起来，得到最终的结果
queryset = Entry.objects.filter(reduce(operator.or_, l)) 
```
 

### F对象

**- 字段间比较** 例如：查询书id小于价格的书籍

 ```
models.Book.objects.filter(id__lt=F("price"))
```
 

****- django 支持 F() 对象之间以及 F() 对象和常数之间的加减乘除和取模的操作****

 ```
models.Book.objects.filter(id__lt=F("price")/2)
```
 

**- 将对象的一个字段经过修改（加减乘除），赋值给另一个字段，以此进行更新**

 ```
models.Book.objects.all().update(price=F("price")+30) 
```
 

序列化
---

1、serializers

 ```
from django.core import serializers

ret = models.BookType.objects.all()

data = serializers.serialize("json", ret)

```
 

2、json.dumps

 ```
    import json

    #ret = models.BookType.objects.all().values('caption')
    ret = models.BookType.objects.all().values_list('caption')

    ret=list(ret)

    result = json.dumps(ret)

```
 

由于json.dumps时无法处理datetime日期，所以可以通过自定义处理器来做扩展，如：

 ```
import json  
from datetime import date  
from datetime import datetime  
  
class JsonCustomEncoder(json.JSONEncoder):  
   
    def default(self, field):  
    
        if isinstance(field, datetime):  
            return o.strftime('%Y-%m-%d %H:%M:%S')  
        elif isinstance(field, date):  
            return o.strftime('%Y-%m-%d')  
        else:  
            return json.JSONEncoder.default(self, field)  
  
  
# ds = json.dumps(d, cls=JsonCustomEncoder)  

```
 

自定义Manager
----------

 ```
class MyCustomManager(models.Manager):
    # 连接查询时也生效
    use_for_related_fields = True 

    def get_queryset(self):
        return super(MyCustomManager, self).get_queryset().filter(isDelete=False)


# 配置 use_for_related_fields = True，一定要写在外面。不知道是不是bug,一定要再类的外面的实例化
custom_manager = MyCustomManager()


class BaseModel(models.Model):
    create_time = models.DateTimeField(verbose_name='创建时间', auto_now=True)
    isDelete = models.BooleanField(verbose_name='是否已经删除', default=False)

    default_objects = models.Manager()  # objects = BaseManger会被覆盖
    objects = custom_manager

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        """重写数据库删除方法实现逻辑删除"""
        self.isDelete = True
        self.save()
        print('isDelete = false')
```
 



模型继承
----

 [详细](https://www.cnblogs.com/feixuelove1009/p/8420751.html)  
数据库事务
-----

 [详细](https://blog.csdn.net/qq_36012543/article/details/79679690?utm_source=copy)资源共享问题
------

数据资源共享问题，需要借助返回值（受影响的行数）

 ```
row = Trouble.objects.filter(id=nid,status=1).update(**form.cleaned_data)
if not row:
    return HttpResponse('来晚一步，被人抢走了')
　　# 需要考虑多个用户抢同一个资源的问题,update返回的是数字，若返回是0，表示单子被抢走了。
else:
    return redirect('/backend/trouble-list.html')
```
 

分库
--

### 分库的方法

 **- 手动路由**   
 ```
# 查询,使用using函数，参数就是要查询的数据库
User.objects.using('user1').all()
# 保存或者更新,使用save的using参数，值就是要使用的数据库
my_object.save(using='user1')
#删除,使用delete的using参数
user_obj.delete(using='user1')
```
 

   
**- 自动路由**   
[详细](https://www.jianshu.com/p/c6fd44fd1a6a)  
### 分库的思路

**- 垂直分库**   
即一个app对应一个数据库，上面自动路由的例子就是一个垂直分库的例子，auth1使用user1数据库，auth2使用user2数据库。当然也可以使用手动路由。

**- 水平分库**   
水平分库建议使用手动路由，因为每个model的分库机制可能都不一样，自动路由实现起来有些麻烦会造成性能不高，而手动路由，每个model根据自己的规则来获得不同的数据库。

   
模板
==

 **- 注意点**   
1. 函数在模版里面不能加括号  
2. 模版里面统计反向集合数据条数 要用{{ article.commentinfo_set.count }} #{{article.commentinfo_set|length}}不行  
3. 默认request对象已经传入模版里面，例如:  
 {% if request.session.user|default:'' != '' %}  
4. 在模版语言中，变量类型不会因为输出语句，例如{{name}}，而改变类型，比如说，int类型还是int类型，不回变为字符串  
  
 **- 模板html文件加载顺序**   
Django会依次到以下目录查找模板文件，如果都找不到，则报错： 1.项目配置的模板目录  
2.admin应用的templates模板目录  
3.auth应用的templates模板目录  
4\. 应用本身的templates模板目录

内置过滤器
-----



 ```
# 注意的是，模版的传入的参数都是为字符串，并且传参时都要带‘：’
    {{courses | length}} #集合的长度
    {{ time_obj|date:"Y-m-d H:i:s"}}  # 对传入转为日期时间格式
    {{ str_obj|truncatewords:"30" }}  # 截取前三十个字符,无法截取中文
    {{str_obj| slice:"30"}} #截取中文
    {{ my_list|first|upper }}  # 把第一个字符大写
    {{ article.summary |default:'' }}   #这个可以保障模版不输出None，因为从数据库取出的值若没有则为None
    {{ name|lower }}  # 把传入值小写
   {{ article.date_publish | date:"Y-m-d" }} 
　　{{html_str|safe}} #让html_str给浏览器解析，默认出于安全考虑不解析
　　{% autoescape off %} #批量转义
　　{{ course.detail }}
　　{% endautoescape %}

    注：还有另一种方式可以让浏览器解析，
    from django.utils.safestring import mark_safe
　　html_str=mark_safe(html_str)
```
 



**- 循环计数**

 ```
        {% for row in v1 %}           # 假设3条数据
        {{ forloop.counter}}      # 依次为：1、2、3
        {{ forloop.counter0}}     # 依次为：0、1、2
        {{ forloop.revcounter}}   # 依次为：3、2、1
        {{ forloop.revcounter0}}  # 依次为：2、1、0
        {{ forloop.last }}        # 是否最后一个，是为True，其他False
        {{ forloop.first }}       # 是否第一个
        {{ forloop.parentloop }}  # 嵌套循环，表示上层循环的上面的六个值别是多少。
{% endfor %}    
```
 

自定义过滤器
------

 ```
from django import template
register = template.Library()

# 定义一个将日期中月份转换为大写的过滤器，如8转换为八

@register.filter
def month_to_upper(key):
    return ['一','二','三','四','五','六','七','八','九','十','十一','十二'][key]


# 使用,模版文件要load一下才能使用，filter是filter.py文件的文件名
```
 ```
{%load filter%}
```
 ```
<div class='month'>{{article.date_publish | month_to_upper}}</div> # article.date_publish会被当做month_to_upper的参数
```


 ```
{{ cls_verbose_name |test:app_name }} # 如果过滤器有参数时，一定要确定没有空格，即过滤器test后面一定要紧贴':'
```


 

 ```
# 配置    
注意的是：一定要在指定App目录下建立templatetags目录，并且要在setting.py设置 
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [os.path.join(BASE_DIR, 'templates')]
            ,
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
    
                'libraries': {
                    'my_tags': 'web.templatetags.filter',  #my_tags为自定义键值, web.templatyetags.filter为路径
                }
            },
        },
```
 

自定义simple\_tag
--------------

过滤器最多只能带1个额外参数只能带1个额外参数,而自定义simple\_tag可以带无数个

 ```
# 可以接收多个参数
@register.simple_tag
def create_filter_str(order, q, filter_dict, field, value=''):
    d = copy.copy(filter_dict)
    remove_previous_field(d, field)
    d[field] = value

    order_str = 'order=%s' % order
    q_str = 'q=%s' % q
    filter_str = parse_filter_kwargs(d)
    return '?' + '&'.join([order_str, q_str, filter_str])

#调用
 <a href="{% create_filter_str args.order args.q args.filter data_dict.field %}">全部</a>

#或者{% create_filter_str args.order args.q args.filter data_dict.field as filter_str%}
{{filter_str}}
```
 

页面分离与导入
-------

传入参数经过计算渲染装饰器所指定的页面，这个页面可以被其他模板通过调用引入

 ```
@register.inclusion_tag('web/sub/common_bar.html')
def get_common_bar(blog):
    tag_statistics = TagInfo.objects.filter(blog=blog). \
        annotate(article_count=Count('articleinfo')).values('id', 'article_count', 'title')

    category_statistics = CategoryInfo.objects.filter(blog=blog). \
        annotate(article_count=Count('articleinfo')).values('id', 'article_count', 'title')

    date_statistics = ArticleInfo.objects.filter(blog_id=1). \
        extra(select={'create_date': 'date_format(time,"%%Y-%%m")'}). \
        values('create_date').annotate(article_count=Count('id')).values('article_count', 'create_date')

    # 粉丝数
    fans_count = Star2Fans.objects.filter(star_user=blog.user).count()
    # 关注数
    star_count = Star2Fans.objects.filter(fans_user=blog.user).count()

    # 模版只会根据这个函数返回的上下文进行渲染
    return locals()
```
 

**- 使用**

 ```
{% get_common_bar blog %}
```
 

settings.py配置
=============

多个setting文件  

--------------

 [详细](https://www.atjiang.com/2scoopsdjango1.8-5-django-settings-and-requirements-files/)  
静态文件与上传文件配置  

--------------

 ```
# 原理就是url拼配成功后，截取剩下的路径去指定目录下查找
```
 ```
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR,'static'),
)
MEDIA_URL = '/uploads/'
MEDIA_ROOT = os.path.join(BASE_DIR,'uploads')
# 注意：upload_to 设置的路径是相对于MEDIA_ROOT下创建

# 模板中引用静态文件
<link href ="{% static 'css/base.css' %}" rel="stylesheet"}

#配置能访问upload的文件

from django.views.static import serve
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^uploads/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

#配置在模版中使用{{MEDIA_URL}} 代表 ‘/uploads/'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
            ],
```
 

日志配置 
-----

 ```
BASE_LOG_DIR = os.path.join(BASE_DIR, "log")
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '[%(asctime)s][%(threadName)s:%(thread)d][task_id:%(name)s][%(filename)s:%(lineno)d]'
                      '[%(levelname)s][%(message)s]'
        },
        'simple': {
            'format': '[%(levelname)s][%(asctime)s][%(filename)s:%(lineno)d]%(message)s'
        },
        'collect': {
            'format': '%(message)s'
        }
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],  # 只有在Django debug为True时才在屏幕打印日志
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'SF': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',  # 保存到文件，根据文件大小自动切
            'filename': os.path.join(BASE_LOG_DIR, "xxx_info.log"),  # 日志文件
            'maxBytes': 1024 * 1024 * 50,  # 日志大小 50M
            'backupCount': 3,  # 备份数为3  xx.log --> xx.log.1 --> xx.log.2 --> xx.log.3
            'formatter': 'standard',
            'encoding': 'utf-8',
        },
        'TF': {
            'level': 'INFO',
            'class': 'logging.handlers.TimedRotatingFileHandler',  # 保存到文件，根据时间自动切
            'filename': os.path.join(BASE_LOG_DIR, "xxx_info.log"),  # 日志文件
            'backupCount': 3,  # 备份数为3  xx.log --> xx.log.2018-08-23_00-00-00 --> xx.log.2018-08-24_00-00-00 --> ...
            'when': 'D',  # 每天一切， 可选值有S/秒 M/分 H/小时 D/天 W0-W6/周(0=周一) midnight/如果没指定时间就默认在午夜
            'formatter': 'standard',
            'encoding': 'utf-8',
        },
        'error': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',  # 保存到文件，自动切
            'filename': os.path.join(BASE_LOG_DIR, "xxx_err.log"),  # 日志文件
            'maxBytes': 1024 * 1024 * 5,  # 日志大小 50M
            'backupCount': 5,
            'formatter': 'standard',
            'encoding': 'utf-8',
        },
        'collect': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',  # 保存到文件，自动切
            'filename': os.path.join(BASE_LOG_DIR, "xxx_collect.log"),
            'maxBytes': 1024 * 1024 * 50,  # 日志大小 50M
            'backupCount': 5,
            'formatter': 'collect',
            'encoding': "utf-8"
        }
    },
    'loggers': {
        '': {  # 默认的logger应用如下配置
            'handlers': ['SF', 'console', 'error'],  # 上线之后可以把'console'移除
            'level': 'DEBUG',
            'propagate': True,
        },
        'collect': {  # 名为 'collect'的logger还单独处理
            'handlers': ['console', 'collect'],
            'level': 'INFO',
        }
    },
}
```
 

 ```
# 用户使用logging.getLogger([name])获取logger实例,如果没有名字，返回logger层级中的根logger（root logger）
# django名字的logger可能是默认终端的输出，未验证
logger = logging.getLogger(‘django’)
logger.info(“This is an error msg”)
```
 

sql查询语句显示配置
-----------

 ```
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console':{
            'level':'DEBUG',
            'class':'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'propagate': True,
            'level':'DEBUG',
        },
    }
}
```
 

django内置组件
==========

Form组件
------

**[详细](https://www.cnblogs.com/liwenzhou/p/8747872.html)**

### **字段** 

 ```
# 常用字段
# CharField
# IntegerField
# DeimalField
# DateField
# DateTimeField
# EmailField
# ChoiceField
# FileField
# RegexField
# GenericIPAddressField
from django import forms
from django.forms import fields 
#forms的单选框
     auto = forms.CharField(
            label='一个月内自动登录',
            widget=widgets.CheckboxInput(attrs={'id': "auto", 'name': 'auto'}),
            required=False,
        )
```
 

 例如：手机号码定义  
 ```
    phone = fields.CharField(
        min_length=11,
        max_length=12,
        error_messages={'required': 'server:手机号码不能为空',
                        'min_length': 'server:号码必须为11位或者12位',
                        'max_length': 'server:号码必须为11位或者12位',
                        },
        validators=[RegexValidator(r'^1[0-9]{10,11}$', '手机号码格式错误'), ],
        label='电话号码',
        widget=widgets.TextInput(attrs={'name': 'phone', 'placeholder': "请输入手机号码", \
                                        'class': 'form-control', 'id': 'phone'}),
    )
```
 

 例如：根据model的choices字段生产选项组框  ```
    city = forms.ChoiceField(
        choices =models.CityInfo.objects.all().values_list('id','name'),
        # choices = [(1,"东莞"),(2,"广州"),(3,"深圳")],
        label = "城市",
        initial = 1,
        widget = forms.widgets.Select
        )
        #注意：以上的做法，当数据库更新时，不会实时更新。这时候需要自定义form的构造方法
    class MyForm(Form):
 
    user = fields.ChoiceField(
        # choices=((1, '上海'), (2, '北京'),),
        initial=2,
        widget=widgets.Select
    )
 
    def __init__(self, *args, **kwargs):
        super(MyForm,self).__init__(*args, **kwargs)
        # self.fields['user'].choices = ((1, '上海'), (2, '北京'),)
        self.fields['user'].choices = models.Classes.objects.all().values_list('id','caption')
    
```
 

 

### **验证顺序** 

先验证了min\_length那些参数字段之后再执行clean\_xx钩子函数，最后执行整体验证clean()

- 无论之前定义的min\_length那些验证成功与否，都会执行clean\_xx函数，所以在里面操作时应当使用request.POST，而不是self.clean\_data。（因为当验证失败时会取不到值）
- 如果验证成功需要return self.clean\_data\['xx'\]回去，不然clean\_data里面那操作过的那个字段会是None

 ```
#单一字段的验证，clean_xxx()  
def clean_verify(self):
        user_verify_code = self.request.POST.get('verify', '').upper()
        verify_code = self.request.session.get('verify_code').upper()
        if user_verify_code != verify_code:
            raise ValidationError(message='验证码错误', code='invalid')


# 整体验证例子
def clean(self):
    value_dict = self.clean_data
    v1 = value_dict.get('username')
    v2 = value_dict.get('user_id')
    if v1!='root' and v2 !=1:
    raise ValidationError('整体错误信息')
return self.cleaned_data
```
 

后续增加错误信息

 ```
# form.errors['username'] = ['用户名不存在或者密码错误', ]
form.add_error(field, error）
```
 

只读字段处理

 ```
#form.fields['title'].widget.attr['readonly']=True
#form.fields['title'].widget.attr.update(['disabled':'true'})
form.fields['title'].disabled = True
```
 

### 使用接口

 ```
form = UserForm(request.POST,request.FILE)
    if form.is_valid():
        form.cleaned_data #验证过的数据，字典形式，键是name属性
    else:
    # 错误数据，字典形式，键是name属性，不过它的__str__默认返回errors.as_ul()，也就是字符串。html的ul代码
        form.errors 
```
 

注意：使用字典参数作为自定义form的data参数，传入的的值会被自己定义的规则所验证。若不想验证，则传入参数为initial

 ```
form = TroubleMaker(initial={'title':'标题1','detail':'XXXX'}) 
```
 

### **模板中使用** 

errors内部格式

 ```
{'username:['错误信息1','错误信息2'],'password':['错误信息1,]}
```
 

取错误列表里面的第一个

 ```
{{ form.errors.username.0}}
```
 

在模板中显示Django’\_\_all\_\_’形式的错误，即整体错误信息

 ```
{{ form.non_field_errors }}
```
 

### 验证器

Django将验证器定义为一个可调用的对象，它接受一个值，并在不符合一些规则时抛出`ValidationError`异常。   
换句话说，满足以上定义的都是验证器，那我们就可以欢快地来自定义验证器吧！

例如，这个验证器只允许偶数：

 ```
from django.core.exceptions import ValidationError

def validate_even(value):
    if value % 2 != 0:
        raise ValidationError('%s is not an even number' % value)
```
 

你可以通过字段的`validators`参数将它添加到模型字段中：

 ```
from django.db import models

class MyModel(models.Model):
    even_field = models.IntegerField(validators=[validate_even])
```
 

由于值在验证器运行之前会转化为Python，你可以在表单上使用相同的验证器：

 ```
from django import forms

class MyForm(forms.Form):
    even_field = forms.IntegerField(validators=[validate_even])
```
 

你也可以使用带有 `__call__()`方法的类，来实现更复杂或可配置的验证器。例如，[`RegexValidator`](http://wiki.jikexueyuan.com/project/django-chinese-docs-1.8/13-12-data-validation.html#django.core.validators.RegexValidator "django.core.validators.RegexValidator")就用了这种技巧。

 ```
RegexValidator
class RegexValidator([regex=None, message=None, code=None, _inversematch=None, flags=0])[source]

regex
用于搜索提供的value的正则表达式，或者是预编译的正则表达式对象。通常在找不到匹配时抛出带有 message 和code的 ValidationError异常。这一标准行为可以通过设置inverse_match 为True来反转，这种情况下，如果找到匹配则抛出 ValidationError异常。通常它会匹配任何字符串（包括空字符串）。
message
验证失败时ValidationError所使用的错误信息。默认为"Enter a valid value"。
code
验证失败时ValidationError所使用的错误代码。默认为"invalid"。
inverse_match
New in Django 1.7.regex的匹配模式。默认为False。
flags
New in Django 1.7.编译正则表达式字符串regex时所用的标识。如果regex是预编译的正则表达式，并且覆写了flags，会产生TypeError异常。默认为 0
```
 



   
**modelform** 
--------------

 ```
class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='密码', widget=forms.PasswordInput(attrs={'class': 'form-control'}), \
                                max_length=32, min_length=8)
    password2 = forms.CharField(label='重复密码', widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        model = UserInfo
        fields = ('email', 'username')
        labels = {
            'username': '用户名',
            'email': '邮箱',
        }
        error_messages = {
            '__all__': {},

            'email': {
                'required': '邮箱不能为空',
                'invalid': '邮箱格式错误',
            },
            'username': {
                'required': '用户名不能为空',
                'invalid': '用户名格式错误..',
            }
        }

        widgets = {
            'username': widgets.TextInput(attrs={'class': 'form-control'}),
            'email': widgets.TextInput(attrs={'class': 'form-control'})
        }

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("两次密码输入不一致")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
```
 

视图中使用

 ```
 # instance参数表示和data参数共同融合
form = form_cls(instance=obj, data=request.POST)
if form.is_valid():
　　 obj = form.save() #存储对象，返回model对象
```
 

模板中使用

 ```
{%for field in form %}
{{ field.label }} # verbose_name 
{{ field.name}} # modelinfo原始定义的字段名,例如price
{{ field }} # input组件
{{ field.errors.0 }} #错误信息
{%endfor%}
```
 

**动态modelform**

 ```
class FormClassFactory(object):
    @classmethod
    def from_admin(cls, admin):
        class Meta:
            model = admin.cls_info
            fields = '__all__'
            exclude = admin.readonly_fields

        def __new__(cls, *args, **kwargs):
            for field_name in cls.base_fields:
                field_obj = cls.base_fields[field_name]
                field_obj.widget.attrs.update({'class': 'form-control'})   # 传入组件属性
            return ModelForm.__new__(cls)

        form_cls = type('DynamicModelForm', (ModelForm,), {'Meta': Meta, '__new__': __new__})
        return form_cls
```
 

缓存
--

 ```
from django.core.cache import cache
is_had_read = cache.get(article_id)
if not is_had_read:
     article.read_num += 1
     article.save()
     cache.set(article_id, 1, 60 * 60 * 24 * 30) #一个月过期
```
 

中间件
---

[详细](https://www.cnblogs.com/liwenzhou/p/8761803.html)  
 -**中间件执行流程。**   
 a. - 请求到来走wsgi，wsgi负责按照HTTP协议的规则解析请求成请求头  
 b. 先执行所有安装中间件的process\_request  
 c. - 绕回去匹配url  
 d. 执行所有中间件的process\_view #这里和process\_request的区别是，这里已经找到了要执行的视图函数  
 e. -执行视图函数返回  
 f. 执行所有中间件的process\_response  
 g. 若报错，执行所有的process\_excepiton  
 h. 若用render返回，则执行所有的process\_render方法

异常
--

 





 

脚本运行环境配置  

-----------

 ```
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project_name.settings")  # project_name 改成你自己的项目名称
django.setup()
```
 

APP
---

### 自定义AppConfig

 方法1  ```
# 第一步在app的apps.py中
class AccountConfig(AppConfig):
    name = 'account'
    verbose_name = u'用户信息'  # 更改app的在admin中的显示 

# 第二步，在该app的__init__.py中
default_app_config = 'account.apps.AccountConfig'
```
 

 方法2  
直接在settings的INSTALLED\_APPS中后面加上.apps.UsersConfig  
例如:'users.apps.AppConfig'

**- ready方法**

 app一被加载就自动调用的方法  
 ```
 from django.apps import AppConfig
    class App01Config(AppConfig):
        name = 'app01'
    
        def ready(self):
            from django.utils.module_loading import autodiscover_modules
            # 在项目所有的目录下查找并调用aaaa.py文件
            autodiscover_modules("aaaa")
```
 

### app设计

 一般我们通过“名词+动词分析”进行数据库设计，但进行app设计时，models可能会有循环导入问题。  
一般解决的方法是，定义一个动作app（operation，operation可以根据角色的动作去设计），导入其他名词app（user，organization，course）  


**- 整理app文件夹**   
即将所有app存放于一个文件夹中

1.新建包apps  
2.移动app至apps，注意不要勾选search on xx这个选项，要的不是from apps.course.models import \* 这种效果  
3.改掉编辑器的错误提示，右键-->Mark Directory as--->Sources Root，这样会使得编辑器查找模块时，也会将apps作为跟文件夹开始搜索  
4.settings.py文件增加  
 sys.path.insert(0,os.path.join(BASE\_DIR,'apps')  
5.注意：当要从新migration时会报错，因为django默认会将外键的路径加上apps这个文件夹，导致错误。所以搜索出来删掉(ctrl+H全局搜索）

   
信号
--

Django中提供了“信号调度”，用于在框架执行操作时解耦。通俗来讲，就是一些动作发生的时候，信号允许特定的发送者去提醒一些接受者。

**1、Django内置信号**

 ```
    Model signals
        pre_init                    # django的modal执行其构造方法前，自动触发
        post_init                   # django的modal执行其构造方法后，自动触发
        pre_save                    # django的modal对象保存前，自动触发
        post_save                   # django的modal对象保存后，自动触发
        pre_delete                  # django的modal对象删除前，自动触发
        post_delete                 # django的modal对象删除后，自动触发
        m2m_changed                 # django的modal中使用m2m字段操作第三张表（add,remove,clear）前后，自动触发
        class_prepared              # 程序启动时，检测已注册的app中modal类，对于每一个类，自动触发
    Management signals
        pre_migrate                 # 执行migrate命令前，自动触发
        post_migrate                # 执行migrate命令后，自动触发
    Request/response signals
        request_started             # 请求到来前，自动触发
        request_finished            # 请求结束后，自动触发
        got_request_exception       # 请求异常后，自动触发
    Test signals
        setting_changed             # 使用test测试修改配置文件时，自动触发
        template_rendered           # 使用test测试渲染模板时，自动触发
    Database Wrappers
        connection_created          # 创建数据库连接时，自动触发

```
 

对于Django内置的信号，仅需注册指定信号，当程序执行相应操作时，自动触发注册函数：

![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif)![](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif) ```
    from django.core.signals import request_finished
    from django.core.signals import request_started
    from django.core.signals import got_request_exception

    from django.db.models.signals import class_prepared
    from django.db.models.signals import pre_init, post_init
    from django.db.models.signals import pre_save, post_save
    from django.db.models.signals import pre_delete, post_delete
    from django.db.models.signals import m2m_changed
    from django.db.models.signals import pre_migrate, post_migrate

    from django.test.signals import setting_changed
    from django.test.signals import template_rendered

    from django.db.backends.signals import connection_created


    def callback(sender, **kwargs):
        print("xxoo_callback")
        print(sender,kwargs)

    xxoo.connect(callback)
    # xxoo指上述导入的内容
```
 

 View Code

![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif)![](https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif) ```
from django.core.signals import request_finished
from django.dispatch import receiver

@receiver(request_finished)
def my_callback(sender, **kwargs):
    print("Request finished!")
```
 

 View Code

**2、自定义信号**

a. 定义信号

 ```
            import django.dispatch
            pizza_done = django.dispatch.Signal(providing_args=["toppings", "size"])
```
 

b. 注册信号

 ```
        def callback(sender, **kwargs):
            print("callback")
            print(sender,kwargs)

        pizza_done.connect(callback)

```
 

c. 触发信号

 ```
        from 路径 import pizza_done

        pizza_done.send(sender='seven',toppings=123, size=456)

```
 

由于内置信号的触发者已经集成到Django中，所以其会自动调用，而对于自定义信号则需要开发者在任意位置触发。

  
时区
-----



 ```
LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'Asia/Shanghai' 
USE_TZ = False # 防止django存储数据库时采用utc时间，而use_tz为false则表示使用本地时间
```
 

**- 注意**   
1\. 如果直接用标准库的datetime，可能会出现以下警告，因为你使用的是一个不带时区的时间

![](https://img2018.cnblogs.com/blog/1334959/201812/1334959-20181227183732083-635229530.png)

 这个问题的隐患是，假如你的django如果用了时区，而标准库是当前系统时区，那么就很可能出现时间查  
 解决办法：安装django的指定的时区来  
 from django.utils.timezone import datetime

闪现
--

[详细](https://www.cnblogs.com/jl-bai/p/6209653.html)

 csrf
-----

跨站请求伪造，重点在跨站二字  
钓鱼网站的页面和正经网站的页面对浏览器来说有什么区别？   
\- 钓鱼网站的页面是由 钓鱼网站的服务端给你返回的  
\- 正经网站的网页是由 正经网站的服务端给你返回的  
钓鱼网站的目的是：真正的目的是你要交互的合法网站所存储的cookie，这是你的身份凭证。  
手段是：引导你生成不合法的数据，或者直接借由自己双手提交一个已经设计好的非法表单数据。

csrf\_protect，为当前函数强制设置防跨站请求伪造功能，即便settings中没有设置全局中间件。  
csrf\_exempt，取消当前函数防跨站请求伪造功能，即便settings中设置了全局中间件。

 ```
from django.views.decorators.csrf import csrf_exempt, csrf_protect
```
 

auth组件
------

 [详细  ](https://www.cnblogs.com/liwenzhou/p/9030211.html)

 

自定义authenticate，实现用户可以通过邮箱或者用户名登录  
 ```
    # settings.py文件中配置，指明路径
        AUTHENTICATION_BACKENDS = (
            'users.views.CustomBackend',
        )
        
    from django.contrib.auth.backends import ModelBackend
    from django.db.models import Q
    class CustomBackend(ModelBackend):
        def authenticate(self, username=None, password=None, **kwargs):
            try:
                user = UserProfile.objects.get(Q(username=username)|Q(email=username))
                if user.check_password(password):
                    return user
            except Exception as e:
                return None
```
 

admin
-----

 [详细](https://www.cnblogs.com/yuanchenqi/articles/8323452.html)  
  
邮件
--

 ```
# Email settings smtp/pop3
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = "smtp.163.com"  # smtp加上指定的域名
EMAIL_PORT = 25
EMAIL_HOST_USER = "jdecree@163.com"
EMAIL_HOST_PASSWORD = "xxxxx"  # 授权码
# EMAIL_USE_TLS = True
EMAIL_FROM = "jdecree@163.com"
```
 

 ```
class EmailHelper(object):
    def __init__(self):
        self.email_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        self.email_from = settings.EMAIL_FROM  # 发送人

    def send_captcha(self, receive_email):
        """
        发送验证码
        """
        captcha_helper = CaptchaHelper()
        captcha = captcha_helper.create_and_save_captcha(email=receive_email)
        # 邮件发送参数
        email_title = '修仔科技'
        email_body = '%s' % (captcha,)
        status = send_mail(email_title, email_body, self.email_from, [self.email_from, receive_email])
        return status

    def set_user_activate_link(self):
        """
        发送注册后的激活邮件
        :return: 
        """
        pass

    def send_password_reset_link(self):
        """
        发送密码重置链接
        :return: 
        """

    def send_email_reset_link(self):
        """
        发送邮箱重置链接
        :return: 
        """
```
 

 ```
# 附上邮箱model


class EmailVerifyRecord(models.Model):
    code = models.CharField(max_length=20, verbose_name=u"验证码")
    email = models.EmailField(max_length=50, verbose_name=u"邮箱")
    send_type = models.CharField(verbose_name=u"验证码类型",
                                 choices=(("register", u"注册"), ("forget", u"找回密码"), ("update_email", u"修改邮箱")),
                                 max_length=30)
    send_time = models.DateTimeField(verbose_name=u"发送时间", default=datetime.now)

    class Meta:
        verbose_name = u"邮箱验证码"
        verbose_name_plural = verbose_name

# 点击邮箱链接激活
# 通过随机字符串找出邮箱，再通过邮箱找出用户

class AciveUserView(View):
    def get(self, request, active_code):
        all_records = EmailVerifyRecord.objects.filter(code=active_code)
        if all_records:
            for record in all_records:
                email = record.email
                user = UserProfile.objects.get(email=email)
                user.is_active = True
                user.save()
        else:
            return render(request, "active_fail.html")
        return render(request, "login.html")
```
 

[第三方库](https://www.cnblogs.com/yuanchenqi/articles/8323452.html)
================================================================

二级域名组件(django-hosts)
--------------------

[详细](https://www.jianshu.com/p/d340d0645f05)

cors跨域处理包(django-cors-headers)
------------------------------

 ```
安装
pip install django-cors-headers
添加应用
在settings里面配置

INSTALLED_APPS = (
    ...
    'corsheaders',
    ...
)
中间层设置
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]
添加白名单
# CORS
CORS_ORIGIN_WHITELIST = (
    '127.0.0.1:8080',
    'localhost:8080', #凡是出现在白名单中的域名，都可以访问后端接口
)
CORS_ALLOW_CREDENTIALS = True  # 指明在跨域访问中，后端是否支持对cookie的操作 
```
 


调试工具(django-pdb)
----------------

    1. pip install django-pdb  
    2. INSTALLED\_APPS = (  
    # 放在第一位置  
    'django\_pdb',)  
    3.MIDDLEWARE = \[  
    # 放在第一位置  
    'django\_pdb.middleware.PdbMiddleware',\]  
    4.settings.DEBUG = True  
    5. 再pdb中输入c,到视图中执行

 

**- pdb命令**   
  
命令解释

    break 或 b 设置断点 
    continue 或 c 继续执行程序 
    list 或 l 查看当前行的代码段 
    step 或 s 进入函数 
    return 或 r 执行代码直到从当前函数返回 
    exit 或 q 中止并退出 
    next 或 n 执行下一行 
    pp 打印变量的值 
    help 帮助

redis(django-redis)


g. Redis缓存（依赖：pip3 install django-redis）


```
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {"max_connections": 100,'decode_responses': True}
            # "PASSWORD": "密码",
        }
    }
}
```
 


```
from django_redis import get_redis_connection
conn = get_redis_connection("default")
```
 

 视图中链接并操作

**2、应用**

a. 全站使用


   使用中间件，经过一系列的认证等操作，如果内容在缓存中存在，则使用FetchFromCacheMiddleware获取内容并返回给用户，当返回给用户之前，判断缓存中是否已经存在，如果不存在则UpdateCacheMiddleware会将缓存保存至缓存，从而实现全站缓存

```
    MIDDLEWARE = [
        'django.middleware.cache.UpdateCacheMiddleware',
        # 其他中间件...
        'django.middleware.cache.FetchFromCacheMiddleware',
    ]

    CACHE_MIDDLEWARE_ALIAS = ""
    CACHE_MIDDLEWARE_SECONDS = ""
    CACHE_MIDDLEWARE_KEY_PREFIX = ""
```
 

b. 单独视图缓存


```
    方式一：
        from django.views.decorators.cache import cache_page

        @cache_page(60 * 15)
        def my_view(request):
            ...

    方式二：
        from django.views.decorators.cache import cache_page

        urlpatterns = [
            url(r'^foo/([0-9]{1,2})/$', cache_page(60 * 15)(my_view)),
        ]
```
 


c、局部视图使用

```
    a. 引入TemplateTag

        {% load cache %}

    b. 使用缓存

        {% cache 5000 缓存key %}
            缓存内容
        {% endcache %}
```
    
**- redis API** 

[详细](https://www.cnblogs.com/xuchunlin/p/7064860.html)  

celery(django-celery)
---------------------

 [详细](https://www.cnblogs.com/ziyide/p/10172387.html) 

 ```
# celery
# pip install redis==2.10.6
djcelery.setup_loader()
BROKER_BACKEND = 'redis'
BROKER_URL = 'redis://127.0.0.1:6379/0'
CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379/1'
# 设置路径让celery能找到tasks文件
CELERY_IMPORTS = ['web_chat.tasks', ]
# 设置时区
CELERY_TIMEZONE = TIME_ZONE
# 防止死锁
CELERYD_FORCE_EXECV = True
# 并发数
CELERYD_CONCURRENCY = 4
# 允许重试
CELERYD_ACKS_LATE = True
# 一个worker最多执行任务数
CELERYD_MAX_TASKS_PER_CHILD = 100
# 单个任务最大运行时间
CELERY_TASK_TIME_LIMIT = 60
```
 



 

验证码(django-simple-captcha)
--------------------------

 [详细](https://blog.csdn.net/zjw_python/article/details/78949837)  

第三方分页组件(django-pure-pagination)
-------------------------------

 [详细](https://blog.csdn.net/geerniya/article/details/78348231)  

富文本编辑器(DjangoUeditor)
---------------------

 [详细](https://github.com/J-Decree/mxonline_resources/tree/master/DjangoUeditor) 

xadmin
------

[详细1](https://www.cnblogs.com/derek1184405959/p/8592800.html)，
[详细2](https://www.cnblogs.com/derek1184405959/p/8682250.html)  
后台管理三大要素（权限管理，少前端样式，快速开发） 

1\. pip install xadmin  
2\. pip uninstall xadmin  
3\. gitclone https://github.com/J-Decree/mxonline\_resources  
4\. 新建一个extra\_apps存放，跟整理app的步骤一样  
5\. INSTALL\_APP加上xadmin  
6\. urls.py中（和django-admin统一文件）  
 urlpatterns=\[url(r'^xadmin/',xadmin.site.urls),\]

注意：  
**- model显示**

 ```
class Meta:
    verbose_name = u"邮箱验证码" 
    verbose_name_plural = verbose_name  #这个是复数形式的显示，默认会加个s
```
 



**- 将UserProfile这个表移动到自己定义应用account下管理**

1.UserAdmin在xadmin的auth.py下，里面有个UserAdmin  
2.还是再plugin/auth.py下替换User，不然一些修改密码的链接会报错  
![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190108000734073-2132216274.png)

3.还是auth.py的最下面，修改url，默认是users/user，改密码时会找不到

![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190108000749123-539733933.png)



**- 权限说明**

针对于表，django为每个表都生成增删改查4个权限，拥有的权限差别会导致操作的不同甚至可能连表都看不到

**- modeladmin方法：保存对象时，可以所做的操作**

 ![](https://img2018.cnblogs.com/blog/1334959/201901/1334959-20190108000908364-754599202.png)

 **- 怎么写插件**   
需求1：以xadmin遇到UeditorField字段可以显示富文本

1.在xadmin/plugin文件夹中新增ueditor.py(点我）  
2.修改xadmin/plugin/\_\_init\_\_.py中的PLUGIN列表增加ueditor，注意要跟文件名一样  
3.adminx的modeladmin添加style\_fields = {'detail':'ueditor'} 指明哪个字段生效，detail是字段名  
  
需求2: excel导入插件

1.在xadmin/plugin文件夹中新增excel.py(点我)  
2.在xadmin/templates增加上面的蓝色标记的excel.html([点我](https://github.com/J-Decree/mxonline_resources/blob/master/xadmin/templates/xadmin/excel/model_list.top_toolbar.import.html))  
3.在需要按钮的modeladmin下定义import\_excel = True,并增加post方法，导入按钮的方法的逻辑就是在这里编写

 ```
def post(self, request, *args, **kwargs):
    if 'excel' in request.FILES:
        pass
    return super(CourseAdmin, self).post(request, args, kwargs)
```
 

4.xadmin/\_\_init\_\_.py的PLUGIN列表中增加excel

支付宝
---

 [详细](https://www.cnblogs.com/ctztake/p/8513628.html)

易错点：  
1\. 运行报错，注意看有没有安装pycryptodope：pip install pycryptodope  
2\. 支付使用的是商户的私钥+支付宝的公钥，而不是你个人的公钥（注意：支付宝公钥是根据公钥自动生成的）  
3\. 支付宝支付成功后,首先页面做了跳转,支付宝会往你指定的url里发了一个post请求  
4\. 支付宝要求处理post请求的视图函数返回HttpResponse('success') #如果没有返回success，一天以内一直给你发相同post请求



 

开发环境
====

 

 

pip
---

 ```
# 批量安装
pip install -r requirements.txt  #注,如果有报错，先注释掉报错模块，然后单独安装
# 生成requirement.txt文件
pip freeze > requirements.txt
# 查找指定模块
pip frzeeze | grep 'pexpect'
```
 

虚拟环境
----

[详细](https://www.cnblogs.com/codechangemyworld/p/5277032.html)

pycharm断点调试
-----------

 [详细](https://www.cnblogs.com/Rocky_/p/6187275.html) 

Django推荐项目布局
------------

[详细](http://www.atjiang.com/recommended-django-project-layout/)

 

生产环境
====

uWSGI
-----

 ```
#启动
uwsgi --ini uwsgi.ini
#查看
ps ajx|grep uwsgi
#停止
uwsgi --stop uwsgi.pid 
```
 

nginx
-----

[**详细** ](https://github.com/jaywcjlove/nginx-tutorial/blob/master/README.md)

**- nginx常用命令**

 ```
启动
# 启动nginx，可以浏览器访问一下本地地址 127.0.0.1:8080
nginx -c /path/to/nginx.conf
 # 测试nginx配置文件是否正确
nginx -t -c /path/to/nginx.conf
```
 查看  
 lsof -i:80  
 ps aux | grep nginx

 ```
更新
# 平滑重启nginx
kill -HUP 主进程号 
#修改配置后重新加载生效
```
 ```
nginx -s reload 
#重新打开日志文件
nginx -s reopen  

关闭
# 快速停止nginx
nginx -s stop  
# 完整有序的停止nginx
nginx -s quit

kill关闭
ps -ef | grep nginx
# 从容停止Nginx
kill -QUIT 主进程号     
# 快速停止Nginx
kill -TERM 主进程号     
# 强制停止Nginx
pkill -9   主进程号             
```
 

**- 配置**

**首先，简单地复习一下配置语法**   
若配置语法忘了，[点击这里](https://juejin.im/entry/583c19a961ff4b006cc4e377)，简洁明了  
基础的场景配置，[点击这里](https://blog.csdn.net/tuesdayma/article/details/81359913)

一些指令（坑）  
[index指令](https://blog.csdn.net/qq_32331073/article/details/81945134#index_4)  
[alias和root指令对比](https://www.cnblogs.com/kevingrace/p/6187482.html)  
[error\_page指令](https://www.centos.bz/2017/08/nginx-custom-404-page/)(例子说明，自定义404页面）  
[location指令(顺序）](https://www.cnblogs.com/coder-yoyo/p/6346595.html)

部署流程
----

### 一.代码准备

**第一步，setting.py更改变量**

 ```
DEBUG = False 
ALLOWED_HOSTS = ['*']
```
 

**第二步，指明静态文件路径**   
注: 

1.DEBUG为False时，django的开发环境的自动静态文件代理失效，要使用STATIC\_ROOT来指明你的静态文件在哪里，就像MEDIA\_ROOT一样。 

2.STATIC\_ROOT还跟django的python manage.py collectstatic命令联系，指定的文件夹会指定为用于静态文件收集的文件夹  

3.若使用uwsgi和nginx都可以代理静态文件，其实指不指明没什么影响

```
#setting.py:
STATIC_ROOT = os.path.join(BASE_DIR, "static")
#ErrorReport/urls.py:
url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
```
 

**第三步，收集静态文件**   
1.STATIC\_ROOT = os.path.join(BASE\_DIR, "static1")  
2.python manage.py collectstatic  
3.删除原有的static，将static1重命名为static

### 二.环境准备

**第一步，pip freeze > plist.txt**   
**第二步，将项目代码和plist.txt上传**   
**第三步，虚拟环境准备**

 ```
pip install virtualenv
pip install virtualenvwrapper
mkvirtualenv -p python3.6 env36
```
 

### 三.配置uWSGI  


**第一步，安装uwsgi**

 ```
pip install uwsgi
```
 

**第二步，命令行启动测试**

 ```
uwsgi --http 127.0.0.1:8080 --file ErrorReport/wsgi.py --static-map=/static=static
```
 

注意:若出现异常，cant not import django 解决办法  
 第一步:先重装  
 pip install django==1.11.12  
 第二步:若django已经存在，则在wsgi.py中  
 sys.path.append('/Users/yi/.virtualenvs/yi3/lib/python3.6/site-packages')

**第三步:新建配置文件wsgi.ini进行配置(**若浏览器访问127.0.0.1:8080 正常，则进行第三步）****   
 项目目录下创建script文件夹，里面新建wsgi.ini

 ```
[uwsgi]
# 项目目录
chdir = /Users/yi/PycharmProjects/djangos/ErrorReport/
# 指定虚拟环境。防止虚拟virtualenv环境的包，而在真实环境没有安装相关包的导致错误
home = /Users/yi/.virtualenvs/yi3
# 指定项目的application
module = ErrorReport.wsgi:application
# 指定sock的文件路径
# socket = /Users/yi/PycharmProjects/djangos/ErrorReport/script/uwsgi.sock
# 启用主进程
master = true
# 进程个数
process=4
pidfile = /Users/yi/PycharmProjects/djangos/ErrorReport/script/uwsgi.pid
# 指定HTTP IP端口,若是有上游服务器，则这里为socket
 http = 127.0.0.1:9000
# socket = 127.0.0.1:9000

# 使用静态文件挂载点
#“映射”指定请求前缀到你的文件系统上的物理目录，--static-map mountpoint=path
# 例如：--static-map /images=/var/www/img
 static-map = /static=static
# 启动uwsgi的用户名和用户组
uid = root
gid = root
# 自动移除unix Socket和pid文件当服务停止的时候
vacuum = true
# 序列化接受的内容，如果可能的话
thunder-lock = true
# 启用线程
enable-threads = true
# 设置自中断时间
harakiri = 30
# 设置缓冲
post-buffering = 4096
# 设置日志目录
daemonize = /Users/yi/PycharmProjects/djangos/ErrorReport/script/uwsgi.log
#每个进程可以接受的最大请求
max-requests = 5000# buffer-size，表明收到的最大请求size，默认是4096，可以将其改成65535buffer-size = 65535
```
 

**第四步：更改uwsgi为上游服务器（若浏览器测试127.0.0.1:9000访问成功）**   
注: 当单独测试uwsgi，http = 127.0.0.1:9000。当nginx做前端服务器时，要改成socket = 127.0.0.1:9000  
uwsgi.ini中：  
http = 127.0.0.1:9000 => socket = 127.0.0.1:9000

### 四.配置nginx

**第一步，安装**   
这里我用的是macOS电脑，主要用于开发测试，所以使用brew install nginx安装即可。  
若到真正的生产环境上，对nginx的模块定制有更加严格的要求，则需要编译安装

macOS中使用brew安装后，nginx的配置文件所在目录为

 ```
/usr/local/etc/nginx
```
 

**第二步，更改目录**   
macOS原本的nginx.conf非常不科学，我们按照ubuntu的目录结构来改造  
在 /usr/local/etc/nginx中创建以下文件夹

conf.d # 通用一般配置  
sites-available # 存放当前的server配置, 在这里修改  
sites-enabled # 激活并使用的server配置（从sites\_available的文件创建快捷方式到sites-enabled）

**第三步，更改nginx.conf文件**   
macOS的nginx.conf配置成ubuntu的默认nginx.conf。

 ```
worker_processes auto;

events {
    worker_connections 768;
    # multi_accept on;
}

http {

    ##
    # Basic Settings
    ##

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    # server_tokens off;

    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include mime.types;
    default_type application/octet-stream;

    ##
    # SSL Settings
    ##

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    ##
    # Logging Settings
    ##

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    ##
    # Gzip Settings
    ##

    gzip on;
    gzip_disable "msie6";

    # gzip_vary on;
    # gzip_proxied any;
    # gzip_comp_level 6;
    # gzip_buffers 16 8k;
    # gzip_http_version 1.1;
    # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    ##
    # Virtual Host Configs
    ##

    include conf.d/*.conf;
    include sites-enabled/*.conf;
}

#mail {
#    # See sample authentication script at:
#    # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#    # auth_http localhost/auth.php;
#    # pop3_capabilities "TOP" "USER";
#    # imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#    server {
#        listen     localhost:110;
#        protocol   pop3;
#        proxy      on;
#    }
# 
#    server {
#        listen     localhost:143;
#        protocol   imap;
#        proxy      on;
#    }
#}
```
 

**第四步，在sites-available下新增要部署项目的server配置**  例如：新建ErrorReport.conf

 ```
server {
        listen       80;
        server_name  myblog;
        client_max_body_size 75m;
        charset utf-8;
        
        # 静态文件代理
        location /static{
            alias /Users/yi/PycharmProjects/djangos/ErrorReport/static;
        }
        
        # 上传的静态文件代理
        location /uploads{
            alias /Users/yi/PycharmProjects/djangos/ErrorReport/uploads;
        }
       
        # uwsgi转发配置
        location /{
            include  /usr/local/etc/nginx/uwsgi_params;
            uwsgi_pass  127.0.0.1:9000;         
        }

        #location / {
         #   root /usr/local/etc/nginx/html;
          #  index index.html;
        #}
    }
```
 

**第五步，在sites-enabled新建一个软连接指向上一步新建的配置文件**

从/usr/local/etc/nginx可以看到，http块下用include导入conf.d，sites-enabled的配置文件

 ```
 ln -s sites-available/ErrorReport.conf sites-enabled/ErrorReport.conf 
```
 

**第六步，启动nginx测试**

 ```
sudo nginx -t 
sudo nginx
sudo nginx -s stop
sudo nginx -s reload
```
 

若访问127.0.0.1成功，则部署成功  
注：也可以按照你所配置第server\_name来测试访问，但是要更改本地第host文件

通过supervisor管理进程
----------------

上面我们已经用到了uwsgi，后面可能还会用到redis、celery，都需要开启守护进程，其中celery自身还不支持守护进程。那么如何管理这么多进程呢，这时候可以考虑下supervisor

 ```
pip install supervisor
```
 

### 配置

我们可以配置redis,celery,uwsgi进去，比如向下面一样

 ```
[program:redis]
;指定运行目录
directory=%(here)s/
;执行命令（redis-server redis配置文件路径）
command=redis-server /etc/redis.conf

;启动设置
numprocs=1          ;进程数
autostart=true      ;当supervisor启动时,程序将会自动启动
autorestart=true    ;自动重启

;停止信号
stopsignal=INT


[program:celery.worker.default]
;指定运行目录
directory=%(here)s/
;运行目录下执行命令
command=celery -A DjangoProject worker --loglevel info --logfile log/celery_worker.log -Q default -n %%h-%(program_name)s-%(process_num)02d
process_name=%(process_num)02d

;启动设置 
numprocs=2          ;进程数
autostart=true      ;当supervisor启动时,程序将会自动启动 
autorestart=true    ;自动重启
 
;停止信号,默认TERM 
;中断:INT (类似于Ctrl+C)(kill -INT pid)，退出后会将写文件或日志(推荐) 
;终止:TERM (kill -TERM pid) 
;挂起:HUP (kill -HUP pid),注意与Ctrl+Z/kill -stop pid不同 
;从容停止:QUIT (kill -QUIT pid) 
stopsignal=INT

[program:uwsgi]
;指定运行目录
directory=%(here)s/
;运行目录下执行命令
command=uwsgi -i conf/uwsgi/uwsgi9090.ini

;启动设置
numprocs=1          ;进程数
autostart=true      ;当supervisor启动时,程序将会自动启动
autorestart=true    ;自动重启

;停止信号,默认TERM
;中断:INT (类似于Ctrl+C)(kill -INT pid)，退出后会将写文件或日志(推荐)
;终止:TERM (kill -TERM pid)
;挂起:HUP (kill -HUP pid),注意与Ctrl+Z/kill -stop pid不同
;从容停止:QUIT (kill -QUIT pid)
stopsignal=INT
```
 

#### **使用** 

启动supervisor输入如下命令，使用具体的配置文件执行：

 ```
supervisord -c supervisord.conf
```
 

关闭supervisord需要通过supervisor的控制器：

 ```
supervisorctl -c supervisord.conf shutdown
```
 

重启supervisord也是通过supervisor的控制器：

 ```
supervisorctl -c supervisord.conf reload
```
 

### **一些特殊的变量** 

 ```
%(here)s   配置文件所在路径
(program_name)s   program的名字
%(process_num)02d  多进程时的进程号
```
 

注意：1.command中如果含有%，需要进行转义`%%<br></br>` 2.多进程时如果不指定process\_name会遇到如下错误

 ```
Error: Format string 'celery -A INTProject worker --loglevel info --logfile log/celery_worker.log -Q diff_task,caller_task -n %h' for 'program:celery.worker.mac.command' is badly formatted: incomplete format in section 'program:celery.worker.mac' (file: 'supervisord.conf')
```
 


<font size=2 color=grey>[阅读原文](https://www.cnblogs.com/ziyide/p/10176931.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
