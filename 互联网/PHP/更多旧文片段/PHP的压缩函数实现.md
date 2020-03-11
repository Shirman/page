## PHP的压缩函数实现：gzencode、gzdeflate和gzcompress


- gzencode 默认使用ZLIB_ENCODING_GZIP编码，使用gzip压缩格式，实际上是使用defalte 算法压缩数据，然后加上文件头和adler32校验

- gzdeflate 默认使用ZLIB_ENCODING_RAW编码方式，使用deflate数据压缩算法，实际上是先用 LZ77 压缩，然后用霍夫曼编码压缩

- gzcompress ;默认使用ZLIB_ENCODING_DEFLATE编码，使用zlib压缩格式，实际上是用 deflate 压缩数据，然后加上 zlib 头和 CRC 校验

**这三个函数的比较实质上是三种压缩方法：deflate, zlib, gzip的比较。**

- 从性能的维度看：deflate 好于 gzip 好于 zlib


- 从文本文件默认压缩率压缩后体积的维度看：deflate 好于 zlib 好于 gzip

- 这三种算法中gzip 、zlib的作者都是Jean-Loup Gailly和 Mark Adler。

- 这两种算法以及图形格式png，使用的压缩算法却都是deflate算法。

- deflate算法是同时使用了LZ77算法与哈夫曼编码(Huffman Coding)的一个无损数据压缩算法。


PHP的压缩实现依赖于zlib，zlib是一个提供了 deflate, zlib, gzip 压缩方法的函数库。
我们所使用的上面三个函数，将参数中的encoding转为相同，压缩率设置相同，则其最终调用的是同一个函数，效果和性能一样。

PHP的zlib实现是以扩展的方式存在于ext/zlib目录中。
通过deflateInit2() + deflate() + deflateEnd()三个函数配合完成压缩功能;
通过inflateInit2() + inflate() + inflateEnd()三个函数配合完成解压功能。

压缩最终都是通过php_zlib_encode函数实现调用，除了输入的字符串，压缩率，结果的输出外，不同的入口函数调用参数不同的是其encoding。deflateInit2的第四个参数指定encoding，PHP定义了三个常量：

    \#define PHP_ZLIB_ENCODING_RAW		-0xf	//deflate -15
    \#define PHP_ZLIB_ENCODING_GZIP		0x1f	//gzip 15 + 16
    \#define PHP_ZLIB_ENCODING_DEFLATE	0x0f	//zlib 15


三个函数在调用过程可以直接指定encoding使用其它的算法：
    
	zlib:ZLIB_ENCODING_DEFLATE
    gzip:ZLIB_ENCODING_GZIP
    deflate:ZLIB_ENCODING_RAW

此三个函数是三种算法的简单调用方式，以更好的命名展现。三个函数间可以通过指定相同的encoding达到相同的效果，并且PHP也提供zlib_encode函数作为通用的压缩函数。