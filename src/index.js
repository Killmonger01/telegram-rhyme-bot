require('dotenv').config();

const { Telegraf } = require('telegraf');
const { rhymeQueue } = require('./queue');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  const name = ctx.from.first_name || 'друг';
  ctx.reply(
    `Привет, ${name}! 👋\n\n` +
    `Отправь мне слово — придумаю рифмы! 🎵`
  );
});

bot.help((ctx) => {
  ctx.reply('Отправь любое слово, например: `кот`, `небо`, `любовь`', {
    parse_mode: 'Markdown',
  });
});

bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();

  if (text.startsWith('/')) return;

  const words = text.split(',').map((w) => w.trim()).filter(Boolean);

  for (const word of words) {
    await rhymeQueue.add('generate', {
      userId: ctx.from.id,
      username: ctx.from.username || null,
      chatId: ctx.chat.id,
      word,
    });
  }

  const label = words.length === 1
    ? `слову "${words[0]}"`
    : `словам: ${words.map((w) => `"${w}"`).join(', ')}`;

  await ctx.reply(`⏳ Генерирую рифмы к ${label}...`);
});

bot.launch();
console.log('🤖 Бот запущен!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));