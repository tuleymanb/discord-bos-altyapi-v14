import Discord, { ActionRowBuilder } from 'discord.js';
import user from '../../../../models/user.js';
import embedManager from "../../../manager/embedManager.js";

const { ButtonBuilder, ComponentBuilder } = Discord;

export default async ({client, message, lang}) => {

    const getRules = await user.find({})

    const embed = embedManager({
        author: { name: lang('messageCreate.rules.author'), iconURL: client.user.avatarURL({ dynamic: true }), url: "https://api.magoa.com.tr/invite?bot=magoa" },
        description: lang('messageCreate.rules.rules'),
        footer: { text: lang('messageCreate.rules.footer', { rulesAccepted: getRules.length.toLocaleString() }), iconURL: client.user.avatarURL({ dynamic: true }) },
    })
    // buton oluştur
    const button = new ButtonBuilder()
        .setStyle("Success")
        .setLabel(lang('messageCreate.rules.button.accept'))
        .setCustomId("rules" + message.member.id)
        
    // rowa butonu ekle
    const row = new ActionRowBuilder()
        .addComponents(button)

    return message.reply({ embeds: [embed], components: [row] })
}