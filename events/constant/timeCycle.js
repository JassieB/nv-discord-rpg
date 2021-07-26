const TimeCycle = require('../../models/time.js');
const TimeCycleSchema = require('../../models/time.js');
const Discord = require('discord.js');

module.exports = {
    events: ['day/night-cycle'],
    description: '',
    callback: async (client, guild) => {

        TimeCycle.findOne({
            guildID: guild.id,
        },
        (err, timecycle) => {
            if(err) return console.error(err);

            const daytime = async () => {

                TimeCycle.findOne({
                    guildID: guild.id,
                },
                (err, timecycle) => {
                    if(err) return console.error(err);
    
                    timecycle.time = 'Day';
                    timecycle
                });
    
                const dayEmbed = new Discord.MessageEmbed()
                .setTitle('The sun rises. Night is over.')
                .setColor('#e3ae00')
                .setDescription('Monsters spawn less frequently than in the night. Monsters that spawn during the day give less loot and are weaker.')
                .setTimestamp();
    
                client.channels.cache.get('860145504993411103').send(dayEmbed);
                client.channels.cache.get('868254705183260682').send(dayEmbed);
                client.channels.cache.get('860170056671428628').send(dayEmbed);
                client.channels.cache.get('860170256739729418').send(dayEmbed);
                client.channels.cache.get('860170657233109023').send(dayEmbed);
    
                setTimeout(nighttime, 4800000)
            }
    
            const nighttime = async () => {

                TimeCycle.findOne({
                    guildID: guild.id,
                },
                (err, timecycle) => {
                    if(err) return console.error(err);
    
                    timecycle.time = 'Night';
                    timecycle
                });
    
                const nightEmbed = new Discord.MessageEmbed()
                .setTitle('The sun sets. Night begins.')
                .setColor('#2b1f5c')
                .setDescription('Monsters spawn frequently during the night. Monsters that spawn during the night give more loot and are stronger.')
                .setTimestamp();
    
                client.channels.cache.get('860145504993411103').send(nightEmbed);
                client.channels.cache.get('868254705183260682').send(nightEmbed);
                client.channels.cache.get('860170056671428628').send(nightEmbed);
                client.channels.cache.get('860170256739729418').send(nightEmbed);
                client.channels.cache.get('860170657233109023').send(nightEmbed);
    
                setTimeout(daytime, 2400000)
            }
    


            if(!timecycle){

                new TimeCycleSchema({
                    guildID: guild.id,
                    time: 'Day',
                }).save();

                daytime();

            }

            if(timecycle.time == 'Day'){
                daytime();
            } else if(timecycle.time == 'Night'){
                nighttime();
            }
        })
        
    }
}