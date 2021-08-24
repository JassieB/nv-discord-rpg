const Locations = require('../models/location');
const Discord = require('discord.js');

async function getLocalLocations(client, reqTown, guildId) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        const locations = await Locations.find({ guildID: guildId, town: reqTown })

        if (locations.length > 0) {

            return locations;

        } else {

            return null;

        }

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }


}

module.exports = getLocalLocations;