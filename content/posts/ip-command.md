---
title: "Памятка по команде ip"
date: 2022-11-25T19:17:00+05:00
description: Команда ip в Linux
tags: [linux]
---

## Показать все интерфейсы

```bash
ip a
ip l
```

## Показать информацию по конкретному интерфейсу

```bash
ip a show <interface>
ip l show <interface>
```

## Изменить статус сетевого интерфейса

```shell
ip l set <interface> down
ip l set <interface> up
```

## Добавить или удалить адрес

```shell
ip a add <ip-address/mask> dev <interface>
ip a add brd <ip-address/mask> dev <interface>
ip a del <ip-address> dev <interface>
```

