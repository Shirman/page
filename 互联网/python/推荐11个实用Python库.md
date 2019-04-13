推荐11个实用Python库
=======================================


- [1.delorean](#1delorean)
- [2.prettytable](#2prettytable)
- [3.snowballstemmer](#3snowballstemmer)
- [4.wget](#4wget)
- [5.PyMC](#5pymc)
- [6.sh](#6sh)
- [7.fuzzywuzzy](#7fuzzywuzzy)
- [8.progressbar](#8progressbar)
- [9.colorama](#9colorama)
- [10.uuid](#10uuid)
- [11.bashplotlib](#11bashplotlib)


## 1.delorean

非常酷的日期/时间库

```
from delorean import Delorean
EST = "US/Eastern"
d = Delorean(timezone=EST)
```

## 2.prettytable

可以在浏览器或终端构建很不错的输出

```
from prettytable import PrettyTable
table = PrettyTable(["animal", "ferocity"])
table.add_row(["wolverine", 100])
table.add_row(["grizzly", 87])
table.add_row(["Rabbit of Caerbannog", 110])
table.add_row(["cat", -1])
table.add_row(["platypus", 23])
table.add_row(["dolphin", 63])
table.add_row(["albatross", 44])
table.sort_key("ferocity")
table.reversesort = True
+----------------------+----------+
|        animal        | ferocity |
+----------------------+----------+
| Rabbit of Caerbannog |   110    |
|      wolverine       |   100    |
|       grizzly        |    87    |
|       dolphin        |    63    |
|      albatross       |    44    |
|       platypus       |    23    |
|         cat          |    -1    |
+----------------------+----------+
```

## 3.snowballstemmer


非常瘦小的语言转换库，支持15种语言

```
from snowballstemmer import EnglishStemmer, SpanishStemmer
EnglishStemmer().stemWord("Gregory")
# Gregori
SpanishStemmer().stemWord("amarillo")
# amarill
```
## 4.wget

Python的网络爬虫库

```
import wget
wget.download("#100% [............................................................................] 280385 / 280385
```
## 5.PyMC

PyMC，一个用于贝叶斯分析的函数库

```
from pymc.examples import disaster_model
from pymc import MCMC
M = MCMC(disaster_model)
M.sample(iter=10000, burn=1000, thin=10)
[-----------------100%-----------------] 10000 of 10000 complete in 1.4 sec
```
## 6.sh

将shell命令作为函数导入Python脚本

```
from sh import find
find("/tmp")
/tmp/foo
/tmp/foo/file1.json
/tmp/foo/file2.json
/tmp/foo/file3.json
/tmp/foo/bar/file3.json

```
## 7.fuzzywuzzy

用于字符串匹配率、令牌匹配等

```
from fuzzywuzzy import fuzz
fuzz.ratio("Hit me with your best shot", "Hit me with your pet shark")
# 85

```
## 8.progressbar

如其名，一个滚动条函数库

```
from progressbar import ProgressBar
import time
pbar = ProgressBar(maxval=10)
for i in range(1, 11):
    pbar.update(i)
    time.sleep(1)
 pbar.finish()

# 60% |########################################################                                      |
```

## 9.colorama

一个色彩库，可以为文本添加丰富的色彩

![图片描述](https://segmentfault.com/img/bVkFFz)

## 10.uuid

一个可以产生唯一uuid的库

```
import uuid
print uuid.uuid4()
# e7bafa3d-274e-4b0a-b9cc-d898957b4b61
```

## 11.bashplotlib

Python的绘图控件，可以绘制直方图、散点图等

```
$ pip install bashplotlib
$ scatter --file data/texas.txt --pch x

```

![图片描述](https://segmentfault.com/img/bVkFFL)



----
<font size=2 color='grey'>本文收藏来自互联网，著作权归原作者所有，如有侵权请联系删除</font>

markdown @tsingchan 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
