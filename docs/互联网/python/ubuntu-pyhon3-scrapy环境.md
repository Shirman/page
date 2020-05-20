

<!-- TOC -->

- [python3](#python3)
    - [查看系统已有python版本](#查看系统已有python版本)
    - [默认使用3.5版本](#默认使用35版本)
- [安装/更新pip3](#安装更新pip3)
    - [安装](#安装)
    - [更新](#更新)
- [安装scrapy](#安装scrapy)

<!-- /TOC -->





## python3

一般unix系统都有自带python2.7甚至python3.5

### 查看系统已有python版本

    tsing@ubuntu:/var/www/html$ whereis python
    python: /usr/bin/python3.5 /usr/bin/python3.5m /usr/bin/python /usr/bin/python2.7 /usr/lib/python3.5 /usr/lib/python2.7 /etc/python3.5 /etc/python /etc/python2.7 /usr/local/lib/python3.5 /usr/local/lib/python2.7 /usr/share/python /usr/share/man/man1/python.1.gz

### 默认使用3.5版本
    tsing@ubuntu:/var/www/html$ ll /usr/bin/python
    lrwxrwxrwx 1 root root 9 Nov 23  2017 /usr/bin/python -> python2.7*
    tsing@ubuntu:/var/www/html$ sudo rm /usr/bin/python
    [sudo] password for tsing:     
    tsing@ubuntu:/var/www/html$ sudo ln -s /usr/bin/python3.5 /usr/bin/python


## 安装/更新pip3

### 安装

    tsing@ubuntu:/var/www/html$ sudo apt-get install python3-pip
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    The following additional packages will be installed:
    libexpat1-dev libpython3-dev libpython3.5-dev python-pip-whl python3-dev python3-setuptools python3-wheel python3.5-dev
    Suggested packages:
    python-setuptools-doc
    The following NEW packages will be installed:
    libexpat1-dev libpython3-dev libpython3.5-dev python-pip-whl python3-dev python3-pip python3-setuptools python3-wheel python3.5-dev
    0 upgraded, 9 newly installed, 0 to remove and 4 not upgraded.
    Need to get 39.2 MB of archives.
    After this operation, 57.3 MB of additional disk space will be used.
    Do you want to continue? [Y/n] y
    Get:1 http://mirrors.aliyun.com/ubuntu xenial-updates/main amd64 libexpat1-dev amd64 2.1.0-7ubuntu0.16.04.3 [115 kB]
    Get:2 http://mirrors.aliyun.com/ubuntu xenial-updates/main amd64 libpython3.5-dev amd64 3.5.2-2ubuntu0~16.04.5 [37.3 MB]
    Get:3 http://mirrors.aliyun.com/ubuntu xenial/main amd64 libpython3-dev amd64 3.5.1-3 [6,926 B]
    Get:4 http://mirrors.aliyun.com/ubuntu xenial-updates/universe amd64 python-pip-whl all 8.1.1-2ubuntu0.4 [1,110 kB]
    Get:5 http://mirrors.aliyun.com/ubuntu xenial-updates/main amd64 python3.5-dev amd64 3.5.2-2ubuntu0~16.04.5 [413 kB]                                                                          
    Get:6 http://mirrors.aliyun.com/ubuntu xenial/main amd64 python3-dev amd64 3.5.1-3 [1,186 B]                                                                                                  
    Get:7 http://mirrors.aliyun.com/ubuntu xenial-updates/universe amd64 python3-pip all 8.1.1-2ubuntu0.4 [109 kB]                                                                                
    Get:8 http://mirrors.aliyun.com/ubuntu xenial/main amd64 python3-setuptools all 20.7.0-1 [88.0 kB]                                                                                            
    Get:9 http://mirrors.aliyun.com/ubuntu xenial/universe amd64 python3-wheel all 0.29.0-1 [48.1 kB]                                                                                             
    Fetched 39.2 MB in 6s (6,361 kB/s)                                                                                                                                                            
    Selecting previously unselected package libexpat1-dev:amd64.
    (Reading database ... 78296 files and directories currently installed.)
    Preparing to unpack .../libexpat1-dev_2.1.0-7ubuntu0.16.04.3_amd64.deb ...
    Unpacking libexpat1-dev:amd64 (2.1.0-7ubuntu0.16.04.3) ...
    Selecting previously unselected package libpython3.5-dev:amd64.
    Preparing to unpack .../libpython3.5-dev_3.5.2-2ubuntu0~16.04.5_amd64.deb ...
    Unpacking libpython3.5-dev:amd64 (3.5.2-2ubuntu0~16.04.5) ...
    Selecting previously unselected package libpython3-dev:amd64.
    Preparing to unpack .../libpython3-dev_3.5.1-3_amd64.deb ...
    Unpacking libpython3-dev:amd64 (3.5.1-3) ...
    Selecting previously unselected package python-pip-whl.
    Preparing to unpack .../python-pip-whl_8.1.1-2ubuntu0.4_all.deb ...
    Unpacking python-pip-whl (8.1.1-2ubuntu0.4) ...
    Selecting previously unselected package python3.5-dev.
    Preparing to unpack .../python3.5-dev_3.5.2-2ubuntu0~16.04.5_amd64.deb ...
    Unpacking python3.5-dev (3.5.2-2ubuntu0~16.04.5) ...
    Selecting previously unselected package python3-dev.
    Preparing to unpack .../python3-dev_3.5.1-3_amd64.deb ...
    Unpacking python3-dev (3.5.1-3) ...
    Selecting previously unselected package python3-pip.
    Preparing to unpack .../python3-pip_8.1.1-2ubuntu0.4_all.deb ...
    Unpacking python3-pip (8.1.1-2ubuntu0.4) ...
    Selecting previously unselected package python3-setuptools.
    Preparing to unpack .../python3-setuptools_20.7.0-1_all.deb ...
    Unpacking python3-setuptools (20.7.0-1) ...
    Selecting previously unselected package python3-wheel.
    Preparing to unpack .../python3-wheel_0.29.0-1_all.deb ...
    Unpacking python3-wheel (0.29.0-1) ...
    Processing triggers for man-db (2.7.5-1) ...
    Setting up libexpat1-dev:amd64 (2.1.0-7ubuntu0.16.04.3) ...
    Setting up libpython3.5-dev:amd64 (3.5.2-2ubuntu0~16.04.5) ...
    Setting up libpython3-dev:amd64 (3.5.1-3) ...
    Setting up python-pip-whl (8.1.1-2ubuntu0.4) ...
    Setting up python3.5-dev (3.5.2-2ubuntu0~16.04.5) ...
    Setting up python3-dev (3.5.1-3) ...
    Setting up python3-pip (8.1.1-2ubuntu0.4) ...
    Setting up python3-setuptools (20.7.0-1) ...
    Setting up python3-wheel (0.29.0-1) ...
    tsing@ubuntu:/var/www/html$ pip3 -v

    Usage:   
    pip <command> [options]

    Commands:
    install                     Install packages.
    download                    Download packages.
    uninstall                   Uninstall packages.
    freeze                      Output installed packages in requirements format.
    list                        List installed packages.
    show                        Show information about installed packages.
    search                      Search PyPI for packages.
    wheel                       Build wheels from your requirements.
    hash                        Compute hashes of package archives.
    completion                  A helper command used for command completion
    help                        Show help for commands.

    General Options:
    -h, --help                  Show help.
    --isolated                  Run pip in an isolated mode, ignoring environment variables and user configuration.
    -v, --verbose               Give more output. Option is additive, and can be used up to 3 times.
    -V, --version               Show version and exit.
    -q, --quiet                 Give less output.
    --log <path>                Path to a verbose appending log.
    --proxy <proxy>             Specify a proxy in the form [user:passwd@]proxy.server:port.
    --retries <retries>         Maximum number of retries each connection should attempt (default 5 times).
    --timeout <sec>             Set the socket timeout (default 15 seconds).
    --exists-action <action>    Default action when a path already exists: (s)witch, (i)gnore, (w)ipe, (b)ackup.
    --trusted-host <hostname>   Mark this host as trusted, even though it does not have valid or any HTTPS.
    --cert <path>               Path to alternate CA bundle.
    --client-cert <path>        Path to SSL client certificate, a single file containing the private key and the certificate in PEM format.
    --cache-dir <dir>           Store the cache data in <dir>.
    --no-cache-dir              Disable the cache.
    --disable-pip-version-check
                                Don't periodically check PyPI to determine whether a new version of pip is available for download. Implied with --no-index.


### 更新

    tsing@ubuntu:/var/www/html$ sudo pip3 install --upgrade pip
    The directory '/home/tsing/.cache/pip/http' or its parent directory is not owned by the current user and the cache has been disabled. Please check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
    The directory '/home/tsing/.cache/pip' or its parent directory is not owned by the current user and caching wheels has been disabled. check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
    Collecting pip
    Downloading https://files.pythonhosted.org/packages/d8/f3/413bab4ff08e1fc4828dfc59996d721917df8e8583ea85385d51125dceff/pip-19.0.3-py2.py3-none-any.whl (1.4MB)
        100% |████████████████████████████████| 1.4MB 22kB/s 
    Installing collected packages: pip
    Found existing installation: pip 8.1.1
        Not uninstalling pip at /usr/lib/python3/dist-packages, outside environment /usr
    Successfully installed pip-19.0.3


## 安装scrapy

    tsing@ubuntu:~$ sudo pip3 install scrapy
    The directory '/home/tsing/.cache/pip/http' or its parent directory is not owned by the current user and the cache has been disabled. Please check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
    The directory '/home/tsing/.cache/pip' or its parent directory is not owned by the current user and caching wheels has been disabled. check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
    Collecting scrapy
    Downloading https://files.pythonhosted.org/packages/3e/45/414e87ac8209d537c91575538c5307c20217a6943f555e0ee39f6db4bb0f/Scrapy-1.6.0-py2.py3-none-any.whl (231kB)
        100% |████████████████████████████████| 235kB 46kB/s 
    Collecting pyOpenSSL (from scrapy)
    Downloading https://files.pythonhosted.org/packages/01/c8/ceb170d81bd3941cbeb9940fc6cc2ef2ca4288d0ca8929ea4db5905d904d/pyOpenSSL-19.0.0-py2.py3-none-any.whl (53kB)
        100% |████████████████████████████████| 61kB 49kB/s 
    Collecting lxml (from scrapy)
    Downloading https://files.pythonhosted.org/packages/5d/c9/39689d56ccb58e8212ca3c9ef68246bb481040cbd4d602295488ed13019b/lxml-4.3.3-cp35-cp35m-manylinux1_x86_64.whl (5.6MB)
        100% |████████████████████████████████| 5.6MB 13kB/s 
    Collecting Twisted>=13.1.0 (from scrapy)
    Downloading https://files.pythonhosted.org/packages/f8/2b/a80a70f71eb2b86992ffa5aaae41457791ae67faa70927fd16b76127c2b7/Twisted-19.2.0.tar.bz2 (3.1MB)
        100% |████████████████████████████████| 3.1MB 285kB/s 
    Collecting queuelib (from scrapy)
    Downloading https://files.pythonhosted.org/packages/4c/85/ae64e9145f39dd6d14f8af3fa809a270ef3729f3b90b3c0cf5aa242ab0d4/queuelib-1.5.0-py2.py3-none-any.whl
    Requirement already satisfied: six>=1.5.2 in /usr/lib/python3/dist-packages (from scrapy) (1.10.0)
    Collecting cssselect>=0.9 (from scrapy)
    Downloading https://files.pythonhosted.org/packages/7b/44/25b7283e50585f0b4156960691d951b05d061abf4a714078393e51929b30/cssselect-1.0.3-py2.py3-none-any.whl
    Collecting service-identity (from scrapy)
    Downloading https://files.pythonhosted.org/packages/e9/7c/2195b890023e098f9618d43ebc337d83c8b38d414326685339eb024db2f6/service_identity-18.1.0-py2.py3-none-any.whl
    Collecting PyDispatcher>=2.0.5 (from scrapy)
    Downloading https://files.pythonhosted.org/packages/cd/37/39aca520918ce1935bea9c356bcbb7ed7e52ad4e31bff9b943dfc8e7115b/PyDispatcher-2.0.5.tar.gz
    Collecting parsel>=1.5 (from scrapy)
    Downloading https://files.pythonhosted.org/packages/96/69/d1d5dba5e4fecd41ffd71345863ed36a45975812c06ba77798fc15db6a64/parsel-1.5.1-py2.py3-none-any.whl
    Collecting w3lib>=1.17.0 (from scrapy)
    Downloading https://files.pythonhosted.org/packages/81/43/9dcf92a77f5f0afe4f4df2407d7289eea01368a08b64bda00dd318ca62a6/w3lib-1.20.0-py2.py3-none-any.whl
    Collecting cryptography>=2.3 (from pyOpenSSL->scrapy)
    Downloading https://files.pythonhosted.org/packages/5b/12/b0409a94dad366d98a8eee2a77678c7a73aafd8c0e4b835abea634ea3896/cryptography-2.6.1-cp34-abi3-manylinux1_x86_64.whl (2.3MB)
        100% |████████████████████████████████| 2.3MB 263kB/s 
    Collecting zope.interface>=4.4.2 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/0c/dc/d715a3f2f9df4e0440e67b1dc654bcfb6dc11aac8296353eaf56164b8f01/zope.interface-4.6.0-cp35-cp35m-manylinux1_x86_64.whl (167kB)
        100% |████████████████████████████████| 174kB 214kB/s 
    Collecting constantly>=15.1 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/b9/65/48c1909d0c0aeae6c10213340ce682db01b48ea900a7d9fce7a7910ff318/constantly-15.1.0-py2.py3-none-any.whl
    Collecting incremental>=16.10.1 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/f5/1d/c98a587dc06e107115cf4a58b49de20b19222c83d75335a192052af4c4b7/incremental-17.5.0-py2.py3-none-any.whl
    Collecting Automat>=0.3.0 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/a3/86/14c16bb98a5a3542ed8fed5d74fb064a902de3bdd98d6584b34553353c45/Automat-0.7.0-py2.py3-none-any.whl
    Collecting hyperlink>=17.1.1 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/7f/91/e916ca10a2de1cb7101a9b24da546fb90ee14629e23160086cf3361c4fb8/hyperlink-19.0.0-py2.py3-none-any.whl
    Collecting PyHamcrest>=1.9.0 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/9a/d5/d37fd731b7d0e91afcc84577edeccf4638b4f9b82f5ffe2f8b62e2ddc609/PyHamcrest-1.9.0-py2.py3-none-any.whl (52kB)
        100% |████████████████████████████████| 61kB 309kB/s 
    Collecting attrs>=17.4.0 (from Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/23/96/d828354fa2dbdf216eaa7b7de0db692f12c234f7ef888cc14980ef40d1d2/attrs-19.1.0-py2.py3-none-any.whl
    Collecting pyasn1-modules (from service-identity->scrapy)
    Downloading https://files.pythonhosted.org/packages/da/98/8ddd9fa4d84065926832bcf2255a2b69f1d03330aa4d1c49cc7317ac888e/pyasn1_modules-0.2.4-py2.py3-none-any.whl (66kB)
        100% |████████████████████████████████| 71kB 355kB/s 
    Collecting pyasn1 (from service-identity->scrapy)
    Downloading https://files.pythonhosted.org/packages/7b/7c/c9386b82a25115cccf1903441bba3cbadcfae7b678a20167347fa8ded34c/pyasn1-0.4.5-py2.py3-none-any.whl (73kB)
        100% |████████████████████████████████| 81kB 213kB/s 
    Collecting cffi!=1.11.3,>=1.8 (from cryptography>=2.3->pyOpenSSL->scrapy)
    Downloading https://files.pythonhosted.org/packages/62/76/135eeffe0089e6724bdd65c1bf9f1654db9b47783e65b8d9f1454c540d8b/cffi-1.12.3-cp35-cp35m-manylinux1_x86_64.whl (429kB)
        100% |████████████████████████████████| 430kB 172kB/s 
    Collecting asn1crypto>=0.21.0 (from cryptography>=2.3->pyOpenSSL->scrapy)
    Downloading https://files.pythonhosted.org/packages/ea/cd/35485615f45f30a510576f1a56d1e0a7ad7bd8ab5ed7cdc600ef7cd06222/asn1crypto-0.24.0-py2.py3-none-any.whl (101kB)
        100% |████████████████████████████████| 102kB 169kB/s 
    Requirement already satisfied: setuptools in /usr/lib/python3/dist-packages (from zope.interface>=4.4.2->Twisted>=13.1.0->scrapy) (20.7.0)
    Collecting idna>=2.5 (from hyperlink>=17.1.1->Twisted>=13.1.0->scrapy)
    Downloading https://files.pythonhosted.org/packages/14/2c/cd551d81dbe15200be1cf41cd03869a46fe7226e7450af7a6545bfc474c9/idna-2.8-py2.py3-none-any.whl (58kB)
        100% |████████████████████████████████| 61kB 116kB/s 
    Collecting pycparser (from cffi!=1.11.3,>=1.8->cryptography>=2.3->pyOpenSSL->scrapy)
    Downloading https://files.pythonhosted.org/packages/68/9e/49196946aee219aead1290e00d1e7fdeab8567783e83e1b9ab5585e6206a/pycparser-2.19.tar.gz (158kB)
        100% |████████████████████████████████| 163kB 183kB/s 
    Installing collected packages: pycparser, cffi, asn1crypto, cryptography, pyOpenSSL, lxml, zope.interface, constantly, incremental, attrs, Automat, idna, hyperlink, PyHamcrest, Twisted, queuelib, cssselect, pyasn1, pyasn1-modules, service-identity, PyDispatcher, w3lib, parsel, scrapy
    Running setup.py install for pycparser ... done
    Running setup.py install for Twisted ... done
    Running setup.py install for PyDispatcher ... done
    Successfully installed Automat-0.7.0 PyDispatcher-2.0.5 PyHamcrest-1.9.0 Twisted-19.2.0 asn1crypto-0.24.0 attrs-19.1.0 cffi-1.12.3 constantly-15.1.0 cryptography-2.6.1 cssselect-1.0.3 hyperlink-19.0.0 idna-2.8 incremental-17.5.0 lxml-4.3.3 parsel-1.5.1 pyOpenSSL-19.0.0 pyasn1-0.4.5 pyasn1-modules-0.2.4 pycparser-2.19 queuelib-1.5.0 scrapy-1.6.0 service-identity-18.1.0 w3lib-1.20.0 zope.interface-4.6.0

