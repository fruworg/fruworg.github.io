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
```shell
auth required pam_google_authenticator.so

# auth required pam_google_authenticator.so
```

## Правка конфига ssh
```sh
ChallengeResponseAuthentication yes

# /etc/ssh/sshd_config
```

## Конфигурация аутентификации
Следующая команда сконфигурирует TOTP.
Запускать команду следует от имени того пользователя, 
к которому будет инициализированно подключение.
```shell
google-authenticator
```

## Управление факторами (необязательно)
Включить запрос ключа при аутентификации:
```sh
AuthenticationMethods publickey,password publickey,keyboard-interactive

# /etc/ssh/sshd_config
```

Отключить запрос пароля при аутентификации:
```sh
#@include common-auth

# /etc/pam.d/sshd
```

## Перезапуск сервиса ssh
```shell
systemctl restart ssh
```
