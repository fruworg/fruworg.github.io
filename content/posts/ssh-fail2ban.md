---
title: fail2ban для SSH
description: Защита от брута пароля к SSH
date: 2022-11-29T13:41:00+05:00
tags: [linux, ssh]
---
## Установка пакета fail2ban
```shell
apt -y install fail2ban
```

## Правило для ssh
```config
[sshd]
enabled  = true
port     = <ssh-port>
filter   = sshd
logpath  = /var/log/auth.log
maxretry = 3
findtime = 300
bantime  = 3600

# /etc/fail2ban/jail.d/sshd.conf
```

## Перезапуск сервиса fail2ban
```shell
systemctl restart fail2ban
```
