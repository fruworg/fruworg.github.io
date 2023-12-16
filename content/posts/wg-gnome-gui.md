---
title: Добавление WireGuard в GUI Gnome
description: Одной командой
date: 2023-05-08T23:25:00+05:00
tags: [linux, wireguard]
---

## Добавление

```shell
nmcli connection import type wireguard file /etc/wireguard/<wg-conn-name>.conf
```
