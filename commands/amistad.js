module.exports = {
	name: 'amistad',
	desc: 'Hace relaciones de amistad',
	execute(msg, args) {
		const user = msg.guild.members.cache.random();
		msg.channel.send(`Ahora ${msg.author} y ${user.user} son mejores amigos.`);
	}
};
