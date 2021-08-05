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
                            .addField('Age:', character.charAge.toString(), true)
                            .addField('Class:', character.classtoString(), true)
                            .addField('Coins:', character.coinstoString(), true)
                            .addField('Level:', character.leveltoString(), true)
                            .addField('Skillpoints:', character.skillPointstoString(), true)
                            .addField('\u200B', '\u200B', true)
                            .addField('Strength:', character.strengthtoString(), true)
                            .addField('Intelligence:', character.intelligencetoString(), true)
                            .addField('Speed:', character.speedtoString(), true)
                            .addField('Agility:', character.agilitytoString(), true)
                            .addField('Dexterity:', character.dexteritytoString(), true)
                            .addField('Charisma:', character.charismatoString(), true)
                            .addField('Magic', character.magictoString(), false)
                            .setFooter(`${message.member.user.tag}'s character`);
    
                            message.channel.send({ embeds: [ flexEmbed ] });

                        }
    
                    })
    
                })

            }
        })
    }
}