// -> IMPORTS <-
const Sequelize = require('sequelize');

//Link to Datebase
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

let warningRecord = sequelize.define('warningRecord', {
    warnedUserID: Sequelize.STRING,
    warnerUserID: Sequelize.STRING,
    ruleBroken: Sequelize.STRING,
    reason: Sequelize.STRING,
    cid: Sequelize.STRING
});

//Sync Tables
warningRecord.sync();


// -> EXPORTS <-
module.exports = {
    warningRecord,
}