const Dicord = require('discord.js');

module.exports = {
    events: ['verify'],
    description: '',
    callback: async (client, guild) => {

        // create function to recall after each reaction
        const watch = async () => {

            // fetch verification message
            const chan = client.channels.cache.get('856103300415094844');
            const message = chan.messages.fetch('859840334355365900').then(async (m) => {

                const reactFilter = (reaction, user) => {
                    reaction.emoji.id === '867792825821954068';
                    memberReact = reaction.message.guild.member(user);

                    if(user == client.user){
                    } else {
                        return ['867792825821954068'].includes(reaction.emoji.id);
                    }
                }

                const collector = m.createReactionCollector({ reactFilter, time: 1000000000, max: 1 });

                collector.on('collect', async (reaction, user) => {

                    reaction.users.remove(user.id);

                    const member = guild.members.cache.get(user.id);

                    const startChannel = client.channels.cache.find(channel => channel.name === `${user.username.toLowerCase()}-starting`);

                    if(!startChannel && !member.roles.cache.has('858273964480135218') && !member.roles.cache.has('860116486637748264') && !member.roles.cache.has('859640375932092467')){

                        guild.channels.create(`${user.username.toLowerCase()}-starting`).then(async channel => {
                            await channel.setParent('867760786134925353');

                            await channel.permissionOverwrites.edit(member, {
                                "VIEW_CHANNEL": true,
                                "SEND_MESSAGES": true,
                                "READ_MESSAGE_HISTORY": true,
                            })

                            await channel.send({ content: `**Welcome ${user.username}!**\nThis Server and Bot are still deep in the develpment stages. Things might break, be buggy or missing, but don't let that put you off! The developer works on it almost 24/7.\nWhen you're ready to get started, you can use \`^startgame\` to start the character creation process and enter the game.` })

                        })

                        watch();

                    } else {
                        watch();
                    } 

                })
            })

            setTimeout(() => {
                watch();
            }, 1000000000)

        }

        watch();
    }
}