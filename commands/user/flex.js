const Character = require('../../models/character.js');
const Inventory = require('../../models/inventory.js');
const Discord = require('discord.js');
const Settings = require('../../models/guildsettings.js');

module.exports = {
    commands: ['flex'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        Settings.findOne({
            guildID: guild.id,
        },
        (err, settings) => {
            if(err) console.error(err);

            if(settings.commandsActive == true || message.member.user.id == '714070826248437770'){
    
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

                        if(!character || !inventory){

                            message.reply({ content: 'You do not have a character' });

                        } else {
                            
                            const flexEmbed = new Discord.MessageEmbed()
                            .setTitle(`${character.charName}'s stats`)
                            .setColor('#ffffff')
                            .setThumbnail(message.member.user.avatarURL())
                            .addField('Age:', character.charAge, true)
                            .addField('Class:', character.class, true)
                            .addField('Coins:', character.coins, true)
                            .addField('Level:', character.level, true)
                            .addField('Skillpoints:', character.skillPoints, true)
                            .addField('\u200B', '\u200B', true)
                            .addField('Strength:', character.strength, true)
                            .addField('Intelligence:', character.intelligence, true)
                            .addField('Speed:', character.speed, true)
                            .addField('Agility:', character.agility, true)
                            .addField('Dexterity:', character.dexterity, true)
                            .addField('Charisma:', character.charisma, true)
                            .addField('Magic', character.magic, false)
                            .setFooter(`${message.member.user.tag}'s character`);
    
                            message.channel.send({ embeds: [ flexEmbed ] });

                        }
    
                    })
    
                })

            }
        })
    }
}