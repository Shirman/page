
import os
import time
import datetime
# import enchant
import jieba



class HugoMarkdown:

    # __srcDir = 'I:\src\hugo\docs' #源文章目录
    # __desDir = 'I:\src\hugo\9ong\content\post' #目的文件目录

    __srcDir = 'I:\src\github-page\docs' #源文章目录
    __desDir = 'I:\src\hugo\9ong\content\post' #目的文件目录


    def __init__(self):
        print("···HugoMarkdown···\n")
        

    #遍历源日志目录所有文件
    def scanFiles(self):
        print("开始遍历源文章目录：",self.__srcDir,"\n")
        for root,dirs,files in os.walk(self.__srcDir):
            for file in files:   
                
                print("\n-----开始处理文章：",os.path.join(root,file),"-----\n")
                if file=='index.md' or file == 'README.md' or file=='more.md':
                    print("忽略",file,"\n")
                    continue


                fileInfoDict = self.__getFileInfo(root,file)

                if (fileInfoDict['fileExt'] != ".md") or (fileInfoDict['parentDir']==''):
                    print("忽略",file,"\n")
                    continue                

                #测试输出    
                print(fileInfoDict,"\n")                

                self.__adjustFIleContent(fileInfoDict)

                #只循环一次，跳出所有循环
                # return 

    def __getFileInfo(self,root,file):
        print("获取文章信息：\n")
        #文件全路径                
        filePath = os.path.join(root,file)
        #文件名、扩展名
        filename,fileExt = os.path.splitext(file)
        #所在目录及上级目录
        parentDir = os.path.basename(root)
        grandpaDir = os.path.basename(os.path.dirname(root))
        if parentDir == "docs":
            parentDir = ""

        if grandpaDir == "docs" or grandpaDir == "互联网":
            grandpaDir = ""

        #文件相关时间
        fileCtime = self.__timeToDate(os.path.getctime(filePath),"%Y-%m-%d")
        fileMtime = self.__timeToDate(os.path.getmtime(filePath),"%Y-%m-%d")

        return {
            "filePath":filePath,
            "fileName":filename,
            "fileExt":fileExt,
            "parentDir":parentDir,
            "grandpaDir":grandpaDir,
            "fileCtime":fileCtime,
            "fileMtime":fileMtime
        }

    #调整文章内容 比如meta设置、TOC、MORE设置，
    def __adjustFIleContent(self,fileInfoDict):
        #读取文章内容 及 关键词
        print("读取文章内容...\n")
        with open(fileInfoDict['filePath'],"r",encoding="utf-8") as mdFile:
            content = mdFile.read().strip()            
            
            fileInfoDict['keywords'] = self.__getKeywords(content,fileInfoDict['fileName'])
            
            content = self.__getMmeta(fileInfoDict) + self.__insertMoreToContent(content)

            #写入新文件
            self.__writeNewMarkdownFile(content,fileInfoDict)

    #获取meta
    def __getMmeta(self,fileInfoDict):
        print("准备文章meta信息：","\n")        
        meta = ""
        metaTitle = "title: \""+fileInfoDict['fileName']+"\"\n"
        metaCJK = "isCJKLanguage: true\n"
        metaDate = "date: "+fileInfoDict['fileCtime']+"\n"
        metaCategories = "categories: \n"
        metaParentCategory = ""
        metaGrandpaCategory = ""
        metaTags = "tags: \n"
        metaTagsList = ""
        metaKeywords = "keywords: \n"
        metaKeywordsList = ""


        if fileInfoDict['grandpaDir']!='':
            metaGrandpaCategory = "- "+fileInfoDict['grandpaDir']+"\n"
        
        if fileInfoDict['parentDir']!='':
            metaParentCategory = "- "+fileInfoDict['parentDir']+"\n"
        
        if fileInfoDict['keywords']:
            for word in fileInfoDict['keywords']:
                metaTagsList += "- "+word+"\n"
                metaKeywordsList += "- "+word+"\n"

        meta = "---\n"+metaTitle+metaCJK+metaDate+metaCategories+metaGrandpaCategory+metaParentCategory+metaTags+metaTagsList+metaKeywords+metaKeywordsList+"---\n\n"
        print(meta,"\n")
        return meta

    #插入<!--more-->到文章
    def __insertMoreToContent(self,content):        
        tocFlag = '<!-- /TOC -->'
        if (content.find(tocFlag) != -1):            
            print("发现",tocFlag,"\n")
            content = content.replace(tocFlag,tocFlag+"\n"+'<!--more-->'+"\n")
        else:
            print("没有发现",tocFlag,"\n")
            contents = content.splitlines()
            contentsLen = len(contents)
            if contentsLen>4:
                contents[4] = contents[4]+"\n"+'<!--more-->'+"\n"
                content = "\n".join(contents)

        print("插入<!--more-->...","\n")
        return content

    def __writeNewMarkdownFile(self,content,fileInfoDict):        
        relativeFilePath = fileInfoDict['filePath'].replace(self.__srcDir,"")

        desFilePath = self.__desDir+relativeFilePath
        print("写入新文件：",desFilePath,"\n")
        desDirPath = os.path.dirname(desFilePath)
        # print("##Final Path："+desFilePath)
        # return 
        if not os.path.exists(desDirPath):
            os.makedirs(desDirPath)
        with open(desFilePath,"w",encoding="utf-8") as nf:
            nf.write(content)

        if os.path.exists(desFilePath):
            print("----- 完成文章处理：",desFilePath," -----\n")
        else:
            print("---- 写入新文件失败! -----\n")


    #时间戳转换成日期
    def __timeToDate(self,timeStamp,format="%Y-%m-%d %H:%M:%S"):
        timeArray = time.localtime(timeStamp)
        return time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    

    #获取文章关键词
    def __getKeywords(self,content,filename):
        keywords = self.__wordStatistics(content,filename)
        keywordsList = sorted(keywords.items(), key=lambda item:item[1], reverse=True)            
        keywordsList = keywordsList[0:50]   
        keywordsList = self.__filterKeywords(keywordsList,filename)   
        print("保留关键词：",keywordsList,"\n")           
        return keywordsList

    #词频统计
    def __wordStatistics(self,content,filename):        
        stopwords = open('I:\src\github-page\script\python\stopwords.txt', 'r', encoding='utf-8').read().split('\n')[:-1]        
        words_dict = {}
    
        temp = jieba.cut(content)
        for t in temp:
            if t in stopwords or t == 'unknow' or t.strip() == "":
                continue
            if t in words_dict.keys():
                words_dict[t] += 1
            else:
                words_dict[t] = 1

        # filenameCuts = jieba.cut(filename)                
        # for fc in filenameCuts:
        #     if fc in stopwords or fc == 'unknow' or fc.strip() == "":
        #         continue
        #     if fc in words_dict.keys():
        #         words_dict[fc] += 100
        #     else:
        #         words_dict[fc] = 100
        return words_dict

    #再次过滤关键词：在文件名也就是标题中，且汉字不少于2个，字符串不少于3个，不是纯数字
    def __filterKeywords(self,keywordsList,filename):
        print("分析文章标签/关键词...\n")
        newKeywordsList = []
        # print(keywordsList)
        # enD = enchant.Dict("en_US")
        for word,count in keywordsList:            

            # print(word,"\t",count)            
            wordLen = len(word)
            if filename.find(word)!=-1:
                if self.__isChinese(word) and wordLen<2:
                    continue
                elif wordLen<3:
                    continue                                        
                elif word.isdigit():
                    continue
                else:
                    newKeywordsList.append(word)
            # else:
            #     if wordLen>1 and self.__isChinese(word) and count>5:
            #         newKeywordsList.append(word)                
            #     elif wordLen>2 and enD.check(word) and count>5:
            #         newKeywordsList.append(word)   
            #     else:
            #         continue

        return newKeywordsList

    def __isChinese(self,word):
        for ch in word:
            if '\u4e00' <= ch <= '\u9fff':
                return True
        return False


if __name__ == '__main__':
    hm = HugoMarkdown()
    hm.scanFiles()
    