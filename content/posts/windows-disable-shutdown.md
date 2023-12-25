---
title: Отключение возможности выключения/перезагрузки/сна на Windows
description: Позволяет отключить определённую функцию
date: 2023-04-06T12:15:00+05:00
tags: [windows]
---

## Отключение
В ветке реестра выставить значение value на 1.

```config
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideShutDown
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideRestart
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PolicyManager\default\Start\HideSleep
```
