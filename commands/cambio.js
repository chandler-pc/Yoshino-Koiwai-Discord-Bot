module.exports = {
  args : true,
  name : "cambio",
  desc : "Cambio de divisas",
  usage : "<inicio> <destino> <valor>",
  execute(msg, args){
    const fetch = require('node-fetch');
    const ini = args[0].toUpperCase();
    const fin = args[1].toUpperCase();
    const valor = args[2];
    fetch(`https://api.cambio.today/v1/quotes/${ini}/${fin}/json?quantity=${valor}&key=5076|KgS6sgCBLvVbhkgpnbvphUh91QnDz_oT`)
      .then(res => res.json())
      .then(data => {
        const monto=JSON.stringify(data.result.amount,null,1);
        msg.reply(`la conversión a ${fin} de ${valor} ${ini} es ${monto}`);
      })
      .catch(err => console.log(err));
  }
}