const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token, {
  polling: true
});

const random = max => {
  return Math.floor(Math.random() * (max - 0));
};

const randomCollection = () => {
  const photoCollections = [0, 100, 200];
  return photoCollections[Math.floor(Math.random() * photoCollections.length)];
};

bot.onText(/\paehali/, msg => {
  const chatId = msg.chat.id;
  const user_profile = bot.getUserProfilePhotos(
    process.env.GALLERY,
    randomCollection()
  );

  user_profile.then(res => {
    const file_id = res.photos[random(res.photos.length)][0].file_id;
    const file = bot.getFile(file_id);
    file.then(result => {
      bot.sendPhoto(chatId, result.file_id);
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
