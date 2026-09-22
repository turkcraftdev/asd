const mineflayer = require('mineflayer');
const readline = require('readline');

// Sunucu Bilgileri
const IP = 'TurkCraft1.aternos.me';
const PORT = 57137;

// 50 Adet Gerçek / NameMC Tarzı Minecraft Kullanıcı Adı
const botNicks = [
  'Aetherial', 'Vort3x', 'Kryptic', 'Shadowless', 'ZynxHD', 
  'BlazeCraft', 'ViperX', 'Phant0m', 'NexusPvP', 'Kur0', 
  'Soraa', 'Ryuuk', 'ZeroPvP', 'SpectreX', 'Hyperion', 
  'RogueOne', 'Oblivi0n', 'Zenith', 'Ech0', 'Frosty', 
  'Titanium', 'Astral', 'ApexPredator', 'PulseFX', 'Vanguard', 
  'Eclipse', 'Sirenn', 'Voltt', 'Nyxian', 'OnyxPvP', 
  'Solstice', 'CipherX', 'Havoc', 'LethalX', 'Venomous', 
  'Rift', 'Zephyros', 'Drift3r', 'SlayerHD', 'Mirage', 
  'Novah', 'Orionn', 'Krest', 'Talonn', 'Axell', 
  'Jinxx', 'Kaisa', 'SaberX', 'Reaper', 'Frenzy'
];

const bots = {};

// Terminalden (konsoldan) yazı yazabilmek için arayüz
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createBotInstance(nick) {
  console.log(`[+] ${nick} sunucuya baglanıyor...`);

  const bot = mineflayer.createBot({
    host: IP,
    port: PORT,
    username: nick,
    version: false
  });

  bot.on('spawn', () => {
    console.log(`[✓] ${nick} sunucuya başarıyla girdi!`);
  });

  bot.on('chat', (username, message) => {
    console.log(`[Sohbet - ${nick}] ${username}: ${message}`);
  });

  // Sunucudan atılma veya bağlantı kopma durumu
  bot.on('end', () => {
    console.log(`[-] ${nick} sunucudan ayrıldı/atıldı. 10 saniye sonra tekrar denenecek...`);
    delete bots[nick];
    
    // Tekrar girerken 10 saniye bekler
    setTimeout(() => {
      bots[nick] = createBotInstance(nick);
    }, 10000);
  });

  bot.on('error', (err) => {
    console.log(`[!] ${nick} Hata aldı:`, err.message);
  });

  return bot;
}

// Botları 5'er saniye arayla sırayla oyuna sokma döngüsü
console.log(`=== 50 Botlu NameMC Sistem Başlatılıyor (5 sn aralıkla) ===\n`);

botNicks.forEach((nick, index) => {
  setTimeout(() => {
    bots[nick] = createBotInstance(nick);
  }, index * 5000); // 5000 ms = 5 saniye
});

// Konsoldan yazılan komutu aktif olan tüm botlara aynı anda gönderir
rl.on('line', (line) => {
  if (line.trim() === '') return;

  console.log(`[Konsol Komutu] ${Object.keys(bots).length} Bota Gönderiliyor: ${line}`);
  
  Object.values(bots).forEach((bot) => {
    if (bot && bot.chat) {
      try {
        bot.chat(line);
      } catch (err) {
        // Bot henüz tam doğmadıysa hata vermesini engeller
      }
    }
  });
});