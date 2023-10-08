---
title: Добавление самоподписанных сертификатов в доверенное хранилище
description: Astra Linux (Debian based) + Alt Linux (RHEL based)
date: 2023-05-12T18:20:00+05:00
tags: [linux, astra, alt, tls]
---
## Получение корневого сертификата
```shell
echo quit | openssl s_client -showcerts -servername <websi.te> -connect <websi.te>:443 > <certificate>.pem
```

## Astra Linux

### Перемещение сертификата
```shell
cp <certificate>.pem /usr/local/share/ca-certificates
```

### Обновление состава доверенного хранилища 
```shell
dpkg-reconfigure ca-certificates
```

## Alt Linux

### Перемещение сертификата
```shell
cp <certificate>.pem /etc/pki/ca-trust/source/anchors/
```

### Обновление состава доверенного хранилища 
```shell
update-ca-trust enable
update-ca-trust extract
```
