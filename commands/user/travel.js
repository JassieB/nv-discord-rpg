const Discord = require('discord.js');
const getLocations = require('../../functions/fetchLocations')
const getLocalLocations = require('../../functions/fetchLocal');
const getSettings = require('../../functions/fetchSettings.js');

module.exports = {
    commands: ['travel'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        const settings = await getSettings(client, guild.id);
        const location = await getLocations(client, message.channel.id, guild.id);
        const locations = await getLocalLocations(client, location.town, guild.id);

        if (!settings) return;
        if (!location) return;
        if (!locations) return;

        if (settings.commandsActive == true || message.member.user.id == '714070826248437770') {

            let travelSelectEmbed = new Discord.MessageEmbed()
                .setAuthor(`Requested by ${message.member.nickname}`)
                .setTitle("Would you like to travel Global or Local?")
                .setDescription("**Global:** Travel to another town     ***Not available yet***.\n**Local:** Travel to buildings or locations of your current town.")

            let localSelectEmbed = new Discord.MessageEmbed()
                .setAuthor(`Requested by ${message.member.nickname}`)
                .setTitle("Choose a location to travel to");

            let options = [];

            await locations.forEach(async loc => {

                options.push({ label: `${loc.name}`, value: `${loc.channel}` })

            })

            let localSelect = new Discord.MessageSelectMenu()
                .setCustomId('travel')
                .setPlaceholder('Locations')
                .addOptions(options)

            let globalSelect = new Discord.MessageSelectMenu()
                .setCustomId('travel')
                .setPlaceholder('Locations')
                .addOptions(options)

            let travelSelect = new Discord.MessageSelectMenu()
                .setCustomId('travel')
                .setPlaceholder('Locations')
                .addOptions(
                    {
                        label: 'Local',
                        value: 'local'
                    },
                    // {
                    //     label: 'Global',
                    //     value: 'global'
                    // }
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

            try {

                const msg = await message.channel.send({ embeds: [travelSelectEmbed], components: [rowSelect] });

            } catch (error) {

                const logChannel = client.channels.cache.get('859802682599800852');

                logChannel.send({ content: `${error} \n${message.url}` });

            }

        }

    }
}