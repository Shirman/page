
<!-- TOC -->

- [前言](#前言)
- [相关资料](#相关资料)
- [PaddlePaddle安装](#paddlepaddle安装)
    - [ubuntu环境](#ubuntu环境)
    - [windows安装](#windows安装)
    - [验证安装](#验证安装)
    - [卸载](#卸载)
- [新冠疫情可视化](#新冠疫情可视化)
    - [抓取新冠疫情数据](#抓取新冠疫情数据)
    - [安装pyecharts](#安装pyecharts)
    - [可视化](#可视化)
        - [全国累计确诊饼图](#全国累计确诊饼图)
        - [湖北累计确诊图](#湖北累计确诊图)
        - [新增趋势折线图](#新增趋势折线图)
- [其他](#其他)
    - [notebook的使用](#notebook的使用)

<!-- /TOC -->

## 前言

目前流行的几个深度学习框架，Google的TensorFlow，Facebook的Pytorch，国内的有百度的PaddlePaddle，中文名：飞桨。本系列文章结合百度AI Studio学院的免费培训，整理每次学习资料及心得，希望对大家有所帮助。

## 相关资料

- 理论视频版

图像识别与人工智能：
https://aistudio.baidu.com/aistudio/education/lessonvideo/246985

- 理论文档版

图像识别与人工智能：
https://aistudio.baidu.com/aistudio/education/preview/237309

- 实践视频版

新冠疫情可视化：
https://aistudio.baidu.com/aistudio/education/lessonvideo/246986

本次学习主要从三个方面介绍人工智能与图像识别：

- 图像识别定义和问题
- 传统图像识别方法
- 人工智能发展历程


> 建议先看视频版，老师通俗易懂的讲解，让在人工智能/机器学习/图像识别方面的小白，可以激发兴趣并轻松入门了解人工智能/机器学习/深度学习。
>
> 有兴趣后，可以尝试去安装百度的PaddlePaddle框架，本次主要学习如何安装PaddlePaddle框架，及复习python如何爬取数据保存、统计、分析、可视化。
>
> 当然，如果你暂时没有GPU的设备，百度提供了不错的AI Studio平台，可以使用百度的AI Studio进行编码执行测试。


## PaddlePaddle安装

### ubuntu环境

参考官方文档：https://www.paddlepaddle.org.cn/documentation/docs/zh/install/install_Ubuntu.html

- 环境要求

    - Ubuntu 版本 (64 bit)
        - Ubuntu 14.04 (GPU 版本支持 CUDA 10.0/10.1)
        - Ubuntu 16.04 (GPU 版本支持 CUDA 9.0/9.1/9.2/10.0/10.1)
        - Ubuntu 18.04 (GPU 版本支持 CUDA 10.0/10.1)
    - Python 版本 2.7.15+/3.5.1+/3.6/3.7 (64 bit)
    - pip或pip3 版本 9.0.1+ (64 bit)

- CUDA

https://docs.nvidia.com/cuda/cuda-installation-guide-linux/

- cuDNN
https://docs.nvidia.com/deeplearning/sdk/cudnn-install/#install-linux

- PaddlePaddle

推荐使用pip进行安装(cpu版本)

```
aistudio@jupyter-266238-356283:~$ python3 -m pip install paddlepaddle -i https://mirror.baidu.com/pypi/simple
Looking in indexes: https://mirror.baidu.com/pypi/simple
Collecting paddlepaddle
  Downloading https://mirror.baidu.com/pypi/packages/a4/57/9f3069ab624752d2afbf255605af0244633245629c6ef717b117989bfa9d/paddlepaddle-1.7.1-cp37-cp37m-manylinux1_x86_64.whl (102.9MB)
     |████████████████████████████████| 102.9MB 274kB/s 
Requirement already satisfied: objgraph in /opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages (from paddlepaddle) (3.4.1)
....省略部分.....
Requirement already satisfied: idna<2.9,>=2.5 in /opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages (from requests>=2.20.0->paddlepaddle) (2.8)
Requirement already satisfied: urllib3!=1.25.0,!=1.25.1,<1.26,>=1.21.1 in /opt/conda/envs/python35-paddle120-env/lib/python3.7/site-packages (from requests>=2.20.0->paddlepaddle) (1.25.6)
Installing collected packages: paddlepaddle
Successfully installed paddlepaddle-1.7.1
```

### windows安装

- 环境

windows10

NVIDIA GeForce MX150

- 显卡、CUDA、cuDNN的关系

https://blog.csdn.net/qq_40414818/article/details/89215514

- 准备

  - 首先确认本地是否支持GPU，比如可以在设备管理器->显示适配器，查看用的什么显卡，并去相应官方网站确认该版本显卡是否支持GPU，及计算力是否在1.0以上。目前大部分都是NVIDIA的显卡，比如GeForce MX150，虽然在官方GPU支持列表上https://developer.nvidia.com/cuda-gpus，没有看到MX类的显卡，但我们可以在电脑控制面板->NVIDIA控制面板->帮助->组件中可以看到支持的CUDA最新版本。
  - 确认可支持的CUDA版本，目前PaddlePaddle官方发布的windows安装包仅包含 CUDA 9.0/10.0 的单卡模式，不包含 CUDA 9.1/9.2/10.1，如需使用，请通过源码自行编译。
  - 确认与CUDA版本相匹配的cuDNN
  - 

- CUDA


CUDA Toolkit安装（以下页面看不懂英文的话，可以尝试浏览器右键看菜单是否有翻译按钮，尝试翻译，中文与英文两个版本对比阅读，基本没有问题）

https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html


- cuDNN

https://docs.nvidia.com/deeplearning/sdk/cudnn-install/#install-windows

- PaddlePaddle


CPU版PaddlePaddle：
```
python -m pip install paddlepaddle -i https://mirror.baidu.com/pypi/simple 

#（推荐使用百度源） 
# 或 

python -m pip install paddlepaddle -i https://pypi.tuna.tsinghua.edu.cn/simple
```
GPU版PaddlePaddle：
```
python -m pip install paddlepaddle-gpu -i https://mirror.baidu.com/pypi/simple 

# 或

python -m pip install paddlepaddle-gpu -i https://pypi.tuna.tsinghua.edu.cn/simple
```

这里本地我们选择GPU的安装

```
PS I:\src\python-shiyanlou> python -m pip install paddlepaddle-gpu -i https://mirror.baidu.com/pypi/simple
Looking in indexes: https://mirror.baidu.com/pypi/simple
Collecting paddlepaddle-gpu
  Downloading https://mirror.baidu.com/pypi/packages/3f/5b/bed3a68979e9cb8530117c7f780a755ea9dd5d7c7a94881be11152cf8970/paddlepaddle_gpu-1.7.1.post107-cp37-cp37m-win_amd64.whl (200.0 MB)
  
........省略部分.........

  opencv-python, rarfile, protobuf, nltk, scipy, pyyaml, paddlepaddle-gpu
    Running setup.py install for rarfile ... done
    Running setup.py install for nltk ... done
Successfully installed funcsigs-1.0.2 graphviz-0.13.2 nltk-3.4.5 objgraph-3.4.1 opencv-python-4.2.0.32 paddlepaddle-gpu-1.7.1.post107 protobuf-3.11.3 pyyaml-5.3.1 rarfile-3.1 scipy-1.3.1
```

### 验证安装

如果没有正确安装CUDA/cuDNN的话，会出现以下第一次验证报cudnn64_7.dll之类的错误：

```
PS I:\src\python-shiyanlou> python
Python 3.7.7 (tags/v3.7.7:d7c567b08f, Mar 10 2020, 10:41:24) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import paddle.fluid as fluid
>>> fluid.install_check.run_check()
Running Verify Paddle Program ...
W0407 16:46:50.181149 13472 operator.cc:181] fill_constant raises an exception class std::runtime_error, cudnn64_7.dll not found.
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "C:\Users\jm\AppData\Local\Programs\Python\Python37\lib\site-packages\paddle\fluid\install_check.py", line 124, in run_check
    test_simple_exe()
  File "C:\Users\jm\AppData\Local\Programs\Python\Python37\lib\site-packages\paddle\fluid\install_check.py", line 120, in test_simple_exe
    exe0.run(startup_prog)
  File "C:\Users\jm\AppData\Local\Programs\Python\Python37\lib\site-packages\paddle\fluid\executor.py", line 783, in run
    six.reraise(*sys.exc_info())
  File "C:\Users\jm\AppData\Roaming\Python\Python37\site-packages\six.py", line 703, in reraise
    raise value
  File "C:\Users\jm\AppData\Local\Programs\Python\Python37\lib\site-packages\paddle\fluid\executor.py", line 778, in run
    use_program_cache=use_program_cache)
  File "C:\Users\jm\AppData\Local\Programs\Python\Python37\lib\site-packages\paddle\fluid\executor.py", line 831, in _run_impl
    use_program_cache=use_program_cache)
  File "C:\Users\jm\AppData\Local\Programs\Python\Python37\lib\site-packages\paddle\fluid\executor.py", line 905, in _run_program
    fetch_var_name)
RuntimeError: cudnn64_7.dll not found.
>>> exit()

```
正确安装CUDA/cuDNN后：
```

PS I:\src\python-shiyanlou> python
Python 3.7.7 (tags/v3.7.7:d7c567b08f, Mar 10 2020, 10:41:24) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import paddle.fluid as fluid
>>> fluid.install_check.run_check()
Running Verify Paddle Program ...
W0407 16:48:01.747396 12668 device_context.cc:237] Please NOTE: device: 0, CUDA Capability: 61, Driver API Version: 10.1, Runtime API Version: 10.0
W0407 16:48:01.763306 12668 device_context.cc:245] device: 0, cuDNN Version: 7.6.
Your Paddle works well on SINGLE GPU or CPU.
I0407 16:48:03.093737 12668 parallel_executor.cc:440] The Program will be executed on CUDA using ParallelExecutor, 1 cards are used, so 1 programs are executed in parallel.
I0407 16:48:03.093737 12668 build_strategy.cc:365] SeqOnlyAllReduceOps:0, num_trainers:1
I0407 16:48:03.093737 12668 parallel_executor.cc:307] Inplace strategy is enabled, when build_strategy.enable_inplace = True
I0407 16:48:03.093737 12668 parallel_executor.cc:322] Cross op memory reuse strategy is enabled, when build_strategy.memory_optimize = True or garbage collection strategy is disabled, which is not recommended
Your Paddle works well on MUTIPLE GPU or CPU.
Your Paddle is installed successfully! Let's start deep Learning with Paddle now

```

### 卸载


CPU版本的PaddlePaddle: 
```
python -m pip uninstall paddlepaddle 

# python3 -m pip uninstall paddlepaddle
```

GPU版本的PaddlePaddle: 
```
python -m pip uninstall paddlepaddle-gpu 

# python3 -m pip uninstall paddlepaddle-gpu
```


## 新冠疫情可视化

> 本章节，主要是复习下python的数据爬取、保存、统计、分析、可视化。这里可视化，我们采用百度的pyecharts。

### 抓取新冠疫情数据

```
import json
import re
import requests
import datetime

today = datetime.date.today().strftime('%Y%m%d')   #20200315

def crawl_dxy_data():
    """
    爬取丁香园实时统计数据，保存到data目录下，以当前日期作为文件名，存JSON文件
    """
    response = requests.get('https://ncov.dxy.cn/ncovh5/view/pneumonia') #request.get()用于请求目标网站
    print(response.status_code)                                          # 打印状态码


    try:
        url_text = response.content.decode()                             #更推荐使用response.content.deocde()的方式获取响应的html页面
        #print(url_text)
        url_content = re.search(r'window.getAreaStat = (.*?)}]}catch',   #re.search():扫描字符串以查找正则表达式模式产生匹配项的第一个位置 ，然后返回相应的match对象。
                                url_text, re.S)                          #在字符串a中，包含换行符\n，在这种情况下：如果不使用re.S参数，则只在每一行内进行匹配，如果一行没有，就换下一行重新开始;
                                                                         #而使用re.S参数以后，正则表达式会将这个字符串作为一个整体，在整体中进行匹配。
        texts = url_content.group()                                      #获取匹配正则表达式的整体结果
        content = texts.replace('window.getAreaStat = ', '').replace('}catch', '') #去除多余的字符
        json_data = json.loads(content)                                         
        with open('data/' + today + '.json', 'w', encoding='UTF-8') as f:
            json.dump(json_data, f, ensure_ascii=False)
    except:
        print('<Response [%s]>' % response.status_code)


def crawl_statistics_data():
    """
    获取各个省份历史统计数据，保存到data目录下，存JSON文件
    """
    with open('data/'+ today + '.json', 'r', encoding='UTF-8') as file:
        json_array = json.loads(file.read())

    statistics_data = {}
    for province in json_array:
        response = requests.get(province['statisticsData'])
        try:
            statistics_data[province['provinceShortName']] = json.loads(response.content.decode())['data']
        except:
            print('<Response [%s]> for url: [%s]' % (response.status_code, province['statisticsData']))

    with open("data/statistics_data.json", "w", encoding='UTF-8') as f:
        json.dump(statistics_data, f, ensure_ascii=False)


if __name__ == '__main__':
    crawl_dxy_data()
    crawl_statistics_data()
```

比如我们再AI Studio上执行的结果：

```
aistudio@jupyter-266238-356283:~$ python dxycrawl.py 
200
aistudio@jupyter-266238-356283:~$ ls
356283.ipynb  data  dxycrawl.py  work
aistudio@jupyter-266238-356283:~$ cd data/
aistudio@jupyter-266238-356283:~/data$ ls
20200331.json  data24815  statistics_data.json
```

### 安装pyecharts

注意python3与pyecharts的版本一致，且pyecharts新版本的使用方式与旧版的pyecahrts版本不一样。

```
pip install pyecharts
```

### 可视化

#### 全国累计确诊饼图

```
import json
import datetime
from pyecharts.charts import Pie
from pyecharts import options as opts

# 读原始数据文件
today = datetime.date.today().strftime('%Y%m%d')   #20200315
datafile = 'data/'+ today + '.json'
with open(datafile, 'r', encoding='UTF-8') as file:
    json_array = json.loads(file.read())

# 分析全国实时确诊数据：'confirmedCount'字段
china_data = []
for province in json_array:
    china_data.append((province['provinceShortName'], province['confirmedCount']))
china_data = sorted(china_data, key=lambda x: x[1], reverse=True)                 #reverse=True,表示降序，反之升序

print(china_data)
# 全国疫情地图
# 自定义的每一段的范围，以及每一段的特别的样式。
# pieces = [
#     {'min': 10000, 'color': '#540d0d'},
#     {'max': 9999, 'min': 1000, 'color': '#9c1414'},
#     {'max': 999, 'min': 500, 'color': '#d92727'},
#     {'max': 499, 'min': 100, 'color': '#ed3232'},
#     {'max': 99, 'min': 10, 'color': '#f27777'},
#     {'max': 9, 'min': 1, 'color': '#f7adad'},
#     {'max': 0, 'color': '#f7e4e4'},
# ]
labels = [data[0] for data in china_data]
counts = [data[1] for data in china_data]


p = Pie(init_opts=opts.InitOpts(height="500px"))
p.add("累计确诊",[list(z) for z in zip(labels,counts)],center=["40%","70%"])

# m = Map()
# m.add("累计确诊", [list(z) for z in zip(labels, counts)], 'china')

#系列配置项,可配置图元样式、文字样式、标签样式、点线样式等
p.set_series_opts(label_opts=opts.LabelOpts(font_size=12,formatter="{b}: {c}"),
                  is_show=False)
#全局配置项,可配置标题、动画、坐标轴、图例等
p.set_global_opts(title_opts=opts.TitleOpts(title='全国实时确诊数据',
                                            subtitle='数据来源：丁香园'),                                                                                
                  legend_opts=opts.LegendOpts(is_show=False))       #是否显示视觉映射配置
#render（）会生成本地 HTML 文件，默认会在当前目录生成 render.html 文件，也可以传入路径参数，如 m.render("mycharts.html")
p.render(path='html/全国实时确诊数据饼图.html')
```
    

#### 湖北累计确诊图

```
import json
import datetime
from pyecharts.charts import Map
from pyecharts import options as opts

# 读原始数据文件
today = datetime.date.today().strftime('%Y%m%d')   #20200315
datafile = 'data/'+ today + '.json'
with open(datafile, 'r', encoding='UTF-8') as file:
    json_array = json.loads(file.read())

# 分析湖北省实时确诊数据
# 读入规范化的城市名称，用于规范化丁香园数据中的城市简称
with open('data/pycharts_city.txt', 'r', encoding='UTF-8') as f:
    defined_cities = [line.strip() for line in f.readlines()]


def format_city_name(name, defined_cities):
    for defined_city in defined_cities:
        if len((set(defined_city) & set(name))) == len(name):
            name = defined_city
            if name.endswith('市') or name.endswith('区') or name.endswith('县') or name.endswith('自治州'):
                return name
            return name + '市'
    return None


province_name = '湖北'
for province in json_array:
    if province['provinceName'] == province_name or province['provinceShortName'] == province_name:
        json_array_province = province['cities']
        hubei_data = [(format_city_name(city['cityName'], defined_cities), city['confirmedCount']) for city in
                      json_array_province]
        hubei_data = sorted(hubei_data, key=lambda x: x[1], reverse=True)

        print(hubei_data)

labels = [data[0] for data in hubei_data]
counts = [data[1] for data in hubei_data]
pieces = [
    {'min': 10000, 'color': '#540d0d'},
    {'max': 9999, 'min': 1000, 'color': '#9c1414'},
    {'max': 999, 'min': 500, 'color': '#d92727'},
    {'max': 499, 'min': 100, 'color': '#ed3232'},
    {'max': 99, 'min': 10, 'color': '#f27777'},
    {'max': 9, 'min': 1, 'color': '#f7adad'},
    {'max': 0, 'color': '#f7e4e4'},
]

m = Map()
m.add("累计确诊", [list(z) for z in zip(labels, counts)], '湖北')
m.set_series_opts(label_opts=opts.LabelOpts(font_size=12),
                  is_show=False)
m.set_global_opts(title_opts=opts.TitleOpts(title='湖北省实时确诊数据',
                                            subtitle='数据来源：丁香园'),
                  legend_opts=opts.LegendOpts(is_show=False),
                  visualmap_opts=opts.VisualMapOpts(pieces=pieces,
                                                    is_piecewise=True,
                                                    is_show=True))
m.render(path='/home/aistudio/data/湖北省实时确诊数据.html')
```    

#### 新增趋势折线图

```
import numpy as np
import json
from pyecharts.charts import Line
from pyecharts import options as opts

# 读原始数据文件
datafile = 'data/statistics_data.json'
with open(datafile, 'r', encoding='UTF-8') as file:
    json_dict = json.loads(file.read())

# 分析各省份2月1日至今的新增确诊数据：'confirmedIncr'
statistics__data = {}
for province in json_dict:
    statistics__data[province] = []
    for da in json_dict[province]:
        if da['dateId'] >= 20200201:
            statistics__data[province].append(da['confirmedIncr'])

# 获取日期列表
dateId = [str(da['dateId'])[4:6] + '-' + str(da['dateId'])[6:8] for da in json_dict['湖北'] if
          da['dateId'] >= 20200201]

# 全国新增趋势
all_statis = np.array([0] * len(dateId))
for province in statistics__data:
    all_statis = all_statis + np.array(statistics__data[province])

all_statis = all_statis.tolist()
# 湖北新增趋势
hubei_statis = statistics__data['湖北']
# 湖北以外的新增趋势
other_statis = [all_statis[i] - hubei_statis[i] for i in range(len(dateId))]

line = Line()
line.add_xaxis(dateId)
line.add_yaxis("全国新增确诊病例",   #图例
                all_statis,       #数据
                is_smooth=True,   #是否平滑曲线
               linestyle_opts=opts.LineStyleOpts(width=4, color='#B44038'),#线样式配置项
               itemstyle_opts=opts.ItemStyleOpts(color='#B44038',          #图元样式配置项
                                                 border_color="#B44038",   #颜色
                                                 border_width=10))         #图元的大小
line.add_yaxis("湖北新增确诊病例", hubei_statis, is_smooth=True,
               linestyle_opts=opts.LineStyleOpts(width=2, color='#4E87ED'),
               label_opts=opts.LabelOpts(position='bottom'),              #标签在折线的底部
               itemstyle_opts=opts.ItemStyleOpts(color='#4E87ED',
                                                 border_color="#4E87ED",
                                                 border_width=3))
line.add_yaxis("其他省份新增病例", other_statis, is_smooth=True,
               linestyle_opts=opts.LineStyleOpts(width=2, color='#F1A846'),
               label_opts=opts.LabelOpts(position='bottom'),              #标签在折线的底部
               itemstyle_opts=opts.ItemStyleOpts(color='#F1A846',
                                                 border_color="#F1A846",
                                                 border_width=3))
line.set_global_opts(title_opts=opts.TitleOpts(title="新增确诊病例", subtitle='数据来源：丁香园'),
                     yaxis_opts=opts.AxisOpts(max_=16000, min_=1, type_="log",    #坐标轴配置项
                                              splitline_opts=opts.SplitLineOpts(is_show=True),#分割线配置项
                                              axisline_opts=opts.AxisLineOpts(is_show=True)))#坐标轴刻度线配置项
line.render(path='html/新增确诊趋势图.html')
```




## 其他

### notebook的使用

https://aistudio.baidu.com/aistudio/projectDetail/296022


-----
@tsingchan 2020
