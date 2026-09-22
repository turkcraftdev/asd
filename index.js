const express = require('express');
const mineflayer = require('mineflayer');

// 1. Render'ın uykuya geçmemesi için Web Sunucusu
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Turk_AFK Botu 7/24 Aktif!');
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} portunda çalışıyor.`);
});

// 2. Sunucu Bilgilerin (TurkCraft1.aternos.me:57137)
const serverOptions = {
  host: 'TurkCraft1.aternos.me',
  port: 57137,
  username: 'Turk_AFK',
  version: false // Sunucu sürümünü otomatik algılar
};

function createBot() {
  console.log('Turk_AFK sunucuya bağlanıyor...');
  const bot = mineflayer.createBot(serverOptions);

  // Bot oyuna başarıyla girdiğinde
  bot.on('spawn', () => {
    console.log('Turk_AFK sunucuya bağlandı ve AFK bekliyor!');
  });

  // Sunucudan düşerse veya Aternos kapanırsa 15 saniye sonra tekrar dene
  bot.on('end', (reason) => {
    console.log(`Bot sunucudan ayrıldı/düştü (${reason}). 15 saniye sonra tekrar bağlanılacak...`);
    setTimeout(createBot, 15000);
  });

  // Bağlantı hatası alsa bile botun çökmesini engelle
  bot.on('error', (err) => {
    console.log('Bağlantı hatası:', err.message);
  });
}

// Botu Başlat
createBot();
