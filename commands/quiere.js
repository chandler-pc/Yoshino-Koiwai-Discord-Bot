module.exports = {
    name: 'quiere',
    desc:'Muestra que el bot te quiere',
    execute(msg, args) {
    const taguser=msg.mentions.users.first();
        if(!msg.mentions.users.size){
        msg.channel.send(`Yoshino te quiere ${msg.author} :heart:`);
        }else{
        msg.channel.send(`Yoshino quiere a ${taguser} :heart:`)
        }
        msg.react('❤')
    },
};