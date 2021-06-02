module.exports={
  args:true,
  usage:'<mención>',
  name:'simp',
  desc:'Simpea a alguien',
  execute(msg,args){
    const simp= msg.mentions.users.first();
    msg.channel.send(`¡${simp} eres un SIMP!`);
  }
}