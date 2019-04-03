linux rsync 文件同步

> rsync可以让两个目录的内容一致，它同步只会同步有更新过的文件，减少传输量。可以是本机上的两个目录，也可以是本机的目录同步到服务器上，还可以是把服务器上的目录同步到本机上。

基本命令是 

    rsync 命令的参数  源目录  目的目录

rsync可以基于ssh协议来做，这样就省去了很多配置rsync server的麻烦，如果两个机器已经实现ssh无密码登陆，那么rsync就会提示输入密码，还有一种是通过密钥文件来实现免密码，例如下面

    rsync -vzrtopg  --progress -e ssh --delete 用户名@服务器IP:/var/www/dirA/ /var/bak/


    rsync  -vzrtopg  --progress -e "ssh -i  /path/pwd.pem" --delete 用户名@服务器IP:/var/www/dirA/ /var/bak/

就是把服务器上的dirA目录同步到本地的/var/bak目录下，其中方法1是用户已经做了ssh免密码登陆，方法2是通过密钥(存放在/path 下的pwd.pem文件)来同步


