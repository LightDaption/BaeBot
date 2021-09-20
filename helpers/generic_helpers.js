/**
 * AUTHOR           : Light
 * PROJECT          : Cara
 * UPDATED DATE     : 04/09/21
 * 
 * MODULE           : Generic Helpers
 * DESCRIPTION      : Generic helper functions
 */

// -> IMPORTS <-
const config        = require('../configurations/botConfiguration.json');
const Discord       = require('discord.js');

// -> EXPORTS <-
module.exports = {
    //Return a random integer between 0 and the arg(int)
    randomInt(arg) {
        return Math.floor(Math.random() * arg);
    },

    //Return the array argument as a single string
    arrayToString(array, startIndex, endIndex, seperator) {
        var retStr = "";
        for (var i = startIndex; i < endIndex; i++) {
            retStr += (seperator + array[i]);
        }
        return retStr.trim();
    },

    //If the argument is valid return the associated rule(string)
    //Returns rule 9(generic) otherwise
    getRule(rule_num) {
        if (config.rules[rule_num]) {
            return config.rules[rule_num];
        } else {
            return config.rules[10];
        }
    },

    //Return the integer argument in a string of emote keys
    getEmoteStringFromNumbers(arr) {
        let ret_str = "";
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i]) {
                case "0":
                    ret_str += ":zero:";
                    break;
                case "1":
                    ret_str += ":one:";
                    break;
                case "2":
                    ret_str += ":two:";
                    break;
                case "3":
                    ret_str += ":three:";
                    break;
                case "4":
                    ret_str += ":four:";
                    break;
                case "5":
                    ret_str += ":five:";
                    break;
                case "6":
                    ret_str += ":six:";
                    break;
                case "7":
                    ret_str += ":seven:";
                    break;
                case "8":
                    ret_str += ":eight:";
                    break;
                case "9":
                    ret_str += ":nine:";
                    break;
            }
        }
        return ret_str;
    },

    //Print a log to the console
    createLog(name, description, caller) {
        let d = new Date();
        let time = "[> " + d.getHours() + ":" + d.getMinutes() + " <]";
        console.log(time + ": [" + name + "] " + description + " (" + caller + ")");
    },

    //Return the "water check" embed
    waterHealthCheck() {
        const attachment = new Discord.MessageAttachment(this.getHealthCheckImage(), 'sample.jpg');
        let embed = new Discord.MessageEmbed()
            .setColor('#e8fdff')
            .setTitle('Water & Posture Check!')
            .addFields({
                name: 'Water Check!',
                value: 'Go get a glass of water!',
                inline: true
            }, {
                name: 'Posture Check!',
                value: 'Straighten up!',
                inline: true
            })
            .attachFiles(attachment)
            .setThumbnail('attachment://sample.jpg');
        return embed;
    },

    //Returns a random fox gift string
    getFoxGift() {
        let gifts = ["cool hats", "fake mustaches", "big buzzing vibrators", "pounds of w33d", "wigs", "pirate swords", "human sized cages", "empty soda cans", "Chocolate Frogs", "magic wands", "love potions", "poison potions", "masks", "fireworks", "bricks", "condoms", "keys", "bags of trash", "ducks", "coins", "switches", "pairs of edible panties", "candy apples", "get out of jail free cards", "cups of bubble tea", "personal tentacle monsters", "ASMR videos", "erotic ASMR videos", "DMs that are just \"rp?\""];
        let number = this.randomInt(7) + 2;
        return "The fox bestows a gift of " + number + " " + gifts[this.randomInt(gifts.length)];
    },

    //Return the path of a random health check image
    getHealthCheckImage() {
        return "./images/health/" + Math.ceil(Math.random() * 40) + ".jpg";
    },

    //Create and send an embed to the specified channel
    sendLogToChannel(guild_channel, subject, text) {
        const embed = new Discord.MessageEmbed()
            .setTitle(subject)
            .setDescription(text)
        guild_channel.send(embed);
    },

    //Get ALL the RAAC rules as an embed
    getRulesEmbed() {
        let embed = new Discord.MessageEmbed()
            .setColor('#0056b3')
            .setTitle('🚨 Roleplay As A Celebrity - Rules 🚨')
        for (const x in config.rules) {
            embed.addFields({
                name: "**Rule** #" + x,
                value: config.rules[x]
            });
        }
        return embed;
    },

    //Send information about OC posts to the bot_dev channel
    ocPostChecker(message, logChannel) {
        if(message.channel.id == config.channels.orgasm_counter && message.author.id != config.cara_id) {
            let user_tag = (message.guild.member(message.mentions.users.first()) != null) ? message.guild.member(message.mentions.users.first()).user : message.author;
            let infoString = "";
            let wordCount = message.content.split(' ');
            infoString += "**Author**: <@" + message.author + ">";
            infoString += "\n**Tagged:** <@" + user_tag + ">";
            infoString += "\n**Word count**: " + wordCount.length;
            const embed = new Discord.MessageEmbed()
                .setTitle("New OC post")
                .setDescription(infoString)
            logChannel.send(embed);
        }
    },

    //I don't think this is used but I'm too lazy to check
    async wait(ms) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

}