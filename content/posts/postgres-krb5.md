---
title: Аутентификация в Postgres Pro с помощью Kerberos
description: Используя протокол GSSAPI
date: 2022-11-29T16:21:00+05:00
tags: [linux, postgres, krb5]
---

## Установка Kerberos и Postgres Pro
Для начала, необходимо установить [Postgres Pro](/posts/postgres-pro-astra-se) и [Kerberos](/posts/linux-krb5).
На машину с Postgres Pro Kerberos устанавливается также, как и на клиента.

## Конфигурация сервера Kerberos

### Добавление принципиала Postgres Pro
```shell
kadmin.local
addprinc <username>
addprinc postgres
addprinc postgres/<pg-hostname>
q
```

### Экспорт субъекта-службы
```shell
ktutil
add_entry -password -p postgres/<pg-hostname>@<DOMAIN.NAME> -k 1 -e aes256-cts-hmac-sha1-96
wkt postgres.keytab
q
```

### Перенос субъекта-службы на сервер Postgres Pro
Перенести keytab можно как угодно, главное, чтобы он находился в папке с конфигурационными файлами Postgres Pro.
Я перенесу с помощью команды scp:
```shell
scp postgres.keytab postgres@<pg-hostname>:/var/lib/pgpro/std-13/data/
```

## Конфигурация сервера Postgres Pro

### Включение ранее перенесённого keytab
```shell
ktutil
read_kt postgres.keytab
q
```

### Изменение конфигруационного файла Postgres Pro
В файл `/var/lib/pgpro/std-*/data/postgresql.conf` необходимо добавить следующие строки:

```config
krb_server_keyfile = 'postgres.keytab'
listen_addresses = 'localhost, <pg-ip>'
```

### Разрешение подключения 
В файл `/var/lib/pgpro/std-*/data/pg_hba.conf` необходимо добавить следующие строки:

```config
hostgssenc all        postgres	 localhost/32   gss include_realm=0
hostgssenc <database> <username> <client-ip>/32 gss include_realm=0
```

### Получение тикета от Kerberos
```shell
kinit postgres
```

## Конфигурация клиента

### Получение тикета от Kerberos
```shell
kinit <username>
```

### Подключение к Postgres Pro
```shell
psql -d <database> -h <pg-hostname> -U <username>
```
