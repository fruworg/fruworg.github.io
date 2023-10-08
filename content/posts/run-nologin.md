---
title: Принудительное отключение создания файла nologin
description: Дедовским методом
date: 2023-04-06T18:25:00+05:00
tags: [linux]
---
## Комментим строку

В найденых файлах необходимо закомментить все строки с pam_nologin.so.

```ell
cd /etc/pam.d
nano $(grep -Rl "pam_nologin.so")
```

## Перезагружаем машину

```ell
init 6
```
