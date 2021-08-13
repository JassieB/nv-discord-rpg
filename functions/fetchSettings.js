const Settings = require('../models/guildsettings');
const fs = require('fs');

async function getSettings(caller, settingtype, reason, guildId) {

    let time = new Date()

    try {

        const settings = await Settings.findOne({ guildID: guildId });

        if (settings) {

            fs.appendFile(__dirname + '../../logs/mongologs.txt', `\n---${time}---\nSuccessfully Fetched Settings Configuration -${settingtype}- for: \n${reason} \nCalled by -${caller}-`, (err) => {
                if (err) {
                    fs.appendFile(__dirname + '../../logs/errorlogs.txt', `\n---${time}--- \nError: \n${err} \nRequiring Settings for: ${reason}`, (err) => {
                        if (err) console.error(err);
                    });
                }
            })
            return settings;

        } else {

            fs.appendFile(__dirname + '../../logs/mongologs.txt', `\n---${time}---\nUnsuccessfully Fetched Settings Configuration -${settingtype}- for: \n${reason} \nCalled by -${caller}-`, (err) => {
                if (err) {
                    fs.appendFile(__dirname + '../../logs/errorlogs.txt', `\n---${time}--- \nError: \n${err} \nRequiring Settings for: ${reason}`, (err) => {
                        if (err) console.error(err);
                    });
                }
            })
            return null;

        }

    } catch (err) {

        fs.appendFile(__dirname + '../../logs/errorlogs.txt', `\n---${time}--- \nError: \n${err} \nRequiring Settings for: ${reason}`, (err) => {
            if (err) console.error(err);
        });

    }


}

module.exports = getSettings;