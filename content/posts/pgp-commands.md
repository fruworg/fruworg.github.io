---
title: Памятка по PGP/GPG
description: gnupg - export, import and renew
date: 2025-01-12T22:00:00+01:00
tags: [linux, pgp]
---
## Экспорт

```bash
gpg -a --export-secret-keys > private.asc
gpg --export-ownertrust > trust.txt
```

## Импорт

```bash
gpg --import private.asc
gpg --import public.asc
gpg --import-ownertrust trust.txt
```

## Продление

```bash
gpg --list-keys
gpg --quick-set-expire <fingerprint> 1y
gpg --export <your-email> | curl -T - https://keys.openpgp.org
```
