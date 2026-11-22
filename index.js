require('dotenv').config();
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { REST, Routes, EmbedBuilder } = require('discord.js');
const { inject } = require('@vercel/analytics');
const { Readable } = require('stream');

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    status: 429,
    success: false,
    error: 'Terlalu banyak permintaan. Coba lagi dalam 1 menit.'
  }
});

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send', limiter, async (req, res) => {
  const { username, email, message } = req.body;

  if (!username || !email || !message) {
    return res.status(400).json({
      status: 400,
      success: false,
      error: 'Nama, email, dan pesan tidak boleh kosong!'
    });
  }

  const embedMessage = new EmbedBuilder()
    .setColor('Green')
    .setTitle(`${username} | ${email}`)
    .addFields({ name: 'Pesan:', value: `${message}` })
    .setTimestamp();

  try {
    await rest.post(Routes.channelMessages(process.env.CHANNEL_ID), {
      body: {
        embeds: [embedMessage.toJSON()]
      }
    });

    return res.status(200).json({
      status: 200,
      success: true,
      info: 'Pesan berhasil dikirim ke Discord!'
    });

  } catch (error) {
    console.error('[DISCORD SEND ERROR]', error);

    return res.status(500).json({
      status: 500,
      success: false,
      error: 'Gagal mengirim pesan ke Discord.'
    });
  }
});

//sitemap
app.get('/sitemap.xml', (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ranggarizky.my.id/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(xml);
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

inject();

module.exports = app;
