const Discord = require('discord.js');
const getLocations = require('../../functions/fetchLocations');
const Locations = require('../../models/location');
const getSettings = require('../../functions/fetchSettings.js');

module.exports = {
    commands: ['travel'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        const settings = await getSettings(client, guild.id);
        const location = await getLocations(client, message.channel.id, guild.id);

        let localOptions = [];
        let globalOptions = [];
        let selectedOptions;
        let locations;

        if (!settings) return;

        if (location) {

            location.subLocations.forEach(location => {

                localOptions.push({ label: location.name, value: location.channel })

            });

            locations = await Locations.find({})

            locations.forEach(loc => {

                let name = location.name.split(' ')[0];
                globalOptions.push({ label: name, value: loc.channel });

            })

        } else if (!location) {

            message.reply({ content: 'You must first leave the current building using `^leave`' });
            return;

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

                message.delete();
                msg = await message.channel.send({ content: `${message.member.user}`, embeds: [travelSelectEmbed], components: [rowSelect] });

                const filter = (interaction) => {
                    if (interaction.user.id != message.member.user.id) {
                        interaction.deferUpdate();
                    } else {
                        return interaction;
                    }
                };

                const collector = msg.createMessageComponentCollector({ filter, max: 2 });

                collector.on('collect', async (interaction) => {
                    interaction.deferUpdate();

                    if (interaction.values[0] == 'local') {

                        selectedOptions = localOptions;
                        msg.edit({ content: `${message.member.user}`, embeds: [locationSelectEmbed], components: [rowLocal] });

                    } else if (interaction.values[0] == 'global') {

                        selectedOptions = globalOptions;
                        msg.edit({ content: `${message.member.user}`, embeds: [locationSelectEmbed], components: [rowGlobal] });

                    } else {

                        selectedOptions.forEach(async val => {

                            if (interaction.values[0] == val.value) {

                                traveledEmbed.setAuthor(`${message.member.user.username} has left ${location.name}`)
                                arrivedEmbed.setAuthor(`${message.member.user.username} has arrived in ${val.label}`)

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