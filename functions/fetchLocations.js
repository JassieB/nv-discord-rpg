const Locations = require('../models/location.js');
const Discord = require('discord.js');

async function getLocations(client, travelChannel, guildId) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        let location;

        location = Locations.findOne({ channel: travelChannel });

        if (location) {

            return location;

        } else {

            return null;

        }

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }


}

module.exports = getLocations;