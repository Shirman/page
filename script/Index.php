<?php

Index::updateIndex();


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
     * 更新每个目录的索引文件index.md
     */
    public static function updateIndex($dirPath=''){
        if(empty($dirPath) || !file_exists($dirPath)){        
            $dirPath = dirname(__DIR__);            
            self::$_rootDir = $dirPath;
        }
        
        if(is_dir($dirPath)){
            $mdString = str_replace([self::$_rootDir,"\\"],["","/"],$dirPath)." 索引：\n\n";            
            if($dirPath != self::$_rootDir){            
                $preDir = dirname($dirPath);//上级目录  
                // echo $preDir."\n";          
                if($preDir == self::$_rootDir){
                    $preDir = "";
                }
                $preDir = str_replace([self::$_rootDir,"\\"],["","/"],$preDir);
                $mdString .= "\n**[上一级目录".$preDir."](".$preDir."/index.md".")**\n";
            }
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
                
                // $filename = basename($filepath);                
                $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath);                                 
                $filepath = str_replace([self::$_rootDir,"\\"],["","/"],$filepath)."/index.md";
                $filename = str_replace([" "],["_"],$filename);
                $mdString.="\n**[".$filename."](".$filepath.")**\n";
            }
            foreach($fileArray as $filepath){                                                
                // $filename = basename($filepath,".md");                                
                $filename = preg_replace('/^.+[\\\\\\/]/', '', $filepath); //处理中文路径                
                
                $originPath = $filepath;
                
                $filepath = str_replace([self::$_rootDir,"\\"],["","/"],$filepath);
                $filename = str_replace([" "],["_"],$filename);                
                $filename = rtrim($filename,'.md');
                // if(mb_strpos($originPath,"运维") !== false){
                //     echo $filepath."\n";
                //     echo $filename."\n";
                // }                
                $mdString.="\n- [".$filename."](".$filepath.")\n";
            }

            $mdString .= "\n\n<font size=2 color='grey'> ".date("Y-m-d H:i",time())." </font>";

            file_put_contents($dirPath.DIRECTORY_SEPARATOR."index.md",$mdString); 
            closedir($handle);   
        }    
    }


    /**
     * 过滤指定文件
     */
    private static function _filterFile($file){
        $filters = [".","..",".git","_config.yml","index.md","image",'script'];
        if(in_array($file,$filters)){
            return true;
        }
        return false;
    }

}




