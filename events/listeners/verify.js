const Dicord = require('discord.js');

module.exports = {
    events: ['verify'],
    description: '',
    callback: async (client, guild) => {

        const chan = client.channels.cache.get('856103300415094844');
        const msg = chan.messages.fetch('859840334355365900');
        const emoji = ":Verify:867792825821954068";

        const watch = async () => {

            msg.then(async (m) => {
    
                m.react(":Verify:867792825821954068")
                let memberReact;
                const reactFilter = (reaction, user) => {
                    reaction.emoji.id === '867792825821954068';
                    memberReact = reaction.message.guild.member(user);

                    if(user == client.user){
                    } else {
                        reaction.users.remove(user.id);
                        return ['867792825821954068'].includes(reaction.emoji.id);
                    }
                }
        
                m.awaitReactions(reactFilter, { max: 1, time: 100000000, errors: 'time' })
                .then(async (collected) => {

                    const name = memberReact.user.username.toLowerCase();
                    const strtchan = guild.channels.cache.find(channel => channel.name === `${name}-starting`);

                    if(!strtchan && !memberReact.roles.cache.has('858273964480135218') && !memberReact.roles.cache.has('860116486637748264') && !memberReact.roles.cache.has('859640375932092467')){
                        guild.channels.create(`${memberReact.user.username}-starting`).then(async channel => {
                            await channel.setParent('867760786134925353');
                        
                            await channel.updateOverwrite(memberReact, {
                                "VIEW_CHANNEL": true,
                                "SEND_MESSAGES": true,
                                "READ_MESSAGE_HISTORY": true,
                            });
                        
                            memberReact.roles.add('867761358296711218');
                            channel.send(`**Welcome ${memberReact.user.username}!**\nTo learn about the game before you play, you can use \`^howtoplay\` to find out all the info.\nOnce you are set to go, use \`^startgame\` to start your adventure!`)
                        })
                    }

                    watch();

                }).catch(error => {
                    watch();
                })
            })

        }
        watch();
    }
}