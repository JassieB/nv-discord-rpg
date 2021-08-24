const Settings = require('../models/guildsettings');
const Discord = require('discord.js');

async function getSettings(client, guildId) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        const settings = await Settings.findOne({ guildID: guildId });

        if (settings) {

            return settings;

        } else {

            return null;

        }

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }


}

module.exports = getSettings;