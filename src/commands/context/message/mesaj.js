export const config = {
    name: "Mesaj",
    type: 3,
    descriptions: {
        "tr-TR": "Mesaj bilgilerini gösterir.",
        "en-US": "Shows the message id."
    },
    categorys: {
        "tr-TR": "context",
        "en-US": "context"
    },
    reqUserPerm: "",
    reqBotPerm: "",
    cooldown: 5,
    default_permission: false,
    default_member_permissions: false,
    dm_permission: false,
    helpDisabled: false,
    onlyPre: false,
    onlyDev: false,
    underDev: false,
}
export async function run({ client, interaction, lang }) {
    await interaction.editReply({ content: lang('context.message.messageId.message', { messageId: interaction.targetId }), ephemeral: true })
}