const Discord = require('discord.js');
const getLocations = require('../../functions/fetchLocations');
const Building = require('../../classes/building');

module.exports = {
    commands: ['addsub'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        if (!message.member.user.id == '714070826248437770') { return };

        try {

            const id = arguments[0];
            const type = arguments[3];

            const name = client.channels.cache.get(id).name;

            const location = await getLocations(client, message.channel.id, guild.id)

            if (!location) return console.log(false)

            const price = Math.ceil(Math.random() * (1000000 - 600000 + 1)) + 600000;

            const newLocation = new Building(
                name,
                0,
                id,
                "City of Axel",
                "Coming soon",
                type
            )

            location.subLocations.push(newLocation);

            location.save();

        } catch (err) {

            console.log(err)

        }

    }
}