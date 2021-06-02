// Declaración de constantes
require('dotenv').config();
const fs = require('fs');
const pf = 'porfi ';
const Discord = require('discord.js');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
registerFont('./Impact.ttf', { family: 'Impact' });
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
var inipre = false;
module.exports={client,inipre};
//Server
const keepAlive = require('./server');
const Monitor = require('ping-monitor');

keepAlive();
const monitor = new Monitor({
  website: 'https://Server-Bot-Yoshino.chandlerpc.repl.run',
  title: 'Secundario',
  interval: 5 // minutes
});

monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`));
monitor.on('error', (error) => console.log(error));
/////////////////////////////////////////////////////

//Conexión bot-token
client.login(process.env.DISCORD_TOKEN);

//Inicio de sesión
client.once('ready', () => {
  console.log(`Sesión iniciada como ${client.user.tag}`);
  client.user.setActivity(`in ${client.guilds.cache.size} servers.`, { type: 'PLAYING' });
  
  const Guilds = client.guilds.cache.map(guild => guild.name);
  console.log(Guilds);
});

//Mensajes
client.on('message', msg =>{
  if (!msg.content.toLowerCase().startsWith(pf) || msg.author.bot) return;
  const args = msg.content.slice(pf.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName))
    return msg.channel.send('Ese no es un comando válido.');

  const command = client.commands.get(commandName);
  if (command.args === true && args.length === 0) {
    let reply = `No escribiste argumentos, ${msg.author}`;
    if (command.usage) {
      reply += `\nDebes usar el comando así: \`${pf}${command.name} ${command.usage}\``;
    }

    return msg.channel.send(reply);
  }
  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('ocurrió un error al ejecutar el comando.');
  }
});

client.on('guildCreate', ()=>{
  client.user.setActivity(`in ${client.guilds.cache.size} servers.`, { type: 'PLAYING' });
})

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');

  let fontSize = 70;

  do {
    ctx.font = `${fontSize -= 10}px Impact`;
  } while (ctx.measureText(text).width > canvas.width - 300);
  return ctx.font;
};
//Nuevo miembro en server
client.on('guildMemberAdd', async member => { 
  const channel = member.guild.channels.cache.find(ch => ch.name === `general`);
  if (!channel) {
    console.log('El canal no existe')
    return;
  } else {
    var n = Math.floor(4 * Math.random()+1);
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(`./wall${n}.jpg`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = '28px Impact';
    ctx.fillStyle = '#000000';
    ctx.fillText(`¡Bienvenido a ${channel.guild.name},`, canvas.width / 2.5, canvas.height / 3.5);
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#000000';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    channel.send(`Hola ${member.user}, bienvenido a ${member.guild.name}, diviertete :)`)
    channel.send(attachment);
  }
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === `general`);

  if (!channel) {
    console.log('El canal no existe');
   return;
 } else {
   channel.send(`${member.user.username} nos dejó.`);
 }
});

client.on('guildCreate',guild=>{
  var channel = guild.channels.cache.filter(ch => ch.type === "text").find(x => x.position === 0);
  if (!channel) {
    console.log('El canal no existe');
    return;
  } else {
    const embed = new MessageEmbed()
      .setTitle('¡Gracias por agregarme al servidor!')
      .setDescription(`Soy un bot con varias funciones y tal vez tengo la intención de entretenerte OwO.\nPara ver todas mis funciones escribe \`porfi ayuda\``)
      .setColor(0x8013A1)
      .setAuthor('¡Yoshino Koiwai!')
      .setImage('https://i.imgur.com/deVyg8T.jpg')
      .setTimestamp();
    channel.send(embed);
  }
})