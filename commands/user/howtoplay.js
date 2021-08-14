const Discord = require('discord.js');
const pagination = require('../../functions/pagination');

module.exports = {
	commands: ['howtoplay'],
	description: '',
	callback: async (message, client, guild, arguments) => {

		try {

			// Embeds
			let mainpage = new Discord.MessageEmbed()
				.setTitle('1')
				.setDescription('lol');

			let characterMainpage = new Discord.MessageEmbed()
				.setTitle('2')
				.setDescription('lol');

			let characterExplanation = new Discord.MessageEmbed()
				.setTitle('3')
				.setDescription('lol');

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

			let nullMsg = null;

			const msg = await pagination(null, message.channel, current, typeSelect, page);

			const filter = (interaction) => {
				if (interaction.user.id != message.member.user.id) {
					interaction.deferUpdate();
				} else {
					return interaction;
				}
			};

			const collector = msg.createMessageComponentCollector({ filter, idle: 20000 });

			collector.on('collect', async (interaction) => {
				interaction.deferUpdate();

				if (interaction.isButton()) {

					switch (interaction.customId) {

						case '1':
							page = 0;
							return pagination(msg, message.channel, message.member, current, typeSelect, page);
						case '2':
							--page;
							return pagination(msg, message.channel, message.member, current, typeSelect, page);
						case '3':
							++page;
							return pagination(msg, message.channel, message.member, current, typeSelect, page);
						case '4':
							page = current.length - 1;
							return pagination(msg, message.channel, message.member, current, typeSelect, page);

					}

				} else if (interaction.isSelectMenu()) {

					if (interaction.values[0] == 'characters') {

						current = characterEmbeds;
						pagination(msg, message.channel, message.member, current, typeSelect, page)

					} else if (interaction.values[0] == 'test-list2') {

						current = guildEmbeds;
						pagination(msg, message.channel, message.member, current, typeSelect, page)

					}

				}

			});

			collector.on('end', async (interaction) => {

				msg.delete();

			})

		} catch (err) {



		}




	}

};
