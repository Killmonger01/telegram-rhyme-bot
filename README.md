# Rhyme Bot

## Запуск

Заполни `.env`:

```env
TELEGRAM_BOT_TOKEN=your_token
OPENAI_API_KEY=your_key
MONGODB_URI=your_mongodb_atlas_uri
REDIS_HOST=redis
REDIS_PORT=6379
```

```bash
docker-compose up --build
```