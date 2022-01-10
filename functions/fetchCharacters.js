const Character = require('../models/character.js');
const updateLog = require('../functions/updateLog.js');
const Discord = require('discord.js');

async function getCharacter(client, user, guildId) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        const character = await Character.findOne({ guildID: guildId, userID: user.id });

        if (character) {

            return character;

        } else {

            return null;

        }

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }

}

module.exports = getCharacter;