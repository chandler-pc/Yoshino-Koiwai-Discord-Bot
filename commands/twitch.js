module.exports ={
  name:'twitch',
  desc:'Mi canal de Twitch :+1:',
  execute(msg,args){
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
      .setColor(0x8013A1)
      .setTitle('chxndlerpc')
      .setThumbnail('https://www.freepnglogos.com/uploads/twitch-tv-logo-vector-png-24.png')
      .setURL("https://www.twitch.tv/chxndlerpc")
      .setImage("https://i.imgur.com/0hEu6ny.jpg")
      .setDescription(`Vení y seguime en [Twitch](https://www.twitch.tv/chxndlerpc) pibe uwu\n\n||***<https://www.twitch.tv/chxndlerpc>***||`);
    msg.channel.send(embed);
  }
}