const Discord = require('discord.js');
const locationsSchema = require('../../models/location');

module.exports = {
    commands: ['addl'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        console.log('starting')

        new locationsSchema({
            guildID: guild.id,
            userID: 'No owner',
            username: 'No owner',
            town: 'Axel',
            channel: message.channel.id,
        }).save()

        console.log('worked')

    }
}