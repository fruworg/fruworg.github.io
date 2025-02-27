---
title: Активация и автоматические обновления в RHEL 9
description: Небольшая памятка
date: 2025-02-27T23:10:00+01:00
tags: [linux, rhel]
---

## Активация

```shell
subscription-manager register --auto-attach
insights-client --register
```

## Автоматическая установка обновлений

```shell
yum -y install dnf-automatic
systemctl enable --now dnf-automatic-install.timer
```

## Установка расширенного репозитория

```shell
subscription-manager repos --enable codeready-builder-for-rhel-9-$(arch)-rpms
yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm
```
