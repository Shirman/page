
利用scp自动输入密码进行文件远程拷贝或备份

在执行计划任务拷贝文件的时候，用scp命令需要输入密码，这里用公共密钥的方式实现密码的自动输入。

具体操作：

范例要求：把192.168.0.2机上的test.tar拷贝到192.168.0.3机器的上

1、源文件 192.168.0.2服务器上:

    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    ssh-keygen -t rsa -P "" -f ~/.ssh/id_rsa

2、192.168.0.3服务器上:

    mkdir -p ~/.ssh

3、在192.168.0.3建立好.ssh目录后，从192.168.0.2拷贝~/.ssh/id_rsa.pub到192.168.0.3中~/.ssh目录下

    scp ~/.ssh/id_rsa.pub root@192.168.0.3:~/.ssh


4、把从192.168.0.2拷贝过来的id_rsa.pub重命名为authorized_keys

    cp id_rsa.pub authorized_keys

    chmod 600 ~/.ssh/authorized_keys

5、此时拷贝就不需要输入密码

    scp test.tar root@192.168.0.3:/var/www

下面就可以把此命令放到计划任务中而自动执行了
