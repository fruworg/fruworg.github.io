---
title: "Установка fly-dm (GUI) на Astra Linux"
date: 2023-04-04T12:35:00+05:00
description: Небольшая памятка
tags: [linux, astra]
---
## Установка пакета fly
```bash
apt install fly-all-main
```

## Загрузка ОС с GUI по-умолчанию
```bash
systemctl set-default graphical.target
```

## Примечание

### Посмотреть текущую конфигурацию загрузки
```bash
systemctl get-default
```

### Вернуть загрузку ОС с CLI
```bash
systemctl set-default multi-user.target
```
