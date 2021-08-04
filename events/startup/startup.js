const Discord = require('discord.js');
const Settings = require('../../models/guildsettings.js');

module.exports = {
    events: ['startup-log'],
    description: '',
    callback: async (client, guild) => {
        
        Settings.findOne({
            guildID: guild.id,
        },
        (err, settings) => {
            if(err) console.error(err);

            if(settings.logsActive == true){
                client.channels.cache.get('856448564849934337').send({ content: "Bot has Started"} );
            }

        })
        
    }
}