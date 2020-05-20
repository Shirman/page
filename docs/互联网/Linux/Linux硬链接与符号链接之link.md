<!-- TOC -->

- [ln命令](#ln命令)
- [Inode说起](#inode说起)
- [Hard Link：](#hard-link)
    - [范例：](#范例)
    - [原理：](#原理)
- [Symbolic Link：](#symbolic-link)
    - [范例：](#范例-1)
    - [原理：](#原理-1)
- [关于删除](#关于删除)
- [用途](#用途)

<!-- /TOC -->

### ln命令 ###
	ln - make links between files
ln命令是用来建立硬链接和符号链接的。

常用参数：

	-f : 链接时先将与 dist 同名的文件删除 
	-d : 允许系统管理者硬链结自己的目录 
	-i : 在删除与 dist 同名的文件时先进行询问 
	-n : 在进行软链接时，将 dist 视为一般的文件 
	-s : 进行软链接(symbolic link) 
	-v : 在连结之前显示其档名 
	-b : 将在链结时会被覆写或删除的档案进行备份

### Inode说起 ###
理解inode，要从文件储存说起。

文件储存在硬盘上，硬盘的最小存储单位叫做"**扇区**"（Sector）。每个扇区储存512字节（相当于0.5KB）。

操作系统读取硬盘的时候，不会一个个扇区地读取，这样效率太低，而是一次性连续读取多个扇区，即一次性读取一个"**块**"（block）。这种由多个扇区组成的"块"，是文件存取的最小单位。**"块"的大小，最常见的是4KB，即连续八个 sector组成一个 block**。

文件数据都储存在"块"中，那么很显然，我们还必须找到一个地方储存文件的元信息，比如文件的**创建者、文件的创建日期、文件的大小**等等。这种储存**文件元信息的区域就叫做inode**，中文译名为"**索引节点**"。


### Hard Link： ###
#### 范例： ####

	ln file1 file2
	cat file1 file2
可以看到file2和文件file1是完全相同的。如果你删除了文件file1，文件file2依然存在，反之删除了file2，file1也是依然存在；这两个文件只要修改了任意一个文件，另一个也会随之更新。

#### 原理： ####

Hard Link就是在该目录下记录和源文件指向相同Inode Num，实际上不占用任何的硬盘空间，除了Hard Link所在目录的Block可能会增加（这种情况出现的概率很低，因为增加一个Hard Link的相关数据是很小的）；

**意思就是Hard Link文件和源文件指向相同Inode，当然一个Inode指向唯一的数据block。**
 
	file1->
			inode->	block
	file2->

### Symbolic Link： ###
#### 范例： ####

	ln -s file1 file2

如果打算建立一个对子目录/usr/local/games的hard link，

	ln /usr/local/games play
ln命令会显示出错信息并退出(**hard link不支持目录**)。但是可以使用符号链接：

	ln -s /usr/local/games play
现在 ，不必键入一个向下面那么长的命令了：

	cd /usr/local/games
只需要：

	cd paly


#### 原理： ####
Symbolic Link 就是建立一个新建的文件（类似于windows快捷方式的文件），该文件具有自己的inode num，只不够该文件的数据读取会指向源文件的block块，所以该symbolic link文件只是名字占用了硬盘空间；

意思就是Symbolic Link是新申请了个Inode，而这个inode指向的数据block是源文件的文件名（绝对路径），所以symbolic link最终也是指向源文件；


	file1->	inode1
					->block
	file2-> inode2

### 关于删除 ###

这边顺带讲解下linux下删除文件：

- 如果删除文件时，**inode对应的文件只有一个的话**，则直接删除文件符号、inode、data block、super block。

- 如果删除文件时，**还有其他的文件符号指向该inode的话**，则将不删除inode和相关的block
。也就是说当且仅当剩下最后一个文件符号指向该inode，删除文件将删除inode和实际data block和super block。

> 符号链接和硬链接的区别就是符号链接只是指向原始文件的一个名字而已，如果删除了符号链接，原始文件不会有任何变化，如果你删除了原始文件，符号链接也就废了。如果删除hard link，当且仅当剩下最后一个文件符号指向该inode时，才最真正删除inode和实际数据block与super block。


### 用途 ###
理论上Hard link比较安全，即使某一个目录下的关联数据被删除后，也没关系，只要有任何一个目录下存在关联数据，那么该文件就不会不见了。

但由于hard link的限制太多，包括无法做目录的链接，在用途上较受限制，反而是symbolic link的使用比较广泛。

----------
@tsingchan

