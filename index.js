const TelegramBot = require('node-telegram-bot-api');
const token = '523920852:AAHcCbOpilqhHuVxj_Vf6ZwvanJfg_g-6a0';
const bot = new TelegramBot(token, {polling: true});

var fs=require('fs');
var cl=fs.readFileSync('clues.json', 'utf8');
var clues=JSON.parse(cl);

function send(chatId,msg){
  var type = msg.substring(0,4);
  var m = msg.substring(4,msg.length);
  if(type=="img:"){
    bot.sendPhoto(chatId,m);
  }
  else if(type=="aud:"){
    bot.sendAudio(chatId,m);
  }
  else if(type=="vid:"){
    bot.sendVideo(chatId,m);
  }
  else if(type=="txt:"){
    bot.sendMessage(chatId,m);
  }

}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  var l = msg.text.substring(msg.text.lastIndexOf("l")+1,msg.text.lastIndexOf("c"));
  var c = msg.text.substring(msg.text.lastIndexOf("c")+1,msg.text.length);

  if(msg.text=="/start"){
    bot.sendMessage(chatId,"Welcome to Glitch Clue Bot\n\nusage :\n for 1st clue for level 1, type l1c1\n for 2nd clue for level 5, type l5c2 ")
  }

  else if(msg.text.match(/(l)[0-9]+(c)[0-9]+/)){
    if(clues[l-1]){
      if(clues[l-1].c[c-1]){
        send(chatId,clues[l-1].c[c-1]);
      }
      else{
        bot.sendMessage(chatId,"clue not available at the moment");
      }
    }
    else{
      bot.sendMessage(chatId,"clue not available at the moment");
    }
  }

  else {
    bot.sendMessage(chatId,"i didn't get you");
  }

});
