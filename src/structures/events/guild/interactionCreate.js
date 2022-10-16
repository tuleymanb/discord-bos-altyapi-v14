import language from "../../l18n/language.js";
import contextMenu from "../../lib/events/guild/interactionCreate/contextMenu.js";
import realInfoInput from "../../lib/events/guild/interactionCreate/realInfo-input.js";
import realInfo from "../../lib/events/guild/interactionCreate/realInfo.js";
import rules from "../../lib/events/guild/interactionCreate/rules.js";
import { getBlacklist, getLanguage } from "../../lib/manager/database.js";
import settings from "../../../../config/bot/example.settings.js";
import slashCommands from "../../lib/events/guild/interactionCreate/slashCommands.js";
import embedManager from "../../lib/manager/embedManager.js";

export default async (client, interaction) => {

    // dil kontrolü
    const checkLang  = await getLanguage({ guildId: interaction.guild.id, key: `guild:${interaction.guild.id}:guild` }) || settings.language;
    const langFolder = await import(`../../l18n/lang/${checkLang}.js`).then(function(m) { return m.default; });
    const lang = (str, opt) => language({str, opt, langFolder});

    // karaliste sunucu ve kullanıcı kontrolü
    const checkServerBL = await getBlacklist({ id: interaction.guild.id, key: `guild:${interaction.guild.id}:blacklist`, userr: false });
    const checkUserBL = await getBlacklist({ id: interaction.member.id, key: `user:${interaction.member.id}:blacklist`, userr: true });
    if (checkServerBL?.active === 'true') return interaction.reply({ embeds: [embedManager({ description: `${lang('blacklist.guild', { reason: checkServerBL.reason, staff: checkServerBL.staff })}` })] });
    if (checkUserBL?.active === 'true') return interaction.reply({ embeds: [embedManager({ description: `${lang('blacklist.user', { reason: checkUserBL.reason, staff: checkUserBL.staff })}` })] });

    if (interaction.isMessageContextMenuCommand() || interaction.isUserContextMenuCommand()) return contextMenu({ client, interaction, lang, checkPremium });
    if (interaction.isButton() && interaction.customId?.includes("rules")) return rules({ client, interaction, lang });
    if (interaction.isButton() && interaction.customId?.includes("realInfo")) return realInfo({ client, interaction, lang });
    if (interaction.isModalSubmit() && interaction.customId?.includes("realInput")) return realInfoInput({ client, interaction, lang });
    if (interaction.isCommand()) return slashCommands({ client, interaction, lang });

}