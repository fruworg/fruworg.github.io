---
title: Автомонтирование сетевых дисков на Linux
description: CIFS/SMB
date: 2023-05-12T18:10:00+05:00
tags: [linux, krb5]
---
## Установка пакета
```
apt install cifs-utils -y
```

## Создание файла с данными УЗ 
```
username=<username>
password=<password>
domain=<domain>

# /root/.smbuser
```

## Смена прав на файл с данными УЗ
```
sudo chmod 0400 /root/.smbuser
```

## Развёртывание 
```
//<address> /<folder> cifs credentials=/root/.smbuser,uid=<uid>,gid=<gid> 0 0

# /etc/fstab
```

## Монтирование всех директорий
```
mount -a
```

## Монтирование ручками (необязательно)
```
mount -t cifs //<address> /<folder> -o \
	username=<username>,password=<password>,domain=<domain>
```
