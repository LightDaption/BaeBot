 /**
  * AUTHOR          : Light
  * PROJECT         : Cara
  * UPDATED DATE    : 04/26/21
  * 
  * CLASS           : Command helpers
  * DESCRIPTION     : Functions for command related commands and functionality
  */

 /*jshint esversion: 8 */

 // -> IMPORTS <-
 const request          = require('request');
 const generic_helpers  = require("./generic_helpers.js");
 const APIConfig        = require('../configurations/APIConfig.json');
 const Discord          = require('discord.js');

 module.exports = {

    //!I stupidly hard coded Cara's emotion things into this function. If you cut her stuff out you'll be able to look at it without throwing up.
     handlesfw(client, message, args, authorNickname, targetNickname, guild) {
         if (args[0] === "slap") {
             let c = generic_helpers.randomInt(100);
             if (c < 90) {
                 request({
                     url: "https://nekos.life/api/v2/img/" + APIConfig.neko.sfw[args[0]].key,
                     json: true
                 }, async function (
                     error,
                     response,
                     body
                 ) {
                     let addition = APIConfig.neko.sfw[args[0]].d2 != "" ? " " + APIConfig.neko.sfw[args[0]].d2 : "";

                     let authorField = APIConfig.neko.sfw[args[0]].act ? "*" + targetNickname + " " + APIConfig.neko.sfw[args[0]].d1 + " " + authorNickname + addition + "*" : "*" + APIConfig.neko.sfw[args[0]].key + "*";
                     let henEmbed = new Discord.MessageEmbed()
                         .setColor("#f096ea")
                         .setDescription(authorField)
                         .setImage(body.url)
                         .setFooter("Powered by " + APIConfig.neko.poweredby[Math.floor(Math.random() * APIConfig.neko.poweredby.length)]);
                     await new Promise(resolve => setTimeout(resolve, 3000));
                     message.channel.send(henEmbed);
                 });
             }
         } else if (["pat", "poke", "weeb", "baka", "dog", "cat", "goose", "lizard", "feed", "kiss", "gasm", "hug", "tickle", "cuddle", "smug"].indexOf(args[0]) > -1 && message.author.id == "783900884287356929") {
             let c = generic_helpers.randomInt(100);
             if (c < 20) {
                 request({
                     url: "https://nekos.life/api/v2/img/" + APIConfig.neko.sfw["kiss"].key,
                     json: true
                 }, async function (
                     error,
                     response,
                     body
                 ) {
                     let addition = APIConfig.neko.sfw["kiss"].d2 != "" ? " " + APIConfig.neko.sfw["kiss"].d2 : "";

                     let authorField = APIConfig.neko.sfw["kiss"].act ? "*" + targetNickname + " " + APIConfig.neko.sfw["kiss"].d1 + " " + authorNickname + addition + "*" : "*" + APIConfig.neko.sfw["kiss"].key + "*";
                     let henEmbed = new Discord.MessageEmbed()
                         .setColor("#f096ea")
                         .setDescription(authorField)
                         .setImage(body.url)
                         .setFooter("Powered by " + APIConfig.neko.poweredby[Math.floor(Math.random() * APIConfig.neko.poweredby.length)]);
                     await new Promise(resolve => setTimeout(resolve, 3000));
                     message.channel.send(henEmbed);
                 });
             }
         } else {
             let c = generic_helpers.randomInt(100);
             if (c < 15) {
                 request({
                     url: "https://nekos.life/api/v2/img/" + APIConfig.neko.sfw["hug"].key,
                     json: true
                 }, async function (
                     error,
                     response,
                     body
                 ) {
                     let addition = APIConfig.neko.sfw["hug"].d2 != "" ? " " + APIConfig.neko.sfw["hug"].d2 : "";

                     let authorField = APIConfig.neko.sfw["hug"].act ? "*" + targetNickname + " " + APIConfig.neko.sfw["hug"].d1 + " " + authorNickname + addition + "*" : "*" + APIConfig.neko.sfw["hug"].key + "*";
                     let henEmbed = new Discord.MessageEmbed()
                         .setColor("#f096ea")
                         .setDescription(authorField)
                         .setImage(body.url)
                         .setFooter("Powered by " + APIConfig.neko.poweredby[Math.floor(Math.random() * APIConfig.neko.poweredby.length)]);
                     await new Promise(resolve => setTimeout(resolve, 3000));
                     message.channel.send(henEmbed);
                 });
             }
         }
     },

     //Return a random "Who" joke string
     getWho() {
        let randomms = Math.floor(Math.random() * 999);
        let who_s = [
             "now ᴘʟᴀʏɪɴɢ: Who asked (Feat: Nobody) \n───────────⚪────── \n◄◄⠀▐▐⠀►► 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼⠀───○ 🔊",
             "I ran a search of the RAAC server logs in `0." + randomms + "ms` and found `0` results for people who asked",
             "Greetings fellow RAAC user. I am saddened to inform you of the following information: as of now, we as a collective are currently unable to locate the whereabouts of the individual who asked.", 
             "According to world population studies, approximately 108 billion people have lived on this planet. Assuming that the average lifespan of all these people was 25, there has been around 2.7 trillion years of life, if we multiply this by the number of days in a year (365), there is a total of 985,500,000,000,000 days of life (985.5 trillion days). Not once in any of those days did anybody ask.",
             "⠀⠀⠀⠀⠀⠀.　　　　　　　　　　　　　.　　　ﾟ .　　　　　　　　　　　　　. 　　　　　　　　　　　　　　　✦ 　　　　　,　　　　　　　. ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 　　　　　　　　　　　. .　　　　　　　　　　　　　. 　　✦⠀　   　　　,　　　　　　　　　 ⠀　　　　⠀　　, ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀.　　　　　 　　⠀　　　⠀.　 ˚　　　⠀　⠀  　　,　　　　　　. . ⠀　　⠀  　　　　　⠀✦⠀　 . .　　　　.　　　⠀ .  ˚　　　　　　　　ﾟ　　　　　. .⠀　　⠀‍⠀‍⠀‍⠀‍⠀‍⠀‍⠀‍⠀‍⠀‍⠀‍⠀, *　　⠀. .　　　　　　　　　　⠀✦ ˚　　　　　　　　　　　　　　 .⠀　　　　　　　　　　 　　　　　　　　　　.　　　　　　　　. ✦⠀　   　　　,　　     ⠀　　 .　　　　　 　　⠀　　　. ˚　　　⠀　⠀  　　　　 　　　　　　　　　　　, .　　　 ⠀ 　　    　　　　　 　　　　　. Traveled the entire galaxy trying to find out who asked⠀⠀⠀⠀⠀⠀⠀.　　　　　　　　　　⠀⠀⠀✦ ⠀ ⠀　　　　　　　　　　　　　　⠀⠀⠀⠀⠀* ⠀⠀⠀.　　　　　　　　　　. ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀✦⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀⠀⠀.　　　　　　　　　　　　　.　　　ﾟ .　　　　　　　　　　　　　."
        ];
        let randomNum = Math.floor(Math.random() * who_s.length);  
        return who_s[randomNum];
     }
 }