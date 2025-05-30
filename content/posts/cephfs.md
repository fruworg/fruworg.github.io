---
title: Создание CephFS
description: Конфигурация и автомонтирование
date: 2025-05-30T15:35:00+02:00
tags: [linux, ceph]
---
## Создание FS / Сервер

### Создание пула данных и меты

```bash
ceph osd pool create <fs-name>_data
ceph osd pool create <fs-name>_meta
ceph osd pool set <fs-name>_data bulk true
```

### Создание FS

```bash
ceph fs new <fs-name> <fs-name>_meta <fs-name>_data
```

### Создание пользователя

`r` - чтение\
`w` - запсись\
`s` - снапшоты\
`p` - аттрибуты

```bash
ceph fs authorize <fs-name> client.<user> / rwsp
```

## Подключение FS / Клиент

### Установка необходимых пакетов

```shell
apt install ceph-common attr
```

### Создание директории для монтирования FS

```bash
mkdir /mnt/cephfs-<fs-name>
```

### Конфиг файлы

Файл `/etc/ceph/ceph.conf` необходимо скопировать с сервера на клиент.\
В файл  `/etc/ceph/ceph.client.<user>.keyring` необходимо вставить вывод команды создания клиента.\
В файл `/etc/fstab` необходимо вставить следующее:

```python
<ceph-cluster.doma.in>:6789:/	 /mnt/cephfs-<fs-name>	ceph	name=<user>,fs=<fs-name>,noatime,_netdev
```

### Монтирование

```shell
mount -a
```

### Указание размера директории

```shell
setfattr -n ceph.quota.max_bytes -v <size-in-gb>G /mnt/cephfs-<fs-name>
```
