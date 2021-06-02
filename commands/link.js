module.exports = {
  name : "link",
  desc : "Invita el bot a tu server.",
  execute(msg,args){
    const {MessageEmbed, MessageAttachment } = require('discord.js');
    const embed = new MessageEmbed()
      .setTitle('Invitación')
      .setColor(0x8013A1)
      .setURL('https://discord.com/api/oauth2/authorize?client_id=740656684334317639&permissions=8&scope=bot')
          .setTimestamp()
    msg.channel.send(embed);
  }
}