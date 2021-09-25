// -> IMPORTS <-
 const cron         = require('cron');
 const config       = require('../configurations/botConfiguration.json');

  // -> CLASS <-
 class tomo {

     //Status names 
     hunger_status = ['Stuffed💙', 'Full🟢', 'Sated🟣', 'Empty🟡', 'Starved🔴'];
     love_status = ['Adored💙', 'Loved🟢', 'Liked🟣', 'Lonely🟡', 'Sad🔴'];
     happiness_status = ['Joyous💙', 'Happy🟢', 'Chill🟣', 'Bored🟡', 'Awful🔴'];


     //Constructor
     constructor(basename) {
         this.basename = basename;
         this.currentName = this.basename;
         this.hunger = 100;
         this.love = 100;
         this.happiness = 100;

         //? Auto reduce emotions etc
         this.liveChecks = new cron.CronJob("00 */20 * * * *", () => {
             this.updateStatuses();
             this.updateName();
         })
         this.client = null;
     }

     goLive(client) {
         this.liveChecks.start();
         this.client = client;
         this.updateName();
     }

     printObjectInformation() {
         console.log("Name-: " + this.currentName);
         console.log("Hunger: " + this.hunger);
         console.log("Love: " + this.love);
         console.log("Happiness: " + this.happiness);
     }

     updateName() {
         this.currentName = this.basename +
             " (" +
             this.love_status[this.convertToStatusIndex(this.love)] +
            //  "|" +
            //  this.happiness_status[this.convertToStatusIndex(this.happiness)] +
             "|" +
             this.hunger_status[this.convertToStatusIndex(this.hunger)] +
             ")"
         if ((this.hunger + this.love + this.happiness) === 0) {
             this.currentName = this.basename + " (DEAD)"
         }
         this.client.guilds.cache.get(config.guild_id).members.cache.get(this.client.user.id).setNickname(this.currentName);
     }

     //This is very fuck. Plz fix at some point.
     convertToStatusIndex(int) {
         if (int > 80) {
             return 0;
         } else if (int >= 60) {
             return 1
         } else if (int >= 40) {
             return 2
         } else if (int >= 20) {
             return 3
         } else if (int < 20) {
             return 4
         }
     }

     updateStatuses() {

        //! emotions/hunger are reduced by a random number in these ranges
         let happiness_upper_lower = [1, 3];
         let love_upper_lower = [1, 3];
         let hunger_upper_lower = [1, 3];


         this.hunger = (this.hunger - (Math.floor(Math.random() * hunger_upper_lower[1]) + hunger_upper_lower[0]));
         this.love = (this.love - (Math.floor(Math.random() * love_upper_lower[1]) + love_upper_lower[0]));
         this.happiness = (this.happiness - (Math.floor(Math.random() * happiness_upper_lower[1]) + happiness_upper_lower[0]));
         this.hunger = this.hunger <= 0 ? 0 : this.hunger;
         this.love = this.love <= 0 ? 0 : this.love;
         this.happiness = this.happiness <= 0 ? 0 : this.happiness;
     }

     action(type, amount) {
         if (type === "happiness") {
             this.deltaHappiness(amount);
         } else if (type === "love") {
             this.deltaLove(amount);
         } else if (type === "hunger") {
             this.deltaHunger(amount);
         }
         this.client.guilds.cache.get(config.guild_id).members.cache.get(this.client.user.id).setNickname(this.currentName);
     }

     handleAction(arg) {
        if (["", "kiss", "gasm", "hug", "tickle", "cuddle", "smug"].indexOf(arg) > 0) {
            this.action("love", 50);
        } else if (["", "pat", "poke", "weeb", "baka", "dog", "cat", "goose", "lizard"].indexOf(arg) > 0) {
            this.action("happiness", 50);
        } else if (["", "feed"].indexOf(arg) > 0) {
            this.action("hunger", 50);
        }
     }


     // >>> ADDERS <<<
     //Take a positive or negative argument and add it to the object property
     deltaHappiness(happiness) {
         this.happiness += happiness;
         this.happiness = this.happiness >= 100 ? 100 : this.happiness;
         this.updateName();
         return this.happiness;
     }

     deltaLove(love) {
         this.love += love;
         this.love = this.love >= 100 ? 100 : this.love;
         this.updateName();
         return this.love;
     }

     deltaHunger(hunger) {
         this.hunger += hunger;
         this.hunger = this.hunger >= 100 ? 100 : this.hunger;
         this.updateName();
         return this.hunger;
     }


     // >>> SETTERS <<<
     setHappiness(happiness) {
         this.happiness = happiness;
     }

     setLove(love) {
         this.love = love;
         this.updateName();
     }

     setHunger(hunger) {
         this.hunger = hunger;
         this.updateName();
     }

     setCurrentName(newName) {
         this.currentName = newName;
         this.updateName();
     }


     // >>> GETTERS <<<
     getHappiness() {
         return this.happiness;
     }

     getLove() {
         return this.love;
     }

     getHunger() {
         return this.hunger;
     }

     getName() {
         return this.currentName;
     }
 }

 // -> EXPORTS <-
 module.exports = {
     tomo
 }