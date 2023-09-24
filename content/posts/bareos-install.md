---
title: Установка Bareos на Astra Linux SE
description: Инструкция по установке из репозитория Bareos
date: 2023-01-27T16:08:00+05:00
tags: [linux, postgres, bareos, apache]
---
## Конфигурация Сервера

### Установка Bareos и PostgreSQL
```
curl -s https://download.bareos.org/current/Debian_10/add_bareos_repositories.sh | bash
apt update
apt install postgresql bareos bareos-webui
```

### Конфигурация БД
```
dpkg-reconfigure bareos-database-common
```

### Включение сервисов Bareos, PostgreSQL и Apache
```
systemctl enable --now postgresql bareos-director bareos-filedaemon bareos-storage apache2
```

### Создание пользователя для Bareos-webui и конфига клиента
Веб Bareos'а находится по адресу: [http://\<bareos-ip\>/bareos-webui/](http://localhost/bareos-webui/)
```
bconsole
configure add console name=<web-user> password=<web-pass> profile=webui-admin tlsenable=no
configure add client name=<client-name> address=<client-ip> password=<client-pass>
reload
exit
```

### Бэкап определённой папки
```
FileSet {
  Name = "<name>"
  Description = "<description>"
  Include {
    Options {
      Signature = MD5 # calculate md5 checksum per file
    }
    File = "<directory>"
  }
}

# /etc/bareos/bareos-dir.d/fileset/<name>.conf
```

## Конфигурация клиента

### Установка Bareos Filedaemon
```
curl -s https://download.bareos.org/current/Debian_10/add_bareos_repositories.sh | bash
apt update
apt install bareos-filedaemon
```

### Перенос конфига с сервера на клиент
```
scp <user>@<server-ip>:/etc/bareos/bareos-dir-export/client\
	/<client-name>/bareos-fd.d/director/bareos-dir.conf/etc/bareos/bareos-fd.d/director/
```

### Включение сервиса
```
systemctl enable --now bareos-filedaemon
```
