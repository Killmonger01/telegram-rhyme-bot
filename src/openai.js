const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateRhymes = async (word) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'Ты выдаёшь только список слов-рифм. Рифма — это слово с похожим окончанием. ' +
          'Пример: стас → глас, бас, квас, пласт, час, лас-вегас. ' +
          'Только отдельные слова, каждое с новой строки. ' +
          'Никаких стихов, предложений, объяснений. Только слова.',
      },
      {
        role: 'user',
        content: `Придумай рифмы к слову: "${word}"`,
      },
    ],
    max_tokens: 300,
    temperature: 0.8,
  });

  return completion.choices[0].message.content.trim();
};

module.exports = { generateRhymes };
