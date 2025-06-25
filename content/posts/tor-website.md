---
title: Поднятие сайта в TOR
description: Caddy
date: 2025-06-25T14:02:00+02:00
tags: [linux, tor, caddy]
---
## Генерация vanity адреса

```bash
docker run -it nwtgck/mkp224o
mkp224o <domain-start-with> -s
```

Формула для вычисления ожидаемого времени генерации:
```python
32^<number-of-characters>/<calc/sec> = <eta-in-seconds>
```

## Установка и конфигурация TOR

Установка TOR:

```shell
apt -y install tor
```

Следующие строки необходимо добавить в `/etc/tor/torrc`:

```python
HiddenServiceDir /var/lib/tor/website
HiddenServicePort 80 127.0.0.1:80
```

Файлы, сгенерированные `mkp224o`, необходимо добавить в директорию `/var/lib/tor/website`:

```shell
mkdir /var/lib/tor/website
mv <domain>.onion/* /var/lib/tor/website
chown -R debian-tor: /var/lib/tor/website
chmod -R 700 /var/lib/tor/website
```

## Конфигурация Caddy

В `Caddyfile` необходимо добавить следующее:

```python
<cleanet-doma.in> {
	header Onion-Location http://<domain>.onion{uri}
	respond "cleanet"
}
														
http://<domain>.onion {
	respond "onion"
}
```

## Перезапуск сервисов

```shell
systemctl restart tor
systemctl restart caddy
```
