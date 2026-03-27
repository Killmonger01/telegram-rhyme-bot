require('dotenv').config();

const { Telegraf } = require('telegraf');
const connectDB = require('./db');
const { generateRhymes } = require('./openai');
const RhymeRequest = require('./models/RhymeRequest');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Подключаемся к MongoDB при старте
connectDB();

// Команда /start
bot.start((ctx) => {
  const name = ctx.from.first_name || 'друг';
  ctx.reply(
    `Привет, ${name}! 👋\n\n` +
    `Я умею придумывать рифмы к любым словам.\n` +
    `Просто отправь мне слово — и я отвечу рифмами! 🎵`
  );
});

// Команда /help
bot.help((ctx) => {
  ctx.reply(
    '📖 *Как пользоваться:*\n\n' +
    'Отправь любое слово — и я придумаю к нему рифмы.\n\n' +
    'Например: `кот`, `небо`, `любовь`',
    { parse_mode: 'Markdown' }
  );
});

// Обработка текстовых сообщений
bot.on('text', async (ctx) => {
  const word = ctx.message.text.trim();

  // Игнорируем команды
  if (word.startsWith('/')) return;

  // Проверка: только одно слово
  if (word.split(' ').length > 1) {
    return ctx.reply('Пожалуйста, отправь одно слово 🙏');
  }

  // Показываем что бот "думает"
  await ctx.sendChatAction('typing');

  try {
    const rhymes = await generateRhymes(word);

    // Сохраняем запрос в MongoDB
    await RhymeRequest.create({
      userId: ctx.from.id,
      username: ctx.from.username || null,
      word,
      rhymes,
    });

    await ctx.reply(
      `🎵 *Рифмы к слову "${word}":*\n\n${rhymes}`,
      { parse_mode: 'Markdown' }
    );
  } catch (err) {
    console.error('Ошибка при генерации рифм:', err.message);
    await ctx.reply('😔 Что-то пошло не так. Попробуй ещё раз.');
  }
});

// Запуск бота
bot.launch();
console.log('🤖 Бот запущен!');

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
