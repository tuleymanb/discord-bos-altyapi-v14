export default {

    translate: {
        translators: ["tB#3520"],
        lang: "Türkçe",
        missing: "Çeviri bulunamadı: {{str}}",
    },

    blacklist: {
        user: "Botun karalistesinde bulunduğun için komut kullanamazsın.\nSebep: \`\`\`\n{{reason}}\`\`\`\nYetkili: **{{staff}}**",
        guild: "Bu sunucu karalistede olduğu için komut kullanılamaz.\nSebep: \`\`\`\n{{reason}}\`\`\`\nYetkili: **{{staff}}**",
    },

    cooldown: {
        message: "Komutu tekrar kullanabilmek için \`{{left}}\` saniye beklemelisin."
    },

    perms: {
        userPerms: "Komutu kullanabilmek için \`{{userPerm}}\` yetkisine sahip olmalısın.",
        botPerms: "Komutu çalıştırabilmem için \`{{botPerm}}\` yetkisine sahip olmalıyım."
    },

    context: {

        message: {
            messageId: {
                message: "Mesaj id: {{messageId}}",
            }
        },

        user: {
            user: {
                message: "Kullanıcı id: {{user}}",
            }
        },
    },

    messageCreate: {
        rules: {
            rules: "Botun kuralları burda olacak",
            author: "Kurallar",
            footer: "Botu kullanabilmek için kuralları kabul etmek zorundasınız. | {{rulesAccepted}} kuralları kabul eden kişi",
            button: {
                accept: "Kuralları kabul ediyorum"
            }
        },

        onlyPre: {
            message: "Bu komutu kullanmak için premium üyeliğin olması gerekiyor. Premium üyeliğin için \`{{prefix}}premium market\` komutunu kullanabilirsin."
        },

        underDev: "Komut henüz yapım/geliştirme aşamasında lütfen daha sonra tekrar dene.",
        onlyOwner: "Bu komutu sadece sunucu sahibi kullanabilir.",
    },

    interactionCreate: {
        rules: {
            button: {
                accept: "Kuralları kabul ettiniz",
                notYours: "Bu buton sana ait değil."
            }
        },

        realInfo: {
            name: "Adınız",
            surname: "Soyadınız",
            email: "E-posta adresiniz",
            phone: "Telefon numaranız (örnek: 5xxxxxxxxx)",
            title: "Gerçek bilgilerinizi girin",
            invalid: {
                email: "E-posta adresiniz geçersiz.",
                phone: "Telefon numaranız geçersiz.",
            },
            success: "Bilgileriniz kaydedildi.",
            notYours: "Bu buton sana ait değil.",
        }
    },

    bot: {

        help: {
            desc: `**{{botName}}**'nın yardım menüsüne hoşgeldin!\nEn iyi deneyim için botun rolünü tüm rollerin üstüne alınız.`,
            footer: `⌨ Bir komut hakkında bilgi almak için {{prefix}}yardım bilgi [komut adı]`,
            notFound: "Böyle bir komut bulunamadı.",
            info: {
                desc: "`{{prefix}}{{commandName}}` komutu hakkında bilgi",
                commandDesc: "Komut açıklaması",
                usage: "Kullanım",
                perms: "Gerekli izinler",
                permsUser: "Kullanıcı: {{perms}}",
                permsBot: "Bot: {{perms}}",
                cooldown: "Bekleme süresi",
                cooldownValue: "**{{time}}** saniye",
                aliases: "Alternatifler",
                category: "Kategori",
                onlyPre: "Sadece premium sahipleri",
                onlyOwner: "Sadece sunucu sahibi",
                onlyDev: "Sadece geliştiriciler",
                underDev: "Geliştirme aşamasında",
                helpDisabled: "Yardım menüsünde gizli",
                notAvaliable: "Yok",
                footer: "[] = Zorunlu, <> = İsteğe Bağlı",
                yes: "Evet",
                no: "Hayır",
            },
            category: "**{{categoryName}}** kategorisi",
            contextMenu: "**Context** Menü"
        },

        ping: {
            message: `⚡ Pong!`,
            messageEdit: "⚡ Pong! Mesaj: {{ping}}ms, API: {{api}}ms",
        },

        invite: {
            message: `Davet linki: {{invite}}`,
        },
    },

    premium: {

        help: {
            desc: "Premium komutları",
            fields: {
                name1: "Bilgi",
                value1: "`{{prefix}}{{commandName}} bilgi`",
                name2: "Bakiye Gösrme",
                value2: "`{{prefix}}{{commandName}} bakiye <yükle [miktar]>`",
                name3: "Market",
                value3: "`{{prefix}}{{commandName}} market`",
                name4: "İtem almak",
                value4: "`{{prefix}}{{commandName}} al [item id]`",
                name5: "Süre Uzatma",
                value5: "`{{prefix}}{{commandName}} uzat`",
            },
        },

        buy: {
            current: "Bu premium paketine veya zaten üst bir pakete sahipsin. Mevcut paketinin süresini uzatmak için **{{prefix}}{{commandName}} uzat** komutunu kullanabilirsin.",
            specify: "Lütfen bir paket belirtin. \`{{prefix}}{{commandName}} market\` komutunu kullanarak paketleri görebilirsin.",
            specifyId: "Lütfen geçerli bir paket id belirtin. \`{{prefix}}{{commandName}} market\` komutunu kullanarak paketleri görebilirsin.",
            invalid: "Belirttiğin paket geçersiz. \`{{prefix}}{{commandName}} market\` komutunu kullanarak paketleri görebilirsin.",
            insufficientBalance: "Yeterli bakiyen yok. \`{{prefix}}{{commandName}} bakiye\` komutunu kullanarak bakiyeni görebilirsin.",
            areYouSure: "**{{itemName}}** paketini {{price}} {{currency}} satın almak istediğine emin misin?",
            yes: "Evet",
            no: "Hayır",
            success: "**{{itemName}}** paketini {{price}} {{currency}} karşılığında satın aldın.",
            cencel: "İşlem iptal edildi. (Kullanıcı isteği)",
            timeHasPassed: "İşlem iptal edildi. (İşlem süresi doldu)",
        },

        stretch: {
            noPremium: "Premium üyeliğin yok. \`{{prefix}}{{commandName}} market\` komutunu kullanarak paketleri görebilirsin.",
            insufficientBalance: "Yeterli bakiyen yok. \`{{prefix}}{{commandName}} bakiye\` komutunu kullanarak bakiyeni görebilirsin.",
            areYouSure: "**{{itemName}}** paketinin süresini {{price}} {{currency}} karşılığında {{expire}} tarihine kadar uzatmak istediğine emin misin?",
            yes: "Evet",
            no: "Hayır",
            success: "**{{itemName}}** paketinin süresini {{price}} {{currency}} karşılığında {{expire}} tarihine kadar uzattın.",
            cencel: "İşlem iptal edildi. (Kullanıcı isteği)",
            timeHasPassed: "İşlem iptal edildi. (İşlem süresi doldu)",
        },

        info: {
            desc: "Premium bilgi",
            fields: {
                name: "Premium",
                value: "**Level:** {{level}}\n**Bitiş:** {{expire}}\n**Aktif:** {{active}}",
            },
        },

        balance: {
            desc: "Hesabındaki bakiye {{balance}} {{currency}} ve harcadığın bakiye {{spentBalance}} {{currency}} olarak gözüküyor.",
            descNoBalance: "Hesabında bakiye bulunamadı\nHesabına bakiye yüklemek için **{{prefix}}{commandName} bakiye yükle [yüklenecek miktar]**",
            charge: {
                enterNumber: "Lütfen yüklenecek miktarı belirtin.",
                invalidNumber: "Lütfen geçerli bir miktar belirtin.",
                interval: "Lütfen {{min}} ile {{max}} arasında bir miktar belirtin.",
                buttonFillInfo: "Bilgileri doldur",
                introduce: "Ödeme yapmadan önce seni tanımamız gerekli.",
                desc: "**{{amount}}₺** bakiye yüklemek için [burdaki bağlantı]({{url}}/api/v1/paytr?user={{userId}})yı kullanın.",
            },
        },

        market: {
            desc: "Premium paketleri",
            fields: {
                activePackage: "(Aktif Paket)",
                name: "{{itemName}}",
                value: "**ID:** {{itemId}}\n**Fiyat:** {{price}}\n**Açıklama:** {{itemDescription}}",
            },
            footer: "Premium paketlerini satın almak için {{prefix}}{{commandName}} al [id] komutunu kullanabilirsin.",
        }
    },

    settings: {

        language: {
            select: "Lütfen dilinizi seçin.",
            desc: "Mevcut dil: {{lang}}\nDil ayarlamak için lütfen menüden seçin.",
            timeHasPassed: "15 saniye geçti, dil seçimi iptal edildi.",
            notYours: "Bu menü sana ait değil.",
            success: "Dil başarıyla {{lang}} olarak ayarlandı.",
        },
        
        prefix: {
            noArgs: "Prefix: {{prefix}}",
            toolong: "Prefix çok uzun! (Max: 5)",
            same: "Prefix zaten \`{{prefix}}\` olarak ayarlı!",
            success: "Prefix \`{{prefix}}\` olarak ayarlandı!",
        }
    },
    
}