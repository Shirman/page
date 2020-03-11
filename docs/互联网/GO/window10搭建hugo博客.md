<!-- TOC -->

- [下载](#下载)
- [创建目录](#创建目录)
- [解压](#解压)
- [系统环境变量PATH增加](#系统环境变量path增加)
- [测试](#测试)
- [new site](#new-site)
- [主题](#主题)
- [new page](#new-page)

<!-- /TOC -->

### 下载

https://github.com/gohugoio/hugo/releases

### 创建目录

    I:\src\hugo-blog\bin

### 解压

    I:\src\hugo-blog\bin\hugo.exe

### 系统环境变量PATH增加

    I:\src\hugo-blog\bin

### 测试

    PS C:\Users\jm\Desktop> hugo version
    Hugo Static Site Generator v0.58.3-4AAC02D4 windows/amd64 BuildDate: 2019-09-19T15:29:19Z


### new site

    PS I:\src\hugo-blog> hugo new site blog
    Congratulations! Your new Hugo site is created in I:\src\hugo-blog\blog.

    Just a few more steps and you're ready to go:

    1. Download a theme into the same-named folder.
    Choose a theme from https://themes.gohugo.io/ or
    create your own with the "hugo new theme <THEMENAME>" command.
    2. Perhaps you want to add some content. You can add single files
    with "hugo new <SECTIONNAME>\<FILENAME>.<FORMAT>".
    3. Start the built-in live server via "hugo server".

    Visit https://gohugo.io/ for quickstart guide and full documentation.

### 主题

    到blog\themes目录下，git clone 或直接下载zip

    git init
    
    git submodule add https://github.com/alex-shpak/hugo-book themes/hugo-book

    I:\src\hugo-blog\blog\themes\hugo-book

### new page

```
hugo new post/1.md
```

```
+++
date = "2019-10-13T14:26:21+08:00"
draft = true
title = "first"

+++
post first page content
```





