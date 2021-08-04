const TimeCycle = require('../../models/time.js');
const Discord = require('discord.js');
const Settings = require('../../models/guildsettings.js');

module.exports = {
    events: ['day/night-cycle'],
    description: '',
    callback: async (client, guild) => {

        Settings.findOne({
            guildID: guild.id,
        },
        (err, settings) => {
            if(err) console.error(err);

            if(settings.timeActive == true){
                
                TimeCycle.findOne({
                    guildID: guild.id,
                },
                (err, timecycle) => {
                    if(err) return console.error(err);

                    const dayImg1 = new Discord.MessageAttachment('./assets/timecycle/sunrise.jpg')
                    const dayEmbed = new Discord.MessageEmbed()
                    .setTitle('The sun rises. Night is over.')
                    .setColor('#e3ae00')
                    .setImage('attachment://sunrise.jpg')
                    .setDescription('Monsters spawn less frequently than in the night. Monsters that spawn during the day give less loot and are weaker.')
                    .setTimestamp();

                    const nightImg1 = new Discord.MessageAttachment('./assets/timecycle/sunset.jpg')
                    const nightEmbed = new Discord.MessageEmbed()
                    .setTitle('The sun sets. Night begins.')
                    .setColor('#2b1f5c')
                    .setImage('attachment://sunset.jpg')
                    .setDescription('Monsters spawn frequently during the night. Monsters that spawn during the night give more loot and are stronger.')
                    .setTimestamp();

                    const getChannels = async (embed, image) => {

                        let chans = [];

                        client.channels.cache.forEach(channel => {
                            if(channel.name.startsWith('🌆') || channel.name.startsWith('🛡') || channel.name.startsWith('🔨') || channel.name.startsWith('💰') || channel.name.startsWith('🌳')){

                                chans.push(channel.id);

                            }
                        })

                        for(let i = 0; i < chans.length; i++){

                            await client.channels.cache.get(chans[i]).send({ embeds: [ embed ], files: [ image ] });

                        }

                    }

                    const setNights = async () => {

                        timecycle.timeLeft = 50;
                        getChannels(nightEmbed, nightImg1);

                        setTimeout(setDays, 50 * 60 * 1000);

                    }

                    const setDays = async () => {

                        timecycle.timeLeft = 90;
                        getChannels(dayEmbed, dayImg1);

                        setTimeout(setDays, 90 * 60 * 1000);

                    }

                    if(timecycle.time == 'Day'){

                        let timeout = timecycle.timeLeft * 60 * 1000;

                        setTimeout(setNights, timeout);

                    } else if(timecycle.time == 'Night'){

                        let timeout = timecycle.timeLeft * 60 * 1000;

                        setTimeout(setDays, timeout);

                    }

                })

            }

        })
        
    }
}