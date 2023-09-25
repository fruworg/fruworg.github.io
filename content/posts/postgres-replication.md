---
title: Настройка физической репликации Postgres Pro
description: Потоковая репликация и репликация с архивом
date: 2022-11-25T16:51:00+05:00
tags: [linux, postgres, nfs]
---
## Установка Postgres Pro
Процесс установки описан в [этом посте](//fruw.org/posts/postgres-pro-astra-se).

## Потоковая репликация
Про различия в реализациях репликаций можно почитать вот [здесь](//edu.postgrespro.ru/dba3/dba3_04_replica_physical.pdf).

### Конфигурация master
Действия с Postgres Pro следует выполнять от имени пользователя postgres.
```shell
su - postgres
```

#### Создание пользователя для репликации
```shell
psql -c "CREATE ROLE repuser WITH REPLICATION LOGIN ENCRYPTED PASSWORD '<password>';"
```

#### Разрешение подключения для slave
Дописываем в конец файла:
```shell
host    replication    repuser    <slave-ip>/32    md5

# /var/lib/pgpro/std-13/data/pg_hba.conf
```

#### Реконфигурация 
```shell
listen_addresses = 'localhost, <master-ip>'
wal_level = hot_standby
archive_mode = on
archive_command = 'cd .'
max_wal_senders = 8
hot_standby = on

# /var/lib/pgpro/std-13/data/postgresql.conf
```

#### Перезапуск Postgres Pro
```shell
systemctl restart postgres
```

### Настройка slave

#### Выгрузка файлов с master
```shell
rm -rf /var/lib/pgpro/std-13/data/*
pg_basebackup -P -R -X stream -c fast -h <master-ip> -U postgres -D /var/lib/pgpro/std-13/data
```

## Репликация с архивом
Настройка репликации с архивом выролняется с некоторыми отличиями от потоковой репликации:

### Развёртывание NFS
WAL-архивы будут складываться на NFS. Как сконфигурировать NFS написано [здесь](//fruw.org/posts/linux-nfs).
Необходимо смонтировать NFS на master и slave в одинаковые директории.

### Дополнение к реконфигурации 
```shell
archive_command = 'test ! -f /nfs/%f && cp %p /nfs/%f'
archive_cleanup_command = 'pg_archivecleanup -d /nfs %r 2>>cleanup.log'

# /var/lib/pgpro/std-13/data/postgresql.conf
```

## Синхронный и асинхронный режим репликации
При синхронной репликации, изменения применятся на основном сервере только после того, как они запишутся в WAL хотя бы одной реплики, а при асинхронной - сразу. 
По умолчанию репликация работает в асинхронном режиме. 
Для того, чтобы она работала в синхронном режиме, необходимо изменить две строки в конфигурационном файле Postgres Pro:
```shell
synchronous_commit = on
synchronous_standby_names = 'pgsql_0_node_0'

# /var/lib/pgpro/std-13/data/postgresql.conf
```
