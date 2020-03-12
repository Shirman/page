<?php

//注意：docsify使用README.md作为索引文件
Index::setFilters([".","..",".git","_config.yml","index.md","image",'script','.vscode',"node_modules",
".nojekyll","_media","index.html","index.php","README.md","more.md","_navbar.md","_sidebar.md","_test.md"]);

//#更新github-page所有目录索引index.md
$dirPath = __DIR__;//docs
Index::setRootDir($dirPath);
Index::updateDocsifyIndex($dirPath);

//#删除已生成目录索引index.md文件
// Index::clearIndex($dirPath);

// //#更新docsify 侧边栏md配置
$dirPath = __DIR__;//docs
Index::setRootDir($dirPath);
Index::docsifySidebar($dirPath);

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
    ".nojekyll","_media","index.html","index.php","README.md","more.md","_navbar.md","_sidebar.md","_test.md"];

    public static function setRootDir($rootDir){
        if(empty($rootDir) || !file_exists($rootDir)){        
            $rootDir = __DIR__;
        }        
        self::$_rootDir = $rootDir;
        // echo $rootDir;exit;
    }

    public static function setFilters($filters=[]){
        if(!empty($filters)){
            self::$_filters = $filters;
        }
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



    
    
    /////////////////////docsify 侧边栏生成////////////////////////////
    
    public static function docsifySidebar($filepath){
        Index::initFileCount();
        self::updateDocsifySidebar($filepath);
        // echo self::$_docsifySidebar;exit;

        file_put_contents(self::$_rootDir.DIRECTORY_SEPARATOR."_test.md",self::$_docsifySidebar);   

        $fileCount = Index::getFileCount();        
        Index::initFileCount();
        echo "\n侧边栏更新总文件数：".$fileCount."\n";
        echo "\nupdate at ".date("Y-m-d H:i:s")."\n";             
    }
    public static function updateDocsifySidebar($filePath){
        // echo "\n".$filePath;
        if(empty($filePath) || !file_exists($filePath)){    
            echo "请指定dirPath\n";exit;
            return false;    
            
        }
        
                        
        if(is_dir($filePath)){            


            $childFiles = scandir($filePath);
            if(count($childFiles) <= 2){
                return true;
            }

            self::_getDocsifyDirSidebar($filePath);            
            self::$_fileCount += 1;        

            
            $handle = opendir($filePath);
            
            while(false !== ($file = readdir($handle))){   
                if(self::_filterFile($file)){
                    continue;
                }
                $filepath = $filePath.DIRECTORY_SEPARATOR.$file;                 
                self::updateDocsifySidebar($filepath);//递归遍历
            }            
             
            closedir($handle);   

        }else{
            self::_getDocsifyFileSidebar($filePath);
            self::$_fileCount += 1;                                
        }           
        

    }

    private static function _getDocsifyDirSidebar($filepath){


        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath); //处理中文路径  
        $filename = str_replace([" "],["_"],$filename);                        
        // echo "\n".$filename;     
        if(empty($filename) || $filename == 'docs'){
            return '';
        }

        $filepath = str_replace([self::$_rootDir,"\\"],["","/"],$filepath);
                      
        $pre = '';
        $separatorCount = substr_count($filepath,"/");
        if($separatorCount > 1){
            $pre = str_repeat("\t",($separatorCount-1));
        }                
                
        self::$_docsifySidebar .=$pre.'- **'.$filename."**\n";
        
    }
    private static function _getDocsifyFileSidebar($filepath){
    
        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath); //处理中文路径                
        $filename = str_replace([" "],["_"],$filename);                
        $filename = rtrim($filename,'.md');
        
        // $originPath = $filepath;
        
        $filepath = str_replace([self::$_rootDir,"\\","%"],["","/","%25"],$filepath);
           
        $pre = '';
        $separatorCount = substr_count($filepath,"/");
        if($separatorCount > 1){
            $pre = str_repeat("\t",($separatorCount-1));
        }
        self::$_docsifySidebar .= $pre."- [".$filename."](".$filepath.")\n";        
        
    }    

    ///////////////////////docsify 每个目录的README.md 索引文件生成////////////////////////////////    

    /**
     * 更新每个目录的索引文件index.md
     */
    public static function updateDocsifyIndex($dirPath=''){
        if(empty($dirPath) || !file_exists($dirPath)){        
            $dirPath = __DIR__;
        }
                        
        if(is_dir($dirPath)){
            $mdString = str_replace([self::$_rootDir,"\\"],["","/"],$dirPath)." 索引：\n\n";            
            $mdString .= self::_getDocsifyPreDirMdString($dirPath);
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
                self::updateDocsifyIndex($filepath);//递归遍历                                
                $mdString.= self::_getDocsifyDirMdString($filepath);
            }
            foreach($fileArray as $filepath){                                                                               
                $mdString.= self::_getDocsifyFileMdString($filepath);
            }

            self::$_fileCount += count($fileArray);
            $mdString .= "\n\n<font size=2 color='grey'> ".date("Y-m-d H:i",time())." </font>";

            $moreContent = '';
            $moreFile = $dirPath.DIRECTORY_SEPARATOR."more.md";
            if(file_exists($moreFile)){
                $moreContent = file_get_contents($moreFile);
            }
            $mdString = $moreContent."\n----\n\n".$mdString;
            file_put_contents($dirPath.DIRECTORY_SEPARATOR."README.md",$mdString); 
            closedir($handle);   
        }
        $fileCount = Index::getFileCount();
        Index::initFileCount();
        echo "\n更新索引README.md文件数：".$fileCount."\n";
        echo "\nupdate at ".date("Y-m-d H:i:s")."\n";            
    }

    /**
     * 获取上一级目录md string
     */
    private static function _getDocsifyPreDirMdString($dirPath){
        $mdString = '';
        if($dirPath != self::$_rootDir){            
            $preDir = dirname($dirPath);//上级目录  
            // echo $preDir."\n";          
            if($preDir == self::$_rootDir){
                $preDir = "";
            }else{
                $preDir = str_replace([self::$_rootDir,"\\"],["","/"],$preDir)."/";
            }
            $mdString .= "\n**[上一级目录".$preDir."](".$preDir.")**\n";
        }        
        return $mdString;
    }

    /**
     * 获取目录的 md string
     */
    private static function _getDocsifyDirMdString($filepath){                        
        // $filename = basename($filepath);                
        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath);                                 
        $filepath = str_replace([self::$_rootDir,"\\",'%'],["","/","%25"],$filepath)."/";
        $filename = str_replace([" "],["_"],$filename);
        return "\n**[".$filename."](".$filepath.")**\n";        
    }

    /**
     * 获取文件的 md string
     */
    private static function _getDocsifyFileMdString($filepath){
        // $filename = basename($filepath,".md");                                
        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath); //处理中文路径                
        
        $originPath = $filepath;
        
        $filepath = str_replace([self::$_rootDir,"\\","%"],["","/","%25"],$filepath);
        $filename = str_replace([" ",],["_"],$filename);                
        $filename = rtrim($filename,'.md');
        $filepath = rtrim($filepath,".md");
        // if(mb_strpos($originPath,"运维") !== false){
        //     echo $filepath."\n";
        //     echo $filename."\n";
        // }                
        return "\n- [".$filename."](".$filepath.")\n";
    }    

    
/////////////////////清除所有索引文件////////////////////////////

    public static function clearIndex($dirPath){
        echo "请到确认代码文件，确认要删除的索引文件是README.md，而不是index.md";exit;
        return true;
        if(empty($dirPath) || !file_exists($dirPath)){        
            $dirPath = __DIR__;                                
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
        $indexmd = $dirPath.DIRECTORY_SEPARATOR."README.md";
        if(file_exists($indexmd)){
            unlink($indexmd);
        }
    }

}




