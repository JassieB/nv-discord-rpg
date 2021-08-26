const Discord = require('discord.js');
const Settings = require('../../models/guildsettings.js');

module.exports = {
    commands: ['shop'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        Settings.findOne({
            guildID: guild.id,
        },
            (err, settings) => {
                if (err) console.error(err);

                if (settings.commandsActive == true || message.member.user.id == '714070826248437770') {

                    let shopEmbed = new Discord.MessageEmbed()
                        .setTitle('Here are all the items currently available');

                    shopJSON.forEach(item => {
                        shopEmbed.addField(`${item.name}`, `${item.price}`)
                    })

                    message.channel.send({ embeds: [shopEmbed] })

                }

            })

    }
}