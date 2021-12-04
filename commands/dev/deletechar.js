const Character = require('../../models/character.js');
const Inventory = require('../../models/inventory.js');
const Discord = require('discord.js');

module.exports = {
    commands: ['deletechar'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        if (!message.member.user.id == '714070826248437770') {
        };

        const memb = guild.members.cache.get(message.mentions.users.first().id);

        Character.findOne({
            guildID: guild.id,
            userID: memb.user.id,
        },
            async (err, character) => {
                if (err) return console.error(err);

                Inventory.findOne({
                    guildID: guild.id,
                    userID: memb.user.id,
                },
                    async (err, inventory) => {
                        if (err) return console.error(err);

                        character.delete();
                        inventory.delete();

                        await memb.roles.cache.forEach(role => {
                            if (role.id !== '867761358296711218') {
                                memb.roles.remove(role.id);
                            }
                        });

                        message.channel.send(`${memb}'s character has been deleted`);

                    })

            })

    }
}