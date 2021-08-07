const Discord = require('discord.js');

module.exports = {
    commands: ['howtoplay'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        let mainpage = new Discord.MessageEmbed()
            .setTitle("1")
            .setDescription("lol")
        
        let embed2 = new Discord.MessageEmbed()
            .setTitle("2")
        .setDescription("lol")
        
        let embed3 = new Discord.MessageEmbed()
            .setTitle("3")
        .setDescription("lol")
        
        let embed4 = new Discord.MessageEmbed()
            .setTitle("4")
        .setDescription("lol")
        
        let embed5 = new Discord.MessageEmbed()
            .setTitle("5")
        .setDescription("lol")
        
        const row1 = new Discord.MessageActionRow()
            .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("htp-list")
                .setPlaceholder("Test")
                    .addOptions(
                        {
                            label: "Test list",
                            value: "test-list"
                        },
                        {
                            label: "Test list 2",
                            value: "test-list2"
                        }
                )
        )
        
        const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("1")
                    .setLabel("1"),
                new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("2")
                    .setLabel("2"),
                new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("3")
                    .setLabel("3"),
                new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("4")
                    .setLabel("4"),
        )

        tradeEmbeds = [
            embed2,
            embed4
        ];

        guildEmbeds = [
            embed3,
            embed5
        ];

        let current;

        let page = 0;

        current = mainpage;

        message.channel.send({ embeds: [ current ], components: [row1, row2] }).then(async (m) => {

            const filter = async (interaction) => {

                if(interaction.user.id === message.author.id) {
                    return true;
                } else {
                    interaction.followUp({ content: 'This message isn\'t for you' })
                }

            }

            const collector = m.channel.createMessageComponentCollector({ filter, idle: 20000 })

            collector.on('collect', async (interaction, user) => {

                interaction.deferUpdate();

                if(current == mainpage){
                    return
                }

                if(interaction.isButton()){

                    switch (interaction.customId) {
                    
                        case '1':
                            page = 0;
                            return m.edit({ embeds: [current[page]] });
                        case '2':
                            return m.edit({ embeds: [current[--page]] });
                        case '3':
                            return m.edit({ embeds: [current[++page]] });
                        case '4':
                            page = embeds.length - 1;
                            return m.edit({ embeds: [current[page]] });

                    }

                } else if (interaction.isSelectMenu()) {
                    
                    switch(interaction.value){
                        
                        case 'test-list2':
                            return current = tradeEmbeds;
                        case 'test-list':
                            return current = guildEmbeds;

                    }

                }

            })

        })
        

    }
}
