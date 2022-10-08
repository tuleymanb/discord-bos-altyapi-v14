import { ActionRowBuilder, SelectMenuBuilder } from "discord.js";
import { getLanguage, setLanguage } from "../../../structures/lib/manager/database.js";

export const config = {
    name: {
        "tr-TR": "dil",
        "en-US": "language"
    },
    aliases: {
        "tr-TR": [],
        "en-US": ["lang"]
    },
    description: {
        "tr-TR": "Botun dilini değiştirir.",
        "en-US": "Changes the bot's language."
    },
    usage: {
        "tr-TR": "{{prefix}}dil",
        "en-US": "{{prefix}}language"
    },
    category: {
        "tr-TR": "ayarlar",
        "en-US": "settings"
    },
    cooldown: 15, // komutun bekleme süresi
    reqUserPerm: "c", // kullanıcının sunucuda ki gereken yetki(leri)si
    reqBotPerm: "", // botun sunucuda ki gereken yetki(leri)si
    helpDisabled: false, // true yardım menüsünde gizler.
    onlyPre: true, // true komutu sadece premium sahiplerine/premuim sunuculara özel yapar.
    onlyOwner: false, // true komutu sadece sunucu sahibine özel yapar.
    onlyDev: false, // true komutu kullanıcılara kapatır.
    underDev: false, // true komutu geliştirme/yapım aşamasına alır kullanıcılara kapatır. 
}
export async function run({ client, message, prefix, args, lang, checkLang }) {
    // dil değiştirme menüsü oluştur
    const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("language" + message.guild.id)
                .setPlaceholder(await lang("settings.language.select"))
                .addOptions([
                    {
                        label: "Türkçe",
                        value: "tr-TR",
                        description: "Türkçe",
                        emoji: "🇹🇷"
                    },
                    {
                        label: "English",
                        value: "en-US",
                        description: "English",
                        emoji: "🇬🇧"
                    }
                ])
        );
    const msg = await message.reply({ content: await lang('settings.language.desc', { lang: lang2Flag(checkLang) }), components: [row] });
    
    // dil değiştirme menüsü seçim
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 15000 });
    collector.on("collect", async (interaction) => {
        if (interaction.customId === "language" + message.guild.id) {
            await setLanguage({ guildId: message.guild.id, language: interaction.values[0], key: `guild:${message.guild.id}:guild` });
            msg.edit({ content: lang('settings.language.success', { lang: lang2Flag(interaction.values[0]) }), components: [] });
        } else {
            interaction.reply({ content: lang('settings.language.notYours'), ephemeral: true });
        }
    });

    collector.on("end", (collected) => {
        if (collected.size === 0) {
            msg.edit({ content: lang('settings.language.timeHasPassed'), components: [] });
        }
    });
}

function lang2Flag(lang) {
    switch (lang) {
        case "tr-TR":
            return "🇹🇷";
        case "en-US":
            return "🇬🇧";
        default:
            return "🏳️";
    }
}