const Discord = require('discord.js');
const Settings = require('../../../models/guildsettings.js');

module.exports = {
    commands: ['markets'],
    description: '',
    callback: async (message, client, guild, arguments) => {
        
        Settings.findOne({
            guildID: guild.id,
        },
        async (err, settings) => {
            if(err) console.error(err);

            if(settings.commandsActive == true || message.member.user.id == '714070826248437770'){
                
                message.delete();

                const axel = client.channels.cache.get('860145504993411103');
                const axelGuild = client.channels.cache.get('868254705183260682');
                const axelSmith = client.channels.cache.get('860170056671428628');
                const axelMarkets = client.channels.cache.get('860170256739729418');
                const axelForest = client.channels.cache.get('860170657233109023');
                const ariosa = client.channels.cache.get('860146591658016788');
                const ariosaGuild = client.channels.cache.get('868254665308012575');
                const ariosaSmith = client.channels.cache.get('860170092821217280');
                const ariosaMarkets = client.channels.cache.get('860170322023284766');
                const ariosaForest = client.channels.cache.get('860170917774753792');
                const sloria = client.channels.cache.get('860146640190570527');
                const sloriaGuild = client.channels.cache.get('868254631841660969');
                const sloriaSmith = client.channels.cache.get('860170134689021952');
                const sloriaMarkets = client.channels.cache.get('860170357616017408');
                const sloriaForest = client.channels.cache.get('860170973206806578');
                const trasa = client.channels.cache.get('860146758944292885');
                const trasaGuild = client.channels.cache.get('868254586975191110');
                const trasaSmith = client.channels.cache.get('860170166263611412');
                const trasaMarkets = client.channels.cache.get('860170469117132831');
                const trasaForest = client.channels.cache.get('860171023626403910');
                const mohshire = client.channels.cache.get('860146788980097034');
                const mohshireGuild = client.channels.cache.get('868254563646447646');
                const mohshireSmith = client.channels.cache.get('860170218998726666');
                const mohshireMarkets = client.channels.cache.get('860170518900899893');
                const mohshireForest = client.channels.cache.get('860171058593136650');
        
                if(message.channel == axel){

                    await axel.permissionOverwrites.edit(message.member, {
                        "VIEW_CHANNEL": false,
                        "SEND_MESSAGES": false,
                        "READ_MESSAGE_HISTORY": false,
                        "ADD_REACTIONS": false,
                    });
            
                    await axelMarkets.permissionOverwrites.edit(message.member, {
                        "VIEW_CHANNEL": true,
                        "SEND_MESSAGES": true,
                        "READ_MESSAGE_HISTORY": true,
                        "ADD_REACTIONS": true,
                    });

                    let marketsEmbed = new Discord.MessageEmbed()
                    .setColor('#0fff93')
                    .setAuthor(`${message.member.nickname} is now exploring the markets.`);

                    let leaveEmbed = new Discord.MessageEmbed()
                    .setColor('#0fff93')
                    .setAuthor(`${message.member.nickname} is off the streets exploring the markets.`);

                    axel.send({ embeds: [ leaveEmbed ] });
                    axelMarkets.send({ embeds: [ marketsEmbed ] });

                }                

            }

        })

    }    
}