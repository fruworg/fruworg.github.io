---
title: Соединение по TLS в Postgres Pro
description: С использованием scrum-sha-256
date: 2022-11-28T20:25:00+05:00
tags: [linux, postgres, tls]
---
## Создание сертификата

В этом посте я буду использовать самоподписанный сертификат, но сертификат от Let's Encrypt тоже подойдёт.
Сертификат и ключ желательно держать в той же папке, где лежат конфиги Postgres Pro.
```bash
openssl req -x509 -newkey rsa:4096 -nodes -keyout <key>.key -out <cert>.pem -sha256 -days 365
```

## Включение TLS

В файл `/var/lib/pgpro/std-*/data/postgresql.conf` необходимо добавить следующие строки:
```python
ssl = on
ssl_cert_file = '<cert>.pem'
ssl_key_file = '<key>.pem'
listen_addresses = 'localhost, <master-ip>'
```

## Разрешение доступа через TLS

В файл `/var/lib/pgpro/std-*/data/pg_hba.conf` необходимо добавить следующие строки:
```python
hostssl <user> <database> <client-ip> scram-sha-256
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

