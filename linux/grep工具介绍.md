## grep工具介绍

### 目录

- [grep工具介绍](#grep工具介绍)

    - [简介：](#简介)
    - [grep用法](#grep用法)
    - [grep结合基础正则表达式](#grep结合基础正则表达式)
    - [附：grep实例分析](#附grep实例分析)


### 简介： ###
用'grep'搜索文本文件
 
如果您要在几个文本文件中查找一字符串，可以使用‘grep’命令。‘grep’在文本中搜索指定的字符串。

假设您正在‘/usr/src/linux/Documentation’目录下搜索带字符串‘magic’的文件：

	$ grep magic /usr/src/linux/Documentation/* 
	sysrq.txt:* How do I enable the magic SysRQ key?
	sysrq.txt:* How do I use the magic SysRQ key? 

其中文件‘sysrp.txt’包含该字符串，讨论的是 SysRQ 的功能。

默认情况下，‘grep’只搜索当前目录。如果此目录下有许多子目录，‘grep’会以如下形式列出：

	grep: sound: Is a directory 

这可能会使‘grep’的输出难于阅读。这里有两种解决的办法：

明确要求搜索子目录：grep -r 

或忽略子目录：grep -d skip
 
当然，如果预料到有许多输出，您可以通过 管道 将其转到‘less’上阅读：

	$ grep magic /usr/src/linux/Documentation/* | less

这样，您就可以更方便地阅读。

### grep用法 ###

grep的用法

grep [OPTION] regular_expressions [filename1…]
 regular_expressions:是正则表达式，一般用单引号把正则表达式括起来。当然，也可以不使用正则表达式而使用字符串，使用字符串时一般使用双引号把字符串括起来。

	grep选项
	-c  只输出匹配行的计数
	-i  不区分大小写（只适用于单字符）
	-h  查询多文件时不显示文件名
	-l  查询多文件时只输出包含匹配字符的文件名
	-n  显示匹配行及行号
	-s  不显示不存在或无匹配文本的错误信息
	-v  显示不包含匹配文本的所有行
	-E  使用扩展正则表达式
	-w  如果使用\<和\>引用，就把表达式作为一个单词搜索
	--color  可以用来设置找到的关键字的颜色，常用--color=auto
	[]  在[]当中“仅代表一个待搜索的字符”[dz]字符d或字符z的意思，
		而[0-9a-z]则表示该字符要么是数字要么就是小写字母

### grep结合基础正则表达式 ###

	RE字符	意义与范例
	
	.	 	
        代表任意一个字符（允许匹配ASCII集中任意字符，包括空格）
        grep –n ‘e.e’ regular_express.txt        
        搜索的字符串可以是(eve)(eae)(eee)(e e)，但不能仅有(ee)

	^word		
        代表搜索的字符串(word)在行首            
        grep –n ‘^e’ regular_express.txt
        搜索行首为e开始的行

	word$	
        代表搜索的字符串(word)在行尾
        grep –n ‘^e’ regular_express.txt
        搜索行尾为e开始的行（只对linux规格文件有效，dos规格文件结尾是^M$）
        grep –n ‘^$’ regular_express.txt
        搜索所有空行

	*	    
        重复零个或多个的前一个RE字符
        grep –n ‘ess*’ regular_express.txt
        搜索包含(es)(ess)(esss)等字符串，注意*可以是0个，所以es也是符合待搜索的字符串。
        若要显示任意字符，则为“.*”

	\	    
        去除特殊符号的特殊意义
        grep –n ‘\*’ regular_express.txt
        搜索含有*符号的行

	[]	    
        字符集合的RE特殊字符的符号
        [list]
        grep –n ‘g[ld]’ regular_express.txt
        搜索含有(gl)或(gd)的那一行
        注意，在[]当中“仅代表一个待搜索的字符”，即[afl]代表a或f或l的意思
        [ch1-ch2]
        grep –n ‘[0-9] regular_express.txt
        搜索含有任意数字的那一行
        注意，在字符集合[]中的减号-表示在两个字符之间的所有连续字符
        [^]
        grep –n ‘oo[^t]’ regular_express.txt
        搜索的字符串不能是(oot)可以是(ood)等
        注意，符号^用在[]中，表示否定或不匹配括号里的内容

	word\{n,m\}	      
        连续n到m个word
        若为word\{n\}则是连续n个word
        若为word\{n，\}则是连续n个以上word
        若为word\{，m\}则是最多出现m次
        grep –n ‘go\{2，3、}g’ regular_express.txt
        在g与g之间有2~3个的o存在的字符串

	\(word\)	      
        标记匹配字符
        grep –n ‘w\(es\)t.*\1’ test
        如果west被匹配，则es就被存储到内存中，并标志为1，然后搜索任意个字符(.*)，
        这些字符后面紧跟另外一个es(\1)，找到就显示该行。
        也就是说westkkkes、westadfaesssss、eadfwestddesdd均可显示出来。	
        如果使用了-E或egrep的话，就可以不用\跳脱符，直接使用()即可。

	\<word\>	     
        行中如果含有word这个单词则显示
        grep –n ‘\<west\>’ test.txt
        会显示I west、west，但包含west的字符串不会显示(westadfafes)

	\w
	\W	     
        \w是匹配文字和数字字符，也就是[A-Za-z0-9]
        \W是匹配一个或多个非单词字符，如点好句号等
        grep –n ‘G\w*p’ test.txt
        列出G后面跟零个或多个文字或数字字符，然后是p的行
        grep –n ‘G\W*p’ test.txt
        列出G后面跟零个或多个非文字或非数字字符，然后是p的行

	\bword\b	     
        锁定只对word匹配的行，作用和\<word\>类似
        grep –n ‘\bwest\b’ test.txt


### 附：grep实例分析 ###
http://blog.jobbole.com/75410/


----------
@tsingchan
