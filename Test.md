https://www.zhihu.com/question/389416995

还是我们毛主席厉害，主要矛盾、次要矛盾，主要方面、次要方面，安排的明明白白。

这个时候大家应该知道此时的主要矛盾是病毒，次要矛盾才是国家与国家、政党与政党等之间的分歧。要着重投入预防、救治和对抗病毒。春节以来中国gov的表率。

而主要矛盾中的主要方面就是如何预防病毒、救治病人、共同研究疫苗；主要矛盾中的次要方面比如指责世贸组织、指责某某国家、指责外派支援、口罩医疗设备问题、赛事复工等。

中国在解决完主要矛盾的主要方面后，开始逐步将外派支援、医疗设备支援、赛事复工复产转移为主要方面，由于全球病毒仍然未稳定，并可能会迎来又一波高峰时，主要矛盾仍然是病毒，主要方面为预防、研究疫苗、复工复产、外派支援

当然如果不去解决主要方面，而是一直纠缠次要方面，次要方面可能会成长为主要方面（不是说原来的主要方面变小了，而是次要方面激增远超原来的主要方面），矛盾也就会产生变化。

同样的纠缠次要矛盾，次要矛盾也会成长被覆盖为主要矛盾，病毒不再是主要矛盾时（不大可能，中国有胸怀天下悬壶济世之心，且病毒严重影响了最基础的安全感：生命安全），但如果同时存在两大不相上下的矛盾，必然加大解决的难度。



  
![](https://mmbiz.qpic.cn/mmbiz_gif/Se4H6E5hzKUdrm43ULu0cOHum9YXicY1GNncJFbQvIuibk2zY2ElaFXT5A7PN9k6cEz9hUQdavnHY2nQOIGnlb8A/640?wx_fmt=gif)![](https://mmbiz.qpic.cn/mmbiz_png/Se4H6E5hzKUdrm43ULu0cOHum9YXicY1GlCHicfdIOf4WQ64NuL7ibaVrk1KJ80ias2DpPTQb3ANHBSEwxic5kibfwFA/640?wx_fmt=png)![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PE6EdvrLsDGtTYJShApManMUpQL2yzjOGHxADm3hHd2yvhfd7EiaMKDheLrqJjP6FqeBO0Fia6jvk2g/640?wx_fmt=jpeg)

**1.基本配置**

```
//公众账号appid
 $data["mch_appid"] = 'appid';
//商户号 
 $data["mchid"] = '';
//随机字符串 
 $data["nonce_str"] = 'suiji'.mt_rand(100,999); 
//商户订单号 
 $data["partner_trade_no"]=date('YmdHis').mt_rand(1000,9999); 
//金额 用户输入的提现金额需要乘以100  
 $data["amount"] = $money; 
//企业付款描述
 $data["desc"] = '企业付款到个人零钱'; 
//用户openid   
 $data["openid"] = $openid; 
//不检验用户姓名  
 $data["check_name"] = 'NO_CHECK'; 
//获取IP  
 $data['spbill_create_ip']=$_SERVER['SERVER_ADDR']; 
//商户密钥 
 $data['key']='';
//商户证书 商户平台的API安全证书下载
 $data['apiclient_cert.pem']
 $data['apiclient_key.pem']

```


**2.PHP代码**

```
/**
**开始支付
/
 public function userpay(){
 $money = ‘用户输入提现金额';
 $info['money'] = ‘用户余额';
 if ($this->openid && $money){
  if ($money>$info['money'] ){
  echo json_encode([
   'status' => 1,
   'message' => '余额不足，不能提现！',
   'code'=>'余额不足，不能提现！'
  ]);
  }elseif ($money 2,
   'message' => '提现金额不能小于1元',
   'code'=>'提现金额太低'
  ]);
  }else{
 $openid = $this->openid;
 $trade_no = date('YmdHis').mt_rand(1000,9999);
 $res = $this->pay($openid,$trade_no,$money*100,'微信提现');

 //结果打印
 if($res['result_code']=="SUCCESS"){

   echo json_encode([
   'status' => 3,
   'message' => '提现成功！',
   ]);
  }elseif ($res['err_code']=="SENDNUM_LIMIT"){
   echo json_encode([
   'status' => 4,
   'message' => '提现失败！',
   'code'=>'每日仅能提现一次',
   ]);
  }else{
   echo json_encode([
   'status' => 5,
   'message' => '提现失败！',
   'code'=>$res['err_code'],
   ]);
  }
  }
 }else{
  echo json_encode([
  'status' => 5,
  'message' => '未检测到您当前微信账号~',

  ]);
 }
 }

```


支付方法

```
/**
*支付方法
/
public function pay($openid,$trade_no,$money,$desc){
 $params["mch_appid"]=''; 
 $params["mchid"] = ''; 
 $params["nonce_str"]= 'suiji'.mt_rand(100,999); 
 $params["partner_trade_no"] = $trade_no;  
 $params["amount"]= $money;  
 $params["desc"]= $desc;  
 $params["openid"]= $openid;  
 $params["check_name"]= 'NO_CHECK'; 
 $params['spbill_create_ip'] = $_SERVER['SERVER_ADDR']; 

 //生成签名
 $str = 'amount='.$params["amount"].'&check_name='.$params["check_name"].'&desc='.$params["desc"].'&mch_appid='.$params["mch_appid"].'&mchid='.$params["mchid"].'&nonce_str='.$params["nonce_str"].'&openid='.$params["openid"].'&partner_trade_no='.$params["partner_trade_no"].'&spbill_create_ip='.$params['spbill_create_ip'].'&key=商户密钥';

 //md5加密 转换成大写
 $sign = strtoupper(md5($str));
 //生成签名
 $params['sign'] = $sign;

 //构造XML数据
 $xmldata = $this->array_to_xml($params); //数组转XML
 $url='https://api.mch.weixin.qq.com/mmpaymkttransfers/prom otion/transfers';

 //发送post请求
 $res = $this->curl_post_ssl($url, $xmldata); //curl请求 
 if(!$res){
 return array('status'=>1, 
   'msg'=>"服务器连接失败" );
 }

 //付款结果分析
 $content = $this->xml_to_array($res); //xml转数组
 return $content;
 }

```


```
/**
* curl请求
/
public function curl_post_ssl($url, $xmldata,  $second=30,$aHeader=array()){
 $ch = curl_init();
 //超时时间
 curl_setopt($ch,CURLOPT_TIMEOUT,$second);
 curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
 //这里设置代理，如果有的话
 //curl_setopt($ch,CURLOPT_PROXY, '10.206.30.98');
 //curl_setopt($ch,CURLOPT_PROXYPORT, 8080);
 curl_setopt($ch,CURLOPT_URL,$url);
 curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
 curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);

 //默认格式为PEM，可以注释
 curl_setopt($ch,CURLOPT_SSLCERTTYPE,'PEM');
//绝对地址可使用 dirname(__DIR__)打印，如果不是绝对地址会报 58 错误
 curl_setopt($ch,CURLOPT_SSLCERT,' 绝对地址/apiclient_cert.pem');
 curl_setopt($ch,CURLOPT_SSLKEYTYPE,'PEM');
 curl_setopt($ch,CURLOPT_SSLKEY,'绝对地址/apiclient_key.pem');
 if( count($aHeader) >= 1 ){
  curl_setopt($ch, CURLOPT_HTTPHEADER, $aHeader);
 }
 curl_setopt($ch,CURLOPT_POST, 1);
 curl_setopt($ch,CURLOPT_POSTFIELDS,$xmldata);
 $data = curl_exec($ch);
 if($data){
 curl_close($ch);
 return $data;
 }
 else {
 $error = curl_errno($ch);
 echo "call faild, errorCode:$error\n";
 die();
 curl_close($ch);
 return false;
 }
 }

```


生成签名

```
/**
 * array 转 xml
 * 用于生成签名
*/
public function array_to_xml($arr){
 $xml = "";
 foreach ($arr as $key => $val) {
 if (is_numeric($val)) {
 $xml .= "".$val."";
 } else
 $xml .= "";
 }
 $xml .= "";
 return $xml;
 }

```


```
/**
* xml 转化为array
*/
public function xml_to_array($xml){
 //禁止引用外部xml实体
 libxml_disable_entity_loader(true);
 $values = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
 return $values;
 }

```
**以上内容希望帮助到大家，有需要的可以添加下方二维码进群交流学习新技术。**



**如果你想和PHP大神交流添加微信，拉你入群**

**如果你想获得精品资料添加微信，送你资源**



![](https://mmbiz.qpic.cn/mmbiz_jpg/LFP9SpGv0PHpfnL2YfyqeL9aHictQVL7IG7ZUjicECq5tYt42ibGA4CI2KBkA6hJLuKYbsXvARgKGGLN0XkCZr5JQ/640?wx_fmt=jpeg)**扫码关注菲菲**

**php资源免费送！**

**COME BABY**

![](https://mmbiz.qpic.cn/mmbiz_png/MvsGtlp1hRecpZctD8Rkb3viaUHQZPWkRwdztpdwWUlu6LZHPON5V8AGDkJ03yKePhxCE7NeogjlQN8acx4iczHw/640?wx_fmt=png)

<font size=2 color=grey>[阅读原文](https://mp.weixin.qq.com/s?__biz=MzIwNjQ5MDk3NA==&mid=2247486408&idx=1&sn=62436ada6c9e24a556123e15d43846f8&chksm=972197f9a0561eef571bfef1155987c5de695025040ecdba35c8461ed5bc1412e1dbbdeedb3e&scene=21#wechat_redirect)</font>


----
<font size=2 color='grey'>本文收藏来自互联网，仅用于学习研究，著作权归原作者所有，如有侵权请联系删除</font>

markdown [@tsingchan](https://github.com/tsingchan) 

> 引用格式为收藏注解，比如本句就是注解，非作者原文。
