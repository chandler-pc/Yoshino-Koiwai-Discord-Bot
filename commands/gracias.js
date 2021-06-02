module.exports = {
    name: 'gracias',
    desc:'Agradece',
    execute(msg, args) {
    msg.channel.send(`${msg.author} te agradece.`)
}
}