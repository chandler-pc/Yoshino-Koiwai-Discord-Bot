module.exports = {
    name: 'ayuda',
    desc: 'Muestra comandos del bot',
    execute(msg, args) {
      const pf = 'porfi ';
      const data = [];
      const {MessageEmbed} = require('discord.js');
      const { commands } = msg.client;
      if(!args.length){
        data.push('Esta es una lista de todos los comandos :');
        data.push(commands.map(command => `- **${pf}${command.name}** : ${command.desc}`).join('\n'));
        data.push(`\nPuedes escribir \`${pf}ayuda <comando>\` para obtener información sobre ese comando.`);
        const embed = new MessageEmbed()
          .setColor(0x8013A1)
          .setDescription(data)
          .setTitle('Comandos');
        return msg.author.send(embed).then(() => {
		      if (msg.channel.type === 'dm') return;
		      msg.reply(' te envié un mensaje con todos mis comandos.');
	      }).catch(error => {
		      console.error(`No pude enviarte un mensaje ${msg.author.tag}.\n`, error);
	      	msg.reply('¿Tienes los mensajes directos deshabilitados?');
      	});
      }else{
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
	        return msg.reply('ese no es un comando válido.');
        }
        data.push(`**Nombre:** ${command.name}`);
        data.push(`**Descripción:** ${command.desc} `);
        if(command.usage){data.push(`**Uso:** \`${pf}${command.name} ${command.usage}\``);}else{data.push(`**Uso:** \`${pf}${command.name}\``);}
        if(command.help){data.push(`\n${command.help}`);}
        const embed = new MessageEmbed()
          .setColor(0x8013A1)
          .setDescription(data)
          .setTitle(`Ayuda de ${command.name}`);
        msg.channel.send(embed);
      }
	}
};