const Character = require('../../functions/fetchCharacters');
const getSettings = require('../../functions/fetchSettings');
const Discord = require('discord.js');

module.exports = {
    commands: ['register'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        const settings = getSettings(client, guild.id)
        const character = getCharacters(client, message.member, guild.id);

        if (!settings) return;
        if (!character) return;

        if (settings.commandsActive == true || message.member.user.id == '714070826248437770') {

            if (!message.channel.name.startsWith('🛡')) {
                return message.reply({ content: 'You need to be in a guild to register.' })
            } else {

                const name = message.member.user.username.toLowerCase();

                // check for existing registration channel
                const regchan = guild.channels.cache.find(channel => channel.name === `${name}-registering`);

                if (regchan) {
                    return message.reply({ content: `You are already registering in <#${regchan.id}>` })
                }

                if (character.class != 'None') {
                    return message.reply({ content: `You have already registered as ${character.class}` })
                }

                // create new registration channel
                guild.channels.create(`${name}-registering`).then(async channel => {
                    await channel.setParent('868532758421590036');

                    await channel.permissionOverwrites.edit(message.member, {
                        "VIEW_CHANNEL": true,
                        "SEND_MESSAGES": true,
                        "READ_MESSAGE_HISTORY": true,
                    });

                    let selectionEmbed = new Discord.MessageEmbed()
                        .setTitle("Welcome to the registration channel")
                        .setDescription("To do anything in this world you need a class. Register as a class here. If you master every part of a class, you will be able to choose a subclass later.\n\nSelect a class to continue.");

                    const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageSelectMenu()
                                .setCustomId('classes-select')
                                .setPlaceholder('Select one')
                                .addOptions([
                                    {
                                        label: 'Adventurer',
                                        value: 'adventurer',
                                    },
                                    {
                                        label: 'Blacksmith',
                                        value: 'blacksmith',
                                    }
                                ])
                        )

                    const msg = await channel.send({ embeds: [selectionEmbed], components: [row] })

                    // wait for interaction
                    const collector = msg.createMessageComponentCollector({ time: 120000, max: 1 })

                    collector.on('collect', interaction => {

                        if (interaction.values[0] === 'adventurer') {

                            character.class = 'Adventurer';
                            character.coins = character.coins - 60;
                            character.save();

                            channel.send({ content: 'You are now an Adventurer. The registration fee has been deducted and the channel will delete shortly.' })

                        } else if (interaction.values[0] === 'blacksmith') {

                            character.class = 'Blacksmith';
                            character.coins = character.coins - 60;
                            character.save();

                            channel.send({ content: 'You are now a Blacksmith. The registration fee has been deducted and the channel will delete shortly.' })

                        }
                    })

                    setTimeout(() => {
                        channel.delete()
                    }, 10000)

                })

            }

        }

    }
}

