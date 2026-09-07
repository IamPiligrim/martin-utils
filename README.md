<p align="center">
  <img src="media/image 24.png" alt="Martin Utils header" width="100%">
</p>

<table>
<tr>
<td valign="middle">

# Martin Utils

Discord-бот на [discord.js](https://discord.js.org/), собранный как набор лёгких утилитарных и развлекательных слэш-команд для сервера: обработка изображений (вставка в рамку) и всякая шуточная мелочь вроде генератора деморализующих фактов. Команды подключаются автоматически — новый файл в `src/commands` с полями `data` и `execute` сразу становится рабочей слэш-командой без правок в остальном коде.

</td>
<td width="140" align="right" valign="middle">
  <img src="media/239749018-2.jpeg" alt="Martin Utils avatar" width="120" height="120" style="border-radius:50%">
</td>
</tr>
</table>

---

## Структура и команды

### Структура проекта

```
martin-utils/
├── config.json              # token и clientId бота (не хранится в git)
├── package.json
├── media/
│   ├── frame.png             # золотая рамка для команды /framethis
│   ├── image 24.png          # header для README
│   └── 239749018-2.jpeg      # аватар для README
└── src/
    ├── bot.js                 # точка входа: загружает команды/события, регистрирует слэш-команды, логинится
    ├── deploy-commands.js      # отдельный скрипт для (пере)регистрации слэш-команд
    ├── commands/
    │   ├── image/
    │   │   └── framethis.js    # /framethis
    │   └── misc/
    │       └── demoralize.js   # /demoralize
    ├── events/
    │   ├── ready.js            # лог при успешном логине
    │   └── interactionCreate.js # обработка вызова слэш-команд
    └── media/
        └── frame.png
```

Все команды подгружаются автоматически из `src/commands/**` — новая команда достаточно добавить файлом с полями `data` и `execute`.

### Команды

| Команда | Категория | Описание |
|---|---|---|
| `/framethis image:<файл>` | image | Вставляет присланное изображение в золотую рамку (`media/frame.png`), автоматически определяя прозрачную область рамки |
| `/demoralize` | misc | Присылает случайный деморализующий факт из заранее заданного списка |

### Запуск

```bash
npm install
node src/bot.js
```

Перед запуском нужно создать `config.json` в корне проекта:

```json
{
  "token": "TOKEN_БОТА",
  "clientId": "ID_ПРИЛОЖЕНИЯ"
}
```
