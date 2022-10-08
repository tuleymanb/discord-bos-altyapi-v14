import { setPrefix } from "../../../structures/lib/manager/database.js";

export const config = {
    name: {
        "tr-TR": "prefix",
        "en-US": "prefix"
    },
    aliases: {
        "tr-TR": [],
        "en-US": []
    },
    description: {
        "tr-TR": "Botun sunucudaki prefixini değiştirir.",
        "en-US": "Changes the bot's prefix in the server."
    },
    usage: {
        "tr-TR": "{{prefix}}prefix <prefix>",
        "en-US": "{{prefix}}prefix <prefix>"
    },
    category: {
        "tr-TR": "ayarlar",
        "en-US": "settings"
    },
    cooldown: 30, // komutun bekleme süresi
    reqUserPerm: "ADMININSTRATOR", // kullanıcının sunucuda ki gereken yetki(leri)si
    reqBotPerm: "", // botun sunucuda ki gereken yetki(leri)si
    helpDisabled: false, // true yardım menüsünde gizler.
    onlyPre: false, // true komutu sadece premium sahiplerine/premuim sunuculara özel yapar.
    onlyOwner: false, // true komutu sadece sunucu sahibine özel yapar.
    onlyDev: false, // true komutu kullanıcılara kapatır.
    underDev: false, // true komutu geliştirme/yapım aşamasına alır kullanıcılara kapatır. 
}
export async function run({ client, message, prefix, args, lang, checkLang }) {
    if (!args[0]) return message.reply({ content: lang("settings.prefix.noArgs", { prefix: prefix }) });
    if (args[0].length > 5) return message.reply({ content: lang("settings.prefix.tooLong") });
    if (args[0] === prefix) return message.reply({ content: lang("settings.prefix.same", { prefix }) });
    await setPrefix({ guildId: message.guild.id, prefix: args[0], key: `guild:${message.guild.id}:guild` });
    message.reply({ content: lang("settings.prefix.success", { prefix: args[0] }) });
}