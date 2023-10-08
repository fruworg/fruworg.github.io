---
title: "Настройка сети в Linux"
date: 2022-11-25T15:34:46+05:00
description: Путём правки конфигурационных файлов
tags: [linux]
---
## Настройка DNS и домена
В файл `/etc/resolv.conf` необходимо добавить следующие строки:

```shell
search <domain>
nameserver <dns-server>
```

## Статика
В файл `/etc/network/interfaces.d/<interface>` необходимо добавить следующие строки:

```shell
auto <interface>
iface <interface> inet static
	address <ip-address>
	netmask <netmask>
	gateway <gateway>
```

## DHCP
В файл `/etc/network/interfaces.d/<interface>` необходимо добавить следующие строки:

```shell
auto <interface>
iface <interface> inet dhcp
```
