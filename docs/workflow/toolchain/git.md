# Git

## 命令

## 配置

```

# 大小写敏感
git config --global core.ignorecase false


```

## 技巧

### Git 强制代理

> /.ssh/config

```
# github
Host github.com
    HostName ssh.github.com
	User git
	Port 443
    IdentityFile ~/.ssh/github
    # 增加以下代理命令
	ProxyCommand "D:\xxxx\Git\mingw64\bin\connect.exe" -H 127.0.0.1:1080 -a none %h %p
```
