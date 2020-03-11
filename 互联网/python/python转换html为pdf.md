使用python将html转为pdf
==================================


- [安装准备](#安装准备)
- [使用](#使用)


使用python将html转为pdf，需要使用到两个库 pdfkit和wkhtmltopdf，其中wkhtmltopdf不是python库，需要单独安装。

### 安装准备

1.安装pdfkit 使用pip

```
pip install pdfkit

```


2.安装wkhtmltopdf

地址：<https://github.com/JazzCore/python-pdfkit/wiki/Installing-wkhtmltopdf>

Debian / Ubuntu

```
apt-get install wkhtmltopdf

```


Fedora / RHEL / CentOS

```
yum install wkhtmltopdf

```


Mac/windows

到这里下载安装：<https://wkhtmltopdf.org/downloads.html>

mac还可以使用：

    brew install Caskroom/cask/wkhtmltopdf安装。

### 使用

基本使用

```
import pdfkit

pdfkit.from_url('https://xxx.com', 'target.pdf')
pdfkit.from_file('test.html', 'target.pdf')
pdfkit.from_string('Hello pdf!', 'target.pdf')

```


传递列表

```
pdfkit.from_url(['https://xxx.com/article/99.html', 'https://xxxx.com/'],'/tmp/target.pdf')

```


传递文件

```
with open('file.html') as f:
        pdfkit.from_file(f, 'target.pdf')

```


自定义样式：

```
options = {
    'page-size': 'Letter',
    'margin-top': '0.75in',
    'margin-right': '0.75in',
    'margin-bottom': '0.75in',
    'margin-left': '0.75in',
    'encoding': "UTF-8",
    'custom-header' : [
        ('Accept-Encoding', 'gzip')
    ]
    'cookie': [
        ('cookie-name1', 'cookie-value1'),
        ('cookie-name2', 'cookie-value2'),
    ],
    'no-outline': None
}

    pdfkit.from_url('http://litets.com', 'home.pdf', options=options)

```


官方仓库：<https://github.com/JazzCore/python-pdfkit>


<font size=2 color=grey>[阅读原文](https://litets.com/article/2019/4/3/100.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
