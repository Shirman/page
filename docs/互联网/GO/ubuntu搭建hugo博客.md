

### install

各个平台安装详见：https://gohugo.io/getting-started/installing/

ubuntu：
```
sudo apt-get install hugo
```

### new site

> hugo new site [project-name]
```
chenqingji@ubuntu:/var/www/html$ sudo hugo new site blog

Congratulations! Your new Hugo site is created in "/var/www/html/blog".
```
### 安装主题皮肤

主题库：https://themes.gohugo.io


主题：hugo-future-imperfect-slim

https://github.com/pacollins/hugo-future-imperfect-slim.git

```
git clone https://github.com/pacollins/hugo-future-imperfect-slim.git themes/future
```

### 新增page
```
chenqingji@iZu1cxibx8jZ:/var/www/html/blog$ sudo hugo  new about.md
/var/www/html/blog/content/about.md created

chenqingji@iZu1cxibx8jZ:/var/www/html/blog$ sudo vim content/about.md 

chenqingji@iZu1cxibx8jZ:/var/www/html/blog$ sudo hugo new post/first.md
/var/www/html/blog/content/post/first.md created

chenqingji@iZu1cxibx8jZ:/var/www/html/blog$ sudo vim content/post/first.md 
```

```
+++
date = "2019-10-13T14:26:21+08:00"
draft = true
title = "first"

+++
post first page content

```

### 本地预览


```
chenqingji@iZu1cxibx8jZ:/var/www/html/blog$ hugo server -D -t future
=============================================================
Your rendered home page is blank: /index.html is zero-length
 * Did you specify a theme on the command-line or in your
   "config.toml" file?  (Current theme: "")
 * For more debugging information, run "hugo -v"
=============================================================
0 of 2 drafts rendered
0 future content
0 pages created
0 non-page files copied
0 paginator pages created
0 tags created
0 categories created
in 8 ms
Watching for changes in /var/www/html/blog/{data,content,layouts,static}
Serving pages from memory
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop

```


### 生成静态页面

在生成之前先确定你想将此网站发布在哪儿，在 config.toml 里面配置 baseURL 为访问此网站的基本URL路径：

    baseURL = "https://9ong.com/"

然后

    hugo -t future

对，你没看错，直接执行 hugo 就可以了，它编译并生成网站所需的静态页面和文件，输出到当前目录的 public 目录下，当然你也可以改变输出目的地，如：

    hugo -d docs

你可以将生成的目录放到 nginx 或 tomcat 等服务器下对外提供服务，不过这需要自己有服务器。

### 配置

config.toml

https://gohugo.io/getting-started/configuration/