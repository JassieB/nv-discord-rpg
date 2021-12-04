const charSchema = require('../../models/character.js');
const invSchema = require('../../models/inventory.js');
const getSettings = require('../../functions/fetchSettings');
const getCharacter = require('../../functions/fetchCharacters');
const getInventory = require('../../functions/fetchInventories');
const Discord = require('discord.js');

module.exports = {
    commands: ['startgame'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        try {

            // fetch all required documents and verify they exist
            const settings = await getSettings(client, guild.id);
            const character = await getCharacter(client, message.author.id, guild.id);
            const inventory = await getInventory(client, message.author.id, guild.id);

            if (!settings) return;
            if (!settings.commandsActive && !message.member.user.id == '714070826248437770') return message.reply('The game is currently paused.');

            // create embeds
            let loadingEmbed1 = new Discord.MessageEmbed()
                .setTitle(`We are preparing your game`)
                .setDescription("**Loading assets and configuration...**");

            let loadingEmbed2 = new Discord.MessageEmbed()
                .setTitle(`We are preparing your game`)
                .setDescription("**Loading story and NPCs...**");

            let loadingEmbed3 = new Discord.MessageEmbed()
                .setTitle(`We are preparing your game`)
                .setDescription("**Loading Complete**");

            let loadingEmbed4 = new Discord.MessageEmbed()
                .setTitle(`We are preparing your game`)
                .setDescription("**Starting game...**");

            let loadingEmbed5 = new Discord.MessageEmbed()
                .setTitle(`Your game is ready`)
                .setDescription("**Loading Complete**");

            let questionEmbed1 = new Discord.MessageEmbed()
                .setTitle(`Character Creation`)
                .setDescription("Hello aspiring adventurer! \nIt seems you are new here. I'm going to ask you some questions so we can get started on making your profile for this world. Please choose your answers carefully and DO NOT use anything offensive.\nYou will have 2 minutes per question.\n\nFirst off, what would you like your name to be?  (Full name)");

            // verify command is used in starting channel
            if (message.channel.name !== `${message.member.user.username.toLowerCase()}-starting`) return;

            // if user does not have a character begin
            if (!character && !inventory) {

                // send loading embeds and question 1
                const msg = await message.channel.send({ embeds: [loadingEmbed1] });
                await msg.edit({ embeds: [loadingEmbed2] });
                await msg.edit({ embeds: [loadingEmbed3] });
                await msg.edit({ embeds: [loadingEmbed4] });
                await msg.edit({ embeds: [loadingEmbed5] });
                const msg0 = await message.channel.send({ embeds: [questionEmbed1] });

                msg0.channel.awaitMessages({ max: 1, time: 120000, errors: ['time'] }).then(async collected => {

                    let name = collected.first().content;

                    const msg1 = await message.channel.send({ content: `${name}? Okay then.\nAnd how old would you like to be? You have to choose an age between 15 and 35, since we don't want you to be too young and characters age over time.` });

                    msg1.channel.awaitMessages({ max: 1, time: 120000, errors: ['time'] }).then(async collected => {

                        let age = collected.first().content;

                        if (isNaN(age)) {
                            message.channel.send({ content: 'You need to enter a number' })
                        } else if (age < 15 || age > 35) {
                            message.channel.send({ content: 'Your age was either too young or too old. Start over and choose a valid age.' })
                        } else {

                            let embed = new Discord.MessageEmbed()
                                .setTitle("Here is a list of all the races. You can choose only one.")

                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageSelectMenu()
                                        .setCustomId('race-select')
                                        .setPlaceholder('Select one')
                                        .addOptions([
                                            {
                                                label: 'Demi-Human',
                                                value: 'demi-human',
                                            },
                                            {
                                                label: 'Dwarf',
                                                value: 'dwarf',
                                            },
                                            {
                                                label: 'Elf',
                                                value: 'elf',
                                            },
                                            {
                                                label: 'Half-Elf',
                                                value: 'half-elf',
                                            },
                                            {
                                                label: 'Halfling',
                                                value: 'halfling',
                                            },
                                            {
                                                label: 'Human',
                                                value: 'human',
                                            },
                                            {
                                                label: 'Lycan',
                                                value: 'lycan',
                                            },
                                        ])
                                )

                            message.channel.send({ content: `${age} it is.` })

                            const msg2 = await message.channel.send({ embeds: [embed], components: [row] })

                            // wait for interaction
                            msg2.awaitMessageComponent({ componentType: 'SELECT_MENU', time: 120000, max: 1 }).then(async interaction => {

                                let race;

                                interaction.deferUpdate()

                                if (interaction.values[0] === 'demi-human') {

                                    race = 'Demi-Human';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                } else if (interaction.values[0] === 'dwarf') {

                                    race = 'Dwarf';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                } else if (interaction.values[0] === 'elf') {

                                    race = 'Elf';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                } else if (interaction.values[0] === 'half-elf') {

                                    race = 'Half-Elf';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                } else if (interaction.values[0] === 'halfling') {

                                    race = 'Halfling';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                } else if (interaction.values[0] === 'human') {

                                    race = 'Human';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                } else if (interaction.values[0] === 'lycan') {

                                    race = 'Lycan';

                                    setTimeout(() => {
                                        message.channel.delete()
                                    }, 15000)

                                }

                                //message.member.setNickname(name);

                                if (race == 'Demi-Human') {
                                    message.member.roles.add('867014446727954472');
                                } else if (race == 'Dwarf') {
                                    message.member.roles.add('860115548896886794');
                                } else if (race == 'Halfling') {
                                    message.member.roles.add('860114845479075840');
                                } else if (race == 'Elf') {
                                    message.member.roles.add('860115328104792105');
                                } else if (race == 'Half-Elf') {
                                    message.member.roles.add('860116035842867220');
                                } else if (race == 'Human') {
                                    message.member.roles.add('860114710329688075');
                                } else if (race == 'Lycan') {
                                    message.member.roles.add('860116856521490442');
                                }

                                message.member.roles.add('858273964480135218');
                                message.member.roles.add('867761358296711218');

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

                                if (randStrength >= 9) {
                                    maxi = 17;
                                } else if (randStrength == 8) {
                                    maxi = 16;
                                } else if (randStrength == 7) {
                                    maxi = 15;
                                } else if (randStrength == 6) {
                                    maxi = 14;
                                } else if (randStrength <= 5) {
                                    maxi = 13
                                }

                                //Create Character and Inventory
                                new charSchema({
                                    guildID: guild.id,
                                    userID: message.author.id,
                                    username: message.member.user.username,
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
                                    location: 'axel streets'
                                }).save();

                                new invSchema({
                                    guildID: guild.id,
                                    userID: message.author.id,
                                    username: message.member.user.username,
                                    charName: name,
                                    maxWeight: maxi,
                                }).save();

                                message.channel.send({ content: '**Generation complete. This channel will now be deleted.**' })

                                const axel = client.channels.cache.get('860145504993411103');

                                await axel.permissionOverwrites.edit(message.member, {
                                    "VIEW_CHANNEL": true,
                                    "SEND_MESSAGES": true,
                                    "ADD_REACTIONS": true,
                                    "READ_MESSAGE_HISTORY": true,
                                });

                            }).catch((error) => {

                                console.log(error)
                                message.channel.send({ content: 'You took too long to answer. Try again later.' })

                            })
                        }

                    }).catch((error) => {

                        console.log(error)
                        message.channel.send({ content: 'You took too long to answer. Try again later.' })

                    })

                }).catch((error) => {

                    console.log(error)
                    message.channel.send({ content: 'You took too long to answer. Try again later.' })

                })

            }

        } catch (error) {

            const logChannel = client.channels.cache.get('859802682599800852');

            logChannel.send({ content: `${error}` });

        }

    }
}