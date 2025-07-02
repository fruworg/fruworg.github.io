---
title: Marzban - продвинутый роутинг
description: VLESS + gRPC + Reality
date: 2025-07-02T12:48:00+02:00
tags: [linux, xray]
---

## Вступление

Для конфигурации нам необходимо два сервера - один будет в России, а второй за её пределами.\
Российский сервер будет точкой входа и проксировать траффик через себя до российских сервисов.\
До сервисов вне России сервер будет дополнительно проксировать через сервер вне России.\
Домен для сервера в России, например - `example.com`, для сервера вне России - `exit.example.com`.

## Установка Marzban (аналогично для двух серверов)

Нужно создать папки `tls` и `lib`:
```shell
mkdir tls
mkdir lib
```
Необходимо переместить `TLS` ключ и сертификат в папку `tls`.\
Необходимо создать `compose.yaml`:
```python
services:
  marzban:
    image: gozargah/marzban:latest
    container_name: marzban
    network_mode: host
    restart: always
    env_file: .env
    volumes:
      - ./lib:/var/lib/marzban
      - ./tls:/tls
```

В файл `.env` нужно вписать следующее:
```python
UVICORN_HOST = "0.0.0.0"
UVICORN_PORT = 8000
ALLOWED_ORIGINS=https://<fqdn>
SUDO_USERNAME = "admin"
SUDO_PASSWORD = "<password>"
UVICORN_SSL_CERTFILE = "/tls/<fqdn>.crt"
UVICORN_SSL_KEYFILE = "/tls/<fqdn>.key"
DASHBOARD_PATH = "/<secret-uri>/"
XRAY_JSON = "/var/lib/marzban/xray_config.json"
XRAY_SUBSCRIPTION_URL_PREFIX = "https://<fqdn>"
```

Для полученя `xray` ключа и `uuid` для `lib/xray_config.json` необходимо скачать [xray-core](https://github.com/XTLS/Xray-core/releases/).\
`uuid` - `./xray uuid`\
`key` - `./xray x25519`\
Далее нужно создать файл `lib/xray_config.json` (`fqdn` у каждого сервера свой):
```python
{
    "log": {
        "loglevel": "debug"
    },
    "dns": {
        "servers": [
            "9.9.9.9",
            "149.112.112.112",
            "2620:fe::fe",
            "2620:fe::9"
        ],
        "queryStrategy": "UseIP",
        "tag": "dns_inbound"
    },
    "routing": {
        "rules": [
            {
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "BLOCK",
                "type": "field"
            },
            {
                "type": "field",
                "outboundTag": "BLOCK",
                "protocol": [
                    "bittorrent"
                ]
            }
        ]
    },
    "inbounds": [
        {
            "tag": "VLESS GRPC REALITY",
            "listen": "0.0.0.0",
            "port": 8443,
            "protocol": "vless",
            "settings": {
                "clients": [],
                "decryption": "none"
            },
            "streamSettings": {
                "network": "grpc",
                "grpcSettings": {
                    "serviceName": "xyz"
                },
                "security": "reality",
                "realitySettings": {
                    "show": false,
                    "dest": "google.com:443",
                    "xver": 0,
                    "serverNames": [
                        "<fqdn>"
                    ],
                    "privateKey": "<xray-private-key>",
                    "SpiderX": "/<uuid>",
                    "shortIds": [
                        "<16-hexadecimal-characters>"
                    ]
                }
            },
            "sniffing": {
                "enabled": true,
                "destOverride": [
                    "http",
                    "tls",
                    "quic"
                ]
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "tag": "DIRECT"
        },
        {
            "protocol": "blackhole",
            "tag": "BLOCK"
        }
    ]
}
```

И, наконец, необходимо поднять контейнер:

```shell
docker compose up -d
```

## Создание клиентов

Далее необходимо создать пользователей для конечных пользователей на российском сервере
и пользователя на сервере вне России для российского сервера.
Далее приложением `v2rayNG` подключаемся на сервер вне России и экспортируйте конфиг -
`Экспорт всей конфигурации в буфер обмена`.

## Модификация роутинга

Далее только на российском сервере необходимо в `xray_config.json` изменить `routing` на:

```python
    "routing": {
        "rules": [
            {
                "domain": [
                    "regexp:\\.ru$",
                    "regexp:\\.\u0440\u0444$"
                ],
                "outboundTag": "RU",
                "type": "field"
            },
            {
                "ip": [
                    "geoip:ru"
                ],
                "outboundTag": "RU",
                "type": "field"
            },
            {
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "BLOCK",
                "type": "field"
            },
            {
                "type": "field",
                "outboundTag": "BLOCK",
                "protocol": [
                    "bittorrent"
                ]
            }
        ]
    }
```

И также только на российском сервере изменить `outbounds` на\
(вместо `<proxy>` необходимо вставить `outbound` с тегом `proxy` из экспортированного
конфига `v2rayng` и заменить тег `proxy` на `DIRECT`):
```python
    "outbounds": [
        <proxy>
        {
            "protocol": "freedom",
            "tag": "RU"
        },
        {
            "protocol": "blackhole",
            "tag": "BLOCK"
        }
    ]

```

Готово, теперь пользователи могут подключаться к серверу в России.
