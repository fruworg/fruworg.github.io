---
title: Как собрать бинарник ruby и не сойти с ума
description: ruby-packer
date: 2023-08-03T19:00:00+06:00
tags: [linux, ruby, gcc]
---

## Вступление

Лучше всего использовать ту же версию bundler и ruby, что использует rubyc.
Необходимо прописать все зависимости явно в *.gemspec.
Если сборка завершается с ошибкой не найденой версией GLIBC/XCRYPT, то необходимо понизить версию rubyc/поднять версию ОС.
Если же завершается успешно, но при запуске вываливается ошибка, связанная с каким-нибудь gem'ом - надо попробовать понизить/повысить его версию.
У меня получилось собрать бинарник только используя Debian SID и форк Rubyc (3.1.3).
[Пример утилиты, которая успешно собралась](//github.com/fruworg/pg-ldap-sync).

## Установка пакетов для сборки (и не только)

```shell
apt -y install wget unzip gcc make autoconf squashfs-tools libtool bison gnupg
```

## Установка ruby (из пакета)

```shell
apt -y install ruby ruby-dev
```

## Установка ruby (из исходников)

```shell
wget -P /tmp https://cache.ruby-lang.org/pub/ruby/<ver.sion>/ruby-<ve.rsi.on>.tar.gz
tar  -C /tmp -xvf /tmp/ruby-*.tar.gz
cd /tmp/ruby-*/
./configure
make
make install
```

## Установка rubyc (форк, 3.1.3, рекомендую)

```shell
wget -P /tmp https://github.com/ericbeland/ruby-packer/releases/download/3_1_3/linux-amd64.zip
unzip /tmp/linux-amd64.zip -d /tmp
mv /tmp/linux-amd64/rubyc /usr/local/bin
chmod +x /usr/local/bin/rubyc 
```

## Установка rubyc (unstable, 2.7, не рекомендую)

```shell
wget -P /usr/local/bin https://github.com/pmq20/ruby-packer/releases/download/linux-x64/rubyc
chmod +x /usr/local/bin/rubyc 
```

## Установка rubyc (stable, 2.4, не рекомендую)

```shell
wget -P /tmp https://gw.alipayobjects.com/os/enclose-prod/1fd23e6b-d48f-4ed0-94dd-f0f539960253/rubyc-v0.4.0-linux-x64.gz
gzip -d /tmp/rubyc-v0.4.0-linux-x64.gz
mv /tmp/rubyc-v0.4.0-linux-x64 /usr/local/bin/rubyc
chmod +x /usr/local/bin/rubyc 
```

## Правка запускаемого файла собираемой утилиты

В запускаемый файл `exe/<ruby-util>` (обычно лежит в exe или bin) необходимо добавить в самое начало следующие строки:
```config
#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
```

## Подготовка к сборке

Необходимо собрать gem с помощью Bundle.
```shell
gem install bundler
bundle install
bundle exec rake install
```

## Сборка бинарника

Собираем бинарник. Обязательно при этом необходимо молиться.
```shell
cd <ruby-util-dir>
rubyc -r . -d /tmp/ -o <ruby-util> exe/<ruby-util>
```
