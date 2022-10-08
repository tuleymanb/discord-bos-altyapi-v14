import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from "discord.js";

export default async ({client, interaction, lang}) => {
    if (interaction.customId !== "realInfo" + interaction.member.id) return await interaction.deferReply({ ephemeral: true, fetchReply: true }), interaction.editReply({ content: "Bu buton sana ait değil.", ephemeral: true })
    
    // bilgileri doldur modalı oluştur
    const modal = new ModalBuilder()
        .setCustomId('realInput' + interaction.member.id)
        .setTitle(lang("interactionCreate.realInfo.title"));

    const name = new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
                .setCustomId('name')
                .setLabel(lang("interactionCreate.realInfo.name"))
                .setRequired(true)
                .setStyle(TextInputStyle.Short),
        )
    const surname = new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
                .setCustomId('surname')
                .setLabel(lang("interactionCreate.realInfo.surname"))
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
        );
    const email = new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
                .setCustomId('email')
                .setLabel(lang("interactionCreate.realInfo.email"))
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
        );
    const phone = new ActionRowBuilder()
        .addComponents(
            new TextInputBuilder()
                .setCustomId('phone')
                .setLabel(lang("interactionCreate.realInfo.phone"))
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setMaxLength(10)
                .setMinLength(10)
        );


    modal.addComponents(name, surname, email, phone);

    // modalı gönder
    await interaction.showModal(modal);
}