import Discord from 'discord.js';
import settings from '../../../../config/bot/example.settings.js';
import { getLanguage } from '../../../structures/lib/manager/database.js';
import embedManager from '../../../structures/lib/manager/embedManager.js';

const { cooldown } = settings;

export const config = {
    name: {
        "tr-TR": "yardım",
        "en-US": "help"
    },
    aliases: {
        "tr-TR": [ "y"],
        "en-US": [ "h"]
    },
    description: {
        "tr-TR": "Botun tüm komutlarını gösterir.",
        "en-US": "Shows all bot commands."
    },
    usage: {
        "tr-TR": "{{prefix}}yardım <bilgi [komut]>",
        "en-US": "{{prefix}}help <info [command]>"
    },
    category: {
        "tr-TR": "bot",
        "en-US": "bot"
    },
    cooldown: 15, // komutun bekleme süresi
    reqUserPerm: "", // kullanıcının sunucuda ki gereken yetki(leri)si
    reqBotPerm: "", // botun sunucuda ki gereken yetki(leri)si
    helpDisabled: true, // true yardım menüsünde gizler.
    onlyPre: false, // true komutu sadece premium sahiplerine/premuim sunuculara özel yapar.
    onlyOwner: false, // true komutu sadece sunucu sahibine özel yapar.
    onlyDev: false, // true komutu kullanıcılara kapatır.
    underDev: false, // true komutu geliştirme/yapım aşamasına alır kullanıcılara kapatır.
}
export async function run({ client, message, prefix, args, lang, checkLang }) {

    if (("bilgi" === args[0] && checkLang === 'tr-TR' || "info" === args[0] && checkLang === 'en-US') && args[1]) {
        let command = await client.commands.map((command) => (command.config.name[checkLang] == args[1] || command.config.aliases[checkLang].includes(args[1])) && !command.config.helpDisabled ? command : null).filter(Boolean)[0] || client.contextMenuCommands.get(args[1]);
        if (!command) return message.reply({ content: lang("bot.help.notFound") });

        const bFields = [];
        if (command.config.category !== "context") bFields.push( { name: lang('bot.help.info.usage'), value: `${command.config.usage[checkLang].replace("{{prefix}}", prefix)}`, inline: true }, { name: lang('bot.help.info.perms'), value: `${lang('bot.help.info.permsUser', { perms: command.config.reqUserPerm ? command.config.reqUserPerm : lang('bot.help.info.notAvaliable') })}\n${lang('bot.help.info.permsBot', { perms: command.config.reqBotPerm ? command.config.reqBotPerm : lang('bot.help.info.notAvaliable') })}`, inline: true }, { name: lang('bot.help.info.onlyOwner'), value: `${command.config.onlyOwner ? lang('bot.help.info.yes') : lang('bot.help.info.no')}`, inline: true }, { name: lang('bot.help.info.onlyDev'), value: `${command.config.onlyDev ? lang('bot.help.info.yes') : lang('bot.help.info.no')}`, inline: true }, { name: lang('bot.help.info.onlyPre'), value: `${command.config.onlyPre ? lang('bot.help.info.yes') : lang('bot.help.info.no')}`, inline: true }, { name: lang('bot.help.info.helpDisabled'), value: `${command.config.helpDisabled ? lang('bot.help.info.yes') : lang('bot.help.info.no')}`, inline: true }, { name: lang('bot.help.info.cooldown'), value: lang('bot.help.info.cooldownValue', { time: command.config.cooldown ? command.config.cooldown : cooldown.default }), inline: true }, { name: lang('bot.help.info.aliases'), value: `${command.config.aliases[checkLang].length > 0 ? command.config.aliases[checkLang].join(", ") : lang('bot.help.info.notAvaliable')}`, inline: true }, );
        const embed = embedManager({ description: lang('bot.help.info.desc', { commandName: command.config.name[checkLang], prefix }), fields: [ { name: lang('bot.help.info.commandDesc'), value: `${command.config.description[checkLang]}`, inline: true }, { name: lang('bot.help.info.category'), value: `${command.config.category[checkLang]}`, inline: true }, { name: lang('bot.help.info.underDev'), value: `${command.config.underDev ? lang('bot.help.info.yes') : lang('bot.help.info.no')}`, inline: true }, ...bFields, ], footer: { text: lang('bot.help.info.footer'), inline: true }, })
        return message.reply({ embeds: [embed] })
    }

    const category = [], field = [];
    client.commands.forEach((command) => {
        if (!category.includes(command.config.category[checkLang])) category.push(command.config.category[checkLang]);
    });

    category.forEach((cat) => {
        const commands = client.commands.filter((command) => command.config.category[checkLang] === cat && !command.config.helpDisabled);
        if (commands.size > 0) return field.push({ name: lang('bot.help.category', { categoryName: cat.charAt(0).toUpperCase() + cat.toLowerCase().slice(1) }) , value: commands.map((command) => `\`${command.config.name[checkLang]}\``).join(", ") });
    });

    ["context"].forEach(() => {
        const contexts = client.contextMenuCommands.filter((cntx) => !cntx.config.helpDisabled)
        if (contexts.size > 0) field.push({ name: lang('bot.help.contextMenu'), value: contexts.map((context) => `\`${context.config.name}\``).join(", ") });
    });

    const embed = embedManager({ fields: field, footer: { text: lang('bot.help.footer', { prefix }) }, description: lang('bot.help.desc', { botName: client.user.username }), author: { name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) }, })
    message.reply({ embeds: [embed] })
}