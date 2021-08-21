const getCharacter = require('../../functions/fetchCharacters.js');
const getInventory = require('../../functions/fetchInventories.js');
const getSettings = require('../../functions/fetchSettings.js');
const pagination = require('../../functions/pagination.js');
const Discord = require('discord.js');

module.exports = {
    commands: ['card'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        const settings = await getSettings(client, guild.id);
        const character = await getCharacter(client, message.member, guild.id);
        const inventory = await getInventory(client, message.member, guild.id);

        if (!settings) return;
        if (!character) return;
        if (!inventory) return;

        if (settings.commandsActive == true) {

            try {

                // Select Menus
                const typeSelect = new Discord.MessageSelectMenu()
                    .setCustomId('player-card')
                    .setPlaceholder('Categories')
                    .addOptions(
                        {
                            label: 'Main Stats',
                            value: 'mainstats'
                        },
                        {
                            label: 'Attributes',
                            value: 'attributes'
                        }
                    )

            } catch (error) {

                const logChannel = client.channels.cache.get('859802682599800852');

                logChannel.send({ content: `${error} \n${message.url}` });

            }

        }

    }
}