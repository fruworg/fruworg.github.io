---
title: Обновление PostgreSQL
description: pg_upgradecluster
date: 2023-10-09T00:20:00+06:00
tags: [linux, postgres]
---

## Листинг запущенных экземпляров PostgreSQL
```ell
pg_lsclusters
```

## Остановка экземпляра PostgreSQL новой версии
```ell
pg_dropcluster <new-version> main --stop
```

## Миграция со старой версии на новую
```ell
pg_upgradecluster <old-version> main
```

## Дроп экземпляра PostgreSQL старой версии 
```ell
pg_dropcluster <old-version> main
```

## Удаление пакетов старой версии PostgreSQL
```
apt purge -y postgresql-<old-version> postgresql-client-<old-version>
```
