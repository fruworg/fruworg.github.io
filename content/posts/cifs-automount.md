---
title: Автомонтирование сетевых дисков на Linux
description: CIFS/SMB
date: 2023-05-12T18:10:00+05:00
tags: [linux, krb5]
---
## Установка пакета
```ell
apt install cifs-utils -y
```

## Создание файла с данными УЗ 
В файл `/root/.smbuser` необходимо добавить данные УЗ для подключения к шаре:

```
username=<username>
password=<password>
domain=<domain>
```

## Смена прав на файл с данными УЗ
```ell
sudo chmod 0400 /root/.smbuser
```

## Развёртывание 
В `/etc/fstab` необходимо добавить строку подключения к шаре:
```
//<address> /<folder> cifs credentials=/root/.smbuser,uid=<uid>,gid=<gid> 0 0
```

## Монтирование всех директорий
```ell
mount -a
```

## Монтирование ручками (необязательно)
```ell
mount -t cifs //<address> /<folder> -o username=<username>,password=<password>,domain=<domain>
```
