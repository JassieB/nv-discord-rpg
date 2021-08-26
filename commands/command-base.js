const prefix = process.env.PREFIX;

const allCommands = {}

module.exports = (commandOptions) => {
    let {
        commands,
    } = commandOptions;

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands];
    };

    console.log(`| Registering command '${commands[0]}'`);

    for (const command of commands) {
        allCommands[command] = {
            ...commandOptions,
            commands,
        }
    }
}

module.exports.listen = (client) => {

    client.on('messageCreate', message => {
        const { member, content, guild } = message;

        const arguments = content.split(/[  ]+/);
        // Remove the command
        const name = arguments.shift().toLowerCase();

        if (name.startsWith(prefix)) {
            const command = allCommands[name.replace(prefix, '')]

            if (!command) return;
            if (message.channel.id == '856101369340887052') return;

            const { callback } = command;

            callback(message, client, guild, arguments, arguments.join(' '));

        }

    })
}