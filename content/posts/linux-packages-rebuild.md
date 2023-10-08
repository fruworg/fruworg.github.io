---
title: Пересборка .deb пакетов
description: Список команд
date: 2023-01-24T22:58:00+05:00
tags: [linux]
---
## Распаковка пакета

### Распаковка данных
```ell
dpkg -x "<package>.deb" <folder>
```

### Распаковка метаданных
```ell
dpkg -e "<package>.deb" <folder>/DEBIAN
```

## Сборка пакета
```ell
dpkg -b <folder> "<package>.deb"
```
