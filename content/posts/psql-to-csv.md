---
title: Конвертация PostgreSQL в CSV
description: pSQL to CSV
date: 2024-09-11T17:24:00+02:00
tags: [linux, postgres]
---
## Конвертация
```bash
psql -d <database>
```
```psql
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public') LOOP
        EXECUTE format('COPY %I TO %L WITH (FORMAT CSV, HEADER)', r.table_name, '/<path-to-csv>/' || r.table_name || '.csv');
    END LOOP;
END $$;
```
