const Discord = require('discord.js');
const hastebin = require("hastebin-gen");

async function updateLog(client, guildId, eventInfo, eventError) {

    const channel = client.channels.cache.get('859802682599800852');

    try {

        hastebin(eventError, { extension: "txt" }).then(haste => {

            return channel.send({ content: `Event Info:\n${eventInfo}\nError Link:${haste}` })

        }).catch(error => {

            channel.send({ content: `\`\`\`${error}\`\`\`` });

        });

    } catch (err) {

        channel.send({ content: `\`\`\`${err}\`\`\`` });

    }

}

module.exports = updateLog;