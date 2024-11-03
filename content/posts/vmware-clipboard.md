---
title: Включение буфера VM в VMware ESXi/vSphere
description: У созданных VM будет включен буфер обмена по умолчанию
date: 2022-11-25T15:08:00+05:00
tags: [vmware]
---

## Изменение конфига

В файл `/etc/vmware/config` необходимо добавить следующее:

```python
vmx.fullpath = "/bin/vmx"
isolation.tools.copy.disable="FALSE"
isolation.tools.paste.disable="FALSE"
```
