<?php

//注意：docsify使用README.md作为索引文件

$filters = [".","..",".git","_config.yml","index.md","image",'script','.vscode',"node_modules",
".nojekyll","_media","index.html","index.php","README.md","more.md","_navbar.md","_sidebar.md","_test.md","CNAME",
"sw.js",'latest.md','archive.md','.gitignore',".qiniu_pythonsdk_hostscache.json","package-lock.json","_404.md"];

$dirPath = __DIR__;//docs
Index::init($dirPath,$filters);

//更新docsify侧边栏md配置
Index::docsifySidebar($dirPath);

//更新docsify最近文章导航
Index::updateDocsifyLatest();
//更新docsify归档列表
Index::updateDocsifyArchive();

//更新docsify所有目录索引README.md，用于访问目录页
Index::docsifyReadme($dirPath);

//删除已生成目录索引README.md文件
// Index::clearReadme($dirPath);
exit;

/**
 * docsify索引及目录列表更新 
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

    /**
     * docsify左侧边栏
     */
    private static $_docsifySidebar = '';

    /**
     * 归档历史列表
     */
    private static $_archiveFiles = [];
    /**
     * 最近更新列表
     */
    private static $_latestFiles = [];

    private static $_currentTime = 0;

    private static $_filters = [".","..",".git","_config.yml","index.md","image",'script','.vscode',"node_modules",
    ".nojekyll","_media","index.html","index.php","README.md","more.md","_navbar.md","_sidebar.md","_test.md"];
    
    public static function init($rootDir,$filters,$more=[]){
        self::setRootDir($rootDir);
        self::setFilters($filters);
        self::$_currentTime = time();
    }

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

        $sidebarFile = self::$_rootDir.DIRECTORY_SEPARATOR."_sidebar.md";
        if(self::compareFileContent($sidebarFile,self::$_docsifySidebar)){
            echo "\n侧边栏更新总文件数：0\t， 不需要更新\n";            
        }else{

            file_put_contents($sidebarFile,self::$_docsifySidebar);   
    
            $fileCount = Index::getFileCount();        
            Index::initFileCount();
            echo "\n侧边栏更新总文件数：".$fileCount."\n";
            echo "\nupdate at ".date("Y-m-d H:i:s")."\n";             
        }
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
    
        $fileStat = stat($filepath);              

        $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath); //处理中文路径                
        $filename = str_replace([" "],["_"],$filename);                
        $filename = rtrim($filename,'.md');
                                
        $filepath = str_replace([self::$_rootDir,"\\","%"],["","/","%25"],$filepath);
           
        $pre = '';
        $separatorCount = substr_count($filepath,"/");
        if($separatorCount > 1){
            $pre = str_repeat("\t",($separatorCount-1));
        }
        //拼接左侧边栏md字符串
        self::$_docsifySidebar .= $pre."- [".$filename."](".$filepath.")\n";        

        //加入最新更新列表 60天=>5184000,30天=>5184000
        if((self::$_currentTime - $fileStat['mtime']) < 2592000){
            if(array_key_exists($fileStat['mtime'],self::$_latestFiles)){
                $fileStat['mtime'] += 1;
            }
            self::$_latestFiles[$fileStat['mtime']] = ['name'=>$filename,'path'=>$filepath];            
        }

        //php的filectime是指inode修改时间，并不是文件创建时间，这里可以默认泛为文件创建时间，不准确
        $archiveYm = date("Ym",$fileStat['ctime']);
        // if(array_key_exists($archiveYm,self::$_archiveFiles)){
        self::$_archiveFiles[$archiveYm][$fileStat['ctime']] = ['name'=>$filename,'path'=>$filepath];
        // }
        
    }    

    /**
     * 更新最近更新列表
     * 注：在docsifySidebar侧边栏执行后有效
     */
    public static function updateDocsifyLatest(){
        Index::initFileCount();
        $fileList = self::$_latestFiles;
        $mdString = "### 最新\n> 时间为文章在本地最后更新时间，不是发布时间。\n----\n";
        if(!empty($fileList)){
            krsort($fileList);
            foreach($fileList as $time=>$one){
                self::$_fileCount++;                
                $timeString = '<font color="grey" size=1> - '.date("Y/m/d",$time).'</font>';
                $dirname = preg_replace('/^.+[\\\\\\/]/', '', dirname($one['path'])); 
                $name = $dirname."/".$one['name'];
                $mdString .= "- [".$name."](".$one['path'].")\t".$timeString."\n";                                
            }
        }
        
        $latestFile = self::$_rootDir.DIRECTORY_SEPARATOR."latest.md";
        if(self::compareFileContent($latestFile,$mdString)){
            echo "\n最近更新总文件数：0\t， 不需要更新\n";            
        }else{        
            file_put_contents($latestFile,$mdString);   

            $fileCount = Index::getFileCount();        
            echo "\n最近更新总文件数：".$fileCount."\n";
            echo "\nupdate at ".date("Y-m-d H:i:s")."\n";                     
        }
    }

    /**
     * 更新归档列表
     * 注：在docsifySidebar侧边栏执行后有效
     */
    public static function updateDocsifyArchive(){
        Index::initFileCount();
        $fileList = self::$_archiveFiles;
        $mdString = "### 归档列表\n> 时间为文章在本地新建时间，不是发布时间。\n----\n";
        if(!empty($fileList)){
            krsort($fileList);
            foreach($fileList as $archiveYm=>$ymOne){
                $mdString .= "#### ".$archiveYm."\n";
                krsort($ymOne);
                foreach($ymOne as $time=>$one){
                    self::$_fileCount++;
                    $timeString = '<font color="grey" size=1> - '.date("Y/m/d",$time).'</font>';                    
                    $dirname = preg_replace('/^.+[\\\\\\/]/', '', dirname($one['path'])); 
                    $name = $dirname."/".$one['name'];                                  
                    $mdString .= "- [".$name."](".$one['path'].")\t".$timeString."\n";
                }
            }
        }

        $archiveFile = self::$_rootDir.DIRECTORY_SEPARATOR."archive.md";
        if(self::compareFileContent($archiveFile,$mdString)){
            echo "\n归档列表总文件数：0\t， 不需要更新\n";            
        }else{                
            file_put_contents($archiveFile,$mdString);   

            $fileCount = Index::getFileCount();        
            echo "\n归档列表总文件数：".$fileCount."\n";
            echo "\nupdate at ".date("Y-m-d H:i:s")."\n";                             
        }
    }

    

    ///////////////////////docsify 每个目录的README.md 索引文件生成////////////////////////////////    
    
    /**
     * 更新每个目录的索引文件README.md
     */
    public static function docsifyReadme($dirPath=''){
        Index::initFileCount($dirPath);
        self::updateDocsifyReadme();
        $fileCount = Index::getFileCount();
        echo "\n更新索引README.md文件数：".$fileCount."\n";
        echo "\nupdate at ".date("Y-m-d H:i:s")."\n";            
    }
    /**
     * 更新每个目录的索引文件README.md
     */
    public static function updateDocsifyReadme($dirPath=''){
        if(empty($dirPath) || !file_exists($dirPath)){        
            $dirPath = __DIR__;
        }
                        
        if(is_dir($dirPath)){
            $mdString = "### ".str_replace([self::$_rootDir,"\\"],["","/"],$dirPath)."/索引\n\n";            
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
                self::updateDocsifyReadme($filepath);//递归遍历                                
                $mdString.= self::_getDocsifyDirMdString($filepath);
            }
            foreach($fileArray as $filepath){                                                                               
                $mdString.= self::_getDocsifyFileMdString($filepath);
            }

            self::$_fileCount += count($fileArray);
            // $mdString .= "\n\n<font size=2 color='grey'> ".date("Y-m-d H:i",time())." </font>\n\n";
            $mdString .= "\n\n<font size=2 color='grey'> [@TsingChan](https://github.com/tsingchan) </font>\n\n";            

            //加载更多-头部
            $moreContent = '';
            $moreFile = $dirPath.DIRECTORY_SEPARATOR."more.md";
            if(file_exists($moreFile)){
                // $moreContent = file_get_contents($moreFile);
                $mdString = file_get_contents($moreFile).$mdString;
            }
            //加载 根目录README.md 追加latest.md 最新内容
            if($dirPath == self::$_rootDir){
                $latestFile = $dirPath.DIRECTORY_SEPARATOR."latest.md";
                if(file_exists($latestFile)){
                    $mdString .= file_get_contents($latestFile);
                }
            }

            $readmeFile = $dirPath.DIRECTORY_SEPARATOR."README.md";
            if(self::compareFileContent($readmeFile,$mdString)){
                self::initFileCount();                
            }else{                
                file_put_contents($readmeFile,$mdString); 
            }            
            closedir($handle);   
        }

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
            $mdString .= "\n**[上一级索引".$preDir."](".$preDir.")**\n";
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
        
        
        $filepath = str_replace([self::$_rootDir,"\\","%"],["","/","%25"],$filepath);
        $filename = str_replace([" ",],["_"],$filename);                
        $filename = rtrim($filename,'.md');
        $filepath = rtrim($filepath,".md");

        return "\n- [".$filename."](".$filepath.")\n";
    }    

    
/////////////////////清除所有索引文件////////////////////////////

    public static function clearReadme($dirPath){
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
                self::clearReadme($filepath);
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




