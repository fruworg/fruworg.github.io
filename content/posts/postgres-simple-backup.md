---
title: Простой бэкап Postgres Pro
description: Используя pg_dump, pg_dumpall, pg_restore и cron
date: 2022-12-14T16:48:00+05:00
tags: [linux, postgres]
---
## Скрипт для бэкапа БД и глобальных объектов

В файл `/home/<username>/pg-backup.sh` необходимо добавить следующие строки:
```config
#!/usr/bin/env bash

pg_dump -U <username> -h <pg-hostname> -Fc <db> --file=<db>-$(date '+%Y-%m-%d').dump
pg_dumpall -U <username> -h <pg-hostname> --globals --file=gb-$(date '+%Y-%m-%d').dump
```

## Файл cron с запуском скрипта (каждый день в 2:00)

Необходимо дописать в конец `crontab -e -u <username>` следующие строки:
```config
0 2 * * * /usr/bin/env bash /home/<username>/pg-backup.sh
```

## Рестор файлов БД и глобальных объектов

```bash
pg_restore -C -d postgres <dbname>-<date>.dump
psql -U postgres < gb-<date>.dump
```
