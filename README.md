# 🎵 Rhyme Bot

Telegram-бот на Node.js, который придумывает рифмы к словам с помощью OpenAI. Запросы сохраняются в MongoDB.

## Стек

- **Node.js**
- **Telegraf** — Telegram Bot API
- **OpenAI API** — генерация рифм через GPT
- **MongoDB + Mongoose** — хранение запросов

## Установка и запуск

```bash
npm install
```

Создай файл `.env` в корне проекта и вставь свои значения:

```env
TELEGRAM_BOT_TOKEN=your_token
OPENAI_API_KEY=your_key
MONGODB_URI=your_mongodb_uri
```

```bash
npm start
```

## Структура проекта

```
rhyme-bot/
├── src/
│   ├── index.js               # Главный файл, логика бота
│   ├── db.js                  # Подключение к MongoDB
│   ├── openai.js              # Сервис генерации рифм
│   └── models/
│       └── RhymeRequest.js    # Mongoose модель
├── .env
├── package.json
└── README.md
```