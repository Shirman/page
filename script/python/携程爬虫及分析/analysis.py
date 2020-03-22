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