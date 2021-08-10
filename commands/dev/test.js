const Discord = require('discord.js');


module.exports = {
    commands: ['testbuttons'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        if (!message.member.user.id == '714070826248437770') {
        };

        const btn1 = new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setCustomId("1")
            .setLabel("Enable");

        const btn2 = new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setCustomId("2")
            .setLabel("Disable");

        const row = new Discord.MessageActionRow()
            .addComponents(
                btn1,
                btn2,
            )

        const msg = await message.channel.send({ content: 'Testing buttons', components: [row] });

        const collector = msg.createMessageComponentCollector({ idle: 20000 });

        collector.on('collect', (interaction, user) => {
            console.log(interaction, user)
        })

    }
}