module.exports = {
    name: 'come',
    desc:'Ñam',
    execute(msg, args) {
    const taguser=msg.mentions.users.first();
        if(!msg.mentions.users.size){
        msg.channel.send(`${msg.author} se está comiendo así mismo.`);
        }else{
        msg.channel.send(`${msg.author} está comiendo a ${taguser}`)
        }
        msg.react('😂')
    },
};