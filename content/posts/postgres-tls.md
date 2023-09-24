---
title: Соединение по TLS в Postgres Pro
description: С использованием scrum-sha-256
date: 2022-11-28T20:25:00+05:00
tags: [linux, postgres, tls]
---
## Создание сертификата
В этом посте я буду использовать самоподписанный сертификат, но сертификат от Let's Encrypt тоже подойдёт.
Сертификат и ключ желательно держать в той же папке, где лежат конфиги Postgres Pro.
``` shell
openssl req -x509 -newkey rsa:4096 -keyout <key>.pem -out <cert>.pem -sha256 -days 365
```

## Включение TLS
``` shell
ssl = on
ssl_cert_file = '<cert>.pem'
ssl_key_file = '<key>.pem'
listen_addresses = 'localhost, <master-ip>'

# /var/lib/pgpro/std-13/data/postgresql.conf
```

## Разрешение доступа через TLS
```shell
hostssl <user> <database> <client-ip> scram-sha-256

# /var/lib/pgpro/std-13/data/pg_hba.conf
```

## (ре)Генерация пароля
В случае, если до этого хеш-алгоритм пароля был не scram-sha-256, то необходимо пересоздать пароль:
```shell
psql -c \password
```

## Перезапуск Postgres Pro
```shell
systemctl restart postgres*
```

