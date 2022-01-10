const Discord = require('discord.js');
const updateLog = require('../functions/updateLog.js');

async function pagination(message, client, channel, user, embeds, selects, page) {

    // Disabled Butttons
    const btnFirstDis = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('1')
        .setLabel('⏪')
        .setDisabled(true)

    const btnPreviousDis = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('2')
        .setLabel('◀️')
        .setDisabled(true)


    const btnNextDis = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('3')
        .setLabel('▶️')
        .setDisabled(true)


    const btnLastDis = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('4')
        .setLabel('⏩')
        .setDisabled(true)

    // Next Only
    const btnFirstNO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('1')
        .setLabel('⏪')
        .setDisabled(true)

    const btnPreviousNO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('2')
        .setLabel('◀️')
        .setDisabled(true)


    const btnNextNO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('3')
        .setLabel('▶️')
        .setDisabled(false)


    const btnLastNO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('4')
        .setLabel('⏩')
        .setDisabled(false)

    // Next Only
    const btnFirstPO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('1')
        .setLabel('⏪')
        .setDisabled(false)

    const btnPreviousPO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('2')
        .setLabel('◀️')
        .setDisabled(false)


    const btnNextPO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('3')
        .setLabel('▶️')
        .setDisabled(true)


    const btnLastPO = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('4')
        .setLabel('⏩')
        .setDisabled(true)

    // Next Only
    const btnFirstEn = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('1')
        .setLabel('⏪')
        .setDisabled(false)

    const btnPreviousEn = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('2')
        .setLabel('◀️')
        .setDisabled(false)


    const btnNextEn = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('3')
        .setLabel('▶️')
        .setDisabled(false)


    const btnLastEn = new Discord.MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('4')
        .setLabel('⏩')
        .setDisabled(false)

    // Rows
    const selectRow = new Discord.MessageActionRow()
        .addComponents(
            selects,
        )

    const rowDis = new Discord.MessageActionRow()
        .addComponents(
            btnFirstDis,
            btnPreviousDis,
            btnNextDis,
            btnLastDis,
        );

    const rowEn = new Discord.MessageActionRow()
        .addComponents(
            btnFirstEn,
            btnPreviousEn,
            btnNextEn,
            btnLastEn,
        );

    const rowNO = new Discord.MessageActionRow()
        .addComponents(
            btnFirstNO,
            btnPreviousNO,
            btnNextNO,
            btnLastNO,
        );

    const rowPO = new Discord.MessageActionRow()
        .addComponents(
            btnFirstPO,
            btnPreviousPO,
            btnNextPO,
            btnLastPO,
        );

    let currentRow;

    try {

        if (page == embeds.length - 1) currentRow = rowPO;
        if (page == 0) currentRow = rowNO;
        if ((page != embeds.length - 1) && (page != 0)) currentRow = rowEn;
        if (embeds.length == 1) currentRow = rowDis;

        let msg;
        if (message == null) {
            msg = await channel.send({ embeds: [embeds[page]], components: [selectRow, currentRow] })
        } else {
            msg = await message.edit({ embeds: [embeds[page]], components: [selectRow, currentRow] });
        }

        return msg;

    } catch (error) {

        const eventInfo = `${user.member.tag} requested Pagination in <#${channel.id}>. Action failed.`;

        updateLog(client, null, eventInfo, error);

    }

}

module.exports = pagination;