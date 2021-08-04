const Discord = require('discord.js');
const Settings = require('../../models/guildsettings');

module.exports = {
    commands: ['maintenance'],
    description: '',
    callback: async (message, client, guild, arguments) => {

        // fetch the bot, log channel and status from command
        const bot = guild.members.cache.get('856191346146803713');
        const logChannel = client.channels.cache.get('856448564849934337')
        const status = arguments[0];

        // maintenance embeds
        let mOn = new Discord.MessageEmbed()
        .setTitle("🚧  NV-RPG is now in Maintenance Mode  🚧")
        .setDescription("Please wait patiently. The game is paused and nothing is active while the Bot is in maintenance mode. The game will resume once maintenance is done.")
        .setColor('#fce803')
        .setTimestamp();

        let mOff = new Discord.MessageEmbed()
        .setTitle(`<:Verify:867792825821954068>  NV-RPG is now in Online Mode  <:Verify:867792825821954068>`)
        .setDescription("Thank you for waiting. The game is now active again. Everything will now resume again.")
        .setColor('#03befc')
        .setTimestamp();

        // find the settings document
        Settings.findOne({
            guildID: guild.id,
        },
        (err, settings) => {
            if(err) return console.error(err);

            // ensure only dev can use
            if(!message.member.user.id == '714070826248437770'){
                return;
            };

            // procedure if the status is on
            if(status == 'on'){

                settings.timeActive = false;
                settings.commandsActive = false;
                settings.logsActive = false;
                settings.commandsActive = false;
                settings.save()

                bot.roles.add('867760855109992468');
                logChannel.send({ embeds: [ mOn ] });
                logChannel.send({ content: 'Bot has Started in Maintenance Mode'});
                message.reply({ content: "Maintenance on" });

            //procedure if the status is off
            } else if(status == 'off'){

                settings.timeActive = true;
                settings.commandsActive = true;
                settings.logsActive = true;
                settings.commandsActive = true;
                settings.save()

                bot.roles.remove('867760855109992468');
                logChannel.send({ embeds: [ mOff ] });
                logChannel.send({ content: 'Bot has Started in Online Mode'});
                message.reply({ content: "Maintenance off" });

            }

        })

    }
}