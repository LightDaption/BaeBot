// -> IMPORTS <-
const generic_helpers      = require('../helpers/generic_helpers.js');

// -> EXPORTS <-
module.exports = {
    name: 'ping',
    aliases: ['ding'],
    usage: '',
    description: 'Ping this bot',
    execute(message, args, client, tomo) {
        generic_helpers.sendLogToChannel(message.channel, "*Pong!*", "Chill! I'm here alright! Jeez!");
    },
}