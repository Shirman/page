
def main():    
    # fileDemo()
    # listDemo()
    # 打开文件读取每一行微信号
    # 保存到集合中
    wechatSets = set()
    try:
        with open("I:\\src\\公众号文章\\gongzhonghao\\微信号-豆瓣.md",'r') as f:
            for line in f:
                wechatSets.add(line)
    except FileNotFoundError:
        print("文件打开错误")        
    # 遍历集合，每一行追加写入新文件
    wf = open("微信号-豆瓣-new2.md",'a')
    for oneWechat in wechatSets:
        wf.write(oneWechat)
    
def fileDemo():
    try:
        with open('I:\\src\\github-page\\Test.md',"r",encoding='utf-8') as f:
            print(f.read())        
    except FileNotFoundError:
        print("无法打开指定文件")
    except LookupError:
        print("指定了未知编码")
    except UnicodeDecodeError:
        print("读取文件编码错误")

def listDemo():
    sets = set()
    sets.add(1)
    sets.add(2)
    sets.add(2)
    print(sets)




if __name__ == '__main__':
    main()


