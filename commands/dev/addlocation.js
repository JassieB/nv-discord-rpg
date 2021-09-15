const Discord = require('discord.js');
const Locations = require('../../models/location');

module.exports = {
    commands: ['addlocation'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        if (!message.member.user.id == '714070826248437770') {
            return;
        };

        const name = message.channel.name.substr(3);

        new Locations({
            guildID: guild.id,
            userID: message.member.user.id,
            founder: message.member.user.tag,
            name: name,
            channel: message.channel.id,
        }).save()

    }
}