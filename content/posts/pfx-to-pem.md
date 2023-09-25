---
title: Конвертация .pfx в .pem
description: Используя OpenSSL
date: 2023-04-12T11:45:00+05:00
tags: [linux, tls]
---
## Извлечение сертификата и ключа

```shell
openssl pkcs12 -in <tls>.pfx -out <tls>.pem -nodes
```

## Извлечение сертификата

```shell
openssl pkcs12 -in <tls>.pfx -clcerts -nokeys -out <cert>.pem
```

## Извлечение ключа

```shell
openssl pkcs12 -in <tls>.pfx -nocerts -out <key>.tmp.pem
```

## Обеспароливание ключа

```shell
openssl rsa -in <key>.tmp.pem -out <key>.pem
```
