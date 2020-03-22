'''
携程景点爬虫
jm
'''
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