---
title: "Настройка сети в Linux"
date: 2022-11-25T15:34:46+05:00
description: Путём правки конфигурационных файлов
tags: [linux]
---
## Настройка DNS и домена
```shell
search <domain>
nameserver <dns-server>

# /etc/resolv.conf
```

## Статика
```shell
auto <interface>
iface <interface> inet static
	address <ip-address>
	netmask <netmask>
	gateway <gateway>

# /etc/network/interfaces.d/<interface>
```

## DHCP
```shell
auto <interface>
iface <interface> inet dhcp

# /etc/network/interfaces.d/<interface>
```
