---
title: Конфигурация аутентификации по отпечатку пальца
description: Для входа в систему и использования sudo
date: 2023-10-13T02:25:00+06:00
tags: [linux, security]
---

## Введение
Эта статья является переводом [странички из вики Debian.](https://wiki.debian.org/SecurityManagement/fingerprint%20authentication)

## Установка пакетов для функционирования сканера
[Список поддерживаемых устройств](https://fprint.freedesktop.org/supported-devices.html).
```shell
apt install fprintd libpam-fprintd
```

## Сканирование отпечатка
После запуска команды надо будет несколько раз прижимать палец к сканеру.
```bash
fprintd-enroll
```

## Проверка отпечатка
```bash
fprintd-verify
```

## Использование sudo с отпечатком пальца
После запуска команды необходимо отметить `Fingerprint Authentication` и нажать `Ok`. 
```shell
pam-auth-update
```
