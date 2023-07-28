---
title: Добавление самоподписанных сертификатов в доверенное хранилище
description: Astra Linux (Debian based)
date: 2023-05-12T18:20:00+05:00
tags: [linux, astra, tls]
---
## Получение корневого сертификата
```shell
echo quit | openssl s_client -showcerts \
	-servername <websi.te> -connect <websi.te>:443 > <certificate>.crt
```

## Перемещение сертификата
```shell
cp <certificate>.crt /usr/local/share/ca-certificates
```

## Обновление состава доверенного хранилища 
```shell
dpkg-reconfigure ca-certificates
```
