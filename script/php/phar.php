<?php


function extractPhar(){    
    $extractDir = 'H:\360-yunpan\TsingChan\phar\phar测试文件\extract';
    $pharFile = 'H:\360-yunpan\TsingChan\phar\phar测试文件\phpunit-skelgen-2.0.1.phar';
    if(!is_dir($extractDir)){
        @mkdir($extractDir);
    }
    $phar = new Phar($pharFile);
    $phar->extractTo($extractDir,null,true);
    echo "解压完成".PHP_EOL;    
}

extractPhar();