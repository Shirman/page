# 读取文件，可通过参数传入
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



def main():

    qiniuConfig = getQiniuConfig("9ong")
    q = Auth(qiniuConfig["access_key"], qiniuConfig["secret_key"])
    bucket = BucketManager(q)    

    # url = 'https://mmbiz.qpic.cn/mmbiz_png/icHOSb47jqpUuNrM7oELEjVfVQozavBjj0m8gBpxXx7kr2n6xox3aV9WMwMKJD23VekwpRETF3s2UicDibaVIIRLw/0?wx_fmt=png'
    # url = 'https://mmbiz.qpic.cn/mmbiz_jpg/3OEpTPib0kVib6SYAfuB5uty5ma9DBU1r4icuhFk0mQOSAcFT6ibqaXchIN0K94tln5gcLu8v3eQ1GMEK9fUNhAGbg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
    # fetchImg(url,bucket,qiniuConfig)
    # sys.exit()

    theFile = 'I:\\src\\github-page\\docs\\产品设计\\企业应用架构的演变史-杨堃-bak.md'
    theContent = ''
    theList = []
    with open(theFile,'r',encoding='utf-8') as rf:
        for line in rf:
            matchList = []
            matchList = re.findall(r'!\[.*\]\((.+)\)',line)            
            if matchList:
                for originUrl in matchList:
                    print(originUrl)                    
                    # 七牛抓取网络图片
                    newUrl = fetchImg(originUrl,bucket,qiniuConfig)
                    print(newUrl)
                    # 替换line
                    line = line.replace(originUrl,newUrl)

            theList.append(line)
    with open(theFile,'w',encoding='utf-8') as wf:
        for oneLine in theList:
            theContent += oneLine
        if theContent:
            wf.write(theContent)
            print("===========================\n")
            print(theContent)

def getQiniuConfig(bucketName):
    configFile = "I:\\src\\config\\qiniu.json"
    with open(configFile) as f:
        config = json.load(f)
        if bucketName:
            return config[bucketName]
        else:
            return config

def fetchImg(url,bucket,qiniuConfig):       

    key = getKey()
    url = replaceWebp(url)    

    ret, info = bucket.fetch(url, qiniuConfig["bucket_name"], key)
    # print(info)
    if ret['key']==key:
        return qiniuConfig['public_domain'] + key
    else:
        return url
    # assert ret['key'] == key

def getKey():
    return "images/page/md-" + str(time.time()) + "-" + str(random.randint(1,1000)) + ".jpg"
    
def replaceWebp(src):
    a = ".qpic.cn"    
    if a in src:
        src =src.replace("tp=webp", "tp=jpg",1)

    return src        


if __name__ == '__main__':
    main()

