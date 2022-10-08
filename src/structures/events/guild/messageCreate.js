import settings from "../../../../config/bot/example.settings.js";
import language from "../../l18n/language.js";
import commands from "../../lib/events/guild/messageCreate/commands.js";
import { getBlacklist, getLanguage, getPrefix } from "../../lib/manager/database.js";
import embedManager from "../../lib/manager/embedManager.js";

export default async (client, message) => {
    // console.log(message)

    const checkPrefix = await getPrefix({ guildId: message.guild.id, key: `guild:${message.guild.id}:guild` }) || settings.prefix;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})`);
    if(!prefixRegex.test(message.content)) return;
    const [, mPrefix] = message.content.match(prefixRegex);
    
    // dil kontrolü
    const checkLang  = await getLanguage({ guildId: message.guild.id, key: `guild:${message.guild.id}:guild` }) || settings.language;
    const langFolder = await import(`../../l18n/lang/${checkLang}.js`).then(function(m) { return m.default; });
    const lang = (str, opt) => language({str, opt, langFolder});

    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    let cmd = args.length > 0 ? args.shift().toLowerCase() : null;
    
    client.commands.forEach((command) => {
        if (command.config.name[checkLang] == cmd || command.config.aliases[checkLang].includes(cmd)) {
            cmd = command.config.name[checkLang];
        };
    })

    let command = await client.commands.map((command) => command.config.name[checkLang] == cmd || command.config.aliases[checkLang].includes(cmd) ? command : null).filter(Boolean)[0];
    if (!command) return; // eğer komut yoksa işlem yapma

    // karaliste sunucu ve kullanıcı kontrolü
    const checkServerBL = await getBlacklist({ id: message.guild.id, key: `guild:${message.guild.id}:blacklist`, userr: false });
    const checkUserBL = await getBlacklist({ id: message.member.id, key: `user:${message.member.id}:blacklist`, userr: true });
    if (checkServerBL?.active === 'true') return message.reply({ embeds: [embedManager({ description: `${lang('blacklist.guild', { reason: checkServerBL.reason, staff: checkServerBL.staff })}` })] });
    if (checkUserBL?.active === 'true') return message.reply({ embeds: [embedManager({ description: `${lang('blacklist.user', { reason: checkUserBL.reason, staff: checkUserBL.staff })}` })] });

    if (command) return commands({ client, message, prefix: mPrefix, args, lang: lang, checkLang, command });
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}