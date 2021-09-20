 /**
  * AUTHOR          : Light
  * PROJECT         : Cara
  * UPDATED DATE    : 04/22/21
  * 
  * CLASS           : Cron Jobs
  * DESCRIPTION     : The various routine jobs that Cara performs
  */

 /*jshint esversion: 8 */

// -> IMPORTS <-
const Discord           = require("discord.js");
const cron              = require("cron");
const request           = require("request");
const generic_helpers   = require("../helpers/generic_helpers.js");
const games_helpers     = require("./games_helpers.js");
const db_io             = require("../database interface/db_interface.js");
const APIConfig         = require("../APIConfig.json");
const config            = require("../configurations/botConfiguration.json")

class jobs {
    constructor(client) {
        //> ===================>>> FOX GIFTS <<<==============================*/
        let giftingFoxJob = new cron.CronJob(config.praise_fox, () => {
            let raac = client.guilds.cache.get(config.guild_id);
            let c = generic_helpers.randomInt(100);
            if (c < 20) {
                request({
                    url: "https://randomfox.ca/floof/",
                    json: true
                }, function (
                    error,
                    response,
                    body
                ) {
                    //.setThumbnail("https://i.imgur.com/Ei8hNAQ.png")
                    let henEmbed = new Discord.MessageEmbed()
                        .setColor("#43a4d1")
                        .setTitle(generic_helpers.getFoxGift())
                        .setImage(body.image)
                        .setFooter("Powered by " + APIConfig.neko.poweredby[Math.floor(Math.random() * APIConfig.neko.poweredby.length)]);
                    raac.channels.cache.get(config.channels.general).send(henEmbed);
                });
            }
        })
        //>==========>>> AUTO MUTE CHECK & Store Membership Number <<<========*/
        let muteCheckJob = new cron.CronJob(config.muteChecks, () => {
            db_io.checkMutes().then(r => {
                let guild = client.guilds.cache.get(config.guild_id);
                for (let x = 0; x < r.length; x++) {
                    guild.members.fetch(r[x].id).then(j => {
                        let b = r[x].startDate.toString().substring(3, 24);
                        let e = r[x].endDate.toString().substring(3, 24);
                        let log_channel = client.channels.cache.get(config.channels.staff);
                        generic_helpers.sendLogToChannel(log_channel, ("Unmuted User", j.user.username + " has been unmuted"), "Started: " + b + " - Ended: " + e + "\n\n\“I don't think...\" then you shouldn't talk, said the Hatter.\”")
                        j.roles.remove(config.guild_roles.server_muted);
                    });
                }
            });
        })
        //>==================>>> AUTO WATER/POSTURE CHECK <<<=================*/
        let waterCheckJob = new cron.CronJob(config.water_posture, () => {
            if (generic_helpers.randomInt(2) == 1) {
                client.channels.cache.get(config.channels.general).send(generic_helpers.waterHealthCheck());
            }
        })
        //>====================>>> AUTO FAM POSTING <<<=======================*/
        let autoPostFAMJob = new cron.CronJob(config.FAM_post_time, () => {
            games_helpers.postFAM(client, config.channels.fma);
            console.log("[FAM] Ran FAM post job. (CARA)");
        })
        //>====================>>> AUTO WYR POSTING <<<=======================*/
        let autoPostWYRJob = new cron.CronJob(config.wyr_post_time, () => {
            games_helpers.postWYR(client);
            console.log("[WYR] Ran WYR post job. (CARA)");
        })
        //>====================>>> AUTO WYR POSTING <<<=======================*/
        let updateStatusJob = new cron.CronJob(config.water_posture, () => {
            client.user.setActivity(config.activities[Math.floor(Math.random() * config.activities.length)], {
                type: "WATCHING"
            });
        })
        //>==============>>> Auto celeb folders shuffle <<<===================*/
        let randomizeCelebsJob = new cron.CronJob(config.rcrandomize, () => {
            let c = client.channels.cache.get(config.channels.randomceleb);
            games_helpers.randomizeCelebs();
            generic_helpers.wait(5000).then(r => {
                c.send("`>>> DAILY RANDOMIZATION COMPLETED <<<`");
                games_helpers.printRandomCelebList(c);
            })
        })
        this.giftingFox = giftingFoxJob;
        this.muteChecks = muteCheckJob;
        this.waterChecks = waterCheckJob;
        this.autoPostFAM = autoPostFAMJob;
        this.autoPostWYR = autoPostWYRJob;
        this.updateStatus = updateStatusJob;
        this.randomizeCelebs = randomizeCelebsJob;
    }

    startAllJobs() {
        this.giftingFox.start();
        this.muteChecks.start();
        this.waterChecks.start();
        this.autoPostFAM.start();
        this.autoPostWYR.start();
        this.updateStatus.start();
        this.randomizeCelebs.start();
    }
}

module.exports = {
    jobs
};