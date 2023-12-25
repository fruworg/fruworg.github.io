---
title: Дроп БД форсированно в Postgres
description: На старой и новой версии
date: 2023-03-03T13:26:00+05:00
tags: [linux, postgres]
---
## На старой версии (<=12)

Заходим в консоль Postgres:
```bash
psql
```

Убиваем соединения с БД:
```sql
SELECT	pg_terminate_backend (pid)
FROM	pg_stat_activity
WHERE	pg_stat_activity.datname = '<database_name>';
```

Дропаем БД:
```sql
DROP DATABASE <database_name>;
```

## На новой версии (>=13)

Заходим в консоль Postgres:
```bash
psql
```

Дропаем БД:
```sql
DROP DATABASE <database_name> WITH (FORCE);
```
