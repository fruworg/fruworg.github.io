---
title: Конфигурация DNSSEC
description: CoreDNS
date: 2025-06-25T13:36:00+02:00
tags: [linux, coredns]
---
## Генерация ключа

```bash
dnssec-keygen -a ECDSAP256SHA256 <doma.in>
```

## Конфигурация CoreDNS

В `Corefile` доменной зоны необходимо вставить следующее:

```python
	dnssec {
		key file /etc/coredns/dnssec/<filename-without-extension>
	}
```

И перезапустить `CoreDNS` командой:

```shell
systemctl restart coredns
```

## DS запись

Далее необходимо добавить `DS-запись` в консоли вашего регистратора.\
Запись можно получить выполнив следующую команду:

```bash
dnssec-dsfromkey <filename-without-extension>
```
