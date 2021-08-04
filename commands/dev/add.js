const mongo = require('../../mongo.js');
const Money = require('../../models/character.js');
const Discord = require('discord.js');
const settingSchema = require('../../models/guildsettings.js');

module.exports = {
    commands: ['addcoins', 'givecoins'],
    description: '',
    callback: async (message, client, guild, arguments) => {
        
        if(!message.member.user.id == '714070826248437770'){
            return;
        };

        let amount = arguments[0] ;
        let player = message.mentions.users.first();

        Money.findOne({
            guildID: guild.id,
            userID: player.id,
        },
        (err, money) => {
            if(err) return console.error(err);

            money.coins = money.coins + amount;

            money.save();

            message.channel.send("You added coins")
        })
    }
}