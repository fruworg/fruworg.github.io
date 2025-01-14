---
title: Полезные бинды клавиш в Windows
description: AutoHotkey v2
date: 2025-01-14T11:36:00+01:00
tags: [windows]
---

## Вступление
Для бинда клавиш я использую [AutoHotkey](https://www.autohotkey.com/download/ahk-v2.exe). Для автозапуска нужно перенести `.ahk` файлы в `shell:startup`.
	
## CapLang.ahk
Смена раскладки по нажатию на `CapsLock`. Сам `CapsLock` переключается через `Shift+CapsLock`.

```python
SendMode("Input")
SetWorkingDir A_ScriptDir
+CapsLock::SetCapsLockState !GetKeyState("CapsLock", "T")
CapsLock::Send "{Alt Down}{Shift Down}{Shift Up}{Alt Up}"
```

## Kitty.ahk
Запуск Kitty по нажатию на кнопку `Copilot`.

```python
SendMode("Input")
SetWorkingDir A_ScriptDir
+#f23:: Run "C:\Program Files\Kitty\kitty.exe -load <your-profile-name>"
```

## WSL.ahk
Запуск WSL по нажатию на `Ctrl+Alt+T`

```python
SendMode("Input")
SetWorkingDir A_ScriptDir
<^<!t::Run 'powershell.exe -noexit -command "cd <wsl-home-dir>; wsl"'
```

## PrintScreen.ahk
Скриншот нажатием на правый альт.

```python
SendMode("Input")
SetWorkingDir A_ScriptDir
RAlt::PrintScreen
```
