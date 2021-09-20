// -> IMPORTS <-
const Discord           = require('discord.js');
const config            = require('../configurations/botConfiguration.json');
const db_interface      = require('../database interface/db_interface');

 // -> EXPORTS <-
 module.exports = {
     name: 'record',
     aliases: ['rec'],
     usage: '<@user>',
     description: 'Get the warnings for a user',
     execute(message, args, client, tomo) {
         if (message.member.roles.cache.has(config.guild_roles.moderator)) {
                //If there is no user argument then use the command caller
                 let user_tag = (message.guild.member(message.mentions.users.first()) != null) ? message.guild.member(message.mentions.users.first()).user : message.author;

                 //Pull all the user's warning records
                 db_interface.getWarningRecords(user_tag.id).then(data => {

                    //Create embed
                     let embed = new Discord.MessageEmbed()
                         .setColor('#FFFFFF')
                         .setTitle("Warnings for " + user_tag.username)
                     
                    //Add each warning to the embed 
                    for (let i = 0; i < data.length; i++) {
                        let record = data[i];
                         let title = "Date of warning: " + record.createdAt;
                         let desc = "<@" + record.warnerUserID + "> warned <@" + record.warnedUserID +
                             "> for breaking rule #" + record.ruleBroken +
                             "\rMessage: " + record.reason;
                         embed.addField(title, desc, false);
                     }

                     //Send
                     message.channel.send(embed);
                 });            
         }
     }
 }