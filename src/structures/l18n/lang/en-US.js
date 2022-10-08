export default {

    translate: {
        translators: ["seind#3011"],
        lang: "English",
        missing: "Language not found: {{str}}",
    },
    
    blacklist: {
        user: "You can't use commands because you're blacklisted by the bot.\nReason: \`\`\`\n{{reason}}\`\`\`\nAuthor: **{{staff}}**",
        guild: "Command is unavailable because this server is blacklisted.\nReason: \`\`\`\n{{reason}}\`\`\`\nAuthor: **{{staff}}**",
    },

    cooldown: {
        message: "You need to wait \`{{left}}\` seconds to use command again."
    },

    perms: {
        userPerms: "You need to have \`{{userPerm}}\` permission to use this command.",
        botPerms: "I need to have \`{{botPerm}}\` permission to run this command."
    },

    context: {

        message: {
            messageId: {
                message: "Message ID: {{messageId}}",
            }
        },

        user: {
            user: {
                message: "User ID: {{user}}",
            }
        },
    },

    messageCreate: {
        rules: {
            rules: "Bot rules are listed here",
            author: "Rules",
            footer: "You need to accept bot rules to use. | {{rulesAccepted}} accepted rules in this server.",
            button: {
                accept: "I accept the rules."
            }
        },

        onlyPre: {
            message: "You need to have premium membership to use this command. For premium membership you can use \`{{prefix}}premium market\` command."
        },

        underDev: "This command is under development/maintenance. Use later it might be useable 🤷",
        onlyOwner: "This command is only useable for server owner.",
    },

    interactionCreate: {
        rules: {
            button: {
                accept: "Rules accepted",
                notYours: "This button not yours."
            }
        },

        realInfo: {
            name: "Name",
            surname: "Surname",
            email: "Your mail",
            phone: "Phone (e.g.: 5xxxxxxxxx)",
            title: "Type your real information.",
            invalid: {
                email: "Invalid mail.",
                phone: "Invalid phone number.",
            },
            success: "Information saved succesfully.",
            notYours: "This button not yours.",
        }
    },

    bot: {

        help: {
            desc: `Welcome to **{{botName}}** help menu!\nFor the best experience, take the role of the bot over all roles.`,
            footer: `⌨ To get specific command information use {{prefix}}help info [command name]`,
            notFound: "Command not found.",
            info: {
                desc: "Information about `{{prefix}}{{commandName}}` command",
                commandDesc: "Command Description",
                usage: "Usage",
                perms: "Permissions",
                permsUser: "User: {{perms}}",
                permsBot: "Bot: {{perms}}",
                cooldown: "Cooldown",
                cooldownValue: "**{{time}}** seconds",
                aliases: "Aliases",
                category: "Category",
                onlyPre: "Only premium users",
                onlyOwner: "Only server owner",
                onlyDev: "Only developer",
                underDev: "Under Development",
                helpDisabled: "Help Disabled",
                notAvaliable: "Not Avaliable",
                footer: "[] = Necessary, <> = Optional",
                yes: "Yes",
                no: "No",
            },
            category: "**{{categoryName}}** Category",
            contextMenu: "**Context** Menu"
        },

        ping: {
            message: `⚡ Pong!`,
            messageEdit: "⚡ Pong! Message: {{ping}}ms, API: {{api}}ms",
        },

        invite: {
            message: `Invite Link: {{invite}}`,
        },
    },

    premium: {

        help: {
            desc: "Premium commands",
            fields: {
                name1: "Information",
                value1: "`{{prefix}}{{commandName}} info`",
                name2: "Show Balance",
                value2: "`{{prefix}}{{commandName}} balance <charge [amount]>`",
                name3: "Shop",
                value3: "`{{prefix}}{{commandName}} shop`",
                name4: "Buy Item",
                value4: "`{{prefix}}{{commandName}} buy [item id]`",
                name5: "Renewal",
                value5: "`{{prefix}}{{commandName}} renewal`",
            },
        },

        buy: {
            current: "You already have this premium package or its higher tier. You can use the **{{prefix}}{{commandName}} extend** command to extend your current package.",
            specify: "Please specify a package. You can see the packages using the command \`{{prefix}}{{commandName}} shop\`.",
            specifyId: "Please specify a valid package id. You can see the packages using the \`{{prefix}}{{commandName}} shop\` command.",
            invalid: "The package you specified is invalid. You can see the packages using the \`{{prefix}}{{commandName}} shop\` command.",
            insufficientBalance: "You don't have enough balance. You can see your balance using the command \`{{prefix}}{{commandName}} balance\`.",
            areYouSure: "Are you sure you want to buy the **{{itemName}}** package {{price}} {{currency}}?",
            yes: "Yes",
            no: "No",
            success: "You purchased the package **{{itemName}}** for {{price}} {{currency}}.",
            cencel: "The transaction has been cancelled. (User request)",
            timeHasPassed: "The transaction has been cancelled. (Time has expired)",
        },

        stretch: {
            noPremium: "You do not have a premium membership. You can see the packages using the command \`{{prefix}}{{commandName}} market\`.",
            insufficientBalance: "You don't have enough balance. You can see your balance using the command \`{{prefix}}{{commandName}} balance\`.",
            areYouSure: "Are you sure you want to extend the duration of the **{{itemName}}** package for {{price}} {{currency}} until {{expire}}?",
            yes: "Yes",
            no: "No",
            success: "You extended the duration of the **{{itemName}}** package for {{price}} {{currency}} until {{expire}}.",
            cencel: "The transaction has been cancelled. (User request)",
            timeHasPassed: "The transaction has been cancelled. (Time has expired)",
        },

        info: {
            desc: "Premium Info",
            fields: {
                name: "Premium",
                value: "**Level:** {{level}}\n**Expire:** {{expire}}\n**Active:** {{active}}",
            },
        },

        balance: {
            desc: "The balance in your account is {{balance}} {{currency}} and the balance you spent is {{spentBalance}} {{currency}}.",
            descNoBalance: "No balance found in your account\nTo top up your account with balance **{{prefix}}{commandName} balance [to load]**",
            charge: {
                enterNumber: "Please specify the amount to be loaded.",
                invalidNumber: "Lütfen geçerli bir miktar belirtin.",
                interval: "Please specify an amount between {{min}} and {{max}}.",
                buttonFillInfo: "Fill Info",
                introduce: "We need to get to know you before we pay.",
                desc: "Use [link here]({{url}}/api/v1/paytr?user={{userId}}) to load **{{amount}}$** balance.",
            },
        },

        market: {
            desc: "Premium Packs",
            fields: {
                activePackage: "(Active Package)",
                name: "{{itemName}}",
                value: "**ID:** {{itemId}}\n**Price:** {{price}}\n**Description:** {{itemDescription}}",
            },
            footer: "To buy premium pack use {{prefix}}{{commandName}} buy [id] command.",
        }
    },

    settings: {

        language: {
            select: "Please select language.",
            desc: "Current language: {{lang}}\nTo set language, please select from menu.",
            timeHasPassed: "15 seconds expired, language selection cancelled.",
            notYours: "This menu not yours.",
            success: "Successfully changed language to {{lang}}.",
        },
        
        prefix: {
            noArgs: "Prefix: {{prefix}}",
            toolong: "Prefix too long! (Max: 5)",
            same: "Prefix is same as previous! Prefix is : \`{{prefix}}\`",
            success: "Prefix set to \`{{prefix}}\` successfully!",
        }
    },
    
}