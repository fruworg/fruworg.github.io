---
title: Установка и конфигурация MariaDB
description: На debian-based дистрибутивы
date: 2024-01-26T16:30:00+06:00
tags: [linux, mysql]
---

## Установка MariaDB
```shell
apt install mariadb-server
```

## Security конфигурация
```shell
mysql_secure_installation
```

## Создание БД и пользователя
Для того, чтобы можно было подключиться удалённо, необходимо заменить `localhost` на `*`.
```mysql
mysql
create database <database>;
grant all privileges on <database>.* TO '<username>'@'localhost' identified by '<password>';
flush privileges;
exit
```
