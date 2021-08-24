const Locations = require('../models/location');
const Discord = require('discord.js');

async function getGlobalLocations(client, guildId) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        const locations = await Locations.find({ guildID: guildId, type: "Global" })

        if (locations.length > 0) {

            return locations;

        } else {

            return null;

        }

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }


}

module.exports = getGlobalLocations;