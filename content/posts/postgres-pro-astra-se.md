---
title: Установка Postgres Pro на Astra Linux SE
description: Инструкция по установке из репозитория Postgres Proffessional
date: 2022-11-25T16:20:00+05:00
tags: [linux, astra, postgres]
---
## Добавление репозитория
```
apt -y install gnupg
wget -O - http://repo.postgrespro.ru/keys/GPG-KEY-POSTGRESPRO | apt-key add -
echo "deb http://repo.postgrespro.ru/pgpro-14/astra-smolensk/1.7 1.7_x86-64 main" \
        > /etc/apt/sources.list.d/pgpro.list
```
## Установка пакета
```
apt update
apt -y install postgrespro-std-14
```

## systemd
```
/opt/pgpro/std-14/bin/pg-setup service enable --now
ln -s /lib/systemd/system/postgrespro-std-14.service /etc/systemd/system/postgresql.service
```

## Обновление путей
```
/opt/pgpro/std-14/bin/pg-wrapper links update
```

## Смена пароля postgres
```
su - postgres
psql -c "ALTER USER postgres PASSWORD '<password>';"
```
