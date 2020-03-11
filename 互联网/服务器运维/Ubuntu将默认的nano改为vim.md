

Ubuntu 终端下默认的编辑器为 nano。

比如输入命令“crontab -e”就会打开 nano。

不过我们在学会使用 Vim 以后可能就不愿意在使用 nano 了。

那么怎么才能直接就调用 Vim 编辑器来编辑呢？

只需要修改一个配置我们就可以做到。操作步骤如下：

### 方法1

打开一个终端，在其中输入如下命令： 

    sudo update-alternatives –config editor 

然后在返回的对话中选择第 4 项 vim.basic 。

### 方法2

    echo export EDITOR=/usr/bin/vim >> ~/.bashrc

*注意以上操作结束后，退出当前控制台，重新进入方可生效*
