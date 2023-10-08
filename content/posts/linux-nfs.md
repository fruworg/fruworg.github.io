---
title: Установка и конфигурация NFS-сервера на Linux
description: И его монтирование на клиентах
date: 2022-11-25T17:57:00+05:00
tags: [linux, nfs]
---
## Настройка NFS-сервера

### Установка пакета
```shell
apt -y install nfs-kernel-server
```

### Создание каталога, который будет расшарен
```shell
mkdir /nfs
chmod 777 /nfs
```

### Разрешение сетевого доступа
В файл `/etc/exports` необходимо добавить следующую строку:

```
/nfs 	<client-ip>(rw,sync,no_root_squash,no_subtree_check)
```

## Настройка NFS-клиента

### Установка пакета
```shell
apt -y install nfs-common
```

### Запуск службы
``` shell
systemctl enable --now rpcbind
```

### Автомонитрование
В файл `/etc/fstab` необходимо добавить следующую строку:

```shell
<server-ip>:/nfs    /nfs    nfs    defaults    0 0
```
