---
title: Обновление Proxmox 7 -> Proxmox 8
description: И дошлифовка
date: 2024-12-10T14:05:00+01:00
tags: [linux]
---

## Актуализация ОС

```shell
apt -y update
apt -y dist-upgrade
```

## Проверка готовности обновления

```shell
pve7to8 --full
```

## Актуализация репозиториев

```shell
sed -i 's/bullseye/bookworm/g' /etc/apt/sources.list
sed -i 's/bullseye/bookworm/g' /etc/apt/sources.list.d/*.list
```

## Обновление ОС и PVE

```shell
apt -y update
apt -y dist-upgrade
init 6
```

## Дошлифовка

```shell
bash -c "$(wget -qLO - https://github.com/community-scripts/ProxmoxVE/raw/main/misc/post-pve-install.sh)"
```
