const { Telegraf } = require('telegraf');
const fs = require('fs');

const bot = new Telegraf('6897579992:AAGt9vvkHDCUcCC_YMarJBbr8nU-t_ikMRY');

// Обработчик команды /setid
bot.command('setid', async (ctx) => {
  const userId = ctx.from.id;

  // Чтение данных из файла
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
  }

  // Проверка наличия userId в данных
  if (!data.includes(userId)) {
    // Добавляем userId
    data.push(userId);

    // Запись данных в файл
    try {
      fs.writeFileSync('data.json', JSON.stringify(data));
      ctx.reply('Ваш ID успешно сохранен');
    } catch (error) {
      console.error('Ошибка записи файла:', error);
      ctx.reply('Произошла ошибка при сохранении ID');
    }
  } else {
    ctx.reply('Ваш ID уже сохранен');
  }
});

// Обработчик команды /id
bot.command('id', async (ctx) => {
  const userId = ctx.from.id;

  // Чтение данных из файла
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync('data.json'));
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
  }

  // Проверка наличия userId в данных
  if (data.includes(userId)) {
    ctx.reply(`Ваш ID: ${userId}`);
  } else {
    ctx.reply('Ваш ID не найден');
  }
});

bot.launch();
