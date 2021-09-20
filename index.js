//>========================>>> GLOBALS <<<===================================*/
 const Discord              = require('discord.js');
 const fs                   = require('fs');
 const Tomo                 = require("./classes/tomo.js");
 const generic_helpers      = require('./helpers/generic_helpers.js');
 const config               = require('./configurations/botConfiguration.json');

 //>=====================>>> INSTANCES <<<====================================*/
 const cooldowns            = new Discord.Collection();
 const client               = new Discord.Client();
 let tomo                   = new Tomo.tomo(config.name);

 //>===================>>> COMMAND COLLECTION <<<=============================*/
 client.commands = new Discord.Collection();
 const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
 for (const file of commandFiles) {
     const command = require(`./commands/${file}`);
     client.commands.set(command.name, command);
 }

 //>===================>>> STATUS AND CARA INIT <<<===========================*/
 client.once('ready', () => {
     generic_helpers.createLog('Status:', "<< O N L I N E >>", config.name);
     client.user.setActivity(config.activities[Math.floor(Math.random() * config.activities.length)], {
         type: "WATCHING"
     });

     //Set Cara health status
     tomo.goLive(client);
     client.guilds.cache.get(config.guild_id).members.cache.get(client.user.id).setNickname(tomo.currentName);
 });

 //>======================>>> MESSAGE HANDLER <<<=============================*/
 client.on('message', message => {
     //Check that the message is a command and/or not from a bot
     if (!message.content.startsWith(config.prefix) || message.author.bot) return;

     //Split up the command and arguments
     const args = message.content.slice(config.prefix.length).trim().split(' ');

     //make a variable out of the command
     const commandName = args.shift().toLowerCase();
     const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

     //If there are no commands found in the project directory
     if (!command) return;

     if (!cooldowns.has(command.name)) {
         cooldowns.set(command.name, new Discord.Collection());
     }

     const now = Date.now();
     const timestamps = cooldowns.get(command.name);
     const cooldownAmount = (command.cooldown || 5) * 1000;

     if (timestamps.has(message.author.id) && !message.member.roles.cache.has(config.guild_roles.nocooldown)) {
         const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

         if (now < expirationTime) {
             const timeLeft = (expirationTime - now) / 1000;
             return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(msg => {
                 msg.delete({
                     timeout: 10 * 1000
                 });
             });
         }
     }
     timestamps.set(message.author.id, now);
     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
     //Try to execute the command
     try {
         command.execute(message, args, client, tomo);
     } catch (error) {
         console.error(error);
         message.reply('there was an error trying to execute that command!');
     }
 });

//>======================>>> ACTIVATE CLIENT <<<==============================*/
 client.login(config.token);