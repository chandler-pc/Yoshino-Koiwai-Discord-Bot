module.exports = {
    args:true,
    usage: '<operaciones>',
    name: 'calc',
    desc:'Pequeña calculadora',
    execute(msg, args) {
    var alg = require("algebra.js");
    var ope="";
    for(var i=0; i<args.length;i++){
      ope+=args[i];
    }
    var exp= new alg.parse(`${ope}`)
    msg.channel.send(`La respuesta es ${exp}`)
}
}