const { Guild } = require("discord.js");
module.exports = {
    name: 'info',
    desc:'Muestra información sobre el bot',
    execute(msg, args) {
        const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
        const embed = new MessageEmbed()
          .setTitle('Información sobre mi.')
          .setColor(0x8013A1)
          .setAuthor('¡Soy Yoshino!','https://i.imgur.com/Kqcg5Ku.jpg')
          .setDescription('Intento de bot hecho por chxndlerpc.')
          .setTimestamp()
        msg.channel.send(embed);
	},
};