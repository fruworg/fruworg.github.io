---
title: Принудительная запись в resolv.conf
description: При использовании DHCP
date: 2023-04-06T02:43:00+05:00
tags: [linux]
---
## Конфигурация клиента
Неприятно, когда конфиг не даёт поменять себя ручками, да?

```bash
supersede domain-name-servers <dns-1>, <dns-n>;
supersede domain-name "<domain.local>";

# /etc/dhcp/dhclient.conf
```

```bash
systemctl restart networking
```
