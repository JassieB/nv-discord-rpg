const Discord = require('discord.js');

module.exports = {
    events: ['verify'],
    description: '',
    callback: async (client, guild) => {

        const chan = client.channels.cache.get('856103300415094844');

        (async function () {

            const filter = (interaction) => {

                const member = guild.members.cache.get(interaction.user.id);
                if (member.roles.cache.has('867761358296711218')) {
                    interaction.deferUpdate();
                } else {
                    return interaction;
                }

            };

            const collector = chan.createMessageComponentCollector({ filter })

            collector.on('collect', async (interaction) => {

                const member = guild.members.cache.get(interaction.user.id);
                interaction.deferUpdate();
                member.roles.add('867761358296711218');

                guild.channels.create(`${member.user.username.toLowerCase()}-starting`).then(async channel => {
                    await channel.setParent('867760786134925353');

                    await channel.permissionOverwrites.edit(member, {
                        "VIEW_CHANNEL": true,
                        "SEND_MESSAGES": true,
                        "READ_MESSAGE_HISTORY": true,
                    })

                    await channel.send({ content: `**Welcome ${member.user.username}!**\nThis Server and Bot are still deep in the develpment stages. Things might break, be buggy or missing, but don't let that put you off! Updates roll out at least once a week.\nWhen you're ready to get started, you can use \`^startgame\` to start the character creation process and enter the game.` })

                });

            });

        })()

    }
}