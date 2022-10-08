import { getPremium, getRulesAccepted } from "../../../manager/database.js";
import embedManager from "../../../manager/embedManager.js";
import cooldownControl from "../../../handler/messageCreate/cooldown.js";
import permisions from "../../../other/permisions.js";
import ids from "../../../../../../config/bot/example.ids.js";


export default async ({ client, message, prefix, args, lang, checkLang, command }) => {
    // kuralları kabul etmemişse komutları kullanamaz
    const rulesAccepted = await getRulesAccepted({ userId: message.member.id, username: `${message.member?.user?.username || 'unknown'}#${message.member?.user?.discriminator || '0000'}`, key: `user:${message.member.id}:user` });
    if (!rulesAccepted) return await import("../../lib/events/guild/messageCreate/rules.js").then(function(m) { m.default({client, message, lang}); });

    const checkPremium = await getPremium({ userId: message.author.id, key: `user:${message.author.id}:premium` });
    if ((checkPremium?.active === 'false' || !checkPremium?.active) && command.config.onlyPre) {
        return message.reply({ embeds: [embedManager({ description: lang('messageCreate.onlyPre.message', { prefix })}) ]});
    }

    // cooldown kontrolü
    const cooldown = cooldownControl({ message, command, client, checkPremium });
    if (cooldown && !ids.staff.devs.includes(message.author.id)) {
        const left = Math.round(cooldown);
        return message.reply({ content: lang('cooldown.message', { left }) })
            .then(msg => { setTimeout(() => { msg.delete().catch() }, cooldown * 1000); })
            .catch(err => { })
    }

    // developer kontrolü
    if (command.config.onlyDev && !ids.staff.devs.includes(message.member.id)) return;

    // komut yapım/geliştirme aşamasında kontrolü 
    if (command.config.underDev && !ids.staff.devs.includes(message.member.id)) return message.reply({ content: lang('messageCreate.underDev')}).catch(err => { })

    // sunucu sahibi kontrolü
    if (command.config.onlyOwner && message.guild.ownerId !== message.member.id) return message.reply({ content: lang('messageCreate.onlyOwner')}).catch(err => { });

    // yetki kontrolü
    if (command.config.reqUserPerm && !message.member.permissions.has(permisions[command.config.reqUserPerm])) return message.reply({ content: lang('perms.userPerms', { userPerm: command.config.reqUserPerm }) }).catch(err => { })
    if (command.config.reqBotPerm && !message.guild.members.cache.get(client.user.id).permissions.has(permisions[command.config.reqBotPerm])) return message.reply({ content: lang('perms.botPerms', { botPerm: command.config.reqBotPerm }) }).catch(err => { })

    try {
        command.run({ client, message, prefix, args, lang: lang, checkLang })
            .then(() => {
                // console.log(`Komut çalıştırıldı: ${command.config.name}`);
            })
            .catch(e => console.log(e));
    } catch (err) {
        console.log(err);
    }
}