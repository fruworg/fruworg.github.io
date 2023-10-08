---
title: ldaps аутентификация в Postgres Pro
description: ad+ldaps+postgres
date: 2023-06-01T20:40:00+05:00
tags: [linux, postgres, ad, ldap, tls, windows]
---
## Выпуск сертфиката
AD необходимо дать роль CA и выпустить сертификат. Подробнее: https://youtu.be/xC3ujXGkh_c?t=160 

## Перенос сертификата
Необходимо перенести выпущенный конечный сертификат на сервер СУБД и перекодировать следующей командой:

```ell
openssl x509 -inform der -in <ad>.cer -out <ad>.pem
```

## Установка пакета ldap-utils
```ell
apt install ldap-utils -y
```

## Правка ldap конфига
В файл `/etc/ldap/ldap.conf` необходимо добавить следующие строки:

```
TLS_CACERT	/etc/ldap/<ad>.pem
BASE		dc=<domain>,dc=<local>
URI 		ldaps://<dc>.<domain>.<local>:636
```

## Проверка ldap
```ell
ldapsearch -x -b "dc=<domain>,dc=<local>" -H ldaps://<dc>.<domain>.<local>:636 -W -D <domain-user>
```

## Правка pg_hba.conf
С ldapprefix/ldapsuffix в файле `/var/lib/pgpro/std-14/data/pg_hba.conf`, возможно, придётся поколдовать. Стоит попробовать их оставить пустыми (="").
```
host <database> <user> <ip>/<mask> ldap ldapserver=<dc>.<domain>.<local> ldapscheme=ldaps ldapprefix="cn=" ldapsuffix=",cn=users,dc=<domain>,dc=<local>"
```

## Создание пользователя в Postgres
```ell
psql -c "CREATE USER <domain-user>;"
```

## Перезапуск Postgres Pro
```ell
systemctl restart postgres*
```

