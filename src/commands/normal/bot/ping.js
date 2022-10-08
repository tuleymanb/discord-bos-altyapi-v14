export const config = {
    name: {
        "tr-TR": "ping",
        "en-US": "ping"
    },
    aliases: {
        "tr-TR": [],
        "en-US": []
    },
    description: {
        "tr-TR": "Botun pingini gösterir.",
        "en-US": "Shows the bot's ping."
    },
    usage: {
        "tr-TR": "{{prefix}}ping",
        "en-US": "{{prefix}}ping"
    },
    category: {
        "tr-TR": "bot",
        "en-US": "bot"
    },
    cooldown: 15, // komutun bekleme süresi
    reqUserPerm: "", // kullanıcının sunucuda ki gereken yetki(leri)si
    reqBotPerm: "", // botun sunucuda ki gereken yetki(leri)si
    helpDisabled: false, // true yardım menüsünde gizler.
    onlyPre: true, // true komutu sadece premium sahiplerine/premuim sunuculara özel yapar.
    onlyOwner: false, // true komutu sadece sunucu sahibine özel yapar.
    onlyDev: false, // true komutu kullanıcılara kapatır.
    underDev: false, // true komutu geliştirme/yapım aşamasına alır kullanıcılara kapatır. 
}
export async function run({ client, message, prefix, args, lang, checkLang }) {
    message.reply({ content: lang('bot.ping.message') })
    .then((msg) => {
        msg.edit({ content: lang('bot.ping.messageEdit', { ping: msg.createdTimestamp - message.createdTimestamp, api: client.ws.ping }) });
    });
}