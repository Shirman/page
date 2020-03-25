<?php
//#更新github-page所有目录索引index.md
$filters = [".","..",".git","_config.yml","index.md","image",'script','.vscode',"node_modules",
".nojekyll","_media","index.html","index.php","README.md","more.md","_navbar.md","_sidebar.md","_test.md","CNAME",
"sw.js",'latest.md','archive.md','.gitignore',".qiniu_pythonsdk_hostscache.json","package-lock.json","_404.md"];

Index::setFilters($filters);

$dirPath = '';
Index::setRootDir($dirPath);
Index::updateIndex($dirPath);

//#删除已生成目录索引index.md文件
// Index::clearIndex($dirPath);

exit;

/**
 * 为每个目录生成index.md索引文件
 * 1、读取根目录
 * 2、获取所有md文件和目录，生成绝对路径url列表（目录的索引使用自动补上index.md）
 * 3、检查当前目录index.md，重写index.md，不存在则创建（内容：url列表）
 * 4、遍历下级目录，继续1、2、3
 */
class Index{
    
    /**
     * 根目录
     */
    private static $_rootDir = '';

    /**
     * 文件总数
     */
    private static $_fileCount = 0;

    private static $_docsifySidebar = '';
    private static $_filters = [".","..",".git","_config.yml","index.md","image",'script','.vscode',"node_modules",
    ".nojekyll","_media","index.html","index.php","README.md","more.md","_navbar.md","_sidebar.md","_test.md","CNAME"];    

    public static function setRootDir($rootDir){
        if(empty($rootDir) || !file_exists($rootDir)){        
            $rootDir = dirname(__DIR__);                                            
        }           
        self::$_rootDir = $rootDir;
    }
    public static function setFilters($filters=[]){
        if(!empty($filters)){
            self::$_filters = $filters;
        }
    }

    /**
     * 更新每个目录的索引文件index.md
     */
    public static function updateIndex($dirPath=''){
        if(empty($dirPath) || !file_exists($dirPath)){        
            $dirPath = dirname(__DIR__);                                            
        }
                        
        if(is_dir($dirPath)){
            $mdString = str_replace([self::$_rootDir,"\\"],["","/"],$dirPath)." 索引：\n\n";            
            $mdString .= self::_getPreDirMdString($dirPath);
            $handle = opendir($dirPath);
            $dirArray = [];
            $fileArray = [];
            while(false !== ($file = readdir($handle))){   
                if(self::_filterFile($file)){
                    continue;
                }
                $filepath = $dirPath.DIRECTORY_SEPARATOR.$file;                
                
                if(is_dir($filepath)){
                    $dirArray[] = $filepath;                
                }else{
                    $fileArray[] = $filepath;
                }                
            }

            foreach($dirArray as $filepath){
                self::updateIndex($filepath);//递归遍历                                
                $mdString.= self::_getDirMdString($filepath);
            }
            foreach($fileArray as $filepath){                                                                               
                $mdString.= self::_getFileMdString($filepath);
            }

            // $mdString .= "\n\n<font size=2 color='grey'> ".date("Y-m-d H:i",time())." </font>";
            $mdString .= "\n\n<font size=2 color='grey'> [@TsingChan](https://github.com/tsingchan) </font>";
            
            $indexFile = $dirPath.DIRECTORY_SEPARATOR."index.md";
            if(self::compareFileContent($indexFile,$mdString)){
                // self::initFileCount();                
            }else{  
                self::$_fileCount += count($fileArray);
                file_put_contents($indexFile,$mdString); 
            }
            closedir($handle);   
        }   
        $fileCount = Index::getFileCount();
        Index::initFileCount();
        echo "\n更新索引index.md文件数：".$fileCount."\n";
        echo "\nupdate at ".date("Y-m-d H:i:s")."\n";         
    }

    /**
     * 获取上一级目录md string
     */
    private static function _getPreDirMdString($dirPath){
        $mdString = '';
        if($dirPath != self::$_rootDir){            
            $preDir = dirname($dirPath);//上级目录  
            // echo $preDir."\n";          
            if($preDir == self::$_rootDir){
                $preDir = "";
            }
            $preDir = str_replace([self::$_rootDir,"\\"],["","/"],$preDir);
            $mdString .= "\n**[上一级目录".$preDir."](".$preDir."/index.md".")**\n";
        }        
        return $mdString;
    }

    /**
     * 获取目录的 md string
     */
    private static function _getDirMdString($filepath){                        
        // $filename = basename($filepath);                
        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath);                                 
        $filepath = str_replace([self::$_rootDir,"\\"],["","/"],$filepath)."/index.md";
        $filename = str_replace([" "],["_"],$filename);
        return "\n**[".$filename."](".$filepath.")**\n";        
    }

    /**
     * 获取文件的 md string
     */
    private static function _getFileMdString($filepath){
        // $filename = basename($filepath,".md");                                
        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath); //处理中文路径                
        
        $originPath = $filepath;
        
        $filepath = str_replace([self::$_rootDir,"\\"],["","/"],$filepath);
        $filename = str_replace([" ",],["_"],$filename);                
        $filename = rtrim($filename,'.md');
        // if(mb_strpos($originPath,"运维") !== false){
        //     echo $filepath."\n";
        //     echo $filename."\n";
        // }                
        return "\n- [".$filename."](".$filepath.")\n";
    }


    /**
     * 过滤指定文件
     */
    private static function _filterFile($file){        
        if(in_array($file,self::$_filters)){
            return true;
        }
        return false;
    }

    public static function initFileCount(){
        self::$_fileCount = 0;
    }

    /**
     * get file count
     */
    public static function getFileCount(){
        return self::$_fileCount;
    }

    /////////////////////清除所有索引文件////////////////////////////

    public static function clearIndex($dirPath){
        if(empty($dirPath) || !file_exists($dirPath)){        
            $dirPath = dirname(__DIR__);                                
            self::$_rootDir = $dirPath;
        }

        if(is_dir($dirPath)){
            self::clear($dirPath);
            
            $handle = opendir($dirPath);
            $dirArray = [];
            
            while(false !== ($file = readdir($handle))){   
                if(self::_filterFile($file)){
                    continue;
                }
                
                $filepath = $dirPath.DIRECTORY_SEPARATOR.$file;                
                if(is_dir($filepath)){
                    $dirArray[] = $filepath;                
                }
            }

            self::$_fileCount += count($dirArray);            

            foreach($dirArray as $filepath){
                self::clearIndex($filepath);
            }

            closedir($handle);   
        }
        $fileCount = Index::getFileCount();
        Index::initFileCount();
        echo "\n删除索引总文件数：".$fileCount."\n";
        echo "\nupdate at ".date("Y-m-d H:i:s")."\n";        
    }
    private static function clear($dirPath){
        $indexmd = $dirPath.DIRECTORY_SEPARATOR."index.md";
        if(file_exists($indexmd)){
            unlink($indexmd);
        }
    }

        /**
     * 比较文件内容与即将写入的内容，相同则返回true
     */
    private static function compareFileContent($filepath,$content){
        if(file_exists($filepath)){
            $fileContentMd5 = md5(file_get_contents($filepath));
            $contentMd5 = md5($content);
            if($fileContentMd5 == $contentMd5){
                return true;
            }

        }
        return false;
        
    }

     
}




