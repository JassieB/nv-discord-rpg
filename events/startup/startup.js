const Discord = require('discord.js');

module.exports = {
    events: ['startup-log'],
    description: '',
    callback: async (client, guild) => {
        
        console.log("Bot has Started")
        client.channels.cache.get('856448564849934337').send("Bot has Started");

    }
}