const Discord = require('discord.js');
const Locations = require('../../models/location');
const getSettings = require('../../functions/fetchSettings');
const getCharacter = require('../../functions/fetchCharacters');

module.exports = {
    commands: ['leave'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        try {

            // fetch all required documents and verify they exist
            const settings = getSettings(client, guild.id);
            const character = getCharacter(client, message.author.id, guild.id);

            if (!character) return;
            if (!settings.commandsActive && !message.member.user.id == '714070826248437770') return message.reply('The game is currently paused.');

            const location = await Locations.findOne({ name: character.location })
            if (!location) return;

            // get location channel
            const channel = client.channels.cache.get(location.channel);

            // update locations/channel permissions
            await message.channel.permissionOverwrites.edit(message.member, {
                "VIEW_CHANNEL": false,
                "SEND_MESSAGES": false,
                "ADD_REACTIONS": false,
                "READ_MESSAGE_HISTORY": false,
            });

            await channel.permissionOverwrites.edit(message.member, {
                "VIEW_CHANNEL": true,
                "SEND_MESSAGES": true,
                "ADD_REACTIONS": true,
                "READ_MESSAGE_HISTORY": true,
            });

            // create embed
            let leaveEmbed = new Discord.MessageEmbed()
                .setDescription(`${message.member.nickname} has left the ${message.channel.name.substr(3)}`)
                .setTimestamp();

            // send and delete embed
            const msg1 = await message.channel.send({ embeds: [leaveEmbed] })
            const msg2 = await channel.send({ embeds: [leaveEmbed] }).delete({ timeout: 15000 });

            setTimeout(() => {

                msg1.delete();
                msg2.delete();

            })

        } catch (error) {

            const logChannel = client.channels.cache.get('859802682599800852');

            logChannel.send({ content: `${error}` });

        }

    }

}