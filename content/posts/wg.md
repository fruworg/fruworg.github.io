---
title: WireGuard. Установка и настройка
description: Сервер и клиент
date: 2024-06-05T17:37:00+06:00
tags: [linux, wireguard]
---
## Подготовка
На сервере и клиенте необходимо установить пакет `wireguard` и сгенерировать публичный и приватный ключи:
```shell
apt install wireguard
```
```bash
cd /etc/wireguard
wg genkey | tee privatekey | wg pubkey > publickey
```

## Конфигурация сервера
### Форвардинг пакетов
В файл `/etc/sysctl.conf` необходимо добавить следующие строки:
```config
net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
```
И подгрузить эти значения командой `sysctl -p`

### Конфигурация WireGuard
В файл `/etc/wireguard/<conn-name>.conf` необходимо дописать следующее:
```config
[Interface]
PrivateKey = <private-key>
Address = 172.0.0.1/24
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o <interface> -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o <interface> -j MASQUERADE
ListenPort = 51820

[Peer]
PublicKey = <public-key>
AllowedIPs = 172.0.0.2/32
```
`<public-key>` - содержимое файла `/etc/wireguard/publickey` клиента\
`<private-key>` - содержимое файла `/etc/wireguard/privatekey` сервера\
`<interface>` - имя сетевого интерфейса
### Включение WireGuard при запуске сервера
```shell
systemctl enable --now wg-quick@<conn-name>.service
```

## Конфигурация клиента
### Конфигурация WireGuard
В файл `/etc/wireguard/<conn-name>.conf` необходимо дописать следующее:
```config
[Interface]
Address = 172.0.0.2/32
PrivateKey = <private-key>
DNS = 1.1.1.1

[Peer]
PublicKey = <public-key>
Endpoint = <server-addr>:51820
AllowedIPs = <allowed-ips>
```
`<public-key>` - содержимое файла `/etc/wireguard/publickey` сервера\
`<private-key>` - содержимое файла `/etc/wireguard/privatekey` клиента\
`<server-addr>` - публичный адрес сервера\
`<allowed-ips>` - IP-адреса, соединения с которыми будут идти через `WireGuard`
### Включение WireGuard при запуске клиента
```shell
systemctl enable --now wg-quick@<conn-name>.service
```

## Примечание
На сервере должен быть открыт порт `51820/udp`. Для добавления новых клиентов `WireGuard` необходимо в конфигурацию сервера добавлять блоки `[Peer]`.
