---
title: Двухфакторная аутентификация для SSH
description: 2fa, totp, google-authenticator
date: 2022-11-29T13:35:00+05:00
tags: [linux, ssh]
---
## Установка пакета

```shell
apt install -y openssh-server libpam-google-authenticator
```

## Правка конфига PAM

В файл `/etc/pam.d/common-auth` необходимо добавить следующее:
```config
auth required pam_google_authenticator.so
```

## Правка конфига ssh

В файл `/etc/ssh/sshd_config` необходимо добавить следующее:
```config
ChallengeResponseAuthentication yes
```

## Конфигурация аутентификации
Следующая команда сконфигурирует TOTP.
Запускать команду следует от имени того пользователя, 
к которому будет инициализированно подключение.
```shell
google-authenticator
```

## Управление факторами (необязательно)
Для запроса ключа при аутентификации необходимо в файл `/etc/ssh/sshd_config` добавить следующее:
```config
AuthenticationMethods publickey,password publickey,keyboard-interactive
```

Для отключения запроса пароля при аутентификации необходимо в файле `/etc/pam.d/sshd` закомментировать следующюю строку:
```config
# @include common-auth
```

## Перезапуск сервиса ssh
```shell
systemctl restart ssh
```
