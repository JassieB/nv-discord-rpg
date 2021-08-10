const Discord = require('discord.js');

module.exports = {
	commands: ['howtoplay'],
	description: '',
	callback: async (message, client, guild, arguments) => {
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

		// Butttons
		const btnFirst = new Discord.MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('1')
			.setLabel('⏪')
			.setDisabled();

		const btnPrevious = new Discord.MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('2')
			.setLabel('◀️')
			.setDisabled();

		const btnNext = new Discord.MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('3')
			.setLabel('▶️')
			.setDisabled();

		const btnLast = new Discord.MessageButton()
			.setStyle('PRIMARY')
			.setCustomId('4')
			.setLabel('⏩')
			.setDisabled();

		// Select Menus

		// Row 1
		const row1 = new Discord.MessageActionRow().addComponents(
			new Discord.MessageSelectMenu()
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
		);

		// Row 2
		const row2 = new Discord.MessageActionRow()
			.addComponents(
				btnFirst,
				btnPrevious,
				btnNext,
				btnLast
			);

		let current = [];

		let page = 0;

		current.push(mainpage);

		message.channel.send({ embeds: [current[0]], components: [row1, row2] }).then(async (m) => {
			const filter = async (interaction) => {
				if (interaction.user.id === message.author.id) {
					return true;
				} else {
					interaction.followUp({ content: "This message isn't for you" });
				}
			};

			const collector = m.createInteractionCollector({ filter, idle: 20000 });

			collector.on('collect', async (interaction, user) => {
				interaction.deferUpdate();

				if (interaction.isButton()) {

					switch (interaction.customId) {

						case '1':
							page = 0;
							return m.edit({ embeds: [current[page]] });
						case '2':
							return m.edit({ embeds: [current[--page]] });
						case '3':
							return m.edit({ embeds: [current[++page]] });
						case '4':
							page = current.length - 1;
							return m.edit({ embeds: [current[page]] });

					}

				} else if (interaction.isSelectMenu()) {

					if (interaction.values[0] == 'test-list') {

						current = characterEmbeds;
						m.edit({ embeds: [current[0]] });

					} else if (interaction.values[0] == 'test-list2') {

						current
						m.edit({ embeds: [current[0]] });

					}

				}
			});
		});
	}
};
