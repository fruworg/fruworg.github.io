---
title: Пересборка .deb пакетов
description: Список команд
date: 2023-01-24T22:58:00+05:00
tags: [linux]
---
## Распаковка пакета

### Распаковка данных

```shell
dpkg -x "<package>.deb" <folder>
```

### Распаковка метаданных

```shell
dpkg -e "<package>.deb" <folder>/DEBIAN
```

## Сборка пакета

```shell
dpkg -b <folder> "<package>.deb"
```
