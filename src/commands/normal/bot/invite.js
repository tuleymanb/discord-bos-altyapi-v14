export const config = {
    name: {
        "tr-TR": "davet",
        "en-US": "invite"
    },
    aliases: {
        "tr-TR": [],
        "en-US": []
    },
    description: "Botun pingini gösterir.",
    usage: {
        "tr-TR": "{{prefix}}davet",
        "en-US": "{{prefix}}invite"
    },
    category: {
        "tr-TR": "bot",
        "en-US": "bot"
    },
    cooldown: 15, // komutun bekleme süresi
    reqUserPerm: "Yok", // kullanıcının sunucuda ki gereken yetki(leri)si
    reqBotPerm: "", // botun sunucuda ki gereken yetki(leri)si
    helpDisabled: false, // true yardım menüsünde gizler.
    onlyPre: true, // true komutu sadece premium sahiplerine/premuim sunuculara özel yapar.
    onlyOwner: false, // true komutu sadece sunucu sahibine özel yapar.
    onlyDev: false, // true komutu kullanıcılara kapatır.
    underDev: false, // true komutu geliştirme/yapım aşamasına alır kullanıcılara kapatır. 
}
export async function run({ client, message, prefix, args, lang, checkLang }) {
    message.reply({ content: lang('bot.invite.message', { invite: `https://api.magoa.com.tr/invite?bot=magoa` }) })
}