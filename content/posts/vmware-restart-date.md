---
title: Сброс времени при перезагрузке в VMware ESXi/vSphere
description: При перезагрузке гипервизора будет выставляться заданное время
date: 2022-11-25T15:18:00+05:00
tags: [vmware]
---

## Изменение скрипта

В файл `/etc/rc.local.d/local.sh` необходимо добавить следующее:

```config
#!/bin/sh ++group=host/vim/vmvisor/boot

esxcli system time set --day=20 --month=3 --year=2022 --hour=10 --min=0 --sec=0
exit 0
```
