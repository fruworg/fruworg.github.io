---
title: Простой бэкап Postgres Pro
description: Используя pg_dump, pg_dumpall, pg_restore и cron
date: 2022-12-14T16:48:00+05:00
tags: [linux, postgres]
---
## Скрипт для бэкапа БД и глобальных объектов
```shell
#!/usr/bin/env bash
pg_dump -U <username> -h <pg-hostname> -Fc <db> --file=<db>-$(date '+%Y-%m-%d').dump
pg_dumpall -U <username> -h <pg-hostname> --globals --file=gb-$(date '+%Y-%m-%d').dump

# /home/<username>/pg-backup.sh
```

## Файл cron с запуском скрипта (каждый день в 2:00)
```shell
0 2 * * * /usr/bin/env bash /home/<username>/pg-backup.sh

# crontab -e -u <username>
```

## Рестор файлов БД и глобальных объектов
```shell
pg_restore -C -d postgres <dbname>-<date>.dump
psql -U postgres < gb-<date>.dump
```
