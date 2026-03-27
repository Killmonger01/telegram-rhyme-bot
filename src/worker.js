require('dotenv').config();

const { Worker } = require('bullmq');
const { Telegraf } = require('telegraf');
const connectDB = require('./db');
const { generateRhymes } = require('./openai');
const RhymeRequest = require('./models/RhymeRequest');
const { connection } = require('./queue');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const WORKER_ID = process.env.WORKER_ID || '1';

connectDB();

const worker = new Worker(
  'rhymes',
  async (job) => {
    const { userId, username, chatId, word } = job.data;

    console.log(`[Worker ${WORKER_ID}] Обрабатываю: "${word}" для userId=${userId}`);

    const rhymes = await generateRhymes(word);

    // Сохраняем в MongoDB
    await RhymeRequest.create({ userId, username, word, rhymes });

    // Отправляем результат пользователю
    await bot.telegram.sendMessage(
      chatId,
      `🎵 *Рифмы к слову "${word}":*\n\n${rhymes}`,
      { parse_mode: 'Markdown' }
    );

    console.log(`[Worker ${WORKER_ID}] Готово: "${word}"`);
  },
  {
    connection,
    concurrency: 1, // каждый воркер берёт по одной задаче
  }
);

worker.on('completed', (job) => {
  console.log(`[Worker ${WORKER_ID}] Job ${job.id} выполнен`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker ${WORKER_ID}] Job ${job.id} упал:`, err.message);
});

console.log(`⚙️  Worker ${WORKER_ID} запущен, ждёт задачи...`);
