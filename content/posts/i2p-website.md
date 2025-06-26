---
title: Поднятие сайта в i2p
description: Caddy
date: 2025-06-25T14:10:00+02:00
tags: [linux, i2p, caddy]
---
## Установка i2pd

```shell
apt -y install -y apt-transport-https
wget -qO - https://repo.i2pd.xyz/.help/add_repo | bash -s -
apt update
apt -y install i2pd
```

## Конфигурация i2pd

В `/etc/i2pd/tunnels.conf.d/website.conf` необходимо добавить следующее:

```python
[website]
type = http
host = 127.0.0.1
port = 80
keys = website.dat
```

И перезагрузите i2pd:

```shell
systemctl restart i2pd
```

## Регистрация адреса

В `reg.i2p` необходимо проверить незанятость желаемого `fqdn`.\
Если `fqdn` занят, но не используется, то его тоже можно занять.\
Для регистрации необходимо сгенерировать подпись:

```shell
git clone --recursive https://github.com/purplei2p/i2pd-tools
cd i2pd-tools
./dependencies.sh
make
```

```shell
./regaddr /var/lib/i2pd/website.dat <domain>.i2p
```

Полученный вывод необходимо вписать в страницу желаемого домена на `reg.i2p`.

## Конфигурация Caddy

Полный `b32` домен можно посмотреть командой:

```shell
ls /var/lib/i2pd/destinations
```

В `Caddyfile` необходимо добавить следующее:

```python
http://<domain>.i2p {
	respond "i2p"
}

http://<b32-domain-before-dots>.b32.i2p {
	redir http://<domain>.i2p{uri}
}
```
