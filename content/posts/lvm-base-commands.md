---
title: Памятка по LVM
description: Базовые команды
date: 2022-11-25T13:58:10+05:00
tags: [linux, lvm]
---

## Установка пакекта

```shell
apt -y install lvm2
```

## Создание

``` shell
pvcreate /dev/sda
vgcreate vg-name /dev/sda
lvcreate -L 10G -n lv-name vg-name
```

## Изменение

```shell
vgextend vg /dev/sdb
lvresize -rL +1G /dev/vg-name/lv-name
lvresize -rl +100%FREE /dev/vg-name/lv-name
```

## Просмотр

```shell
pvs
vgs
lvs
```
