const Discord = require('discord.js');
const db = require('quick.db')
const request = require('request')

exports.run = async (client, msg, args) => {
    let prefix = await db.fetch(`${msg.guild.id}.prefix`) || client.ayarlar.prefix
    if(!args[0]) {
      return msg.channel.send(new Discord.RichEmbed().setDescription('Lütfen bir bot ID\'i giriniz!').setColor("RED"))
    }
    request(`https://xirbot.glitch.me/bot/${args[0]}`, function (error, response, body) {
    if (error) return msg.channel.send('Hata:', error);
    else if (!error) {
      var a = db.fetch(`botlar.${args[0]}.isim`)
      var b = db.fetch(`botlar.${args[0]}.id`)
      var c = db.fetch(`botlar.${args[0]}.avatar`)
      var d = db.fetch(`botlar.${args[0]}.prefix`)
      var e = db.fetch(`botlar.${args[0]}.kütüphane`)
      var g = db.fetch(`botlar.${args[0]}.kisa_aciklama`)
      var h = db.fetch(`botlar.${args[0]}.etiketler`)
      if(JSON.parse(body).destek_sunucusu === 'Belirtilmemiş') {
        var i = 'Belirtilmemiş'
      } else {
        var i = `[${a} Destek Sunucusu](${JSON.parse(body).destek_sunucusu})`
      }
      if(JSON.parse(body).web_sitesi === 'Belirtilmemiş') {
        var j = 'Belirtilmemiş'
      } else {
      var j = JSON.parse(body).web_sitesi
      }
      if(JSON.parse(body).github === 'Belirtilmemiş')  {
        var k = 'Belirtilmemiş'
      } else {
        var k = `[Github](${JSON.parse(body).github})`
      }
      var l = JSON.parse(body).sertifika
      var m = JSON.parse(body).durum
      var n = JSON.parse(body).oy_sayisi
    }
      
      request(`https://xirbot.glitch.me/bot`, function (errorr, responsee, bodyy) {
    if (errorr) return msg.channel.send('Hata:', errorr);
    else if (!errorr) {
    if (bodyy.includes(args[0])=== false) return msg.reply("Bu ID'de bir bot sistemde bulunmamaktadır!")
    }
       })
      
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(c)
    .setTitle(`XiR - Bot Arama`)
    .setDescription(`${a} (${b}) [${n} oy]`, c)
    .addField('Prefix', d)
    .addField('Sahip', f)
    .addField('Kısa Açıklama', g)
    .addField('Etiketler', h)
    .addField('Sertifika', l)
    .addField('Onay Durumu', m)
    .addField("Web Sitesi", j)
    .addField('Github', k)
    .addField('Destek Sunucusu', i)
    msg.channel.send({embed})
  })
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['search-bot', 'find-bot', 'botara'],
  permLevel: 0,
  kategori: 'genel'
};

exports.help = {
  name: 'bot-ara',
  description: 'DiscordBotsTR sistemindeki botları aramanızı sağlar.',
  usage: 'bot-ara [bot id]'
};