/**
 * AUTHOR           : Light
 * PROJECT          : Cara
 * UPDATED DATE     : 04/11/21
 * 
 * MODULE           : SQLite DB interface
 * DESCRIPTION      : Get DB records (unabstracted*)
 */

// -> IMPORTS <-
const tables    = require("./sequalizeTables.js");
const Sequelize = require('sequelize');

//Create the SQLite interface
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

// -> EXPORTS <- 
module.exports = {
    //Add a warning record to the database
    async createWarningRecord(tUserID, aUserID, _reason, rule, channel_IDN) {
        try {
            const createIndex = await tables.warningRecord.create({
                warnedUserID: tUserID,
                warnerUserID: aUserID,
                cid: channel_IDN,
                ruleBroken: rule,
                reason: _reason
            })
            //helpers.createLog("Update ActChart", "new table created", config.name);
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return console.log('That tag already exists.');
            }
            return console.log(e);
        }
    },

    //Get the warning records associated with a user ID
    async getWarningRecords(userID) {
        let records = await tables.warningRecord.findAll({
            where: {
                warnedUserID: userID
            }
        })

        if (records) {
            return records;
        } else {
            console.log("No such table entries for this user");
            return 0;
        }
    },

    
    async queryWarningRecords(duid) {
        let query_string = `select * from warningRecords where warnedUserID = \"${duid}\"`
        let table = sequelize.query(query_string);
        return table;
    },
}