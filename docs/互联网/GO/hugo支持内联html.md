

由于Markdown无法正确居中和调整图像大小，因此我在markdown文件中使用了原始HTML标签来包含图像：
```html
<p align="center">
<img src="xxx.xx.xx/test.jpg">
</p>
```
最近，在更新到Hugo版本0.62之后，我发现生成的HTML文件中缺少所有使用HTML标记的图像。

我检查了生成的HTML源文件中的帖子，发现图像的原始HTML标签呈现为以下注释：

```html
<!-- raw HTML omitted -->
```
经过一番挖掘，我找出了原因。以前，Hugo使用 Blackfriday渲染Markdown文件。从Hugo 0.60版本开始，默认的Markdown渲染器已更改为goldmark。在goldmark中，默认设置是不呈现原始HTML标签。

要解决此问题，您有两个选择。

第一个选项，设置blackfriday为默认的Markdown引擎。打开 config.toml并添加以下设置：
```toml
[markup]
  defaultMarkdownHandler = "blackfriday"
```
第二个选择，使用goldmark和设置unsafe的选项 markup.goldmark.renderer来true：

```toml
[markup]
  defaultMarkdownHandler = "goldmark"
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
```

参考文献
Hugo 0.60发行说明。
https://gohugo.io/getting-started/configuration-markup/
https://discourse.gohugo.io/t/raw-html-getting-omitted-in-0-60-0/22032/18
https://discourse.gohugo.io/t/hugo-0-60-0-raw-html-omitted-issue/22010/9
https://github.com/gohugoio/hugo/issues/5963