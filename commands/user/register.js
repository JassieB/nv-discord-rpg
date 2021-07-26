const Character = require('../../models/character.js');
const Discord = require('discord.js');

module.exports = {
    commands: ['register'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        Character.findOne({
            guildID: guild.id,
            userID: message.member.user.id,
        }, 
        (err, character) => {
            if(err) return console.error(err);

            const strtchan = guild.channels.cache.find(channel => channel.name === `${message.member.user.username}-registering`);

            if(!strtchan && character.class == 'None'){
                guild.channels.create(`${message.member.user.username}-registering`).then(async channel => {
                    await channel.setParent('868532758421590036');
                        
                    await channel.updateOverwrite(message.member, {
                        "VIEW_CHANNEL": true,
                        "SEND_MESSAGES": true,
                        "READ_MESSAGE_HISTORY": true,
                    });
                        
                    channel.send(`Hello ${message.member.nickname}!\nWelcome to the guild registration channel.`)

                    const msg = await channel.send('**Here is the list of available classes:**\nAdventurer\n\nChoose one class and enter the class name exactly.');
                    
                    msg.channel.awaitMessages(response => msg.content, {
                        max: 1,
                        time: 120000,
                        errors: 'time',
                    }).then(async (collected) => {
                        let chosenClass = collected.first().content.toLowerCase();

                        if(chosenClass == 'adventurer'){
                            character.class = 'Adventurer';
                            character.coins = character.coins - 60;
                            character.save();

                            channel.send("Conratulations! You are now a registered Adventurer.\nThe registration fee of 60 coins has been deducted. Have a good day!");
                            await channel.send('This channel will delete in 5');
                            await channel.send('4');
                            await channel.send('3');
                            await channel.send('2');
                            await channel.send('1');
                            await channel.delete();
                        }
                    }).catch(async error => {
                        channel.send("You took to long to register. Try again later.");
                        await channel.send('This channel will delete in 5');
                        await channel.send('4');
                        await channel.send('3');
                        await channel.send('2');
                        await channel.send('1');
                        await channel.delete();
                    })

                })
            }

        })

    }
}