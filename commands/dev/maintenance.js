const Discord = require('discord.js');

module.exports = {
    commands: ['maintenance'],
    description: '',
    callback: async (message, client, guild, arguments) => {
        if(!message.member.user.id == '714070826248437770'){
            return;
        };

        const bot = guild.members.cache.get('856191346146803713');
        const status = arguments[0];

        if(status == 'on'){
            bot.roles.add('867760855109992468');
            message.reply("Maintenance on");
        } else if(status == 'off'){
            bot.roles.remove('867760855109992468');
            message.reply("Maintenance off");
        }
    }
}