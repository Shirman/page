## Vim文件编码步步分解


- [Vim文件编码步步分解](#vim文件编码步步分解)
    - [背景](#背景)
    - [查看文件编码](#查看文件编码)
    - [专职治乱码](#专职治乱码)
    - [为什么它治乱码](#为什么它治乱码)
    - [通过Vim转换文件编码](#通过vim转换文件编码)
    - [iconv 工具转换](#iconv-工具转换)
    - [批量文件编码转换](#批量文件编码转换)
    - [了解Vim的4个字符编码选项](#了解vim的4个字符编码选项)
    - [Vim多字符编码如何工作](#vim多字符编码如何工作)


### 背景

如果你需要在Linux中操作windows下的文件，那么你可能会经常遇到文件编码转换的问题。Windows中默认的文件格式是GBK(gb2312)，而Linux一般都是UTF-8。下面介绍一 下，在Linux中如何查看文件的编码及如何进行对文件进行编码转换。

### 查看文件编码

在Vim中可以直接查看文件编码

    :set fileencoding

即可显示文件编码格式。

### 专职治乱码

如果你只是想查看其它编码格式的文件或者想解决用Vim查看文件乱码的问题，那么你可以在~/.vimrc 文件中添加以下内容：

    let &termencoding=&encoding
    set fileencodings=utf-8,ucs-bom,gbk,cp936

### 为什么它治乱码

这样，就可以让vim自动识别文件编码（可以自动识别UTF-8或者GBK编码的文件），其实就是依照fileencodings提供的编码列表尝试，如果没有找到合适的编码，就用latin-(ASCII)编码打开。终端编码为空的话默认取用encoding的设置，encoding的设置取决于locale的设置；这样能够保证vim打开的文件都能正常显示；

### 通过Vim转换文件编码

在Vim中直接进行转换文件编码，比如将一个文件转 换成utf-8格式：

    :set fileencoding=utf-8    

其实在打开的乱码文件中使用这个命令是不起作用的，参见以下详解：

>这个方法只有在打开的文件显示是正常的的时候才能直接进行set转换编码，否则Vim下set将屏幕上显示的符号去重新转换，也就是将乱码进行转换编码之后还是会乱码的。
>
>也就是说要给文件转换编码格式，必须在文件字符显示正常的情况下才能进行转换，因为set转换编码是建立在已经输出的文件流上的，即建立在输出；所以set的设置建议写到.vimrc配置文件中去，在Vim启动时就配置好，这样转换的时候就不会出现乱码，这是我为了向IT Girl炫耀拼命尝试研究的结果，GET！


### iconv 工具转换

格式：

    iconv -f encoding -t encoding inputfile

查看文件的encoding 、 fileencoding 、 termencoding  三个设置，通过iconv将文件的fileencoding转换成我们需要的编码如utf-8即可，一般termencoding置空默认是采用encoding的设置。

范例：比如将一个UTF- 8 编码的文件转换成GBK编码

    iconv -f GBK -t UTF-8 file1 -o file2


### 批量文件编码转换

本操作有风险，请注意操作前备份文件。

范例：将原来所有编码为gb2312的*.java文件转换为编码为utf-8 的*.java.new文件

    for i in `find . -name "*.java"`; do iconv -f gb2312 -t utf-8 $i -o $i.new; done

范例：将*.java.new文件的.new扩展名去除

    find . -name "*.new" | sed 's/\(.*\).new$/mv "&" "\1"/' | sh



### 了解Vim的4个字符编码选项

Vim 有四个跟字符编码方式有关的选项，encoding、fileencoding、fileencodings、termencoding 它们的意义如下: 

**Encoding**

Vim 内部使用的字符编码方式，包括 Vim 的 buffer (缓冲区)、菜单文本、消息文本等。默认是根据你的locale选择。用户手册上建议只在 .vimrc 中改变它的值，事实上似乎也只有在.vimrc 中改变它的值才有意义。

你可以用另外一种编码来编辑和保存文件，如你的vim的encoding为utf-8，所编辑的文件采用cp936编码，vim会自动将读入的文件转成utf-8(vim的能读懂的方式），而当你写入文件时,又会自动转回成cp936（文件的保存编码)。

**Fileencoding**

Vim 中当前编辑的文件的字符编码方式，Vim 保存文件时也会将文件保存为这种字符编码方式 (不管是否新文件都如此)。 

**Fileencodings**

Vim自动探测fileencoding的顺序列表， 启动时会按照它所列出的字符编码方式逐一探测即将打开的文件的字符编码方式，并且将 fileencoding 设置为最终探测到的字符编码方式。因此最好将Unicode 编码方式放到这个列表的最前面，将拉丁语系编码方式 latin1 放到最后面。 

**Termencoding**

Vim 所工作的终端 (或者 Windows 的 Console 窗口) 的字符编码方式。如果vim所在的term与vim编码相同，则无需设置。如其不然，你可以用vim的termencoding选项将自动转换成term的编码。这个选项在 Windows 下对我们常用的 GUI 模式的 gVim 无效，而对 Console 模式的Vim 而言就是 Windows 控制台的代码页，并且通常我们不需要改变它。 

### Vim多字符编码如何工作

解释完了这一堆容易让新手犯糊涂的参数，我们来看看 Vim 的多字符编码方式支持是如何工作的。 

1. Vim 启动，根据 .vimrc 中设置的 encoding 的值来设置 buffer、菜单文本、消息文的字符编码方式。 

2. 读取需要编辑的文件，根据 fileencodings 中列出的字符编码方式逐一探测该文件编码方式。并设置 fileencoding 为探测到的，看起来是正确的 (注1) 字符编码方式。 

3. 对比 fileencoding 和 encoding 的值，若不同则调用 iconv 将文件内容转换为encoding 所描述的字符编码方式，并且把转换后的内容放到为此文件开辟的 buffer 里，此时我们就可以开始编辑这个文件了。

4. 编辑完成后保存文件时，再次对比 fileencoding 和 encoding 的值。若不同，再次调用 iconv 将即将保存的 buffer 中的文本转换为 fileencoding 所描述的字符编码方式，并保存到指定的文件中。
同样，这需要调用 iconv.dll由于 Unicode 能够包含几乎所有的语言的字符，而且 Unicode 的 UTF-8 编码方式又是非常具有性价比的编码方式 (空间消耗比 UCS-2 小)，因此建议 encoding 的值设置为utf-8。
这么做的另一个理由是 encoding 设置为 utf-8 时，Vim 自动探测文件的编码方式会更准确 (或许这个理由才是主要的 ;)。

我们在中文 Windows 里编辑的文件，为了兼顾与其他软件的兼容性，文件编码还是设置为 GB2312/GBK 比较合适，因此 fileencoding 建议设置为 chinese (chinese 是个别名，在 Unix 里表示 gb2312，在 Windows 里表示cp936，也就是 GBK 的代码页)。 


----
@tsingchan