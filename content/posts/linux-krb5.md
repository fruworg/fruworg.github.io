---
title: Установка и конфигурация Kerberos на Linux
description: На сервере и клиенте
date: 2022-11-29T13:07:00+05:00
tags: [linux, krb5]
---
## Конфигурация сервера

### Установка пакетов

```shell
apt -y install krb5-kdc krb5-admin-server
```

## Конфигурация клиента

### Установка пакетов

```shell
apt -y install krb5-user libpam-krb5
```

## Общая конфигурация

На сервере и клиенте надо проделать следующие шаги:

### Смена hostname

```shell
hostnamectl set-hostname <hostname>
```

### Правка файла hosts

Вместо правки файла `/etc/hosts` можно поднять DNS-сервер и сделать записи там.
```config
<server-ip> <server-name.domain.name> <server-name>
<client-ip> <client-name.domain.name> <client-name>
```

### Редактирование конфига Kerberos

В `/etc/krb5.conf` необходимо добавить данные а реалме и kdc:
```config
[libdefaults]
        default_realm = <DOMAIN.NAME>

[realms]
        <DOMAIN.NAME> = {
                kdc = <server-name.domain.name>
                admin_server = <server-name.domain.name>
                kpasswd_server = <server-name.domain.name>
                default_domain = <DOMAIN.NAME>
        }

[domain_realm]
        <domain.name> = <DOMAIN.NAME>
        .<domain.name> = <DOMAIN.NAME>
```

## Создание нового реалма (на сервере)

### Создание master key для БД krb5

```shell
krb5_newrealm
```

### Создание учётной записи администратора

```shell
kadmin.local
addprinc <admin-name>/admin
quit
```

### Разрешение административных прав 
Добавляем администратора в `/etc/krb5kdc/kadm5.acl`:

```config
<admin-name>/admin
```

## Получение билета
```shell
kinit <admin-name>\admin
```
Проверяем наличие выданного билета:
```shell
klist
```
