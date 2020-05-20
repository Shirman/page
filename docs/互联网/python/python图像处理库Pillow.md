<!-- TOC -->

- [安装](#安装)
- [使用](#使用)
- [读写图片](#读写图片)
- [生成缩略图](#生成缩略图)
- [裁剪、复制、合并](#裁剪复制合并)
- [旋转180度](#旋转180度)

<!-- /TOC -->

### 安装

```
$ pip install Pillow

```


### 使用

```
from PIL import Image

im = Image.open('1.jpg')

print(im.format, im.size, im.mode)

```


输出

```
JPEG (640, 400) RGB
```

显示

```
im.show() #依赖系统，有可能无效，如果电脑没有安装预览工具

```


### 读写图片

Python图片库支持多种格式，通过`open()`就可以打开一张图片，不需要知道是什么格式的图片。

同样使用`save()`函数就可以保存一张图片到硬盘。

```
Image.open(infile).save(outfile)

```


### 生成缩略图

```
im = Image.open(infile)
im.thumbnail(size)
im.save(outfile, "JPEG")

```


### 裁剪、复制、合并

裁剪300x300的图片

```
box = (100, 100, 400, 400)
region = im.crop(box)

```


拆分RGB通道

```
r, g, b = im.split()
im = Image.merge("RGB", (b, g, r))

```


### 旋转180度

```
region = region.transpose(Image.ROTATE_180)
im.paste(region, box)

out = im.resize((128, 128)) ##跳转大小
out = im.rotate(45) # degrees counter-clockwise

out = im.transpose(Image.FLIP_LEFT_RIGHT)
out = im.transpose(Image.FLIP_TOP_BOTTOM)
out = im.transpose(Image.ROTATE_90)
out = im.transpose(Image.ROTATE_180)
out = im.transpose(Image.ROTATE_270)

```



<font size=2 color=grey>[阅读原文](https://litets.com/article/2019/4/3/106.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
