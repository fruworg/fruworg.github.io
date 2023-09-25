---
title: Автомонтирование сетевых дисков на Linux
description: CIFS/SMB
date: 2023-05-12T18:10:00+05:00
tags: [linux, krb5]
---
## Установка пакета
```shell
apt install cifs-utils -y
```

## Создание файла с данными УЗ 
В файл `/root/.smbuser` необходимо добавить данные УЗ для подключения к шаре:

```sh
username=<username>
password=<password>
domain=<domain>
```

## Смена прав на файл с данными УЗ
```shell
sudo chmod 0400 /root/.smbuser
```

## Развёртывание 
В `/etc/fstab` необходимо добавить строку подключения к шаре:
```sh
//<address> /<folder> cifs credentials=/root/.smbuser,uid=<uid>,gid=<gid> 0 0
```

## Монтирование всех директорий
```shell
mount -a
```

## Монтирование ручками (необязательно)
```shell
mount -t cifs //<address> /<folder> -o username=<username>,password=<password>,domain=<domain>
```
