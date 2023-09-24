---
title: Установка и конфигурация ALD Pro
description: Astra Linux Directory Pro
date: 2023-05-08T23:25:00+05:00
tags: [linux, astra, krb5]
---
## Создания сетевой видимости

```
<dc-ip> <dc-name>.<domain> <dc-name>

# /etc/hosts
```

## Смена хостнейма
```
hostnamectl set-hostname <dc-name>.<domain>
```

## Добавление репозиториев ALD Pro
```
deb https://download.astralinux.ru/aldpro/stable/repository-main/ 1.0.0 main
deb https://download.astralinux.ru/aldpro/stable/repository-extended/ generic main

# /etc/apt/sources.list.d/aldpro.list
```

## Выставление приоритета репозиториев
```
Package: *
Pin: release n=generic
Pin-Priority: 900

# /etc/apt/preferences.d/aldpro
```

## Установка пакета
```
DEBIAN_FRONTEND=noninteractive apt-get install -q -y aldpro-mp
```

## Развёртывание 
После того, как команда развёртывания отработает и сервер перезагрузитcя, 
сервер ALD Pro будет доступен по адресу: https://\<dc-name\>.\<domain\>

```
/opt/rbta/aldpro/mp/bin/aldpro-server-install.sh \
	-d <domain> -n <dc-name> -p <password> --ip <dc-ip>
```
