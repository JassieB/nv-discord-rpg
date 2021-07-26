const Discord = require('discord.js');

module.exports = {
    commands: ['clear'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        if(!message.member.user.id == '714070826248437770'){
        };

        let amount = arguments[0];

        if (!amount){
            message.channel.send("Enter an amount to clear.")
        }  else {
            if(amount == 'channel'){
                let fetched = 0;
                do{
                    fetched = await message.channel.messages.fetch({limit: 100});
                    message.channel.bulkDelete(fetched, true);
                }
                while(fetched >= 2);
            } else {
                ++amount;
                message.channel.bulkDelete(amount);
            }
        }

    }
}