---
title: Добавление WireGuard в GUI Gnome
description: Одной командой
date: 2023-12-16T17:10:00+06:00
tags: [linux, wireguard]
---

## Добавление

```shell
nmcli connection import type wireguard file /etc/wireguard/<wg-conn-name>.conf
```
