// -> IMPORTS <- 
const APIConfig         = require('../configurations/APIConfig.json');
const config            = require('../configurations/botConfiguration.json')
const command_helpers   = require('../helpers/command_helpers.js');
const request           = require('request');
const Discord           = require('discord.js');

// -> EXPORTS <-
module.exports = {
    name: 'sfw',
    aliases: ['f'],
    usage: '<tag> <user>',
    cooldown: 0,
    description: 'Do a sfw action',
    execute(message, args, client, tomo) {
        const user = message.mentions.users.first() || message.author;
        let guild = client.guilds.cache.get(config.guild_id);
        let authorNickname = "<@!" + guild.member(message.author) + ">"
        let targetNickname = "<@!" + guild.member(user) + ">"

        //Validate tag and send the API response
        if (!(typeof APIConfig.neko.sfw[args[0]] === 'undefined')) {
            request({
                url: "https://nekos.life/api/v2/img/" + APIConfig.neko.sfw[args[0]].key,
                json: true
            }, function (
                error,
                response,
                body
            ) {
                let addition = APIConfig.neko.sfw[args[0]].d2 != "" ? " " + APIConfig.neko.sfw[args[0]].d2 : "";
                let authorField = APIConfig.neko.sfw[args[0]].act ? "*" + authorNickname + " " + APIConfig.neko.sfw[args[0]].d1 + " " + targetNickname + addition + "*" : "*" + APIConfig.neko.sfw[args[0]].key + "*";
                let embed = new Discord.MessageEmbed()
                    .setColor("#f096ea")
                    .setDescription(
                        authorField
                    )
                    .setImage(body.url)
                    //.setFooter("Powered by " + APIConfig.neko.poweredby[Math.floor(Math.random() * APIConfig.neko.poweredby.length)]);
                message.channel.send(embed);
            });
            message.delete();
        } else {
            let cmd_args = "";
            for (let property in APIConfig.neko.sfw) {
                cmd_args += (property + ", ");
            }

            let embed = new Discord.MessageEmbed()
                .setColor("#f096ea")
                .setAuthor("Invalid argument. Valid arguments are listed below")
                .setDescription(cmd_args.slice(0, -2))

            message.channel.send(embed);
            message.delete();
        }

        //- If someone is doing a SFW action to the client
        if (user.id === client.user.id) {
            tomo.handleAction(args[0]);
            command_helpers.handlesfw(client, message, args, authorNickname, targetNickname, guild);
        }
    }
}
