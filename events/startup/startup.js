const Discord = require('discord.js');
const Settings = require('../../models/guildsettings.js');
const getSettings = require('../../functions/fetchSettings');

module.exports = {
    events: ['startup-log'],
    description: '',
    callback: async (client, guild) => {

        const settings = await getSettings('BOT', 'START LOGS', 'STARTING BOT', guild.id);

        if (settings.logsActive == true) {
            client.channels.cache.get('856448564849934337').send({ content: "Bot has Started" });
        }

    }
}