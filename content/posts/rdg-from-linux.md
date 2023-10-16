---
title: Подключение через RDG с GNU/Lunux
description: wlfreerdp/xfreerdp 
date: 2023-10-16T23:06:00+06:00
tags: [linux, windows]
---

## Подключение
Если используешь иксы, то вместо `wlfreerdp` пиши `xfreerdp`:
```bash
wlfreerdp /gu:<username> /u:<username> /gp:<password> /p:<password> /v:<vm-fqdn> /g:<rdg-fqdn> /sound /microphone:sys:alsa,dev:hw:0,0 /f
```
