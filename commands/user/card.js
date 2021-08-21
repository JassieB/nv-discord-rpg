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

        if (settings.commandsActive == true || message.member.user.id == '714070826248437770') {

            let infoEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.member.nickname}'s Info`)
                .setThumbnail(message.member.user.avatarURL())
                .addField("Age:", String(character.charAge), true)
                .addField("Race:", character.charRace, true)
                .addField("Coins:", String(character.coins), true)
                .addField("Level:", String(character.level), true)
                .addField("Class:", character.class, true)
                .addField("Skillpoints", String(character.skillPoints), true);

            let attributesEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.member.nickname}'s Attributes`)
                .setThumbnail(message.member.user.avatarURL())
                .addField("Strength:", String(character.strength), true)
                .addField("Intelligence:", String(character.intelligence), true)
                .addField("Speed:", String(character.intelligence), true)
                .addField("Agility:", String(character.agility), true)
                .addField("Dexterity:", String(character.dexterity), true)
                .addField("Charisma", String(character.charisma), true)
                .addField("Magic:", String(character.magic), true);


            try {

                // Select Menus
                const pageSelect = new Discord.MessageSelectMenu()
                    .setCustomId('player-card')
                    .setPlaceholder('Categories')
                    .addOptions(
                        {
                            label: 'Info',
                            value: 'info'
                        },
                        {
                            label: 'Attributes',
                            value: 'attributes'
                        }
                    );

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        pageSelect,
                    )

                const msg = await message.channel.send({ embeds: [infoEmbed], components: [row] })

                const filter = (interaction) => {
                    if (interaction.user.id != message.member.user.id) {
                        interaction.deferUpdate();
                    } else {
                        return interaction;
                    }
                };

                const collector = msg.createMessageComponentCollector({ filter, idle: 100000 });

                collector.on('collect', async (interaction) => {
                    interaction.deferUpdate();

                    if (interaction.values[0] == 'info') {

                        msg.edit({ embeds: [infoEmbed], components: [row] })

                    } else if (interaction.values[0] == 'attributes') {

                        msg.edit({ embeds: [attributesEmbed], components: [row] })

                    }

                });

                collector.on('end', async (interaction) => {

                    msg.delete();

                })

            } catch (error) {

                const logChannel = client.channels.cache.get('859802682599800852');

                logChannel.send({ content: `${error} \n${message.url}` });

            }

        }

    }
}