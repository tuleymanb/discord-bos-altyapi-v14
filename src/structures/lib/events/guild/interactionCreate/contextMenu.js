import ids from "../../../../../../config/bot/example.ids.js";
import cooldownControl from "../../../handler/messageCreate/cooldown.js";
import { getPremium } from "../../../manager/database.js";
import embedManager from "../../../manager/embedManager.js";
import permisions from "../../../other/permisions.js";

export default async ({ client, interaction, lang }) => {
    const command = client.contextMenuCommands.get(interaction.commandName.replace(/\s+/g, '_').toLowerCase());
    if (!command) return;
    try {

        const checkPremium = await getPremium({ userId: interaction.member.id, key: `user:${interaction.member.id}:premium` });
        if ((checkPremium?.active === 'false' || !checkPremium?.active) && command.config.onlyPre) {
            return message.reply({ embeds: [embedManager({ description: lang('messageCreate.onlyPre.message', { prefix })}) ]});
        }

        // yetki kontrolü
        if (command.config.reqUserPerm && !interaction.member.permissions.has(permisions[command.config.reqUserPerm])) return interaction.reply({ content: lang('perms.userPerms', { userPerm: command.config.reqUserPerm }) }).catch(err => { })
        if (command.config.reqBotPerm && !interaction.guild.members.cache.get(client.user.id).permissions.has(permisions[command.config.reqBotPerm])) return interaction.reply({ content: lang('perms.botPerms', { botPerm: command.config.reqBotPerm }) }).catch(err => { })

        // cooldown kontrolü
        const cooldown = cooldownControl({ message: interaction, command, client, checkPremium });
        if (cooldown && !ids.staff.devs.includes(interaction.user.id)) {
            const left = Math.round(cooldown);
            await interaction.deferReply({ ephemeral: true });
            return interaction.editReply({ content: lang('cooldown.message', { left }) })
                .catch(err => { });
        }

        // console.log(command)
        // console.log(interaction)
        await interaction.deferReply({ fetchReply: true });
        command.run({ client, interaction, lang })
        .then(() => { })
        .catch(err => { });
    } catch (err) {
        console.log(err)
    }
}