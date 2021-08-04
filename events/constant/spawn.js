const TimeCycle = require('../../models/time.js');
const Inventory = require('../../models/inventory.js');
const Character = require('../../models/character.js');
const Discord = require('discord.js');

module.exports = {
    events: ['spawn'],
    description: '',
    callback: async (client, guild) => {

        const axelForest = client.channels.cache.get('860170657233109023')

        let dayToadEmbed = new Discord.MessageEmbed()
        .setTitle('A Giant Toad has been spotted.')
        .setDescription('Giant Toads, while big and strong, are not as dangerous during the day. They are much weaker and should be easier to exterminate for rookie adventurers.')

        let feralToadEmbed = new Discord.MessageEmbed()
        .setTitle('A Giant Toad has been spotted.')
        .setDescription('Giant Toads much more dangerous during the night. They will drop more loot and give more experience when slain.')


        TimeCycle.findOne({
            guildID: guild.id,
        },
        (err, timecycle) => {
            if(err) return console.error(err);

            const monsterFunc = async () => {

                /*if(timecycle.time == 'Day'){

                    axelForest.send(dayToadEmbed).then( async (m) => {
                        m.react('🗡️')
    
                        let memberReact;
                        const reactFilter = async (reaction, user) => {
                            reaction.emoji.name === '🗡️';
                            memberReact = reaction.message.guild.member(user);
    
                            if(user == client.user){
                            } else {
                                return ['🗡️'].includes(reaction.emoji.name);
                            }
                        }
    
                        
                    })

                } else if(timecycle.time == 'Night'){

                    axelForest.send({ embeds: feralToadEmbed }).then( async (m) => {
                        m.react('🗡️')
    
                        let memberReact;
                        const reactFilter = async (reaction, user) => {
                            reaction.emoji.name === '🗡️';
                            memberReact = reaction.message.guild.member(user);
    
                            if(user == client.user){
                            } else {
                                return ['🗡️'].includes(reaction.emoji.name);
                            }
                        }
    
                        m.awaitReactions(reactFilter, {
                            max: 1,
                            time: 600000,
                            errors: 'time',
                        }).then( async (collected) => {
    
                            const name = memberReact.user.username.toLowerCase();
    
                            if(!strtchan && !memberReact.roles.cache.has('858273964480135218') && !memberReact.roles.cache.has('860116486637748264') && !memberReact.roles.cache.has('859640375932092467')){
                                guild.channels.create(`${memberReact.user.username}-battle`).then(async channel => {
                                await channel.setParent('867760786134925353');
                    
                                await channel.updateOverwrite(memberReact, {
                                    "VIEW_CHANNEL": true,
                                    "SEND_MESSAGES": true,
                                    "READ_MESSAGE_HISTORY": true,
                                });
                    
                                channel.send({ content: `**${memberReact.user.nicname}** fight the giant toad and slay it before it kills you!`})
                                })
                            }   

                            Character.findOne({
                                guildID: guild.id,
                                userID: user.id,
                            },
                            (err, character) => {
                                if(err) return console.error(err);

                                Inventory.findOne({
                                    guildID: guild.id,
                                    userID: user.id,
                                },
                                (err, inventory) => {
                                    if(err) return console.error(err);

                                    let hasSowrd = false;
                                    let hasArmour = false;

                                    for(let i = 0; i <= inventory.items.length; i++){
                                        if(inventory.items[i] == 'shortsword'){
                                            hasSowrd = true;
                                        } else if(inventory.items[i] == 'light armour'){
                                            hasArmour = true;
                                        }
                                    }

                                    if(hasSowrd == true && hasArmour == true){

                                        

                                    }

                                })

                            })
    
                        }).catch(error => {
                            m.delete();
                        })
                    })
                }

                setTimeout(monsterFunc, 2000)*/
            }

            const waitFunc = () => {

                setTimeout(monsterFunc, 7000);

            }

            waitFunc();
            
        })

    }
}