

在Linux下查看内存我们一般用free命令： 

    [root@scs-2 tmp]# free 

    total       used       free     shared    buffers     cached 

    Mem:       3266180    3250004      16176          0     110652    2668236 

    -/+ buffers/cache:     471116    2795064 

    Swap:      2048276      80160    1968116 


下面是对这些数值的解释： 

**total**:总计物理内存的大小。 

**used**:已使用多大。 

**free**:可用有多少。 

**Shared**:多个进程共享的内存总额。 

**Buffers/cached**:磁盘缓存的大小。 

**第三行(-/+ buffers/cached)**: 

**used**:已使用多大。 

**free**:可用有多少。 

第四行就不多解释了。 

**区别**：第二行(mem)的used/free与第三行(-/+ buffers/cache) used/free的区别。

这两个的区别在于使用的角度来看，第一行是从OS的角度来看，因为对于OS，buffers/cached 都是属于被使用，所以他的可用内存是16176KB,已用内存是3250004KB,其中包括，内核（OS）使用+Application(X, oracle,etc)使用的+buffers+cached。

第三行所指的是从应用程序角度来看，对于应用程序来说，buffers/cached 是等于可用的，因为buffer/cached是为了提高文件读取的性能，当应用程序需在用到内存的时候，buffer/cached会很快地被回收。 

所以从应用程序的角度来说，可用内存=系统free memory+buffers+cached。 

如上例： 

2795064=16176+110652+2668236 

接下来解释什么时候内存会被交换，以及按什么方交换。 当可用内存少于额定值的时候，就会开会进行交换。 

如何看额定值： 

    cat /proc/meminfo 



    [root@scs-2 tmp]# cat /proc/meminfo 

    MemTotal:      3266180 kB 

    MemFree:         17456 kB 

    Buffers:        111328 kB 

    Cached:        2664024 kB 

    SwapCached:          0 kB 

    Active:         467236 kB 

    Inactive:      2644928 kB 

    HighTotal:           0 kB 

    HighFree:            0 kB 

    LowTotal:      3266180 kB 

    LowFree:         17456 kB 

    SwapTotal:     2048276 kB 

    SwapFree:      1968116 kB 

    Dirty:               8 kB 

    Writeback:           0 kB 

    Mapped:         345360 kB 

    Slab:           112344 kB 

    Committed_AS:   535292 kB 

    PageTables:       2340 kB 

    VmallocTotal: 536870911 kB 

    VmallocUsed:    272696 kB 

    VmallocChunk: 536598175 kB 

    HugePages_Total:     0 

    HugePages_Free:      0 

    Hugepagesize:     2048 kB 



用free -m查看的结果： 

    [root@scs-2 tmp]# free -m 

                total       used       free     shared    buffers     cached 

    Mem:          3189       3173         16          0        107       2605 

    -/+ buffers/cache:        460       2729 

    Swap:         2000         78       1921 



查看/proc/kcore文件的大小（内存镜像）： 

    [root@scs-2 tmp]# ll -h /proc/kcore 

    -r-------- 1 root root 4.1G Jun 12 12:04 /proc/kcore 

备注： 

占用内存的测量 

测量一个进程占用了多少内存，linux为我们提供了一个很方便的方法，/proc目录为我们提供了所有的信息，实际上top等工具也通过这里来获取相应的信息。 

/proc/meminfo 机器的内存使用信息 

/proc/pid/maps pid为进程号，显示当前进程所占用的虚拟地址。 

/proc/pid/statm 进程所占用的内存 

    [root@localhost ~]# cat /proc/self/statm 

    654 57 44 0 0 334 0 

输出解释 

CPU 以及CPU0。。。的每行的每个参数意思（以第一行为例）为： 

参数 解释 /proc//status 

Size (pages) 任务虚拟地址空间的大小 VmSize/4 

Resident(pages) 应用程序正在使用的物理内存的大小 VmRSS/4 

Shared(pages) 共享页数 0 

Trs(pages) 程序所拥有的可执行虚拟内存的大小 VmExe/4 

Lrs(pages) 被映像到任务的虚拟内存空间的库的大小 VmLib/4 

Drs(pages) 程序数据段和用户态的栈的大小 （VmData+ VmStk ）4 

dt(pages) 04 

查看机器可用内存 

    /proc/28248/>free 

    total used free shared buffers cached 

    Mem: 1023788 926400 97388 0 134668 503688 

    -/+ buffers/cache: 288044 735744 

    Swap: 1959920 89608 1870312 


我们通过free命令查看机器空闲内存时，会发现free的值很小。这主要是因为，在linux中有这么一种思想，内存不用白不用，因此它尽可能的cache和buffer一些数据，以方便下次使用。但实际上这些内存也是可以立刻拿来使用的。 

所以 空闲内存=free+buffers+cached=total-used  

**buffer内存与cache内存有何区别**

两者都是RAM中的数据。

简单来说，buffer是即将要被写入磁盘的，而cache是被从磁盘中读出来的。

缓存（cached）是把读取过的数据保存起来，重新读取时若命中（找到需要的数据）就不要去读硬盘了，若没有命中就读硬盘。其中的数据会根据读取频率进行组织，把最频繁读取的内容放在最容易找到的位置，把不再读的内容不断往后排，直至从中删除。

缓存（cache）实际并不是缓冲文件的，而是缓冲块的，块是磁盘I/O操作的最小单元（在Linux中，它们通常是1KB）。这样，目录、超级块、其它文件系统的薄记数据以及非文件系统的磁盘数据都可以被缓冲了。

如果缓存有固定的大小，那么缓存太大了也不好，因为这会使得空闲的内存太小而导致进行交换操作（这同样是慢的）。为了最有效地使用实际内存，Linux自动地使用所有空闲的内存作为高速缓冲，当程序需要更多的内存时，它也会自动地减小缓冲的大小。

缓冲（buffers）是根据磁盘的读写设计的，把分散的写操作集中进行，减少磁盘碎片和硬盘的反复寻道，从而提高系统性能。linux有一个守护进程定期清空缓冲内容（即写磁盘），也可以通过sync命令手动清空缓冲。举个例子吧：我这里有一个ext2的U盘，我往里面cp一个3M的 MP3，但U盘的灯没有跳动，过了一会儿（或者手动输入sync）U盘的灯就跳动起来了。卸载设备时会清空缓冲，所以有些时候卸载一个设备时要等上几秒钟。

buffer是由各种进程分配的，由进程和系统一起管理.被用在如输入队列等方面，一个简单的例子如某个进程要求有多个字段读入，在所有字段被读入完整之前，进程把先前读入的字段放在buffer中保存。

cache经常被用在磁盘的I/O请求上，如果有多个进程都要访问某个文件，于是该文件便被做成cache以方便下次被访问，这样可提供系统性能。

综上所述可以理解为cache系统管理, buffer由进程和系统一起管理.

参考：http://zhidao.baidu.com/question/172317422.html
http://www.cnblogs.com/fighter/archive/2010/03/16/1687066.html
