# 多行文本去重
def main():        
    # 打开文件读取每一行微信号
    # 保存到集合中
    wechatSets = set()
    try:
        with open("I:\\src\\微信号.md",'r') as f:
            for line in f:
                wechatSets.add(line)
    except FileNotFoundError:
        print("文件打开错误")        
    # 遍历集合，每一行追加写入新文件
    wf = open("微信号new.md",'a')
    for oneWechat in wechatSets:
        wf.write(oneWechat)




if __name__ == '__main__':
    main()


