const Discord = require('discord.js');
const getCharacter = require('../../functions/fetchCharacters.js');
const getInventory = require('../../functions/fetchInventories.js');
const getSettings = require('../../functions/fetchSettings.js');

module.exports = {
    commands: ['buy'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        try {

            const settings = await getSettings(client, guild.id);
            const character = await getCharacter(client, message.member, guild.id);
            const inventory = await getInventory(client, message.member, guild.id);

            if (!settings) return;
            if (!character) return;
            if (!inventory) return;

            if (settings.commandsActive == true || message.member.user.id == '714070826248437770') {

                if (!item) {

                    return;

                } else if (character.coins < item.price) {

                    message.reply({ content: `You do not have enough coins to buy ${item.article} ${item.name}` });

                } else {

                    inventory.items.push(item);
                    inventory.save();
                    message.reply({ content: `You have purchased ${item.article} ${item.name}` });

                }

            }

        } catch (error) {

            const logChannel = client.channels.cache.get('859802682599800852');

            logChannel.send({ content: `${error}` });

        }

    }
}