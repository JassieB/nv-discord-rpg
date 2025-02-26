const Discord = require('discord.js');
const getLocations = require('../../functions/fetchLocations')
const getLocalLocations = require('../../functions/fetchLocal');
const getGlobalLocations = require('../../functions/fetchGlobal');
const getSettings = require('../../functions/fetchSettings.js');

module.exports = {
    commands: ['travel'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        const settings = await getSettings(client, guild.id);
        const location = await getLocations(client, message.channel.id, guild.id);
        let localLocations;
        let globalLocations;
        let localOptions = [];
        let globalOptions = [];
        let selectedOptions;

        if (!settings) return;
        if (!location) return;

        if (location.type == "Global") {

            globalLocations = await getGlobalLocations(client, guild.id);

            if (globalLocations.length > 1) {

                await globalLocations.forEach(async loc => {

                    globalOptions.push({ label: `${loc.town}`, value: `${loc.channel}` })

                });

            } else {

                globalOptions.push({ label: `${globalLocations[0].town}`, value: `${globalLocations[0].channel}` })

            }

        } else {

            localLocations = await getLocalLocations(client, location.town, guild.id);

            await localLocations.forEach(async loc => {

                localOptions.push({ label: `${loc.name}`, value: `${loc.channel}` })

            });

        }

        if (settings.commandsActive == true || message.member.user.id == '714070826248437770') {

            try {

                let traveledEmbed = new Discord.MessageEmbed()
                let arrivedEmbed = new Discord.MessageEmbed()

                let travelSelectEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Requested by ${message.member.nickname}`)
                    .setTitle("Would you like to travel Global or Local?")
                    .setDescription("**Global:** Travel to another town     ***Not available yet***.\n**Local:** Travel to buildings or locations of your current town.")

                let locationSelectEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Requested by ${message.member.nickname}`)
                    .setTitle("Choose a location to travel to");

                let localSelect = new Discord.MessageSelectMenu()
                    .setCustomId('travel')
                    .setPlaceholder('Locations')
                    .addOptions(localOptions)

                let globalSelect = new Discord.MessageSelectMenu()
                    .setCustomId('travel')
                    .setPlaceholder('Locations')
                    .addOptions(globalOptions)

                let travelSelect = new Discord.MessageSelectMenu()
                    .setCustomId('travel')
                    .setPlaceholder('Locations')
                    .addOptions(
                        {
                            label: 'Global',
                            value: 'global'
                        },
                        {
                            label: 'Local',
                            value: 'local'
                        }
                    )

                let rowLocal = new Discord.MessageActionRow()
                    .addComponents(
                        localSelect,
                    )

                let rowGlobal = new Discord.MessageActionRow()
                    .addComponents(
                        globalSelect,
                    )

                let rowSelect = new Discord.MessageActionRow()
                    .addComponents(
                        travelSelect,
                    )

                let msg;
                let max;

                if (location.type == "Local") {

                    message.delete();
                    max = 1;
                    msg = await message.channel.send({ content: `${message.member.user}`, embeds: [locationSelectEmbed], components: [rowLocal] });

                } else {

                    message.delete();
                    max = 2;
                    msg = await message.channel.send({ content: `${message.member.user}`, embeds: [travelSelectEmbed], components: [rowSelect] });

                }

                const filter = (interaction) => {
                    if (interaction.user.id != message.member.user.id) {
                        interaction.deferUpdate();
                    } else {
                        return interaction;
                    }
                };

                const collector = msg.createMessageComponentCollector({ filter, max: max });

                collector.on('collect', async (interaction) => {
                    interaction.deferUpdate();

                    if (max == 2) {

                        if (interaction.values[0] == 'local') {

                            selectedOptions = localOptions;
                            msg.edit({ content: `${message.member.user}`, embeds: [locationSelectEmbed], components: [rowLocal] });

                        } else if (interaction.values[0] == 'global') {

                            selectedOptions = globalOptions;
                            msg.edit({ content: `${message.member.user}`, embeds: [locationSelectEmbed], components: [rowGlobal] });

                        } else {

                            selectedOptions.forEach(async val => {

                                if (interaction.values[0] == val.value) {

                                    traveledEmbed.setAuthor(`${message.member.user.username} has left the ${location.name}`)
                                    arrivedEmbed.setAuthor(`${message.member.user.username} has arrived in the ${val.label}`)

                                    let newLoc = guild.channels.cache.find(channel => channel.id === val.value);

                                    await newLoc.permissionOverwrites.edit(message.member, {
                                        "VIEW_CHANNEL": true,
                                        "SEND_MESSAGES": true,
                                        "ADD_REACTIONS": true,
                                        "READ_MESSAGE_HISTORY": true,
                                    });

                                    await message.channel.permissionOverwrites.edit(message.member, {
                                        "VIEW_CHANNEL": false,
                                        "SEND_MESSAGES": false,
                                        "ADD_REACTIONS": false,
                                        "READ_MESSAGE_HISTORY": false,
                                    });

                                    message.channel.send({ embeds: [traveledEmbed] });
                                    newLoc.send({ embeds: [arrivedEmbed] });

                                }

                            })

                        }

                    } else {

                        localOptions.forEach(async val => {

                            if (interaction.values[0] == val.value) {

                                traveledEmbed.setAuthor(`${message.member.user.username} has left the ${location.name}`)
                                arrivedEmbed.setAuthor(`${message.member.user.username} has arrived in the ${val.label}`)

                                let newLoc = guild.channels.cache.find(channel => channel.id === val.value);

                                await newLoc.permissionOverwrites.edit(message.member, {
                                    "VIEW_CHANNEL": true,
                                    "SEND_MESSAGES": true,
                                    "ADD_REACTIONS": true,
                                    "READ_MESSAGE_HISTORY": true,
                                });

                                await message.channel.permissionOverwrites.edit(message.member, {
                                    "VIEW_CHANNEL": false,
                                    "SEND_MESSAGES": false,
                                    "ADD_REACTIONS": false,
                                    "READ_MESSAGE_HISTORY": false,
                                })

                                message.channel.send({ embeds: [traveledEmbed] });
                                newLoc.send({ embeds: [arrivedEmbed] });

                            }

                        })

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