## Mount基础简单明了
### 目录

- [Mount基础简单明了](#mount基础简单明了)
    
    - [使用须知：](#使用须知)
    - [Mount命令使用：](#mount命令使用)
    - [编码问题](#编码问题)
    - [显示挂载的文件系统](#显示挂载的文件系统)
    - [/etc/fstab了解](#etcfstab了解)
        - [/dev/device](#devdevice)
        - [mountpoint](#mountpoint)
        - [type](#type)
        - [rules](#rules)
        - [dump](#dump)
        - [fsck_order](#fsck_order)


### 使用须知： ###
> 1、挂载点必须是一个目录。
>  
> 2、一个分区挂载在一个已存在的目录上，这个目录可以不为空，但挂载后这个目录下以前的内容将不可用。对于其他操作系统建立的文件系统的挂载也是这样。
> 
> 3、光盘、软盘、其他操作系统使用的文件系统的格式与linux使用的文件系统格式是不一样的。光盘是ISO9660；软盘是fat16或ext2；windows NT是fat16、NTFS；windows98是fat16、fat32；windows2000和windowsXP是fat16、fat32、 NTFS。挂载前要了解linux是否支持所要挂载的文件系统格式。


### Mount命令使用： ###

> 格式：mount [-参数] [设备名称] [挂载点] 其中常用的参数有

	-t 	指定设备的文件系统类型，常见的有：
	minix linux最早使用的文件系统
	ext2 linux目前常用的文件系统
	msdos MS-DOS的fat，就是fat16
	vfat windows98常用的fat32
	nfs 网络文件系统
	iso9660 CD-ROM光盘标准文件系统
	ntfs windows NT 2000的文件系统
	hpfs OS/2文件系统
	auto 自动检测文件系统

	-o 指定挂载文件系统时的选项。有些也可用在/etc/fstab中。常用的有：
	codepage=XXX 代码页
	iocharset=XXX 字符集
	ro 以只读方式挂载
	rw 以读写方式挂载
	nouser 使一般用户无法挂载
	user 可以让一般用户挂载设备
注意：mount命令没有建立挂载点的功能，因此你应该确保执行mount命令时，挂载点已经存在。

**示例：windows98装在hda1分区，同时计算机上还有软盘和光盘需要挂载。**

	 mk /mnt/winc
	 mk /mnt/floppy
	 mk /mnt/cdrom
	 mount -t vfat /dev/hda1 /mnt/winc
	 mount -t msdos /dev/fd0 /mnt/floppy
	 mount -t iso9660 /dev/cdrom /mnt/cdrom


### 编码问题 ###

如果你的windows目录里有中文文件名，使用上面的命令挂载后，显示的是一堆乱码。这就要用到 -o 参数里的codepage iocharset选项。codepage指定文件系统的代码页，简体中文中文代码是936；iocharset指定字符集，简体中文一般用cp936或 gb2312,现在的新发行版一般都需要多加一个参数 utf8=0。当挂载的文件系统linux不支持时，mount一定报错，如windows2000的ntfs文件系统。可以重新编译linux内核以获得对该文件系统的支持。关于重新编译linux内核，就不在这里说了。

	mount -t vfat -o codepage=936,iocharset=cp936,utf8=0 /dev/hda7 /mnt/f

	使用实例：
	挂载光驱
	mount -t iso9660 /dev/cdrom /mnt/cdrom
	挂载光驱，支持中文
	mount -t iso9660 -o codepage=936,iocharset=cp936 /dev/cdrom /mnt/cdrom
	挂载 Windows 分区，FAT文件系统
	mount -t vfat /dev/hda3 /mnt/cdrom         
	挂载 Windows 分区，NTFS文件系统
	mount -t ntfs -o iocharset=cp936 /dev/hda7 /mnt/had7
	挂载 ISO 文件
	mount -o loop /abc.iso /mnt/cdrom
	挂载 软驱
	mount /dev/fd0 /mnt/floppy
	挂载闪盘
	mount /dev/sda1 /mnt/cdrom
	挂载 Windows 操作系统共享的文件夹
	mount -t smbfs - o username=guest,password=guest //machine/path /mnt/cdrom


### 显示挂载的文件系统 ###

	mount
	cat /etc/fstab      		开机自动加载的FS
	cat /etc/mtab       	当前已经加载的FS

  
### /etc/fstab了解 ###
    /etc/fstab就是在开机引导的时候自动挂载到linux的文件系统。 
   
  	例如这是一个普通的/etc/fstab:
      /dev/device   mountpoint   type       rules    dump   fsck_order
        
      /dev/hda2     /           ext3       defaults    0       1                 
	  /dev/hda3     swap        swap      defaults    0       0     
      /dev/hda5     /usr         ext3       defaults   0       0     
      /dev/fdo      /mnt/flopy    ext3       noauto    0       0     
      /dev/cdrom    /mnt/cdrom  iso9660  noauto,ro    0       0     

#### /dev/device ####
就是需要挂载的设备，/hda2就是第一个IDE插槽上的主硬盘的第二个分区。如果是第二个IDE插槽主硬盘的第三个分区，那就是/dev/hdc3，具体可以在linux下使用fdisk -l  查看。

#### mountpoint  ####
就是挂载点。/、 /usr、 swap 都是系统安装时分区的默认挂载点。
如果你要挂载一个新设备，你就要好好想想了，因为这个新设备将作为文件系统永久的一部分，需要根据FSSTND（文件系统标准），以及它的作用，用户需求来决定。比如你想把它做为一个共享资源，放在/home下面就是一个不错选择。

#### type  ####
是指文件系统类形。
      
#### rules  ####
是指挂载时的规则。下面列举几个常用的：

	auto 	开机自动挂载 
	default 按照大多数永久文件系统的缺省值设置挂载定义
	noauto 开机不自动挂载
	nouser 只有超级用户可以挂载
	ro 		按只读权限挂载
	rw 		按可读可写权限挂载
	user 	任何用户都可以挂载
请注意光驱和软驱只有在装有介质时才可以进行挂载，因此它是noauto

#### dump  ####
是指dump系统备份工具。这一项为0，就表示从不备份。如果上次用dump备份，将显示备份至今的天数。 

#### fsck_order  ####
指fsck（启动时fsck检查的顺序）。为0就表示不检查，（/）分区永远都是1，其它的分区只能从2开始，当数字相同就同时检查（但不能有两1）。

如果我要把第二个IDE插槽主硬盘上的windows C 区挂到文件系统中，那么数据项是：

     /dev/hdc1	 /c 	vfat 	defaults 	0 	0
（注：/c 是事先建立的文件夹，作为c盘的挂载点。）
       

**当你修改了/etc/fstab后，一定要重新引导系统才会有效。**

**当你修改了/etc/fstab后，一定要重新引导系统才会有效。**

**当你修改了/etc/fstab后，一定要重新引导系统才会有效。**

----------
@tsingchan