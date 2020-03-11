

### 进入powershell

不同的win10系统，家庭版和专业版powershell进入方式不一样。

- 通过cmd命令行 

```
start powershell
```

- 按住shift+邮件，选择powershell

### 复制粘贴执行以下命令：

```
Get-AppXPackage -Name Microsoft.Windows.Cortana | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}

```
