---
title: Принудительная запись в resolv.conf
description: При использовании DHCP
date: 2023-04-06T02:43:00+05:00
tags: [linux]
---
## Конфигурация клиента
Неприятно, когда конфиг не даёт поменять себя ручками, да?
В `/etc/dhcp/dhclient.conf` необходимо добавить строки перезаписи:

```python
supersede domain-name-servers <dns-1>, <dns-n>;
supersede domain-name "<domain.local>";
```

```shell
systemctl restart networking
```
