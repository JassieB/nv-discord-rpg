const Discord = require('discord.js');
const Weapon = require('../../classes/weapon');
const Armour = require('../../classes/armour');
const getLocations = require('../../functions/fetchLocations');
const getSettings = require('../../functions/fetchSettings');
const getCharacter = require('../../functions/fetchCharacters');

module.exports = {
    commands: ['smith'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        try {

            const location = getLocations(client, insert, guild.id);
            const settings = getSettings(client, guild.id);
            const character = getCharacter(client, message.author.id, guild.id);

            if (!location) return;
            if (!character) return;
            if (!settings.commandsActive && !message.member.user.id == '714070826248437770') return message.reply('The game is currently paused.');

            let itemType = arguments[0];

            if (itemType == 'weapon') {

                let name, description, type, weight, damage, sellLocations;

                /*create filter*/

                const msg = await message.channel.send({ content: 'What is the name of your weapon?' });

                msg.channel.awaitMessages({ max: 1, time: 60000, errors: ['time'] }).then(async (collected) => {



                })

            } else if (itemType == 'armour') {

                let name, description, type, weight, damage, sellLocations;

                /*create filter*/

                const msg = await message.channel.send({ content: 'What is the name of your weapon?' });

                msg.channel.awaitMessages({ max: 1, time: 60000, errors: ['time'] }).then(async (collected) => {



                })

            }

        } catch (err) {

            //

        }

    }
}