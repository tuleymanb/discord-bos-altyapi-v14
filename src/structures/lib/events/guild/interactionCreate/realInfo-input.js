import { setRealInfo } from "../../../manager/database.js";

export default async ({ client, interaction, lang }) => {
    if (interaction.customId === 'realInput' + interaction.member.id) {
        const name = interaction.fields.getTextInputValue('name');
        const surname = interaction.fields.getTextInputValue('surname');
        const email = interaction.fields.getTextInputValue('email');
        const phone = interaction.fields.getTextInputValue('phone');
        if (validateEmail(email) === null) return await interaction.deferReply({ ephemeral: true, fetchReply: true }), interaction.editReply({ content: lang('interactionCreate.realInfo.invalid.email'), ephemeral: true })
        if (isNaN(phone)) return await interaction.deferReply({ ephemeral: true, fetchReply: true }), interaction.editReply({ content: lang('interactionCreate.realInfo.invalid.email'), ephemeral: true })
        setRealInfo({ userId: interaction.member.id, key: `user:${interaction.member.id}:real`, name: name, surname: surname, email: email, phone: phone });
        await interaction.deferReply({ ephemeral: true, fetchReply: true });
        await interaction.editReply({ content: lang('interactionCreate.realInfo.success'), ephemeral: true });
    } else {
        await interaction.deferReply({ ephemeral: true, fetchReply: true })
        await interaction.editReply({ content: lang('interactionCreate.realInfo.notYours'), ephemeral: true });
    }
}

function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };