---
title: Ресайз диска
description: ext4
date: 2024-12-10T13:57:00+01:00
tags: [linux]
---
## Расширение раздела

<disk> - sda
<partition> - 1

```shell
growpart /dev/<disk> <partition>
```

## Увеличение ФС

<partition> - sda1

```shell
resize2fs /dev/<partition>
```
## Очистка логов

Если совсем нет места для выполнения команд

```shell
journalctl --vacuum-time=1d
```
