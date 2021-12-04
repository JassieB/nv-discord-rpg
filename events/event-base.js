//const fs = require('fs');
const Discord = require('discord.js');

module.exports = (client, eventOptions) => {
    let {
        events,
        callback,
    } = eventOptions;

    // Ensure the event and aliases are in an array
    if (typeof events === 'string') {
        events = [events];
    };

    console.log(`| Registering event '${events[0]}'`);

    const guild = client.guilds.cache.get('856101368859066409');

    // Handle the event code
    callback(client, guild);

    return;
}