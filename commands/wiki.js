module.exports = {
    args:true,
    usage: '<búsqueda>',
    name: 'wiki',
    desc:'Busca articulos en wikipedia',
    execute(msg, args) {
        var iconv = require('iconv-lite');
        const Canvas = require('canvas');
        const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
        const cheerio = require('cheerio');
        const n=args.length
        var busq=""
        for(var i=0; i<n;i++){
            if(i===n-1){
                busq += `${args[i]}`
            }else{
                busq += `${args[i]}+`
            }
        }
        busq=encodeURI(busq);
        const url_bus=`https://es.wikipedia.org/w/index.php?sort=relevance&search=${busq}&title=Especial:Buscar&profile=advanced&fulltext=1&advancedSearch-current=%7B%7D&ns0=1&ns100=1&ns104=1`
        const rp = require('request-promise');
        const p= [];
        var nurl;
        try{
            rp(url_bus).then(bhtml =>{
                const $$ = cheerio.load(bhtml);
                $$('.mw-search-exists').remove();
                $$('#searchdidyoumean').remove();
                $$('.mw-search-createlink').remove();
                var purl=$$('.mw-search-result-heading a',bhtml).attr('href');
                purl=iconv.encode(purl,'utf-8')
                nurl=`https://es.wikipedia.org${purl}`;
                rp(nurl).then(async html => {
                    const $ = cheerio.load(html);
                    $('.caja-tabla').remove();
                    $('.noprint').remove();
                    var img = $('#bodyContent img',$.html()).attr('src');
                    $('#content #bodyContent #mw-content-text .mw-parser-output table').remove();
                    const tt = $('.firstHeading',html).text();
                    const txt= $('p',$.html());
                    txt.each((i,parrafo) => {
                       p[i]=$(parrafo);
                     });
                    var info;
                     if(p[0].text().length===1){
                         info=p[1].text();
                     }else{
                        info=p[0].text();
                     }
                     if(img[0]=='/' && img[1]=='/'){
                       img=`https:${img}`;
                     }
                    nurl=iconv.encode(nurl,'utf-8');
                    const embed = new MessageEmbed()
                      .setTitle(`${tt}`)
                      .setColor(0x8013A1)
                      .setAuthor('Wikipedia','https://i.imgur.com/drRa9Zf.png')
                      .setImage(`${img}`)
                      .setURL(`${nurl}`)
                      .setDescription(`${info}`)
                   msg.channel.send(embed);
            })
            }).catch(error => {
                 console.log(error);
                 msg.channel.send('Argumento no válido, prueba quitar las tildes.')
            })
        }catch (error) {
      	  console.error(error);
	        msg.channel.send('Sorry mañana programo esto :(');
        }
    },
};