---
title: Создание SWAP-файла
description: Файл подкачки в GNU/Linux
date: 2025-01-12T22:10:00+01:00
tags: [linux]
---
## Создания
Размер файла подкачки

RAM `<= 2GB`, SWAP `x2`\
RAM `2GB - 8GB`, SWAP `x1`\
RAM `>= 8GB`, SWAP `>= 4GB`

```shell
fallocate -l <size-in-gb>G /swap
chmod 600 /swap
mkswap /swap
swapon /swap
```

## Автомонтирование

В конец `/etc/fstab` необходимо добавить следующую строку
```python
/swap none swap sw 0 0
```

И проверим корректность записи
```shell
mount -a
```
