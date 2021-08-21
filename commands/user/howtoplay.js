const Discord = require('discord.js');
const pagination = require('../../functions/pagination');

module.exports = {
	commands: ['howtoplay'],
	description: '',
	callback: async (message, client, guild, arguments) => {

		try {

			// Embeds
			let mainpage = new Discord.MessageEmbed()
				.setTitle('How To Play')
				.setDescription('This is the how to play menu. Here you can find out the basics of how to play The Night\'s Ventures. '
					+ 'To learn how to play, select a category from the Select Menu below and use the buttons to navigate through the pages.\n'
					+ 'After 3 minutes with no interaction this message will delete. This is so we can keep the channels clean.'
				);

			// Character Pages
			let characterMainpage = new Discord.MessageEmbed()
				.setTitle('Characters')
				.setDescription('Characters are essential in any game, so our character creation system has made it easier than ever to create new characters.\n'
					+ '\nYou can only create a character when you start the game or when you have died.\n'
					+ '\nPage through this embed using the buttons below to view specifics of character mechanics.'
				);

			let characterExplanation = new Discord.MessageEmbed()
				.setTitle('3')
				.setDescription('lol');

			//
			let embed4 = new Discord.MessageEmbed()
				.setTitle('4')
				.setDescription('lol');

			let embed5 = new Discord.MessageEmbed()
				.setTitle('5')
				.setDescription('lol');

			// Embed grouping
			let characterEmbeds = [
				characterMainpage,
				characterExplanation
			]

			let guildEmbeds = [
				embed4,
				embed5,
			]


			// Select Menus
			const typeSelect = new Discord.MessageSelectMenu()
				.setCustomId('htp-list')
				.setPlaceholder('Categories')
				.addOptions(
					{
						label: 'Characters',
						value: 'characters'
					},
					{
						label: 'Test list 2',
						value: 'test-list2'
					}
				)

			let current;

			let page = 0;

			current = [
				mainpage
			];

			const msg = await pagination(null, client, message.channel, message.member, current, typeSelect, page);

			const filter = (interaction) => {
				if (interaction.user.id != message.member.user.id) {
					interaction.deferUpdate();
				} else {
					return interaction;
				}
			};

			const collector = msg.createMessageComponentCollector({ filter, idle: 180000 });

			collector.on('collect', async (interaction) => {
				interaction.deferUpdate();

				if (interaction.isButton()) {

					switch (interaction.customId) {

						case '1':
							page = 0;
							return pagination(msg, client, message.channel, message.member, current, typeSelect, page);
						case '2':
							--page;
							return pagination(msg, client, message.channel, message.member, current, typeSelect, page);
						case '3':
							++page;
							return pagination(msg, client, message.channel, message.member, current, typeSelect, page);
						case '4':
							page = current.length - 1;
							return pagination(msg, client, message.channel, message.member, current, typeSelect, page);

					}

				} else if (interaction.isSelectMenu()) {

					if (interaction.values[0] == 'characters') {

						current = characterEmbeds;
						current.forEach(e => {
							e.setFooter(`Page ${page} of ${current.length}`)
						});
						pagination(msg, client, message.channel, message.member, current, typeSelect, page)

					} else if (interaction.values[0] == 'test-list2') {

						current = guildEmbeds;
						current.forEach(e => {
							e.setFooter(`Page ${page} of ${current.length}`)
						});
						pagination(msg, client, message.channel, message.member, current, typeSelect, page)

					}

				}

			});

			collector.on('end', async (interaction) => {

				msg.delete();

			})

		} catch (error) {

			const logChannel = client.channels.cache.get('859802682599800852');

			logChannel.send({ content: `${error} \n${message.url}` });

		}

	}

};
