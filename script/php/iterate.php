
<?php
$startMemory = memory_get_usage();
$arr = range(0, 100);
foreach($arr as $key=>$val){
    print_r($key."::".$val."\n");
}
echo 'range(): ', memory_get_usage() - $startMemory, " bytes\n";
unset($arr);

function xrange($start,$limit,$step=1){
    for($i=0;$i<$limit;$i+=$step){
        yield $i+1=>$i;
    }
}

foreach(xrange(0,100) as $key=>$val){
    print_r($key."::".$val."\n");
}
echo 'xrange(): ', memory_get_usage() - $startMemory, " bytes\n";
