const express = require('express');
const mineflayer = require('mineflayer');

// 1. Render'ın kapanmaması için Web Sunucusu
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Turk_AFK Botu 7/24 Aktif!');
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} portunda çalışıyor.`);
});

// 2. Aternos / Minecraft Sunucu Ayarları
const serverOptions = {
  host: 'SENIN_ATERNOS_IPN.aternos.me', // <-- BURAYA kendi Aternos IP'ni yaz (Örn: pikselpiksele.aternos.me)
  port: 25565,                           // Portun farklıysa değiştir
  username: 'Turk_AFK',                  // Botun kullanıcı adı
  version: false                         // Otomatik sürüm algılama (Gerekirse '1.20.1' gibi elle yazabilirsin)
};

function createBot() {
  console.log('Turk_AFK sunucuya bağlanıyor...');
  const bot = mineflayer.createBot(serverOptions);

  // Bot sunucuya girdiğinde
  bot.on('spawn', () => {
    console.log('Turk_AFK başarıyla sunucuya giriş yaptı!');
  });

  // Chat mesajı gelince konsola yazdır (İsteğe bağlı)
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`<${username}> ${message}`);
  });

  // Sunucudan düşerse veya kick yerse otomatik tekrar bağlan
  bot.on('end', (reason) => {
    console.log(`Bot sunucudan ayrıldı/düştü. Nedeni: ${reason}`);
    console.log('15 saniye sonra tekrar bağlanılacak...');
    setTimeout(createBot, 15000);
  });

  // Hata alırsa konsola yaz ve çökmesini engelle
  bot.on('error', (err) => {
    console.log('Bir hata oluştu:', err);
  });
}

// Botu Başlat
createBot();
