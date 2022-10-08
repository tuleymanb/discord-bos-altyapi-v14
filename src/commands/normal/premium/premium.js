import embedManager from "../../../structures/lib/manager/embedManager.js"
import shop from "../../../../config/bot/example.shop.js"
import { getPayment, getPremium, getRealInfo, getUser, setBalance, setPayment, setPremium } from "../../../structures/lib/manager/database.js"
import Discord from "discord.js"
import moment from "moment"
import apiConf from "../../../../config/api/settings.js"

const { ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder } = Discord;

export const config = {
    name:  {
        "tr-TR": "premium",
        "en-US": "premium"
    },
    aliases: {
        "tr-TR": ["p"],
        "en-US": ["p"]
    },
    description: {
        "tr-TR": "Premium komutları",
        "en-US": "Premium commands"
    },
    usage: {
        "tr-TR": "{{prefix}}premium",
        "en-US": "{{prefix}}premium"
    },
    category:  {
        "tr-TR": "premium",
        "en-US": "premium"
    },
    cooldown: 1,
    reqUserPerm: "",
    reqBotPerm: "",
    helpDisabled: false,
    onlyPre: false,
    onlyOwner: false,
    onlyDev: false,
    underDev: false,
}
export async function run({ client, message, args, prefix, lang, checkLang }) {

    const checkPremium = await getPremium({ userId: message.member.id, key: `user:${message.member.id}:premium` })
    const checkUser = await getUser({ userId: message.member.id, key: `user:${message.member.id}:user` })

    // Premium aktif pasif kontrolü
    const premiumActive = new Date(checkPremium?.expire).getTime() - Date.now() > 0 ? true : false;

    if ((args[0] === "al" && checkLang === "tr-TR") || (args[0] === "buy" && checkLang === "en-US")) {
        if (!args[1]) return message.reply({ embeds: [embedManager({ description: lang('premium.buy.specify', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })
        if (isNaN(args[1])) return message.reply({ embeds: [embedManager({ description: lang('premium.buy.invalid', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })
        if (args[1] > shop.items.length) return message.reply({ embeds: [embedManager({ description: lang('premium.buy.invalid', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })
        if (args[1] < 1) return message.reply({ embeds: [embedManager({ description: lang('premium.buy.invalid', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })
        if (Number(checkPremium?.level) > shop.items[args[1] - 1]?.level || Number(checkPremium?.level) === shop.items[args[1] - 1].level) return message.channel.send({ embeds: [embedManager({ description: lang('premium.buy.current', { prefix, commandName: config.name[checkLang] }) })] })

        const discount = Number(amountUsed({ now: Date(), expire: checkPremium.expire, oldPrice: shop.items[checkPremium.level - 1]?.price || shop.items[args[1] - 1].price, price: shop.items[args[1] - 1].price, day: shop.items[args[1] - 1].expire }).discount);
        const percent = Number(amountUsed({ now: Date(), expire: checkPremium.expire, oldPrice: shop.items[checkPremium.level - 1]?.price || shop.items[args[1] - 1].price, price: shop.items[args[1] - 1].price, day: shop.items[args[1] - 1].expire }).percent);

        var newBalance, newSpentBalance, newPrice, totalTime;
        if (Number(checkPremium?.level) && premiumActive == true && percent > 0) {
            // 2 ürün arasındaki farkı bul ve kalan bakiyeyi hesapla
            var newBalance = Number(checkUser.balance) - (discount).toFixed(2)
            var newSpentBalance = (Number(checkUser.spentBalance) + discount).toFixed(2);
            var newPrice = (discount).toFixed(2)
            const date = new Date()
            const remDay = getPremiumTime(checkPremium.expire, date).day;
            var totalTime = upDate({ days: remDay + shop.items[checkPremium.level - 1].expire });
            if (newSpentBalance === 'NaN') newSpentBalance = newPrice;
        } else {
            var newBalance = Number(checkUser.balance) - shop.items[args[1] - 1].price
            var newSpentBalance = Number(checkUser.spentBalance) + shop.items[args[1] - 1].price
            var newPrice = shop.items[args[1] - 1].price
            var totalTime = new Date()
            totalTime.setDate(totalTime.getDate() + shop.items[args[1] - 1].expire)
        }
        
        if (Number(checkUser.balance) < newPrice) return message.reply({ embeds: [embedManager({ description: lang('premium.buy.insufficientBalance', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })
        // **${shop.items[args[1] - 1].name}** paketini ${percent > 0 ? `~~${shop.items[args[1] - 1].price}~~ ${newPrice} %${percent.toFixed(2)}\`⬇\`` : `${shop.items[args[1] - 1].price}`} ${shop.shop.currency} satın almak istediğine emin misin?
        const embed = embedManager({ description: lang('premium.buy.areYouSure', { itemName: shop.items[args[1] - 1].name }), price: percent > 0 ? `~~${shop.items[args[1] - 1].price}~~ ${newPrice} %${percent.toFixed(2)}\`⬇\`` : `${shop.items[args[1] - 1].price}`, currency: shop.shop.currency })
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('yes'+message.member.id)
                    .setLabel(lang('premium.buy.yes'))
                    .setStyle('Success'),
                new ButtonBuilder()
                    .setCustomId('no'+message.member.id)
                    .setLabel(lang('premium.buy.no'))
                    .setStyle('Danger'),
            );
        const msg = await message.reply({ embeds: [embed], components: [button] }).catch(() => { })
        const filter = i => i.customId === 'yes'+message.member.id || i.customId === 'no'+message.member.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'yes'+message.member.id) {
                await setBalance({ userId: message.member.id, key: `user:${message.member.id}:user`, balance: newBalance, spentBalance: newSpentBalance })
                await setPremium({ userId: message.member.id, key: `user:${message.member.id}:premium`, level: shop.items[args[1] - 1].level, expire: totalTime, active: true })
                // **${shop.items[args[1] - 1].name}** paketini ${} karşılığında satın aldın.
                return i.update({ embeds: [embedManager({ description: lang('premium.buy.success', { itemName: shop.items[args[1] - 1].name, price: percent > 0 ? `~~${shop.items[args[1] - 1].price}~~ ${newPrice} %${percent.toFixed(2)}\`⬇\`` : `${shop.items[args[1] - 1].price}`, currency: shop.shop.currency }) })], components: [] }).catch(() => { })
            } else if (i.customId === 'no'+message.member.id) {
                return i.update({ embeds: [embedManager({ description: lang('premium.buy.cencel'), color: "error" })], components: [] }).catch(() => { })
            }
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                return msg.edit({ embeds: [embedManager({ description: lang('premium.buy.timeHasPassed'), color: "error" })], components: [] }).catch(() => { })
            }
        });
    } else if ((args[0] === 'uzat' && checkLang === 'tr-TR') || (args[0] === 'renewal' && checkLang === 'en-US')) {
        if (!premiumActive) return message.reply({ embeds: [embedManager({ description: lang('premium.stretch.noPremium', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })
        const discount = Number(amountUsed({ now: Date(), expire: checkPremium.expire, oldPrice: shop.items[checkPremium.level - 1].price, price: shop.items[checkPremium.level - 1].price, day: shop.items[checkPremium.level - 1].expire }).discount);
        if (Number(checkUser.balance) < discount) return message.reply({ embeds: [embedManager({ description: lang('premium.stretch.insufficientBalance', { prefix, commandName: config.name[checkLang] }), color: "error" })] }).catch(() => { })

        const percent = Number(amountUsed({ now: Date(), expire: checkPremium.expire, oldPrice: shop.items[checkPremium.level - 1].price, price: shop.items[checkPremium.level - 1].price, day: shop.items[checkPremium.level - 1].expire }).percent);

        var newBalance, newSpentBalance, newPrice;
        if (Number(checkPremium?.level) && premiumActive == true && percent > 0) {
            // 2 ürün arasındaki farkı bul ve kalan bakiyeyi hesapla
            var newBalance = Number(checkUser.balance) - (discount).toFixed(2)
            var newSpentBalance = (Number(checkUser.spentBalance) + discount).toFixed(2)
            var newPrice = (discount).toFixed(2)
            if (newSpentBalance === 'NaN') newSpentBalance = newPrice;
        } else {
            var newBalance = Number(checkUser.balance) - shop.items[args[1] - 1].price;
            var newSpentBalance = Number(checkUser.spentBalance) + shop.items[args[1] - 1].price;
            var newPrice = shop.items[args[1] - 1].price;
        }

        const date = new Date()
        const remDay = getPremiumTime(checkPremium.expire, date).day;
        const totalTime = upDate({ days: remDay + shop.items[checkPremium.level - 1].expire });
        const newDate = new Date(totalTime)
        // Mevcut premiumun ${shop.items[Number(checkPremium.level) - 1].expire} gün daha uzatılmasını istediğine emin misin? işlemi onaylarsan yeni premium bitiş süren <t:${Math.floor(newDate.getTime() / 1000)}> olarak ayarlanacak.
        const embed = embedManager({ description: lang('premium.stretch.areYouSure', { itemName: shop.items[Number(checkPremium.level) - 1].name, price: newPrice, currency: shop.shop.currency, expire: `<t:${Math.floor(newDate.getTime() / 1000)}>` }) })
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('yes'+message.member.id)
                    .setLabel(lang('premium.stretch.yes'))
                    .setStyle('Success'),
                new ButtonBuilder()
                    .setCustomId('no'+message.member.id)
                    .setLabel(lang('premium.stretch.no'))
                    .setStyle('Danger'),
            );
        const msg = await message.reply({ embeds: [embed], components: [button] }).catch(() => { })
        const filter = i => i.customId === 'yes'+message.member.id || i.customId === 'no'+message.member.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'yes'+message.member.id) {
                await setBalance({ userId: message.member.id, key: `user:${message.member.id}:user`, balance: newBalance, spentBalance: newSpentBalance })
                await setPremium({ userId: message.member.id, key: `user:${message.member.id}:premium`, level: checkPremium.level, expire: totalTime, active: true })
                return i.update({ embeds: [embedManager({ description: lang('premium.stretch.success', { itemName: shop.items[Number(checkPremium.level) - 1].name, price: newPrice, currency: shop.shop.currency, expire: `<t:${Math.floor(newDate.getTime() / 1000)}>` }) })], components: [] }).catch(() => { })
            } else if (i.customId === 'no'+message.member.id) {
                return i.update({ embeds: [embedManager({ description: lang('premium.stretch.cencel'), color: "error" })], components: [] }).catch(() => { })
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                return msg.edit({ embeds: [embedManager({ description: lang('premium.stretch.timeHasPassed'), color: "error" })], components: [] }).catch(() => { })
            }
        });
    } else if ((args[0] === "bilgi" && checkLang === 'tr-TR') || (args[0] === "info" && checkLang === 'en-US')) {
        const date = new Date(checkPremium.expire)
        // `**Level:** ${premiumActive ? checkPremium?.level || 0 : 0}\n**Bitiş:** ${}\n**Aktif:** ${premiumActive ? "Aktif" : "Pasif"}`
        const embed = embedManager({ description: lang('premium.info.desc'), fields: [{ name: lang('premium.info.fields.name'), value: lang('premium.info.fields.value', { level: premiumActive ? checkPremium?.level || 0 : 0, expire: premiumActive ? `<t:${Math.floor(date.getTime() / 1000)}>` : "Premium aktif değil.", active: premiumActive ? "Aktif" : "Pasif" }) }] })
        message.reply({ embeds: [embed] }).catch(() => { })
    } else if ((args[0] === "bakiye" && checkLang === 'tr-TR') || (args[0] === "balance" && checkLang === 'en-US')) {
        if ((args[1] === "yükle" && checkLang === 'tr-TR') || (args[1] === "charge" && checkLang === 'en-US')) {
            if(!args[2]) return message.reply({ content: lang('premium.balance.charge.enterNumber') }).catch(() => { })
            if (isNaN(args[2])) return message.reply({ content: lang('premium.balance.charge.invalidNumber') }).catch(() => { })
            // `Lütfen ${shop.shop.charge.min} ile ${shop.shop.charge.max} arasında bir sayı giriniz.`
            if (args[2] < shop.shop.charge.min || args[2] > shop.shop.charge.max) return message.reply({ content: lang('premium.balance.charge.interval', { min: shop.shop.charge.min, max: shop.shop.charge.max }) }).catch(() => { })
            const getReal = await getRealInfo({ userId: message.member.id, key: `user:${message.member.id}:real` })
            if (getReal.name ==  'unknown' || getReal.surname ==  'unknown' || getReal.email ==  'unknown' || getReal.phone ==  'unknown') {
                // bilgileri doldur butonu oluştur
                const buton = new ButtonBuilder()
                    .setCustomId('realInfo' + message.member.id)
                    .setLabel(lang('premium.balance.charge.buttonFillInfo'))
                    .setStyle('Success')

                const row = new ActionRowBuilder()
                    .addComponents(buton);

                message.reply({ embeds: [embedManager({ description: lang('premium.balance.charge.introduce'), color: "error" })], components: [row] }).catch(() => { })

                return;
            }
            
            // console.log(getReal)
            // const checkPayment = await getPayment({ userId: message.member.id, key: `user:${message.member.id}:payment` })
            // if (checkPayment.status === 'pending') return message.reply({ content: "Ödeme işleminiz zaten devam ediyor." }).catch(() => { })

            await setPayment({ userId: message.member.id, key: `user:${message.member.id}:payment`, amount: args[2], status: 'pending' })
            // **${args[2]}₺** bakiye yüklemek için [burdaki bağlantı](${apiConf.url}/api/v1/paytr?user=${message.member.id})yı kullanın.
            const embed = embedManager({ description: lang('premium.balance.charge.desc', { amount: args[2], url: apiConf.url, userId: message.member.id }) })
            return message.reply({ embeds: [embed] }).catch(() => { })
        }
        // `${Number(checkUser.balance) ? `Hesabındaki bakiye ${Number(checkUser.balance).toLocaleString()} ${shop.shop.currency} ve harcadığın bakiye ${Number(checkUser.spentBalance).toLocaleString()} ${shop.shop.currency} olarak gözüküyor.` : `Hesabında bakiye bulunamadı\nHesabına bakiye yüklemek için **${prefix}${config.name} ${args[0]} yükle <yüklenecek miktar>**`}`
        const embed = embedManager({ description: Number(checkUser.balance) ? lang('premium.balance.desc', { balance: Number(checkUser.balance).toLocaleString(), currency: shop.shop.currency, spentBalance: Number(checkUser.spentBalance).toLocaleString() }) : lang('premium.balance.descNoBalance', { prefix, commandName: config.name[checkLang] }) })
        message.reply({ embeds: [embed] }).catch(() => { })
    } else if ((args[0] === "market" && checkLang === 'tr-TR') || (args[0] === "shop" && checkLang === 'en-US')) {
        const field = [];
        var newBalance, newSpentBalance, newPrice;
        
        shop.items?.forEach((item,i) => {
            // if (item.level < Number(checkPremium.level) && item.level !== Number(checkPremium.level) && premiumActive) item.price = `Mevcut paket`;
            const discount = Number(amountUsed({ now: Date(), expire: checkPremium.expire, oldPrice: shop.items[(checkPremium?.level || 0) - 1]?.price || item.price, price: item.price, day: item.expire }).discount);
            const percent = Number(amountUsed({ now: Date(), expire: checkPremium.expire, oldPrice: shop.items[(checkPremium?.level || 0) - 1]?.price || item.price, price: item.price, day: item.expire }).percent);
            // console.log({discount, percent})
            if (Number(checkPremium?.level) && premiumActive == true && percent > 0) {
                // 2 ürün arasındaki farkı bul ve kalan bakiyeyi hesapla
                var newPrice = (discount).toFixed(2);
            } else {
                var newPrice = item.price;
            }


            // ${newPrice !== item.price && item.id >= checkPremium.level ? `~~${item.price}~~ ${newPrice < 0 ? item.price : newPrice} ${shop.shop.currency} ${percent === 0 ? `` : `(%${(percent).toFixed(2)} indirim)`}` : `Aktif Paket`}
            if (item.type === "premium") {
                field.push({
                    name: lang('premium.market.fields.name', { itemName: item.name + ` ${item.level === Number(checkPremium.level) && premiumActive ? lang('premium.market.fields.activePackage') : ""}` }),
                    // **ID:** ${item.id}\n**Fiyat:** ${percent > 0 ? `~~${item.price}~~ ${newPrice} ${shop.shop.currency}\n(%${percent.toFixed(2)} \`⬇\`)` : `${item.price} ${shop.shop.currency}`}\n**Açıklama:** ${item.description}
                    value: lang('premium.market.fields.value', { itemId: item.id, price: percent > 0 ? `~~${item.price}~~ ${newPrice} ${shop.shop.currency}\n(%${percent.toFixed(2)} \`⬇\`)` : `${item.price} ${shop.shop.currency}`, itemDescription: item.description[checkLang] }),
                    inline: true
                })
            }
        })

        const embed = embedManager({ description: lang('premium.market.desc'), fields: field, footer: { text: lang('premium.market.footer', { prefix, commandName: config.name[checkLang] }) } })
        message.reply({ embeds: [embed] }).catch(() => { })
    } else {
        const embed = embedManager({ description: lang('premium.help.desc'), fields: [ 
            { name: lang('premium.help.fields.name1'), value: lang('premium.help.fields.value1', { prefix, commandName: config.name[checkLang] }), inline: true },
            { name: lang('premium.help.fields.name2'), value: lang('premium.help.fields.value2', { prefix, commandName: config.name[checkLang] }), inline: true },
            { name: lang('premium.help.fields.name3'), value: lang('premium.help.fields.value3', { prefix, commandName: config.name[checkLang] }), inline: true },
         ] })
        message.reply({ embeds: [embed] })
    }

}

function getPremiumTime(expire, date) {
    const a = new Date(expire)
    const b = new Date(date)
    return { day: Math.floor(((a.getTime() - b.getTime()) / 1000) / 60 / 60 / 24), hour: Math.floor(((a.getTime() - b.getTime()) / 1000) / 60 / 60), minute: Math.floor(((a.getTime() - b.getTime()) / 1000) / 60), second: Math.floor(((a.getTime() - b.getTime()) / 1000)), millisecond: Math.floor(a.getTime() - b.getTime()) }
}


/*
y = harcanan saat
x = 100/720
a = x*y

200-a = istediğin sonuç
*/
function amountUsed({ now, expire, oldPrice, price, day }) {
    const y = (day * 24) - getPremiumTime(expire, now).hour // ((Date.now() - (new Date(expire).getTime() - getPremiumTime(expire, now).hour )) / 3600) + (day * 24);
    const x = oldPrice / (day*24);

    const a = y * x;
    
    const discount = price + a;

   // price ile discount arasındaki indirim oranını hesapla
    const percent = (( price - ( price - (getPremiumTime(expire, now).hour * x) ) * 100 ) / price) + 99;

    // console.log({ y, a, x, fpt: getPremiumTime(expire, now).hour })

    return { discount: (discount - oldPrice) < price / 2 ? price / 2 : discount - oldPrice, percent: percent > 50 ? 50 : percent < 0 ? 0 : percent };
}

function upDate({ days }) {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var seconds = dateObj.getSeconds();
    if (days > 28) {
        let islem = Math.floor(days * 86400000)
        let date = new Date(Date.now() + islem)
        let sonuc = date.getFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + ' ' + hours +':' + minutes + ':' + seconds;
        return sonuc
    } else {
        return year + '-' + month + '-' + (day + gun) + ' ' + hours +':' + minutes + ':' + seconds;
    }
}