const Discord = require('discord.js');
const getSettings = require('../../functions/fetchSettings');

/*
TODO:
- Update day count after 24 hours
- Update season after 32 days
- Update year after 4 seasons/128 days
*/

module.exports = {
    events: ['day/night-cycle'],
    description: '',
    callback: async (client, guild) => {

        const settings = await getSettings(client, guild.id);

        if (!settings) return;
        if (!settings.timeActive) return;

        // create day embed
        const dayEmbed = new Discord.MessageEmbed()
            .setColor('#e3ae00')
            .setDescription('Night has passed. You should be safe outside.')
            .setTimestamp();

        // create night embed
        const nightEmbed = new Discord.MessageEmbed()
            .setColor('#2b1f5c')
            .setDescription('Darkness falls. Beware of the creatures that lurk in it.')
            .setTimestamp();

        // function for getting channels and sending time embeds
        async function timeMessage(embed) {

            let chans = [];

            client.channels.cache.forEach(async channel => {
                if (channel.name.startsWith('🌆') || channel.name.startsWith('💰') || channel.name.startsWith('🌳')) {

                    chans.push(channel.id);

                }
            })

            for (let i = 0; i < chans.length; i++) {

                await client.channels.cache.get(chans[i]).send({ embeds: [embed] });

            }

        }


        // IIFE for starting time
        (async function updateTime() {

            // get the voice channel that displays time
            const timeChannel = guild.channels.cache.get('891627298145595443');

            // get the time from the voice channel name
            let time = timeChannel.name.split('');

            // get the hours from time
            var hours = [time[6], time[7]];

            switch (hours[1]) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                    hours[1] = parseInt(hours[1]) + 1;
                    hours[1] = hours[1].toString();
                    break;
                case '9':
                    hours[0] = parseInt(hours[0]) + 1;
                    hours[0] = hours[0].toString();
                    hours[1] = '0';
                    break;
            }

            // check that hours don't exceed 23
            if (hours[0] == '2' && hours[1] == '4') {
                hours[0] = '0';
                hours[1] = '0';
            }

            // update time array
            time[6] = hours[0];
            time[7] = hours[1];

            // create new time string
            let newTime = time.join('');

            if (parseInt(newTime.substr(6, 2)) == 20) {

                timeMessage(nightEmbed);

            } else if (parseInt(newTime.substr(6, 2)) == 04) {

                timeMessage(dayEmbed);

            }

            // set channel name
            await timeChannel.setName(newTime);

            setTimeout(() => { updateTime(); }, 420000)

        })()

    }
}