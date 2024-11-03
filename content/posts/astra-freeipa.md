---
title: Установка и конфигурация FreeIPA на Astra Linux
description: Сервер и клиент
date: 2023-03-25T01:08:00+05:00
tags: [linux, astra, krb5, freeipa]
---
## Общая настройка

### Создания сетевой видимости
На клиенте и DC необходимо в файл `/etc/hosts` добавить оба ip и fqdn:

```python
<server-ip> <server-name>.<domain> <server-name>
<client-ip> <client-name>.<domain> <client-name>
```

## Настройка cервера

### Смена хостнейма
```shell
hostnamectl set-hostname <server-name>.<domain>
```

### Установка пакета
```shell
apt install fly-admin-freeipa-server -y
```

### Развёртывание 
```shell
astra-freeipa-server -d <domain> -n <server-name> -px -ip <server-ip> -o --dogtag -y
```

## Настройка клиента

### Смена хостнейма
```shell
hostnamectl set-hostname <client-name>.<domain>
```

### Установка пакета
```shell
apt install fly-admin-freeipa-client -y -px "--force"
```

### Конфигурация клиента
``` shell
astra-freeipa-client -d <domain>
```
