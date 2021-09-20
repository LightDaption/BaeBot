// -> IMPORTS <-
 const Discord          = require('discord.js');
 const config           = require('../configurations/botConfiguration.json');
 const db_interface     = require('../database interface/db_interface.js');
 const generic_helpers  = require('../helpers/generic_helpers.js');

 // -> EXPORTS <-
 module.exports = {
     name: 'warn',
     aliases: ["warning", "w"],
     usage: '[@user] [Rule #] [Reason(any length)]',
     description: 'Issue a warning. [MOD ONLY].',
     execute(message, args, client, tomo) {
         if (message.member.roles.cache.has(config.guild_roles.moderator)) {

             let command_r_num = parseInt(args[1], 10)
             let warning_color = "";
             let warning_num = "";
             let command_reason = generic_helpers.arrayToString(args, 2, args.length, " ");

             //Evaluate which warning this is for the user supplied
             if (message.mentions.members.first().roles.cache.some(r => ["Warning 1"].includes(r.name)) &&
                 message.mentions.members.first().roles.cache.some(r => ["Warning 2"].includes(r.name))) {
                 warning_color = "#ff0000";
                 warning_num = "Max Warnings";
             } else if (message.mentions.members.first().roles.cache.some(r => ["Warning 1"].includes(r.name))) {
                 warning_color = "#ff5900"
                 warning_num = "Second Warning";
                 message.mentions.members.first().roles.add(config.guild_roles.warning_two);
             } else {
                 warning_color = "#f7ff5c";
                 warning_num = "First Warning"
                 message.mentions.members.first().roles.add(config.guild_roles.warning_one);
             }

             //Create In-Channel Embed
             let warning_imbed = new Discord.MessageEmbed()
                 .setColor(warning_color)
                 .setThumbnail(message.mentions.members.first().user.avatarURL({
                    format: "jpg",
                    dynamic: true,
                    size: 512
                }))
                 .setTitle(warning_num)
                 .setDescription(("<@" + message.mentions.users.first() + ">" + " you have been warned by " + "<@" + message.author.id + ">") + ("\n**Message**: " + command_reason))
                 .addFields({
                     name: 'Rule Broken: #' + `${(isNaN(command_r_num) || command_r_num === undefined) ? command_r_num = 9 : command_r_num}`,
                     value: "Please go give <#" + config.channels.rules + "> a quick read to avoid additional warnings. Receiving 3 warnings will result in a ban.",
                     inline: true
                 }, {
                     name: 'Warning Removal',
                     value: "Removal of a warning can be requested in <#" + config.channels.warning_removal + "> after 1 week.",
                     inline: true
                 })
            
            //Create Logging Channel Embed
             let warning_log = new Discord.MessageEmbed()
                 .setColor(warning_color)
                 .setTitle(warning_num)
                 .setThumbnail(message.mentions.members.first().user.avatarURL({
                    format: "jpg",
                    dynamic: true,
                    size: 512
                }))
                 .setDescription(("<@" + message.mentions.users.first() + ">" + " was warned by " + "<@" + message.author.id + ">") + ("\n**Message**: " + command_reason))
                 .addFields({
                     name: ('Rule Broken: #' + command_r_num),
                     value: "See <#" + config.channels.rules + ">"
                 }, )
                 .setFooter('indignus punire', 'https://cdn0.iconfinder.com/data/icons/construction-black/614/15_-_Scythe-512.png')
                 .setTimestamp();

             //Send the in-channel embed. Expires afer 15 minutes
             message.channel.send(warning_imbed).then(msg => {
                 try {
                     msg.delete({
                         timeout: 900000 /*15 minutes*/
                     })
                 } catch (e) {
                     console.log("Could not delete message");
                 }
             });

             //Create a searchable string to put in the logging channel
             let seo_string = "||SEO STRING - TAG: <@" + message.mentions.users.first() + "> • DUID: " + message.mentions.users.first().id + " • UN: " + message.mentions.users.first().username + "||";

             //Send the embed and search string to the logging channel
             message.guild.channels.cache.get(config.channels.logging).send(warning_log);
             message.guild.channels.cache.get(config.channels.logging).send(seo_string);

             //Create a warning log for the warned user in the database
             db_interface.createWarningRecord(message.mentions.users.first().id, message.author.id, command_reason, command_r_num, message.channel.id);

             //Delete the command
             message.delete();

             generic_helpers.createLog(this.name, this.description, message.author.username);
         } else {
            generic_helpers.sendLogToChannel(message.guild.channels.cache.get(config.channels.logging), "ALERT", ("A user who does not have the mod role (" + message.author.username + ") has attempted to use the " + this.name + " command"));
         }

     }
 }