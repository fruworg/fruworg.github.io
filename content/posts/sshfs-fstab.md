---
title: Автомонтирование SSHFS
description: SSHFS + fstab
date: 2024-09-19T13:28:00+02:00
tags: [linux, ssh]
---

## Установка пакета на клиенте

```shell
apt -y install sshfs
```

## Добавление строки в /etc/fstab

```python
<user>@<server-fqdn>:<remote-dir> <local-dir> sshfs allow_other,reconnect 0 
```

## Проверка монтирования

```shell
mount -a
```
