---
title: Работа с репозиториями GitHub через терминал
description: Аутентификация с помощью ключа ssh
date: 2023-07-26T16:29:00+06:00
tags: [linux, git, ssh]
---
## Генерация ключа

```bash
ssh-keygen -t ed25519 -C "<your>@<ema.il>"
```

## Вывод публичного ключа

```bash
cat ~/.ssh/id_ed25519.pub
```

## Добавление ключа в GitHub

Необходимо зайти на GitHub в настройки своего аккаунта и перейти в раздел ["SSH and GPG keys"](https://github.com/settings/keys). Далее нужно нажать "New SSH key", вставить содержимое публичного ключа и сохранить изменения.

## Аутентификация в GitHub

```bash
git remote set-url origin git@github.com:<username>/<reponame>.git
```
