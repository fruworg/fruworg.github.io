---
title: Установка и конфигурация ALD Pro
description: Astra Linux Directory Pro
date: 2023-05-08T23:25:00+05:00
tags: [linux, astra, krb5]
---
## Создания сетевой видимости

В файл `/etc/hosts` необходимо добавить ip и fqdn DC:

```python
<dc-ip> <dc-name>.<domain> <dc-name>
```

## Смена хостнейма
```shell
hostnamectl set-hostname <dc-name>.<domain>
```

## Добавление репозиториев ALD Pro

В файл `/etc/apt/sources.list.d/aldpro.list` необходимо добавить репозиторий ALD Pro:

```python
deb https://download.astralinux.ru/aldpro/stable/repository-main/ 1.0.0 main
deb https://download.astralinux.ru/aldpro/stable/repository-extended/ generic main
```

## Выставление приоритета репозиториев

В файле `/etc/apt/preferences.d/aldpro` необходимо выставить приоритет репозиториев:

```python
Package: *
Pin: release n=generic
Pin-Priority: 900
```

## Установка пакета

```shell
DEBIAN_FRONTEND=noninteractive apt-get install -q -y aldpro-mp
```

## Развёртывание 

После того, как команда развёртывания отработает и сервер перезагрузитcя, 
сервер ALD Pro будет доступен по адресу: `https://<dc-name>.<domain>`

```shell
/opt/rbta/aldpro/mp/bin/aldpro-server-install.sh -d <domain> -n <dc-name> -p <password> --ip <dc-ip>
```
