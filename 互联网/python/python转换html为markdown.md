使用python将html转换成markdown文件
==========================================

- [html2text](#html2text)
    - [安装](#安装)
    - [使用](#使用)
    - [高级用法](#高级用法)
    - [其他可选项](#其他可选项)

> 导读：虽然我大部分使用php生成markdown，但python库确实也比较丰富的不要不要，php composer也是参考学习python包管理，才会让php也有一种搭积木的感觉。
  
使用python将markdown转换成html的情况比较多，今天我们将另一个库将html转换为markdown。

## html2text


### 安装

1.使用pip

```
pip install html2text #python3使用pip3
```


2.源码安装 

> 如果使用的是python3将下面的python后面加一个3

```
git clone --depth 1 https://github.com/Alir3z4/html2text.git

python setup.py build

python setup.py install

```


### 使用

```
import html2text

html = "<p><strong>hello </strong> https://xxx.com </p>"
md = html2text.html2text(html)
print(md)

```


运行结果


```
**hello** https://xxx.com
```
### 高级用法

忽略链接即a标签

```
import html2text
text_maker = html2text.HTML2Text()
text_maker.ignore_links = True
text_maker.bypass_tables = False
html = html
text = text_maker.handle(html)
print(text)

```


运行结果

```
**hello** https://xxx.com

链接
```

如果将ignore\_links = False 运行结果

```
**hello** https://xxx.com

[链接](https://xxx.com)
```

我们可以看到开启之后只提取文本，而关闭后变成了markdown的链接语法

### 其他可选项

- UNICODE\_SNOB for using unicode
- ESCAPE\_SNOB for escaping every special character
- LINKS\_EACH\_PARAGRAPH for putting links after every paragraph
- BODY\_WIDTH for wrapping long lines
- SKIP\_INTERNAL\_LINKS to skip #local-anchor things
- INLINE\_LINKS for formatting images and links
- PROTECT\_LINKS protect from line breaks
- GOOGLE\_LIST\_INDENT no of pixels to indent nested lists
- IGNORE\_ANCHORS
- IGNORE\_IMAGES
- IMAGES\_AS\_HTML always generate HTML tags for images; preserves `height`, `width`, `alt` if possible.
- IMAGES\_TO\_ALT
- IMAGES\_WITH\_SIZE
- IGNORE\_EMPHASIS
- BYPASS\_TABLES format tables in HTML rather than Markdown
- IGNORE\_TABLES ignore table-related tags (table, th, td, tr) while keeping rows
- SINGLE\_LINE\_BREAK to use a single line break rather than two
- UNIFIABLE is a dictionary which maps unicode abbreviations to ASCII values
- RE\_SPACE for finding space-only lines
- RE\_ORDERED\_LIST\_MATCHER for matching ordered lists in MD
- RE\_UNORDERED\_LIST\_MATCHER for matching unordered list matcher in MD
- RE\_MD\_CHARS\_MATCHER for matching Md \\,\[,\],( and )
- RE\_MD\_CHARS\_MATCHER*ALL for matching `,\*,* ,{,},\[,\],(,),#,!
- RE\_MD\_DOT\_MATCHER for matching lines starting with 1.
- RE\_MD\_PLUS\_MATCHER for matching lines starting with +
- RE\_MD\_DASH\_MATCHER for matching lines starting with (-)
- RE\_SLASH\_CHARS a string of slash escapeable characters
- RE\_MD\_BACKSLASH\_MATCHER to match \\char
- USE\_AUTOMATIC\_LINKS to convert <http://xyz> to <http://xyz>
- MARK\_CODE to wrap 'pre' blocks with \[code\]...\[/code\] tags
- WRAP\_LINKS to decide if links have to be wrapped during text wrapping (implies INLINE\_LINKS = False)
- WRAP\_LIST\_ITEMS to decide if list items have to be wrapped during text wrapping
- DECODE\_ERRORS to handle decoding errors. 'strict', 'ignore', 'replace' are the acceptable values.
- DEFAULT\_IMAGE\_ALT takes a string as value and is used whenever an image tag is missing an `alt` value. The default for this is an empty string '' to avoid backward breakage
- OPEN\_QUOTE is the character used to open a quote when replacing the `<q>` tag. It defaults to `"`.
- CLOSE\_QUOTE is the character used to close a quote when replacing the `<q>` tag. It defaults to `"`.


<font size=2 color=grey>[阅读原文](https://litets.com/article/2019/4/3/103.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
