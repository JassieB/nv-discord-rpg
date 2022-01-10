const Inventory = require('../models/inventory.js');
const updateLog = require('../functions/updateLog.js');
const Discord = require('discord.js');

async function getInventory(client, user, guildId) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        const inventory = await Inventory.findOne({ guildID: guildId, userID: user.id });

        if (inventory) {

            return inventory;

        } else {

            return null;

        }

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }

}

module.exports = getInventory;