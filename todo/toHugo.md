

- 遍历完善md文件，遍历文件:python :walk
    - index.md README.md 跳过
    - 获取文件完整路径带扩展名
    - 获取文件名、上级目录名、上上级目录名（一级目录置为空）
    - 获取创建时间
    - 读取文章字符串
    - 去除文章开头与尾巴空字符/空行
    - 文章词频分析，获取前三高频单词
    - 生成hugo文章开头属性设置（含固定属性：isCJKLanguage: true）
    - 检测\<!--TOC--\>，如果存在则将第2个 \<!--TOC--\> 替换为 \<!--TOC--\>\<!--more--\>；如果不存在则将前120个字符替换为120个字符\<!--more--\>
    - 检查hugo/page/content/post/pathdir/是否存在，否则创建
    - 将新的文章内容写入hugo/page/content/post/pathdir/文件名.md    

- 批量修改内联md文件链接
    - 遍历所有文件
    - 检查".md)"，手动更换吧

- todo
    - md文件include md文件，支持自动转换链接
    - 内联本地md文件，支持转换成html链接
    - sitemap
    - favicon与cover.jpg上传云
    - 百度统计
    - 
