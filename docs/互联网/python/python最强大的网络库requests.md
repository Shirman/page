<!-- TOC -->

- [特点](#特点)
- [安装](#安装)
    - [使用pip](#使用pip)
    - [下载源码](#下载源码)
- [简单使用](#简单使用)
- [请求](#请求)
- [响应](#响应)
- [JSON响应](#json响应)

<!-- /TOC -->


> 如果你写爬虫requests配上Beatifulsoup那简直完美(小型爬虫)。

### 特点

- Keep-Alive & 连接池
- 国际化域名和 URL
- 带持久 Cookie 的会话
- 浏览器式的 SSL 认证
- 自动内容解码
- 基本/摘要式的身份认证
- 优雅的 key/value Cookie
- 自动解压
- Unicode 响应体
- HTTP(S) 代理支持
- 文件分块上传
- 流下载
- 连接超时
- 分块请求
- 支持 .netrc 

### 安装

#### 使用pip

```
python3: pip3 install requests
python2: pip install requests

```


#### 下载源码

```
git clone git://github.com/kennethreitz/requests.git
cd requests
pip/pip3 install .

```


### 简单使用

说明：本章使用的是python3

```
import requests
res = requests.get('https://litets.com')
print(res.status_code) # 状态码
print(res.headers['content-type']) # 响应header
print(res.encoding) # 编码
print(res.text) # 内容，文本形式

```


其他还有：

```
res = requests.post('http://xxxx', data={'key':'value'})
res = requests.put('http://xxxx', data={'key':'value'})
res = requests.delete('http://xxxx')
res = requests.head('http://xxxx')
res = requests.options('http://xxxx')

```


### 请求

使用get请求时我们需要在url后面拼接参数，但是requests和post很相似，他在内部封装好了

```
params={'key':'value','key1':'value1'}
res = requests.get('https://xxx', params=params)

```


如此即可，然后我们打印一下，

```
print(res.url)
https://xxx?key=value&key1=value1

```


***字典里为None的值不会被加到，url里面。*** 字典里的value还可以是列表。

```
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
r = requests.get('http://xxx', params=payload)
print(r.url)
http://xxx?key1=value1&key2=value2&key2=value3

```


### 响应

上面我们讲了请求的发送，接下来看看响应。

```
import requests
res = requests.get('https://litets.com')
print(res.text)

```


requests会自动解码服务的内容，比如编码格式，gzip等。 同时也可以使用res.encoding='utf-8'来修改编码格式。 上面的res.text主要是文本（string），如果想要获取到二进制响应内容需要使用另个api

```
res.content #类似java的byte

```


### JSON响应

由于json的简单方便，现在在日常开发中已经不可或缺，对于requests，要想使用json那也很容易。

```
import requests
res = requests.get('http://xxx/json')
res.json()

```


这样requests会使用内置的json解析器解析，如果解码失败，会抛出一个异常ValueError: No JSON object could be decoded。

<font size=2 color=grey>阅读原文：https://litets.com/article/2019/3/20/59.html</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
