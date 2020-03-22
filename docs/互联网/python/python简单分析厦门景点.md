<!-- TOC -->

- [环境](#环境)
- [爬虫抓取数据](#爬虫抓取数据)
- [数据分析](#数据分析)
- [备注](#备注)

<!-- /TOC -->

### 环境

Python版本：3.7.7

相关模块：

bs4模块；

jieba模块；

pyecharts模块；注意新版本的使用方式。

wordcloud模块；

requests模块；

> 以及一些Python自带的模块，比如tkinter，这个如果是windows系统，注意安装python的时候，建议保留tcl/idel的安装项，在wordcloud模块中会使用tkinter模块，在python3+版本是自带模块。
>
>
> 安装Python并添加到环境变量，pip安装需要的相关模块即可。如果有安装包比较大的，比如jieba模块，可以直接到pip官方下载对应whl文件，进行本地安装：pip install xxx.whl

### 爬虫抓取数据

首先，我们来明确一下我们想要爬取的数据是哪些，这里为了方便起见，我们只爬取厦门市的旅游景点数据。

页面地址：

https://you.ctrip.com/sight/xiamen21/s0-p0.html#sightname

即我们需要爬取的数据为厦门市所有景点的名称，位置，评分等数据。明确了我们的爬取目标，就可以开始写代码了。

代码实现起来其实也很简单，可以发现景点信息页的url变化规律如下：

```
https://you.ctrip.com/sight/beijing1/s0-p页码.html#sightname
```
那么我们只需要逐一请求所有相关网页，并借助bs4解析并提取我们需要的数据即可。同时，为了避免爬虫被封，我们每请求10次网页，就更换一个代理，代理来源，大家可以自己找。

具体而言，代码实现如下：

> 以下代理采用本地已有代理资源的文件，也可以更换成线上代理

```python
import json
import pickle
import requests
from bs4 import BeautifulSoup
import sys


'''携程旅游景点爬虫'''
class ctripSpider():
	def __init__(self):
		self.proxy = {'http': ''}
		self.count = 1
		self.pageCount = 1
	'''运行爬虫'''
	def start(self):
		headers = {
					'User-Agent': 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
					}
		url = 'https://you.ctrip.com/sight/xiamen21/s0-p%s.html#sightname'
		max_pages = 102
		page_count = 1
		results = {}
		while True:
			try:
				self.__updateProxy()
				res = requests.get(url % page_count, headers=headers, proxies=self.proxy)
				# res = requests.get(url % page_count, headers=headers)			
				print("Try....Proxy::"+self.proxy['http']+"\n")
				# break
				soup = BeautifulSoup(res.text, features='lxml')
				list_wide_mod2 = soup.find_all('div', class_='list_wide_mod2')[0]
				for each1, each2 in zip(list_wide_mod2.find_all('dl'), list_wide_mod2.find_all('ul', class_='r_comment')):
					name = each1.dt.a.text
					addr = each1.find_all('dd')[0].text.strip()
					level = each1.find_all('dd')[1].text.strip().split('|')[0].strip()
					if '携程' in level:
						level = 'unknow'
					try:
						price = each1.find_all('span', class_='price')[0].text.strip().replace('¥', '')
					except:
						price = 'unknow'
					score = each2.find_all('a', class_='score')[0].text.strip().replace('\xa0分', '')
					num_comments = each2.find_all('a', class_='recomment')[0].text.strip()[1: -3]
					results[name] = [addr, level, price, score, num_comments]
				page_count += 1
				print('[INFO]:爬取进度: %s/%s...' % (page_count-1, max_pages))
			except:		
				print("expected error:", sys.exc_info())						
				# sys.exit()
				# print("\n....except....\n")				
				self.__updateProxy()				

			if page_count == max_pages:
				break
		print('[INFO]:数据爬取完毕, 将保存在data.pkl中...')
		with open('data.pkl', 'wb') as f:
			pickle.dump(results, f)
	'''更新代理'''
	def __updateProxy(self):
		# print("===========__updateProxy OR EXception===============\n")				
		url = "https://proxyapi.horocn.com/api/v2/proxies?order_id=CPMO1661411152778373&num=10&format=json&line_separator=win&can_repeat=yes&user_token=ed61bf900b76274d26bb240bd279e9d6"
		headers = {
					'User-Agent': 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
					}

		self.pageCount += 1
		changeProxyCount = 5 #每5次更换一次代理

		if self.count > changeProxyCount:
			print("Proxy IP GET.........\n")
			# res = requests.get(url, headers=headers)
			# print(res.text)
			# res_json = json.loads(res.text)
			# self.proxy['http'] = 'http://%s:%s' % (res_json['data'][0]['host'], res_json['data'][0]['port'])

			with open("proxy.json",'r',encoding='utf-8') as pf:
				res_json = json.load(pf)
			proxyIndex = (self.pageCount // changeProxyCount) - 1
			self.proxy['http'] = 'http://%s:%s' % (res_json['data'][proxyIndex]['host'], res_json['data'][proxyIndex]['port'])			
			self.count = 1
		else:
			self.count += 1


if __name__ == '__main__':
	spider = ctripSpider()
	spider.start()
```

### 数据分析

```python 
'''
携程景点数据可视化
jm
'''
import os
import json
import jieba
import pickle
from pyecharts.globals import ThemeType
from pyecharts import options as opts
from pyecharts.charts import Bar
from pyecharts.charts import Pie
from pyecharts.charts import Funnel
from wordcloud import WordCloud



'''柱状图(2维)'''
def drawBar(title, data, savepath='.\\results'):
	if not os.path.exists(savepath):
		print("dir is not exists")		
		os.mkdir(savepath)
	else:
		print("dir is exists")

	bar = Bar()

	attrs = [i for i, j in data.items()]
	values = [j for i, j in data.items()]

	try:		
		print(os.path.join(savepath,'%s.html' % title))
		bar.add_xaxis(attrs).add_yaxis(title,values).set_global_opts(title_opts=opts.TitleOpts(title=title)).render(os.path.join(savepath,'%s.html' % title))
	except Exception as e:
		print(e)
		exit(0)
	

'''饼图'''
def drawPie(title, data, savepath='.\\results'):
	
	if not os.path.exists(savepath):
		os.mkdir(savepath)

	pie = Pie(init_opts=opts.InitOpts(theme=ThemeType.WESTEROS))
	# pie = Pie()	
	itemList = sorted(data.items(),key=lambda x: x[1],reverse=True)
	# attrs = [i for i, j in data.items()]
	# values = [j for i, j in data.items()]
	pie.add(title,itemList,radius=["50%","70%"],label_opts=opts.LabelOpts(is_show=True))\
	.set_global_opts(title_opts=opts.TitleOpts(title=title),legend_opts=opts.LegendOpts(pos_left="right",orient="vertical"))\
	.render(os.path.join(savepath,'%s.html' % title))


'''漏斗图'''
def drawFunnel(title, data, savepath='.\\results'):
	if not os.path.exists(savepath):
		os.mkdir(savepath)

	funnel = Funnel()

	items = sorted(data.items(),key= lambda x: x[1],reverse=True)
	funnel.add(title,items,label_opts=opts.LabelOpts(is_show=True))\
	.set_global_opts(title_opts=opts.TitleOpts(title=title),legend_opts=opts.LegendOpts(pos_left="right",orient="vertical"))\
	.render(os.path.join(savepath, '%s.html' % title))	


'''词云'''
def drawWordCloud(words, title, savepath='.\\results'):
	if not os.path.exists(savepath):
		os.mkdir(savepath)
	wc = WordCloud(font_path='.\\simkai.ttf', background_color='white', max_words=2000, width=1920, height=1080, margin=5)
	wc.generate_from_frequencies(words)
	wc.to_file(os.path.join(savepath, title+'.png'))


'''统计词频'''
def statistics(texts, stopwords):
	words_dict = {}
	for text in texts:
		temp = jieba.cut(text)
		for t in temp:
			if t in stopwords or t == 'unknow':
				continue
			if t in words_dict.keys():
				words_dict[t] += 1
			else:
				words_dict[t] = 1
	return words_dict


'''run'''
if __name__ == '__main__':
	with open('data.pkl', 'rb') as f:
		all_data = pickle.load(f)
	'''词云'''
	# stopwords = open('stopwords.txt', 'r', encoding='utf-8').read().split('\n')[:-1]
	# texts = [each[1][0] for each in all_data]
	# words_dict = statistics(texts, stopwords)
	# drawWordCloud(words_dict, '景点位置词云', savepath='.\\results')
	'''评分分布'''
	scores = {}
	for key, value in all_data.items():
		if value[3] in scores:
			scores[value[3]] += 1
		else:
			scores[value[3]] = 1
	# print(scores)
	# exit(0)
	drawPie('景区评分分布', scores)
	'''评级分布'''
	levels = {}
	print('AAAAA级景区有: ')
	for key, value in all_data.items():
		if not value[1] or value[1] == 'unknow':
			continue
		if 'AAAAA' in value[1]:
			print(key)
		if value[1] in levels:
			levels[value[1]] += 1
		else:
			levels[value[1]] = 1	
	drawBar('景区评级分布', levels)
	'''价格分布'''
	prices = {'50元以下': 0, '50-100元': 0, '100-200元': 0, '200元以上': 0}
	for key, value in all_data.items():
		if value[2] == 'unknow' or not value[2]:
			continue
		price = float(value[2])
		if price < 50:
			prices['50元以下'] += 1
		elif price >= 50 and price < 100:
			prices['50-100元'] += 1
		elif price >= 100 and price < 200:
			prices['100-200元'] += 1
		elif price >= 200:
			prices['200元以上'] += 1
	
	drawFunnel('景区价格分布', prices)
	'''评论量最多的10个景区'''
	comments = {}
	for key, value in all_data.items():
		if value[-1] == '暂无' or not value[-1]:
			continue
		value[-1] = value[-1].replace('条', '')
		if len(comments.keys()) < 10:
			comments[key] = int(value[-1])
			continue
		if int(value[-1]) > min(list(comments.values())):
			comments[key] = int(value[-1])
			abandoned_key = list(comments.keys())[list(comments.values()).index(min(list(comments.values())))]
			del comments[abandoned_key]
	comments = sorted(comments.items(),key=lambda x: x[1],reverse=True)
	comments = dict(comments)
	
	drawBar('评论人数最多的10个景区', comments)
```

### 备注

- proxy.json

    代理应该都失效了，可以自己到网上去找
    ```json
    {"code":0,"msg":"OK","data":[{"host":"60.169.36.45","port":"25699","country_cn":"中国","province_cn":"安徽","city_cn":"芜湖"},{"host":"125.106.156.79","port":"43595","country_cn":"中国","province_cn":"浙江","city_cn":"衢州"},{"host":"117.71.173.19","port":"29176","country_cn":"中国","province_cn":"安徽","city_cn":"六安"},{"host":"49.83.5.244","port":"49003","country_cn":"中国","province_cn":"江苏","city_cn":"盐城"},{"host":"49.79.56.2","port":"34889","country_cn":"中国","province_cn":"江苏","city_cn":"南通"},{"host":"116.239.105.205","port":"28251","country_cn":"中国","province_cn":"上海","city_cn":"上海"},{"host":"114.236.103.151","port":"22380","country_cn":"中 国","province_cn":"江苏","city_cn":"盐城"},{"host":"123.163.180.68","port":"47579","country_cn":"中国","province_cn":"河南","city_cn":"三门峡"},{"host":"36.26.105.86","port":"28456","country_cn":"中国","province_cn":"浙江","city_cn":"丽水"},{"host":"183.164.238.233","port":"43495","country_cn":"中国","province_cn":"安徽","city_cn":"淮北"},{"host":"58.219.149.214","port":"31639","country_cn":"中国","province_cn":"江苏","city_cn":"盐城"},{"host":"180.121.232.70","port":"39269","country_cn":"中国","province_cn":"江苏","city_cn":"南通"},{"host":"220.191.83.103","port":"46690","country_cn":"中国","province_cn":"浙江","city_cn":"杭州"},{"host":"222.211.8.43","port":"22104","country_cn":"中国","province_cn":"四川","city_cn":"绵阳"},{"host":"183.166.6.196","port":"20093","country_cn":"中国","province_cn":"安徽","city_cn":"淮南"},{"host":"112.85.27.196","port":"39461","country_cn":"中国","province_cn":"江苏","city_cn":"连云港"},{"host":"124.94.251.249","port":"31011","country_cn":"中国","province_cn":"辽宁","city_cn":"鞍山"},{"host":"49.84.41.235","port":"32157","country_cn":"中国","province_cn":"江苏","city_cn":"镇江"},{"host":"114.231.240.155","port":"29894","country_cn":"中国","province_cn":"江苏","city_cn":"南通"},{"host":"61.147.60.207","port":"49477","country_cn":"中国","province_cn":"江苏","city_cn":"盐城"}]}
    ```
- simkai.ttf 字体文件
- stopwords.txt 敏感词过滤文件
- 效果：

![](/_media/images/景点位置词云.jpg)

![](/docs/_media/images/景点位置词云.jpg)

[景区评分分布.html](/script/python/携程爬虫及分析/results/景区评分分布.html)

[景区价格分布.html](/script/python/携程爬虫及分析/results/景区价格分布.html)

[景区评级分布.html](/script/python/携程爬虫及分析/results/景区评级分布.html)

[评论数最多的10个景区.html](/script/python/携程爬虫及分析/results/评论数最多的10个景区.html)



文件详见：script/python/携程爬虫及分析/

@tsingchan