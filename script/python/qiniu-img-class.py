# 读取markdown文件，可通过参数传入
# 提取所有图片链接
# 引入七牛从指定URL抓取资源
# 遍历所有图片，得到新图片地址
# 替换文件中图片地址
# 备份原文件 todo
# 覆盖文件
# TsingChan

import re
import time
import random
import sys
import json
from qiniu import Auth
from qiniu import BucketManager




# '''markdown 文件中网络图片抓取保存七牛'''
class MdImgFetch:
    
    __qiniuConfigFile = "I:\\src\\config\\qiniu.json"
    __qiniuConfig = []
    __theFile = ""
    __bucket = ''    
    
    def __init__(self,theFile):
        if theFile:
            self.__theFile = theFile
        else:
            print("请指定要处理的文件路径")
            sys.exit()

    def fetch(self):
        self.__qiniuConfig = qiniuConfig =  self.__getQiniuConfig('9ong')
        qiniu = Auth(qiniuConfig["access_key"], qiniuConfig["secret_key"])
        self.__bucket = BucketManager(qiniu)            
        
        theList = []
        theContent = ''
        with open(self.__theFile,'r',encoding='utf-8') as rf:
            for line in rf:
                matchList = []
                matchList = re.findall(r'!\[.*\]\((.+)\)',line)            
                if matchList:
                    for originUrl in matchList:
                        print(originUrl)                    
                        # 七牛抓取网络图片
                        newUrl = self.__fetchImg(originUrl)
                        print(newUrl)
                        # 替换line
                        line = line.replace(originUrl,newUrl)

                theList.append(line)
        with open(self.__theFile,'w',encoding='utf-8') as wf:
            for oneLine in theList:
                theContent += oneLine
            if theContent:
                wf.write(theContent)
                print("\n"+self.__theFile+"\n===========================\n")
                # print(theContent)

    def __getQiniuConfig(self,bucketName):
        with open(self.__qiniuConfigFile) as f:
            config = json.load(f)
            if bucketName:
                return config[bucketName]
            else:
                return config        


    def __fetchImg(self,url):       

        key = self.__getKey()
        url = self.__replaceWebp(url)    

        ret, info = self.__bucket.fetch(url, self.__qiniuConfig["bucket_name"], key)
        # print(info)
        if ret['key']==key:
            return self.__qiniuConfig['public_domain'] + key
        else:
            return url
        # assert ret['key'] == key

    def __getKey(self):
        return "images/page/md-" + str(time.time()) + "-" + str(random.randint(1,1000)) + ".jpg"
        
    def __replaceWebp(self,src):
        a = ".qpic.cn"    
        if a in src:
            src =src.replace("tp=webp", "tp=jpg",1)

        return src     


if __name__ == '__main__':
    theFile = r'I:\src\github-page\docs\鸡汤不毒\情绪不好养生徒劳.md'
    mif = MdImgFetch(theFile)
    mif.fetch()

