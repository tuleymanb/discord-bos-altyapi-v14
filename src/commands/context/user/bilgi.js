export const config = {
    name: "Bilgisini Gör",
    type: 2,
    descriptions: {
        "tr-TR": "Kullanıcı bilgilerini gösterir.",
        "en-US": "Shows the user information."
    },
    category: {
        "tr-TR": "context",
        "en-US": "context"
    },
    reqUserPerm: "",
    reqBotPerm: "",
    cooldown: 15,
    default_permission: false,
    default_member_permissions: false,
    dm_permission: false,
    helpDisabled: false,
    onlyPre: false,
    onlyDev: false,
    underDev: false,
}
export async function run({ client, interaction, lang }) {
    const { targetMember } = interaction;
    await interaction.followUp({ content: lang('context.user.user.message', { user: targetMember.id }) })
}