# 🎵 Rhyme Bot

Telegram-бот на Node.js, который придумывает рифмы к словам с помощью OpenAI. Запросы сохраняются в MongoDB.

## Стек

- **Node.js** — основа
- **Telegraf** — библиотека для Telegram Bot API
- **OpenAI API** — генерация рифм через GPT-3.5
- **MongoDB + Mongoose** — хранение запросов

## Установка

### 1. Клонируй репозиторий и установи зависимости

```bash
npm install
```

### 2. Создай файл `.env`

Скопируй `.env.example` в `.env` и заполни:

```bash
cp .env.example .env
```

```env
TELEGRAM_BOT_TOKEN=  # токен от @BotFather
OPENAI_API_KEY=      # ключ от OpenAI
MONGODB_URI=         # строка подключения к MongoDB
```

### 3. Где взять токены

**Telegram Bot Token:**
1. Напиши [@BotFather](https://t.me/BotFather) в Telegram
2. Отправь `/newbot`
3. Следуй инструкциям — получишь токен вида `123456:ABC-DEF...`

**OpenAI API Key:**
1. Зайди на [platform.openai.com](https://platform.openai.com)
2. API Keys → Create new secret key

**MongoDB:**
- Локально: `mongodb://localhost:27017/rhyme-bot`
- Облако (бесплатно): [MongoDB Atlas](https://www.mongodb.com/atlas)

### 4. Запуск

```bash
# Обычный запуск
npm start

# С авто-перезапуском при изменениях (для разработки)
npm run dev
```

## Структура проекта

```
rhyme-bot/
├── src/
│   ├── index.js          # Главный файл, логика бота
│   ├── db.js             # Подключение к MongoDB
│   ├── openai.js         # Сервис генерации рифм
│   └── models/
│       └── RhymeRequest.js  # Mongoose модель
├── .env.example
├── package.json
└── README.md
```

## Что хранится в MongoDB

Каждый запрос сохраняется с полями:
- `userId` — Telegram ID пользователя
- `username` — username пользователя (если есть)
- `word` — слово, к которому искали рифмы
- `rhymes` — сгенерированные рифмы
- `createdAt` — дата и время запроса
