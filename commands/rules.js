// -> IMPORTS <-
const config        = require("../configurations/botConfiguration.json")
const Discord       = require('discord.js');

// -> EXPORTS <-
module.exports = {
    name: 'rule',
    aliases: ['r', 'rules', 'law', 'laws'],
    usage: '[Rule number]',
    description: 'Display a RAAC rule',
    execute(message, args, client, tomo) {
        
        //? Calculate the number of rules currently in the config
        let numberOfRules = Object.keys(config.rules).length - 1;

        //? Make sure a valid rule number was supplied
        if (parseInt(args[0]) > -1 && parseInt(args[0]) <= numberOfRules) {
            let embed = new Discord.MessageEmbed()
                .setColor('#fc034e')
                .setTitle("RAAC Rules")
                .addFields({
                    name: 'Rule #' + args[0],
                    value: config.rules[args[0]]
                })
            message.channel.send(embed);
        } else {
            message.channel.send("A valid rule number must be supplied");
        }
    },
}