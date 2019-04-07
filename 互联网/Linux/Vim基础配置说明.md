
##Vim基础配置说明

>可先备份.vimrc文件，后将以下内容粘贴到新的.vimrc文件中。


    "显示命令
    set showcmd
    "设置自动缩进 4 个空格
    set shiftwidth=4
    "实际的 tab 即为 4 个空格, 而不是缺省的 8 个
    set tabstop=4

    "在输入 tab 后, vim 用恰当的空格来填充这个 tab
    "set expandtab
    "显示行号
    "set nu
    "开启自动缩进
    set autoindent
    "开启语法缩进，比如if(...)[Enter]会缩进一个tab
    set smartindent

    "用于tag标签
    set tags=/var/www/html/tags

    "用于打开不同的编码的文件 
    let &termencoding=&encoding
    set fileencodings=utf-8,gbk,cp936

    "以下是括号和引号的自动补全
    ""inoremap ( ()<Esc>i
    ""inoremap [ []<Esc>i
    ""inoremap { {<CR>}<Esc>O
    ""autocmd Syntax html,vim inoremap < <lt>><Esc>i| inoremap > <c-r>=ClosePair('>')<CR>
    ""inoremap ) <c-r>=ClosePair(')')<CR>
    ""inoremap ] <c-r>=ClosePair(']')<CR>
    ""inoremap } <c-r>=CloseBracket()<CR>
    ""inoremap " <c-r>=QuoteDelim('"')<CR>
    ""inoremap ' <c-r>=QuoteDelim("'")<CR>


    function ClosePair(char)
    if getline('.')[col('.') - 1] == a:char
    return "\<Right>"
    else
    return a:char
    endif
    endf

    function CloseBracket()
    if match(getline(line('.') + 1), '\s*}') < 0
    return "\<CR>}"
    else
    return "\<Esc>j0f}a"
    endif
    endf

    function QuoteDelim(char)
    let line = getline('.')
    let col = col('.')
    if line[col - 2] == "\\"
    "Inserting a quoted quotation mark into the string
    return a:char
    elseif line[col - 1] == a:char
    "Escaping out of the string
    return "\<Right>"
    else
    "Starting a string
    return a:char.a:char."\<Esc>i"
    endif
    endf

    map <F5> :%!perltidy
