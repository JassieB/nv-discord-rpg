const Discord = require('discord.js');
const Weapon = require('../../classes/weapon');
const Armour = require('../../classes/armour');

module.exports = {
    commands: ['smith'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        try {

            let itemType = arguments[0];

            if (itemType == 'weapon') {

                let name, description, type, weight, damage, sellLocations;

                /*create filter*/

                const msg = await message.channel.send({ content: 'What is the name of your weapon?' });

                msg.channel.awaitMessages({ max: 1, time: 60000, errors: ['time'] }).then(async (collected) => {



                })

            } else if (itemType == 'armour') {

                //

            }

        } catch (err) {

            //

        }

    }
}