import { ButtonBuilder, ActionRowBuilder } from "discord.js"
import { rulesAccepted } from "../../../manager/database.js"

export default async ({ client, interaction, lang }) => {
    if (interaction.customId === "rules" + interaction.member.id) {
        const button = new ButtonBuilder()
            .setStyle("Success")
            .setLabel(lang('interactionCreate.rules.button.accept'))
            .setDisabled(true)
            .setCustomId("rules" + interaction.member.id)
        
        const row = new ActionRowBuilder()
            .addComponents(button)

        await rulesAccepted({ userId: interaction.member.id, username: `${interaction.member?.user?.username}#${interaction.member?.user?.discriminator}`, key: `user:${interaction.member.id}:user` })
        interaction.update({
            components: [row]
        })
    } else if (interaction.customId !== "rules" + interaction.member.id) {
        await interaction.deferReply({ ephemeral: true, fetchReply: true })
        await interaction.editReply({ content: lang('interactionCreate.rules.button.notYours'), ephemeral: true })
    }
}