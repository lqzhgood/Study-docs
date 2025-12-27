# DMIT Vps 初始化

之前主力 Vps 线路是 Hk-CN2， 感觉今年开始缩水了，晚上卡到爆, AI 时代 Hk 线路线路也不再吃香。

现在太忙了也没时间打理，想把之前的几台 vps 都停了，把服务逐步迁移到 Nas + Zerotier，重新采购一台美西的做对外出口，省心省钱~

中午还没睡就刷到圣诞 DMIT 竟然放货，果断下单~ 记录一下过程~

## Debian

之前用的系统都是 `Centos`，现在停止支持了。内核和依赖都太老`node 18`都装不上， 这次一步到位直接换系统吧~

### 基础软件

> Debian 也是太 “干净” 了， 啥也没有....

```shell
apt update
apt install sudo

```

#### ssh

::: code-group

```conf [/etc/ssh/sshd_config.d/50-cloud-init.conf]
PasswordAuthentication yes

```

```conf [/etc/ssh/sshd_config]
PermitRootLogin yes
PasswordAuthentication yes

```

:::

#### ufw 防火墙

::: code-group

```shell [安装]
apt install ufw

ufw allow ssh
ufw allow 80/tcp comment 'Allow HTTP'
ufw allow 443/tcp comment 'Allow HTTPS'

ufw enable

```

```shell [命令]

# 查询开饭端口
ufw status numbered

```

:::

#### fail2ban

> 记得安装 rsyslog ，不然没有日志输出监控

::: code-group

```shell [安装 rsyslog]

apt install rsyslog -y
systemctl enable rsyslog
systemctl restart rsyslog

```

```shell [安装 fail2ban]
apt install fail2ban -y

> /etc/fail2ban/jail.local

[DEFAULT]
# 禁止时间（秒）
bantime = 3600
# 查找时间窗口（秒）
findtime = 600
# 最大失败次数
maxretry = 5

# 禁止动作（推荐）
action = %(action_)s

# 发送邮件通知（需要配置邮件服务器）
# destemail = admin@yourdomain.com
# sender = fail2ban@yourdomain.com
# mta = sendmail
# action = %(action_mwl)s

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400  # 24小时

systemctl start fail2ban
systemctl enable fail2ban


```

```shell [命令]

# 查看所有监狱状态
fail2ban-client status

# 查看特定监狱状态（如 sshd）
fail2ban-client status sshd

# 手动禁止 IP
fail2ban-client set sshd banip 192.168.1.100

# 手动解禁 IP
fail2ban-client set sshd unbanip 192.168.1.100

# 查看日志
tail -f /var/log/fail2ban.log

```

:::
