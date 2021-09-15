const Discord = require('discord.js');
const getLocations = require('../../functions/fetchLocations');
const Locations = require('../../models/location');
const getSettings = require('../../functions/fetchSettings.js');

module.exports = {
    commands: ['track'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        const settings = await getSettings(client, guild.id);
        const location = await getLocations(client, message.channel.id, guild.id);

    }
}