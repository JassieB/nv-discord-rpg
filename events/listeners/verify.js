const Discord = require('discord.js');

module.exports = {
    events: ['verify'],
    description: '',
    callback: async (client, guild) => {

        try {

            // get welcome channel
            const chan = client.channels.cache.get('856103300415094844');

            (async function () {

                // create interaction filter
                const filter = (interaction) => {

                    const member = guild.members.cache.get(interaction.user.id);

                    // find member starting channel
                    const membChan = client.channels.cache.find(channel => channel.name === `${interaction.user.username.toLowerCase()}-starting`);

                    // defer if member is verified or already has a starting channel
                    if (member.roles.cache.has('867761358296711218') || membChan) {

                        interaction.deferUpdate();

                    } else {

                        return interaction;

                    }

                };

                const collector = chan.createMessageComponentCollector({ filter });

                collector.on('collect', async (interaction) => {

                    // get guild member and generate colour
                    const member = guild.members.cache.get(interaction.user.id);
                    const colour = '#' + Math.floor(Math.random() * (Math.floor(Math.random() * (16000000 - 6000000) + 6240000) - Math.floor(Math.random() * (12000000 - 4000000) + 4000000)) + Math.floor(Math.random() * (12000000 - 4000000) + 4500000)).toString(16);

                    interaction.deferUpdate();

                    // add verified role
                    member.roles.add('867761358296711218');

                    let welcomeEmbed = new Discord.MessageEmbed()
                        .setTitle(`**Welcome ${member.user.username}!**`)
                        .setDescription("This Server and Bot are still deep in the develpment stages. Things might break, be buggy or missing, but don't let that put you off!\nBefore you begin, you can use \`^howtoplay\` to read up on how the game works. When you're ready to get started, you can use `^startgame` to start the character creation process and enter the game.")
                        .setColor(colour)
                        .setTimestamp();

                    // create and edit channel permissions
                    guild.channels.create(`${member.user.username.toLowerCase()}-starting`).then(async channel => {

                        await channel.setParent('867760786134925353');

                        await channel.permissionOverwrites.edit(member, {
                            "VIEW_CHANNEL": true,
                            "SEND_MESSAGES": true,
                            "READ_MESSAGE_HISTORY": true,
                        });

                        // send embed
                        await channel.send({ embeds: [welcomeEmbed] });

                    });

                });

            })();

        } catch (error) {

            const logChannel = client.channels.cache.get('859802682599800852');

            logChannel.send({ content: `${error}` });

        }

    }
}