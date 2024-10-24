---
title: Отключение AppArmor в Ubuntu 24.04
description: purge apparmor
date: 2024-10-09T10:51:00+02:00
tags: [linux, security]
---
## Выключение сервиса

```shell
systemctl disable --now apparmor
```

## Удаление AppArmor

```shell
apt remove --assume-yes --purge apparmor
```

## Перезагрузка

```shell
init 6
```

## Одной командой

```shell
systemctl disable --now apparmor && apt remove --assume-yes --purge apparmor && init 6
```
