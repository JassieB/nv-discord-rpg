const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    commands: ['testbuttons'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        if (!message.member.user.id == '714070826248437770') {
        };

        let DBFolder = './Database/Testingcount'

        fs.readdir(DBFolder, async function (err, files) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            files.forEach(async function (file, index) {
                if (file.startsWith(`testbuttons`)) {
                    console.log(file)
                } else {
                    let count = { "count": 1 };
                    let countJSON = JSON.stringify(count);

                    console.log('before')

                    fs.writeFileSync(DBFolder + '/testbuttons', countJSON);

                    console.log('after')
                }
            })

        })

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

            console.log(user)

            switch (interaction.customId) {

                case '1':
                    return btn2.setDisabled(false);
                case '2':
                    return btn2.setDisabled(true);

            }

        })

    }
}