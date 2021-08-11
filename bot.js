// Discord Requires
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 32767,
});

// Other Requires
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// File Requires
const mongo = require('./mongo.js');

// Collections

client.on('ready', () => {
    mongo();

    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file));
                commandBase(option);
            };
        };
    };

    const eBaseFile = 'event-base.js';
    const eventBase = require(`./events/${eBaseFile}`);

    const readEvents = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readEvents(path.join(dir, file));
            } else if (file !== eBaseFile) {
                const option = require(path.join(__dirname, dir, file));
                eventBase(client, option);
            };
        };
    };

    readEvents('events');
    readCommands('commands');

    commandBase.listen(client);

    console.log("Bot has Started");
});

client.login(process.env.TOKEN);