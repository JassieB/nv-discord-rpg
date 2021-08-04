const Discord = require('discord.js');
const Character = require('../../models/character.js');
const Inventory = require('../../models/inventory.js');
const Settings = require('../../models/guildsettings.js');

module.exports = {
    commands: ['buy'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        Settings.findOne({
            guildID: guild.id,
        },
        (err, settings) => {
            if(err) console.error(err);

            if(settings.commandsActive == true || message.member.user.id == '714070826248437770'){

                let itemName = arguments[0];

                const itemFile = require(`../../items/${itemName}.json`);

                Character.findOne({
                    guildID: guild.id,
                    userID: message.member.user.id,
                },
                (err, character) => {
                    if(err) return console.error(err);

                    Inventory.findOne({
                        guildID: guild.id,
                        userID: message.member.user.id,
                    },
                    (err, inventory) => {
                        if(err) return console.error(err);

                        if(character.coins < itemFile.price){
                            message.channel.reply('You do not have enough coins to buy this item.');
                        } else if((inventory.currentWeight + itemFile.weight) > inventory.maxWeight){
                            message.channel.reply('You do not have enough space to carry this item.');
                        } else {
                    
                            character.save();
                            character.coins = character.coins - itemFile.price;
                            inventory.currentWeight = inventory.currentWeight + itemFile.weight;
                            inventory.items.push(itemFile.name);
                            inventory.save()

                            let buyEmbed = new Discord.MessageEmbed()
                            .setTitle(`${message.member.nickname} bought ${itemFile.article} ${itemFile.name} from the Blacksmith`)
                            .setDescription(`Cost: ${itemFile.price}\nDamage: ${itemFile.damage}\n Weight: ${itemFile.weight}`)
                            .setTimestamp();

                            message.channel.send({ embeds: [ buyEmbed ] });
                    
                        }

                    })

                })

            }

        })

    }
}