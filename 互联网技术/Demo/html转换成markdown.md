    
> 大学老师总举个例子：微软的工程师一天只写100行代码。

### Demo用途    
以下有两个方法 urlToMarkdownFile 与  favoriteToMarkdown，分别通过HTMLToMarkdown库及QL库 实现遍历360浏览器收藏夹html文件树，生成对应markdown文件。

### 使用类库

安装类库

    composer require league/html-to-markdown
    composer require jaeger/querylist

### 输出范例

[浏览器收藏夹](/favorite.md) 

### 代码示例
    
    <?php

    namespace app\app\controller;

    /**
    * Description of Script
    *
    * @author jm
    */
    class App extends Base
    {
        
        private $_favoriteMarkdownString = '';
        
        private $_favoriteHeaderLevel = 0;
        
        /**
        * url地址转换成markdown文件
        * php -f public/index.php admin/Api/urlToMarkdownFile
        */
        public function urlToMarkdownFile(){
            
            $url = input("url",'');
            $selector = input("selector");
            $stripTags = input("strip_tags",true);
            $removeNodes = input('remove_nodes','script style');
            $saveFile = input("save_file",false);
            
            if(empty($url) && empty($selector)){
                $this->ajaxError("url or selector empty.");
            }
            
            try{
    //            $url = 'https://mp.weixin.qq.com/s?__biz=MzAwNzA5MzA0NQ==&mid=2652149301&idx=4&sn=920388acd694c1c39ec6b33da1be85a2&chksm=80e3586fb794d179838621bcbd8ed002887b6a1f052b8f79d79ce83424a897176409844bd072&mpshare=1&scene=24&srcid=1014N9vnSsECQINTibBH4k42#rd';
    //            $selector = "#img-content";
                $ql = \QL\QueryList::getInstance();
                $rules = [
                    'title'=>['title','text','script'],
                    'content'=>[$selector,'html','script']
                ];
                $queryRes = $ql->get($url)->rules($rules)->queryData();
                $res = array_pop($queryRes);
                $html = $res['content'];
                $title = $res['title'];
                $html = "<h1>".$title."</h1><br />".$html;
                
                $convertConfig = ["strip_tags"=>($stripTags?true:false),"remove_nodes"=>$removeNodes];
                $convert = new \League\HTMLToMarkdown\HtmlConverter($convertConfig);
                $markdownString = $convert->convert($html);
                
                if(!$saveFile){
                    echo $markdownString;
                    exit;
                }else{                
                    \app\common\tool\Download::file($markdownString, $title.".md");
                }
            } catch (\Exception $ex) {
                $this->ajaxError($ex->getMessage());
            }
        }
        
        
        /**
        * 指定360收藏夹html文件 转换成md 文件
        * 通过html-to-markdown实现
        */
        public function favoriteToMarkdown2(){
            $sourceFile = '/home/chenqingji/html/bookmarks_2019_3_20.html';
            $markdownFile = '/tmp/markdown.md';
            
            $html = file_get_contents($sourceFile);
            //favorite_360 自定义选项 是否导入转换360浏览器收藏夹html文件
            $convertConfig = ["strip_tags"=>true,"remove_nodes"=>"script style",'favorite_360'=>true];
            $convert = new \League\HTMLToMarkdown\HtmlConverter($convertConfig);
            $markdownString = $convert->convert($html);        

            file_put_contents($markdownFile, $markdownString);
            echo "结果详见：".$markdownFile."\n";
        }
        
        /**
        * 指定360收藏夹html文件 转换成md 文件
        * 通过querylist实现
        * usage：
        * 注意：使用之前，从360浏览器导出bookmarks_2019_x_xx.html文件，批量替换</A>为</A></DT>，queryList的children才能正确识别子级选择器
        * php -f /var/www/html/qing-tp/public/index.php admin/Api/favoriteToMarkdown
        */
        public function favoriteToMarkdown(){
            $sourceFile = '/home/chenqingji/html/bookmarks_2019_3_20.html';
    //        $sourceFile = '/home/chenqingji/html/123.html';
            $markdownFile = '/tmp/favorite.md';
            
            $html = file_get_contents($sourceFile);
            
            $this->_favoriteMarkdownString = "\n----\n";
            
            $ql = \QL\QueryList::getInstance();
            $ql->setHtml($html);
            
            $h1 = $ql->find("h1");
            $firstDl = $h1->next("dl");
            $this->_convert($firstDl);
            
            file_put_contents($markdownFile, $this->_favoriteMarkdownString);
            echo "结果详见：".$markdownFile."\n";        
        }
        
        /**
        * 转换dl标签
        * @param \QL\Dom\Elements $dl
        * @return type
        */
        private function _convert($dl){
            $subDts = $dl->children("dt");
                
            $this->_favoriteHeaderLevel++;
            if($subDts->count()){
    //            debug_log($subDts->count());
                $subDts->map(function($dt){
                    if(!($dt->children('a')->count())){
                        $currentDirName = trim($dt->children("h3")->text());
                        if(!in_array($currentDirName, $this->_getFilterFavorite())){
                            $this->_favoriteMarkdownString .= $this->_convertDtDir($dt, $this->_favoriteHeaderLevel);
                            $dl = $dt->next("dl");
                            if($dl->count()){
                                $this->_convert($dl);
                            }
                        }else{
                            echo "\n ignore ".$currentDirName."\n";
                        }
                    }else{
                        $this->_favoriteMarkdownString .= $this->_convertAnchor($dt);
                    }
                });
            }
            $this->_favoriteHeaderLevel--;
            return true;
        }
        
        /**
        * 过滤不对外的收藏夹目录名称
        * @return type
        */
        private function _getFilterFavorite(){
            return [
                "最近收藏","2019tp新项目","工作","传统行业","外贸","创业","生活","深度分享","半价9ong"
            ];
        }
        
        /**
        * 转换dt目录标签
        * @param \QL\Dom\Elements $dt
        */    
        private function _convertDtDir($dt,$level=3){
            $title = trim($dt->children('h3')->text());
            if(!empty($title)){
                return str_repeat("#", $level)." ".$title."\n\n";
            }
            return "\n";
        }
        
        /**
        * 转换dt>a标签
        * @param \QL\Dom\Elements $dt
        */
        private function _convertAnchor($dt){
            $anchor = $dt->children('a');
            $href = $anchor->attr("href");
            $icon = $anchor->attr("icon");
            $title = trim($anchor->text());
            return "![](".$icon.") "."[".$title."](".$href.")\n\n";
        }
        
        
    }


----
@tsingchan 2019