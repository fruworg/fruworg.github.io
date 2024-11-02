---
title: Эмуляция ввода текста из буфера обмена
description: Для GNU/Linux
date: 2024-10-24T17:07:00+02:00
tags: [linux]
---
## Установка и удаление пакетов

```shell
dnf install xclip xdotool
rpm --nodeps -e xdg-desktop-portal-gnome
```

## Создание исполняемого файла

В файл `/usr/local/bin/easyclipboard` необходимо добавить следующее:

```
#!/bin/bash
xclip -selection clipboard -out | tr \\n \\r | xdotool selectwindow windowfocus type --clearmodifiers --delay 25 --window %@ --file -
```

## Выдача прав на исполнение

```shell
chmod +x /usr/local/bin/easyclipboard
```

## ShortCut

Далее необходимо забиндить исполняемый файл на какой-нибудь shortcut (например, `Ctrl+E`) и можно пользоваться.
При нажатии комбинации клавиш текст из буфера обмена вводится по-буквенно (очень помогает с vnc/crd и подобным).
