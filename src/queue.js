const { Queue } = require('bullmq');

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

const rhymeQueue = new Queue('rhymes', { connection });

module.exports = { rhymeQueue, connection };
