module.exports = {
	name: 'waifu',
	desc: 'Te muestra una waifu',
	execute(msg, args) {
    const fetch = require('node-fetch');
    sfw =  ["waifu","neko","shinobu","megumin","bully","cuddle","cry","hug","awoo","kiss","lick","pat","smug","bonk","yeet","blush","smile","wave","highfive","handhold","nom","bite","glomp","slap","kill","happy","wink","poke","dance","cringe","blush"];
    nsfw = ["waifu","neko", "trap", "blowjob"];
    if(args[0]=='nsfw' || args[0]=='r34'){
      if(!msg.channel.nsfw){
        return msg.channel.send("No es un canal NSFW :angry:");
      }
      if(args[0]=='nsfw'){
        fetch(`https://waifu.pics/api/nsfw/${nsfw[Math.floor(Math.random() * 4)]}`)
          .then(res => res.json())
          .then(data =>{msg.channel.send(JSON.stringify(data.url,null,1).replace('"','').replace('"',''))});
        return null;
      }
      if(args[0]=='r34'){
        let busq = "";
        const n = args.length;
        if(n==1){
          return msg.channel.send('Debes buscar algo :(');
        }
        for(let i=1; i<n;i++){
            if(i===n-1){
                busq += `${args[i]}`
            }else{
                busq += `${args[i]}_`
            }
        }
        fetch(`https://r34-json-api.herokuapp.com/posts?tags=${busq}`)
          .then(res => res.json())
          .then(data =>{
        const x = Math.floor(Math.random() * data.length);
        if(data[x] != undefined){
          return msg.channel.send(JSON.stringify(data[x].file_url,null,1).replace('"','').replace('"',''))
        }
          return msg.channel.send("Eso no existe :(");
        })
        return null;
      }
    }
    fetch(`https://waifu.pics/api/sfw/${sfw[Math.floor(Math.random() * 31)]}`)
      .then(res => res.json())
      .then(data =>{msg.channel.send(JSON.stringify(data.url,null,1).replace('"','').replace('"',''))});
	}
};