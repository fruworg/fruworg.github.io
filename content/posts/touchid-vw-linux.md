---
title: Использование отпечатка пальца в vaultwarden
description: Конфигурация использования отпечатка пальца в расширении для браузера bitwarden/vaultwarden на ОС GNU/Linux
date: 2023-10-13T03:15:00+06:00
tags: [linux, security]
---

## Клонирование и сборка утилиты
Перед началом необходимо [настроить работу сканера отпечатка пальцев](/posts/touchid-linux/).

```bash
git clone https://github.com/quexten/bw-bio-handler /tmp/bw
cd /tmp/bw
go mod download
go mod tidy
go build .
```

## Перемещение бинарника

```shell
mv bw-bio-handler /usr/local/bin
chown root: /usr/local/bin/bw-bio-handler
```

## Перемещение политики и проверка корректности 

```bash
mv biometrics/policies/com.quexten.bw-bio-handler.xml /usr/share/polkit-1/actions/
go test biometrics
```

## Получение userid и key
Для полученя `userid` необходимо зайти в консоль браузера на странице разблокированного хранилища и выполнить следующую комманду:
```js
console.log(await this.bitwardenContainerService.cryptoService.stateService.getActiveUserIdFromStorage())
```

Для `key` аналогично:
```js
console.log((await this.bitwardenContainerService.cryptoService.getKey()).encKeyB64)
```

## Сохранение секрета
Далее необходимо выполнить комманду, заменив полученный ранее `userid` и при запросе пароля указать `key`:
```shell
secret-tool store --label "com.quexten.bitwarden-biometrics-handler" account <userid>
```

## Правка конфига Firefox
Необходимо создать файл `~/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json` со следующим содержимым:

```python
{
    "name": "com.8bit.bitwarden",
    "description": "Bitwarden desktop <-> browser bridge",
    "path": "/usr/local/bin/bw-bio-handler",
    "type": "stdio",
    "allowed_extensions": [
      "{446900e4-71c2-419f-a6a7-df9c091e268b}"
    ]
}
```

И сменить ему права:
```shell
chmod 0644 ~/.mozilla/native-messaging-hosts/com.8bit.bitwarden.json
```
