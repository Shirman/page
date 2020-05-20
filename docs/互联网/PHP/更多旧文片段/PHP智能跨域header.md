
环境：thinkphp5.0

```php
/**
* 根据请求来源域名 自动添加合法允许跨域域名
*/
function allow_origin_header(){
    $allOrigins = [
        'release'=>["http://www.xxx.com",'http://www.xxx.net'],
        'develop'=>["http://www.xxx.cn"],
        'office'=>["http://www.yyy.com"]
    ];
    
    $statusOrigins = $allOrigins[config('app_status')];
    
    if(isset($_SERVER["HTTP_REFERER"]) && in_array($_SERVER["HTTP_REFERER"], $statusOrigins)){
        header("Access-Control-Allow-Origin:".$_SERVER["HTTP_REFERER"]);
    }
}
```