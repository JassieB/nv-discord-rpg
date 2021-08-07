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

                        client.channels.cache.forEach(async channel => {
                            if(channel.name.startsWith('🌆') || channel.name.startsWith('🛡') || channel.name.startsWith('🔨') || channel.name.startsWith('💰') || channel.name.startsWith('🌳')){

                                chans.push(channel.id);

                            }
                        })

                        for(let i = 0; i < chans.length; i++){

                            await client.channels.cache.get(chans[i]).send({ embeds: [ embed ], files: [ image ] });

                        }

                    }

                    const clearMinute = async () => {

                        timecycle.minutesLeft = timecycle.minutesLeft - 1;
                        timecycle.save();

                    }

                    const setNights = async () => {

                        timecycle.minutesLeft = 50;
                        timecycle.time = 'Night';
                        timecycle.save();
                        getChannels(nightEmbed, nightImg1);

                        let interval4 = setInterval(clearMinute, 60 * 1000);

                        setTimeout(() => {
                            clearInterval(interval4)
                            setDays();
                        }, 50 * 60 * 1000);

                    }

                    const setDays = async () => {

                        timecycle.minutesLeft = 90;
                        timecycle.time = 'Day';
                        timecycle.save();
                        getChannels(dayEmbed, dayImg1);

                        let interval3 = setInterval(clearMinute, 60 * 1000);

                        setTimeout(() => {
                            clearInterval(interval3)
                            setNights();
                        }, 90 * 60 * 1000);

                    }

                    if(timecycle.time == 'Day'){

                        let timeoutTime = timecycle.minutesLeft * 60 * 1000;

                        let interval1 = setInterval(clearMinute, 60 * 1000);

                        setTimeout(() => {
                            clearInterval(interval1)
                            setNights();
                        }, timeoutTime);

                    } else if(timecycle.time == 'Night'){

                        let timeoutTime = timecycle.minutesLeft * 60 * 1000;

                        let interval2 = setInterval(clearMinute, 60 * 1000);

                        setTimeout(() => {
                            clearInterval(interval2)
                            setDays();
                        }, timeoutTime); 

                    }

                })

            }

        })
        
    }
}