
<!-- TOC -->

- [升级 pip 版本：](#升级-pip-版本)
- [通过 pip 安装 Scrapy 框架:](#通过-pip-安装-scrapy-框架)
- [编译安装twisted](#编译安装twisted)

<!-- /TOC -->


## 升级 pip 版本：

    pip install --upgrade pip
    
    #如果出现报没有权限的错误，可以使用：
    
    pip install --user --upgrade pip

## 通过 pip 安装 Scrapy 框架:

    pip install Scrapy
    
## 编译安装twisted

下载：https://www.lfd.uci.edu/~gohlke/pythonlibs/#lxml

因为本地python为3.5版本，系统64位，所以选择Twisted‑19.2.0‑cp35‑cp35m‑win_amd64.whl

如果windows环境下没有c的编辑环境，会报一下类似错误：

    building 'twisted.test.raiser' extension
    error: Unable to find vcvarsall.bat

    
----    

**解决方案：**    
    
    PS C:\Users\jm\Desktop> pip install Twisted-19.2.0-cp35-cp35m-win_amd64.whl
    Processing c:\users\jm\desktop\twisted-19.2.0-cp35-cp35m-win_amd64.whl
    Requirement already satisfied: hyperlink>=17.1.1 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (19.0.0)
    Requirement already satisfied: PyHamcrest>=1.9.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (1.9.0)
    Requirement already satisfied: constantly>=15.1 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (15.1.0)
    Requirement already satisfied: attrs>=17.4.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (19.1.0)
    Requirement already satisfied: incremental>=16.10.1 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (17.5.0)
    Requirement already satisfied: zope.interface>=4.4.2 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (4.6.0)
    Requirement already satisfied: Automat>=0.3.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted==19.2.0) (0.7.0)
    Requirement already satisfied: idna>=2.5 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from hyperlink>=17.1.1->Twisted==19.2.0) (2.8)
    Requirement already satisfied: setuptools in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from PyHamcrest>=1.9.0->Twisted==19.2.0) (20.10.1)
    Requirement already satisfied: six in c:\users\jm\appdata\roaming\python\python35\site-packages (from PyHamcrest>=1.9.0->Twisted==19.2.0) (1.11.0)
    Installing collected packages: Twisted
    Successfully installed Twisted-19.2.0
    PS C:\Users\jm\Desktop>    
    
    
**继续安装Scrapy：**
    
    I:\src\hdSpider> pip install Scrapy
    Collecting Scrapy
      Using cached https://files.pythonhosted.org/packages/3e/45/414e87ac8209d537c91575538c5307c20217a6943f555e0ee39f6db4bb0f/Scrapy-1.6.0-py2.py3-none-any.whl
    Requirement already satisfied: six>=1.5.2 in c:\users\jm\appdata\roaming\python\python35\site-packages (from Scrapy) (1.11.0)
    Requirement already satisfied: w3lib>=1.17.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Scrapy) (1.20.0)
    Requirement already satisfied: lxml in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Scrapy) (4.3.3)
    Collecting queuelib (from Scrapy)
      Using cached https://files.pythonhosted.org/packages/4c/85/ae64e9145f39dd6d14f8af3fa809a270ef3729f3b90b3c0cf5aa242ab0d4/queuelib-1.5.0-py2.py3-none-any.whl
    Collecting cssselect>=0.9 (from Scrapy)
      Using cached https://files.pythonhosted.org/packages/7b/44/25b7283e50585f0b4156960691d951b05d061abf4a714078393e51929b30/cssselect-1.0.3-py2.py3-none-any.whl
    Collecting parsel>=1.5 (from Scrapy)
      Using cached https://files.pythonhosted.org/packages/96/69/d1d5dba5e4fecd41ffd71345863ed36a45975812c06ba77798fc15db6a64/parsel-1.5.1-py2.py3-none-any.whl
    Collecting service-identity (from Scrapy)
      Using cached https://files.pythonhosted.org/packages/e9/7c/2195b890023e098f9618d43ebc337d83c8b38d414326685339eb024db2f6/service_identity-18.1.0-py2.py3-none-any.whl
    Collecting PyDispatcher>=2.0.5 (from Scrapy)
      Using cached https://files.pythonhosted.org/packages/cd/37/39aca520918ce1935bea9c356bcbb7ed7e52ad4e31bff9b943dfc8e7115b/PyDispatcher-2.0.5.tar.gz
    Collecting pyOpenSSL (from Scrapy)
      Using cached https://files.pythonhosted.org/packages/01/c8/ceb170d81bd3941cbeb9940fc6cc2ef2ca4288d0ca8929ea4db5905d904d/pyOpenSSL-19.0.0-py2.py3-none-any.whl
    Requirement already satisfied: Twisted>=13.1.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Scrapy) (19.2.0)
    Collecting cryptography (from service-identity->Scrapy)
      Using cached https://files.pythonhosted.org/packages/05/d9/f6043a42e7497dbe292bc6a238ab2f06c463a038fc95d6c74f78a29ec3a9/cryptography-2.6.1-cp35-cp35m-win_amd64.whl
    Requirement already satisfied: attrs>=16.0.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from service-identity->Scrapy) (19.1.0)
    Collecting pyasn1-modules (from service-identity->Scrapy)
      Using cached https://files.pythonhosted.org/packages/da/98/8ddd9fa4d84065926832bcf2255a2b69f1d03330aa4d1c49cc7317ac888e/pyasn1_modules-0.2.4-py2.py3-none-any.whl
    Collecting pyasn1 (from service-identity->Scrapy)
      Using cached https://files.pythonhosted.org/packages/7b/7c/c9386b82a25115cccf1903441bba3cbadcfae7b678a20167347fa8ded34c/pyasn1-0.4.5-py2.py3-none-any.whl
    Requirement already satisfied: hyperlink>=17.1.1 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted>=13.1.0->Scrapy) (19.0.0)
    Requirement already satisfied: PyHamcrest>=1.9.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted>=13.1.0->Scrapy) (1.9.0)
    Requirement already satisfied: constantly>=15.1 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted>=13.1.0->Scrapy) (15.1.0)
    Requirement already satisfied: incremental>=16.10.1 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted>=13.1.0->Scrapy) (17.5.0)
    Requirement already satisfied: zope.interface>=4.4.2 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted>=13.1.0->Scrapy) (4.6.0)
    Requirement already satisfied: Automat>=0.3.0 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from Twisted>=13.1.0->Scrapy) (0.7.0)
    Collecting cffi!=1.11.3,>=1.8 (from cryptography->service-identity->Scrapy)
      Using cached https://files.pythonhosted.org/packages/fd/29/3335b084ed4ea262c6079c0e70e84117a758a0d07d42fe3d1b07a575aaa3/cffi-1.12.3-cp35-cp35m-win_amd64.whl
    Collecting asn1crypto>=0.21.0 (from cryptography->service-identity->Scrapy)
      Using cached https://files.pythonhosted.org/packages/ea/cd/35485615f45f30a510576f1a56d1e0a7ad7bd8ab5ed7cdc600ef7cd06222/asn1crypto-0.24.0-py2.py3-none-any.whl
    Requirement already satisfied: idna>=2.5 in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from hyperlink>=17.1.1->Twisted>=13.1.0->Scrapy) (2.8)
    Requirement already satisfied: setuptools in c:\users\jm\appdata\local\programs\python\python35\lib\site-packages (from PyHamcrest>=1.9.0->Twisted>=13.1.0->Scrapy) (20.10.1)
    Collecting pycparser (from cffi!=1.11.3,>=1.8->cryptography->service-identity->Scrapy)
      Using cached https://files.pythonhosted.org/packages/68/9e/49196946aee219aead1290e00d1e7fdeab8567783e83e1b9ab5585e6206a/pycparser-2.19.tar.gz
    Installing collected packages: queuelib, cssselect, parsel, pycparser, cffi, asn1crypto, cryptography, pyasn1, pyasn1-modules, service-identity, PyDispatcher, pyOpenSSL, Scrapy
      Running setup.py install for pycparser ... done
      Running setup.py install for PyDispatcher ... done
    Successfully installed PyDispatcher-2.0.5 Scrapy-1.6.0 asn1crypto-0.24.0 cffi-1.12.3 cryptography-2.6.1 cssselect-1.0.3 parsel-1.5.1 pyOpenSSL-19.0.0 pyasn1-0.4.5 pyasn1-modules-0.2.4 pycparser-2.19 queuelib-1.5.0 service-identity-18.1.0
    PS I:\src\hdSpider>
    

markdown @tsingchan     