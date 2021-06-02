module.exports = {
    args:true,
    usage: '<destino> <texto>',
    name: 'trad',
    desc:'Traduce usando Microsoft Translator',
    help:'Para ver los idiomas disponibles escribe \'porfi trad idiomas\'',   
    execute(msg, args) {
      const id=['af','ar','bn','bs','bg','yue','ca','zh-Hans','zh-Hant','hr','cs','psr','da','nl','en','et','fj','fil','fi','fr','de','el','gu','ht','he','hi','mww','hu','is','id','ga','it','ja','kn','kk','sw','tlh-Latn','tlh-Piqd','ko','ku','kmr','lv','lt','mg','ms','ml','mt','mi','mr','nb','or','ps','fa','pl','pt-br','pt-pt','pa','otq','ro','ru','sm','sr-Cyrl','sr-Latn','sk','sl','es','sv','ty','ta','te','th','to','tr','uk','ur','vi','cy','yua'];
      var idc =['Afrikaans','Arabic','Bangla','Bosnian (Latin)','Bulgarian','Cantonese (Traditional)','Catalan','Chinese Simplified','Chinese Traditional','Croatian','Czech','Dari','Danish','Dutch','English','Estonian','Fijian','Filipino','Finnish','French','German','Greek','Gujarati','Haitian Creole','Hebrew','Hindi','Hmong Daw','Hungarian','Icelandic','Indonesian','Irish','Italian','Japanese','Kannada','Kazakh','Kiswahili','Kiswahili','Klingon','Klingon (plqaD)','Korean','Kurdish (Central)','Kurdish (Northern)','Latvian','Lithuanian','Malagasy','Malay','Malayalam','Maltese','Maori','Marathi','Norwegian','Odia','Pashto','Persian','Polish','Portuguese (Brazil)','Portuguese (Portugal)','Punjabi','Queretaro Otomi','Romanian','Russian','Samoan','Serbian (Cyrillic)','Serbian (Latin)','Slovak','Slovenian','Spanish','Swedish','Tahitian','Tamil','Telugu','Thai','Tongan','Turkish','Ukrainian','Urdu','Vietnamese','Welsh','Yucatec Maya'];
      require('dotenv').config();
      const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
      const request = require('request');
      if(args[0]=='idiomas'){
        var idm="";
        for(var i=0; i<id.length;i++){
          idm+=`${idc[i]} = ${id[i]}\n`;
        }
        const embed = new MessageEmbed()
          .setDescription(idm)
          .setTitle("Idiomas Disponibles")
          .setColor(0x8013A1);
        msg.author.send(embed);
        return;
      }
      const { v4: uuidv4 } = require('uuid');
      let eapi='MICROSOFT_TRANSLATOR_TOKEN'
      let api=process.env[eapi]
      let eep='MICROSOFT_TRANSLATOR_ENDPOINT'
      let endpoint=process.env[eep]
      const idioma_destino=args[0];
      var text=" ";
      for(var i=1; i<args.length;i++){
        text += args[i] +" ";
      }
if(id.includes(args[0].toLowerCase())){
function translateText(){
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'translate',
        qs: {
          'api-version': '3.0',
          'to': [`${idioma_destino}`]
        },
        headers: {
          'Ocp-Apim-Subscription-Key': api,
          'Ocp-Apim-Subscription-Region': 'canadacentral',
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        body: [{
              'text': `${text}`
        }],
        json: true,
    };
     request(options, function(err, res, body){
        const txt=JSON.stringify(body[0].translations[0].text,null ,1);
        const frm=JSON.stringify(body[0].detectedLanguage.language,null ,1);
        const to=JSON.stringify(body[0].translations[0].to,null ,1);
        const embed = new MessageEmbed()
          .setTitle(`Microsoft Translator`)
          .setColor(0x8013A1)
          .setDescription(`Idioma detectado : ${frm}\nTraducido a : ${to}\n\n${txt}`)
        msg.channel.send(embed);
        });
};
translateText();
}else{
  msg.channel.send(`${msg.author} ese no es un idioma válido, escriba \`porfi trad idiomas\` para ver una lista completa de los idiomas disponibles`);
}
}
}