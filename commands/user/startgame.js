const mongo = require('../../mongo.js');
const Character = require('../../models/character.js');
const Inventory = require('../../models/inventory.js');
const charSchema = require('../../models/character.js');
const invSchema = require('../../models/inventory.js');
const Discord = require('discord.js');
const Settings = require('../../models/guildsettings.js');

module.exports = {
    commands: ['startgame'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        Settings.findOne({
            guildID: guild.id,
        }, 
        (err, settings) => {
            if(err) return console.error(err);

            if(settings.commandsActive == true || message.member.id == '714070826248437770'){

                Character.findOne({
                    guildID: guild.id,
                    userID: message.author.id,
                },
                async (err, character) => {
                    if(err) return console.errpr(err);
        
                    Inventory.findOne({
                        guildID: guild.id,
                        userID: message.author.id,
                    },
                    async (err, inventory) => {
                        if(err) return console.log(err);

                        if(message.channel.name !== `${message.member.user.username.toLowerCase()}-starting`){
                            return;
                        }
        
                        if(!character && !inventory){
        
                            await message.channel.send("**Loading assets and configuration...**");
                            await message.channel.send("**Loading story and NPCs...**");
                            await message.channel.send("**Loading Complete**");
                            await message.channel.send("**Starting game...**");
                            await message.channel.send("⁣⁣⁣⁣⁣⁣");
                            await message.channel.send("Hello aspiring adventurer!");
                            await message.channel.send("It seems you are new here. I'm going to ask you some questions so we can get started on making your profile for this world. Please choose your answers carefully and DO NOT use anything offensive.\nYou will have 2 minutes per question.")
                            const msg0 = await message.channel.send("First off, what would you like your name to be?  (Full name)");

                            const answerFilter = (message, user) => {
                                if(user == client.user){
                                } else {
                                    return [message]
                                }

                            }

                            const collector = message.channel.createMessageCollector({ answerFilter, max: 1, time: 120000 });

                            collector.on('collect', async m => {

                                let name = m.content;

                                message.channel.send({ content: `${name}? All right then.` })
                                message.channel.send({ content: 'And how old would you like to be?\nYou will have to choose an age older than 15, since we don\'t want you to start too young, and younger than 35, seeing as how people age over time.' })

                                const collector2 = message.channel.createMessageCollector({ answerFilter, max: 1, time: 120000 });
                                
                                collector2.on('collect', async m2 => {

                                    let age = m2.content;

                                    if(isNaN(age)){
                                        m2.reply({ content: 'no' })
                                    } else if(age > 15 || age < 35){
                                        m2.reply({ content: 'Your age was either too young or too old. Start over and choose a valid age.' })
                                    } else {

                                        message.channel.send({ content: `${age} it is.` })

                                        const msg = await channel.send({ embeds: [ embed ], components: [ row ] })
                
                                        // wait for interaction
                                        const collector = msg.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 120000, max: 1 })
                                        
                                        let race;
        
                                        collector.on('collect', interaction => {
        
                                            if(interaction.values[0] === 'demi-human'){
        
                                                race = 'Demi-Human';
        
                                                channel.send({ content: 'You are now a Demi-Human. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            } else if(interaction.values[0] === 'dwarf'){
        
                                                race = 'Dwarf';
        
                                                channel.send({ content: 'You are now a Dwarf. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            } else if(interaction.values[0] === 'elf'){
        
                                                race = 'Elf';
        
                                                channel.send({ content: 'You are now an Elf. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            } else if(interaction.values[0] === 'half-elf'){
        
                                                race = 'Half-Elf';
        
                                                channel.send({ content: 'You are now a Half-Elf. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            } else if(interaction.values[0] === 'halfling'){
        
                                                race = 'Halfling';
        
                                                channel.send({ content: 'You are now a Halfling. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            } else if(interaction.values[0] === 'human'){
        
                                                race = 'Human';
        
                                                channel.send({ content: 'You are now a Human. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            } else if(interaction.values[0] === 'lycan'){
        
                                                race = 'Lycan';
        
                                                channel.send({ content: 'You are now a Lycan. Your character has been created and this channel will delete shortly.' })
                                                setTimeout(() => {
                                                    channel.delete()
                                                }, 15000)
        
                                            }
        
                                        })
        
                                        setTimeout(() => {
                                            channel.send({ content: 'You took too long to answer. Try again later.' });
                                            return;
                                        }, 120000)
        
                                        message.member.setNickname(name);
        
                                        if(race == 'Demi-Human'){
                                            message.member.roles.add('867014446727954472');
                                        } else if(race == 'Dwarf'){
                                            message.member.roles.add('860115548896886794');
                                        } else if(race == 'Halfling'){
                                            message.member.roles.add('860114845479075840');
                                        } else if(race == 'Elf'){
                                            message.member.roles.add('860115328104792105');
                                        } else if(race == 'Half-Elf'){
                                            message.member.roles.add('860116035842867220');
                                            } else if(race == 'Human'){
                                            message.member.roles.add('860114710329688075');
                                        } else if(race == 'Lycan'){
                                            message.member.roles.add('860116856521490442');
                                        }
        
                                        message.member.roles.add('858273964480135218');
        
                                        message.channel.send(`Well then ${name} the ${race}, I will now randomly generate your stats and create your profile.`);
                                        message.channel.send("**Generating stats...**");
                                        let randStrength = Math.ceil(Math.random() * (18 - 11) + 2);
                                        let randInteligence = Math.ceil(Math.random() * (18 - 11) + 2);
                                        let randAgility = Math.ceil(Math.random() * (18 - 11) + 2);
                                        let randSpeed = Math.ceil(Math.random() * (18 - 11) + 2);
                                        let randDexterity = Math.ceil(Math.random() * (18 - 11) + 2);
                                        let randCharisma = Math.ceil(Math.random() * (18 - 11) + 2);
                                        let randMagic = Math.ceil(Math.random() * (18 - 11) + 2);
                                            
                                        message.channel.send("**Generating profile...**");
                                            
                                        // Generate Carry weight
                                        let maxi;
        
                                        if(randStrength >= 9){
                                            maxi = 17;
                                        } else if(randStrength == 8){
                                            maxi = 16;
                                        } else if(randStrength == 7){
                                            maxi = 15;
                                        } else if(randStrength == 6){
                                            maxi = 14;
                                        } else if(randStrength <= 5){
                                            maxi = 13
                                        }
        
                                        //Create Character and Inventory
                                        new charSchema({
                                            guildID: guild.id,
                                            userID: message.author.id,
                                            username: message.member.user,
                                            charName: name,
                                            charAge: age,
                                            charRace: race,
                                            strength: randStrength,
                                            intelligence: randInteligence,
                                            agility: randAgility,
                                            speed: randSpeed,
                                            dexterity: randDexterity,
                                            charisma: randCharisma,
                                            magic: randMagic,
                                        }).save();
        
                                        new invSchema({
                                            guildID: guild.id,
                                            userID: message.author.id,
                                            username: message.member.user,
                                            charName: name,
                                            maxWeight: maxi,
                                        }).save();
        
                                        const axel = client.channels.cache.get('860145504993411103');
        
                                        await axel.permissionOverwrites.edit(message.member, {
                                            "VIEW_CHANNEL": true,
                                            "SEND_MESSAGES": true,
                                            "ADD_REACTIONS": true,
                                            "READ_MESSAGE_HISTORY": true,
                                        });

                                    }

                                    setTimeout(() => {
                                        message.channel.send({ content: 'You took too long to anser. Try again later.' });
                                    }, 120000)

                                })

                                setTimeout(() => {
                                    message.channel.send({ content: 'You took too long to anser. Try again later.' });
                                }, 120000)

                            })


                        
        
                                        
                                        
                
                                        
        
                        
                        }
                    })    
                })
            }
        })
    }
}