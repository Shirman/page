  
<!-- TOC -->

- [**一、安装**](#一安装)
- [**二、快速开始**](#二快速开始)
- [**三、基本操作**](#三基本操作)

<!-- /TOC -->

## **一、安装**



**以下es基于6.4**

1、在 composer.json 文件中引入 elasticsearch-php：



```php
{
    "require":{
        "elasticsearch/elasticsearch":"~6.0",
        "monolog/monolog": "~1.0"
    }
}
```


2、用 composer 安装客户端：



```
curl -s http://getcomposer.org/installer | php
php composer.phar install --no-dev
```

![](https://mmbiz.qpic.cn/mmbiz_png/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2JnuekxW7EIa1hHKqicIqLcrMSXtrZic4x6rzTvsyOlMXCw2oHbq7gGaJafjg/640?wx_fmt=png)

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2Jnue0wC3ZMrDVAdk3NGlLiaibnfPbNQkb6ppgvRBdNtKMbhARVE2aVYL1iasA/640?wx_fmt=jpeg)



## **二、快速开始**



1、创建一个test.php文件，内容如下

```php

<?php
require 'vendor/autoload.php';
 
use Elasticsearch\ClientBuilder;
 
 
$hosts = [
    '192.168.16.241:9200',         // IP + Port
    '192.168.16.241',              // Just IP
    'localhost:9200', // Domain + Port
    'localhost',     // Just Domain
    'http://localhost',        // SSL to localhost
    'https://192.168.16.241:9200'  // SSL to IP + Port
];
$client = ClientBuilder::create()->setHosts($hosts)->build();            // Instantiate a new ClientBuilder  // Set the hosts
 
 
$params = [
    'index'  => 'test_data',
    'type'   => 'users',
    'id'     => 100027,
    'client' => [ 'ignore' => 404 ]
];
var_dump( $client->get($params));
```


2、浏览器访问test.php，结果如下（前提是你的es已经有数据）

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2Jnue06gdxBFSGyKpEljaCKFJJSPIcZIHiaaIHtzzGEQnxAiaOKlMQGnIIFSQ/640?wx_fmt=jpeg)




## **三、基本操作**



1、创建索引


```php

$params = [
    'index' => 'test_index'
];
 
// Create the index
print_r($client->indices()->create($params));

```

2、创建索引（指定模板）

```php

$params = [
    'index' => 'test_index',
    'body' => [
        'settings' => [
            'number_of_shards' => 5,
            'number_of_replicas' => 2
        ],
        'mappings' => [
            'test_type' => [
                '_source' => [
                    'enabled' => true
                ],
                'properties' => [
                    'name' => [
                        'type' => 'text',
                        'analyzer' => 'ik_max_word'
                    ],
                    'age' => [
                        'type' => 'integer'
                    ]
                ]
            ]
        ]
    ]
];
// Create the index with mappings and settings now
print_r($client->indices()->create($params));
```

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2JnuexZ9Bca2wHsNXdpeqK3duIf7J0Fk9ESfsBZ3THBIwl6xJVrwMhKL4Gw/640?wx_fmt=jpeg)

3、删除索引

```php

$params = ['index' => 'test_index'];
print_r($client->indices()->delete($params));
```


![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2JnueWhibpIKhuGHK89zcwglPXOPpOxCUk8dNr83GhkGv1Q4WPolIQicHK3MQ/640?wx_fmt=jpeg)

4、更改索引的配置参数:

```php

$params = [
    'index' => 'test_index',
    'body' => [
        'settings' => [
            'number_of_replicas' => 0,
            'refresh_interval' => -1
        ]
    ]
];
 
print_r($client->indices()->putSettings($params));

```

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2Jnue2nicrnRZkKGNszwHb5eydudAHLeWomYtVMDXRps0NL2ibCDEy8LCgGVA/640?wx_fmt=jpeg)



5、获取一个或多个索引的当前配置参数

```php

$params = [
    'index' => [ 'test_index', 'test_data' ]
];
print_r($client->indices()->getSettings($params));

```



![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2JnuemWSEN7cEf7KysictLvp2HKMJkg804K76KtGcXrgT4qOT80pwcriblCWg/640?wx_fmt=jpeg)

6、更改或增加一个索引的映射


```php

$params = [
    'index' => 'test_index',
    'type' => 'test_type',
    'body' => [
        'test_type' => [
            '_source' => [
                'enabled' => true
            ],
            'properties' => [
                'name' => [
                    'type' => 'text',
                    'analyzer' => 'ik_max_word'
                ],
                'age' => [
                    'type' => 'integer'
                ],
                'createtime' => [
                    'type' => 'date'  //加了一个时间
                ]
 
            ]
        ]
    ]
];
 
// Update the index mapping
print_r($client->indices()->putMapping($params));
```


![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2JnueelrzdavIrHnCdd1akDPL2Aft50H5ibsYdIdAlrUq6WvnuwLWo5jD3IA/640?wx_fmt=jpeg)

7、返回索引和类型的映射细节

```php
$response = $client->indices()->getMapping();
 
// Get mappings for all types in 'my_index'
$params = ['index' => 'my_index'];
$response = $client->indices()->getMapping($params);
 
// Get mappings for all types of 'my_type', regardless of index
$params = ['type' => 'my_type' ];
$response = $client->indices()->getMapping($params);
 
// Get mapping 'my_type' in 'my_index'
$params = [
    'index' => 'my_index'
    'type' => 'my_type'
];
$response = $client->indices()->getMapping($params);
 
// Get mappings for two indexes
$params = [
    'index' => [ 'my_index', 'my_index2' ]
];
$response = $client->indices()->getMapping($params);

```

8、索引一个文档（提供id，则会更新对应id的记录。若没有提供，则会生成一条文档）


```php

$params = [
    'index' => 'test_data',
    'type' => 'users',
    'id' => '100027',
    'body' => [ 'nickname' => 'update222']
];
 
// Document will be indexed to my_index/my_type/my_id
print_r($client->index($params));

```

9、获取文档


```php

$params = [
    'index' => 'test_data',
    'type' => 'users',
    'id' => '100027'
];
 
// Get doc at /my_index/my_type/my_id
print_r($client->get($params));
```

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2JnueRRBsJwibh6w1TxdedtqkNvojLHFhpb9n7eo6Z9vW75mOiaM0RXMPjYAQ/640?wx_fmt=jpeg)

10、更新文档 （doc指定要更新的字段内容）


```php

$params = [
    'index' => 'test_data',
    'type' => 'users',
    'id' => '100027',
    'body' => [
        'doc' => [
            'nickname' => 'abc',
            'mobile' => '13800138000'
        ]
    ]
];
// Update doc at /my_index/my_type/my_id
print_r($client->update($params));
```

![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHj8e3Yibhr8xNxyHJt2Jnue9393GQGPEReerm2Q5oJLpWSrul8ibyPoHNfbG6SsiaYhsUIVVmdFFYsA/640?wx_fmt=jpeg)

11、执行一个脚本进行更新，对某个字段的数据进行拼接或自增


```php
$params = [
    "index" => "test_data",
    "type" => "users",
    "id" => "100027",
    "body" => [
        "script" => "ctx._source.nickname += 'hahh'"
    ]
];
print_r($client->update($params));
```

12、删除文档


```php

$params = [
    'index' => 'test_data',
    'type' => 'users',
    'id' => '100027'
];
 
// Delete doc at /my_index/my_type/my_id
print_r($client->delete($params));
```

13、搜索内容
```php
json = '{
    "query" : {
        "match" : {
            "id" : "100073"
        }
    }
}';
 
$params = [
    'index' => 'test_data',
    'type' => 'users',
    'body' => $json
];
print_r($client->search($params));
 
 
$params = [
    'index' => 'test_data',
    'type' => 'users',
    'body' => [
        'query' => [
            'bool' => [
                'should' => [
                    [ 'match' => [ 'nickname' => [
                        'query' => 'user440032',
                        'boost' => 3, // 权重大
                    ]]]
                ],
            ],
        ],
        'sort' => ['id'=>['order'=>'desc']]     //排序   分页
        , 'from' => 0, 'size' => 10
    ]
];
 
print_r($client->search($params));
```

<font size=2 color=grey>[阅读原文](https://www.cnblogs.com/killer21/p/12179936.html)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
