---
title: Конвертация .pfx в .pem
description: Используя OpenSSL
date: 2023-04-12T11:45:00+05:00
tags: [linux, tls]
---
## Извлечение сертификата и ключа

```bash
openssl pkcs12 -in <tls>.pfx -out <tls>.pem -nodes
```

## Извлечение сертификата

```bash
openssl pkcs12 -in <tls>.pfx -clcerts -nokeys -out <cert>.pem
```

## Извлечение ключа

```bash
openssl pkcs12 -in <tls>.pfx -nocerts -out <key>.tmp.key
```

## Обеспароливание ключа

```bash
openssl rsa -in <key>.tmp.key -out <key>.key
```
